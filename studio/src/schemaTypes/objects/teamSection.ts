import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'teamSection',
  title: 'Team section',
  type: 'object',
  fields: [
    defineField({name: 'heading', type: 'string'}),
    defineField({
      name: 'members',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'name', type: 'string'}),
            defineField({name: 'role', type: 'string'}),
            defineField({name: 'bio', type: 'text'}),
            defineField({name: 'image', type: 'image'}),
          ],
        }),
      ],
    }),
  ],
})
