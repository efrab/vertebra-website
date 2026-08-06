import {
  getLocalizedPath,
  isLocale,
  type Locale,
  type PathnameKey,
} from '../i18n/routes'

type InternalDoc = {
  _type?: string
  slug?: string
  language?: string
}

type LinkLike = {
  href?: string
  linkType?: string
  label?: string
  internal?: InternalDoc | null
}

type CtaLike = {
  label?: string
  href?: string
  link?: LinkLike | null
}

const typeToPathKey: Record<string, PathnameKey> = {
  homePage: 'home',
  aboutPage: 'about',
  contactPage: 'contact',
  thankYouPage: 'thankYou',
  page: 'modules',
  post: 'blogPost',
}

export function resolveInternalHref(
  doc: InternalDoc | null | undefined,
  fallbackLocale: Locale,
): string | undefined {
  if (!doc?._type) return undefined
  const key = typeToPathKey[doc._type]
  if (!key) return undefined
  const locale =
    doc.language && isLocale(doc.language) ? doc.language : fallbackLocale
  const needsSlug = key === 'blogPost'
  if (needsSlug && !doc.slug) return undefined
  return getLocalizedPath(locale, key, needsSlug ? doc.slug : undefined)
}

export function resolveLinkHref(
  link: LinkLike | null | undefined,
  locale: Locale,
): string | undefined {
  if (!link) return undefined
  if (link.linkType === 'external' || link.href) return link.href
  return resolveInternalHref(link.internal, locale)
}

export function resolveCta(
  cta: CtaLike | null | undefined,
  locale: Locale = 'es',
): {label: string; href: string} | undefined {
  if (!cta?.label) return undefined
  if (cta.href) return {label: cta.label, href: cta.href}
  const href = resolveLinkHref(cta.link, locale)
  if (!href) return undefined
  return {label: cta.label, href}
}
