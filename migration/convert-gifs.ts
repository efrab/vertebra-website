/**
 * Convert heavy Webflow GIFs to MP4/WebM using ffmpeg when available.
 * Source: docs/reference/webflow/images
 * Output: frontend/public/assets/optimized
 *
 * Usage: npm run optimize:gifs
 */
import {mkdir, readdir, stat} from 'node:fs/promises'
import {basename, extname, join} from 'node:path'
import {spawn} from 'node:child_process'
import {fileURLToPath} from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const srcDir = join(root, 'docs/reference/webflow/images')
const outDir = join(root, 'frontend/public/assets/optimized')

const PRIORITY = [
  '63b53ac878b6419d7db66ce4f56d11d3d4aee2bd.gif',
  'ani-hero.gif',
  'vertebra-tablet.gif',
  '_dashboard.gif',
  '_reportes.gif',
  '_propiedades.gif',
  '_contratos.gif',
  '_pagos-y-cobros.gif',
  '_ordenes-de-trabajo.gif',
  'settings.gif',
  'img-tab-1.gif',
  'img-tab-3.gif',
]

function run(cmd: string, args: string[]) {
  return new Promise<void>((resolve, reject) => {
    const child = spawn(cmd, args, {stdio: 'inherit'})
    child.on('exit', (code) => (code === 0 ? resolve() : reject(new Error(`${cmd} exited ${code}`))))
    child.on('error', reject)
  })
}

async function convert(file: string) {
  const input = join(srcDir, file)
  const name = basename(file, extname(file))
  const mp4 = join(outDir, `${name}.mp4`)
  const webm = join(outDir, `${name}.webm`)
  const poster = join(outDir, `${name}-poster.jpg`)

  console.log(`Converting ${file}…`)
  await run('ffmpeg', [
    '-y',
    '-i',
    input,
    '-movflags',
    'faststart',
    '-pix_fmt',
    'yuv420p',
    '-vf',
    "scale='min(960,iw)':-2",
    '-c:v',
    'libx264',
    '-crf',
    '23',
    '-an',
    mp4,
  ])
  await run('ffmpeg', [
    '-y',
    '-i',
    input,
    '-pix_fmt',
    'yuv420p',
    '-vf',
    "scale='min(960,iw)':-2",
    '-c:v',
    'libvpx-vp9',
    '-b:v',
    '0',
    '-crf',
    '30',
    '-an',
    webm,
  ])
  await run('ffmpeg', ['-y', '-i', input, '-frames:v', '1', '-update', '1', '-q:v', '2', poster])
}

async function main() {
  await mkdir(outDir, {recursive: true})

  let files = PRIORITY.filter(async () => true)
  const existing: string[] = []
  for (const f of PRIORITY) {
    try {
      await stat(join(srcDir, f))
      existing.push(f)
    } catch {
      // skip missing
    }
  }

  if (existing.length === 0) {
    const all = await readdir(srcDir)
    files = all.filter((f) => f.endsWith('.gif')).slice(0, 10)
  } else {
    files = existing
  }

  try {
    await run('ffmpeg', ['-version'])
  } catch {
    console.error('ffmpeg not found. Install ffmpeg to convert GIFs.')
    console.error('Videos already present in docs/reference/webflow/videos/ can be copied manually.')
    process.exit(1)
  }

  for (const file of files) {
    await convert(file)
  }

  console.log(`Done. Output: ${outDir}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
