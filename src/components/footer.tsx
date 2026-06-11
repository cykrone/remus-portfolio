import { profile, navLinks } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-line bg-cream">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <a
              href="#top"
              className="font-display text-2xl tracking-tight text-ink"
            >
              {profile.name}
              <span className="text-flame">.</span>
            </a>
            <p className="mt-3 text-pretty text-ink-soft">
              {profile.role} at {profile.company}, building enterprise
              automation from {profile.location}.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-12 gap-y-8">
            <nav className="flex flex-col gap-2.5">
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink-faint">
                Navigate
              </span>
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="link-underline w-fit text-sm text-ink-soft transition-colors hover:text-ink"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <nav className="flex flex-col gap-2.5">
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink-faint">
                Elsewhere
              </span>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline w-fit text-sm text-ink-soft transition-colors hover:text-ink"
              >
                LinkedIn
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="link-underline w-fit text-sm text-ink-soft transition-colors hover:text-ink"
              >
                Email
              </a>
            </nav>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-ink-faint">
            © {new Date().getFullYear()} {profile.name}
          </p>
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-ink-faint">
            Built with Next.js · Designed in Singapore
          </p>
        </div>
      </div>
    </footer>
  );
}
