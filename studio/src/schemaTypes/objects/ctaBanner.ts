import {defineField, defineType} from 'sanity'
import {localizedPreviewValue} from '../../lib/localized'
import {localizedStringField, localizedTextField} from '../fields/localizedFields'

export default defineType({
  name: 'ctaBanner',
  title: 'CTA banner',
  type: 'object',
  fields: [
    defineField({
      name: 'variant',
      title: 'Content treatment',
      type: 'string',
      initialValue: 'default',
      options: {
        list: [
          {title: 'Default', value: 'default'},
          {title: 'Recruitment', value: 'recruitment'},
          {title: 'Services', value: 'services'},
        ],
        layout: 'radio',
      },
    }),
    localizedStringField('heading', 'Heading', {validation: (Rule) => Rule.required()}),
    localizedTextField('subheading', 'Subheading'),
    defineField({name: 'cta', title: 'CTA', type: 'cta'}),
    defineField({name: 'secondaryCta', title: 'Secondary CTA', type: 'cta'}),
    defineField({name: 'decorLeft', title: 'Left decoration', type: 'image'}),
    defineField({name: 'decorRight', title: 'Right decoration', type: 'image'}),
  ],
  preview: {
    select: {title: 'heading'},
    prepare: ({title}) => ({
      title: localizedPreviewValue(title, 'CTA banner'),
    }),
  },
})
