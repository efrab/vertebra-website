import type {Locale} from '../../../frontend/src/i18n/routes'
import {SERVICE_SLUGS, SERVICE_TITLES} from '../../../frontend/src/modules/servicePageFixtures'
import {toLocalizedV5} from '../i18n-merge'

type ServiceKey = keyof typeof SERVICE_SLUGS

const slugToKey = new Map<string, ServiceKey>()
for (const [key, slugs] of Object.entries(SERVICE_SLUGS)) {
  slugToKey.set(slugs.es, key as ServiceKey)
  slugToKey.set(slugs.en, key as ServiceKey)
}

export function serviceKeyFromDocId(id: string): ServiceKey | null {
  const match = id.replace(/^drafts\./, '').match(/^service-(\w+)$/)
  if (!match) return null
  const key = match[1] as ServiceKey
  return key in SERVICE_SLUGS ? key : null
}

function serviceKeyFromHref(href: unknown): ServiceKey | null {
  if (typeof href !== 'string') return null
  for (const [slug, key] of slugToKey) {
    if (href.includes(slug)) return key
  }
  return null
}

export function repairServiceDocument(doc: Record<string, unknown>): Record<string, unknown> {
  const key = serviceKeyFromDocId(String(doc._id))
  if (!key || doc._type !== 'service') return doc

  return {
    ...doc,
    title: toLocalizedV5(SERVICE_TITLES[key].es, SERVICE_TITLES[key].en),
  }
}

function localizedTitles(key: ServiceKey) {
  return toLocalizedV5(SERVICE_TITLES[key].es, SERVICE_TITLES[key].en)
}

export function repairSiteSettingsNav(doc: Record<string, unknown>): Record<string, unknown> {
  if (doc._type !== 'siteSettings' || !Array.isArray(doc.navGroups)) return doc

  const navGroups = doc.navGroups.map((group) => {
    if (!group || typeof group !== 'object') return group
    const nextGroup = {...(group as Record<string, unknown>)}
    if (!Array.isArray(nextGroup.items)) return nextGroup

    nextGroup.items = nextGroup.items.map((item) => {
      if (!item || typeof item !== 'object') return item
      const nextItem = {...(item as Record<string, unknown>)}
      const link =
        nextItem.link && typeof nextItem.link === 'object'
          ? {...(nextItem.link as Record<string, unknown>)}
          : undefined
      const href = link?.href
      const key = serviceKeyFromHref(href)
      if (!key) return nextItem

      const titles = localizedTitles(key)
      nextItem.label = titles
      if (link) {
        nextItem.link = {...link, label: titles}
      }
      return nextItem
    })

    return nextGroup
  })

  return {...doc, navGroups}
}

export function serviceTitleForLocale(key: ServiceKey, locale: Locale): string {
  return SERVICE_TITLES[key][locale]
}
