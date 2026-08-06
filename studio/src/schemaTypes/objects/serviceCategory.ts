import {defineArrayMember, defineField, defineType} from 'sanity'
import {IconPickerInput} from '../../components/IconPickerInput'
import {getCatalogPreviewPath, getIconPreviewUrl} from '../../lib/iconCatalog'
import {localizedPreviewValue} from '../../lib/localized'
import {localizedStringField, localizedTextField} from '../fields/localizedFields'

export default defineType({
  name: 'serviceCategory',
  title: 'Service category',
  type: 'object',
  fields: [
    localizedStringField('title', 'Title', {validation: (Rule) => Rule.required()}),
    localizedTextField('summary', 'Summary', {validation: (Rule) => Rule.required()}),
    defineField({name: 'cta', title: 'Category call to action', type: 'cta'}),
    defineField({
      name: 'items',
      title: 'Services',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'serviceCatalogItem',
          title: 'Service',
          type: 'object',
          fields: [
            localizedStringField('title', 'Title', {validation: (Rule) => Rule.required()}),
            localizedTextField('description', 'Description', {validation: (Rule) => Rule.required()}),
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
              initialValue: 'calendar',
              components: {input: IconPickerInput},
              options: {
                iconCatalog: 'serviceCatalog',
                list: [
                  {title: 'Calendar', value: 'calendar'},
                  {title: 'Planning', value: 'planning'},
                  {title: 'Finance', value: 'money'},
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({name: 'cta', title: 'Call to action', type: 'cta'}),
          ],
          preview: {
            select: {title: 'title', subtitle: 'description', icon: 'icon'},
            prepare: ({title, subtitle, icon}) => {
              const previewPath =
                typeof icon === 'string'
                  ? getCatalogPreviewPath('serviceCatalog', icon)
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
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'summary'},
    prepare: ({title, subtitle}) => ({
      title: localizedPreviewValue(title, 'Service category'),
      subtitle: localizedPreviewValue(subtitle),
    }),
  },
})
