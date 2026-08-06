import {defineField, defineType} from 'sanity'
import {localizedPreviewValue} from '../../lib/localized'
import {localizedStringField, localizedTextField} from '../fields/localizedFields'

export default defineType({
  name: 'contactReasonItem',
  title: 'Contact reason card',
  type: 'object',
  fields: [
    defineField({
      name: 'tone',
      title: 'Tone',
      type: 'string',
      options: {
        list: [
          {title: 'Magenta', value: 'magenta'},
          {title: 'Teal', value: 'teal'},
          {title: 'Navy', value: 'navyDeep'},
        ],
        layout: 'radio',
      },
      initialValue: 'magenta',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', type: 'string', title: 'Alt text'})],
    }),
    localizedStringField('title', 'Title'),
    localizedTextField('description', 'Description'),
  ],
  preview: {
    select: {title: 'title', subtitle: 'tone'},
    prepare: ({title, subtitle}) => ({
      title: localizedPreviewValue(title, 'Reason'),
      subtitle,
    }),
  },
})
