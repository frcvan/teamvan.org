## Development

Remember to check the existance of nvm when looking for the correct Node.js version.

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Commits

No commit should carry AI attribution. Leave out "Generated with" lines, `Co-Authored-By` trailers, and any mention of the assistant.

## Content

Keystatic is the main way this site gets edited, so check `keystatic.config.ts` whenever you change something under `src/content/pages/`. A component or prop that is missing from the config makes the editor show an error instead of the page.

Two shapes break the editor even though Astro renders them fine:

- Props the schema does not declare, such as `class="mb-5"` on `<Collapse>`. Put the styling in the Astro component instead.
- A component whose text sits on the same line as its tags, such as `<Quip>Text</Quip>`. Write the text on its own line between the tags.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

Make sure to Avoid AI Writing - read .omp/skills/avoid-ai-writing/SKILL.md
