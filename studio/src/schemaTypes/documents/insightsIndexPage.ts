import {BookIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import {localizedPreviewValue} from '../../lib/localized'
import {localizedStringField} from '../fields/localizedFields'

export default defineType({
  name: 'insightsIndexPage',
  title: 'Insights index',
  type: 'document',
  icon: BookIcon,
  fields: [
    localizedStringField('title', 'Title', {validation: (Rule) => Rule.required()}),
    defineField({name: 'hero', title: 'Hero', type: 'hero'}),
    defineField({name: 'newsletter', title: 'Newsletter', type: 'newsletterSection'}),
    defineField({name: 'bottomCta', title: 'Bottom CTA', type: 'ctaBanner'}),
    defineField({
      name: 'featuredInsight',
      title: 'Featured insight',
      type: 'reference',
      to: [{type: 'insight'}],
    }),
    defineField({name: 'seo', title: 'SEO', type: 'seo'}),
  ],
  preview: {
    select: {title: 'title'},
    prepare: ({title}) => ({
      title: localizedPreviewValue(title, 'Insights'),
    }),
  },
})
