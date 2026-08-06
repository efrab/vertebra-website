import {ActionError, defineAction} from 'astro:actions'
import {z} from 'astro:schema'
import {Resend} from 'resend'
import {randomUUID} from 'node:crypto'
import {isLocale, type Locale} from '../i18n/routes'
import {t} from '../i18n'

async function verifyTurnstile(token: string, ip?: string | null) {
  const secret = import.meta.env.TURNSTILE_SECRET_KEY
  if (!secret) return true // allow local dev without Turnstile

  const body = new URLSearchParams({
    secret,
    response: token,
  })
  if (ip) body.set('remoteip', ip)

  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body,
  })
  const data = (await res.json()) as {success?: boolean}
  return Boolean(data.success)
}

export const server = {
  contact: defineAction({
    accept: 'form',
    input: z.object({
      name: z.string().trim().min(1),
      email: z.string().trim().email(),
      company: z.string().trim().optional(),
      phone: z.string().trim().optional(),
      role: z.string().trim().optional(),
      interestArea: z.string().trim().optional(),
      message: z.string().trim().min(1),
      consent: z.literal('on').or(z.literal('true')).or(z.boolean()),
      locale: z.string().optional(),
      website: z.string().optional(), // honeypot
      'cf-turnstile-response': z.string().optional(),
    }),
    handler: async (input, context) => {
      const locale: Locale = input.locale && isLocale(input.locale) ? input.locale : 'es'

      // Honeypot tripped — pretend success
      if (input.website) {
        return {ok: true as const}
      }

      const turnstileToken = input['cf-turnstile-response'] ?? ''
      const valid = await verifyTurnstile(turnstileToken, context.clientAddress)
      if (import.meta.env.TURNSTILE_SECRET_KEY && !valid) {
        throw new ActionError({
          code: 'BAD_REQUEST',
          message: t(locale, 'errors.turnstile'),
        })
      }

      const apiKey = import.meta.env.RESEND_API_KEY
      const to = import.meta.env.CONTACT_TO_EMAIL
      const from =
        import.meta.env.CONTACT_FROM_EMAIL || 'Growth Lab <onboarding@resend.dev>'

      if (!apiKey || !to) {
        console.info('[contact] Resend not configured; accepting form in dev', {
          name: input.name,
          email: input.email,
          company: input.company,
        })
        return {ok: true as const, dev: true as const}
      }

      const resend = new Resend(apiKey)
      const {error} = await resend.emails.send(
        {
          from,
          to: [to],
          replyTo: input.email,
          subject: `[Growth Lab] Contacto de ${input.name}`,
          text: [
            `Nombre: ${input.name}`,
            `Email: ${input.email}`,
            `Empresa: ${input.company || '—'}`,
            `Cargo: ${input.role || '—'}`,
            `Teléfono: ${input.phone || '—'}`,
            `Área de interés: ${input.interestArea || '—'}`,
            `Idioma: ${locale}`,
            '',
            input.message,
          ].join('\n'),
        },
        {idempotencyKey: randomUUID()},
      )

      if (error) {
        console.error('[contact] Resend error', error)
        throw new ActionError({
          code: 'INTERNAL_SERVER_ERROR',
          message: t(locale, 'errors.generic'),
        })
      }

      return {ok: true as const}
    },
  }),
}
