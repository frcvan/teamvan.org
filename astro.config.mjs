// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import keystatic from "@keystatic/astro";
import node from "@astrojs/node";

import tailwindcss from "@tailwindcss/vite";

import icon from "astro-icon";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
const editor = process.env.KEYSTATIC_EDITOR === "true";
const development = process.argv.includes("dev");
export default defineConfig({
    output: editor ? "server" : "static",
    adapter: editor ? node({ mode: "standalone" }) : undefined,
    outDir: editor ? "./dist-editor" : "./dist",
    vite: {
        plugins: [tailwindcss()],
    },

    site: "https://teamvan.org",
    trailingSlash: development || editor ? "ignore" : "always",

    prefetch: {
        prefetchAll: true,
    },

    integrations: [
        icon(),
        sitemap(),
        ...(development || editor ? [react(), keystatic()] : []),
    ],
});
