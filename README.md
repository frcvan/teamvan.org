# Team V.A.N. website

Astro website for teamvan.org. The public site is built as static files and deployed to GitHub Pages when `main` changes.

## Editing text locally

Use Node.js 22.12 or newer and pnpm. Install with `pnpm install`, then run:

```sh
pnpm exec astro dev --background
```

Open the address printed by that command followed by `/keystatic/`. Choose a page, edit its fields, and click Save. Refresh the corresponding website page to see the result. Local saves change files on this computer; commit and push them to publish.

Manage the server with `pnpm exec astro dev status`, `pnpm exec astro dev logs`, and `pnpm exec astro dev stop`.

The editor covers text on all seven pages and the footer: headings, paragraphs, buttons, event details, timeline entries, captions, and image descriptions. Text that has inline links or bold formatting is split into adjacent fields to preserve that formatting. Layouts, link destinations, images, navigation configuration, and embedded forms/calendar remain in code. The kickoff announcement currently appears in both Home and Calendar; update both entries when changing it.

Content is in `src/content/site/*.json`. Field definitions and labels are in `src/content-schema/pages.json`; `keystatic.config.ts` creates the editor from those definitions. Field keys must remain stable because page templates reference them. Content is rendered as escaped text, not executable HTML.

## Shared online editor

GitHub Pages cannot run the server endpoints required for Keystatic authentication. Deploy a separate Node.js editor service from this repository (for example, at an editor subdomain). The public website can remain on GitHub Pages.

1. Set up a Keystatic GitHub App for `frcvan/teamvan.org` using the [GitHub mode guide](https://keystatic.com/docs/github-mode). Use a local `.env` with `PUBLIC_KEYSTATIC_GITHUB_APP_SLUG` set to your intended app slug to enable the GitHub setup flow at `/keystatic/`. Complete GitHub's app installation for this repository.
2. Copy the generated `KEYSTATIC_GITHUB_CLIENT_ID`, `KEYSTATIC_GITHUB_CLIENT_SECRET`, `KEYSTATIC_SECRET`, and `PUBLIC_KEYSTATIC_GITHUB_APP_SLUG` into the editor host's environment settings. `.env.example` lists the names. Keep secrets out of Git and out of public environment variables. Use the same values for building and running the service.
3. Configure the GitHub App's callback URL for the editor's final HTTPS address: `https://YOUR-EDITOR-HOST/api/keystatic/github/oauth/callback`.
4. Install with `pnpm install --frozen-lockfile`, build with `pnpm build:editor`, and start with `HOST=0.0.0.0 PORT=3000 pnpm start:editor` (use the port supplied by your hosting service). The editor outputs to `dist-editor/`; public builds still output to `dist/`.
5. Give teammates GitHub accounts with write access to this repository. They visit the editor's `/keystatic/` URL and sign in with GitHub. Edits saved on `main` trigger the existing GitHub Pages deployment. Changes on another branch need to be merged into `main` first.

The hosted editor build requires a GitHub App slug and refuses to publish local file editing mode. No shared editor has been deployed or GitHub App authorized just by installing these files.

## Checks

```sh
pnpm check:content
pnpm exec astro check
pnpm build
pnpm build:editor # requires configured PUBLIC_KEYSTATIC_GITHUB_APP_SLUG
```

Official integration documentation: https://keystatic.com/docs/installation-astro

## Render editor deployment

`render.yaml` defines a separate free Node.js web service for the editor. After these changes are pushed, sign in at https://dashboard.render.com/ and choose **New → Blueprint**, select `frcvan/teamvan.org`, and supply the four Keystatic environment variables when prompted. Review the service before deploying. Set the GitHub App callback URL to the resulting editor hostname as described above.

The free editor sleeps after 15 minutes without traffic and can take about a minute to wake up. This does not affect the public website. Content is saved to GitHub, so it does not depend on Render's temporary filesystem. Render's free services have usage limits; see https://render.com/docs/free. No Render service is created by adding this configuration file.
