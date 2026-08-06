import type {Locale} from '../../i18n/routes'

export type SeoCopy = {
  metaTitle: string
  metaDescription: string
  ogImage?: string
}

export type LocalizedSeoCopy = Record<Locale, SeoCopy>

export const SINGLETON_PAGE_SEO: Record<string, LocalizedSeoCopy> = {
  homePage: {
    es: {
      metaTitle: 'Vertebra',
      metaDescription:
        'Automatiza la administración de tus propiedades comerciales e industriales con nuestra inteligencia artificial.',
      ogImage: '/assets/home/Dashboards-v2-poster-00001.jpg',
    },
    en: {
      metaTitle: 'Vertebra',
      metaDescription:
        'Automate commercial and industrial property management with our artificial intelligence.',
      ogImage: '/assets/home/Dashboards-v2-poster-00001.jpg',
    },
  },
  aboutPage: {
    es: {
      metaTitle: 'Nosotros',
      metaDescription: 'Conoce al equipo detrás de Vertebra, la proptech de administración de propiedades.',
    },
    en: {
      metaTitle: 'About',
      metaDescription: 'Meet the team behind Vertebra, the property management proptech.',
    },
  },
  contactPage: {
    es: {
      metaTitle: 'Contacto',
      metaDescription: 'Escríbenos y un especialista te contactará para conocer tu portafolio.',
    },
    en: {
      metaTitle: 'Contact',
      metaDescription: 'Write to us and a specialist will reach out about your portfolio.',
    },
  },
  thankYouPage: {
    es: {
      metaTitle: 'Gracias',
      metaDescription: 'Recibimos tu solicitud. Te contactaremos pronto.',
    },
    en: {
      metaTitle: 'Thank you',
      metaDescription: 'We received your request. We will contact you soon.',
    },
  },
  siteSettings: {
    es: {
      metaTitle: 'Vertebra',
      metaDescription:
        'La columna vertebral digital de tus propiedades. SaaS de administración con IA.',
    },
    en: {
      metaTitle: 'Vertebra',
      metaDescription: 'The digital backbone of your properties. AI-powered property management SaaS.',
    },
  },
}

export function truncateMetaDescription(text: string, max = 160): string {
  const trimmed = text.replace(/\s+/g, ' ').trim()
  if (trimmed.length <= max) return trimmed
  return `${trimmed.slice(0, max - 1).trimEnd()}…`
}

export function truncateMetaTitle(text: string, max = 60): string {
  const trimmed = text.replace(/\s+/g, ' ').trim()
  if (trimmed.length <= max) return trimmed
  return `${trimmed.slice(0, max - 1).trimEnd()}…`
}
