import {defineField, defineType} from 'sanity'
import {localizedPreviewValue} from '../../lib/localized'
import {localizedStringField, localizedTextField} from '../fields/localizedFields'

export default defineType({
  name: 'splitStatement',
  title: 'Split statement',
  type: 'object',
  fields: [
    defineField({
      name: 'variant',
      title: 'Layout',
      type: 'string',
      initialValue: 'default',
      options: {
        list: [
          {title: 'Default', value: 'default'},
          {title: 'Method intro', value: 'methodIntro'},
          {title: 'Success banner', value: 'successBanner'},
        ],
        layout: 'radio',
      },
    }),
    localizedStringField('eyebrow', 'Eyebrow'),
    localizedStringField('heading', 'Heading', {validation: (Rule) => Rule.required()}),
    localizedTextField('body', 'Body', {validation: (Rule) => Rule.required()}),
    defineField({
      name: 'image',
      title: 'Background image',
      type: 'image',
      options: {hotspot: true},
      hidden: ({parent}) => parent?.variant !== 'successBanner',
    }),
    defineField({
      name: 'decoration',
      title: 'Decoration',
      type: 'string',
      options: {list: [{title: 'Magenta glow', value: 'magentaGlow'}]},
      hidden: ({parent}) => parent?.variant !== 'default',
    }),
  ],
  preview: {
    select: {title: 'heading', subtitle: 'eyebrow'},
    prepare: ({title, subtitle}) => ({
      title: localizedPreviewValue(title, 'Split statement'),
      subtitle: localizedPreviewValue(subtitle),
    }),
  },
})
