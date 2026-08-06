import {defineField, defineType} from 'sanity'
import {localizedPreviewValue} from '../../lib/localized'
import {localizedStringField, localizedTextField} from '../fields/localizedFields'

export default defineType({
  name: 'caseCards',
  title: 'Case cards',
  type: 'object',
  fields: [
    defineField({
      name: 'variant',
      title: 'Content treatment',
      type: 'string',
      initialValue: 'carousel',
      options: {
        list: [
          {title: 'Carousel', value: 'carousel'},
          {title: 'Featured case', value: 'featured'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'showHeader',
      title: 'Show section header',
      type: 'boolean',
      initialValue: true,
    }),
    localizedStringField('title', 'Title'),
    localizedTextField('intro', 'Intro'),
    defineField({
      name: 'cases',
      title: 'Cases',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'caseStudy'}]}],
    }),
  ],
  preview: {
    select: {title: 'title'},
    prepare: ({title}) => ({
      title: localizedPreviewValue(title, 'Case cards'),
    }),
  },
})
