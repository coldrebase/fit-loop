/**
 * 切换小程序的 AppID（拿到正式 AppID 后执行一次即可）
 * ---------------------------------------------------------------------------
 * 用法：
 *   node scripts/set-mp-appid.mjs wx1234567890abcdef
 *   node scripts/set-mp-appid.mjs wx1234567890abcdef --dir "C:\Users\yh\WeChatProjects\fitloop-mini"
 *
 * 会同时改：仓库内 miniprogram/project.config.json + （可选）IDE 里那份工程。
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");

const appid = (process.argv[2] || "").trim();
if (!/^wx[0-9a-f]{16}$/i.test(appid)) {
  console.error("用法：node scripts/set-mp-appid.mjs <AppID>，AppID 形如 wx1234567890abcdef（18 位）");
  process.exit(1);
}

const dirArgIdx = process.argv.indexOf("--dir");
const extraDirs = dirArgIdx > 1 ? [process.argv[dirArgIdx + 1]] : [];

const targets = [join(root, "miniprogram", "project.config.json"), ...extraDirs.map((d) => join(d, "project.config.json"))];

for (const file of targets) {
  if (!existsSync(file)) {
    console.warn(`[appid] 跳过（不存在）：${file}`);
    continue;
  }
  const json = JSON.parse(readFileSync(file, "utf8"));
  const before = json.appid;
  json.appid = appid;
  writeFileSync(file, JSON.stringify(json, null, 2) + "\n", "utf8");
  console.log(`[appid] ${file}  ${before} → ${appid}`);
}

// 私有配置里也可能带 appid（新版 IDE 会写），一并同步
for (const file of targets.map((f) => f.replace("project.config.json", "project.private.config.json"))) {
  if (!existsSync(file)) continue;
  const raw = readFileSync(file, "utf8");
  if (!/"appid"/.test(raw)) continue;
  const json = JSON.parse(raw);
  json.appid = appid;
  writeFileSync(file, JSON.stringify(json, null, 2) + "\n", "utf8");
  console.log(`[appid] ${file} 已同步`);
}

console.log("[appid] 完成。记得在 IDE 里重新打开工程，然后执行上传。");