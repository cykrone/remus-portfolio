import { skillGroups } from "@/lib/content";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/sections/section-heading";

export function Skills() {
  return (
    <section
      id="skills"
      className="relative scroll-mt-24 bg-sand/50 py-28 lg:py-36"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          index="04"
          eyebrow="Toolkit"
          title={
            <>
              The stack behind
              <br className="hidden sm:block" /> the automations.
            </>
          }
        />

        <div className="mt-16 lg:mt-20">
          {skillGroups.map((group, i) => (
            <Reveal key={group.title} delay={i * 0.05}>
              <div className="grid gap-6 border-t border-line py-9 md:grid-cols-12 md:gap-10 md:py-11">
                <div className="md:col-span-4">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-xs text-flame">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display text-2xl tracking-tight text-ink sm:text-3xl">
                      {group.title}
                    </h3>
                  </div>
                  <p className="mt-2 pl-8 text-sm text-ink-soft">
                    {group.note}
                  </p>
                </div>

                <Stagger className="flex flex-wrap content-start gap-2.5 md:col-span-8">
                  {group.skills.map((skill) => (
                    <StaggerItem key={skill}>
                      <span className="inline-flex cursor-default items-center rounded-full border border-line bg-paper px-4 py-2 text-sm text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-flame hover:text-flame">
                        {skill}
                      </span>
                    </StaggerItem>
                  ))}
                </Stagger>
              </div>
            </Reveal>
          ))}
          <div className="border-t border-line" />
        </div>
      </div>
    </section>
  );
}
