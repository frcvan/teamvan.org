import { r as __exportAll } from "./rolldown-runtime_BMI-E3GI.mjs";
import { d as renderTemplate, f as maybeRenderHead, i as renderComponent } from "./server_DF2ydcAu.mjs";
import { t as createComponent } from "./compiler_BflaUDkP.mjs";
import { a as $$H, n as $$PageLayout, t as $$Section } from "./Section_BElPAU88.mjs";
import { t as $$Alert } from "./Alert_pe2Y5_Wv.mjs";
var site_default = {
	text001: "FRC 12148",
	text002: "Team V.A.N. is a student-led FIRST Robotics Competition team in Palm Bay, Florida, serving students in southern Brevard and Indian River counties.",
	text003: "About Team V.A.N.",
	text004: "Team",
	text005: "Very Awesome Name",
	text006: "— FRC 12148",
	text007: "Team V.A.N. (FRC 12148) is a student-led FIRST Robotics Competition team based in Palm Bay, serving students in southern Brevard County and Indian River County.",
	text008: "Student Kickoff",
	text009: "Date: November 15th",
	text010: "Time: 6:00 PM to 8:00 PM",
	text011: "Location:",
	text012: "Mind Forge Guild",
	text013: "Team V.A.N. is student-run, with adult mentors coaching rather than directing. Four team leads manage organization and business, ensuring the team runs smoothly and that responsibilities are clearly defined.",
	text014: "Beyond that, membership is not divided into fixed subteams. Students are free to work wherever they're most interested or most useful that week, whether that's wiring one day and CAD the next, and nobody is locked into one group for the season. Team leads coordinate the work and mentors provide technical guidance and safety oversight, but day-to-day problem solving is student-driven.",
	text015: "Experienced students train new members and keep notes on both the technical work and how the team is run, so responsibilities and institutional knowledge can be handed off to future leaders as the team grows.",
	text016: "What We Do",
	text017: "Founded in 2026, Team V.A.N. (FRC 12148) is in its first FRC season. Students run the technical work and the day-to-day organization of the team, with four leads managing organization and business. Where we meet and build is on the",
	text018: "What Is FIRST",
	text019: "page.",
	text020: "Our main build space is in Palm Bay, near Palm Bay Magnet, Bayside High, and Heritage High. We are also the closest FRC team to Sebastian River High, Vero Beach High, and Indian River Charter High.",
	text021: "Mission",
	text022: "We started the team because southern Brevard County and Indian River County have had limited access to FRC. Indian River County currently has no FRC teams, and students in southern Brevard often have to travel a long way to join an existing program.",
	text023: "Join Us",
	text024: "We are always looking for passionate students to join our team. Whether you're interested in the engineering or business side of things, you would make an impact! No matter your experience.",
	text025: "Fill out the interest form"
};
//#endregion
//#region src/pages/index.astro
var pages_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => ""
});
var $$Index = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "Layout", $$PageLayout, {
		"title": site_default.text001,
		"description": site_default.text002
	}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "H", $$H, { "class": "mb-2" }, { "default": ($$result) => renderTemplate`${site_default.text003}` })}${maybeRenderHead($$result)}<p class="mb-6 text-white font-semibold">${site_default.text004} <i>${site_default.text005}</i> ${site_default.text006}</p><p>${site_default.text007}</p>${renderComponent($$result, "Alert", $$Alert, {
		"title": site_default.text008,
		"class": "mt-6"
	}, { "default": ($$result) => renderTemplate`<p>${site_default.text009}</p><p>${site_default.text010}</p><p>${site_default.text011}${" "}<a href="https://maps.app.goo.gl/EZpkUnE5RZaprrsCA" class="text-blue-300 underline underline-offset-4" target="_blank" rel="noopener noreferrer" aria-label="Open map to Mind Forge at 2475 Palm Bay Road, Suite 210, in a new tab">${site_default.text012}</a></p>` })}${renderComponent($$result, "Section", $$Section, {}, { "default": ($$result) => renderTemplate`<p>${site_default.text013}</p><p>${site_default.text014}</p><p>${site_default.text015}</p>` })}${renderComponent($$result, "Section", $$Section, {}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "H", $$H, { "level": "h2" }, { "default": ($$result) => renderTemplate`${site_default.text016}` })}<p>${site_default.text017}${" "}<a href="/about/" class="text-blue-300 underline underline-offset-4">${site_default.text018}</a>${" "}${site_default.text019}</p><p>${site_default.text020}</p>${renderComponent($$result, "H", $$H, { "level": "h2" }, { "default": ($$result) => renderTemplate`${site_default.text021}` })}<p>${site_default.text022}</p>${renderComponent($$result, "H", $$H, { "level": "h2" }, { "default": ($$result) => renderTemplate`<a href="/interest/" class="text-inherit underline decoration-silver underline-offset-4">${site_default.text023}</a>` })}<p>${site_default.text024}${" "}<a href="/interest/" class="text-blue-300 underline underline-offset-4">${site_default.text025}</a>.</p>` })}` })}`;
}, "/Users/stanislava/Documents/teamvan.org/src/pages/index.astro", void 0);
var $$file = "/Users/stanislava/Documents/teamvan.org/src/pages/index.astro";
//#endregion
//#region \0virtual:astro:page:src/pages/index@_@astro
var page = () => pages_exports;
//#endregion
export { page };
