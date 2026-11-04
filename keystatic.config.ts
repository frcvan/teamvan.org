import { config, fields, singleton } from "@keystatic/core";
import pages from "./src/content-schema/pages.json";

// Local development edits files; the hosted editor authenticates with GitHub.
const github = import.meta.env.PUBLIC_KEYSTATIC_GITHUB_APP_SLUG;
if (import.meta.env.PROD && !github) {
    throw new Error(
        "Set PUBLIC_KEYSTATIC_GITHUB_APP_SLUG before building the hosted editor. Local file editing must not be published.",
    );
}

export default config({
    storage: github
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
