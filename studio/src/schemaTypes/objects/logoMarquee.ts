import {defineArrayMember, defineField, defineType} from 'sanity'
import {localizedPreviewValue} from '../../lib/localized'
import {localizedStringField} from '../fields/localizedFields'

export default defineType({
  name: 'logoMarquee',
  title: 'Logo marquee',
  type: 'object',
  fields: [
    localizedStringField('title', 'Title'),
    defineField({
      name: 'logos',
      title: 'Logos',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            localizedStringField('name', 'Name', {validation: (Rule) => Rule.required()}),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {hotspot: true},
            }),
          ],
          preview: {
            select: {title: 'name', media: 'image'},
            prepare: ({title, media}) => ({
              title: localizedPreviewValue(title, 'Logo'),
              media,
            }),
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {title: 'title'},
    prepare: ({title}) => ({
      title: localizedPreviewValue(title, 'Logo marquee'),
    }),
  },
})
