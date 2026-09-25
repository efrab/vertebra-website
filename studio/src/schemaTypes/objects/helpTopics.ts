import {defineArrayMember, defineField, defineType} from 'sanity'
import {localizedPreviewValue} from '../../lib/localized'

export default defineType({
  name: 'helpTopics',
  title: 'Help topics',
  type: 'object',
  fields: [
    defineField({name: 'heading', type: 'internationalizedArrayText'}),
    defineField({name: 'searchPlaceholder', type: 'internationalizedArrayString'}),
    defineField({name: 'searchAction', type: 'string'}),
    defineField({
      name: 'topics',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'title', type: 'internationalizedArrayString'}),
            defineField({name: 'iconSrc', type: 'string', title: 'Icon path'}),
            defineField({name: 'tip', type: 'internationalizedArrayText'}),
            defineField({
              name: 'items',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  fields: [defineField({name: 'text', type: 'internationalizedArrayString'})],
                  preview: {
                    select: {title: 'text'},
                    prepare: ({title}) => ({title: localizedPreviewValue(title, 'Item')}),
                  },
                }),
              ],
            }),
          ],
          preview: {
            select: {title: 'title'},
            prepare: ({title}) => ({title: localizedPreviewValue(title, 'Topic')}),
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {title: 'heading'},
    prepare: ({title}) => ({title: localizedPreviewValue(title, 'Help topics')}),
  },
})
