import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'headerInternal',
  title: 'Internal header',
  type: 'object',
  fields: [
    defineField({name: 'eyebrow', type: 'string'}),
    defineField({name: 'heading', type: 'string'}),
    defineField({name: 'description', type: 'text'}),
    defineField({name: 'image', type: 'image'}),
  ],
})
