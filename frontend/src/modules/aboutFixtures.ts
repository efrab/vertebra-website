import type {Locale} from '../i18n/routes'
import type {PageSection} from './fixtures'
import {demoCtaSection} from './benefitsFixtures'

const WF = '/assets/webflow/images'

export function aboutFixtures(locale: Locale): PageSection[] {
  const isEn = locale === 'en'

  return [
    {
      _type: 'headerInternal',
      variant: 'base',
      heading: isEn ? 'About us' : 'Nosotros',
      personSrc: `${WF}/Frame-1000005790.png`,
      personSrcSet: `${WF}/Frame-1000005790-p-500.png 500w, ${WF}/Frame-1000005790.png 800w`,
      bgSrc: `${WF}/background-1.png`,
      bgSrcSet: `${WF}/background-1-p-500.png 500w, ${WF}/background-1-p-800.png 800w, ${WF}/background-1-p-1080.png 1080w, ${WF}/background-1.png 1440w`,
    },
    {
      _type: 'aboutIntro',
      heading: isEn
        ? 'Vertebra, the digital backbone of property management'
        : 'Vertebra la columna digital de la administración inmobiliaria',
      description: isEn
        ? 'We build software so owners, tenants and administrators manage industrial and commercial portfolios in one place.'
        : 'Construimos software para que propietarios, inquilinos y administradores gestionen portafolios industriales y comerciales en un solo lugar.',
      logos: [
        {name: 'BuenTrip', src: `${WF}/6690635841bfe6ab96a.png`},
        {name: 'Investor', src: `${WF}/image-3_1image-3.png`},
        {name: 'Partner', src: `${WF}/image-4.png`},
      ],
    },
    {
      _type: 'teamSection',
      heading: isEn ? 'Our founders' : 'Nuestros Fundadores',
      members: [
        {
          name: 'José Pablo Torres',
          role: isEn ? 'Co-founder & CEO' : 'Co-fundador y CEO',
          imageSrc: `${WF}/img-user-jp_1img-user-jp.png`,
          linkedinUrl: 'https://www.linkedin.com/in/jose-pablo-t-824bb957/',
        },
        {
          name: 'Layla Tame',
          role: isEn ? 'Co-founder & CTO' : 'Co-fundadora y CTO',
          imageSrc: `${WF}/img-user-layla_1img-user-layla.png`,
          linkedinUrl: 'https://www.linkedin.com/in/layla-tame-894b28157',
        },
        {
          name: 'Fernando Carrillo',
          role: isEn ? 'Co-founder & CFO' : 'Co-fundador y CFO',
          imageSrc: `${WF}/img-user-fer_1img-user-fer.png`,
          linkedinUrl: 'https://www.linkedin.com/in/fernando-carrillo-8217b640',
        },
      ],
    },
    {
      _type: 'teamSection',
      heading: isEn ? 'Our team' : 'Nuestros Equipo',
      members: [
        {
          name: 'Ferley León',
          role: 'Founding Senior Fullstack Development',
          imageSrc: `${WF}/ferley-foto.png`,
          imageSrcSet: `${WF}/ferley-foto-p-500.png 500w, ${WF}/ferley-foto-p-800.png 800w, ${WF}/ferley-foto-p-1080.png 1080w, ${WF}/ferley-foto.png 2139w`,
          linkedinUrl: 'https://www.linkedin.com/in/ferley-leon/',
        },
        {
          name: 'Martin Ramirez',
          role: 'UX & Product Management',
          imageSrc: `${WF}/img-user-martin_1img-user-martin.png`,
          linkedinUrl: 'https://www.linkedin.com/in/ramirezdiaz/',
        },
        {
          name: 'Efrain Briceño',
          role: 'Senior UI Designer / Webflow',
          imageSrc: `${WF}/img-user-efra_1img-user-efra.png`,
          linkedinUrl: 'https://www.linkedin.com/in/efrain-brice%C3%B1o-asto-1b9476106/',
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
    demoCtaSection(locale, {
      heading: isEn
        ? 'We are building the future of property management from Mexico for the world.'
        : 'Estamos construyendo el futuro de la administración inmobiliaria desde México para el mundo.',
      description: '',
    }),
  ]
}

export function aboutPageMeta(locale: Locale) {
  return {
    title: locale === 'en' ? 'About us' : 'Nosotros',
    description:
      locale === 'en'
        ? 'Meet the Vertebra team building the digital backbone of property management.'
        : 'Conoce al equipo de Vértebra construyendo la columna digital de la administración inmobiliaria.',
  }
}
