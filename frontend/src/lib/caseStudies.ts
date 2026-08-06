import {urlFor} from './sanity/image'
import type {SanityImageSource} from '@sanity/image-url'

export type CaseStudyMetricIcon = 'calendar' | 'process' | 'cost'

export type CaseStudyListItem = {
  _id?: string
  title: string
  slug: string
  industry?: string
  service?: string
  summary?: string
  challenge?: string
  result?: string
  cover?: string | SanityImageSource
}

export type CaseStudyRelatedItem = {
  _id?: string
  title: string
  slug: string
  industry?: string
  challenge?: string
  cover?: string | SanityImageSource
}

export type CaseStudyDetail = CaseStudyListItem & {
  challengeHeadline?: string
  interventionHeadline?: string
  intervention?: string
  metrics?: {label: string; value: string; icon?: CaseStudyMetricIcon}[]
  relatedService?: {title?: string; slug?: string}
  relatedCases?: CaseStudyRelatedItem[]
  body?: unknown[]
  seo?: {metaTitle?: string; metaDescription?: string}
}

const GRID_IMAGE_FALLBACKS = [
  {
    src: '/assets/figma/home/case-one.webp',
    className: '!h-[114.29%] !w-[151.82%] left-[-39.06%] top-[-14.29%]',
  },
  {
    src: '/assets/figma/home/case-two.webp',
    className: 'inset-x-0 top-0 !h-full !w-full object-cover object-center',
  },
  {
    src: '/assets/figma/home/insight-three.webp',
    className: '!h-[140.23%] !w-[190.71%] left-[-61.26%] top-[-20.11%]',
  },
] as const

const METRIC_ICONS: CaseStudyMetricIcon[] = ['calendar', 'process', 'cost']

export function caseStudyCoverUrl(
  cover: string | SanityImageSource | undefined,
  fallback = '/assets/figma/case-studies/detail-hero.webp',
): string {
  if (!cover) return fallback
  if (typeof cover === 'string') return cover
  return urlFor(cover).width(1400).height(900).fit('crop').auto('format').url()
}

export function caseStudyGridImage(index: number) {
  return GRID_IMAGE_FALLBACKS[index % GRID_IMAGE_FALLBACKS.length]
}

export function caseStudyMetricIcon(
  metric: {icon?: CaseStudyMetricIcon} | undefined,
  index: number,
): CaseStudyMetricIcon {
  return metric?.icon ?? METRIC_ICONS[index % METRIC_ICONS.length]
}

export function caseStudyCardHeadline(item: Pick<CaseStudyListItem, 'challenge' | 'title'>) {
  return item.challenge || item.title
}

export function caseStudyCardOutcome(item: Pick<CaseStudyListItem, 'result' | 'summary'>) {
  return item.result || item.summary
}

export function caseStudyHeroHeading(item: Pick<CaseStudyDetail, 'result' | 'title'>) {
  return item.result || item.title
}

export function caseStudyRelatedTitle(item: Pick<CaseStudyRelatedItem, 'challenge' | 'title'>) {
  return item.challenge || item.title
}
