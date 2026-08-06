import type {Locale} from '../i18n/routes'
import {getLocalizedPath} from '../i18n/routes'
import type {PageSection} from './fixtures'

const WF = '/assets/webflow/images'

export function homeFixtures(locale: Locale): PageSection[] {
  const isEn = locale === 'en'
  const agenda = getLocalizedPath(locale, 'agenda')

  return [
    {
      _type: 'heroHome',
      heading: isEn
        ? 'Automate your property management with our artificial intelligence'
        : 'Automatiza la administración de tus propiedades con nuestra inteligencia artificial',
      headingBold: isEn ? 'Automate your property management' : 'Automatiza la administración',
      headingLight: isEn
        ? 'with our artificial intelligence'
        : 'de tus propiedades con nuestra inteligencia artificial',
      subheading: isEn
        ? 'Manage contracts, maintenance, billing, payments and many other tasks in one place'
        : 'Gestiona tus contratos, mantenimientos, facturación, pagos y muchas otras tareas en un sólo lugar',
      primaryCta: {
        label: isEn ? 'Request a free demo' : 'Solicita una demo gratis',
        href: agenda,
      },
      gifSrc: `${WF}/63b53ac878b6419d7db66ce4f56d11d3d4aee2bd.gif`,
      pressLabel: isEn ? 'You can find us on' : 'Nos pueden encontrar en',
      pressLogos: [
        {
          name: 'Grande CRE',
          src: `${WF}/Frame-1000005631.png`,
          href: 'https://www.grandecre.com/',
        },
        {
          name: 'Mexico Tech Week',
          src: `${WF}/LW3NyMHGhwvX5t7NHMQqxSDFU_1LW3NyMHGhwvX5t7NHMQqxSDFU.avif`,
          href: 'https://www.linkedin.com/posts/vertebra-capital_mexicotechweek-nascent-startups-activity-7127796442617790464-wskw',
        },
        {
          name: 'Finnovista',
          src: `${WF}/logo-finnovista-negativo.png`,
          href: 'https://www.linkedin.com/posts/vertebra-capital_proptech-fintech-finnovista-activity-7166195268894277632-cyXb',
        },
        {
          name: 'INCMty',
          src: `${WF}/www.webp`,
          href: 'https://www.linkedin.com/posts/vertebra-capital_incmty-incmty2023-vertebra-activity-7133584060479598593-D2dP',
          small: true,
        },
        {
          name: 'LAS100PRO',
          src: `${WF}/Frame-1000005635.png`,
          href: 'https://www.linkedin.com/posts/vertebra-capital_latinoamaezrica-las100pro2023-vertebra-activity-7124795732821225473-INNH',
        },
        {
          name: 'El Financiero',
          src: `${WF}/header_logo-1.webp`,
          href: 'https://www.elfinanciero.com.mx/mundo-empresa/2023/10/11/vertebra-la-plataforma-digital-de-administracion-de-bodegas-que-hace-crecer-tu-negocio-como-minimo-un-10/',
        },
        {
          name: 'Proptech Latam Connection',
          src: `${WF}/logo-connection-v.png`,
          href: 'https://proptechlatamconnection.com/mas-de-100-startups-con-sello-mexicano-y-vision-global-hecho-en-mexico-proyectado-al-mundo/',
        },
      ],
      investorLogos: [
        {
          name: isEn ? 'Proudly' : 'Orgullosamente',
          label: isEn ? 'Proudly' : 'Orgullosamente',
        },
        {
          name: isEn ? 'Made in Mexico' : 'Hecho en México',
          src: `${WF}/image-3_1image-3.png`,
          href: 'https://proptechlatamconnection.com/mas-de-100-startups-con-sello-mexicano-y-vision-global-hecho-en-mexico-proyectado-al-mundo/',
        },
        {
          name: isEn ? 'They trust us' : 'Confían en nosotros',
          label: isEn ? 'They trust us' : 'Confían en nosotros',
        },
        {
          name: 'BuenTrip',
          src: `${WF}/6690635841bfe6ab96a.png`,
          href: 'https://www.buentrip.vc/portfolio',
        },
      ],
    },
    {
      _type: 'benefitsGrid',
      eyebrow: isEn ? 'Key benefits' : 'Beneficios claves',
      heading: isEn
        ? 'Everything you need, in one place'
        : 'Todo lo que necesitas, en un solo lugar',
      items: [
        {
          title: isEn ? 'Reports and dashboards' : 'Reportes y dashabords',
          description: isEn
            ? 'Create automatic reports like rent roll and maintenance with key metrics.'
            : 'Crea reportes automáticos como rent roll, mantenimiento y otros que te dan métricas clave.',
          iconSrc: `${WF}/icon-card.v1.svg`,
        },
        {
          title: isEn ? 'AI that powers your management' : 'IA que potencia tu gestión',
          description: isEn
            ? 'Access your information instantly and get portfolio suggestions for better business decisions.'
            : 'Accede a tu información inmediatamente y recibe sugerencias de tu portafolio para tomar mejor de decisiones de negocios.',
          iconSrc: `${WF}/Frame-1000005637.svg`,
        },
        {
          title: isEn ? 'Contracts' : 'Contratos',
          description: isEn
            ? 'Control life cycles, renewals, legal documents and automatic increases, among others.'
            : 'Controla ciclos de vida, renovaciones y documentos legales así como incrementos automáticos, entre otros.',
          iconSrc: `${WF}/Frame-1000005637-1.svg`,
        },
        {
          title: isEn ? 'Maintenance' : 'Mantenimiento',
          description: isEn
            ? 'Schedule and manage preventive and corrective work orders, quotes and purchase orders, among others.'
            : 'Agenda y gestiona órdenes preventivas y correctivas, cotizaciones y órdenes de compras entre otros.',
          iconSrc: `${WF}/Frame-1000005637-2.svg`,
        },
        {
          title: isEn ? 'Payments and billing' : 'Pagos y facturación',
          description: isEn
            ? 'Automate collections and record payments in one flow.'
            : 'Automatiza la cobranza y registra los pagos en un solo flujo.',
          iconSrc: `${WF}/Frame-1000005637-3.svg`,
        },
      ],
    },
    {
      _type: 'roiStats',
      heading: isEn ? 'Real results, proven return' : 'Resultados reales, retorno comprobado',
      roiValue: '9x',
      roiLabel: isEn ? 'Monthly\nROI' : 'ROI\nMENSUAL',
      description: isEn
        ? 'Our clients achieve up to 9x MONTHLY ROI thanks to Vertebra efficiency.'
        : 'Nuestros clientes alcanzan hasta 9x ROI MENSUAL gracias a la eficiencia de Vertebra.',
      stats: [
        {label: isEn ? '40% fewer late payments' : '40% menos pagos tardíos'},
        {label: isEn ? '100% automated reports' : '100% reportes automatizados'},
        {label: isEn ? 'Elimination of human errors' : 'Eliminación de errores humanos'},
        {label: isEn ? 'Full income and expense control' : 'Control total de ingresos y gastos'},
        {label: isEn ? 'and many more' : 'y muchos otros más'},
      ],
    },
    {
      _type: 'solutionsByRole',
      eyebrow: isEn ? 'Solutions for every role' : 'Soluciones para cada rol',
      heading: isEn
        ? 'Vertebra adapts to your team needs'
        : 'Vértebra se adapta a las necesidades de tu equipo',
      roles: [
        {
          title: isEn ? 'Owners' : 'Propietarios',
          description: isEn
            ? 'Get full visibility of property performance, from profitability to occupancy, all in one place.'
            : 'Obtén visibilidad completa del rendimiento de tus propiedades, desde la rentabilidad hasta la ocupación, todo en un solo lugar',
          bgSrc: `${WF}/bg-pro.png`,
          figureSrc: `${WF}/figura-pro-png.png`,
          decorLeftSrc: `${WF}/img-pro-left.svg`,
          decorRightSrc: `${WF}/img-pro-right.svg`,
          decorLeftClass: 'img-pro-left',
          decorRightClass: 'img-pro-right',
        },
        {
          title: isEn ? 'Tenants' : 'Inquilinos',
          description: isEn
            ? 'Simplify communication, rent payments and maintenance requests through a simple and accessible portal.'
            : 'Facilita la comunicación, el pago de rentas y la solicitud de mantenimiento a través de un portal simple y accesible.',
          bgSrc: `${WF}/bg-vfing.png`,
          figureSrc: `${WF}/figura-vf-ingpng.png`,
          decorLeftSrc: `${WF}/img-inq-right.svg`,
          decorRightSrc: `${WF}/img-inq-left.svg`,
          decorLeftClass: 'img-inq-left',
          decorRightClass: 'img-inq-right',
        },
        {
          title: isEn ? 'Administrators' : 'Administradores',
          description: isEn
            ? 'Reduce operational load by centralizing information and automating repetitive tasks such as recurring billing.'
            : 'Reduce la carga operativa centralizando la información y automatizando tareas repetitivas como la facturación recurrente.',
          figureSrc: `${WF}/figura-adm-png.png`,
          decorLeftSrc: `${WF}/img-adm-left.svg`,
          decorRightSrc: `${WF}/img-adm-right.svg`,
          decorLeftClass: 'img-adm-left',
          decorRightClass: 'img-adm-right',
        },
      ],
    },
    {
      _type: 'howItWorks',
      eyebrow: isEn ? 'How it works' : '¿Cómo funciona?',
      heading: isEn
        ? 'Start managing in 3 simple steps'
        : 'Empieza a gestionar en 3 simples pasos',
      steps: [
        {
          number: '1',
          title: isEn ? 'Set up your portfolio' : 'Configura tu portafolio',
          description: isEn
            ? 'Load property and tenant data in bulk or individually.'
            : 'Carga automáticamente la data de tus propiedades e inquilinos de forma masiva o individual.',
        },
        {
          number: '2',
          title: isEn ? 'Invite your team and clients' : 'Invita a tu equipo y clientes',
          description: isEn
            ? 'Give access to admins, maintenance staff and third parties with custom permissions.'
            : 'Da acceso a administradores, personal de mantenimiento y terceros con permisos personalizados.',
        },
        {
          number: '3',
          title: isEn ? 'Manage and optimize' : 'Gestiona y optimiza',
          description: isEn
            ? 'Centralize your data in Vertebra to make better business decisions.'
            : 'Centraliza tu data en Vértebra para que tomes decisiones de negocio más informadas',
        },
      ],
    },
    {
      _type: 'testimonials',
      eyebrow: isEn ? 'Testimonials' : 'Testimonios',
      heading: isEn ? 'What our clients say' : 'Nuestros clientes opinan',
      items: [
        {
          quote: isEn
            ? 'We reduced by 40% the time spent searching for documents such as contracts and policies, and we have not had late payments like before.'
            : 'Reducimos en 40% el tiempo destinado a la búsqueda de documentos como contratos, pólizas y demás, también no hemos presentado ningún pago tardío como anteriormente pasaba.',
          author: 'Nicole Eugenia Mora',
          role: 'Administrative executive',
          company: 'Bloc Cero Uno',
          avatarSrc: `${WF}/Frame-1000005321_1Frame-1000005321.png`,
        },
        {
          quote: isEn
            ? 'With Vertebra we stopped chasing invoices manually. Now everything flows and the team spends time growing, not fixing errors.'
            : 'Con Vertebra dejamos de perseguir facturas manualmente. Hoy todo fluye y el equipo dedica tiempo a crecer, no a corregir errores.',
          author: 'María Ramírez',
          role: isEn ? 'Operations Director' : 'Directora de Operaciones',
          company: 'Inmuebles Industriales S.A',
          avatarSrc: `${WF}/Frame-1000005321_1Frame-1000005321.png`,
        },
        {
          quote: isEn
            ? 'With Vertebra we unified information and organized documentation for our properties, with an easy platform and personalized support.'
            : 'Con Vertebra logramos unificar la información y organizar la documentación de nuestras propiedades, con una plataforma fácil de usar y soporte personalizado.',
          author: 'Norma Rebeca Hernández Estrada',
          role: isEn ? 'Public Accountant' : 'Contador Público',
          company: 'Serie Jalisco SA de CV',
          avatarSrc: `${WF}/Frame-1000005321_1Frame-1000005321.png`,
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
      logos: [
        {name: 'KNX', src: `${WF}/logo-knx.png`},
        {name: 'Arende', src: `${WF}/Arende.png`},
        {name: 'CV', src: `${WF}/Logo-CV.jpg`},
        {name: 'Bloc', src: `${WF}/logo-bloc.png`},
      ],
    },
    {
      _type: 'ctaBanner',
      heading: isEn
        ? 'Optimize your properties with us'
        : 'Optimiza tus propiedades con nosotros',
      secondaryCta: {
        label: isEn ? 'Message us on WhatsApp' : 'Escríbenos por WhatsApp',
        href: 'https://wa.me/+51983723379',
      },
      cta: {
        label: isEn ? 'Free Vertebra trial' : 'Prueba gratis Vértebra',
        href: agenda,
      },
    },
    {
      _type: 'securityFeatures',
      heading: isEn
        ? 'Security and trust for your data'
        : 'Seguridad y confianza en tus datos',
      subheading: isEn
        ? 'Your information is your most valuable asset. We protect your data with the highest standards.'
        : 'Tu información es tu activo más valioso. Protegemos tu data con los estándares más altos.',
      items: [
        {
          title: isEn ? 'Encrypted data' : 'Datos encriptados',
          description: isEn
            ? 'All information is transmitted and stored encrypted.'
            : 'Toda la información se trasmite y almacena de forma encriptada.',
        },
        {
          title: isEn ? 'Regulatory compliance' : 'Cumplimiento normativo',
          description: isEn
            ? 'We comply with regulations in every market we operate.'
            : 'Cumplimos con todas las regulaciones de los mercados en los que trabajamos.',
        },
        {
          title: isEn ? 'Confidentiality' : 'Confidencialidad',
          description: isEn
            ? 'Your information is 100% confidential under a zero-access model for our team.'
            : 'Tu información es 100% confidencial y está protegida bajo un modelo de acceso cero para nuestro equipo.',
        },
      ],
    },
  ]
}
