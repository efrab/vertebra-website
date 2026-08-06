import {DocumentTextIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import {localizedPreviewValue} from '../../lib/localized'
import {
  localizedPortableTextField,
  localizedSlugField,
  localizedStringField,
} from '../fields/localizedFields'

export default defineType({
  name: 'legalPage',
  title: 'Legal page',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    localizedStringField('title', 'Title', {validation: (Rule) => Rule.required()}),
    localizedSlugField,
    localizedPortableTextField('body', 'Body'),
    defineField({name: 'seo', title: 'SEO', type: 'seo'}),
  ],
  preview: {
    select: {title: 'title'},
    prepare: ({title}) => ({
      title: localizedPreviewValue(title, 'Legal'),
    }),
  },
})
