import {defineArrayMember, defineField, defineType} from 'sanity'
import {localizedPreviewValue} from '../../lib/localized'

export default defineType({
  name: 'testimonials',
  title: 'Testimonials',
  type: 'object',
  fields: [
    defineField({name: 'eyebrow', type: 'internationalizedArrayString'}),
    defineField({name: 'heading', type: 'internationalizedArrayText'}),
    defineField({
      name: 'items',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'quote', type: 'internationalizedArrayText'}),
            defineField({name: 'author', type: 'internationalizedArrayString'}),
            defineField({name: 'role', type: 'internationalizedArrayString'}),
            defineField({name: 'company', type: 'internationalizedArrayString'}),
            defineField({name: 'avatar', type: 'image', title: 'Avatar (optional CMS upload)'}),
            defineField({name: 'avatarSrc', type: 'string', title: 'Avatar image path'}),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {title: 'heading'},
    prepare: ({title}) => ({title: localizedPreviewValue(title, 'Testimonials')}),
  },
})
