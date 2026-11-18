interface UpdateFile {
    frontmatter: {
        title: string;
        // YAML parses an unquoted date into a Date, so accept both shapes.
        date: string | Date;
        summary: string;
    };
    // MDX modules export the compiled body as a component.
    Content: any;
}

// Keystatic writes each post to src/content/updates, beside the page content,
// so the home page feed and the archive read the same files the editor writes.
const files = import.meta.glob<UpdateFile>("../content/updates/*.{md,mdx}", {
    eager: true,
});

const slugFromPath = (path: string) =>
    path.replace(/^.*\//, "").replace(/\.(md|mdx)$/, "");

/** The frontmatter date as YYYY-MM-DD, whether YAML gave us a Date or text. */
const isoDate = (value: string | Date) => {
    if (value instanceof Date) return value.toISOString().slice(0, 10);
    return String(value ?? "").match(/^\d{4}-\d{2}-\d{2}/)?.[0] ?? "";
};

// Noon UTC keeps the calendar date the same in every US timezone.
const noonUtc = (date: string) =>
    new Date(`${isoDate(date)}T12:00:00Z`).getTime();

export interface Update {
    slug: string;
    title: string;
    date: string;
    summary: string;
    Content: UpdateFile["Content"];
}

export const updates: Update[] = Object.entries(files)
    .map(([path, file]) => ({
        slug: slugFromPath(path),
        title: file.frontmatter.title,
        date: isoDate(file.frontmatter.date),
        summary: file.frontmatter.summary,
        Content: file.Content,
    }))
    .sort(
        (a, b) =>
            noonUtc(b.date) - noonUtc(a.date) || a.title.localeCompare(b.title),
    );

export const formatUpdateDate = (date: string) =>
    new Date(`${isoDate(date)}T12:00:00Z`).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "UTC",
    });
