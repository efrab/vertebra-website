import {defineArrayMember, defineField, defineType} from 'sanity'
import {localizedPreviewValue} from '../../lib/localized'
import {localizedStringField} from '../fields/localizedFields'

const COUNTRY_PRESETS = [
  {title: 'Estados Unidos', value: 'us'},
  {title: 'México', value: 'mx'},
  {title: 'Colombia', value: 'co'},
  {title: 'Ecuador', value: 'ec'},
  {title: 'Brasil', value: 'br'},
  {title: 'Uruguay', value: 'uy'},
  {title: 'Chile', value: 'cl'},
  {title: 'España', value: 'es'},
  {title: 'Italia', value: 'it'},
  {title: 'Personalizado', value: 'custom'},
] as const

export default defineType({
  name: 'worldMap',
  title: 'World map',
  type: 'object',
  fields: [
    localizedStringField('heading', 'Heading', {validation: (Rule) => Rule.required()}),
    localizedStringField('intro', 'Introduction'),
    defineField({
      name: 'mapImage',
      title: 'Map background',
      description: 'Optional. Replaces the default dotted world map.',
      type: 'image',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', type: 'string', title: 'Alt text'})],
    }),
    defineField({
      name: 'markers',
      title: 'Markers',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'countryPreset',
              title: 'Country preset',
              type: 'string',
              options: {list: [...COUNTRY_PRESETS], layout: 'radio'},
              initialValue: 'us',
              validation: (Rule) => Rule.required(),
            }),
            localizedStringField('country', 'Country label', {
              description: 'Displayed in the tooltip.',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'organizations',
              title: 'Organizations',
              type: 'array',
              of: [defineArrayMember({type: 'internationalizedArrayString'})],
              validation: (Rule) => Rule.required().min(1),
            }),
            defineField({
              name: 'flag',
              title: 'Flag override',
              description: 'Optional. Replaces the default flag for the selected preset.',
              type: 'image',
              options: {hotspot: true},
            }),
            defineField({
              name: 'top',
              title: 'Top position (%)',
              description: 'Required for custom markers. Percentage within the map area.',
              type: 'number',
              hidden: ({parent}) => parent?.countryPreset !== 'custom',
              validation: (Rule) =>
                Rule.custom((value, context) => {
                  const preset = (context.parent as {countryPreset?: string} | undefined)
                    ?.countryPreset
                  if (preset !== 'custom') return true
                  if (typeof value !== 'number' || value < 0 || value > 100) {
                    return 'Enter a value between 0 and 100'
                  }
                  return true
                }),
            }),
            defineField({
              name: 'left',
              title: 'Left position (%)',
              description: 'Required for custom markers. Percentage within the map area.',
              type: 'number',
              hidden: ({parent}) => parent?.countryPreset !== 'custom',
              validation: (Rule) =>
                Rule.custom((value, context) => {
                  const preset = (context.parent as {countryPreset?: string} | undefined)
                    ?.countryPreset
                  if (preset !== 'custom') return true
                  if (typeof value !== 'number' || value < 0 || value > 100) {
                    return 'Enter a value between 0 and 100'
                  }
                  return true
                }),
            }),
            defineField({
              name: 'active',
              title: 'Show tooltip by default',
              type: 'boolean',
              initialValue: false,
            }),
          ],
          preview: {
            select: {title: 'country', subtitle: 'countryPreset', media: 'flag'},
            prepare: ({title, subtitle, media}) => ({
              title: localizedPreviewValue(title, 'Marker'),
              subtitle: subtitle ? `Preset: ${subtitle}` : undefined,
              media,
            }),
          },
        }),
      ],
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .custom((markers) => {
            if (!Array.isArray(markers)) return true
            const activeCount = markers.filter(
              (marker) => (marker as {active?: boolean}).active,
            ).length
            if (activeCount > 1) return 'Only one marker can be active by default'
            return true
          }),
    }),
  ],
  preview: {
    select: {title: 'heading'},
    prepare: ({title}) => ({
      title: localizedPreviewValue(title, 'World map'),
    }),
  },
})
