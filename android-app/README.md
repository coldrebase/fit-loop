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

## 后续可加的原生能力

- **Health Connect 读取**：`androidx.health.connect` + 权限声明 + 原生插件，可直接读体重/睡眠
- **本地通知**：饮水/训练提醒不再依赖页面在前台
- **后台步数**：需要 `ACTIVITY_RECOGNITION` 权限与前台服务