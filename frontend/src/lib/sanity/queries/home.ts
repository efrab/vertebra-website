import {defineQuery} from 'groq'
import {pageBuilderProjection, seoProjection} from '../fragments'
import {localizedField} from '../locale'

const titleField = localizedField('title')

export const homePageQuery = defineQuery(`
  *[_type == "homePage"][0] {
    _id,
    ${titleField},
    seo ${seoProjection},
    pageBuilder[] ${pageBuilderProjection}
  }
`)
