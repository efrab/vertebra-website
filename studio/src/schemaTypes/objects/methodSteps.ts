import {defineArrayMember, defineField, defineType} from 'sanity'
import {localizedPreviewValue} from '../../lib/localized'
import {localizedStringField, localizedTextField} from '../fields/localizedFields'

export default defineType({
  name: 'methodSteps',
  title: 'Method steps',
  type: 'object',
  fields: [
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      initialValue: 'diagram',
      options: {
        list: [
          {title: 'Diagram', value: 'diagram'},
          {title: 'Grid', value: 'grid'},
        ],
        layout: 'radio',
      },
    }),
    localizedStringField('title', 'Title'),
    localizedTextField('intro', 'Intro'),
    localizedStringField('featuredTitle', 'Featured card title', {
      hidden: ({parent}) => parent?.layout !== 'grid',
    }),
    localizedTextField('featuredDescription', 'Featured card description', {
      hidden: ({parent}) => parent?.layout !== 'grid',
    }),
    defineField({
      name: 'diagramImage',
      title: 'Diagram image',
      type: 'image',
      hidden: ({parent}) => parent?.layout !== 'grid',
    }),
    defineField({
      name: 'showCta',
      title: 'Show CTA button',
      type: 'boolean',
      initialValue: true,
      hidden: ({parent}) => parent?.layout !== 'diagram',
    }),
    defineField({
      name: 'steps',
      title: 'Steps',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            localizedStringField('title', 'Title', {validation: (Rule) => Rule.required()}),
            localizedTextField('description', 'Description'),
          ],
          preview: {
            select: {title: 'title'},
            prepare: ({title}) => ({
              title: localizedPreviewValue(title, 'Step'),
            }),
          },
        }),
      ],
      validation: (Rule) =>
        Rule.custom((steps, context) => {
          const layout = (context.parent as {layout?: string} | undefined)?.layout
          if (layout === 'grid' && steps?.length !== 7) {
            return 'Grid layout requires exactly seven steps'
          }
          return true
        }),
    }),
  ],
  preview: {
    select: {title: 'title', layout: 'layout'},
    prepare: ({title, layout}) => ({
      title: localizedPreviewValue(title, 'Method steps'),
      subtitle: layout === 'grid' ? 'Grid layout' : 'Diagram layout',
    }),
  },
})
