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

## 后续可加的原生能力

- **Health Connect 读取**：`androidx.health.connect` + 权限声明 + 原生插件，可直接读体重/睡眠
- **本地通知**：饮水/训练提醒不再依赖页面在前台
- **后台步数**：需要 `ACTIVITY_RECOGNITION` 权限与前台服务