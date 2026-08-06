import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {assist} from '@sanity/assist'
import {internationalizedArray} from 'sanity-plugin-internationalized-array'
import {defineDocuments, presentationTool} from 'sanity/presentation'
import {schemaTypes} from './src/schemaTypes'
import {structure} from './src/structure'
import {I18N_DOCUMENT_TYPES, SUPPORTED_LANGUAGES} from './src/lib/i18n'
import {presentationLocations} from './src/presentation'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'your-projectID'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'
const previewOrigin = process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:4321'

export default defineConfig({
  name: 'vertebra',
  title: 'Vertebra',
  projectId,
  dataset,
  plugins: [
    structureTool({structure}),
    presentationTool({
      previewUrl: {
        initial: previewOrigin,
        previewMode: {
          enable: '/api/draft-mode/enable',
          disable: '/api/draft-mode/disable',
        },
      },
      resolve: {
        mainDocuments: defineDocuments([
          {route: '/:locale', filter: () => `_type == "homePage"`},
          {route: '/:locale/nosotros', filter: () => `_type == "aboutPage"`},
          {route: '/:locale/about', filter: () => `_type == "aboutPage"`},
          {route: '/:locale/contacto', filter: () => `_type == "contactPage"`},
          {route: '/:locale/contact', filter: () => `_type == "contactPage"`},
          {route: '/:locale/gracias', filter: () => `_type == "thankYouPage"`},
          {route: '/:locale/thank-you', filter: () => `_type == "thankYouPage"`},
          {
            route: '/:locale/:slug',
            filter: ({params}) =>
              `_type == "page" && (slug.es.current == "${params.slug}" || slug.en.current == "${params.slug}")`,
          },
          {
            route: '/:locale/blog/:slug',
            filter: ({params}) =>
              `_type == "post" && (slug.es.current == "${params.slug}" || slug.en.current == "${params.slug}")`,
          },
        ]),
        locations: presentationLocations,
      },
    }),
    internationalizedArray({
      languages: [...SUPPORTED_LANGUAGES],
      defaultLanguages: ['es'],
      fieldTypes: ['string', 'text', 'portableText'],
      languageFilter: {
        documentTypes: [...I18N_DOCUMENT_TYPES],
      },
    }),
    assist({
      translate: {
        field: {
          languages: SUPPORTED_LANGUAGES.map(({id, title}) => ({id, title})),
          documentTypes: [...I18N_DOCUMENT_TYPES],
        },
      },
    }),
    visionTool(),
  ],
  schema: {types: schemaTypes},
})
