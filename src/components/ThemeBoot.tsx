"use client";

import { useEffect, useState } from "react";

/**
 * 外观（日间 / 夜间）
 * ---------------------------------------------------------------------------
 * 日间 = 原来的纸感配色（:root 默认）
 * 夜间 = 深色运动配色（[data-theme="dark"]）
 * 选择保存在 localStorage，并在 <html data-theme> 上生效。
 * 另外保留 ?theme= 参数用于预览其他实验配色（paper/minimal/soft/dark-*）。
 */

export const THEMES = [
  "paper",
  "minimal",
  "dark",
  "dark-cyan",
  "dark-orange",
  "dark-purple",
  "soft",
  "cream",
  "mint",
  "night",
] as const;

export type ThemeName = (typeof THEMES)[number];
export type ThemeMode = "light" | "dark";

const MODE_KEY = "fitloop-mode";
const EVENT = "fitloop-theme-change";

const META_COLOR: Record<ThemeMode, string> = {
  light: "#ECFAF6",
  dark: "#0A0C0E",
};

/** 日间默认用「薄荷小熊」主题 */
export const LIGHT_THEME = "mint";

function isTheme(v: string | null | undefined): v is ThemeName {
  return !!v && (THEMES as readonly string[]).includes(v);
}

function setMetaThemeColor(color: string) {
  let meta = document.querySelector('meta[name="theme-color"]');
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("name", "theme-color");
    document.head.appendChild(meta);
  }
  meta.setAttribute("content", color);
}

export function getMode(): ThemeMode {
  try {
    return localStorage.getItem(MODE_KEY) === "dark" ? "dark" : "light";
  } catch {
    return "light";
  }
}

export function applyMode(mode: ThemeMode) {
  const root = document.documentElement;
  root.dataset.theme = mode === "dark" ? "dark" : LIGHT_THEME;

  try {
    localStorage.setItem(MODE_KEY, mode);
  } catch {
    /* 隐私模式下忽略 */
  }
  setMetaThemeColor(META_COLOR[mode]);
  window.dispatchEvent(new Event(EVENT));
}

/** 读取并订阅当前模式；setMode 会立即生效并持久化 */
export function useThemeMode(): [ThemeMode, (m: ThemeMode) => void] {
  const [mode, setMode] = useState<ThemeMode>("light");

  useEffect(() => {
    setMode(getMode());
    const sync = () => setMode(getMode());
    window.addEventListener(EVENT, sync);
    return () => window.removeEventListener(EVENT, sync);
  }, []);

  return [mode, (m: ThemeMode) => applyMode(m)];
}

export function ThemeBoot() {
  useEffect(() => {
    // ?theme= 只在本次访问生效（一次性预览），不写进存储，避免覆盖用户选的日/夜
    const preview = new URLSearchParams(window.location.search).get("theme");
    if (isTheme(preview)) {
      document.documentElement.dataset.theme = preview;
      setMetaThemeColor(preview.startsWith("dark") ? META_COLOR.dark : META_COLOR.light);
      return;
    }
    applyMode(getMode());
  }, []);

  return null;
}