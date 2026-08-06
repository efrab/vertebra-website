import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'moduleShowcase',
  title: 'Module showcase',
  type: 'object',
  fields: [
    defineField({name: 'heading', type: 'string'}),
    defineField({
      name: 'modules',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'title', type: 'string'}),
            defineField({name: 'description', type: 'text'}),
            defineField({name: 'mediaSrc', type: 'string'}),
            defineField({
              name: 'mediaType',
              type: 'string',
              options: {list: ['video', 'image']},
            }),
          ],
        }),
      ],
    }),
  ],
})
