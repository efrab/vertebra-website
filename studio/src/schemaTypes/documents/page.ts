import {DocumentIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import {localizedPreviewValue} from '../../lib/localized'
import {localizedSlugField, localizedStringField} from '../fields/localizedFields'

export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    localizedStringField('title', 'Title', {validation: (Rule) => Rule.required()}),
    localizedSlugField,
    defineField({
      name: 'routeKey',
      title: 'Route key',
      type: 'string',
      description: 'Internal key used to match URL routes (e.g. modules, benefits, ai, about)',
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          {title: 'Módulos', value: 'modules'},
          {title: 'Beneficios', value: 'benefits'},
          {title: 'IA', value: 'ai'},
          {title: 'Nosotros', value: 'about'},
          {title: 'Agendar demo', value: 'agenda'},
          {title: 'Contacto', value: 'contact'},
          {title: 'Pricing', value: 'pricing'},
          {title: 'Bienvenidos', value: 'welcome'},
          {title: 'Free Trial', value: 'freeTrial'},
          {title: 'Landing Contratos', value: 'landingContracts'},
          {title: 'Landing Servicios', value: 'landingServices'},
          {title: 'Gracias (demo)', value: 'thanksDemo'},
          {title: 'Gracias', value: 'thankYou'},
          {title: 'Centro de ayuda', value: 'helpCenter'},
          {title: 'Cómo podemos ayudarte', value: 'howCanWeHelp'},
          {title: 'Cómo podemos ayudarte (buscador)', value: 'howCanWeHelpSearch'},
        ],
      },
    }),
    defineField({name: 'pageBuilder', title: 'Page builder', type: 'pageBuilder'}),
    defineField({name: 'seo', title: 'SEO', type: 'seo'}),
  ],
  preview: {
    select: {title: 'title'},
    prepare: ({title}) => ({title: localizedPreviewValue(title, 'Page')}),
  },
})
