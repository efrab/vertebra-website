import type {APIRoute} from 'astro'
import {loadQuery} from '../lib/sanity/loadQuery'
import {sitemapEntriesQuery} from '../lib/sanity/queries/sitemap'
import {buildSitemapEntries, renderSitemapXml, type SitemapData} from '../lib/seo/sitemap'
import {getSiteUrl} from '../lib/seo/siteUrl'

export const GET: APIRoute = async () => {
  let data: SitemapData | null = null

  try {
    data = await loadQuery<SitemapData>(sitemapEntriesQuery, {locale: 'es'})
  } catch {
    // Use fixture fallbacks in buildSitemapEntries
  }

  const entries = buildSitemapEntries(data, getSiteUrl())
  const body = renderSitemapXml(entries)

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
