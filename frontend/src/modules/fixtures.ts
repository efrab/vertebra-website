import type {Locale} from '../i18n/routes'
import {getLocalizedPath} from '../i18n/routes'
import {homeFixtures} from './homeFixtures'
import {marketingPageFixtures} from './marketingPageFixtures'
import {modulesFixtures} from './modulesFixtures'

export type PageSection =
  | {
      _type: 'heroHome'
      eyebrow?: string
      heading: string
      headingBold?: string
      headingLight?: string
      subheading?: string
      primaryCta?: {label: string; href: string}
      gifSrc?: string
      pressLabel?: string
      pressLogos?: {name: string; src: string; href?: string; small?: boolean}[]
      investorLogos?: {name: string; src?: string; label?: string; href?: string}[]
      videoSrc?: string
      posterSrc?: string
      partnerLogos?: {name: string; src?: string}[]
    }
  | {
      _type: 'benefitsGrid'
      eyebrow?: string
      heading: string
      items: {title: string; description: string; iconSrc?: string}[]
    }
  | {
      _type: 'roiStats'
      heading?: string
      roiValue: string
      roiLabel: string
      description?: string
      stats?: {label: string}[]
    }
  | {
      _type: 'solutionsByRole'
      eyebrow?: string
      heading: string
      roles: {
        title: string
        description: string
        imageSrc?: string
        bgSrc?: string
        figureSrc?: string
        decorLeftSrc?: string
        decorRightSrc?: string
        decorLeftClass?: string
        decorRightClass?: string
      }[]
    }
  | {
      _type: 'howItWorks'
      eyebrow?: string
      heading: string
      steps: {number: string; title: string; description: string}[]
    }
  | {
      _type: 'testimonials'
      eyebrow?: string
      heading: string
      items: {
        quote: string
        author: string
        role?: string
        company?: string
        avatarSrc?: string
      }[]
    }
  | {
      _type: 'trustLogos'
      eyebrow?: string
      heading: string
      moreLabel?: string
      tone?: 'default' | 'white'
      logos: {name: string; src?: string}[]
    }
  | {
      _type: 'securityFeatures'
      heading: string
      subheading?: string
      items: {title: string; description: string}[]
    }
  | {
      _type: 'teamSection'
      heading: string
      members: {name: string; role: string; bio?: string; imageSrc?: string; imageSrcSet?: string; linkedinUrl?: string}[]
    }
  | {
      _type: 'headerInternal'
      variant?: 'base' | 'interna'
      heading: string
      iconSrc?: string
      personSrc?: string
      personSrcSet?: string
      bgSrc?: string
      bgSrcSet?: string
      eyebrow?: string
      description?: string
      imageSrc?: string
    }
  | {
      _type: 'benefitsRoles'
      heading: string
      subheading?: string
      cards: {
        title: string
        description: string
        items: string[]
        iconSrc?: string
      }[]
    }
  | {
      _type: 'moduleShowcase'
      heading: string
      headerIconSrc?: string
      headerBgSrc?: string
      headerBgSrcSet?: string
      tabs?: {
        id: string
        label: string
        iconSrc?: string
        heading: string
        sections: {
          title?: string
          description?: string
          imageSrc: string
          imageSrcSet?: string
          cards: {title?: string; description: string; largeText?: boolean}[]
        }[]
        message: {line: string; highlight: string}
      }[]
      cta?: {
        heading: string
        description?: string
        primary?: {label: string; href: string}
        secondary?: {label: string; href: string}
        bgSrc?: string
        bgSrcSet?: string
      }
      /** Legacy Sanity shape (flat modules list) */
      modules?: {
        title: string
        description: string
        mediaSrc?: string
        mediaType?: 'video' | 'image'
      }[]
    }
  | {
      _type: 'formSection'
      heading: string
      description?: string
      formId?: string
      variant?: 'agenda' | 'contact' | 'landing' | 'pricing'
      redirectTo?: string
      formTitle?: string
      formSubtitle?: string
      submitLabel?: string
      sideHeading?: string
      sideDescription?: string
      contactLinks?: {
        label: string
        href: string
        iconSrc?: string
        variant?: 'outline' | 'blue'
      }[]
      showSchedule?: boolean
      requiredNote?: string
    }
  | {
      _type: 'pricingTable'
      heading: string
      subheading?: string
      price: string
      priceSuffix?: string
      annualPrice?: string
      annualNote?: string
      badge?: string
      paymentNote?: string
      primaryCta: {label: string; href: string}
      secondaryCta?: {label: string; href: string}
      featuresHeading?: string
      features: {label: string}[]
    }
  | {
      _type: 'thanksHero'
      heading: string
      highlight?: string
      description?: string
      backHref?: string
      backLabel?: string
      imageSrc?: string
      imageSrcSet?: string
      primaryCta?: {label: string; href: string}
      secondaryCta?: {label: string; href: string}
    }
  | {
      _type: 'ctaBanner'
      heading: string
      subheading?: string
      cta?: {label: string; href: string}
      secondaryCta?: {label: string; href: string}
      bgSrc?: string
      bgSrcSet?: string
      wrapped?: boolean
    }
  | {
      _type: 'faqSection'
      heading?: string
      items: {question: string; answer: string}[]
    }
  | {
      _type: 'evaFeatures'
      heading: string
      subheading?: string
      introLabel?: string
      items: {title?: string; description: string; iconSrc?: string}[]
    }
  | {
      _type: 'aboutIntro'
      heading: string
      description?: string
      logos?: {name: string; src: string}[]
    }
  | {
      _type: 'helpTopics'
      heading: string
      searchPlaceholder?: string
      searchAction?: string
      topics: {
        title: string
        items: string[]
        tip?: string
        iconSrc?: string
      }[]
    }

export {homeFixtures, marketingPageFixtures, modulesFixtures}
export {benefitsFixtures} from './benefitsFixtures'

export function agendaHref(locale: Locale) {
  return getLocalizedPath(locale, 'agenda')
}
