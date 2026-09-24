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

export const pageByRouteKeyQuery = defineQuery(`
  *[_type == "page" && routeKey == $routeKey][0] {
    _id,
    ${titleField},
    routeKey,
    seo ${seoProjection},
    pageBuilder[] ${pageBuilderProjection}
  }
`)

const emptySavingsMessageField = localizedField('emptySavingsMessage')
const savingsLineTemplateField = localizedField('savingsLineTemplate')
const perMonthSuffixField = localizedField('perMonthSuffix')
const billedAnnuallyNoteField = localizedField('billedAnnuallyNote')
const minimumAppliesNoteField = localizedField('minimumAppliesNote')
const commercialCountTemplateField = localizedField('commercialCountTemplate')
const industrialCountTemplateField = localizedField('industrialCountTemplate')
const meterAriaTemplateField = localizedField('meterAriaTemplate')
const heroTitleField = localizedField('heroTitle')
const heroHighlightField = localizedField('heroHighlight')
const heroSubtitleField = localizedField('heroSubtitle')
const portfolioTitleField = localizedField('portfolioTitle')
const commercialLabelField = localizedField('commercialLabel')
const industrialLabelField = localizedField('industrialLabel')
const priceUnitSuffixField = localizedField('priceUnitSuffix')
const planLabelField = localizedField('planLabel')
const annualDiscountNoteField = localizedField('annualDiscountNote')
const monthlyButtonField = localizedField('monthlyButton')
const annualButtonField = localizedField('annualButton')
const breakdownHeadingField = localizedField('breakdownHeading')
const vertebraColumnField = localizedField('vertebraColumn')
const manualColumnField = localizedField('manualColumn')
const commercialRowLabelField = localizedField('commercialRowLabel')
const industrialRowLabelField = localizedField('industrialRowLabel')
const totalLabelField = localizedField('totalLabel')
const commercialSliderAriaField = localizedField('commercialSliderAria')
const commercialNumberAriaField = localizedField('commercialNumberAria')
const industrialSliderAriaField = localizedField('industrialSliderAria')
const industrialNumberAriaField = localizedField('industrialNumberAria')
const planTypeAriaField = localizedField('planTypeAria')
const resultsTitleField = localizedField('resultsTitle')
const annualSavingsLabelField = localizedField('annualSavingsLabel')
const vertebraCostLabelField = localizedField('vertebraCostLabel')
const manualCostLabelField = localizedField('manualCostLabel')
const manualCostNoteField = localizedField('manualCostNote')
const investLabelField = localizedField('investLabel')
const recoverLabelField = localizedField('recoverLabel')
const roiSentenceBeforeField = localizedField('roiSentenceBefore')
const roiSentenceAfterField = localizedField('roiSentenceAfter')
const howCalculatedHeadingField = localizedField('howCalculatedHeading')
const howCalculatedBodyField = localizedField('howCalculatedBody')
const ctaHeadingField = localizedField('ctaHeading')
const ctaBodyField = localizedField('ctaBody')
const whatsappLabelField = localizedField('whatsappLabel')
const demoLabelField = localizedField('demoLabel')
const disclaimerField = localizedField('disclaimer')
const descriptionField = localizedField('description')

export const roiCalculatorPageQuery = defineQuery(`
  *[_type == "roiCalculatorPage"][0] {
    _id,
    ${titleField},
    ${descriptionField},
    seo ${seoProjection},
    ${heroTitleField},
    ${heroHighlightField},
    ${heroSubtitleField},
    ${portfolioTitleField},
    ${commercialLabelField},
    ${industrialLabelField},
    ${priceUnitSuffixField},
    ${planLabelField},
    ${annualDiscountNoteField},
    ${monthlyButtonField},
    ${annualButtonField},
    ${breakdownHeadingField},
    ${vertebraColumnField},
    ${manualColumnField},
    ${commercialRowLabelField},
    ${industrialRowLabelField},
    ${totalLabelField},
    ${commercialSliderAriaField},
    ${commercialNumberAriaField},
    ${industrialSliderAriaField},
    ${industrialNumberAriaField},
    ${planTypeAriaField},
    ${resultsTitleField},
    ${annualSavingsLabelField},
    ${vertebraCostLabelField},
    ${manualCostLabelField},
    ${manualCostNoteField},
    ${investLabelField},
    ${recoverLabelField},
    ${roiSentenceBeforeField},
    ${roiSentenceAfterField},
    ${howCalculatedHeadingField},
    ${howCalculatedBodyField},
    ${emptySavingsMessageField},
    ${savingsLineTemplateField},
    ${perMonthSuffixField},
    ${billedAnnuallyNoteField},
    ${minimumAppliesNoteField},
    ${commercialCountTemplateField},
    ${industrialCountTemplateField},
    ${meterAriaTemplateField},
    priceCommercial,
    priceIndustrial,
    manualCommercial,
    manualIndustrial,
    minimumFee,
    annualDiscountPercent,
    defaultCommercial,
    defaultIndustrial,
    ${ctaHeadingField},
    ${ctaBodyField},
    ${whatsappLabelField},
    whatsappUrl,
    ${demoLabelField},
    demoUrl,
    ${disclaimerField}
  }
`)
