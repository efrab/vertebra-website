import {BookIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {localizedPreviewValue} from '../../lib/localized'
import {
  localizedPortableTextField,
  localizedSlugField,
  localizedStringField,
  localizedTextField,
} from '../fields/localizedFields'

export default defineType({
  name: 'insight',
  title: 'Insight',
  type: 'document',
  icon: BookIcon,
  fields: [
    localizedStringField('title', 'Title', {validation: (Rule) => Rule.required()}),
    localizedSlugField,
    localizedTextField('excerpt', 'Excerpt', {rows: 3}),
    defineField({
      name: 'contentType',
      title: 'Content type',
      type: 'string',
      initialValue: 'article',
      options: {
        list: [
          {title: 'Article', value: 'article'},
          {title: 'Downloadable guide', value: 'guide'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'object',
      fields: [
        defineField({name: 'name', title: 'Name', type: 'string'}),
        defineField({name: 'role', title: 'Role', type: 'string'}),
      ],
    }),
    defineField({
      name: 'readTimeMinutes',
      title: 'Read time (minutes)',
      type: 'number',
      validation: (Rule) => Rule.min(1).max(60),
    }),
    defineField({
      name: 'downloadUrl',
      title: 'Download URL',
      type: 'url',
      description: 'Optional link for downloadable guides',
      hidden: ({parent}) => parent?.contentType !== 'guide',
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
    defineField({
      name: 'cover',
      title: 'Cover',
      type: 'image',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', type: 'string', title: 'Alt text'})],
    }),
    localizedPortableTextField('body', 'Body'),
    defineField({
      name: 'related',
      title: 'Related insights',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'insight'}]}],
    }),
    defineField({name: 'seo', title: 'SEO', type: 'seo'}),
  ],
  preview: {
    select: {title: 'title', media: 'cover'},
    prepare: ({title, media}) => ({
      title: localizedPreviewValue(title, 'Insight'),
      media,
    }),
  },
})
