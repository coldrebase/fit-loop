/**
 * 应用版本号（网页 / App 同一个值）
 * ---------------------------------------------------------------------------
 * 这个项目是「一份代码出两端」：网页和 APK 必须同版本、同能力，
 * 数据也靠同一份 JSON 备份互通。版本号的真值有三个地方：
 *   - package.json `version`
 *   - android/app/build.gradle `versionName` / `versionCode`
 *   - 这里（UI 上要显示）
 * tests/version.test.mjs 会把三处对齐校验，漏改一处测试就红。
 */
export const APP_VERSION = "0.7.2";

/** Android versionCode = 主版本*10 + 次版本，或直接写死；这里只用于展示一致性 */
export const ANDROID_VERSION_CODE = 9;