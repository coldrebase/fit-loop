"use client";

import { useEffect, useState } from "react";

/**
 * 外观（跟随系统 / 日间 / 夜间）
 * ---------------------------------------------------------------------------
 * 只保留两套对外主题：
 *   日间 = 薄荷（[data-theme="mint"]，也是 :root 之前的默认观感）
 *   夜间 = 夜空小狐（[data-theme="night"]）
 * 其余实验配色（paper / minimal / soft / cream / dark / dark-* ）仍然留在
 * globals.css 里，只能用 ?theme=xxx 一次性预览，不出现在任何界面上。
 *
 * 三种模式：auto（跟随系统，默认）/ light / dark，存在 localStorage.fitloop-mode。
 * auto 会在系统深浅色变化时实时跟着切换。
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
export type ThemeMode = "auto" | "light" | "dark";

const MODE_KEY = "fitloop-mode";
const EVENT = "fitloop-theme-change";
const DARK_QUERY = "(prefers-color-scheme: dark)";

export const MODE_LABEL: Record<ThemeMode, string> = {
  auto: "跟随系统",
  light: "日间",
  dark: "夜间",
};

/** 日间主题：薄荷小熊 */
export const LIGHT_THEME: ThemeName = "mint";
/** 夜间主题：夜空小狐（想换回深色运动款就改成 "dark"） */
export const DARK_THEME: ThemeName = "night";

const DEFAULT_MODE: ThemeMode = "auto";

const META_COLOR: Record<"light" | "dark", string> = {
  light: "#ECFAF6",
  dark: "#201C30",
};

function isTheme(v: string | null | undefined): v is ThemeName {
  return !!v && (THEMES as readonly string[]).includes(v);
}

function isMode(v: string | null | undefined): v is ThemeMode {
  return v === "auto" || v === "light" || v === "dark";
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

/** 系统的深浅色偏好；无 matchMedia（旧环境/SSR）时按日间处理 */
export function systemPrefersDark(): boolean {
  try {
    return window.matchMedia(DARK_QUERY).matches;
  } catch {
    return false;
  }
}

export function getMode(): ThemeMode {
  try {
    const raw = localStorage.getItem(MODE_KEY);
    return isMode(raw) ? raw : DEFAULT_MODE;
  } catch {
    return DEFAULT_MODE;
  }
}

/** 把 auto 解析成真实的浅/深色 */
export function resolveMode(mode: ThemeMode): "light" | "dark" {
  if (mode === "auto") return systemPrefersDark() ? "dark" : "light";
  return mode;
}

export function applyMode(mode: ThemeMode) {
  const resolved = resolveMode(mode);
  document.documentElement.dataset.theme = resolved === "dark" ? DARK_THEME : LIGHT_THEME;

  try {
    localStorage.setItem(MODE_KEY, mode);
  } catch {
    /* 隐私模式下忽略 */
  }
  setMetaThemeColor(META_COLOR[resolved]);
  window.dispatchEvent(new Event(EVENT));
}

/** 读取并订阅当前模式；setMode 会立即生效并持久化 */
export function useThemeMode(): [ThemeMode, (m: ThemeMode) => void] {
  const [mode, setMode] = useState<ThemeMode>(DEFAULT_MODE);

  useEffect(() => {
    setMode(getMode());
    const sync = () => setMode(getMode());
    window.addEventListener(EVENT, sync);
    const mq = window.matchMedia?.(DARK_QUERY);
    mq?.addEventListener?.("change", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      mq?.removeEventListener?.("change", sync);
    };
  }, []);

  return [mode, (m: ThemeMode) => applyMode(m)];
}

export function ThemeBoot() {
  useEffect(() => {
    // ?theme= 只在本次访问生效（一次性预览），不写进存储，避免覆盖用户选的模式
    const preview = new URLSearchParams(window.location.search).get("theme");
    if (isTheme(preview)) {
      document.documentElement.dataset.theme = preview;
      setMetaThemeColor(preview.startsWith("dark") || preview === "night" ? META_COLOR.dark : META_COLOR.light);
      return;
    }
    applyMode(getMode());

    // 跟随系统：只有 auto 模式才跟着系统切换，手选日/夜的不动
    const mq = window.matchMedia?.(DARK_QUERY);
    const onChange = () => {
      if (getMode() === "auto") applyMode("auto");
    };
    mq?.addEventListener?.("change", onChange);
    return () => mq?.removeEventListener?.("change", onChange);
  }, []);

  return null;
}