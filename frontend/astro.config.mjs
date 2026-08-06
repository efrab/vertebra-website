// Loading environment variables from .env files
// https://docs.astro.build/en/guides/configuring-astro/#environment-variables
import { loadEnv } from "vite";
const {
  PUBLIC_SANITY_STUDIO_PROJECT_ID,
  PUBLIC_SANITY_STUDIO_DATASET,
  PUBLIC_SANITY_STUDIO_URL,
  PUBLIC_SITE_URL,
} = loadEnv(import.meta.env.MODE, process.cwd(), "");
import { defineConfig } from "astro/config";

const projectId =
  PUBLIC_SANITY_STUDIO_PROJECT_ID?.trim() || "placeholder";
const dataset = PUBLIC_SANITY_STUDIO_DATASET?.trim() || "production";
const studioUrl = PUBLIC_SANITY_STUDIO_URL?.trim() || "http://localhost:3333";

import sanity from "@sanity/astro";
import react from "@astrojs/react";

// Change this depending on your hosting provider (Vercel, Netlify etc)
// https://docs.astro.build/en/guides/server-side-rendering/#adding-an-adapter
import vercel from "@astrojs/vercel";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: PUBLIC_SITE_URL?.trim() || "http://localhost:4321",
  // Set to 'server' for Visual Editing and on-demand rendering
  // Requires an adapter for deployment (Vercel, Netlify, Cloudflare, Node, etc.)
  output: "server",
  adapter: vercel(),
  compressHTML: true,
  build: {
    inlineStylesheets: "always",
  },
  integrations: [
    sanity({
      projectId,
      dataset,
      // studioBasePath: "/admin",
      // Set useCdn to false if you're building statically.
      useCdn: false,
      apiVersion: "2026-03-26", // Set to date of setup to use the latest API version
      stega: {
        studioUrl,
      },
    }),
    react(), // Required for Sanity Studio
  ],
  vite: {
    optimizeDeps: {
      include: [
        "react/compiler-runtime",
        "lodash/isObject.js",
        "lodash/groupBy.js",
        "lodash/keyBy.js",
        "lodash/partition.js",
        "lodash/sortedIndex.js",
      ],
    },

    plugins: [tailwindcss()],
  },
});