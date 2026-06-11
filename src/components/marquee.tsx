import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Seamless infinite marquee. Content is duplicated and translated -50%
 * so the loop is gapless. Pauses on hover.
 */
export function Marquee({
  items,
  className,
}: {
  items: string[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group relative flex overflow-hidden border-y border-line bg-cream py-5",
        className
      )}
    >
      <div className="flex shrink-0 animate-marquee items-center group-hover:[animation-play-state:paused]">
        {[...items, ...items].map((item, i) => (
          <Item key={i} italic={i % 2 === 1}>
            {item}
          </Item>
        ))}
      </div>
      <div
        aria-hidden
        className="flex shrink-0 animate-marquee items-center group-hover:[animation-play-state:paused]"
      >
        {[...items, ...items].map((item, i) => (
          <Item key={i} italic={i % 2 === 1}>
            {item}
          </Item>
        ))}
      </div>
    </div>
  );
}

function Item({
  children,
  italic = false,
}: {
  children: React.ReactNode;
  italic?: boolean;
}) {
  return (
    <span className="flex items-center whitespace-nowrap">
      <span
        className={cn(
          "font-display text-2xl text-ink sm:text-3xl",
          italic && "italic text-ink-soft"
        )}
      >
        {children}
      </span>
      <span className="mx-7 text-flame sm:mx-10" aria-hidden>
        ✦
      </span>
    </span>
  );
}
