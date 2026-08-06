import {UsersIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import {localizedPreviewValue} from '../../lib/localized'
import {localizedStringField} from '../fields/localizedFields'

export default defineType({
  name: 'aboutPage',
  title: 'About page',
  type: 'document',
  icon: UsersIcon,
  fields: [
    localizedStringField('title', 'Title', {validation: (Rule) => Rule.required()}),
    defineField({
      name: 'pageBuilder',
      title: 'Page builder',
      type: 'pageBuilder',
    }),
    defineField({name: 'seo', title: 'SEO', type: 'seo'}),
  ],
  preview: {
    select: {title: 'title'},
    prepare: ({title}) => ({
      title: localizedPreviewValue(title, 'About'),
    }),
  },
})
