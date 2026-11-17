/**
 * 备份文件（导出 / 恢复）
 * ---------------------------------------------------------------------------
 * 为什么单独成模块：
 *   1. 这一层不能依赖浏览器 API（IndexedDB / File），否则没法在 node:test 里测；
 *   2. 备份格式一旦发布就是**用户的唯一退路**，解析必须能容忍旧文件、坏文件，
 *      并且宁可少导入，也不能把本机较新的记录覆盖成本机更旧的记录。
 *
 * 格式 v2（当前）：
 *   {
 *     "app": "fitloop", "format": 2, "schemaVersion": 1,
 *     "exportedAt": "2026-11-17T...",
 *     "counts": { "sessions": 12, ... },
 *     "data": { "sessions": [...], "foodEntries": [...] , ... },
 *     "meta": { "customExercises": [...] }        ← 按 key 存（v1 丢了 key）
 *   }
 *
 * 格式 v1（历史文件，必须还能读）：
 *   直接把各 store 的数组放在顶层，另外混着 exportedAt / note 两个字符串数组；
 *   meta 是「值的数组」，丢了 key —— 这里只对已知的 customExercises 做启发式恢复。
 */

export const BACKUP_APP = "fitloop";
export const BACKUP_FORMAT = 2;

/** 与 db.ts 的 DB_VERSION 对齐：改 IndexedDB 结构时一起加 1 */
export const BACKUP_SCHEMA_VERSION = 1;

/** 有 keyPath:"id" 的 store（顺序与 db.ts 一致） */
export const BACKUP_STORES = [
  "profile",
  "venues",
  "plans",
  "sessions",
  "foods",
  "foodEntries",
  "mealPlans",
  "shopping",
  "recovery",
  "bodyWeights",
  "water",
] as const;

export type BackupStore = (typeof BACKUP_STORES)[number];

export interface ParsedBackup {
  format: number;
  schemaVersion: number;
  exportedAt: string | null;
  /** 每个 store 的合法记录（已过滤掉无 id / 非对象的脏数据） */
  stores: Record<BackupStore, unknown[]>;
  /** meta store（out-of-line key） */
  meta: Record<string, unknown>;
  /** 被丢弃的记录条数 */
  skipped: number;
  warnings: string[];
}

export interface MergeResult {
  toWrite: unknown[];
  added: number;
  updated: number;
  kept: number;
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function idOf(v: unknown): string | null {
  if (!isRecord(v)) return null;
  return typeof v.id === "string" && v.id ? v.id : null;
}

function updatedAtOf(v: unknown): string | null {
  if (!isRecord(v)) return null;
  return typeof v.updatedAt === "string" ? v.updatedAt : null;
}

/** 只保留「对象且 id 是非空字符串」的记录，其余计入 skipped */
function sanitizeRecords(list: unknown, skippedRef: { n: number }): unknown[] {
  if (!Array.isArray(list)) return [];
  const out: unknown[] = [];
  for (const item of list) {
    if (idOf(item)) out.push(item);
    else skippedRef.n += 1;
  }
  return out;
}

export function emptyStores(): Record<BackupStore, unknown[]> {
  const out = {} as Record<BackupStore, unknown[]>;
  for (const s of BACKUP_STORES) out[s] = [];
  return out;
}

export interface BuildBackupArgs {
  stores: Record<BackupStore, unknown[]>;
  meta?: Record<string, unknown>;
  exportedAt?: string;
  /** 本机数据结构版本；默认取 BACKUP_SCHEMA_VERSION */
  schemaVersion?: number;
}

export function buildBackup(args: BuildBackupArgs): Record<string, unknown> {
  const counts: Record<string, number> = {};
  for (const s of BACKUP_STORES) counts[s] = args.stores[s]?.length ?? 0;
  const meta = args.meta ?? {};
  for (const k of Object.keys(meta)) counts[`meta.${k}`] = Array.isArray(meta[k]) ? (meta[k] as unknown[]).length : 1;
  return {
    app: BACKUP_APP,
    format: BACKUP_FORMAT,
    schemaVersion: args.schemaVersion ?? BACKUP_SCHEMA_VERSION,
    exportedAt: args.exportedAt ?? new Date().toISOString(),
    counts,
    data: args.stores,
    meta,
  };
}

/* --------------------------------- 解析 -------------------------------- */

function parseJson(raw: string): unknown {
  try {
    return JSON.parse(raw);
  } catch {
    throw new Error("这个文件不是有效的 JSON，可能不是 FitLoop 的备份");
  }
}

/**
 * 解析备份文件。坏文件抛错（信息面向用户），可容忍的脏数据记 warnings。
 */
export function parseBackup(raw: string | unknown): ParsedBackup {
  const root = typeof raw === "string" ? parseJson(raw) : raw;
  if (!isRecord(root)) throw new Error("备份文件内容不是对象，无法识别");

  const skippedRef = { n: 0 };
  const warnings: string[] = [];
  const stores = emptyStores();
  const meta: Record<string, unknown> = {};

  const isV2 = root.app === BACKUP_APP && isRecord(root.data);
  if (isV2) {
    const data = root.data as Record<string, unknown>;
    for (const s of BACKUP_STORES) stores[s] = sanitizeRecords(data[s], skippedRef);
    if (isRecord(root.meta)) {
      for (const [k, v] of Object.entries(root.meta)) {
        if (v === undefined) continue;
        meta[k] = v;
      }
    }
  } else if (BACKUP_STORES.some((s) => s in root)) {
    // v1：各 store 平铺在顶层
    for (const s of BACKUP_STORES) stores[s] = sanitizeRecords(root[s], skippedRef);
    if (Array.isArray(root.meta)) {
      // v1 丢了 key：只有 customExercises 能可靠认出来（数组且元素有 id+name）
      const looksLikeExercises = root.meta.every(
        (v) => Array.isArray(v) && v.every((e) => isRecord(e) && typeof e.name === "string" && typeof e.id === "string"),
      );
      if (root.meta.length && looksLikeExercises) {
        meta.customExercises = root.meta.flat();
        warnings.push("旧版备份的自定义动作已按 customExercises 恢复");
      } else if (root.meta.length) {
        warnings.push("旧版备份里的 meta 数据无法识别，已跳过（不影响档案与记录）");
      }
    }
    warnings.push("这是旧版（v1）备份文件，已按兼容模式读取");
  } else {
    throw new Error("这不是 FitLoop 的备份文件（缺少可识别的数据段）");
  }

  const format = typeof root.format === "number" ? root.format : 1;
  const schemaVersion =
    typeof root.schemaVersion === "number" ? root.schemaVersion : format === 1 ? 1 : 0;
  const exportedAt = typeof root.exportedAt === "string" ? root.exportedAt : null;

  if (format > BACKUP_FORMAT) {
    warnings.push(
      `备份来自更新的版本（format ${format}），可能有字段读不出来；建议先升级当前应用到最新版再恢复`,
    );
  }
  if (schemaVersion > BACKUP_SCHEMA_VERSION) {
    warnings.push(
      `备份的数据结构版本（${schemaVersion}）比当前应用（${BACKUP_SCHEMA_VERSION}）新，恢复后可能有字段丢失`,
    );
  }

  return { format, schemaVersion, exportedAt, stores, meta, skipped: skippedRef.n, warnings };
}

/* ------------------------------ 合并（默认） ----------------------------- */

/**
 * 按 id 合并：同一 id 只有「导入的记录更新」才覆盖本机，避免用旧备份回滚掉本机新数据。
 * 没有 updatedAt 的一律视为无法比较 → 保留本机。
 */
export function mergeStoreRecords(existing: unknown[], incoming: unknown[]): MergeResult {
  const byId = new Map<string, unknown>();
  for (const e of existing) {
    const id = idOf(e);
    if (id) byId.set(id, e);
  }

  const toWrite: unknown[] = [];
  let added = 0;
  let updated = 0;
  let kept = 0;

  for (const inc of incoming) {
    const id = idOf(inc);
    if (!id) continue;
    const old = byId.get(id);
    if (!old) {
      byId.set(id, inc);
      toWrite.push(inc);
      added += 1;
      continue;
    }
    const a = updatedAtOf(inc);
    const b = updatedAtOf(old);
    if (a && b && a > b) {
      byId.set(id, inc);
      toWrite.push(inc);
      updated += 1;
    } else {
      kept += 1;
    }
  }
  return { toWrite, added, updated, kept };
}

export interface ImportPlan {
  stores: Record<BackupStore, unknown[]>;
  meta: Record<string, unknown>;
  added: number;
  updated: number;
  kept: number;
}

/** 规划一次「合并导入」：算出每个 store 需要写回哪些记录 */
export function planMergeImport(
  parsed: ParsedBackup,
  existing: { stores: Record<BackupStore, unknown[]>; meta: Record<string, unknown> },
): ImportPlan {
  const out = emptyStores();
  const meta: Record<string, unknown> = {};
  let added = 0;
  let updated = 0;
  let kept = 0;

  for (const s of BACKUP_STORES) {
    const r = mergeStoreRecords(existing.stores[s] ?? [], parsed.stores[s]);
    out[s] = r.toWrite;
    added += r.added;
    updated += r.updated;
    kept += r.kept;
  }

  for (const [k, inc] of Object.entries(parsed.meta)) {
    const old = existing.meta[k];
    if (old === undefined) {
      meta[k] = inc;
      continue;
    }
    // 双方都是「带 id 的对象数组」（如自定义动作）时逐条合并；否则保守保留本机
    if (Array.isArray(old) && Array.isArray(inc)) {
      const r = mergeStoreRecords(old, inc);
      if (r.toWrite.length) meta[k] = [...old, ...r.toWrite];
    }
  }

  return { stores: out, meta, added, updated, kept };
}

/** 导入结果的人话摘要 */
export function describeImport(plan: ImportPlan, skipped: number): string {
  const parts = [`新增 ${plan.added} 条`, `更新 ${plan.updated} 条`];
  if (plan.kept) parts.push(`本机已有较新版本、保留 ${plan.kept} 条`);
  if (skipped) parts.push(`跳过 ${skipped} 条无法识别的记录`);
  return parts.join("，");
}