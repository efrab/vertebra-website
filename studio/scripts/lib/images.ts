import type {SanityClient} from '@sanity/client'
import {existsSync, readFileSync} from 'node:fs'
import {basename, dirname, resolve} from 'node:path'
import {fileURLToPath} from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

export const PUBLIC_ROOT = resolve(__dirname, '../../../frontend/public')

export type SanityImage = {
  _type: 'image'
  asset: {_type: 'reference'; _ref: string}
}

export type UploadImage = (publicPath: string) => Promise<SanityImage | undefined>

export const LOGO_PLACEHOLDER = '/assets/figma/about/team-member.webp'

import {ICON_ENUM_PATHS} from '../../src/lib/iconCatalog'

export {ICON_ENUM_PATHS}

export const FLAG_PRESET_PATHS: Record<string, string> = {
  us: '/assets/figma/about/flag-us.png',
  mx: '/assets/figma/about/flag-mx.png',
  co: '/assets/figma/about/flag-co.png',
  ec: '/assets/figma/about/flag-ec.png',
  br: '/assets/figma/about/flag-br.png',
  uy: '/assets/figma/about/flag-uy.png',
  cl: '/assets/figma/about/flag-cl.png',
  es: '/assets/figma/about/flag-es.png',
  it: '/assets/figma/about/flag-it.png',
}

const IMAGE_KEYS = new Set([
  'image',
  'cover',
  'mapImage',
  'flag',
  'photo',
  'ogImage',
  'logos',
  'media',
  'cardImages',
  'diagramImage',
  'decorImage',
  'decorLeft',
  'decorRight',
  'meetingImage',
  'heroImage',
  'icon',
])

function contentTypeFor(filePath: string) {
  if (filePath.endsWith('.webp')) return 'image/webp'
  if (filePath.endsWith('.png')) return 'image/png'
  if (filePath.endsWith('.jpg') || filePath.endsWith('.jpeg')) return 'image/jpeg'
  if (filePath.endsWith('.svg')) return 'image/svg+xml'
  return 'application/octet-stream'
}

export function loadStudioEnv() {
  const envPath = resolve(__dirname, '../../.env')
  if (!existsSync(envPath)) return
  for (const line of readFileSync(envPath, 'utf8').split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq === -1) continue
    const key = trimmed.slice(0, eq).trim()
    let val = trimmed.slice(eq + 1).trim()
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1)
    }
    if (!(key in process.env)) process.env[key] = val
  }
}

export function createUploadImage(
  client: SanityClient,
  cache: Map<string, string>,
  options: {apply?: boolean} = {},
): UploadImage {
  const {apply = true} = options

  return async (publicPath: string): Promise<SanityImage | undefined> => {
    if (!publicPath.startsWith('/assets/')) return undefined

    const cached = cache.get(publicPath)
    if (cached) {
      return {_type: 'image', asset: {_type: 'reference', _ref: cached}}
    }

    const existing = await client.fetch<string | null>(
      `*[_type == "sanity.imageAsset" && source.name == $path][0]._id`,
      {path: publicPath},
    )
    if (existing) {
      cache.set(publicPath, existing)
      return {_type: 'image', asset: {_type: 'reference', _ref: existing}}
    }

    const filePath = resolve(PUBLIC_ROOT, publicPath.replace(/^\//, ''))
    if (!existsSync(filePath)) {
      console.warn(`missing image file: ${publicPath}`)
      return undefined
    }

    if (!apply) {
      console.log(`would upload ${publicPath}`)
      return {_type: 'image', asset: {_type: 'reference', _ref: `dry-run:${publicPath}`}}
    }

    const asset = await client.assets.upload('image', readFileSync(filePath), {
      filename: basename(filePath),
      contentType: contentTypeFor(filePath),
      source: {id: publicPath, name: publicPath, url: publicPath},
    })

    cache.set(publicPath, asset._id)
    console.log(`uploaded ${publicPath}`)
    return {_type: 'image', asset: {_type: 'reference', _ref: asset._id}}
  }
}

function resolveIconPath(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined
  if (value.startsWith('/assets/')) return value
  return ICON_ENUM_PATHS[value]
}

function isFixtureCta(value: unknown): value is {label: string; href: string} {
  return (
    typeof value === 'object' &&
    value !== null &&
    'label' in value &&
    'href' in value &&
    typeof (value as {label: unknown}).label === 'string' &&
    typeof (value as {href: unknown}).href === 'string' &&
    !('linkType' in value)
  )
}

function toSanityCta(cta: {label: string; href: string}) {
  return {
    label: cta.label,
    variant: 'primary' as const,
    link: {
      _type: 'link',
      label: cta.label,
      linkType: 'external' as const,
      href: cta.href,
    },
  }
}

/** Blocks whose `icon` fields stay as string enums (SVG rendered in frontend code). */
const STRING_ICON_BLOCK_TYPES = new Set([
  'metrics',
  'relatedServices',
  'serviceCategory',
  'serviceCatalogItem',
])

type ResolveImagesContext = {
  blockType?: string
}

export async function resolveImages(
  value: unknown,
  uploadImage: UploadImage,
  ctx: ResolveImagesContext = {},
): Promise<unknown> {
  if (typeof value === 'string' && value.startsWith('/assets/')) {
    return (await uploadImage(value)) ?? value
  }

  if (Array.isArray(value)) {
    return Promise.all(value.map((item) => resolveImages(item, uploadImage, ctx)))
  }

  if (typeof value === 'object' && value !== null) {
    const obj = value as Record<string, unknown>
    const blockType =
      typeof obj._type === 'string' ? obj._type : ctx.blockType
    const nextCtx: ResolveImagesContext = {blockType}
    const out: Record<string, unknown> = {}

    for (const [key, child] of Object.entries(obj)) {
      if (IMAGE_KEYS.has(key)) {
        if (key === 'logos' && Array.isArray(child)) {
          out[key] = await Promise.all(
            child.map(async (logo) => {
              if (typeof logo === 'object' && logo !== null) {
                const entry = logo as Record<string, unknown>
                const image =
                  typeof entry.image === 'string'
                    ? await uploadImage(entry.image)
                    : entry.image && typeof entry.image === 'object' && 'asset' in entry.image
                      ? entry.image
                      : !entry.image
                        ? await uploadImage(LOGO_PLACEHOLDER)
                        : undefined
                return {
                  ...(entry._key ? {_key: entry._key} : {}),
                  name: entry.name,
                  ...(image ? {image} : {}),
                }
              }
              return logo
            }),
          )
          continue
        }

        if (key === 'cardImages' && Array.isArray(child)) {
          out[key] = (
            await Promise.all(
              child.map(async (item) => {
                if (typeof item === 'string') return uploadImage(item)
                if (typeof item === 'object' && item !== null && 'asset' in item) return item
                return undefined
              }),
            )
          ).filter(Boolean)
          continue
        }

        if (key === 'icon') {
          // Metrics / relatedServices / service catalog keep string enums.
          if (blockType && STRING_ICON_BLOCK_TYPES.has(blockType)) {
            if (typeof child === 'string') out[key] = child
            continue
          }

          const path = resolveIconPath(child)
          if (path) {
            const image = await uploadImage(path)
            if (image) out[key] = image
          } else if (typeof child === 'object' && child !== null && 'asset' in child) {
            out[key] = child
          }
          continue
        }

        if (typeof child === 'string') {
          const image = await uploadImage(child)
          if (image) out[key] = image
          continue
        }

        if (typeof child === 'object' && child !== null && 'asset' in child) {
          out[key] = child
          continue
        }

        continue
      }

      if (isFixtureCta(child)) {
        out[key] = toSanityCta(child)
        continue
      }

      out[key] = await resolveImages(child, uploadImage, nextCtx)
    }
    return out
  }

  return value
}

export function hasImageAsset(value: unknown): boolean {
  return (
    typeof value === 'object' &&
    value !== null &&
    '_type' in value &&
    (value as {_type: string})._type === 'image' &&
    typeof (value as {asset?: {_ref?: string}}).asset?._ref === 'string'
  )
}
