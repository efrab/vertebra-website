import {defineArrayMember, defineField, defineType} from 'sanity'
import {localizedPreviewValue} from '../../lib/localized'

export default defineType({
  name: 'roiStats',
  title: 'ROI stats',
  type: 'object',
  fields: [
    defineField({name: 'heading', type: 'internationalizedArrayText'}),
    defineField({name: 'roiValue', type: 'string'}),
    defineField({name: 'roiLabel', type: 'internationalizedArrayString'}),
    defineField({name: 'description', type: 'internationalizedArrayText'}),
    defineField({
      name: 'stats',
      type: 'array',
      of: [defineArrayMember({type: 'object', fields: [defineField({name: 'label', type: 'internationalizedArrayString'})]})],
    }),
  ],
  preview: {
    select: {title: 'heading'},
    prepare: ({title}) => ({title: localizedPreviewValue(title, 'ROI stats')}),
  },
})
