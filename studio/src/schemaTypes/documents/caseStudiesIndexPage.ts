import {DocumentsIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'caseStudiesIndexPage',
  title: 'Case studies index',
  type: 'document',
  icon: DocumentsIcon,
  fields: [
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'hero', title: 'Hero', type: 'hero'}),
    defineField({name: 'bottomCta', title: 'Bottom CTA', type: 'ctaBanner'}),
    defineField({
      name: 'featuredCase',
      title: 'Featured case study',
      type: 'reference',
      to: [{type: 'caseStudy'}],
    }),
    defineField({name: 'seo', title: 'SEO', type: 'seo'}),
  ],
  preview: {
    select: {title: 'title', language: 'language'},
    prepare: ({title, language}) => ({
      title: title || 'Case studies',
      subtitle: language?.toUpperCase(),
    }),
  },
})
