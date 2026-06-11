"use client";

import * as React from "react";

import { profile, contact } from "@/lib/content";
import { Reveal } from "@/components/motion/reveal";
import { Magnetic } from "@/components/motion/magnetic";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function Contact() {
  const [sent, setSent] = React.useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "");
    const from = String(data.get("email") || "");
    const message = String(data.get("message") || "");

    const subject = encodeURIComponent(`Hello from ${name || "your site"}`);
    const body = encodeURIComponent(
      `${message}\n\n— ${name}${from ? `\n${from}` : ""}`
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <section
      id="contact"
      className="relative scroll-mt-24 overflow-hidden bg-ink py-28 text-cream lg:py-36"
    >
      {/* warm glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[8%] top-1/4 h-[34rem] w-[34rem] rounded-full opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(236,77,26,0.30), rgba(236,77,26,0) 60%)",
        }}
      />

      <div className="relative mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:gap-12 lg:px-10">
        {/* Left — pitch */}
        <div>
          <Reveal className="flex items-center gap-3">
            <span className="font-mono text-xs text-flame">06</span>
            <span className="h-px w-8 bg-white/20" />
            <span className="font-mono text-[0.72rem] uppercase tracking-[0.22em] text-cream/50">
              Contact
            </span>
          </Reveal>

          <Reveal delay={0.05}>
            <h2 className="mt-8 max-w-md font-display text-5xl leading-[1.02] tracking-tight text-cream text-balance sm:text-6xl">
              {contact.heading}
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-6 max-w-md text-pretty text-lg leading-relaxed text-cream/65">
              {contact.blurb}
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-10 flex flex-col gap-4">
              <a
                href={`mailto:${profile.email}`}
                className="group inline-flex w-fit items-baseline gap-3 font-display text-2xl text-cream transition-colors hover:text-flame sm:text-3xl"
              >
                {profile.email}
                <span className="text-flame transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Magnetic>
                  <Button asChild variant="flame" size="md">
                    <a
                      href={profile.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Connect on LinkedIn
                    </a>
                  </Button>
                </Magnetic>
                <span className="font-mono text-xs uppercase tracking-[0.16em] text-cream/40">
                  {profile.location} · GMT+8
                </span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right — form */}
        <Reveal delay={0.1} y={36}>
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-white/10 bg-paper p-8 text-ink sm:p-10"
          >
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="name"
                  className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-ink-faint"
                >
                  Name
                </label>
                <Input id="name" name="name" required placeholder="Your name" />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-ink-faint"
                >
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@company.com"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="message"
                  className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-ink-faint"
                >
                  What&apos;s on your mind?
                </label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  placeholder="Tell me about the systems you'd like to connect…"
                />
              </div>
              <Button type="submit" variant="primary" size="lg" className="mt-1">
                {sent ? "Opening your email…" : "Send message"}
              </Button>
              <p className="text-center text-xs text-ink-faint">
                Opens in your email client. Nothing is stored.
              </p>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
