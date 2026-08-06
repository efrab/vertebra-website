import {defineArrayMember, defineField, defineType} from 'sanity'
import {IconPickerInput} from '../../components/IconPickerInput'
import {getCatalogPreviewPath, getIconPreviewUrl} from '../../lib/iconCatalog'
import {localizedPreviewValue} from '../../lib/localized'
import {localizedStringField} from '../fields/localizedFields'

export default defineType({
  name: 'metrics',
  title: 'Metrics',
  type: 'object',
  fields: [
    localizedStringField('title', 'Title'),
    defineField({
      name: 'columns',
      title: 'Columns',
      type: 'number',
      initialValue: 3,
      options: {
        list: [
          {title: '3 columns', value: 3},
          {title: '4 columns', value: 4},
        ],
      },
    }),
    defineField({
      name: 'items',
      title: 'Metrics',
      type: 'array',
      validation: (Rule) =>
        Rule.custom((items, context) => {
          const columns = (context.parent as {columns?: number} | undefined)?.columns ?? 3
          const max = columns === 4 ? 4 : 3
          if ((items?.length ?? 0) > max) {
            return `This layout supports up to ${max} metrics`
          }
          return true
        }),
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            localizedStringField('value', 'Value', {validation: (Rule) => Rule.required()}),
            localizedStringField('label', 'Label', {validation: (Rule) => Rule.required()}),
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
              components: {input: IconPickerInput},
              options: {
                iconCatalog: 'metrics',
                list: [
                  {title: 'Calendar', value: 'calendar'},
                  {title: 'Process', value: 'process'},
                  {title: 'Cost', value: 'cost'},
                ],
              },
            }),
          ],
          preview: {
            select: {title: 'value', subtitle: 'label', icon: 'icon'},
            prepare: ({title, subtitle, icon}) => {
              const previewPath =
                typeof icon === 'string' ? getCatalogPreviewPath('metrics', icon) : undefined
              return {
                title: localizedPreviewValue(title, 'Metric'),
                subtitle: localizedPreviewValue(subtitle),
                media: previewPath ? getIconPreviewUrl(previewPath) : undefined,
              }
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {title: 'title'},
    prepare: ({title}) => ({
      title: localizedPreviewValue(title, 'Metrics'),
    }),
  },
})
