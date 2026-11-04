import { r as __exportAll } from "./rolldown-runtime_BMI-E3GI.mjs";
//#region src/pages/robots.txt.ts
var robots_txt_exports = /* @__PURE__ */ __exportAll({ GET: () => GET });
var getRobotsTxt = (sitemapURL) => `\
User-agent: *
Allow: /

Sitemap: ${sitemapURL.href}
`;
var GET = ({ site }) => {
	const baseURL = site ?? new URL("https://teamvan.org");
	const sitemapURL = new URL("sitemap-index.xml", baseURL);
	return new Response(getRobotsTxt(sitemapURL), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
//#endregion
//#region \0virtual:astro:page:src/pages/robots.txt@_@ts
var page = () => robots_txt_exports;
//#endregion
export { page };
