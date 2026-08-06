import {defineType} from 'sanity'
import {localizedPreviewValue} from '../../lib/localized'
import {localizedStringField, localizedTextField} from '../fields/localizedFields'

export default defineType({
  name: 'newsletterSection',
  title: 'Newsletter section',
  type: 'object',
  fields: [
    localizedStringField('heading', 'Heading'),
    localizedTextField('intro', 'Intro'),
  ],
  preview: {
    select: {title: 'heading'},
    prepare: ({title}) => ({
      title: localizedPreviewValue(title, 'Newsletter'),
    }),
  },
})
