import {getLocalizedPath, type Locale} from '../../i18n/routes'
import {absoluteUrl} from '../seo/siteUrl'

/** Plain-text/markdown versions of key pages for AI agents and LLM crawlers. */
export function homeMarkdown(locale: Locale, siteUrl: string): string {
  const u = (key: Parameters<typeof getLocalizedPath>[1]) =>
    absoluteUrl(getLocalizedPath(locale, key), siteUrl)

  if (locale === 'en') {
    return `# Vertebra — Manage your commercial and industrial properties with AI, no spreadsheets

Vertebra is a property management platform for owners and administrators of commercial and industrial real estate in Latin America. It brings contracts, maintenance, billing and payments into one place and uses AI to automate the repetitive work.

## Key pages

- [Modules](${u('modules')}): contracts, maintenance, billing, collections and payments.
- [Benefits](${u('benefits')}): what owners and administrators gain.
- [AI](${u('ai')}): how Vertebra's artificial intelligence automates property operations.
- [ROI calculator](${u('roiCalculator')}): estimate the savings for your portfolio.
- [Pricing](${u('pricing')})
- [About](${u('about')})
- [Book a demo](${u('agenda')})

## Contact

- Book a demo: ${u('agenda')}
- Contact: ${u('contact')}
`
  }

  return `# Vertebra — Administra tus propiedades comerciales e industriales con IA, sin hojas de cálculo

Vertebra es una plataforma de administración de propiedades para propietarios y administradores de inmuebles comerciales e industriales en Latinoamérica. Reúne contratos, mantenimientos, facturación y pagos en un solo lugar y usa inteligencia artificial para automatizar el trabajo repetitivo.

## Páginas clave

- [Módulos](${u('modules')}): contratos, mantenimientos, facturación, cobranza y pagos.
- [Beneficios](${u('benefits')}): qué ganan propietarios y administradores.
- [IA](${u('ai')}): cómo la inteligencia artificial de Vertebra automatiza la operación.
- [Calculadora ROI](${u('roiCalculator')}): estima el ahorro para tu portafolio.
- [Precios](${u('pricing')})
- [Nosotros](${u('about')})
- [Solicita una demo](${u('agenda')})

## Contacto

- Solicita una demo: ${u('agenda')}
- Contacto: ${u('contact')}
`
}

export function llmsTxt(siteUrl: string): string {
  const es = (k: Parameters<typeof getLocalizedPath>[1]) => absoluteUrl(getLocalizedPath('es', k), siteUrl)
  const en = (k: Parameters<typeof getLocalizedPath>[1]) => absoluteUrl(getLocalizedPath('en', k), siteUrl)
  return `# Vertebra

> Plataforma con IA para administrar propiedades comerciales e industriales: contratos, mantenimientos, facturación y pagos en un solo lugar. / AI-powered platform to manage commercial and industrial properties: contracts, maintenance, billing and payments in one place.

## Español

- [Inicio (markdown)](${absoluteUrl('/es/index.md', siteUrl)}): resumen de Vertebra y páginas clave.
- [Módulos](${es('modules')}): funcionalidades de la plataforma.
- [Beneficios](${es('benefits')}): resultados para propietarios y administradores.
- [IA](${es('ai')}): automatización con inteligencia artificial.
- [Calculadora ROI](${es('roiCalculator')}): estima tu ahorro.
- [Precios](${es('pricing')})
- [Nosotros](${es('about')})
- [Solicita una demo](${es('agenda')})

## English

- [Home (markdown)](${absoluteUrl('/en/index.md', siteUrl)}): overview and key pages.
- [Modules](${en('modules')})
- [Benefits](${en('benefits')})
- [AI](${en('ai')})
- [ROI calculator](${en('roiCalculator')})
- [Pricing](${en('pricing')})
- [About](${en('about')})
- [Book a demo](${en('agenda')})
`
}
