import {defineType} from 'sanity'
import {localizedPreviewValue} from '../../lib/localized'
import {localizedStringField, localizedTextField} from '../fields/localizedFields'

export default defineType({
  name: 'contactFormSection',
  title: 'Contact form',
  type: 'object',
  fields: [
    localizedStringField('title', 'Title'),
    localizedTextField('intro', 'Intro'),
  ],
  preview: {
    select: {title: 'title'},
    prepare: ({title}) => ({
      title: localizedPreviewValue(title, 'Contact form'),
    }),
  },
})
