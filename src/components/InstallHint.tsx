"use client";

import { useEffect, useState } from "react";
import { INSTALLABLE_EVENT, promptInstall } from "./PwaBoot";
import { toast } from "./ui";

/**
 * 首次打开的「添加到主屏幕」引导条
 * ---------------------------------------------------------------------------
 * - 已经以独立应用运行（standalone）时不显示
 * - 用户点过「不再提示」后写入 localStorage，90 天内不再打扰
 * - Android/Chrome 能拿到 beforeinstallprompt 时给「一键安装」，iOS 只给图步骤
 * - 延迟 1.8s 出现，避免和首屏渲染抢注意力
 */

const HINT_KEY = "fitloop-install-hint";
const SNOOZE_DAYS = 90;
const DELAY_MS = 1800;

type Mode = "ios" | "android" | "other";

function detectMode(): Mode {
  const ua = navigator.userAgent;
  if (/iPhone|iPad|iPod/i.test(ua)) return "ios";
  if (/Android/i.test(ua)) return "android";
  return "other";
}

function isStandalone(): boolean {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as unknown as { standalone?: boolean }).standalone === true
  );
}

function snoozed(): boolean {
  try {
    const raw = localStorage.getItem(HINT_KEY);
    if (!raw) return false;
    const at = Number(raw);
    if (!Number.isFinite(at)) return false;
    return Date.now() - at < SNOOZE_DAYS * 24 * 3600 * 1000;
  } catch {
    return false;
  }
}

function snooze() {
  try {
    localStorage.setItem(HINT_KEY, String(Date.now()));
  } catch {
    /* ignore */
  }
}

export function InstallHint() {
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState<Mode>("other");
  const [canPrompt, setCanPrompt] = useState(false);

  useEffect(() => {
    if (isStandalone() || snoozed()) return;
    setMode(detectMode());

    const sync = () => setCanPrompt(!!window.__fitloopInstallPrompt);
    sync();
    window.addEventListener(INSTALLABLE_EVENT, sync);

    const t = setTimeout(() => setShow(true), DELAY_MS);
    return () => {
      clearTimeout(t);
      window.removeEventListener(INSTALLABLE_EVENT, sync);
    };
  }, []);

  if (!show) return null;

  const dismiss = (remember: boolean) => {
    if (remember) snooze();
    setShow(false);
  };

  return (
    <div
      className="fixed inset-x-0 z-40 mx-auto w-full max-w-[560px] px-3"
      style={{ bottom: "calc(var(--safe-bottom, 0px) + 76px)" }}
      role="dialog"
      aria-label="安装到主屏幕提示"
    >
      <div className="card-tight flex items-start gap-3 border-moss-600/25 bg-paper-card shadow-lift">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-moss-600 text-[15px] font-semibold text-white">
          F
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[13.5px] font-medium text-ink">把 FitLoop 装到主屏幕</div>
          <div className="mt-0.5 text-[12px] leading-relaxed text-ink-soft">
            {mode === "ios" ? (
              <>
                Safari 底部点 <span className="text-ink">分享</span> → 选
                <span className="text-ink"> 添加到主屏幕</span>，之后全屏打开、断网也能用。
              </>
            ) : mode === "android" ? (
              <>
                浏览器菜单里选 <span className="text-ink">安装应用</span> 或
                <span className="text-ink"> 添加到主屏幕</span>。
              </>
            ) : (
              <>用手机浏览器打开后，在菜单里选「添加到主屏幕 / 安装应用」。</>
            )}
          </div>
          <div className="mt-2 flex items-center gap-2">
            {canPrompt && (
              <button
                className="btn-primary !px-3 !py-1.5 !text-[12.5px]"
                onClick={async () => {
                  const r = await promptInstall();
                  if (r === "accepted") {
                    toast("已开始安装", "ok");
                    dismiss(true);
                  } else if (r === "dismissed") {
                    dismiss(false);
                  } else {
                    toast("请按提示手动添加", "info");
                  }
                }}
              >
                一键安装
              </button>
            )}
            <button className="btn-ghost !px-2 !py-1.5 !text-[12.5px]" onClick={() => dismiss(false)}>
              稍后
            </button>
            <button className="btn-ghost !px-2 !py-1.5 !text-[12.5px] text-ink-faint" onClick={() => dismiss(true)}>
              不再提示
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}