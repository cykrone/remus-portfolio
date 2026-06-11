"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { profile } from "@/lib/content";

/* ------------------------------------------------------------------ *
 *  Site-wide easter eggs:
 *  - Styled console note for anyone peeking under the hood
 *  - Konami code (↑↑↓↓←→←→BA) → flame confetti + party mode
 *    (also exposed as window.party() since the console hints at it)
 * ------------------------------------------------------------------ */

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

const COLORS = ["#ec4d1a", "#1c1a16", "#d8ccb2", "#f9e9df", "#c63c11"];

type Piece = {
  id: number;
  x: number; // vw
  delay: number;
  duration: number;
  size: number;
  color: string;
  spin: number;
};

export function EasterEggs() {
  const reduce = useReducedMotion();
  const [pieces, setPieces] = React.useState<Piece[]>([]);
  const partyRef = React.useRef(false);

  const party = React.useCallback(() => {
    if (partyRef.current) return;
    partyRef.current = true;
    document.documentElement.classList.add("party");

    if (!reduce) {
      const batch: Piece[] = Array.from({ length: 48 }, (_, i) => ({
        id: i,
        x: (i * 137.5) % 100,
        delay: (i % 12) * 0.09,
        duration: 2.4 + ((i * 7) % 16) / 10,
        size: 6 + ((i * 5) % 7),
        color: COLORS[i % COLORS.length],
        spin: ((i % 2 ? 1 : -1) * (180 + ((i * 31) % 360))) | 0,
      }));
      setPieces(batch);
    }

    setTimeout(() => {
      document.documentElement.classList.remove("party");
      setPieces([]);
      partyRef.current = false;
    }, 5000);
  }, [reduce]);

  // Konami listener + window.party
  React.useEffect(() => {
    let progress = 0;
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      progress = key === KONAMI[progress] ? progress + 1 : key === KONAMI[0] ? 1 : 0;
      if (progress === KONAMI.length) {
        progress = 0;
        party();
      }
    };
    window.addEventListener("keydown", onKey);
    (window as unknown as { party: () => void }).party = party;
    return () => window.removeEventListener("keydown", onKey);
  }, [party]);

  // Console note
  React.useEffect(() => {
    /* eslint-disable no-console */
    console.log(
      "%c Remus Chan %c systems in sync since 2025 ",
      "background:#ec4d1a;color:#fffdf8;font-weight:bold;padding:4px 8px;border-radius:6px 0 0 6px;",
      "background:#1c1a16;color:#faf6ed;padding:4px 8px;border-radius:0 6px 6px 0;"
    );
    console.log(
      `Peeking under the hood? I like you already → ${profile.email}\nPsst: try the Konami code. Or just run party()`
    );
    /* eslint-enable no-console */
  }, []);

  return (
    <AnimatePresence>
      {pieces.length > 0 && (
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[80] overflow-hidden"
        >
          {pieces.map((p) => (
            <motion.span
              key={p.id}
              initial={{ y: "-6vh", x: 0, rotate: 0, opacity: 1 }}
              animate={{ y: "112vh", rotate: p.spin, opacity: [1, 1, 0.85] }}
              exit={{ opacity: 0 }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                ease: [0.3, 0.4, 0.6, 1],
              }}
              className="absolute top-0 rounded-[2px]"
              style={{
                left: `${p.x}vw`,
                width: p.size,
                height: p.size * 1.5,
                backgroundColor: p.color,
              }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}
