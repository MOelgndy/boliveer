# Boliveer Web — Company OS

Independent Next.js site for **Boliveer**, parent company of **Madar 360**.

This is not a marketing landing page. It is a **Company OS / Control Plane** digital experience: multilingual (EN/AR), dark/light, enterprise SEO, product registry, and conversion surfaces.

## Stack

- Next.js App Router + TypeScript
- Tailwind + design tokens
- next-intl (EN LTR / AR RTL)
- next-themes
- Framer Motion
- MDX-ready + typed content registries
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

- `app/[locale]/(os)` — OS shell routes
- `components/os-shell` — SystemBar, Command Palette, Boot, Dock
- `content/*` — product / industry / job / article registries
- `lib/content.ts` — CMS-ready content boundary
- `lib/forms.ts` — form provider boundary
- `lib/analytics.ts` / `lib/flags.ts` / `lib/ab.ts` / `lib/booking.ts` — scale adapters
- `design-system/` — tokens + motion

## SEO

Metadata API, JSON-LD (Organization, WebSite, Product, FAQ, Article, JobPosting, Breadcrumb), sitemap, robots, RSS (`/api/rss`), localized canonicals + hreflang.

## Deploy

Vercel recommended. Set `NEXT_PUBLIC_SITE_URL` and optional `FORM_WEBHOOK_URL` / analytics flags.

## GitHub

Repository name: `boliveer-web` (independent from Madar 360).
