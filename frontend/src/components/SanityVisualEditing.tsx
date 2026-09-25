import {useEffect, useMemo, useRef} from 'react'
import {
  VisualEditing,
  type HistoryAdapter,
  type HistoryRefresh,
  type HistoryUpdate,
  type SuspiciousStegaReport,
} from '@sanity/visual-editing/react'
import {perspectiveCookieName} from '@sanity/preview-url-secret/constants'
import type {ClientPerspective} from '@sanity/client'

function serializePerspective(perspective: ClientPerspective): string {
  return typeof perspective === 'string' ? perspective : JSON.stringify(perspective)
}

function getCookie(name: string): string | undefined {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`))
  return match ? decodeURIComponent(match[1]) : undefined
}

function setPerspectiveCookie(perspective: ClientPerspective): boolean {
  const next = serializePerspective(perspective)
  const current = getCookie(perspectiveCookieName)
  if (current === next) return false

  // Always Partitioned for cross-site Presentation iframe (Studio ≠ preview host)
  document.cookie = `${perspectiveCookieName}=${encodeURIComponent(next)}; path=/; SameSite=None; Secure; Partitioned`
  return true
}

function currentUrl() {
  return `${window.location.pathname}${window.location.search}${window.location.hash}`
}

function applyHistoryUpdate(
  update: Pick<HistoryUpdate, 'type' | 'url'>,
  currentHref: string,
) {
  switch (update.type) {
    case 'push':
      if (currentHref !== update.url) window.location.assign(update.url)
      return
    case 'replace':
      if (currentHref !== update.url) window.location.replace(update.url)
      return
    case 'pop':
      window.history.back()
      return
  }
}

function previewUrl() {
  const url = new URL(window.location.href)
  url.searchParams.set('sanity-preview', String(Date.now()))
  return url
}

/** Full navigation fallback when soft refresh cannot run. */
function hardRefresh(url: URL) {
  window.location.assign(url.toString())
}

/** Detect stega-encoded payloads in text nodes (required for click-to-edit overlays). */
function hasStegaInTree(root: ParentNode): boolean {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
  let node: Node | null
  while ((node = walker.nextNode())) {
    const text = node.textContent || ''
    if (
      text.length > 0 &&
      /[\u200B-\u200D\uFEFF\u2060\u00AD]|[\uE000-\uF8FF]/.test(text)
    ) {
      return true
    }
  }
  return false
}

function rebindTabs(root: ParentNode) {
  if (root.querySelector('[data-vf-tabs], .w-tabs, .w-tab-menu')) {
    void import('../scripts/webflow-modulos').then((mod) => {
      mod.initTabs()
    })
  }
}

function forceVisible(root: ParentNode) {
  root.querySelectorAll('[data-vf-reveal]').forEach((el) => {
    el.classList.add('is-in')
  })
  root.querySelectorAll('[words-slide-from-right], [text-split]').forEach((el) => {
    el.classList.add('is-text-in')
  })
}

/**
 * Soft-refresh: re-fetch SSR HTML and swap `#main-content` in place so scroll
 * (and the section being edited) is preserved. Falls back to hard navigation.
 * Returns a Promise so VisualEditing keeps overlay loading until swap completes.
 */
async function softRefresh(_payload?: HistoryRefresh): Promise<void> {
  const scrollY = window.scrollY
  const url = previewUrl()

  try {
    const res = await fetch(url.toString(), {credentials: 'include'})
    if (!res.ok) {
      hardRefresh(url)
      return
    }

    const html = await res.text()
    const doc = new DOMParser().parseFromString(html, 'text/html')
    const nextMain = doc.querySelector('#main-content')
    const currentMain = document.querySelector('#main-content')

    if (!nextMain || !currentMain) {
      hardRefresh(url)
      return
    }

    // Prefer stega for overlays; if missing (cookie not yet set) still swap DOM
    // so Presentation stays connected — hard refresh only when swap itself fails.
    currentMain.replaceChildren(...Array.from(nextMain.childNodes))
    forceVisible(currentMain)
    rebindTabs(currentMain)
    if (!hasStegaInTree(currentMain) && !getCookie(perspectiveCookieName)) {
      // No draft cookie yet — full navigation through enable flow may be needed next edit
      console.warn('[visual-editing] soft refresh without stega; draft cookie missing')
    }
    document.title = doc.title
    window.history.replaceState(null, '', url.toString())
    window.scrollTo(0, scrollY)
  } catch {
    hardRefresh(url)
  }
}

function onSuspiciousStega(reports: SuspiciousStegaReport[]) {
  for (const report of reports) {
    console.warn(`[visual-editing] suspicious stega in ${report.kind}`, report)
  }
}

/**
 * Visual Editing for Presentation. Layout only mounts this in draft / Studio iframe.
 * Mount immediately so comlink handshake does not wait on a second paint.
 */
export default function SanityVisualEditing() {
  type Navigate = Parameters<HistoryAdapter['subscribe']>[0]
  const navigateRef = useRef<Navigate | undefined>(undefined)
  const lastUrlRef = useRef('')

  useEffect(() => {
    const sync = () => {
      const url = currentUrl()
      if (url !== lastUrlRef.current) {
        lastUrlRef.current = url
        navigateRef.current?.({type: 'push', title: document.title, url})
      }
    }

    sync()
    window.addEventListener('popstate', sync)
    window.addEventListener('hashchange', sync)

    const origPush = window.history.pushState
    const origReplace = window.history.replaceState
    window.history.pushState = function (...args) {
      origPush.apply(window.history, args)
      sync()
    }
    window.history.replaceState = function (...args) {
      origReplace.apply(window.history, args)
      sync()
    }

    return () => {
      window.removeEventListener('popstate', sync)
      window.removeEventListener('hashchange', sync)
      window.history.pushState = origPush
      window.history.replaceState = origReplace
    }
  }, [])

  const history = useMemo<HistoryAdapter>(
    () => ({
      subscribe: (navigate) => {
        navigateRef.current = navigate
        const url = currentUrl()
        lastUrlRef.current = url
        navigate({type: 'push', title: document.title, url})
        return () => {
          if (navigateRef.current === navigate) {
            navigateRef.current = undefined
          }
        }
      },
      update: (update) => {
        applyHistoryUpdate(update, window.location.href)
      },
    }),
    [],
  )

  return (
    <VisualEditing
      history={history}
      portal={true}
      zIndex={2147483646}
      onSuspiciousStega={onSuspiciousStega}
      onPerspectiveChange={(perspective) => {
        if (setPerspectiveCookie(perspective)) {
          void softRefresh()
        }
      }}
      refresh={softRefresh}
    />
  )
}
