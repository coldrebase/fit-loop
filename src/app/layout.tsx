import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AppProvider } from "@/components/AppProvider";
import { BootSplashClear } from "@/components/BootSplashClear";
import { BottomNav } from "@/components/BottomNav";
import { InstallHint } from "@/components/InstallHint";
import { Mascot } from "@/components/Mascot";
import { PwaBoot } from "@/components/PwaBoot";
import { ThemeBoot } from "@/components/ThemeBoot";
import { ToastHost } from "@/components/ui";

/** 静态导出部署在子路径（如 GitHub Pages 的 /fit-loop）时由构建脚本注入 */
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const TITLE = "FitLoop · 训练与饮食记录";
const DESC =
  "学习动作、制定计划、执行训练、管理饮食、复盘调整的移动端优先健身管理应用（本地优先，数据保存在你的浏览器）。";

/** 在首帧渲染前应用主题，避免深色用户看到白色闪烁 */
const THEME_BOOT = `try{var m=localStorage.getItem("fitloop-mode");document.documentElement.dataset.theme=(m==="dark")?"dark":"mint";}catch(e){document.documentElement.dataset.theme="mint";}`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  applicationName: "FitLoop",
  manifest: `${BASE_PATH}/manifest.json`,
  appleWebApp: {
    capable: true,
    title: "FitLoop",
    statusBarStyle: "default",
  },
  formatDetection: { telephone: false },
  other: {
    // iOS 16.4 起官方推荐 mobile-web-app-capable，但旧版 Safari 仍只认 apple-* 前缀
    "apple-mobile-web-app-capable": "yes",
  },
  icons: {
    icon: [
      { url: `${BASE_PATH}/icons/favicon-32.png`, sizes: "32x32", type: "image/png" },
      { url: `${BASE_PATH}/icons/icon-192.png`, sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: `${BASE_PATH}/icons/apple-touch-icon.png`, sizes: "180x180" }],
  },
  openGraph: { title: TITLE, description: DESC, type: "website" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  // 允许缩放（WCAG 1.4.4）；输入类字号在 globals.css 里保持 ≥16px，避免 iOS 聚焦自动放大
  // 必须显式 viewport-fit=cover，iOS Safari 的 env(safe-area-inset-*) 才会返回真实值；
  // 否则 BottomNav/Sheet footer 用的 --safe-bottom 恒为 0，底部会被 Home Indicator 压住。
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ECFAF6" },
    { media: "(prefers-color-scheme: dark)", color: "#0A0C0E" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body>
        {/* 首帧前定主题，避免深色模式白闪 */}
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT }} />

        {/* 首屏启动图：纯内联样式，JS 未加载也不会白屏 */}
        <div
          id="boot-splash"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#ECFAF6",
            transition: "opacity .3s ease",
          }}
          aria-hidden="true"
        >
          <svg width="96" height="96" viewBox="0 0 96 96" fill="none" aria-hidden="true">
            <circle cx="48" cy="48" r="6" fill="#2DB39C" />
            <rect x="20" y="42" width="56" height="12" rx="6" fill="#2DB39C" />
            <rect x="8" y="26" width="12" height="44" rx="4" fill="#2DB39C" />
            <rect x="76" y="26" width="12" height="44" rx="4" fill="#2DB39C" />
          </svg>
        </div>

        <ThemeBoot />
        <BootSplashClear />
        <PwaBoot />
        <AppProvider>
          <div className="mx-auto flex min-h-screen w-full max-w-[560px] flex-col bg-paper">
            <main className="flex-1 pb-24">{children}</main>
            <BottomNav />
          </div>
          <Mascot />
          <InstallHint />
          <ToastHost />
        </AppProvider>
      </body>
    </html>
  );
}