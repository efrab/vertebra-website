import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'heroHome',
  title: 'Hero home',
  type: 'object',
  fields: [
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
    defineField({name: 'heading', title: 'Heading', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'subheading', title: 'Subheading', type: 'text'}),
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
    prepare: ({title}) => ({title: title || 'Hero home'}),
  },
})
