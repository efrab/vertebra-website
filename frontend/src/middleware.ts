import {defineMiddleware} from 'astro:middleware'
import {getDraftModeProps} from './lib/sanity/draft-mode'

export const onRequest = defineMiddleware(async (context, next) => {
  const {isEnabled, perspectiveCookie} = getDraftModeProps(context.cookies)
  context.locals.draftMode = isEnabled
  context.locals.perspectiveCookie = perspectiveCookie

  const response = await next()

  if (!isEnabled && response.ok && context.request.method === 'GET') {
    response.headers.set(
      'Cache-Control',
      'public, s-maxage=60, stale-while-revalidate=600',
    )
  }

  return response
})
