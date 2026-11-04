import { r as __exportAll } from "./rolldown-runtime_BMI-E3GI.mjs";
import { d as renderTemplate, f as maybeRenderHead, i as renderComponent } from "./server_DF2ydcAu.mjs";
import { t as createComponent } from "./compiler_BflaUDkP.mjs";
import { a as $$H, n as $$PageLayout, t as $$Section } from "./Section_BElPAU88.mjs";
import { t as $$List } from "./List_hLD0P634.mjs";
var competitions_default = {
	text001: "Competitions",
	text002: "Follow Team V.A.N.'s offseason events and planned FIRST Robotics Competition regionals in Florida and Alabama.",
	text003: "Competitions",
	text004: "This Season",
	text005: "We expect 15 to 20 committed members this season. We plan to compete at the Orlando Regional and the Rocket City Regional, and at the FIRST Championship if we qualify.",
	text006: "How Qualifying for the FIRST Championship Works",
	text007: "Team V.A.N. is in a Regional-style state, which means our registration covers one regional event rather than a district season. We qualify for the FIRST Championship directly out of a regional by placing well enough in the event's rankings and playoffs, or by winning certain awards that carry an automatic bid, such as the Regional Impact Award or an Engineering Inspiration Award.",
	text008: "This season we'll be registered for two regionals, the Orlando Regional and the Rocket City Regional, so we get two chances to qualify.",
	text009: "FRC Regionals We Plan to Attend",
	text010: "Orlando Regional",
	text011: "— March 17-20, 2027",
	text012: "Addition Financial Arena:",
	text013: "12777 Gemini Blvd N, Orlando, FL",
	text014: "Rocket City Regional",
	text015: "— April 7-10, 2027",
	text016: "Von Braun Center:",
	text017: "700 Monroe St SW, Huntsville, AL",
	text018: "FIRST Championship",
	text019: "If we qualify.",
	text020: "Follow Along",
	text021: "Match schedules, rankings, and results for every FRC event are public. Live scores and standings are posted on",
	text022: "The Blue Alliance",
	text023: ", where our team page lists the events we're registered for and, once the season starts, our match results. Our",
	text024: "calendar",
	text025: "page has event dates as they're finalized."
};
//#endregion
//#region src/pages/competitions.astro
var competitions_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Competitions,
	file: () => $$file,
	url: () => $$url
});
var $$Competitions = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "Layout", $$PageLayout, {
		"title": competitions_default.text001,
		"description": competitions_default.text002
	}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "H", $$H, {}, { "default": ($$result) => renderTemplate`${competitions_default.text003}` })}${renderComponent($$result, "Section", $$Section, { "aria-labelledby": "this-season-heading" }, { "default": ($$result) => renderTemplate`${renderComponent($$result, "H", $$H, {
		"id": "this-season-heading",
		"level": "h2"
	}, { "default": ($$result) => renderTemplate`${competitions_default.text004}` })}${maybeRenderHead($$result)}<p>${competitions_default.text005}</p>` })}${renderComponent($$result, "Section", $$Section, { "aria-labelledby": "how-it-works-heading" }, { "default": ($$result) => renderTemplate`${renderComponent($$result, "H", $$H, {
		"id": "how-it-works-heading",
		"level": "h2"
	}, { "default": ($$result) => renderTemplate`${competitions_default.text006}` })}<p>${competitions_default.text007}</p><p>${competitions_default.text008}</p>` })}${renderComponent($$result, "Section", $$Section, {}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "H", $$H, { "level": "h2" }, { "default": ($$result) => renderTemplate`${competitions_default.text009}` })}${renderComponent($$result, "List", $$List, {}, { "default": ($$result) => renderTemplate`<li><div><strong>${competitions_default.text010}</strong> ${competitions_default.text011}</div><p class="pl-4">${competitions_default.text012}${" "}<a class="text-blue-300 underline underline-offset-4" href="https://maps.app.goo.gl/TCpkcVxykxKyBhj96" target="_blank" rel="noopener noreferrer">${competitions_default.text013}</a></p></li><li><div><strong>${competitions_default.text014}</strong> ${competitions_default.text015}</div><p class="pl-4">${competitions_default.text016}${" "}<a class="text-blue-300 underline underline-offset-4" href="https://maps.app.goo.gl/bXVT8S6Mk8nxYPgM6" target="_blank" rel="noopener noreferrer">${competitions_default.text017}</a></p></li><li><div><strong>${competitions_default.text018}</strong></div><p class="pl-4">${competitions_default.text019}</p></li>` })}` })}${renderComponent($$result, "Section", $$Section, { "aria-labelledby": "follow-along-heading" }, { "default": ($$result) => renderTemplate`${renderComponent($$result, "H", $$H, {
		"id": "follow-along-heading",
		"level": "h2"
	}, { "default": ($$result) => renderTemplate`${competitions_default.text020}` })}<p>${competitions_default.text021}${" "}<a class="text-blue-300 underline underline-offset-4" href="https://www.thebluealliance.com/team/12148" target="_blank" rel="noopener noreferrer">${competitions_default.text022}</a>${competitions_default.text023}${" "}<a href="/calendar/" class="text-blue-300 underline underline-offset-4">${competitions_default.text024}</a>${" "}${competitions_default.text025}</p>` })}` })}`;
}, "/Users/stanislava/Documents/teamvan.org/src/pages/competitions.astro", void 0);
var $$file = "/Users/stanislava/Documents/teamvan.org/src/pages/competitions.astro";
var $$url = "/competitions";
//#endregion
//#region \0virtual:astro:page:src/pages/competitions@_@astro
var page = () => competitions_exports;
//#endregion
export { page };
