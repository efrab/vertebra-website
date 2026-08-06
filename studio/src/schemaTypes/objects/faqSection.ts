import {defineField, defineType} from 'sanity'
import {localizedPreviewValue} from '../../lib/localized'
import {localizedStringField} from '../fields/localizedFields'

export default defineType({
  name: 'faqSection',
  title: 'FAQ section',
  type: 'object',
  fields: [
    defineField({
      name: 'variant',
      title: 'Spacing',
      type: 'string',
      initialValue: 'default',
      options: {
        list: [
          {title: 'Default', value: 'default'},
          {title: 'Roomy', value: 'roomy'},
        ],
        layout: 'radio',
      },
    }),
    localizedStringField('title', 'Title'),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [{type: 'faqItem'}],
    }),
  ],
  preview: {
    select: {title: 'title'},
    prepare: ({title}) => ({
      title: localizedPreviewValue(title, 'FAQ'),
    }),
  },
})
