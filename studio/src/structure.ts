import type {StructureResolver} from 'sanity/structure'

const singletonTitles: Record<string, string> = {
  homePage: 'Home',
  aboutPage: 'Nosotros',
  contactPage: 'Contacto',
  thankYouPage: 'Gracias',
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
        .id('blog')
        .title('Blog')
        .child(
          S.list()
            .title('Blog')
            .items([
              S.documentTypeListItem('post').title('Posts'),
              S.documentTypeListItem('category').title('Categorías'),
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
      S.divider(),
      singletonItem(S, 'siteSettings'),
    ])
