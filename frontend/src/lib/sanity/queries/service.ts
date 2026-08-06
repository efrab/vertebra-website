import {defineQuery} from 'groq'
import {pageBuilderProjection, seoProjection} from '../fragments'
import {localizedField} from '../locale'

const titleField = localizedField('title')
const summaryField = localizedField('summary')
const introField = localizedField('intro')

export const servicesIndexQuery = defineQuery(`
  *[_type == "servicesIndexPage"][0] {
    _id,
    ${titleField},
    ${introField},
    seo ${seoProjection}
  }
`)

export const servicesListQuery = defineQuery(`
  *[_type == "service" && defined(slug[$locale].current)] | order(navOrder asc, coalesce(title[language == $locale][0].value, title[language == "es"][0].value) asc) {
    _id,
    ${titleField},
    "slug": slug[$locale].current,
    ${summaryField},
    navOrder
  }
`)

export const serviceBySlugQuery = defineQuery(`
  *[_type == "service" && slug[$locale].current == $slug][0] {
    _id,
    ${titleField},
    "slug": slug[$locale].current,
    "alternateSlugs": {
      "es": slug.es.current,
      "en": slug.en.current
    },
    ${summaryField},
    pageBuilder[] ${pageBuilderProjection},
    seo ${seoProjection}
  }
`)
