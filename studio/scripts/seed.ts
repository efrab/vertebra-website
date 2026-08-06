/**
 * Idempotent Sanity seed from frontend fixtures.
 * Run: npm run seed (from repo root)
 */
import {createClient, type SanityClient} from '@sanity/client'
import {dirname, resolve} from 'node:path'
import {fileURLToPath} from 'node:url'

import type {Locale} from '../../frontend/src/i18n/routes'
import {getLocalizedPath} from '../../frontend/src/i18n/routes'
import {t} from '../../frontend/src/i18n'
import {
  homeFixtures,
  methodologyFixtures,
  recruitmentFixtures,
  servicesFixtures,
} from '../../frontend/src/modules/fixtures'
import {aboutFixtures} from '../../frontend/src/modules/aboutPageFixtures'
import {
  SERVICE_SLUGS,
  SERVICE_TITLES,
  serviceFixtures,
  serviceMeta,
} from '../../frontend/src/modules/servicePageFixtures'
import {insightsFixtures} from '../../frontend/src/modules/insightsFixtures'
import {privacyBodyEn, privacyBodyEs} from '../../frontend/src/modules/legalPageFixtures'
import {
  caseStudiesFixtures,
  caseStudyFixtureBySlug,
} from '../../frontend/src/modules/caseStudiesFixtures'
import {
  mergeCaseStudiesIndexDoc,
  mergeCollectionDoc,
  mergeContactPageDoc,
  mergeInsightsIndexDoc,
  mergeIntroPageDoc,
  mergeLegalPageDoc,
  mergeObjectFields,
  mergePageBuilder,
  mergePageBuilderDoc,
  mergeSiteSettingsDoc,
  mergeThankYouPageDoc,
} from './i18n-merge'
import {
  contactChannels,
  contactFaqItems,
  contactHero,
  contactInterestOptions,
  contactReasons,
} from '../../frontend/src/modules/contactPageFixtures'
import {createUploadImage, loadStudioEnv} from './lib/images'
import {buildRefMaps, patchAllImages, refKey, transformPageBuilder} from './lib/patchAllImages'
import type {RefMaps} from './lib/patchAllImages'
import type {UploadImage} from './lib/images'

const __dirname = dirname(fileURLToPath(import.meta.url))
const locales: Locale[] = ['es', 'en']

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

function externalLink(label: string, href: string) {
  return {
    _type: 'link',
    label,
    linkType: 'external' as const,
    href,
  }
}

function navItem(label: string, href: string) {
  return {
    _key: label.toLowerCase().replace(/\s+/g, '-'),
    label,
    link: externalLink(label, href),
  }
}

async function seedIfMissing(client: SanityClient, doc: Record<string, unknown>) {
  const id = String(doc._id)
  const existing = await client.getDocument(id).catch(() => null)
  if (existing) {
    console.log(`skip ${id}`)
    return
  }
  await client.createIfNotExists(doc as Parameters<SanityClient['createIfNotExists']>[0])
  console.log(`created ${id}`)
}

async function seedUnified(
  client: SanityClient,
  id: string,
  type: string,
  esDoc: Record<string, unknown>,
  enDoc: Record<string, unknown>,
  merge: (es: Record<string, unknown>, en: Record<string, unknown>) => Record<string, unknown>,
) {
  await seedIfMissing(client, {
    _id: id,
    _type: type,
    ...merge(esDoc, enDoc),
  })
}

async function main() {
  loadStudioEnv()

  const projectId = process.env.SANITY_STUDIO_PROJECT_ID
  const dataset = process.env.SANITY_STUDIO_DATASET || 'production'
  const token = process.env.SANITY_API_WRITE_TOKEN

  if (!projectId || projectId === 'your-projectID' || projectId === '<your-project-id>') {
    throw new Error('Set SANITY_STUDIO_PROJECT_ID in studio/.env')
  }
  if (!token) {
    throw new Error('Set SANITY_API_WRITE_TOKEN in studio/.env')
  }

  const client = createClient({projectId, dataset, token, apiVersion: '2024-01-01', useCdn: false})
  const noopUpload: UploadImage = async () => undefined

  const maps = buildRefMaps()

  const serviceKeys = Object.keys(SERVICE_SLUGS) as (keyof typeof SERVICE_SLUGS)[]
  const navOrder: Record<string, number> = {
    clima: 1,
    gestion: 2,
    liderazgo: 3,
    cultura: 4,
    potencial: 5,
  }

  for (const key of serviceKeys) {
    const esSlug = SERVICE_SLUGS[key].es
    const enSlug = SERVICE_SLUGS[key].en
    const esMeta = serviceMeta(esSlug, 'es')
    const enMeta = serviceMeta(enSlug, 'en')
    await seedUnified(
      client,
      `service-${key}`,
      'service',
      {
        title: SERVICE_TITLES[key].es,
        slug: {_type: 'slug', current: esSlug},
        summary: esMeta?.description,
        showInNav: true,
        navOrder: navOrder[key] ?? 99,
        pageBuilder: await transformPageBuilder(
          serviceFixtures(esSlug, 'es') ?? [],
          maps,
          'es',
          noopUpload,
        ),
      },
      {
        title: SERVICE_TITLES[key].en,
        slug: {_type: 'slug', current: enSlug},
        summary: enMeta?.description,
        showInNav: true,
        navOrder: navOrder[key] ?? 99,
        pageBuilder: await transformPageBuilder(
          serviceFixtures(enSlug, 'en') ?? [],
          maps,
          'en',
          noopUpload,
        ),
      },
      mergeCollectionDoc,
    )
  }

  for (const [id, esSlug, enSlug] of INSIGHT_PAIRS) {
    const esInsight = insightsFixtures('es').find((item) => item.slug === esSlug)
    const enInsight = insightsFixtures('en').find((item) => item.slug === enSlug)
    if (!esInsight || !enInsight) continue
    const {related: _r1, cover: _c1, _id: _i1, ...esRest} = esInsight
    const {related: _r2, cover: _c2, _id: _i2, ...enRest} = enInsight
    await seedUnified(
      client,
      id,
      'insight',
      {...esRest, slug: {_type: 'slug', current: esSlug}, body: esInsight.body ?? []},
      {...enRest, slug: {_type: 'slug', current: enSlug}, body: enInsight.body ?? []},
      mergeCollectionDoc,
    )
  }

  for (const [id, esSlug, enSlug] of CASE_PAIRS) {
    const esItem = caseStudiesFixtures('es').find((item) => item.slug === esSlug)
    const enItem = caseStudiesFixtures('en').find((item) => item.slug === enSlug)
    const esDetail = caseStudyFixtureBySlug('es', esSlug)
    const enDetail = caseStudyFixtureBySlug('en', enSlug)
    const esRest = esDetail || esItem
    const enRest = enDetail || enItem
    if (!esRest || !enRest) continue
    await seedUnified(
      client,
      id,
      'caseStudy',
      {
        title: esRest.title,
        slug: {_type: 'slug', current: esSlug},
        industry: esRest.industry,
        service: esRest.service,
        summary: esRest.summary,
        challenge: esRest.challenge,
        challengeHeadline: 'challengeHeadline' in esRest ? esRest.challengeHeadline : undefined,
        intervention: 'intervention' in esRest ? esRest.intervention : undefined,
        interventionHeadline:
          'interventionHeadline' in esRest ? esRest.interventionHeadline : undefined,
        result: esRest.result,
        metrics: 'metrics' in esRest ? esRest.metrics : undefined,
        body: 'body' in esRest ? esRest.body : undefined,
      },
      {
        title: enRest.title,
        slug: {_type: 'slug', current: enSlug},
        industry: enRest.industry,
        service: enRest.service,
        summary: enRest.summary,
        challenge: enRest.challenge,
        challengeHeadline: 'challengeHeadline' in enRest ? enRest.challengeHeadline : undefined,
        intervention: 'intervention' in enRest ? enRest.intervention : undefined,
        interventionHeadline:
          'interventionHeadline' in enRest ? enRest.interventionHeadline : undefined,
        result: enRest.result,
        metrics: 'metrics' in enRest ? enRest.metrics : undefined,
        body: 'body' in enRest ? enRest.body : undefined,
      },
      mergeCollectionDoc,
    )
  }

  await seedUnified(
    client,
    'homePage',
    'homePage',
    {
      title: 'Inicio',
      pageBuilder: await transformPageBuilder(homeFixtures('es'), maps, 'es', noopUpload),
    },
    {
      title: 'Home',
      pageBuilder: await transformPageBuilder(homeFixtures('en'), maps, 'en', noopUpload),
    },
    mergePageBuilderDoc,
  )

  await seedUnified(
    client,
    'aboutPage',
    'aboutPage',
    {
      title: 'Nosotros',
      pageBuilder: await transformPageBuilder(aboutFixtures('es'), maps, 'es', noopUpload),
    },
    {
      title: 'About',
      pageBuilder: await transformPageBuilder(aboutFixtures('en'), maps, 'en', noopUpload),
    },
    mergePageBuilderDoc,
  )

  await seedUnified(
    client,
    'methodologyPage',
    'methodologyPage',
    {
      title: 'Metodología',
      pageBuilder: await transformPageBuilder(methodologyFixtures('es'), maps, 'es', noopUpload),
    },
    {
      title: 'Methodology',
      pageBuilder: await transformPageBuilder(methodologyFixtures('en'), maps, 'en', noopUpload),
    },
    mergePageBuilderDoc,
  )

  const recruitmentEs = recruitmentFixtures('es')
  const recruitmentEn = recruitmentFixtures('en')
  const recruitmentHeroEs = recruitmentEs.find(
    (s) => typeof s === 'object' && s !== null && (s as {_type: string})._type === 'hero',
  ) as {subheading?: string} | undefined
  const recruitmentHeroEn = recruitmentEn.find(
    (s) => typeof s === 'object' && s !== null && (s as {_type: string})._type === 'hero',
  ) as {subheading?: string} | undefined

  await seedUnified(
    client,
    'recruitmentPage',
    'recruitmentPage',
    {
      title: 'Reclutamiento',
      intro: recruitmentHeroEs?.subheading,
      pageBuilder: await transformPageBuilder(recruitmentEs, maps, 'es', noopUpload),
    },
    {
      title: 'Recruitment',
      intro: recruitmentHeroEn?.subheading,
      pageBuilder: await transformPageBuilder(recruitmentEn, maps, 'en', noopUpload),
    },
    mergeIntroPageDoc,
  )

  const servicesEs = servicesFixtures('es')
  const servicesEn = servicesFixtures('en')
  const servicesHeroEs = servicesEs.find(
    (s) => typeof s === 'object' && s !== null && (s as {_type: string})._type === 'hero',
  ) as {subheading?: string} | undefined
  const servicesHeroEn = servicesEn.find(
    (s) => typeof s === 'object' && s !== null && (s as {_type: string})._type === 'hero',
  ) as {subheading?: string} | undefined

  await seedUnified(
    client,
    'servicesIndexPage',
    'servicesIndexPage',
    {
      title: 'Servicios',
      intro: servicesHeroEs?.subheading,
      pageBuilder: await transformPageBuilder(servicesEs, maps, 'es', noopUpload),
    },
    {
      title: 'Services',
      intro: servicesHeroEn?.subheading,
      pageBuilder: await transformPageBuilder(servicesEn, maps, 'en', noopUpload),
    },
    mergeIntroPageDoc,
  )

  const contactEs = contactHero('es')
  const contactEn = contactHero('en')
  await seedUnified(
    client,
    'contactPage',
    'contactPage',
    {
      title: 'Contacto',
      hero: {variant: 'contact', heading: contactEs.heading, subheading: contactEs.subheading},
      channelsHeading: t('es', 'contact.channelsHeading'),
      channels: contactChannels('es').map((channel, index) => ({
        _key: `channel-${index}`,
        icon: channel.icon,
        title: channel.title,
        value: channel.value,
        href: channel.href,
      })),
      reasonsHeading: t('es', 'contact.reasonsHeading'),
      reasons: contactReasons('es').map((reason, index) => ({
        _key: `reason-${index}`,
        tone: reason.tone,
        title: reason.title,
        description: reason.description,
      })),
      faq: {
        title: t('es', 'sections.faq'),
        items: contactFaqItems('es').map((item, index) => ({
          _key: `faq-${index}`,
          question: item.question,
          answer: item.answer,
        })),
      },
      interestOptions: contactInterestOptions('es').map((opt, index) => ({
        _key: `interest-${index}`,
        value: opt.value,
        label: opt.label,
      })),
    },
    {
      title: 'Contact',
      hero: {variant: 'contact', heading: contactEn.heading, subheading: contactEn.subheading},
      channelsHeading: t('en', 'contact.channelsHeading'),
      channels: contactChannels('en').map((channel, index) => ({
        _key: `channel-${index}`,
        icon: channel.icon,
        title: channel.title,
        value: channel.value,
        href: channel.href,
      })),
      reasonsHeading: t('en', 'contact.reasonsHeading'),
      reasons: contactReasons('en').map((reason, index) => ({
        _key: `reason-${index}`,
        tone: reason.tone,
        title: reason.title,
        description: reason.description,
      })),
      faq: {
        title: t('en', 'sections.faq'),
        items: contactFaqItems('en').map((item, index) => ({
          _key: `faq-${index}`,
          question: item.question,
          answer: item.answer,
        })),
      },
      interestOptions: contactInterestOptions('en').map((opt, index) => ({
        _key: `interest-${index}`,
        value: opt.value,
        label: opt.label,
      })),
    },
    mergeContactPageDoc,
  )

  await seedUnified(
    client,
    'thankYouPage',
    'thankYouPage',
    {
      title: 'Gracias',
      heroHeading: t('es', 'thankYou.title'),
      heroMessage: t('es', 'thankYou.message'),
      cta: {
        variant: 'recruitment',
        heading: t('es', 'thankYou.ctaHeading'),
        subheading: t('es', 'thankYou.ctaSubheading'),
        cta: toSanityCta({
          label: t('es', 'thankYou.bookMeeting'),
          href: getLocalizedPath('es', 'contact'),
        }),
      },
    },
    {
      title: 'Thank you',
      heroHeading: t('en', 'thankYou.title'),
      heroMessage: t('en', 'thankYou.message'),
      cta: {
        variant: 'recruitment',
        heading: t('en', 'thankYou.ctaHeading'),
        subheading: t('en', 'thankYou.ctaSubheading'),
        cta: toSanityCta({
          label: t('en', 'thankYou.bookMeeting'),
          href: getLocalizedPath('en', 'contact'),
        }),
      },
    },
    mergeThankYouPageDoc,
  )

  await seedUnified(
    client,
    'legalPage-privacy',
    'legalPage',
    {
      title: t('es', 'footer.privacy'),
      slug: {_type: 'slug', current: 'politica-de-privacidad'},
      body: privacyBodyEs,
    },
    {
      title: t('en', 'footer.privacy'),
      slug: {_type: 'slug', current: 'privacy-policy'},
      body: privacyBodyEn,
    },
    mergeLegalPageDoc,
  )

  const firstInsightId = maps.insight.get(refKey('es', INSIGHT_PAIRS[0][1]))
  await seedUnified(
    client,
    'insightsIndexPage',
    'insightsIndexPage',
    {
      title: t('es', 'nav.insights'),
      hero: {
        variant: 'insights',
        eyebrow: t('es', 'insights.heroEyebrow'),
        heading: t('es', 'insights.heroHeading'),
        subheading: t('es', 'insights.heroSubheading'),
      },
      bottomCta: {
        heading: t('es', 'insights.ctaHeading'),
        subheading: t('es', 'insights.ctaSubheading'),
        cta: toSanityCta({label: t('es', 'insights.ctaSubscribe'), href: '#newsletter'}),
        secondaryCta: toSanityCta({
          label: t('es', 'insights.ctaViewAll'),
          href: getLocalizedPath('es', 'insights'),
        }),
      },
      ...(firstInsightId ? {featuredInsight: {_type: 'reference', _ref: firstInsightId}} : {}),
    },
    {
      title: t('en', 'nav.insights'),
      hero: {
        variant: 'insights',
        eyebrow: t('en', 'insights.heroEyebrow'),
        heading: t('en', 'insights.heroHeading'),
        subheading: t('en', 'insights.heroSubheading'),
      },
      bottomCta: {
        heading: t('en', 'insights.ctaHeading'),
        subheading: t('en', 'insights.ctaSubheading'),
        cta: toSanityCta({label: t('en', 'insights.ctaSubscribe'), href: '#newsletter'}),
        secondaryCta: toSanityCta({
          label: t('en', 'insights.ctaViewAll'),
          href: getLocalizedPath('en', 'insights'),
        }),
      },
      ...(firstInsightId ? {featuredInsight: {_type: 'reference', _ref: firstInsightId}} : {}),
    },
    mergeInsightsIndexDoc,
  )

  const firstCaseId = maps.caseStudy.get(refKey('es', CASE_PAIRS[0][1]))
  await seedUnified(
    client,
    'caseStudiesIndexPage',
    'caseStudiesIndexPage',
    {
      title: t('es', 'nav.caseStudies'),
      hero: {
        variant: 'caseStudies',
        eyebrow: t('es', 'caseStudies.heroEyebrow'),
        heading: t('es', 'caseStudies.heroHeading'),
        subheading: t('es', 'caseStudies.heroSubheading'),
      },
      bottomCta: {
        variant: 'services',
        heading: t('es', 'caseStudies.ctaHeading'),
        subheading: t('es', 'caseStudies.ctaSubheading'),
        cta: toSanityCta({
          label: t('es', 'caseStudies.ctaPrimary'),
          href: getLocalizedPath('es', 'contact'),
        }),
        secondaryCta: toSanityCta({
          label: t('es', 'caseStudies.ctaSecondary'),
          href: getLocalizedPath('es', 'services'),
        }),
      },
      ...(firstCaseId ? {featuredCase: {_type: 'reference', _ref: firstCaseId}} : {}),
    },
    {
      title: t('en', 'nav.caseStudies'),
      hero: {
        variant: 'caseStudies',
        eyebrow: t('en', 'caseStudies.heroEyebrow'),
        heading: t('en', 'caseStudies.heroHeading'),
        subheading: t('en', 'caseStudies.heroSubheading'),
      },
      bottomCta: {
        variant: 'services',
        heading: t('en', 'caseStudies.ctaHeading'),
        subheading: t('en', 'caseStudies.ctaSubheading'),
        cta: toSanityCta({
          label: t('en', 'caseStudies.ctaPrimary'),
          href: getLocalizedPath('en', 'contact'),
        }),
        secondaryCta: toSanityCta({
          label: t('en', 'caseStudies.ctaSecondary'),
          href: getLocalizedPath('en', 'services'),
        }),
      },
      ...(firstCaseId ? {featuredCase: {_type: 'reference', _ref: firstCaseId}} : {}),
    },
    mergeCaseStudiesIndexDoc,
  )

  await seedUnified(
    client,
    'siteSettings',
    'siteSettings',
    {
      title: 'Growth Lab',
      whatsapp: t('es', 'contact.channels.whatsappHref'),
      navGroups: [
        {
          _key: 'recruitment',
          title: t('es', 'nav.recruitment'),
          items: [
            navItem('Reclutamiento ejecutivo', getLocalizedPath('es', 'recruitment')),
          ],
        },
        {
          _key: 'organizational',
          title: 'Desarrollo organizacional',
          items: serviceKeys.map((key) =>
            navItem(
              serviceMeta(SERVICE_SLUGS[key].es, 'es')?.title || SERVICE_SLUGS[key].es,
              getLocalizedPath('es', 'service', SERVICE_SLUGS[key].es),
            ),
          ),
        },
      ],
      footer: {
        tagline: 'Impacto que perdura. Crecimiento que importa.',
        links: [
          navItem(t('es', 'nav.about'), getLocalizedPath('es', 'about')),
          navItem(t('es', 'nav.methodology'), getLocalizedPath('es', 'methodology')),
          navItem(t('es', 'nav.insights'), getLocalizedPath('es', 'insights')),
          navItem(t('es', 'nav.caseStudies'), getLocalizedPath('es', 'caseStudies')),
          navItem(t('es', 'footer.privacy'), getLocalizedPath('es', 'privacy')),
        ],
        socialLinks: [navItem('LinkedIn', t('es', 'contact.channels.linkedinHref'))],
        contactInfo: {
          email: t('es', 'contact.channels.emailValue'),
          whatsappLabel: t('es', 'contact.channels.whatsappValue'),
          address: t('es', 'contact.channels.addressValue'),
        },
        complaintsBookLink: externalLink('Libro de reclamaciones', '#'),
      },
    },
    {
      title: 'Growth Lab',
      whatsapp: t('en', 'contact.channels.whatsappHref'),
      navGroups: [
        {
          _key: 'recruitment',
          title: t('en', 'nav.recruitment'),
          items: [navItem('Executive search', getLocalizedPath('en', 'recruitment'))],
        },
        {
          _key: 'organizational',
          title: 'Organizational development',
          items: serviceKeys.map((key) =>
            navItem(
              serviceMeta(SERVICE_SLUGS[key].en, 'en')?.title || SERVICE_SLUGS[key].en,
              getLocalizedPath('en', 'service', SERVICE_SLUGS[key].en),
            ),
          ),
        },
      ],
      footer: {
        tagline: 'Impact that lasts. Growth that matters.',
        links: [
          navItem(t('en', 'nav.about'), getLocalizedPath('en', 'about')),
          navItem(t('en', 'nav.methodology'), getLocalizedPath('en', 'methodology')),
          navItem(t('en', 'nav.insights'), getLocalizedPath('en', 'insights')),
          navItem(t('en', 'nav.caseStudies'), getLocalizedPath('en', 'caseStudies')),
          navItem(t('en', 'footer.privacy'), getLocalizedPath('en', 'privacy')),
        ],
        socialLinks: [navItem('LinkedIn', t('en', 'contact.channels.linkedinHref'))],
        contactInfo: {
          email: t('en', 'contact.channels.emailValue'),
          whatsappLabel: t('en', 'contact.channels.whatsappValue'),
          address: t('en', 'contact.channels.addressValue'),
        },
        complaintsBookLink: externalLink('Complaints book', '#'),
      },
    },
    mergeSiteSettingsDoc,
  )

  const imageCache = new Map<string, string>()
  const uploadImage = createUploadImage(client, imageCache, {apply: true})
  await patchAllImages(client, maps, uploadImage, true)

  console.log('Seed complete.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
