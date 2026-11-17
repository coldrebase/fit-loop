"use client";

/**
 * 单值进度环（饮水 / 热量这类「今天完成多少」的指标）
 * ---------------------------------------------------------------------------
 * 只画一圈进度 + 中心内容，不做估算：value / max 由调用方给。
 * 和饮食页的 MacroRing 分工：MacroRing 用来看三大营养素构成，
 * 这里用来看单个指标的完成度（首页一眼就知道还差多少）。
 */
export function ProgressRing({
  value,
  max,
  size = 104,
  strokeWidth = 9,
  className = "stroke-moss-500",
  label,
  children,
}: {
  value: number;
  max: number;
  size?: number;
  strokeWidth?: number;
  /** 弧线颜色，传 tailwind class，例如 stroke-moss-500 */
  className?: string;
  /** 读屏用的完整描述 */
  label?: string;
  children?: React.ReactNode;
}) {
  const pct = max > 0 ? Math.min(1, Math.max(0, value / max)) : 0;
  const r = (100 - strokeWidth) / 2;
  const c = 2 * Math.PI * r;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        className="-rotate-90"
        role="img"
        aria-label={label}
      >
        <circle cx="50" cy="50" r={r} fill="none" strokeWidth={strokeWidth} className="stroke-paper-line" />
        {pct > 0 && (
          <circle
            cx="50"
            cy="50"
            r={r}
            fill="none"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={`${pct * c} ${c}`}
            className={className}
          />
        )}
      </svg>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
}