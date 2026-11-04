import { r as __exportAll } from "./rolldown-runtime_BMI-E3GI.mjs";
import { d as renderTemplate, f as maybeRenderHead, i as renderComponent } from "./server_DF2ydcAu.mjs";
import { t as createComponent } from "./compiler_BflaUDkP.mjs";
import { a as $$H, i as $$Icon, n as $$PageLayout, r as $$Button, t as $$Section } from "./Section_BElPAU88.mjs";
import { t as $$Alert } from "./Alert_pe2Y5_Wv.mjs";
import { n as $$Iframe, t as $$Loader } from "./Loader_B4eSMkbk.mjs";
var calendar_default = {
	text001: "Team Calendar",
	text002: "See upcoming Team V.A.N. meetings, events, and activities in the Palm Bay and Space Coast area.",
	text003: "Team Calendar",
	text004: "Student Kickoff",
	text005: "Date: November 15th",
	text006: "Time: 6:00 PM to 8:00 PM",
	text007: "Location:",
	text008: "Mind Forge Guild",
	text009: "Team V.A.N. Calendar",
	text010: "Add to my Calendar"
};
//#endregion
//#region src/pages/calendar.astro
var calendar_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Calendar,
	file: () => $$file,
	url: () => $$url
});
var $$Calendar = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "Layout", $$PageLayout, {
		"title": calendar_default.text001,
		"description": calendar_default.text002
	}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "H", $$H, { "level": "h1" }, { "default": ($$result) => renderTemplate`${calendar_default.text003}` })}${renderComponent($$result, "Alert", $$Alert, {
		"title": calendar_default.text004,
		"class": "mt-6"
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<p>${calendar_default.text005}</p><p>${calendar_default.text006}</p><p>${calendar_default.text007}${" "}<a href="https://maps.app.goo.gl/EZpkUnE5RZaprrsCA" class="text-blue-300 underline underline-offset-4" target="_blank" rel="noopener noreferrer" aria-label="Open map to Mind Forge at 2475 Palm Bay Road, Suite 210, in a new tab">${calendar_default.text008}</a></p>` })}${renderComponent($$result, "Section", $$Section, {}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "Iframe", $$Iframe, {
		"containerClass": "w-full overflow-hidden rounded-base border border-black/15 bg-white shadow-sm",
		"class": "h-150 w-full border-0 max-[600px]:h-[70vh]",
		"src": "https://calendar.google.com/calendar/embed?wkst=2&ctz=America%2FNew_York&showPrint=0&title=FRC%2012148%20Calendar&src=ZnJjMTIxNDhAZ21haWwuY29t&color=%23652633",
		"title": calendar_default.text009,
		"loading": "eager",
		"scrolling": "no"
	}, { "loader": ($$result) => renderTemplate`${renderComponent($$result, "Loader", $$Loader, { "slot": "loader" })}` })}<div class="flex flex-wrap gap-4 mt-4">${renderComponent($$result, "Button", $$Button, {
		"href": "https://calendar.google.com/calendar/u/0?cid=ZnJjMTIxNDhAZ21haWwuY29t",
		"variant": "secondary"
	}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "Icon", $$Icon, {
		"name": "tabler:plus",
		"size": 32
	})}${calendar_default.text010}` })}</div>` })}` })}`;
}, "/Users/stanislava/Documents/teamvan.org/src/pages/calendar.astro", void 0);
var $$file = "/Users/stanislava/Documents/teamvan.org/src/pages/calendar.astro";
var $$url = "/calendar";
//#endregion
//#region \0virtual:astro:page:src/pages/calendar@_@astro
var page = () => calendar_exports;
//#endregion
export { page };
