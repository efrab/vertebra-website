export type IconCatalogOption = {
  value: string
  title: string
  previewPath: string
}

export type IconCatalogKey =
  | 'contentCard'
  | 'contact'
  | 'metrics'
  | 'relatedServices'
  | 'serviceCatalog'

/** Maps content-card icon enum values to static asset paths (shared with patch scripts). */
export const ICON_ENUM_PATHS: Record<string, string> = {
  arrow: '/assets/figma/recruitment/target-icon-magenta.svg',
  calendar: '/assets/figma/recruitment/deliverable-calendar.svg',
  process: '/assets/figma/recruitment/deliverable-process.svg',
  market: '/assets/figma/recruitment/deliverable-market.svg',
  marketBrand: '/assets/figma/recruitment/deliverable-market-brand.svg',
  industryCalendar: '/assets/figma/services/industry-calendar.svg',
  industryPlanning: '/assets/figma/services/industry-planning.svg',
  industryMoney: '/assets/figma/services/industry-money.svg',
  planning: '/assets/figma/about/value-planning.svg',
  money: '/assets/figma/about/value-money.svg',
  relationship: '/assets/figma/about/value-money.svg',
}

const CONTENT_CARD_ICONS: IconCatalogOption[] = [
  {value: 'arrow', title: 'Arrow / target', previewPath: ICON_ENUM_PATHS.arrow},
  {value: 'calendar', title: 'Calendar', previewPath: ICON_ENUM_PATHS.calendar},
  {value: 'process', title: 'Process', previewPath: ICON_ENUM_PATHS.process},
  {value: 'market', title: 'Market', previewPath: ICON_ENUM_PATHS.market},
  {value: 'marketBrand', title: 'Market (brand)', previewPath: ICON_ENUM_PATHS.marketBrand},
  {value: 'industryCalendar', title: 'Industry calendar', previewPath: ICON_ENUM_PATHS.industryCalendar},
  {value: 'industryPlanning', title: 'Industry planning', previewPath: ICON_ENUM_PATHS.industryPlanning},
  {value: 'industryMoney', title: 'Industry money', previewPath: ICON_ENUM_PATHS.industryMoney},
  {value: 'planning', title: 'Planning', previewPath: ICON_ENUM_PATHS.planning},
  {value: 'money', title: 'Money', previewPath: ICON_ENUM_PATHS.money},
  {value: 'relationship', title: 'Relationship', previewPath: ICON_ENUM_PATHS.relationship},
]

const CONTACT_ICONS: IconCatalogOption[] = [
  {value: 'email', title: 'Email', previewPath: '/assets/figma/contact/icon-email.svg'},
  {value: 'whatsapp', title: 'WhatsApp', previewPath: '/assets/figma/contact/icon-whatsapp.svg'},
  {value: 'linkedin', title: 'LinkedIn', previewPath: '/assets/figma/contact/icon-linkedin.svg'},
  {value: 'address', title: 'Address', previewPath: '/assets/figma/contact/icon-address.svg'},
]

const METRICS_ICONS: IconCatalogOption[] = [
  {value: 'calendar', title: 'Calendar', previewPath: ICON_ENUM_PATHS.calendar},
  {value: 'process', title: 'Process', previewPath: ICON_ENUM_PATHS.process},
  {value: 'cost', title: 'Cost', previewPath: ICON_ENUM_PATHS.market},
]

const RELATED_SERVICES_ICONS: IconCatalogOption[] = [
  {value: 'calendar', title: 'Calendar', previewPath: ICON_ENUM_PATHS.calendar},
  {value: 'planning', title: 'Planning', previewPath: ICON_ENUM_PATHS.planning},
  {value: 'money', title: 'Money', previewPath: ICON_ENUM_PATHS.money},
]

const SERVICE_CATALOG_ICONS: IconCatalogOption[] = [
  {value: 'calendar', title: 'Calendar', previewPath: ICON_ENUM_PATHS.calendar},
  {value: 'planning', title: 'Planning', previewPath: ICON_ENUM_PATHS.planning},
  {value: 'money', title: 'Finance', previewPath: ICON_ENUM_PATHS.money},
]

export const ICON_CATALOGS: Record<IconCatalogKey, IconCatalogOption[]> = {
  contentCard: CONTENT_CARD_ICONS,
  contact: CONTACT_ICONS,
  metrics: METRICS_ICONS,
  relatedServices: RELATED_SERVICES_ICONS,
  serviceCatalog: SERVICE_CATALOG_ICONS,
}

export function getIconCatalog(key: IconCatalogKey): IconCatalogOption[] {
  return ICON_CATALOGS[key] ?? []
}

export function getIconPreviewUrl(path: string): string {
  const origin =
    (typeof import.meta !== 'undefined' &&
      (import.meta as ImportMeta & {env?: Record<string, string>}).env?.SANITY_STUDIO_PREVIEW_URL) ||
    (typeof process !== 'undefined' ? process.env.SANITY_STUDIO_PREVIEW_URL : undefined) ||
    'http://localhost:4321'
  return `${origin.replace(/\/$/, '')}${path}`
}

export function getCatalogPreviewPath(catalogKey: IconCatalogKey, value: string): string | undefined {
  return getIconCatalog(catalogKey).find((option) => option.value === value)?.previewPath
}

/** Image pickers use previewPath as the asset lookup key (source.name). */
export function getImageCatalogOptions(key: 'contentCard' | 'contact'): IconCatalogOption[] {
  return getIconCatalog(key).map((option) => ({
    ...option,
    value: option.previewPath,
  }))
}
