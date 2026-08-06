import {defineField, defineType} from 'sanity'
import {localizedPreviewValue} from '../../lib/localized'
import {localizedStringField, localizedTextField} from '../fields/localizedFields'

export default defineType({
  name: 'aboutStory',
  title: 'About story',
  type: 'object',
  fields: [
    localizedStringField('heading', 'Heading', {validation: (Rule) => Rule.required()}),
    localizedTextField('body', 'Body', {validation: (Rule) => Rule.required()}),
    localizedStringField('purposeTitle', 'Purpose title', {validation: (Rule) => Rule.required()}),
    localizedTextField('purposeBody', 'Purpose body', {validation: (Rule) => Rule.required()}),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', type: 'string', title: 'Alt text'})],
    }),
  ],
  preview: {
    select: {title: 'heading'},
    prepare: ({title}) => ({
      title: localizedPreviewValue(title, 'About story'),
    }),
  },
})
