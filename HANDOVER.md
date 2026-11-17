# FitLoop 交接文档

> 生成时间：2026-11-17 · 交接人：AI 协作（lead 会话）· 代码位置：`D:\netase\wbgame\2026-09-13-23-03-07`
> 远端仓库：https://github.com/coldrebase/fit-loop （public，主分支 `main`）

---

## 1. 一分钟看懂现状

FitLoop 是一个**本地优先**的中文健身管理应用（训练 / 饮食 / 复盘），同一套代码目前有三个交付形态：

| 形态 | 地址 / 位置 | 状态 |
| --- | --- | --- |
| **网页 / PWA** | https://coldrebase.github.io/fit-loop/ | ✅ 线上，可「添加到主屏幕」，离线可用 |
| **Android 原生 APK** | `F:\aiwork\dist\FitLoop-0.5.0.apk` | ✅ 已签名可安装（侧载，未上架） |
| **微信小程序** | 仓库 `miniprogram/` | ⚠️ 代码完成，但 AppID 是**测试号**，发不出去 |

**当前 UI**：薄荷小熊主题（薄荷绿 `#ECFAF6` + 主色 `#2DB39C` + 30px 大圆角 + 每页右下角小熊宠物）。

**代码规模**：`src` 48 个文件 / 约 13,400 行；单测 55 条全绿。

---

## 2. 立刻可用的命令

```bash
cd D:\netase\wbgame\2026-09-13-23-03-07

npm test                 # esbuild 打包逻辑层 + 55 条单测
npm run typecheck        # tsc --noEmit
npm run build:static     # 静态导出到 out/（GitHub Pages 用）
npm run deploy:pages     # 手动部署（应急，正常靠 push 自动部署）
npm run build:apk        # 打 Android APK（需 JDK + Android SDK，见 §7）
npm run build:mp         # 重新打包小程序逻辑层 miniprogram/lib/fitloop.js
```

**日常发布**：`git push origin main` → GitHub Actions 自动跑 类型检查 + 单测 + 静态导出 + 发布 Pages，约 1 分钟上线。

```bash
git -c http.sslBackend=openssl push origin main   # 见 §8「沙箱下 git 必须带这个参数」
```

---

## 3. 目录结构（只列需要认识的）

```
src/
  app/                 页面（App Router）
    page.tsx           今日
    train/  diet/  progress/  me/     四个主页面
    import/            健康数据导入（Apple 健康导出 / CSV / Health Connect）
    layout.tsx         全局壳：主题引导、启动图、小宠物、安装提示
    globals.css        ★ 所有主题的设计令牌（颜色/圆角/阴影）都在这里
  components/
    Mascot.tsx         ★ 小宠物（猫/熊/狐，跟随主题）
    ThemeBoot.tsx      ★ 日/夜模式 + 主题名白名单
    PhotoPanel.tsx     拍照识别（云端直连 / 离线兜底）
    VisionSettings.tsx 识别服务的密钥配置
    WorkoutRunner.tsx  训练中记录（逐组重量/次数/RPE）
    FoodAdder.tsx      食物添加与份量换算
    ...
  lib/
    types.ts           全部实体类型
    db.ts / repo.ts    IndexedDB 存储与数据访问
    nutrition.ts       BMR/TDEE/营养目标/份量/用油
    plan/engine.ts     计划生成、器械与限制过滤、时间精简
    progression.ts     渐进超负荷建议（需确认）
    weekly.ts          周报（数据不足不下结论）
    healthImport.ts    Apple 健康 XML / CSV 解析（流式）
    healthConnect.ts   Health Connect 桥接（仅原生）
    offlineFood.ts     离线 ImageNet 粗分类（仅原生）
    visionClient.ts    视觉模型直连（用户自带密钥）
    nativeNotify.ts    本地通知排期（仅原生）
android/               Capacitor 生成的 Android 工程（含 2 个自写 Kotlin 插件）
miniprogram/           微信小程序移植版（5 页 + 训练执行页 + 打包好的逻辑层）
scripts/               构建脚本（静态导出/部署/APK/小程序）
tests/                 node:test 单测
AUDIT-2026-10-20.md    上轮全面审计报告（60+ 处修复记录）
```

**关键设计**：纯逻辑层（`src/lib`）与 UI 完全解耦，网页、小程序、Android 三端共用同一份逻辑。

---

## 4. 为什么是这三个形态（决策背景，避免重复讨论）

| 目标 | 结论 | 原因 |
| --- | --- | --- |
| 长期可访问的网址 | **GitHub Pages** | Vercel 注册卡在**手机短信验证**（国内号码收不到），GitHub 账号可用后改走 Pages，永久免费无需验证 |
| 像 App 一样用 | **PWA + APK** | 小程序需要正式 AppID（见下），PWA 零成本，APK 用 Capacitor 封装同一份网页产物 |
| 微信小程序 | **已移植但发不出去** | 现有 AppID `wxe45889553e945b30` 是**测试号**：不能上传发布、没有版本管理，只能本机预览。需要注册正式小程序（个人主体：身份证 + 全新邮箱，免费） |
| iOS 原生 | **未做** | 必须 macOS + Xcode + Apple 开发者账号（$99/年），当前 Windows 环境不可能出包；工程是标准 Capacitor 结构，在 Mac 上 `npx cap add ios` 即可继续 |

---

## 5. 功能清单

### 5.1 网页 / PWA / APK 共有

- **建档向导** 6 步（目标 / 经验 / 时间 / 身体数据 / 受限部位 / 场馆器械）
- **计划**：按档案与场馆器械生成，支持增减动作、锁定、排序、按时长精简、替换建议（按 模式→肌群→器械→难度 评分）
- **训练中**：逐组记录重量/次数/RPE/时长，跳过、替换、提前结束（未完成记 `abandoned`，不虚报完成率）
- **饮食**：四餐、内置食物库搜索、份量换算（每 100g ↔ 每份、生重/熟重）、烹调用油计入、热量区间
- **复盘**：周报（完成率 / 容量 / 营养 / 体重 / 恢复 / 注意事项），数据不足不下结论
- **健康数据导入**：Apple 健康 `export.xml`（流式解析，上百 MB 不炸内存）、通用 CSV
- **日/夜间模式**：日间薄荷小熊，夜间深色运动款，选择存本机
- **小宠物**：每页右下角，跟随主题变形态，点一下说话
- **数据管理**：导出 JSON、清空、演示数据

### 5.2 仅原生 APK 有

| 能力 | 说明 |
| --- | --- |
| Health Connect 直读 | 一键授权读最近 30 天体重/睡眠/静息心率（自写 Kotlin 插件） |
| 本地通知 | 饮水/活动/训练提醒排期到系统（`@capacitor/local-notifications`） |
| 离线识图 | 内置 MobileNetV1（ImageNet 1000 类）本地分类，零成本、可离线 |
| 真·应用图标 | 桌面独立图标、全屏、无需浏览器 |

### 5.3 拍照识别食物热量（两条路）

```
拍照
 ├─ 配了 API 密钥 → 云端视觉模型（准，能认中餐）      「我的 → 识别服务」配置
 └─ 没配 + 原生App → 内置 MobileNet 离线粗分类（只认几十种西式食物）
      └─ 都没有 → 显示「未接入」+ 手动记录（不假装成功）
```

**设计原则（务必守住）**：照片判不出重量与配料，所以**只给区间、不自动写入、不伪造精确值**；必须用户确认份量后才入账。

---

## 6. 关键实现细节（改代码前必读）

### 6.1 主题系统

- 所有颜色/圆角/阴影是 **CSS 变量**，定义在 `src/app/globals.css` 的 `[data-theme="..."]` 块里
- 可用主题：`paper`（旧米白）、`minimal`、`dark`、`dark-cyan`、`dark-orange`、`dark-purple`、`soft`、`cream`、`mint`（**当前日间默认**）、`night`
- 切换：`<html data-theme="mint">`；`?theme=xxx` 可临时预览（一次性，不写存储）
- 日/夜开关在「我的 → 外观」，存 `localStorage.fitloop-mode`

### 6.2 小宠物

`Mascot.tsx`，内联 SVG（无图片资源），跟随 `data-theme` 换形态：`cream→猫`、`mint→熊`、`night→狐`，其余→猫。挂在 `layout.tsx` 全局。

### 6.3 静态导出为什么能用 API 路由

`scripts/build-static.mjs` 在构建时把 `src/app/api` **临时移出**、导出 `out/`、再还原。所以：
- 静态版没有 `/api/*`，前端会走「未接入 / 直连模型 / 本地模型」分支
- 服务端代理代码保留着，部署到 Vercel 等有 Node 的环境仍可启用

### 6.4 小程序逻辑层复用

`scripts/build-mp.mjs`：复制 `src/lib` → 把 `db.ts` 换成 `miniprogram/src/db-wx.ts`（`wx.storage` 实现）→ esbuild 打成 `miniprogram/lib/fitloop.js`（约 157 KB）。
**改完 `src/lib` 必须重跑 `npm run build:mp`**，否则小程序逻辑还是旧的。

### 6.5 Android 两个自写插件

| 文件 | 作用 |
| --- | --- |
| `HealthConnectPlugin.kt` | Health Connect 只读（体重/睡眠/静息心率）。**必须 Kotlin**：客户端是协程 API |
| `FoodClassifierPlugin.kt` | TFLite Task Library 跑 ImageNet 分类 |

工程已启用 `kotlin-android`；`minSdk` 因 Health Connect 提高到 **26**；依赖被钉在 `androidx.health.connect:connect-client:1.1.0-alpha07`（1.1.0 稳定版要求 AGP 8.9 + compileSdk 36，当前是 8.2 + 34）。


### 版本口径（容易踩）

| 位置 | 当前值 | 说明 |
| --- | --- | --- |
| `package.json` version | 0.5.0 | 仅标识代码版本 |
| `android/app/build.gradle` versionCode / versionName | 5 / 0.5.0 | **Android 安装升级看这个**：versionCode 必须递增，否则装不上 |
| 微信小程序 | 0.1.0（已上传测试号） | 正式发布时由 `upload:mp -v` 指定 |

发新 APK 的固定动作：改 `versionCode +1`、`versionName` 同步、跑 `npm run build:apk`。

---

## 7. 构建环境（换机器时照着装）

| 依赖 | 路径 / 版本 |
| --- | --- |
| Node | v24（v22 也够） |
| JDK | `C:\Program Files\Eclipse Adoptium\jdk-21.0.13.9-hotspot`（`JAVA_HOME`） |
| Android SDK | `F:\aiwork\android-sdk`（`ANDROID_HOME`），含 `platform-tools`、`platforms;android-34`、`build-tools;34.0.0` |
| Gradle | 由 `android/gradlew.bat` 自动下载（缓存约 700 MB） |
| 微信开发者工具 | `E:\netase\wkf\微信web开发者工具\cli.bat`（用 CLI 前需在 IDE 里开「设置 → 安全设置 → 服务端口」） |

**签名**（升级必须用同一个，丢了就无法覆盖安装）：

```
F:\aiwork\keystore\fitloop-release.jks      ← 密钥
F:\aiwork\keystore\credentials.txt          ← 密码（明文，注意保管）
```

`*.jks` 已在 `.gitignore`，**没有进仓库**。签名通过环境变量注入：

```bash
FITLOOP_KEYSTORE / FITLOOP_STORE_PASSWORD / FITLOOP_KEY_ALIAS / FITLOOP_KEY_PASSWORD
```

---

## 8. 环境坑（踩过的，别再踩）

1. **沙箱下 git 必须带 openssl 后端**：`git -c http.sslBackend=openssl push ...`，否则 `SEC_E_NO_CREDENTIALS`。
2. **PowerShell 5.1 读 UTF-8 会乱码**：改含中文的源码/文件用 `node` 或 `[System.IO.File]::ReadAllText(..., UTF8)`，不要用 `Get-Content -Raw` 直接替换。
3. **脚本内字符串替换踩过雷**：早期用 PowerShell 正则改 `package-lock.json` 写坏成 `registry\.npmjs\.org`，导致 CI `npm ci` 全挂 —— 改 JSON/lock 一律用 node。
4. **CI 需要 `workflow` scope**：gh token 默认没有，推 `.github/workflows/` 会被拒；`gh auth refresh -s workflow` 补一次。
5. **端口/进程**：本地静态预览 `http://127.0.0.1:8081/fit-loop/`（`ghpages-serve.mjs`）；`next start` 用 3000。
6. **Clash 节点失效**会导致访问 GitHub/Google 全超时（表现为 `Invoke-WebRequest` 卡死）；切「自动选择」组里的可用节点。

---

## 9. 已知限制 / 未完成

| 项 | 状态 | 备注 |
| --- | --- | --- |
| 微信小程序发布 | ❌ 阻塞 | 需注册正式 AppID（个人主体可注册），代码已就绪，`npm run set-mp-appid -- wx...` + `npm run upload:mp` 即可 |
| iOS 原生 | ❌ 未做 | 需 macOS + Xcode + 开发者账号 |
| 离线识别覆盖中餐 | ❌ 做不到 | ImageNet 里没有中餐类；要认中餐只能靠云端模型或自训数据集 |
| UI 夜间可爱版 | ⏳ 待定 | 已做好「夜空小狐」（`night` 主题），用户尚未拍板是否替换现夜间款 |
| 首页大表情宠物 | ⏳ 待定 | 目前只有右下角常驻宠物 |
| 动效/微交互 | ⏳ 未做 | 页面切换、数值变化都还没做过渡动画 |
| 上架 Google Play | ❌ 未做 | 需 $25 一次性开发者账号，我可出 AAB 与素材 |
| 依赖漏洞 | ⚠️ 遗留 | 上轮 `npm audit` 报 4 个（3 high），`npm audit fix` 可修但未验证回归 |
| ESLint | ⚠️ 缺失 | 项目从来没有 ESLint 配置，`npm run lint` 会进交互式提问 |

---

## 10. 排查速查

| 现象 | 先看 |
| --- | --- |
| 线上打不开 / 404 | GitHub Actions 最近一次 run 是否绿；`gh run list --limit 1` |
| 页面白屏 | 本地 `npm run build:static` 后看 `out/`；再用浏览器 console |
| 改完 UI 线上没变 | 是否 push 了；Pages CDN 约 1 分钟；强刷或加 `?v=时间戳` |
| APK 装不上 | 旧包是否同签名（不同签名要先卸载）；`adb install -r` |
| 通知不响 | Android 13+ 通知权限；电池优化是否限制后台 |
| Health Connect 显示不可用 | Android 13 及以下需装 Health Connect 应用；APP 里有「打开 Health Connect」按钮 |
| 小程序传不上去 | AppID 是否测试号（测试号不支持发布） |

---

## 11. 接手第一天建议做的三件事

1. `npm install && npm test` 跑一遍，确认 55 条单测绿。
2. 打开 https://coldrebase.github.io/fit-loop/ 手机走一遍：建档 → 生成计划 → 练一次 → 记一餐 → 看周报。
3. 到 https://github.com/coldrebase/fit-loop/actions 点一次 **Run workflow**，确认自己会发版。

---

## 12. 一句话交接

**网页和 APK 两条线是活的、能用的；小程序和小程序审核、iOS、应用商店还没打通；所有"高级"功能（识别、Health Connect、通知）都依赖原生层，网页版会自动降级而不是报错。**

有任何「某文件为什么这么写」的疑问，先看 `AUDIT-2026-10-20.md`（上轮审计与修复记录），再翻 `android-app/README.md`、`miniprogram/README.md` 两份子文档。