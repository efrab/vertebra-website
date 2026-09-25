/** Shared GROQ projections — import into query files only */

const L = (field: string) =>
  `coalesce(${field}[language == $locale][0].value, ${field}[language == "es"][0].value)`

/** Localized field with plain-string fallback (legacy / bad migrations).
 * `match ".*"` limits fallback to scalar strings — never raw i18n arrays. */
const LS = (field: string) =>
  `coalesce(${L(field)}, select(defined(${field}) && ${field} match ".*" => ${field}))`

export const imageProjection = /* groq */ `{
  ...,
  "width": asset->metadata.dimensions.width,
  "height": asset->metadata.dimensions.height,
  "lqip": asset->metadata.lqip
}`

export const seoProjection = /* groq */ `{
  "metaTitle": ${LS('metaTitle')},
  "metaDescription": ${LS('metaDescription')},
  ogImage ${imageProjection}
}`

export const linkProjection = /* groq */ `{
  _type,
  "label": ${LS('label')},
  linkType,
  href,
  openInNewTab,
  "internal": internal->{
    _type,
    "slug": slug[$locale].current
  }
}`

export const ctaProjection = /* groq */ `{
  "label": ${LS('label')},
  variant,
  link ${linkProjection}
}`

export const heroProjection = /* groq */ `{
  variant,
  "eyebrow": ${LS('eyebrow')},
  "heading": ${LS('heading')},
  "subheading": ${LS('subheading')},
  image ${imageProjection},
  primaryCta ${ctaProjection},
  secondaryCta ${ctaProjection}
}`

export const ctaBannerProjection = /* groq */ `{
  variant,
  "heading": ${LS('heading')},
  "subheading": ${LS('subheading')},
  cta ${ctaProjection},
  secondaryCta ${ctaProjection},
  bgSrc,
  bgSrcSet,
  wrapped,
  decorLeft ${imageProjection},
  decorRight ${imageProjection}
}`

export const faqSectionProjection = /* groq */ `{
  variant,
  "title": ${LS('title')},
  items[] {
    "question": ${LS('question')},
    "answer": ${LS('answer')}
  }
}`

export const contactPathsCopyProjection = /* groq */ `{
  "meetingTitle": ${LS('meetingTitle')},
  "meetingEyebrow": ${LS('meetingEyebrow')},
  "formTitle": ${LS('formTitle')},
  "formEyebrow": ${LS('formEyebrow')},
  meetingImage ${imageProjection}
}`

export const contactChannelProjection = /* groq */ `{
  icon ${imageProjection},
  "title": ${LS('title')},
  value,
  href
}`

export const contactReasonProjection = /* groq */ `{
  tone,
  "title": ${LS('title')},
  "description": ${LS('description')},
  image ${imageProjection}
}`

export const newsletterSectionProjection = /* groq */ `{
  "heading": ${LS('heading')},
  "intro": ${LS('intro')}
}`

export const insightListItemProjection = /* groq */ `{
  _id,
  "title": ${LS('title')},
  "slug": slug[$locale].current,
  "excerpt": ${LS('excerpt')},
  contentType,
  categories,
  publishedAt,
  readTimeMinutes,
  downloadUrl,
  cover ${imageProjection}
}`

export const caseStudyListItemProjection = /* groq */ `{
  _id,
  "title": ${LS('title')},
  "slug": slug[$locale].current,
  "industry": ${LS('industry')},
  "service": ${LS('service')},
  "summary": ${LS('summary')},
  "challenge": ${LS('challenge')},
  "result": ${LS('result')},
  cover ${imageProjection}
}`

export const pageBuilderProjection = /* groq */ `{
  _key,
  _type,
  ...,
  "title": ${LS('title')},
  "intro": ${LS('intro')},
  "heading": ${LS('heading')},
  "subheading": ${LS('subheading')},
  "eyebrow": ${LS('eyebrow')},
  "body": ${LS('body')},
  "description": ${LS('description')},
  "featuredTitle": ${LS('featuredTitle')},
  "featuredDescription": ${LS('featuredDescription')},
  "purposeTitle": ${LS('purposeTitle')},
  "purposeBody": ${LS('purposeBody')},
  image ${imageProjection},
  cardImages[] ${imageProjection},
  diagramImage ${imageProjection},
  decorImage ${imageProjection},
  logos[] {
    name,
    "src": coalesce(src, image.asset->url),
    image ${imageProjection}
  },
  cards[] {
    _key,
    ...,
    "title": ${LS('title')},
    "description": ${LS('description')},
    "summary": ${LS('summary')},
    "emphasis": ${LS('emphasis')},
    iconSrc,
    "iconSrc": coalesce(iconSrc, icon.asset->url),
    icon ${imageProjection},
    cta ${ctaProjection},
    "items": items[]{
      _key,
      ...,
      "text": coalesce(${LS('text')}, text)
    },
    page->{
      _type,
      "slug": slug[$locale].current
    }
  },
  "videoSrc": videoSrc,
  "moreLabel": ${LS('moreLabel')},
  "roiValue": roiValue,
  "roiLabel": ${LS('roiLabel')},
  stats[] {
    _key,
    "label": ${LS('label')}
  },
  roles[] {
    _key,
    "title": ${LS('title')},
    "description": ${LS('description')},
    bgSrc,
    figureSrc,
    "imageSrc": coalesce(imageSrc, image.asset->url),
    decorLeftSrc,
    decorRightSrc,
    decorLeftClass,
    decorRightClass
  },
  modules[] {
    _key,
    "title": ${LS('title')},
    "description": ${LS('description')},
    mediaSrc,
    mediaType
  },
  tabs[] {
    _key,
    id,
    "label": ${LS('label')},
    iconSrc,
    "heading": ${LS('heading')},
    sections[] {
      _key,
      "title": ${LS('title')},
      "description": ${LS('description')},
      imageSrc,
      imageSrcSet,
      cards[] {
        _key,
        "title": ${LS('title')},
        "description": ${LS('description')},
        largeText
      }
    },
    message {
      "line": ${LS('line')},
      "highlight": ${LS('highlight')}
    }
  },
  headerIconSrc,
  headerBgSrc,
  headerBgSrcSet,
  iconSrc,
  personSrc,
  personSrcSet,
  bgSrc,
  bgSrcSet,
  wrapped,
  "imageSrc": coalesce(imageSrc, image.asset->url),
  "showSchedule": showSchedule,
  redirectTo,
  "requiredNote": ${LS('requiredNote')},
  "submitLabel": ${LS('submitLabel')},
  "formTitle": ${LS('formTitle')},
  "formSubtitle": ${LS('formSubtitle')},
  "sideHeading": ${LS('sideHeading')},
  "sideDescription": ${LS('sideDescription')},
  "variant": variant,
  "introLabel": ${LS('introLabel')},
  "searchPlaceholder": ${LS('searchPlaceholder')},
  searchAction,
  price,
  "priceSuffix": ${LS('priceSuffix')},
  annualPrice,
  "annualNote": ${LS('annualNote')},
  "badge": ${LS('badge')},
  "paymentNote": ${LS('paymentNote')},
  "featuresHeading": ${LS('featuresHeading')},
  "highlight": ${LS('highlight')},
  backHref,
  "backLabel": ${LS('backLabel')},
  imageSrcSet,
  "features": features[]{
    "label": coalesce(${LS('label')}, ${LS('text')}, label, text)
  },
  topics[] {
    _key,
    "title": ${LS('title')},
    iconSrc,
    "tip": ${LS('tip')},
    "items": items[]{"text": coalesce(${LS('text')}, text)}.text
  },
  contactLinks[] {
    _key,
    "label": ${LS('label')},
    href,
    iconSrc,
    variant
  },
  members[] {
    _key,
    "name": coalesce(${LS('name')}, name),
    "role": coalesce(${LS('role')}, role),
    "bio": coalesce(${LS('bio')}, bio),
    "imageSrc": coalesce(imageSrc, photo.asset->url),
    imageSrcSet,
    photo ${imageProjection},
    "linkedInUrl": coalesce(linkedInUrl, linkedinUrl),
    "linkedinUrl": coalesce(linkedinUrl, linkedInUrl)
  },
  cases[]->{
    _id,
    "title": ${LS('title')},
    "slug": slug[$locale].current,
    "industry": ${LS('industry')},
    "summary": ${LS('summary')},
    "challenge": ${LS('challenge')},
    "intervention": ${LS('intervention')},
    "result": ${LS('result')},
    cover ${imageProjection}
  },
  insights[]->{
    _id,
    "title": ${LS('title')},
    "slug": slug[$locale].current,
    "excerpt": ${LS('excerpt')},
    categories,
    cover ${imageProjection}
  },
  primaryCta ${ctaProjection},
  secondaryCta ${ctaProjection},
  cta {
    ...,
    "label": ${LS('label')},
    "heading": ${LS('heading')},
    "description": ${LS('description')},
    variant,
    link ${linkProjection},
    "href": coalesce(href, link.href),
    bgSrc,
    bgSrcSet,
    primary {
      "label": ${LS('label')},
      href
    },
    secondary {
      "label": ${LS('label')},
      href
    }
  },
  categories[] {
    _key,
    "title": ${LS('title')},
    "summary": ${LS('summary')},
    cta ${ctaProjection},
    items[] {
      _key,
      "title": ${LS('title')},
      "description": ${LS('description')},
      icon,
      cta ${ctaProjection}
    }
  },
  steps[] {
    "number": number,
    "title": ${LS('title')},
    "description": ${LS('description')}
  },
  items[] {
    ...,
    "title": ${LS('title')},
    "label": ${LS('label')},
    "value": ${LS('value')},
    "description": ${LS('description')},
    "question": ${LS('question')},
    "answer": ${LS('answer')},
    "quote": ${LS('quote')},
    "author": ${LS('author')},
    "role": ${LS('role')},
    "company": ${LS('company')},
    "avatarSrc": coalesce(avatarSrc, avatar.asset->url),
    "iconSrc": coalesce(iconSrc, icon.asset->url),
    cta ${ctaProjection}
  },
  markers[] {
    _key,
    "country": ${LS('country')},
    countryPreset,
    "organizations": ${LS('organizations')},
    top,
    left,
    active,
    flag ${imageProjection}
  },
  mapImage ${imageProjection}
}`
