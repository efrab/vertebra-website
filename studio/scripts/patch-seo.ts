/**
 * Populate SEO fields (meta title, description, OG image) across CMS documents.
 * Run: npm run patch:seo [-- --apply]
 */
import {createClient} from '@sanity/client'
import {existsSync} from 'node:fs'
import {resolve} from 'node:path'
import {fileURLToPath} from 'node:url'

import {caseStudiesFixtures, caseStudyFixtureBySlug} from '../../frontend/src/modules/caseStudiesFixtures'
import {
  CASE_STUDY_SEO_OVERRIDES,
  INSIGHT_SEO_OVERRIDES,
  SINGLETON_PAGE_SEO,
  servicePageSeo,
  truncateMetaDescription,
  truncateMetaTitle,
  type LocalizedSeoCopy,
  type SeoCopy,
} from '../../frontend/src/lib/seo/pageSeoDefaults'
import {SERVICE_SLUGS} from '../../frontend/src/modules/servicePageFixtures'
import {insightsFixtures} from '../../frontend/src/modules/insightsFixtures'
import {createUploadImage, loadStudioEnv, PUBLIC_ROOT} from './lib/images'
import {loc, locText} from '../src/lib/localized'

const apply = process.argv.includes('--apply')

const INSIGHT_IDS: Array<[string, string, string]> = [
  ['insight-ia-reclutamiento-peru', 'ia-reclutamiento-ejecutivo-peru', 'ai-executive-recruitment-peru'],
  ['insight-culture-fit', 'culture-fit-equivocado', 'culture-fit-gets-wrong'],
  ['insight-sucesion', 'sucesion-sin-teatro', 'succession-without-theater'],
  ['insight-playbook-hiring', 'playbook-hiring-metricas', 'hiring-playbook-metrics'],
  ['insight-clima', 'clima-organizacional-diagnostico-accion', 'organizational-climate-diagnosis-action'],
  ['insight-cultura', 'cultura-organizacional-diagnostico-accion', 'organizational-culture-diagnosis-action'],
]

const CASE_IDS: Array<[string, string, string]> = [
  ['case-reclutamiento-banca', 'reclutamiento-ejecutivo-banca', 'executive-recruitment-banking'],
  ['case-clima-manufactura', 'clima-organizacional-manufactura', 'organizational-climate-manufacturing'],
  ['case-cultura-consumo', 'cultura-organizacional-consumo', 'organizational-culture-consumer'],
  ['case-gestion-energia', 'gestion-desempeno-energia', 'performance-management-energy'],
  ['case-potencial-banca', 'potencial-talento-banca', 'talent-mapping-banking'],
  ['case-liderazgo-manufactura', 'liderazgo-coaching-manufactura', 'leadership-coaching-manufacturing'],
]

async function buildSeoObject(
  copy: LocalizedSeoCopy,
  uploadImage: ReturnType<typeof createUploadImage>,
) {
  const ogPath = copy.es.ogImage || copy.en.ogImage
  let ogImage: Awaited<ReturnType<typeof uploadImage>> | undefined
  if (ogPath && existsSync(resolve(PUBLIC_ROOT, ogPath.replace(/^\//, '')))) {
    ogImage = await uploadImage(ogPath)
  }

  const seo: Record<string, unknown> = {
    metaTitle: loc(
      truncateMetaTitle(copy.es.metaTitle),
      truncateMetaTitle(copy.en.metaTitle),
    ),
    metaDescription: locText(
      truncateMetaDescription(copy.es.metaDescription),
      truncateMetaDescription(copy.en.metaDescription),
    ),
  }
  if (ogImage) seo.ogImage = ogImage
  return seo
}

function mergeSeoCopy(base: LocalizedSeoCopy, override?: Partial<LocalizedSeoCopy>): LocalizedSeoCopy {
  return {
    es: {...base.es, ...override?.es},
    en: {...base.en, ...override?.en},
  }
}

function insightSeo(id: string, esSlug: string, enSlug: string): LocalizedSeoCopy {
  const es = insightsFixtures('es').find((item) => item.slug === esSlug)
  const en = insightsFixtures('en').find((item) => item.slug === enSlug)
  return mergeSeoCopy(
    {
      es: {
        metaTitle: truncateMetaTitle(es?.title || id),
        metaDescription: truncateMetaDescription(es?.excerpt || ''),
        ogImage: typeof es?.cover === 'string' ? es.cover : undefined,
      },
      en: {
        metaTitle: truncateMetaTitle(en?.title || id),
        metaDescription: truncateMetaDescription(en?.excerpt || ''),
        ogImage: typeof en?.cover === 'string' ? en.cover : undefined,
      },
    },
    INSIGHT_SEO_OVERRIDES[id],
  )
}

function caseStudySeo(id: string, esSlug: string, enSlug: string): LocalizedSeoCopy {
  const esList = caseStudiesFixtures('es').find((item) => item.slug === esSlug)
  const enList = caseStudiesFixtures('en').find((item) => item.slug === enSlug)
  const esDetail = caseStudyFixtureBySlug('es', esSlug)
  const enDetail = caseStudyFixtureBySlug('en', enSlug)
  const esTitle = esList?.service
    ? `${esList.service} · ${esList.industry}`
    : esList?.title || esSlug
  const enTitle = enList?.service
    ? `${enList.service} · ${enList.industry}`
    : enList?.title || enSlug
  return mergeSeoCopy(
    {
      es: {
        metaTitle: truncateMetaTitle(esTitle),
        metaDescription: truncateMetaDescription(
          esDetail?.summary || esList?.challenge || esList?.result || '',
        ),
        ogImage: typeof esDetail?.cover === 'string' ? esDetail.cover : undefined,
      },
      en: {
        metaTitle: truncateMetaTitle(enTitle),
        metaDescription: truncateMetaDescription(
          enDetail?.summary || enList?.challenge || enList?.result || '',
        ),
        ogImage: typeof enDetail?.cover === 'string' ? enDetail.cover : undefined,
      },
    },
    CASE_STUDY_SEO_OVERRIDES[id],
  )
}

function validateSeoCopy(id: string, copy: LocalizedSeoCopy): string[] {
  const issues: string[] = []
  for (const locale of ['es', 'en'] as const) {
    const {metaTitle, metaDescription} = copy[locale]
    if (!metaTitle?.trim()) issues.push(`${id} (${locale}): missing metaTitle`)
    if (!metaDescription?.trim()) issues.push(`${id} (${locale}): missing metaDescription`)
    if (metaDescription && metaDescription.length < 80) {
      issues.push(`${id} (${locale}): metaDescription short (${metaDescription.length} chars)`)
    }
  }
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
  const cache = new Map<string, string>()
  const uploadImage = createUploadImage(client, cache, {apply})

  console.log(`${apply ? 'Applying' : 'Dry run for'} SEO patches…`)

  const patched: string[] = []
  const issues: string[] = []

  async function patchDocument(id: string, copy: LocalizedSeoCopy, useDefaultSeo = false) {
    issues.push(...validateSeoCopy(id, copy))
    const seo = await buildSeoObject(copy, uploadImage)
    const payload = useDefaultSeo ? {defaultSeo: seo} : {seo}
    if (apply) {
      await client.patch(id).set(payload).commit()
      console.log(`  patched ${id}`)

      const draftId = `drafts.${id}`
      const draftExists = await client.fetch<boolean>(`*[_id == $id][0]._id`, {id: draftId})
      if (draftExists) {
        await client.patch(draftId).set(payload).commit()
        console.log(`  patched ${draftId}`)
      }
    } else {
      console.log(`  would patch ${id}`)
      const draftExists = await client.fetch<boolean>(`*[_id == $id][0]._id`, {id: `drafts.${id}`})
      if (draftExists) console.log(`  would patch drafts.${id}`)
    }
    patched.push(id)
  }

  for (const [id, copy] of Object.entries(SINGLETON_PAGE_SEO)) {
    await patchDocument(id, copy, id === 'siteSettings')
  }

  for (const key of Object.keys(SERVICE_SLUGS) as (keyof typeof SERVICE_SLUGS)[]) {
    await patchDocument(`service-${key}`, servicePageSeo(key))
  }

  for (const [id, esSlug, enSlug] of INSIGHT_IDS) {
    await patchDocument(id, insightSeo(id, esSlug, enSlug))
  }

  for (const [id, esSlug, enSlug] of CASE_IDS) {
    await patchDocument(id, caseStudySeo(id, esSlug, enSlug))
  }

  const missing = issues.filter((item) => item.includes('missing'))
  console.log(`\nDocuments ${apply ? 'patched' : 'ready'}: ${patched.length}`)
  if (missing.length === 0) {
    console.log('Validation: 0 missing metaTitle/metaDescription fields')
  } else {
    console.log(`Validation: ${missing.length} missing field(s):`)
    for (const item of missing) console.log(`  - ${item}`)
    process.exitCode = 1
  }
  const shortOnly = issues.filter((item) => item.includes('short'))
  if (shortOnly.length > 0) {
    console.log(`Note: ${shortOnly.length} short description(s) (<80 chars):`)
    for (const item of shortOnly) console.log(`  - ${item}`)
  }

  console.log(apply ? 'SEO patch complete.' : 'Dry run complete. Re-run with --apply to write.')
}

const isDirectRun = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)
if (isDirectRun) {
  main().catch((err) => {
    console.error(err)
    process.exit(1)
  })
}
