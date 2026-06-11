import { posts } from "@/lib/content";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/sections/section-heading";

export function Writing() {
  return (
    <section
      id="writing"
      className="relative mx-auto max-w-7xl scroll-mt-24 px-6 py-28 lg:px-10 lg:py-36"
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          index="05"
          eyebrow="Writing"
          title={
            <>
              Notes from the
              <br className="hidden sm:block" /> integration trenches.
            </>
          }
        />
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-4 py-2 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-ink-soft">
            <span className="h-1.5 w-1.5 rounded-full bg-flame" />
            Launching soon
          </span>
        </Reveal>
      </div>

      <div className="mt-16 grid gap-6 lg:mt-20 lg:grid-cols-3">
        {posts.map((post, i) => (
          <Reveal key={post.title} delay={i * 0.07}>
            <article className="group flex h-full flex-col rounded-3xl border border-dashed border-line-strong bg-paper/50 p-8 transition-all duration-500 hover:border-solid hover:border-line-strong hover:bg-paper sm:p-10">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-ember px-3 py-1 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-flame-deep">
                  {post.topic}
                </span>
                <span className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-ink-faint">
                  {post.readingTime}
                </span>
              </div>

              <h3 className="mt-8 font-display text-2xl leading-snug tracking-tight text-ink">
                {post.title}
              </h3>
              <p className="mt-3 flex-1 text-pretty leading-relaxed text-ink-soft">
                {post.blurb}
              </p>

              <span className="mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-ink-faint">
                Draft in progress
              </span>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
