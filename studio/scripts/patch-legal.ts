/**
 * Sync legal page body content from fixtures to Sanity.
 * Run: npm run patch:legal [-- --apply]
 */
import {createClient} from '@sanity/client'
import {resolve} from 'node:path'
import {fileURLToPath} from 'node:url'

import {privacyBodyEn, privacyBodyEs} from '../../frontend/src/modules/legalPageFixtures'
import {toLocalizedV5} from './i18n-merge'
import {loadStudioEnv} from './lib/images'
import {loc} from '../src/lib/localized'

const apply = process.argv.includes('--apply')
const LEGAL_PAGES: Array<{id: string; titleEs: string; titleEn: string}> = [
  {id: 'legalPage-privacy', titleEs: 'Política de privacidad', titleEn: 'Privacy policy'},
]

async function main() {
  loadStudioEnv()
  const projectId = process.env.SANITY_STUDIO_PROJECT_ID
  const dataset = process.env.SANITY_STUDIO_DATASET || 'production'
  const token = process.env.SANITY_API_WRITE_TOKEN
  if (!projectId || !token) {
    throw new Error('Set SANITY_STUDIO_PROJECT_ID and SANITY_API_WRITE_TOKEN in studio/.env')
  }

  const client = createClient({projectId, dataset, token, apiVersion: '2024-01-01', useCdn: false})
  console.log(`${apply ? 'Applying' : 'Dry run for'} legal page patches…`)

  for (const page of LEGAL_PAGES) {
    const payload = {
      title: loc(page.titleEs, page.titleEn),
      body: toLocalizedV5(privacyBodyEs, privacyBodyEn),
    }

    if (apply) {
      await client.patch(page.id).set(payload).commit()
      console.log(`  patched ${page.id}`)

      const draftId = `drafts.${page.id}`
      const draftExists = await client.fetch<boolean>(`*[_id == $id][0]._id`, {id: draftId})
      if (draftExists) {
        await client.patch(draftId).set(payload).commit()
        console.log(`  patched ${draftId}`)
      }
    } else {
      console.log(`  would patch ${page.id} (${privacyBodyEs.length} blocks es / ${privacyBodyEn.length} blocks en)`)
    }
  }

  console.log(apply ? 'Legal patch complete.' : 'Dry run complete. Re-run with --apply to write.')
}

const isDirectRun = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)
if (isDirectRun) {
  main().catch((err) => {
    console.error(err)
    process.exit(1)
  })
}
