import type {Locale, PathnameKey} from '../../i18n/routes'
import type {AlternateSlugs} from './hreflang'
import type {BreadcrumbItem, FaqItem} from './structuredData'

export type LayoutSeoProps = {
  /** noindex for thank-you and similar */
  noindex?: boolean
  ogType?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  /** For hreflang on detail pages with per-locale slugs */
  routeKey?: PathnameKey
  alternateSlugs?: AlternateSlugs
  /** Structured data context */
  breadcrumbs?: BreadcrumbItem[]
  faqItems?: FaqItem[]
  includeGlobalSchema?: boolean
  pageType?: 'home' | 'article' | 'service'
  article?: {
    publishedAt?: string
    modifiedAt?: string
    authorName?: string
  }
  service?: {
    name: string
    description?: string
  }
}

export type {Locale, PathnameKey, AlternateSlugs, BreadcrumbItem, FaqItem}
