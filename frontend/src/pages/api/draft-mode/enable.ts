import type {APIRoute} from 'astro'
import {sanityClient} from 'sanity:client'
import {validatePreviewUrl} from '@sanity/preview-url-secret'
import {perspectiveCookieName} from '@sanity/preview-url-secret/constants'

export const GET: APIRoute = async ({request, cookies, redirect}) => {
  const token = import.meta.env.SANITY_API_READ_TOKEN
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

  cookies.set(perspectiveCookieName, studioPreviewPerspective ?? 'drafts', {
    path: '/',
    httpOnly: true,
    sameSite: 'none',
    secure: import.meta.env.PROD,
  })

  return redirect(redirectTo)
}
