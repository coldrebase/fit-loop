"use client";

import { useEffect } from "react";

/**
 * PWA 引导：
 * 1) 注册 Service Worker（离线可用）
 * 2) 捕获 beforeinstallprompt，供「我的 → 安装到手机」调用
 *
 * 只在 https / localhost 下注册；basePath 由构建脚本注入 NEXT_PUBLIC_BASE_PATH。
 */

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

type InstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

declare global {
  interface Window {
    __fitloopInstallPrompt?: InstallPromptEvent;
  }
}

export const INSTALLABLE_EVENT = "fitloop-installable";

export function PwaBoot() {
  useEffect(() => {
    if (typeof navigator !== "undefined" && "serviceWorker" in navigator) {
      const secure =
        location.protocol === "https:" || location.hostname === "localhost" || location.hostname === "127.0.0.1";
      if (secure) {
        navigator.serviceWorker.register(`${BASE_PATH}/sw.js`, { scope: `${BASE_PATH}/` }).catch(() => {
          /* 注册失败不影响正常使用 */
        });
      }
    }

    const onPrompt = (e: Event) => {
      e.preventDefault();
      window.__fitloopInstallPrompt = e as InstallPromptEvent;
      window.dispatchEvent(new Event(INSTALLABLE_EVENT));
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    return () => window.removeEventListener("beforeinstallprompt", onPrompt);
  }, []);

  return null;
}

/** 触发浏览器原生安装弹窗；返回是否真的弹了 */
export async function promptInstall(): Promise<"accepted" | "dismissed" | "unsupported"> {
  const evt = window.__fitloopInstallPrompt;
  if (!evt) return "unsupported";
  await evt.prompt();
  const choice = await evt.userChoice;
  window.__fitloopInstallPrompt = undefined;
  return choice.outcome;
}