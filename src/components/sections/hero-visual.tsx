"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

/* ------------------------------------------------------------------ *
 *  Integration constellation — satellite systems wired into a hub,
 *  with current flowing along the lines. A literal picture of iPaaS.
 *
 *  Easter egg: click the hub to "automate a task". After five manual
 *  clicks it gets fed up and automates the clicking itself. Forever.
 * ------------------------------------------------------------------ */

const HUB = { x: 290, y: 290 };
const AUTO_AT = 5;

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

type Particle = { id: number; dx: number; dy: number };

export function HeroVisual() {
  const reduce = useReducedMotion();
  const [hovered, setHovered] = React.useState<number | null>(null);
  const [count, setCount] = React.useState(0);
  const [auto, setAuto] = React.useState(false);
  const [toast, setToast] = React.useState(false);
  const [particles, setParticles] = React.useState<Particle[]>([]);
  const idRef = React.useRef(0);

  const burst = React.useCallback(
    (n: number) => {
      if (reduce) return;
      setParticles((prev) => {
        const fresh: Particle[] = Array.from({ length: n }, (_, k) => {
          const angle =
            ((idRef.current + k) * 137.5 * Math.PI) / 180; // golden-angle spread
          const dist = 52 + ((idRef.current + k) % 4) * 14;
          return {
            id: ++idRef.current,
            dx: Math.cos(angle) * dist,
            dy: Math.sin(angle) * dist,
          };
        });
        return [...prev, ...fresh].slice(-24);
      });
    },
    [reduce]
  );

  const manualClicks = React.useRef(0);

  const handleHubClick = React.useCallback(() => {
    setCount((c) => c + 1);
    burst(6);
    if (!auto) {
      manualClicks.current += 1;
      if (manualClicks.current >= AUTO_AT) {
        setAuto(true);
        setToast(true);
      }
    }
  }, [auto, burst]);

  // the punchline: the clicker clicks itself
  React.useEffect(() => {
    if (!auto) return;
    const t = setInterval(() => {
      setCount((c) => c + 1);
      burst(2);
    }, 650);
    return () => clearInterval(t);
  }, [auto, burst]);

  React.useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(false), 4200);
    return () => clearTimeout(t);
  }, [toast]);

  const counterText = auto
    ? `${count.toLocaleString()} tasks automated · running`
    : `${count.toLocaleString()} task${count === 1 ? "" : "s"} automated`;
  // mono 10.5px + 0.1em tracking ≈ 7.4px/char, plus comfortable side padding
  const counterW = counterText.length * 7.4 + 40;

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
              stroke={
                hovered === i ? "var(--color-flame)" : "var(--color-line-strong)"
              }
              strokeWidth={hovered === i ? 1.5 : 1}
              style={{ transition: "stroke 0.3s, stroke-width 0.3s" }}
            />
            <path
              d={wirePath(n)}
              stroke="var(--color-flame)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray="3 53"
              style={{
                animationName: "flow-dash",
                animationDuration: `${hovered === i ? 1.6 : 4.6}s`,
                animationTimingFunction: "linear",
                animationIterationCount: "infinite",
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
              animationName: "node-bob",
              animationDuration: `${5.5 + (i % 3)}s`,
              animationTimingFunction: "ease-in-out",
              animationIterationCount: "infinite",
              animationDelay: `${i * 0.55}s`,
            }}
          >
            <g
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                pointerEvents: "auto",
                cursor: "default",
                transform: hovered === i ? "translateY(-3px)" : "translateY(0)",
                transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              <rect
                x={n.x - n.w / 2}
                y={n.y - 19}
                width={n.w}
                height={38}
                rx={19}
                fill="var(--color-paper)"
                stroke={
                  hovered === i
                    ? "var(--color-flame)"
                    : "var(--color-line-strong)"
                }
                style={{ transition: "stroke 0.3s" }}
              />
              <circle
                cx={n.x - n.w / 2 + 16}
                cy={n.y}
                r={3}
                fill="var(--color-flame)"
              />
              <text
                x={n.x + 6}
                y={n.y + 3.5}
                textAnchor="middle"
                fontFamily="var(--font-mono)"
                fontSize="10.5"
                letterSpacing="0.14em"
                fill={
                  hovered === i ? "var(--color-ink)" : "var(--color-ink-soft)"
                }
                style={{ transition: "fill 0.3s" }}
              >
                {n.label}
              </text>
            </g>
          </g>
        ))}

        {/* click particles */}
        <AnimatePresence>
          {particles.map((p) => (
            <motion.circle
              key={p.id}
              cx={HUB.x}
              cy={HUB.y}
              r={2.5}
              fill="var(--color-flame)"
              initial={{ opacity: 0.9, x: 0, y: 0, scale: 1 }}
              animate={{ opacity: 0, x: p.dx, y: p.dy, scale: 0.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          ))}
        </AnimatePresence>

        {/* hub — the button */}
        <g
          onClick={handleHubClick}
          style={{ pointerEvents: "auto", cursor: "pointer" }}
        >
          <circle
            cx={HUB.x}
            cy={HUB.y}
            r={30}
            fill="var(--color-flame)"
            opacity={0.18}
            style={{
              transformOrigin: `${HUB.x}px ${HUB.y}px`,
              animation: `hub-pulse ${auto ? 1.4 : 3.2}s ease-out infinite`,
            }}
          />
          <motion.circle
            cx={HUB.x}
            cy={HUB.y}
            r={30}
            fill="var(--color-paper)"
            stroke="var(--color-flame)"
            strokeWidth="1.5"
            animate={reduce ? undefined : { scale: [1, 0.93, 1] }}
            key={`hubring-${count}`}
            transition={{ duration: 0.25 }}
            style={{ transformOrigin: `${HUB.x}px ${HUB.y}px` }}
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
            {auto ? "INTEGRATING" : "INTEGRATE"}
          </text>
        </g>

        {/* tasks-automated counter */}
        <AnimatePresence>
          {count > 0 && (
            <motion.g
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <rect
                x={HUB.x - counterW / 2}
                y={HUB.y - 78}
                width={counterW}
                height={30}
                rx={15}
                fill="var(--color-ink)"
              />
              <text
                x={HUB.x}
                y={HUB.y - 59}
                textAnchor="middle"
                fontFamily="var(--font-mono)"
                fontSize="10.5"
                letterSpacing="0.1em"
                fill="var(--color-cream)"
              >
                {counterText}
              </text>
            </motion.g>
          )}
        </AnimatePresence>
      </svg>

      {/* the punchline toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-2 left-1/2 w-max -translate-x-1/2 rounded-full border border-line bg-paper px-5 py-2.5 font-mono text-xs text-ink shadow-[0_8px_30px_-12px_rgba(28,26,22,0.25)]"
          >
            Manual clicks detected. Automating that for you&hellip;
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
