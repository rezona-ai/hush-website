# Hush AI Website

Bilingual (English / 中文) marketing site for the Hush AI app, based on the app's Figma draft
(`Hush AI - draft UI`). Built with Next.js 16 (App Router, static export) and Tailwind CSS v4.

## Develop

```bash
npm install
npm run dev
```

`/` picks a locale in the browser (saved choice → browser language → English) and redirects to `/en/` or `/zh/`.

## Build & deploy

```bash
npm run build
```

Outputs a fully static site to `out/`, which can be hosted on any static host (Vercel, Netlify, Cloudflare Pages, S3, Nginx…).
Set `NEXT_PUBLIC_SITE_URL` to the production origin so canonical / hreflang URLs are absolute.

## Structure

- `app/[lang]/` – localized page and root layout (`en`, `zh`)
- `app/(root)/` – language redirect for `/`
- `components/` – page sections (Hero, CharacterMarquee, Discover + FeedDemo, Features, ChatDemo, Pricing, Faq, Cta, Footer)
- `lib/dictionaries/` – all copy, one file per locale (`zh.ts` is type-checked against `en.ts`)
- `lib/characters.ts` – character cast used in the marquee and feed demo
- `public/images/` – assets exported from Figma (app screens, character art, logo mark)
- `content/legal/` – Terms of Service and Privacy Policy, rendered at `/[lang]/terms/` and `/[lang]/privacy/`.
  Everything above the first `---` is an internal pre-publication checklist and is never published;
  edit the English text below it and rebuild.

## Placeholders to replace before launch

- App Store / Google Play links — `components/StoreButtons.tsx`
- `[Effective Date]`, `[deletion page URL]`, `[Provider]`, `[Region]` in `content/legal/*.md` (see each file's checklist)
- Tier 2 / Tier 3 prices — `lib/dictionaries/*.ts` (only Tier 1 pricing appears in the design)
- Character art, names and hooks are sample content from the Figma draft
