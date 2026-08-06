import {defineQuery} from 'groq'

const slugMap = `"slugs": {
  "es": slug.es.current,
  "en": slug.en.current
}`

export const sitemapEntriesQuery = defineQuery(`
  {
    "services": *[_type == "service" && (defined(slug.es.current) || defined(slug.en.current))] {
      ${slugMap},
      _updatedAt
    },
    "insights": *[_type == "insight" && (defined(slug.es.current) || defined(slug.en.current))] {
      ${slugMap},
      publishedAt,
      _updatedAt
    },
    "caseStudies": *[_type == "caseStudy" && (defined(slug.es.current) || defined(slug.en.current))] {
      ${slugMap},
      _updatedAt
    },
    "legalPages": *[_type == "legalPage" && (defined(slug.es.current) || defined(slug.en.current))] {
      ${slugMap},
      _updatedAt
    }
  }
`)
