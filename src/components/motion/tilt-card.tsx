"use client";

import * as React from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "motion/react";

/**
 * Subtle 3D tilt that follows the cursor. Wraps a card; resets on leave.
 * Max ~3.5° so it feels premium, not gimmicky.
 */
export function TiltCard({
  children,
  className,
  max = 3.5,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const springRx = useSpring(rx, { stiffness: 220, damping: 18, mass: 0.4 });
  const springRy = useSpring(ry, { stiffness: 220, damping: 18, mass: 0.4 });

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 … 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    ry.set(px * max * 2);
    rx.set(-py * max * 2);
  }

  function reset() {
    rx.set(0);
    ry.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{
        rotateX: springRx,
        rotateY: springRy,
        transformPerspective: 900,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
