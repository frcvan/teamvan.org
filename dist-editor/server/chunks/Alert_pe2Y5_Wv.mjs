import { C as createAstro, c as renderSlot, d as renderTemplate, f as maybeRenderHead, i as renderComponent, m as addAttribute, t as spreadAttributes } from "./server_DF2ydcAu.mjs";
import { t as createComponent } from "./compiler_BflaUDkP.mjs";
import { i as $$Icon } from "./Section_BElPAU88.mjs";
//#region src/components/Alert.astro
createAstro("https://teamvan.org");
var $$Alert = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Alert;
	const { title, class: className, ...props } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<div role="status"${addAttribute(["flex gap-4 rounded-base border border-white/20 bg-white/5 p-4", className], "class:list")}${spreadAttributes(props)}>${renderComponent($$result, "Icon", $$Icon, {
		"name": "tabler:info-circle",
		"size": 20,
		"class": "mt-0.5 shrink-0",
		"aria-hidden": "true"
	})}<div class="space-y-2">${title && renderTemplate`<p class="font-bold">${title}</p>`}<div class="text-sm">${renderSlot($$result, $$slots["default"])}</div></div></div>`;
}, "/Users/stanislava/Documents/teamvan.org/src/components/Alert.astro", void 0);
//#endregion
export { $$Alert as t };
