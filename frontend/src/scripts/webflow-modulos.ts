/**
 * Webflow-style tabs for the modules page (`[data-vf-tabs]`).
 * Matches Webflow IX: fade/slide pane content on enter (duration-in 300).
 */

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

function durationIn(root: HTMLElement) {
  return Number(root.dataset.durationIn) || 300
}

function resetReveal(el: HTMLElement) {
  el.classList.remove('is-in')
  const y = el.getAttribute('data-vf-reveal')
  if (y) {
    el.style.setProperty('--vf-reveal-y', /^\d+(\.\d+)?$/.test(y) ? `${y}px` : y)
  }
}

function playReveal(el: HTMLElement, delayMs = 0) {
  resetReveal(el)
  window.setTimeout(() => {
    requestAnimationFrame(() => {
      el.classList.add('is-in')
    })
  }, delayMs)
}

/** Replay Webflow-like enter animation inside an active tab pane. */
function playPaneEnter(pane: HTMLElement, root: HTMLElement) {
  if (reduceMotion()) {
    pane.querySelectorAll<HTMLElement>('[data-vf-reveal]').forEach((el) => el.classList.add('is-in'))
    return
  }

  const ms = durationIn(root)
  const cont = pane.querySelector<HTMLElement>('.modulos_tab-cont[data-vf-reveal]')
  if (cont) {
    cont.style.transitionDuration = `${ms}ms`
    playReveal(cont, 16)
  }

  const staggered = [
    ...pane.querySelectorAll<HTMLElement>('.card-v4[data-vf-reveal]'),
    ...pane.querySelectorAll<HTMLElement>('.message-component[data-vf-reveal]'),
  ]

  staggered.forEach((el, i) => {
    const delay = Number(el.style.getPropertyValue('--vf-reveal-delay').replace('s', '')) * 1000 || i * 70
    playReveal(el, 40 + delay)
  })
}

function activateTab(root: HTMLElement, next: HTMLElement) {
  const links = [...root.querySelectorAll<HTMLElement>('.w-tab-link')]
  const panes = [...root.querySelectorAll<HTMLElement>('.w-tab-pane')]
  const id = next.getAttribute('data-w-tab')
  if (!id) return

  const prev = panes.find((pane) => pane.classList.contains('w--tab-active'))
  const incoming = panes.find((pane) => pane.getAttribute('data-w-tab') === id)
  if (!incoming || prev === incoming) return

  for (const link of links) {
    const active = link.getAttribute('data-w-tab') === id
    link.classList.toggle('w--current', active)
    link.setAttribute('aria-selected', active ? 'true' : 'false')
    link.tabIndex = active ? 0 : -1
  }

  for (const pane of panes) {
    const active = pane.getAttribute('data-w-tab') === id
    pane.classList.toggle('w--tab-active', active)
    pane.hidden = !active
  }

  playPaneEnter(incoming, root)
}

function initTabs() {
  document.documentElement.classList.add('vf-motion-ready')

  for (const root of document.querySelectorAll<HTMLElement>('[data-vf-tabs]')) {
    const menu = root.querySelector('.w-tab-menu')
    if (!menu) continue

    const firstPane = root.querySelector<HTMLElement>('.w-tab-pane.w--tab-active')
    if (firstPane && !reduceMotion()) {
      // Let CSS paint opacity:0 first, then enter (matches Webflow page-load IX)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => playPaneEnter(firstPane, root))
      })
    } else if (firstPane) {
      playPaneEnter(firstPane, root)
    }

    menu.addEventListener('click', (event) => {
      const target = (event.target as HTMLElement | null)?.closest?.('.w-tab-link') as
        | HTMLElement
        | null
      if (!target || !menu.contains(target)) return
      event.preventDefault()
      activateTab(root, target)
    })

    menu.addEventListener('keydown', (event) => {
      const keyEvent = event as KeyboardEvent
      const links = [...menu.querySelectorAll<HTMLElement>('.w-tab-link')]
      const current = document.activeElement as HTMLElement | null
      const index = links.indexOf(current as HTMLElement)
      if (index < 0) return

      let nextIndex = index
      if (keyEvent.key === 'ArrowDown' || keyEvent.key === 'ArrowRight') {
        nextIndex = (index + 1) % links.length
      } else if (keyEvent.key === 'ArrowUp' || keyEvent.key === 'ArrowLeft') {
        nextIndex = (index - 1 + links.length) % links.length
      } else if (keyEvent.key === 'Home') {
        nextIndex = 0
      } else if (keyEvent.key === 'End') {
        nextIndex = links.length - 1
      } else {
        return
      }

      keyEvent.preventDefault()
      links[nextIndex]?.focus()
      activateTab(root, links[nextIndex])
    })
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTabs, {once: true})
} else {
  initTabs()
}

// Safety: never leave the active pane permanently invisible if motion stalls
window.setTimeout(() => {
  document.querySelectorAll<HTMLElement>('.w-tab-pane.w--tab-active [data-vf-reveal]:not(.is-in)').forEach((el) => {
    el.classList.add('is-in')
  })
}, 2500)
