import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'howItWorks',
  title: 'How it works',
  type: 'object',
  fields: [
    defineField({name: 'eyebrow', type: 'internationalizedArrayString'}),
    defineField({name: 'heading', type: 'internationalizedArrayText'}),
    defineField({
      name: 'steps',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'number', type: 'string'}),
            defineField({name: 'title', type: 'internationalizedArrayString'}),
            defineField({name: 'description', type: 'internationalizedArrayText'}),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {title: 'heading'},
    prepare: ({title}) => ({title: Array.isArray(title) ? title[0]?.value || 'How it works' : 'How it works'}),
  },
})
