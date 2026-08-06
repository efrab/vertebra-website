import {BarChartIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {localizedPreviewValue} from '../../lib/localized'
import {
  localizedPortableTextField,
  localizedSlugField,
  localizedStringField,
  localizedTextField,
} from '../fields/localizedFields'

export default defineType({
  name: 'caseStudy',
  title: 'Case study',
  type: 'document',
  icon: BarChartIcon,
  fields: [
    localizedStringField('title', 'Title', {validation: (Rule) => Rule.required()}),
    localizedSlugField,
    localizedStringField('industry', 'Industry'),
    localizedStringField('service', 'Service'),
    localizedTextField('summary', 'Summary', {rows: 3}),
    localizedStringField('challengeHeadline', 'Challenge headline'),
    localizedTextField('challenge', 'Challenge', {rows: 4}),
    localizedStringField('interventionHeadline', 'Intervention headline'),
    localizedTextField('intervention', 'Intervention', {rows: 4}),
    localizedTextField('result', 'Result', {rows: 4}),
    defineField({
      name: 'metrics',
      title: 'Metrics',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'label', title: 'Label', type: 'string'}),
            defineField({name: 'value', title: 'Value', type: 'string'}),
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
              options: {
                list: [
                  {title: 'Calendar', value: 'calendar'},
                  {title: 'Process', value: 'process'},
                  {title: 'Cost', value: 'cost'},
                ],
              },
            }),
          ],
          preview: {select: {title: 'label', subtitle: 'value'}},
        }),
      ],
    }),
    defineField({
      name: 'relatedService',
      title: 'Related service',
      type: 'reference',
      to: [{type: 'service'}],
    }),
    defineField({
      name: 'relatedCases',
      title: 'Related cases',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'caseStudy'}]}],
    }),
    defineField({
      name: 'cover',
      title: 'Cover',
      type: 'image',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', type: 'string', title: 'Alt text'})],
    }),
    localizedPortableTextField('body', 'Body'),
    defineField({name: 'seo', title: 'SEO', type: 'seo'}),
  ],
  preview: {
    select: {title: 'title', industry: 'industry'},
    prepare: ({title, industry}) => ({
      title: localizedPreviewValue(title, 'Case study'),
      subtitle: localizedPreviewValue(industry),
    }),
  },
})
