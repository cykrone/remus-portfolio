import { about } from "@/lib/content";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";

export function About() {
  return (
    <section
      id="about"
      className="relative mx-auto max-w-7xl scroll-mt-24 px-6 py-28 lg:px-10 lg:py-36"
    >
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
        {/* Left — the statement */}
        <div className="lg:col-span-7">
          <Reveal className="flex items-center gap-3">
            <span className="font-mono text-xs text-flame">01</span>
            <span className="h-px w-8 bg-line-strong" />
            <span className="eyebrow">About</span>
          </Reveal>

          <Reveal delay={0.05}>
            <p className="mt-8 font-display text-3xl leading-[1.18] tracking-tight text-ink text-balance sm:text-[2.6rem] sm:leading-[1.16]">
              {about.intro}
            </p>
          </Reveal>

          <div className="mt-9 max-w-xl space-y-5">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.1 + i * 0.05}>
                <p className="text-pretty text-lg leading-relaxed text-ink-soft">
                  {p}
                </p>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Right — facts */}
        <div className="lg:col-span-4 lg:col-start-9">
          <Stagger className="rounded-3xl border border-line bg-paper p-8 sm:p-10 lg:mt-4">
            {about.facts.map((fact, i) => (
              <StaggerItem
                key={fact.label}
                className={
                  i !== 0 ? "border-t border-line pt-5 mt-5" : undefined
                }
              >
                <dt className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink-faint">
                  {fact.label}
                </dt>
                <dd className="mt-1.5 font-display text-xl text-ink">
                  {fact.value}
                </dd>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
