/**
 * Webflow home interactions: horizontal sliders + scroll reveals.
 * Text: word split + slide-from-right (matches Webflow SplitType + GSAP).
 * Blocks/images: `[data-vf-reveal]` fade-up (30px | 1.875em).
 */

function initSliders() {
  for (const root of document.querySelectorAll<HTMLElement>('[data-vf-slider]')) {
    const track = root.querySelector<HTMLElement>('[data-vf-slider-track]')
    if (!track) continue

    const prev = root.querySelector<HTMLElement>('[data-vf-slider-prev]')
    const next = root.querySelector<HTMLElement>('[data-vf-slider-next]')
    const nav = root.querySelector<HTMLElement>('[data-vf-slider-nav]')
    const slides = [...track.children] as HTMLElement[]
    if (!slides.length) continue

    const infinite = root.dataset.vfInfinite === 'true'
    const hideArrows = root.dataset.vfHideArrows === 'true'
    const duration = Number(root.dataset.vfDuration) || 500

    let index = 0
    let dots: HTMLButtonElement[] = []

    const visibleCount = () => {
      const slideW = slides[0]?.getBoundingClientRect().width || track.clientWidth
      if (!slideW) return 1
      return Math.max(1, Math.round(track.clientWidth / slideW))
    }

    const maxIndex = () => Math.max(0, slides.length - visibleCount())

    const buildDots = () => {
      if (!nav) return
      nav.replaceChildren()
      dots = []
      const pages = maxIndex() + 1
      for (let i = 0; i < pages; i++) {
        const dot = document.createElement('button')
        dot.type = 'button'
        dot.className = 'w-slider-dot'
        dot.setAttribute('aria-label', `Ir a la diapositiva ${i + 1}`)
        if (root.classList.contains('deslizante') || nav.classList.contains('w-num')) {
          dot.textContent = String(i + 1)
        }
        dot.addEventListener('click', () => go(i))
        nav.append(dot)
        dots.push(dot)
      }
    }

    const updateChrome = () => {
      const max = maxIndex()
      dots.forEach((dot, i) => {
        dot.classList.toggle('w-active', i === index)
        dot.setAttribute('aria-current', i === index ? 'true' : 'false')
      })

      if (!hideArrows) {
        prev?.classList.remove('is-disabled')
        next?.classList.remove('is-disabled')
        if (prev) prev.hidden = false
        if (next) next.hidden = false
        return
      }

      const atStart = index <= 0
      const atEnd = index >= max
      if (prev) {
        prev.hidden = atStart
        prev.classList.toggle('is-disabled', atStart)
      }
      if (next) {
        next.hidden = atEnd
        next.classList.toggle('is-disabled', atEnd)
      }
    }

    const go = (nextIndex: number, instant = false) => {
      const max = maxIndex()
      if (infinite && max > 0) {
        if (nextIndex < 0) index = max
        else if (nextIndex > max) index = 0
        else index = nextIndex
      } else {
        index = Math.max(0, Math.min(max, nextIndex))
      }

      const slide = slides[index]
      if (!slide) return

      const left = slide.offsetLeft
      if (instant || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        track.scrollLeft = left
      } else if (typeof track.scrollTo === 'function') {
        track.scrollTo({left, behavior: 'smooth'})
      } else {
        track.scrollLeft = left
      }

      // Keep active chrome in sync even while smooth-scrolling
      updateChrome()
      window.setTimeout(updateChrome, duration)
    }

    prev?.addEventListener('click', () => go(index - 1))
    next?.addEventListener('click', () => go(index + 1))

    let scrollTimer: number | undefined
    track.addEventListener(
      'scroll',
      () => {
        window.clearTimeout(scrollTimer)
        scrollTimer = window.setTimeout(() => {
          const left = track.scrollLeft
          let best = 0
          let bestDist = Infinity
          slides.forEach((slide, i) => {
            if (i > maxIndex()) return
            const dist = Math.abs(slide.offsetLeft - left)
            if (dist < bestDist) {
              bestDist = dist
              best = i
            }
          })
          index = best
          updateChrome()
        }, 80)
      },
      {passive: true},
    )

    const onResize = () => {
      buildDots()
      go(Math.min(index, maxIndex()), true)
    }

    buildDots()
    updateChrome()
    window.addEventListener('resize', onResize)
  }
}

/** Split text nodes into `.word` spans (SplitType-compatible). */
function splitWords(element: HTMLElement) {
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT)
  const textNodes: Text[] = []
  let current = walker.nextNode()
  while (current) {
    textNodes.push(current as Text)
    current = walker.nextNode()
  }

  for (const textNode of textNodes) {
    const chunks = (textNode.textContent ?? '').split(/(\s+)/).filter(Boolean)
    if (!chunks.some((chunk) => chunk.trim())) continue

    const fragment = document.createDocumentFragment()
    for (const chunk of chunks) {
      if (!chunk.trim()) {
        fragment.append(chunk)
        continue
      }
      const word = document.createElement('span')
      word.className = 'word'
      word.textContent = chunk
      fragment.append(word)
    }
    textNode.replaceWith(fragment)
  }
}

function playWordsFromRight(el: HTMLElement) {
  const words = [...el.querySelectorAll<HTMLElement>('.word')]
  if (!words.length) {
    el.classList.add('is-text-in')
    return
  }

  const n = words.length
  const stagger = n > 1 ? 0.2 / (n - 1) : 0

  words.forEach((word, i) => {
    word.style.setProperty('--word-delay', `${(i * stagger).toFixed(3)}s`)
  })
  el.classList.add('is-text-in')
}

function resetWords(el: HTMLElement) {
  el.classList.remove('is-text-in')
}

function isInTriggerZone(el: Element) {
  const rect = el.getBoundingClientRect()
  return rect.top < window.innerHeight * 0.75 && rect.bottom > 0
}

function initTextReveal(reduce: boolean) {
  const targets = [...document.querySelectorAll<HTMLElement>('[words-slide-from-right]')]
  const splitEls = [...document.querySelectorAll<HTMLElement>('[text-split]')]

  if (!splitEls.length && !targets.length) {
    document.documentElement.classList.add('vf-text-ready')
    return
  }

  for (const el of splitEls) splitWords(el)

  document.documentElement.classList.add('vf-text-ready')

  if (reduce) {
    targets.forEach((el) => el.classList.add('is-text-in'))
    return
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const el = entry.target as HTMLElement
        if (entry.isIntersecting) {
          playWordsFromRight(el)
        } else if (entry.boundingClientRect.top > window.innerHeight) {
          resetWords(el)
        }
      }
    },
    {threshold: 0, rootMargin: '0px 0px -25% 0px'},
  )

  for (const el of targets) {
    if (isInTriggerZone(el)) playWordsFromRight(el)
    io.observe(el)
  }
}

function revealY(el: HTMLElement): string {
  const raw = el.getAttribute('data-vf-reveal')
  if (!raw || raw === '') return '30px'
  if (/^\d+(\.\d+)?$/.test(raw)) return `${raw}px`
  return raw
}

function initBlockReveal(reduce: boolean) {
  // Tab pane reveals are owned by webflow-modulos (enter on load + on tab switch)
  const nodes = [...document.querySelectorAll<HTMLElement>('[data-vf-reveal]')].filter(
    (el) => !el.closest('.w-tab-pane'),
  )
  document.documentElement.classList.add('vf-motion-ready')

  if (reduce) {
    nodes.forEach((el) => el.classList.add('is-in'))
    document.querySelectorAll<HTMLElement>('.w-tab-pane [data-vf-reveal]').forEach((el) => {
      el.classList.add('is-in')
    })
    return
  }

  nodes.forEach((el) => {
    el.style.setProperty('--vf-reveal-y', revealY(el))
  })

  const reveal = (el: Element) => el.classList.add('is-in')

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          reveal(entry.target)
          io.unobserve(entry.target)
        }
      }
    },
    {threshold: 0, rootMargin: '0px 0px -25% 0px'},
  )

  nodes.forEach((el) => {
    if (isInTriggerZone(el)) {
      // Double rAF so the opacity:0 / translate paint lands before .is-in (page-load IX)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => reveal(el))
      })
      return
    }
    io.observe(el)
  })
}

function boot() {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  requestAnimationFrame(() => {
    initTextReveal(reduce)
    initBlockReveal(reduce)
    initSliders()
  })

  window.setTimeout(() => {
    document.documentElement.classList.add('vf-text-ready', 'vf-motion-ready')
    document.querySelectorAll<HTMLElement>('[words-slide-from-right]:not(.is-text-in)').forEach((el) => {
      if (isInTriggerZone(el)) el.classList.add('is-text-in')
    })
    document.querySelectorAll<HTMLElement>('[data-vf-reveal]:not(.is-in)').forEach((el) => {
      if (el.closest('.w-tab-pane')) return
      if (isInTriggerZone(el)) el.classList.add('is-in')
    })
  }, 4000)
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot)
} else {
  boot()
}
