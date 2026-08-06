import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'roiStats',
  title: 'ROI stats',
  type: 'object',
  fields: [
    defineField({name: 'heading', type: 'string'}),
    defineField({name: 'roiValue', type: 'string'}),
    defineField({name: 'roiLabel', type: 'string'}),
    defineField({name: 'description', type: 'text'}),
    defineField({
      name: 'stats',
      type: 'array',
      of: [defineArrayMember({type: 'object', fields: [defineField({name: 'label', type: 'string'})]})],
    }),
  ],
})
