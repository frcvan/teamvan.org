import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const pages = JSON.parse(
    await readFile("src/content-schema/pages.json", "utf8"),
);
let count = 0;
for (const [page, schema] of Object.entries(pages)) {
    const content = JSON.parse(
        await readFile(`src/content/site/${page}.json`, "utf8"),
    );
    const template = await readFile(
        page === "footer"
            ? "src/components/Footer.astro"
            : `src/pages/${page}.astro`,
        "utf8",
    );
    const keys = schema.fields.map((field) => field.key);
    assert.equal(new Set(keys).size, keys.length, `${page}: duplicate fields`);
    assert.deepEqual(
        Object.keys(content).sort(),
        [...keys].sort(),
        `${page}: content and editor schema differ`,
    );
    const references = new Set(
        [...template.matchAll(/copy\.(text\d+)/g)].map((match) => match[1]),
    );
    assert.deepEqual(
        [...references].sort(),
        [...keys].sort(),
        `${page}: fields must be connected to the website`,
    );
    for (const key of keys)
        assert.ok(
            typeof content[key] === "string" && content[key].trim(),
            `${page}.${key}: missing text`,
        );
    count += keys.length;
}
console.log(
    `Checked ${count} editable fields across ${Object.keys(pages).length} page entries.`,
);
