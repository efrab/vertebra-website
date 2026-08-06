export const SUPPORTED_LANGUAGES = [
  {id: 'es', title: 'Español', isDefault: true},
  {id: 'en', title: 'English'},
] as const

export type SupportedLanguageId = (typeof SUPPORTED_LANGUAGES)[number]['id']

export const DEFAULT_LANGUAGE: SupportedLanguageId = 'es'

export const languageFilterLanguages = SUPPORTED_LANGUAGES.map(({id, title}) => ({
  id,
  title,
}))

export const I18N_DOCUMENT_TYPES = [
  'homePage',
  'aboutPage',
  'contactPage',
  'thankYouPage',
  'page',
  'post',
  'category',
  'siteSettings',
] as const
