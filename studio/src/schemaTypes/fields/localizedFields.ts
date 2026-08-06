import {defineField, type FieldDefinition} from 'sanity'
import {localizedPreviewValue, localizedPreviewValueForLocale} from '../../lib/localized'

type LocalizedFieldOptions = Omit<FieldDefinition, 'name' | 'type'>

export function localizedStringField(
  name: string,
  title: string,
  options?: LocalizedFieldOptions,
) {
  return defineField({
    name,
    title,
    type: 'internationalizedArrayString',
    ...options,
  })
}

export function localizedTextField(name: string, title: string, options?: LocalizedFieldOptions) {
  return defineField({
    name,
    title,
    type: 'internationalizedArrayText',
    ...options,
  })
}

export function localizedPortableTextField(
  name: string,
  title: string,
  options?: LocalizedFieldOptions,
) {
  return defineField({
    name,
    title,
    type: 'internationalizedArrayPortableText',
    ...options,
  })
}

export const localizedSlugField = defineField({
  name: 'slug',
  title: 'Slug',
  type: 'object',
  validation: (Rule) => Rule.required(),
  fields: [
    defineField({
      name: 'es',
      title: 'Slug (Español)',
      type: 'slug',
      options: {
        source: (doc) =>
          localizedPreviewValue(
            doc?.title as Parameters<typeof localizedPreviewValue>[0],
            '',
          ) || undefined,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'en',
      title: 'Slug (English)',
      type: 'slug',
      options: {
        source: (doc) =>
          localizedPreviewValueForLocale(
            doc?.title as Parameters<typeof localizedPreviewValueForLocale>[0],
            'en',
          ) || undefined,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
})
