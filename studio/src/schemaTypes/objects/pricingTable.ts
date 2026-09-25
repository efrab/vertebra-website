import {defineArrayMember, defineField, defineType} from 'sanity'
import {localizedPreviewValue} from '../../lib/localized'

export default defineType({
  name: 'pricingTable',
  title: 'Pricing table',
  type: 'object',
  fields: [
    defineField({name: 'heading', type: 'internationalizedArrayText'}),
    defineField({name: 'subheading', type: 'internationalizedArrayText'}),
    defineField({name: 'price', type: 'string'}),
    defineField({name: 'priceSuffix', type: 'internationalizedArrayString'}),
    defineField({name: 'annualPrice', type: 'string'}),
    defineField({name: 'annualNote', type: 'internationalizedArrayString'}),
    defineField({name: 'badge', type: 'internationalizedArrayString'}),
    defineField({name: 'paymentNote', type: 'internationalizedArrayText'}),
    defineField({name: 'featuresHeading', type: 'internationalizedArrayString'}),
    defineField({name: 'primaryCta', type: 'cta'}),
    defineField({name: 'secondaryCta', type: 'cta'}),
    defineField({
      name: 'features',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [defineField({name: 'label', type: 'internationalizedArrayString'})],
          preview: {
            select: {title: 'label'},
            prepare: ({title}) => ({title: localizedPreviewValue(title, 'Feature')}),
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {title: 'heading'},
    prepare: ({title}) => ({title: localizedPreviewValue(title, 'Pricing table')}),
  },
})
