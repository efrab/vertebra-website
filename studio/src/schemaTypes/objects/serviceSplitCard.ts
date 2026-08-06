import {defineField, defineType} from 'sanity'
import {localizedPreviewValue} from '../../lib/localized'
import {localizedStringField, localizedTextField} from '../fields/localizedFields'

export default defineType({
  name: 'serviceSplitCard',
  title: 'Service split card',
  type: 'object',
  fields: [
    localizedStringField('title', 'Title', {validation: (Rule) => Rule.required()}),
    localizedTextField('summary', 'Summary'),
    defineField({
      name: 'page',
      title: 'Destination page',
      description: 'Link to Reclutamiento or Servicios index — not an individual service.',
      type: 'reference',
      to: [{type: 'recruitmentPage'}, {type: 'servicesIndexPage'}],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {title: 'title', pageType: 'page._type'},
    prepare: ({title, pageType}) => ({
      title: localizedPreviewValue(title, 'Card'),
      subtitle:
        pageType === 'recruitmentPage'
          ? '→ Reclutamiento'
          : pageType === 'servicesIndexPage'
            ? '→ Servicios (índice)'
            : '→ Page',
    }),
  },
})
