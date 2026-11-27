import {mkdir} from 'node:fs/promises'
import {chromium} from '@playwright/test'

const appUrl = process.env.APP_URL ?? 'http://localhost:3000'
const email = process.env.DEMO_EMAIL
const password = process.env.DEMO_PASSWORD
const inspectionId = process.env.INSPECTION_ID
const runId = process.env.RUN_ID
const outDir = process.env.OUT_DIR ?? 'frontend/public/assets/inspections'

if (!email || !password || !inspectionId || !runId) {
  console.error('Set DEMO_EMAIL, DEMO_PASSWORD, INSPECTION_ID and RUN_ID')
  process.exit(1)
}

const shots = [
  {name: 'list', path: '/maintenance/inspections'},
  {name: 'schedule', path: `/maintenance/inspections/${inspectionId}/edit`},
  {name: 'run', path: `/maintenance/inspections/${inspectionId}/runs/${runId}`},
  {name: 'conclusion', path: `/maintenance/inspections/${inspectionId}/runs/${runId}`, scrollTo: /conclusi[oó]n/i},
  {name: 'history', path: `/maintenance/inspections/${inspectionId}/history`},
  {name: 'dashboard', path: '/dashboards/maintenance_inspections'},
]

await mkdir(outDir, {recursive: true})
const browser = await chromium.launch()
const context = await browser.newContext({
  viewport: {width: 1440, height: 900},
  deviceScaleFactor: 2,
  locale: 'es-MX',
  timezoneId: 'America/Mexico_City',
})
const page = await context.newPage()

await page.goto(`${appUrl}/users/sign_in`)
await page.fill('#user_email', email)
await page.fill('#user_password', password)
await Promise.all([page.waitForURL((url) => !url.pathname.includes('sign_in')), page.press('#user_password', 'Enter')])

async function hideDevOverlays() {
  await page.evaluate(() => {
    document.querySelectorAll('.profiler-results, #bullet-footer').forEach((el) => el.remove())
    for (const el of document.querySelectorAll('body *')) {
      const style = getComputedStyle(el)
      if (style.position !== 'fixed') continue
      const text = el.textContent ?? ''
      if (text.includes('Bullet') || text.includes('Ayuda') || /\d+(\.\d+)?\s*ms/.test(text) || el.querySelector('img, svg')) {
        if (!el.closest('aside, nav') && el.getBoundingClientRect().width < 600) el.style.display = 'none'
      }
    }
  })
}

for (const shot of shots) {
  await page.goto(`${appUrl}${shot.path}`, {waitUntil: 'networkidle'})
  await page.waitForTimeout(800)
  if (shot.scrollTo) {
    await page.getByText(shot.scrollTo).first().scrollIntoViewIfNeeded()
    await page.mouse.wheel(0, -120)
    await page.waitForTimeout(400)
  }
  await hideDevOverlays()
  const file = `${outDir}/${shot.name}.png`
  await page.screenshot({path: file, fullPage: false})
  console.log(`${shot.name}: ${page.url()} -> ${file}`)
}

await browser.close()
