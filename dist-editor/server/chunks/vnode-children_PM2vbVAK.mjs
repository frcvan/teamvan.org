import { Fragment, createElement } from "react";
var VOID_TAGS = /* @__PURE__ */ new Set([
	"area",
	"base",
	"br",
	"col",
	"embed",
	"hr",
	"img",
	"input",
	"keygen",
	"link",
	"meta",
	"param",
	"source",
	"track",
	"wbr"
]);
var RAW_TAGS = /* @__PURE__ */ new Set(["script", "style"]);
var DOM_PARSER_RE = /(?:<(\/?)([a-zA-Z][a-zA-Z0-9\:-]*)(?:\s([^>]*?))?((?:\s*\/)?)>|(<\!\-\-)([\s\S]*?)(\-\->)|(<\!)([\s\S]*?)(>))/gm;
var CHAR_AT = 64;
var CHAR_DOT = 46;
var CHAR_HYPHEN = 45;
var CHAR_COLON = 58;
var CHAR_UNDERSCORE = 95;
var CHAR_EQUALS = 61;
var CHAR_DOUBLE_QUOTE = 34;
var CHAR_SINGLE_QUOTE = 39;
var CHAR_BACKSLASH = 92;
function isAttrKeyIdentifier(chr) {
	return chr >= 97 && chr <= 122 || chr >= 65 && chr <= 90 || chr >= 48 && chr <= 57 || chr === CHAR_AT || chr === CHAR_DOT || chr === CHAR_HYPHEN || chr === CHAR_COLON || chr === CHAR_UNDERSCORE;
}
function splitAttrs(str) {
	let obj = {};
	if (str) {
		let state = "none";
		let currentKey;
		let currentValue = "";
		let tokenStartIndex;
		for (let currentIndex = 0; currentIndex < str.length; currentIndex++) {
			const currentChar = str.charCodeAt(currentIndex);
			if (state === "none") {
				if (isAttrKeyIdentifier(currentChar)) {
					if (currentKey) {
						obj[currentKey] = currentValue;
						currentKey = void 0;
						currentValue = "";
					}
					tokenStartIndex = currentIndex;
					state = "key";
				} else if (currentChar === CHAR_EQUALS && currentKey) state = "value";
			} else if (state === "key") {
				if (!isAttrKeyIdentifier(currentChar)) {
					currentKey = str.substring(tokenStartIndex, currentIndex);
					if (currentChar === CHAR_EQUALS) state = "value";
					else state = "none";
				}
			} else if (currentChar === CHAR_DOUBLE_QUOTE || currentChar === CHAR_SINGLE_QUOTE) {
				const quote = currentChar === CHAR_DOUBLE_QUOTE ? "\"" : "'";
				const valueStart = currentIndex + 1;
				let closeIndex = str.indexOf(quote, valueStart);
				while (closeIndex > 0 && str.charCodeAt(closeIndex - 1) === CHAR_BACKSLASH) closeIndex = str.indexOf(quote, closeIndex + 1);
				if (closeIndex === -1) break;
				currentValue = str.substring(valueStart, closeIndex);
				currentIndex = closeIndex;
				state = "none";
			}
		}
		if (state === "key" && tokenStartIndex != void 0 && tokenStartIndex < str.length) currentKey = str.substring(tokenStartIndex, str.length);
		if (currentKey) obj[currentKey] = currentValue;
	}
	return obj;
}
function parse(input) {
	let str = typeof input === "string" ? input : input.value;
	let doc, parent, token, text, i, bStart, bText, bEnd, tag;
	const tags = [];
	DOM_PARSER_RE.lastIndex = 0;
	parent = doc = {
		type: 0,
		children: []
	};
	let lastIndex = 0;
	function commitTextNode() {
		text = str.substring(lastIndex, DOM_PARSER_RE.lastIndex - token[0].length);
		if (text) parent.children.push({
			type: 2,
			value: text,
			parent
		});
	}
	while (token = DOM_PARSER_RE.exec(str)) {
		bStart = token[5] || token[8];
		bText = token[6] || token[9];
		bEnd = token[7] || token[10];
		if (RAW_TAGS.has(parent.name) && token[2] !== parent.name) {
			i = DOM_PARSER_RE.lastIndex - token[0].length;
			if (parent.children.length > 0) parent.children[0].value += token[0];
			continue;
		} else if (bStart === "<!--") {
			i = DOM_PARSER_RE.lastIndex - token[0].length;
			if (RAW_TAGS.has(parent.name)) continue;
			tag = {
				type: 3,
				value: bText,
				parent,
				loc: [{
					start: i,
					end: i + bStart.length
				}, {
					start: DOM_PARSER_RE.lastIndex - bEnd.length,
					end: DOM_PARSER_RE.lastIndex
				}]
			};
			tags.push(tag);
			tag.parent.children.push(tag);
		} else if (bStart === "<!") {
			i = DOM_PARSER_RE.lastIndex - token[0].length;
			tag = {
				type: 4,
				value: bText,
				parent,
				loc: [{
					start: i,
					end: i + bStart.length
				}, {
					start: DOM_PARSER_RE.lastIndex - bEnd.length,
					end: DOM_PARSER_RE.lastIndex
				}]
			};
			tags.push(tag);
			tag.parent.children.push(tag);
		} else if (token[1] !== "/") {
			commitTextNode();
			if (RAW_TAGS.has(parent.name)) {
				lastIndex = DOM_PARSER_RE.lastIndex;
				commitTextNode();
				continue;
			} else {
				tag = {
					type: 1,
					name: token[2] + "",
					attributes: splitAttrs(token[3]),
					parent,
					children: [],
					loc: [{
						start: DOM_PARSER_RE.lastIndex - token[0].length,
						end: DOM_PARSER_RE.lastIndex
					}]
				};
				tags.push(tag);
				tag.parent.children.push(tag);
				if (token[4] && token[4].indexOf("/") > -1 || VOID_TAGS.has(tag.name)) {
					tag.loc[1] = tag.loc[0];
					tag.isSelfClosingTag = true;
				} else parent = tag;
			}
		} else {
			commitTextNode();
			if (token[2] + "" === parent.name) {
				tag = parent;
				parent = tag.parent;
				tag.loc.push({
					start: DOM_PARSER_RE.lastIndex - token[0].length,
					end: DOM_PARSER_RE.lastIndex
				});
				text = str.substring(tag.loc[0].end, tag.loc[1].start);
				if (tag.children.length === 0) tag.children.push({
					type: 2,
					value: text,
					parent
				});
			} else if (token[2] + "" === tags[tags.length - 1].name && tags[tags.length - 1].isSelfClosingTag === true) {
				tag = tags[tags.length - 1];
				tag.loc.push({
					start: DOM_PARSER_RE.lastIndex - token[0].length,
					end: DOM_PARSER_RE.lastIndex
				});
			}
		}
		lastIndex = DOM_PARSER_RE.lastIndex;
	}
	text = str.slice(lastIndex);
	parent.children.push({
		type: 2,
		value: text,
		parent
	});
	return doc;
}
//#endregion
//#region node_modules/.pnpm/@astrojs+react@7.1.2_@types+node@24.13.6_@types+react-dom@19.3.0_@types+react@19.3.0__@_46f5d1f2168cffa225e830106eda68d8/node_modules/@astrojs/react/dist/vnode-children.js
var ids = 0;
function convert(children) {
	let doc = parse(children.toString().trim());
	let id = ids++;
	let key = 0;
	function createReactElementFromNode(node) {
		const childVnodes = Array.isArray(node.children) && node.children.length ? node.children.map((child) => createReactElementFromNode(child)).filter(Boolean) : void 0;
		if (node.type === 0) return createElement(Fragment, {}, childVnodes);
		else if (node.type === 1) {
			const { class: className, ...props } = node.attributes;
			return createElement(node.name, {
				...props,
				className,
				key: `${id}-${key++}`
			}, childVnodes);
		} else if (node.type === 2) return node.value.trim() ? node.value : void 0;
	}
	return createReactElementFromNode(doc).props.children;
}
//#endregion
export { convert as default };
