import { C as createAstro, c as renderSlot, d as renderTemplate, f as maybeRenderHead, m as addAttribute } from "./server_DF2ydcAu.mjs";
import { t as createComponent } from "./compiler_BflaUDkP.mjs";
import { o as renderScript } from "./Section_BElPAU88.mjs";
//#region src/components/Iframe.astro
createAstro("https://teamvan.org");
var $$Iframe = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Iframe;
	const { src, title, class: className, containerClass, loaderClass, loading = "lazy", scrolling = "auto" } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<div${addAttribute(["relative", containerClass], "class:list")} data-iframe-container><div${addAttribute(["absolute inset-0 z-10 flex items-center justify-center transition-opacity duration-300 in-[.is-loaded]:pointer-events-none in-[.is-loaded]:opacity-0", loaderClass], "class:list")} data-iframe-loader role="status" aria-label="Loading content">${renderSlot($$result, $$slots["loader"])}</div><iframe${addAttribute(["block opacity-0 transition-opacity duration-300 in-[.is-loaded]:opacity-100", className], "class:list")}${addAttribute(src, "src")}${addAttribute(title, "title")}${addAttribute(loading, "loading")}${addAttribute(scrolling, "scrolling")} data-iframe></iframe></div>${renderScript($$result, "/Users/stanislava/Documents/teamvan.org/src/components/Iframe.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/stanislava/Documents/teamvan.org/src/components/Iframe.astro", void 0);
//#endregion
//#region src/components/Loader.astro
createAstro("https://teamvan.org");
var $$Loader = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Loader;
	const { class: className } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<span${addAttribute(["size-8 animate-spin rounded-full border-4 border-main/20 border-t-main", className], "class:list")} aria-hidden="true"></span>`;
}, "/Users/stanislava/Documents/teamvan.org/src/components/Loader.astro", void 0);
//#endregion
export { $$Iframe as n, $$Loader as t };
