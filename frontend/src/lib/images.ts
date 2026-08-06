import {existsSync} from 'node:fs'
import {join} from 'node:path'
import type {SanityImageSource} from '@sanity/image-url'
import {urlFor} from './sanity/image'

const STATIC_IMAGE_EXT = /\.(avif|gif|jpe?g|png|webp)$/i
const STATIC_HERO_WIDTHS = [480, 640, 1024] as const

export function staticResponsiveUrl(path: string, width: number): string {
  return path.replace(STATIC_IMAGE_EXT, `-${width}.$1`)
}

function staticVariantPath(path: string, width: number): string {
  return join(process.cwd(), 'public', staticResponsiveUrl(path, width))
}

function staticVariantExists(path: string, width: number): boolean {
  return existsSync(staticVariantPath(path, width))
}

export function staticSrcset(path: string, widths: number[] = [...STATIC_HERO_WIDTHS]): string | undefined {
  const entries = widths
    .filter((width) => staticVariantExists(path, width))
    .map((width) => `${staticResponsiveUrl(path, width)} ${width}w`)

  return entries.length ? entries.join(', ') : undefined
}

export function staticLcpPreloadUrl(path: string, width = 480): string {
  if (staticVariantExists(path, width)) {
    return staticResponsiveUrl(path, width)
  }

  return path
}

export function sanityHeroSrcset(
  source: SanityImageSource,
  widths: number[] = [640, 1024, 1920],
): string {
  return widths
    .map((width) => {
      const height = Math.round(width * (9 / 16))
      return `${urlFor(source).width(width).height(height).fit('crop').auto('format').url()} ${width}w`
    })
    .join(', ')
}

export function sanityHeroUrl(source: SanityImageSource, width = 1024): string {
  const height = Math.round(width * (9 / 16))
  return urlFor(source).width(width).height(height).fit('crop').auto('format').url()
}

export function sanityLcpPreloadUrl(source: SanityImageSource): string {
  return sanityHeroUrl(source, 640)
}

export function resolveHeroImage(image: string | SanityImageSource | undefined, fallback: string) {
  if (typeof image === 'string') {
    const srcset = staticSrcset(image)
    const src = staticLcpPreloadUrl(image)
    return {
      src,
      srcset,
      lcpPreload: src,
      width: 1024,
      height: 572,
    }
  }

  if (image) {
    return {
      src: sanityHeroUrl(image, 640),
      srcset: sanityHeroSrcset(image),
      lcpPreload: sanityLcpPreloadUrl(image),
      width: 1024,
      height: 576,
    }
  }

  const srcset = staticSrcset(fallback)
  const src = staticLcpPreloadUrl(fallback)
  return {
    src,
    srcset,
    lcpPreload: src,
    width: 1024,
    height: 572,
  }
}
