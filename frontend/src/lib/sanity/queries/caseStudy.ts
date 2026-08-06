import {defineQuery} from 'groq'
import {imageProjection, seoProjection} from '../fragments'
import {localizedField} from '../locale'

const titleField = localizedField('title')
const summaryField = localizedField('summary')
const industryField = localizedField('industry')
const serviceField = localizedField('service')
const challengeField = localizedField('challenge')
const resultField = localizedField('result')

export const caseStudiesListQuery = defineQuery(`
  *[_type == "caseStudy" && defined(slug[$locale].current)] | order(coalesce(title[language == $locale][0].value, title[language == "es"][0].value) asc) {
    _id,
    ${titleField},
    "slug": slug[$locale].current,
    ${industryField},
    ${serviceField},
    ${summaryField},
    ${challengeField},
    ${resultField},
    cover ${imageProjection}
  }
`)

export const caseStudyBySlugQuery = defineQuery(`
  *[_type == "caseStudy" && slug[$locale].current == $slug][0] {
    _id,
    ${titleField},
    "slug": slug[$locale].current,
    "alternateSlugs": {
      "es": slug.es.current,
      "en": slug.en.current
    },
    ${industryField},
    ${serviceField},
    ${summaryField},
    ${localizedField('challengeHeadline')},
    ${challengeField},
    ${localizedField('interventionHeadline')},
    ${localizedField('intervention')},
    ${resultField},
    metrics[] {
      "label": coalesce(label[language == $locale][0].value, label[language == "es"][0].value),
      "value": coalesce(value[language == $locale][0].value, value[language == "es"][0].value),
      icon
    },
    cover ${imageProjection},
    relatedService->{
      _id,
      ${titleField},
      "slug": slug[$locale].current
    },
    relatedCases[]->{
      _id,
      ${titleField},
      "slug": slug[$locale].current,
      ${industryField},
      ${challengeField},
      cover ${imageProjection}
    },
    "body": coalesce(body[language == $locale][0].value, body[language == "es"][0].value),
    seo ${seoProjection}
  }
`)
