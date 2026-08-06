import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'benefitsGrid',
  title: 'Benefits grid',
  type: 'object',
  fields: [
    defineField({name: 'eyebrow', type: 'string'}),
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
