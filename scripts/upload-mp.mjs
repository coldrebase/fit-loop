/**
 * 一键上传小程序开发版
 * ---------------------------------------------------------------------------
 * 依赖微信开发者工具的命令行（cli.bat），需先在 IDE 里开启
 * 「设置 → 安全设置 → 服务端口」。
 *
 * 用法：
 *   node scripts/upload-mp.mjs -v 0.1.1 -d "版本说明"
 *   node scripts/upload-mp.mjs -v 0.1.1 -d "说明" --dir "C:\Users\yh\WeChatProjects\fitloop-mini"
 *   node scripts/upload-mp.mjs -v 0.1.1 -d "说明" --cli "D:\path\to\cli.bat"
 *
 * 未传 --cli 时按常见安装路径自动探测，或读环境变量 WX_DEVTOOLS_CLI。
 */
import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");

const argv = process.argv.slice(2);
const pick = (flag, fallback) => {
  const i = argv.indexOf(flag);
  return i >= 0 && argv[i + 1] ? argv[i + 1] : fallback;
};

const version = pick("-v", "");
const desc = pick("-d", "FitLoop 小程序版本");
const projectDir = pick("--dir", join(root, "miniprogram"));

const cliCandidates = [
  process.env.WX_DEVTOOLS_CLI,
  "E:\\netase\\wkf\\微信web开发者工具\\cli.bat",
  "C:\\Program Files (x86)\\Tencent\\微信web开发者工具\\cli.bat",
  "C:\\Program Files\\Tencent\\微信web开发者工具\\cli.bat",
].filter(Boolean);

const cli = pick("--cli", cliCandidates.find((p) => existsSync(p)) || "");

if (!version) {
  console.error("缺少版本号：node scripts/upload-mp.mjs -v 0.1.1 -d \"说明\"");
  process.exit(1);
}
if (!cli) {
  console.error("没找到微信开发者工具 cli.bat，请用 --cli 指定，或设置环境变量 WX_DEVTOOLS_CLI。");
  process.exit(1);
}
if (!existsSync(join(projectDir, "project.config.json"))) {
  console.error(`不是小程序工程目录：${projectDir}`);
  process.exit(1);
}

console.log(`[upload] cli=${cli}`);
console.log(`[upload] project=${projectDir}`);
console.log(`[upload] version=${version}`);

const r = spawnSync(cli, ["upload", "--project", projectDir, "-v", version, "-d", desc], {
  stdio: "inherit",
  shell: process.platform === "win32",
  env: { ...process.env, NODE_OPTIONS: "" },
});

if (r.status !== 0) {
  console.error("[upload] 失败。常见原因：IDE 未开启服务端口、未登录、AppID 无上传权限（测试号不能上传发布）。");
  process.exit(r.status ?? 1);
}
console.log("[upload] 完成。到 mp.weixin.qq.com → 管理 → 版本管理 设置体验版或提交审核。");