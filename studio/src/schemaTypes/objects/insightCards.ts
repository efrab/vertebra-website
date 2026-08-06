import {defineField, defineType} from 'sanity'
import {localizedPreviewValue} from '../../lib/localized'
import {localizedStringField, localizedTextField} from '../fields/localizedFields'

export default defineType({
  name: 'insightCards',
  title: 'Insight cards',
  type: 'object',
  fields: [
    localizedStringField('title', 'Title'),
    localizedTextField('intro', 'Intro'),
    defineField({
      name: 'insights',
      title: 'Insights',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'insight'}]}],
    }),
  ],
  preview: {
    select: {title: 'title'},
    prepare: ({title}) => ({
      title: localizedPreviewValue(title, 'Insight cards'),
    }),
  },
})
