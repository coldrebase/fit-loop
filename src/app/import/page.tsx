"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/components/AppProvider";
import { Loading, toast } from "@/components/ui";
import { AppleHealthParser, detectFormat, parseHealthCsv, type ParsedHealth } from "@/lib/healthImport";
import {
  ensureHealthPermissions,
  healthConnectStatus,
  healthConnectSupported,
  openHealthConnectSettings,
  readHealthConnect,
  type HcStatus,
} from "@/lib/healthConnect";
import { listBodyWeights, listRecovery, saveBodyWeight, saveRecovery } from "@/lib/repo";
import { uid } from "@/lib/utils";

type Phase = "idle" | "reading" | "preview" | "importing" | "done";

interface Summary {
  weightNew: number;
  weightUpdated: number;
  sleepNew: number;
  sleepUpdated: number;
  rhrSkipped: number;
}

export default function ImportPage() {
  const router = useRouter();
  const { ready } = useApp();
  const fileRef = useRef<HTMLInputElement>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [fileName, setFileName] = useState("");
  const [progress, setProgress] = useState(0);
  const [parsed, setParsed] = useState<ParsedHealth | null>(null);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [hcStatus, setHcStatus] = useState<HcStatus>("unsupported");
  const [hcBusy, setHcBusy] = useState(false);

  useEffect(() => {
    if (!healthConnectSupported()) return;
    void healthConnectStatus().then(setHcStatus);
  }, []);

  if (!ready) return <Loading />;

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setPhase("reading");
    setProgress(0);
    setParsed(null);
    setSummary(null);

    try {
      let result: ParsedHealth;
      const head = await file.slice(0, 4096).text();
      const fmt = detectFormat(file.name, head);

      if (fmt === "apple") {
        const parser = new AppleHealthParser();
        const total = file.size || 1;
        let read = 0;
        // 流式读取：export.xml 可能上百 MB，不能整文件读进内存
        const stream = file.stream().pipeThrough(new TextDecoderStream());
        for await (const chunk of stream as unknown as AsyncIterable<string>) {
          parser.push(chunk);
          read += chunk.length;
          setProgress(Math.min(99, Math.round((read / total) * 100)));
        }
        result = parser.finish();
      } else {
        result = parseHealthCsv(await file.text());
      }

      setProgress(100);
      setParsed(result);
      setPhase("preview");
      if (!result.weights.length && !result.sleep.length) {
        toast("没有解析到体重或睡眠数据", "warn");
      }
    } catch (err) {
      setPhase("idle");
      toast(err instanceof Error ? `解析失败：${err.message}` : "解析失败", "err");
    }
  }


  async function syncHealthConnect() {
    setHcBusy(true);
    try {
      const ok = await ensureHealthPermissions();
      if (!ok) {
        toast("没有拿到健康数据权限", "warn");
        return;
      }
      const data = await readHealthConnect(30);
      if (!data) {
        toast("读取失败，请检查 Health Connect 是否已安装", "err");
        return;
      }
      const result: ParsedHealth = {
        weights: data.weights,
        sleep: data.sleep,
        restingHeartRate: data.restingHeartRate,
        skipped: 0,
        scanned: data.weights.length + data.sleep.length + data.restingHeartRate.length,
      };
      setParsed(result);
      setPhase("preview");
      setFileName("Health Connect（最近 30 天）");
      if (!result.weights.length && !result.sleep.length) {
        toast("Health Connect 里没有体重或睡眠记录", "warn");
      }
    } finally {
      setHcBusy(false);
    }
  }

  async function doImport() {
    if (!parsed) return;
    setPhase("importing");
    try {
      const [existingWeights, existingRecovery] = await Promise.all([listBodyWeights(), listRecovery()]);
      const weightByDate = new Map(existingWeights.map((w) => [w.date, w]));
      const recoveryByDate = new Map(existingRecovery.map((r) => [r.date, r]));

      let weightNew = 0;
      let weightUpdated = 0;
      for (const p of parsed.weights) {
        const old = weightByDate.get(p.date);
        await saveBodyWeight({
          id: old ? old.id : uid("bw"),
          date: p.date,
          weightKg: p.kg,
          createdAt: old?.createdAt ?? new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
        if (old) weightUpdated += 1;
        else weightNew += 1;
      }

      let sleepNew = 0;
      let sleepUpdated = 0;
      for (const p of parsed.sleep) {
        const old = recoveryByDate.get(p.date);
        await saveRecovery({
          id: old ? old.id : uid("rec"),
          date: p.date,
          sleepHours: p.hours,
          // 保留用户自己填过的疲劳/酸痛/疼痛
          sleepQuality: old?.sleepQuality,
          fatigue: old?.fatigue,
          soreness: old?.soreness,
          sorenessByMuscle: old?.sorenessByMuscle,
          hasPain: old?.hasPain ?? false,
          painAreas: old?.painAreas,
          painNote: old?.painNote,
          adviceShown: old?.adviceShown,
          createdAt: old?.createdAt ?? new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
        if (old) sleepUpdated += 1;
        else sleepNew += 1;
      }

      setSummary({
        weightNew,
        weightUpdated,
        sleepNew,
        sleepUpdated,
        rhrSkipped: parsed.restingHeartRate.length,
      });
      setPhase("done");
      toast("导入完成", "ok");
    } catch (err) {
      setPhase("preview");
      toast(err instanceof Error ? `导入失败：${err.message}` : "导入失败", "err");
    }
  }

  return (
    <div className="space-y-3 p-4">
      <button className="btn-ghost !px-0" onClick={() => router.push("/me")}>
        ‹ 返回我的
      </button>

      <div className="card">
        <div className="text-[15px] font-medium">从健康 App 导入</div>
        <div className="mt-1.5 text-[12.5px] leading-relaxed text-ink-soft">
          浏览器读不到系统健康数据（HealthKit / Health Connect 只对原生 App 开放），所以采用「导出 → 导入」方式。
          只导入能对上字段的两类数据：<span className="text-ink">体重</span> 与
          <span className="text-ink"> 睡眠时长</span>。
        </div>
      </div>

      <div className="card">
        <div className="section-title">iPhone（Apple 健康）</div>
        <ol className="space-y-1 text-[12.5px] leading-relaxed text-ink-soft">
          <li>1. 打开「健康」App → 右上角头像 → 滑到底「导出所有健康数据」</li>
          <li>2. 得到 `导出.zip`，解压出 `export.xml`</li>
          <li>3. 在下面选择这个 `export.xml`（文件较大属正常，会流式解析）</li>
        </ol>
      </div>

      <div className="card">
        <div className="section-title">Android / 通用 CSV</div>
        <ol className="space-y-1 text-[12.5px] leading-relaxed text-ink-soft">
          <li>1. 用 Health Connect 或 Health Sync 导出 CSV</li>
          <li>
            2. 表头需含：`date`（或 日期），以及 `weight` / `sleep` / `rhr`（或 体重 / 睡眠 / 静息心率）
          </li>
        </ol>
      </div>

      {healthConnectSupported() && (
        <div className="card">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[15px] font-medium">Health Connect</span>
            <span className="text-[12px] text-ink-faint">
              {hcStatus === "available" ? "可用" : hcStatus === "update_required" ? "需更新" : "不可用"}
            </span>
          </div>
          {hcStatus === "available" ? (
            <>
              <div className="text-[12.5px] leading-relaxed text-ink-soft">
                直接读取最近 30 天的体重、睡眠、静息心率，不需要导出文件。
              </div>
              <button className="btn-primary mt-2 w-full" onClick={() => void syncHealthConnect()} disabled={hcBusy}>
                {hcBusy ? "读取中…" : "从 Health Connect 同步"}
              </button>
            </>
          ) : (
            <>
              <div className="text-[12.5px] leading-relaxed text-ink-soft">
                设备上没有可用的 Health Connect。Android 14 起已内置；更早版本需从商店安装。
              </div>
              <button className="btn-secondary mt-2 w-full" onClick={() => void openHealthConnectSettings()}>
                打开 Health Connect
              </button>
            </>
          )}
        </div>
      )}

      <input
        ref={fileRef}
        type="file"
        accept=".xml,.csv,text/xml,text/csv"
        className="hidden"
        onChange={onFile}
      />
      <button className="btn-primary w-full" onClick={() => fileRef.current?.click()} disabled={phase === "reading"}>
        {phase === "reading" ? `解析中… ${progress}%` : "选择文件（export.xml / .csv）"}
      </button>
      {fileName && <div className="text-center text-[11.5px] text-ink-faint">{fileName}</div>}

      {parsed && phase !== "done" && (
        <>
          <div className="card">
            <div className="section-title">解析结果</div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <div className="text-[20px] font-semibold text-ink">{parsed.weights.length}</div>
                <div className="text-[11.5px] text-ink-faint">体重记录</div>
              </div>
              <div>
                <div className="text-[20px] font-semibold text-ink">{parsed.sleep.length}</div>
                <div className="text-[11.5px] text-ink-faint">睡眠记录</div>
              </div>
              <div>
                <div className="text-[20px] font-semibold text-ink">{parsed.restingHeartRate.length}</div>
                <div className="text-[11.5px] text-ink-faint">静息心率</div>
              </div>
            </div>
            <div className="mt-2 text-[11.5px] leading-relaxed text-ink-faint">
              共扫描 {parsed.scanned} 条记录，跳过 {parsed.skipped} 条（格式或数值异常）。
              静息心率本应用暂无字段，只统计不写入。
            </div>
          </div>

          {parsed.weights.length > 0 && (
            <div className="card">
              <div className="section-title">最近体重</div>
              {parsed.weights.slice(-5).reverse().map((w) => (
                <div key={w.date} className="flex justify-between border-t border-dashed border-paper-line py-1.5 text-[13px]">
                  <span className="text-ink-soft">{w.date}</span>
                  <span className="text-ink">{w.kg} kg</span>
                </div>
              ))}
            </div>
          )}

          {parsed.sleep.length > 0 && (
            <div className="card">
              <div className="section-title">最近睡眠</div>
              {parsed.sleep.slice(-5).reverse().map((s) => (
                <div key={s.date} className="flex justify-between border-t border-dashed border-paper-line py-1.5 text-[13px]">
                  <span className="text-ink-soft">{s.date}</span>
                  <span className="text-ink">{s.hours} 小时</span>
                </div>
              ))}
            </div>
          )}

          <button className="btn-primary w-full" onClick={() => void doImport()} disabled={phase === "importing"}>
            {phase === "importing" ? "写入中…" : "导入这些数据"}
          </button>
          <div className="text-center text-[11.5px] text-ink-faint">
            同一天已有记录会被覆盖（体重取最后一次，睡眠取合并时长）
          </div>
        </>
      )}

      {phase === "done" && summary && (
        <>
          <div className="card">
            <div className="text-[15px] font-medium text-moss-700">导入完成</div>
            <div className="mt-2 space-y-1 text-[13px] text-ink-soft">
              <div>
                体重：新增 {summary.weightNew} 条，更新 {summary.weightUpdated} 条
              </div>
              <div>
                睡眠：新增 {summary.sleepNew} 条，更新 {summary.sleepUpdated} 条
              </div>
              <div className="text-ink-faint">静息心率 {summary.rhrSkipped} 条未写入（无对应字段）</div>
            </div>
          </div>
          <button className="btn-secondary w-full" onClick={() => router.push("/progress?tab=body")}>
            查看体重与恢复
          </button>
          <button
            className="btn-ghost w-full"
            onClick={() => {
              setPhase("idle");
              setParsed(null);
              setSummary(null);
              setFileName("");
            }}
          >
            再导入一个文件
          </button>
        </>
      )}
    </div>
  );
}