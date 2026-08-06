/**
 * Upload frontend static assets to Sanity and patch documents.
 * Run: npm run patch:images [-- --apply]
 */
import {createClient} from '@sanity/client'
import {dirname, resolve} from 'node:path'
import {fileURLToPath} from 'node:url'

import {createUploadImage, loadStudioEnv} from './lib/images'
import {buildRefMaps, patchAllImages} from './lib/patchAllImages'

const __dirname = dirname(fileURLToPath(import.meta.url))
const apply = process.argv.includes('--apply')

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
  const maps = buildRefMaps()

  await patchAllImages(client, maps, uploadImage, apply)
  console.log(apply ? 'Image patch complete.' : 'Dry run complete. Re-run with --apply to write.')
}

const isDirectRun = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)

if (isDirectRun) {
  main().catch((err) => {
    console.error(err)
    process.exit(1)
  })
}
