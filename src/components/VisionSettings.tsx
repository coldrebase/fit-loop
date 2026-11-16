"use client";

import { useEffect, useState } from "react";
import { toast } from "@/components/ui";
import {
  DEFAULT_VISION_CONFIG,
  clearVisionConfig,
  getVisionConfig,
  hasVisionConfig,
  setVisionConfig,
  type VisionConfig,
} from "@/lib/visionClient";

/**
 * 识别服务设置：AI 拍照识别要用的 OpenAI 兼容接口。
 * 密钥只存本机 localStorage，不上传任何服务器。
 */
export function VisionSettings() {
  const [cfg, setCfg] = useState<VisionConfig>(DEFAULT_VISION_CONFIG);
  const [configured, setConfigured] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setCfg(getVisionConfig());
    setConfigured(hasVisionConfig());
  }, []);

  async function test() {
    setBusy(true);
    try {
      const base = cfg.baseUrl.trim().replace(/\/+$/, "");
      const res = await fetch(`${base}/models`, {
        headers: { authorization: `Bearer ${cfg.apiKey.trim()}` },
      });
      if (res.ok) toast("连接正常", "ok");
      else if (res.status === 401) toast("密钥无效", "err");
      else toast(`服务返回 ${res.status}`, "warn");
    } catch (e) {
      toast(`连不上：${e instanceof Error ? e.message : "网络错误"}`, "err");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-2">
      <div className="text-[11.5px] leading-relaxed text-ink-faint">
        拍照识别会把照片发给你填的这个服务商。密钥只存在本机，不经过我们的服务器。
        推荐 OpenAI（gpt-4o-mini）或任意 OpenAI 兼容中转。
      </div>

      <div>
        <div className="label">API 地址</div>
        <input
          className="input"
          value={cfg.baseUrl}
          placeholder="https://api.openai.com/v1"
          onChange={(e) => setCfg({ ...cfg, baseUrl: e.target.value })}
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
        />
      </div>

      <div>
        <div className="label">API 密钥</div>
        <input
          className="input"
          type="password"
          value={cfg.apiKey}
          placeholder="sk-..."
          onChange={(e) => setCfg({ ...cfg, apiKey: e.target.value })}
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
        />
      </div>

      <div>
        <div className="label">模型</div>
        <input
          className="input"
          value={cfg.model}
          placeholder="gpt-4o-mini"
          onChange={(e) => setCfg({ ...cfg, model: e.target.value })}
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
        />
      </div>

      <div className="flex gap-2 pt-1">
        <button
          className="btn-secondary flex-1"
          onClick={() => void test()}
          disabled={busy || !cfg.apiKey.trim()}
        >
          {busy ? "测试中…" : "测试连接"}
        </button>
        <button
          className="btn-primary flex-1"
          onClick={() => {
            setVisionConfig(cfg);
            setConfigured(hasVisionConfig());
            toast(hasVisionConfig() ? "已保存，拍照识别可用" : "已保存（密钥为空则不启用）", "ok");
          }}
        >
          保存
        </button>
      </div>

      {configured && (
        <button
          className="btn-ghost w-full text-alert"
          onClick={() => {
            clearVisionConfig();
            setCfg(getVisionConfig());
            setConfigured(false);
            toast("已清除识别服务配置", "ok");
          }}
        >
          清除配置
        </button>
      )}
    </div>
  );
}