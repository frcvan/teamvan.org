import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const pages = [
    "index",
    "about",
    "calendar",
    "competitions",
    "interest",
    "outreach",
    "sponsors",
];

const registeredComponents = new Set([
    "Alert",
    "Button",
    "ButtonGroup",
    "Collapse",
    "Embed",
    "Fact",
    "Figure",
    "Phase",
    "StatGrid",
    "Timeline",
]);

for (const page of pages) {
    const source = await readFile(`src/content/pages/${page}.mdx`, "utf8");
    const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]+)$/);
    assert.ok(match, `${page}: missing frontmatter or page body`);
    const [, frontmatter, body] = match;
    assert.match(frontmatter, /^title:\s*\S/m, `${page}: missing title`);
    assert.match(
        frontmatter,
        /^description:\s*\S/m,
        `${page}: missing description`,
    );
    assert.ok(
        !/^\s*import\s/m.test(body),
        `${page}: Keystatic's MDX editor does not support imports`,
    );
    assert.ok(
        !/<(p|div|span|a|ul|ol|li|img|br|strong|em)\b/.test(body),
        `${page}: use Markdown instead of raw HTML tags`,
    );
    for (const [, tag] of body.matchAll(/<([A-Z][A-Za-z0-9]*)\b/g)) {
        assert.ok(
            registeredComponents.has(tag),
            `${page}: ${tag} is not registered in keystatic.config.ts`,
        );
    }
}

const footer = JSON.parse(
    await readFile("src/content/site/footer.json", "utf8"),
);
const footerTemplate = await readFile("src/components/Footer.astro", "utf8");
const footerKeys = Object.keys(footer);
const footerReferences = new Set(
    [...footerTemplate.matchAll(/copy\.(text\d+)/g)].map((match) => match[1]),
);
assert.deepEqual(
    [...footerReferences].sort(),
    [...footerKeys].sort(),
    "footer: fields must be connected to the website",
);
for (const key of footerKeys) {
    assert.ok(
        typeof footer[key] === "string" && footer[key].trim(),
        `footer.${key}: missing text`,
    );
}

console.log(
    `Checked ${pages.length} MDX pages and ${footerKeys.length} footer fields.`,
);
