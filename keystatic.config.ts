import { config, fields, singleton } from "@keystatic/core";
import { createElement } from "react";
import { block, repeating, wrapper } from "@keystatic/core/content-components";

// Local development edits files; the deployed Worker authenticates with GitHub.
// Do not throw from this module: Keystatic bundles it into the browser too.
// The build-time check for PUBLIC_KEYSTATIC_GITHUB_APP_SLUG lives in
// astro.config.mjs, which only runs in Node.

const pageImages = {
    directory: "public/images/pages",
    publicPath: "/images/pages/",
};

// Keep this list equal to the `include` allowlist in astro.config.mjs. An icon
// outside that list is silently dropped at build time, so the editor only
// offers the icons the site can actually render.
const iconOptions = [
    { label: "No icon", value: "" },
    { label: "Download", value: "tabler:download" },
    { label: "Email", value: "tabler:mail" },
    { label: "Plus", value: "tabler:plus" },
    { label: "Info", value: "tabler:info-circle" },
    { label: "Menu", value: "tabler:menu" },
    { label: "GitHub", value: "tabler:brand-github" },
    { label: "Instagram", value: "tabler:brand-instagram" },
    { label: "YouTube", value: "tabler:brand-youtube" },
] as const;

const contentComponents = {
    Alert: wrapper({
        label: "Alert",
        description: "A highlighted notice for a date, time, or announcement.",
        schema: {
            title: fields.text({
                label: "Title",
                validation: { isRequired: true },
            }),
        },
    }),
    Collapse: wrapper({
        label: "Collapsible section",
        description: "A section readers open to see the details inside.",
        schema: {
            title: fields.text({
                label: "Title",
                validation: { isRequired: true },
            }),
        },
    }),
    ButtonGroup: wrapper({
        label: "Button row",
        description:
            "Holds two or more buttons so they sit next to each other.",
        schema: {},
    }),
    Button: wrapper({
        label: "Button",
        description: "A link that is styled as a button.",
        schema: {
            href: fields.text({
                label: "Link",
                description:
                    "A page path such as /sponsors, a mailto: address, or a full https:// URL.",
                validation: { isRequired: true },
            }),
            variant: fields.select({
                label: "Style",
                options: [
                    { label: "Primary", value: "primary" },
                    { label: "Secondary", value: "secondary" },
                ],
                defaultValue: "primary",
            }),
            icon: fields.select({
                label: "Icon",
                description: "Shown before the button text.",
                options: iconOptions,
                defaultValue: "",
            }),
            newTab: fields.checkbox({
                label: "Open in a new tab",
                description:
                    "Links to other websites open in a new tab on their own.",
                defaultValue: false,
            }),
        },
    }),
    StatGrid: repeating({
        label: "Facts grid",
        description: "A row of facts, up to four at a time.",
        children: ["Fact"],
        validation: { children: { min: 1, max: 4 } },
        schema: {},
    }),
    Fact: block({
        label: "Fact",
        description: "A large number or short fact with a caption.",
        schema: {
            value: fields.text({
                label: "Value",
                description: "The large text, such as 3,700+.",
                validation: { isRequired: true },
            }),
            label: fields.text({
                label: "Label",
                description: "The small caption under the value.",
                validation: { isRequired: true },
            }),
        },
    }),
    Timeline: repeating({
        label: "Season timeline",
        description: "Season phases drawn as a vertical timeline.",
        children: ["Phase"],
        validation: { children: { min: 1 } },
        schema: {},
    }),
    Phase: block({
        label: "Timeline phase",
        description: "One point on the season timeline.",
        schema: {
            period: fields.text({
                label: "Period",
                description: "Shown above the title, such as November 15.",
                validation: { isRequired: true },
            }),
            title: fields.text({
                label: "Title",
                validation: { isRequired: true },
            }),
            description: fields.text({
                label: "Description",
                multiline: true,
                validation: { isRequired: true },
            }),
        },
    }),
    Figure: block({
        label: "Figure",
        description: "An image with an optional caption.",
        schema: {
            src: fields.image({
                label: "Image",
                ...pageImages,
                validation: { isRequired: true },
            }),
            alt: fields.text({
                label: "Alt text",
                description:
                    "Describes the image for screen readers and when it does not load.",
                validation: { isRequired: true },
            }),
            caption: fields.text({
                label: "Caption",
                description: "Optional. Shown under the image.",
                multiline: true,
            }),
            variant: fields.select({
                label: "Crop",
                description: "Wide crops the image to a 25:12 banner.",
                options: [
                    { label: "Natural", value: "natural" },
                    { label: "Wide", value: "wide" },
                ],
                defaultValue: "natural",
            }),
        },
    }),
    Embed: block({
        label: "Embed",
        description:
            "Embeds another page inside this one, such as a calendar or a form.",
        schema: {
            src: fields.url({
                label: "Embed URL",
                validation: { isRequired: true },
            }),
            title: fields.text({
                label: "Title",
                description: "Names the embedded frame for screen readers.",
                validation: { isRequired: true },
            }),
            variant: fields.select({
                label: "Height",
                description:
                    "Calendar gives the frame a fixed height. Form lets it size itself.",
                options: [
                    { label: "Calendar", value: "calendar" },
                    { label: "Form", value: "form" },
                ],
                defaultValue: "calendar",
            }),
        },
    }),
};

const pageDefinitions = [
    { key: "index", label: "Home" },
    { key: "about", label: "What Is FIRST" },
    { key: "calendar", label: "Calendar" },
    { key: "competitions", label: "Competitions" },
    { key: "outreach", label: "Outreach" },
    { key: "sponsors", label: "Sponsors" },
    { key: "interest", label: "Join" },
] as const;

const pageSingletons = Object.fromEntries(
    pageDefinitions.map(({ key, label }) => [
        key,
        singleton({
            label,
            path: `src/content/pages/${key}`,
            format: { contentField: "content" },
            schema: {
                title: fields.text({
                    label: "Page title",
                    validation: { isRequired: true },
                }),
                description: fields.text({
                    label: "Page description",
                    multiline: true,
                    validation: { isRequired: true },
                }),
                content: fields.mdx({
                    label: "Page content",
                    components: contentComponents,
                    options: { image: pageImages },
                }),
            },
        }),
    ]),
);

const production =
    typeof import.meta.env !== "undefined" && import.meta.env.PROD;

const brandMark = ({ colorScheme }: { colorScheme: "light" | "dark" }) =>
    createElement("img", {
        src: "/favicon.svg",
        alt: "",
        height: 24,
        style: {
            display: "block",
            width: "auto",
            height: "24px",
            filter:
                colorScheme === "dark" ? "brightness(0) invert(1)" : undefined,
        },
    });

export default config({
    storage: production
        ? { kind: "github", repo: "frcvan/teamvan.org" }
        : { kind: "local" },
    ui: {
        brand: {
            name: "Team V.A.N.",
            mark: brandMark,
        },
    },
    singletons: pageSingletons,
});
