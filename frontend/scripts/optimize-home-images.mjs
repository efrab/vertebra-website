import path from 'node:path'
import {rename, unlink} from 'node:fs/promises'
import sharp from 'sharp'

const homeDir = path.resolve('public/assets/figma/home')

const responsiveHeroWidths = [640, 1024]

const compressTargets = [
  {file: 'hero.webp', quality: 72, maxWidth: 1024},
  {file: 'insight-one.webp', quality: 70, maxWidth: 900},
  {file: 'insight-two.webp', quality: 70, maxWidth: 900},
  {file: 'insight-three.webp', quality: 68, maxWidth: 900},
  {file: 'case-two.webp', quality: 68, maxWidth: 900},
  {file: 'service-organization.webp', quality: 70, maxWidth: 900},
  {file: 'service-recruitment.webp', quality: 70, maxWidth: 900},
]

async function optimizeImage(inputPath, outputPath, options) {
  await sharp(inputPath)
    .rotate()
    .resize({width: options.maxWidth, withoutEnlargement: true})
    .webp({quality: options.quality, effort: 6})
    .toFile(outputPath)
}

async function createResponsiveVariant(inputPath, outputPath, width, quality) {
  await sharp(inputPath)
    .rotate()
    .resize({width, withoutEnlargement: true})
    .webp({quality, effort: 6})
    .toFile(outputPath)
}

async function main() {
  for (const target of compressTargets) {
    const inputPath = path.join(homeDir, target.file)
    const tempPath = path.join(homeDir, `${target.file}.tmp`)
    await optimizeImage(inputPath, tempPath, {
      quality: target.quality,
      maxWidth: target.maxWidth,
    })
    await unlink(inputPath)
    await rename(tempPath, inputPath)
  }

  const heroPath = path.join(homeDir, 'hero.webp')
  for (const width of responsiveHeroWidths) {
    await createResponsiveVariant(
      heroPath,
      path.join(homeDir, `hero-${width}.webp`),
      width,
      width <= 640 ? 68 : 72,
    )
  }

  console.log('Optimized home images:')
  for (const file of [
    'hero.webp',
    'hero-640.webp',
    'hero-1024.webp',
    ...compressTargets.map((target) => target.file).filter((file) => file !== 'hero.webp'),
  ]) {
    const stats = await sharp(path.join(homeDir, file)).metadata()
    const {size} = await import('node:fs/promises').then((fs) => fs.stat(path.join(homeDir, file)))
    console.log(`${file}: ${Math.round(size / 1024)}KB (${stats.width}x${stats.height})`)
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
