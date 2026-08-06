# Design System — Vertebra

## Layout strategy

**Fluid + artboard lock at 1440px** (matches Webflow `clamp()` fluid root).

## Brand tokens

| Token | Value | Role |
|-------|-------|------|
| `--color-brand` | `#0042f1` | Primary CTA, links |
| `--color-brand-800` | `#002485` | Hover / emphasis |
| `--color-dark-blue` | `#141b4d` | Headings, footer |
| `--color-accent` | `#43ea51` | Accent / success accents |
| `--color-ghost` | `#eff2ff` | Soft surfaces |
| `--color-ink` | `#282a36` | Body text |
| `--color-neutral-50` | `#f2f7ff` | Page background alt |

## Typography

- Family: **Poppins** 300–700 (self-hosted)
- Scale: `--text-hero`, `--text-display`, `--text-h2`, `--text-h3`, `--text-body`, `--text-small`

## Spacing

- Section Y: `--space-section-y`
- Section X / page gutters: `--space-section-x`
- Page max: `--page-max` (90rem / 1440)

## UI primitives

`Container`, `Section`, `Heading`, `Button`, `Tag`, `TextLink`, form controls.

## Reference

- Webflow: `docs/reference/webflow/componentes.html`
- Style guide: `docs/reference/webflow/test/style-guide.html`
- CSS source: `docs/reference/webflow/css/vertebra-*.webflow.css`
