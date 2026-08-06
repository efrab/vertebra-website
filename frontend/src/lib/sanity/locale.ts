import type {Locale} from '../../i18n/routes'

/** GROQ: resolve internationalized string/text field for $locale with ES fallback */
export const localizedField = (field: string) =>
  `"${field}": coalesce(${field}[language == $locale][0].value, ${field}[language == "es"][0].value)`

/** GROQ: resolve nested localized field inside projection */
export const localizedNested = (field: string) =>
  `coalesce(${field}[language == $locale][0].value, ${field}[language == "es"][0].value)`

/** GROQ: locale-specific slug from slug.es / slug.en object */
export const localizedSlugProjection = /* groq */ `"slug": slug[$locale].current`

/** GROQ filter: match document by locale slug */
export const slugFilter = /* groq */ `slug[$locale].current == $slug`

type LocalizedItem<T = unknown> = {
  language?: string
  _key?: string
  value?: T
}

/** Runtime: pick localized array value (for typed helpers) */
export function pickLocalized<T>(
  values: LocalizedItem<T>[] | null | undefined,
  locale: Locale,
): T | undefined {
  if (!values?.length) return undefined
  return (
    values.find((item) => item.language === locale)?.value ??
    values.find((item) => item.language === 'es')?.value ??
    values.find((item) => item._key === locale)?.value ??
    values.find((item) => item._key === 'es')?.value
  )
}
