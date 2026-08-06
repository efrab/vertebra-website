import {BulbOutlineIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {localizedPreviewValue} from '../../lib/localized'
import {
  localizedSlugField,
  localizedStringField,
  localizedTextField,
} from '../fields/localizedFields'

export default defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  icon: BulbOutlineIcon,
  fields: [
    localizedStringField('title', 'Title', {validation: (Rule) => Rule.required()}),
    localizedSlugField,
    localizedTextField('summary', 'Summary', {rows: 3}),
    defineField({
      name: 'showInNav',
      title: 'Show in navigation',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'navOrder',
      title: 'Navigation order',
      type: 'number',
      hidden: ({parent}) => !parent?.showInNav,
    }),
    defineField({
      name: 'pageBuilder',
      title: 'Page builder',
      type: 'pageBuilder',
    }),
    defineField({
      name: 'hero',
      title: 'Hero (legacy)',
      type: 'object',
      hidden: true,
      fields: [
        defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
        defineField({name: 'heading', title: 'Heading', type: 'string'}),
        defineField({name: 'subheading', title: 'Subheading', type: 'text', rows: 3}),
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
          options: {hotspot: true},
        }),
      ],
    }),
    defineField({
      name: 'pains',
      title: 'Pain points (legacy)',
      type: 'array',
      hidden: true,
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({
      name: 'processSteps',
      title: 'Process steps (legacy)',
      type: 'array',
      hidden: true,
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'title', title: 'Title', type: 'string'}),
            defineField({name: 'description', title: 'Description', type: 'text', rows: 3}),
          ],
        }),
      ],
    }),
    defineField({
      name: 'faq',
      title: 'FAQ (legacy)',
      type: 'array',
      hidden: true,
      of: [{type: 'faqItem'}],
    }),
    defineField({
      name: 'relatedCases',
      title: 'Related cases (legacy)',
      type: 'array',
      hidden: true,
      of: [{type: 'reference', to: [{type: 'caseStudy'}]}],
    }),
    defineField({name: 'seo', title: 'SEO', type: 'seo'}),
  ],
  preview: {
    select: {title: 'title'},
    prepare: ({title}) => ({
      title: localizedPreviewValue(title, 'Service'),
    }),
  },
})
