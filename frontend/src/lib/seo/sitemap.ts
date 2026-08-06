import {
  defaultLocale,
  getLocalizedPath,
  locales,
  type Locale,
  type PathnameKey,
} from '../../i18n/routes'
import {absoluteUrl, getSiteUrl} from './siteUrl'

export type SitemapEntry = {
  loc: string
  lastmod?: string
  alternates: Array<{hreflang: string; href: string}>
}

type SlugEntry = {
  slugs?: Partial<Record<Locale, string | null>>
  _updatedAt?: string
  publishedAt?: string
}

const STATIC_INDEX_KEYS: PathnameKey[] = [
  'home',
  'modules',
  'benefits',
  'ai',
  'about',
  'blog',
  'helpCenter',
  'howCanWeHelp',
  'agenda',
  'contact',
  'pricing',
  'welcome',
  'freeTrial',
  'landingContracts',
  'landingServices',
]

const BLOG_FIXTURE_SLUGS = ['automatiza-cobranza', 'ia-en-proptech', 'contratos-sin-caos']

function buildAlternates(buildPath: (locale: Locale) => string | null, siteUrl: string) {
  const alternates: SitemapEntry['alternates'] = []
  for (const locale of locales) {
    const path = buildPath(locale)
    if (!path) continue
    alternates.push({hreflang: locale, href: absoluteUrl(path, siteUrl)})
  }
  const defaultPath = buildPath(defaultLocale)
  if (defaultPath) {
    alternates.push({hreflang: 'x-default', href: absoluteUrl(defaultPath, siteUrl)})
  }
  return alternates
}

function entryForPaths(
  buildPath: (locale: Locale) => string | null,
  siteUrl: string,
  lastmod?: string,
): SitemapEntry[] {
  const entries: SitemapEntry[] = []
  for (const locale of locales) {
    const path = buildPath(locale)
    if (!path) continue
    entries.push({
      loc: absoluteUrl(path, siteUrl),
      lastmod,
      alternates: buildAlternates(buildPath, siteUrl),
    })
  }
  return entries
}

export type SitemapData = {
  posts?: SlugEntry[]
  pages?: SlugEntry[]
}

export function buildSitemapEntries(data: SitemapData | null, siteUrl?: string): SitemapEntry[] {
  const origin = siteUrl ?? getSiteUrl()
  const entries: SitemapEntry[] = []
  const seen = new Set<string>()

  const add = (items: SitemapEntry[]) => {
    for (const item of items) {
      if (seen.has(item.loc)) continue
      seen.add(item.loc)
      entries.push(item)
    }
  }

  for (const key of STATIC_INDEX_KEYS) {
    add(entryForPaths((locale) => getLocalizedPath(locale, key), origin))
  }

  if (data?.posts?.length) {
    for (const item of data.posts) {
      add(
        entryForPaths((locale) => {
          const slug = item.slugs?.[locale]
          return slug ? getLocalizedPath(locale, 'blogPost', slug) : null
        }, origin, item.publishedAt || item._updatedAt),
      )
    }
  } else {
    for (const slug of BLOG_FIXTURE_SLUGS) {
      add(entryForPaths((locale) => getLocalizedPath(locale, 'blogPost', slug), origin))
    }
  }

  return entries
}

export function renderSitemapXml(entries: SitemapEntry[]): string {
  const urlNodes = entries
    .map((entry) => {
      const alternates = entry.alternates
        .map(
          (alt) =>
            `    <xhtml:link rel="alternate" hreflang="${escapeXml(alt.hreflang)}" href="${escapeXml(alt.href)}" />`,
        )
        .join('\n')
      const lastmod = entry.lastmod
        ? `\n    <lastmod>${new Date(entry.lastmod).toISOString()}</lastmod>`
        : ''
      return `  <url>
    <loc>${escapeXml(entry.loc)}</loc>${lastmod}
${alternates}
  </url>`
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlNodes}
</urlset>`
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}
