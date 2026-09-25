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
const previewOrigin = (
  process.env.SANITY_STUDIO_PREVIEW_URL || 'https://vertebra-website.vercel.app'
).replace(/\/$/, '')

export default defineConfig({
  name: 'vertebra',
  title: 'Vertebra',
  projectId,
  dataset,
  plugins: [
    structureTool({structure}),
    presentationTool({
      previewUrl: {
        origin: previewOrigin,
        preview: '/es/',
        previewMode: {
          enable: '/api/draft-mode/enable',
          disable: '/api/draft-mode/disable',
        },
      },
      resolve: {
        mainDocuments: defineDocuments([
          {route: '/:locale', filter: () => `_type == "homePage"`},
          {route: '/:locale/:slug', filter: ({params}) => {
            if (params.slug === 'roi-calculator') {
              return `_type == "roiCalculatorPage"`
            }
            const routeMap: Record<string, string> = {
              'nosotros': 'about', 'about': 'about',
              'contacto': 'contact', 'contact': 'contact',
              'gracias': 'thankYou', 'thank-you': 'thankYou',
              'modulos': 'modules', 'modules': 'modules',
              'beneficios': 'benefits', 'benefits': 'benefits',
              'ai': 'ai',
              'centro-de-ayuda': 'helpCenter', 'help-center': 'helpCenter',
              'como-podemos-ayudarte': 'howCanWeHelp', 'how-can-we-help': 'howCanWeHelp',
              'como-podemos-ayudarte-buscador': 'howCanWeHelpSearch', 'how-can-we-help-search': 'howCanWeHelpSearch',
              'agenda': 'agenda', 'book-demo': 'agenda',
              'gracias-agenda': 'thanksDemo', 'thanks-demo': 'thanksDemo',
              'pricing': 'pricing',
              'bienvenidos': 'welcome', 'welcome': 'welcome',
              'free-trial': 'freeTrial',
              'landing-contratos-documentos': 'landingContracts', 'landing-contracts-documents': 'landingContracts',
              'landing-servicios': 'landingServices', 'landing-services': 'landingServices',
            }
            const routeKey = routeMap[params.slug as string]
            return routeKey ? `_type == "page" && routeKey == "${routeKey}"` : `false`
          }},
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
