import type {StructureResolver} from 'sanity/structure'

const singletonTitles: Record<string, string> = {
  homePage: 'Home',
  siteSettings: 'Site settings',
  servicesIndexPage: 'Servicios (index)',
  caseStudiesIndexPage: 'Casos de éxito (index)',
  insightsIndexPage: 'Insights (index)',
  recruitmentPage: 'Reclutamiento',
  legalPage: 'Legal',
  methodologyPage: 'Metodología',
  roiCalculatorPage: 'Calculadora ROI',
}

const marketingPages: {id: string; title: string; routeKey: string}[] = [
  {id: 'page-modules', title: 'Módulos', routeKey: 'modules'},
  {id: 'page-benefits', title: 'Beneficios', routeKey: 'benefits'},
  {id: 'page-ai', title: 'IA', routeKey: 'ai'},
  {id: 'page-about', title: 'Nosotros', routeKey: 'about'},
  {id: 'page-agenda', title: 'Agendar demo', routeKey: 'agenda'},
  {id: 'page-contact', title: 'Contacto', routeKey: 'contact'},
  {id: 'page-pricing', title: 'Pricing', routeKey: 'pricing'},
  {id: 'page-welcome', title: 'Bienvenidos', routeKey: 'welcome'},
  {id: 'page-freeTrial', title: 'Free Trial', routeKey: 'freeTrial'},
  {id: 'page-landingContracts', title: 'Landing Contratos', routeKey: 'landingContracts'},
  {id: 'page-landingServices', title: 'Landing Servicios', routeKey: 'landingServices'},
  {id: 'page-thanksDemo', title: 'Gracias (demo)', routeKey: 'thanksDemo'},
  {id: 'page-thankYou', title: 'Gracias', routeKey: 'thankYou'},
  {id: 'page-helpCenter', title: 'Centro de ayuda', routeKey: 'helpCenter'},
  {id: 'page-howCanWeHelp', title: 'Cómo podemos ayudarte', routeKey: 'howCanWeHelp'},
  {
    id: 'page-howCanWeHelpSearch',
    title: 'Cómo podemos ayudarte (buscador)',
    routeKey: 'howCanWeHelpSearch',
  },
]

function singletonItem(S: Parameters<StructureResolver>[0], typeName: string) {
  return S.listItem()
    .id(typeName)
    .title(singletonTitles[typeName] || typeName)
    .child(
      S.document().schemaType(typeName).documentId(typeName).title(singletonTitles[typeName] || typeName),
    )
}

function pageItem(
  S: Parameters<StructureResolver>[0],
  page: {id: string; title: string; routeKey: string},
) {
  return S.listItem()
    .id(page.id)
    .title(page.title)
    .child(S.document().schemaType('page').documentId(page.id).title(page.title))
}

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Vertebra')
    .items([
      S.listItem()
        .id('paginas')
        .title('Páginas')
        .child(
          S.list()
            .title('Páginas')
            .items([
              singletonItem(S, 'homePage'),
              S.divider(),
              ...marketingPages.map((page) => pageItem(S, page)),
              S.divider(),
              singletonItem(S, 'roiCalculatorPage'),
            ]),
        ),
      S.listItem()
        .id('servicios')
        .title('Servicios')
        .child(
          S.list()
            .title('Servicios')
            .items([
              S.documentTypeListItem('service').title('Servicios'),
              singletonItem(S, 'servicesIndexPage'),
            ]),
        ),
      S.listItem()
        .id('casos-de-exito')
        .title('Casos de éxito')
        .child(
          S.list()
            .title('Casos de éxito')
            .items([
              S.documentTypeListItem('caseStudy').title('Casos de éxito'),
              singletonItem(S, 'caseStudiesIndexPage'),
            ]),
        ),
      S.listItem()
        .id('blog')
        .title('Blog')
        .child(
          S.list()
            .title('Blog')
            .items([
              S.documentTypeListItem('post').title('Posts'),
              S.documentTypeListItem('category').title('Categorías'),
              S.documentTypeListItem('insight').title('Insights'),
              singletonItem(S, 'insightsIndexPage'),
            ]),
        ),
      S.listItem()
        .id('contenido')
        .title('Contenido reutilizable')
        .child(
          S.list()
            .title('Contenido')
            .items([
              S.documentTypeListItem('teamMember').title('Equipo'),
              S.documentTypeListItem('testimonial').title('Testimonios'),
            ]),
        ),
      S.listItem()
        .id('otras-paginas')
        .title('Otras páginas')
        .child(
          S.list()
            .title('Otras páginas')
            .items([
              singletonItem(S, 'methodologyPage'),
              singletonItem(S, 'recruitmentPage'),
              singletonItem(S, 'legalPage'),
            ]),
        ),
      S.divider(),
      singletonItem(S, 'siteSettings'),
    ])
