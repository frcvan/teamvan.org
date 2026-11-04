import { r as __exportAll } from "./rolldown-runtime_BMI-E3GI.mjs";
import { d as renderTemplate, f as maybeRenderHead, i as renderComponent } from "./server_DF2ydcAu.mjs";
import { t as createComponent } from "./compiler_BflaUDkP.mjs";
import { a as $$H, i as $$Icon, n as $$PageLayout, r as $$Button, t as $$Section } from "./Section_BElPAU88.mjs";
var sponsors_default = {
	text001: "For Sponsors",
	text002: "Support Team V.A.N., a first-year FIRST Robotics team helping students in Brevard and Indian River counties gain hands-on STEM experience.",
	text003: "For Sponsors",
	text004: "Sponsorship",
	text005: "As a first-year team we are still putting operations, travel, registration, and a robot in place at the same time. Sponsor support helps cover those operating costs, and sponsors are featured on team shirts and the website.",
	text006: "Partner with a First-Year Team",
	text007: "Team V.A.N. is a first-year FIRST Robotics Competition team still putting operations, outreach, and a robot in place. Because the program is being built as we go, we can work with you on a sponsorship that fits your organization, whether that means branding, a team showcase at an event, or another community initiative you already have in mind.",
	text008: "Students handle design decisions, fundraising, and much of the outreach, so sponsor support goes toward the operating costs of a competition season: parts, tools, travel, registration, and the day-to-day work of running the team. Sponsors are featured on team shirts, the website, and the competition robot.",
	text009: "Anything helps.",
	text010: "We operate as a program of the",
	text011: "Mind Forge Guild",
	text012: ", the nonprofit makerspace that hosts our team, so sponsorships and donations are made to them on our behalf.",
	text013: "Why FIRST Robotics Is Worth Backing",
	text014: "Team V.A.N. competes in FIRST Robotics Competition (FRC), a program with a long track record of measurable outcomes for students who might not otherwise have access to hands-on engineering. Nationally, FIRST alumni report:",
	text015: "~90% college degree attainment",
	text016: ", compared with roughly 55% nationally, according to Brandeis University's 10-year FIRST Longitudinal Study.",
	text017: "83%",
	text018: "declare a STEM major by their fourth year of college.",
	text019: "63%",
	text020: "are currently employed in a STEM field.",
	text021: "Access to",
	text022: "200+ scholarship, university, and workforce partners",
	text023: "offering exclusive scholarship opportunities to FIRST participants.",
	text024: "Sponsor support turns those outcomes into opportunities for students in Palm Bay and Indian River County who currently have little or no local access to an FRC program.",
	text025: "Where We Are",
	text026: "We are based in Palm Bay, which makes Team V.A.N. the southernmost FRC team in Brevard County and the only FRC team serving northern Indian River County. Indian River County currently has no local FRC team. Our main build space is near Palm Bay Magnet, Bayside High, and Heritage High, and we are the closest FRC team to Sebastian River High, Vero Beach High, and Indian River Charter High.",
	text027: "Palm Bay Magnet Senior High operates under a Title I schoolwide program, and Bayside High and Heritage High serve significant populations of economically disadvantaged students.",
	text028: "Where the Team Works",
	text029: "Eastern Florida State College has pledged campus space and access to a machine shop, 3D printers, tools, and storage. Mind Forge Guild's makerspace is a second workspace for prototyping and weekend field practice. More about those partnerships is on the",
	text030: "About",
	text031: "page.",
	text032: "Ways You Can Support Us",
	text033: "Monetary sponsorships:",
	text034: "Flexible tiers with logo placement on our competition robot, team apparel, pit displays, and digital media.",
	text035: "In-kind material and services:",
	text036: "Raw aluminum, electrical hardware, fasteners, shop tools, 3D printing filament (PLA, PETG, TPU), or practice-field carpet.",
	text037: "Community introductions:",
	text038: "Connections to local businesses, civic groups, or others who may want to help.",
	text039: "Get in Touch",
	text040: "If you are interested in investing in the team, we would be glad to talk through what a partnership could look like.",
	text041: "Download Investment Packet",
	text042: "Contact Us For Sponsorship"
};
//#endregion
//#region src/pages/sponsors.astro
var sponsors_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Sponsors,
	file: () => $$file,
	url: () => $$url
});
var $$Sponsors = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "Layout", $$PageLayout, {
		"title": sponsors_default.text001,
		"description": sponsors_default.text002
	}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "H", $$H, {}, { "default": ($$result) => renderTemplate`${sponsors_default.text003}` })}${renderComponent($$result, "Section", $$Section, { "aria-labelledby": "sponsorship-heading" }, { "default": ($$result) => renderTemplate`${renderComponent($$result, "H", $$H, {
		"id": "sponsorship-heading",
		"level": "h2"
	}, { "default": ($$result) => renderTemplate`${sponsors_default.text004}` })}${maybeRenderHead($$result)}<p>${sponsors_default.text005}</p>` })}${renderComponent($$result, "Section", $$Section, { "aria-labelledby": "rookie-partner-heading" }, { "default": ($$result) => renderTemplate`${renderComponent($$result, "H", $$H, {
		"id": "rookie-partner-heading",
		"level": "h2"
	}, { "default": ($$result) => renderTemplate`${sponsors_default.text006}` })}<p>${sponsors_default.text007}</p><p>${sponsors_default.text008}</p><p><strong class="underline underline-offset-4">${sponsors_default.text009}</strong>${" "}${sponsors_default.text010}${" "}<a href="https://themindforgeguild.org" class="text-blue-300 underline underline-offset-4">${sponsors_default.text011}</a>${sponsors_default.text012}</p>` })}${renderComponent($$result, "Section", $$Section, { "aria-labelledby": "impact-heading" }, { "default": ($$result) => renderTemplate`${renderComponent($$result, "H", $$H, {
		"id": "impact-heading",
		"level": "h2"
	}, { "default": ($$result) => renderTemplate`${sponsors_default.text013}` })}<p>${sponsors_default.text014}</p><ul class="list-disc pl-6 space-y-2"><li><strong>${sponsors_default.text015}</strong>${sponsors_default.text016}</li><li><strong>${sponsors_default.text017}</strong> ${sponsors_default.text018}</li><li><strong>${sponsors_default.text019}</strong> ${sponsors_default.text020}</li><li>${sponsors_default.text021} <strong>${sponsors_default.text022}</strong> ${sponsors_default.text023}</li></ul><p>${sponsors_default.text024}</p>` })}${renderComponent($$result, "Section", $$Section, { "aria-labelledby": "community-heading" }, { "default": ($$result) => renderTemplate`${renderComponent($$result, "H", $$H, {
		"id": "community-heading",
		"level": "h2"
	}, { "default": ($$result) => renderTemplate`${sponsors_default.text025}` })}<p>${sponsors_default.text026}</p><p>${sponsors_default.text027}</p>` })}${renderComponent($$result, "Section", $$Section, { "aria-labelledby": "how-we-operate-heading" }, { "default": ($$result) => renderTemplate`${renderComponent($$result, "H", $$H, {
		"id": "how-we-operate-heading",
		"level": "h2"
	}, { "default": ($$result) => renderTemplate`${sponsors_default.text028}` })}<p>${sponsors_default.text029}${" "}<a href="/about/" class="text-blue-300 underline underline-offset-4">${sponsors_default.text030}</a>${" "}${sponsors_default.text031}</p>` })}${renderComponent($$result, "Section", $$Section, { "aria-labelledby": "ways-to-support-heading" }, { "default": ($$result) => renderTemplate`${renderComponent($$result, "H", $$H, {
		"id": "ways-to-support-heading",
		"level": "h2"
	}, { "default": ($$result) => renderTemplate`${sponsors_default.text032}` })}<ul class="list-disc pl-6 space-y-2"><li><strong>${sponsors_default.text033}</strong> ${sponsors_default.text034}</li><li><strong>${sponsors_default.text035}</strong> ${sponsors_default.text036}</li><li><strong>${sponsors_default.text037}</strong> ${sponsors_default.text038}</li></ul>` })}${renderComponent($$result, "Section", $$Section, { "aria-labelledby": "donations-heading" }, { "default": ($$result) => renderTemplate`${renderComponent($$result, "H", $$H, {
		"id": "donations-heading",
		"level": "h2"
	}, { "default": ($$result) => renderTemplate`${sponsors_default.text039}` })}<p>${sponsors_default.text040}</p><div class="flex flex-wrap gap-4 mt-4">${renderComponent($$result, "Button", $$Button, {
		"target": "_blank",
		"href": "/investment-packet.pdf",
		"variant": "secondary"
	}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "Icon", $$Icon, {
		"name": "tabler:download",
		"size": 32
	})}${sponsors_default.text041}` })}${renderComponent($$result, "Button", $$Button, {
		"href": "mailto:contact@teamvan.org?subject=Sponsorship%20Inquiry%20-%20Team%20V.A.N.",
		"variant": "secondary"
	}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "Icon", $$Icon, {
		"name": "tabler:mail",
		"size": 32
	})}${sponsors_default.text042}` })}</div>` })}` })}`;
}, "/Users/stanislava/Documents/teamvan.org/src/pages/sponsors.astro", void 0);
var $$file = "/Users/stanislava/Documents/teamvan.org/src/pages/sponsors.astro";
var $$url = "/sponsors";
//#endregion
//#region \0virtual:astro:page:src/pages/sponsors@_@astro
var page = () => sponsors_exports;
//#endregion
export { page };
