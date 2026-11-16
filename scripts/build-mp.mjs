/**
 * 构建小程序逻辑层：把网页版 src/lib 的纯逻辑打包成 miniprogram/lib/fitloop.js
 * ---------------------------------------------------------------------------
 * 做法：复制 src/lib → 临时目录，把 db.ts 换成 miniprogram/src/db-wx.ts（wx storage 版），
 * 再以 index.ts 为入口 esbuild 打成 CommonJS。repo.ts / nutrition / engine / weekly 等原样复用。
 *
 * 用法：node scripts/build-mp.mjs
 */
import { spawnSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");
const libSrc = join(root, "src", "lib");
const mpRoot = join(root, "miniprogram");
const tmp = join(root, ".mp-build");
const outFile = join(mpRoot, "lib", "fitloop.js");

if (existsSync(tmp)) rmSync(tmp, { recursive: true, force: true });
mkdirSync(tmp, { recursive: true });
cpSync(libSrc, tmp, { recursive: true });

// 1) 用 wx storage 版 db.ts 覆盖 IndexedDB 版
cpSync(join(mpRoot, "src", "db-wx.ts"), join(tmp, "db.ts"));

// 2) 去掉仅供单测的入口，避免把 node 相关代码带进包
rmSync(join(tmp, "testExports.ts"), { force: true });

// 3) 生成打包入口（导出全部纯逻辑）
writeFileSync(
  join(tmp, "index.ts"),
  [
    'export * from "./types";',
    'export * from "./utils";',
    'export * from "./nutrition";',
    'export * from "./progression";',
    'export * from "./weekly";',
    'export * from "./session";',
    'export * from "./plan/engine";',
    'export * from "./seed/exercises";',
    'export * from "./seed/foods";',
    'export * from "./seed/muscles";',
    'export * from "./demo";',
    'export * from "./repo";',
    'export * from "./db";',
    "",
  ].join("\n"),
  "utf8",
);

mkdirSync(dirname(outFile), { recursive: true });

const esbuild = join(root, "node_modules", ".bin", process.platform === "win32" ? "esbuild.cmd" : "esbuild");
const r = spawnSync(
  esbuild,
  [
    join(tmp, "index.ts"),
    "--bundle",
    "--format=cjs",
    "--platform=neutral",
    "--target=es2017",
    `--outfile=${outFile}`,
    "--log-level=warning",
  ],
  { cwd: root, stdio: "inherit", shell: process.platform === "win32" },
);

rmSync(tmp, { recursive: true, force: true });

if (r.status !== 0) {
  console.error("[mp] 打包失败");
  process.exit(1);
}

const size = readFileSync(outFile).length;
console.log(`[mp] 已生成 miniprogram/lib/fitloop.js（${(size / 1024).toFixed(1)} KB）`);