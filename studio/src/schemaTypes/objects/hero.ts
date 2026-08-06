import {defineField, defineType} from 'sanity'
import {localizedPreviewValue} from '../../lib/localized'
import {localizedStringField, localizedTextField} from '../fields/localizedFields'

export default defineType({
  name: 'hero',
  title: 'Hero',
  type: 'object',
  fields: [
    defineField({
      name: 'variant',
      title: 'Content treatment',
      type: 'string',
      initialValue: 'home',
      options: {
        list: [
          {title: 'Home', value: 'home'},
          {title: 'Recruitment', value: 'recruitment'},
          {title: 'Services index', value: 'services'},
          {title: 'Service page', value: 'servicePage'},
          {title: 'About page', value: 'about'},
          {title: 'Methodology page', value: 'methodology'},
          {title: 'Insights index', value: 'insights'},
          {title: 'Contact', value: 'contact'},
          {title: 'Case studies index', value: 'caseStudies'},
        ],
        layout: 'radio',
      },
    }),
    localizedStringField('eyebrow', 'Eyebrow'),
    localizedStringField('heading', 'Heading', {validation: (Rule) => Rule.required()}),
    localizedTextField('subheading', 'Subheading'),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', type: 'string', title: 'Alt text'})],
    }),
    defineField({name: 'primaryCta', title: 'Primary CTA', type: 'cta'}),
    defineField({name: 'secondaryCta', title: 'Secondary CTA', type: 'cta'}),
  ],
  preview: {
    select: {title: 'heading', subtitle: 'eyebrow', media: 'image'},
    prepare: ({title, subtitle, media}) => ({
      title: localizedPreviewValue(title, 'Hero'),
      subtitle: localizedPreviewValue(subtitle, 'Hero'),
      media,
    }),
  },
})
