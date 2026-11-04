import { r as __exportAll } from "./rolldown-runtime_BMI-E3GI.mjs";
import { d as renderTemplate, f as maybeRenderHead, i as renderComponent } from "./server_DF2ydcAu.mjs";
import { t as createComponent } from "./compiler_BflaUDkP.mjs";
import { a as $$H, n as $$PageLayout, t as $$Section } from "./Section_BElPAU88.mjs";
import { n as $$Iframe, t as $$Loader } from "./Loader_B4eSMkbk.mjs";
var interest_default = {
	text001: "Join Team V.A.N.",
	text002: "Join Team V.A.N. in Palm Bay, Florida. No prior experience is required for students interested in robotics, engineering, programming, business, or marketing.",
	text003: "Want to Join?",
	text004: "Student Interest Form",
	text005: "Fill out the form below to let us know you're interested! We will reach out with details on our meeting schedule, build space location in Palm Bay, and how to get started. No prior experience is required.",
	text006: "Team V.A.N. Interest Form",
	text007: "Have questions before joining? Email us at",
	text008: "contact@teamvan.org"
};
//#endregion
//#region src/pages/interest.astro
var interest_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Interest,
	file: () => $$file,
	url: () => $$url
});
var $$Interest = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "Layout", $$PageLayout, {
		"title": interest_default.text001,
		"description": interest_default.text002
	}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "H", $$H, {}, { "default": ($$result) => renderTemplate`${interest_default.text003}` })}${renderComponent($$result, "Section", $$Section, { "aria-labelledby": "form-heading" }, { "default": ($$result) => renderTemplate`${renderComponent($$result, "H", $$H, {
		"id": "form-heading",
		"level": "h2"
	}, { "default": ($$result) => renderTemplate`${interest_default.text004}` })}${maybeRenderHead($$result)}<p class="mb-4">${interest_default.text005}</p>${renderComponent($$result, "Iframe", $$Iframe, {
		"containerClass": "w-full h-[800px] overflow-hidden rounded-base border-none shadow-none",
		"class": "w-full h-full border-none outline-none shadow-none",
		"src": "https://tally.so/embed/KYbz6k?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1",
		"title": interest_default.text006,
		"loaderClass": "bg-transparent items-start mt-12",
		"loading": "eager",
		"scrolling": "no"
	}, { "loader": ($$result) => renderTemplate`${renderComponent($$result, "Loader", $$Loader, {
		"slot": "loader",
		"class": "border-white/30 border-t-white"
	})}` })}<p class="mt-6">${interest_default.text007}${" "}<a href="mailto:contact@teamvan.org" class="text-blue-300 underline underline-offset-4">${interest_default.text008}</a>.</p>` })}` })}`;
}, "/Users/stanislava/Documents/teamvan.org/src/pages/interest.astro", void 0);
var $$file = "/Users/stanislava/Documents/teamvan.org/src/pages/interest.astro";
var $$url = "/interest";
//#endregion
//#region \0virtual:astro:page:src/pages/interest@_@astro
var page = () => interest_exports;
//#endregion
export { page };
