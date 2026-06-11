import { experiences } from "@/lib/content";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/sections/section-heading";

export function Experience() {
  return (
    <section
      id="experience"
      className="relative scroll-mt-24 bg-sand/50 py-28 lg:py-36"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          index="02"
          eyebrow="Experience"
          title={
            <>
              Where I&apos;ve been
              <br className="hidden sm:block" /> making things work.
            </>
          }
        />

        <div className="mt-16 lg:mt-20">
          {experiences.map((exp, i) => (
            <Reveal key={exp.org} delay={i * 0.05}>
              <div className="group relative grid gap-6 border-t border-line py-10 md:grid-cols-12 md:gap-10 md:py-12">
                {/* Period / meta */}
                <div className="md:col-span-3">
                  <div className="flex items-center gap-3">
                    <span
                      className={
                        "h-2.5 w-2.5 rounded-full " +
                        (exp.current
                          ? "bg-flame ring-4 ring-ember"
                          : "bg-line-strong")
                      }
                    />
                    <span className="font-mono text-sm text-ink">
                      {exp.period}
                    </span>
                  </div>
                  <p className="mt-3 pl-[1.4rem] font-mono text-xs uppercase tracking-[0.16em] text-ink-faint">
                    {exp.location}
                  </p>
                </div>

                {/* Body */}
                <div className="md:col-span-9">
                  <h3 className="font-display text-3xl tracking-tight text-ink transition-colors group-hover:text-flame sm:text-4xl">
                    {exp.org}
                  </h3>
                  <p className="mt-1 text-lg text-ink-soft">{exp.role}</p>
                  <p className="mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-ink-soft">
                    {exp.summary}
                  </p>

                  <ul className="mt-6 gap-x-10 sm:columns-2">
                    {exp.highlights.map((h, j) => (
                      <li
                        key={j}
                        className="mb-3 flex gap-3 break-inside-avoid"
                      >
                        <span
                          aria-hidden
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-flame"
                        />
                        <span className="text-[0.97rem] leading-relaxed text-ink-soft">
                          {h}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
          <div className="border-t border-line" />
        </div>
      </div>
    </section>
  );
}
