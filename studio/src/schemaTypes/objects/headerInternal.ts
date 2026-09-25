import {defineField, defineType} from 'sanity'
import {localizedPreviewValue} from '../../lib/localized'

export default defineType({
  name: 'headerInternal',
  title: 'Internal header',
  type: 'object',
  fields: [
    defineField({
      name: 'variant',
      type: 'string',
      options: {list: ['base', 'interna']},
      initialValue: 'base',
    }),
    defineField({name: 'eyebrow', type: 'internationalizedArrayString'}),
    defineField({name: 'heading', type: 'internationalizedArrayText'}),
    defineField({name: 'description', type: 'internationalizedArrayText'}),
    defineField({name: 'iconSrc', type: 'string', title: 'Icon path'}),
    defineField({name: 'personSrc', type: 'string', title: 'Person image path'}),
    defineField({name: 'personSrcSet', type: 'string', title: 'Person srcset'}),
    defineField({name: 'bgSrc', type: 'string', title: 'Background path'}),
    defineField({name: 'bgSrcSet', type: 'string', title: 'Background srcset'}),
    defineField({name: 'imageSrc', type: 'string', title: 'Image path (alias)'}),
    defineField({name: 'image', type: 'image', title: 'Image (optional CMS upload)'}),
  ],
  preview: {
    select: {title: 'heading'},
    prepare: ({title}) => ({title: localizedPreviewValue(title, 'Internal header')}),
  },
})
