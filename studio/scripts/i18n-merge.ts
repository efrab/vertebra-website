/**
 * Shared helpers to merge ES/EN fixture docs into field-level i18n (v5 format).
 */
import {randomKey} from '@sanity/util/content'

type Locale = 'es' | 'en'

export type LocalizedV5Item<T = unknown> = {
  _key: string
  _type: string
  language: Locale
  value: T
}

function valueTypeFor(value: unknown): string {
  if (
    Array.isArray(value) &&
    value.some(
      (item) => typeof item === 'object' && item !== null && (item as {_type?: string})._type === 'block',
    )
  ) {
    return 'internationalizedArrayPortableTextValue'
  }
  return 'internationalizedArrayStringValue'
}

export function toLocalizedV5<T>(es: T | undefined | null, en: T | undefined | null): LocalizedV5Item<T>[] {
  const out: LocalizedV5Item<T>[] = []
  if (es != null && es !== '') {
    out.push({
      _key: randomKey(),
      _type: valueTypeFor(es),
      language: 'es',
      value: es,
    })
  }
  if (en != null && en !== '') {
    out.push({
      _key: randomKey(),
      _type: valueTypeFor(en),
      language: 'en',
      value: en,
    })
  }
  return out
}

function isLocalizedArray(value: unknown): value is LocalizedV5Item<unknown>[] {
  return (
    Array.isArray(value) &&
    value.length > 0 &&
    typeof value[0] === 'object' &&
    value[0] !== null &&
    ('language' in value[0] || ('_key' in value[0] && 'value' in value[0]))
  )
}

export function mergeLocalized(esVal: unknown, enVal: unknown): unknown {
  if (isLocalizedArray(esVal)) return esVal
  if (typeof esVal === 'string' || typeof enVal === 'string') {
    return toLocalizedV5(esVal as string, enVal as string)
  }
  if (Array.isArray(esVal) && Array.isArray(enVal)) {
    return toLocalizedV5(esVal, enVal)
  }
  return toLocalizedV5(esVal, enVal)
}

const LOCALIZED_KEYS = new Set([
  'title',
  'summary',
  'excerpt',
  'intro',
  'heading',
  'subheading',
  'eyebrow',
  'body',
  'description',
  'label',
  'role',
  'emphasis',
  'text',
  'bio',
  'question',
  'answer',
  'metaTitle',
  'metaDescription',
  'industry',
  'service',
  'challenge',
  'intervention',
  'result',
  'challengeHeadline',
  'interventionHeadline',
  'heroHeading',
  'heroMessage',
  'channelsHeading',
  'reasonsHeading',
  'tagline',
  'whatsappLabel',
  'address',
  'meetingTitle',
  'meetingEyebrow',
  'formTitle',
  'formEyebrow',
  'name',
  'bio',
  'country',
  'featuredTitle',
  'featuredDescription',
  'purposeTitle',
  'purposeBody',
])

export function mergeObjectFields(esObj: Record<string, unknown>, enObj: Record<string, unknown>) {
  const out: Record<string, unknown> = {...esObj}
  for (const key of Object.keys(esObj)) {
    if (LOCALIZED_KEYS.has(key)) {
      out[key] = mergeLocalized(esObj[key], enObj[key])
    } else if (
      key === 'items' ||
      key === 'steps' ||
      key === 'cards' ||
      key === 'members' ||
      key === 'markers' ||
      key === 'categories' ||
      key === 'logos'
    ) {
      const esItems = esObj[key]
      const enItems = enObj[key]
      if (Array.isArray(esItems) && Array.isArray(enItems)) {
        // contentCard list items: string[] → [{text: i18n}]
        if (typeof esItems[0] === 'string') {
          out[key] = esItems.map((item, i) => ({
            _key: randomKey(),
            text: mergeLocalized(item, enItems[i] ?? item),
          }))
        } else {
          out[key] = esItems.map((item, i) => {
            if (
              typeof item === 'object' &&
              item !== null &&
              typeof enItems[i] === 'object' &&
              enItems[i] !== null
            ) {
              return mergeObjectFields(
                item as Record<string, unknown>,
                enItems[i] as Record<string, unknown>,
              )
            }
            return item
          })
        }
      }
    } else if (
      typeof esObj[key] === 'object' &&
      esObj[key] !== null &&
      !Array.isArray(esObj[key]) &&
      enObj[key]
    ) {
      out[key] = mergeObjectFields(
        esObj[key] as Record<string, unknown>,
        enObj[key] as Record<string, unknown>,
      )
    }
  }
  return out
}

export function mergePageBuilder(esBlocks: unknown[], enBlocks: unknown[]) {
  return esBlocks.map((block, index) => {
    if (typeof block !== 'object' || block === null) return block
    const enBlock =
      typeof enBlocks[index] === 'object' && enBlocks[index] !== null
        ? (enBlocks[index] as Record<string, unknown>)
        : {}
    return mergeObjectFields(block as Record<string, unknown>, enBlock)
  })
}

export function mergeSlug(esDoc: Record<string, unknown>, enDoc: Record<string, unknown>) {
  const esSlug = esDoc.slug as {current?: string} | undefined
  const enSlug = enDoc.slug as {current?: string} | undefined
  if (isLocalizedArray(esDoc.slug)) return esDoc.slug
  return {
    es: {_type: 'slug', current: esSlug?.current},
    en: {_type: 'slug', current: enSlug?.current},
  }
}

function mergeSeo(
  esSeo: Record<string, unknown> | undefined,
  enSeo: Record<string, unknown> | undefined,
) {
  if (!esSeo && !enSeo) return undefined
  return {
    metaTitle: mergeLocalized(esSeo?.metaTitle, enSeo?.metaTitle),
    metaDescription: mergeLocalized(esSeo?.metaDescription, enSeo?.metaDescription),
    ogImage: esSeo?.ogImage || enSeo?.ogImage,
  }
}

function pickFields(
  merged: Record<string, unknown>,
  fields: string[],
): Record<string, unknown> {
  const out: Record<string, unknown> = {}
  for (const field of fields) {
    if (merged[field] !== undefined) out[field] = merged[field]
  }
  return out
}

export function mergeCollectionDoc(
  esDoc: Record<string, unknown>,
  enDoc: Record<string, unknown>,
  extra?: Record<string, unknown>,
) {
  return {
    ...extra,
    title: mergeLocalized(esDoc.title, enDoc.title),
    slug: mergeSlug(esDoc, enDoc),
    summary: mergeLocalized(esDoc.summary, enDoc.summary),
    excerpt: mergeLocalized(esDoc.excerpt, enDoc.excerpt),
    industry: mergeLocalized(esDoc.industry, enDoc.industry),
    service: mergeLocalized(esDoc.service, enDoc.service),
    challenge: mergeLocalized(esDoc.challenge, enDoc.challenge),
    challengeHeadline: mergeLocalized(esDoc.challengeHeadline, enDoc.challengeHeadline),
    intervention: mergeLocalized(esDoc.intervention, enDoc.intervention),
    interventionHeadline: mergeLocalized(esDoc.interventionHeadline, enDoc.interventionHeadline),
    result: mergeLocalized(esDoc.result, enDoc.result),
    body: mergeLocalized(esDoc.body, enDoc.body),
    pageBuilder: mergePageBuilder(
      (esDoc.pageBuilder as unknown[]) || [],
      (enDoc.pageBuilder as unknown[]) || [],
    ),
    cover: esDoc.cover || enDoc.cover,
    seo: mergeSeo(esDoc.seo as Record<string, unknown>, enDoc.seo as Record<string, unknown>),
    showInNav: esDoc.showInNav ?? enDoc.showInNav,
    navOrder: esDoc.navOrder ?? enDoc.navOrder,
    contentType: esDoc.contentType ?? enDoc.contentType,
    author: esDoc.author ?? enDoc.author,
    readTimeMinutes: esDoc.readTimeMinutes ?? enDoc.readTimeMinutes,
    downloadUrl: esDoc.downloadUrl ?? enDoc.downloadUrl,
    categories: esDoc.categories ?? enDoc.categories,
    publishedAt: esDoc.publishedAt ?? enDoc.publishedAt,
    metrics: esDoc.metrics,
    relatedService: esDoc.relatedService ?? enDoc.relatedService,
    relatedCases: esDoc.relatedCases ?? enDoc.relatedCases,
    related: esDoc.related ?? enDoc.related,
  }
}

function mergeAllSingletonFields(esDoc: Record<string, unknown>, enDoc: Record<string, unknown>) {
  return {
    title: mergeLocalized(esDoc.title, enDoc.title),
    intro: mergeLocalized(esDoc.intro, enDoc.intro),
    heroHeading: mergeLocalized(esDoc.heroHeading, enDoc.heroHeading),
    heroMessage: mergeLocalized(esDoc.heroMessage, enDoc.heroMessage),
    channelsHeading: mergeLocalized(esDoc.channelsHeading, enDoc.channelsHeading),
    reasonsHeading: mergeLocalized(esDoc.reasonsHeading, enDoc.reasonsHeading),
    hero: mergeObjectFields(
      (esDoc.hero as Record<string, unknown>) || {},
      (enDoc.hero as Record<string, unknown>) || {},
    ),
    paths: mergeObjectFields(
      (esDoc.paths as Record<string, unknown>) || {},
      (enDoc.paths as Record<string, unknown>) || {},
    ),
    channels: mergePageBuilder(
      (esDoc.channels as unknown[]) || [],
      (enDoc.channels as unknown[]) || [],
    ),
    reasons: mergePageBuilder(
      (esDoc.reasons as unknown[]) || [],
      (enDoc.reasons as unknown[]) || [],
    ),
    faq: mergeObjectFields(
      (esDoc.faq as Record<string, unknown>) || {},
      (enDoc.faq as Record<string, unknown>) || {},
    ),
    interestOptions: mergePageBuilder(
      (esDoc.interestOptions as unknown[]) || [],
      (enDoc.interestOptions as unknown[]) || [],
    ),
    cta: mergeObjectFields(
      (esDoc.cta as Record<string, unknown>) || {},
      (enDoc.cta as Record<string, unknown>) || {},
    ),
    newsletter: mergeObjectFields(
      (esDoc.newsletter as Record<string, unknown>) || {},
      (enDoc.newsletter as Record<string, unknown>) || {},
    ),
    bottomCta: mergeObjectFields(
      (esDoc.bottomCta as Record<string, unknown>) || {},
      (enDoc.bottomCta as Record<string, unknown>) || {},
    ),
    featuredInsight: esDoc.featuredInsight ?? enDoc.featuredInsight,
    featuredCase: esDoc.featuredCase ?? enDoc.featuredCase,
    pageBuilder: mergePageBuilder(
      (esDoc.pageBuilder as unknown[]) || [],
      (enDoc.pageBuilder as unknown[]) || [],
    ),
    body: mergeLocalized(esDoc.body, enDoc.body),
    slug: mergeSlug(esDoc, enDoc),
    seo: mergeSeo(esDoc.seo as Record<string, unknown>, enDoc.seo as Record<string, unknown>),
    whatsapp: esDoc.whatsapp ?? enDoc.whatsapp,
    navGroups: mergePageBuilder(
      (esDoc.navGroups as unknown[]) || [],
      (enDoc.navGroups as unknown[]) || [],
    ),
    footer: mergeObjectFields(
      (esDoc.footer as Record<string, unknown>) || {},
      (enDoc.footer as Record<string, unknown>) || {},
    ),
    defaultSeo: mergeSeo(
      esDoc.defaultSeo as Record<string, unknown>,
      enDoc.defaultSeo as Record<string, unknown>,
    ),
  }
}

/** @deprecated Use type-specific merge functions */
export function mergeSingletonDoc(esDoc: Record<string, unknown>, enDoc: Record<string, unknown>) {
  return mergeAllSingletonFields(esDoc, enDoc)
}

export function mergePageBuilderDoc(esDoc: Record<string, unknown>, enDoc: Record<string, unknown>) {
  return pickFields(mergeAllSingletonFields(esDoc, enDoc), ['title', 'pageBuilder', 'seo'])
}

export function mergeIntroPageDoc(esDoc: Record<string, unknown>, enDoc: Record<string, unknown>) {
  return pickFields(mergeAllSingletonFields(esDoc, enDoc), ['title', 'intro', 'pageBuilder', 'seo'])
}

export function mergeContactPageDoc(esDoc: Record<string, unknown>, enDoc: Record<string, unknown>) {
  return pickFields(mergeAllSingletonFields(esDoc, enDoc), [
    'title',
    'hero',
    'paths',
    'channelsHeading',
    'channels',
    'reasonsHeading',
    'reasons',
    'faq',
    'interestOptions',
    'seo',
  ])
}

export function mergeThankYouPageDoc(esDoc: Record<string, unknown>, enDoc: Record<string, unknown>) {
  return pickFields(mergeAllSingletonFields(esDoc, enDoc), [
    'title',
    'heroHeading',
    'heroMessage',
    'cta',
    'seo',
  ])
}

export function mergeInsightsIndexDoc(esDoc: Record<string, unknown>, enDoc: Record<string, unknown>) {
  return pickFields(mergeAllSingletonFields(esDoc, enDoc), [
    'title',
    'hero',
    'newsletter',
    'bottomCta',
    'featuredInsight',
    'seo',
  ])
}

export function mergeCaseStudiesIndexDoc(esDoc: Record<string, unknown>, enDoc: Record<string, unknown>) {
  return pickFields(mergeAllSingletonFields(esDoc, enDoc), [
    'title',
    'hero',
    'bottomCta',
    'featuredCase',
    'seo',
  ])
}

export function mergeLegalPageDoc(esDoc: Record<string, unknown>, enDoc: Record<string, unknown>) {
  return pickFields(mergeAllSingletonFields(esDoc, enDoc), ['title', 'slug', 'body', 'seo'])
}

export function mergeSiteSettingsDoc(esDoc: Record<string, unknown>, enDoc: Record<string, unknown>) {
  return pickFields(mergeAllSingletonFields(esDoc, enDoc), [
    'title',
    'whatsapp',
    'navGroups',
    'footer',
    'defaultSeo',
  ])
}
