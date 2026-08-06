/** Shared GROQ projections — import into query files only */

const L = (field: string) =>
  `coalesce(${field}[language == $locale][0].value, ${field}[language == "es"][0].value)`

export const imageProjection = /* groq */ `{
  ...,
  "width": asset->metadata.dimensions.width,
  "height": asset->metadata.dimensions.height,
  "lqip": asset->metadata.lqip
}`

export const seoProjection = /* groq */ `{
  "metaTitle": ${L('metaTitle')},
  "metaDescription": ${L('metaDescription')},
  ogImage ${imageProjection}
}`

export const linkProjection = /* groq */ `{
  _type,
  "label": ${L('label')},
  linkType,
  href,
  openInNewTab,
  "internal": internal->{
    _type,
    "slug": slug[$locale].current
  }
}`

export const ctaProjection = /* groq */ `{
  "label": ${L('label')},
  variant,
  link ${linkProjection}
}`

export const heroProjection = /* groq */ `{
  variant,
  "eyebrow": ${L('eyebrow')},
  "heading": ${L('heading')},
  "subheading": ${L('subheading')},
  image ${imageProjection},
  primaryCta ${ctaProjection},
  secondaryCta ${ctaProjection}
}`

export const ctaBannerProjection = /* groq */ `{
  variant,
  "heading": ${L('heading')},
  "subheading": ${L('subheading')},
  cta ${ctaProjection},
  secondaryCta ${ctaProjection},
  decorLeft ${imageProjection},
  decorRight ${imageProjection}
}`

export const faqSectionProjection = /* groq */ `{
  variant,
  "title": ${L('title')},
  items[] {
    "question": ${L('question')},
    "answer": ${L('answer')}
  }
}`

export const contactPathsCopyProjection = /* groq */ `{
  "meetingTitle": ${L('meetingTitle')},
  "meetingEyebrow": ${L('meetingEyebrow')},
  "formTitle": ${L('formTitle')},
  "formEyebrow": ${L('formEyebrow')},
  meetingImage ${imageProjection}
}`

export const contactChannelProjection = /* groq */ `{
  icon ${imageProjection},
  "title": ${L('title')},
  value,
  href
}`

export const contactReasonProjection = /* groq */ `{
  tone,
  "title": ${L('title')},
  "description": ${L('description')},
  image ${imageProjection}
}`

export const newsletterSectionProjection = /* groq */ `{
  "heading": ${L('heading')},
  "intro": ${L('intro')}
}`

export const insightListItemProjection = /* groq */ `{
  _id,
  "title": ${L('title')},
  "slug": slug[$locale].current,
  "excerpt": ${L('excerpt')},
  contentType,
  categories,
  publishedAt,
  readTimeMinutes,
  downloadUrl,
  cover ${imageProjection}
}`

export const caseStudyListItemProjection = /* groq */ `{
  _id,
  "title": ${L('title')},
  "slug": slug[$locale].current,
  "industry": ${L('industry')},
  "service": ${L('service')},
  "summary": ${L('summary')},
  "challenge": ${L('challenge')},
  "result": ${L('result')},
  cover ${imageProjection}
}`

export const pageBuilderProjection = /* groq */ `{
  _key,
  _type,
  ...,
  "title": ${L('title')},
  "intro": ${L('intro')},
  "heading": ${L('heading')},
  "subheading": ${L('subheading')},
  "eyebrow": ${L('eyebrow')},
  "body": ${L('body')},
  "description": ${L('description')},
  "featuredTitle": ${L('featuredTitle')},
  "featuredDescription": ${L('featuredDescription')},
  "purposeTitle": ${L('purposeTitle')},
  "purposeBody": ${L('purposeBody')},
  image ${imageProjection},
  cardImages[] ${imageProjection},
  diagramImage ${imageProjection},
  decorImage ${imageProjection},
  logos[] {
    name,
    image ${imageProjection}
  },
  cards[] {
    _key,
    ...,
    "title": ${L('title')},
    "description": ${L('description')},
    "summary": ${L('summary')},
    "emphasis": ${L('emphasis')},
    icon ${imageProjection},
    cta ${ctaProjection},
    "items": items[].coalesce(text[language == $locale][0].value, text[language == "es"][0].value),
    page->{
      _type,
      "slug": slug[$locale].current
    }
  },
  members[] {
    _key,
    "name": ${L('name')},
    "role": ${L('role')},
    "bio": ${L('bio')},
    photo ${imageProjection},
    linkedInUrl
  },
  cases[]->{
    _id,
    "title": ${L('title')},
    "slug": slug[$locale].current,
    "industry": ${L('industry')},
    "summary": ${L('summary')},
    "challenge": ${L('challenge')},
    "intervention": ${L('intervention')},
    "result": ${L('result')},
    cover ${imageProjection}
  },
  insights[]->{
    _id,
    "title": ${L('title')},
    "slug": slug[$locale].current,
    "excerpt": ${L('excerpt')},
    categories,
    cover ${imageProjection}
  },
  primaryCta ${ctaProjection},
  secondaryCta ${ctaProjection},
  cta ${ctaProjection},
  categories[] {
    _key,
    "title": ${L('title')},
    "summary": ${L('summary')},
    cta ${ctaProjection},
    items[] {
      _key,
      "title": ${L('title')},
      "description": ${L('description')},
      icon,
      cta ${ctaProjection}
    }
  },
  steps[] {
    "title": ${L('title')},
    "description": ${L('description')}
  },
  items[] {
    ...,
    "title": ${L('title')},
    "label": ${L('label')},
    "value": ${L('value')},
    "description": ${L('description')},
    "question": ${L('question')},
    "answer": ${L('answer')},
    cta ${ctaProjection}
  },
  markers[] {
    _key,
    "country": ${L('country')},
    countryPreset,
    "organizations": ${L('organizations')},
    top,
    left,
    active,
    flag ${imageProjection}
  },
  mapImage ${imageProjection},
  members[] {
    _key,
    "name": ${L('name')},
    "role": ${L('role')},
    "bio": ${L('bio')},
    linkedInUrl,
    photo ${imageProjection}
  }
}`
