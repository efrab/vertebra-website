import {defineField, defineType} from 'sanity'
import {localizedPreviewValue} from '../../lib/localized'

export default defineType({
  name: 'thanksHero',
  title: 'Thanks hero',
  type: 'object',
  fields: [
    defineField({name: 'heading', type: 'internationalizedArrayText'}),
    defineField({name: 'highlight', type: 'internationalizedArrayString'}),
    defineField({name: 'description', type: 'internationalizedArrayText'}),
    defineField({name: 'backHref', type: 'string'}),
    defineField({name: 'backLabel', type: 'internationalizedArrayString'}),
    defineField({name: 'imageSrc', type: 'string', title: 'Image path'}),
    defineField({name: 'imageSrcSet', type: 'string', title: 'Image srcset'}),
    defineField({name: 'primaryCta', type: 'cta'}),
    defineField({name: 'secondaryCta', type: 'cta'}),
  ],
  preview: {
    select: {title: 'heading'},
    prepare: ({title}) => ({title: localizedPreviewValue(title, 'Thanks hero')}),
  },
})
