import {defineArrayMember, defineField, defineType} from 'sanity'
import {localizedPreviewValue} from '../../lib/localized'
import {localizedStringField, localizedTextField} from '../fields/localizedFields'

export default defineType({
  name: 'teamCards',
  title: 'Team cards',
  type: 'object',
  fields: [
    localizedStringField('heading', 'Heading', {validation: (Rule) => Rule.required()}),
    localizedTextField('intro', 'Introduction'),
    defineField({
      name: 'members',
      title: 'Team members',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            localizedStringField('name', 'Name', {validation: (Rule) => Rule.required()}),
            localizedStringField('role', 'Role', {validation: (Rule) => Rule.required()}),
            localizedTextField('bio', 'Bio', {validation: (Rule) => Rule.required()}),
            defineField({
              name: 'photo',
              title: 'Photo',
              type: 'image',
              options: {hotspot: true},
              fields: [defineField({name: 'alt', type: 'string', title: 'Alt text'})],
            }),
            defineField({
              name: 'linkedInUrl',
              title: 'LinkedIn URL',
              type: 'url',
              validation: (Rule) =>
                Rule.uri({scheme: ['http', 'https']}).warning('Use a full https:// URL'),
            }),
          ],
          preview: {
            select: {title: 'name', subtitle: 'role', media: 'photo'},
            prepare: ({title, subtitle, media}) => ({
              title: localizedPreviewValue(title, 'Team member'),
              subtitle: localizedPreviewValue(subtitle),
              media,
            }),
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {title: 'heading'},
    prepare: ({title}) => ({
      title: localizedPreviewValue(title, 'Team cards'),
    }),
  },
})
