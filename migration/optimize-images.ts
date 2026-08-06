/**
 * Optimize large PNGs/JPGs from Webflow export with sharp.
 * Usage: npm run optimize:images
 */
import {mkdir, readdir, stat} from 'node:fs/promises'
import {extname, join} from 'node:path'
import {fileURLToPath} from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const srcDir = join(root, 'docs/reference/webflow/images')
const outDir = join(root, 'frontend/public/assets/optimized')

const MIN_BYTES = 200 * 1024
const RASTER = new Set(['.png', '.jpg', '.jpeg'])

async function main() {
  const sharp = (await import('sharp')).default
  await mkdir(outDir, {recursive: true})
  const files = await readdir(srcDir)
  let count = 0

  for (const file of files) {
    const ext = extname(file).toLowerCase()
    if (!RASTER.has(ext)) continue
    if (file.includes('-p-500') || file.includes('-p-800') || file.includes('-p-1080')) continue

    const input = join(srcDir, file)
    const info = await stat(input)
    if (info.size < MIN_BYTES) continue

    const base = file.replace(/\.(png|jpe?g)$/i, '')
    const webp = join(outDir, `${base}.webp`)
    const avif = join(outDir, `${base}.avif`)

    console.log(`Optimizing ${file} (${Math.round(info.size / 1024)}KB)…`)
    await sharp(input).resize({width: 1600, withoutEnlargement: true}).webp({quality: 85}).toFile(webp)
    await sharp(input).resize({width: 1600, withoutEnlargement: true}).avif({quality: 55}).toFile(avif)
    count++
  }

  console.log(`Optimized ${count} images → ${outDir}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
