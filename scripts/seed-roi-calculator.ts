/**
 * Seed roiCalculatorPage singleton with current page copy (es + en).
 *
 * Usage:
 *   SANITY_API_TOKEN=sk... npx tsx scripts/seed-roi-calculator.ts
 */

import {createClient} from '@sanity/client'
import {randomKey} from '@sanity/util/content'

const PROJECT_ID = process.env.SANITY_STUDIO_PROJECT_ID || '3dmm07xl'
const DATASET = process.env.SANITY_STUDIO_DATASET || 'production'
const TOKEN = process.env.SANITY_API_TOKEN

if (!TOKEN) {
  console.error('Error: SANITY_API_TOKEN env var is required')
  process.exit(1)
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: '2024-01-01',
  token: TOKEN,
  useCdn: false,
})

/** internationalizedArrayString */
function L(es: string, en: string) {
  return [
    {_key: randomKey(), _type: 'internationalizedArrayStringValue', language: 'es', value: es},
    {_key: randomKey(), _type: 'internationalizedArrayStringValue', language: 'en', value: en},
  ]
}

/** internationalizedArrayText */
function LT(es: string, en: string) {
  return [
    {_key: randomKey(), _type: 'internationalizedArrayTextValue', language: 'es', value: es},
    {_key: randomKey(), _type: 'internationalizedArrayTextValue', language: 'en', value: en},
  ]
}

const doc = {
  _type: 'roiCalculatorPage',
  _id: 'roiCalculatorPage',
  title: L('Calculadora de ROI | Vertebra', 'ROI Calculator | Vertebra'),
  description: LT(
    'Calcula cuánto pierde tu operación inmobiliaria cada mes y el ROI de administrar tu portafolio con Vertebra.',
    'Calculate how much your real estate operation loses every month and the ROI of managing your portfolio with Vertebra.',
  ),
  heroTitle: LT(
    'Cuánto te cuesta\nadministrar a mano',
    'How much it costs you\nto manage by hand',
  ),
  heroHighlight: L('a mano', 'by hand'),
  heroSubtitle: LT(
    'Ajusta tu portafolio y compara tu costo mensual con Vertebra contra lo que hoy gastas en procesos manuales.',
    'Adjust your portfolio and compare your monthly cost with Vertebra against what you currently spend on manual processes.',
  ),
  portfolioTitle: L('Tu portafolio', 'Your portfolio'),
  commercialLabel: L('Propiedades comerciales', 'Commercial properties'),
  industrialLabel: L('Propiedades industriales', 'Industrial properties'),
  priceUnitSuffix: L('mes c/u', 'mo each'),
  planLabel: L('Plan', 'Plan'),
  annualDiscountNote: L(
    '10% de descuento con pago anual',
    '10% discount with annual payment',
  ),
  monthlyButton: L('Mensual', 'Monthly'),
  annualButton: L('Anual', 'Annual'),
  breakdownHeading: L('Desglose mensual', 'Monthly breakdown'),
  vertebraColumn: L('Vertebra', 'Vertebra'),
  manualColumn: L('Proceso manual', 'Manual process'),
  commercialRowLabel: L('Comerciales', 'Commercial'),
  industrialRowLabel: L('Industriales', 'Industrial'),
  totalLabel: L('Total', 'Total'),
  commercialSliderAria: L(
    'Propiedades comerciales, deslizador',
    'Commercial properties, slider',
  ),
  commercialNumberAria: L(
    'Número de propiedades comerciales',
    'Number of commercial properties',
  ),
  industrialSliderAria: L(
    'Propiedades industriales, deslizador',
    'Industrial properties, slider',
  ),
  industrialNumberAria: L(
    'Número de propiedades industriales',
    'Number of industrial properties',
  ),
  planTypeAria: L('Tipo de plan', 'Plan type'),
  resultsTitle: L('Tu resultado', 'Your result'),
  annualSavingsLabel: L('Ahorro estimado al año', 'Estimated annual savings'),
  vertebraCostLabel: L('Costo Vertebra', 'Vertebra cost'),
  manualCostLabel: L('Costo del proceso manual', 'Manual process cost'),
  manualCostNote: LT(
    'USD / mes en horas de equipo, errores y omisiones',
    'USD / mo in team hours, errors and omissions',
  ),
  investLabel: L('Lo que inviertes', 'What you invest'),
  recoverLabel: L('Lo que recuperas', 'What you recover'),
  roiSentenceBefore: LT(
    'Por cada USD 1 que inviertes en Vertebra, dejas de gastar',
    'For every USD 1 you invest in Vertebra, you stop spending',
  ),
  roiSentenceAfter: LT('en administración manual.', 'on manual administration.'),
  howCalculatedHeading: L('Cómo se calcula.', "How it's calculated."),
  howCalculatedBody: LT(
    ' Vertebra cobra USD 5/mes por propiedad comercial y USD 10/mes por industrial, con una tarifa mínima de USD 200/mes. El costo del proceso manual —USD 40/mes por propiedad comercial y USD 80/mes por industrial— es el benchmark validado de Vertebra sobre portafolios administrados en hoja de cálculo: horas de equipo, errores de facturación, vencimientos no detectados y mantenimiento reactivo. Onboarding único de USD 500, acreditable a tu suscripción.',
    " Vertebra charges USD 5/mo per commercial property and USD 10/mo per industrial, with a USD 200/mo minimum. The manual process cost —USD 40/mo per commercial and USD 80/mo per industrial — is Vertebra's validated benchmark on spreadsheet-managed portfolios: team hours, billing errors, missed expirations and reactive maintenance. One-time USD 500 onboarding, credited to your subscription.",
  ),
  emptySavingsMessage: L(
    'Agrega propiedades para ver tu ahorro',
    'Add properties to see your savings',
  ),
  savingsLineTemplate: L('{monto} / mes · {anual} / año', '{monto} / mo · {anual} / yr'),
  perMonthSuffix: L('USD / mes', 'USD / mo'),
  billedAnnuallyNote: L('facturado anualmente', 'billed annually'),
  minimumAppliesNote: L('aplica mínimo de USD {minimo}', 'USD {minimo} minimum applies'),
  commercialCountTemplate: L('{cantidad} comerciales', '{cantidad} commercial'),
  industrialCountTemplate: L('{cantidad} industriales', '{cantidad} industrial'),
  meterAriaTemplate: L(
    'Invierte {monto} para recuperar {anual} al mes',
    'Invest {monto} to recover {anual} per month',
  ),
  priceCommercial: 5,
  priceIndustrial: 10,
  manualCommercial: 40,
  manualIndustrial: 80,
  minimumFee: 200,
  annualDiscountPercent: 10,
  defaultCommercial: 80,
  defaultIndustrial: 20,
  ctaHeading: LT(
    '¿Quieres el número exacto para tu portafolio?',
    'Want the exact number for your portfolio?',
  ),
  ctaBody: LT(
    'Armamos el business case con tus contratos y operaciones reales, en 30 minutos.',
    "We'll build the business case with your contracts and real operations, in 30 minutes.",
  ),
  whatsappLabel: L('Escríbenos por WhatsApp', 'Message us on WhatsApp'),
  whatsappUrl: 'https://wa.me/+17866207272',
  demoLabel: L('Agendar demo', 'Book a demo'),
  demoUrl: 'https://calendly.com/josepablot/30min',
  disclaimer: LT(
    'Cifras en USD, con fines ilustrativos. El ahorro real depende del tamaño del equipo, la complejidad de los contratos y los procesos actuales.',
    'Figures in USD, for illustrative purposes. Actual savings depend on team size, contract complexity and current processes.',
  ),
}

async function main() {
  console.log(`Seeding roiCalculatorPage → ${PROJECT_ID}/${DATASET}…`)
  await client.createOrReplace(doc)

  // Drop any draft that still has the old keyless arrays
  try {
    await client.delete('drafts.roiCalculatorPage')
    console.log('Removed drafts.roiCalculatorPage')
  } catch {
    // no draft
  }

  const sample = await client.fetch(
    `*[_id=="roiCalculatorPage"][0]{title[0]{_key,_type,language},heroTitle[0]{_key,_type,language}}`,
  )
  console.log('Sample keys:', JSON.stringify(sample))
  console.log('Done. Document id: roiCalculatorPage')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
