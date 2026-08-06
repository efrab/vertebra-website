import type {AstroCookies} from 'astro'
import {perspectiveCookieName} from '@sanity/preview-url-secret/constants'

export type DraftModeProps = {
  isEnabled: boolean
  perspectiveCookie: string | null
}

export function getDraftModeProps(cookies: AstroCookies): DraftModeProps {
  const perspectiveCookie = cookies.get(perspectiveCookieName)?.value ?? null
  return {
    isEnabled: Boolean(perspectiveCookie),
    perspectiveCookie,
  }
}
