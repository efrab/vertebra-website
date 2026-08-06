# Vertebra Website

Bilingual marketing site for [vertebra.co](https://vertebra.co/) — Astro 6 + Sanity 5 monorepo (Growth Lab pattern).

## Setup

```bash
nvm use   # Node 22+
npm install
cp frontend/.env.example frontend/.env
cp studio/.env.example studio/.env
# Add Sanity project IDs when ready
npm run dev
```

- Frontend: http://localhost:4321
- Studio: http://localhost:3333

Without Sanity credentials the site runs on **fixtures**.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Frontend + Studio |
| `npm run check` | Astro + TypeScript |
| `npm run build` | Production build |
| `npm run typegen` | Sanity schema → types |
| `npm run optimize:images` | Compress large PNG/JPG → WebP/AVIF |
| `npm run optimize:gifs` | Convert GIFs → MP4/WebM (needs ffmpeg) |

## Structure

```
frontend/   Astro SSR (Vercel)
studio/     Sanity Studio
docs/       AGENT_CONTEXT, DESIGN_SYSTEM, URL_MAP
docs/reference/webflow/   Webflow export (reference only)
migration/  Asset optimization scripts
```

## Scope

See [docs/URL_MAP.md](docs/URL_MAP.md) for live pages, redirects, and exclusions.

## Deploy

Vercel project root = `frontend/` (or monorepo with `frontend` as app). Redirects in `frontend/vercel.json`.
