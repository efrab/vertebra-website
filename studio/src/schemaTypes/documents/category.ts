import {TagIcon} from '@sanity/icons'
import {defineType} from 'sanity'
import {localizedPreviewValue} from '../../lib/localized'
import {localizedSlugField, localizedStringField} from '../fields/localizedFields'

export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: TagIcon,
  fields: [localizedStringField('title', 'Title', {validation: (Rule) => Rule.required()}), localizedSlugField],
  preview: {
    select: {title: 'title'},
    prepare: ({title}) => ({title: localizedPreviewValue(title, 'Category')}),
  },
})
