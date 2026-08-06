import type {PresentationPluginOptions} from 'sanity/presentation'

export const presentationLocations: PresentationPluginOptions['resolve'] extends
  | {locations?: infer L}
  | undefined
  ? L
  : never = {
  homePage: {
    select: {},
    resolve: () => ({
      locations: [
        {title: 'Home ES', href: '/es/'},
        {title: 'Home EN', href: '/en/'},
      ],
    }),
  },
  aboutPage: {
    select: {},
    resolve: () => ({
      locations: [
        {title: 'Nosotros', href: '/es/nosotros'},
        {title: 'About', href: '/en/about'},
      ],
    }),
  },
  contactPage: {
    select: {},
    resolve: () => ({
      locations: [
        {title: 'Contacto', href: '/es/contacto'},
        {title: 'Contact', href: '/en/contact'},
      ],
    }),
  },
  thankYouPage: {
    select: {},
    resolve: () => ({
      locations: [
        {title: 'Gracias', href: '/es/gracias'},
        {title: 'Thank you', href: '/en/thank-you'},
      ],
    }),
  },
  page: {
    select: {
      title: 'title',
      slugEs: 'slug.es.current',
      slugEn: 'slug.en.current',
    },
    resolve: (doc) => ({
      locations: [
        doc?.slugEs ? {title: 'ES', href: `/es/${doc.slugEs}`} : null,
        doc?.slugEn ? {title: 'EN', href: `/en/${doc.slugEn}`} : null,
      ].filter(Boolean) as {title: string; href: string}[],
    }),
  },
  post: {
    select: {
      title: 'title',
      slugEs: 'slug.es.current',
      slugEn: 'slug.en.current',
    },
    resolve: (doc) => ({
      locations: [
        doc?.slugEs ? {title: 'ES', href: `/es/blog/${doc.slugEs}`} : null,
        doc?.slugEn ? {title: 'EN', href: `/en/blog/${doc.slugEn}`} : null,
      ].filter(Boolean) as {title: string; href: string}[],
    }),
  },
}
