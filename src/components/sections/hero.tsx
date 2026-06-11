"use client";

import * as React from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

import { profile } from "@/lib/content";
import { WordReveal } from "@/components/motion/reveal";
import { Magnetic } from "@/components/motion/magnetic";
import { HeroVisual } from "@/components/sections/hero-visual";
import { Button } from "@/components/ui/button";

export function Hero() {
  const ref = React.useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 140]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 pb-20 pt-32 lg:px-10"
    >
      {/* soft radial wash behind the constellation */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[10%] top-[8%] h-[42rem] w-[42rem] rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(236,77,26,0.09), rgba(236,77,26,0) 62%)",
        }}
      />

      {/* integration constellation — fills the right half at desktop */}
      <HeroVisual />

      {/* pointer-events-none lets clicks fall through to the constellation;
          interactive children (name words, CTAs) re-enable their own events */}
      <motion.div
        style={{ y, opacity }}
        className="pointer-events-none relative mx-auto w-full max-w-7xl"
      >
        {/* Kicker row */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center gap-x-5 gap-y-3"
        >
          {profile.available && (
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-paper/60 px-3 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-flame opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-flame" />
              </span>
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink-soft">
                Open to new problems
              </span>
            </span>
          )}
        </motion.div>

        {/* Name */}
        <h1 className="mt-8 font-display text-[clamp(3.5rem,13vw,12rem)] font-medium leading-[0.92] tracking-[-0.03em] text-ink">
          <span className="block overflow-hidden">
            <WordReveal text="Remus" delay={0.15} wordClassName="wonk-word" />
          </span>
          <span className="block overflow-hidden">
            <WordReveal text="Chan" delay={0.28} wordClassName="wonk-word" />
            <motion.span
              aria-hidden
              initial={reduce ? false : { scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                duration: 0.6,
                delay: 0.9,
                ease: [0.34, 1.56, 0.64, 1],
              }}
              className="ml-1 inline-block text-flame"
            >
              .
            </motion.span>
          </span>
        </h1>

        {/* Tagline */}
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mt-9 max-w-2xl text-pretty text-xl leading-relaxed text-ink-soft sm:text-2xl"
        >
          I build the integrations and automation that keep enterprise
          systems in sync. Lately, a lot of that work is{" "}
          <span className="font-display italic text-ink">
            agentic and AI-driven
          </span>
          .
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-11 flex flex-wrap items-center gap-4"
        >
          <Magnetic className="pointer-events-auto">
            <Button asChild variant="flame" size="lg">
              <a href="#projects">See the work</a>
            </Button>
          </Magnetic>
          <Button asChild variant="outline" size="lg" className="pointer-events-auto">
            <a href="#contact">Get in touch</a>
          </Button>
        </motion.div>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
      >
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-ink-faint">
          Scroll
        </span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="h-8 w-px bg-line-strong"
        />
      </motion.div>
    </section>
  );
}
