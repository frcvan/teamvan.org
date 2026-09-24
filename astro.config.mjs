// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  vite: {
      plugins: [tailwindcss()],
  },

  site: "https://teamvan.org",

  prefetch: {
      prefetchAll: true,
  },

  integrations: [icon()],
});