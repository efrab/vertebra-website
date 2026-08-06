import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'trustLogos',
  title: 'Trust logos',
  type: 'object',
  fields: [
    defineField({name: 'heading', type: 'string'}),
    defineField({
      name: 'logos',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'name', type: 'string'}),
            defineField({name: 'image', type: 'image'}),
          ],
        }),
      ],
    }),
  ],
})
