import type {Locale} from '../i18n/routes'

export type RoiCalculatorCopy = {
  title: string
  description: string
  heroTitle: string
  heroHighlight: string
  heroSubtitle: string
  portfolioTitle: string
  commercialLabel: string
  industrialLabel: string
  priceUnitSuffix: string
  planLabel: string
  annualDiscountNote: string
  monthlyButton: string
  annualButton: string
  breakdownHeading: string
  vertebraColumn: string
  manualColumn: string
  commercialRowLabel: string
  industrialRowLabel: string
  totalLabel: string
  commercialSliderAria: string
  commercialNumberAria: string
  industrialSliderAria: string
  industrialNumberAria: string
  planTypeAria: string
  resultsTitle: string
  annualSavingsLabel: string
  vertebraCostLabel: string
  manualCostLabel: string
  manualCostNote: string
  investLabel: string
  recoverLabel: string
  roiSentenceBefore: string
  roiSentenceAfter: string
  howCalculatedHeading: string
  howCalculatedBody: string
  emptySavingsMessage: string
  savingsLineTemplate: string
  perMonthSuffix: string
  billedAnnuallyNote: string
  minimumAppliesNote: string
  commercialCountTemplate: string
  industrialCountTemplate: string
  meterAriaTemplate: string
  priceCommercial: number
  priceIndustrial: number
  manualCommercial: number
  manualIndustrial: number
  minimumFee: number
  annualDiscountPercent: number
  defaultCommercial: number
  defaultIndustrial: number
  ctaHeading: string
  ctaBody: string
  whatsappLabel: string
  whatsappUrl: string
  demoLabel: string
  demoUrl: string
  disclaimer: string
  seo?: {
    metaTitle?: string
    metaDescription?: string
  } | null
}

const ASSUMPTIONS = {
  priceCommercial: 5,
  priceIndustrial: 10,
  manualCommercial: 40,
  manualIndustrial: 80,
  minimumFee: 200,
  annualDiscountPercent: 10,
  defaultCommercial: 80,
  defaultIndustrial: 20,
} as const

const copyEs: RoiCalculatorCopy = {
  title: 'Calculadora de ROI | Vertebra',
  description:
    'Calcula cuánto pierde tu operación inmobiliaria cada mes y el ROI de administrar tu portafolio con Vertebra.',
  heroTitle: 'Cuánto te cuesta\nadministrar a mano',
  heroHighlight: 'a mano',
  heroSubtitle:
    'Ajusta tu portafolio y compara tu costo mensual con Vertebra contra lo que hoy gastas en procesos manuales.',
  portfolioTitle: 'Tu portafolio',
  commercialLabel: 'Propiedades comerciales',
  industrialLabel: 'Propiedades industriales',
  priceUnitSuffix: 'mes c/u',
  planLabel: 'Plan',
  annualDiscountNote: '10% de descuento con pago anual',
  monthlyButton: 'Mensual',
  annualButton: 'Anual',
  breakdownHeading: 'Desglose mensual',
  vertebraColumn: 'Vertebra',
  manualColumn: 'Proceso manual',
  commercialRowLabel: 'Comerciales',
  industrialRowLabel: 'Industriales',
  totalLabel: 'Total',
  commercialSliderAria: 'Propiedades comerciales, deslizador',
  commercialNumberAria: 'Número de propiedades comerciales',
  industrialSliderAria: 'Propiedades industriales, deslizador',
  industrialNumberAria: 'Número de propiedades industriales',
  planTypeAria: 'Tipo de plan',
  resultsTitle: 'Tu resultado',
  annualSavingsLabel: 'Ahorro estimado al año',
  vertebraCostLabel: 'Costo Vertebra',
  manualCostLabel: 'Costo del proceso manual',
  manualCostNote: 'USD / mes en horas de equipo, errores y omisiones',
  investLabel: 'Lo que inviertes',
  recoverLabel: 'Lo que recuperas',
  roiSentenceBefore:
    'Por cada USD 1 que inviertes en Vertebra, dejas de gastar',
  roiSentenceAfter: 'en administración manual.',
  howCalculatedHeading: 'Cómo se calcula.',
  howCalculatedBody:
    ' Vertebra cobra USD 5/mes por propiedad comercial y USD 10/mes por industrial, con una tarifa mínima de USD 200/mes. El costo del proceso manual —USD 40/mes por propiedad comercial y USD 80/mes por industrial— es el benchmark validado de Vertebra sobre portafolios administrados en hoja de cálculo: horas de equipo, errores de facturación, vencimientos no detectados y mantenimiento reactivo. Onboarding único de USD 500, acreditable a tu suscripción.',
  emptySavingsMessage: 'Agrega propiedades para ver tu ahorro',
  savingsLineTemplate: '{monto} / mes · {anual} / año',
  perMonthSuffix: 'USD / mes',
  billedAnnuallyNote: 'facturado anualmente',
  minimumAppliesNote: 'aplica mínimo de USD {minimo}',
  commercialCountTemplate: '{cantidad} comerciales',
  industrialCountTemplate: '{cantidad} industriales',
  meterAriaTemplate: 'Invierte {monto} para recuperar {anual} al mes',
  ...ASSUMPTIONS,
  ctaHeading: '¿Quieres el número exacto para tu portafolio?',
  ctaBody:
    'Armamos el business case con tus contratos y operaciones reales, en 30 minutos.',
  whatsappLabel: 'Escríbenos por WhatsApp',
  whatsappUrl: 'https://wa.me/+17866207272',
  demoLabel: 'Agendar demo',
  demoUrl: 'https://calendly.com/josepablot/30min',
  disclaimer:
    'Cifras en USD, con fines ilustrativos. El ahorro real depende del tamaño del equipo, la complejidad de los contratos y los procesos actuales.',
}

const copyEn: RoiCalculatorCopy = {
  title: 'ROI Calculator | Vertebra',
  description:
    'Calculate how much your real estate operation loses every month and the ROI of managing your portfolio with Vertebra.',
  heroTitle: 'How much it costs you\nto manage by hand',
  heroHighlight: 'by hand',
  heroSubtitle:
    'Adjust your portfolio and compare your monthly cost with Vertebra against what you currently spend on manual processes.',
  portfolioTitle: 'Your portfolio',
  commercialLabel: 'Commercial properties',
  industrialLabel: 'Industrial properties',
  priceUnitSuffix: 'mo each',
  planLabel: 'Plan',
  annualDiscountNote: '10% discount with annual payment',
  monthlyButton: 'Monthly',
  annualButton: 'Annual',
  breakdownHeading: 'Monthly breakdown',
  vertebraColumn: 'Vertebra',
  manualColumn: 'Manual process',
  commercialRowLabel: 'Commercial',
  industrialRowLabel: 'Industrial',
  totalLabel: 'Total',
  commercialSliderAria: 'Commercial properties, slider',
  commercialNumberAria: 'Number of commercial properties',
  industrialSliderAria: 'Industrial properties, slider',
  industrialNumberAria: 'Number of industrial properties',
  planTypeAria: 'Plan type',
  resultsTitle: 'Your result',
  annualSavingsLabel: 'Estimated annual savings',
  vertebraCostLabel: 'Vertebra cost',
  manualCostLabel: 'Manual process cost',
  manualCostNote: 'USD / mo in team hours, errors and omissions',
  investLabel: 'What you invest',
  recoverLabel: 'What you recover',
  roiSentenceBefore:
    'For every USD 1 you invest in Vertebra, you stop spending',
  roiSentenceAfter: 'on manual administration.',
  howCalculatedHeading: "How it's calculated.",
  howCalculatedBody:
    " Vertebra charges USD 5/mo per commercial property and USD 10/mo per industrial, with a USD 200/mo minimum. The manual process cost —USD 40/mo per commercial and USD 80/mo per industrial — is Vertebra's validated benchmark on spreadsheet-managed portfolios: team hours, billing errors, missed expirations and reactive maintenance. One-time USD 500 onboarding, credited to your subscription.",
  emptySavingsMessage: 'Add properties to see your savings',
  savingsLineTemplate: '{monto} / mo · {anual} / yr',
  perMonthSuffix: 'USD / mo',
  billedAnnuallyNote: 'billed annually',
  minimumAppliesNote: 'USD {minimo} minimum applies',
  commercialCountTemplate: '{cantidad} commercial',
  industrialCountTemplate: '{cantidad} industrial',
  meterAriaTemplate: 'Invest {monto} to recover {anual} per month',
  ...ASSUMPTIONS,
  ctaHeading: 'Want the exact number for your portfolio?',
  ctaBody:
    "We'll build the business case with your contracts and real operations, in 30 minutes.",
  whatsappLabel: 'Message us on WhatsApp',
  whatsappUrl: 'https://wa.me/+17866207272',
  demoLabel: 'Book a demo',
  demoUrl: 'https://calendly.com/josepablot/30min',
  disclaimer:
    'Figures in USD, for illustrative purposes. Actual savings depend on team size, contract complexity and current processes.',
}

export function roiCalculatorFixtures(locale: Locale): RoiCalculatorCopy {
  return locale === 'en' ? copyEn : copyEs
}

/** Merge Sanity payload over fixtures so missing fields never blank the page. */
export function mergeRoiCalculatorCopy(
  locale: Locale,
  sanity: Partial<RoiCalculatorCopy> | null | undefined,
): RoiCalculatorCopy {
  const base = roiCalculatorFixtures(locale)
  if (!sanity) return base
  const merged: RoiCalculatorCopy = {...base}
  for (const key of Object.keys(base) as (keyof RoiCalculatorCopy)[]) {
    const value = sanity[key]
    if (value == null || value === '') continue
    ;(merged as Record<string, unknown>)[key] = value
  }
  return merged
}
