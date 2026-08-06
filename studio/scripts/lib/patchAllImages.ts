import type {SanityClient} from '@sanity/client'

import type {Locale} from '../../../frontend/src/i18n/routes'
import {t} from '../../../frontend/src/i18n'
import {
  homeFixtures,
  methodologyFixtures,
  recruitmentFixtures,
  servicesFixtures,
} from '../../../frontend/src/modules/fixtures'
import {aboutFixtures} from '../../../frontend/src/modules/aboutPageFixtures'
import {SERVICE_SLUGS, serviceFixtures} from '../../../frontend/src/modules/servicePageFixtures'
import {insightsFixtures} from '../../../frontend/src/modules/insightsFixtures'
import {caseStudyFixtureBySlug} from '../../../frontend/src/modules/caseStudiesFixtures'
import {mergeObjectFields, mergePageBuilder, toLocalizedV5} from '../i18n-merge'
import {serviceSplitCardsFromFixtures} from './serviceSplitCards'
import {
  contactHero,
  contactReasons,
  contactChannels,
} from '../../../frontend/src/modules/contactPageFixtures'
import {
  createUploadImage,
  FLAG_PRESET_PATHS,
  LOGO_PLACEHOLDER,
  resolveImages,
  type UploadImage,
} from './images'

export type RefMaps = {
  service: Map<string, string>
  insight: Map<string, string>
  caseStudy: Map<string, string>
}

const INSIGHT_PAIRS: Array<[string, string, string]> = [
  ['insight-ia-reclutamiento-peru', 'ia-reclutamiento-ejecutivo-peru', 'ai-executive-recruitment-peru'],
  ['insight-culture-fit', 'culture-fit-equivocado', 'culture-fit-gets-wrong'],
  ['insight-sucesion', 'sucesion-sin-teatro', 'succession-without-theater'],
  ['insight-playbook-hiring', 'playbook-hiring-metricas', 'hiring-playbook-metrics'],
  ['insight-clima', 'clima-organizacional-diagnostico-accion', 'organizational-climate-diagnosis-action'],
  ['insight-cultura', 'cultura-organizacional-diagnostico-accion', 'organizational-culture-diagnosis-action'],
]

const CASE_PAIRS: Array<[string, string, string]> = [
  ['case-reclutamiento-banca', 'reclutamiento-ejecutivo-banca', 'executive-recruitment-banking'],
  ['case-clima-manufactura', 'clima-organizacional-manufactura', 'organizational-climate-manufacturing'],
  ['case-cultura-consumo', 'cultura-organizacional-consumo', 'organizational-culture-consumer'],
  ['case-gestion-energia', 'gestion-desempeno-energia', 'performance-management-energy'],
  ['case-potencial-banca', 'potencial-talento-banca', 'talent-mapping-banking'],
  ['case-liderazgo-manufactura', 'liderazgo-coaching-manufactura', 'leadership-coaching-manufacturing'],
]

function refKey(locale: Locale, slug: string) {
  return `${locale}:${slug}`
}

export {refKey}

export function buildRefMaps(): RefMaps {
  const maps: RefMaps = {
    service: new Map(),
    insight: new Map(),
    caseStudy: new Map(),
  }

  for (const key of Object.keys(SERVICE_SLUGS) as (keyof typeof SERVICE_SLUGS)[]) {
    maps.service.set(refKey('es', SERVICE_SLUGS[key].es), `service-${key}`)
    maps.service.set(refKey('en', SERVICE_SLUGS[key].en), `service-${key}`)
  }
  for (const [id, esSlug, enSlug] of INSIGHT_PAIRS) {
    maps.insight.set(refKey('es', esSlug), id)
    maps.insight.set(refKey('en', enSlug), id)
  }
  for (const [id, esSlug, enSlug] of CASE_PAIRS) {
    maps.caseStudy.set(refKey('es', esSlug), id)
    maps.caseStudy.set(refKey('en', enSlug), id)
  }

  return maps
}

export async function transformPageBuilder(
  sections: unknown[],
  maps: RefMaps,
  locale: Locale,
  uploadImage: UploadImage,
): Promise<unknown[]> {
  return Promise.all(
    sections.map(async (section) => {
      if (typeof section !== 'object' || section === null) return section
      const block = {...section} as Record<string, unknown>

      if (block._type === 'caseCards' && Array.isArray(block.cases)) {
        block.cases = block.cases
          .map((item) => {
            const slug =
              typeof item === 'object' && item !== null && 'slug' in item
                ? String((item as {slug: string}).slug)
                : null
            if (!slug) return null
            const id = maps.caseStudy.get(refKey(locale, slug))
            return id ? {_type: 'reference', _ref: id, _key: slug} : null
          })
          .filter(Boolean)
      }

      if (block._type === 'insightCards' && Array.isArray(block.insights)) {
        block.insights = block.insights
          .map((item) => {
            const slug =
              typeof item === 'object' && item !== null && 'slug' in item
                ? String((item as {slug: string}).slug)
                : null
            if (!slug) return null
            const id = maps.insight.get(refKey(locale, slug))
            return id ? {_type: 'reference', _ref: id, _key: slug} : null
          })
          .filter(Boolean)
      }

      if (block._type === 'worldMap' && Array.isArray(block.markers)) {
        block.markers = await Promise.all(
          block.markers.map(async (marker) => {
            if (typeof marker !== 'object' || marker === null) return marker
            const m = {...marker} as Record<string, unknown>
            const preset = typeof m.countryPreset === 'string' ? m.countryPreset : undefined
            const flagPath = preset ? FLAG_PRESET_PATHS[preset] : undefined
            if (flagPath && !m.flag) {
              const flag = await uploadImage(flagPath)
              if (flag) m.flag = flag
            }
            return m
          }),
        )
      }

      return (await resolveImages(block, uploadImage)) as Record<string, unknown>
    }),
  )
}

async function patchImages(
  client: SanityClient,
  id: string,
  fields: Record<string, unknown>,
  apply: boolean,
) {
  if (!apply) {
    console.log(`would patch ${id}`)
    return
  }
  await client.patch(id).set(fields).commit()
  console.log(`patched images ${id}`)
}

export async function patchAllImages(
  client: SanityClient,
  maps: RefMaps,
  uploadImage: UploadImage,
  apply: boolean,
) {
  console.log(`\n${apply ? 'Uploading and patching' : 'Dry run for'} images…`)
  const serviceKeys = Object.keys(SERVICE_SLUGS) as (keyof typeof SERVICE_SLUGS)[]

  for (const key of serviceKeys) {
    const esSlug = SERVICE_SLUGS[key].es
    const enSlug = SERVICE_SLUGS[key].en
    const esPb = await transformPageBuilder(
      serviceFixtures(esSlug, 'es') ?? [],
      maps,
      'es',
      uploadImage,
    )
    const enPb = await transformPageBuilder(
      serviceFixtures(enSlug, 'en') ?? [],
      maps,
      'en',
      uploadImage,
    )
    await patchImages(client, `service-${key}`, {pageBuilder: mergePageBuilder(esPb, enPb)}, apply)
  }

  for (const [id, esSlug] of INSIGHT_PAIRS) {
    const esInsight = insightsFixtures('es').find((item) => item.slug === esSlug)
    const coverPath = esInsight?.cover
    const cover = typeof coverPath === 'string' ? await uploadImage(coverPath) : undefined
    if (cover) await patchImages(client, id, {cover}, apply)
  }

  for (const [id, esSlug] of CASE_PAIRS) {
    const detail = caseStudyFixtureBySlug('es', esSlug)
    const coverPath = detail?.cover
    const cover = typeof coverPath === 'string' ? await uploadImage(coverPath) : undefined
    if (cover) await patchImages(client, id, {cover}, apply)
  }

  const mergePageBuilderImages = async (
    id: string,
    esSections: unknown[],
    enSections: unknown[],
  ) => {
    const esPb = await transformPageBuilder(esSections, maps, 'es', uploadImage)
    const enPb = await transformPageBuilder(enSections, maps, 'en', uploadImage)
    let pageBuilder = mergePageBuilder(esPb, enPb)

    if (id === 'homePage') {
      const cards = serviceSplitCardsFromFixtures(esSections, enSections)
      if (cards) {
        pageBuilder = pageBuilder.map((block) => {
          if (typeof block !== 'object' || block === null) return block
          if ((block as {_type?: string})._type !== 'serviceSplit') return block
          const next = {...(block as Record<string, unknown>)}
          delete next.services
          next.cards = cards
          return next
        })
      }
    }

    await patchImages(client, id, {pageBuilder}, apply)
  }

  await mergePageBuilderImages('homePage', homeFixtures('es'), homeFixtures('en'))
  await mergePageBuilderImages('aboutPage', aboutFixtures('es'), aboutFixtures('en'))
  await mergePageBuilderImages(
    'methodologyPage',
    methodologyFixtures('es'),
    methodologyFixtures('en'),
  )
  await mergePageBuilderImages(
    'recruitmentPage',
    recruitmentFixtures('es'),
    recruitmentFixtures('en'),
  )
  await mergePageBuilderImages(
    'servicesIndexPage',
    servicesFixtures('es'),
    servicesFixtures('en'),
  )

  const esHero = contactHero('es')
  const enHero = contactHero('en')
  const heroImage =
    typeof esHero.image === 'string' ? await uploadImage(esHero.image) : undefined
  const esChannels = contactChannels('es')
  const enChannels = contactChannels('en')
  const channels = await Promise.all(
    esChannels.map(async (channel, index) => {
      const en = enChannels[index]
      const iconPath = typeof channel.icon === 'string' ? channel.icon : undefined
      const icon = iconPath ? await uploadImage(iconPath) : undefined
      return {
        _key: `channel-${index}`,
        _type: 'contactChannelItem',
        ...(icon ? {icon} : {}),
        title: toLocalizedV5(channel.title, en?.title),
        value: channel.value,
        href: channel.href,
      }
    }),
  )
  const meetingImage = await uploadImage('/assets/figma/contact/calendly-fallback.webp')
  await patchImages(
    client,
    'contactPage',
    {
      hero: mergeObjectFields(
        {
          variant: 'contact',
          heading: esHero.heading,
          subheading: esHero.subheading,
          ...(heroImage ? {image: heroImage} : {}),
        },
        {heading: enHero.heading, subheading: enHero.subheading},
      ),
      channels,
      reasons: mergePageBuilder(
        await Promise.all(
          contactReasons('es').map(async (reason, index) => ({
            _key: `reason-${index}`,
            tone: reason.tone,
            title: reason.title,
            description: reason.description,
            ...(reason.image ? {image: await uploadImage(reason.image)} : {}),
          })),
        ),
        contactReasons('en').map((reason, index) => ({
          _key: `reason-${index}`,
          tone: reason.tone,
          title: reason.title,
          description: reason.description,
        })),
      ),
      ...(meetingImage ? {'paths.meetingImage': meetingImage} : {}),
    },
    apply,
  )

  const firstInsightId = maps.insight.get(refKey('es', INSIGHT_PAIRS[0][1]))
  await patchImages(
    client,
    'insightsIndexPage',
    {
      hero: mergeObjectFields(
        {
          variant: 'insights',
          eyebrow: t('es', 'insights.heroEyebrow'),
          heading: t('es', 'insights.heroHeading'),
          subheading: t('es', 'insights.heroSubheading'),
          image: await uploadImage('/assets/figma/insights/hero.webp'),
        },
        {
          eyebrow: t('en', 'insights.heroEyebrow'),
          heading: t('en', 'insights.heroHeading'),
          subheading: t('en', 'insights.heroSubheading'),
        },
      ),
      ...(firstInsightId
        ? {featuredInsight: {_type: 'reference', _ref: firstInsightId}}
        : {}),
    },
    apply,
  )

  const firstCaseId = maps.caseStudy.get(refKey('es', CASE_PAIRS[0][1]))
  await patchImages(
    client,
    'caseStudiesIndexPage',
    {
      hero: mergeObjectFields(
        {
          variant: 'caseStudies',
          eyebrow: t('es', 'caseStudies.heroEyebrow'),
          heading: t('es', 'caseStudies.heroHeading'),
          subheading: t('es', 'caseStudies.heroSubheading'),
          image: await uploadImage('/assets/figma/case-studies/hero.webp'),
        },
        {
          eyebrow: t('en', 'caseStudies.heroEyebrow'),
          heading: t('en', 'caseStudies.heroHeading'),
          subheading: t('en', 'caseStudies.heroSubheading'),
        },
      ),
      ...(firstCaseId ? {featuredCase: {_type: 'reference', _ref: firstCaseId}} : {}),
    },
    apply,
  )

  await patchImages(
    client,
    'thankYouPage',
    {heroImage: await uploadImage('/assets/figma/thank-you/hero.jpg')},
    apply,
  )

  const draftHome = await client.getDocument('drafts.homePage').catch(() => null)
  if (draftHome) {
    const esPb = await transformPageBuilder(homeFixtures('es'), maps, 'es', uploadImage)
    const enPb = await transformPageBuilder(homeFixtures('en'), maps, 'en', uploadImage)
    await patchImages(
      client,
      'drafts.homePage',
      {pageBuilder: mergePageBuilder(esPb, enPb)},
      apply,
    )
  }

  void LOGO_PLACEHOLDER
}
