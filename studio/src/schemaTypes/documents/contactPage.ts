import {EnvelopeIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {localizedPreviewValue} from '../../lib/localized'
import {
  localizedStringField,
} from '../fields/localizedFields'

export default defineType({
  name: 'contactPage',
  title: 'Contact page',
  type: 'document',
  icon: EnvelopeIcon,
  fields: [
    localizedStringField('title', 'Title', {validation: (Rule) => Rule.required()}),
    defineField({name: 'hero', title: 'Hero', type: 'hero'}),
    defineField({name: 'paths', title: 'Paths copy', type: 'contactPathsCopy'}),
    localizedStringField('channelsHeading', 'Channels heading'),
    defineField({
      name: 'channels',
      title: 'Channels',
      type: 'array',
      of: [{type: 'contactChannelItem'}],
    }),
    localizedStringField('reasonsHeading', 'Reasons heading'),
    defineField({
      name: 'reasons',
      title: 'Reasons',
      type: 'array',
      of: [{type: 'contactReasonItem'}],
    }),
    defineField({name: 'faq', title: 'FAQ', type: 'faqSection'}),
    defineField({
      name: 'interestOptions',
      title: 'Form interest options',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'value', title: 'Value', type: 'string'}),
            localizedStringField('label', 'Label'),
          ],
          preview: {
            select: {label: 'label'},
            prepare: ({label}) => ({
              title: localizedPreviewValue(label, 'Option'),
            }),
          },
        }),
      ],
    }),
    defineField({name: 'seo', title: 'SEO', type: 'seo'}),
  ],
  preview: {
    select: {title: 'title'},
    prepare: ({title}) => ({
      title: localizedPreviewValue(title, 'Contact'),
    }),
  },
})
