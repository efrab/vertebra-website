import type {Locale} from '../i18n/routes'
import {getLocalizedPath} from '../i18n/routes'
import type {PageSection} from './fixtures'

const WF = '/assets/webflow/images'

function agendaFormExtras(locale: Locale) {
  const isEn = locale === 'en'
  return {
    formTitle: isEn ? 'Leave us a message' : 'Déjanos un mensaje',
    formSubtitle: isEn ? 'We will reply shortly' : 'Te responderemos a la brevedad',
    sideHeading: isEn ? 'Prefer to talk directly?' : '¿Prefiere hablar directamente?',
    sideDescription: isEn
      ? 'Call us or write by email. We will assist you right away.'
      : 'Llámanos o escríbanos por correo. Te atenderemos de inmediato.',
    contactLinks: [
      {
        label: isEn ? 'Write us on WhatsApp' : 'Escríbenos por WhatsApp',
        href: 'https://wa.me/+51983723379',
        iconSrc: `${WF}/whatsapp-1.svg`,
        variant: 'outline' as const,
      },
      {
        label: isEn ? 'Try Vertebra free' : 'Prueba gratis Vértebra',
        href: 'https://app.vertebra.co/contact',
        variant: 'blue' as const,
      },
      {
        label: 'info@vertebra.co',
        href: 'mailto:info@vertebra.co',
        iconSrc: `${WF}/Vector-4.svg`,
        variant: 'outline' as const,
      },
    ],
  }
}

export function agendaFixtures(locale: Locale): PageSection[] {
  const isEn = locale === 'en'
  return [
    {
      _type: 'formSection',
      variant: 'agenda',
      heading: isEn
        ? 'Book a personalized Vertebra demo'
        : 'Agenda una demo personalizada de Vértebra',
      description: isEn
        ? 'Discover in 30 minutes how our platform can centralize your operations, automate tasks and give you full control over your properties.'
        : 'Descubre en 30 minutos cómo nuestra plataforma puede centralizar tu operación, automatizar tareas y darte control total sobre tus propiedades.',
      redirectTo: getLocalizedPath(locale, 'thanksDemo'),
      showSchedule: true,
      ...agendaFormExtras(locale),
      submitLabel: isEn ? 'Book my demo' : 'Agendar mi demo',
    },
    {
      _type: 'evaFeatures',
      heading: isEn ? 'What to expect from the demo?' : '¿Qué esperar de la demo?',
      items: [
        {
          description: isEn
            ? 'A walkthrough of modules tailored to your portfolio.'
            : 'Un recorrido de módulos adaptado a tu portafolio.',
          icon: 'squares-2x2',
        },
        {
          description: isEn
            ? 'Examples of automation for contracts, billing and maintenance.'
            : 'Ejemplos de automatización para contratos, cobranza y mantenimiento.',
          icon: 'bolt',
        },
        {
          description: isEn
            ? 'Time to resolve questions with a Vertebra specialist.'
            : 'Tiempo para resolver dudas con un especialista de Vértebra.',
          icon: 'chat-bubble-left-right',
        },
        {
          description: isEn
            ? 'Next steps to start a free trial or onboarding.'
            : 'Próximos pasos para iniciar una prueba gratis o el onboarding.',
          icon: 'rocket-launch',
        },
      ],
    },
  ]
}

export function contactFixtures(locale: Locale): PageSection[] {
  const isEn = locale === 'en'
  return [
    {
      _type: 'formSection',
      variant: 'contact',
      heading: isEn ? 'Contact a Vertebra specialist' : 'Contacta a un especialista de Vértebra',
      description: isEn
        ? 'Tell us about your portfolio and we will help you automate contracts, collections and operations.'
        : 'Cuéntanos sobre tu portafolio y te ayudamos a automatizar contratos, cobranza y operación.',
      redirectTo: getLocalizedPath(locale, 'thankYou'),
      showSchedule: false,
      ...agendaFormExtras(locale),
      formTitle: isEn ? 'Talk to an advisor' : 'Comunicarse con un asesor',
      submitLabel: isEn ? 'Send' : 'Enviar',
    },
  ]
}

export function pricingFixtures(locale: Locale): PageSection[] {
  const isEn = locale === 'en'
  return [
    {
      _type: 'pricingTable',
      heading: isEn ? 'Pricing' : 'Precios',
      subheading: isEn
        ? 'Create your Vertebra account and choose your ideal plan'
        : 'Crea tu cuenta en Vertebra y elige tu plan ideal',
      price: 'USD $25',
      priceSuffix: isEn ? '/mo' : '/mes',
      annualPrice: '$285',
      annualNote: isEn ? '10% off' : '10% dscto',
      badge: isEn ? 'From' : 'Desde',
      paymentNote: isEn
        ? 'We accept different<br>payment methods'
        : 'Aceptamos diferentes<br>métodos de pago',
      primaryCta: {
        label: isEn ? 'Start now' : 'Empieza ahora',
        href: 'https://app.vertebra.co/users/billing',
      },
      secondaryCta: {
        label: isEn ? 'Contact advisor' : 'Contactar asesor',
        href: getLocalizedPath(locale, 'contact'),
      },
      featuresHeading: isEn ? 'Features' : 'Funciones',
      features: [
        {label: isEn ? 'Organization creation' : 'Creación de organizaciones'},
        {label: isEn ? 'Contract digitization' : 'Digitalización de contratos'},
        {label: isEn ? 'Services management' : 'Gestión de servicios'},
        {label: isEn ? 'Fixed assets registry' : 'Registro de activos fijos'},
        {label: isEn ? 'Smart notifications' : 'Notificaciones inteligentes'},
        {label: isEn ? 'Maintenance tickets' : 'Tickets de mantenimiento'},
        {label: isEn ? 'Multi-users' : 'Multi-usuarios'},
        {label: isEn ? 'Reports' : 'Reportes'},
      ],
    },
    {
      _type: 'formSection',
      variant: 'pricing',
      heading: isEn ? 'Need a custom plan?' : '¿Necesitas un plan a medida?',
      description: isEn
        ? 'Tell us about your portfolio size and we will recommend the best option.'
        : 'Cuéntanos el tamaño de tu portafolio y te recomendamos la mejor opción.',
      redirectTo: getLocalizedPath(locale, 'thankYou'),
      showSchedule: false,
      formTitle: isEn ? 'Contact sales' : 'Contactar ventas',
      formSubtitle: isEn ? 'A specialist will follow up' : 'Un especialista te contactará',
      submitLabel: isEn ? 'Send' : 'Enviar',
    },
  ]
}

export function landingFixtures(
  locale: Locale,
  key: 'welcome' | 'freeTrial' | 'landingContracts' | 'landingServices',
): PageSection[] {
  const isEn = locale === 'en'
  const copy = {
    welcome: {
      heading: isEn ? 'Welcome to Vertebra' : 'Bienvenidos a Vértebra',
      description: isEn
        ? 'Start managing rents, contracts and renewals in one place.'
        : 'Empieza a administrar rentas, contratos y renovaciones en un solo lugar.',
    },
    freeTrial: {
      heading: isEn ? 'Try Vertebra free for 15 days' : 'Prueba Vértebra gratis por 15 días',
      description: isEn
        ? 'Automate documents, contracts and operations with minimum effort.'
        : 'Automatiza documentos, contratos y operación con mínimo esfuerzo.',
    },
    landingContracts: {
      heading: isEn ? 'Contracts and documents' : 'Contratos y documentos',
      description: isEn
        ? 'Control the document lifecycle of your properties.'
        : 'Controla el ciclo de vida documental de tus propiedades.',
    },
    landingServices: {
      heading: isEn ? 'Vertebra services' : 'Servicios Vértebra',
      description: isEn
        ? 'SaaS solutions to manage warehouses and portfolios.'
        : 'Soluciones SaaS para administrar bodegas y portafolios.',
    },
  }[key]

  return [
    {
      _type: 'formSection',
      variant: 'landing',
      heading: copy.heading,
      description: copy.description,
      redirectTo: getLocalizedPath(locale, 'thankYou'),
      showSchedule: false,
      ...agendaFormExtras(locale),
      formTitle: isEn ? 'Request access' : 'Solicitar acceso',
      formSubtitle: isEn ? 'We will contact you shortly' : 'Te contactaremos en breve',
      submitLabel: isEn ? 'Send' : 'Enviar',
    },
  ]
}

export function thanksFixtures(locale: Locale, kind: 'thanksDemo' | 'thankYou'): PageSection[] {
  const isEn = locale === 'en'
  const home = getLocalizedPath(locale, 'home')
  const agenda = getLocalizedPath(locale, 'agenda')

  if (kind === 'thanksDemo') {
    return [
      {
        _type: 'thanksHero',
        heading: isEn ? 'Thanks for writing to us!' : '¡Gracias por escribirnos!',
        description: isEn
          ? 'We received your message and someone from our team will contact you soon to guide you through this process.'
          : 'Recibimos tu mensaje y muy pronto alguien de nuestro equipo se pondrá en contacto contigo para acompañarte en este proceso.',
        backHref: agenda,
        backLabel: isEn ? 'Back' : 'Volver',
        primaryCta: {
          label: isEn ? 'Back to home' : 'Volver al inicio',
          href: home,
        },
      },
    ]
  }

  return [
    {
      _type: 'thanksHero',
      heading: isEn ? 'Thanks for writing to us!' : '¡Gracias por escribirnos!',
      highlight: isEn ? 'writing to us!' : 'escribirnos!',
      description: isEn ? 'We will contact you soon.' : 'Pronto nos comunicaremos contigo.',
      backHref: home,
      backLabel: isEn ? 'Back' : 'Volver',
      primaryCta: {
        label: isEn ? 'Request DEMO' : 'Solicitar DEMO',
        href: agenda,
      },
      secondaryCta: {
        label: isEn ? 'Back to home' : 'Regresar al inicio',
        href: home,
      },
    },
  ]
}

export function conversionPageMeta(
  locale: Locale,
  key:
    | 'agenda'
    | 'contact'
    | 'pricing'
    | 'welcome'
    | 'freeTrial'
    | 'landingContracts'
    | 'landingServices'
    | 'thanksDemo'
    | 'thankYou',
) {
  const isEn = locale === 'en'
  const map = {
    agenda: {
      title: isEn ? 'Book a demo' : 'Agenda una demo',
      description: isEn
        ? 'Tell us about your portfolio and book a free demo.'
        : 'Cuéntanos sobre tu portafolio y agenda una demo gratis.',
    },
    contact: {
      title: isEn ? 'Contact' : 'Contacto',
      description: isEn
        ? 'Write to us and a specialist will reach out.'
        : 'Escríbenos y un especialista te contactará.',
    },
    pricing: {
      title: isEn ? 'Pricing' : 'Precios',
      description: isEn
        ? 'Flexible plans for portfolios of any size.'
        : 'Planes flexibles para portafolios de cualquier tamaño.',
    },
    welcome: {
      title: isEn ? 'Welcome' : 'Bienvenidos',
      description: isEn
        ? 'Start managing rents, contracts and renewals.'
        : 'Empieza a administrar rentas, contratos y renovaciones.',
    },
    freeTrial: {
      title: isEn ? 'Free trial' : 'Prueba gratis',
      description: isEn
        ? 'Try Vertebra and automate your operations.'
        : 'Prueba Vertebra y automatiza tu operación.',
    },
    landingContracts: {
      title: isEn ? 'Contracts and documents' : 'Contratos y documentos',
      description: isEn
        ? 'Control the document lifecycle of your properties.'
        : 'Controla el ciclo de vida documental de tus propiedades.',
    },
    landingServices: {
      title: isEn ? 'Vertebra services' : 'Servicios Vertebra',
      description: isEn
        ? 'SaaS solutions to manage warehouses and portfolios.'
        : 'Soluciones SaaS para administrar bodegas y portafolios.',
    },
    thanksDemo: {
      title: isEn ? 'Thanks for booking!' : '¡Gracias por agendar!',
      description: isEn
        ? 'We will contact you soon to confirm your demo.'
        : 'Te contactaremos pronto para confirmar tu demo.',
    },
    thankYou: {
      title: isEn ? 'Thank you!' : '¡Gracias!',
      description: isEn
        ? 'We received your request. We will contact you soon.'
        : 'Recibimos tu solicitud. Te contactaremos pronto.',
    },
  }
  return map[key]
}
