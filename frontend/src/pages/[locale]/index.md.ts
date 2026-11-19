import type {APIRoute} from 'astro'
import {homeMarkdown} from '../../lib/agents/content'
import {isLocale} from '../../i18n/routes'
import {getSiteUrl} from '../../lib/seo/siteUrl'

export const GET: APIRoute = ({params, url}) => {
  const locale = params.locale
  if (!locale || !isLocale(locale)) return new Response(null, {status: 404})
  return new Response(homeMarkdown(locale, getSiteUrl(url.origin)), {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
