import {randomKey} from '@sanity/util/content'

type LocaleId = 'es' | 'en'

type LocalizedItem<T = unknown> = {
  _key: string
  _type: string
  language: LocaleId
  value: T
}

function localizedValue<T>(
  type: 'internationalizedArrayStringValue' | 'internationalizedArrayTextValue' | 'internationalizedArrayPortableTextValue',
  es: T | undefined | null,
  en: T | undefined | null,
): LocalizedItem<T>[] {
  const out: LocalizedItem<T>[] = []
  if (es != null && es !== '') {
    out.push({_key: randomKey(), _type: type, language: 'es', value: es})
  }
  if (en != null && en !== '') {
    out.push({_key: randomKey(), _type: type, language: 'en', value: en})
  }
  return out
}

export function loc(es: string, en: string) {
  return localizedValue('internationalizedArrayStringValue', es, en)
}

export function locText(es: string, en: string) {
  return localizedValue('internationalizedArrayTextValue', es, en)
}

export function locBlocks(
  es: unknown[] | undefined,
  en: unknown[] | undefined,
) {
  return localizedValue('internationalizedArrayPortableTextValue', es, en)
}

export function locSlug(esSlug: string, enSlug: string) {
  return {
    es: {_type: 'slug' as const, current: esSlug},
    en: {_type: 'slug' as const, current: enSlug},
  }
}

export type LocalizedPreviewItem = {language?: string; _key?: string; value?: unknown}

/** Pick a localized preview string for a specific locale */
export function localizedPreviewValueForLocale(
  values: LocalizedPreviewItem[] | string | undefined | null,
  locale: 'es' | 'en',
  fallback = '',
): string {
  if (typeof values === 'string') return values
  if (!Array.isArray(values) || !values.length) return fallback
  const item =
    values.find((v) => v.language === locale) ??
    values.find((v) => v._key === locale) ??
    values[0]
  return typeof item?.value === 'string' ? item.value : fallback
}

/** Studio previews — supports v5 `language`, legacy `_key`, or plain strings */
export function localizedPreviewValue(
  values: LocalizedPreviewItem[] | string | undefined | null,
  fallback = 'Untitled',
): string {
  if (typeof values === 'string') return values
  if (!Array.isArray(values) || !values.length) return fallback
  const item =
    values.find((v) => v.language === 'es') ??
    values.find((v) => v._key === 'es') ??
    values[0]
  return typeof item?.value === 'string' ? item.value : fallback
}
