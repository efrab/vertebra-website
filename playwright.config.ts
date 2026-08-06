import {defineConfig, devices} from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  retries: 0,
  use: {
    baseURL: 'http://127.0.0.1:4321',
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'npm run dev --workspace=frontend -- --host 127.0.0.1 --port 4321',
    url: 'http://127.0.0.1:4321/es/',
    reuseExistingServer: true,
    timeout: 120_000,
  },
  projects: [{name: 'chromium', use: {...devices['Desktop Chrome']}}],
})
