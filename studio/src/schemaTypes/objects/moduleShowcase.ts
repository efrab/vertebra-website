import {defineArrayMember, defineField, defineType} from 'sanity'
import {localizedPreviewValue} from '../../lib/localized'

const cardFields = [
  defineField({name: 'title', type: 'internationalizedArrayString'}),
  defineField({name: 'description', type: 'internationalizedArrayText'}),
  defineField({name: 'largeText', type: 'boolean'}),
]

const sectionFields = [
  defineField({name: 'title', type: 'internationalizedArrayString'}),
  defineField({name: 'description', type: 'internationalizedArrayText'}),
  defineField({name: 'imageSrc', type: 'string', title: 'Image / GIF path'}),
  defineField({name: 'imageSrcSet', type: 'string', title: 'Image srcset'}),
  defineField({
    name: 'cards',
    type: 'array',
    of: [
      defineArrayMember({
        type: 'object',
        fields: cardFields,
        preview: {
          select: {title: 'title', subtitle: 'description'},
          prepare: ({title, subtitle}) => ({
            title: localizedPreviewValue(title, 'Card'),
            subtitle: localizedPreviewValue(subtitle),
          }),
        },
      }),
    ],
  }),
]

export default defineType({
  name: 'moduleShowcase',
  title: 'Module showcase',
  type: 'object',
  fields: [
    defineField({name: 'heading', type: 'internationalizedArrayText'}),
    defineField({name: 'headerIconSrc', type: 'string', title: 'Header icon path'}),
    defineField({name: 'headerBgSrc', type: 'string', title: 'Header background path'}),
    defineField({name: 'headerBgSrcSet', type: 'string', title: 'Header background srcset'}),
    defineField({
      name: 'tabs',
      title: 'Module tabs',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'id', type: 'string'}),
            defineField({name: 'label', type: 'internationalizedArrayString'}),
            defineField({name: 'iconSrc', type: 'string', title: 'Tab icon path'}),
            defineField({name: 'heading', type: 'internationalizedArrayString'}),
            defineField({
              name: 'sections',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  fields: sectionFields,
                  preview: {
                    select: {title: 'title', mediaSrc: 'imageSrc'},
                    prepare: ({title, mediaSrc}) => ({
                      title: localizedPreviewValue(title, 'Section'),
                      subtitle: mediaSrc,
                    }),
                  },
                }),
              ],
            }),
            defineField({
              name: 'message',
              type: 'object',
              fields: [
                defineField({name: 'line', type: 'internationalizedArrayString'}),
                defineField({name: 'highlight', type: 'internationalizedArrayString'}),
              ],
            }),
          ],
          preview: {
            select: {title: 'label', id: 'id'},
            prepare: ({title, id}) => ({
              title: localizedPreviewValue(title, id || 'Tab'),
            }),
          },
        }),
      ],
    }),
    defineField({
      name: 'cta',
      title: 'Inline CTA',
      type: 'object',
      fields: [
        defineField({name: 'heading', type: 'internationalizedArrayText'}),
        defineField({name: 'description', type: 'internationalizedArrayText'}),
        defineField({name: 'bgSrc', type: 'string'}),
        defineField({name: 'bgSrcSet', type: 'string'}),
        defineField({
          name: 'primary',
          type: 'object',
          fields: [
            defineField({name: 'label', type: 'internationalizedArrayString'}),
            defineField({name: 'href', type: 'string'}),
          ],
        }),
        defineField({
          name: 'secondary',
          type: 'object',
          fields: [
            defineField({name: 'label', type: 'internationalizedArrayString'}),
            defineField({name: 'href', type: 'string'}),
          ],
        }),
      ],
    }),
    defineField({
      name: 'modules',
      title: 'Legacy flat modules',
      description: 'Prefer tabs above. Kept for older content.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'title', type: 'internationalizedArrayString'}),
            defineField({name: 'description', type: 'internationalizedArrayText'}),
            defineField({name: 'mediaSrc', type: 'string'}),
            defineField({
              name: 'mediaType',
              type: 'string',
              options: {list: ['video', 'image']},
            }),
          ],
          preview: {
            select: {title: 'title'},
            prepare: ({title}) => ({title: localizedPreviewValue(title, 'Module')}),
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {title: 'heading'},
    prepare: ({title}) => ({title: localizedPreviewValue(title, 'Module showcase')}),
  },
})
