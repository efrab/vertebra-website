import type {Locale} from '../i18n/routes'

export const INSPECTIONS_MEDIA = '/assets/inspections'

type Feature = {
  tag: string
  title: string
  body: string
  bullets: string[]
  image: string
  alt: string
  highlight?: boolean
}

export type InspectionsLandingCopy = {
  meta: {title: string; description: string}
  hero: {
    eyebrow: string
    titleLead: string
    titleAccent: string
    body: string
    primaryCta: string
    secondaryCta: string
    proof: string[]
    screenshotAlt: string
    aiCardLabel: string
    aiCardText: string
    statusLabel: string
    statuses: {label: string; tone: 'success' | 'warning' | 'critical'}[]
  }
  contrast: {
    title: string
    before: {label: string; items: string[]}
    after: {label: string; items: string[]}
  }
  video: {eyebrow: string; title: string; body: string}
  featuresTitle: string
  features: Feature[]
  roles: {title: string; body: string; items: {title: string; body: string}[]}
  start: {title: string; body: string; steps: {title: string; body: string}[]; cta: string}
  faq: {title: string; items: {question: string; answer: string}[]}
  finalCta: {title: string; body: string; primary: string; secondary: string}
}

const es: InspectionsLandingCopy = {
  meta: {
    title: 'Módulo de Inspecciones',
    description:
      'Programa inspecciones periódicas de tus inmuebles, registra evidencia en sitio y obtén una conclusión redactada por IA en cada reporte.',
  },
  hero: {
    eyebrow: 'Nuevo en Vértebra',
    titleLead: 'Tus inspecciones,',
    titleAccent: 'en piloto automático.',
    body: 'Programa cada revisión una sola vez. Vértebra la activa a tiempo, tu equipo registra la evidencia en sitio y la IA redacta la conclusión del reporte.',
    primaryCta: 'Agenda una demo',
    secondaryCta: 'Ver cómo funciona',
    proof: ['De diaria a anual', 'Evidencia con fotos', 'Conclusión con IA'],
    screenshotAlt: 'Instancia de inspección con tareas calificadas como óptimo, aceptable y crítico',
    aiCardLabel: 'Conclusión generada por IA',
    aiCardText: '8 tareas revisadas: 3 críticas. Prioridad: filtración en techumbre y extintores vencidos.',
    statusLabel: 'Cada tarea, calificada',
    statuses: [
      {label: 'Óptimo', tone: 'success'},
      {label: 'Aceptable', tone: 'warning'},
      {label: 'Crítico', tone: 'critical'},
    ],
  },
  contrast: {
    title: 'Deja atrás la inspección en Excel',
    before: {
      label: 'Hoy',
      items: [
        'Checklists en hojas de cálculo que nadie actualiza',
        'Fotos sueltas en WhatsApp y correos',
        'Reportes armados a mano en Word',
        'Nadie sabe qué revisión venció',
      ],
    },
    after: {
      label: 'Con Vértebra',
      items: [
        'La inspección se activa sola según su frecuencia',
        'Cada tarea con calificación, fotos, fecha y hora',
        'La IA redacta la conclusión en segundos',
        'Dashboard de cumplimiento y hallazgos críticos',
      ],
    },
  },
  video: {
    eyebrow: 'En acción',
    title: 'Del calendario al reporte, sin salir de Vértebra',
    body: 'Programación, ejecución, conclusión con IA, historial y dashboard: así se ve el módulo con datos reales de un parque industrial.',
  },
  featuresTitle: 'Todo lo que una inspección necesita',
  features: [
    {
      tag: 'Programa',
      title: 'Configúrala una vez. Se repite sola.',
      body: 'Define inmueble, frecuencia, horario y responsables. Vértebra genera cada instancia automáticamente y te muestra el impacto antes de cualquier cambio.',
      bullets: [
        'Ocho frecuencias, de diaria a anual',
        'Responsable interno y proveedor externo',
        'Tareas escritas o importadas desde Excel',
      ],
      image: `${INSPECTIONS_MEDIA}/schedule.webp`,
      alt: 'Configuración de frecuencia, horario y fechas de una inspección',
    },
    {
      tag: 'Ejecuta',
      title: 'Evidencia en cada punto revisado.',
      body: 'El responsable califica cada tarea como óptimo, aceptable o crítico, sube fotos y deja observaciones. Cada registro queda con fecha y hora.',
      bullets: [
        'Modo status o modo checklist',
        'Fotos obligatorias cuando las necesites',
        'Orden de trabajo directo desde el hallazgo',
      ],
      image: `${INSPECTIONS_MEDIA}/run.webp`,
      alt: 'Tareas de inspección con estatus y observaciones',
    },
    {
      tag: 'Concluye con IA',
      title: 'El reporte se escribe solo.',
      body: 'Al cerrar la instancia, la IA lee cada tarea y observación y redacta el alcance, el estado general, los hallazgos críticos y lo que falta documentar. Sin inventar datos.',
      bullets: [
        'Pensada para quien corrige y para el dueño',
        'Ningún hallazgo crítico queda fuera',
        'Editable antes de compartir',
      ],
      image: `${INSPECTIONS_MEDIA}/conclusion.webp`,
      alt: 'Conclusión del inspector redactada por IA con hallazgos críticos',
      highlight: true,
    },
    {
      tag: 'Historial',
      title: 'Cada tarea, mes a mes, en una sola vista.',
      body: 'El historial muestra todas las instancias por año: detectas de un vistazo qué se deteriora y qué se corrigió. Descarga cualquier instancia en PDF.',
      bullets: [
        'Tabla por año: tareas × instancias',
        'Reporte PDF con fotos para auditorías',
        'Comparte sin que el otro necesite cuenta',
      ],
      image: `${INSPECTIONS_MEDIA}/history.webp`,
      alt: 'Historial anual de una inspección con el estatus de cada tarea',
    },
    {
      tag: 'Mide',
      title: 'Sabe quién cumple y dónde están los riesgos.',
      body: 'El dashboard de mantenimiento consolida inspecciones e instancias: vencidas, completadas a tiempo, hallazgos críticos y rendimiento por responsable.',
      bullets: [
        '% a tiempo por responsable',
        'Hallazgos críticos por propiedad',
        'Internas vs. externas',
      ],
      image: `${INSPECTIONS_MEDIA}/dashboard.webp`,
      alt: 'Dashboard de inspecciones con indicadores de cumplimiento',
    },
  ],
  roles: {
    title: 'Un solo flujo para todos los involucrados',
    body: 'Cada quien ve lo que necesita, sin hojas de cálculo de por medio.',
    items: [
      {title: 'Administración', body: 'Programa, asigna y mide el cumplimiento de todo el portafolio.'},
      {title: 'Equipo interno', body: 'Encuentra su inspección activa y la completa con evidencia en sitio.'},
      {title: 'Proveedores', body: 'Usan el modo checklist y suben sus propios reportes por tarea.'},
      {title: 'Dueños y clientes', body: 'Reciben el PDF con resultados y conclusión, sin necesitar cuenta.'},
    ],
  },
  start: {
    title: '¿Ya usas Vértebra? Ya lo tienes.',
    body: 'El módulo está activo. Crea tu primera inspección en minutos.',
    steps: [
      {title: 'Entra a Inspecciones', body: 'Desde Mantenimiento → Inspecciones.'},
      {title: 'Carga tus tareas', body: 'Escríbelas o impórtalas desde la plantilla de Excel.'},
      {title: 'Asigna y listo', body: 'Elige responsable y frecuencia. Vértebra hace el resto.'},
    ],
    cta: 'Entrar a Vértebra',
  },
  faq: {
    title: 'Preguntas frecuentes',
    items: [
      {
        question: '¿Un proveedor externo puede hacer la inspección?',
        answer:
          'Sí. Se asigna como responsable externo y puede usar el modo checklist, subiendo un archivo por tarea o uno general para toda la instancia.',
      },
      {
        question: '¿Qué pasa si una inspección no se completa?',
        answer:
          'La instancia vence y queda registrada como no completada en el historial y en el dashboard de mantenimiento.',
      },
      {
        question: '¿Puedo cambiar la frecuencia después?',
        answer:
          'Sí. Antes de aplicar el cambio, Vértebra te muestra cuántas instancias se conservan, se eliminan y se crean. Las que ya tienen resultados siempre se preservan.',
      },
      {
        question: '¿La IA puede inventar hallazgos?',
        answer:
          'No. La conclusión se basa únicamente en las tareas, calificaciones y observaciones registradas, y puedes editarla antes de compartirla.',
      },
      {
        question: '¿Puedo compartir el resultado con alguien sin cuenta?',
        answer:
          'Sí. Cada instancia se descarga en PDF con la programación, los responsables, el resumen y el detalle por tarea con imágenes.',
      },
    ],
  },
  finalCta: {
    title: 'Tu próxima inspección ya puede estar en Vértebra',
    body: 'Agenda una demo y configuramos contigo tu primera inspección.',
    primary: 'Agenda una demo',
    secondary: 'Escríbenos por WhatsApp',
  },
}

const en: InspectionsLandingCopy = {
  meta: {
    title: 'Inspections module',
    description:
      'Schedule recurring property inspections, capture evidence on site and get an AI-written conclusion for every report.',
  },
  hero: {
    eyebrow: 'New in Vertebra',
    titleLead: 'Your inspections,',
    titleAccent: 'on autopilot.',
    body: 'Schedule each review once. Vertebra activates it on time, your team captures evidence on site and AI writes the report conclusion.',
    primaryCta: 'Book a demo',
    secondaryCta: 'See how it works',
    proof: ['Daily to yearly', 'Photo evidence', 'AI conclusion'],
    screenshotAlt: 'Inspection instance with tasks rated optimal, acceptable and critical',
    aiCardLabel: 'AI-generated conclusion',
    aiCardText: '8 tasks reviewed: 3 critical. Priority: roof leak and expired extinguishers.',
    statusLabel: 'Every task, rated',
    statuses: [
      {label: 'Optimal', tone: 'success'},
      {label: 'Acceptable', tone: 'warning'},
      {label: 'Critical', tone: 'critical'},
    ],
  },
  contrast: {
    title: 'Leave spreadsheet inspections behind',
    before: {
      label: 'Today',
      items: [
        'Checklists in spreadsheets nobody updates',
        'Loose photos in WhatsApp and email',
        'Reports assembled by hand in Word',
        'Nobody knows which review expired',
      ],
    },
    after: {
      label: 'With Vertebra',
      items: [
        'Inspections activate on their own schedule',
        'Every task with rating, photos, date and time',
        'AI writes the conclusion in seconds',
        'Compliance and critical-findings dashboard',
      ],
    },
  },
  video: {
    eyebrow: 'In action',
    title: 'From calendar to report, without leaving Vertebra',
    body: 'Scheduling, execution, AI conclusion, history and dashboard: the module with realistic data from an industrial park.',
  },
  featuresTitle: 'Everything an inspection needs',
  features: [
    {
      tag: 'Schedule',
      title: 'Set it once. It repeats itself.',
      body: 'Choose property, frequency, time window and owners. Vertebra creates every instance automatically and shows the impact before any change.',
      bullets: ['Eight frequencies, daily to yearly', 'Internal owner and external vendor', 'Tasks typed or imported from Excel'],
      image: `${INSPECTIONS_MEDIA}/schedule.webp`,
      alt: 'Inspection frequency, time window and dates configuration',
    },
    {
      tag: 'Run',
      title: 'Evidence on every point reviewed.',
      body: 'The owner rates each task as optimal, acceptable or critical, uploads photos and adds notes. Every entry is timestamped.',
      bullets: ['Status or checklist mode', 'Mandatory photos when you need them', 'Work order straight from a finding'],
      image: `${INSPECTIONS_MEDIA}/run.webp`,
      alt: 'Inspection tasks with status and notes',
    },
    {
      tag: 'AI conclusion',
      title: 'The report writes itself.',
      body: 'When the instance closes, AI reads every task and note and writes the scope, overall condition, critical findings and what still needs documenting. No invented data.',
      bullets: ['Written for the fixer and the owner', 'No critical finding is left out', 'Editable before sharing'],
      image: `${INSPECTIONS_MEDIA}/conclusion.webp`,
      alt: 'AI-written inspector conclusion with critical findings',
      highlight: true,
    },
    {
      tag: 'History',
      title: 'Every task, month by month, in one view.',
      body: 'History shows every instance by year so you spot at a glance what is deteriorating and what was fixed. Download any instance as a PDF.',
      bullets: ['Yearly grid: tasks × instances', 'PDF report with photos for audits', 'Share without requiring an account'],
      image: `${INSPECTIONS_MEDIA}/history.webp`,
      alt: 'Yearly inspection history with each task status',
    },
    {
      tag: 'Measure',
      title: 'Know who delivers and where the risks are.',
      body: 'The maintenance dashboard consolidates inspections and instances: expired, completed on time, critical findings and performance by owner.',
      bullets: ['On-time % by owner', 'Critical findings by property', 'Internal vs. external'],
      image: `${INSPECTIONS_MEDIA}/dashboard.webp`,
      alt: 'Inspections dashboard with compliance indicators',
    },
  ],
  roles: {
    title: 'One flow for everyone involved',
    body: 'Everyone sees what they need, with no spreadsheets in between.',
    items: [
      {title: 'Management', body: 'Schedule, assign and measure compliance across the portfolio.'},
      {title: 'Internal team', body: 'Find the active inspection and complete it with on-site evidence.'},
      {title: 'Vendors', body: 'Use checklist mode and upload their own reports per task.'},
      {title: 'Owners and clients', body: 'Receive the PDF with results and conclusion, no account needed.'},
    ],
  },
  start: {
    title: 'Already on Vertebra? You already have it.',
    body: 'The module is live. Create your first inspection in minutes.',
    steps: [
      {title: 'Open Inspections', body: 'From Maintenance → Inspections.'},
      {title: 'Load your tasks', body: 'Type them or import them from the Excel template.'},
      {title: 'Assign and go', body: 'Pick owner and frequency. Vertebra does the rest.'},
    ],
    cta: 'Go to Vertebra',
  },
  faq: {
    title: 'Frequently asked questions',
    items: [
      {
        question: 'Can an external vendor run the inspection?',
        answer:
          'Yes. Assign them as the external owner; they can use checklist mode and upload a file per task or one general file for the whole instance.',
      },
      {
        question: 'What happens if an inspection is not completed?',
        answer: 'The instance expires and is recorded as not completed in the history and in the maintenance dashboard.',
      },
      {
        question: 'Can I change the frequency later?',
        answer:
          'Yes. Before applying the change, Vertebra shows how many instances are kept, removed and created. Instances with results are always preserved.',
      },
      {
        question: 'Can the AI invent findings?',
        answer:
          'No. The conclusion is based only on the recorded tasks, ratings and notes, and you can edit it before sharing.',
      },
      {
        question: 'Can I share results with someone who has no account?',
        answer:
          'Yes. Every instance can be downloaded as a PDF with the schedule, owners, summary and task detail with photos.',
      },
    ],
  },
  finalCta: {
    title: 'Your next inspection can already be in Vertebra',
    body: 'Book a demo and we will set up your first inspection with you.',
    primary: 'Book a demo',
    secondary: 'Message us on WhatsApp',
  },
}

export function inspectionsLandingCopy(locale: Locale): InspectionsLandingCopy {
  return locale === 'en' ? en : es
}
