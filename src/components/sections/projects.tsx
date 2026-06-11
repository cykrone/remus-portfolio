import { projects } from "@/lib/content";
import { Reveal } from "@/components/motion/reveal";
import { TiltCard } from "@/components/motion/tilt-card";
import { SectionHeading } from "@/components/sections/section-heading";

export function Projects() {
  return (
    <section
      id="projects"
      className="relative mx-auto max-w-7xl scroll-mt-24 px-6 py-28 lg:px-10 lg:py-36"
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          index="03"
          eyebrow="Selected Work"
          title={
            <>
              Case studies in
              <br className="hidden sm:block" /> systems that talk.
            </>
          }
        />
        <Reveal>
          <p className="max-w-xs text-pretty text-ink-soft md:text-right">
            A few projects where the work moved a number that mattered.
          </p>
        </Reveal>
      </div>

      <div className="mt-16 grid gap-6 lg:mt-20 lg:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal key={project.title} delay={(i % 2) * 0.08} className="h-full">
            <TiltCard className="h-full">
            <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-paper p-8 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-line-strong hover:shadow-[0_24px_60px_-28px_rgba(28,26,22,0.28)] sm:p-10">
              {/* corner index + arrow */}
              <div className="flex items-start justify-between">
                <span className="font-mono text-xs uppercase tracking-[0.18em] text-ink-faint">
                  {project.category} · {project.year}
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition-all duration-500 group-hover:border-flame group-hover:bg-flame group-hover:text-white">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    className="transition-transform duration-500 group-hover:rotate-45"
                  >
                    <path
                      d="M4 11L11 4M11 4H5M11 4V10"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>

              {/* Title + client */}
              <h3 className="mt-9 font-display text-3xl tracking-tight text-ink sm:text-[2rem]">
                {project.title}
              </h3>
              <p className="mt-1.5 font-mono text-sm text-ink-soft">
                {project.client}
              </p>

              <p className="mt-5 flex-1 text-pretty leading-relaxed text-ink-soft">
                {project.summary}
              </p>

              {/* Result + tags */}
              <div className="mt-8 border-t border-line pt-7">
                <div className="flex items-end justify-between gap-6">
                  <div>
                    <div className="font-display text-5xl leading-[0.9] text-flame tabular-nums sm:text-6xl">
                      {project.outcome.metric}
                    </div>
                    <div className="mt-2.5 text-sm leading-snug text-ink-soft">
                      {project.outcome.label}
                    </div>
                  </div>
                </div>

                <div className="mt-7 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-line px-3 py-1 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-ink-soft"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
