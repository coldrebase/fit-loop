/**
 * 健康数据导入（纯逻辑，可单测）
 * ---------------------------------------------------------------------------
 * 浏览器/PWA 无法直接读 HealthKit / Health Connect，这是系统限制。
 * 可行路径是「导出 → 解析」：
 *   - iOS：健康 App → 头像 → 导出所有健康数据 → 解压得到 export.xml
 *   - Android：Health Connect / 第三方（如 Health Sync）导出 JSON 或 CSV
 * 这里只解析能可靠映射到本应用字段的数据：
 *   - 体重  → BodyWeightLog
 *   - 睡眠  → RecoveryLog.sleepHours
 * 静息心率等本应用没有对应字段，只在导入结果里提示，不落库（避免造字段）。
 */

export interface WeightPoint {
  date: string;
  kg: number;
}

export interface SleepPoint {
  date: string;
  hours: number;
}

export interface HeartRatePoint {
  date: string;
  bpm: number;
}

export interface ParsedHealth {
  weights: WeightPoint[];
  sleep: SleepPoint[];
  restingHeartRate: HeartRatePoint[];
  /** 被跳过的记录数（格式/数值不合理） */
  skipped: number;
  /** 解析器识别到的原始记录数 */
  scanned: number;
}

const EMPTY: ParsedHealth = { weights: [], sleep: [], restingHeartRate: [], skipped: 0, scanned: 0 };

function isoDate(s: string): string | null {
  // "2024-01-02 23:10:00 +0800" / "2024-01-02T23:10:00Z" / "2024-01-02"
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(s.trim());
  if (!m) return null;
  return `${m[1]}-${m[2]}-${m[3]}`;
}

function toKg(value: number, unit: string): number | null {
  const u = unit.toLowerCase();
  if (u === "kg" || u === "kilogram" || u === "") return value > 0 && value < 500 ? value : null;
  if (u === "lb" || u === "lbs" || u === "pound") {
    const kg = value * 0.45359237;
    return kg > 0 && kg < 500 ? kg : null;
  }
  if (u === "g") {
    const kg = value / 1000;
    return kg > 0 && kg < 500 ? kg : null;
  }
  return null;
}

const WEIGHT_TYPES = new Set([
  "HKQuantityTypeIdentifierBodyMass",
  "HKQuantityTypeIdentifierBodyMassIndex", // 不算体重，排除
]);

const RHR_TYPE = "HKQuantityTypeIdentifierRestingHeartRate";
const SLEEP_TYPE = "HKCategoryTypeIdentifierSleepAnalysis";

function attrs(line: string): Record<string, string> {
  const out: Record<string, string> = {};
  const re = /([A-Za-z_][\w.:-]*)\s*=\s*"([^"]*)"/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(line))) out[m[1]] = m[2];
  return out;
}

/**
 * Apple 健康 export.xml 的流式解析器。
 * export.xml 里每条 Record 基本占一行，按行处理即可，无需整文件读入内存。
 */
export class AppleHealthParser {
  private buffer = "";
  private weightByDate = new Map<string, number>();
  private sleepByDate = new Map<string, number>();
  private rhrSum = new Map<string, { sum: number; n: number }>();
  private skipped = 0;
  private scanned = 0;

  push(chunk: string): void {
    this.buffer += chunk;
    const lastNl = this.buffer.lastIndexOf("\n");
    if (lastNl < 0) return;
    const complete = this.buffer.slice(0, lastNl);
    this.buffer = this.buffer.slice(lastNl + 1);
    for (const line of complete.split("\n")) this.line(line);
  }

  finish(): ParsedHealth {
    if (this.buffer.trim()) this.line(this.buffer);
    this.buffer = "";
    return {
      weights: [...this.weightByDate.entries()]
        .map(([date, kg]) => ({ date, kg: Math.round(kg * 10) / 10 }))
        .sort((a, b) => (a.date < b.date ? -1 : 1)),
      sleep: [...this.sleepByDate.entries()]
        .map(([date, hours]) => ({ date, hours: Math.round(hours * 10) / 10 }))
        .sort((a, b) => (a.date < b.date ? -1 : 1)),
      restingHeartRate: [...this.rhrSum.entries()]
        .map(([date, v]) => ({ date, bpm: Math.round(v.sum / v.n) }))
        .sort((a, b) => (a.date < b.date ? -1 : 1)),
      skipped: this.skipped,
      scanned: this.scanned,
    };
  }

  private line(raw: string): void {
    const line = raw.trim();
    if (!line.startsWith("<Record")) return;
    this.scanned += 1;
    const a = attrs(line);
    const type = a.type ?? "";
    const start = a.startDate ?? "";
    const date = isoDate(start);
    if (!date) {
      this.skipped += 1;
      return;
    }

    if (type === "HKQuantityTypeIdentifierBodyMass") {
      const kg = toKg(Number(a.value), a.unit ?? "kg");
      if (kg === null) {
        this.skipped += 1;
        return;
      }
      // 同一天多次称重取最后一次（后写入覆盖）
      this.weightByDate.set(date, kg);
      return;
    }

    if (type === RHR_TYPE) {
      const bpm = Number(a.value);
      if (!(bpm >= 25 && bpm <= 220)) {
        this.skipped += 1;
        return;
      }
      const cur = this.rhrSum.get(date) ?? { sum: 0, n: 0 };
      this.rhrSum.set(date, { sum: cur.sum + bpm, n: cur.n + 1 });
      return;
    }

    if (type === SLEEP_TYPE) {
      const v = a.value ?? "";
      // 只统计「睡着」，InBed / Awake 不计入
      if (!v.startsWith("HKCategoryValueSleepAnalysisAsleep")) return;
      const startMs = Date.parse((a.startDate ?? "").replace(" ", "T").replace(" ", ""));
      const endMs = Date.parse((a.endDate ?? "").replace(" ", "T").replace(" ", ""));
      if (!Number.isFinite(startMs) || !Number.isFinite(endMs) || endMs <= startMs) {
        this.skipped += 1;
        return;
      }
      const hours = (endMs - startMs) / 3600000;
      if (hours <= 0 || hours > 24) {
        this.skipped += 1;
        return;
      }
      // 归到醒来那天（endDate），更符合「昨晚睡了多久」的直觉
      const endDate = isoDate(a.endDate ?? "") ?? date;
      this.sleepByDate.set(endDate, (this.sleepByDate.get(endDate) ?? 0) + hours);
      return;
    }
  }
}

/** 通用 CSV：表头包含 date/日期 + weight/体重 | sleep/睡眠 | rhr/静息心率 */
export function parseHealthCsv(text: string): ParsedHealth {
  const lines = text.split(/\r?\n/).filter((l) => l.trim());
  if (lines.length < 2) return { ...EMPTY };

  const header = lines[0].split(",").map((h) => h.trim().toLowerCase());
  const idx = (...names: string[]) => header.findIndex((h) => names.includes(h));
  const iDate = idx("date", "日期", "day");
  const iWeight = idx("weight", "weightkg", "体重", "体重kg");
  const iSleep = idx("sleep", "sleephours", "睡眠", "睡眠小时");
  const iRhr = idx("rhr", "restinghr", "resting_hr", "静息心率");

  if (iDate < 0 || (iWeight < 0 && iSleep < 0 && iRhr < 0)) return { ...EMPTY };

  const weights: WeightPoint[] = [];
  const sleep: SleepPoint[] = [];
  const rhr: HeartRatePoint[] = [];
  let skipped = 0;
  let scanned = 0;

  for (const line of lines.slice(1)) {
    const cols = line.split(",").map((c) => c.trim());
    const date = isoDate(cols[iDate] ?? "");
    if (!date) {
      skipped += 1;
      continue;
    }
    scanned += 1;
    if (iWeight >= 0) {
      const kg = toKg(Number(cols[iWeight]), "kg");
      if (kg !== null) weights.push({ date, kg: Math.round(kg * 10) / 10 });
      else skipped += 1;
    }
    if (iSleep >= 0) {
      const h = Number(cols[iSleep]);
      if (h > 0 && h <= 24) sleep.push({ date, hours: Math.round(h * 10) / 10 });
      else skipped += 1;
    }
    if (iRhr >= 0) {
      const bpm = Number(cols[iRhr]);
      if (bpm >= 25 && bpm <= 220) rhr.push({ date, bpm: Math.round(bpm) });
      else skipped += 1;
    }
  }

  return { weights, sleep, restingHeartRate: rhr, skipped, scanned };
}

/** 根据文件名/内容猜测格式 */
export function detectFormat(fileName: string, head: string): "apple" | "csv" {
  if (/\.xml$/i.test(fileName)) return "apple";
  if (/\.csv$/i.test(fileName)) return "csv";
  return head.includes("<HealthData") || head.includes("<Record") ? "apple" : "csv";
}