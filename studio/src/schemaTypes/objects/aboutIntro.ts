import {defineArrayMember, defineField, defineType} from 'sanity'
import {localizedPreviewValue} from '../../lib/localized'

export default defineType({
  name: 'aboutIntro',
  title: 'About intro',
  type: 'object',
  fields: [
    defineField({name: 'heading', type: 'internationalizedArrayText'}),
    defineField({name: 'description', type: 'internationalizedArrayText'}),
    defineField({
      name: 'logos',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'name', type: 'string'}),
            defineField({name: 'src', type: 'string', title: 'Image path'}),
            defineField({name: 'image', type: 'image', title: 'Image (optional CMS upload)'}),
          ],
          preview: {
            select: {title: 'name', media: 'image'},
            prepare: ({title, media}) => ({title: title || 'Logo', media}),
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {title: 'heading'},
    prepare: ({title}) => ({title: localizedPreviewValue(title, 'About intro')}),
  },
})
