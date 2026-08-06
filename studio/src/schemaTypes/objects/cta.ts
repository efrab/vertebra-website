import {defineField, defineType} from 'sanity'
import {localizedStringField} from '../fields/localizedFields'

export default defineType({
  name: 'cta',
  title: 'CTA',
  type: 'object',
  fields: [
    localizedStringField('label', 'Label', {validation: (Rule) => Rule.required()}),
    defineField({
      name: 'variant',
      title: 'Variant',
      type: 'string',
      options: {
        list: [
          {title: 'Primary', value: 'primary'},
          {title: 'Secondary', value: 'secondary'},
          {title: 'Ghost', value: 'ghost'},
        ],
      },
      initialValue: 'primary',
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'link',
      validation: (Rule) => Rule.required(),
    }),
  ],
})
