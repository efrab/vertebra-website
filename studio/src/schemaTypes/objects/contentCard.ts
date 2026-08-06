import {defineArrayMember, defineField, defineType} from 'sanity'
import {PresetImageIconInput} from '../../components/PresetImageIconInput'
import {localizedPreviewValue} from '../../lib/localized'
import {localizedStringField, localizedTextField} from '../fields/localizedFields'

export default defineType({
  name: 'contentCard',
  title: 'Content card',
  type: 'object',
  fields: [
    localizedStringField('title', 'Title', {validation: (Rule) => Rule.required()}),
    localizedTextField('description', 'Description'),
    localizedStringField('emphasis', 'Emphasized phrase', {
      description: 'Optional exact phrase from the title to highlight.',
    }),
    defineField({
      name: 'items',
      title: 'List items',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'contentCardItem',
          fields: [
            localizedStringField('text', 'Text', {validation: (Rule) => Rule.required()}),
          ],
          preview: {
            select: {title: 'text'},
            prepare: ({title}) => ({
              title: localizedPreviewValue(title, 'Item'),
            }),
          },
        }),
      ],
    }),
    defineField({
      name: 'tone',
      title: 'Semantic tone',
      type: 'string',
      options: {
        list: [
          {title: 'Dark', value: 'dark'},
          {title: 'Teal', value: 'teal'},
          {title: 'Brand', value: 'magenta'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'image',
      components: {input: PresetImageIconInput},
      options: {iconCatalog: 'contentCard'},
    }),
    defineField({name: 'cta', title: 'Call to action', type: 'cta'}),
  ],
  preview: {
    select: {title: 'title', subtitle: 'description', media: 'icon'},
    prepare: ({title, subtitle, media}) => ({
      title: localizedPreviewValue(title, 'Content card'),
      subtitle: localizedPreviewValue(subtitle),
      media,
    }),
  },
})
