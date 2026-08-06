import {DocumentTextIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import {localizedPreviewValue} from '../../lib/localized'
import {localizedSlugField, localizedStringField, localizedTextField} from '../fields/localizedFields'

export default defineType({
  name: 'post',
  title: 'Blog post',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    localizedStringField('title', 'Title', {validation: (Rule) => Rule.required()}),
    localizedSlugField,
    localizedTextField('excerpt', 'Excerpt'),
    defineField({name: 'featuredImage', type: 'image'}),
    defineField({
      name: 'categories',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'category'}]}],
    }),
    defineField({name: 'body', type: 'portableText'}),
    defineField({name: 'publishedAt', type: 'datetime'}),
    defineField({name: 'featured', type: 'boolean', initialValue: false}),
    defineField({name: 'seo', type: 'seo'}),
  ],
  preview: {
    select: {title: 'title', media: 'featuredImage'},
    prepare: ({title, media}) => ({
      title: localizedPreviewValue(title, 'Post'),
      media,
    }),
  },
})
