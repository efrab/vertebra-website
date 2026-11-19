import type {APIRoute} from 'astro'
import {llmsTxt} from '../lib/agents/content'
import {getSiteUrl} from '../lib/seo/siteUrl'

export const GET: APIRoute = ({url}) =>
  new Response(llmsTxt(getSiteUrl(url.origin)), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  })
