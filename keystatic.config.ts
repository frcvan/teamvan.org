import { config, fields, singleton } from "@keystatic/core";
import pages from "./src/content-schema/pages.json";

// Local development edits files; the deployed Worker authenticates with GitHub.
// Do not throw from this module: Keystatic bundles it into the browser too.
// The build-time check for PUBLIC_KEYSTATIC_GITHUB_APP_SLUG lives in
// astro.config.mjs, which only runs in Node.
export default config({
    storage: import.meta.env.PROD
        ? { kind: "github", repo: "frcvan/teamvan.org" }
        : { kind: "local" },
    ui: { brand: { name: "Team V.A.N. Website" } },
    singletons: Object.fromEntries(
        Object.entries(pages).map(([key, page]) => [
            key,
            singleton({
                label: page.label,
                path: `src/content/site/${key}`,
                format: { data: "json" },
                schema: Object.fromEntries(
                    page.fields.map((field) => [
                        field.key,
                        fields.text({
                            label: field.label,
                            multiline: field.multiline,
                            validation: { isRequired: true },
                        }),
                    ]),
                ),
            }),
        ]),
    ),
});
