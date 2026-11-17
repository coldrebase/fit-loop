"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/components/AppProvider";
import { MacroRing, type MacroSlice } from "@/components/MacroRing";
import { Onboarding } from "@/components/Onboarding";
import { WorkoutRunner } from "@/components/WorkoutRunner";
import { Chip, DemoBadge, Loading, toast } from "@/components/ui";
import { SLOT_LABEL, nutrientsFor, targetsFor } from "@/lib/nutrition";
import { newSession } from "@/lib/session";
import { EXERCISE_MAP } from "@/lib/seed/exercises";
import { FOOD_MAP } from "@/lib/seed/foods";
import { addDays, cx, isoDateOf, startOfWeekISO, todayISO, weekdayCN, weekdayOf } from "@/lib/utils";

/**
 * 今日页
 * ---------------------------------------------------------------------------
 * 只回答三个问题（其余收进各自的页）：
 *   1. 现在做什么      → 一个按钮
 *   2. 今天还能吃多少  → 热量环 + 一句人话
 *   3. 比上周好在哪    → 一条训练次数对比
 * 数据全部来自 lib，不在这里做任何估算；数据不足时只陈述事实，不下结论。
 */
export default function TodayPage() {
  const router = useRouter();
  const {
    ready,
    profile,
    activePlan,
    activeVenue,
    sessions,
    entries,
    weights,
    water,
    foods,
    saveProfile,
    saveSession,
    saveWeight,
    addWater,
    seedDemo,
  } = useApp();
  const [running, setRunning] = useState<import("@/lib/types").WorkoutSession | null>(null);
  const [showOnboard, setShowOnboard] = useState(false);

  const today = todayISO();
  const wd = weekdayOf(today);

  useEffect(() => {
    if (ready && !profile.onboarded) setShowOnboard(true);
  }, [ready, profile.onboarded]);

  const inProgress = useMemo(() => sessions.find((s) => s.status === "in_progress"), [sessions]);
  const todayDay = activePlan?.days.find((d) => d.weekday === wd);
  const todayEntries = useMemo(() => entries.filter((e) => e.date === today), [entries, today]);
  const targets = useMemo(() => targetsFor(profile), [profile]);

  const totals = useMemo(() => {
    return todayEntries.reduce(
      (acc, e) => {
        // 内置库走 FOOD_MAP，用户自建食物只存在 foods store 里；两者都要查，
        // 否则自建食物的热量会被静默按 0 计入。
        const food = e.foodId ? (FOOD_MAP[e.foodId] ?? foods.find((f) => f.id === e.foodId)) : undefined;
        const n = nutrientsFor(e, food?.per100g ?? { kcal: 0, proteinG: 0, carbG: 0, fatG: 0 });
        return {
          kcal: acc.kcal + n.kcal,
          proteinG: acc.proteinG + n.proteinG,
          carbG: acc.carbG + n.carbG,
          fatG: acc.fatG + n.fatG,
        };
      },
      { kcal: 0, proteinG: 0, carbG: 0, fatG: 0 },
    );
  }, [todayEntries, foods]);

  const todayWater = water.find((w) => w.date === today)?.ml ?? 0;
  const latestWeight = weights[weights.length - 1];
  const waterTarget = Math.round(profile.weightKg * 35);

  /* --------------------------- 还能吃多少（一句人话） -------------------------- */
  const remainKcal = Math.round(targets.kcal - totals.kcal);
  const proteinLeft = Math.max(0, Math.round(targets.proteinG - totals.proteinG));
  const eatLine =
    todayEntries.length === 0
      ? `今天还没记录，目标是 ${targets.kcal} kcal——先记一餐就有数了。`
      : remainKcal >= 0
        ? proteinLeft >= 15
          ? `今天还能吃 ${remainKcal} kcal，蛋白还差 ${proteinLeft} g。`
          : `今天还能吃 ${remainKcal} kcal，蛋白已经够了。`
        : `今天超出目标 ${-remainKcal} kcal。不用补偿性节食，保持规律就行。`;

  const slots = new Set(todayEntries.map((e) => e.slot)).size;

  const macros: MacroSlice[] = [
    { label: "蛋白质", value: totals.proteinG, target: targets.proteinG, stroke: "stroke-macro-protein", dot: "bg-macro-protein" },
    { label: "碳水", value: totals.carbG, target: targets.carbG, stroke: "stroke-macro-carb", dot: "bg-macro-carb" },
    { label: "脂肪", value: totals.fatG, target: targets.fatG, stroke: "stroke-macro-fat", dot: "bg-macro-fat" },
  ];

  /* ----------------------------- 比上周（一条记录） ---------------------------- */
  const weekStart = startOfWeekISO(today);
  const weekEnd = addDays(weekStart, 7);
  const lastWeekStart = addDays(weekStart, -7);
  const doneBetween = (from: string, to: string) =>
    sessions.filter((s) => {
      if (s.status !== "completed") return false;
      const d = isoDateOf(s.startedAt);
      return d >= from && d < to;
    }).length;
  const thisWeekDone = doneBetween(weekStart, weekEnd);
  const lastWeekDone = doneBetween(lastWeekStart, weekStart);
  const weekLine =
    thisWeekDone === 0
      ? lastWeekDone === 0
        ? "还没有训练记录。练完第一次，这里就会开始累积。"
        : `本周还没练，上周完成 ${lastWeekDone} 次。`
      : lastWeekDone === 0
        ? `本周已练 ${thisWeekDone} 次，上周没有记录。`
        : thisWeekDone > lastWeekDone
          ? `本周已练 ${thisWeekDone} 次，比上周多 ${thisWeekDone - lastWeekDone} 次。`
          : thisWeekDone === lastWeekDone
            ? `本周已练 ${thisWeekDone} 次，和上周持平。`
            : `本周已练 ${thisWeekDone} 次，上周 ${lastWeekDone} 次。`;

  /* 饮水 / 活动提醒：仅在页面打开时于应用内提示，可完全关闭 */
  useEffect(() => {
    if (!ready || !profile.reminders.waterEnabled) return;
    const ms = Math.max(1, profile.reminders.waterIntervalMin) * 60_000;
    const t = setInterval(() => {
      toast("该喝点水了", "info");
    }, ms);
    return () => clearInterval(t);
  }, [ready, profile.reminders.waterEnabled, profile.reminders.waterIntervalMin]);

  useEffect(() => {
    if (!ready || !profile.reminders.moveEnabled) return;
    const ms = Math.max(1, profile.reminders.moveIntervalMin) * 60_000;
    const t = setInterval(() => {
      toast("起身活动一下吧", "info");
    }, ms);
    return () => clearInterval(t);
  }, [ready, profile.reminders.moveEnabled, profile.reminders.moveIntervalMin]);

  if (!ready) return <Loading />;

  async function startToday() {
    const day = todayDay ?? activePlan?.days[0];
    if (!day) {
      router.push("/train");
      return;
    }
    const s = newSession(day, activeVenue?.id);
    await saveSession(s);
    setRunning(s);
  }

  return (
    <div className="space-y-3 p-4">
      <div className="pt-1">
        <div className="text-[13px] text-ink-faint">
          {today} {weekdayCN(wd)}
        </div>
        <h1 className="text-[22px] font-semibold">
          {profile.onboarded ? `你好，${profile.displayName || "朋友"}` : "欢迎"}
        </h1>
      </div>

      {activeVenue && (
        <div className="flex items-center gap-1.5 text-[12.5px] text-ink-faint">
          当前场馆：
          <Chip>{activeVenue.name}</Chip>
        </div>
      )}

      {/* 1. 现在做什么：只留一个按钮 */}
      <div className="card">
        <div className="mb-1 flex items-center justify-between">
          <span className="text-[13px] text-ink-faint">现在做什么</span>
          <button className="text-[12px] text-moss-600 underline" onClick={() => router.push("/train")}>
            查看计划
          </button>
        </div>

        {inProgress ? (
          <>
            <div className="text-[16px] font-semibold">{inProgress.title}</div>
            <div className="mt-1 text-[12.5px] text-ink-soft">
              有一场未结束的训练，开始于{" "}
              {new Date(inProgress.startedAt).toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" })}
            </div>
            <button className="btn-primary btn-lg mt-3" onClick={() => setRunning(inProgress)}>
              继续训练
            </button>
          </>
        ) : todayDay ? (
          <>
            <div className="text-[16px] font-semibold">{todayDay.title}</div>
            <div className="mt-1 text-[12.5px] text-ink-soft">
              {todayDay.items.length} 个动作 · 约 {todayDay.estimatedMinutes} 分钟
            </div>
            <div className="mt-2 flex flex-wrap gap-1">
              {todayDay.items.slice(0, 4).map((it) => (
                <Chip key={it.id}>{EXERCISE_MAP[it.exerciseId]?.name ?? "动作"}</Chip>
              ))}
              {todayDay.items.length > 4 && <Chip>+{todayDay.items.length - 4}</Chip>}
            </div>
            <button className="btn-primary btn-lg mt-3" onClick={() => void startToday()}>
              开始训练
            </button>
          </>
        ) : activePlan ? (
          <>
            <div className="text-[15px] font-medium">今天是休息日</div>
            <div className="mt-1 text-[12.5px] leading-relaxed text-ink-soft">
              恢复也是训练的一部分。可以散个步、拉伸，或者补记一次训练。
            </div>
            <button className="btn-secondary btn-lg mt-3" onClick={() => router.push("/train")}>
              看看下次练什么
            </button>
          </>
        ) : (
          <>
            <div className="text-[14px]">还没有训练计划</div>
            <div className="mt-1 text-[12.5px] text-ink-soft">按你的器械、受限部位和可用时间生成一份。</div>
            <button className="btn-primary btn-lg mt-3" onClick={() => router.push("/train")}>
              去生成计划
            </button>
          </>
        )}
      </div>

      {/* 2. 今天还能吃多少：热量环 + 一句人话 */}
      <div className="card">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[13px] text-ink-faint">今天还能吃多少</span>
          <button className="text-[12px] text-moss-600 underline" onClick={() => router.push("/diet")}>
            去记录
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <MacroRing kcal={totals.kcal} kcalTarget={targets.kcal} macros={macros} />
          <div className="min-w-0 flex-1 basis-[190px]">
            <div className="text-[14px] font-medium leading-snug">{eatLine}</div>
            <div className="mt-1 text-[11.5px] text-ink-faint">
              已记 {slots} 餐 · 目标 {targets.kcal} kcal
            </div>
            <div className="mt-2 space-y-0.5">
              {macros.map((m) => (
                <div key={m.label} className="flex items-center gap-1.5 text-[11.5px]">
                  <span className={cx("h-1.5 w-1.5 shrink-0 rounded-full", m.dot)} />
                  <span className="text-ink-faint">{m.label}</span>
                  <span className="tabular-nums text-ink-soft">
                    {Math.round(m.value)} / {m.target} g
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {todayEntries.length > 0 && (
          <div className="mt-2 truncate border-t border-paper-line pt-2 text-[12px] text-ink-soft">
            {(["breakfast", "lunch", "dinner", "snack"] as const)
              .map((slot) => {
                const list = todayEntries.filter((e) => e.slot === slot);
                return list.length ? `${SLOT_LABEL[slot]}：${list.map((e) => e.foodName).join("、")}` : "";
              })
              .filter(Boolean)
              .join("　")}
          </div>
        )}
      </div>

      {/* 3. 比上周好在哪：一条记录 */}
      <div className="card-tight flex items-center justify-between gap-2">
        <div className="min-w-0">
          <div className="text-[11.5px] text-ink-faint">比上周</div>
          <div className="truncate text-[13px] text-ink-soft">{weekLine}</div>
        </div>
        <button
          className="shrink-0 text-[12px] text-moss-600 underline"
          onClick={() => router.push("/progress")}
        >
          看周报
        </button>
      </div>

      {/* 快速记录（饮水 / 体重） */}
      <div className="card">
        <div className="mb-2 text-[13px] text-ink-faint">快速记录</div>
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-xl border border-paper-line px-3 py-2.5">
            <div className="text-[12px] text-ink-faint">饮水</div>
            <div className="text-[16px] font-semibold tabular-nums">
              {todayWater}
              <span className="text-[11px] font-normal text-ink-faint"> / {waterTarget} ml</span>
            </div>
            <div className="mt-1.5 flex gap-1">
              {[200, 300, 500].map((ml) => (
                <button
                  key={ml}
                  className="btn-secondary flex-1 !px-1 !py-1 text-[12px]"
                  onClick={() => void addWater(today, ml)}
                >
                  +{ml}
                </button>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-paper-line px-3 py-2.5">
            <div className="text-[12px] text-ink-faint">体重</div>
            <div className="text-[16px] font-semibold tabular-nums">
              {latestWeight ? latestWeight.weightKg : "—"}
              <span className="text-[11px] font-normal text-ink-faint"> kg</span>
            </div>
            <button
              className="btn-secondary mt-1.5 w-full !py-1 text-[12px]"
              onClick={() => router.push("/progress?tab=body")}
            >
              记录体重
            </button>
          </div>
        </div>
      </div>

      {/* 最近训练 */}
      <div className="card">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[13px] text-ink-faint">最近训练</span>
          <button className="text-[12px] text-moss-600 underline" onClick={() => router.push("/progress?tab=history")}>
            全部记录
          </button>
        </div>
        {sessions.length === 0 ? (
          <div className="py-2 text-[12.5px] text-ink-faint">还没有训练记录。</div>
        ) : (
          <div className="space-y-1">
            {sessions.slice(0, 3).map((s) => {
              const done = s.logs.reduce((n, l) => n + l.sets.filter((x) => x.status === "done").length, 0);
              const total = s.logs.reduce((n, l) => n + l.sets.length, 0);
              return (
                <div key={s.id} className="flex items-center justify-between text-[13px]">
                  <span className="flex min-w-0 items-center gap-1.5">
                    <span className={cx("truncate", s.status === "in_progress" && "text-clay-600")}>
                      {s.title}
                    </span>
                    {s.isDemo && <DemoBadge />}
                  </span>
                  <span className="shrink-0 text-[11.5px] text-ink-faint">
                    {isoDateOf(s.startedAt).slice(5)} · {done}/{total} 组
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <OnboardingFlow
        open={showOnboard}
        initial={profile}
        onDone={async (p, loadDemo) => {
          await saveProfile(p);
          if (loadDemo) await seedDemo();
          setShowOnboard(false);
          toast("档案已保存", "ok");
        }}
      />

      {running && <WorkoutRunner session={running} onExit={() => setRunning(null)} />}
    </div>
  );
}

function OnboardingFlow({
  open,
  initial,
  onDone,
}: {
  open: boolean;
  initial: import("@/lib/types").UserProfile;
  onDone: (p: import("@/lib/types").UserProfile, loadDemo: boolean) => void;
}) {
  if (!open) return null;
  return <Onboarding initial={initial} onDone={onDone} />;
}