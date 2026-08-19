import type {Locale} from '../i18n/routes'
import {getLocalizedPath, type PathnameKey} from '../i18n/routes'
import type {PageSection} from './fixtures'

type PageKey = Exclude<PathnameKey, 'home' | 'blogPost'>

const copy: Record<
  PageKey,
  {
    es: {heading: string; description: string}
    en: {heading: string; description: string}
  }
> = {
  modules: {
    es: {
      heading: 'Módulos',
      description:
        'Todos los módulos para administrar propiedades industriales y comerciales en un solo lugar.',
    },
    en: {
      heading: 'Modules',
      description: 'Every module to manage industrial and commercial properties in one place.',
    },
  },
  benefits: {
    es: {heading: 'Beneficios', description: 'Resultados reales para propietarios, inquilinos y administradores.'},
    en: {heading: 'Benefits', description: 'Real results for owners, tenants and administrators.'},
  },
  ai: {
    es: {heading: 'Inteligencia artificial', description: 'IA que acelera decisiones y automatiza tu operación.'},
    en: {heading: 'Artificial intelligence', description: 'AI that speeds decisions and automates your operations.'},
  },
  about: {
    es: {heading: 'Nosotros', description: 'Vertebra es la columna vertebral digital de tus propiedades.'},
    en: {heading: 'About us', description: 'Vertebra is the digital backbone of your properties.'},
  },
  blog: {
    es: {heading: 'Blog', description: 'Ideas, guías y novedades del mundo proptech.'},
    en: {heading: 'Blog', description: 'Ideas, guides and news from the proptech world.'},
  },
  helpCenter: {
    es: {heading: 'Centro de ayuda', description: 'Encuentra respuestas y recursos para usar Vertebra.'},
    en: {heading: 'Help center', description: 'Find answers and resources to use Vertebra.'},
  },
  howCanWeHelp: {
    es: {heading: '¿Cómo podemos ayudarte?', description: 'Explora guías y recursos de soporte.'},
    en: {heading: 'How can we help?', description: 'Explore support guides and resources.'},
  },
  howCanWeHelpSearch: {
    es: {heading: 'Buscador de ayuda', description: 'Busca artículos y respuestas rápidas.'},
    en: {heading: 'Help search', description: 'Search articles and quick answers.'},
  },
  agenda: {
    es: {heading: 'Agenda una demo', description: 'Cuéntanos sobre tu portafolio y agenda una demo gratis.'},
    en: {heading: 'Book a demo', description: 'Tell us about your portfolio and book a free demo.'},
  },
  thanksDemo: {
    es: {heading: '¡Gracias por agendar!', description: 'Te contactaremos pronto para confirmar tu demo.'},
    en: {heading: 'Thanks for booking!', description: 'We will contact you soon to confirm your demo.'},
  },
  contact: {
    es: {heading: 'Contacto', description: 'Escríbenos y un especialista te contactará.'},
    en: {heading: 'Contact', description: 'Write to us and a specialist will reach out.'},
  },
  pricing: {
    es: {heading: 'Precios', description: 'Planes flexibles para portafolios de cualquier tamaño.'},
    en: {heading: 'Pricing', description: 'Flexible plans for portfolios of any size.'},
  },
  welcome: {
    es: {heading: 'Bienvenidos', description: 'Empieza a administrar rentas, contratos y renovaciones.'},
    en: {heading: 'Welcome', description: 'Start managing rents, contracts and renewals.'},
  },
  freeTrial: {
    es: {heading: 'Prueba gratis', description: 'Prueba Vertebra y automatiza tu operación.'},
    en: {heading: 'Free trial', description: 'Try Vertebra and automate your operations.'},
  },
  landingContracts: {
    es: {
      heading: 'Contratos y documentos',
      description: 'Controla el ciclo de vida documental de tus propiedades.',
    },
    en: {
      heading: 'Contracts and documents',
      description: 'Control the document lifecycle of your properties.',
    },
  },
  landingServices: {
    es: {heading: 'Servicios Vertebra', description: 'Soluciones SaaS para administrar bodegas y portafolios.'},
    en: {heading: 'Vertebra services', description: 'SaaS solutions to manage warehouses and portfolios.'},
  },
  thankYou: {
    es: {heading: '¡Gracias!', description: 'Recibimos tu solicitud. Te contactaremos pronto.'},
    en: {heading: 'Thank you!', description: 'We received your request. We will contact you soon.'},
  },
  roiCalculator: {
    es: {heading: 'Calculadora de ROI', description: 'Calcula el ROI de digitalizar la administración de tu portafolio inmobiliario.'},
    en: {heading: 'ROI Calculator', description: 'Calculate the ROI of digitizing your real estate portfolio management.'},
  },
}

export function marketingPageFixtures(locale: Locale, key: PageKey): PageSection[] {
  const isEn = locale === 'en'
  const t = copy[key][locale]
  const agenda = getLocalizedPath(locale, 'agenda')

  const sections: PageSection[] = [
    {
      _type: 'headerInternal',
      variant: 'base',
      heading: t.heading,
      description: t.description,
      bgSrc: '/assets/webflow/images/background-1.png',
      bgSrcSet:
        '/assets/webflow/images/background-1-p-500.png 500w, /assets/webflow/images/background-1-p-800.png 800w, /assets/webflow/images/background-1-p-1080.png 1080w, /assets/webflow/images/background-1.png 1440w',
      personSrc: '/assets/webflow/images/image-3_2.png',
      personSrcSet:
        '/assets/webflow/images/image-3_2-p-500.png 500w, /assets/webflow/images/image-3_2.png 631w',
    },
  ]

  const registryHandled = [
    'about',
    'ai',
    'modules',
    'benefits',
    'agenda',
    'contact',
    'pricing',
    'welcome',
    'freeTrial',
    'landingContracts',
    'landingServices',
    'thanksDemo',
    'thankYou',
    'helpCenter',
    'howCanWeHelp',
    'howCanWeHelpSearch',
  ]

  if (!registryHandled.includes(key)) {
    sections.push({
      _type: 'ctaBanner',
      heading: isEn ? 'Ready to optimize your properties?' : '¿Listo para optimizar tus propiedades?',
      cta: {
        label: isEn ? 'Request a free demo' : 'Solicita una demo gratis',
        href: agenda,
      },
    })
  }

  return sections
}

export function pageMeta(locale: Locale, key: PageKey) {
  const t = copy[key][locale]
  return {title: t.heading, description: t.description}
}
