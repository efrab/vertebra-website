import type {Locale} from '../i18n/routes'
import {getLocalizedPath} from '../i18n/routes'
import type {PageSection} from './fixtures'

const WF = '/assets/webflow/images'
const ICONS = '/assets/webflow/icons/modules'

type Card = {title?: string; description: string; largeText?: boolean}
type ModuleSection = {
  title?: string
  description?: string
  imageSrc: string
  imageSrcSet?: string
  cards: Card[]
}
type ModuleTab = {
  id: string
  label: string
  iconSrc: string
  heading: string
  sections: ModuleSection[]
  message: {line: string; highlight: string}
}

function tabs(isEn: boolean): ModuleTab[] {
  return [
    {
      id: 'metricas',
      label: isEn ? 'Metrics' : 'Métricas',
      iconSrc: `${ICONS}/metricas.svg`,
      heading: isEn ? 'Metrics' : 'Métricas',
      sections: [
        {
          title: 'Dashboards',
          description: isEn
            ? 'See key portfolio metrics in real time like occupancy, finances, maintenance orders and more. Generate detailed reports with occupancy, finance and maintenance metrics for a complete view of your portfolio.'
            : 'Visualiza métricas clave de tu portafolio en tiempo real como ocupación, finanzas, órdenes de mantenimientos y otras. Genera reportes detallados con métricas clave de ocupación, finanzas y mantenimiento para una visión completa de tu portafolio.',
          imageSrc: `${WF}/_dashboard.gif`,
          cards: [
            {
              title: isEn ? 'Properties' : 'Propiedades',
              description: isEn
                ? 'Review units, areas, contracts and utility payments, among others.'
                : 'Revisa unidades, áreas, contratos y pagos de servicios, entre otros.',
            },
            {
              title: isEn ? 'Contracts' : 'Contratos',
              description: isEn
                ? 'Monitor renewals, occupancy, increases and other key indicators.'
                : 'Monitorea vencimientos, ocupación, incrementos y más indicadores clave.',
            },
            {
              title: isEn ? 'Maintenance' : 'Mantenimiento',
              description: isEn
                ? 'Control requests, work orders, resolution times, external tasks and more. Measure completion rate, average resolution times and other indicators.'
                : 'Controla solicitudes, órdenes, tiempos de resolución, tareas externas y más.  Mide la tasa de cumplimiento, tiempos promedio de resolución, entre otros indicadores.',
            },
          ],
        },
        {
          title: isEn ? 'Reports' : 'Reportes',
          description: isEn
            ? 'Generate automated detailed reports with key occupancy, finance and maintenance metrics for a complete view of your portfolio.'
            : 'Genera reportes automatizados detallados con métricas clave de ocupación, finanzas y mantenimiento para una visión completa de tu portafolio.',
          imageSrc: `${WF}/_reportes.gif`,
          cards: [
            {
              title: 'Rent Roll',
              description: isEn
                ? 'Check units, contracts and active rents with amounts, areas and due dates.'
                : 'Consulta unidades, contratos y rentas activas con detalle de montos, áreas y vencimientos.',
            },
            {
              title: isEn ? 'Delinquency' : 'Morosidad',
              description: isEn
                ? 'Monitor overdue payments, identify debtors and track recovery rate.'
                : 'Monitorea pagos vencidos, identifica deudores y controla la tasa de recuperación.',
            },
            {
              title: isEn ? 'Increases' : 'Incrementos',
              description: isEn
                ? 'Review upcoming rent adjustments and keep a history of applied increases.'
                : 'Revisa los próximos ajustes de renta y lleva un historial de incrementos aplicados.',
            },
          ],
        },
      ],
      message: {
        line: isEn ? 'Optimize costs, improve response times and' : 'Optimiza costos, mejora tiempos de respuesta y',
        highlight: isEn ? 'extend the useful life of your properties.' : 'extiende la vida útil de tus inmuebles.',
      },
    },
    {
      id: 'propiedades',
      label: isEn ? 'Properties' : 'Propiedades',
      iconSrc: `${ICONS}/propiedades.svg`,
      heading: isEn ? 'Properties' : 'Propiedades',
      sections: [
        {
          description: isEn
            ? 'Manage every unit and area of your portfolio in one place.\nReview linked contracts, utility payments, total square footage and key documentation for each property.'
            : 'Administra todas las unidades y áreas de tu portafolio en un solo lugar.\nRevisa contratos asociados, pagos de servicios, metraje total y documentación clave para cada propiedad.',
          imageSrc: `${WF}/_propiedades.gif`,
          cards: [
            {
              largeText: true,
              description: isEn
                ? 'Review units, areas and contracts linked to your portfolio.'
                : 'Revisa unidades, áreas y contratos vinculados a tu portafolio.',
            },
            {
              largeText: true,
              description: isEn
                ? 'Check utility payments and total square footage for each property.'
                : 'Consulta pagos de servicios y metraje total de cada propiedad.',
            },
            {
              largeText: true,
              description: isEn
                ? 'Access key documentation and the history of each unit. Create reminders for policy renewals, permits and more.'
                : 'Accede a documentación clave y al historial de cada unidad. Crea recordatorios de renovaciones de pólizas, permisos, entre otros',
            },
            {
              largeText: true,
              description: isEn
                ? 'Create reminders for policy renewals, permits and more'
                : 'Crea recordatorios de renovaciones de pólizas, permisos, entre otros',
            },
          ],
        },
      ],
      message: {
        line: isEn ? 'Integrate all your property information' : 'Integra toda la información de tus inmuebles',
        highlight: isEn ? 'in one place.' : 'en un solo lugar.',
      },
    },
    {
      id: 'contratos',
      label: isEn ? 'Contracts' : 'Contratos',
      iconSrc: `${ICONS}/contratos.svg`,
      heading: isEn ? 'Contracts' : 'Contratos',
      sections: [
        {
          description: isEn
            ? 'Centrally manage the lifecycle of your lease, purchase, maintenance and many other contract types. Keep full clarity on renewals, occupancy and increases.'
            : 'Gestiona de forma centralizada el ciclo de vida de tus contratos de arrendamiento, compraventa, mantenimientos, entre muchos otros tipos. Mantén el control sobre vencimientos, ocupación e incrementos con total claridad',
          imageSrc: `${WF}/_contratos.gif`,
          cards: [
            {
              largeText: true,
              description: isEn
                ? 'Monitor renewals and expirations ahead of time.'
                : 'Monitorea vencimientos y renovaciones de manera anticipada.',
            },
            {
              largeText: true,
              description: isEn
                ? 'Track occupancy rate and applied rent adjustments.'
                : 'Supervisa la tasa de ocupación y los ajustes de renta aplicados.',
            },
            {
              largeText: true,
              description: isEn
                ? 'Automate increases with the right index. Review historical increases.'
                : 'Automatiza tus incrementos con el índice indicado. Consulta incrementos históricos.',
            },
          ],
        },
      ],
      message: {
        line: isEn ? 'Integrate all your property information' : 'Integra toda la información de tus inmuebles',
        highlight: isEn ? 'in one place.' : 'en un solo lugar.',
      },
    },
    {
      id: 'contable',
      label: isEn ? 'Accounting' : 'Contable',
      iconSrc: `${ICONS}/contable.svg`,
      heading: isEn ? 'Accounting' : 'Contable',
      sections: [
        {
          title: isEn ? 'Payments and collections' : 'Pagos y cobros',
          description: isEn
            ? 'Manage all portfolio operations in one place, from the simplest movements to the most complex.'
            : 'Administra todas las operaciones de tu portafolio en un solo lugar, desde los movimientos más simples hasta los más complejos.',
          imageSrc: `${WF}/_pagos-y-cobros.gif`,
          cards: [
            {
              largeText: true,
              description: isEn
                ? 'Control recurring payments and collections with configurable dates and amounts.'
                : 'Controla pagos y cobros recurrentes con fechas y montos configurables.',
            },
            {
              largeText: true,
              description: isEn
                ? 'Record one-off operations quickly without losing history.'
                : 'Registra operaciones únicas de forma rápida y sin perder historial.',
            },
            {
              largeText: true,
              description: isEn
                ? 'Keep full traceability and reconciliation for every transaction.'
                : 'Mantén trazabilidad y conciliación completa de cada transacción.',
            },
          ],
        },
        {
          title: isEn ? 'Billing' : 'Facturación',
          description: isEn
            ? 'Automate invoice generation and follow-up to ensure accuracy and punctuality in financial processes.'
            : 'Automatiza la generación y seguimiento de facturas para asegurar precisión y puntualidad en los procesos financieros.',
          imageSrc: `${WF}/Facturas.png`,
          imageSrcSet: `${WF}/Facturas-p-500.png 500w, ${WF}/Facturas-p-800.png 800w, ${WF}/Facturas-p-1080.png 1080w, ${WF}/Facturas.png 1280w`,
          cards: [
            {
              largeText: true,
              description: isEn
                ? 'Issue invoices automatically based on your active contracts.'
                : 'Emite facturas de manera automática según tus contratos activos.',
            },
            {
              largeText: true,
              description: isEn
                ? 'Schedule recurring billing and avoid delays.'
                : 'Programa facturación recurrente y evita retrasos.',
            },
            {
              largeText: true,
              description: isEn
                ? 'Centralize all receipts in an accessible digital history for more efficient reconciliation.'
                : 'Centraliza todos los comprobantes en un historial digital accesible para una conciliación más eficiente.',
            },
          ],
        },
      ],
      message: {
        line: isEn ? 'Consolidate financial information' : 'Consolida la información financiera',
        highlight: isEn ? 'in clear, up-to-date reports.' : 'en reportes claros y actualizados.',
      },
    },
    {
      id: 'mantenimiento',
      label: isEn ? 'Maintenance' : 'Mantenimiento',
      iconSrc: `${ICONS}/mantenimiento.svg`,
      heading: isEn ? 'Maintenance' : 'Mantenimiento',
      sections: [
        {
          title: isEn ? 'Maintenance requests' : 'Solicitudes de mantenimiento',
          description: isEn
            ? 'Centralize maintenance requests from internal and external users.'
            : 'Centraliza las solicitudes de mantenimiento de usuarios internos y externos.',
          imageSrc: `${WF}/_solicitud-de-mantenimiento.gif`,
          cards: [
            {
              largeText: true,
              description: isEn
                ? 'Log and prioritize requests by urgency.'
                : 'Registra y prioriza solicitudes según urgencia.',
            },
            {
              largeText: true,
              description: isEn
                ? 'Assign owners and track progress in real time.'
                : 'Asigna responsables y haz seguimiento en tiempo real.',
            },
            {
              largeText: true,
              description: isEn
                ? 'Guarantee traceability from start to close.'
                : 'Garantiza trazabilidad desde el inicio hasta el cierre.',
            },
          ],
        },
        {
          title: isEn ? 'Inspections' : 'Inspecciones',
          description: isEn
            ? 'Schedule and run periodic inspections to prevent incidents.'
            : 'Programa y ejecuta inspecciones periódicas para prevenir incidencias.',
          imageSrc: `${WF}/_inspecciones.gif`,
          cards: [
            {
              largeText: true,
              description: isEn
                ? 'Define daily, monthly or semi-annual inspections.'
                : 'Define inspecciones diarias, mensuales o semestrales.',
            },
            {
              largeText: true,
              description: isEn
                ? 'Document findings and generate automatic reports.'
                : 'Documenta hallazgos y genera reportes automáticos.',
            },
            {
              largeText: true,
              description: isEn
                ? 'Create work orders from inspections.'
                : 'Crea órdenes de trabajo a partir de inspecciones.',
            },
          ],
        },
        {
          title: isEn ? 'Work orders' : 'Órdenes de trabajo',
          description: isEn
            ? 'Turn requests and inspections into concrete actions.'
            : 'Convierte solicitudes e inspecciones en acciones concretas.',
          imageSrc: `${WF}/_ordenes-de-trabajo.gif`,
          cards: [
            {
              largeText: true,
              description: isEn
                ? 'Create, assign and control preventive or corrective orders.'
                : 'Crea, asigna y controla órdenes preventivas o correctivas.',
            },
            {
              largeText: true,
              description: isEn
                ? 'Monitor execution and resolution times.'
                : 'Monitorea tiempos de ejecución y resolución.',
            },
            {
              largeText: true,
              description: isEn
                ? 'Follow internal owners and vendors.'
                : 'Da seguimiento a responsables internos y proveedores.',
            },
            {
              largeText: true,
              description: isEn
                ? 'Collect feedback with satisfaction surveys.'
                : 'Recoge feedback con encuestas de satisfacción.',
            },
          ],
        },
        {
          title: isEn ? 'Quotes' : 'Cotizaciones',
          description: isEn
            ? 'Manage maintenance costs with transparency.'
            : 'Administra el costo de los mantenimientos con transparencia.',
          imageSrc: `${WF}/_cotizaciones.gif`,
          cards: [
            {
              largeText: true,
              description: isEn
                ? 'Request and approve third-party quotes.'
                : 'Solicita y aprueba cotizaciones de terceros.',
            },
            {
              largeText: true,
              description: isEn
                ? 'Compare prices and delivery times.'
                : 'Compara precios y tiempos de entrega.',
            },
            {
              largeText: true,
              description: isEn
                ? 'Control budgets and avoid overruns.'
                : 'Controla presupuestos y evita sobrecostos.',
            },
            {
              largeText: true,
              description: isEn
                ? 'Generate purchase orders from approved quotes.'
                : 'Genera órdenes de compra a partir de cotizaciones aprobadas.',
            },
          ],
        },
        {
          title: isEn ? 'Assets' : 'Activos',
          description: isEn
            ? 'Extend property lifespan with organized management.'
            : 'Extiende la vida útil de los inmuebles con una gestión organizada.',
          imageSrc: `${WF}/_activos.gif`,
          cards: [
            {
              largeText: true,
              description: isEn
                ? 'Register assets and their maintenance history.'
                : 'Registra activos y su historial de mantenimiento.',
            },
            {
              largeText: true,
              description: isEn
                ? 'Schedule preventive and corrective maintenance.'
                : 'Programa mantenimientos preventivos y correctivos.',
            },
            {
              largeText: true,
              description: isEn
                ? 'Review usage metrics and status for each asset.'
                : 'Consulta métricas de uso y estado de cada activo.',
            },
          ],
        },
      ],
      message: {
        line: isEn ? 'Optimize costs, improve response times and' : 'Optimiza costos, mejora tiempos de respuesta y',
        highlight: isEn ? 'extend the useful life of your properties.' : 'extiende la vida útil de tus inmuebles.',
      },
    },
  ]
}

export function modulesFixtures(locale: Locale): PageSection[] {
  const isEn = locale === 'en'
  const agenda = getLocalizedPath(locale, 'agenda')

  return [
    {
      _type: 'moduleShowcase',
      heading: isEn ? 'Modules' : 'Módulos',
      headerIconSrc: `${WF}/Frame-1000005709.svg`,
      headerBgSrc: `${WF}/Frame-1000005625.png`,
      headerBgSrcSet: `${WF}/Frame-1000005625-p-500.png 500w, ${WF}/Frame-1000005625-p-800.png 800w, ${WF}/Frame-1000005625-p-1080.png 1080w, ${WF}/Frame-1000005625.png 1200w`,
      tabs: tabs(isEn),
      cta: {
        heading: isEn ? 'Ready to see Vertebra in action?' : '¿Listo para ver Vértebra en acción?',
        description: isEn
          ? 'Book a personalized demo and discover how we add value to your portfolio management'
          : 'Agenda una demostración personalizada y descubre cómo agregamos valor a la administración de tu portafolio',
        primary: {
          label: isEn ? 'Free Vertebra trial' : 'Prueba gratis Vértebra',
          href: agenda,
        },
        secondary: {
          label: isEn ? 'Message us on WhatsApp' : 'Escríbenos por WhatsApp',
          href: 'https://wa.me/+51983723379',
        },
        bgSrc: `${WF}/Frame-1000005638-1.png`,
        bgSrcSet: `${WF}/Frame-1000005638-1-p-500.png 500w, ${WF}/Frame-1000005638-1-p-800.png 800w, ${WF}/Frame-1000005638-1.png 1200w`,
      },
    },
  ]
}

export function modulesPageMeta(locale: Locale) {
  return {
    title: locale === 'en' ? 'Modules' : 'Módulos',
    description:
      locale === 'en'
        ? 'The digital platform for tenants, administrators and owners to manage industrial and commercial properties'
        : 'La plataforma digital para que inquilinos, administradores y propietarios administren sus propiedades industriales y comerciales',
  }
}
