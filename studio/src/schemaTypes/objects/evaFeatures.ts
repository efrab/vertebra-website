import {defineArrayMember, defineField, defineType} from 'sanity'
import {localizedPreviewValue} from '../../lib/localized'

export default defineType({
  name: 'evaFeatures',
  title: 'Eva features',
  type: 'object',
  fields: [
    defineField({name: 'heading', type: 'internationalizedArrayText'}),
    defineField({name: 'subheading', type: 'internationalizedArrayText'}),
    defineField({name: 'introLabel', type: 'internationalizedArrayString'}),
    defineField({
      name: 'items',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'description', type: 'internationalizedArrayText'}),
            defineField({name: 'iconSrc', type: 'string', title: 'Icon path'}),
            defineField({name: 'icon', type: 'string', title: 'Icon key (optional)'}),
          ],
          preview: {
            select: {title: 'description'},
            prepare: ({title}) => ({title: localizedPreviewValue(title, 'Feature')}),
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {title: 'heading'},
    prepare: ({title}) => ({title: localizedPreviewValue(title, 'Eva features')}),
  },
})
