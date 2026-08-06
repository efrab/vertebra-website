import type {Locale} from '../../i18n/routes'
import type {SiteSettings} from '../sanity/types'
import {absoluteUrl, getSiteUrl} from './siteUrl'

export type BreadcrumbItem = {
  name: string
  /** Path only, e.g. /es/servicios */
  path: string
}

export type FaqItem = {
  question: string
  answer: string
}

type JsonLd = Record<string, unknown>

function stripHtml(text: string): string {
  return text.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
}

export function organizationSchema(
  siteUrl: string,
  settings?: SiteSettings | null,
): JsonLd {
  const name = settings?.title || 'Vertebra'
  const email = settings?.footer?.contactInfo?.email
  const sameAs =
    settings?.footer?.socialLinks
      ?.map((item) => item.link?.href)
      .filter((href): href is string => Boolean(href && href.startsWith('http'))) ?? []

  return {
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name,
    url: siteUrl,
    logo: {
      '@type': 'ImageObject',
      url: absoluteUrl('/favicon.svg', siteUrl),
    },
    ...(email && {
      contactPoint: {
        '@type': 'ContactPoint',
        email,
        contactType: 'customer service',
        availableLanguage: ['Spanish', 'English'],
      },
    }),
    ...(sameAs.length > 0 && {sameAs}),
  }
}

export function webSiteSchema(siteUrl: string, settings?: SiteSettings | null): JsonLd {
  const name = settings?.title || 'Vertebra'
  return {
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    name,
    url: siteUrl,
    publisher: {'@id': `${siteUrl}/#organization`},
    inLanguage: ['es-PE', 'en-US'],
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/{locale}/insights?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

export function webPageSchema(options: {
  siteUrl: string
  url: string
  name: string
  description?: string
  locale: Locale
  datePublished?: string
  dateModified?: string
}): JsonLd {
  const {siteUrl, url, name, description, locale, datePublished, dateModified} = options
  return {
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name,
    ...(description && {description}),
    inLanguage: locale === 'es' ? 'es-PE' : 'en-US',
    isPartOf: {'@id': `${siteUrl}/#website`},
    ...(datePublished && {datePublished}),
    ...(dateModified && {dateModified}),
  }
}

export function breadcrumbSchema(
  siteUrl: string,
  items: BreadcrumbItem[],
): JsonLd | null {
  if (items.length === 0) return null
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path, siteUrl),
    })),
  }
}

export function articleSchema(options: {
  siteUrl: string
  url: string
  headline: string
  description?: string
  image?: string
  datePublished?: string
  dateModified?: string
  authorName?: string
  locale: Locale
}): JsonLd {
  const {
    siteUrl,
    url,
    headline,
    description,
    image,
    datePublished,
    dateModified,
    authorName,
    locale,
  } = options

  return {
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    headline,
    ...(description && {description}),
    ...(image && {image}),
    ...(datePublished && {datePublished}),
    ...(dateModified && {dateModified}),
    inLanguage: locale === 'es' ? 'es-PE' : 'en-US',
    author: authorName
      ? {'@type': 'Person', name: authorName}
      : {'@type': 'Organization', name: 'Vertebra'},
    publisher: {
      '@type': 'Organization',
      name: 'Vertebra',
      logo: {
        '@type': 'ImageObject',
        url: absoluteUrl('/favicon.svg', siteUrl),
      },
    },
    mainEntityOfPage: {'@id': `${url}#webpage`},
  }
}

export function serviceSchema(options: {
  siteUrl: string
  url: string
  name: string
  description?: string
  image?: string
  locale: Locale
}): JsonLd {
  const {siteUrl, url, name, description, image, locale} = options
  return {
    '@type': 'Service',
    '@id': `${url}#service`,
    name,
    ...(description && {description}),
    ...(image && {image}),
    provider: {'@id': `${siteUrl}/#organization`},
    areaServed: {
      '@type': 'Place',
      name: locale === 'es' ? 'Perú y LATAM' : 'Peru and LATAM',
    },
    url,
  }
}

export function faqPageSchema(items: FaqItem[]): JsonLd | null {
  const valid = items.filter((item) => item.question && item.answer)
  if (valid.length === 0) return null
  return {
    '@type': 'FAQPage',
    mainEntity: valid.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: stripHtml(item.answer),
      },
    })),
  }
}

export type PageStructuredDataInput = {
  locale: Locale
  pathname: string
  title: string
  description?: string
  image?: string
  siteSettings?: SiteSettings | null
  includeGlobal?: boolean
  breadcrumbs?: BreadcrumbItem[]
  faqItems?: FaqItem[]
  article?: {
    publishedAt?: string
    modifiedAt?: string
    authorName?: string
  }
  service?: {
    name: string
    description?: string
  }
}

/** Build @graph JSON-LD for a page from structured context. */
export function buildPageStructuredData(input: PageStructuredDataInput): JsonLd {
  const siteUrl = getSiteUrl()
  const url = absoluteUrl(input.pathname, siteUrl)
  const graph: JsonLd[] = []

  if (input.includeGlobal) {
    graph.push(organizationSchema(siteUrl, input.siteSettings))
    graph.push(webSiteSchema(siteUrl, input.siteSettings))
  }

  graph.push(
    webPageSchema({
      siteUrl,
      url,
      name: input.title,
      description: input.description,
      locale: input.locale,
      datePublished: input.article?.publishedAt,
      dateModified: input.article?.modifiedAt,
    }),
  )

  const breadcrumbs = breadcrumbSchema(siteUrl, input.breadcrumbs ?? [])
  if (breadcrumbs) graph.push(breadcrumbs)

  if (input.article) {
    graph.push(
      articleSchema({
        siteUrl,
        url,
        headline: input.title,
        description: input.description,
        image: input.image,
        datePublished: input.article.publishedAt,
        dateModified: input.article.modifiedAt,
        authorName: input.article.authorName,
        locale: input.locale,
      }),
    )
  }

  if (input.service) {
    graph.push(
      serviceSchema({
        siteUrl,
        url,
        name: input.service.name,
        description: input.service.description ?? input.description,
        image: input.image,
        locale: input.locale,
      }),
    )
  }

  const faq = faqPageSchema(input.faqItems ?? [])
  if (faq) graph.push(faq)

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  }
}

/** Extract FAQ items from PageBuilder sections. */
export function extractFaqFromSections(sections: ReadonlyArray<{_type?: string}>): FaqItem[] {
  const items: FaqItem[] = []
  for (const section of sections) {
    if (section._type !== 'faqSection') continue
    const faqSection = section as {_type: 'faqSection'; items?: FaqItem[]}
    if (!faqSection.items?.length) continue
    for (const item of faqSection.items) {
      if (item.question && item.answer) items.push(item)
    }
  }
  return items
}

/** Localized slug map from Sanity slug field. */
export function localizedSlugMap(slug?: {
  es?: {current?: string | null} | null
  en?: {current?: string | null} | null
}): Partial<Record<Locale, string>> | undefined {
  if (!slug) return undefined
  const out: Partial<Record<Locale, string>> = {}
  if (slug.es?.current) out.es = slug.es.current
  if (slug.en?.current) out.en = slug.en.current
  return Object.keys(out).length > 0 ? out : undefined
}
