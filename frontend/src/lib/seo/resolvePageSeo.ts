import type {SanityImageSource} from '@sanity/image-url'
import {urlFor} from '../sanity/image'

export type PageSeo = {
  metaTitle?: string | null
  metaDescription?: string | null
  ogImage?: SanityImageSource | null
}

export function seoOgImageUrl(
  seo?: PageSeo | null,
  fallback?: string | SanityImageSource | null,
  origin?: string,
): string | undefined {
  if (seo?.ogImage) {
    return urlFor(seo.ogImage).width(1200).height(630).fit('crop').url()
  }
  if (typeof fallback === 'string') {
    if (fallback.startsWith('http')) return fallback
    if (fallback.startsWith('/') && origin) return `${origin}${fallback}`
    return fallback.startsWith('/') ? fallback : undefined
  }
  if (fallback && typeof fallback === 'object') {
    return urlFor(fallback).width(1200).height(630).fit('crop').url()
  }
  return undefined
}

export function resolvePageSeo(options: {
  seo?: PageSeo | null
  title: string
  description?: string
  ogImageFallback?: string | SanityImageSource | null
  origin?: string
}) {
  const {seo, title, description, ogImageFallback, origin} = options
  return {
    title: seo?.metaTitle || title,
    description: seo?.metaDescription || description,
    image: seoOgImageUrl(seo, ogImageFallback, origin),
  }
}
