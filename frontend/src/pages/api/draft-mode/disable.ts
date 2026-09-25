import type {APIRoute} from 'astro'
import {perspectiveCookieName} from '@sanity/preview-url-secret/constants'

const expired = 'Thu, 01 Jan 1970 00:00:00 GMT'

/** Clear all variants of the perspective cookie so live tabs lose draft overlays. */
function expireCookieHeaders(name: string): string[] {
  const base = `${name}=; Path=/; Expires=${expired}; Max-Age=0`
  return [
    `${base}; SameSite=Lax`,
    `${base}; SameSite=None; Secure`,
    `${base}; SameSite=None; Secure; Partitioned`,
  ]
}

export const GET: APIRoute = async ({url}) => {
  const redirectTo = url.searchParams.get('sanity-preview-pathname') ?? '/'
  const headers = new Headers()
  for (const cookie of expireCookieHeaders(perspectiveCookieName)) {
    headers.append('Set-Cookie', cookie)
  }
  headers.set('Location', redirectTo)
  return new Response(null, {status: 307, headers})
}
