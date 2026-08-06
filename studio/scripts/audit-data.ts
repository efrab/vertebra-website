/**
 * Combined CMS data audit (i18n + images).
 * Run: npm run validate:audit
 */
import {spawnSync} from 'node:child_process'
import {dirname, resolve} from 'node:path'
import {fileURLToPath} from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '../..')

function run(script: string) {
  const result = spawnSync('npm', ['run', script], {cwd: root, stdio: 'inherit', env: process.env})
  return result.status ?? 1
}

const i18n = run('validate:i18n')
const images = run('validate:images')

if (i18n !== 0 || images !== 0) {
  process.exit(1)
}

console.log('Audit complete — 0 issues.')
