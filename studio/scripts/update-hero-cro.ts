import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2024-01-01'})
const set = (path: string, es: string, en: string) => ({
  [path]: [
    {_key: 'es', _type: 'internationalizedArrayStringValue', language: 'es', value: es},
    {_key: 'en', _type: 'internationalizedArrayStringValue', language: 'en', value: en},
  ],
})

async function main() {
const seo = await client.fetch('*[_id=="homePage"][0].seo')
console.log('seo before', JSON.stringify(seo))

const res = await client
  .patch('homePage')
  .set({
    ...set(
      'pageBuilder[_key=="hero"].heading',
      'Administra tus propiedades comerciales e industriales con IA, sin hojas de cálculo',
      'Manage your commercial and industrial properties with AI, no spreadsheets',
    ),
    ...set(
      'pageBuilder[_key=="hero"].subheading',
      'Gestiona contratos, mantenimientos, facturación y pagos en un solo lugar, y recupera horas cada semana',
      'Manage contracts, maintenance, billing and payments in one place, and win back hours every week',
    ),
    ...set(
      'pageBuilder[_key=="hero"].primaryCta.label',
      'Ver cómo automatizar mis propiedades',
      'See how to automate my properties',
    ),
  })
  .commit()
console.log('patched', res._id, res._rev)
}
main()
