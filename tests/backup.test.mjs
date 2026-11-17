import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  BACKUP_FORMAT,
  buildBackup,
  mergeStoreRecords,
  parseBackup,
  planMergeImport,
} from "./.build/lib.mjs";

const rec = (id, updatedAt) => ({ id, updatedAt, name: id });

function sampleStores() {
  return {
    profile: [{ id: "me", displayName: "我", updatedAt: "2026-11-01T00:00:00.000Z" }],
    venues: [rec("v1", "2026-11-01T00:00:00.000Z")],
    plans: [rec("p1", "2026-11-01T00:00:00.000Z")],
    sessions: [rec("s1", "2026-11-10T00:00:00.000Z"), rec("s2", "2026-11-11T00:00:00.000Z")],
    foods: [],
    foodEntries: [rec("e1", "2026-11-11T00:00:00.000Z")],
    mealPlans: [],
    shopping: [],
    recovery: [],
    bodyWeights: [rec("w1", "2026-11-11T00:00:00.000Z")],
    water: [],
  };
}

describe("备份文件：导出 / 解析", () => {
  it("v2 导出能被原样解析回来（含 meta 的 key）", () => {
    const stores = sampleStores();
    const meta = { customExercises: [{ id: "x1", name: "自定义动作" }] };
    const envelope = buildBackup({ stores, meta, exportedAt: "2026-11-17T00:00:00.000Z" });

    assert.equal(envelope.app, "fitloop");
    assert.equal(envelope.format, BACKUP_FORMAT);
    assert.equal(envelope.counts.sessions, 2);

    const parsed = parseBackup(JSON.stringify(envelope));
    assert.equal(parsed.format, BACKUP_FORMAT);
    assert.equal(parsed.exportedAt, "2026-11-17T00:00:00.000Z");
    assert.equal(parsed.stores.sessions.length, 2);
    assert.equal(parsed.stores.bodyWeights.length, 1);
    assert.deepEqual(parsed.meta.customExercises, meta.customExercises);
    assert.equal(parsed.skipped, 0);
    assert.equal(parsed.warnings.length, 0);
  });

  it("v1 旧文件（顶层平铺 + exportedAt/note 数组）仍然可读", () => {
    const legacy = {
      profile: [{ id: "me", displayName: "旧档案" }],
      sessions: [{ id: "s1", title: "全身 A" }],
      meta: [[{ id: "x1", name: "自建动作" }]],
      exportedAt: ["2026-10-20T00:00:00.000Z"],
      note: ["本文件由 FitLoop 导出"],
    };
    const parsed = parseBackup(JSON.stringify(legacy));
    assert.equal(parsed.format, 1);
    assert.equal(parsed.exportedAt, null, "v1 的 exportedAt 是数组，不该当成时间戳");
    assert.equal(parsed.stores.profile[0].displayName, "旧档案");
    assert.equal(parsed.stores.sessions.length, 1);
    assert.deepEqual(parsed.meta.customExercises, [{ id: "x1", name: "自建动作" }]);
    assert.ok(parsed.warnings.some((w) => w.includes("旧版")));
  });

  it("坏数据只跳过、不炸整份文件", () => {
    const envelope = buildBackup({
      stores: { ...sampleStores(), sessions: [{ id: "s1" }, { title: "没有 id" }, null, "x"] },
    });
    const parsed = parseBackup(JSON.stringify(envelope));
    assert.equal(parsed.stores.sessions.length, 1);
    assert.equal(parsed.skipped, 3);
  });

  it("不是 FitLoop 备份 / 不是 JSON 都给出明确错误", () => {
    assert.throws(() => parseBackup("{"), /不是有效的 JSON/);
    assert.throws(() => parseBackup('{"hello":1}'), /不是 FitLoop 的备份/);
    assert.throws(() => parseBackup("[]"), /不是对象/);
  });

  it("更高的 schemaVersion 会警告，而不是静默接受", () => {
    const envelope = buildBackup({ stores: sampleStores(), schemaVersion: 99 });
    const parsed = parseBackup(JSON.stringify(envelope));
    assert.ok(parsed.warnings.some((w) => w.includes("数据结构版本")));
  });
});

describe("备份恢复：合并规则", () => {
  it("同一 id 里：导入更新才覆盖，本机更新则保留", () => {
    const existing = [
      { id: "a", updatedAt: "2026-11-10T00:00:00.000Z" },
      { id: "b", updatedAt: "2026-11-20T00:00:00.000Z" },
    ];
    const incoming = [
      { id: "a", updatedAt: "2026-11-15T00:00:00.000Z" }, // 更新 → 覆盖
      { id: "b", updatedAt: "2026-11-01T00:00:00.000Z" }, // 更旧 → 保留本机
      { id: "c" }, // 新增（无 updatedAt 也不影响新增）
    ];
    const r = mergeStoreRecords(existing, incoming);
    assert.deepEqual(
      r.toWrite.map((x) => x.id),
      ["a", "c"],
    );
    assert.deepEqual([r.added, r.updated, r.kept], [1, 1, 1]);
  });

  it("没有 updatedAt 的冲突记录不覆盖本机（宁可少导入）", () => {
    const r = mergeStoreRecords([{ id: "a", name: "本机" }], [{ id: "a", name: "备份" }]);
    assert.equal(r.toWrite.length, 0);
    assert.equal(r.kept, 1);
  });

  it("完整的合并计划：store 逐条合并 + meta 按 key 合并", () => {
    const parsed = parseBackup(
      JSON.stringify(
        buildBackup({
          stores: {
            ...sampleStores(),
            sessions: [
              { id: "s1", updatedAt: "2026-11-01T00:00:00.000Z" }, // 旧 → 保留
              { id: "s9", updatedAt: "2026-11-12T00:00:00.000Z" }, // 新 → 写入
            ],
          },
          meta: { customExercises: [{ id: "x2", name: "新动作", updatedAt: "2026-11-12T00:00:00.000Z" }] },
        }),
      ),
    );
    const existing = {
      stores: { ...sampleStores(), sessions: [{ id: "s1", updatedAt: "2026-11-10T00:00:00.000Z" }] },
      meta: { customExercises: [{ id: "x1", name: "已有动作", updatedAt: "2026-11-01T00:00:00.000Z" }] },
    };
    const plan = planMergeImport(parsed, existing);
    assert.deepEqual(
      plan.stores.sessions.map((s) => s.id),
      ["s9"],
    );
    assert.deepEqual(
      plan.meta.customExercises.map((x) => x.id).sort(),
      ["x1", "x2"],
      "meta 里的数组要按条目合并，而不是整组覆盖",
    );
    assert.ok(plan.added > 0);
    assert.ok(plan.kept >= 1);
  });
});