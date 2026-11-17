"use client";

import { useRef, useState } from "react";
import { useApp } from "./AppProvider";
import { parseBackup, type ParsedBackup } from "@/lib/backup";
import { Modal, toast } from "./ui";

/**
 * 从备份文件恢复
 * ---------------------------------------------------------------------------
 * 这是「换机 / 清缓存」唯一的救命通道：之前只有导出没有导入，
 * 用户拿到的 JSON 等于一张废纸。
 * 默认走合并（按 id + updatedAt 判断，绝不把本机更新的记录回滚成旧值），
 * 覆盖模式必须再点一次确认。
 */
function summarize(parsed: ParsedBackup): { label: string; value: number }[] {
  const rows: { label: string; value: number }[] = [
    { label: "训练记录", value: parsed.stores.sessions.length },
    { label: "饮食记录", value: parsed.stores.foodEntries.length },
    { label: "体重记录", value: parsed.stores.bodyWeights.length },
    { label: "场馆", value: parsed.stores.venues.length },
    { label: "训练计划", value: parsed.stores.plans.length },
    { label: "自定义食物", value: parsed.stores.foods.length },
  ];
  const custom = parsed.meta.customExercises;
  if (Array.isArray(custom)) rows.push({ label: "自定义动作", value: custom.length });
  return rows;
}

export function BackupRestore() {
  const { importData } = useApp();
  const fileRef = useRef<HTMLInputElement>(null);
  const [pending, setPending] = useState<{ name: string; text: string; parsed: ParsedBackup } | null>(null);
  const [confirmReplace, setConfirmReplace] = useState(false);
  const [busy, setBusy] = useState(false);

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    // 允许再次选择同一个文件
    e.target.value = "";
    if (!file) return;
    try {
      const text = await file.text();
      const parsed = parseBackup(text);
      setPending({ name: file.name, text, parsed });
      setConfirmReplace(false);
    } catch (err) {
      toast(err instanceof Error ? err.message : "这个文件读不出来", "err");
    }
  }

  async function run(mode: "merge" | "replace") {
    if (!pending) return;
    setBusy(true);
    try {
      const summary = await importData(pending.text, mode);
      toast(summary.message, "ok");
      if (summary.warnings.length) {
        // 只提示第一条，避免刷屏；完整信息在弹窗里已经显示过
        toast(summary.warnings[0], "warn");
      }
      setPending(null);
      setConfirmReplace(false);
    } catch (err) {
      toast(err instanceof Error ? `恢复失败：${err.message}` : "恢复失败", "err");
    } finally {
      setBusy(false);
    }
  }

  const rows = pending ? summarize(pending.parsed) : [];
  const total = rows.reduce((n, r) => n + r.value, 0);

  return (
    <>
      <input ref={fileRef} type="file" accept=".json,application/json" className="hidden" onChange={onFile} />
      <button className="btn-secondary w-full" onClick={() => fileRef.current?.click()}>
        从备份文件恢复
      </button>

      <Modal
        open={!!pending}
        onClose={() => {
          if (!busy) {
            setPending(null);
            setConfirmReplace(false);
          }
        }}
        title="从备份恢复"
        footer={
          <div className="flex gap-2">
            <button
              className="btn-secondary flex-1"
              disabled={busy}
              onClick={() => {
                setPending(null);
                setConfirmReplace(false);
              }}
            >
              取消
            </button>
            {confirmReplace ? (
              <button className="btn-danger flex-1" disabled={busy} onClick={() => void run("replace")}>
                {busy ? "写入中…" : "确认覆盖"}
              </button>
            ) : (
              <button className="btn-primary flex-1" disabled={busy} onClick={() => void run("merge")}>
                {busy ? "写入中…" : "合并导入"}
              </button>
            )}
          </div>
        }
      >
        {pending && (
          <div className="space-y-3">
            <div className="truncate text-[12.5px] text-ink-faint">{pending.name}</div>

            <div className="grid grid-cols-3 gap-2 text-center">
              {rows.map((r) => (
                <div key={r.label} className="rounded-xl border border-paper-line px-2 py-2">
                  <div className="text-[17px] font-semibold tabular-nums text-ink">{r.value}</div>
                  <div className="text-[11px] text-ink-faint">{r.label}</div>
                </div>
              ))}
            </div>

            <div className="rounded-lg bg-paper px-2.5 py-2 text-[12px] leading-relaxed text-ink-soft">
              {total === 0
                ? "这个备份里没有可恢复的记录。"
                : `共 ${total} 条记录。合并导入只补缺和更新：同一 id 以 updatedAt 较新的为准，本机更新的记录不会被旧备份覆盖。`}
            </div>

            {pending.parsed.warnings.length > 0 && (
              <ul className="space-y-1 rounded-lg border border-warn/30 bg-warn/5 px-2.5 py-2 text-[12px] leading-relaxed text-ink-soft">
                {pending.parsed.warnings.map((w) => (
                  <li key={w}>· {w}</li>
                ))}
              </ul>
            )}

            {!confirmReplace ? (
              <button
                className="text-[12px] text-alert underline"
                onClick={() => setConfirmReplace(true)}
                disabled={total === 0}
              >
                改用覆盖恢复（先清空本机数据）
              </button>
            ) : (
              <div className="rounded-lg border border-alert/30 bg-alert/5 px-2.5 py-2 text-[12px] leading-relaxed text-alert">
                覆盖会把本机现有数据全部清空再写入备份内容，无法撤销。
                本机比备份新的记录会丢失 —— 确认要继续吗？
              </div>
            )}
          </div>
        )}
      </Modal>
    </>
  );
}