import { config, fields, singleton } from "@keystatic/core";
import { createElement } from "react";
import { block, repeating, wrapper } from "@keystatic/core/content-components";

// Content-component images are imported with import.meta.glob in
// Figure.astro, so the stored path must start with /src/.
const pageImages = {
    directory: "src/images/pages",
    publicPath: "/src/images/pages/",
};

// Images inserted directly into the MDX body are resolved by Astro like an
// import, so use the project alias instead of the /src/ form.
const mdxImages = {
    directory: "src/images/pages",
    publicPath: "@/images/pages/",
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
            variant: fields.select({
                label: "Style",
                options: [
                    { label: "Info", value: "info" },
                    { label: "Warning", value: "warning" },
                ],
                defaultValue: "info",
            }),
        },
    }),
    Quip: wrapper({
        label: "Quip",
        description: "A short one-liner shown as a bordered sticker.",
        schema: {},
    }),
    BudgetTable: repeating({
        label: "Budget table",
        description:
            "Line items and a total, shown as a bordered table with the site's styling. Each line is its own item.",
        children: ["BudgetItem"],
        validation: { children: { min: 1 } },
        schema: {
            total: fields.text({
                label: "Total",
                validation: { isRequired: true },
            }),
        },
    }),
    BudgetItem: wrapper({
        label: "Budget line",
        description: "The item text, with its cost set on the line.",
        schema: {
            cost: fields.text({
                label: "Cost",
                validation: { isRequired: true },
            }),
        },
    }),
    Coverage: block({
        label: "Coverage panel",
        description: "Counties and schools served, shown as a bordered panel.",
        schema: {
            schools: fields.text({
                label: "Schools",
                description: "Separate each school with a comma.",
                defaultValue:
                    "Palm Bay, Bayside, Sebastian River, Vero Beach, Indian River Charter",
            }),
            schoolLabel: fields.text({
                label: "Schools label",
                defaultValue: "Closest FRC team to",
            }),
        },
    }),
    Comparison: repeating({
        label: "Comparison chart",
        description: "Paired bars comparing two groups, up to four rows.",
        children: ["ComparisonRow"],
        validation: { children: { min: 1, max: 4 } },
        schema: {
            title: fields.text({ label: "Title" }),
            legend: fields.text({
                label: "First group",
                defaultValue: "FIRST alumni",
            }),
            compareLegend: fields.text({
                label: "Second group",
                defaultValue: "Comparison group",
            }),
        },
    }),
    ComparisonRow: block({
        label: "Comparison row",
        description: "One measure, with a value for each group.",
        schema: {
            label: fields.text({
                label: "Measure",
                validation: { isRequired: true },
            }),
            value: fields.text({
                label: "First group value",
                description: "A number out of 100.",
                validation: { isRequired: true },
            }),
            compare: fields.text({
                label: "Second group value",
                description: "A number out of 100.",
                validation: { isRequired: true },
            }),
            unit: fields.text({
                label: "Unit",
                defaultValue: "%",
            }),
        },
    }),
    Skills: block({
        label: "Skills panel",
        description:
            "The non-build roles the team needs: business, media, and speaking.",
        schema: {
            title: fields.text({
                label: "Title",
                defaultValue: "What the team needs",
            }),
        },
    }),
    Nameplate: block({
        label: "Stats band",
        description:
            "A label and four team stats, such as students interested and schools served.",
        schema: {
            label: fields.text({
                label: "Label",
                defaultValue: "About Team V.A.N.",
            }),
            interested: fields.text({
                label: "Students interested",
                defaultValue: "20+",
            }),
            schools: fields.text({
                label: "Partner schools",
                defaultValue: "5",
            }),
            counties: fields.text({
                label: "Counties served",
                defaultValue: "2",
            }),
            founded: fields.text({
                label: "Founded",
                defaultValue: "2026",
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
    ButtonGroup: repeating({
        label: "Button row",
        description:
            "Holds two or more buttons so they sit next to each other.",
        children: ["Button"],
        validation: { children: { min: 1 } },
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
                    { label: "Accent", value: "accent" },
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
    Fact: wrapper({
        label: "Fact",
        description: "A large value with a caption written inside it.",
        schema: {
            value: fields.text({
                label: "Value",
                description: "The large text, such as 3,700+.",
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
    Phase: wrapper({
        label: "Timeline phase",
        description:
            "One point on the season timeline, with its detail written inside it.",
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
        },
    }),
    Figure: wrapper({
        label: "Figure",
        description:
            "An image with an optional caption, written as the text inside it.",
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
            credit: fields.text({
                label: "Photo credit",
                description:
                    "Required for most Creative Commons photos. Shown under the caption.",
            }),
            creditHref: fields.url({
                label: "Photo credit link",
                description: "The source page for the photo.",
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
    Embed: wrapper({
        label: "Embed",
        description:
            "Embeds another page inside this one, such as a calendar or a form. The text inside names the frame for screen readers.",
        schema: {
            src: fields.url({
                label: "Embed URL",
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
    { key: "fll", label: "Start an FLL Team" },
    { key: "ftc", label: "Start an FTC Team" },
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
                    options: { image: mdxImages },
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
