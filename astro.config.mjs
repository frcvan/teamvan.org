// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import keystatic from "@keystatic/astro";
import mdx from "@astrojs/mdx";
import cloudflare from "@astrojs/cloudflare";

import tailwindcss from "@tailwindcss/vite";

import icon from "astro-icon";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
// Keystatic's local storage writes files with node:fs, which the adapter's
// workerd dev runtime does not provide. Development therefore runs on Astro's
// Node server without an adapter; builds target Cloudflare so the editor API
// routes run inside the Worker.
const development = process.argv.includes("dev");

export default defineConfig({
    adapter: development ? undefined : cloudflare(),
    session: false,
    vite: {
        plugins: [tailwindcss()],
        environments: {
            client: {
                build: {
                    rolldownOptions: {
                        output: {
                            strictExecutionOrder: true,
                            codeSplitting: {
                                groups: [
                                    {
                                        name: "vendor",
                                        test: /node_modules[\\/]/,
                                        maxSize: 400_000,
                                    },
                                ],
                            },
                        },
                    },
                },
            },
        },
    },

    site: "https://teamvan.org",
    trailingSlash: "ignore",

    prefetch: {
        prefetchAll: true,
    },

    integrations: [
        // Load only the Tabler icons the site uses. Without an allowlist,
        // astro-icon treats every installed collection as "*" and parses all
        // 6,268 icons into the build on every run.
        icon({
            include: {
                tabler: [
                    "brand-github",
                    "brand-instagram",
                    "brand-youtube",
                    "download",
                    "info-circle",
                    "mail",
                    "menu",
                    "plus",
                ],
            },
        }),
        sitemap(),
        react(),
        keystatic(),
        mdx(),
    ],
});
