import type {Locale} from '../i18n/routes'
import {getLocalizedPath} from '../i18n/routes'
import type {PageSection} from './fixtures'
import {demoCtaSection} from './benefitsFixtures'

const WF = '/assets/webflow/images'
const ICONS = '/assets/webflow/icons/modules'
const MEDIA = '/assets/inspections'

export function inspectionsLandingFixtures(locale: Locale): PageSection[] {
  const isEn = locale === 'en'
  const agenda = getLocalizedPath(locale, 'agenda')

  return [
    {
      _type: 'heroHome',
      headingBold: isEn ? 'Inspections that schedule themselves' : 'Inspecciones que se programan solas',
      headingLight: isEn ? 'and come back fully documented' : 'y se documentan completas',
      heading: isEn ? 'Inspections' : 'Inspecciones',
      subheading: isEn
        ? 'Schedule recurring reviews of your properties, capture evidence on site and let AI write the report conclusion.'
        : 'Programa revisiones periódicas de tus inmuebles, registra la evidencia en sitio y deja que la IA redacte la conclusión del reporte.',
      primaryCta: {label: isEn ? 'Book a demo' : 'Agenda una demo', href: agenda},
      gifSrc: `${MEDIA}/run.webp`,
      videoSrc: `${MEDIA}/hero-loop.mp4`,
      posterSrc: `${MEDIA}/hero-loop-poster.jpg`,
      mobileVideoSrc: `${MEDIA}/hero-loop-mobile.mp4`,
      mobilePosterSrc: `${MEDIA}/hero-loop-poster-480.jpg`,
    },
    {
      _type: 'howItWorks',
      heading: isEn ? 'How it works' : 'Cómo funciona',
      steps: [
        {
          number: '1',
          title: isEn ? 'Schedule' : 'Programa',
          description: isEn
            ? 'Choose the property, the frequency (daily to yearly), the time window and an internal or external owner.'
            : 'Elige el inmueble, la frecuencia (de diaria a anual), el horario y un responsable interno o externo.',
        },
        {
          number: '2',
          title: isEn ? 'Load the tasks' : 'Carga las tareas',
          description: isEn
            ? 'Type them in or upload them from Excel. Assets and vendors are filtered by property.'
            : 'Escríbelas o súbelas desde Excel. Los activos y proveedores se filtran por inmueble.',
        },
        {
          number: '3',
          title: isEn ? 'Run it on site' : 'Ejecuta en sitio',
          description: isEn
            ? 'Rate each point as optimal, acceptable or critical, or tick it off as a checklist, with photos and notes.'
            : 'Califica cada punto como óptimo, aceptable o crítico, o márcalo como checklist, con fotos y observaciones.',
        },
        {
          number: '4',
          title: isEn ? 'AI writes the conclusion' : 'La IA concluye',
          description: isEn
            ? 'Vertebra drafts the overall condition, the critical findings and what still needs documenting.'
            : 'Vértebra redacta el estado general, los hallazgos críticos y lo que falta documentar.',
        },
        {
          number: '5',
          title: isEn ? 'Follow up' : 'Da seguimiento',
          description: isEn
            ? 'Open a work order from any task and review the full history year by year.'
            : 'Crea una orden de trabajo desde cualquier tarea y consulta el historial completo año por año.',
        },
      ],
    },
    {
      _type: 'moduleShowcase',
      heading: isEn ? 'Everything an inspection needs' : 'Todo lo que una inspección necesita',
      headerIconSrc: `${WF}/Frame-1000005709.svg`,
      headerBgSrc: `${WF}/Frame-1000005625.png`,
      headerBgSrcSet: `${WF}/Frame-1000005625-p-500.png 500w, ${WF}/Frame-1000005625-p-800.png 800w, ${WF}/Frame-1000005625-p-1080.png 1080w, ${WF}/Frame-1000005625.png 1200w`,
      tabs: [
        {
          id: 'inspecciones',
          label: isEn ? 'Inspections' : 'Inspecciones',
          iconSrc: `${ICONS}/mantenimiento.svg`,
          heading: isEn ? 'Inspections' : 'Inspecciones',
          sections: [
            {
              title: isEn ? 'Flexible scheduling' : 'Programación flexible',
              description: isEn
                ? 'Define the inspection once and Vertebra creates every instance automatically, with the owners and tasks already assigned.'
                : 'Define la inspección una vez y Vértebra genera cada instancia automáticamente, con responsables y tareas ya asignados.',
              imageSrc: `${MEDIA}/schedule.webp`,
              cards: [
                {
                  largeText: true,
                  description: isEn
                    ? 'Eight frequencies, from daily to yearly.'
                    : 'Ocho frecuencias, de diaria a anual.',
                },
                {
                  largeText: true,
                  description: isEn
                    ? 'Start day, closing day and optional weekends.'
                    : 'Día de inicio, día de cierre y fines de semana opcionales.',
                },
                {
                  largeText: true,
                  description: isEn
                    ? 'Preview the impact before changing the schedule.'
                    : 'Ve el impacto antes de cambiar la programación.',
                },
              ],
            },
            {
              title: isEn ? 'Evidence on every task' : 'Evidencia en cada tarea',
              description: isEn
                ? 'Each task is rated, timestamped and backed by photos. Vendors can use checklist mode and upload their own reports.'
                : 'Cada tarea queda calificada, con fecha y hora, y respaldada con fotos. Los proveedores pueden usar el modo checklist y subir sus propios reportes.',
              imageSrc: `${MEDIA}/run.webp`,
              cards: [
                {
                  largeText: true,
                  description: isEn
                    ? 'Optimal, acceptable or critical status.'
                    : 'Estatus óptimo, aceptable o crítico.',
                },
                {
                  largeText: true,
                  description: isEn
                    ? 'Mandatory photos when you need them.'
                    : 'Fotos obligatorias cuando las necesites.',
                },
                {
                  largeText: true,
                  description: isEn
                    ? 'Work orders created straight from a finding.'
                    : 'Órdenes de trabajo creadas desde el hallazgo.',
                },
              ],
            },
            {
              title: isEn ? 'History, reports and dashboard' : 'Historial, reportes y dashboard',
              description: isEn
                ? 'See every task across every instance in a yearly grid, download a PDF per instance and track on-time completion and critical findings by owner.'
                : 'Mira cada tarea en cada instancia en una tabla por año, descarga un PDF por instancia y mide el cumplimiento a tiempo y los hallazgos críticos por responsable.',
              imageSrc: `${MEDIA}/history.webp`,
              cards: [
                {
                  largeText: true,
                  description: isEn
                    ? 'Yearly history, task by task.'
                    : 'Historial por año, tarea por tarea.',
                },
                {
                  largeText: true,
                  description: isEn
                    ? 'PDF report to share without an account.'
                    : 'Reporte PDF para compartir sin cuenta.',
                },
                {
                  largeText: true,
                  description: isEn
                    ? 'On-time rate and critical findings per owner.'
                    : 'Cumplimiento a tiempo y hallazgos críticos por responsable.',
                },
              ],
            },
          ],
          message: {
            line: isEn ? 'Prevent incidents, prove compliance and' : 'Previene incidencias, demuestra cumplimiento y',
            highlight: isEn ? 'know the real condition of every property.' : 'conoce el estado real de cada inmueble.',
          },
        },
      ],
    },
    {
      _type: 'evaFeatures',
      heading: isEn ? 'AI that writes the report for you' : 'IA que redacta el reporte por ti',
      subheading: isEn
        ? 'When an instance is closed, Vertebra reads every task, rating and note and writes a conclusion for whoever fixes the issues and for the property owner.'
        : 'Al cerrar una instancia, Vértebra lee cada tarea, calificación y observación, y redacta una conclusión para quien corrige y para el dueño del inmueble.',
      introLabel: isEn ? 'The conclusion includes:' : 'La conclusión incluye:',
      items: [
        {
          description: isEn
            ? 'Scope and overall condition, grouped by the patterns the findings share.'
            : 'Alcance y estado general, agrupando los hallazgos por los patrones que comparten.',
          icon: 'squares-2x2',
        },
        {
          description: isEn
            ? 'Every critical finding, one line each, so none is left out.'
            : 'Cada hallazgo crítico en una línea, sin que ninguno quede fuera.',
          icon: 'bolt',
        },
        {
          description: isEn
            ? 'Critical tasks still missing notes, flagged as pending documentation.'
            : 'Las tareas críticas sin observación, marcadas como pendientes de documentar.',
          icon: 'rocket-launch',
        },
        {
          description: isEn
            ? 'Only what was recorded: no invented findings, causes or data. Ask Eva about any inspection from the chat.'
            : 'Solo lo que se registró: sin hallazgos, causas ni datos inventados. Y puedes preguntarle a Eva por cualquier inspección desde el chat.',
          icon: 'chat-bubble-left-right',
        },
      ],
    },
    {
      ...demoCtaSection(locale, {
        heading: isEn
          ? 'Your next inspection can already be in Vertebra'
          : 'Tu próxima inspección ya puede estar en Vértebra',
        description: isEn
          ? 'Book a demo and we will configure your first inspection with you.'
          : 'Agenda una demo y configuramos contigo tu primera inspección.',
        primaryLabel: isEn ? 'Book a demo' : 'Agenda una demo',
      }),
    },
  ]
}

export function inspectionsLandingPageMeta(locale: Locale) {
  const isEn = locale === 'en'
  return {
    title: isEn ? 'Inspections module' : 'Módulo de Inspecciones',
    description: isEn
      ? 'Schedule recurring property inspections, capture evidence on site and get an AI-written conclusion for every report.'
      : 'Programa inspecciones periódicas de tus inmuebles, registra evidencia en sitio y obtén una conclusión redactada por IA en cada reporte.',
  }
}
