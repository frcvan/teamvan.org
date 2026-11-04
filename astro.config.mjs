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
const building = process.argv.includes("build");

// This config runs in Node, unlike keystatic.config.ts, which is also bundled
// into the browser. Failing here keeps a slug-less build from deploying an
// editor that cannot link to its GitHub App.
if (building && !process.env.PUBLIC_KEYSTATIC_GITHUB_APP_SLUG) {
    throw new Error(
        "Set PUBLIC_KEYSTATIC_GITHUB_APP_SLUG to the GitHub App slug (the last segment of https://github.com/settings/apps/<slug>) before building.",
    );
}

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
    trailingSlash: development ? "ignore" : "always",

    prefetch: {
        prefetchAll: true,
    },

    integrations: [icon(), sitemap(), react(), keystatic(), mdx()],
});
