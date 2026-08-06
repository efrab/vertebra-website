import {defineField, defineType} from 'sanity'
import {PresetImageIconInput} from '../../components/PresetImageIconInput'
import {localizedPreviewValue} from '../../lib/localized'
import {localizedStringField} from '../fields/localizedFields'

export default defineType({
  name: 'contactChannelItem',
  title: 'Contact channel',
  type: 'object',
  fields: [
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'image',
      components: {input: PresetImageIconInput},
      options: {iconCatalog: 'contact'},
    }),
    localizedStringField('title', 'Title'),
    defineField({name: 'value', title: 'Value', type: 'string'}),
    defineField({
      name: 'href',
      title: 'Link (optional)',
      type: 'url',
      validation: (Rule) => Rule.uri({allowRelative: true, scheme: ['http', 'https', 'mailto', 'tel']}),
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'value', media: 'icon'},
    prepare: ({title, subtitle, media}) => ({
      title: localizedPreviewValue(title, 'Channel'),
      subtitle,
      media,
    }),
  },
})
