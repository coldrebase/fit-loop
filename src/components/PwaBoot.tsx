"use client";

import { useEffect } from "react";

/**
 * PWA 引导：
 * 1) 注册 Service Worker（离线可用）
 * 2) 记录 iOS「添加到主屏幕」提示是否已看过
 *
 * 只在 https / localhost 下注册；basePath 从环境变量取，静态导出时由
 * scripts/build-static.mjs 注入 NEXT_PUBLIC_BASE_PATH。
 */
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function PwaBoot() {
  useEffect(() => {
    if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) return;
    const secure = location.protocol === "https:" || location.hostname === "localhost" || location.hostname === "127.0.0.1";
    if (!secure) return;

    const url = `${BASE_PATH}/sw.js`;
    const scope = `${BASE_PATH}/`;

    navigator.serviceWorker.register(url, { scope }).catch(() => {
      /* 注册失败不影响正常使用 */
    });
  }, []);

  return null;
}