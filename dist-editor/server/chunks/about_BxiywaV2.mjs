import { r as __exportAll } from "./rolldown-runtime_BMI-E3GI.mjs";
import { C as createAstro, d as renderTemplate, f as maybeRenderHead, i as renderComponent } from "./server_DF2ydcAu.mjs";
import { t as createComponent } from "./compiler_BflaUDkP.mjs";
import { a as $$H, n as $$PageLayout, t as $$Section } from "./Section_BElPAU88.mjs";
var about_default = {
	text001: "What Is FIRST",
	text002: "Learn what FIRST Robotics Competition is, how its season works, and how Team V.A.N. competes.",
	text003: "What Is FIRST Robotics?",
	text004: "The FIRST Robotics Competition (FRC) is an international high school engineering program. Every January, teams get a Kit of Parts and a new game, then have about six weeks to design, build, program, and test a competition robot before shipping it off to events. From February through April, teams compete in head-to-head matches at regional and district events around the world, working to qualify for the FIRST Championship.",
	text005: "FRC runs on two values as much as it runs on robots:",
	text006: "Gracious Professionalism",
	text007: ", treating competitors with the same respect as teammates, and",
	text008: "Coopertition",
	text009: ", the idea that teams can help each other and still compete hard. Teams also earn judged awards for engineering quality, community impact, and mentorship, not just match wins.",
	text010: "Our Season at a Glance",
	text011: "Team V.A.N. runs on the standard FIRST Robotics Competition calendar, with a team kickoff of our own on November 15 to get new members ready before the season starts. Exact dates shift from year to year; this is the shape of a typical season."
};
//#endregion
//#region src/components/Timeline.astro
createAstro("https://teamvan.org");
var $$Timeline = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Timeline;
	const { phases } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<ol class="relative space-y-6 border-l-2 border-white/30 pl-6">${phases.map((phase) => renderTemplate`<li class="relative"><span class="absolute top-1 -left-7.25 size-3 rounded-full border-2 border-white bg-main"></span><div class="text-xs font-bold tracking-wide uppercase opacity-80">${phase.period}</div><div class="mt-0.5 text-lg font-bold">${phase.title}</div><p class="mt-1">${phase.description}</p></li>`)}</ol>`;
}, "/Users/stanislava/Documents/teamvan.org/src/components/Timeline.astro", void 0);
//#endregion
//#region src/components/StatGrid.astro
createAstro("https://teamvan.org");
var $$StatGrid = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$StatGrid;
	const { stats } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<div class="grid grid-cols-2 gap-4 sm:grid-cols-4">${stats.map((stat) => renderTemplate`<div class="rounded-base border border-white/20 bg-white/5 p-4 text-center"><div class="text-3xl font-extrabold leading-tight">${stat.value}</div><div class="mt-1 text-sm">${stat.label}</div></div>`)}</div>`;
}, "/Users/stanislava/Documents/teamvan.org/src/components/StatGrid.astro", void 0);
//#endregion
//#region src/pages/about.astro
var about_exports = /* @__PURE__ */ __exportAll({
	default: () => $$About,
	file: () => $$file,
	url: () => $$url
});
var $$About = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "Layout", $$PageLayout, {
		"title": about_default.text001,
		"description": about_default.text002
	}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "Section", $$Section, {
		"aria-labelledby": "what-is-frc-heading",
		"class": "mt-0!"
	}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "H", $$H, { "id": "what-is-frc-heading" }, { "default": ($$result) => renderTemplate`${about_default.text003}` })}${maybeRenderHead($$result)}<p>${about_default.text004}</p><p>${about_default.text005} <strong>${about_default.text006}</strong>${about_default.text007} <strong>${about_default.text008}</strong>${about_default.text009}</p>${renderComponent($$result, "StatGrid", $$StatGrid, { "stats": [
		{
			value: "3,700+",
			label: "teams worldwide"
		},
		{
			value: "33",
			label: "countries & regions"
		},
		{
			value: "90,000+",
			label: "students competing"
		},
		{
			value: "~600",
			label: "teams at FIRST Championship"
		}
	] })}` })}${renderComponent($$result, "Section", $$Section, { "aria-labelledby": "timeline-heading" }, { "default": ($$result) => renderTemplate`${renderComponent($$result, "H", $$H, {
		"id": "timeline-heading",
		"level": "h2"
	}, { "default": ($$result) => renderTemplate`${about_default.text010}` })}<p>${about_default.text011}</p>${renderComponent($$result, "Timeline", $$Timeline, { "phases": [
		{
			period: "November 15",
			title: "Team Kickoff",
			description: "New members meet, review safety basics, and get introduced to the team before the official FIRST season begins."
		},
		{
			period: "Early January",
			title: "Kickoff",
			description: "FIRST reveals the new game. The team studies the rules, brainstorms strategy, and starts prototyping that same weekend."
		},
		{
			period: "January – February",
			title: "Build Season",
			description: "About six weeks to design, build, and program the competition robot, ending in late February, when the robot is bagged and no further changes are allowed until competition. The goal is to have it finished and competition-ready in time for our first event, the Orlando Regional, in March."
		},
		{
			period: "February – April",
			title: "Competition Events",
			description: "The team travels to regional events to compete, iterate on the robot between events, and work toward qualifying for the FIRST Championship."
		},
		{
			period: "April",
			title: "FIRST Championship",
			description: "If the team qualifies, the season culminates at the FIRST Championship in Houston, Texas, alongside roughly 600 teams from around the world."
		}
	] })}` })}` })}`;
}, "/Users/stanislava/Documents/teamvan.org/src/pages/about.astro", void 0);
var $$file = "/Users/stanislava/Documents/teamvan.org/src/pages/about.astro";
var $$url = "/about";
//#endregion
//#region \0virtual:astro:page:src/pages/about@_@astro
var page = () => about_exports;
//#endregion
export { page };
