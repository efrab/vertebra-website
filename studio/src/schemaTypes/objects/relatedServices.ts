import {defineArrayMember, defineField, defineType} from 'sanity'
import {IconPickerInput} from '../../components/IconPickerInput'
import {getCatalogPreviewPath, getIconPreviewUrl} from '../../lib/iconCatalog'
import {localizedPreviewValue} from '../../lib/localized'
import {localizedStringField, localizedTextField} from '../fields/localizedFields'

export default defineType({
  name: 'relatedServices',
  title: 'Related services',
  type: 'object',
  fields: [
    localizedStringField('heading', 'Heading', {validation: (Rule) => Rule.required()}),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            localizedStringField('title', 'Title', {validation: (Rule) => Rule.required()}),
            localizedTextField('description', 'Description'),
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
              components: {input: IconPickerInput},
              options: {
                iconCatalog: 'relatedServices',
                list: [
                  {title: 'Calendar', value: 'calendar'},
                  {title: 'Planning', value: 'planning'},
                  {title: 'Money', value: 'money'},
                ],
              },
            }),
            defineField({name: 'cta', title: 'Link', type: 'cta'}),
          ],
          preview: {
            select: {title: 'title', subtitle: 'description', icon: 'icon'},
            prepare: ({title, subtitle, icon}) => {
              const previewPath =
                typeof icon === 'string'
                  ? getCatalogPreviewPath('relatedServices', icon)
                  : undefined
              return {
                title: localizedPreviewValue(title, 'Service'),
                subtitle: localizedPreviewValue(subtitle),
                media: previewPath ? getIconPreviewUrl(previewPath) : undefined,
              }
            },
          },
        }),
      ],
      validation: (Rule) => Rule.max(3),
    }),
  ],
  preview: {
    select: {title: 'heading'},
    prepare: ({title}) => ({
      title: localizedPreviewValue(title, 'Related services'),
    }),
  },
})
