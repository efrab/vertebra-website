# Guía de contexto para agentes — Vertebra

Adjúntalo al inicio de chats nuevos:

```
@docs/AGENT_CONTEXT.md
```

Complementa `.cursor/rules/vertebra.mdc`.

---

## 1. Stack

| Parte | Ruta | Tech |
|-------|------|------|
| Frontend | `frontend/` | Astro SSR, Tailwind 4, Vercel |
| CMS | `studio/` | Sanity Studio standalone |
| i18n | `es` (default), `en` | `frontend/src/i18n/routes.ts` |
| Referencia Webflow | `docs/reference/webflow/` | Export HTML/CSS/assets |

**Node 22+** (`nvm use`).

```bash
npm run dev      # frontend :4321 + studio :3333
npm run check
npm run build
npm run typegen
```

Sin Sanity → fixtures. Con CMS + `pageBuilder` → override en runtime.

---

## 2. Arquitectura de imports

```
pages / views  →  modules / layouts  →  components/ui | components/cards
```

**PageBuilder.astro** mapea `_type` Sanity → módulo Astro.  
**1 objeto Sanity = 1 módulo.** Variantes = `layout` / `variant`.

---

## 3. Decisiones de producto

- Migrar solo páginas live (~19) + blog CMS
- Legacy live → 301 redirects (`docs/URL_MAP.md`)
- Legal vive en `app.vertebra.co` — no migrar
- Design tokens desde CSS Webflow (brand `#0042f1`, Poppins)
- Layout: fluid + artboard lock 1440px
- Base arquitectura: Growth Lab pattern (`@astro-sanity-starter`)

---

## 4. Skills

| Tarea | Skill |
|-------|-------|
| Bootstrap / PageBuilder | `@astro-sanity-starter` |
| Tokens / Phase 0 | `@astro-frontend-starter` |
| Schemas / GROQ | `@sanity-best-practices` |
| Migración Webflow | `@sanity-migration` |
| SEO | `@seo-aeo-best-practices` |

---

## 5. Calidad

- Diff mínimo; no commit sin pedirlo
- `npm run check` + `npm run build` antes de cerrar
- Islands solo para nav móvil, forms, cookie consent
