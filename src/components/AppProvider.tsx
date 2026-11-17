"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import * as db from "@/lib/db";
import * as repo from "@/lib/repo";
import { DataErrorBanner, toast } from "./ui";
import { buildDemoEntries, buildDemoPlan, buildDemoRecovery, buildDemoSessions, buildDemoWeights } from "@/lib/demo";
import type {
  BodyWeightLog,
  Food,
  FoodEntry,
  MealPlan,
  RecoveryLog,
  ShoppingItem,
  UserProfile,
  Venue,
  WaterLog,
  WorkoutPlan,
  WorkoutSession,
} from "@/lib/types";

interface Snapshot {
  profile: UserProfile;
  venues: Venue[];
  plans: WorkoutPlan[];
  sessions: WorkoutSession[];
  entries: FoodEntry[];
  foods: Food[];
  recovery: RecoveryLog[];
  weights: BodyWeightLog[];
  water: WaterLog[];
  shopping: ShoppingItem[];
  mealPlans: MealPlan[];
}

interface Ctx extends Snapshot {
  ready: boolean;
  error: string | null;
  /** indexeddb | memory（降级） */
  persistence: "indexeddb" | "memory";
  activeVenue?: Venue;
  activePlan?: WorkoutPlan;
  hasDemo: boolean;
  refresh: () => Promise<void>;
  seedDemo: () => Promise<void>;
  clearDemo: () => Promise<void>;
  exportJson: () => Promise<void>;
  importData: (text: string, mode: "merge" | "replace") => Promise<repo.ImportSummary>;
  wipe: () => Promise<void>;
  /* actions */
  saveProfile: (p: UserProfile) => Promise<void>;
  saveVenue: (v: Venue) => Promise<void>;
  deleteVenue: (id: string) => Promise<void>;
  setDefaultVenue: (id: string) => Promise<void>;
  savePlan: (p: WorkoutPlan) => Promise<void>;
  deletePlan: (id: string) => Promise<void>;
  saveSession: (s: WorkoutSession) => Promise<void>;
  deleteSession: (id: string) => Promise<void>;
  saveEntry: (e: FoodEntry) => Promise<void>;
  deleteEntry: (id: string) => Promise<void>;
  saveFood: (f: Food) => Promise<void>;
  saveMealPlan: (m: MealPlan) => Promise<void>;
  saveShopping: (i: ShoppingItem) => Promise<void>;
  deleteShopping: (id: string) => Promise<void>;
  saveRecovery: (r: RecoveryLog) => Promise<void>;
  saveWeight: (w: BodyWeightLog) => Promise<void>;
  addWater: (date: string, ml: number) => Promise<void>;
}

const AppCtx = createContext<Ctx | null>(null);

export function useApp(): Ctx {
  const c = useContext(AppCtx);
  if (!c) throw new Error("useApp 必须在 AppProvider 内使用");
  return c;
}

const EMPTY: Snapshot = {
  profile: repo.DEFAULT_PROFILE,
  venues: [],
  plans: [],
  sessions: [],
  entries: [],
  foods: [],
  recovery: [],
  weights: [],
  water: [],
  shopping: [],
  mealPlans: [],
};

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [snap, setSnap] = useState<Snapshot>(EMPTY);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [writeError, setWriteError] = useState<string | null>(null);
  const [dismissedError, setDismissedError] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  /** 递增的加载序号：并发 load 时只接受最后一次的结果，避免旧快照覆盖新快照 */
  const loadSeq = useRef(0);

  const load = useCallback(async () => {
    const seq = ++loadSeq.current;
    try {
      const [profile, venues, plans, sessions, entries, foods, recovery, weights, water, shopping, mealPlans] =
        await Promise.all([
          repo.getProfile(),
          repo.listVenues(),
          repo.listPlans(),
          repo.listSessions(),
          repo.listEntries(),
          repo.listFoods(),
          repo.listRecovery(),
          repo.listBodyWeights(),
          repo.listWater(),
          repo.listShopping(),
          repo.listMealPlans(),
        ]);
      if (seq !== loadSeq.current) return;
      setSnap({ profile, venues, plans, sessions, entries, foods, recovery, weights, water, shopping, mealPlans });
      setError(null);
      setDismissedError(null);
    } catch (e) {
      if (seq !== loadSeq.current) return;
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      if (seq === loadSeq.current) setReady(true);
    }
  }, []);

  useEffect(() => {
    void load();
    const unsub = db.subscribe(() => {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => void load(), 120);
    });
    return () => {
      unsub();
      if (timer.current) clearTimeout(timer.current);
    };
  }, [load]);

  const refresh = useCallback(async () => {
    await load();
  }, [load]);

  /**
   * 写入失败必须让用户当场看见：以前写失败只落到内存 Map，
   * 界面照旧提示「已保存」，刷新即丢，用户永远不知道该补导出。
   */
  useEffect(() => {
    const msg = db.getLastWriteError();
    if (msg) setWriteError(msg);
    return db.onWriteError((m) => {
      setWriteError(m);
      toast("这条改动没写进本地数据库（可能空间不足或被隐私模式限制），刷新会丢", "err");
    });
  }, []);

  /** 下载一份 JSON 备份；清空数据前会先调用它 */
  const downloadBackup = useCallback(async () => {
    const data = await repo.exportUserData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `fitloop-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    // 立即 revoke 可能取消下载，延后释放更稳妥
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }, []);

  const persistence: "indexeddb" | "memory" = db.isUsingFallback() ? "memory" : "indexeddb";

  const activeVenue = useMemo(
    () => snap.venues.find((v) => v.isDefault) ?? snap.venues[0],
    [snap.venues],
  );
  const activePlan = useMemo(
    () => snap.plans.find((p) => p.active) ?? snap.plans[0],
    [snap.plans],
  );
  const hasDemo = useMemo(
    () => repo.hasAnyDemo(snap.venues, snap.sessions, snap.entries),
    [snap.venues, snap.sessions, snap.entries],
  );

  const value: Ctx = {
    ...snap,
    ready,
    error,
    persistence,
    activeVenue,
    activePlan,
    hasDemo,
    refresh,
    seedDemo: async () => {
      const plan = buildDemoPlan();
      await repo.savePlan(plan);
      for (const s of buildDemoSessions()) await repo.saveSession(s);
      for (const w of buildDemoWeights()) await repo.saveBodyWeight(w);
      for (const e of buildDemoEntries()) await repo.saveEntry(e);
      for (const r of buildDemoRecovery()) await repo.saveRecovery(r);
      await refresh();
    },
    clearDemo: async () => {
      await repo.clearDemoData();
      await refresh();
    },
    exportJson: async () => {
      await downloadBackup();
    },
    importData: async (text, mode) => {
      const summary = await repo.importUserData(text, mode);
      await refresh();
      return summary;
    },
    wipe: async () => {
      // 破坏性操作前先落一份文件备份：文件在用户下载目录，清库不会连它一起删。
      await downloadBackup();
      await repo.wipeUserData();
      await refresh();
    },
    saveProfile: async (p) => {
      await repo.saveProfile(p);
    },
    saveVenue: async (v) => {
      await repo.saveVenue(v);
    },
    deleteVenue: async (id) => {
      await repo.deleteVenue(id);
    },
    setDefaultVenue: async (id) => {
      await repo.setDefaultVenue(id);
    },
    savePlan: async (p) => {
      await repo.savePlan(p);
    },
    deletePlan: async (id) => {
      await repo.deletePlan(id);
    },
    saveSession: async (s) => {
      await repo.saveSession(s);
    },
    deleteSession: async (id) => {
      await repo.deleteSession(id);
    },
    saveEntry: async (e) => {
      await repo.saveEntry(e);
    },
    deleteEntry: async (id) => {
      await repo.deleteEntry(id);
    },
    saveFood: async (f) => {
      await repo.saveFood(f);
    },
    saveMealPlan: async (m) => {
      await repo.saveMealPlan(m);
    },
    saveShopping: async (i) => {
      await repo.saveShoppingItem(i);
    },
    deleteShopping: async (id) => {
      await repo.deleteShoppingItem(id);
    },
    saveRecovery: async (r) => {
      await repo.saveRecovery(r);
    },
    saveWeight: async (w) => {
      await repo.saveBodyWeight(w);
    },
    addWater: async (date, ml) => {
      await repo.addWater(date, ml);
    },
  };

  const errorKey = error ? `read:${error}` : writeError ? `write:${writeError}` : null;
  const showBanner = errorKey !== null && errorKey !== dismissedError;

  return (
    <AppCtx.Provider value={value}>
      {showBanner && (
        <DataErrorBanner
          title={error ? "本地数据读取异常" : "写入失败"}
          hint={
            error
              ? "部分记录可能未显示。可以重试，或检查浏览器存储权限 / 剩余空间。"
              : "这次改动只在本会话内存里，刷新后会丢失。建议先导出备份，再清理浏览器空间后重新保存。"
          }
          message={(error ?? writeError) as string}
          onRetry={() => {
            setDismissedError(null);
            void refresh();
          }}
          onDismiss={() => setDismissedError(errorKey)}
        />
      )}
      {children}
    </AppCtx.Provider>
  );
}
