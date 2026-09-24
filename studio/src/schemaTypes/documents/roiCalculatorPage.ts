import {ChartUpwardIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import {localizedPreviewValue} from '../../lib/localized'
import {
  localizedStringField,
  localizedTextField,
} from '../fields/localizedFields'

const PLACEHOLDER_HINT =
  'Placeholders: {monto}, {anual}, {cantidad}, {minimo} — replaced at runtime by the calculator.'

export default defineType({
  name: 'roiCalculatorPage',
  title: 'ROI Calculator page',
  type: 'document',
  icon: ChartUpwardIcon,
  groups: [
    {name: 'seo', title: 'SEO'},
    {name: 'header', title: 'Header'},
    {name: 'portfolio', title: 'Portfolio panel'},
    {name: 'results', title: 'Results panel'},
    {name: 'runtime', title: 'Calculator strings'},
    {name: 'assumptions', title: 'Assumptions'},
    {name: 'cta', title: 'CTA'},
  ],
  fields: [
    // ── SEO ──
    localizedStringField('title', 'Page title', {
      group: 'seo',
      validation: (Rule) => Rule.required(),
      description: 'Browser tab / SEO title (falls back to seo.metaTitle if set).',
    }),
    localizedTextField('description', 'Page description', {
      group: 'seo',
      rows: 2,
      description: 'Meta description fallback when seo.metaDescription is empty.',
    }),
    defineField({name: 'seo', title: 'SEO overrides', type: 'seo', group: 'seo'}),

    // ── Header ──
    localizedTextField('heroTitle', 'Hero title', {
      group: 'header',
      rows: 2,
      description: 'Use a line break for the second line. Highlight text goes in “Hero highlight”.',
      validation: (Rule) => Rule.required(),
    }),
    localizedStringField('heroHighlight', 'Hero highlight', {
      group: 'header',
      description: 'Word/phrase rendered in green (e.g. “a mano” / “by hand”). Must appear in the title.',
    }),
    localizedTextField('heroSubtitle', 'Hero subtitle', {
      group: 'header',
      rows: 3,
    }),

    // ── Portfolio panel ──
    localizedStringField('portfolioTitle', 'Portfolio panel title', {group: 'portfolio'}),
    localizedStringField('commercialLabel', 'Commercial properties label', {group: 'portfolio'}),
    localizedStringField('industrialLabel', 'Industrial properties label', {group: 'portfolio'}),
    localizedStringField('priceUnitSuffix', 'Price unit suffix', {
      group: 'portfolio',
      description: 'After “USD N /”. e.g. “mes c/u” / “mo each”.',
    }),
    localizedStringField('planLabel', 'Plan label', {group: 'portfolio'}),
    localizedStringField('annualDiscountNote', 'Annual discount note', {
      group: 'portfolio',
      description: 'Shown under “Plan”. e.g. “10% de descuento con pago anual”.',
    }),
    localizedStringField('monthlyButton', 'Monthly button', {group: 'portfolio'}),
    localizedStringField('annualButton', 'Annual button label', {
      group: 'portfolio',
      description: 'Base label without the discount %. Discount % is appended from Assumptions.',
    }),
    localizedStringField('breakdownHeading', 'Breakdown column heading', {group: 'portfolio'}),
    localizedStringField('vertebraColumn', 'Vertebra column heading', {group: 'portfolio'}),
    localizedStringField('manualColumn', 'Manual process column heading', {group: 'portfolio'}),
    localizedStringField('commercialRowLabel', 'Commercial row label (short)', {
      group: 'portfolio',
      description: 'Fallback before JS updates the count. e.g. “Comerciales”.',
    }),
    localizedStringField('industrialRowLabel', 'Industrial row label (short)', {
      group: 'portfolio',
      description: 'Fallback before JS updates the count. e.g. “Industriales”.',
    }),
    localizedStringField('totalLabel', 'Total label', {group: 'portfolio'}),
    localizedStringField('commercialSliderAria', 'Commercial slider aria-label', {
      group: 'portfolio',
    }),
    localizedStringField('commercialNumberAria', 'Commercial number input aria-label', {
      group: 'portfolio',
    }),
    localizedStringField('industrialSliderAria', 'Industrial slider aria-label', {
      group: 'portfolio',
    }),
    localizedStringField('industrialNumberAria', 'Industrial number input aria-label', {
      group: 'portfolio',
    }),
    localizedStringField('planTypeAria', 'Plan type group aria-label', {group: 'portfolio'}),

    // ── Results panel ──
    localizedStringField('resultsTitle', 'Results panel title', {group: 'results'}),
    localizedStringField('annualSavingsLabel', 'Estimated annual savings label', {
      group: 'results',
    }),
    localizedStringField('vertebraCostLabel', 'Vertebra cost label', {group: 'results'}),
    localizedStringField('manualCostLabel', 'Manual process cost label', {group: 'results'}),
    localizedTextField('manualCostNote', 'Manual cost footnote', {
      group: 'results',
      rows: 2,
      description: 'Under the manual cost amount. e.g. “USD / mes en horas de equipo…”',
    }),
    localizedStringField('investLabel', '“What you invest” label', {group: 'results'}),
    localizedStringField('recoverLabel', '“What you recover” label', {group: 'results'}),
    localizedTextField('roiSentenceBefore', 'ROI sentence (before amount)', {
      group: 'results',
      rows: 2,
      description:
        'Text before the dynamic USD amount. e.g. “Por cada USD 1 que inviertes en Vertebra, dejas de gastar”.',
    }),
    localizedTextField('roiSentenceAfter', 'ROI sentence (after amount)', {
      group: 'results',
      rows: 2,
      description: 'Text after the dynamic USD amount. e.g. “en administración manual.”',
    }),
    localizedStringField('howCalculatedHeading', '“How it’s calculated” heading', {
      group: 'results',
    }),
    localizedTextField('howCalculatedBody', '“How it’s calculated” body', {
      group: 'results',
      rows: 5,
    }),

    // ── Runtime calculator strings ──
    localizedStringField('emptySavingsMessage', 'Empty portfolio message', {
      group: 'runtime',
      description: 'Shown when total properties = 0.',
    }),
    localizedStringField('savingsLineTemplate', 'Savings line template', {
      group: 'runtime',
      description: `${PLACEHOLDER_HINT} Example: "{monto} / mo · {anual} / yr"`,
    }),
    localizedStringField('perMonthSuffix', 'Per-month suffix', {
      group: 'runtime',
      description: 'e.g. “USD / mes” / “USD / mo”',
    }),
    localizedStringField('billedAnnuallyNote', 'Billed annually note', {
      group: 'runtime',
      description: 'Appended when annual plan is selected.',
    }),
    localizedStringField('minimumAppliesNote', 'Minimum fee note', {
      group: 'runtime',
      description: `${PLACEHOLDER_HINT} Example: "USD {minimo} minimum applies"`,
    }),
    localizedStringField('commercialCountTemplate', 'Commercial count row template', {
      group: 'runtime',
      description: `${PLACEHOLDER_HINT} Example: "{cantidad} comerciales"`,
    }),
    localizedStringField('industrialCountTemplate', 'Industrial count row template', {
      group: 'runtime',
      description: `${PLACEHOLDER_HINT} Example: "{cantidad} industriales"`,
    }),
    localizedStringField('meterAriaTemplate', 'Meter aria-label template', {
      group: 'runtime',
      description: `${PLACEHOLDER_HINT} Example: "Invest {monto} to recover {anual} per month"`,
    }),

    // ── Assumptions (pricing) ──
    defineField({
      name: 'priceCommercial',
      title: 'Vertebra price — commercial (USD/mo)',
      type: 'number',
      group: 'assumptions',
      initialValue: 5,
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'priceIndustrial',
      title: 'Vertebra price — industrial (USD/mo)',
      type: 'number',
      group: 'assumptions',
      initialValue: 10,
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'manualCommercial',
      title: 'Manual cost — commercial (USD/mo)',
      type: 'number',
      group: 'assumptions',
      initialValue: 40,
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'manualIndustrial',
      title: 'Manual cost — industrial (USD/mo)',
      type: 'number',
      group: 'assumptions',
      initialValue: 80,
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'minimumFee',
      title: 'Minimum monthly fee (USD)',
      type: 'number',
      group: 'assumptions',
      initialValue: 200,
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'annualDiscountPercent',
      title: 'Annual discount (%)',
      type: 'number',
      group: 'assumptions',
      initialValue: 10,
      validation: (Rule) => Rule.required().min(0).max(100),
    }),
    defineField({
      name: 'defaultCommercial',
      title: 'Default commercial count',
      type: 'number',
      group: 'assumptions',
      initialValue: 80,
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'defaultIndustrial',
      title: 'Default industrial count',
      type: 'number',
      group: 'assumptions',
      initialValue: 20,
      validation: (Rule) => Rule.required().min(0),
    }),

    // ── CTA ──
    localizedTextField('ctaHeading', 'CTA heading', {group: 'cta', rows: 2}),
    localizedTextField('ctaBody', 'CTA body', {group: 'cta', rows: 3}),
    localizedStringField('whatsappLabel', 'WhatsApp button label', {group: 'cta'}),
    defineField({
      name: 'whatsappUrl',
      title: 'WhatsApp URL',
      type: 'url',
      group: 'cta',
      validation: (Rule) => Rule.uri({scheme: ['http', 'https']}),
    }),
    localizedStringField('demoLabel', 'Demo button label', {group: 'cta'}),
    defineField({
      name: 'demoUrl',
      title: 'Demo / Calendly URL',
      type: 'url',
      group: 'cta',
      validation: (Rule) => Rule.uri({scheme: ['http', 'https']}),
    }),
    localizedTextField('disclaimer', 'Disclaimer', {group: 'cta', rows: 3}),
  ],
  preview: {
    select: {title: 'title'},
    prepare: ({title}) => ({
      title: localizedPreviewValue(title, 'ROI Calculator'),
    }),
  },
})
