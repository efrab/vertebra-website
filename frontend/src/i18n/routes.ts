export const locales = ['es', 'en'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'es'

export const pathnames = {
  home: {es: '', en: ''},
  modules: {es: 'modulos', en: 'modules'},
  benefits: {es: 'beneficios', en: 'benefits'},
  ai: {es: 'ai', en: 'ai'},
  about: {es: 'nosotros', en: 'about'},
  blog: {es: 'blog', en: 'blog'},
  blogPost: {es: 'blog', en: 'blog'},
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
  roiCalculator: {es: 'calculadora-roi', en: 'roi-calculator'},
} as const

export type PathnameKey = keyof typeof pathnames

export const slugKeys = new Set<PathnameKey>(['blogPost'])

export const indexKeys = new Set<PathnameKey>([
  'home',
  'modules',
  'benefits',
  'ai',
  'about',
  'blog',
  'helpCenter',
  'howCanWeHelp',
  'howCanWeHelpSearch',
  'agenda',
  'thanksDemo',
  'contact',
  'pricing',
  'welcome',
  'freeTrial',
  'landingContracts',
  'landingServices',
  'thankYou',
  'roiCalculator',
])

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value)
}

export function getLocalizedPath(
  locale: Locale,
  key: PathnameKey,
  slug?: string,
): string {
  const segment = pathnames[key][locale]
  if (!segment) {
    return slug ? `/${locale}/${slug}` : `/${locale}/`
  }
  if (slug) {
    return `/${locale}/${segment}/${slug}`
  }
  return `/${locale}/${segment}`
}

export function getAlternateLocale(locale: Locale): Locale {
  return locale === 'es' ? 'en' : 'es'
}

export function getPathAfterLocale(pathname: string, locale: Locale): string {
  const parts = pathname.replace(/^\/+|\/+$/g, '').split('/').filter(Boolean)
  const alternate = getAlternateLocale(locale)

  while (parts.length > 0 && (parts[0] === locale || parts[0] === alternate)) {
    parts.shift()
  }

  return parts.join('/')
}

export function getCanonicalRedirectPath(
  pathname: string,
  locale: Locale,
): string | null {
  const rest = getPathAfterLocale(pathname, locale)
  const segments = rest.split('/').filter(Boolean)
  const rawSegments = pathname.replace(/^\/+|\/+$/g, '').split('/').filter(Boolean)
  const hadStrayLocales = rawSegments.length !== segments.length + 1

  if (segments.length === 0) {
    return hadStrayLocales ? getLocalizedPath(locale, 'home') : null
  }

  const route = resolveRoute(locale, segments)
  if (route.kind !== 'notFound') {
    return hadStrayLocales ? pathnameFromRoute(locale, route) : null
  }

  return null
}

function pathnameFromRoute(locale: Locale, route: ResolvedRoute): string {
  switch (route.kind) {
    case 'home':
      return getLocalizedPath(locale, 'home')
    case 'blogPost':
      return getLocalizedPath(locale, 'blogPost', route.slug)
    default:
      return getLocalizedPath(locale, route.kind as PathnameKey)
  }
}

export function getAlternateLocalePath(locale: Locale, restPath: string): string {
  const alternate = getAlternateLocale(locale)
  const parts = restPath.replace(/^\/+|\/+$/g, '').split('/').filter(Boolean)

  if (parts.length === 0) {
    return getLocalizedPath(alternate, 'home')
  }

  const [first, ...rest] = parts
  const slug = rest[0]

  for (const key of Object.keys(pathnames) as PathnameKey[]) {
    if (pathnames[key][locale] === first) {
      if (slug && slugKeys.has(key)) {
        return getLocalizedPath(alternate, key, slug)
      }
      if (!slug && indexKeys.has(key)) {
        return getLocalizedPath(alternate, key)
      }
      if (!slug && slugKeys.has(key)) {
        continue
      }
      if (slug) {
        return getLocalizedPath(alternate, key, slug)
      }
      return getLocalizedPath(alternate, key)
    }
  }

  return `/${alternate}/${parts.join('/')}`
}

export type ResolvedRoute =
  | {kind: 'home'}
  | {kind: 'modules'}
  | {kind: 'benefits'}
  | {kind: 'ai'}
  | {kind: 'about'}
  | {kind: 'blog'}
  | {kind: 'blogPost'; slug: string}
  | {kind: 'helpCenter'}
  | {kind: 'howCanWeHelp'}
  | {kind: 'howCanWeHelpSearch'}
  | {kind: 'agenda'}
  | {kind: 'thanksDemo'}
  | {kind: 'contact'}
  | {kind: 'pricing'}
  | {kind: 'welcome'}
  | {kind: 'freeTrial'}
  | {kind: 'landingContracts'}
  | {kind: 'landingServices'}
  | {kind: 'thankYou'}
  | {kind: 'roiCalculator'}
  | {kind: 'notFound'}

export function resolveRoute(locale: Locale, segments: string[]): ResolvedRoute {
  if (segments.length === 0) return {kind: 'home'}

  const [first, second] = segments
  const matchKey = (key: PathnameKey) => pathnames[key][locale] === first

  if (matchKey('blog') || matchKey('blogPost')) {
    if (second) return {kind: 'blogPost', slug: second}
    return {kind: 'blog'}
  }

  const singleKeys: PathnameKey[] = [
    'modules',
    'benefits',
    'ai',
    'about',
    'helpCenter',
    'howCanWeHelp',
    'howCanWeHelpSearch',
    'agenda',
    'thanksDemo',
    'contact',
    'pricing',
    'welcome',
    'freeTrial',
    'landingContracts',
    'landingServices',
    'thankYou',
    'roiCalculator',
  ]

  for (const key of singleKeys) {
    if (matchKey(key) && !second) {
      return {kind: key} as ResolvedRoute
    }
  }

  return {kind: 'notFound'}
}

/** Legacy Webflow paths → localized ES targets (no locale prefix on input) */
export const legacyRedirects: Record<string, string> = {
  'old-home': '/es/',
  'modulos-old': '/es/modulos',
  'contacto-opc-2': '/es/contacto',
  typ: '/es/gracias',
  'template-post': '/es/blog',
  'blog-interna': '/es/blog',
  dashboards: '/es/modulos',
  '401': '/es/',
}
