import type {APIRoute} from 'astro'
import {sanityClient} from 'sanity:client'
import {validatePreviewUrl} from '@sanity/preview-url-secret'
import {perspectiveCookieName} from '@sanity/preview-url-secret/constants'

export const GET: APIRoute = async ({request, cookies, redirect}) => {
  const token = import.meta.env.SANITY_API_READ_TOKEN?.trim()
  if (!token) {
    return new Response('Missing SANITY_API_READ_TOKEN', {status: 401})
  }

  const client = sanityClient.withConfig({token})
  const {isValid, redirectTo = '/', studioPreviewPerspective} = await validatePreviewUrl(
    client,
    request.url,
  )

  if (!isValid) {
    return new Response('Invalid secret', {status: 401})
  }

  // Presentation is always cross-site (Studio ≠ preview host). Always set CHIPS
  // Partitioned + SameSite=None + Secure so Chrome/Safari keep the cookie in the iframe.
  // Do not gate Partitioned on Sec-Fetch-Dest: iframe navigations often send "document".
  cookies.set(perspectiveCookieName, studioPreviewPerspective ?? 'drafts', {
    path: '/',
    httpOnly: false,
    sameSite: 'none',
    secure: true,
    partitioned: true,
  })

  return redirect(redirectTo, 307)
}
