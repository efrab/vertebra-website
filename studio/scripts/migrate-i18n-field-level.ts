/**
 * Merge document-level ES/EN pairs into field-level unified documents.
 * Run: npm run migrate:i18n [-- --dry-run]
 */
import {createClient, type SanityClient} from '@sanity/client'
import {existsSync, readFileSync} from 'node:fs'
import {dirname, resolve} from 'node:path'
import {fileURLToPath} from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const dryRun = process.argv.includes('--dry-run')

type Locale = 'es' | 'en'
type Localized<T> = Array<{_key: Locale; value: T}>

function loadStudioEnv() {
  const envPath = resolve(__dirname, '../.env')
  if (!existsSync(envPath)) return
  for (const line of readFileSync(envPath, 'utf8').split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq === -1) continue
    const key = trimmed.slice(0, eq).trim()
    let val = trimmed.slice(eq + 1).trim()
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1)
    }
    if (!(key in process.env)) process.env[key] = val
  }
}

function toLocalized<T>(es: T | undefined | null, en: T | undefined | null): Localized<T> {
  const out: Localized<T> = []
  if (es != null && es !== '') out.push({_key: 'es', value: es})
  if (en != null && en !== '') out.push({_key: 'en', value: en})
  return out
}

function isLocalizedArray(value: unknown): value is Localized<unknown> {
  return (
    Array.isArray(value) &&
    value.length > 0 &&
    typeof value[0] === 'object' &&
    value[0] !== null &&
    '_key' in value[0] &&
    'value' in value[0]
  )
}

function mergeLocalized(esVal: unknown, enVal: unknown): unknown {
  if (isLocalizedArray(esVal)) return esVal
  if (typeof esVal === 'string' || typeof enVal === 'string') {
    return toLocalized(esVal as string, enVal as string)
  }
  if (Array.isArray(esVal) && Array.isArray(enVal)) {
    // portable text blocks — take per locale whole
    return toLocalized(esVal, enVal)
  }
  return toLocalized(esVal, enVal)
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
  'value',
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
  'role',
  'bio',
  'country',
  'organizations',
  'featuredTitle',
  'featuredDescription',
  'purposeTitle',
  'purposeBody',
])

function mergeObjectFields(esObj: Record<string, unknown>, enObj: Record<string, unknown>) {
  const out: Record<string, unknown> = {...esObj}
  for (const key of Object.keys(esObj)) {
    if (LOCALIZED_KEYS.has(key)) {
      out[key] = mergeLocalized(esObj[key], enObj[key])
    } else if (key === 'items' || key === 'steps' || key === 'cards' || key === 'members' || key === 'markers' || key === 'categories') {
      const esItems = esObj[key]
      const enItems = enObj[key]
      if (Array.isArray(esItems) && Array.isArray(enItems)) {
        out[key] = esItems.map((item, i) => {
          if (typeof item === 'object' && item !== null && typeof enItems[i] === 'object' && enItems[i] !== null) {
            return mergeObjectFields(
              item as Record<string, unknown>,
              enItems[i] as Record<string, unknown>,
            )
          }
          return item
        })
      }
    } else if (typeof esObj[key] === 'object' && esObj[key] !== null && !Array.isArray(esObj[key]) && enObj[key]) {
      out[key] = mergeObjectFields(
        esObj[key] as Record<string, unknown>,
        enObj[key] as Record<string, unknown>,
      )
    }
  }
  return out
}

function mergePageBuilder(esBlocks: unknown[], enBlocks: unknown[]) {
  return esBlocks.map((block, index) => {
    if (typeof block !== 'object' || block === null) return block
    const enBlock =
      typeof enBlocks[index] === 'object' && enBlocks[index] !== null
        ? (enBlocks[index] as Record<string, unknown>)
        : {}
    return mergeObjectFields(block as Record<string, unknown>, enBlock)
  })
}

function mergeSlug(esDoc: Record<string, unknown>, enDoc: Record<string, unknown>) {
  const esSlug = esDoc.slug as {current?: string} | undefined
  const enSlug = enDoc.slug as {current?: string} | undefined
  if (isLocalizedArray(esDoc.slug)) return esDoc.slug
  return {
    es: {_type: 'slug', current: esSlug?.current},
    en: {_type: 'slug', current: enSlug?.current},
  }
}

function mergeSeo(esSeo: Record<string, unknown> | undefined, enSeo: Record<string, unknown> | undefined) {
  if (!esSeo && !enSeo) return undefined
  return {
    metaTitle: mergeLocalized(esSeo?.metaTitle, enSeo?.metaTitle),
    metaDescription: mergeLocalized(esSeo?.metaDescription, enSeo?.metaDescription),
    ogImage: esSeo?.ogImage || enSeo?.ogImage,
  }
}

function mergeCollectionDoc(
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

function mergeSingletonDoc(esDoc: Record<string, unknown>, enDoc: Record<string, unknown>) {
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

async function getPair(client: SanityClient, esId: string, enId: string) {
  const [esDoc, enDoc] = await Promise.all([
    client.getDocument(esId).catch(() => null),
    client.getDocument(enId).catch(() => null),
  ])
  return {esDoc, enDoc}
}

async function upsert(client: SanityClient, doc: Record<string, unknown>) {
  const id = String(doc._id)
  if (dryRun) {
    console.log(`[dry-run] would upsert ${id}`)
    return
  }
  await client.createOrReplace(doc as Parameters<SanityClient['createOrReplace']>[0])
  console.log(`upserted ${id}`)
}

async function remove(client: SanityClient, id: string) {
  if (dryRun) {
    console.log(`[dry-run] would delete ${id}`)
    return
  }
  await client.delete(id).catch(() => undefined)
  console.log(`deleted ${id}`)
}

async function migratePair(
  client: SanityClient,
  newId: string,
  type: string,
  esId: string,
  enId: string,
  merge: (es: Record<string, unknown>, en: Record<string, unknown>) => Record<string, unknown>,
) {
  const {esDoc, enDoc} = await getPair(client, esId, enId)
  if (!esDoc && !enDoc) {
    console.log(`skip ${newId} (no source docs)`)
    return
  }
  const merged = merge(
    (esDoc || enDoc) as Record<string, unknown>,
    (enDoc || esDoc) as Record<string, unknown>,
  )
  await upsert(client, {_id: newId, _type: type, ...merged})
  if (esId !== newId) await remove(client, esId)
  if (enId !== newId) await remove(client, enId)
}

async function main() {
  loadStudioEnv()
  const projectId = process.env.SANITY_STUDIO_PROJECT_ID
  const dataset = process.env.SANITY_STUDIO_DATASET || 'production'
  const token = process.env.SANITY_API_WRITE_TOKEN
  if (!projectId || !token) throw new Error('Set SANITY_STUDIO_PROJECT_ID and SANITY_API_WRITE_TOKEN')

  const client = createClient({projectId, dataset, token, apiVersion: '2024-01-01', useCdn: false})

  const serviceKeys = ['clima', 'cultura', 'gestion', 'potencial', 'liderazgo'] as const
  for (const key of serviceKeys) {
    await migratePair(
      client,
      `service-${key}`,
      'service',
      `seed-service-${key}-es`,
      `seed-service-${key}-en`,
      (es, en) => mergeCollectionDoc(es, en),
    )
  }

  const insightPairs: Array<[string, string, string]> = [
    ['insight-ia-reclutamiento-peru', 'ia-reclutamiento-ejecutivo-peru', 'ai-executive-recruitment-peru'],
    ['insight-culture-fit', 'culture-fit-equivocado', 'culture-fit-gets-wrong'],
    ['insight-sucesion', 'sucesion-sin-teatro', 'succession-without-theater'],
    ['insight-playbook-hiring', 'playbook-hiring-metricas', 'hiring-playbook-metrics'],
    ['insight-clima', 'clima-organizacional-diagnostico-accion', 'organizational-climate-diagnosis-action'],
    ['insight-cultura', 'cultura-organizacional-diagnostico-accion', 'organizational-culture-diagnosis-action'],
  ]
  for (const [newId, esSlug, enSlug] of insightPairs) {
    await migratePair(
      client,
      newId,
      'insight',
      `seed-insight-${esSlug}-es`,
      `seed-insight-${enSlug}-en`,
      (es, en) => mergeCollectionDoc(es, en),
    )
  }

  const casePairs: Array<[string, string, string]> = [
    ['case-reclutamiento-banca', 'reclutamiento-ejecutivo-banca', 'executive-recruitment-banking'],
    ['case-clima-manufactura', 'clima-organizacional-manufactura', 'organizational-climate-manufacturing'],
    ['case-cultura-consumo', 'cultura-organizacional-consumo', 'organizational-culture-consumer'],
    ['case-gestion-energia', 'gestion-desempeno-energia', 'performance-management-energy'],
    ['case-potencial-banca', 'potencial-talento-banca', 'talent-mapping-banking'],
    ['case-liderazgo-manufactura', 'liderazgo-coaching-manufactura', 'leadership-coaching-manufacturing'],
  ]
  for (const [newId, esSlug, enSlug] of casePairs) {
    await migratePair(
      client,
      newId,
      'caseStudy',
      `seed-case-${esSlug}-es`,
      `seed-case-${enSlug}-en`,
      (es, en) => mergeCollectionDoc(es, en),
    )
  }

  await migratePair(client, 'homePage', 'homePage', 'seed-home-es', 'seed-home-en', mergeSingletonDoc)
  await migratePair(client, 'aboutPage', 'aboutPage', 'seed-about-es', 'seed-about-en', mergeSingletonDoc)
  await migratePair(client, 'methodologyPage', 'methodologyPage', 'seed-methodology-es', 'seed-methodology-en', mergeSingletonDoc)
  await migratePair(client, 'recruitmentPage', 'recruitmentPage', 'seed-recruitment-es', 'seed-recruitment-en', mergeSingletonDoc)
  await migratePair(client, 'servicesIndexPage', 'servicesIndexPage', 'seed-services-index-es', 'seed-services-index-en', mergeSingletonDoc)
  await migratePair(client, 'contactPage', 'contactPage', 'seed-contact-es', 'seed-contact-en', mergeSingletonDoc)
  await migratePair(client, 'thankYouPage', 'thankYouPage', 'seed-thank-you-es', 'seed-thank-you-en', mergeSingletonDoc)
  await migratePair(client, 'insightsIndexPage', 'insightsIndexPage', 'seed-insights-index-es', 'seed-insights-index-en', mergeSingletonDoc)
  await migratePair(client, 'caseStudiesIndexPage', 'caseStudiesIndexPage', 'seed-case-studies-index-es', 'seed-case-studies-index-en', mergeSingletonDoc)
  await migratePair(client, 'siteSettings', 'siteSettings', 'seed-site-settings-es', 'seed-site-settings-en', mergeSingletonDoc)
  await migratePair(client, 'legalPage-privacy', 'legalPage', 'seed-legal-privacy-es', 'seed-legal-privacy-en', mergeSingletonDoc)

  // Clean translation metadata
  const metaDocs = await client.fetch<string[]>(`*[_type == "translation.metadata"]._id`)
  for (const id of metaDocs) await remove(client, id)

  console.log(dryRun ? 'Dry run complete.' : 'Migration complete.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
