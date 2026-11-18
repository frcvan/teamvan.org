import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";

const pages = [
    "index",
    "about",
    "calendar",
    "competitions",
    "fll",
    "ftc",
    "interest",
    "outreach",
    "sponsors",
];

const registeredComponents = new Set([
    "Alert",
    "Button",
    "BudgetItem",
    "BudgetTable",
    "ButtonGroup",
    "Collapse",
    "Comparison",
    "ComparisonRow",
    "Coverage",
    "Embed",
    "Fact",
    "Figure",
    "Nameplate",
    "Phase",
    "Quip",
    "Skills",
    "StatGrid",
    "Timeline",
    "Updates",
]);

// Asserts the shape Keystatic's MDX editor can round-trip: frontmatter with a
// body, no imports, no raw HTML where Markdown works, and only registered
// content components.
const parse = (source, name) => {
    const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]+)$/);
    assert.ok(match, `${name}: missing frontmatter or body`);
    const [, frontmatter, body] = match;
    assert.ok(
        !/^\s*import\s/m.test(body),
        `${name}: Keystatic's MDX editor does not support imports`,
    );
    assert.ok(
        !/<(p|div|span|a|ul|ol|li|img|br|strong|em)\b/.test(body),
        `${name}: use Markdown instead of raw HTML tags`,
    );
    for (const [, tag] of body.matchAll(/<([A-Z][A-Za-z0-9]*)\b/g)) {
        assert.ok(
            registeredComponents.has(tag),
            `${name}: ${tag} is not registered in keystatic.config.ts`,
        );
    }
    return frontmatter;
};

for (const page of pages) {
    const frontmatter = parse(
        await readFile(`src/content/pages/${page}.mdx`, "utf8"),
        page,
    );
    assert.match(frontmatter, /^title:\s*\S/m, `${page}: missing title`);
    assert.match(
        frontmatter,
        /^description:\s*\S/m,
        `${page}: missing description`,
    );
}

const updateFiles = (await readdir("src/content/updates"))
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"))
    .sort();

for (const file of updateFiles) {
    const frontmatter = parse(
        await readFile(`src/content/updates/${file}`, "utf8"),
        file,
    );
    assert.match(frontmatter, /^title:\s*\S/m, `${file}: missing title`);
    assert.match(frontmatter, /^date:\s*\S/m, `${file}: missing date`);
    assert.match(frontmatter, /^summary:\s*\S/m, `${file}: missing summary`);
}

console.log(
    `Checked ${pages.length} MDX pages and ${updateFiles.length} updates.`,
);
