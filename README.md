# Boliveer Web

Independent Next.js site for **Boliveer** — technology company and parent of **Madar 360**.

Boliveer finds real business gaps, builds complete applications and platforms, and takes them to market and media success. Madar 360 is the flagship product; the company story is broader than any single app.

## Stack

- Next.js App Router + TypeScript
- Tailwind + design tokens
- next-intl (EN LTR / AR RTL)
- @wrksz/themes (dark/light, React 19–safe)
- Framer Motion (LazyMotion)
- Typed content registries (CMS-ready)
- Zod + Server Actions forms (webhook adapter)

## Develop

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (redirects to `/en`).

## Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Local development |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | ESLint |
| `npm run lhci` | Lighthouse CI against budget |

## Architecture

- `app/[locale]/(os)` — site routes inside the OS shell
- `components/os-shell` — SystemBar, Command Palette, Boot, Dock
- `components/sections` — home and page sections
- `content/*` — product / industry / job / article registries
- `lib/content.ts` — CMS-ready content boundary
- `lib/forms.ts` — form provider boundary (`FORM_WEBHOOK_URL`)
- `design-system/` — tokens + motion

## SEO

Metadata API, JSON-LD (Organization, WebSite, Product, FAQ, Article, JobPosting, Breadcrumb), sitemap, robots, RSS (`/api/rss`), localized canonicals + hreflang.

## Deploy

### Option A — Vercel (recommended)

1. Push this repo to GitHub.
2. Import the project at [vercel.com/new](https://vercel.com/new).
3. Set environment variables from `.env.example` (required: `NEXT_PUBLIC_SITE_URL`).
4. Deploy. Add your custom domain in Project → Settings → Domains.

### Option B — Render.com

This repo includes `render.yaml`.

1. Push to GitHub.
2. In Render: **New → Blueprint** and select the repo (or create a **Web Service** with build `npm ci && npm run build`, start `npm run start`).
3. Set `NEXT_PUBLIC_SITE_URL` to your Render URL (or custom domain), e.g. `https://boliveer-web.onrender.com`.
4. Optionally set `FORM_WEBHOOK_URL` so form leads are delivered.

Production env checklist:

| Variable | Required | Notes |
|----------|----------|--------|
| `NEXT_PUBLIC_SITE_URL` | Yes | Canonical site URL (no trailing slash) |
| `FORM_WEBHOOK_URL` | For leads | POST JSON for all form channels |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | No | Analytics |
| Feature flags | No | See `.env.example` |

## Brand positioning

- **Boliveer** = company that discovers gaps → builds full products → launches → wins in market & media
- **Madar 360** = flagship live product (commerce & services platform)
- **Pipeline** = additional ventures under design/build (see product registry)

## GitHub

Repository name: `boliveer-web` (independent from Madar 360).
