import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'formSection',
  title: 'Form section',
  type: 'object',
  fields: [
    defineField({name: 'heading', type: 'string'}),
    defineField({name: 'description', type: 'text'}),
    defineField({name: 'formId', type: 'string'}),
    defineField({
      name: 'variant',
      type: 'string',
      options: {list: ['agenda', 'contact', 'landing', 'pricing']},
    }),
  ],
})
