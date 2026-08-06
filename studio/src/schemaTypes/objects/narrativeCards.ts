import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'narrativeCards',
  title: 'Narrative cards',
  type: 'object',
  fields: [
    defineField({
      name: 'cards',
      title: 'Cards',
      type: 'array',
      of: [defineArrayMember({type: 'contentCard'})],
      validation: (Rule) => Rule.required().min(2).max(2),
    }),
  ],
  preview: {
    prepare: () => ({title: 'Narrative cards'}),
  },
})
