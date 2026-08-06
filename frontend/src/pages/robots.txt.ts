import type {APIRoute} from 'astro'
import {getSiteUrl} from '../lib/seo/siteUrl'

export const GET: APIRoute = () => {
  const siteUrl = getSiteUrl()

  const body = `# Vertebra Website
User-agent: *
Allow: /
Disallow: /api/
Disallow: /*/gracias
Disallow: /*/thank-you
Disallow: /*/gracias-agenda
Disallow: /*/thanks-demo

Sitemap: ${siteUrl}/sitemap.xml
`

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  })
}
