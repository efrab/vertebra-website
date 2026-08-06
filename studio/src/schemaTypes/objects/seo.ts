import {defineField, defineType} from 'sanity'
import {localizedStringField, localizedTextField} from '../fields/localizedFields'

export default defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    localizedStringField('metaTitle', 'Meta title', {
      description: 'Shown in search results and browser tabs. Keep under 60 characters.',
      validation: (Rule) =>
        Rule.max(60).warning('Meta titles over 60 characters may be truncated.'),
    }),
    localizedTextField('metaDescription', 'Meta description', {
      description: 'Summary for search engines and social previews. Aim for 120–160 characters.',
      validation: (Rule) =>
        Rule.max(160).warning('Meta descriptions over 160 characters may be truncated.'),
    }),
    defineField({
      name: 'ogImage',
      title: 'Social share image',
      description: 'Recommended 1200×630 px. Used for Open Graph and Twitter cards.',
      type: 'image',
      options: {hotspot: true},
    }),
  ],
  options: {
    collapsible: true,
    collapsed: true,
  },
})
