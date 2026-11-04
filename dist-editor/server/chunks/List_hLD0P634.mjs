import { C as createAstro, c as renderSlot, d as renderTemplate, i as renderComponent } from "./server_DF2ydcAu.mjs";
import { t as createComponent } from "./compiler_BflaUDkP.mjs";
//#region src/components/List.astro
createAstro("https://teamvan.org");
var $$List = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$List;
	const { type = "disc", class: className, ...props } = Astro.props;
	return renderTemplate`${renderComponent($$result, "Tag", type === "numbered" ? "ol" : "ul", {
		"class:list": [
			type === "numbered" ? "list-decimal" : "list-disc",
			"space-y-3 pl-6",
			className
		],
		...props
	}, { "default": ($$result) => renderTemplate`${renderSlot($$result, $$slots["default"])}` })}`;
}, "/Users/stanislava/Documents/teamvan.org/src/components/List.astro", void 0);
//#endregion
export { $$List as t };
