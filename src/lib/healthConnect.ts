"use client";

/**
 * Health Connect 桥接（仅 Android 原生 App）
 * ---------------------------------------------------------------------------
 * 对应 android/.../HealthConnectPlugin.java。
 * 网页 / PWA 下所有函数返回「不支持」，不会抛错。
 */

import { registerPlugin } from "@capacitor/core";

export interface HcWeight {
  date: string;
  kg: number;
}
export interface HcSleep {
  date: string;
  hours: number;
}
export interface HcHr {
  date: string;
  bpm: number;
}

export interface HcData {
  weights: HcWeight[];
  sleep: HcSleep[];
  restingHeartRate: HcHr[];
}

export type HcStatus = "available" | "update_required" | "unavailable" | "unsupported";

interface HcPlugin {
  available(): Promise<{ status: string }>;
  checkHealthPermissions(): Promise<{ granted: boolean; status: string }>;
  requestHealthPermissions(): Promise<{ granted: boolean; status: string }>;
  openHealthConnect(): Promise<void>;
  readData(options: { days: number }): Promise<HcData>;
}

const plugin = registerPlugin<HcPlugin>("HealthConnect");

function capNative(): boolean {
  const cap = (globalThis as unknown as { Capacitor?: { isNativePlatform?: () => boolean; getPlatform?: () => string } }).Capacitor;
  return !!cap?.isNativePlatform?.() && cap.getPlatform?.() === "android";
}

export function healthConnectSupported(): boolean {
  return capNative();
}

export async function healthConnectStatus(): Promise<HcStatus> {
  if (!capNative()) return "unsupported";
  try {
    const r = await plugin.available();
    if (r.status === "available") return "available";
    if (r.status === "update_required") return "update_required";
    return "unavailable";
  } catch {
    return "unavailable";
  }
}

export async function ensureHealthPermissions(): Promise<boolean> {
  if (!capNative()) return false;
  try {
    const cur = await plugin.checkHealthPermissions();
    if (cur.granted) return true;
    const req = await plugin.requestHealthPermissions();
    return req.granted;
  } catch {
    return false;
  }
}

export async function readHealthConnect(days = 30): Promise<HcData | null> {
  if (!capNative()) return null;
  try {
    return await plugin.readData({ days });
  } catch {
    return null;
  }
}

export async function openHealthConnectSettings(): Promise<void> {
  if (!capNative()) return;
  try {
    await plugin.openHealthConnect();
  } catch {
    /* ignore */
  }
}