/**
 * Sanity CLI Configuration
 * This file configures the Sanity CLI tool with project-specific settings
 * and customizes the Vite bundler configuration.
 * Learn more: https://www.sanity.io/docs/cli
 */

import {defineCliConfig} from 'sanity/cli'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || '<your project ID>'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
  deployment: {
    autoUpdates: true,
    appId: 'abgy9ohom46qat6bwg9mtnhk',
  },
  studioHost: process.env.SANITY_STUDIO_STUDIO_HOST || 'vertebra',
  typegen: {
    path: '../frontend/src/**/*.{ts,tsx,js,jsx,astro}',
    schema: '../frontend/schema.json',
    generates: '../frontend/src/sanity.types.ts',
    overloadClientMethods: true,
  },
})
