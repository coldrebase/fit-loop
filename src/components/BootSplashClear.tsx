"use client";

import { useEffect } from "react";

/**
 * 移除服务端渲染的首屏启动图（避免 React 挂载前白屏）。
 * 启动图本身写在 layout 里，纯 HTML+内联样式，不依赖 JS/CSS 加载完成。
 */
export function BootSplashClear() {
  useEffect(() => {
    const el = document.getElementById("boot-splash");
    if (!el) return;
    el.style.opacity = "0";
    const t = setTimeout(() => el.remove(), 320);
    return () => clearTimeout(t);
  }, []);
  return null;
}