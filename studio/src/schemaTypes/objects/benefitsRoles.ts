import {defineArrayMember, defineField, defineType} from 'sanity'
import {localizedPreviewValue} from '../../lib/localized'

export default defineType({
  name: 'benefitsRoles',
  title: 'Benefits by role',
  type: 'object',
  fields: [
    defineField({name: 'heading', type: 'internationalizedArrayText'}),
    defineField({name: 'subheading', type: 'internationalizedArrayText'}),
    defineField({
      name: 'cards',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'title', type: 'internationalizedArrayString'}),
            defineField({name: 'description', type: 'internationalizedArrayText'}),
            defineField({name: 'iconSrc', type: 'string', title: 'Icon path'}),
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
            prepare: ({title}) => ({title: localizedPreviewValue(title, 'Role card')}),
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {title: 'heading'},
    prepare: ({title}) => ({title: localizedPreviewValue(title, 'Benefits by role')}),
  },
})
