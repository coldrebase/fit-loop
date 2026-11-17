"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/components/AppProvider";
import { Onboarding } from "@/components/Onboarding";
import { WorkoutRunner } from "@/components/WorkoutRunner";
import { Chip, Loading, toast } from "@/components/ui";
import { newSession } from "@/lib/session";
import { EXERCISE_MAP } from "@/lib/seed/exercises";
import { addDays, isoDateOf, startOfWeekISO, todayISO, weekdayCN, weekdayOf } from "@/lib/utils";

/**
 * 今日页
 * ---------------------------------------------------------------------------
 * 只回答「现在做什么」：一份计划、一个按钮、一条上周对比。
 * 饮食的「今天还能吃多少」在饮食页（同一份数据，不在两页各说一遍），
 * 训练历史在数据页 —— 首页不再重复汇报。
 */
export default function TodayPage() {
  const router = useRouter();
  const {
    ready,
    profile,
    activePlan,
    activeVenue,
    sessions,
    weights,
    water,
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

  const todayWater = water.find((w) => w.date === today)?.ml ?? 0;
  const latestWeight = weights[weights.length - 1];
  const waterTarget = Math.round(profile.weightKg * 35);

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

      {/* 现在做什么：只留一个按钮 */}
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

      {/* 比上周：一条记录 */}
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
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[13px] text-ink-faint">快速记录</span>
          <button className="text-[12px] text-moss-600 underline" onClick={() => router.push("/diet")}>
            记饮食
          </button>
        </div>
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