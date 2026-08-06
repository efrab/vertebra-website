import type {Locale} from '../i18n/routes'
import type {PageSection} from './fixtures'
import {demoCtaSection} from './benefitsFixtures'

const WF = '/assets/webflow/images'

export function aiFixtures(locale: Locale): PageSection[] {
  const isEn = locale === 'en'

  return [
    {
      _type: 'headerInternal',
      variant: 'base',
      heading: 'AI',
      personSrc: `${WF}/Group-1000005377-1.png`,
      personSrcSet: `${WF}/Group-1000005377-1-p-500.png 500w, ${WF}/Group-1000005377-1.png 704w`,
      bgSrc: `${WF}/background-1.png`,
      bgSrcSet: `${WF}/background-1-p-500.png 500w, ${WF}/background-1-p-800.png 800w, ${WF}/background-1-p-1080.png 1080w, ${WF}/background-1.png 1440w`,
    },
    {
      _type: 'evaFeatures',
      heading: isEn
        ? 'Eva, your intelligent assistant in Vertebra'
        : 'Eva, tu asistente inteligente en Vértebra',
      subheading: isEn
        ? 'Eva is integrated into Vertebra to simplify property management with instant answers, smart suggestions and direct access to the information you need.'
        : 'Eva está integrada a Vértebra para simplificar la gestión inmobiliaria con respuestas instantáneas, sugerencias inteligentes y acceso directo a la información que necesitas.',
      introLabel: isEn ? 'With Eva you can:' : 'Con Eva podrás:',
      items: [
        {
          description: isEn
            ? 'Resolve questions in seconds with a chat that is always available.'
            : 'Resolver dudas en segundos con un chat siempre disponible.',
          iconSrc: `${WF}/almuerzo-cohete-1-1.svg`,
        },
        {
          description: isEn
            ? 'Access key contract, property and payment information instantly.'
            : 'Acceder a información clave de contratos, propiedades y pagos al instante.',
          iconSrc: `${WF}/almuerzo-cohete-1-1.svg`,
        },
        {
          description: isEn
            ? 'Improve productivity by removing repetitive search and lookup tasks.'
            : 'Mejorar tu productividad eliminando tareas repetitivas de búsqueda y consulta.',
          iconSrc: `${WF}/almuerzo-cohete-1-1.svg`,
        },
        {
          description: isEn
            ? 'Get smart suggestions to anticipate expirations, delinquency and increases.'
            : 'Recibir sugerencias inteligentes para anticipar vencimientos, morosidad e incrementos.',
          iconSrc: `${WF}/almuerzo-cohete-1-1.svg`,
        },
      ],
    },
    {
      _type: 'howItWorks',
      heading: isEn ? 'Key benefits' : 'Beneficios clave',
      steps: [
        {
          number: '1',
          title: isEn ? 'Intelligent automation' : 'Automatización inteligente',
          description: isEn
            ? 'Eva detects patterns in your portfolio and proposes actions.'
            : 'Eva detecta patrones en tu portafolio y propone acciones.',
        },
        {
          number: '2',
          title: isEn ? '24/7 support' : 'Acompañamiento 24/7',
          description: isEn
            ? 'Available at all times for your team.'
            : 'Disponible en todo momento para tu equipo.',
        },
        {
          number: '3',
          title: isEn ? 'Complete vision' : 'Visión completa',
          description: isEn
            ? 'Connect metrics, contracts, maintenance and finances in a single interface.'
            : 'Conecta métricas, contratos, mantenimiento y finanzas en una sola interfaz.',
        },
      ],
    },
    {
      ...demoCtaSection(locale, {
        heading: isEn
          ? 'With Eva, your property management is faster, clearer and smarter.'
          : 'Con Eva, tu gestión inmobiliaria es más rápida, más clara y más inteligente.',
        description: '',
      }),
      subheading: undefined,
    },
  ]
}

export function aiPageMeta(locale: Locale) {
  return {
    title: 'AI',
    description:
      locale === 'en'
        ? 'Eva, your intelligent Vertebra assistant for faster property management.'
        : 'Eva, tu asistente inteligente en Vértebra para una gestión inmobiliaria más rápida.',
  }
}
