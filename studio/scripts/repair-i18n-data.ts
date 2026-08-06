/**
 * Repair i18n data: remove orphan singleton fields and fix schema mismatches.
 * Run: npm run repair:i18n [-- --apply]
 */
import {createClient, type SanityClient} from '@sanity/client'
import {existsSync, readFileSync} from 'node:fs'
import {dirname, resolve} from 'node:path'
import {fileURLToPath} from 'node:url'

import {randomKey} from '@sanity/util/content'

import {toLocalizedV5} from './i18n-merge'
import {createUploadImage, hasImageAsset, resolveImages} from './lib/images'
import {migrateServiceSplitFromLegacy} from './lib/serviceSplitCards'
import {repairServiceDocument, repairSiteSettingsNav} from './lib/serviceTitles'

const __dirname = dirname(fileURLToPath(import.meta.url))
const apply = process.argv.includes('--apply')

export const ALLOWED_FIELDS: Record<string, Set<string>> = {
  homePage: new Set(['title', 'pageBuilder', 'seo']),
  aboutPage: new Set(['title', 'pageBuilder', 'seo']),
  methodologyPage: new Set(['title', 'pageBuilder', 'seo']),
  recruitmentPage: new Set(['title', 'intro', 'pageBuilder', 'seo']),
  servicesIndexPage: new Set(['title', 'intro', 'pageBuilder', 'seo']),
  contactPage: new Set([
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
  ]),
  thankYouPage: new Set(['title', 'heroHeading', 'heroMessage', 'heroImage', 'cta', 'seo']),
  insightsIndexPage: new Set(['title', 'hero', 'newsletter', 'bottomCta', 'featuredInsight', 'seo']),
  caseStudiesIndexPage: new Set(['title', 'hero', 'bottomCta', 'featuredCase', 'seo']),
  siteSettings: new Set(['title', 'whatsapp', 'nav', 'navGroups', 'footer', 'defaultSeo']),
  legalPage: new Set(['title', 'slug', 'body', 'seo']),
  service: new Set(['title', 'slug', 'summary', 'showInNav', 'navOrder', 'pageBuilder', 'seo']),
  insight: new Set([
    'title',
    'slug',
    'excerpt',
    'contentType',
    'author',
    'readTimeMinutes',
    'downloadUrl',
    'categories',
    'publishedAt',
    'cover',
    'body',
    'related',
    'seo',
  ]),
  caseStudy: new Set([
    'title',
    'slug',
    'summary',
    'industry',
    'service',
    'challenge',
    'challengeHeadline',
    'intervention',
    'interventionHeadline',
    'result',
    'metrics',
    'cover',
    'body',
    'relatedService',
    'relatedCases',
    'seo',
  ]),
}

export const I18N_STRING_KEYS = new Set([
  'title',
  'excerpt',
  'heading',
  'subheading',
  'eyebrow',
  'label',
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
  'emphasis',
  'text',
  'country',
  'featuredTitle',
  'purposeTitle',
])

/** Fields stored as internationalizedArrayText (not String). */
export const I18N_TEXT_KEYS = new Set([
  'description',
  'summary',
  'intro',
  'bio',
  'featuredDescription',
  'purposeBody',
  'heroMessage',
])

/** Fields that must stay plain strings even if sibling fields are i18n */
export const PLAIN_STRING_KEYS = new Set([
  'href',
  'email',
  'whatsapp',
  'linkType',
  'openInNewTab',
  'variant',
  'tone',
  'columns',
  'layout',
  'countryPreset',
  'top',
  'left',
  'active',
  'navOrder',
  'showInNav',
  'contentType',
  'readTimeMinutes',
  'downloadUrl',
  'publishedAt',
  'categories',
])

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

export function isLocalizedArray(value: unknown): boolean {
  return (
    Array.isArray(value) &&
    value.length > 0 &&
    typeof value[0] === 'object' &&
    value[0] !== null &&
    ('language' in value[0] || ('_key' in value[0] && 'value' in value[0]))
  )
}

function pickLocalizedString(value: unknown): string | undefined {
  if (typeof value === 'string') return value
  if (!isLocalizedArray(value)) return undefined
  const arr = value as Array<{language?: string; _key?: string; value?: unknown}>
  const item =
    arr.find((v) => v.language === 'es') ??
    arr.find((v) => v._key === 'es') ??
    arr[0]
  return typeof item?.value === 'string' ? item.value : undefined
}

function repairOrganizations(value: unknown): unknown {
  if (!Array.isArray(value) || value.length === 0) return value

  const first = value[0]
  if (
    typeof first === 'object' &&
    first !== null &&
    isLocalizedArray(value) &&
    Array.isArray((first as {value?: unknown}).value)
  ) {
    const esEntry = (value as Array<{language?: string; _key?: string; value?: string[]}>).find(
      (v) => v.language === 'es' || v._key === 'es',
    )
    const enEntry = (value as Array<{language?: string; _key?: string; value?: string[]}>).find(
      (v) => v.language === 'en' || v._key === 'en',
    )
    const esOrgs = esEntry?.value ?? []
    const enOrgs = enEntry?.value ?? esOrgs
    return esOrgs.map((org, index) =>
      toLocalizedV5(org, enOrgs[index] ?? org),
    )
  }

  if (
    Array.isArray(value) &&
    value.every((item) => isLocalizedArray(item) || typeof item === 'string')
  ) {
    return value.map((item) =>
      typeof item === 'string' ? toLocalizedV5(item, item) : item,
    )
  }

  return value
}

export type RepairContext = {
  parentKey?: string
  grandparentKey?: string
  blockType?: string
  path?: string
  key?: string
}

function isPlainStringValueField(ctx: RepairContext): boolean {
  return (
    ctx.blockType === 'contactChannelItem' ||
    ctx.parentKey === 'interestOptions' ||
    (ctx.parentKey === 'metrics' && ctx.blockType !== 'metrics')
  )
}

function toTextLocalized(value: unknown): unknown {
  if (!isLocalizedArray(value)) return value
  return (value as Array<Record<string, unknown>>).map((entry) => ({
    ...entry,
    _type: 'internationalizedArrayTextValue',
  }))
}

function toStringLocalized(value: unknown): unknown {
  if (!isLocalizedArray(value)) return value
  return (value as Array<Record<string, unknown>>).map((entry) => ({
    ...entry,
    _type: entry._type?.toString().includes('Text')
      ? 'internationalizedArrayStringValue'
      : entry._type || 'internationalizedArrayStringValue',
  }))
}

function isLocalizedMetricsValueField(ctx: RepairContext): boolean {
  return ctx.blockType === 'metrics' && ctx.parentKey === 'items'
}

function repairValue(value: unknown, key: string, ctx: RepairContext = {}): unknown {
  if (key === 'organizations' && ctx.parentKey === 'markers') {
    return repairOrganizations(value)
  }

  if (key === 'value') {
    if (isLocalizedMetricsValueField(ctx)) {
      if (typeof value === 'string') return toLocalizedV5(value, value)
      return value
    }
    if (isPlainStringValueField(ctx)) {
      if (isLocalizedArray(value)) return pickLocalizedString(value) ?? ''
      return value
    }
    return value
  }

  if (PLAIN_STRING_KEYS.has(key)) {
    // insight.categories is string[]; serviceCatalog.categories is object[]
    if (
      key === 'categories' &&
      Array.isArray(value) &&
      value.length > 0 &&
      typeof value[0] === 'object'
    ) {
      // fall through to array handling below
    } else {
      if (isLocalizedArray(value)) {
        return pickLocalizedString(value) ?? ''
      }
      return value
    }
  }

  if (I18N_STRING_KEYS.has(key) || I18N_TEXT_KEYS.has(key)) {
    const asText = I18N_TEXT_KEYS.has(key)
    if (typeof value === 'string') {
      const localized = toLocalizedV5(value, value)
      return asText ? toTextLocalized(localized) : localized
    }
    if (isLocalizedArray(value)) {
      return asText ? toTextLocalized(value) : toStringLocalized(value)
    }
  }

  // serviceIncludes items: plain string[] → internationalizedArrayString[]
  if (
    key === 'items' &&
    ctx.blockType === 'serviceIncludes' &&
    Array.isArray(value) &&
    value.length > 0 &&
    typeof value[0] === 'string'
  ) {
    return value.map((item) => toLocalizedV5(String(item), String(item)))
  }

  if (
    key === 'secondaryItems' &&
    ctx.blockType === 'serviceIncludes' &&
    Array.isArray(value) &&
    value.length > 0 &&
    typeof value[0] === 'string'
  ) {
    return value.map((item) => toLocalizedV5(String(item), String(item)))
  }

  // contentCard.items: plain string[] → [{_key, text: i18n}]
  if (
    key === 'items' &&
    Array.isArray(value) &&
    value.length > 0 &&
    typeof value[0] === 'string' &&
    (ctx.blockType === 'contentCard' || ctx.parentKey === 'cards')
  ) {
    return value.map((item) => ({
      _key: randomKey(),
      text: toLocalizedV5(String(item), String(item)),
    }))
  }

  // contentCard.items already objects but missing text wrapper
  if (
    key === 'items' &&
    Array.isArray(value) &&
    value.length > 0 &&
    typeof value[0] === 'object' &&
    value[0] !== null &&
    !('text' in (value[0] as object)) &&
    !('value' in (value[0] as object)) &&
    !('label' in (value[0] as object)) &&
    isLocalizedArray(value[0])
  ) {
    return value.map((item) => ({
      _key: randomKey(),
      text: item,
    }))
  }

  if (Array.isArray(value)) {
    const nextCtx: RepairContext = {
      grandparentKey: ctx.parentKey,
      parentKey: key,
      blockType: key === 'pageBuilder' ? ctx.blockType : ctx.blockType,
    }
    return value.map((item) => {
      if (typeof item === 'object' && item !== null && '_type' in item) {
        return repairObject(item as Record<string, unknown>, {
          ...nextCtx,
          blockType: String((item as {_type: string})._type),
        })
      }
      // Anonymous objects in cards/members arrays inherit parent block context
      if (typeof item === 'object' && item !== null) {
        const itemBlockType =
          key === 'cards'
            ? 'contentCard'
            : key === 'members'
              ? 'teamMember'
              : key === 'categories'
                ? 'serviceCategory'
                : key === 'items' && nextCtx.blockType === 'serviceCategory'
                  ? 'serviceCatalogItem'
                  : nextCtx.blockType
        return repairObject(item as Record<string, unknown>, {
          ...nextCtx,
          blockType: itemBlockType,
        })
      }
      return repairValue(item, key, nextCtx)
    })
  }

  if (typeof value === 'object' && value !== null) {
    return repairObject(value as Record<string, unknown>, {...ctx, parentKey: key})
  }

  return value
}

export function repairObject(obj: Record<string, unknown>, ctx: RepairContext = {}): Record<string, unknown> {
  const out: Record<string, unknown> = {}
  for (const [key, child] of Object.entries(obj)) {
    if (key.startsWith('_')) {
      out[key] = child
      continue
    }
    out[key] = repairValue(child, key, ctx)
  }
  // Ensure array object members used by Studio have _key
  if (
    (ctx.blockType === 'contentCard' || ctx.blockType === 'teamMember') &&
    typeof out._key !== 'string'
  ) {
    out._key = randomKey()
  }
  if (out._type === 'serviceSplit') {
    return migrateServiceSplitFromLegacy(out)
  }
  return out
}

export function getOrphanFields(doc: Record<string, unknown>): string[] {
  const allowed = ALLOWED_FIELDS[String(doc._type)]
  if (!allowed) return []
  return Object.keys(doc).filter((key) => !key.startsWith('_') && !allowed.has(key))
}

/** Copy missing image fields from published singleton into its draft. */
async function syncDraftImagesFromPublished(
  client: SanityClient,
  draft: Record<string, unknown>,
): Promise<Record<string, unknown>> {
  const draftId = String(draft._id)
  if (!draftId.startsWith('drafts.')) return draft

  const publishedId = draftId.replace(/^drafts\./, '')
  const published = await client.getDocument(publishedId).catch(() => null)
  if (!published) return draft

  const next = {...draft}

  if (publishedId === 'contactPage') {
    const pub = published as {
      hero?: {image?: unknown}
      paths?: {meetingImage?: unknown}
    }
    const draftHero = (next.hero ?? {}) as Record<string, unknown>
    const draftPaths = (next.paths ?? {}) as Record<string, unknown>
    if (!hasImageAsset(draftHero.image) && hasImageAsset(pub.hero?.image)) {
      next.hero = {...draftHero, image: pub.hero?.image}
    }
    if (!hasImageAsset(draftPaths.meetingImage) && hasImageAsset(pub.paths?.meetingImage)) {
      next.paths = {...draftPaths, meetingImage: pub.paths?.meetingImage}
    }
  }

  if (publishedId === 'thankYouPage' && !hasImageAsset(next.heroImage) && hasImageAsset(published.heroImage)) {
    next.heroImage = published.heroImage
  }

  return next
}

async function main() {
  loadStudioEnv()

  const projectId = process.env.SANITY_STUDIO_PROJECT_ID
  const dataset = process.env.SANITY_STUDIO_DATASET || 'production'
  const token = process.env.SANITY_API_WRITE_TOKEN

  if (!projectId || !token) {
    throw new Error('Set SANITY_STUDIO_PROJECT_ID and SANITY_API_WRITE_TOKEN in studio/.env')
  }

  const client = createClient({projectId, dataset, token, apiVersion: '2024-01-01', useCdn: false})

  const ids = await client.fetch<string[]>(
    `*[
      _type in [
        "homePage","aboutPage","methodologyPage","recruitmentPage","servicesIndexPage",
        "insightsIndexPage","caseStudiesIndexPage","contactPage","thankYouPage","legalPage",
        "siteSettings","service","insight","caseStudy"
      ] || _id in path("drafts.**")
    ]._id`,
  )

  const cache = new Map<string, string>()
  const uploadImage = createUploadImage(client, cache, {apply})

  console.log(`${apply ? 'Applying' : 'Dry run'} repair on ${ids.length} documents…`)

  for (const id of ids) {
    const doc = await client.getDocument(id)
    if (!doc) continue

    const docType = String((doc as {_type?: string})._type)
    if (docType === 'sanity.previewUrlSecret') continue

    const orphans = getOrphanFields(doc as Record<string, unknown>)
    let repaired = repairObject(doc as Record<string, unknown>)
    repaired = repairServiceDocument(repaired)
    repaired = repairSiteSettingsNav(repaired)
    repaired = (await syncDraftImagesFromPublished(client, repaired)) as Record<string, unknown>
    repaired = (await resolveImages(repaired, uploadImage)) as Record<string, unknown>

    if (orphans.length) {
      console.log(`  ${id}: unset ${orphans.length} orphan field(s): ${orphans.join(', ')}`)
    }

    if (apply) {
      const {
        _id: _docId,
        _rev: _rev,
        _createdAt: _createdAt,
        _updatedAt: _updatedAt,
        ...content
      } = repaired as Record<string, unknown> & {
        _id?: string
        _rev?: string
        _createdAt?: string
        _updatedAt?: string
      }
      let patch = client.patch(id).set(content)
      if (orphans.length) patch = patch.unset(orphans)
      await patch.commit()
      console.log(`  patched ${id}`)
    }
  }

  console.log(apply ? 'Repair complete.' : 'Dry run complete. Re-run with --apply to write changes.')
}

const isDirectRun = process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])

if (isDirectRun) {
  main().catch((err) => {
    console.error(err)
    process.exit(1)
  })
}
