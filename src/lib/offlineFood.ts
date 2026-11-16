"use client";

/**
 * 离线食物粗识别（实验）
 * ---------------------------------------------------------------------------
 * 用 APK 内置的 MobileNetV1（ImageNet 1000 类）本地分类，不联网、零成本。
 * 局限要说清楚：只能覆盖 ImageNet 里那几十种食物（西式为主），
 * 中文菜系几乎识别不了，置信度也偏低，所以结果只作为「候选」。
 */

import { registerPlugin } from "@capacitor/core";

interface RawCategory {
  label: string;
  score: number;
}

interface FoodClassifierPlugin {
  available(): Promise<{ available: boolean }>;
  classify(options: { image: string }): Promise<{ candidates: RawCategory[]; model: string }>;
}

const plugin = registerPlugin<FoodClassifierPlugin>("FoodClassifier");

function native(): boolean {
  const cap = (globalThis as unknown as { Capacitor?: { isNativePlatform?: () => boolean } }).Capacitor;
  return !!cap?.isNativePlatform?.();
}

export function offlineClassifierSupported(): boolean {
  return native();
}

/**
 * ImageNet 标签 → 中文名（只挑食物类，其余一律不认）
 * 键为 ImageNet 的英文标签（小写），值为本应用展示用的中文名。
 */
const FOOD_LABELS: Record<string, string> = {
  banana: "香蕉",
  apple: "苹果",
  orange: "橙子",
  lemon: "柠檬",
  strawberry: "草莓",
  pineapple: "菠萝",
  pomegranate: "石榴",
  fig: "无花果",
  jackfruit: "菠萝蜜",
  "custard apple": "番荔枝",
  broccoli: "西兰花",
  cauliflower: "菜花",
  zucchini: "西葫芦",
  cucumber: "黄瓜",
  artichoke: "洋蓟",
  "bell pepper": "甜椒",
  mushroom: "蘑菇",
  cabbage: "卷心菜",
  "head cabbage": "卷心菜",
  corn: "玉米",
  "acorn squash": "南瓜",
  "butternut squash": "南瓜",
  "spaghetti squash": "南瓜",
  "ear of corn": "玉米",
  pizza: "披萨",
  hamburger: "汉堡",
  cheeseburger: "汉堡",
  "hot dog": "热狗",
  hotdog: "热狗",
  sandwich: "三明治",
  burrito: "墨西哥卷饼",
  taco: "塔可",
  guacamole: "牛油果酱",
  sushi: "寿司",
  pretzel: "椒盐卷饼",
  bagel: "贝果",
  "french loaf": "法棍",
  cheesecake: "芝士蛋糕",
  "ice cream": "冰淇淋",
  "ice lolly": "冰棍",
  "chocolate sauce": "巧克力酱",
  carbonara: "奶油培根面",
  "meat loaf": "肉馅糕",
  potpie: "馅饼",
  espresso: "浓缩咖啡",
  "cup of coffee": "咖啡",
  coffee: "咖啡",
  eggnog: "蛋奶酒",
  "red wine": "红酒",
  beer: "啤酒",
  "mashed potato": "土豆泥",
  potato: "土豆",
  "baked potato": "烤土豆",
  "sweet potato": "红薯",
  "spaghetti": "意面",
};

export interface OfflineCandidate {
  label: string;
  score: number;
  chinese?: string;
}

export interface OfflineResult {
  supported: boolean;
  candidates: OfflineCandidate[];
  /** 有多少条被翻译成中文（可直接拿去匹配本地食物库） */
  matched: number;
  error?: string;
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const s = String(reader.result ?? "");
      resolve(s.includes(",") ? s.slice(s.indexOf(",") + 1) : s);
    };
    reader.onerror = () => reject(reader.error ?? new Error("读取图片失败"));
    reader.readAsDataURL(file);
  });
}

export async function classifyOffline(file: File): Promise<OfflineResult> {
  if (!native()) return { supported: false, candidates: [], matched: 0 };

  try {
    const image = await fileToBase64(file);
    const res = await plugin.classify({ image });
    const candidates: OfflineCandidate[] = (res.candidates ?? [])
      .map((c) => {
        const key = String(c.label ?? "").toLowerCase().trim();
        return { label: String(c.label ?? ""), score: Number(c.score) || 0, chinese: FOOD_LABELS[key] };
      })
      .filter((c) => c.score >= 0.12);

    return {
      supported: true,
      candidates,
      matched: candidates.filter((c) => !!c.chinese).length,
    };
  } catch (e) {
    return {
      supported: true,
      candidates: [],
      matched: 0,
      error: e instanceof Error ? e.message : String(e),
    };
  }
}