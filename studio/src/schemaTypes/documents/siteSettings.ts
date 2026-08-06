import {CogIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {localizedPreviewValue} from '../../lib/localized'
import {localizedStringField, localizedTextField} from '../fields/localizedFields'

export default defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    localizedStringField('title', 'Site title'),
    defineField({
      name: 'whatsapp',
      title: 'WhatsApp URL',
      type: 'url',
      validation: (Rule) => Rule.uri({scheme: ['https', 'http']}),
    }),
    defineField({
      name: 'nav',
      title: 'Navigation (legacy)',
      type: 'array',
      hidden: true,
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'label', title: 'Label', type: 'string'}),
            defineField({name: 'link', title: 'Link', type: 'link'}),
          ],
          preview: {select: {title: 'label'}},
        }),
      ],
    }),
    defineField({
      name: 'navGroups',
      title: 'Navigation groups',
      type: 'array',
      of: [{type: 'navGroup'}],
    }),
    defineField({
      name: 'footer',
      title: 'Footer',
      type: 'object',
      fields: [
        localizedTextField('tagline', 'Tagline', {rows: 2}),
        defineField({
          name: 'links',
          title: 'Links',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                localizedStringField('label', 'Label'),
                defineField({name: 'link', title: 'Link', type: 'link'}),
              ],
              preview: {
                select: {label: 'label'},
                prepare: ({label}) => ({
                  title: localizedPreviewValue(label, 'Link'),
                }),
              },
            }),
          ],
        }),
        defineField({
          name: 'socialLinks',
          title: 'Social links',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                localizedStringField('label', 'Label'),
                defineField({name: 'link', title: 'Link', type: 'link'}),
              ],
              preview: {
                select: {label: 'label'},
                prepare: ({label}) => ({
                  title: localizedPreviewValue(label, 'Social'),
                }),
              },
            }),
          ],
        }),
        defineField({
          name: 'contactInfo',
          title: 'Contact info',
          type: 'object',
          fields: [
            defineField({name: 'email', title: 'Email', type: 'string'}),
            localizedStringField('whatsappLabel', 'WhatsApp label'),
            localizedTextField('address', 'Address', {rows: 2}),
          ],
        }),
        defineField({
          name: 'complaintsBookLink',
          title: 'Complaints book link',
          type: 'link',
        }),
      ],
    }),
    defineField({
      name: 'defaultSeo',
      title: 'Default SEO',
      type: 'seo',
    }),
  ],
  preview: {
    prepare: () => ({title: 'Site settings'}),
  },
})
