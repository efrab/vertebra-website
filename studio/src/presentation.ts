import type {PresentationPluginOptions} from 'sanity/presentation'

/** Maps Sanity page.routeKey to localized URL segments (matches frontend i18n/routes.ts). */
const routeKeyPaths: Record<string, {es: string; en: string}> = {
  modules: {es: 'modulos', en: 'modules'},
  benefits: {es: 'beneficios', en: 'benefits'},
  ai: {es: 'ai', en: 'ai'},
  about: {es: 'nosotros', en: 'about'},
  helpCenter: {es: 'centro-de-ayuda', en: 'help-center'},
  howCanWeHelp: {es: 'como-podemos-ayudarte', en: 'how-can-we-help'},
  howCanWeHelpSearch: {
    es: 'como-podemos-ayudarte-buscador',
    en: 'how-can-we-help-search',
  },
  agenda: {es: 'agenda', en: 'book-demo'},
  thanksDemo: {es: 'gracias-agenda', en: 'thanks-demo'},
  contact: {es: 'contacto', en: 'contact'},
  pricing: {es: 'pricing', en: 'pricing'},
  welcome: {es: 'bienvenidos', en: 'welcome'},
  freeTrial: {es: 'free-trial', en: 'free-trial'},
  landingContracts: {
    es: 'landing-contratos-documentos',
    en: 'landing-contracts-documents',
  },
  landingServices: {es: 'landing-servicios', en: 'landing-services'},
  thankYou: {es: 'gracias', en: 'thank-you'},
}

function hrefForRouteKey(routeKey: string, locale: 'es' | 'en'): string | null {
  const segments = routeKeyPaths[routeKey]
  if (!segments) return null
  const segment = segments[locale]
  return segment ? `/${locale}/${segment}` : `/${locale}/`
}

export const presentationLocations: PresentationPluginOptions['resolve'] extends
  | {locations?: infer L}
  | undefined
  ? L
  : never = {
  homePage: {
    select: {},
    resolve: () => ({
      locations: [
        {title: 'Home ES', href: '/es/'},
        {title: 'Home EN', href: '/en/'},
      ],
    }),
  },
  aboutPage: {
    select: {},
    resolve: () => ({
      locations: [
        {title: 'Nosotros', href: '/es/nosotros'},
        {title: 'About', href: '/en/about'},
      ],
    }),
  },
  contactPage: {
    select: {},
    resolve: () => ({
      locations: [
        {title: 'Contacto', href: '/es/contacto'},
        {title: 'Contact', href: '/en/contact'},
      ],
    }),
  },
  thankYouPage: {
    select: {},
    resolve: () => ({
      locations: [
        {title: 'Gracias', href: '/es/gracias'},
        {title: 'Thank you', href: '/en/thank-you'},
      ],
    }),
  },
  roiCalculatorPage: {
    select: {},
    resolve: () => ({
      locations: [
        // Dedicated route file is [locale]/roi-calculator.astro for both locales
        {title: 'Calculadora ROI', href: '/es/roi-calculator'},
        {title: 'ROI Calculator', href: '/en/roi-calculator'},
      ],
    }),
  },
  page: {
    select: {
      title: 'title',
      routeKey: 'routeKey',
    },
    resolve: (doc) => {
      const routeKey = doc?.routeKey as string | undefined
      if (!routeKey) {
        return {locations: []}
      }

      const esHref = hrefForRouteKey(routeKey, 'es')
      const enHref = hrefForRouteKey(routeKey, 'en')

      return {
        locations: [
          esHref ? {title: 'ES', href: esHref} : null,
          enHref ? {title: 'EN', href: enHref} : null,
        ].filter(Boolean) as {title: string; href: string}[],
      }
    },
  },
  post: {
    select: {
      title: 'title',
      slugEs: 'slug.es.current',
      slugEn: 'slug.en.current',
    },
    resolve: (doc) => ({
      locations: [
        doc?.slugEs ? {title: 'ES', href: `/es/blog/${doc.slugEs}`} : null,
        doc?.slugEn ? {title: 'EN', href: `/en/blog/${doc.slugEn}`} : null,
      ].filter(Boolean) as {title: string; href: string}[],
    }),
  },
}
