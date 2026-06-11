import * as React from "react";

import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export function SectionHeading({
  index,
  eyebrow,
  title,
  intro,
  align = "left",
  className,
}: {
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className
      )}
    >
      <Reveal className="flex items-center gap-3">
        <span className="font-mono text-xs text-flame">{index}</span>
        <span className="h-px w-8 bg-line-strong" />
        <span className="eyebrow">{eyebrow}</span>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="font-display text-balance text-4xl leading-[1.04] tracking-tight text-ink sm:text-5xl md:text-6xl">
          {title}
        </h2>
      </Reveal>
      {intro ? (
        <Reveal delay={0.1}>
          <p
            className={cn(
              "max-w-xl text-pretty text-lg leading-relaxed text-ink-soft",
              align === "center" && "mx-auto"
            )}
          >
            {intro}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
