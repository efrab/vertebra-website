import {defineArrayMember, defineField, defineType} from 'sanity'
import {localizedPreviewValue} from '../../lib/localized'
import {localizedStringField} from '../fields/localizedFields'

export default defineType({
  name: 'navGroup',
  title: 'Navigation group',
  type: 'object',
  fields: [
    localizedStringField('title', 'Group title'),
    defineField({
      name: 'items',
      title: 'Links',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            localizedStringField('label', 'Label'),
            defineField({name: 'link', title: 'Link', type: 'link'}),
          ],
          preview: {
            select: {title: 'label'},
            prepare: ({title}) => ({
              title: localizedPreviewValue(title, 'Link'),
            }),
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {title: 'title'},
    prepare: ({title}) => ({
      title: localizedPreviewValue(title, 'Nav group'),
    }),
  },
})
