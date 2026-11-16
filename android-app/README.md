# FitLoop 原生 App（Android / Capacitor）

用 Capacitor 把同仓库的网页版（`out/`）封装成真正的 Android 应用：独立图标、全屏、离线可用、可安装 APK。

> **iOS 说明**：iOS 原生必须 macOS + Xcode + Apple Developer 账号（$99/年）才能编译与安装。
> 这个工程是标准 Capacitor 项目，在 Mac 上 `npx cap add ios` 即可生成 iOS 工程继续开发。

## 结构

```
capacitor.config.json      appId / appName / webDir=out
android/                   Capacitor 生成的 Android 工程（Gradle）
  app/src/main/assets/public/   ← 打包进去的网页产物（由 cap copy 生成，勿手改）
scripts/build-apk.mjs      一条命令：静态导出 → cap copy → gradle 打包
```

## 环境要求

- JDK 17+（`JAVA_HOME`）
- Android SDK（`ANDROID_HOME`）：`platform-tools`、`platforms;android-34`、`build-tools;34.0.0`
- 可选：发布签名，通过环境变量传入（密钥文件不要进仓库）

```bash
export FITLOOP_KEYSTORE=/path/fitloop-release.jks
export FITLOOP_STORE_PASSWORD=...
export FITLOOP_KEY_ALIAS=fitloop
export FITLOOP_KEY_PASSWORD=...
```

## 打包

```bash
npm run build:apk          # 有签名 → release；无签名 → debug
npm run build:apk -- --debug
```

产物在 `dist/FitLoop-release.apk`（或 `debug`）。

## 安装

手机打开「允许安装未知来源应用」→ 传输 APK → 点击安装。

## 与网页版 / PWA 的差别

| | 网页 PWA | 原生 APK |
| --- | --- | --- |
| 图标 / 全屏 | 添加到主屏幕 | 真·应用图标，桌面直接装 |
| 分发 | 发链接 | 发 APK 文件 |
| 离线 | Service Worker | 网页资源打包进 APK，天然离线 |
| 系统健康数据 | 只能导出导入 | 可接入 Health Connect（需另写原生插件） |
| 上架应用商店 | — | 需 Google Play 开发者账号（$25 一次性） |



## 已接入的原生能力

### 1) 本地通知（@capacitor/local-notifications）

「我的 → 提醒」保存时同步为系统通知：

- 饮水提醒：按间隔在工作时段（9:00–21:00）内排期，最多 8 条
- 活动提醒：同上
- 训练提醒：每天指定时间

Android 13+ 会弹一次通知权限；拒绝后设置仍保存，只是不排期。
网页/PWA 下这些调用自动跳过，不报错。

### 2) Health Connect 直读（自写 Kotlin 插件）

「我的 → 健康数据 → 导入」页在原生 App 里会多出一张 **Health Connect** 卡片：

- 一键授权 → 读取最近 30 天体重 / 睡眠 / 静息心率
- 读到的数据仍走「预览 → 确认导入」流程，不静默写入
- 静息心率只统计不落库（本应用无对应字段）

实现：`android/app/src/main/java/app/fitloop/mobile/HealthConnectPlugin.kt`
（Health Connect 客户端是 Kotlin 协程 API，所以插件用 Kotlin 写；工程已启用 kotlin-android 插件）

权限声明（AndroidManifest）：

```xml
android.permission.health.READ_WEIGHT
android.permission.health.READ_SLEEP
android.permission.health.READ_RESTING_HEART_RATE
```

已知约束：

- minSdk 提升到 **26**（Android 8.0），因为 Health Connect 客户端库要求
- Health Connect 依赖为 `androidx.health.connect:connect-client:1.1.0-alpha07`（1.1.0 稳定版要求 AGP 8.9 + compileSdk 36，本工程是 AGP 8.2 + compileSdk 34）
- Android 14+ 系统内置 Health Connect；Android 9–13 需从商店安装 Health Connect 应用


### 3) 拍照识别食物热量

「我的 → 识别服务」填入 **OpenAI 兼容**的 Base URL + 密钥 + 模型（密钥只存本机 localStorage）。

之后在「饮食 → 拍照识别」：

1. 勾选用途同意 → 拍照/选图（Android WebView 会打开相机或相册）
2. App **直接**调用你配置的视觉模型（不走本应用服务器，静态版也没有服务器）
3. 模型只返回候选食物名 + 热量区间 + 建议烹饪方式，非法烹饪方式会被丢弃
4. 你在本地食物库里匹配份量 → 显示区间（如 140–269 kcal）→ 手动确认后才写入日志

设计约束（沿用项目既有原则）：照片无法确定重量与配料，因此**只给区间、不自动写入、不伪造精确值**。

链路由 `src/lib/visionClient.ts` 实现；未配置密钥时仍显示「未接入」，不会假装识别成功。


### 4) 离线粗识别（无密钥时的兜底）

APK 内置 MobileNetV1（ImageNet 1000 类，量化版 4.1MB，Task Library 从 metadata 读标签）：

- 完全离线、零成本，不发任何请求
- 只把 ImageNet 里的几十种食物标签映射成中文（香蕉/苹果/西兰花/披萨/汉堡/寿司/咖啡…）
- 非食物标签或本地食物库没有的，直接返回「没认出来」，不猜
- 界面上明确标注「离线模式 · 粗分类」，并追加一条局限性说明

实现：`FoodClassifierPlugin.kt`（Bitmap → TensorImage → ImageClassifier），
标签映射在 `src/lib/offlineFood.ts`。

**体积代价**：TFLite 原生库较大，因此限制 `abiFilters 'arm64-v8a','armeabi-v7a'`，
APK 从 ~36MB 降到 ~20MB（只装真机，不含模拟器架构）。

## 后续可加的原生能力

- **Health Connect 读取**：`androidx.health.connect` + 权限声明 + 原生插件，可直接读体重/睡眠
- **本地通知**：饮水/训练提醒不再依赖页面在前台
- **后台步数**：需要 `ACTIVITY_RECOGNITION` 权限与前台服务