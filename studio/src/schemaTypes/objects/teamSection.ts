import {defineArrayMember, defineField, defineType} from 'sanity'
import {localizedPreviewValue} from '../../lib/localized'

export default defineType({
  name: 'teamSection',
  title: 'Team section',
  type: 'object',
  fields: [
    defineField({name: 'heading', type: 'internationalizedArrayText'}),
    defineField({
      name: 'members',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'name', type: 'internationalizedArrayString'}),
            defineField({name: 'role', type: 'internationalizedArrayString'}),
            defineField({name: 'bio', type: 'internationalizedArrayText'}),
            defineField({name: 'imageSrc', type: 'string', title: 'Photo path'}),
            defineField({name: 'imageSrcSet', type: 'string', title: 'Photo srcset'}),
            defineField({name: 'photo', type: 'image'}),
            defineField({name: 'linkedInUrl', type: 'url'}),
            defineField({name: 'linkedinUrl', type: 'url', title: 'LinkedIn URL (alias)'}),
          ],
          preview: {
            select: {title: 'name', subtitle: 'role'},
            prepare: ({title, subtitle}) => ({
              title: localizedPreviewValue(title, 'Member'),
              subtitle: localizedPreviewValue(subtitle),
            }),
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {title: 'heading'},
    prepare: ({title}) => ({title: localizedPreviewValue(title, 'Team section')}),
  },
})
