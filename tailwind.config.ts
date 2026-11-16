import type { Config } from "tailwindcss";

/**
 * 配色全部走 CSS 变量（RGB 三元组），这样同一个类名可以在不同主题下换色。
 * 变量定义见 src/app/globals.css 的 [data-theme="..."] 块。
 * 写法 `rgb(var(--x) / <alpha-value>)` 是为了让 bg-alert/5 这类透明度修饰符继续可用。
 */
const c = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: c("c-ink"), soft: c("c-ink-soft"), faint: c("c-ink-faint") },
        paper: { DEFAULT: c("c-bg"), card: c("c-card"), line: c("c-line") },
        moss: {
          50: c("c-accent-50"),
          100: c("c-accent-100"),
          300: c("c-accent-300"),
          500: c("c-accent-500"),
          600: c("c-accent-600"),
          700: c("c-accent-700"),
        },
        clay: {
          50: c("c-clay-50"),
          100: c("c-clay-100"),
          500: c("c-clay-500"),
          600: c("c-clay-600"),
        },
        alert: c("c-alert"),
        warn: c("c-warn"),
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "PingFang SC",
          "Hiragino Sans GB",
          "Microsoft YaHei",
          "sans-serif",
        ],
      },
      borderRadius: {
        lg: "var(--r-lg)",
        xl: "var(--r-xl)",
        xl2: "var(--r-xl2)",
        "2xl": "var(--r-2xl)",
        "3xl": "var(--r-3xl)",
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
        lift: "var(--shadow-lift)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up .22s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;