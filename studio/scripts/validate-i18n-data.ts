/**
 * Validate i18n data shape across CMS documents.
 * Run: npm run validate:i18n
 * Exits 1 if any issues are found.
 */
import {createClient} from '@sanity/client'
import {existsSync, readFileSync} from 'node:fs'
import {dirname, resolve} from 'node:path'
import {fileURLToPath} from 'node:url'

import {
  ALLOWED_FIELDS,
  I18N_STRING_KEYS,
  I18N_TEXT_KEYS,
  isLocalizedArray,
  type RepairContext,
} from './repair-i18n-data'

const __dirname = dirname(fileURLToPath(import.meta.url))

const DOCUMENT_TYPES = [
  'homePage',
  'aboutPage',
  'methodologyPage',
  'recruitmentPage',
  'servicesIndexPage',
  'insightsIndexPage',
  'caseStudiesIndexPage',
  'contactPage',
  'thankYouPage',
  'legalPage',
  'siteSettings',
  'service',
  'insight',
  'caseStudy',
] as const

const ORPHAN_BLOCK_FIELDS: Record<string, Set<string>> = {
  serviceSplit: new Set(['title', 'intro', 'cardImages', 'cards']),
}

const STRING_ICON_BLOCK_TYPES = new Set(['metrics', 'relatedServices', 'serviceCategory', 'serviceCatalogItem'])

type Issue = {
  docId: string
  kind: string
  path: string
}

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

function isV4Format(value: unknown): boolean {
  return (
    isLocalizedArray(value) &&
    (value as Array<{language?: string; _key?: string}>).some(
      (item) => Boolean(item._key) && !item.language,
    )
  )
}

function isPlainStringValueField(ctx: RepairContext): boolean {
  return (
    ctx.blockType === 'contactChannelItem' ||
    ctx.parentKey === 'interestOptions' ||
    (ctx.parentKey === 'metrics' && ctx.blockType !== 'metrics')
  )
}

function isLocalizedMetricsValueField(ctx: RepairContext): boolean {
  return ctx.blockType === 'metrics' && ctx.parentKey === 'items'
}

function hasWrongOrganizationsShape(value: unknown): boolean {
  if (!Array.isArray(value) || value.length === 0) return false
  const first = value[0]
  if (
    typeof first === 'object' &&
    first !== null &&
    isLocalizedArray(value) &&
    Array.isArray((first as {value?: unknown}).value)
  ) {
    return true
  }
  return false
}

function validateValue(
  value: unknown,
  key: string,
  ctx: RepairContext,
  docId: string,
  issues: Issue[],
) {
  const path = ctx.path ?? docId

  if (key === 'organizations' && ctx.parentKey === 'markers' && hasWrongOrganizationsShape(value)) {
    issues.push({docId, kind: 'organizations-wrong-shape', path})
    return
  }

  if (key === 'value') {
    if (isLocalizedMetricsValueField(ctx) && typeof value === 'string') {
      issues.push({docId, kind: 'metrics-value-plain', path})
      return
    }
    if (isPlainStringValueField(ctx) && isLocalizedArray(value)) {
      issues.push({docId, kind: 'value-should-be-plain', path})
    }
    return
  }

  // Portable Text span text — plain string is correct
  if (key === 'text' && ctx.parentKey === 'children' && typeof value === 'string') {
    return
  }

  if (I18N_TEXT_KEYS.has(key)) {
    if (typeof value === 'string') {
      issues.push({docId, kind: 'i18n-text-plain', path})
      return
    }
    if (isLocalizedArray(value)) {
      const first = (value as Array<{_type?: string}>)[0]
      if (first?._type === 'internationalizedArrayStringValue') {
        issues.push({docId, kind: 'i18n-text-wrong-type', path})
      }
    }
    if (isV4Format(value)) {
      issues.push({docId, kind: 'i18n-v4-format', path})
    }
    return
  }

  if (I18N_STRING_KEYS.has(key)) {
    if (typeof value === 'string') {
      issues.push({docId, kind: 'i18n-field-plain', path})
      return
    }
    if (isV4Format(value)) {
      issues.push({docId, kind: 'i18n-v4-format', path})
    }
    return
  }

  if (
    ctx.blockType === 'metrics' &&
    ctx.parentKey === 'items' &&
    key === 'label' &&
    typeof value === 'string'
  ) {
    issues.push({docId, kind: 'metrics-label-plain', path})
  }

  if (
    key === 'icon' &&
    typeof value === 'string' &&
    value.startsWith('/assets/') &&
    ctx.blockType &&
    !STRING_ICON_BLOCK_TYPES.has(ctx.blockType)
  ) {
    issues.push({docId, kind: 'string-instead-of-image', path})
  }

  if (
    key === 'items' &&
    ctx.blockType === 'serviceIncludes' &&
    Array.isArray(value) &&
    value.length > 0 &&
    typeof value[0] === 'string'
  ) {
    issues.push({docId, kind: 'serviceIncludes-items-plain', path})
  }

  if (
    key === 'items' &&
    (ctx.blockType === 'contentCard' || ctx.parentKey === 'cards') &&
    Array.isArray(value) &&
    value.length > 0 &&
    typeof value[0] === 'string'
  ) {
    issues.push({docId, kind: 'contentCard-items-plain', path})
  }
}

function validateNode(
  value: unknown,
  key: string,
  ctx: RepairContext,
  docId: string,
  issues: Issue[],
) {
  if (value === null || value === undefined) return

  const path = ctx.path ? `${ctx.path}.${key}` : key
  const nextCtx: RepairContext = {...ctx, path, parentKey: ctx.key, key}

  if (typeof value !== 'object') {
    validateValue(value, key, {...ctx, path}, docId, issues)
    return
  }

  if (Array.isArray(value)) {
    validateValue(value, key, {...ctx, path}, docId, issues)
    value.forEach((item, index) => {
      const itemBlockType =
        typeof item === 'object' && item !== null && '_type' in item
          ? String((item as {_type: string})._type)
          : ctx.blockType

      const itemCtx: RepairContext = {
        ...nextCtx,
        key: String(index),
        path: `${path}[${index}]`,
        parentKey: key,
        blockType: itemBlockType,
      }

      if (typeof item === 'object' && item !== null && !Array.isArray(item)) {
        if (key === 'items' && ctx.blockType === 'metrics') {
          for (const [itemKey, itemValue] of Object.entries(item)) {
            if (itemKey.startsWith('_')) continue
            validateValue(itemValue, itemKey, {...itemCtx, parentKey: 'items'}, docId, issues)
          }
        } else {
          validateObject(item as Record<string, unknown>, itemCtx, docId, issues)
        }
      }
    })
    return
  }

  validateValue(value, key, {...ctx, path}, docId, issues)

  const obj = value as Record<string, unknown>
  const blockType = typeof obj._type === 'string' ? obj._type : ctx.blockType
  validateObject(obj, {...nextCtx, blockType}, docId, issues)
}

function validateObject(
  obj: Record<string, unknown>,
  ctx: RepairContext & {path?: string},
  docId: string,
  issues: Issue[],
) {
  const blockType = ctx.blockType
  const allowedBlock = blockType ? ORPHAN_BLOCK_FIELDS[blockType] : undefined

  for (const [key, child] of Object.entries(obj)) {
    if (key.startsWith('_')) continue

    if (allowedBlock && !allowedBlock.has(key)) {
      issues.push({docId, kind: 'orphan-block-field', path: `${ctx.path}.${key}`})
    }

    validateNode(child, key, ctx, docId, issues)
  }
}

function validateDocument(doc: Record<string, unknown>): Issue[] {
  const issues: Issue[] = []
  const docId = String(doc._id)
  const docType = String(doc._type)

  if (docType === 'sanity.previewUrlSecret') return issues

  const allowed = ALLOWED_FIELDS[docType]
  if (allowed) {
    for (const key of Object.keys(doc)) {
      if (!key.startsWith('_') && !allowed.has(key)) {
        issues.push({docId, kind: 'orphan-doc-field', path: key})
      }
    }
  }

  validateObject(doc, {path: docId, blockType: docType}, docId, issues)
  return issues
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

  const docs = await client.fetch<Record<string, unknown>[]>(
    `*[
      _type in $types || _id in path("drafts.**")
    ]`,
    {types: DOCUMENT_TYPES},
  )

  const allIssues: Issue[] = []
  for (const doc of docs) {
    allIssues.push(...validateDocument(doc))
  }

  if (allIssues.length === 0) {
    console.log(`Validated ${docs.length} documents — 0 issues.`)
    return
  }

  const byKind: Record<string, number> = {}
  for (const issue of allIssues) {
    byKind[issue.kind] = (byKind[issue.kind] ?? 0) + 1
    console.log(`  [${issue.kind}] ${issue.docId} → ${issue.path}`)
  }

  console.error(`\nFound ${allIssues.length} issue(s):`, byKind)
  process.exit(1)
}

const isDirectRun = process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])

if (isDirectRun) {
  main().catch((err) => {
    console.error(err)
    process.exit(1)
  })
}
