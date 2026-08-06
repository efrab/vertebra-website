# URL Map — vertebra.co Webflow → Astro

Audited live on vertebra.co (Aug 2026). Source of truth for migration + redirects.

## Migrate (19 pages + blog posts + 404)

| Live URL | Astro ES | Astro EN | Source HTML |
|----------|----------|----------|-------------|
| `/` | `/es/` | `/en/` | `index.html` |
| `/modulos` | `/es/modulos` | `/en/modules` | `modulos.html` |
| `/beneficios` | `/es/beneficios` | `/en/benefits` | `beneficios.html` |
| `/ai` | `/es/ai` | `/en/ai` | `ai.html` |
| `/nosotros` | `/es/nosotros` | `/en/about` | `nosotros.html` |
| `/blog` | `/es/blog` | `/en/blog` | `blog.html` |
| `/blog/*` | `/es/blog/[slug]` | `/en/blog/[slug]` | CMS posts |
| `/centro-de-ayuda` | `/es/centro-de-ayuda` | `/en/help-center` | `centro-de-ayuda.html` |
| `/como-podemos-ayudarte` | `/es/como-podemos-ayudarte` | `/en/how-can-we-help` | `como-podemos-ayudarte.html` |
| `/como-podemos-ayudarte-buscador` | `/es/como-podemos-ayudarte-buscador` | `/en/how-can-we-help-search` | `como-podemos-ayudarte-buscador.html` |
| `/agenda` | `/es/agenda` | `/en/book-demo` | `agenda.html` |
| `/gracias-agenda` | `/es/gracias-agenda` | `/en/thanks-demo` | `gracias-agenda.html` |
| `/contacto` | `/es/contacto` | `/en/contact` | `contacto.html` |
| `/pricing` | `/es/pricing` | `/en/pricing` | `pricing.html` |
| `/bienvenidos` | `/es/bienvenidos` | `/en/welcome` | `bienvenidos.html` |
| `/free-trial` | `/es/free-trial` | `/en/free-trial` | `free-trial.html` |
| `/landing-contratos-documentos` | `/es/landing-contratos-documentos` | `/en/landing-contracts-documents` | `landing-contratos-documentos.html` |
| `/landing-servicios` | `/es/landing-servicios` | `/en/landing-services` | `landing-servicios.html` |
| `/gracias` | `/es/gracias` | `/en/thank-you` | `gracias.html` |

Custom `404` page replaces Webflow `/404`.

## Legacy redirects (301)

| From | To |
|------|-----|
| `/old-home` | `/es/` |
| `/modulos-old` | `/es/modulos` |
| `/contacto-opc-2` | `/es/contacto` |
| `/typ` | `/es/gracias` |
| `/template-post` | `/es/blog` |
| `/blog-interna` | `/es/blog` |
| `/dashboards` | `/es/modulos` |
| `/401` | `/es/` |

Also redirect bare legacy paths without locale to the same targets.

## Reference only (do not deploy)

- `docs/reference/webflow/componentes.html`
- `docs/reference/webflow/test/style-guide.html`
- `docs/reference/webflow/blog-interna.html`
- `docs/reference/webflow/css/`

## Excluded

- `old-site/`, `test/home-pro2.html`, `test/pricing-test.html`
- `bienvenidos-copy.html`
- Legal pages (404 on prod; live footer links to `app.vertebra.co`)

## Notes

- Prod `/sitemap.xml` was 404; `/robots.txt` empty — Astro generates both.
- Blog posts must be exported from Webflow CMS CSV/API (static export flattened bindings).
