"use client";

/**
 * 热量环
 * ---------------------------------------------------------------------------
 * 内圈 = 今日热量进度，外圈 = 蛋白质 / 碳水 / 脂肪三色弧（各自相对目标的比例）。
 * 中心默认显示「还能吃多少 kcal」，可由调用方覆盖。
 * 只做可视化：数值全部来自 lib/nutrition，不在这里做任何估算。
 */

const R_KCAL = 43;
const R_MACRO = 54;
const C_KCAL = 2 * Math.PI * R_KCAL;
const C_MACRO = 2 * Math.PI * R_MACRO;
/** 三段之间的留白（度） */
const MACRO_GAP_DEG = 10;
const MACRO_SEG_LEN = ((360 / 3 - MACRO_GAP_DEG) / 360) * C_MACRO;

function frac(value: number, target: number): number {
  if (!(target > 0)) return 0;
  return Math.max(0, Math.min(1, value / target));
}

export interface MacroSlice {
  label: string;
  value: number;
  target: number;
  /** 弧线颜色用的 tailwind class，例如 stroke-clay-500 */
  stroke: string;
  /** 图例圆点颜色用的 tailwind class，例如 bg-clay-500 */
  dot: string;
}

export function MacroRing({
  kcal,
  kcalTarget,
  macros,
  size = 128,
  center,
}: {
  kcal: number;
  kcalTarget: number;
  macros: MacroSlice[];
  size?: number;
  center?: React.ReactNode;
}) {
  const remain = Math.round(kcalTarget - kcal);
  const over = remain < 0;
  const kcalLen = frac(kcal, kcalTarget) * C_KCAL;

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg
        viewBox="0 0 120 120"
        width={size}
        height={size}
        className="-rotate-90"
        role="img"
        aria-label={`今日已摄入 ${Math.round(kcal)} kcal，目标 ${kcalTarget} kcal，${over ? `超出 ${-remain}` : `还能吃 ${remain}`} kcal`}
      >
        {/* 轨道 */}
        <circle cx="60" cy="60" r={R_MACRO} fill="none" strokeWidth="5" className="stroke-paper-line" />
        {/* 三色宏量弧：每段从 12 点方向起画，段间隔 10° */}
        {macros.map((m, i) => {
          const f = frac(m.value, m.target);
          if (f <= 0.005) return null;
          const start = i * (360 / 3) + MACRO_GAP_DEG / 2;
          return (
            <circle
              key={m.label}
              cx="60"
              cy="60"
              r={R_MACRO}
              fill="none"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray={`${f * MACRO_SEG_LEN} ${C_MACRO}`}
              transform={`rotate(${start} 60 60)`}
              className={m.stroke}
            />
          );
        })}
        {/* 热量进度 */}
        <circle cx="60" cy="60" r={R_KCAL} fill="none" strokeWidth="8" className="stroke-paper-line" />
        <circle
          cx="60"
          cy="60"
          r={R_KCAL}
          fill="none"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={`${kcalLen} ${C_KCAL}`}
          className={over ? "stroke-clay-500" : "stroke-moss-600"}
        />
      </svg>

      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        {center ?? (
          <>
            <div className="text-[10.5px] leading-none text-ink-faint">{over ? "已超出" : "还能吃"}</div>
            <div className="mt-0.5 text-[24px] font-semibold leading-none tabular-nums">
              {Math.abs(remain)}
            </div>
            <div className="mt-0.5 text-[10.5px] leading-none text-ink-faint">kcal</div>
          </>
        )}
      </div>
    </div>
  );
}