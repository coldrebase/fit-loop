/**
 * 打包 Android APK（Capacitor 封装网页版）
 * ---------------------------------------------------------------------------
 * 前置：
 *   1) JDK 17+（JAVA_HOME）
 *   2) Android SDK（ANDROID_HOME），含 platform-tools / platforms;android-34 / build-tools;34.0.0
 *   3) 发布签名（可选，缺省出 debug 包）：
 *        FITLOOP_KEYSTORE / FITLOOP_STORE_PASSWORD / FITLOOP_KEY_ALIAS / FITLOOP_KEY_PASSWORD
 *
 * 用法：
 *   node scripts/build-apk.mjs            # 构建 release（有签名时）否则 debug
 *   node scripts/build-apk.mjs --debug    # 强制 debug
 *
 * 流程：静态导出 → cap copy android → gradlew assembleRelease
 */
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, copyFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");
const androidDir = join(root, "android");

const isDebug = process.argv.includes("--debug");
const signed = !!process.env.FITLOOP_KEYSTORE;
const variant = isDebug || !signed ? "Debug" : "Release";
const task = `assemble${variant}`;

function run(cmd, args, opts = {}) {
  const r = spawnSync(cmd, args, {
    cwd: opts.cwd ?? root,
    stdio: "inherit",
    shell: process.platform === "win32",
    env: { ...process.env, NODE_OPTIONS: "" },
  });
  if (r.status !== 0) throw new Error(`失败：${cmd} ${args.join(" ")}（退出码 ${r.status}）`);
}

if (!existsSync(join(androidDir, "gradlew.bat")) && !existsSync(join(androidDir, "gradlew"))) {
  console.error("没有 android 工程，先执行：npx cap add android");
  process.exit(1);
}

console.log("[apk] 1/3 静态导出");
run(process.execPath, [join(root, "scripts", "build-static.mjs"), "--base="]);

console.log("[apk] 2/3 同步到 Capacitor");
run(process.platform === "win32" ? "npx.cmd" : "npx", ["cap", "copy", "android"]);

console.log(`[apk] 3/3 Gradle ${task}（${signed && !isDebug ? "已签名 release" : "debug"}）`);
run(
  process.platform === "win32" ? join(androidDir, "gradlew.bat") : join(androidDir, "gradlew"),
  [task, "--no-daemon"],
  { cwd: androidDir },
);

const apk = join(
  androidDir,
  "app",
  "build",
  "outputs",
  "apk",
  variant.toLowerCase(),
  `app-${variant.toLowerCase()}.apk`,
);
if (!existsSync(apk)) {
  console.error(`[apk] 找不到产物：${apk}`);
  process.exit(1);
}

const dist = join(root, "dist");
mkdirSync(dist, { recursive: true });
const out = join(dist, `FitLoop-${variant.toLowerCase()}.apk`);
copyFileSync(apk, out);
console.log(`[apk] 完成：${out}`);
console.log("[apk] 手机开启「允许安装未知来源」后直接安装即可。");