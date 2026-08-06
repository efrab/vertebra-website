import {defineArrayMember, defineField, defineType} from 'sanity'
import {localizedPreviewValue} from '../../lib/localized'
import {localizedStringField, localizedTextField} from '../fields/localizedFields'

export default defineType({
  name: 'processCards',
  title: 'Process cards',
  type: 'object',
  fields: [
    localizedStringField('heading', 'Heading', {validation: (Rule) => Rule.required()}),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      initialValue: 'accordionRow',
      options: {
        list: [
          {title: 'Accordion row (3 steps)', value: 'accordionRow'},
          {title: 'Accordion columns (4 steps)', value: 'accordionColumns'},
          {title: 'Accordion split (4 steps)', value: 'accordionSplit'},
          {title: 'Dual paths (2 steps)', value: 'dualPaths'},
          {title: 'Three mixed columns (legacy)', value: 'threeMixed'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'decorImage',
      title: 'Decoration image',
      type: 'image',
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
        Rule.min(2)
          .max(4)
          .custom((steps, context) => {
            const layout = (context.parent as {layout?: string} | undefined)?.layout
            if (layout === 'accordionRow' && steps && steps.length !== 3) {
              return 'Accordion row layout requires exactly 3 steps'
            }
            if (layout === 'dualPaths' && steps && steps.length !== 2) {
              return 'Dual paths layout requires exactly 2 steps'
            }
            if (
              (layout === 'accordionColumns' || layout === 'accordionSplit') &&
              steps &&
              steps.length !== 4
            ) {
              return 'This layout requires exactly 4 steps'
            }
            return true
          }),
    }),
  ],
  preview: {
    select: {title: 'heading', layout: 'layout'},
    prepare: ({title, layout}) => ({
      title: localizedPreviewValue(title, 'Process cards'),
      subtitle: layout,
    }),
  },
})
