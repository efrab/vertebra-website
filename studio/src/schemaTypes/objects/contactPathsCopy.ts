import {defineField, defineType} from 'sanity'
import {localizedStringField} from '../fields/localizedFields'

export default defineType({
  name: 'contactPathsCopy',
  title: 'Contact paths copy',
  type: 'object',
  fields: [
    localizedStringField('meetingTitle', 'Meeting column title'),
    localizedStringField('meetingEyebrow', 'Meeting column eyebrow'),
    localizedStringField('formTitle', 'Form column title'),
    localizedStringField('formEyebrow', 'Form column eyebrow'),
    defineField({
      name: 'meetingImage',
      title: 'Meeting column fallback image',
      type: 'image',
      options: {hotspot: true},
    }),
  ],
})
