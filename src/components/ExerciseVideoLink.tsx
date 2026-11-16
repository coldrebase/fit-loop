"use client";

/**
 * 动作演示入口
 * ---------------------------------------------------------------------------
 * 之前用本地绘制的火柴人示意图；用户要求改为跳到抖音搜索「谭成衣 + 动作名」看真人示范。
 * 注意：抖音是站外页面，链接一律 target="_blank" + rel="noopener noreferrer"。
 */

export const DEMO_COACH = "谭成衣";

/** 抖音视频搜索地址（关键词：教练名 + 动作名） */
export function douyinSearchUrl(exerciseName: string): string {
  const keyword = `${DEMO_COACH} ${exerciseName}`.replace(/\s+/g, " ").trim();
  return `https://www.douyin.com/search/${encodeURIComponent(keyword)}?type=video`;
}

type Size = "sm" | "md" | "lg";

const SIZE_CLASS: Record<Size, string> = {
  sm: "h-14 w-12 rounded-lg text-[10px]",
  md: "h-20 w-16 rounded-lg text-[10px]",
  lg: "h-28 w-24 rounded-xl text-[11px]",
};

/** 可点击的演示入口：打开抖音搜索 */
export function ExerciseVideoLink({
  exerciseName,
  size = "lg",
  className = "",
}: {
  exerciseName: string;
  size?: Size;
  className?: string;
}) {
  return (
    <a
      href={douyinSearchUrl(exerciseName)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`在抖音搜索「${DEMO_COACH} ${exerciseName}」的演示视频，新窗口打开`}
      className={`flex shrink-0 flex-col items-center justify-center gap-1 border border-paper-line bg-paper font-medium text-ink-soft transition-colors active:bg-moss-50 ${SIZE_CLASS[size]} ${className}`}
    >
      <span aria-hidden="true" className="text-[15px] leading-none">
        ▶
      </span>
      <span className="leading-none">抖音</span>
    </a>
  );
}

/**
 * 纯展示占位块：用在「整行已经是 button」的列表里（链接不能嵌套在按钮内）。
 * 点行本身仍会打开展示弹窗，弹窗里有可点击的抖音链接。
 */
export function ExerciseThumb({ size = "sm", className = "" }: { size?: Size; className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`flex shrink-0 flex-col items-center justify-center gap-1 border border-paper-line bg-paper text-[10px] font-medium text-ink-faint ${SIZE_CLASS[size]} ${className}`}
    >
      <span className="text-[13px] leading-none">▶</span>
    </div>
  );
}