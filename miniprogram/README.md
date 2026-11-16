# FitLoop 微信小程序版

由同仓库的 Next.js 网页版移植而来。**逻辑层直接复用** `src/lib`，只把 UI 与存储层换成小程序实现。

## 为什么不是「把网页打包上传」

小程序没有 DOM / IndexedDB，只有 WXML/WXSS + `wx.*` API。Next.js 的静态产物（HTML/CSS/JS）无法在小程序里运行。
`web-view` 方案又要求「业务域名」且该域名需在工信部备案，GitHub Pages 域名满足不了，因此选择原生移植。

## 目录

```
miniprogram/
  app.js / app.json / app.wxss   小程序入口、路由与设计令牌（含日/夜间配色）
  project.config.json            AppID 与编译设置
  pages/
    home/      今日：摄入、饮水、体重、今日训练
    train/     训练：生成计划、训练日列表、开训
    run/       训练中：逐组记录重量/次数/RPE/时长
    diet/      饮食：餐次汇总、搜索内置食物、按克数加入
    progress/  进展：周报（完成率/容量/营养/体重/恢复/注意事项）
    me/        我的：档案编辑、日夜间切换、数据导出与清空
  utils/mp.js  页面共用：日期、档案引导、营养汇总等
  lib/fitloop.js   ← 生成物，勿手改（见下）
  src/db-wx.ts     wx storage 版存储层（构建时顶替 src/lib/db.ts）
```

## 逻辑层构建

`lib/fitloop.js` 是 `src/lib` 的打包产物：构建时复制 `src/lib`，把 `db.ts` 换成 `src/db-wx.ts`，
再以纯逻辑入口打成 CommonJS（约 160 KB）。

```bash
npm run build:mp      # = node scripts/build-mp.mjs
```

改动 `src/lib/**` 后必须重跑，否则小程序逻辑仍是旧的。网页版与小程序的营养/计划/周报算法因此**始终同源**。

## 打开与上传

```bash
# 打开工程（需先在 IDE 里开启「设置 → 安全设置 → 服务端口」）
"C:\Program Files\...\cli.bat" open --project <本目录>

# 上传开发版（版本号 + 说明）
"C:\Program Files\...\cli.bat" upload --project <本目录> -v 0.1.0 -d "版本说明"
```

当前 AppID：`wxe45889553e945b30`（在 `project.config.json` 里，可自行替换）。


## 接入正式 AppID（发布前必做）

当前 `project.config.json` 里的 AppID 是**测试号**（`wxe45889553e945b30`）。测试号不能上传发布、没有版本管理，只能本机预览。

### 1. 注册正式小程序

https://mp.weixin.qq.com → 立即注册 → 小程序

- 邮箱必须**未注册过**公众号/小程序
- 个人主体：身份证 + 微信实名（免费）
- 类目建议：健康 → 健康管理；或 工具 → 效率
- 注册完成后在「开发 → 开发管理 → 开发设置」拿到 **AppID**

### 2. 切换 AppID 并上传

```bash
# 改仓库内工程 + IDE 里那份工程
npm run set-mp-appid -- wx1234567890abcdef --dir "C:\Users\yh\WeChatProjects\fitloop-mini"

# 重新打开工程（IDE 里关掉再打开，或）
& "E:\netase\wkf\微信web开发者工具\cli.bat" open --project "C:\Users\yh\WeChatProjects\fitloop-mini"

# 上传开发版
npm run upload:mp -- -v 0.1.0 -d "首个版本" --dir "C:\Users\yh\WeChatProjects\fitloop-mini"
```

### 3. 设为体验版 / 提交审核

mp.weixin.qq.com → 管理 → **版本管理** → 开发版本 → 选为体验版（加体验成员扫码）
确认无误后 → 提交审核 → 审核通过后发布。

### 审核前检查

- [ ] 已填「设置 → 基本设置 → 服务类目」
- [ ] 已填「设置 → 服务内容声明 → 用户隐私保护指引」（本地存储，不上传服务器）
- [ ] 小程序名称不含「FitLoop」以外的品牌词，不与已有名称冲突
- [ ] 若声明健康类功能，个人主体可能被要求补充资质，必要时改为「工具-效率」描述

## 与网页版的差异

| 能力 | 网页版 | 小程序版 |
| --- | --- | --- |
| 存储 | IndexedDB | `wx.setStorageSync`（上限约 10MB / 单 key 1MB） |
| 演示数据 | 支持 | 未接入 |
| 联网食物库 / 拍照识别 | 需配密钥的服务端代理 | 未接入（小程序不支持该代理形态） |
| 训练计时器 | 有组间倒计时 | 无（仅按组记录） |
| 动作演示 | 抖音搜索链接 | 未接入（小程序不允许随意跳转外链） |
| 日 / 夜间模式 | 支持 | 支持（`fitloop-mode` 存本地） |

## 数据说明

所有记录存在本机小程序存储里，不上传服务器；换设备或删除小程序数据即丢失。删除小程序不会自动备份。