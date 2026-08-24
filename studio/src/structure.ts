import type {StructureResolver} from 'sanity/structure'

const singletonTitles: Record<string, string> = {
  homePage: 'Home',
  aboutPage: 'Nosotros',
  contactPage: 'Contacto',
  thankYouPage: 'Gracias',
  servicesIndexPage: 'Servicios (index)',
  caseStudiesIndexPage: 'Casos de éxito (index)',
  insightsIndexPage: 'Insights (index)',
  recruitmentPage: 'Reclutamiento',
  legalPage: 'Legal',
  methodologyPage: 'Metodología',
  siteSettings: 'Site settings',
}

function singletonItem(S: Parameters<StructureResolver>[0], typeName: string) {
  return S.listItem()
    .id(typeName)
    .title(singletonTitles[typeName] || typeName)
    .child(
      S.document().schemaType(typeName).documentId(typeName).title(singletonTitles[typeName] || typeName),
    )
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
              singletonItem(S, 'aboutPage'),
              singletonItem(S, 'contactPage'),
              singletonItem(S, 'thankYouPage'),
              S.documentTypeListItem('page').title('Páginas (builder)'),
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
