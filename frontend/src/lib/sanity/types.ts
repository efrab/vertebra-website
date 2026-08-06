import type {SanityImageSource} from '@sanity/image-url'

export type CmsLink = {
  _type?: string
  label?: string
  linkType?: 'internal' | 'external' | string
  href?: string
  openInNewTab?: boolean
  internal?: {
    _type?: string
    slug?: string
  } | null
}

export type NavService = {
  _id: string
  title: string
  slug: string
  navOrder?: number | null
}

export type SiteSettings = {
  _id: string
  title?: string | null
  whatsapp?: string | null
  nav?: Array<{
    _key: string
    label?: string
    link?: CmsLink | null
  }> | null
  navGroups?: Array<{
    _key?: string
    title?: string
    items?: Array<{
      _key: string
      label?: string
      link?: CmsLink | null
    }>
  }> | null
  footer?: {
    tagline?: string | null
    links?: Array<{
      _key: string
      label?: string
      link?: CmsLink | null
    }> | null
    socialLinks?: Array<{
      _key: string
      label?: string
      link?: CmsLink | null
    }> | null
    contactInfo?: {
      email?: string | null
      whatsappLabel?: string | null
      address?: string | null
    } | null
    complaintsBookLink?: CmsLink | null
  } | null
  defaultSeo?: {
    metaTitle?: string | null
    metaDescription?: string | null
  } | null
}

export type CmsHero = {
  variant?: string
  eyebrow?: string
  heading?: string
  subheading?: string
  image?: SanityImageSource
  primaryCta?: {label?: string; link?: CmsLink | null}
  secondaryCta?: {label?: string; link?: CmsLink | null}
}

export type CmsCtaBanner = {
  variant?: string
  heading?: string
  subheading?: string
  cta?: {label?: string; link?: CmsLink | null}
  secondaryCta?: {label?: string; link?: CmsLink | null}
}

export type ContactChannel = {
  icon?: SanityImageSource | string
  title?: string
  value?: string
  href?: string
}

export type ContactReason = {
  tone?: 'magenta' | 'teal' | 'navyDeep' | string
  title?: string
  description?: string
  image?: SanityImageSource
}

export type ContactPathsCopy = {
  meetingTitle?: string
  meetingEyebrow?: string
  formTitle?: string
  formEyebrow?: string
  meetingImage?: SanityImageSource
}
