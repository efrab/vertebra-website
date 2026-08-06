import {defineArrayMember, defineField, defineType} from 'sanity'
import {localizedPreviewValue} from '../../lib/localized'
import {localizedStringField} from '../fields/localizedFields'

export default defineType({
  name: 'serviceIncludes',
  title: 'Service includes',
  type: 'object',
  fields: [
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      initialValue: 'splitImage',
      options: {
        list: [
          {title: 'Dual columns', value: 'dualColumns'},
          {title: 'Split with image', value: 'splitImage'},
        ],
        layout: 'radio',
      },
    }),
    localizedStringField('heading', 'Heading'),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [defineArrayMember({type: 'internationalizedArrayString'})],
      validation: (Rule) => Rule.min(1),
    }),
    localizedStringField('secondaryHeading', 'Secondary heading', {
      hidden: ({parent}) => parent?.layout !== 'dualColumns',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const layout = (context.parent as {layout?: string} | undefined)?.layout
          if (layout === 'dualColumns' && !value) {
            return 'Secondary heading is required for dual columns layout'
          }
          return true
        }),
    }),
    defineField({
      name: 'secondaryItems',
      title: 'Secondary items',
      type: 'array',
      of: [defineArrayMember({type: 'internationalizedArrayString'})],
      hidden: ({parent}) => parent?.layout !== 'dualColumns',
      validation: (Rule) =>
        Rule.custom((items, context) => {
          const layout = (context.parent as {layout?: string} | undefined)?.layout
          if (layout === 'dualColumns' && (!items || items.length < 1)) {
            return 'At least one secondary item is required for dual columns layout'
          }
          return true
        }),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      hidden: ({parent}) => parent?.layout !== 'splitImage',
      fields: [defineField({name: 'alt', type: 'string', title: 'Alt text'})],
    }),
  ],
  preview: {
    select: {title: 'heading', layout: 'layout'},
    prepare: ({title, layout}) => ({
      title: localizedPreviewValue(title, 'Service includes'),
      subtitle: layout,
    }),
  },
})
