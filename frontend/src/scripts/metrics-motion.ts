const EASING = (t: number) => 1 - Math.pow(1 - t, 3)
const DRAW_DURATION = 1900
const DRAW_STAGGER = 110
const DRAW_EASING = 'cubic-bezier(0.16, 1, 0.3, 1)'

type ParsedCount = {
  prefix: string
  target: number
  suffix: string
  decimals: number
}

function parseCountValue(value: string): ParsedCount | null {
  const normalized = value.replace(/\u2212/g, '−').trim()
  const match = normalized.match(/^([+\-−]?\s*)([\d]+(?:[.,]\d+)?)([\s\S]*)$/u)
  if (!match) return null

  const rawNumber = match[2]
  const decimals =
    rawNumber.includes('.') || rawNumber.includes(',')
      ? (rawNumber.split(/[.,]/)[1]?.length ?? 0)
      : 0

  return {
    prefix: match[1].replace(/\s/g, ''),
    target: Number(rawNumber.replace(',', '.')),
    suffix: match[3],
    decimals,
  }
}

function formatCount(current: number, parsed: ParsedCount) {
  const number =
    parsed.decimals > 0 ? current.toFixed(parsed.decimals) : String(Math.round(current))
  return `${parsed.prefix}${number}${parsed.suffix}`
}

function drawStatIcon(article: HTMLElement) {
  article.querySelectorAll<SVGPathElement>('.stat-icon path').forEach((path, index) => {
    const length = path.getTotalLength()
    if (!length) return

    path.style.strokeDasharray = `${length}`
    path.style.strokeDashoffset = `${length}`

    const animation = path.animate(
      [{strokeDashoffset: `${length}`}, {strokeDashoffset: '0'}],
      {
        duration: DRAW_DURATION,
        delay: index * DRAW_STAGGER,
        easing: DRAW_EASING,
        fill: 'forwards',
      },
    )

    animation.onfinish = () => {
      path.style.strokeDashoffset = '0'
    }
  })
}

function animateCounter(element: HTMLElement, parsed: ParsedCount) {
  const duration = 1200
  const delay = 480

  element.textContent = formatCount(0, parsed)

  window.setTimeout(() => {
    const startedAt = performance.now()

    const tick = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1)
      element.textContent = formatCount(parsed.target * EASING(progress), parsed)

      if (progress < 1) requestAnimationFrame(tick)
      else element.textContent = formatCount(parsed.target, parsed)
    }

    requestAnimationFrame(tick)
  }, delay)
}

export function animateMetric(article: HTMLElement) {
  if (article.dataset.metricAnimated !== undefined) return
  article.dataset.metricAnimated = ''

  drawStatIcon(article)

  const counter = article.querySelector<HTMLElement>('[data-count-value]')
  if (!counter) return

  const parsed = parseCountValue(counter.dataset.countValue ?? counter.textContent ?? '')
  if (!parsed) return

  animateCounter(counter, parsed)
}

export function setupMetrics() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  document
    .querySelectorAll<HTMLElement>('[data-metric].is-revealed')
    .forEach((article) => animateMetric(article))
}
