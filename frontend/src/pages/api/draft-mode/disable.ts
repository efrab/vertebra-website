import type {APIRoute} from 'astro'
import {perspectiveCookieName} from '@sanity/preview-url-secret/constants'

export const GET: APIRoute = async ({cookies, url, redirect}) => {
  cookies.delete(perspectiveCookieName, {path: '/'})

  const redirectTo = url.searchParams.get('sanity-preview-pathname') ?? '/'
  return redirect(redirectTo)
}
