import {defineField, defineType} from 'sanity'
import {localizedPreviewValue} from '../../lib/localized'
import {localizedStringField, localizedTextField} from '../fields/localizedFields'

export default defineType({
  name: 'serviceSplit',
  title: 'Service split',
  type: 'object',
  fields: [
    localizedStringField('title', 'Title'),
    localizedTextField('intro', 'Intro'),
    defineField({
      name: 'cardImages',
      title: 'Card background images',
      description: 'Two background images for the cards (left, right).',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
      validation: (Rule) => Rule.max(2),
    }),
    defineField({
      name: 'cards',
      title: 'Cards',
      description: 'Two cards linking to Reclutamiento and Servicios (index page).',
      type: 'array',
      of: [{type: 'serviceSplitCard'}],
      validation: (Rule) => Rule.max(2),
    }),
  ],
  preview: {
    select: {title: 'title'},
    prepare: ({title}) => ({
      title: localizedPreviewValue(title, 'Service split'),
    }),
  },
})
