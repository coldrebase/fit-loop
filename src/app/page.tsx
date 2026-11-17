"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/components/AppProvider";
import { Onboarding } from "@/components/Onboarding";
import { ProgressRing } from "@/components/ProgressRing";
import { WorkoutRunner } from "@/components/WorkoutRunner";
import { Chip, Loading, toast } from "@/components/ui";
import { nutrientTotals, targetsFor } from "@/lib/nutrition";
import { newSession } from "@/lib/session";
import { EXERCISE_MAP } from "@/lib/seed/exercises";
import { addDays, isoDateOf, startOfWeekISO, todayISO, weekdayCN, weekdayOf } from "@/lib/utils";

/**
 * 今日（首页）
 * ---------------------------------------------------------------------------
 * 目标：打开就知道「今天要做什么、还差什么」。
 *   - 训练：今天练什么 + 一个按钮（已完成时明说已练完）
 *   - 进度：饮水、热量两个环 + 就地快记
 *   - 还没做：只列没完成的项，全部完成就明说
 * 饮食的详细拆分在饮食页，这里不重复展开；体重等记录收在数据页。
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
    water,
    foods,
    saveProfile,
    saveSession,
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
  const totals = useMemo(() => nutrientTotals(todayEntries, foods), [todayEntries, foods]);

  const todayWater = water.find((w) => w.date === today)?.ml ?? 0;
  const waterTarget = Math.round(profile.weightKg * 35);
  const intakeKcal = Math.round(totals.kcal);

  const trainedToday = sessions.filter(
    (s) => s.status === "completed" && isoDateOf(s.startedAt) === today,
  ).length;

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

  /* ------------------------------- 今天还没做 ------------------------------- */
  const remaining: { key: string; text: string; href: string }[] = [];
  if (inProgress) {
    remaining.push({ key: "train", text: `训练没做完：${inProgress.title}`, href: "/train" });
  } else if (trainedToday === 0 && (todayDay || activePlan)) {
    remaining.push({
      key: "train",
      text: todayDay ? `还没练：${todayDay.title}` : "今天休息，不用练",
      href: "/train",
    });
  }
  if (todayEntries.length === 0) {
    remaining.push({ key: "eat", text: "还没记录今天的饮食", href: "/diet" });
  }
  if (todayWater < waterTarget) {
    remaining.push({ key: "water", text: `水还差 ${waterTarget - todayWater} ml`, href: "" });
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

      {/* 1. 今天要练什么：一个按钮 */}
      <div className="card">
        <div className="mb-1 flex items-center justify-between">
          <span className="text-[13px] text-ink-faint">今天要练</span>
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
        ) : trainedToday > 0 ? (
          <>
            <div className="flex items-center gap-1.5">
              <span className="text-[16px] font-semibold text-moss-600">今天已经练完了</span>
              <span className="chip border-moss-300 bg-moss-50 !py-0 text-[10px] text-moss-700">
                完成 {trainedToday} 次
              </span>
            </div>
            <div className="mt-1 text-[12.5px] leading-relaxed text-ink-soft">
              恢复也是训练的一部分。想加练就再开一场，不想动就好好休息。
            </div>
            <button className="btn-secondary btn-lg mt-3" onClick={() => void startToday()}>
              再练一次
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
              不用练，散个步或拉伸一下就好。
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

      {/* 2. 今天进度：饮水 / 热量两个环 */}
      <div className="card">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[13px] text-ink-faint">今天进度</span>
          <button className="text-[12px] text-moss-600 underline" onClick={() => router.push("/diet")}>
            记一餐
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col items-center">
            <ProgressRing
              value={todayWater}
              max={waterTarget}
              className="stroke-macro-carb"
              label={`饮水：已喝 ${todayWater} 毫升，目标 ${waterTarget} 毫升`}
            >
              <div className="text-[19px] font-semibold leading-none tabular-nums">{todayWater}</div>
              <div className="mt-0.5 text-[10.5px] leading-none text-ink-faint">/ {waterTarget} ml</div>
            </ProgressRing>
            <div className="mt-1.5 text-[12px] text-ink-faint">饮水</div>
          </div>

          <div className="flex flex-col items-center">
            <ProgressRing
              value={intakeKcal}
              max={targets.kcal}
              className="stroke-macro-protein"
              label={`热量：已记录摄入 ${intakeKcal} 千卡，目标 ${targets.kcal} 千卡`}
            >
              <div className="text-[19px] font-semibold leading-none tabular-nums">{intakeKcal}</div>
              <div className="mt-0.5 text-[10.5px] leading-none text-ink-faint">/ {targets.kcal} kcal</div>
            </ProgressRing>
            <div className="mt-1.5 text-[12px] text-ink-faint">热量（已记录）</div>
          </div>
        </div>

        <div className="mt-3 flex gap-1">
          {[200, 300, 500].map((ml) => (
            <button
              key={ml}
              className="btn-secondary flex-1 !px-1 !py-1.5 text-[12px]"
              onClick={() => void addWater(today, ml)}
            >
              +{ml} ml
            </button>
          ))}
        </div>
      </div>

      {/* 3. 今天还没做：只列没完成的 */}
      <div className="card">
        <div className="mb-2 text-[13px] text-ink-faint">今天还没做</div>
        {remaining.length === 0 ? (
          <div className="flex items-center gap-1.5 text-[13.5px] text-moss-600">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            训练、饮食、饮水都记上了，今天可以收工。
          </div>
        ) : (
          <ul className="space-y-1.5">
            {remaining.map((t) => (
              <li key={t.key}>
                <button
                  className="flex w-full items-center gap-2 text-left text-[13.5px] text-ink-soft"
                  onClick={() => t.href && router.push(t.href)}
                  disabled={!t.href}
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-clay-500" />
                  <span className="min-w-0 flex-1 truncate">{t.text}</span>
                  {t.href && <span className="shrink-0 text-[12px] text-moss-600 underline">去完成</span>}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 4. 比上周：一行 */}
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