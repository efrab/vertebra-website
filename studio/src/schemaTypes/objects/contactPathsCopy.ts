import {defineField, defineType} from 'sanity'
import {localizedStringField, localizedTextField} from '../fields/localizedFields'

export default defineType({
  name: 'contactPathsCopy',
  title: 'Contact paths copy',
  type: 'object',
  fields: [
    localizedTextField('meetingTitle', 'Meeting column title', {rows: 3}),
    localizedStringField('meetingEyebrow', 'Meeting column eyebrow'),
    localizedTextField('formTitle', 'Form column title', {rows: 3}),
    localizedStringField('formEyebrow', 'Form column eyebrow'),
    defineField({
      name: 'meetingImage',
      title: 'Meeting column fallback image',
      type: 'image',
      options: {hotspot: true},
    }),
  ],
})
