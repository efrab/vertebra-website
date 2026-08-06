import {defineQuery} from 'groq'
import {
  caseStudyListItemProjection,
  contactChannelProjection,
  contactPathsCopyProjection,
  contactReasonProjection,
  ctaBannerProjection,
  faqSectionProjection,
  heroProjection,
  imageProjection,
  insightListItemProjection,
  newsletterSectionProjection,
  pageBuilderProjection,
  seoProjection,
} from '../fragments'
import {localizedField} from '../locale'

const titleField = localizedField('title')
const introField = localizedField('intro')
const heroHeadingField = localizedField('heroHeading')
const heroMessageField = localizedField('heroMessage')
const channelsHeadingField = localizedField('channelsHeading')
const reasonsHeadingField = localizedField('reasonsHeading')

export const aboutPageQuery = defineQuery(`
  *[_type == "aboutPage"][0] {
    _id,
    ${titleField},
    seo ${seoProjection},
    pageBuilder[] ${pageBuilderProjection}
  }
`)

export const methodologyPageQuery = defineQuery(`
  *[_type == "methodologyPage"][0] {
    _id,
    ${titleField},
    seo ${seoProjection},
    pageBuilder[] ${pageBuilderProjection}
  }
`)

export const recruitmentPageQuery = defineQuery(`
  *[_type == "recruitmentPage"][0] {
    _id,
    ${titleField},
    ${introField},
    seo ${seoProjection},
    pageBuilder[] ${pageBuilderProjection}
  }
`)

export const servicesIndexPageQuery = defineQuery(`
  *[_type == "servicesIndexPage"][0] {
    _id,
    ${titleField},
    ${introField},
    seo ${seoProjection},
    pageBuilder[] ${pageBuilderProjection}
  }
`)

export const contactPageQuery = defineQuery(`
  *[_type == "contactPage"][0] {
    _id,
    ${titleField},
    hero ${heroProjection},
    paths ${contactPathsCopyProjection},
    ${channelsHeadingField},
    channels[] ${contactChannelProjection},
    ${reasonsHeadingField},
    reasons[] ${contactReasonProjection},
    faq ${faqSectionProjection},
    interestOptions[] {
      value,
      "label": coalesce(label[language == $locale][0].value, label[language == "es"][0].value)
    },
    seo ${seoProjection}
  }
`)

export const thankYouPageQuery = defineQuery(`
  *[_type == "thankYouPage"][0] {
    _id,
    ${titleField},
    ${heroHeadingField},
    ${heroMessageField},
    heroImage ${imageProjection},
    cta ${ctaBannerProjection},
    seo ${seoProjection}
  }
`)

export const insightsIndexPageQuery = defineQuery(`
  *[_type == "insightsIndexPage"][0] {
    _id,
    ${titleField},
    hero ${heroProjection},
    newsletter ${newsletterSectionProjection},
    bottomCta ${ctaBannerProjection},
    featuredInsight->${insightListItemProjection},
    seo ${seoProjection}
  }
`)

export const caseStudiesIndexPageQuery = defineQuery(`
  *[_type == "caseStudiesIndexPage"][0] {
    _id,
    ${titleField},
    hero ${heroProjection},
    bottomCta ${ctaBannerProjection},
    featuredCase->${caseStudyListItemProjection},
    seo ${seoProjection}
  }
`)

export const legalPageBySlugQuery = defineQuery(`
  *[_type == "legalPage" && slug[$locale].current == $slug][0] {
    _id,
    ${titleField},
    "slug": slug[$locale].current,
    "body": coalesce(body[language == $locale][0].value, body[language == "es"][0].value),
    seo ${seoProjection}
  }
`)
