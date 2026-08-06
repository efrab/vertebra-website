import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'securityFeatures',
  title: 'Security features',
  type: 'object',
  fields: [
    defineField({name: 'heading', type: 'string'}),
    defineField({
      name: 'items',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'title', type: 'string'}),
            defineField({name: 'description', type: 'text'}),
            defineField({name: 'icon', type: 'image'}),
          ],
        }),
      ],
    }),
  ],
})
