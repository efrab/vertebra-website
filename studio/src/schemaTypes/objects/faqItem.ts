import {defineType} from 'sanity'
import {localizedPreviewValue} from '../../lib/localized'
import {localizedStringField, localizedTextField} from '../fields/localizedFields'

export default defineType({
  name: 'faqItem',
  title: 'FAQ item',
  type: 'object',
  fields: [
    localizedStringField('question', 'Question', {validation: (Rule) => Rule.required()}),
    localizedTextField('answer', 'Answer', {validation: (Rule) => Rule.required()}),
  ],
  preview: {
    select: {title: 'question'},
    prepare: ({title}) => ({
      title: localizedPreviewValue(title, 'FAQ item'),
    }),
  },
})
