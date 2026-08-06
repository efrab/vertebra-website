import {
  getLocalizedPath,
  type Locale,
  type PathnameKey,
} from '../../i18n/routes'
import type {CmsLink} from './types'

const typeToPathKey: Record<string, PathnameKey> = {
  homePage: 'home',
  aboutPage: 'about',
  contactPage: 'contact',
  thankYouPage: 'thankYou',
  post: 'blogPost',
}

export function resolveInternalHref(
  doc: CmsLink['internal'],
  locale: Locale,
): string | undefined {
  if (!doc?._type) return undefined
  const key = typeToPathKey[doc._type]
  if (!key) return undefined
  const needsSlug = key === 'blogPost'
  if (needsSlug && !doc.slug) return undefined
  return getLocalizedPath(locale, key, needsSlug ? doc.slug : undefined)
}

export function resolveLinkHref(
  link: CmsLink | null | undefined,
  locale: Locale,
): string | undefined {
  if (!link) return undefined
  if (link.linkType === 'external' || link.href) return link.href
  return resolveInternalHref(link.internal, locale)
}

type CtaInput = {
  label?: string
  href?: string
  link?: CmsLink | null | unknown
}

export function resolveCta(
  cta: CtaInput | null | undefined,
  locale: Locale,
): {label: string; href: string} | undefined {
  if (!cta?.label) return undefined
  if (cta.href) return {label: cta.label, href: cta.href}
  const href = resolveLinkHref(cta.link as CmsLink | null | undefined, locale)
  if (!href) return undefined
  return {label: cta.label, href}
}
