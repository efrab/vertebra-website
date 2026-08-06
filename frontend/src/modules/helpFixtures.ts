import type {Locale} from '../i18n/routes'
import {getLocalizedPath} from '../i18n/routes'
import type {PageSection} from './fixtures'

const WF = '/assets/webflow/images'

export function helpCenterFixtures(locale: Locale): PageSection[] {
  const isEn = locale === 'en'
  return [
    {
      _type: 'headerInternal',
      variant: 'base',
      heading: isEn ? 'Help center' : 'Centro de ayuda',
      personSrc: `${WF}/Frame-1000005708_1.png`,
      personSrcSet: `${WF}/Frame-1000005708_1-p-500.png 500w, ${WF}/Frame-1000005708_1.png 579w`,
      iconSrc: `${WF}/Frame-1000005709.svg`,
      bgSrc: `${WF}/background-1.png`,
      bgSrcSet: `${WF}/background-1-p-500.png 500w, ${WF}/background-1-p-800.png 800w, ${WF}/background-1-p-1080.png 1080w, ${WF}/background-1.png 1440w`,
    },
    {
      _type: 'helpTopics',
      heading: isEn ? 'How can we help you?' : '¿En qué podemos ayudarte?',
      searchPlaceholder: isEn ? 'Search...' : 'Buscar...',
      searchAction: getLocalizedPath(locale, 'howCanWeHelpSearch'),
      topics: [
        {
          title: isEn ? 'First steps' : 'Primeros pasos',
          iconSrc: `${WF}/almuerzo-cohete-1-1_1.svg`,
          items: isEn
            ? [
                'Create a company',
                'Register units',
                'Add landlords and tenants',
                'Add vendors',
                'Invite the team',
              ]
            : [
                'Crear empresa',
                'Registrar unidades',
                'Agregar arrendadores e inquilinos',
                'Agregar proveedores',
                'Invitar al equipo',
              ],
          tip: isEn
            ? 'Useful for initial onboarding and system setup.'
            : 'Útiles para onboarding inicial y configuración del sistema.',
        },
        {
          title: isEn ? 'Contracts' : 'Contratos',
          iconSrc: `${WF}/almuerzo-cohete-1-1-5.svg`,
          items: isEn
            ? [
                'Enter a contract',
                'Configure rent increases',
                'Define maintenance payments',
                'Renew or end contracts',
              ]
            : [
                'Ingresar un contrato',
                'Configurar incrementos de renta',
                'Definir pagos de mantenimiento',
                'Renovar o finalizar contratos',
              ],
          tip: isEn
            ? 'Very practical for users with active operations.'
            : 'Muy práctico para usuarios con operaciones activas.',
        },
        {
          title: isEn ? 'Maintenance' : 'Mantenimiento',
          iconSrc: `${WF}/almuerzo-cohete-1-1-5.svg`,
          items: isEn
            ? ['Create tickets', 'Assign vendors', 'Track status', 'Close work orders']
            : [
                'Crear tickets',
                'Asignar proveedores',
                'Seguimiento de estatus',
                'Cerrar órdenes de trabajo',
              ],
          tip: isEn
            ? 'Keep property operations organized.'
            : 'Mantén la operación de tus propiedades organizada.',
        },
        {
          title: isEn ? 'Billing' : 'Cobranza',
          iconSrc: `${WF}/almuerzo-cohete-1-1-3.svg`,
          items: isEn
            ? ['Generate invoices', 'Record payments', 'Follow up delinquency', 'Export reports']
            : [
                'Generar facturas',
                'Registrar pagos',
                'Seguimiento de morosidad',
                'Exportar reportes',
              ],
        },
        {
          title: isEn ? 'Documents' : 'Documentos',
          iconSrc: `${WF}/almuerzo-cohete-1-1-2.svg`,
          items: isEn
            ? ['Upload files', 'Organize folders', 'Share with tenants', 'Digital signatures']
            : [
                'Subir archivos',
                'Organizar carpetas',
                'Compartir con inquilinos',
                'Firmas digitales',
              ],
        },
        {
          title: isEn ? 'Account & users' : 'Cuenta y usuarios',
          iconSrc: `${WF}/almuerzo-cohete-1-1-1.svg`,
          items: isEn
            ? ['Manage roles', 'Reset password', 'Billing settings', 'Integrations']
            : [
                'Gestionar roles',
                'Restablecer contraseña',
                'Configuración de facturación',
                'Integraciones',
              ],
        },
      ],
    },
    {
      _type: 'ctaBanner',
      heading: isEn ? 'Still need help?' : '¿Aún necesitas ayuda?',
      subheading: isEn ? 'Talk to an expert' : 'Habla con un experto',
      cta: {
        label: isEn ? 'Contact an advisor' : 'Contactar con un asesor',
        href: getLocalizedPath(locale, 'contact'),
      },
      wrapped: false,
    },
  ]
}

export function howCanWeHelpFixtures(locale: Locale): PageSection[] {
  const isEn = locale === 'en'
  return [
    {
      _type: 'headerInternal',
      variant: 'base',
      heading: isEn ? 'How can we help?' : '¿Cómo podemos ayudarte?',
      personSrc: `${WF}/Frame-1000005708_1.png`,
      personSrcSet: `${WF}/Frame-1000005708_1-p-500.png 500w, ${WF}/Frame-1000005708_1.png 579w`,
      iconSrc: `${WF}/Frame-1000005709.svg`,
      bgSrc: `${WF}/background-1.png`,
      bgSrcSet: `${WF}/background-1-p-500.png 500w, ${WF}/background-1-p-800.png 800w, ${WF}/background-1-p-1080.png 1080w, ${WF}/background-1.png 1440w`,
    },
    {
      _type: 'helpTopics',
      heading: isEn ? 'Guides and resources' : 'Guías y recursos',
      searchPlaceholder: isEn ? 'Search guides...' : 'Buscar guías...',
      searchAction: getLocalizedPath(locale, 'howCanWeHelpSearch'),
      topics: [
        {
          title: isEn ? 'Getting started videos' : 'Videos para empezar',
          iconSrc: `${WF}/almuerzo-cohete-1-1_1.svg`,
          items: isEn
            ? ['Register a property', 'Invite your team', 'Create your first contract']
            : [
                'Registrar una propiedad',
                'Invitar a tu equipo',
                'Crear tu primer contrato',
              ],
        },
        {
          title: isEn ? 'Popular articles' : 'Artículos populares',
          iconSrc: `${WF}/almuerzo-cohete-1-1-5.svg`,
          items: isEn
            ? ['Rent increases', 'Maintenance tickets', 'Payment reminders']
            : [
                'Incrementos de renta',
                'Tickets de mantenimiento',
                'Recordatorios de pago',
              ],
        },
      ],
    },
  ]
}

export function howCanWeHelpSearchFixtures(locale: Locale): PageSection[] {
  const isEn = locale === 'en'
  return [
    {
      _type: 'headerInternal',
      variant: 'interna',
      heading: isEn ? 'Help search' : 'Buscador de ayuda',
      bgSrc: `${WF}/background-1.png`,
      bgSrcSet: `${WF}/background-1-p-500.png 500w, ${WF}/background-1-p-800.png 800w, ${WF}/background-1-p-1080.png 1080w, ${WF}/background-1.png 1440w`,
    },
    {
      _type: 'helpTopics',
      heading: isEn ? 'Search results' : 'Resultados de búsqueda',
      searchPlaceholder: isEn ? 'Search...' : 'Buscar...',
      topics: [
        {
          title: isEn ? 'Suggested topics' : 'Temas sugeridos',
          iconSrc: `${WF}/almuerzo-cohete-1-1.svg`,
          items: isEn
            ? ['Create company', 'Enter a contract', 'Generate invoices']
            : ['Crear empresa', 'Ingresar un contrato', 'Generar facturas'],
        },
      ],
    },
  ]
}

export function helpPageMeta(
  locale: Locale,
  key: 'helpCenter' | 'howCanWeHelp' | 'howCanWeHelpSearch',
) {
  const isEn = locale === 'en'
  const map = {
    helpCenter: {
      title: isEn ? 'Help center' : 'Centro de ayuda',
      description: isEn
        ? 'Find answers and resources to use Vertebra.'
        : 'Encuentra respuestas y recursos para usar Vertebra.',
    },
    howCanWeHelp: {
      title: isEn ? 'How can we help?' : '¿Cómo podemos ayudarte?',
      description: isEn
        ? 'Explore support guides and resources.'
        : 'Explora guías y recursos de soporte.',
    },
    howCanWeHelpSearch: {
      title: isEn ? 'Help search' : 'Buscador de ayuda',
      description: isEn
        ? 'Search articles and quick answers.'
        : 'Busca artículos y respuestas rápidas.',
    },
  }
  return map[key]
}
