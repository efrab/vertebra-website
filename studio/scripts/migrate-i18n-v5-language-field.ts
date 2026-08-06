/**
 * Convert legacy i18n array items (_key = locale) to sanity-plugin-internationalized-array v5
 * (_type = internationalizedArray*Value, language = locale, random _key).
 *
 * Run: npm run migrate:i18n:v5 [-- --dry-run]
 */
import {createClient, type SanityClient} from '@sanity/client'
import {randomKey} from '@sanity/util/content'
import {existsSync, readFileSync} from 'node:fs'
import {dirname, resolve} from 'node:path'
import {fileURLToPath} from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const dryRun = process.argv.includes('--dry-run')
const LOCALES = new Set(['es', 'en'])

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

function valueTypeFor(value: unknown): string {
  if (
    Array.isArray(value) &&
    value.some((item) => typeof item === 'object' && item !== null && (item as {_type?: string})._type === 'block')
  ) {
    return 'internationalizedArrayPortableTextValue'
  }
  return 'internationalizedArrayStringValue'
}

function isLegacyLocalizedArray(value: unknown): value is Array<{_key: string; value: unknown; _type?: string}> {
  if (!Array.isArray(value) || value.length === 0) return false
  return value.every((item) => {
    if (typeof item !== 'object' || item === null) return false
    if (!('_key' in item) || !('value' in item)) return false
    if (typeof item._type === 'string' && item._type.startsWith('internationalizedArray')) {
      return false
    }
    return LOCALES.has(String(item._key))
  })
}

function convertLegacyLocalizedArray(
  value: Array<{_key: string; value: unknown}>,
): Array<{_key: string; _type: string; language: string; value: unknown}> {
  return value.map((item) => ({
    _key: randomKey(),
    _type: valueTypeFor(item.value),
    language: item._key,
    value: item.value,
  }))
}

function migrateValue(value: unknown): unknown {
  if (isLegacyLocalizedArray(value)) {
    return convertLegacyLocalizedArray(value)
  }

  if (Array.isArray(value)) {
    return value.map((item) => migrateValue(item))
  }

  if (typeof value === 'object' && value !== null) {
    const obj = value as Record<string, unknown>
    const out: Record<string, unknown> = {}
    for (const [key, child] of Object.entries(obj)) {
      out[key] = migrateValue(child)
    }
    return out
  }

  return value
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
    `*[_type in [
      "homePage","aboutPage","methodologyPage","recruitmentPage","servicesIndexPage",
      "insightsIndexPage","caseStudiesIndexPage","contactPage","thankYouPage","legalPage",
      "siteSettings","service","insight","caseStudy"
    ]]._id`,
  )

  console.log(`Migrating ${ids.length} documents…`)

  for (const id of ids) {
    const doc = await client.getDocument(id)
    if (!doc) continue

    const migrated = migrateValue(doc) as Record<string, unknown>
    migrated._id = id

    if (dryRun) {
      console.log(`[dry-run] would patch ${id}`)
      continue
    }

    await client.createOrReplace(migrated as Parameters<SanityClient['createOrReplace']>[0])
    console.log(`patched ${id}`)
  }

  console.log(dryRun ? 'Dry run complete.' : 'v5 language-field migration complete.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
