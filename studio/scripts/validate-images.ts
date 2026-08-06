/**
 * Validate that CMS documents have expected image assets populated.
 * Run: npm run validate:images
 */
import {createClient} from '@sanity/client'
import {dirname, resolve} from 'node:path'
import {fileURLToPath} from 'node:url'

import {hasImageAsset, loadStudioEnv} from './lib/images'

const __dirname = dirname(fileURLToPath(import.meta.url))

type Issue = {docId: string; path: string}

function checkBlockImages(docId: string, pageBuilder: unknown[] | undefined, issues: Issue[]) {
  if (!Array.isArray(pageBuilder)) return

  for (const [index, block] of pageBuilder.entries()) {
    if (!block || typeof block !== 'object') continue
    const b = block as Record<string, unknown>
    const base = `${docId}.pageBuilder[${index}]`

    if (b._type === 'hero' && !hasImageAsset(b.image)) {
      issues.push({docId, path: `${base}.hero.image`})
    }
    if (b._type === 'aboutStory' && !hasImageAsset(b.image)) {
      issues.push({docId, path: `${base}.aboutStory.image`})
    }
    if (b._type === 'serviceIncludes' && b.layout === 'splitImage' && !hasImageAsset(b.image)) {
      issues.push({docId, path: `${base}.serviceIncludes.image`})
    }
    if (b._type === 'serviceSplit') {
      const cards = b.cardImages
      if (!Array.isArray(cards) || cards.length < 2 || !cards.every(hasImageAsset)) {
        issues.push({docId, path: `${base}.serviceSplit.cardImages`})
      }
    }
    if (b._type === 'splitStatement' && b.variant === 'successBanner' && !hasImageAsset(b.image)) {
      issues.push({docId, path: `${base}.splitStatement.image`})
    }
    if (b._type === 'methodSteps' && b.layout === 'grid' && !hasImageAsset(b.diagramImage)) {
      issues.push({docId, path: `${base}.methodSteps.diagramImage`})
    }
    if (b._type === 'worldMap') {
      if (!hasImageAsset(b.mapImage)) issues.push({docId, path: `${base}.worldMap.mapImage`})
      const markers = b.markers
      if (Array.isArray(markers)) {
        markers.forEach((marker, i) => {
          if (typeof marker === 'object' && marker !== null && !hasImageAsset((marker as {flag?: unknown}).flag)) {
            issues.push({docId, path: `${base}.worldMap.markers[${i}].flag`})
          }
        })
      }
    }
    if (b._type === 'logoMarquee') {
      const logos = b.logos
      if (!Array.isArray(logos) || logos.some((logo) => !hasImageAsset((logo as {image?: unknown}).image))) {
        issues.push({docId, path: `${base}.logoMarquee.logos`})
      }
    }
    if (b._type === 'teamCards') {
      const members = b.members
      if (Array.isArray(members)) {
        members.forEach((member, i) => {
          if (!hasImageAsset((member as {photo?: unknown}).photo)) {
            issues.push({docId, path: `${base}.teamCards.members[${i}].photo`})
          }
        })
      }
    }
  }
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
  const issues: Issue[] = []

  const pageDocs = await client.fetch<
    Array<{_id: string; pageBuilder?: unknown[]; hero?: {image?: unknown}; paths?: {meetingImage?: unknown}; heroImage?: unknown; channels?: Array<{icon?: unknown}>; reasons?: Array<{image?: unknown}>}>
  >(`*[
    _type in [
      "homePage","aboutPage","methodologyPage","recruitmentPage","servicesIndexPage",
      "contactPage","insightsIndexPage","caseStudiesIndexPage","thankYouPage","service"
    ] || _id in path("drafts.**")
  ]{
    _id,
    pageBuilder,
    hero,
    paths,
    heroImage,
    channels[]{icon},
    reasons[]{image}
  }`)

  for (const doc of pageDocs) {
    if (String(doc._id).startsWith('drafts.') && doc._type === 'sanity.previewUrlSecret') continue
    checkBlockImages(doc._id, doc.pageBuilder, issues)

    const docId = doc._id.replace(/^drafts\./, '')
    if (docId === 'contactPage' && !hasImageAsset(doc.hero?.image)) {
      issues.push({docId: doc._id, path: `${doc._id}.hero.image`})
    }
    if (docId === 'insightsIndexPage' && !hasImageAsset(doc.hero?.image)) {
      issues.push({docId: doc._id, path: `${doc._id}.hero.image`})
    }
    if (docId === 'caseStudiesIndexPage' && !hasImageAsset(doc.hero?.image)) {
      issues.push({docId: doc._id, path: `${doc._id}.hero.image`})
    }

    if (docId === 'thankYouPage' && !hasImageAsset(doc.heroImage)) {
      issues.push({docId: doc._id, path: `${doc._id}.heroImage`})
    }

    if (docId === 'contactPage') {
      if (!hasImageAsset(doc.paths?.meetingImage)) {
        issues.push({docId: doc._id, path: `${doc._id}.paths.meetingImage`})
      }
      doc.channels?.forEach((channel, i) => {
        if (!hasImageAsset(channel.icon)) {
          issues.push({docId: doc._id, path: `${doc._id}.channels[${i}].icon`})
        }
      })
      doc.reasons?.forEach((reason, i) => {
        if (!hasImageAsset(reason.image)) {
          issues.push({docId: doc._id, path: `${doc._id}.reasons[${i}].image`})
        }
      })
    }
  }

  const collections = await client.fetch<Array<{_id: string; cover?: unknown}>>(
    `*[_type in ["insight","caseStudy"]]{_id, cover}`,
  )
  for (const doc of collections) {
    if (!hasImageAsset(doc.cover)) {
      issues.push({docId: doc._id, path: `${doc._id}.cover`})
    }
  }

  if (issues.length === 0) {
    console.log(`Validated images on ${pageDocs.length + collections.length} documents — 0 issues.`)
    return
  }

  for (const issue of issues) {
    console.log(`  [missing-image] ${issue.docId} → ${issue.path}`)
  }
  console.error(`\nFound ${issues.length} missing image(s).`)
  process.exit(1)
}

const isDirectRun = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)

if (isDirectRun) {
  main().catch((err) => {
    console.error(err)
    process.exit(1)
  })
}
