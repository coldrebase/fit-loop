"use client";

/**
 * 拍照识别客户端（App 内直连视觉模型）
 * ---------------------------------------------------------------------------
 * 为什么不再走 /api/vision/analyze：
 *   静态站点（GitHub Pages / Capacitor APK）没有服务端，代理路由不存在。
 * 现在的做法：
 *   - 用户在「我的 → 识别服务」里填 API 地址、密钥、模型（存在本机，不上传）
 *   - App 直接把图片发给该 OpenAI 兼容接口，只解析候选食物名与热量区间
 *   - 仍然遵守「不伪造精确值」：只给区间，份量/烹饪/用油都要用户确认
 */

import type { VisionResult } from "./types";
import type { CookingMethod } from "./types";

const COOKING_METHODS: CookingMethod[] = [
  "raw",
  "steamed",
  "boiled",
  "stir_fried",
  "pan_fried",
  "deep_fried",
  "braised",
  "roasted",
  "air_fryer",
  "other",
];

export interface VisionConfig {
  baseUrl: string;
  apiKey: string;
  model: string;
}

const KEY = "fitloop-vision";

export const DEFAULT_VISION_CONFIG: VisionConfig = {
  baseUrl: "https://api.openai.com/v1",
  apiKey: "",
  model: "gpt-4o-mini",
};

export function getVisionConfig(): VisionConfig {
  if (typeof localStorage === "undefined") return DEFAULT_VISION_CONFIG;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return DEFAULT_VISION_CONFIG;
    const parsed = JSON.parse(raw) as Partial<VisionConfig>;
    return {
      baseUrl: (parsed.baseUrl || DEFAULT_VISION_CONFIG.baseUrl).replace(/\/+$/, ""),
      apiKey: parsed.apiKey || "",
      model: parsed.model || DEFAULT_VISION_CONFIG.model,
    };
  } catch {
    return DEFAULT_VISION_CONFIG;
  }
}

export function setVisionConfig(cfg: VisionConfig): void {
  const clean: VisionConfig = {
    baseUrl: cfg.baseUrl.trim().replace(/\/+$/, ""),
    apiKey: cfg.apiKey.trim(),
    model: cfg.model.trim() || DEFAULT_VISION_CONFIG.model,
  };
  localStorage.setItem(KEY, JSON.stringify(clean));
}

export function clearVisionConfig(): void {
  localStorage.removeItem(KEY);
}

export function hasVisionConfig(): boolean {
  const c = getVisionConfig();
  return !!c.apiKey && !!c.baseUrl && !!c.model;
}

const LIMITATIONS = [
  "照片无法可靠判断食物重量，必须由你自己估计或称量份量。",
  "看不到隐藏配料（调味汁、糖、油、酱料），需要你手动补充。",
  "识别结果只是候选，可能有误；请确认后再入账。",
  "热量为区间估算，不是精确值。",
];

const PROMPT = `你是食物识别助手。看这张照片，列出画面里最主要的食物。
严格要求：
1. 只输出 JSON，不要任何解释文字或 markdown 代码块。
2. 最多 5 个候选，按可信度从高到低。
3. 不准编造重量与精确热量；热量只给区间（千卡/100 克）。
4. 拿不准就给低 confidence。
格式：
{"candidates":[{"name":"食物中文名","suggestedCooking":"raw|steamed|boiled|stir_fried|pan_fried|deep_fried|braised|roasted|air_fryer|other","confidence":0.0到1.0,"estimateKcalRange":[下限,上限]}]}`;

interface ChatResponse {
  choices?: { message?: { content?: string } }[];
  error?: { message?: string };
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error ?? new Error("读取图片失败"));
    reader.readAsDataURL(file);
  });
}

/** 调用视觉模型识别图片，返回与本应用既有 VisionResult 一致的结构 */
export async function analyzePhoto(file: File): Promise<VisionResult> {
  const cfg = getVisionConfig();
  if (!cfg.apiKey) {
    return { status: "not_configured", limitations: LIMITATIONS };
  }
  if (file.size > 8 * 1024 * 1024) {
    return { status: "error", message: "图片过大（上限 8MB），请压缩后重试。", limitations: LIMITATIONS };
  }

  let dataUrl: string;
  try {
    dataUrl = await fileToDataUrl(file);
  } catch {
    return { status: "error", message: "无法读取这张图片。", limitations: LIMITATIONS };
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 45000);
  try {
    const res = await fetch(`${cfg.baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${cfg.apiKey}`,
      },
      signal: controller.signal,
      body: JSON.stringify({
        model: cfg.model,
        temperature: 0.2,
        max_tokens: 600,
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: PROMPT },
              { type: "image_url", image_url: { url: dataUrl } },
            ],
          },
        ],
      }),
    });

    if (!res.ok) {
      if (res.status === 401 || res.status === 403) {
        return {
          status: "error",
          message: "识别服务拒绝访问（密钥无效或无权限）。请到「我的 → 识别服务」检查密钥。",
          limitations: LIMITATIONS,
        };
      }
      if (res.status === 429) {
        return { status: "error", message: "识别服务限流或额度不足，请稍后再试。", limitations: LIMITATIONS };
      }
      return {
        status: "error",
        message: `识别服务返回 ${res.status}，请稍后重试或手动记录。`,
        limitations: LIMITATIONS,
      };
    }

    let payload: ChatResponse;
    try {
      payload = (await res.json()) as ChatResponse;
    } catch {
      return { status: "error", message: "识别服务返回了无法解析的内容。", limitations: LIMITATIONS };
    }

    const content = payload.choices?.[0]?.message?.content ?? "";
    const jsonText = content.replace(/^```(?:json)?/i, "").replace(/```$/, "").trim();
    let parsed: { candidates?: unknown } = {};
    try {
      parsed = JSON.parse(jsonText);
    } catch {
      // 模型偶尔会包一层文字，退化到截取第一个 JSON 对象
      const m = /\{[\s\S]*\}/.exec(jsonText);
      if (m) {
        try {
          parsed = JSON.parse(m[0]);
        } catch {
          parsed = {};
        }
      }
    }

    const raw = Array.isArray(parsed.candidates) ? parsed.candidates : [];
    const candidates = raw
      .map((c) => c as Record<string, unknown>)
      .filter((c) => typeof c?.name === "string" && String(c.name).trim())
      .slice(0, 5)
      .map((c) => {
        const cooking =
          typeof c.suggestedCooking === "string" && (COOKING_METHODS as string[]).includes(String(c.suggestedCooking))
            ? (c.suggestedCooking as CookingMethod)
            : undefined;
        const range = Array.isArray(c.estimateKcalRange) ? c.estimateKcalRange : [];
        const lo = Number(range[0]);
        const hi = Number(range[1]);
        const conf = Number(c.confidence);
        return {
          name: String(c.name).trim().slice(0, 40),
          suggestedCooking: cooking,
          confidence: Number.isFinite(conf) ? Math.max(0, Math.min(1, conf)) : undefined,
          estimateKcalRange: Number.isFinite(lo) && Number.isFinite(hi) && hi >= lo ? ([lo, hi] as [number, number]) : undefined,
        };
      });

    if (!candidates.length) {
      return {
        status: "not_found",
        message: "没能从这张照片里识别出确定的食物，请手动记录。",
        limitations: LIMITATIONS,
      };
    }

    return {
      status: "ok",
      candidates,
      limitations: LIMITATIONS,
      provider: cfg.model,
      queriedAt: new Date().toISOString(),
    };
  } catch (e) {
    const aborted = e instanceof Error && e.name === "AbortError";
    return {
      status: "error",
      message: aborted
        ? "识别超时（45 秒），请检查网络后重试。"
        : `请求失败：${e instanceof Error ? e.message : String(e)}`,
      limitations: LIMITATIONS,
    };
  } finally {
    clearTimeout(timer);
  }
}