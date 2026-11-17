import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { ANDROID_VERSION_CODE, APP_VERSION } from "./.build/lib.mjs";

/**
 * 网页端与 App 端的版本必须一起动。
 * 版本号的真值分散在 package.json（代码版本）、android/app/build.gradle
 * （安装升级看 versionCode）、src/lib/appMeta.ts（界面显示），
 * 这个用例把它们锁在一起，改了一处忘另一处就直接红。
 */

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const pkg = JSON.parse(readFileSync(resolve(root, "package.json"), "utf8"));
const gradle = readFileSync(resolve(root, "android/app/build.gradle"), "utf8");

const versionName = (gradle.match(/versionName\s+"([^"]+)"/) || [])[1];
const versionCode = Number((gradle.match(/versionCode\s+(\d+)/) || [])[1]);

describe("版本口径（网页 / App 同步）", () => {
  it("package.json、appMeta、Android versionName 三处一致", () => {
    assert.equal(APP_VERSION, pkg.version, "src/lib/appMeta.ts 与 package.json 版本不一致");
    assert.equal(versionName, pkg.version, "android/app/build.gradle 的 versionName 与 package.json 不一致");
  });

  it("Android versionCode 与 appMeta 声明一致，且是正整数", () => {
    assert.equal(ANDROID_VERSION_CODE, versionCode, "appMeta.ANDROID_VERSION_CODE 与 build.gradle 不一致");
    assert.ok(Number.isInteger(versionCode) && versionCode > 0, "versionCode 必须是正整数，否则装不上");
  });

  it("版本号是 x.y.z 形式", () => {
    assert.match(pkg.version, /^\d+\.\d+\.\d+$/);
  });
});