/** @type {import("prettier").Config} */
export default {
    tabWidth: 4,
    useTabs: false,
    plugins: ["prettier-plugin-astro"],
    overrides: [
        {
            files: "*.astro",
            options: {
                parser: "astro",
            },
        },
    ],
};
