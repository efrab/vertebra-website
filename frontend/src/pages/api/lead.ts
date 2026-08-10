import type {APIRoute} from 'astro'
import {Resend} from 'resend'
import {randomUUID} from 'node:crypto'
import {loadEnv} from 'vite'

const DEFAULT_TO = [
  'josepablo@vertebra.co',
  'fernando@vertebra.co',
  'efrain@vertebra.co',
]

/** Resolve server secrets — Vercel adapter may not expose `.env` via import.meta.env in dev. */
function env(key: string): string | undefined {
  const fromMeta = import.meta.env[key]
  if (typeof fromMeta === 'string' && fromMeta) return fromMeta
  const fromProcess = process.env[key]
  if (fromProcess) return fromProcess
  if (import.meta.env.DEV) {
    const local = loadEnv(import.meta.env.MODE, process.cwd(), '')
    const value = local[key]
    if (value) return value
  }
  return undefined
}

function parseRecipients(value: string | undefined): string[] {
  if (!value?.trim()) return DEFAULT_TO
  const list = value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
  return list.length ? list : DEFAULT_TO
}

export const POST: APIRoute = async ({request}) => {
  const form = await request.formData()
  const payload = {
    firstName: String(form.get('firstName') || ''),
    lastName: String(form.get('lastName') || ''),
    email: String(form.get('email') || ''),
    dialCode: String(form.get('dialCode') || ''),
    phone: String(form.get('phone') || ''),
    properties: String(form.get('properties') || ''),
    message: String(form.get('message') || ''),
    day: String(form.get('day') || ''),
    hour: String(form.get('hour') || ''),
    variant: String(form.get('variant') || 'contact'),
    locale: String(form.get('locale') || 'es'),
  }

  if (!payload.email || !payload.firstName) {
    return new Response(JSON.stringify({ok: false, error: 'missing_fields'}), {
      status: 400,
      headers: {'Content-Type': 'application/json'},
    })
  }

  const fullPhone = [payload.dialCode, payload.phone].filter(Boolean).join(' ').trim()
  const subject = `[Vertebra] Lead ${payload.variant} — ${payload.firstName} ${payload.lastName}`.trim()
  const text = [
    `Variante: ${payload.variant}`,
    `Idioma: ${payload.locale}`,
    '',
    `Nombre: ${payload.firstName}`,
    `Apellidos: ${payload.lastName || '—'}`,
    `Email: ${payload.email}`,
    `Teléfono: ${fullPhone || '—'}`,
    `Propiedades: ${payload.properties || '—'}`,
    `Día: ${payload.day || '—'}`,
    `Hora: ${payload.hour || '—'}`,
    '',
    'Mensaje:',
    payload.message || '—',
  ].join('\n')

  const apiKey = env('RESEND_API_KEY')
  const from = env('CONTACT_FROM_EMAIL') || 'Vertebra Website <onboarding@resend.dev>'
  const to = parseRecipients(env('CONTACT_TO_EMAIL'))

  if (!apiKey) {
    console.info('[lead] Resend not configured; accepting form in dev', payload)
    return new Response(JSON.stringify({ok: true, dev: true}), {
      status: 200,
      headers: {'Content-Type': 'application/json'},
    })
  }

  const resend = new Resend(apiKey)
  const {error} = await resend.emails.send(
    {
      from,
      to,
      replyTo: payload.email,
      subject,
      text,
    },
    {idempotencyKey: randomUUID()},
  )

  if (error) {
    console.error('[lead] Resend error', error)
    return new Response(JSON.stringify({ok: false, error: 'send_failed'}), {
      status: 500,
      headers: {'Content-Type': 'application/json'},
    })
  }

  return new Response(JSON.stringify({ok: true}), {
    status: 200,
    headers: {'Content-Type': 'application/json'},
  })
}
