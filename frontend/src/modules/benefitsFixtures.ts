import type {Locale} from '../i18n/routes'
import {getLocalizedPath} from '../i18n/routes'
import type {PageSection} from './fixtures'

const WF = '/assets/webflow/images'

export function demoCtaSection(
  locale: Locale,
  opts?: {
    heading?: string
    description?: string
    primaryLabel?: string
  },
): Extract<PageSection, {_type: 'ctaBanner'}> {
  const isEn = locale === 'en'
  const agenda = getLocalizedPath(locale, 'agenda')
  return {
    _type: 'ctaBanner',
    heading:
      opts?.heading ??
      (isEn
        ? 'A solution for every role in your ecosystem'
        : 'Una solución para cada rol en tu ecosistema'),
    subheading:
      opts?.description ??
      (isEn
        ? 'Vertebra adapts to the specific needs of owners, tenants and administrators, unifying communication and processes on a single platform.'
        : 'Vértebra se adapta a las necesidades específicas de propietarios, inquilinos y administradores, unificando la comunicación y los procesos en una sola plataforma.'),
    secondaryCta: {
      label: isEn ? 'Message us on WhatsApp' : 'Escríbenos por WhatsApp',
      href: 'https://wa.me/+51983723379',
    },
    cta: {
      label: opts?.primaryLabel ?? (isEn ? 'Free Vertebra trial' : 'Prueba gratis Vértebra'),
      href: agenda,
    },
    bgSrc: `${WF}/Frame-1000005638-1.png`,
    bgSrcSet: `${WF}/Frame-1000005638-1-p-500.png 500w, ${WF}/Frame-1000005638-1-p-800.png 800w, ${WF}/Frame-1000005638-1.png 1200w`,
    wrapped: false,
  }
}

export function benefitsFixtures(locale: Locale): PageSection[] {
  const isEn = locale === 'en'

  return [
    {
      _type: 'headerInternal',
      variant: 'base',
      heading: isEn ? 'Benefits' : 'Beneficios',
      iconSrc: `${WF}/Frame-1000005709.svg`,
      personSrc: `${WF}/image-3_2.png`,
      personSrcSet: `${WF}/image-3_2-p-500.png 500w, ${WF}/image-3_2.png 631w`,
      bgSrc: `${WF}/background-1.png`,
      bgSrcSet: `${WF}/background-1-p-500.png 500w, ${WF}/background-1-p-800.png 800w, ${WF}/background-1-p-1080.png 1080w, ${WF}/background-1.png 1440w`,
    },
    {
      _type: 'benefitsRoles',
      heading: isEn ? 'Built to empower your team' : 'Creado para potenciar a tu equipo',
      subheading: isEn
        ? 'Discover how our specialized tools optimize the tasks of each profile.'
        : 'Descubre cómo nuestras herramientas especializadas optimizan las tareas de cada perfil.',
      cards: [
        {
          title: isEn ? 'For Owners' : 'Para Propietarios',
          description: isEn
            ? 'Full control over your contracts, rents and financial reports to maximize portfolio profitability.'
            : 'Control total sobre tus contratos, rentas y reportes financieros para maximizar la rentabilidad de tu portafolio.',
          iconSrc: `${WF}/icon-v3.svg`,
          items: isEn
            ? [
                'Dashboards with real-time KPIs.',
                'Contract expiration management.',
                'Income and expense reports.',
              ]
            : [
                'Dashboards con KPIs en tiempo real.',
                'Gestión de vencimientos de contratos.',
                'Reportes de ingresos y egresos.',
              ],
        },
        {
          title: isEn ? 'For Tenants' : 'Para Inquilinos',
          description: isEn
            ? 'A portal to access contracts and raise maintenance requests easily.'
            : 'Un portal para acceder a contratos y levantar solicitudes de mantenimiento de forma sencilla.',
          iconSrc: `${WF}/icon-v3.svg`,
          items: isEn
            ? ['Digital access to their contract.', 'Service ticket tracking.']
            : ['Acceso digital a su contrato.', 'Seguimiento de tickets de servicio.'],
        },
        {
          title: isEn ? 'For Administrators' : 'Para Administrativos',
          description: isEn
            ? 'Centralize management, automate repetitive tasks and keep a record of quotes and maintenance.'
            : 'Centraliza la gestión, automatiza tareas repetitivas y mantén un registro de cotizaciones y mantenimiento.',
          iconSrc: `${WF}/icon-v3.svg`,
          items: isEn
            ? [
                'Centralized asset database.',
                'Collections automation.',
                'Operational management reports.',
              ]
            : [
                'Base de datos centralizada de activos.',
                'Automatización de cobranza.',
                'Reportes de gestión operativa.',
              ],
        },
      ],
    },
    {
      _type: 'trustLogos',
      eyebrow: isEn ? 'They trust us' : 'Confían en nosotros',
      heading: isEn
        ? 'Industry leaders trust us'
        : 'Líderes de la industria confían en nosotros',
      moreLabel: isEn ? 'and many more' : 'y muchos más',
      tone: 'white',
      logos: [
        {name: 'KNX', src: `${WF}/logo-knx.png`},
        {name: 'Arende', src: `${WF}/Arende.png`},
        {name: 'CV', src: `${WF}/Logo-CV.jpg`},
        {name: 'Bloc', src: `${WF}/logo-bloc.png`},
      ],
    },
    demoCtaSection(locale),
  ]
}

export function benefitsPageMeta(locale: Locale) {
  return {
    title: locale === 'en' ? 'Benefits' : 'Beneficios',
    description:
      locale === 'en'
        ? 'Discover how Vertebra optimizes tasks for owners, tenants and administrators.'
        : 'Descubre cómo Vértebra optimiza las tareas de propietarios, inquilinos y administradores.',
  }
}
