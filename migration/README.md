# Migration notes — Webflow → Astro/Sanity

## Done in this repo

- Monorepo bootstrapped from Growth Lab pattern (`frontend/` + `studio/`)
- Webflow export moved to `docs/reference/webflow/`
- Design tokens (Vertebra brand + Poppins) in `frontend/src/styles/global.css`
- Page builder modules + ES/EN fixtures for home and 18 marketing routes
- Sanity schemas for pages, posts, team, testimonials, site settings
- Legacy 301 redirects in `frontend/vercel.json`
- Cookie consent + deferred analytics (GA4, GTM, Ads, Meta, HubSpot)
- Lead form POST `/api/lead`
- SEO: hreflang helpers, robots.txt, sitemap.xml, JSON-LD
- Image optimization script output in `frontend/public/assets/optimized/`
- Videos from Webflow export copied to `frontend/public/assets/home/`

## Manual next steps

1. **Create Sanity project** and fill `frontend/.env` + `studio/.env`
2. `npm run typegen` after first schema deploy
3. Seed content in Studio (or write ETL under `migration/` from Webflow CMS CSV)
4. Wire `HUBSPOT_ACCESS_TOKEN` in `/api/lead` for production form submissions
5. Run `npm run optimize:gifs` if ffmpeg is installed (many demos already exist as MP4/WebM)
6. Deploy frontend to Vercel; point `vertebra.co` DNS
7. Visual QA vs live Webflow for pixel polish (animations, exact spacing)

## Verify locally

```bash
npm install
npm run check
npm run build
npm run dev
# open http://localhost:4321/es/
```
