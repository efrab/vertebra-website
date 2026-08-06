import {defineQuery} from 'groq'
import {linkProjection, seoProjection} from '../fragments'
import {localizedField} from '../locale'

const titleField = localizedField('title')
const L = (field: string) =>
  `coalesce(${field}[language == $locale][0].value, ${field}[language == "es"][0].value)`

export const siteSettingsQuery = defineQuery(`
  *[_type == "siteSettings"][0] {
    _id,
    ${titleField},
    whatsapp,
    defaultSeo ${seoProjection},
    navGroups[] {
      _key,
      "title": ${L('title')},
      items[] {
        _key,
        "label": ${L('label')},
        link ${linkProjection}
      }
    },
    footer {
      "tagline": ${L('tagline')},
      links[] {
        _key,
        "label": ${L('label')},
        link ${linkProjection}
      },
      socialLinks[] {
        _key,
        "label": ${L('label')},
        link ${linkProjection}
      },
      contactInfo {
        email,
        "whatsappLabel": ${L('whatsappLabel')},
        "address": ${L('address')}
      },
      complaintsBookLink ${linkProjection}
    }
  }
`)

export const servicesNavQuery = defineQuery(`
  *[_type == "service" && showInNav == true && defined(slug[$locale].current)] | order(navOrder asc, coalesce(title[language == $locale][0].value, title[language == "es"][0].value) asc) {
    _id,
    ${titleField},
    "slug": slug[$locale].current,
    navOrder
  }
`)
