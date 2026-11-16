"use client";

/**
 * 本地通知（仅原生 App 生效）
 * ---------------------------------------------------------------------------
 * 网页 / PWA 里所有函数都安全降级为空操作。
 * 提醒规则来自 profile.reminders：
 *   - 饮水提醒：每 waterIntervalMin 分钟，9:00-21:00 之间
 *   - 活动提醒：每 moveIntervalMin 分钟，9:00-21:00 之间
 *   - 训练提醒：每天 trainingTime（HH:mm）
 */

import type { ReminderSettings } from "./types";

export interface ScheduleResult {
  supported: boolean;
  granted: boolean;
  scheduled: number;
  /** 被后端拒绝的原因（便于排查） */
  error?: string;
}

const ID_BASE = { water: 1100, move: 2100, training: 3100 } as const;
const WINDOW = { startHour: 9, endHour: 21 };

function isNative(): boolean {
  const cap = (globalThis as unknown as { Capacitor?: { isNativePlatform?: () => boolean } }).Capacitor;
  return !!cap?.isNativePlatform?.();
}

async function getPlugin() {
  const mod = await import("@capacitor/local-notifications");
  return mod.LocalNotifications;
}

function hhmm(hour: number, minute: number) {
  return { hour, minute };
}

/** 把「每 N 分钟」展开成工作时间窗内的具体时间点（最多 12 条，避免刷屏） */
function intervalSlots(intervalMin: number, limit = 8): { hour: number; minute: number }[] {
  const step = Math.max(30, Math.min(intervalMin, 240)); // 最小 30 分钟，避免过密
  const slots: { hour: number; minute: number }[] = [];
  let total = WINDOW.startHour * 60;
  const end = WINDOW.endHour * 60;
  while (total < end && slots.length < limit) {
    slots.push(hhmm(Math.floor(total / 60), total % 60));
    total += step;
  }
  return slots;
}

export async function syncReminders(reminders: ReminderSettings): Promise<ScheduleResult> {
  if (!isNative()) return { supported: false, granted: false, scheduled: 0 };

  try {
    const LocalNotifications = await getPlugin();

    const perm = await LocalNotifications.checkPermissions();
    let granted = perm.display === "granted";
    if (!granted) {
      const req = await LocalNotifications.requestPermissions();
      granted = req.display === "granted";
    }
    if (!granted) return { supported: true, granted: false, scheduled: 0 };

    const pending = await LocalNotifications.getPending();
    if (pending.notifications.length) {
      await LocalNotifications.cancel({ notifications: pending.notifications.map((n) => ({ id: n.id })) });
    }

    const notifications: {
      id: number;
      title: string;
      body: string;
      schedule: { on: { hour: number; minute: number }; allowWhileIdle?: boolean };
      smallIcon?: string;
    }[] = [];

    if (reminders.waterEnabled) {
      intervalSlots(reminders.waterIntervalMin).forEach((slot, i) => {
        notifications.push({
          id: ID_BASE.water + i,
          title: "该喝水了",
          body: "补 200-300 ml，别等到口渴。",
          schedule: { on: slot, allowWhileIdle: true },
        });
      });
    }

    if (reminders.moveEnabled) {
      intervalSlots(reminders.moveIntervalMin).forEach((slot, i) => {
        notifications.push({
          id: ID_BASE.move + i,
          title: "起身动一动",
          body: "站起来 2 分钟，活动肩颈与髋。",
          schedule: { on: slot, allowWhileIdle: true },
        });
      });
    }

    if (reminders.trainingEnabled && reminders.trainingTime) {
      const m = /^(\d{1,2}):(\d{2})$/.exec(reminders.trainingTime);
      if (m) {
        notifications.push({
          id: ID_BASE.training,
          title: "今天该练了",
          body: "打开 FitLoop，按计划开始今天的训练。",
          schedule: { on: hhmm(Number(m[1]), Number(m[2])), allowWhileIdle: true },
        });
      }
    }

    if (notifications.length) {
      await LocalNotifications.schedule({ notifications });
    }

    return { supported: true, granted: true, scheduled: notifications.length };
  } catch (err) {
    return {
      supported: true,
      granted: false,
      scheduled: 0,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

/** 关闭全部提醒（用户在设置里全关时调用） */
export async function clearReminders(): Promise<void> {
  if (!isNative()) return;
  try {
    const LocalNotifications = await getPlugin();
    await LocalNotifications.cancel({ notifications: [] });
  } catch {
    /* ignore */
  }
}

export function notificationsSupported(): boolean {
  return isNative();
}