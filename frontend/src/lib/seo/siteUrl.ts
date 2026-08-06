/** Absolute site origin from env, without trailing slash. */
export function getSiteUrl(fallbackOrigin?: string): string {
  const fromEnv = import.meta.env.PUBLIC_SITE_URL?.trim()
  if (fromEnv) return fromEnv.replace(/\/+$/, '')
  if (fallbackOrigin) return fallbackOrigin.replace(/\/+$/, '')
  return 'http://localhost:4321'
}

export function absoluteUrl(path: string, siteUrl: string): string {
  if (path.startsWith('http')) return path
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${siteUrl}${normalized}`
}
