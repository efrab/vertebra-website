import {mergeLocalized} from '../i18n-merge'

type FixtureCard = {
  title: string
  summary?: string
  href?: string
  slug: string
}

function pageRefFromHref(href?: string): {_type: 'reference'; _ref: string} | undefined {
  if (!href) return undefined
  if (href.includes('reclutamiento') || href.includes('recruitment')) {
    return {_type: 'reference', _ref: 'recruitmentPage'}
  }
  if (href.includes('servicios') || href.includes('/services')) {
    return {_type: 'reference', _ref: 'servicesIndexPage'}
  }
  return undefined
}

export function mergeServiceSplitCards(
  esCards: FixtureCard[],
  enCards: FixtureCard[],
): Array<Record<string, unknown>> {
  return esCards.slice(0, 2).map((esCard, index) => {
    const enCard = enCards[index]
    const page = pageRefFromHref(esCard.href) ?? pageRefFromHref(enCard?.href)
    return {
      _key: `card-${index}`,
      _type: 'serviceSplitCard',
      title: mergeLocalized(esCard.title, enCard?.title ?? esCard.title),
      summary: mergeLocalized(esCard.summary, enCard?.summary ?? esCard.summary),
      ...(page ? {page} : {}),
    }
  })
}

export function migrateServiceSplitFromLegacy(
  block: Record<string, unknown>,
): Record<string, unknown> {
  const services = block.services
  const existingCards = block.cards

  if (Array.isArray(existingCards) && existingCards.length >= 2) {
    const next = {...block}
    delete next.services
    return next
  }

  if (!Array.isArray(services) || services.length === 0) {
    const next = {...block}
    delete next.services
    return next
  }

  const cards = services.slice(0, 2).map((item, index) => {
    const entry = item as Record<string, unknown>
    const href = typeof entry.href === 'string' ? entry.href : undefined
    const page = pageRefFromHref(href)
    return {
      _key: `card-${index}`,
      _type: 'serviceSplitCard',
      title: entry.title,
      summary: entry.summary,
      ...(page ? {page} : {}),
    }
  })

  const next = {...block, cards}
  delete next.services
  return next
}

export function serviceSplitCardsFromFixtures(
  esSections: unknown[],
  enSections: unknown[],
): Array<Record<string, unknown>> | undefined {
  const esBlock = esSections.find(
    (section) =>
      typeof section === 'object' &&
      section !== null &&
      (section as {_type?: string})._type === 'serviceSplit',
  ) as {services?: FixtureCard[]} | undefined
  const enBlock = enSections.find(
    (section) =>
      typeof section === 'object' &&
      section !== null &&
      (section as {_type?: string})._type === 'serviceSplit',
  ) as {services?: FixtureCard[]} | undefined

  if (!esBlock?.services?.length) return undefined
  return mergeServiceSplitCards(esBlock.services, enBlock?.services ?? esBlock.services)
}
