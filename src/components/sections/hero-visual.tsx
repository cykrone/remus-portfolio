"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";

/* ------------------------------------------------------------------ *
 *  Integration constellation — satellite systems wired into a hub,
 *  with current flowing along the lines. A literal picture of iPaaS.
 *  Decorative only (aria-hidden); hidden below lg.
 * ------------------------------------------------------------------ */

const HUB = { x: 290, y: 290 };

const NODES = [
  { x: 80, y: 90, label: "CRM", w: 66 },
  { x: 320, y: 48, label: "ERP", w: 66 },
  { x: 505, y: 150, label: "AI / LLM", w: 102 },
  { x: 545, y: 360, label: "HRIS", w: 70 },
  { x: 395, y: 520, label: "DATA", w: 72 },
  { x: 120, y: 480, label: "FINANCE", w: 98 },
  { x: 38, y: 290, label: "APIS", w: 66 },
];

/* Quadratic curve from node edge toward the hub */
function wirePath(n: { x: number; y: number }) {
  const mx = (n.x + HUB.x) / 2;
  const my = (n.y + HUB.y) / 2;
  // bow each wire slightly perpendicular to its direction for organic feel
  const dx = HUB.x - n.x;
  const dy = HUB.y - n.y;
  const len = Math.hypot(dx, dy) || 1;
  const bow = 26;
  const cx = mx - (dy / len) * bow;
  const cy = my + (dx / len) * bow;
  return `M ${n.x} ${n.y} Q ${cx} ${cy} ${HUB.x} ${HUB.y}`;
}

export function HeroVisual() {
  const reduce = useReducedMotion();

  return (
    <motion.div
      aria-hidden
      initial={reduce ? false : { opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.4, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="pointer-events-none absolute right-[2%] top-1/2 hidden w-[min(44vw,620px)] -translate-y-1/2 select-none lg:block xl:right-[4%]"
    >
      <svg
        viewBox="0 0 600 580"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-auto w-full"
      >
        {/* wires */}
        {NODES.map((n, i) => (
          <g key={`w-${i}`}>
            <path
              d={wirePath(n)}
              stroke="var(--color-line-strong)"
              strokeWidth="1"
            />
            <path
              d={wirePath(n)}
              stroke="var(--color-flame)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray="3 53"
              style={{
                animation: `flow-dash 4.6s linear infinite`,
                animationDelay: `${i * -0.7}s`,
                opacity: 0.9,
              }}
            />
          </g>
        ))}

        {/* satellite nodes */}
        {NODES.map((n, i) => (
          <g
            key={`n-${i}`}
            style={{
              animation: `node-bob ${5.5 + (i % 3)}s ease-in-out infinite`,
              animationDelay: `${i * 0.55}s`,
            }}
          >
            <rect
              x={n.x - n.w / 2}
              y={n.y - 19}
              width={n.w}
              height={38}
              rx={19}
              fill="var(--color-paper)"
              stroke="var(--color-line-strong)"
            />
            <circle cx={n.x - n.w / 2 + 16} cy={n.y} r={3} fill="var(--color-flame)" />
            <text
              x={n.x + 6}
              y={n.y + 3.5}
              textAnchor="middle"
              fontFamily="var(--font-mono)"
              fontSize="10.5"
              letterSpacing="0.14em"
              fill="var(--color-ink-soft)"
            >
              {n.label}
            </text>
          </g>
        ))}

        {/* hub */}
        <g>
          <circle
            cx={HUB.x}
            cy={HUB.y}
            r={30}
            fill="var(--color-flame)"
            opacity={0.18}
            style={{
              transformOrigin: `${HUB.x}px ${HUB.y}px`,
              animation: "hub-pulse 3.2s ease-out infinite",
            }}
          />
          <circle
            cx={HUB.x}
            cy={HUB.y}
            r={30}
            fill="var(--color-paper)"
            stroke="var(--color-flame)"
            strokeWidth="1.5"
          />
          <circle cx={HUB.x} cy={HUB.y} r={9} fill="var(--color-flame)" />
          <text
            x={HUB.x}
            y={HUB.y + 56}
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize="10.5"
            letterSpacing="0.22em"
            fill="var(--color-ink-faint)"
          >
            iPaaS
          </text>
        </g>
      </svg>
    </motion.div>
  );
}
