# Team V.A.N. website

Astro website for teamvan.org. Public pages are prerendered at build time, and the Keystatic editor runs in the same Cloudflare Worker under `/keystatic/`.

## Editing pages locally

Use Node.js 22.12 or newer and pnpm. Install with `pnpm install`, then run:

```sh
pnpm exec astro dev --background
```

Open the address printed by that command followed by `/keystatic/`. Choose a page, edit its fields, and click Save. Refresh the corresponding website page to see the result. Local saves change files on this computer; commit and push them to publish.

Manage the server with `pnpm exec astro dev status`, `pnpm exec astro dev logs`, and `pnpm exec astro dev stop`.

The editor edits the seven main pages as MDX. Each page has a title, description, and an MDX body stored in `src/content/pages/*.mdx`. The body supports Markdown plus these custom components: Alert, Collapsing item, Button, Button row, Facts grid, Season timeline, Figure, and Embed. Keystatic's MDX editor does not support import statements or raw HTML tags, so use Markdown and those components instead of inline HTML.

Page layouts, navigation, the footer, and the component map in `src/components/mdx.ts` stay in code. Each `src/pages/*.astro` wrapper imports its matching MDX file and renders it through the shared page layout. The kickoff announcement currently appears in both Home and Calendar; update both pages when changing it.

Footer copy lives in `src/components/Footer.astro` and is not editable in Keystatic. Page and component definitions live in `keystatic.config.ts`. Images added through the editor are written to `public/images/pages/`.

`astro dev` runs on Astro's Node server without an adapter so Keystatic can write files. Builds use `@astrojs/cloudflare`, so the editor's API routes run in the Worker.

## Deploying to Cloudflare

`pnpm build` writes the site and the Worker entry point to `dist/`. `pnpm preview` serves that build with the Cloudflare runtime, `pnpm exec wrangler deploy` uploads it, and `pnpm deploy` runs both commands.

The deployed editor uses GitHub storage. The build reads `PUBLIC_KEYSTATIC_GITHUB_APP_SLUG` — the GitHub App slug, which is the last segment of the app's settings URL (`https://github.com/settings/apps/<slug>`) — and the Worker reads these secrets at runtime:

- `KEYSTATIC_GITHUB_CLIENT_ID`
- `KEYSTATIC_GITHUB_CLIENT_SECRET`
- `KEYSTATIC_SECRET` (at least 32 characters)

Set the secrets with `pnpm exec wrangler secret put NAME` or in the Cloudflare dashboard. Keep local values in `.env`. To use the editor in `pnpm preview`, add the three secrets to `.dev.vars` before building; Cloudflare copies them into the preview output. A production build without `PUBLIC_KEYSTATIC_GITHUB_APP_SLUG` fails on purpose so local file editing is never published.

Deploys run through Cloudflare Workers Builds on pushes to `main`. The dashboard settings are:

- Install command: `pnpm install --frozen-lockfile --prod`
- Build command: `pnpm run build`
- Deploy command: `pnpm exec wrangler deploy`
- Build variable: `PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`

`--prod` keeps `devDependencies` — local-only tools such as `typescript`, `prettier`, `@astrojs/check`, and `@types/react` — out of the build image. Anything the build or the deploy needs belongs in `dependencies`, which is why `wrangler` lives there. `pnpm exec` skips the extra npm startup that `npx` adds, and dependency install plus the deploy call are the two largest fixed costs of a Workers build.

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
