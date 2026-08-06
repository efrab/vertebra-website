import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'howItWorks',
  title: 'How it works',
  type: 'object',
  fields: [
    defineField({name: 'eyebrow', type: 'string'}),
    defineField({name: 'heading', type: 'string'}),
    defineField({
      name: 'steps',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'number', type: 'string'}),
            defineField({name: 'title', type: 'string'}),
            defineField({name: 'description', type: 'text'}),
          ],
        }),
      ],
    }),
  ],
})
