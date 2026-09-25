import {CheckmarkCircleIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import {localizedPreviewValue} from '../../lib/localized'
import {localizedStringField, localizedTextField} from '../fields/localizedFields'

export default defineType({
  name: 'thankYouPage',
  title: 'Thank you page',
  type: 'document',
  icon: CheckmarkCircleIcon,
  fields: [
    localizedStringField('title', 'Title', {validation: (Rule) => Rule.required()}),
    localizedTextField('heroHeading', 'Hero heading', {rows: 3}),
    localizedTextField('heroMessage', 'Hero message', {rows: 3}),
    defineField({
      name: 'heroImage',
      title: 'Hero image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({name: 'cta', title: 'CTA banner', type: 'ctaBanner'}),
    defineField({name: 'seo', title: 'SEO', type: 'seo'}),
  ],
  preview: {
    select: {title: 'title'},
    prepare: ({title}) => ({
      title: localizedPreviewValue(title, 'Thank you'),
    }),
  },
})
