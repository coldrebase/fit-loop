"use client";

import { useState } from "react";
import { MUSCLE_MAP, MUSCLES } from "@/lib/seed/muscles";
import { cx } from "@/lib/utils";

/**
 * 人体肌肉图谱（正面 / 背面）
 * ---------------------------------------------------------------------------
 * 每个肌群都是一条独立的解剖轮廓线（胸大肌的扇形、背阔肌的翼形、
 * 股四头肌的泪滴形、肱二头肌的梭形……），不再用椭圆示意。
 *
 * 坐标约定：
 *   viewBox 0 0 200 400，中线 x = 100；所有肌群只画左半边，
 *   右边用 translate(200,0) scale(-1,1) 镜像 — 保证左右完全对称。
 *   fill/stroke 全部走 CSS 变量，自动跟随日间薄荷 / 夜间夜空狐主题。
 */

type Side = "front" | "back";

/** 肌群轮廓：左半边路径（x ≤ 100） */
interface MusclePath {
  id: string;
  side: Side;
  d: string;
}

const MUSCLE_PATHS: MusclePath[] = [
  /* ------------------------------- 正面 ------------------------------- */
  {
    // 胸大肌锁骨部：从胸骨上缘拉到肩峰，扇形
    id: "chest_upper",
    side: "front",
    d: "M100,68 C94,68 88,69 84,72 C81,75 81,80 84,83 C89,84 95,83 100,82 Z",
  },
  {
    // 胸大肌：胸骨缘 → 肱骨，下缘向外下方收
    id: "chest_mid",
    side: "front",
    d: "M100,84 C92,83 85,85 81,90 C77,97 80,106 87,111 C92,114 97,113 100,111 Z",
  },
  {
    // 三角肌前束：肩峰前方的圆帽（偏内侧）
    id: "front_delts",
    side: "front",
    d: "M84,60 C78,60 72,63 69,70 C67,77 69,84 73,86 C78,87 83,83 84,77 Z",
  },
  {
    // 三角肌中束：肩外侧的条带（偏外侧，和前后束分开）
    id: "side_delts",
    side: "front",
    d: "M69,61 C64,63 60,69 59,77 C58,85 61,91 65,92 C68,88 69,82 69,75 C69,68 69,64 69,61 Z",
  },
  {
    // 肱二头肌：梭形，肘部收成腱
    id: "biceps",
    side: "front",
    d: "M69,90 C63,97 60,108 60,118 C60,128 63,136 67,139 C71,132 72,121 72,110 C72,100 71,94 69,90 Z",
  },
  {
    // 前臂屈肌群：从肘下方逐渐收窄到腕
    id: "forearms",
    side: "front",
    d: "M62,144 C58,154 56,166 55,178 C54,188 55,195 57,199 C60,192 62,180 63,168 C64,156 64,149 62,144 Z",
  },
  {
    // 腹直肌：中线到腹直肌鞘外侧缘
    id: "abs",
    side: "front",
    d: "M100,118 L89,118 C86,130 86,144 88,157 C89,165 91,171 93,175 L100,176 Z",
  },
  {
    // 腹斜肌：腰侧的斜向条带
    id: "obliques",
    side: "front",
    d: "M77,120 C81,134 82,150 79,166 C76,163 74,154 74,142 C74,130 75,124 77,120 Z",
  },
  {
    // 髋屈肌：腹股沟内侧的小三角
    id: "hip_flexors",
    side: "front",
    d: "M100,178 L92,176 C89,180 88,184 90,188 L100,190 Z",
  },
  {
    // 股四头肌：股直肌 + 股外侧肌合成一整块泪滴
    id: "quads",
    side: "front",
    d: "M94,192 C86,197 80,210 78,228 C77,248 79,266 83,280 C87,285 91,282 93,273 C96,254 98,230 98,210 C98,200 96,194 94,192 Z",
  },
  {
    // 大腿内侧（内收肌群）：两腿之间的楔形
    id: "adductors",
    side: "front",
    d: "M100,192 L96,193 C94,207 94,223 96,237 C97,245 98,251 100,254 Z",
  },
  {
    // 胫骨前肌：小腿前外侧的长条
    id: "tibialis",
    side: "front",
    d: "M87,290 C84,302 83,318 84,334 C85,346 86,354 87,358 C89,350 89,334 89,318 C89,304 88,296 87,290 Z",
  },

  /* ------------------------------- 背面 ------------------------------- */
  {
    // 斜方肌上束：从颅底斜向肩峰
    id: "traps",
    side: "back",
    d: "M100,50 C94,53 86,58 79,64 C85,73 93,81 100,86 Z",
  },
  {
    // 三角肌后束
    id: "rear_delts",
    side: "back",
    d: "M78,64 C71,63 65,68 62,76 C60,83 63,90 68,91 C73,91 77,86 78,80 Z",
  },
  {
    // 斜方肌中下束 / 菱形肌
    id: "upper_back",
    side: "back",
    d: "M100,80 C93,82 87,87 85,95 C89,105 95,110 100,112 Z",
  },
  {
    // 背阔肌：从腋下张开成翼，止于腰骶
    id: "lats",
    side: "back",
    d: "M100,94 C93,94 86,98 82,107 C78,120 79,138 83,153 C87,166 93,175 100,178 Z",
  },
  {
    // 竖脊肌：脊柱两侧的长柱
    id: "lower_back",
    side: "back",
    d: "M100,146 L94,147 C91,160 91,174 93,185 L100,187 Z",
  },
  {
    // 肱三头肌：上臂后侧
    id: "triceps",
    side: "back",
    d: "M69,92 C64,100 62,112 62,123 C62,132 65,138 68,141 C72,133 73,121 72,110 C71,100 70,95 69,92 Z",
  },
  {
    // 臀中肌：臀部上外侧
    id: "glute_med",
    side: "back",
    d: "M78,172 C74,176 72,184 74,191 C78,193 82,189 83,181 C83,175 81,172 78,172 Z",
  },
  {
    // 臀大肌：圆隆的臀形，内侧到骶骨
    id: "glutes",
    side: "back",
    d: "M100,182 C93,181 86,185 82,192 C79,202 83,211 90,213 C96,214 100,211 100,205 Z",
  },
  {
    // 腘绳肌：股二头肌 + 半腱肌合成
    id: "hamstrings",
    side: "back",
    d: "M94,216 C87,222 83,236 82,251 C81,265 83,277 87,285 C91,279 94,263 96,245 C97,233 96,221 94,216 Z",
  },
  {
    // 小腿三头肌：腓肠肌两个头的轮廓
    id: "calves",
    side: "back",
    d: "M88,292 C84,300 82,314 83,328 C84,340 86,350 88,356 C91,348 92,332 91,316 C90,304 89,296 88,292 Z",
  },
  {
    // 前臂伸肌群（背面同样可见）
    id: "forearms",
    side: "back",
    d: "M62,144 C58,154 56,166 55,178 C54,188 55,195 57,199 C60,192 62,180 63,168 C64,156 64,149 62,144 Z",
  },
  {
    // 三角肌中束（背面视角，同样在肩外侧）
    id: "side_delts",
    side: "back",
    d: "M62,62 C58,65 56,71 56,78 C56,85 58,90 61,91 C64,87 65,81 65,75 C65,68 64,64 62,62 Z",
  },
];

/** 肌腹内的细节线（左半边，镜像关）：腹部腱划、股四头肌分界线、腘肠肌两头的沟等 */
const DETAILS: Record<string, [number, number, number, number][]> = {
  abs: [
    [88, 134, 100, 134],
    [88, 148, 100, 148],
    [89, 162, 100, 162],
  ],
  quads: [
    [91, 196, 87, 246],
    [87, 246, 84, 276],
  ],
  calves: [[88, 296, 86, 348]],
  biceps: [[67, 96, 64, 132]],
  chest_mid: [[83, 92, 96, 106]],
  lats: [[83, 108, 91, 158]],
  hamstrings: [[92, 222, 87, 278]],
  triceps: [[66, 98, 64, 132]],
};

/** 躯干轮廓（对称，一次画完） */
const TORSO =
  "M100,52 C88,52 78,56 72,62 C66,67 63,74 65,83 C67,93 71,103 73,116 " +
  "C75,130 76,142 74,156 C73,166 71,174 69,181 C79,188 90,190 100,190 " +
  "C110,190 121,188 131,181 C129,174 127,166 126,156 C124,142 125,130 127,116 " +
  "C129,103 133,93 135,83 C137,74 134,67 128,62 C122,56 112,52 100,52 Z";

const MIRROR = "translate(200 0) scale(-1 1)";

function BodySilhouette() {
  return (
    <g aria-hidden="true">
      {/* 头与颈 */}
      <ellipse cx="100" cy="29" rx="13" ry="16.5" className="fill-paper-line" />
      <path d="M92,41 L108,41 L111,55 L89,55 Z" className="fill-paper-line" />
      {/* 躯干 */}
      <path d={TORSO} className="fill-paper-line" />
      {/* 手臂（上臂 / 前臂 / 手） */}
      {[1, -1].map((s) => (
        <g key={s} transform={s === 1 ? undefined : MIRROR}>
          <path
            d="M72,68 C66,88 60,112 58,138"
            fill="none"
            strokeWidth="16"
            strokeLinecap="round"
            className="stroke-paper-line"
          />
          <path
            d="M58,138 C56,160 54,180 52,196"
            fill="none"
            strokeWidth="12"
            strokeLinecap="round"
            className="stroke-paper-line"
          />
          <ellipse cx="51" cy="204" rx="5.5" ry="7.5" className="fill-paper-line" />
        </g>
      ))}
      {/* 腿（大腿 / 小腿 / 脚） */}
      {[1, -1].map((s) => (
        <g key={`leg${s}`} transform={s === 1 ? undefined : MIRROR}>
          <path
            d="M86,190 C85,220 84,252 84,282"
            fill="none"
            strokeWidth="26"
            strokeLinecap="round"
            className="stroke-paper-line"
          />
          <path
            d="M84,282 C83,318 82,348 82,370"
            fill="none"
            strokeWidth="15"
            strokeLinecap="round"
            className="stroke-paper-line"
          />
          <ellipse cx="80" cy="378" rx="8" ry="5" className="fill-paper-line" />
        </g>
      ))}
    </g>
  );
}

export function MuscleMap({
  side,
  selected,
  heat,
  onToggle,
  className,
}: {
  side: Side;
  selected?: string[];
  /** 0-1，用于展示近期训练覆盖度 */
  heat?: Record<string, number>;
  onToggle?: (id: string) => void;
  className?: string;
}) {
  const sel = new Set(selected ?? []);
  const [hover, setHover] = useState<string | null>(null);
  const paths = MUSCLE_PATHS.filter((p) => p.side === side);

  return (
    <svg
      viewBox="0 0 200 400"
      className={cx("mx-auto block max-h-[min(80vh,720px)] w-auto max-w-full", className)}
      role="img"
      aria-label={`人体${side === "front" ? "正面" : "背面"}肌群轮廓图`}
    >
      <BodySilhouette />

      {paths.map((m) => {
        const isSel = sel.has(m.id);
        const isHover = hover === m.id;
        const h = Math.min(1, Math.max(0, heat?.[m.id] ?? 0));
        const fill = isSel
          ? "rgb(var(--c-accent-600))"
          : h > 0
            ? `rgb(var(--c-clay-500) / ${0.18 + h * 0.55})`
            : isHover
              ? "rgb(var(--c-accent-300) / 0.85)"
              : "rgb(var(--c-ink-faint) / 0.28)";
        const stroke = isSel
          ? "rgb(var(--c-accent-700))"
          : isHover
            ? "rgb(var(--c-accent-600))"
            : "rgb(var(--c-card) / 0.9)";
        const name = MUSCLE_MAP[m.id]?.name ?? m.id;

        return (
          <g
            key={`${side}-${m.id}`}
            onClick={onToggle ? () => onToggle(m.id) : undefined}
            onMouseEnter={() => setHover(m.id)}
            onMouseLeave={() => setHover(null)}
            style={{ cursor: onToggle ? "pointer" : "default" }}
          >
            <title>{name}</title>
            {/* 透明加宽描边：小肌群（胫骨前肌、大腿内侧）在手机上也能点中 */}
            {[1, -1].map((s) => (
              <path
                key={`hit${s}`}
                d={m.d}
                transform={s === 1 ? undefined : MIRROR}
                fill="none"
                stroke="rgb(0 0 0 / 0.001)"
                strokeWidth="9"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
                pointerEvents="stroke"
              />
            ))}
            {/* 左右两半：同一轮廓镜像，接缝落在中线 */}
            {[1, -1].map((s) => (
              <path
                key={s}
                d={m.d}
                transform={s === 1 ? undefined : MIRROR}
                fill={fill}
                stroke={stroke}
                strokeWidth={isSel || isHover ? 1.4 : 0.8}
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
                pointerEvents="all"
              />
            ))}
            {/* 肌腹细节线：平时淡、选中时清楚，用来表达“这块肌肉不是一团色块” */}
            {(DETAILS[m.id] ?? []).map((line, i) =>
              [1, -1].map((s) => (
                <line
                  key={`${i}-${s}`}
                  x1={line[0]}
                  y1={line[1]}
                  x2={line[2]}
                  y2={line[3]}
                  transform={s === 1 ? undefined : MIRROR}
                  stroke={isSel ? "rgb(var(--c-accent-700))" : "rgb(var(--c-card) / 0.75)"}
                  strokeWidth={isSel ? 0.9 : 0.6}
                  opacity={isSel ? 0.9 : 0.5}
                  vectorEffect="non-scaling-stroke"
                  pointerEvents="none"
                />
              )),
            )}
          </g>
        );
      })}

      {/* 选中胸大肌时把胸骨缘的沟再强化一下 */}
      {side === "front" && (sel.has("chest_mid") || sel.has("chest_upper")) && (
        <g aria-hidden="true" stroke="rgb(var(--c-card) / 0.8)" strokeWidth="1" vectorEffect="non-scaling-stroke">
          <line x1="84" y1="84" x2="90" y2="88" />
          <line x1="116" y1="84" x2="110" y2="88" />
        </g>
      )}
    </svg>
  );
}

/** 文字版肌群列表（等效内容，便于无障碍与精确选择） */
export function MuscleList({
  selected,
  onToggle,
  regionFilter,
}: {
  selected?: string[];
  onToggle?: (id: string) => void;
  regionFilter?: string;
}) {
  const sel = new Set(selected ?? []);
  const list = MUSCLES.filter((m) => !regionFilter || m.region === regionFilter);
  return (
    <div className="flex flex-wrap gap-1.5">
      {list.map((m) => (
        <button
          key={m.id}
          type="button"
          onClick={() => onToggle?.(m.id)}
          className={cx("chip", sel.has(m.id) && "chip-active", !onToggle && "pointer-events-none")}
          title={m.function}
        >
          {m.name}
        </button>
      ))}
    </div>
  );
}