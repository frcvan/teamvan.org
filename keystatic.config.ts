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

const contentComponents = {
    Alert: wrapper({
        label: "Alert",
        schema: {
            title: fields.text({ label: "Title" }),
        },
    }),
    Collapse: wrapper({
        label: "Collapsing item",
        schema: {
            title: fields.text({ label: "Title" }),
        },
    }),
    ButtonGroup: wrapper({
        label: "Button row",
        schema: {},
    }),
    Button: wrapper({
        label: "Button",
        schema: {
            href: fields.text({ label: "Link" }),
            variant: fields.select({
                label: "Style",
                options: [
                    { label: "Primary", value: "primary" },
                    { label: "Secondary", value: "secondary" },
                ],
                defaultValue: "primary",
            }),
            icon: fields.text({
                label: "Icon",
                description: "Optional Tabler icon name, such as tabler:mail.",
            }),
            newTab: fields.checkbox({
                label: "Open in a new tab",
                defaultValue: false,
            }),
        },
    }),
    StatGrid: repeating({
        label: "Facts grid",
        children: ["Fact"],
        schema: {},
    }),
    Fact: block({
        label: "Fact",
        schema: {
            value: fields.text({ label: "Value" }),
            label: fields.text({ label: "Label" }),
        },
    }),
    Timeline: repeating({
        label: "Season timeline",
        children: ["Phase"],
        schema: {},
    }),
    Phase: block({
        label: "Timeline phase",
        schema: {
            period: fields.text({ label: "Period" }),
            title: fields.text({ label: "Title" }),
            description: fields.text({ label: "Description", multiline: true }),
        },
    }),
    Figure: block({
        label: "Figure",
        schema: {
            src: fields.image({ label: "Image", ...pageImages }),
            alt: fields.text({ label: "Alt text" }),
            caption: fields.text({ label: "Caption", multiline: true }),
            variant: fields.select({
                label: "Crop",
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
        schema: {
            src: fields.url({ label: "Embed URL" }),
            title: fields.text({ label: "Title" }),
            variant: fields.select({
                label: "Height",
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
