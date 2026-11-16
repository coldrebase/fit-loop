"use client";

import { useEffect, useState } from "react";

/**
 * 小宠物（页面常驻的吉祥物）
 * ---------------------------------------------------------------------------
 * 三种形态跟随主题：
 *   cream → 布丁猫    mint → 薄荷熊    night → 夜狐    其它 → 布丁猫
 * 固定在右下角、底部导航上方，点一下会换一句话；带轻微上下浮动动画。
 */

export type PetSpecies = "cat" | "bear" | "fox";

const SPECIES_BY_THEME: Record<string, PetSpecies> = {
  cream: "cat",
  mint: "bear",
  night: "fox",
  paper: "cat",
};

const LINES: Record<PetSpecies, string[]> = {
  cat: ["今天也要好好吃饭喵～", "记得喝水哟 🐾", "练完记得拉伸！", "别熬夜啦，会掉毛的"],
  bear: ["抱抱！先做一组热身吧", "蜂蜜…不对，蛋白粉在哪？", "慢慢来，不着急", "今天也很棒！"],
  fox: ["夜色正好，适合活动一下", "累了就休息，不丢人", "我陪着你，慢慢来", "睡前别看手机啦"],
};

function useSpecies(): PetSpecies {
  const [species, setSpecies] = useState<PetSpecies>("cat");
  useEffect(() => {
    const read = () => {
      const t = document.documentElement.dataset.theme ?? "paper";
      setSpecies(SPECIES_BY_THEME[t] ?? "cat");
    };
    read();
    const mo = new MutationObserver(read);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => mo.disconnect();
  }, []);
  return species;
}

function CatFace() {
  return (
    <>
      <path d="M10 22 L12 8 L22 15 Z" fill="currentColor" />
      <path d="M54 22 L52 8 L42 15 Z" fill="currentColor" />
      <ellipse cx="32" cy="34" rx="22" ry="19" fill="currentColor" />
      <ellipse cx="24" cy="32" rx="3" ry="3.6" fill="#2E2320" />
      <ellipse cx="40" cy="32" rx="3" ry="3.6" fill="#2E2320" />
      <ellipse cx="15" cy="40" rx="4" ry="2.6" fill="#FF9DBE" opacity="0.85" />
      <ellipse cx="49" cy="40" rx="4" ry="2.6" fill="#FF9DBE" opacity="0.85" />
      <path d="M29 38 q3 3 6 0" stroke="#2E2320" strokeWidth="2" fill="none" strokeLinecap="round" />
    </>
  );
}

function BearFace() {
  return (
    <>
      <circle cx="16" cy="16" r="9" fill="currentColor" />
      <circle cx="48" cy="16" r="9" fill="currentColor" />
      <ellipse cx="32" cy="34" rx="22" ry="20" fill="currentColor" />
      <ellipse cx="32" cy="40" rx="9" ry="7" fill="#FFF6E8" opacity="0.9" />
      <ellipse cx="24" cy="30" rx="3" ry="3.4" fill="#2E2320" />
      <ellipse cx="40" cy="30" rx="3" ry="3.4" fill="#2E2320" />
      <ellipse cx="13" cy="38" rx="4" ry="2.6" fill="#FFAFBE" opacity="0.8" />
      <ellipse cx="51" cy="38" rx="4" ry="2.6" fill="#FFAFBE" opacity="0.8" />
      <ellipse cx="32" cy="38" rx="3" ry="2.2" fill="#2E2320" />
    </>
  );
}

function FoxFace() {
  return (
    <>
      <path d="M8 20 L10 6 L22 14 Z" fill="currentColor" />
      <path d="M56 20 L54 6 L42 14 Z" fill="currentColor" />
      <ellipse cx="32" cy="34" rx="22" ry="19" fill="currentColor" />
      <path d="M16 40 q16 14 32 0 q-16 6 -32 0" fill="#FFF3E6" opacity="0.95" />
      <ellipse cx="24" cy="31" rx="3" ry="3.6" fill="#2B2030" />
      <ellipse cx="40" cy="31" rx="3" ry="3.6" fill="#2B2030" />
      <ellipse cx="32" cy="42" rx="3.2" ry="2.4" fill="#2B2030" />
      <ellipse cx="14" cy="38" rx="4" ry="2.6" fill="#FF9DBE" opacity="0.75" />
      <ellipse cx="50" cy="38" rx="4" ry="2.6" fill="#FF9DBE" opacity="0.75" />
    </>
  );
}

export function Mascot({ inline = false }: { inline?: boolean }) {
  const species = useSpecies();
  const [line, setLine] = useState(0);
  const [bubble, setBubble] = useState(false);

  useEffect(() => {
    setLine(0);
  }, [species]);

  const pool = LINES[species];
  const color =
    species === "bear" ? "#F6C88E" : species === "fox" ? "#FFB07C" : "#FFC7DD";

  const face = species === "bear" ? <BearFace /> : species === "fox" ? <FoxFace /> : <CatFace />;

  return (
    <div
      className={
        inline
          ? "relative flex items-end gap-2"
          : "pointer-events-none fixed inset-x-0 bottom-0 z-30 mx-auto flex w-full max-w-[560px] justify-end px-3"
      }
      style={inline ? undefined : { paddingBottom: "calc(var(--safe-bottom, 0px) + 78px)" }}
    >
      {bubble && (
        <div className="pointer-events-auto mb-3 max-w-[190px] rounded-2xl border border-paper-line bg-paper-card px-3 py-2 text-[12px] leading-snug text-ink-soft shadow-lift">
          {pool[line % pool.length]}
        </div>
      )}
      <button
        type="button"
        aria-label="小宠物"
        onClick={() => {
          setBubble((b) => !b);
          setLine((l) => l + 1);
        }}
        className="pointer-events-auto mb-1 shrink-0 animate-[pet-bob_2.6s_ease-in-out_infinite] drop-shadow-[0_6px_10px_rgba(0,0,0,0.10)]"
        style={{ color }}
      >
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" aria-hidden="true">
          {face}
        </svg>
      </button>
    </div>
  );
}