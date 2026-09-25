import {defineField, defineType} from 'sanity'
import {localizedPreviewValue} from '../../lib/localized'

export default defineType({
  name: 'heroHome',
  title: 'Hero home',
  type: 'object',
  fields: [
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'internationalizedArrayString'}),
    defineField({name: 'heading', title: 'Heading', type: 'internationalizedArrayText', validation: (r) => r.required()}),
    defineField({name: 'subheading', title: 'Subheading', type: 'internationalizedArrayText'}),
    defineField({name: 'primaryCta', title: 'Primary CTA', type: 'cta'}),
    defineField({name: 'videoSrc', title: 'Video src', type: 'string'}),
    defineField({name: 'posterImage', title: 'Poster', type: 'image'}),
    defineField({
      name: 'partnerLogos',
      title: 'Partner logos',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'name', type: 'string'}),
            defineField({name: 'image', type: 'image'}),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {title: 'heading'},
    prepare: ({title}) => ({title: localizedPreviewValue(title, 'Hero home')}),
  },
})
