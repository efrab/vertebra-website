import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'solutionsByRole',
  title: 'Solutions by role',
  type: 'object',
  fields: [
    defineField({name: 'eyebrow', type: 'string'}),
    defineField({name: 'heading', type: 'string'}),
    defineField({
      name: 'roles',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'title', type: 'string'}),
            defineField({name: 'description', type: 'text'}),
            defineField({name: 'image', type: 'image'}),
          ],
        }),
      ],
    }),
  ],
})
