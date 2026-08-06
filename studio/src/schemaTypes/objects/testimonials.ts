import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'testimonials',
  title: 'Testimonials',
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
            defineField({name: 'quote', type: 'text'}),
            defineField({name: 'author', type: 'string'}),
            defineField({name: 'role', type: 'string'}),
            defineField({name: 'company', type: 'string'}),
            defineField({name: 'avatar', type: 'image'}),
          ],
        }),
      ],
    }),
  ],
})
