# Team V.A.N. website

Astro website for teamvan.org. Public pages are prerendered at build time, and the Keystatic editor runs in the same Cloudflare Worker under `/keystatic/`.

## Editing text locally

Use Node.js 22.12 or newer and pnpm. Install with `pnpm install`, then run:

```sh
pnpm exec astro dev --background
```

Open the address printed by that command followed by `/keystatic/`. Choose a page, edit its fields, and click Save. Refresh the corresponding website page to see the result. Local saves change files on this computer; commit and push them to publish.

Manage the server with `pnpm exec astro dev status`, `pnpm exec astro dev logs`, and `pnpm exec astro dev stop`.

The editor covers text on all seven pages and the footer: headings, paragraphs, buttons, event details, timeline entries, captions, and image descriptions. Text that has inline links or bold formatting is split into adjacent fields to preserve that formatting. Layouts, link destinations, images, navigation configuration, and embedded forms/calendar remain in code. The kickoff announcement currently appears in both Home and Calendar; update both entries when changing it.

Content is in `src/content/site/*.json`. Field definitions and labels are in `src/content-schema/pages.json`; `keystatic.config.ts` creates the editor from those definitions. Field keys must remain stable because page templates reference them. Content is rendered as escaped text, not executable HTML.

`astro dev` runs on Astro's Node server without an adapter so Keystatic can write files. Builds use `@astrojs/cloudflare`, so the editor's API routes run in the Worker.

## Deploying to Cloudflare

`pnpm build` writes the site and the Worker entry point to `dist/`. `pnpm preview` serves that build with the Cloudflare runtime, `pnpm exec wrangler deploy` uploads it, and `pnpm deploy` runs both commands.

The deployed editor uses GitHub storage. The build reads `PUBLIC_KEYSTATIC_GITHUB_APP_SLUG` — the GitHub App slug, which is the last segment of the app's settings URL (`https://github.com/settings/apps/<slug>`) — and the Worker reads these secrets at runtime:

- `KEYSTATIC_GITHUB_CLIENT_ID`
- `KEYSTATIC_GITHUB_CLIENT_SECRET`
- `KEYSTATIC_SECRET` (at least 32 characters)

Set the secrets with `pnpm exec wrangler secret put NAME` or in the Cloudflare dashboard. Keep local values in `.env`. To use the editor in `pnpm preview`, add the three secrets to `.dev.vars` before building; Cloudflare copies them into the preview output. A production build without `PUBLIC_KEYSTATIC_GITHUB_APP_SLUG` fails on purpose so local file editing is never published.

`.github/workflows/deploy-cloudflare.yml` deploys on pushes to `main`. It expects `PUBLIC_KEYSTATIC_GITHUB_APP_SLUG` as a repository variable and `CLOUDFLARE_API_TOKEN` plus `CLOUDFLARE_ACCOUNT_ID` as repository secrets.

Add `teamvan.org` as a custom domain for the Worker in the Cloudflare dashboard. Once the zone is in the same account, the commented `[[routes]]` block in `wrangler.toml` can bind the domain during deploys instead.

## GitHub app

1. Create a Keystatic GitHub App for `frcvan/teamvan.org` using the [GitHub mode guide](https://keystatic.com/docs/github-mode). Grant Contents read/write, Metadata read-only, and Pull requests read-only. Set the callback URL to `https://teamvan.org/api/keystatic/github/oauth/callback`.
2. Copy the app's values into the Worker secrets and the build variable described above.
3. Give teammates GitHub accounts with write access to this repository. They visit `/keystatic/` on the deployed site and sign in with GitHub. Saves go to GitHub, and edits on `main` deploy through the workflow. Changes on another branch need to be merged into `main` first.

## Checks

```sh
pnpm check:content
pnpm exec astro check
PUBLIC_KEYSTATIC_GITHUB_APP_SLUG=your-app-slug pnpm build
```

Official integration documentation: https://keystatic.com/docs/installation-astro
