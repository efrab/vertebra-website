import {
  defaultLocale,
  getLocalizedPath,
  locales,
  pathnames,
  slugKeys,
  type Locale,
  type PathnameKey,
} from '../../i18n/routes'
import {absoluteUrl, getSiteUrl} from './siteUrl'

export type HreflangAlternate = {
  hreflang: string
  href: string
}

export type AlternateSlugs = Partial<Record<Locale, string>>

/**
 * Build hreflang alternates for the current page.
 * Pass `routeKey` + `alternateSlugs` for CMS detail pages with per-locale slugs.
 */
export function buildHreflangAlternates(options: {
  locale: Locale
  pathname: string
  siteUrl?: string
  routeKey?: PathnameKey
  alternateSlugs?: AlternateSlugs
}): HreflangAlternate[] {
  const {locale, pathname, routeKey, alternateSlugs} = options
  const siteUrl = options.siteUrl ?? getSiteUrl()
  const alternates: HreflangAlternate[] = []

  for (const loc of locales) {
    let path: string

    if (routeKey && alternateSlugs) {
      const slug = alternateSlugs[loc]
      if (!slug) continue
      path = getLocalizedPath(loc, routeKey, slug)
    } else if (routeKey) {
      path = getLocalizedPath(loc, routeKey)
    } else {
      path = swapLocaleInPathname(pathname, locale, loc)
    }

    alternates.push({
      hreflang: loc,
      href: absoluteUrl(path, siteUrl),
    })
  }

  const defaultSlug = routeKey && alternateSlugs?.[defaultLocale]
  alternates.push({
    hreflang: 'x-default',
    href: absoluteUrl(
      defaultSlug
        ? getLocalizedPath(defaultLocale, routeKey!, defaultSlug)
        : routeKey
          ? getLocalizedPath(defaultLocale, routeKey)
          : swapLocaleInPathname(pathname, locale, defaultLocale),
      siteUrl,
    ),
  })

  return alternates
}

function swapLocaleInPathname(pathname: string, fromLocale: Locale, toLocale: Locale): string {
  const rest = pathname.replace(new RegExp(`^/${fromLocale}(?=/|$)`), '') || '/'
  if (rest === '/') return getLocalizedPath(toLocale, 'home')
  const segments = rest.replace(/^\/+/, '').split('/')
  const [first, ...tail] = segments

  // Translate first segment using pathnames registry
  for (const key of Object.keys(pathnames) as PathnameKey[]) {
    if (pathnames[key][fromLocale] === first) {
      const slug = tail[0]
      const segment = pathnames[key][toLocale]
      if (slug && slugKeys.has(key)) {
        return `/${toLocale}/${segment}/${slug}`
      }
      return segment ? `/${toLocale}/${segment}` : `/${toLocale}/`
    }
  }

  return `/${toLocale}${rest.startsWith('/') ? rest : `/${rest}`}`
}

export function buildCanonicalUrl(options: {
  pathname: string
  siteUrl?: string
}): string {
  const siteUrl = options.siteUrl ?? getSiteUrl()
  return absoluteUrl(options.pathname, siteUrl)
}

/** Open Graph locale codes (language_TERRITORY). */
export function ogLocale(locale: Locale): string {
  return locale === 'es' ? 'es_PE' : 'en_US'
}

export function ogLocaleAlternates(locale: Locale): string[] {
  return locales.filter((l) => l !== locale).map(ogLocale)
}
