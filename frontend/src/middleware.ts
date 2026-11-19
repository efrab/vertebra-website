import {defineMiddleware} from 'astro:middleware'
import {getDraftModeProps} from './lib/sanity/draft-mode'

function isStudioPreviewFrame(request: Request): boolean {
  const dest = request.headers.get('sec-fetch-dest') || ''
  const referer = request.headers.get('referer') || ''
  return dest === 'iframe' || /sanity\.studio|\.sanity\.io/i.test(referer)
}

export const onRequest = defineMiddleware(async (context, next) => {
  const {isEnabled, perspectiveCookie} = getDraftModeProps(context.cookies)
  context.locals.draftMode = isEnabled
  context.locals.perspectiveCookie = perspectiveCookie

  // Agents asking for markdown on the home get the text version
  if (context.request.method === 'GET' && !isEnabled) {
    const accept = context.request.headers.get('accept') || ''
    const m = context.url.pathname.match(/^\/(es|en)\/?$/)
    if (m && /text\/markdown/i.test(accept) && !/text\/html/i.test(accept.split('text/markdown')[0])) {
      return Response.redirect(new URL(`/${m[1]}/index.md`, context.url), 307)
    }
  }

  const response = await next()

  response.headers.set('Vary', 'Cookie, Sec-Fetch-Dest, Referer')

  if (isEnabled || isStudioPreviewFrame(context.request)) {
    response.headers.set('Cache-Control', 'private, no-store')
  } else if (response.ok && context.request.method === 'GET') {
    response.headers.set(
      'Cache-Control',
      'public, s-maxage=10, stale-while-revalidate=30',
    )
  }

  return response
})
