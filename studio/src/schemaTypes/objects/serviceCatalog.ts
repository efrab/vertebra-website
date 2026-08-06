import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'serviceCatalog',
  title: 'Service catalog',
  type: 'object',
  fields: [
    defineField({
      name: 'categories',
      title: 'Service categories',
      type: 'array',
      of: [defineArrayMember({type: 'serviceCategory'})],
      validation: (Rule) => Rule.required().min(1).max(2),
    }),
  ],
  preview: {
    prepare: () => ({title: 'Service catalog'}),
  },
})
