"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

/**
 * 顶部条
 * ---------------------------------------------------------------------------
 * 底部导航收敛到 4 个（今日 / 训练 / 饮食 / 数据），「我的」移到右上角。
 * 顶部条只在次要页面（我的 / 导入）显示「返回」，其余页面左边是产品标识，
 * 右边是固定的「我的」入口 —— 任何一页都能一步进我的。
 */

/** 次要页面：显示返回而不是产品标识 */
function isSubPage(path: string) {
  return path === "/me" || path.startsWith("/me/") || path === "/import" || path.startsWith("/import/");
}

export function TopBar() {
  const path = usePathname() || "/";
  const router = useRouter();
  const sub = isSubPage(path);
  const onMe = path === "/me" || path.startsWith("/me/");

  return (
    <header
      className="sticky top-0 z-30 border-b border-paper-line/60 bg-paper/85 backdrop-blur"
      style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
    >
      <div className="flex h-11 items-center justify-between gap-2 px-3">
        {sub ? (
          <button
            type="button"
            className="flex items-center gap-0.5 rounded-lg px-1.5 py-1 text-[13px] text-ink-soft transition active:scale-[.98]"
            onClick={() => router.back()}
            aria-label="返回上一页"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M14 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            返回
          </button>
        ) : (
          <Link href="/" className="flex items-center gap-1.5 rounded-lg px-1 py-1" aria-label="FitLoop 首页">
            {/* 哑铃主标识：启动图、图标、顶栏共用同一个形状 */}
            <svg viewBox="0 0 24 24" className="h-4 w-4 text-moss-600" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="1.6" fill="currentColor" />
              <rect x="8.5" y="10.8" width="7" height="2.4" rx="1.2" fill="currentColor" />
              <rect x="6.2" y="7.6" width="2.4" height="8.8" rx="1.2" fill="currentColor" />
              <rect x="15.4" y="7.6" width="2.4" height="8.8" rx="1.2" fill="currentColor" />
            </svg>
            <span className="text-[13px] font-semibold tracking-wide text-ink">FitLoop</span>
          </Link>
        )}

        {!onMe && (
          <Link
            href="/me"
            aria-label="我的"
            className="flex items-center gap-1 rounded-full border border-paper-line bg-paper-card px-2.5 py-1 text-[12px] text-ink-soft transition active:scale-[.97]"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
              <circle cx="12" cy="8.5" r="3.2" />
              <path d="M5.5 19.5c1.1-3.1 3.6-4.6 6.5-4.6s5.4 1.5 6.5 4.6" strokeLinecap="round" />
            </svg>
            我的
          </Link>
        )}
      </div>
    </header>
  );
}