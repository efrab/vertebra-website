import type {Locale} from './routes'
import en from './en.json'
import es from './es.json'

const dictionaries = {es, en} as const

type Dict = typeof es
type NestedKeyOf<T, Prefix extends string = ''> = T extends object
  ? {
      [K in keyof T & string]: T[K] extends object
        ? NestedKeyOf<T[K], Prefix extends '' ? K : `${Prefix}.${K}`>
        : Prefix extends ''
          ? K
          : `${Prefix}.${K}`
    }[keyof T & string]
  : never

export type TranslationKey = NestedKeyOf<Dict>

function getByPath(obj: Record<string, unknown>, path: string): string | undefined {
  const value = path.split('.').reduce<unknown>((acc, part) => {
    if (acc && typeof acc === 'object' && part in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[part]
    }
    return undefined
  }, obj)
  return typeof value === 'string' ? value : undefined
}

export function t(locale: Locale, key: TranslationKey | string): string {
  const dict = dictionaries[locale] ?? dictionaries.es
  return getByPath(dict as unknown as Record<string, unknown>, key) ?? key
}

export function getDictionary(locale: Locale): Dict {
  return dictionaries[locale] ?? dictionaries.es
}
