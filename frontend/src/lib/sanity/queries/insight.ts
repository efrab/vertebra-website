import {defineQuery} from 'groq'
import {imageProjection, seoProjection} from '../fragments'
import {localizedField} from '../locale'

const titleField = localizedField('title')
const excerptField = localizedField('excerpt')

export const insightsListQuery = defineQuery(`
  *[_type == "insight" && defined(slug[$locale].current)] | order(publishedAt desc) {
    _id,
    ${titleField},
    "slug": slug[$locale].current,
    ${excerptField},
    contentType,
    categories,
    publishedAt,
    readTimeMinutes,
    downloadUrl,
    cover ${imageProjection}
  }
`)

export const insightBySlugQuery = defineQuery(`
  *[_type == "insight" && slug[$locale].current == $slug][0] {
    _id,
    ${titleField},
    "slug": slug[$locale].current,
    "alternateSlugs": {
      "es": slug.es.current,
      "en": slug.en.current
    },
    ${excerptField},
    contentType,
    categories,
    publishedAt,
    readTimeMinutes,
    downloadUrl,
    author,
    cover ${imageProjection},
    "body": coalesce(body[language == $locale][0].value, body[language == "es"][0].value),
    related[]->{
      _id,
      ${titleField},
      "slug": slug[$locale].current,
      ${excerptField},
      contentType,
      categories,
      downloadUrl,
      cover ${imageProjection}
    },
    seo ${seoProjection}
  }
`)
