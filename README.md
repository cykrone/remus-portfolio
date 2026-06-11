# Remus Chan — Portfolio

A fast, statically-generated personal site for **Remus Chan**, Technical Consultant at Workato.
Premium light-mode aesthetic, typography-forward, with smooth scroll animations and subtle
micro-interactions.

- **Framework:** Next.js 16 (App Router) · React 19
- **Styling:** Tailwind CSS v4
- **Components:** shadcn/ui (New York) — hand-tuned to the brand theme
- **Motion:** `motion` (Framer Motion) — scroll reveals, word reveals, magnetic CTAs, marquee
- **Type:** Fraunces (display) · Geist Sans (body) · Geist Mono (labels) — self-hosted via `next/font`
- **Rendering:** 100% static (SSG) — every page is prerendered to static HTML at build time

---

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts:

```bash
npm run build    # production build (static export-ready, prerendered)
npm run start    # serve the production build locally
npm run lint     # eslint
```

---

## Editing content

**All copy lives in one file** — you rarely need to touch component code:

```
src/lib/content.ts
```

It exports typed objects for every section:

| Object         | Drives                                                        |
| -------------- | ------------------------------------------------------------- |
| `profile`      | Name, role, email, LinkedIn, tagline, location                |
| `navLinks`     | Header / footer navigation                                    |
| `marqueeItems` | The scrolling keyword strip under the hero                    |
| `about`        | Intro statement, paragraphs, and the facts panel              |
| `experiences`  | Work-experience timeline (add prior roles here)               |
| `projects`     | Case-study cards (title, client, outcome metric, tags)        |
| `skillGroups`  | Grouped skills                                                 |
| `posts`        | Blog placeholder cards                                         |
| `contact`      | Contact heading + blurb                                        |

To add a prior role, copy an entry in the `experiences` array. To add a project, copy an
entry in `projects`. Everything re-flows and animates automatically.

### Changing the look

- **Colors & fonts:** `src/app/globals.css` (the `@theme` block at the top). The single accent
  is `--color-flame`; the page base is `--color-cream`.
- **Fonts:** swapped in `src/app/layout.tsx` (Fraunces) and via the `geist` package (Geist).
- **Favicon / theme color:** `public/favicon.svg` and the `viewport` export in `layout.tsx`.

---

## Project structure

```
src/
├─ app/
│  ├─ layout.tsx        # fonts, metadata, <html> shell
│  ├─ page.tsx          # composes all sections
│  └─ globals.css       # design tokens + base styles
├─ components/
│  ├─ nav.tsx           # sticky nav, scroll progress, mobile menu
│  ├─ footer.tsx
│  ├─ marquee.tsx
│  ├─ motion/           # Reveal, Stagger, WordReveal, Magnetic
│  ├─ sections/         # hero, about, experience, projects, skills, writing, contact
│  └─ ui/               # shadcn/ui primitives (button, card, input, textarea, badge)
└─ lib/
   ├─ content.ts        # ← all site copy
   └─ utils.ts          # cn() helper
```

---

## Deploying to Vercel (free tier)

Vercel auto-detects Next.js and statically prerenders the site — no config needed.

### Option A — Git + Vercel dashboard (recommended)

1. **Push to GitHub** (from inside this folder):
   ```bash
   git init
   git add -A
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/<you>/remus-portfolio.git
   git push -u origin main
   ```
2. Go to **[vercel.com/new](https://vercel.com/new)**, sign in with GitHub, and **Import** the repo.
3. Framework preset: **Next.js** (auto-detected). Leave build/output settings at their defaults
   (`npm run build`). Click **Deploy**.
4. You get a live URL like `remus-portfolio.vercel.app`. Every push to `main` redeploys.

### Option B — Vercel CLI

```bash
npm i -g vercel
vercel            # first run links/creates the project (accept defaults)
vercel --prod     # promote to production
```

---

## Connecting a custom domain

Once the project is deployed:

1. In Vercel, open your project → **Settings → Domains**.
2. Enter your domain (e.g. `remuschan.com`) and click **Add**. Add the `www` variant too if you
   want it — Vercel will offer to redirect one to the other.
3. Vercel shows the DNS records to create. Configure them **at your domain registrar**
   (Namecheap, GoDaddy, Cloudflare, etc.):

   **Apex / root domain** (`remuschan.com`) — use ONE of:
   | Type    | Name | Value                  |
   | ------- | ---- | ---------------------- |
   | `A`     | `@`  | `76.76.21.21`          |
   | `ALIAS` | `@`  | `cname.vercel-dns.com` (if your registrar supports ALIAS/ANAME) |

   **Subdomain** (`www.remuschan.com`):
   | Type    | Name  | Value                  |
   | ------- | ----- | ---------------------- |
   | `CNAME` | `www` | `cname.vercel-dns.com` |

   > Always use the exact values Vercel displays for your project — they can differ. If you use
   > Cloudflare DNS, set the records to **DNS-only** (grey cloud), not proxied.

4. Back in Vercel, the domain status flips to **Valid** once DNS propagates (minutes to a few
   hours). HTTPS certificates are issued automatically — no action needed.

### Pointing your nameservers to Vercel (alternative)

Instead of individual records you can delegate the whole domain to Vercel:
**Settings → Domains → your domain → Nameservers**, then set the two `ns*.vercel-dns.com`
nameservers at your registrar. Vercel then manages all DNS for you.

---

## Notes

- The contact form opens the visitor's email client (`mailto:`) — no backend or stored data.
  To capture submissions server-side later, swap the `handleSubmit` in
  `src/components/sections/contact.tsx` for a form endpoint (e.g. Formspree, Resend, or a
  Next.js Route Handler).
- The site respects `prefers-reduced-motion` — all animations collapse gracefully.
- The blog section is a styled placeholder; wire it to MDX or a CMS when you're ready to write.
