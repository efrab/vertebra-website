import {defineArrayMember, defineField, defineType} from 'sanity'
import {localizedPreviewValue} from '../../lib/localized'

export default defineType({
  name: 'formSection',
  title: 'Form section',
  type: 'object',
  fields: [
    defineField({name: 'heading', type: 'internationalizedArrayText'}),
    defineField({name: 'description', type: 'internationalizedArrayText'}),
    defineField({name: 'formId', type: 'string'}),
    defineField({
      name: 'variant',
      type: 'string',
      options: {list: ['agenda', 'contact', 'landing', 'pricing']},
    }),
    defineField({name: 'showSchedule', type: 'boolean', initialValue: false}),
    defineField({name: 'redirectTo', type: 'string'}),
    defineField({name: 'requiredNote', type: 'internationalizedArrayString'}),
    defineField({name: 'submitLabel', type: 'internationalizedArrayString'}),
    defineField({name: 'formTitle', type: 'internationalizedArrayText'}),
    defineField({name: 'formSubtitle', type: 'internationalizedArrayText'}),
    defineField({name: 'sideHeading', type: 'internationalizedArrayText'}),
    defineField({name: 'sideDescription', type: 'internationalizedArrayText'}),
    defineField({
      name: 'contactLinks',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'label', type: 'internationalizedArrayString'}),
            defineField({name: 'href', type: 'string'}),
            defineField({name: 'iconSrc', type: 'string'}),
            defineField({
              name: 'variant',
              type: 'string',
              options: {list: ['outline', 'blue']},
            }),
          ],
          preview: {
            select: {title: 'label'},
            prepare: ({title}) => ({title: localizedPreviewValue(title, 'Link')}),
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {title: 'heading'},
    prepare: ({title}) => ({title: localizedPreviewValue(title, 'Form section')}),
  },
})
