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
