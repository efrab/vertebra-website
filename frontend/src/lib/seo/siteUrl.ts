/** Canonical production origin. */
export const PRODUCTION_SITE_URL = 'https://vertebra.co'

/**
 * Absolute site origin, without trailing slash.
 * In production builds the canonical origin is always vertebra.co, even if the
 * env var is missing or points to a *.vercel.app / localhost host.
 */
export function getSiteUrl(fallbackOrigin?: string): string {
  const fromEnv = import.meta.env.PUBLIC_SITE_URL?.trim()
  if (import.meta.env.PROD) {
    const bad = !fromEnv || /vercel\.app|localhost|127\.0\.0\.1/i.test(fromEnv)
    return (bad ? PRODUCTION_SITE_URL : fromEnv).replace(/\/+$/, '')
  }
  if (fromEnv) return fromEnv.replace(/\/+$/, '')
  if (fallbackOrigin) return fallbackOrigin.replace(/\/+$/, '')
  return 'http://localhost:4321'
}

export function absoluteUrl(path: string, siteUrl: string): string {
  if (path.startsWith('http')) return path
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${siteUrl}${normalized}`
}
