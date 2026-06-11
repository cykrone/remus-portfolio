"use client";

import * as React from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "motion/react";

import { navLinks, profile } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function Nav() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.2,
  });

  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState<string>("");

  React.useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      // above the first section, nothing is "current"
      if (window.scrollY < window.innerHeight * 0.5) setActive("");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scrollspy: highlight the section currently in view
  React.useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector<HTMLElement>(l.href))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.div
        className={cn(
          "transition-all duration-500",
          scrolled
            ? "border-b border-line bg-cream/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <a
            href="#top"
            className="group flex items-center gap-2.5 text-ink"
            aria-label="Back to top"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-cream transition-all duration-500 group-hover:rotate-[360deg] group-hover:bg-flame">
              <span className="font-display text-lg leading-none">R</span>
            </span>
            <span className="font-display text-lg tracking-tight">
              {profile.name}
            </span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const isActive = active === link.href;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "link-underline relative rounded-full px-3.5 py-2 text-sm transition-colors",
                      isActive
                        ? "text-ink"
                        : "text-ink-soft hover:text-ink"
                    )}
                  >
                    {link.label}
                    <span
                      className={cn(
                        "absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-flame transition-all duration-300",
                        isActive ? "scale-100 opacity-100" : "scale-0 opacity-0"
                      )}
                    />
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="hidden md:block">
            <Button asChild variant="primary" size="sm">
              <a href="#contact">Let&apos;s talk</a>
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center md:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <div className="flex flex-col gap-[5px]">
              <span
                className={cn(
                  "h-[1.5px] w-6 bg-ink transition-all duration-300",
                  open && "translate-y-[6.5px] rotate-45"
                )}
              />
              <span
                className={cn(
                  "h-[1.5px] w-6 bg-ink transition-all duration-300",
                  open && "opacity-0"
                )}
              />
              <span
                className={cn(
                  "h-[1.5px] w-6 bg-ink transition-all duration-300",
                  open && "-translate-y-[6.5px] -rotate-45"
                )}
              />
            </div>
          </button>
        </nav>

        {/* Scroll progress */}
        <motion.div
          className="h-[2px] origin-left bg-flame"
          style={{ scaleX: progress }}
        />
      </motion.div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mx-4 mt-2 overflow-hidden rounded-3xl border border-line bg-cream/95 p-3 backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-2xl px-4 py-3 text-lg text-ink transition-colors hover:bg-sand"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="p-2">
                <Button asChild variant="primary" size="md" className="w-full">
                  <a href="#contact" onClick={() => setOpen(false)}>
                    Let&apos;s talk
                  </a>
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
