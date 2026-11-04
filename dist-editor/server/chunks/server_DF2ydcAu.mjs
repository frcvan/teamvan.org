import { B as OnlyResponseCanBeReturned, K as ResponseSentError, L as NoMatchingImport, M as MissingMediaQueryDirective, P as NoClientOnlyHint, R as NoMatchingRenderer, Z as UnavailableAstroGlobal, c as EndpointDidNotReturnAResponse, t as AstroError } from "./errors_DDDuJQO0.mjs";
//#region node_modules/.pnpm/@oslojs+encoding@1.1.0/node_modules/@oslojs/encoding/dist/hex.js
function encodeHexUpperCase(data) {
	let result = "";
	for (let i = 0; i < data.length; i++) {
		result += alphabetUpperCase[data[i] >> 4];
		result += alphabetUpperCase[data[i] & 15];
	}
	return result;
}
function decodeHex(data) {
	if (data.length % 2 !== 0) throw new Error("Invalid hex string");
	const result = new Uint8Array(data.length / 2);
	for (let i = 0; i < data.length; i += 2) {
		if (!(data[i] in decodeMap)) throw new Error("Invalid character");
		if (!(data[i + 1] in decodeMap)) throw new Error("Invalid character");
		result[i / 2] |= decodeMap[data[i]] << 4;
		result[i / 2] |= decodeMap[data[i + 1]];
	}
	return result;
}
var alphabetUpperCase = "0123456789ABCDEF";
var decodeMap = {
	"0": 0,
	"1": 1,
	"2": 2,
	"3": 3,
	"4": 4,
	"5": 5,
	"6": 6,
	"7": 7,
	"8": 8,
	"9": 9,
	a: 10,
	A: 10,
	b: 11,
	B: 11,
	c: 12,
	C: 12,
	d: 13,
	D: 13,
	e: 14,
	E: 14,
	f: 15,
	F: 15
};
//#endregion
//#region node_modules/.pnpm/@oslojs+encoding@1.1.0/node_modules/@oslojs/encoding/dist/base32.js
var EncodingPadding$1;
(function(EncodingPadding) {
	EncodingPadding[EncodingPadding["Include"] = 0] = "Include";
	EncodingPadding[EncodingPadding["None"] = 1] = "None";
})(EncodingPadding$1 || (EncodingPadding$1 = {}));
var DecodingPadding$1;
(function(DecodingPadding) {
	DecodingPadding[DecodingPadding["Required"] = 0] = "Required";
	DecodingPadding[DecodingPadding["Ignore"] = 1] = "Ignore";
})(DecodingPadding$1 || (DecodingPadding$1 = {}));
//#endregion
//#region node_modules/.pnpm/@oslojs+encoding@1.1.0/node_modules/@oslojs/encoding/dist/base64.js
function encodeBase64(bytes) {
	return encodeBase64_internal(bytes, base64Alphabet, EncodingPadding.Include);
}
function encodeBase64_internal(bytes, alphabet, padding) {
	let result = "";
	for (let i = 0; i < bytes.byteLength; i += 3) {
		let buffer = 0;
		let bufferBitSize = 0;
		for (let j = 0; j < 3 && i + j < bytes.byteLength; j++) {
			buffer = buffer << 8 | bytes[i + j];
			bufferBitSize += 8;
		}
		for (let j = 0; j < 4; j++) if (bufferBitSize >= 6) {
			result += alphabet[buffer >> bufferBitSize - 6 & 63];
			bufferBitSize -= 6;
		} else if (bufferBitSize > 0) {
			result += alphabet[buffer << 6 - bufferBitSize & 63];
			bufferBitSize = 0;
		} else if (padding === EncodingPadding.Include) result += "=";
	}
	return result;
}
var base64Alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
function decodeBase64(encoded) {
	return decodeBase64_internal(encoded, base64DecodeMap, DecodingPadding.Required);
}
function decodeBase64_internal(encoded, decodeMap, padding) {
	const result = new Uint8Array(Math.ceil(encoded.length / 4) * 3);
	let totalBytes = 0;
	for (let i = 0; i < encoded.length; i += 4) {
		let chunk = 0;
		let bitsRead = 0;
		for (let j = 0; j < 4; j++) {
			if (padding === DecodingPadding.Required && encoded[i + j] === "=") continue;
			if (padding === DecodingPadding.Ignore && (i + j >= encoded.length || encoded[i + j] === "=")) continue;
			if (j > 0 && encoded[i + j - 1] === "=") throw new Error("Invalid padding");
			if (!(encoded[i + j] in decodeMap)) throw new Error("Invalid character");
			chunk |= decodeMap[encoded[i + j]] << (3 - j) * 6;
			bitsRead += 6;
		}
		if (bitsRead < 24) {
			let unused;
			if (bitsRead === 12) unused = chunk & 65535;
			else if (bitsRead === 18) unused = chunk & 255;
			else throw new Error("Invalid padding");
			if (unused !== 0) throw new Error("Invalid padding");
		}
		const byteLength = Math.floor(bitsRead / 8);
		for (let i = 0; i < byteLength; i++) {
			result[totalBytes] = chunk >> 16 - i * 8 & 255;
			totalBytes++;
		}
	}
	return result.slice(0, totalBytes);
}
var EncodingPadding;
(function(EncodingPadding) {
	EncodingPadding[EncodingPadding["Include"] = 0] = "Include";
	EncodingPadding[EncodingPadding["None"] = 1] = "None";
})(EncodingPadding || (EncodingPadding = {}));
var DecodingPadding;
(function(DecodingPadding) {
	DecodingPadding[DecodingPadding["Required"] = 0] = "Required";
	DecodingPadding[DecodingPadding["Ignore"] = 1] = "Ignore";
})(DecodingPadding || (DecodingPadding = {}));
var base64DecodeMap = {
	"0": 52,
	"1": 53,
	"2": 54,
	"3": 55,
	"4": 56,
	"5": 57,
	"6": 58,
	"7": 59,
	"8": 60,
	"9": 61,
	A: 0,
	B: 1,
	C: 2,
	D: 3,
	E: 4,
	F: 5,
	G: 6,
	H: 7,
	I: 8,
	J: 9,
	K: 10,
	L: 11,
	M: 12,
	N: 13,
	O: 14,
	P: 15,
	Q: 16,
	R: 17,
	S: 18,
	T: 19,
	U: 20,
	V: 21,
	W: 22,
	X: 23,
	Y: 24,
	Z: 25,
	a: 26,
	b: 27,
	c: 28,
	d: 29,
	e: 30,
	f: 31,
	g: 32,
	h: 33,
	i: 34,
	j: 35,
	k: 36,
	l: 37,
	m: 38,
	n: 39,
	o: 40,
	p: 41,
	q: 42,
	r: 43,
	s: 44,
	t: 45,
	u: 46,
	v: 47,
	w: 48,
	x: 49,
	y: 50,
	z: 51,
	"+": 62,
	"/": 63
};
//#endregion
//#region node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/util.js
function getEnumValues(entries) {
	const numericValues = Object.values(entries).filter((v) => typeof v === "number");
	return Object.entries(entries).filter(([k, _]) => numericValues.indexOf(+k) === -1).map(([_, v]) => v);
}
function joinValues(array, separator = "|") {
	return array.map((val) => stringifyPrimitive(val)).join(separator);
}
function jsonStringifyReplacer(_, value) {
	if (typeof value === "bigint") return value.toString();
	return value;
}
var Cached = class {
	constructor(getter) {
		this._getter = getter;
		this._value = void 0;
	}
	get value() {
		const getter = this._getter;
		if (getter !== void 0) {
			this._value = getter();
			this._getter = void 0;
		}
		return this._value;
	}
};
function cached(getter) {
	return new Cached(getter);
}
function nullish(input) {
	return input === null || input === void 0;
}
function cleanRegex(source) {
	const start = source.startsWith("^") ? 1 : 0;
	const end = source.endsWith("$") ? source.length - 1 : source.length;
	return source.slice(start, end);
}
function assignProp(target, prop, value) {
	Object.defineProperty(target, prop, {
		value,
		writable: true,
		enumerable: true,
		configurable: true
	});
}
/**
* Whichever object a def's `shape` currently answers from: the one the caller passed until the first read, the frozen copy after it.
*
* Its keys and descriptors read without invoking anything, which is what lets a discriminated union check its discriminator, and the cycle walk read a shape, without resolving a getter that references the schema being constructed. A def that answers `shape` from an accessor of its own has none.
*/
function rawShape(def) {
	const desc = Object.getOwnPropertyDescriptor(def, "shape");
	return desc?.get ? desc.get.raw : desc?.value;
}
function sourceShape(schema) {
	return rawShape(schema._zod.def) ?? schema._zod.def.shape;
}
function deferProp(target, key, getter) {
	Object.defineProperty(target, key, {
		get() {
			const value = getter();
			assignProp(this, key, value);
			return value;
		},
		enumerable: true,
		configurable: true
	});
}
function putProp(target, key, value) {
	if (key in target) assignProp(target, key, value);
	else target[key] = value;
}
/**
* Copies `keys` of `source`'s shape onto `target`, each value passed through `wrap`.
*
* A key the source has resolved is copied through now, so the derived shape states it outright and nothing has to resolve it to learn what it holds. A key the source still defers stays deferred, and reads back through the source's own `shape`, so it resolves once and both shapes get that one schema.
*/
function mirrorShape(target, source, keys, wrap) {
	const raw = sourceShape(source);
	for (const key of keys) {
		const desc = Object.getOwnPropertyDescriptor(raw, key);
		if (!desc.enumerable) continue;
		if (desc.get) deferProp(target, key, () => {
			const value = source._zod.def.shape[key];
			return wrap ? wrap(value, key) : value;
		});
		else putProp(target, key, wrap ? wrap(desc.value, key) : desc.value);
	}
}
function mirrorProps(target, source) {
	for (const key of Reflect.ownKeys(source)) {
		const desc = Object.getOwnPropertyDescriptor(source, key);
		if (!desc.enumerable) continue;
		if (desc.get) deferProp(target, key, () => source[key]);
		else putProp(target, key, desc.value);
	}
}
function mergeDefs(...defs) {
	const mergedDescriptors = {};
	for (const def of defs) {
		const descriptors = Object.getOwnPropertyDescriptors(def);
		Object.assign(mergedDescriptors, descriptors);
	}
	return Object.defineProperties({}, mergedDescriptors);
}
function esc(str) {
	return JSON.stringify(str);
}
function slugify(input) {
	return input.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
}
var captureStackTrace = "captureStackTrace" in Error ? Error.captureStackTrace : (..._args) => {};
function isObject(data) {
	return typeof data === "object" && data !== null && !Array.isArray(data);
}
var allowsEval = /* @__PURE__*/ cached(() => {
	if (globalConfig.jitless) return false;
	if (typeof navigator !== "undefined" && navigator?.userAgent?.includes("Cloudflare")) return false;
	try {
		new Function("");
		return true;
	} catch (_) {
		return false;
	}
});
function isPlainObject(o) {
	if (isObject(o) === false) return false;
	const ctor = o.constructor;
	if (ctor === void 0) return true;
	if (typeof ctor !== "function") return true;
	const prot = ctor.prototype;
	if (isObject(prot) === false) return false;
	if (Object.prototype.hasOwnProperty.call(prot, "isPrototypeOf") === false) return false;
	return true;
}
function shallowClone(o) {
	if (isPlainObject(o)) return { ...o };
	if (Array.isArray(o)) return [...o];
	if (o instanceof Map) return new Map(o);
	if (o instanceof Set) return new Set(o);
	return o;
}
var propertyKeyTypes = /* @__PURE__*/ new Set([
	"string",
	"number",
	"symbol"
]);
function escapeRegex(str) {
	return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function clone(inst, def, params) {
	const cl = new inst._zod.constr(def ?? inst._zod.def);
	if (!def || params?.parent) cl._zod.parent = inst;
	return cl;
}
function normalizeParams(_params) {
	const params = _params;
	if (!params) return {};
	if (typeof params === "string") return { error: () => params };
	if (params?.message !== void 0) {
		if (params?.error !== void 0) throw new Error("Cannot specify both `message` and `error` params");
		params.error = params.message;
	}
	delete params.message;
	if (typeof params.error === "string") return {
		...params,
		error: () => params.error
	};
	return params;
}
function stringifyPrimitive(value) {
	if (typeof value === "bigint") return value.toString() + "n";
	if (typeof value === "string") return `"${value}"`;
	return `${value}`;
}
function optionalKeys(shape) {
	return Object.keys(shape).filter((k) => {
		return shape[k]._zod.optin !== void 0 && shape[k]._zod.optout === "optional";
	});
}
var NUMBER_FORMAT_RANGES = /*@__PURE__*/ (() => ({
	safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
	int32: [-2147483648, 2147483647],
	uint32: [0, 4294967295],
	float32: [-34028234663852886e22, 34028234663852886e22],
	float64: [-Number.MAX_VALUE, Number.MAX_VALUE]
}))();
var BIGINT_FORMAT_RANGES = {
	int64: [/* @__PURE__*/ BigInt("-9223372036854775808"), /* @__PURE__*/ BigInt("9223372036854775807")],
	uint64: [/* @__PURE__*/ BigInt(0), /* @__PURE__*/ BigInt("18446744073709551615")]
};
function pick(schema, mask) {
	const currDef = schema._zod.def;
	const checks = currDef.checks;
	if (checks && checks.length > 0) throw new Error(".pick() cannot be used on object schemas containing refinements");
	const newShape = {};
	mirrorShape(newShape, schema, maskedKeys(schema, mask));
	return clone(schema, mergeDefs(currDef, {
		shape: newShape,
		checks: []
	}));
}
function maskedKeys(schema, mask) {
	const raw = sourceShape(schema);
	const keys = [];
	for (const key of Reflect.ownKeys(mask)) {
		if (!Object.getOwnPropertyDescriptor(raw, key)?.enumerable) throw new Error(`Unrecognized key: "${String(key)}"`);
		if (mask[key]) keys.push(key);
	}
	return keys;
}
function omit(schema, mask) {
	const currDef = schema._zod.def;
	const checks = currDef.checks;
	if (checks && checks.length > 0) throw new Error(".omit() cannot be used on object schemas containing refinements");
	const omitted = new Set(maskedKeys(schema, mask));
	const newShape = {};
	mirrorShape(newShape, schema, Reflect.ownKeys(sourceShape(schema)).filter((key) => !omitted.has(key)));
	return clone(schema, mergeDefs(currDef, {
		shape: newShape,
		checks: []
	}));
}
function extend(schema, shape) {
	if (!isPlainObject(shape)) throw new Error("Invalid input to extend: expected a plain object");
	const checks = schema._zod.def.checks;
	if (checks && checks.length > 0) {
		const existingShape = sourceShape(schema);
		for (const key of Reflect.ownKeys(shape)) if (Object.getOwnPropertyDescriptor(existingShape, key) !== void 0) throw new Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
	}
	return clone(schema, mergeDefs(schema._zod.def, { shape: extended(schema, shape) }));
}
function extended(schema, shape) {
	const newShape = {};
	mirrorShape(newShape, schema, Reflect.ownKeys(sourceShape(schema)));
	mirrorProps(newShape, shape);
	return newShape;
}
function safeExtend(schema, shape) {
	if (!isPlainObject(shape)) throw new Error("Invalid input to safeExtend: expected a plain object");
	return clone(schema, mergeDefs(schema._zod.def, { shape: extended(schema, shape) }));
}
function merge(a, b) {
	if (!b?._zod?.def) throw new Error("Invalid input to merge: expected an object schema. To merge a plain shape, use `.extend()`.");
	if (a._zod.def.checks?.length) throw new Error(".merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.");
	const newShape = {};
	mirrorShape(newShape, a, Reflect.ownKeys(sourceShape(a)));
	mirrorShape(newShape, b, Reflect.ownKeys(sourceShape(b)));
	return clone(a, mergeDefs(a._zod.def, {
		shape: newShape,
		get catchall() {
			return b._zod.def.catchall;
		},
		checks: b._zod.def.checks ?? []
	}));
}
function partial(Class, schema, mask, name = "partial") {
	const checks = schema._zod.def.checks;
	if (checks && checks.length > 0) throw new Error(`.${name}() cannot be used on object schemas containing refinements`);
	const selected = mask ? new Set(maskedKeys(schema, mask)) : void 0;
	const newShape = {};
	mirrorShape(newShape, schema, Reflect.ownKeys(sourceShape(schema)), Class && ((value, key) => selected && !selected.has(key) ? value : new Class({
		type: "optional",
		innerType: value
	})));
	return clone(schema, mergeDefs(schema._zod.def, {
		shape: newShape,
		checks: []
	}));
}
function required(Class, schema, mask) {
	const selected = mask ? new Set(maskedKeys(schema, mask)) : void 0;
	const newShape = {};
	mirrorShape(newShape, schema, Reflect.ownKeys(sourceShape(schema)), (value, key) => selected && !selected.has(key) ? value : new Class({
		type: "nonoptional",
		innerType: value
	}));
	return clone(schema, mergeDefs(schema._zod.def, { shape: newShape }));
}
function aborted(x, startIndex = 0) {
	if (x.aborted === true) return true;
	for (let i = startIndex; i < x.issues.length; i++) if (x.issues[i]?.continue !== true) return true;
	return false;
}
function explicitlyAborted(x, startIndex = 0) {
	if (x.aborted === true) return true;
	for (let i = startIndex; i < x.issues.length; i++) if (x.issues[i]?.continue === false) return true;
	return false;
}
function prefixIssues(path, issues) {
	return issues.map((iss) => {
		var _a;
		(_a = iss).path ?? (_a.path = []);
		iss.path.unshift(path);
		return iss;
	});
}
function unwrapMessage(message) {
	return typeof message === "string" ? message : message?.message;
}
function attachSchema(issues, start, inst) {
	var _a;
	for (let i = start; i < issues.length; i++) (_a = issues[i]).schema ?? (_a.schema = inst);
}
function finalizeIssue(iss, ctx, config) {
	var _a;
	const traits = iss.inst?._zod?.traits;
	if (traits?.has("$ZodType")) {
		if (traits.has("$ZodCheck")) (_a = iss).schema ?? (_a.schema = iss.inst);
		else iss.schema = iss.inst;
	}
	const schemaError = iss.schema !== iss.inst ? iss.schema?._zod.def?.error : void 0;
	const message = iss.message ? iss.message : unwrapMessage(iss.inst?._zod.def?.error?.(iss)) ?? unwrapMessage(schemaError?.(iss)) ?? unwrapMessage(ctx?.error?.(iss)) ?? unwrapMessage(config.customError?.(iss)) ?? unwrapMessage(config.localeError?.(iss)) ?? "Invalid input";
	const full = {};
	for (const k of Object.keys(iss)) {
		if (k === "inst" || k === "schema" || k === "continue" || k === "input" || k === "__proto__") continue;
		full[k] = iss[k];
	}
	full.path ?? (full.path = []);
	full.message = message;
	if (ctx?.reportInput) full.input = iss.input;
	return full;
}
var highSurrogate = /[\uD800-\uDBFF]/;
function codePointLength(str) {
	const units = str.length;
	if (!highSurrogate.test(str)) return units;
	let count = units;
	for (let i = 0; i < units - 1; i++) if ((str.charCodeAt(i) & 64512) === 55296 && (str.charCodeAt(i + 1) & 64512) === 56320) {
		count--;
		i++;
	}
	return count;
}
function getLengthableOrigin(input) {
	if (Array.isArray(input)) return "array";
	if (typeof input === "string") return "string";
	return "unknown";
}
function parsedType(data) {
	const t = typeof data;
	switch (t) {
		case "number": return Number.isNaN(data) ? "nan" : "number";
		case "object": {
			if (data === null) return "null";
			if (Array.isArray(data)) return "array";
			const obj = data;
			if (obj && Object.getPrototypeOf(obj) !== Object.prototype && "constructor" in obj && obj.constructor) return obj.constructor.name;
		}
	}
	return t;
}
function issue(...args) {
	const [iss, input, inst] = args;
	if (typeof iss === "string") return {
		message: iss,
		code: "custom",
		input,
		inst
	};
	return { ...iss };
}
/**
* Installs a trait's members on its prototype. Each value builds that member for the instance on first read; the built value shadows the accessor as an own property, so a detached `const { parse } = schema` keeps working.
*
* Call this from a `proto` initializer, which runs once per prototype — never per instance.
*/
function members(proto, table) {
	for (const key in table) {
		const desc = Object.getOwnPropertyDescriptor(table, key);
		if (desc.get) Object.defineProperty(proto, key, {
			...desc,
			enumerable: false
		});
		else defineBound(proto, key, desc.value);
	}
}
/** Shadows a prototype member with an own value, so a getter that builds from the instance runs once. */
function own(inst, key, value, enumerable = true) {
	Object.defineProperty(inst, key, {
		configurable: true,
		writable: true,
		enumerable,
		value
	});
	return value;
}
/** Like {@link own}, for a member that was never an own data property and has to stay out of `Object.keys`. */
function hide(inst, key, value) {
	return own(inst, key, value, false);
}
/** Adds members a table derives from the instance: each builds on first read and shadows as own data, and assignment shadows the same way, as when these were own properties. */
function derived(computes, table) {
	for (const key in computes) {
		const compute = computes[key];
		Object.defineProperty(table, key, {
			configurable: true,
			enumerable: true,
			get() {
				return own(this, key, compute(this));
			},
			set(value) {
				own(this, key, value);
			}
		});
	}
	return table;
}
function defineBound(proto, key, fn) {
	Object.defineProperty(proto, key, {
		configurable: true,
		get() {
			return this == null ? fn : own(this, key, fn.bind(this));
		},
		set(value) {
			own(this, key, value);
		}
	});
}
/** Returns the prototype to install on, or `undefined` if this group is already installed on it. */
function claim(inst, sentinel) {
	const proto = Object.getPrototypeOf(inst);
	return sentinel in proto ? void 0 : proto;
}
var installing;
var broke = false;
var breaker = {
	configurable: true,
	get() {
		broke = true;
	}
};
/**
* Installs a lazily-derived internal on the `_zod` prototype of `inst`'s
* constructor, computed from the internals object itself and cached there on
* first read. One accessor per constructor rather than one per instance.
*/
function defineLazyInternal(inst, key, compute) {
	const proto = Object.getPrototypeOf(inst._zod);
	if (key in proto && installing !== inst._zod) {
		installing = void 0;
		return;
	}
	installing = inst._zod;
	Object.defineProperty(proto, key, {
		configurable: true,
		get() {
			Object.defineProperty(this, key, breaker);
			const outer = broke;
			broke = false;
			try {
				const value = compute(this);
				if (broke) delete this[key];
				else Object.defineProperty(this, key, {
					configurable: true,
					writable: true,
					value
				});
				broke = broke || outer;
				return value;
			} catch (err) {
				delete this[key];
				broke = broke || outer;
				throw err;
			}
		},
		set(value) {
			Object.defineProperty(this, key, {
				configurable: true,
				writable: true,
				value
			});
		}
	});
}
/**
* Installs `key` on `inst`'s prototype, computed by `make` on first read and cached there as an own
* data property. One accessor per constructor rather than one per instance, because an own accessor
* puts every instance after the first into v8 dictionary mode. The key doubles as the sentinel.
*/
function installLazyProp(inst, key, make, enumerable) {
	const proto = claim(inst, key);
	if (!proto) return;
	Object.defineProperty(proto, key, {
		configurable: true,
		get() {
			const desc = {
				configurable: true,
				writable: true,
				enumerable,
				value: void 0
			};
			Object.defineProperty(this, key, desc);
			desc.value = make(this);
			Object.defineProperty(this, key, desc);
			return desc.value;
		},
		set(value) {
			Object.defineProperty(this, key, {
				configurable: true,
				writable: true,
				enumerable,
				value
			});
		}
	});
}
/** Marks the thunk `_catch` synthesises for a constant catch value. `Function.length` cannot tell that thunk from a user callback — rest and defaulted parameters both report arity 0 — and a user callback reads `ctx.error`, whose issues only finalize correctly against the caller's per-parse error map. Provenance can say what arity cannot. A plain string key rather than `Symbol.for`, whose call at module scope no bundler can prove pure — the same shape that anchored `urlCanParse` into every build. */
var CONSTANT_CATCH = "~constantCatch";
/** Wraps a constant catch value in a thunk tagged with {@link CONSTANT_CATCH}. */
function constantCatch(value) {
	const fn = () => value;
	fn[CONSTANT_CATCH] = true;
	return fn;
}
//#endregion
//#region node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/core.js
var _a$1;
var _zodDesc = {
	value: void 0,
	enumerable: false
};
var _E = "captureStackTrace" in Error ? Error : null;
function newError(Definition) {
	const E = _E;
	if (E) {
		const saved = E.stackTraceLimit;
		if (typeof saved === "number") {
			try {
				E.stackTraceLimit = 0;
			} catch {
				_E = null;
				return new Definition();
			}
			try {
				return new Definition();
			} finally {
				E.stackTraceLimit = saved;
			}
		}
	}
	return new Definition();
}
function $constructor(name, initializer, proto, params) {
	const zodProto = {};
	function Internals(def) {
		this.def = def;
		this.constr = _;
		this.traits = /* @__PURE__ */ new Set();
	}
	Internals.prototype = zodProto;
	const protoMembers = proto;
	const initialized = protoMembers && /* @__PURE__ */ new WeakSet();
	function init(inst, def) {
		if (!inst._zod) {
			_zodDesc.value = new Internals(def);
			try {
				Object.defineProperty(inst, "_zod", _zodDesc);
			} finally {
				_zodDesc.value = void 0;
			}
		} else if (inst._zod.traits.has(name)) return;
		inst._zod.traits.add(name);
		initializer(inst, def);
		if (initialized) {
			const own = Object.getPrototypeOf(inst);
			const ctorProto = inst._zod.constr.prototype;
			let up = own;
			while (up && up !== ctorProto) up = Object.getPrototypeOf(up);
			const target = up ?? own;
			if (!initialized.has(target)) {
				initialized.add(target);
				members(target, protoMembers);
			}
		}
		const proto = _.prototype;
		for (const k in proto) {
			if (!Object.prototype.hasOwnProperty.call(proto, k)) continue;
			if (!(k in inst)) inst[k] = proto[k].bind(inst);
		}
	}
	const Parent = params?.Parent ?? Object;
	class Definition extends Parent {}
	Object.defineProperty(Definition, "name", { value: name });
	function _(def) {
		const inst = params?.Parent ? newError(Definition) : this;
		init(inst, def);
		const deferred = inst._zod.deferred;
		if (deferred) {
			for (const fn of deferred) fn();
			inst._zod.deferred = void 0;
		}
		const pp = globalThis.__zod_globalConfig?.postProcessor;
		if (pp) pp(inst);
		return inst;
	}
	Object.defineProperty(_, "init", { value: init });
	Object.defineProperty(_, Symbol.hasInstance, { value: (inst) => {
		if (params?.Parent && inst instanceof params.Parent) return true;
		return inst?._zod?.traits?.has(name);
	} });
	Object.defineProperty(_, "name", { value: name });
	return _;
}
var $ZodAsyncError = class extends Error {
	constructor() {
		super(`Encountered Promise during synchronous parse. Use .parseAsync() instead.`);
	}
};
var $ZodEncodeError = class extends Error {
	constructor(name) {
		super(`Encountered unidirectional transform during encode: ${name}`);
		this.name = "ZodEncodeError";
	}
};
(_a$1 = globalThis).__zod_globalConfig ?? (_a$1.__zod_globalConfig = {});
var globalConfig = globalThis.__zod_globalConfig;
function config(newConfig) {
	if (newConfig) Object.assign(globalConfig, newConfig);
	return globalConfig;
}
//#endregion
//#region node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/errors.js
function _getMessage() {
	const internals = this._zod;
	internals.message ?? (internals.message = JSON.stringify(internals.def, jsonStringifyReplacer, 2));
	return internals.message;
}
function _setMessage(value) {
	this._zod.message = value;
}
var _messageDesc = {
	get: _getMessage,
	set: _setMessage,
	enumerable: true,
	configurable: true
};
var _issuesDesc = {
	value: void 0,
	enumerable: false
};
var _installedToString = /* @__PURE__ */ new WeakSet([Object.prototype, Error.prototype]);
var initializer$1 = (inst, def) => {
	inst.name = "$ZodError";
	_issuesDesc.value = def;
	Object.defineProperty(inst, "issues", _issuesDesc);
	_issuesDesc.value = void 0;
	Object.defineProperty(inst, "message", _messageDesc);
	const proto = Object.getPrototypeOf(inst);
	if (!_installedToString.has(proto)) {
		_installedToString.add(proto);
		Object.defineProperty(proto, "toString", {
			configurable: true,
			enumerable: false,
			get() {
				const value = () => this.message;
				Object.defineProperty(this, "toString", {
					value,
					configurable: true,
					writable: true
				});
				return value;
			},
			set(value) {
				Object.defineProperty(this, "toString", {
					value,
					configurable: true,
					writable: true
				});
			}
		});
	}
};
var $ZodError = $constructor("$ZodError", initializer$1);
$constructor("$ZodError", initializer$1, void 0, { Parent: Error });
/** Get-or-create `obj[key]` as an own data property. A path segment naming an inherited member
* ("toString", "constructor") would otherwise read through to the prototype, and assigning
* "__proto__" would hit the setter instead of creating a key. */
function node(obj, key, make) {
	if (!Object.prototype.hasOwnProperty.call(obj, key)) {
		if (key === "__proto__") Object.defineProperty(obj, key, {
			value: make(),
			writable: true,
			enumerable: true,
			configurable: true
		});
		else obj[key] = make();
	}
	return obj[key];
}
function flattenError(error, mapper = (issue) => issue.message) {
	const fieldErrors = {};
	const formErrors = [];
	for (const sub of error.issues) if (sub.path.length > 0) node(fieldErrors, sub.path[0], () => []).push(mapper(sub));
	else formErrors.push(mapper(sub));
	return {
		formErrors,
		fieldErrors
	};
}
function formatError(error, mapper = (issue) => issue.message) {
	const fieldErrors = { _errors: [] };
	const processError = (error, path = []) => {
		for (const issue of error.issues) if (issue.code === "invalid_union" && issue.errors.length) issue.errors.map((issues) => processError({ issues }, [...path, ...issue.path]));
		else if (issue.code === "invalid_key") processError({ issues: issue.issues }, [...path, ...issue.path]);
		else if (issue.code === "invalid_element") processError({ issues: issue.issues }, [...path, ...issue.path]);
		else {
			const fullpath = [...path, ...issue.path];
			if (fullpath.length === 0) fieldErrors._errors.push(mapper(issue));
			else {
				let curr = fieldErrors;
				let i = 0;
				while (i < fullpath.length) {
					const el = fullpath[i];
					const terminal = i === fullpath.length - 1;
					if (el === "_errors") {
						if (terminal) curr._errors.push(mapper(issue));
						i++;
						continue;
					}
					if (!Object.prototype.hasOwnProperty.call(curr, el)) Object.defineProperty(curr, el, {
						value: { _errors: [] },
						enumerable: true,
						writable: true,
						configurable: true
					});
					const node = curr[el];
					if (terminal) node._errors.push(mapper(issue));
					curr = node;
					i++;
				}
			}
		}
	};
	processError(error);
	return fieldErrors;
}
//#endregion
//#region node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/parse.js
function finalizeParams(callee, params) {
	return {
		callee: params?.callee ?? callee,
		Err: params?.Err
	};
}
var _parse = (_Err) => {
	const fn = (schema, value, _ctx, _params) => {
		const ctx = _ctx ? {
			..._ctx,
			async: false
		} : { async: false };
		const result = schema._zod.run({
			value,
			issues: []
		}, ctx);
		if (result instanceof Promise) throw new $ZodAsyncError();
		if (result.issues.length) {
			const e = new ((_params?.Err) ?? _Err)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())));
			captureStackTrace(e, _params?.callee ?? fn);
			throw e;
		}
		return result.value;
	};
	return fn;
};
var _parseAsync = (_Err) => {
	const fn = async (schema, value, _ctx, params) => {
		const ctx = _ctx ? {
			..._ctx,
			async: true
		} : { async: true };
		let result = schema._zod.run({
			value,
			issues: []
		}, ctx);
		if (result instanceof Promise) result = await result;
		if (result.issues.length) {
			const e = new ((params?.Err) ?? _Err)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())));
			captureStackTrace(e, params?.callee ?? fn);
			throw e;
		}
		return result.value;
	};
	return fn;
};
var _safeParse = (_Err) => (schema, value, _ctx) => {
	const ctx = _ctx ? {
		..._ctx,
		async: false
	} : { async: false };
	const result = schema._zod.run({
		value,
		issues: []
	}, ctx);
	if (result instanceof Promise) throw new $ZodAsyncError();
	return result.issues.length ? failure(_Err, result.issues, ctx) : {
		success: true,
		data: result.value
	};
};
function failure(Err, issues, ctx) {
	let error;
	return {
		success: false,
		get error() {
			if (!error) {
				error = new Err(issues.map((iss) => finalizeIssue(iss, ctx, config())));
				issues = void 0;
				ctx = void 0;
			}
			return error;
		},
		set error(e) {
			error = e;
			issues = void 0;
			ctx = void 0;
		}
	};
}
var _safeParseAsync = (_Err) => async (schema, value, _ctx) => {
	const ctx = _ctx ? {
		..._ctx,
		async: true
	} : { async: true };
	let result = schema._zod.run({
		value,
		issues: []
	}, ctx);
	if (result instanceof Promise) result = await result;
	return result.issues.length ? failure(_Err, result.issues, ctx) : {
		success: true,
		data: result.value
	};
};
var COMPILE_INVALID = /* @__PURE__ */ Symbol.for("zod.compile.invalid");
var COMPILE_FALLBACK = /* @__PURE__ */ Symbol.for("zod.compile.fallback");
var validate = ((schema, value, _ctx) => {
	const validator = schema._zod.bag.validator;
	if (validator !== void 0) {
		if (validator(value) !== COMPILE_INVALID) return true;
		if (validator.definite === true && _ctx === void 0) return false;
	}
	return validateFallback(schema, value, _ctx);
});
function validateFallback(schema, value, _ctx) {
	const ctx = _ctx ? {
		..._ctx,
		async: false,
		abortEarly: true
	} : {
		async: false,
		abortEarly: true
	};
	const fallbackRun = schema._zod.bag.fallbackRun;
	let result;
	if (fallbackRun) {
		ctx[COMPILE_FALLBACK] = true;
		result = fallbackRun({
			value,
			issues: []
		}, ctx);
	} else result = schema._zod.run({
		value,
		issues: []
	}, ctx);
	if (result instanceof Promise) throw new $ZodAsyncError();
	return result.issues.length === 0;
}
var validateAsync$1 = async (schema, value, _ctx) => {
	const ctx = _ctx ? {
		..._ctx,
		async: true,
		abortEarly: true
	} : {
		async: true,
		abortEarly: true
	};
	let result = schema._zod.run({
		value,
		issues: []
	}, ctx);
	if (result instanceof Promise) result = await result;
	return result.issues.length === 0;
};
var _encode = (_Err) => {
	const parse = _parse(_Err);
	const fn = (schema, value, _ctx, _params) => {
		const ctx = _ctx ? {
			..._ctx,
			direction: "backward"
		} : { direction: "backward" };
		return parse(schema, value, ctx, finalizeParams(fn, _params));
	};
	return fn;
};
var _decode = (_Err) => {
	const parse = _parse(_Err);
	const fn = (schema, value, _ctx, _params) => {
		return parse(schema, value, _ctx, finalizeParams(fn, _params));
	};
	return fn;
};
var _encodeAsync = (_Err) => {
	const parseAsync = _parseAsync(_Err);
	const fn = async (schema, value, _ctx, _params) => {
		const ctx = _ctx ? {
			..._ctx,
			direction: "backward"
		} : { direction: "backward" };
		return await parseAsync(schema, value, ctx, finalizeParams(fn, _params));
	};
	return fn;
};
var _decodeAsync = (_Err) => {
	const parseAsync = _parseAsync(_Err);
	const fn = async (schema, value, _ctx, _params) => {
		return await parseAsync(schema, value, _ctx, finalizeParams(fn, _params));
	};
	return fn;
};
var _safeEncode = (_Err) => (schema, value, _ctx) => {
	const ctx = _ctx ? {
		..._ctx,
		direction: "backward"
	} : { direction: "backward" };
	return _safeParse(_Err)(schema, value, ctx);
};
var _safeDecode = (_Err) => (schema, value, _ctx) => {
	return _safeParse(_Err)(schema, value, _ctx);
};
var _safeEncodeAsync = (_Err) => async (schema, value, _ctx) => {
	const ctx = _ctx ? {
		..._ctx,
		direction: "backward"
	} : { direction: "backward" };
	return _safeParseAsync(_Err)(schema, value, ctx);
};
var _safeDecodeAsync = (_Err) => async (schema, value, _ctx) => {
	return _safeParseAsync(_Err)(schema, value, _ctx);
};
//#endregion
//#region node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/regexes.js
/**
* @deprecated CUID v1 is deprecated by its authors due to information leakage
* (timestamps embedded in the id). Use {@link cuid2} instead.
* See https://github.com/paralleldrive/cuid.
*/
var cuid = /^[cC][0-9a-z]{6,}$/;
var cuid2 = /^[0-9a-z]+$/;
var ulid = /^[0-7][0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{25}$/;
var xid = /^[0-9a-vA-V]{20}$/;
var ksuid = /^[A-Za-z0-9]{27}$/;
var nanoid = /^[a-zA-Z0-9_-]{21}$/;
function nanoidOfLength(length) {
	return new RegExp(`^[a-zA-Z0-9_-]{${length}}$`);
}
/** ISO 8601-1 duration regex. Does not support the 8601-2 extensions like negative durations or fractional/negative components. */
var duration = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/;
/** A regex for any UUID-like identifier: 8-4-4-4-12 hex pattern */
var guid = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/;
/** Returns a regex for validating an RFC 9562/4122 UUID.
*
* @param version Optionally specify a version 1-8. If no version is specified, all versions are supported. */
var uuid = (version) => {
	if (!version) return /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/;
	return new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${version}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`);
};
/** Practical email validation */
var email = /^(?:[A-Za-z0-9_'+\-]+\.)*[A-Za-z0-9_'+\-]*[A-Za-z0-9_+-]@(?:[A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/;
var _emoji$1 = `^(?=[\\s\\S]*[\\p{Extended_Pictographic}\\p{Regional_Indicator}\\u20E3])[\\p{Extended_Pictographic}\\p{Emoji_Component}]+$`;
function emoji() {
	return new RegExp(_emoji$1, "u");
}
var ipv4 = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
var ipv6 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/;
var cidrv4 = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/;
var cidrv6 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
var base64 = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/;
var base64url = /^(?:[A-Za-z0-9_-]{4})*(?:[A-Za-z0-9_-]{2,3})?$/;
var httpProtocol = /^https?$/;
var e164 = /^\+[1-9]\d{6,14}$/;
var dateSource = `(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))`;
/** Anchors a pattern source. The interpolation lives here rather than at the call site because
* esbuild will not drop a `@__PURE__` call whose own argument interpolates a variable, but it
* will drop `anchor(dateSource)`. Keeping it inline pinned `date` into every bundle. */
function anchor(source) {
	return new RegExp(`^${source}$`);
}
var date = /*@__PURE__*/ anchor(dateSource);
function timeSource(args) {
	const hhmm = `(?:[01]\\d|2[0-3]):[0-5]\\d`;
	return typeof args.precision === "number" ? args.precision === -1 ? `${hhmm}` : args.precision === 0 ? `${hhmm}:[0-5]\\d` : `${hhmm}:[0-5]\\d\\.\\d{${args.precision}}` : args.seconds ? `${hhmm}:[0-5]\\d(?:\\.\\d+)?` : `${hhmm}(?::[0-5]\\d(?:\\.\\d+)?)?`;
}
function time(args) {
	return new RegExp(`^${timeSource(args)}$`);
}
function datetime(args) {
	const opts = ["Z"];
	if (args.offset) opts.push(`([+-](?:[01]\\d|2[0-3]):[0-5]\\d)`);
	const qualified = `${timeSource({
		precision: args.precision,
		seconds: true
	})}(?:${opts.join("|")})`;
	const timeRegex = args.local ? `${qualified}|${timeSource({ precision: args.precision })}` : qualified;
	return new RegExp(`^${dateSource}T(?:${timeRegex})$`);
}
var anyString = /^[\s\S]{0,}$/;
var lowercase = /^[^A-Z]*$/;
var uppercase = /^[^a-z]*$/;
//#endregion
//#region node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/checks.js
var $ZodCheck = /*@__PURE__*/ $constructor("$ZodCheck", (inst, def) => {
	var _a;
	inst._zod ?? (inst._zod = {});
	inst._zod.def = def;
	(_a = inst._zod).onattach ?? (_a.onattach = []);
});
/** Default `when` for length-based checks: run only on non-nullish values with a `length`. */
var _whenHasLength = (payload) => {
	const val = payload.value;
	return !nullish(val) && val.length !== void 0;
};
var $ZodCheckMaxLength = /*@__PURE__*/ $constructor("$ZodCheckMaxLength", (inst, def) => {
	var _a;
	$ZodCheck.init(inst, def);
	(_a = inst._zod.def).when ?? (_a.when = _whenHasLength);
	inst._zod.check = (payload) => {
		const input = payload.value;
		const units = input.length;
		if ((typeof input === "string" && units > def.maximum ? codePointLength(input) : units) <= def.maximum) return;
		const origin = getLengthableOrigin(input);
		payload.issues.push({
			origin,
			code: "too_big",
			maximum: def.maximum,
			inclusive: true,
			input,
			inst,
			continue: !def.abort
		});
	};
});
var $ZodCheckMinLength = /*@__PURE__*/ $constructor("$ZodCheckMinLength", (inst, def) => {
	var _a;
	$ZodCheck.init(inst, def);
	(_a = inst._zod.def).when ?? (_a.when = _whenHasLength);
	inst._zod.check = (payload) => {
		const input = payload.value;
		const units = input.length;
		if ((typeof input === "string" && units >= def.minimum && units < def.minimum * 2 ? codePointLength(input) : units) >= def.minimum) return;
		const origin = getLengthableOrigin(input);
		payload.issues.push({
			origin,
			code: "too_small",
			minimum: def.minimum,
			inclusive: true,
			input,
			inst,
			continue: !def.abort
		});
	};
});
var $ZodCheckLengthEquals = /*@__PURE__*/ $constructor("$ZodCheckLengthEquals", (inst, def) => {
	var _a;
	$ZodCheck.init(inst, def);
	(_a = inst._zod.def).when ?? (_a.when = _whenHasLength);
	inst._zod.check = (payload) => {
		const input = payload.value;
		const units = input.length;
		const length = typeof input === "string" && units >= def.length && units <= def.length * 2 ? codePointLength(input) : units;
		if (length === def.length) return;
		const origin = getLengthableOrigin(input);
		const tooBig = length > def.length;
		payload.issues.push({
			origin,
			...tooBig ? {
				code: "too_big",
				maximum: def.length
			} : {
				code: "too_small",
				minimum: def.length
			},
			inclusive: true,
			exact: true,
			input: payload.value,
			inst,
			continue: !def.abort
		});
	};
});
var $ZodCheckStringFormat = /*@__PURE__*/ $constructor("$ZodCheckStringFormat", (inst, def) => {
	var _a, _b;
	$ZodCheck.init(inst, def);
	if (def.pattern) (_a = inst._zod).check ?? (_a.check = (payload) => {
		def.pattern.lastIndex = 0;
		if (def.pattern.test(payload.value)) return;
		payload.issues.push({
			origin: "string",
			code: "invalid_format",
			format: def.format,
			input: payload.value,
			...def.pattern ? { pattern: def.pattern.toString() } : {},
			inst,
			continue: !def.abort
		});
	});
	else (_b = inst._zod).check ?? (_b.check = () => {});
});
var $ZodCheckRegex = /*@__PURE__*/ $constructor("$ZodCheckRegex", (inst, def) => {
	$ZodCheckStringFormat.init(inst, def);
	inst._zod.check = (payload) => {
		def.pattern.lastIndex = 0;
		if (def.pattern.test(payload.value)) return;
		payload.issues.push({
			origin: "string",
			code: "invalid_format",
			format: "regex",
			input: payload.value,
			pattern: def.pattern.toString(),
			inst,
			continue: !def.abort
		});
	};
});
var $ZodCheckLowerCase = /*@__PURE__*/ $constructor("$ZodCheckLowerCase", (inst, def) => {
	def.pattern ?? (def.pattern = lowercase);
	$ZodCheckStringFormat.init(inst, def);
});
var $ZodCheckUpperCase = /*@__PURE__*/ $constructor("$ZodCheckUpperCase", (inst, def) => {
	def.pattern ?? (def.pattern = uppercase);
	$ZodCheckStringFormat.init(inst, def);
});
var $ZodCheckIncludes = /*@__PURE__*/ $constructor("$ZodCheckIncludes", (inst, def) => {
	$ZodCheck.init(inst, def);
	const escapedRegex = escapeRegex(def.includes);
	def.pattern = new RegExp(typeof def.position === "number" ? `^.{${def.position},}${escapedRegex}` : escapedRegex);
	inst._zod.check = (payload) => {
		if (payload.value.includes(def.includes, def.position)) return;
		payload.issues.push({
			origin: "string",
			code: "invalid_format",
			format: "includes",
			includes: def.includes,
			input: payload.value,
			inst,
			continue: !def.abort
		});
	};
});
var $ZodCheckStartsWith = /*@__PURE__*/ $constructor("$ZodCheckStartsWith", (inst, def) => {
	$ZodCheck.init(inst, def);
	const pattern = new RegExp(`^${escapeRegex(def.prefix)}.*`);
	def.pattern ?? (def.pattern = pattern);
	inst._zod.check = (payload) => {
		if (payload.value.startsWith(def.prefix)) return;
		payload.issues.push({
			origin: "string",
			code: "invalid_format",
			format: "starts_with",
			prefix: def.prefix,
			input: payload.value,
			inst,
			continue: !def.abort
		});
	};
});
var $ZodCheckEndsWith = /*@__PURE__*/ $constructor("$ZodCheckEndsWith", (inst, def) => {
	$ZodCheck.init(inst, def);
	const pattern = new RegExp(`.*${escapeRegex(def.suffix)}$`);
	def.pattern ?? (def.pattern = pattern);
	inst._zod.check = (payload) => {
		if (payload.value.endsWith(def.suffix)) return;
		payload.issues.push({
			origin: "string",
			code: "invalid_format",
			format: "ends_with",
			suffix: def.suffix,
			input: payload.value,
			inst,
			continue: !def.abort
		});
	};
});
var $ZodCheckOverwrite = /*@__PURE__*/ $constructor("$ZodCheckOverwrite", (inst, def) => {
	$ZodCheck.init(inst, def);
	inst._zod.check = (payload) => {
		payload.value = def.tx(payload.value);
	};
});
//#endregion
//#region node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/doc.js
var Doc = class {
	constructor(args = [], closed = {}) {
		this.content = [];
		this.indent = 0;
		this.args = args;
		this.closed = closed;
	}
	indented(fn) {
		this.indent += 1;
		try {
			fn(this);
		} finally {
			this.indent -= 1;
		}
	}
	write(arg) {
		if (typeof arg === "function") {
			arg(this, { execution: "sync" });
			arg(this, { execution: "async" });
			return;
		}
		const lines = arg.split("\n").filter((x) => x);
		const minIndent = Math.min(...lines.map((x) => x.length - x.trimStart().length));
		const dedented = lines.map((x) => x.slice(minIndent)).map((x) => " ".repeat(this.indent * 2) + x);
		for (const line of dedented) this.content.push(line);
	}
	compile() {
		const F = Function;
		const content = this?.content ?? [``];
		return new F(...Object.keys(this.closed), `return function (${this.args.join(", ")}) {\n${content.join("\n")}\n};`)(...Object.values(this.closed));
	}
};
//#endregion
//#region node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/versions.js
var version = {
	major: 4,
	minor: 6,
	patch: 5
};
//#endregion
//#region node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/schemas.js
var $ZodType = /*@__PURE__*/ $constructor("$ZodType", (inst, def) => {
	var _a;
	inst ?? (inst = {});
	inst._zod.def = def;
	inst._zod.bag = inst._zod.bag || {};
	inst._zod.version = version;
	const defChecks = inst._zod.def.checks;
	const checks = inst._zod.traits.has("$ZodCheck") ? [inst, ...defChecks ?? []] : defChecks?.length ? [...defChecks] : [];
	for (const ch of checks) for (const fn of ch._zod.onattach) fn(inst);
	if (checks.length === 0) {
		(_a = inst._zod).deferred ?? (_a.deferred = []);
		inst._zod.deferred?.push(() => {
			inst._zod.run = inst._zod.parse;
		});
	} else {
		const runChecks = (payload, checks, ctx) => {
			if (payload.memo) return payload;
			let isAborted = aborted(payload);
			let asyncResult;
			for (const ch of checks) {
				if (ch._zod.def.when) {
					if (explicitlyAborted(payload)) continue;
					if (!ch._zod.def.when(payload)) continue;
				} else if (isAborted) continue;
				const currLen = payload.issues.length;
				const _ = ch._zod.check(payload);
				if (_ instanceof Promise && ctx?.async === false) throw new $ZodAsyncError();
				if (asyncResult || _ instanceof Promise) asyncResult = (asyncResult ?? Promise.resolve()).then(async () => {
					await _;
					if (payload.issues.length === currLen) return;
					attachSchema(payload.issues, currLen, inst);
					if (!isAborted) isAborted = aborted(payload, currLen);
				});
				else {
					if (payload.issues.length === currLen) continue;
					attachSchema(payload.issues, currLen, inst);
					if (!isAborted) isAborted = aborted(payload, currLen);
				}
			}
			if (asyncResult) return asyncResult.then(() => {
				return payload;
			});
			return payload;
		};
		const handleCanaryResult = (canary, payload, ctx) => {
			if (aborted(canary)) {
				canary.aborted = true;
				return canary;
			}
			const checkResult = runChecks(payload, checks, ctx);
			if (checkResult instanceof Promise) {
				if (ctx.async === false) throw new $ZodAsyncError();
				return checkResult.then((checkResult) => inst._zod.parse(checkResult, ctx));
			}
			return inst._zod.parse(checkResult, ctx);
		};
		inst._zod.run = (payload, ctx) => {
			if (ctx.skipChecks) return inst._zod.parse(payload, ctx);
			if (ctx.direction === "backward") {
				const canary = inst._zod.parse({
					value: payload.value,
					issues: []
				}, {
					...ctx,
					skipChecks: true
				});
				if (canary instanceof Promise) return canary.then((canary) => {
					return handleCanaryResult(canary, payload, ctx);
				});
				return handleCanaryResult(canary, payload, ctx);
			}
			const result = inst._zod.parse(payload, ctx);
			if (result instanceof Promise) {
				if (ctx.async === false) throw new $ZodAsyncError();
				return result.then((result) => runChecks(result, checks, ctx));
			}
			return runChecks(result, checks, ctx);
		};
	}
}, {
	get "~standard"() {
		return hide(this, "~standard", standardProps(this));
	},
	set "~standard"(value) {
		own(this, "~standard", value);
	}
});
/** The Standard Schema surface for `inst`. Shared so wrappers can extend it without forcing it. */
var toStandardResult = (r, ctx) => r.issues.length ? { issues: r.issues.map((iss) => finalizeIssue(iss, ctx, config())) } : { value: r.value };
async function validateAsync(inst, value) {
	const ctx = { async: true };
	return toStandardResult(await inst._zod.run({
		value,
		issues: []
	}, ctx), ctx);
}
function standardProps(inst) {
	return {
		validate: (value) => {
			const ctx = { async: false };
			try {
				const r = inst._zod.run({
					value,
					issues: []
				}, ctx);
				if (!(r instanceof Promise)) return toStandardResult(r, ctx);
			} catch (_) {}
			return validateAsync(inst, value);
		},
		vendor: "zod",
		version: 1
	};
}
var $ZodString = /*@__PURE__*/ $constructor("$ZodString", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.pattern = def.pattern ?? anyString;
	inst._zod.parse = (payload, _) => {
		if (def.coerce) try {
			payload.value = String(payload.value);
		} catch (_) {}
		if (typeof payload.value === "string") return payload;
		payload.issues.push({
			expected: "string",
			code: "invalid_type",
			input: payload.value,
			inst
		});
		return payload;
	};
});
var $ZodStringFormat = /*@__PURE__*/ $constructor("$ZodStringFormat", (inst, def) => {
	$ZodCheckStringFormat.init(inst, def);
	$ZodString.init(inst, def);
});
var $ZodGUID = /*@__PURE__*/ $constructor("$ZodGUID", (inst, def) => {
	def.pattern ?? (def.pattern = guid);
	$ZodStringFormat.init(inst, def);
});
var $ZodUUID = /*@__PURE__*/ $constructor("$ZodUUID", (inst, def) => {
	if (def.version) {
		const v = {
			v1: 1,
			v2: 2,
			v3: 3,
			v4: 4,
			v5: 5,
			v6: 6,
			v7: 7,
			v8: 8
		}[def.version];
		if (v === void 0) throw new Error(`Invalid UUID version: "${def.version}"`);
		def.pattern ?? (def.pattern = uuid(v));
	} else def.pattern ?? (def.pattern = uuid());
	$ZodStringFormat.init(inst, def);
});
var $ZodEmail = /*@__PURE__*/ $constructor("$ZodEmail", (inst, def) => {
	def.pattern ?? (def.pattern = email);
	$ZodStringFormat.init(inst, def);
});
function canParseURL(input) {
	try {
		if (typeof URL !== "undefined" && typeof URL.canParse === "function") return URL.canParse(input);
		new URL(input);
		return true;
	} catch {
		return false;
	}
}
function validateURL(trimmed, def) {
	if (!("normalize" in def) && !("hostname" in def) && !("protocol" in def)) return canParseURL(trimmed) || 2;
	return parseURLObject(trimmed, def);
}
/** Parses a URL while preserving the non-normalizing HTTP guard. */
function parseURLObject(trimmed, def) {
	if (!def.normalize && def.protocol?.source === httpProtocol.source && !/^https?:\/\//i.test(trimmed)) return 1;
	try {
		if (typeof URL !== "undefined") {
			const URLStatic = URL;
			if (typeof URLStatic.parse === "function") return URLStatic.parse(trimmed) ?? 2;
		}
		return new URL(trimmed);
	} catch {
		return 2;
	}
}
var asciiTabOrNewline = /[\t\n\r]/g;
/** The URL parser deletes every ASCII tab, LF and CR from its input before it parses, so `new URL("https://exa\nmple.com")` reports on `example.com`. Applying the same deletion to the returned value closes the half of that divergence which can move the host; the parser's other rewrite, stripping C0 controls at the edges, cannot. */
function stripTabAndNewline(value) {
	return value.replace(asciiTabOrNewline, "");
}
function urlHostnameOk(url, hostname) {
	hostname.lastIndex = 0;
	return hostname.test(url.hostname);
}
function urlProtocolOk(url, protocol) {
	protocol.lastIndex = 0;
	return protocol.test(url.protocol.endsWith(":") ? url.protocol.slice(0, -1) : url.protocol);
}
var $ZodURL = /*@__PURE__*/ $constructor("$ZodURL", (inst, def) => {
	$ZodStringFormat.init(inst, def);
	inst._zod.check = (payload) => {
		try {
			const trimmed = payload.value.trim();
			const url = validateURL(trimmed, def);
			if (url === 1) {
				payload.issues.push({
					code: "invalid_format",
					format: "url",
					note: "Invalid URL format",
					input: payload.value,
					inst,
					continue: !def.abort
				});
				return;
			}
			if (url === 2) {
				payload.issues.push({
					code: "invalid_format",
					format: "url",
					input: payload.value,
					inst,
					continue: !def.abort
				});
				return;
			}
			if (url === true) {
				payload.value = stripTabAndNewline(trimmed);
				return;
			}
			if (def.hostname && !urlHostnameOk(url, def.hostname)) payload.issues.push({
				code: "invalid_format",
				format: "url",
				note: "Invalid hostname",
				pattern: def.hostname.source,
				input: payload.value,
				inst,
				continue: !def.abort
			});
			if (def.protocol && !urlProtocolOk(url, def.protocol)) payload.issues.push({
				code: "invalid_format",
				format: "url",
				note: "Invalid protocol",
				pattern: def.protocol.source,
				input: payload.value,
				inst,
				continue: !def.abort
			});
			payload.value = def.normalize ? url.href : stripTabAndNewline(trimmed);
			return;
		} catch (_) {
			payload.issues.push({
				code: "invalid_format",
				format: "url",
				input: payload.value,
				inst,
				continue: !def.abort
			});
		}
	};
});
var $ZodEmoji = /*@__PURE__*/ $constructor("$ZodEmoji", (inst, def) => {
	def.pattern ?? (def.pattern = emoji());
	$ZodStringFormat.init(inst, def);
});
var $ZodNanoID = /*@__PURE__*/ $constructor("$ZodNanoID", (inst, def) => {
	if (def.length !== void 0 && (!Number.isInteger(def.length) || def.length < 1)) throw new Error(`Invalid nanoid length: ${def.length}`);
	def.pattern ?? (def.pattern = def.length === void 0 ? nanoid : nanoidOfLength(def.length));
	$ZodStringFormat.init(inst, def);
});
/**
* @deprecated CUID v1 is deprecated by its authors due to information leakage
* (timestamps embedded in the id). Use {@link $ZodCUID2} instead.
* See https://github.com/paralleldrive/cuid.
*/
var $ZodCUID = /*@__PURE__*/ $constructor("$ZodCUID", (inst, def) => {
	def.pattern ?? (def.pattern = cuid);
	$ZodStringFormat.init(inst, def);
});
var $ZodCUID2 = /*@__PURE__*/ $constructor("$ZodCUID2", (inst, def) => {
	def.pattern ?? (def.pattern = cuid2);
	$ZodStringFormat.init(inst, def);
});
var $ZodULID = /*@__PURE__*/ $constructor("$ZodULID", (inst, def) => {
	def.pattern ?? (def.pattern = ulid);
	$ZodStringFormat.init(inst, def);
});
var $ZodXID = /*@__PURE__*/ $constructor("$ZodXID", (inst, def) => {
	def.pattern ?? (def.pattern = xid);
	$ZodStringFormat.init(inst, def);
});
var $ZodKSUID = /*@__PURE__*/ $constructor("$ZodKSUID", (inst, def) => {
	def.pattern ?? (def.pattern = ksuid);
	$ZodStringFormat.init(inst, def);
});
var $ZodISODateTime = /*@__PURE__*/ $constructor("$ZodISODateTime", (inst, def) => {
	def.pattern ?? (def.pattern = datetime(def));
	$ZodStringFormat.init(inst, def);
});
var $ZodISODate = /*@__PURE__*/ $constructor("$ZodISODate", (inst, def) => {
	def.pattern ?? (def.pattern = date);
	$ZodStringFormat.init(inst, def);
});
var $ZodISOTime = /*@__PURE__*/ $constructor("$ZodISOTime", (inst, def) => {
	def.pattern ?? (def.pattern = time(def));
	$ZodStringFormat.init(inst, def);
});
var $ZodISODuration = /*@__PURE__*/ $constructor("$ZodISODuration", (inst, def) => {
	def.pattern ?? (def.pattern = duration);
	$ZodStringFormat.init(inst, def);
});
var $ZodIPv4 = /*@__PURE__*/ $constructor("$ZodIPv4", (inst, def) => {
	def.pattern ?? (def.pattern = ipv4);
	$ZodStringFormat.init(inst, def);
});
/** An IPv6 address is written with hex digits, colons and dots, and nothing else. The guard is what makes the check below an IPv6 check: `new URL("http://[...]")` parses an authority, not an address, so `@` and `\` re-delimit it and `"::@1\\"` validates against the host `0.0.0.1`. The URL parser also deletes ASCII tab, LF and CR rather than failing, which is how `"::1\n"` validated as `::1`. */
var ipv6Alphabet = /^[0-9a-fA-F:.]+$/;
function isValidIPv6(value) {
	if (!ipv6Alphabet.test(value)) return false;
	return canParseURL(`http://[${value}]`);
}
var $ZodIPv6 = /*@__PURE__*/ $constructor("$ZodIPv6", (inst, def) => {
	def.pattern ?? (def.pattern = ipv6);
	$ZodStringFormat.init(inst, def);
	inst._zod.check = (payload) => {
		if (!isValidIPv6(payload.value)) payload.issues.push({
			code: "invalid_format",
			format: "ipv6",
			input: payload.value,
			inst,
			continue: !def.abort
		});
	};
});
var $ZodCIDRv4 = /*@__PURE__*/ $constructor("$ZodCIDRv4", (inst, def) => {
	def.pattern ?? (def.pattern = cidrv4);
	$ZodStringFormat.init(inst, def);
});
function isValidCIDRv6(value) {
	const parts = value.split("/");
	if (parts.length !== 2) return false;
	const [address, prefix] = parts;
	if (!prefix) return false;
	const prefixNum = Number(prefix);
	if (`${prefixNum}` !== prefix) return false;
	if (prefixNum < 0 || prefixNum > 128) return false;
	return isValidIPv6(address);
}
var $ZodCIDRv6 = /*@__PURE__*/ $constructor("$ZodCIDRv6", (inst, def) => {
	def.pattern ?? (def.pattern = cidrv6);
	$ZodStringFormat.init(inst, def);
	inst._zod.check = (payload) => {
		if (!isValidCIDRv6(payload.value)) payload.issues.push({
			code: "invalid_format",
			format: "cidrv6",
			input: payload.value,
			inst,
			continue: !def.abort
		});
	};
});
function isValidBase64(data) {
	if (data === "") return true;
	if (/\s/.test(data)) return false;
	if (data.length % 4 !== 0) return false;
	try {
		atob(data);
		return true;
	} catch {
		return false;
	}
}
var base64Charset = /^[0-9a-zA-Z+/]*={0,2}$/;
var $ZodBase64 = /*@__PURE__*/ $constructor("$ZodBase64", (inst, def) => {
	def.pattern ?? (def.pattern = base64Charset);
	$ZodStringFormat.init(inst, def);
	inst._zod.check = (payload) => {
		if (isValidBase64(payload.value)) return;
		payload.issues.push({
			code: "invalid_format",
			format: "base64",
			input: payload.value,
			inst,
			continue: !def.abort
		});
	};
});
var base64urlCharset = /^[A-Za-z0-9_-]*$/;
function isValidBase64URL(data) {
	if (!base64urlCharset.test(data)) return false;
	const base64 = data.replace(/[-_]/g, (c) => c === "-" ? "+" : "/");
	return isValidBase64(base64.padEnd(Math.ceil(base64.length / 4) * 4, "="));
}
var $ZodBase64URL = /*@__PURE__*/ $constructor("$ZodBase64URL", (inst, def) => {
	def.pattern ?? (def.pattern = base64urlCharset);
	$ZodStringFormat.init(inst, def);
	inst._zod.check = (payload) => {
		if (isValidBase64URL(payload.value)) return;
		payload.issues.push({
			code: "invalid_format",
			format: "base64url",
			input: payload.value,
			inst,
			continue: !def.abort
		});
	};
});
var $ZodE164 = /*@__PURE__*/ $constructor("$ZodE164", (inst, def) => {
	def.pattern ?? (def.pattern = e164);
	$ZodStringFormat.init(inst, def);
});
function isValidJWT(token, algorithm = null) {
	try {
		const tokensParts = token.split(".");
		if (tokensParts.length !== 3) return false;
		const [header] = tokensParts;
		if (!header) return false;
		const parsedHeader = JSON.parse(atob(header));
		if ("typ" in parsedHeader && parsedHeader?.typ !== "JWT") return false;
		if (!parsedHeader.alg) return false;
		if (algorithm && (!("alg" in parsedHeader) || parsedHeader.alg !== algorithm)) return false;
		return true;
	} catch {
		return false;
	}
}
var $ZodJWT = /*@__PURE__*/ $constructor("$ZodJWT", (inst, def) => {
	$ZodStringFormat.init(inst, def);
	inst._zod.check = (payload) => {
		if (isValidJWT(payload.value, def.alg)) return;
		payload.issues.push({
			code: "invalid_format",
			format: "jwt",
			input: payload.value,
			inst,
			continue: !def.abort
		});
	};
});
var $ZodUnknown = /*@__PURE__*/ $constructor("$ZodUnknown", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.parse = (payload) => payload;
});
var $ZodNever = /*@__PURE__*/ $constructor("$ZodNever", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.parse = (payload, _ctx) => {
		payload.issues.push({
			expected: "never",
			code: "invalid_type",
			input: payload.value,
			inst
		});
		return payload;
	};
});
function handleArrayResult(result, final, index) {
	if (result.issues.length) final.issues.push(...prefixIssues(index, result.issues));
	final.value[index] = result.value;
}
var $ZodArray = /*@__PURE__*/ $constructor("$ZodArray", (inst, def) => {
	$ZodType.init(inst, def);
	const memo = globalConfig.memoizer;
	memo?.attach(inst);
	inst._zod.parse = (payload, ctx) => {
		const input = payload.value;
		if (!Array.isArray(input)) {
			payload.issues.push({
				expected: "array",
				code: "invalid_type",
				input,
				inst
			});
			return payload;
		}
		payload.value = memo ? memo.alloc(inst, payload, Array(input.length), ctx) : Array(input.length);
		const proms = [];
		const abortEarly = ctx?.abortEarly;
		for (let i = 0; i < input.length; i++) {
			const item = input[i];
			const result = def.element._zod.run({
				value: item,
				issues: []
			}, ctx);
			if (result instanceof Promise) proms.push(result.then((result) => handleArrayResult(result, payload, i)));
			else {
				handleArrayResult(result, payload, i);
				if (abortEarly && result.issues.length !== 0 && aborted(result)) break;
			}
		}
		if (proms.length) return Promise.all(proms).then(() => payload);
		return payload;
	};
});
function handlePropertyResult(result, final, key, input, optin, optout) {
	const isPresent = key in input;
	const isOptionalOut = optout === "optional";
	if (!isPresent && isOptionalOut && optin === "optional") return;
	if (result.issues.length) {
		if (optin !== void 0 && isOptionalOut && !isPresent) return;
		final.issues.push(...prefixIssues(key, result.issues));
	}
	if (!isPresent && optin === void 0) {
		if (!result.issues.length) final.issues.push({
			code: "invalid_type",
			expected: "nonoptional",
			input: void 0,
			path: [key]
		});
		return;
	}
	if (result.value === void 0) {
		if (isPresent || optin === "defaulted" && !isOptionalOut) final.value[key] = void 0;
	} else final.value[key] = result.value;
}
var NO_SYMBOL_KEYS = [];
function normalizeDef(def) {
	const keys = Object.keys(def.shape);
	const ownSymbols = Object.getOwnPropertySymbols(def.shape);
	const symbolKeys = ownSymbols.length ? ownSymbols : NO_SYMBOL_KEYS;
	const allKeys = symbolKeys.length ? [...keys, ...symbolKeys] : keys;
	for (const k of allKeys) if (!def.shape?.[k]?._zod?.traits?.has("$ZodType")) throw new Error(`Invalid element at key "${String(k)}": expected a Zod schema`);
	const okeys = optionalKeys(def.shape);
	return {
		...def,
		allKeys,
		symbolKeys,
		keySet: new Set(keys),
		numKeys: keys.length,
		optionalKeys: new Set(okeys)
	};
}
function handleCatchall(proms, input, payload, ctx, def, inst, abortEarly) {
	const unrecognized = [];
	const keySet = def.keySet;
	const _catchall = def.catchall._zod;
	const t = _catchall.def.type;
	const optin = _catchall.optin;
	const optout = _catchall.optout;
	let seen = 0;
	for (const key in input) {
		if (abortEarly && payload.issues.length !== seen) {
			if (aborted(payload, seen)) break;
			seen = payload.issues.length;
		}
		if (keySet.has(key)) continue;
		if (key === "__proto__") {
			if (t === "never") unrecognized.push(key);
			continue;
		}
		if (t === "never") {
			unrecognized.push(key);
			continue;
		}
		const r = _catchall.run({
			value: input[key],
			issues: []
		}, ctx);
		if (r instanceof Promise) proms.push(r.then((r) => handlePropertyResult(r, payload, key, input, optin, optout)));
		else handlePropertyResult(r, payload, key, input, optin, optout);
	}
	if (unrecognized.length) payload.issues.push({
		code: "unrecognized_keys",
		keys: unrecognized,
		input,
		inst,
		continue: true
	});
	if (!proms.length) return payload;
	return Promise.all(proms).then(() => {
		return payload;
	});
}
var $ZodObject = /*@__PURE__*/ $constructor("$ZodObject", (inst, def) => {
	$ZodType.init(inst, def);
	const desc = Object.getOwnPropertyDescriptor(def, "shape");
	const sh = desc?.get ? desc.get.raw : def.shape ?? {};
	if (sh) {
		const get = () => {
			const newSh = { ...sh };
			Object.defineProperty(def, "shape", { value: newSh });
			get.raw = newSh;
			return newSh;
		};
		get.raw = sh;
		Object.defineProperty(def, "shape", { get });
	}
	const _normalized = cached(() => normalizeDef(def));
	defineLazyInternal(inst, "propValues", (zod) => {
		const shape = zod.def.shape;
		const propValues = {};
		for (const key in shape) {
			const field = shape[key]._zod;
			if (field.values) {
				if (!Object.prototype.hasOwnProperty.call(propValues, key)) assignProp(propValues, key, /* @__PURE__ */ new Set());
				for (const v of field.values) propValues[key].add(v);
				if (field.optin !== void 0) propValues[key].add(void 0);
			}
		}
		return propValues;
	});
	const isObject$2 = isObject;
	const catchall = def.catchall;
	let value;
	const memo = globalConfig.memoizer;
	memo?.attach(inst);
	inst._zod.parse = (payload, ctx) => {
		value ?? (value = _normalized.value);
		const input = payload.value;
		if (!isObject$2(input)) {
			payload.issues.push({
				expected: "object",
				code: "invalid_type",
				input,
				inst
			});
			return payload;
		}
		payload.value = memo ? memo.alloc(inst, payload, {}, ctx) : {};
		const proms = [];
		const shape = value.shape;
		const abortEarly = ctx?.abortEarly;
		let seen = payload.issues.length;
		for (const key of value.allKeys) {
			if (abortEarly && payload.issues.length !== seen) {
				if (aborted(payload, seen)) break;
				seen = payload.issues.length;
			}
			if (key === "__proto__") continue;
			const el = shape[key];
			const optin = el._zod.optin;
			const optout = el._zod.optout;
			const r = el._zod.run({
				value: input[key],
				issues: []
			}, ctx);
			if (r instanceof Promise) proms.push(r.then((r) => handlePropertyResult(r, payload, key, input, optin, optout)));
			else handlePropertyResult(r, payload, key, input, optin, optout);
		}
		if (!catchall) return proms.length ? Promise.all(proms).then(() => payload) : payload;
		return handleCatchall(proms, input, payload, ctx, _normalized.value, inst, abortEarly === true);
	};
});
var $ZodObjectJIT = /*@__PURE__*/ $constructor("$ZodObjectJIT", (inst, def) => {
	$ZodObject.init(inst, def);
	const superParse = inst._zod.parse;
	const _normalized = cached(() => normalizeDef(def));
	const memo = globalConfig.memoizer;
	const generateFastpass = (shape) => {
		const normalized = _normalized.value;
		const syms = normalized.symbolKeys;
		const doc = new Doc(["payload", "ctx"], {
			shape,
			inst,
			memo,
			syms
		});
		const parseStr = (k) => `shape[${k}]._zod.run({ value: input[${k}], issues: [] }, ctx)`;
		const prefixStr = (id, k) => `
          let ${id}_ab = false;
          for (let i = 0; i < ${id}.issues.length; i++) {
            const iss = ${id}.issues[i];
            iss.path = iss.path ? [${k}, ...iss.path] : [${k}];
            payload.issues.push(iss);
            if (iss.continue !== true) ${id}_ab = true;
          }
          if (${id}_ab && ctx && ctx.abortEarly) {
            payload.value = newResult;
            return payload;
          }`;
		doc.write(`const input = payload.value;`);
		const ids = Object.create(null);
		let counter = 0;
		for (const key of normalized.allKeys) ids[key] = `key_${counter++}`;
		doc.write(memo ? `const newResult = memo.alloc(inst, payload, {}, ctx);` : `const newResult = {};`);
		for (const key of normalized.allKeys) {
			if (key === "__proto__") continue;
			const id = ids[key];
			const k = typeof key === "symbol" ? `syms[${syms.indexOf(key)}]` : esc(key);
			const isPresent = `${k} in input`;
			const schema = shape[key];
			const optin = schema?._zod?.optin;
			const isOptionalIn = optin !== void 0;
			const isOptionalOut = schema?._zod?.optout === "optional";
			doc.write(`const ${id} = ${parseStr(k)};`);
			if (isOptionalIn && isOptionalOut) {
				const assign = optin === "optional" ? `${id}_present` : `${id}.value !== undefined || ${id}_present`;
				doc.write(`
        const ${id}_present = ${isPresent};
        if (!${id}.issues.length || ${id}_present) {
          if (${id}.issues.length) {${prefixStr(id, k)}
          }

          if (${assign}) {
            newResult[${k}] = ${id}.value;
          }
        }

      `);
			} else if (!isOptionalIn) doc.write(`
        const ${id}_present = ${isPresent};
        if (${id}.issues.length) {${prefixStr(id, k)}
        }
        if (!${id}_present && !${id}.issues.length) {
          payload.issues.push({
            code: "invalid_type",
            expected: "nonoptional",
            input: undefined,
            path: [${k}]
          });
          if (ctx && ctx.abortEarly) {
            payload.value = newResult;
            return payload;
          }
        }

        if (${id}_present) {
          newResult[${k}] = ${id}.value;
        }

      `);
			else {
				doc.write(`
        if (${id}.issues.length) {${prefixStr(id, k)}
        }
      `);
				if (optin === "defaulted") doc.write(`newResult[${k}] = ${id}.value;`);
				else doc.write(`
        if (${id}.value !== undefined || ${isPresent}) {
          newResult[${k}] = ${id}.value;
        }
      `);
			}
		}
		doc.write(`payload.value = newResult;`);
		doc.write(`return payload;`);
		return doc.compile();
	};
	let fastpass;
	const isObject$1 = isObject;
	const jit = !globalConfig.jitless;
	const fastEnabled = jit && allowsEval.value;
	const catchall = def.catchall;
	let value;
	inst._zod.parse = (payload, ctx) => {
		value ?? (value = _normalized.value);
		const input = payload.value;
		if (!isObject$1(input)) {
			payload.issues.push({
				expected: "object",
				code: "invalid_type",
				input,
				inst
			});
			return payload;
		}
		if (jit && fastEnabled && ctx?.async === false && ctx.jitless !== true) {
			if (!fastpass) fastpass = generateFastpass(def.shape);
			payload = fastpass(payload, ctx);
			if (!catchall) return payload;
			return handleCatchall([], input, payload, ctx, value, inst, ctx?.abortEarly === true);
		}
		return superParse(payload, ctx);
	};
});
function handleUnionResults(results, final, inst, ctx) {
	for (const result of results) if (result.issues.length === 0) {
		final.value = result.value;
		return final;
	}
	const nonaborted = results.filter((r) => !aborted(r));
	if (nonaborted.length === 1) {
		final.value = nonaborted[0].value;
		return nonaborted[0];
	}
	final.issues.push({
		code: "invalid_union",
		input: final.value,
		inst,
		errors: results.map((result) => result.issues.map((iss) => finalizeIssue(iss, ctx, config())))
	});
	return final;
}
var $ZodUnion = /*@__PURE__*/ $constructor("$ZodUnion", (inst, def) => {
	$ZodType.init(inst, def);
	defineLazyInternal(inst, "optin", (zod) => zod.def.options.some((o) => o._zod.optin === "defaulted") ? "defaulted" : zod.def.options.some((o) => o._zod.optin !== void 0) ? "optional" : void 0);
	defineLazyInternal(inst, "optout", (zod) => zod.def.options.some((o) => o._zod.optout === "optional") ? "optional" : void 0);
	defineLazyInternal(inst, "values", (zod) => {
		if (zod.def.options.every((o) => o._zod.values)) return new Set(zod.def.options.flatMap((option) => Array.from(option._zod.values)));
	});
	defineLazyInternal(inst, "pattern", (zod) => {
		if (zod.def.options.every((o) => o._zod.pattern)) {
			const patterns = zod.def.options.map((o) => o._zod.pattern);
			return new RegExp(`^(${patterns.map((p) => cleanRegex(p.source)).join("|")})$`);
		}
	});
	const first = def.options.length === 1 ? def.options[0]._zod.run : null;
	inst._zod.parse = (payload, ctx) => {
		if (first) return first(payload, ctx);
		let async = false;
		const results = [];
		for (const option of def.options) {
			const result = option._zod.run({
				value: payload.value,
				issues: []
			}, ctx);
			if (result instanceof Promise) {
				results.push(result);
				async = true;
			} else {
				if (result.issues.length === 0) return result;
				results.push(result);
			}
		}
		if (!async) return handleUnionResults(results, payload, inst, ctx);
		return Promise.all(results).then((results) => {
			return handleUnionResults(results, payload, inst, ctx);
		});
	};
});
var $ZodIntersection = /*@__PURE__*/ $constructor("$ZodIntersection", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.parse = (payload, ctx) => {
		const input = payload.value;
		const left = def.left._zod.run({
			value: input,
			issues: []
		}, ctx);
		const right = def.right._zod.run({
			value: input,
			issues: []
		}, ctx);
		if (left instanceof Promise || right instanceof Promise) return Promise.all([left, right]).then(([left, right]) => {
			return handleIntersectionResults(payload, left, right);
		});
		return handleIntersectionResults(payload, left, right);
	};
});
function mergeValues(a, b) {
	if (a === b) return {
		valid: true,
		data: a
	};
	if (a instanceof Date && b instanceof Date && +a === +b) return {
		valid: true,
		data: a
	};
	if (isPlainObject(a) && isPlainObject(b)) {
		const bKeys = Object.keys(b);
		const sharedKeys = Object.keys(a).filter((key) => bKeys.indexOf(key) !== -1);
		const newObj = {
			...a,
			...b
		};
		if (Object.prototype.hasOwnProperty.call(newObj, "__proto__")) delete newObj.__proto__;
		for (const key of sharedKeys) {
			if (key === "__proto__") continue;
			const sharedValue = mergeValues(a[key], b[key]);
			if (!sharedValue.valid) return {
				valid: false,
				mergeErrorPath: [key, ...sharedValue.mergeErrorPath]
			};
			newObj[key] = sharedValue.data;
		}
		return {
			valid: true,
			data: newObj
		};
	}
	if (Array.isArray(a) && Array.isArray(b)) {
		if (a.length !== b.length) return {
			valid: false,
			mergeErrorPath: []
		};
		const newArray = [];
		for (let index = 0; index < a.length; index++) {
			const itemA = a[index];
			const itemB = b[index];
			const sharedValue = mergeValues(itemA, itemB);
			if (!sharedValue.valid) return {
				valid: false,
				mergeErrorPath: [index, ...sharedValue.mergeErrorPath]
			};
			newArray.push(sharedValue.data);
		}
		return {
			valid: true,
			data: newArray
		};
	}
	return {
		valid: false,
		mergeErrorPath: []
	};
}
function handleIntersectionResults(result, left, right) {
	const unrecKeys = /* @__PURE__ */ new Map();
	let unrecIssue;
	const keyIssues = /* @__PURE__ */ new Map();
	const collect = (iss, side) => {
		let keys;
		if (iss.code === "unrecognized_keys" && !iss.path?.length) {
			unrecIssue ?? (unrecIssue = iss);
			keys = iss.keys;
		} else if (iss.code === "invalid_key" && iss.origin === "record" && iss.path?.length === 1) {
			const k = String(iss.path[0]);
			if (!keyIssues.has(k)) keyIssues.set(k, iss);
			keys = [k];
		} else return false;
		for (const k of keys) {
			if (!unrecKeys.has(k)) unrecKeys.set(k, {});
			unrecKeys.get(k)[side] = true;
		}
		return true;
	};
	for (const iss of left.issues) if (!collect(iss, "l")) result.issues.push(iss);
	for (const iss of right.issues) if (!collect(iss, "r")) result.issues.push(iss);
	const bothKeys = [...unrecKeys].filter(([, f]) => f.l && f.r).map(([k]) => k);
	if (bothKeys.length) {
		const aggregated = unrecIssue ? bothKeys.filter((k) => unrecIssue.keys.includes(k)) : [];
		if (aggregated.length) result.issues.push({
			...unrecIssue,
			keys: aggregated
		});
		for (const k of bothKeys) if (!aggregated.includes(k) && keyIssues.has(k)) result.issues.push(keyIssues.get(k));
	}
	const merged = mergeValues(left.value, right.value);
	if (!merged.valid) {
		if (aborted(result)) return result;
		throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(merged.mergeErrorPath)}`);
	}
	result.value = merged.data;
	return result;
}
var $ZodEnum = /*@__PURE__*/ $constructor("$ZodEnum", (inst, def) => {
	$ZodType.init(inst, def);
	const values = getEnumValues(def.entries);
	const valuesSet = new Set(values);
	inst._zod.values = valuesSet;
	defineLazyInternal(inst, "pattern", (zod) => {
		const patternValues = getEnumValues(zod.def.entries).filter((k) => propertyKeyTypes.has(typeof k));
		return new RegExp(patternValues.length ? `^(${patternValues.map((o) => escapeRegex(o.toString())).join("|")})$` : "^[^\\s\\S]$");
	});
	inst._zod.parse = (payload, _ctx) => {
		const input = payload.value;
		if (valuesSet.has(input)) return payload;
		payload.issues.push({
			code: "invalid_value",
			values,
			input,
			inst
		});
		return payload;
	};
});
var $ZodTransform = /*@__PURE__*/ $constructor("$ZodTransform", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.optin = "optional";
	globalConfig.memoizer?.guard(inst);
	inst._zod.parse = (payload, ctx) => {
		if (ctx.direction === "backward") throw new $ZodEncodeError(inst.constructor.name);
		const _out = def.transform(payload.value, payload);
		if (ctx.async) return (_out instanceof Promise ? _out : Promise.resolve(_out)).then((output) => {
			payload.value = output;
			return payload;
		});
		if (_out instanceof Promise) throw new $ZodAsyncError();
		payload.value = _out;
		return payload;
	};
});
function handleOptionalResult(payload, result) {
	payload.value = result.issues.length ? void 0 : result.value;
	return payload;
}
var $ZodOptional = /*@__PURE__*/ $constructor("$ZodOptional", (inst, def) => {
	$ZodType.init(inst, def);
	defineLazyInternal(inst, "optin", (zod) => zod.def.innerType._zod.optin === "defaulted" ? "defaulted" : "optional");
	inst._zod.optout = "optional";
	defineLazyInternal(inst, "values", (zod) => {
		const values = zod.def.innerType._zod.values;
		return values ? /* @__PURE__ */ new Set([...values, void 0]) : void 0;
	});
	defineLazyInternal(inst, "pattern", (zod) => {
		const pattern = zod.def.innerType._zod.pattern;
		return pattern ? new RegExp(`^(${cleanRegex(pattern.source)})?$`) : void 0;
	});
	inst._zod.parse = (payload, ctx) => {
		if (payload.value === void 0) {
			if (def.innerType._zod.optin !== "defaulted") return payload;
			const result = def.innerType._zod.run({
				value: payload.value,
				issues: []
			}, ctx);
			if (result instanceof Promise) return result.then((result) => handleOptionalResult(payload, result));
			return handleOptionalResult(payload, result);
		}
		return def.innerType._zod.run(payload, ctx);
	};
});
var $ZodExactOptional = /*@__PURE__*/ $constructor("$ZodExactOptional", (inst, def) => {
	$ZodOptional.init(inst, def);
	defineLazyInternal(inst, "values", (zod) => zod.def.innerType._zod.values);
	defineLazyInternal(inst, "pattern", (zod) => zod.def.innerType._zod.pattern);
	inst._zod.parse = (payload, ctx) => {
		return def.innerType._zod.run(payload, ctx);
	};
});
var $ZodNullable = /*@__PURE__*/ $constructor("$ZodNullable", (inst, def) => {
	$ZodType.init(inst, def);
	defineLazyInternal(inst, "optin", (zod) => zod.def.innerType._zod.optin);
	defineLazyInternal(inst, "optout", (zod) => zod.def.innerType._zod.optout);
	defineLazyInternal(inst, "pattern", (zod) => {
		const pattern = zod.def.innerType._zod.pattern;
		return pattern ? new RegExp(`^(${cleanRegex(pattern.source)}|null)$`) : void 0;
	});
	defineLazyInternal(inst, "values", (zod) => {
		return zod.def.innerType._zod.values ? /* @__PURE__ */ new Set([...zod.def.innerType._zod.values, null]) : void 0;
	});
	inst._zod.parse = (payload, ctx) => {
		if (payload.value === null) return payload;
		return def.innerType._zod.run(payload, ctx);
	};
});
var $ZodDefault = /*@__PURE__*/ $constructor("$ZodDefault", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.optin = "defaulted";
	defineLazyInternal(inst, "values", (zod) => zod.def.innerType._zod.values);
	inst._zod.parse = (payload, ctx) => {
		if (ctx.direction === "backward") return def.innerType._zod.run(payload, ctx);
		if (payload.value === void 0) {
			payload.value = def.defaultValue;
			/**
			* $ZodDefault returns the default value immediately in forward direction.
			* It doesn't pass the default value into the validator ("prefault"). There's no reason to pass the default value through validation. The validity of the default is enforced by TypeScript statically. Otherwise, it's the responsibility of the user to ensure the default is valid. In the case of pipes with divergent in/out types, you can specify the default on the `in` schema of your ZodPipe to set a "prefault" for the pipe.   */
			return payload;
		}
		const result = def.innerType._zod.run(payload, ctx);
		if (result instanceof Promise) return result.then((result) => handleDefaultResult(result, def));
		return handleDefaultResult(result, def);
	};
});
function handleDefaultResult(payload, def) {
	if (payload.value === void 0) payload.value = def.defaultValue;
	return payload;
}
var $ZodPrefault = /*@__PURE__*/ $constructor("$ZodPrefault", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.optin = "defaulted";
	defineLazyInternal(inst, "values", (zod) => zod.def.innerType._zod.values);
	inst._zod.parse = (payload, ctx) => {
		if (ctx.direction === "backward") return def.innerType._zod.run(payload, ctx);
		if (payload.value === void 0) payload.value = def.defaultValue;
		return def.innerType._zod.run(payload, ctx);
	};
});
var $ZodNonOptional = /*@__PURE__*/ $constructor("$ZodNonOptional", (inst, def) => {
	$ZodType.init(inst, def);
	defineLazyInternal(inst, "values", (zod) => {
		const v = zod.def.innerType._zod.values;
		return v ? new Set([...v].filter((x) => x !== void 0)) : void 0;
	});
	inst._zod.parse = (payload, ctx) => {
		const result = def.innerType._zod.run(payload, ctx);
		if (result instanceof Promise) return result.then((result) => handleNonOptionalResult(result, inst));
		return handleNonOptionalResult(result, inst);
	};
});
function handleNonOptionalResult(payload, inst) {
	if (!payload.issues.length && payload.value === void 0) payload.issues.push({
		code: "invalid_type",
		expected: "nonoptional",
		input: payload.value,
		inst
	});
	return payload;
}
function handleCatchResult(payload, result, def, ctx) {
	if (!result.issues.length) {
		payload.value = result.value;
		if (result.memo) payload.memo = true;
		return payload;
	}
	payload.value = def.catchValue({
		...result,
		value: payload.value,
		error: { issues: result.issues.map((iss) => finalizeIssue(iss, ctx, config())) },
		input: payload.value
	});
	return payload;
}
var $ZodCatch = /*@__PURE__*/ $constructor("$ZodCatch", (inst, def) => {
	$ZodType.init(inst, def);
	defineLazyInternal(inst, "optin", (zod) => zod.def.innerType._zod.optin === "defaulted" ? "defaulted" : "optional");
	defineLazyInternal(inst, "optout", (zod) => zod.def.innerType._zod.optout);
	defineLazyInternal(inst, "values", (zod) => zod.def.innerType._zod.values);
	inst._zod.parse = (payload, ctx) => {
		if (ctx.direction === "backward") return def.innerType._zod.run(payload, ctx);
		const result = def.innerType._zod.run({
			value: payload.value,
			issues: []
		}, ctx);
		if (result instanceof Promise) return result.then((result) => handleCatchResult(payload, result, def, ctx));
		return handleCatchResult(payload, result, def, ctx);
	};
});
var $ZodPipe = /*@__PURE__*/ $constructor("$ZodPipe", (inst, def) => {
	$ZodType.init(inst, def);
	defineLazyInternal(inst, "values", (zod) => zod.def.in._zod.values);
	defineLazyInternal(inst, "optin", (zod) => zod.def.in._zod.optin);
	defineLazyInternal(inst, "optout", (zod) => zod.def.out._zod.optout);
	defineLazyInternal(inst, "propValues", (zod) => zod.def.in._zod.propValues);
	inst._zod.parse = (payload, ctx) => {
		if (ctx.direction === "backward") {
			const right = def.out._zod.run(payload, ctx);
			if (right instanceof Promise) return right.then((right) => handlePipeResult(right, def.in, ctx));
			return handlePipeResult(right, def.in, ctx);
		}
		const left = def.in._zod.run(payload, ctx);
		if (left instanceof Promise) return left.then((left) => handlePipeResult(left, def.out, ctx));
		return handlePipeResult(left, def.out, ctx);
	};
});
function handlePipeResult(left, next, ctx) {
	if (left.issues.some((iss) => iss.code !== "unrecognized_keys")) {
		left.aborted = true;
		return left;
	}
	return next._zod.run({
		value: left.value,
		issues: left.issues
	}, ctx);
}
var $ZodReadonly = /*@__PURE__*/ $constructor("$ZodReadonly", (inst, def) => {
	$ZodType.init(inst, def);
	defineLazyInternal(inst, "propValues", (zod) => zod.def.innerType._zod.propValues);
	defineLazyInternal(inst, "values", (zod) => zod.def.innerType._zod.values);
	defineLazyInternal(inst, "optin", (zod) => zod.def.innerType?._zod?.optin);
	defineLazyInternal(inst, "optout", (zod) => zod.def.innerType?._zod?.optout);
	inst._zod.parse = (payload, ctx) => {
		if (ctx.direction === "backward") return def.innerType._zod.run(payload, ctx);
		const result = def.innerType._zod.run(payload, ctx);
		if (result instanceof Promise) return result.then(handleReadonlyResult);
		return handleReadonlyResult(result);
	};
});
function handleReadonlyResult(payload) {
	if (!payload.memo) payload.value = Object.freeze(payload.value);
	return payload;
}
var $ZodCustom = /*@__PURE__*/ $constructor("$ZodCustom", (inst, def) => {
	$ZodCheck.init(inst, def);
	$ZodType.init(inst, def);
	inst._zod.parse = (payload, _) => {
		return payload;
	};
	inst._zod.check = (payload) => {
		const input = payload.value;
		const r = def.fn(input);
		if (r instanceof Promise) return r.then((r) => handleRefineResult(r, payload, input, inst));
		handleRefineResult(r, payload, input, inst);
	};
});
function handleRefineResult(result, payload, input, inst) {
	if (!result) {
		const _iss = {
			code: "custom",
			input,
			inst,
			path: [...inst._zod.def.path ?? []],
			continue: !inst._zod.def.abort
		};
		if (inst._zod.def.params) _iss.params = inst._zod.def.params;
		payload.issues.push(issue(_iss));
	}
}
//#endregion
//#region node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/memoizer.js
var $ZodCyclicError = class extends Error {
	constructor() {
		super(`Cannot parse a reference cycle that closes through a transform`);
		this.name = "ZodCyclicError";
	}
};
/** Keyed off the context object every schema in one parse call already shares. */
var STATE = "~memo";
var NO_ISSUES = [];
function isRef(value) {
	return value !== null && typeof value === "object";
}
function cloneIssues(issues) {
	return issues.map((iss) => iss.path ? {
		...iss,
		path: iss.path.slice()
	} : { ...iss });
}
var recursive = /*@__PURE__*/ new WeakMap();
/** What the walk established, in order of certainty: ordered so the strongest answer among children wins. */
var NONE = 0;
var ASSUMED = 1;
var PROVEN = 2;
/** Whether this schema's subtree contains a cycle, so one parse can re-enter it. */
function isRecursive(inst, stack, resolve) {
	const cached = recursive.get(inst);
	if (cached !== void 0) return cached ? PROVEN : NONE;
	if (stack.has(inst)) return PROVEN;
	stack.add(inst);
	let result = NONE;
	const check = (child) => {
		if (result !== PROVEN && child?._zod) {
			const answer = isRecursive(child, stack, resolve);
			if (answer > result) result = answer;
		}
	};
	const shape = (sh, spread) => {
		let answer = NONE;
		for (const key of Reflect.ownKeys(sh)) {
			const desc = Object.getOwnPropertyDescriptor(sh, key);
			if (spread && !desc.enumerable) continue;
			const child = desc.get ? ASSUMED : desc.value?._zod ? isRecursive(desc.value, stack, resolve) : NONE;
			if (child > answer) answer = child;
		}
		return answer;
	};
	const merge = (answer) => {
		if (answer > result) result = answer;
	};
	const def = inst._zod.def;
	switch (def.type) {
		case "object": {
			const raw = rawShape(def);
			merge(raw ? shape(raw, true) : ASSUMED);
			check(def.catchall);
			break;
		}
		case "array":
			check(def.element);
			break;
		case "tuple":
			for (const el of def.items) check(el);
			check(def.rest);
			break;
		case "record":
		case "map":
			check(def.keyType);
			check(def.valueType);
			break;
		case "set":
			check(def.valueType);
			break;
		case "union":
			for (const el of def.options) check(el);
			break;
		case "intersection":
			check(def.left);
			check(def.right);
			break;
		case "optional":
		case "nullable":
		case "default":
		case "prefault":
		case "catch":
		case "readonly":
		case "nonoptional":
		case "promise":
		case "success":
			check(def.innerType);
			break;
		case "pipe":
			check(def.in);
			check(def.out);
			break;
		case "function":
			check(def.input);
			check(def.output);
			break;
		case "lazy": {
			const inner = def._cachedInner ?? (resolve ? inst._zod.innerType : void 0);
			merge(inner ? isRecursive(inner, stack, false) : ASSUMED);
			break;
		}
		case "template_literal":
		case "string":
		case "number":
		case "int":
		case "boolean":
		case "bigint":
		case "symbol":
		case "undefined":
		case "null":
		case "void":
		case "never":
		case "any":
		case "unknown":
		case "date":
		case "nan":
		case "enum":
		case "literal":
		case "file":
		case "transform":
		case "custom": break;
		default: for (const key in def) {
			const desc = Object.getOwnPropertyDescriptor(def, key);
			if (!desc || desc.get) continue;
			const value = desc.value;
			if (!value || typeof value !== "object") continue;
			if (value._zod) check(value);
			else if (Array.isArray(value)) for (const el of value) check(el);
		}
	}
	stack.delete(inst);
	return settle(inst, result);
}
/** An assumed answer must not outlive the resolution that settles it, so only a certain one is cached. */
function settle(inst, answer) {
	if (answer !== ASSUMED) recursive.set(inst, answer === PROVEN);
	return answer;
}
function bucketFor(state, inst) {
	let bucket = state.buckets.get(inst);
	if (!bucket) {
		bucket = /* @__PURE__ */ new WeakMap();
		state.buckets.set(inst, bucket);
	}
	return bucket;
}
var handoff;
var open = [];
var memo = {
	alloc(_inst, payload, empty) {
		const bucket = handoff;
		if (!bucket) return empty;
		handoff = void 0;
		const entry = {
			value: empty,
			issues: null
		};
		bucket.set(payload.value, entry);
		open.push(entry);
		return empty;
	},
	guard(inst) {
		var _a;
		(_a = inst._zod).deferred ?? (_a.deferred = []);
		inst._zod.deferred.push(() => {
			const base = inst._zod.parse;
			const wrapped = (payload, ctx) => {
				if (ctx.direction !== "backward" && isBackEdge(ctx, payload.value)) throw new $ZodCyclicError();
				return base(payload, ctx);
			};
			inst._zod.parse = wrapped;
			if (inst._zod.run === base) inst._zod.run = wrapped;
		});
	},
	attach(inst) {
		var _a;
		let isRecursiveInst;
		let rechecked = false;
		let lastCtx;
		let lastBucket;
		(_a = inst._zod).deferred ?? (_a.deferred = []);
		inst._zod.deferred.push(() => {
			const base = inst._zod.parse;
			const wrapped = (payload, ctx) => {
				if (isRecursiveInst === void 0) {
					const walked = isRecursive(inst, /* @__PURE__ */ new Set(), false);
					if (walked === NONE) {
						inst._zod.parse = base;
						if (inst._zod.run === wrapped) inst._zod.run = base;
						return base(payload, ctx);
					}
					if (walked === PROVEN || rechecked) isRecursiveInst = true;
					else rechecked = true;
				}
				const input = payload.value;
				if (!isRef(input)) return base(payload, ctx);
				let state = ctx[STATE];
				if (!state) {
					state = {
						buckets: /* @__PURE__ */ new WeakMap(),
						backEdges: void 0
					};
					ctx[STATE] = state;
				}
				let bucket;
				if (lastCtx === ctx) bucket = lastBucket;
				else {
					bucket = bucketFor(state, inst);
					lastCtx = ctx;
					lastBucket = bucket;
				}
				const hit = bucket.get(input);
				if (hit) {
					payload.value = hit.value;
					if (hit.issues) {
						if (hit.issues.length) payload.issues.push(...cloneIssues(hit.issues));
					} else {
						payload.memo = true;
						state.backEdges ?? (state.backEdges = /* @__PURE__ */ new WeakSet());
						state.backEdges.add(hit.value);
					}
					return payload;
				}
				handoff = bucket;
				const depth = open.length;
				const result = base(payload, ctx);
				handoff = void 0;
				const entry = open.length > depth ? open.pop() : void 0;
				if (result instanceof Promise) return result.then((r) => {
					if (entry) entry.issues = r.issues.length ? cloneIssues(r.issues) : NO_ISSUES;
					return r;
				});
				if (entry) entry.issues = result.issues.length ? cloneIssues(result.issues) : NO_ISSUES;
				return result;
			};
			inst._zod.parse = wrapped;
			if (inst._zod.run === base) inst._zod.run = wrapped;
		});
	}
};
/** The memoizer that gives containers cycle support. `zod` installs it by default; `zod/mini` opts in with `config({ memoizer: memoizer() })`. */
function memoizer() {
	return memo;
}
/** Whether this value is a node a back-edge resolved to before it finished. */
function isBackEdge(ctx, value) {
	const backEdges = ctx[STATE]?.backEdges;
	return backEdges !== void 0 && isRef(value) && backEdges.has(value);
}
//#endregion
//#region node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/locales/en.js
var error = () => {
	const Sizable = {
		string: {
			unit: "characters",
			verb: "to have"
		},
		file: {
			unit: "bytes",
			verb: "to have"
		},
		array: {
			unit: "items",
			verb: "to have"
		},
		set: {
			unit: "items",
			verb: "to have"
		},
		map: {
			unit: "entries",
			verb: "to have"
		}
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	const FormatDictionary = {
		regex: "input",
		email: "email address",
		url: "URL",
		emoji: "emoji",
		uuid: "UUID",
		uuidv4: "UUIDv4",
		uuidv6: "UUIDv6",
		nanoid: "nanoid",
		guid: "GUID",
		cuid: "cuid",
		cuid2: "cuid2",
		ulid: "ULID",
		xid: "XID",
		ksuid: "KSUID",
		datetime: "ISO datetime",
		date: "ISO date",
		time: "ISO time",
		duration: "ISO duration",
		ipv4: "IPv4 address",
		ipv6: "IPv6 address",
		mac: "MAC address",
		cidrv4: "IPv4 range",
		cidrv6: "IPv6 range",
		base64: "base64-encoded string",
		base64url: "base64url-encoded string",
		json_string: "JSON string",
		e164: "E.164 number",
		currency_code: "currency code",
		credit_card: "credit card number",
		iban: "IBAN",
		jwt: "JWT",
		template_literal: "input"
	};
	const TypeDictionary = { nan: "NaN" };
	function getTypeName(type, input) {
		if (type === "number" && typeof input === "number" && !Number.isFinite(input)) return String(input);
		return TypeDictionary[type] ?? type;
	}
	return (issue) => {
		switch (issue.code) {
			case "invalid_type": return `Invalid input: expected ${getTypeName(issue.expected)}, received ${getTypeName(parsedType(issue.input), issue.input)}`;
			case "invalid_value":
				if (issue.values.length === 1) return `Invalid input: expected ${stringifyPrimitive(issue.values[0])}`;
				return `Invalid option: expected one of ${joinValues(issue.values, "|")}`;
			case "too_big": {
				const adj = issue.exact ? "exactly " : issue.inclusive ? "<=" : "<";
				const sizing = getSizing(issue.origin);
				if (sizing) return `Too big: expected ${issue.origin ?? "value"} to have ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elements"}`;
				return `Too big: expected ${issue.origin ?? "value"} to be ${adj}${issue.maximum.toString()}`;
			}
			case "too_small": {
				const adj = issue.exact ? "exactly " : issue.inclusive ? ">=" : ">";
				const sizing = getSizing(issue.origin);
				if (sizing) return `Too small: expected ${issue.origin} to have ${adj}${issue.minimum.toString()} ${sizing.unit}`;
				return `Too small: expected ${issue.origin} to be ${adj}${issue.minimum.toString()}`;
			}
			case "invalid_format": {
				const _issue = issue;
				if (_issue.format === "starts_with") return `Invalid string: must start with "${_issue.prefix}"`;
				if (_issue.format === "ends_with") return `Invalid string: must end with "${_issue.suffix}"`;
				if (_issue.format === "includes") return `Invalid string: must include "${_issue.includes}"`;
				if (_issue.format === "regex") return `Invalid string: must match pattern ${_issue.pattern}`;
				return `Invalid ${FormatDictionary[_issue.format] ?? issue.format}`;
			}
			case "not_multiple_of": return `Invalid number: must be a multiple of ${issue.divisor}`;
			case "unrecognized_keys": return `Unrecognized key${issue.keys.length > 1 ? "s" : ""}: ${joinValues(issue.keys, ", ")}`;
			case "invalid_key": return `Invalid key in ${issue.origin}`;
			case "invalid_union":
				if (issue.options && Array.isArray(issue.options) && issue.options.length > 0) return `Invalid discriminator value. Expected ${issue.options.map((o) => `'${o}'`).join(" | ")}`;
				if (issue.inclusive === false) return "Invalid input: more than one option matched";
				return "Invalid input";
			case "invalid_element": return `Invalid value in ${issue.origin}`;
			default: return `Invalid input`;
		}
	};
};
function en_default() {
	return { localeError: error() };
}
//#endregion
//#region node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/registries.js
var _a;
var $ZodRegistry = class {
	constructor() {
		this._map = /* @__PURE__ */ new WeakMap();
		this._idmap = /* @__PURE__ */ new Map();
	}
	add(schema, ..._meta) {
		const meta = _meta[0];
		this._map.set(schema, meta);
		if (meta && typeof meta === "object" && "id" in meta) this._idmap.set(meta.id, schema);
		return this;
	}
	clear() {
		this._map = /* @__PURE__ */ new WeakMap();
		this._idmap = /* @__PURE__ */ new Map();
		return this;
	}
	remove(schema) {
		const meta = this._map.get(schema);
		if (meta && typeof meta === "object" && "id" in meta) this._idmap.delete(meta.id);
		this._map.delete(schema);
		return this;
	}
	get(schema) {
		const p = schema._zod.parent;
		if (p) {
			const pm = { ...this.get(p) ?? {} };
			delete pm.id;
			const f = {
				...pm,
				...this._map.get(schema)
			};
			return Object.keys(f).length ? f : void 0;
		}
		return this._map.get(schema);
	}
	has(schema) {
		return this._map.has(schema);
	}
};
function registry() {
	return new $ZodRegistry();
}
(_a = globalThis).__zod_globalRegistry ?? (_a.__zod_globalRegistry = registry());
var globalRegistry = globalThis.__zod_globalRegistry;
//#endregion
//#region node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/api.js
function snapshotChecks(def) {
	if (def.checks) def.checks = [...def.checks];
	return def;
}
// @__NO_SIDE_EFFECTS__
function _string(Class, params) {
	return new Class(snapshotChecks({
		type: "string",
		...normalizeParams(params)
	}));
}
// @__NO_SIDE_EFFECTS__
function _email(Class, params) {
	return new Class({
		type: "string",
		format: "email",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _guid(Class, params) {
	return new Class({
		type: "string",
		format: "guid",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _uuid(Class, params) {
	return new Class({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _uuidv4(Class, params) {
	return new Class({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: false,
		version: "v4",
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _uuidv6(Class, params) {
	return new Class({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: false,
		version: "v6",
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _uuidv7(Class, params) {
	return new Class({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: false,
		version: "v7",
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _url(Class, params) {
	return new Class({
		type: "string",
		format: "url",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _emoji(Class, params) {
	return new Class({
		type: "string",
		format: "emoji",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _nanoid(Class, params) {
	return new Class({
		type: "string",
		format: "nanoid",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
/**
* @deprecated CUID v1 is deprecated by its authors due to information leakage
* (timestamps embedded in the id). Use {@link _cuid2} instead.
* See https://github.com/paralleldrive/cuid.
*/
// @__NO_SIDE_EFFECTS__
function _cuid(Class, params) {
	return new Class({
		type: "string",
		format: "cuid",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _cuid2(Class, params) {
	return new Class({
		type: "string",
		format: "cuid2",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _ulid(Class, params) {
	return new Class({
		type: "string",
		format: "ulid",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _xid(Class, params) {
	return new Class({
		type: "string",
		format: "xid",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _ksuid(Class, params) {
	return new Class({
		type: "string",
		format: "ksuid",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _ipv4(Class, params) {
	return new Class({
		type: "string",
		format: "ipv4",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _ipv6(Class, params) {
	return new Class({
		type: "string",
		format: "ipv6",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _cidrv4(Class, params) {
	return new Class({
		type: "string",
		format: "cidrv4",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _cidrv6(Class, params) {
	return new Class({
		type: "string",
		format: "cidrv6",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _base64(Class, params) {
	return new Class({
		type: "string",
		format: "base64",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _base64url(Class, params) {
	return new Class({
		type: "string",
		format: "base64url",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _e164(Class, params) {
	return new Class({
		type: "string",
		format: "e164",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _jwt(Class, params) {
	return new Class({
		type: "string",
		format: "jwt",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _isoDateTime(Class, params) {
	return new Class({
		type: "string",
		format: "datetime",
		check: "string_format",
		offset: false,
		local: false,
		precision: null,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _isoDate(Class, params) {
	return new Class({
		type: "string",
		format: "date",
		check: "string_format",
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _isoTime(Class, params) {
	return new Class({
		type: "string",
		format: "time",
		check: "string_format",
		precision: null,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _isoDuration(Class, params) {
	return new Class({
		type: "string",
		format: "duration",
		check: "string_format",
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _unknown(Class) {
	return new Class({ type: "unknown" });
}
// @__NO_SIDE_EFFECTS__
function _never(Class, params) {
	return new Class({
		type: "never",
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _maxLength(maximum, params) {
	return new $ZodCheckMaxLength({
		check: "max_length",
		...normalizeParams(params),
		maximum
	});
}
// @__NO_SIDE_EFFECTS__
function _minLength(minimum, params) {
	return new $ZodCheckMinLength({
		check: "min_length",
		...normalizeParams(params),
		minimum
	});
}
// @__NO_SIDE_EFFECTS__
function _length(length, params) {
	return new $ZodCheckLengthEquals({
		check: "length_equals",
		...normalizeParams(params),
		length
	});
}
// @__NO_SIDE_EFFECTS__
function _regex(pattern, params) {
	return new $ZodCheckRegex({
		check: "string_format",
		format: "regex",
		...normalizeParams(params),
		pattern
	});
}
// @__NO_SIDE_EFFECTS__
function _lowercase(params) {
	return new $ZodCheckLowerCase({
		check: "string_format",
		format: "lowercase",
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _uppercase(params) {
	return new $ZodCheckUpperCase({
		check: "string_format",
		format: "uppercase",
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _includes(includes, params) {
	return new $ZodCheckIncludes({
		check: "string_format",
		format: "includes",
		...normalizeParams(params),
		includes
	});
}
// @__NO_SIDE_EFFECTS__
function _startsWith(prefix, params) {
	return new $ZodCheckStartsWith({
		check: "string_format",
		format: "starts_with",
		...normalizeParams(params),
		prefix
	});
}
// @__NO_SIDE_EFFECTS__
function _endsWith(suffix, params) {
	return new $ZodCheckEndsWith({
		check: "string_format",
		format: "ends_with",
		...normalizeParams(params),
		suffix
	});
}
// @__NO_SIDE_EFFECTS__
function _overwrite(tx) {
	return new $ZodCheckOverwrite({
		check: "overwrite",
		tx
	});
}
// @__NO_SIDE_EFFECTS__
function _normalize(form) {
	return /* @__PURE__ */ _overwrite((input) => input.normalize(form));
}
// @__NO_SIDE_EFFECTS__
function _trim() {
	return /* @__PURE__ */ _overwrite((input) => input.trim());
}
// @__NO_SIDE_EFFECTS__
function _toLowerCase() {
	return /* @__PURE__ */ _overwrite((input) => input.toLowerCase());
}
// @__NO_SIDE_EFFECTS__
function _toUpperCase() {
	return /* @__PURE__ */ _overwrite((input) => input.toUpperCase());
}
// @__NO_SIDE_EFFECTS__
function _slugify() {
	return /* @__PURE__ */ _overwrite((input) => slugify(input));
}
// @__NO_SIDE_EFFECTS__
function _array(Class, element, params) {
	return new Class({
		type: "array",
		element,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _custom(Class, fn, _params) {
	const norm = normalizeParams(_params);
	norm.abort ?? (norm.abort = true);
	return new Class({
		type: "custom",
		check: "custom",
		fn,
		...norm
	});
}
// @__NO_SIDE_EFFECTS__
function _refine(Class, fn, _params) {
	return new Class({
		type: "custom",
		check: "custom",
		fn,
		...normalizeParams(_params)
	});
}
// @__NO_SIDE_EFFECTS__
function _superRefine(fn, params) {
	const ch = /* @__PURE__ */ _check((payload) => {
		payload.addIssue = (issue$2) => {
			if (typeof issue$2 === "string") payload.issues.push(issue(issue$2, payload.value, ch._zod.def));
			else {
				const _issue = issue$2;
				if (_issue.fatal) _issue.continue = false;
				_issue.code ?? (_issue.code = "custom");
				if (!("input" in _issue)) _issue.input = payload.value;
				_issue.inst ?? (_issue.inst = ch);
				_issue.continue ?? (_issue.continue = !ch._zod.def.abort);
				payload.issues.push(issue(_issue));
			}
		};
		return fn(payload.value, payload);
	}, params);
	return ch;
}
// @__NO_SIDE_EFFECTS__
function _check(fn, params) {
	const ch = new $ZodCheck({
		check: "custom",
		...normalizeParams(params)
	});
	ch._zod.check = fn;
	return ch;
}
//#endregion
//#region node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/to-json-schema.js
function assignProps(target, ...sources) {
	for (const source of sources) for (const key of Reflect.ownKeys(source)) if (Object.prototype.propertyIsEnumerable.call(source, key)) assignProp(target, key, source[key]);
	return target;
}
function initializeContext(params) {
	let target = params?.target ?? "draft-2020-12";
	if (target === "draft-4") target = "draft-04";
	if (target === "draft-7") target = "draft-07";
	return {
		processors: params.processors ?? {},
		metadataRegistry: params?.metadata ?? globalRegistry,
		target,
		unrepresentable: params?.unrepresentable ?? "throw",
		override: params?.override ?? (() => {}),
		io: params?.io ?? "output",
		counter: 0,
		seen: /* @__PURE__ */ new Map(),
		sharedDefsExtractedFor: void 0,
		sharedEmitDoneFor: void 0,
		cycles: params?.cycles ?? "ref",
		reused: params?.reused ?? "inline",
		intersections: [],
		deferred: [],
		external: params?.external ?? void 0
	};
}
/**
* Applies the `unrepresentable` setting at a site that has no JSON Schema equivalent. Throws
* `message` unless the setting (or the handler's return value) says otherwise. Returns `true` if a
* custom JSON Schema was written into `json`, in which case the caller must not write its own.
*/
function handleUnrepresentable(schema, ctx, json, params, message) {
	const result = typeof ctx.unrepresentable === "function" ? ctx.unrepresentable({
		zodSchema: schema,
		path: params.path,
		message
	}) : ctx.unrepresentable;
	if (result === "any") return false;
	if (result === void 0 || result === "throw") throw new Error(message);
	Object.assign(json, result);
	return true;
}
function processSchema(schema, ctx, _params = {
	path: [],
	schemaPath: []
}) {
	var _a;
	const def = schema._zod.def;
	const seen = ctx.seen.get(schema);
	if (seen) {
		seen.count++;
		if (_params.schemaPath.includes(schema)) seen.cycle = _params.path;
		return seen.schema;
	}
	const result = {
		schema: {},
		count: 1,
		cycle: void 0,
		path: _params.path
	};
	ctx.seen.set(schema, result);
	ctx.sharedDefsExtractedFor = void 0;
	ctx.sharedEmitDoneFor = void 0;
	const overrideSchema = schema._zod.toJSONSchema?.();
	if (overrideSchema) result.schema = overrideSchema;
	else {
		const params = {
			..._params,
			schemaPath: [..._params.schemaPath, schema],
			path: _params.path
		};
		if (schema._zod.processJSONSchema) schema._zod.processJSONSchema(ctx, result.schema, params);
		else {
			const _json = result.schema;
			const processor = ctx.processors[def.type];
			if (!processor) throw new Error(`[toJSONSchema]: Non-representable type encountered: ${def.type}`);
			processor(schema, ctx, _json, params);
		}
		const parent = schema._zod.parent;
		if (parent) {
			if (!result.ref) result.ref = parent;
			processSchema(parent, ctx, params);
			ctx.seen.get(parent).isParent = true;
		}
	}
	const meta = ctx.metadataRegistry.get(schema);
	if (meta) assignProps(result.schema, meta);
	if (ctx.io === "input" && isTransforming(schema)) {
		delete result.schema.examples;
		delete result.schema.default;
	}
	if (ctx.io === "input" && "_prefault" in result.schema) (_a = result.schema).default ?? (_a.default = result.schema._prefault);
	delete result.schema._prefault;
	return ctx.seen.get(schema).schema;
}
function encodeJSONPointerSegment(segment) {
	return segment.replace(/~/g, "~0").replace(/\//g, "~1");
}
function extractDefs(ctx, schema) {
	const root = ctx.seen.get(schema);
	if (!root) throw new Error("Unprocessed schema. This is a bug in Zod.");
	if (ctx.external && ctx.sharedDefsExtractedFor === ctx.external) return;
	const idToSchema = /* @__PURE__ */ new Map();
	for (const entry of ctx.seen.entries()) {
		const id = ctx.metadataRegistry.get(entry[0])?.id;
		if (id) {
			const existing = idToSchema.get(id);
			if (existing && existing !== entry[0]) throw new Error(`Duplicate schema id "${id}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);
			idToSchema.set(id, entry[0]);
		}
	}
	const makeURI = (entry) => {
		const defsSegment = ctx.target === "draft-2020-12" ? "$defs" : "definitions";
		if (ctx.external) {
			const externalId = ctx.external.registry.get(entry[0])?.id;
			const uriGenerator = ctx.external.uri ?? ((id) => id);
			if (externalId) return { ref: uriGenerator(externalId) };
			const id = entry[1].defId ?? entry[1].schema.id ?? `schema${ctx.counter++}`;
			entry[1].defId = id;
			return {
				defId: id,
				ref: `${uriGenerator("__shared")}#/${defsSegment}/${encodeJSONPointerSegment(id)}`
			};
		}
		const uriPrefix = `#`;
		const defUriPrefix = `${uriPrefix}/${defsSegment}/`;
		if (entry[1] === root && !entry[1].schema.id) return { ref: uriPrefix };
		const defId = entry[1].schema.id ?? `__schema${ctx.counter++}`;
		return {
			defId,
			ref: defUriPrefix + encodeJSONPointerSegment(defId)
		};
	};
	const extractToDef = (entry) => {
		if (entry[1].schema.$ref) return;
		const seen = entry[1];
		const { ref, defId } = makeURI(entry);
		seen.def = { ...seen.schema };
		if (defId) seen.defId = defId;
		const schema = seen.schema;
		for (const key in schema) delete schema[key];
		schema.$ref = ref;
	};
	if (ctx.cycles === "throw") for (const entry of ctx.seen.entries()) {
		const seen = entry[1];
		if (seen.cycle) throw new Error(`Cycle detected: #/${seen.cycle?.join("/")}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`);
	}
	for (const entry of ctx.seen.entries()) {
		const seen = entry[1];
		if (schema === entry[0]) {
			extractToDef(entry);
			continue;
		}
		if (ctx.external) {
			const ext = ctx.external.registry.get(entry[0])?.id;
			if (schema !== entry[0] && ext) {
				extractToDef(entry);
				continue;
			}
		}
		if (ctx.metadataRegistry.get(entry[0])?.id) {
			extractToDef(entry);
			continue;
		}
		if (seen.cycle) {
			extractToDef(entry);
			continue;
		}
		if (seen.count > 1) {
			if (ctx.reused === "ref") extractToDef(entry);
		}
	}
	if (ctx.external) ctx.sharedDefsExtractedFor = ctx.external;
}
/** Rewrites `anyOf: [{type: "a"}, {type: "b"}]` to `type: ["a", "b"]`, which every JSON Schema draft treats as equivalent and most consumers render far better for the nullable case. Only branches that are a bare type assertion qualify — anything carrying a constraint, `$ref`, `const` or metadata is left alone. Runs after `flattenRef`, so a branch an override decorated or `$defs` extraction turned into a `$ref` is no longer bare and correctly stays in `anyOf`. `oneOf` is excluded: `integer` and `number` overlap, so "exactly one" and "at least one" are not the same there. OpenAPI 3.0 is excluded: its `type` must be a single string. */
function compactTypeUnion(schema) {
	const options = schema.anyOf;
	if (!Array.isArray(options) || options.length === 0 || schema.type !== void 0) return;
	const types = [];
	for (const option of options) {
		if (!option || typeof option !== "object") return;
		compactTypeUnion(option);
		const keys = Object.keys(option);
		if (keys.length !== 1 || keys[0] !== "type") return;
		const type = option.type;
		for (const member of Array.isArray(type) ? type : [type]) {
			if (typeof member !== "string") return;
			if (!types.includes(member)) types.push(member);
		}
	}
	delete schema.anyOf;
	schema.type = types.length === 1 ? types[0] : types;
}
/** Keywords `foldIntersection` knows how to combine. Anything else — `$ref`, `patternProperties`,
* an annotation like `description` — makes a member unfoldable, so a constraint this does not
* understand leaves the `allOf` alone instead of being silently dropped or misattributed. */
var FOLDABLE_KEYS = /* @__PURE__ */ new Set([
	"type",
	"properties",
	"required",
	"additionalProperties"
]);
var UNION_KEYS = ["oneOf", "anyOf"];
/** A member's constraint on a key it does not declare itself. A `catchall` states one; `false`, an absent `additionalProperties`, and the empty schema a loose object emits state nothing. */
function undeclaredConstraint(member) {
	const extra = member.additionalProperties;
	if (extra === void 0 || extra === false || typeof extra !== "object" || extra === null) return null;
	return Object.keys(extra).length ? extra : null;
}
/** Combines object members into the single object they describe together, or returns `null` if any of them carries a keyword outside {@link FOLDABLE_KEYS}. */
function foldObjects(members) {
	const objects = [];
	for (const member of members) {
		if (typeof member !== "object" || member.type !== "object") return null;
		for (const key in member) if (!FOLDABLE_KEYS.has(key)) return null;
		objects.push(member);
	}
	const properties = {};
	const required = /* @__PURE__ */ new Set();
	for (const object of objects) {
		for (const key in object.properties) {
			if (Object.prototype.hasOwnProperty.call(properties, key)) continue;
			const parts = [];
			for (const other of objects) {
				const part = other.properties?.[key] ?? undeclaredConstraint(other);
				if (part === null || part === void 0) continue;
				if (!parts.some((seen) => JSON.stringify(seen) === JSON.stringify(part))) parts.push(part);
			}
			assignProp(properties, key, parts.length === 1 ? parts[0] : foldObjects(parts) ?? { allOf: parts });
		}
		for (const key of object.required ?? []) required.add(key);
	}
	const folded = {
		type: "object",
		properties
	};
	if (required.size) folded.required = [...required];
	if (objects.every((object) => object.additionalProperties === false)) folded.additionalProperties = false;
	else {
		const constraints = [];
		for (const object of objects) {
			const constraint = undeclaredConstraint(object);
			if (constraint && !constraints.some((seen) => JSON.stringify(seen) === JSON.stringify(constraint))) constraints.push(constraint);
		}
		if (constraints.length === 1) folded.additionalProperties = constraints[0];
		else if (constraints.length > 1) folded.additionalProperties = { allOf: constraints };
	}
	return folded;
}
/** `additionalProperties` in an `allOf` member sees only that member's own `properties`, so two
* closed object members reject each other's keys and the schema validates nothing. Zod's parser
* pools the key sets instead — `handleIntersectionResults` reports a key as unrecognized only when
* *every* side rejects it — so the emitted schema has to pool them too, and folding the members
* into one object is the encoding that says so on every target.
*
* This runs from `finalize`, after `extractDefs`, which is what keeps it clear of the `$ref`
* machinery: a member extracted into `$defs` is already a `$ref` by now and declines to fold, so it
* keeps its reference and its own closedness rather than being inlined as a stale copy. */
function foldIntersection(json) {
	const allOf = json.allOf;
	if (!Array.isArray(allOf) || allOf.length < 2) return;
	for (const key of FOLDABLE_KEYS) if (key in json) return;
	const unions = allOf.filter((m) => UNION_KEYS.some((k) => Array.isArray(m[k])));
	let folded = null;
	if (!unions.length) folded = foldObjects(allOf);
	else {
		const union = unions[0];
		const keyword = UNION_KEYS.find((k) => Array.isArray(union[k]));
		if (Object.keys(union).length !== 1) return;
		const rest = allOf.filter((m) => m !== union);
		const branches = union[keyword].map((branch) => foldObjects([...rest, branch]));
		if (branches.some((b) => !b)) return;
		folded = { [keyword]: branches };
	}
	if (!folded) return;
	delete json.allOf;
	assignProps(json, folded);
}
function finalize(ctx, schema) {
	const root = ctx.seen.get(schema);
	if (!root) throw new Error("Unprocessed schema. This is a bug in Zod.");
	const flattenRef = (zodSchema) => {
		const seen = ctx.seen.get(zodSchema);
		if (seen.ref === null) return;
		const schema = seen.def ?? seen.schema;
		const _cached = { ...schema };
		const ref = seen.ref;
		seen.ref = null;
		if (ref) {
			flattenRef(ref);
			const refSeen = ctx.seen.get(ref);
			const refSchema = refSeen.schema;
			if (refSchema.$ref && (ctx.target === "draft-07" || ctx.target === "draft-04" || ctx.target === "openapi-3.0")) {
				schema.allOf = schema.allOf ?? [];
				schema.allOf.push(refSchema);
			} else assignProps(schema, refSchema);
			assignProps(schema, _cached);
			if (zodSchema._zod.parent === ref) for (const key in schema) {
				if (key === "$ref" || key === "allOf") continue;
				if (!(key in _cached)) delete schema[key];
			}
			if (refSchema.$ref && refSeen.def) for (const key in schema) {
				if (key === "$ref" || key === "allOf") continue;
				if (key in refSeen.def && JSON.stringify(schema[key]) === JSON.stringify(refSeen.def[key])) delete schema[key];
			}
		}
		const parent = zodSchema._zod.parent;
		if (parent && parent !== ref) {
			flattenRef(parent);
			const parentSeen = ctx.seen.get(parent);
			if (parentSeen?.schema.$ref) {
				schema.$ref = parentSeen.schema.$ref;
				if (parentSeen.def) for (const key in schema) {
					if (key === "$ref" || key === "allOf") continue;
					if (key in parentSeen.def && JSON.stringify(schema[key]) === JSON.stringify(parentSeen.def[key])) delete schema[key];
				}
			}
		}
		ctx.override({
			zodSchema,
			jsonSchema: schema,
			path: seen.path ?? []
		});
	};
	if (!ctx.external || ctx.sharedEmitDoneFor !== ctx.external) {
		for (const entry of [...ctx.seen.entries()].reverse()) flattenRef(entry[0]);
		if (ctx.target !== "openapi-3.0") for (const entry of ctx.seen.entries()) compactTypeUnion(entry[1].def ?? entry[1].schema);
		for (const rewrite of ctx.deferred) rewrite();
		if (ctx.intersections.length) {
			const carriers = /* @__PURE__ */ new Map();
			for (const seen of ctx.seen.values()) for (const json of [seen.schema, seen.def]) {
				const allOf = json?.allOf;
				if (!Array.isArray(allOf)) continue;
				const existing = carriers.get(allOf);
				if (existing) existing.push(json);
				else carriers.set(allOf, [json]);
			}
			for (const allOf of ctx.intersections) for (const json of carriers.get(allOf) ?? []) foldIntersection(json);
		}
	}
	const result = {};
	if (ctx.target === "draft-2020-12") result.$schema = "https://json-schema.org/draft/2020-12/schema";
	else if (ctx.target === "draft-07") result.$schema = "http://json-schema.org/draft-07/schema#";
	else if (ctx.target === "draft-04") result.$schema = "http://json-schema.org/draft-04/schema#";
	else if (ctx.target === "openapi-3.0") {}
	if (ctx.external?.uri) {
		const id = ctx.external.registry.get(schema)?.id;
		if (!id) throw new Error("Schema is missing an `id` property");
		result.$id = ctx.external.uri(id);
	}
	assignProps(result, root.defId ? root.schema : root.def ?? root.schema);
	const rootMetaId = ctx.metadataRegistry.get(schema)?.id;
	if (rootMetaId !== void 0 && result.id === rootMetaId) delete result.id;
	const defs = ctx.external?.defs ?? {};
	if (!ctx.external || ctx.sharedEmitDoneFor !== ctx.external) for (const entry of ctx.seen.entries()) {
		const seen = entry[1];
		if (seen.def && seen.defId) {
			if (seen.def.id === seen.defId) delete seen.def.id;
			assignProp(defs, seen.defId, seen.def);
		}
	}
	if (ctx.external) ctx.sharedEmitDoneFor = ctx.external;
	if (ctx.external) {} else if (Object.keys(defs).length > 0) {
		if (ctx.target === "draft-2020-12") result.$defs = defs;
		else result.definitions = defs;
	}
	try {
		const finalized = JSON.parse(JSON.stringify(result));
		Object.defineProperty(finalized, "~standard", {
			value: {
				...schema["~standard"],
				jsonSchema: {
					input: createStandardJSONSchemaMethod(schema, "input", ctx.processors),
					output: createStandardJSONSchemaMethod(schema, "output", ctx.processors)
				}
			},
			enumerable: false,
			writable: false
		});
		return finalized;
	} catch (_err) {
		throw new Error("Error converting schema to JSON.");
	}
}
function isTransforming(_schema, _ctx) {
	const ctx = _ctx ?? { seen: /* @__PURE__ */ new Set() };
	if (ctx.seen.has(_schema)) return false;
	ctx.seen.add(_schema);
	const def = _schema._zod.def;
	if (def.type === "transform") return true;
	if (def.type === "array") return isTransforming(def.element, ctx);
	if (def.type === "set") return isTransforming(def.valueType, ctx);
	if (def.type === "lazy") return isTransforming(def.getter(), ctx);
	if (def.type === "promise" || def.type === "optional" || def.type === "nonoptional" || def.type === "nullable" || def.type === "readonly" || def.type === "default" || def.type === "prefault" || def.type === "catch") return isTransforming(def.innerType, ctx);
	if (def.type === "intersection") return isTransforming(def.left, ctx) || isTransforming(def.right, ctx);
	if (def.type === "record" || def.type === "map") return isTransforming(def.keyType, ctx) || isTransforming(def.valueType, ctx);
	if (def.type === "pipe") {
		if (_schema._zod.traits.has("$ZodCodec")) return true;
		return isTransforming(def.in, ctx) || isTransforming(def.out, ctx);
	}
	if (def.type === "object") {
		for (const key in def.shape) if (isTransforming(def.shape[key], ctx)) return true;
		return false;
	}
	if (def.type === "union") {
		for (const option of def.options) if (isTransforming(option, ctx)) return true;
		return false;
	}
	if (def.type === "tuple") {
		for (const item of def.items) if (isTransforming(item, ctx)) return true;
		if (def.rest && isTransforming(def.rest, ctx)) return true;
		return false;
	}
	return false;
}
/**
* Creates a toJSONSchema method for a schema instance.
* This encapsulates the logic of initializing context, processing, extracting defs, and finalizing.
*/
var createToJSONSchemaMethod = (schema, processors = {}) => (params) => {
	const ctx = initializeContext({
		...params,
		processors
	});
	processSchema(schema, ctx);
	extractDefs(ctx, schema);
	return finalize(ctx, schema);
};
var createStandardJSONSchemaMethod = (schema, io, processors = {}) => (params) => {
	const { libraryOptions, target } = params ?? {};
	const ctx = initializeContext({
		...libraryOptions ?? {},
		target,
		io,
		processors
	});
	processSchema(schema, ctx);
	extractDefs(ctx, schema);
	return finalize(ctx, schema);
};
//#endregion
//#region node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/json-schema-processors.js
var narrowMin = (agg, key, value) => {
	if (agg[key] === void 0 || value > agg[key]) agg[key] = value;
};
var narrowMax = (agg, key, value) => {
	if (agg[key] === void 0 || value < agg[key]) agg[key] = value;
};
var narrowBoth = (agg, value) => {
	narrowMin(agg, "minimum", value);
	narrowMax(agg, "maximum", value);
};
var addDivisor = (agg, value) => {
	agg.multipleOf ?? (agg.multipleOf = []);
	if (!agg.multipleOf.includes(value)) agg.multipleOf.push(value);
};
var addPattern = (agg, pattern) => {
	agg.patterns ?? (agg.patterns = /* @__PURE__ */ new Set());
	agg.patterns.add(pattern);
};
var intersectMime = (agg, mime) => {
	agg.mime = agg.mime ? agg.mime.filter((m) => mime.includes(m)) : [...mime];
};
var setFormat = (agg, format) => {
	agg.format = format;
	if (format.includes("int")) agg.isInt = true;
};
var minContributor = (agg, def) => narrowMin(agg, "minimum", def.minimum);
var maxContributor = (agg, def) => narrowMax(agg, "maximum", def.maximum);
var formatContributor = (ranges) => (agg, def) => {
	setFormat(agg, def.format);
	const [minimum, maximum] = ranges[def.format];
	narrowMin(agg, "minimum", minimum);
	narrowMax(agg, "maximum", maximum);
};
var contributors = {
	greater_than: (agg, def) => narrowMin(agg, def.inclusive ? "minimum" : "exclusiveMinimum", def.value),
	less_than: (agg, def) => narrowMax(agg, def.inclusive ? "maximum" : "exclusiveMaximum", def.value),
	multiple_of: (agg, def) => addDivisor(agg, def.value),
	number_format: formatContributor(NUMBER_FORMAT_RANGES),
	bigint_format: formatContributor(BIGINT_FORMAT_RANGES),
	min_length: minContributor,
	max_length: maxContributor,
	length_equals: (agg, def) => narrowBoth(agg, def.length),
	min_size: minContributor,
	max_size: maxContributor,
	size_equals: (agg, def) => narrowBoth(agg, def.size),
	string_format: (agg, def) => {
		setFormat(agg, def.format);
		if (def.pattern) addPattern(agg, def.pattern);
		if (def.format === "base64" || def.format === "base64url") agg.contentEncoding = def.format;
		if (def.local || def.precision === -1) agg.laxFormat = true;
	},
	mime_type: (agg, def) => intersectMime(agg, def.mime)
};
function aggregateChecks(schema) {
	const agg = {};
	const def = schema._zod.def;
	const list = schema._zod.traits.has("$ZodCheck") ? [schema, ...def.checks ?? []] : def.checks ?? [];
	for (const ch of list) contributors[ch._zod.def.check]?.(agg, ch._zod.def);
	const bag = schema._zod.bag;
	if (bag.minimum !== void 0) narrowMin(agg, "minimum", bag.minimum);
	if (bag.exclusiveMinimum !== void 0) narrowMin(agg, "exclusiveMinimum", bag.exclusiveMinimum);
	if (bag.maximum !== void 0) narrowMax(agg, "maximum", bag.maximum);
	if (bag.exclusiveMaximum !== void 0) narrowMax(agg, "exclusiveMaximum", bag.exclusiveMaximum);
	if (bag.multipleOf !== void 0) addDivisor(agg, bag.multipleOf);
	if (bag.format !== void 0) {
		agg.format ?? (agg.format = bag.format);
		if (bag.format.includes("int")) agg.isInt = true;
	}
	if (bag.mime) intersectMime(agg, bag.mime);
	for (const pattern of bag.patterns ?? []) addPattern(agg, pattern);
	return agg;
}
var formatMap = {
	guid: "uuid",
	url: "uri",
	datetime: "date-time",
	json_string: "json-string",
	regex: ""
};
var exactPatterns = /* @__PURE__ */ new Map([[base64Charset, base64], [base64urlCharset, base64url]]);
var exactPattern = (p) => exactPatterns.get(p) ?? p;
var stringProcessor = (schema, ctx, _json, _params) => {
	const json = _json;
	json.type = "string";
	const { minimum, maximum, format, patterns, contentEncoding, laxFormat } = aggregateChecks(schema);
	if (typeof minimum === "number") json.minLength = minimum;
	if (typeof maximum === "number") json.maxLength = maximum;
	if (format) {
		json.format = formatMap[format] ?? format;
		if (json.format === "") delete json.format;
		if (format === "time" || laxFormat) delete json.format;
	}
	if (contentEncoding) json.contentEncoding = contentEncoding;
	if (patterns && patterns.size > 0) {
		const patternList = [...patterns].map(exactPattern);
		if (patternList.length === 1) json.pattern = patternList[0].source;
		else if (patternList.length > 1) json.allOf = [...patternList.map((regex) => ({
			...ctx.target === "draft-07" || ctx.target === "draft-04" || ctx.target === "openapi-3.0" ? { type: "string" } : {},
			pattern: regex.source
		}))];
	}
};
var neverProcessor = (_schema, _ctx, json, _params) => {
	json.not = {};
};
var enumProcessor = (schema, _ctx, json, _params) => {
	const def = schema._zod.def;
	const values = getEnumValues(def.entries);
	if (values.length === 0) {
		json.not = {};
		return;
	}
	if (values.every((v) => typeof v === "number")) json.type = "number";
	if (values.every((v) => typeof v === "string")) json.type = "string";
	json.enum = values;
};
var customProcessor = (schema, ctx, json, params) => {
	handleUnrepresentable(schema, ctx, json, params, "Custom types cannot be represented in JSON Schema");
};
var transformProcessor = (schema, ctx, json, params) => {
	handleUnrepresentable(schema, ctx, json, params, "Transforms cannot be represented in JSON Schema");
};
var arrayProcessor = (schema, ctx, _json, params) => {
	const json = _json;
	const def = schema._zod.def;
	const { minimum, maximum } = aggregateChecks(schema);
	if (typeof minimum === "number") json.minItems = minimum;
	if (typeof maximum === "number") json.maxItems = maximum;
	json.type = "array";
	json.items = processSchema(def.element, ctx, {
		...params,
		path: [...params.path, "items"]
	});
};
function inputOptin(schema) {
	const def = schema._zod.def;
	if (def.type === "pipe" && def.in._zod.traits.has("$ZodTransform")) return inputOptin(def.out);
	if (def.type === "catch") return inputOptin(def.innerType);
	return schema._zod.optin;
}
var objectProcessor = (schema, ctx, _json, params) => {
	const json = _json;
	const def = schema._zod.def;
	const shape = def.shape;
	if (Object.getOwnPropertySymbols(shape).length && handleUnrepresentable(schema, ctx, json, params, "Symbol keys cannot be represented in JSON Schema")) return;
	json.type = "object";
	json.properties = {};
	for (const key in shape) assignProp(json.properties, key, processSchema(shape[key], ctx, {
		...params,
		path: [
			...params.path,
			"properties",
			key
		]
	}));
	const requiredKeys = [];
	for (const key of Object.keys(shape)) {
		const field = def.shape[key];
		if (ctx.io === "input" ? inputOptin(field) === void 0 : field._zod.optout === void 0) requiredKeys.push(key);
	}
	if (requiredKeys.length > 0) json.required = requiredKeys;
	if (def.catchall?._zod.def.type === "never") json.additionalProperties = false;
	else if (!def.catchall) {
		if (ctx.io === "output") json.additionalProperties = false;
	} else if (def.catchall) json.additionalProperties = processSchema(def.catchall, ctx, {
		...params,
		path: [...params.path, "additionalProperties"]
	});
};
var unionProcessor = (schema, ctx, json, params) => {
	const def = schema._zod.def;
	const isExclusive = def.inclusive === false;
	const options = def.options.map((x, i) => processSchema(x, ctx, {
		...params,
		path: [
			...params.path,
			isExclusive ? "oneOf" : "anyOf",
			i
		]
	}));
	if (isExclusive) json.oneOf = options;
	else json.anyOf = options;
};
var intersectionProcessor = (schema, ctx, json, params) => {
	const def = schema._zod.def;
	const a = processSchema(def.left, ctx, {
		...params,
		path: [
			...params.path,
			"allOf",
			0
		]
	});
	const b = processSchema(def.right, ctx, {
		...params,
		path: [
			...params.path,
			"allOf",
			1
		]
	});
	const isSimpleIntersection = (val) => "allOf" in val && Object.keys(val).length === 1;
	const allOf = [...isSimpleIntersection(a) ? a.allOf : [a], ...isSimpleIntersection(b) ? b.allOf : [b]];
	json.allOf = allOf;
	ctx.intersections.push(allOf);
};
var nullableProcessor = (schema, ctx, json, params) => {
	const def = schema._zod.def;
	const inner = processSchema(def.innerType, ctx, params);
	const seen = ctx.seen.get(schema);
	if (ctx.target === "openapi-3.0") {
		seen.ref = def.innerType;
		json.nullable = true;
	} else json.anyOf = [inner, { type: "null" }];
};
var nonoptionalProcessor = (schema, ctx, _json, params) => {
	const def = schema._zod.def;
	processSchema(def.innerType, ctx, params);
	const seen = ctx.seen.get(schema);
	seen.ref = def.innerType;
};
/** Round-trips a default value through JSON so the emitted schema is guaranteed to be valid JSON.
* A BigInt has no reliable encoding, so it goes through `unrepresentable` like any other
* unrepresentable value. Returns a sentinel when the caller must not write a default of its own. */
var UNREPRESENTABLE_DEFAULT = Symbol();
function serializeDefaultValue(value, schema, ctx, json, params) {
	let unrepresentable = false;
	const serialized = JSON.stringify(value, (_, val) => {
		if (typeof val !== "bigint") return val;
		unrepresentable = true;
		return null;
	});
	if (!unrepresentable) return JSON.parse(serialized);
	handleUnrepresentable(schema, ctx, json, params, "BigInt defaults cannot be represented in JSON Schema");
	return UNREPRESENTABLE_DEFAULT;
}
var defaultProcessor = (schema, ctx, json, params) => {
	const def = schema._zod.def;
	processSchema(def.innerType, ctx, params);
	const seen = ctx.seen.get(schema);
	seen.ref = def.innerType;
	const value = serializeDefaultValue(def.defaultValue, schema, ctx, json, params);
	if (value !== UNREPRESENTABLE_DEFAULT) json.default = value;
};
var prefaultProcessor = (schema, ctx, json, params) => {
	const def = schema._zod.def;
	processSchema(def.innerType, ctx, params);
	const seen = ctx.seen.get(schema);
	seen.ref = def.innerType;
	if (ctx.io !== "input") return;
	const value = serializeDefaultValue(def.defaultValue, schema, ctx, json, params);
	if (value !== UNREPRESENTABLE_DEFAULT) json._prefault = value;
};
var catchProcessor = (schema, ctx, json, params) => {
	const def = schema._zod.def;
	processSchema(def.innerType, ctx, params);
	const seen = ctx.seen.get(schema);
	seen.ref = def.innerType;
	let catchValue;
	try {
		catchValue = def.catchValue(void 0);
	} catch {
		handleUnrepresentable(schema, ctx, json, params, "Dynamic catch values are not supported in JSON Schema");
		return;
	}
	json.default = catchValue;
};
var pipeProcessor = (schema, ctx, _json, params) => {
	const def = schema._zod.def;
	const inIsTransform = def.in._zod.traits.has("$ZodTransform");
	const innerType = ctx.io === "input" ? inIsTransform ? def.out : def.in : def.out;
	processSchema(innerType, ctx, params);
	const seen = ctx.seen.get(schema);
	seen.ref = innerType;
};
var readonlyProcessor = (schema, ctx, json, params) => {
	const def = schema._zod.def;
	processSchema(def.innerType, ctx, params);
	const seen = ctx.seen.get(schema);
	seen.ref = def.innerType;
	json.readOnly = true;
};
var optionalProcessor = (schema, ctx, _json, params) => {
	const def = schema._zod.def;
	processSchema(def.innerType, ctx, params);
	const seen = ctx.seen.get(schema);
	seen.ref = def.innerType;
};
//#endregion
//#region node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/classic/errors.js
var _installedErrorProtos = /* @__PURE__ */ new WeakSet([Object.prototype, Error.prototype]);
function _lazyMethod(proto, key, make) {
	Object.defineProperty(proto, key, {
		configurable: true,
		enumerable: false,
		get() {
			const value = make(this);
			Object.defineProperty(this, key, {
				value,
				configurable: true,
				writable: true
			});
			return value;
		},
		set(value) {
			Object.defineProperty(this, key, {
				value,
				configurable: true,
				writable: true
			});
		}
	});
}
var initializer = (inst, issues) => {
	$ZodError.init(inst, issues);
	inst.name = "ZodError";
	const proto = Object.getPrototypeOf(inst);
	if (_installedErrorProtos.has(proto)) return;
	_installedErrorProtos.add(proto);
	_lazyMethod(proto, "format", (self) => (mapper) => formatError(self, mapper));
	_lazyMethod(proto, "flatten", (self) => (mapper) => flattenError(self, mapper));
	_lazyMethod(proto, "addIssue", (self) => (issue) => {
		self.issues.push(issue);
		self.message = JSON.stringify(self.issues, jsonStringifyReplacer, 2);
	});
	_lazyMethod(proto, "addIssues", (self) => (issues) => {
		self.issues.push(...issues);
		self.message = JSON.stringify(self.issues, jsonStringifyReplacer, 2);
	});
	Object.defineProperty(proto, "isEmpty", {
		configurable: true,
		enumerable: false,
		get() {
			return this.issues.length === 0;
		}
	});
};
var ZodRealError = /*@__PURE__*/ $constructor("ZodError", initializer, void 0, { Parent: Error });
//#endregion
//#region node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/classic/parse.js
var parse = /* @__PURE__ */ _parse(ZodRealError);
var parseAsync = /* @__PURE__ */ _parseAsync(ZodRealError);
var safeParse = /* @__PURE__ */ _safeParse(ZodRealError);
var safeParseAsync = /* @__PURE__ */ _safeParseAsync(ZodRealError);
var encode = /* @__PURE__ */ _encode(ZodRealError);
var decode = /* @__PURE__ */ _decode(ZodRealError);
var encodeAsync = /* @__PURE__ */ _encodeAsync(ZodRealError);
var decodeAsync = /* @__PURE__ */ _decodeAsync(ZodRealError);
var safeEncode = /* @__PURE__ */ _safeEncode(ZodRealError);
var safeDecode = /* @__PURE__ */ _safeDecode(ZodRealError);
var safeEncodeAsync = /* @__PURE__ */ _safeEncodeAsync(ZodRealError);
var safeDecodeAsync = /* @__PURE__ */ _safeDecodeAsync(ZodRealError);
//#endregion
//#region node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/classic/schemas.js
function _ensureDefaultLocale() {
	if (!globalConfig.localeError) config(en_default());
}
function _ensureDefaultMemoizer() {
	if (!globalConfig.memoizer) config({ memoizer: memoizer() });
}
var ZodType = /*@__PURE__*/ $constructor("ZodType", (inst, def) => {
	_ensureDefaultLocale();
	$ZodType.init(inst, def);
	inst.def = def;
	inst.type = def.type;
	return inst;
}, {
	check(...chks) {
		const def = this.def;
		return this.clone(mergeDefs(def, { checks: [...def.checks ?? [], ...chks.map((ch) => typeof ch === "function" ? { _zod: {
			check: ch,
			def: { check: "custom" },
			onattach: []
		} } : ch)] }), { parent: true });
	},
	with(...chks) {
		return this.check(...chks);
	},
	clone(def, params) {
		return clone(this, def, params);
	},
	brand() {
		return this;
	},
	register(reg, meta) {
		reg.add(this, meta);
		return this;
	},
	refine(check, params) {
		return this.check(refine(check, params));
	},
	superRefine(refinement, params) {
		return this.check(superRefine(refinement, params));
	},
	overwrite(fn) {
		return this.check(/* @__PURE__ */ _overwrite(fn));
	},
	optional() {
		return optional(this);
	},
	exactOptional() {
		return exactOptional(this);
	},
	nullable() {
		return nullable(this);
	},
	nullish() {
		return optional(nullable(this));
	},
	nonoptional(params) {
		return nonoptional(this, params);
	},
	array() {
		return array(this);
	},
	or(arg) {
		return union([this, arg]);
	},
	and(arg) {
		return intersection(this, arg);
	},
	transform(tx) {
		return pipe(this, transform(tx));
	},
	default(d) {
		return _default(this, d);
	},
	prefault(d) {
		return prefault(this, d);
	},
	catch(params) {
		return _catch(this, params);
	},
	pipe(target) {
		return pipe(this, target);
	},
	readonly() {
		return readonly(this);
	},
	describe(description) {
		const cl = this.clone();
		globalRegistry.add(cl, { description });
		return cl;
	},
	meta(...args) {
		if (args.length === 0) return globalRegistry.get(this);
		const cl = this.clone();
		globalRegistry.add(cl, args[0]);
		return cl;
	},
	isOptional() {
		return this.safeParse(void 0).success;
	},
	isNullable() {
		return this.safeParse(null).success;
	},
	apply(fn, ...args) {
		return args.length === 0 ? fn(this) : fn(this, ...args);
	},
	get "~standard"() {
		return hide(this, "~standard", {
			...standardProps(this),
			jsonSchema: {
				input: createStandardJSONSchemaMethod(this, "input"),
				output: createStandardJSONSchemaMethod(this, "output")
			}
		});
	},
	set "~standard"(value) {
		own(this, "~standard", value);
	},
	parse: function _parse(data, params) {
		return parse(this, data, params, { callee: _parse });
	},
	parseAsync: async function _parseAsync(data, params) {
		return await parseAsync(this, data, params, { callee: _parseAsync });
	},
	safeParse(data, params) {
		return safeParse(this, data, params);
	},
	async safeParseAsync(data, params) {
		return safeParseAsync(this, data, params);
	},
	get spa() {
		return this?.safeParseAsync;
	},
	set spa(value) {
		own(this, "spa", value);
	},
	validate(data, params) {
		return validate(this, data, params);
	},
	validateAsync(data, params) {
		return validateAsync$1(this, data, params);
	},
	encode: function _encode(data, params) {
		return encode(this, data, params, { callee: _encode });
	},
	decode: function _decode(data, params) {
		return decode(this, data, params, { callee: _decode });
	},
	encodeAsync: async function _encodeAsync(data, params) {
		return await encodeAsync(this, data, params, { callee: _encodeAsync });
	},
	decodeAsync: async function _decodeAsync(data, params) {
		return await decodeAsync(this, data, params, { callee: _decodeAsync });
	},
	safeEncode(data, params) {
		return safeEncode(this, data, params);
	},
	safeDecode(data, params) {
		return safeDecode(this, data, params);
	},
	async safeEncodeAsync(data, params) {
		return safeEncodeAsync(this, data, params);
	},
	async safeDecodeAsync(data, params) {
		return safeDecodeAsync(this, data, params);
	},
	toJSONSchema(params) {
		return createToJSONSchemaMethod(this, {})(params);
	},
	get description() {
		return globalRegistry.get(this)?.description;
	},
	get _def() {
		return this._zod.def;
	}
});
/** @internal */
var _ZodString = /*@__PURE__*/ $constructor("_ZodString", (inst, def) => {
	$ZodString.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => stringProcessor(inst, ctx, json, params);
}, /*@__PURE__*/ derived({
	format: (inst) => aggregateChecks(inst).format ?? null,
	minLength: (inst) => aggregateChecks(inst).minimum ?? null,
	maxLength: (inst) => aggregateChecks(inst).maximum ?? null
}, {
	regex(...args) {
		return this.check(/* @__PURE__ */ _regex(...args));
	},
	includes(...args) {
		return this.check(/* @__PURE__ */ _includes(...args));
	},
	startsWith(...args) {
		return this.check(/* @__PURE__ */ _startsWith(...args));
	},
	endsWith(...args) {
		return this.check(/* @__PURE__ */ _endsWith(...args));
	},
	min(...args) {
		return this.check(/* @__PURE__ */ _minLength(...args));
	},
	max(...args) {
		return this.check(/* @__PURE__ */ _maxLength(...args));
	},
	length(...args) {
		return this.check(/* @__PURE__ */ _length(...args));
	},
	nonempty(...args) {
		return this.check(/* @__PURE__ */ _minLength(1, ...args));
	},
	lowercase(params) {
		return this.check(/* @__PURE__ */ _lowercase(params));
	},
	uppercase(params) {
		return this.check(/* @__PURE__ */ _uppercase(params));
	},
	trim() {
		return this.check(/* @__PURE__ */ _trim());
	},
	normalize(...args) {
		return this.check(/* @__PURE__ */ _normalize(...args));
	},
	toLowerCase() {
		return this.check(/* @__PURE__ */ _toLowerCase());
	},
	toUpperCase() {
		return this.check(/* @__PURE__ */ _toUpperCase());
	},
	slugify() {
		return this.check(/* @__PURE__ */ _slugify());
	}
}));
var ZodString = /*@__PURE__*/ $constructor("ZodString", (inst, def) => {
	$ZodString.init(inst, def);
	_ZodString.init(inst, def);
}, {
	email(params) {
		return this.check(/* @__PURE__ */ _email(ZodEmail, params));
	},
	url(params) {
		return this.check(/* @__PURE__ */ _url(ZodURL, params));
	},
	jwt(params) {
		return this.check(/* @__PURE__ */ _jwt(ZodJWT, params));
	},
	emoji(params) {
		return this.check(/* @__PURE__ */ _emoji(ZodEmoji, params));
	},
	guid(params) {
		return this.check(/* @__PURE__ */ _guid(ZodGUID, params));
	},
	uuid(params) {
		return this.check(/* @__PURE__ */ _uuid(ZodUUID, params));
	},
	uuidv4(params) {
		return this.check(/* @__PURE__ */ _uuidv4(ZodUUID, params));
	},
	uuidv6(params) {
		return this.check(/* @__PURE__ */ _uuidv6(ZodUUID, params));
	},
	uuidv7(params) {
		return this.check(/* @__PURE__ */ _uuidv7(ZodUUID, params));
	},
	nanoid(params) {
		return this.check(/* @__PURE__ */ _nanoid(ZodNanoID, params));
	},
	cuid(params) {
		return this.check(/* @__PURE__ */ _cuid(ZodCUID, params));
	},
	cuid2(params) {
		return this.check(/* @__PURE__ */ _cuid2(ZodCUID2, params));
	},
	ulid(params) {
		return this.check(/* @__PURE__ */ _ulid(ZodULID, params));
	},
	base64(params) {
		return this.check(/* @__PURE__ */ _base64(ZodBase64, params));
	},
	base64url(params) {
		return this.check(/* @__PURE__ */ _base64url(ZodBase64URL, params));
	},
	xid(params) {
		return this.check(/* @__PURE__ */ _xid(ZodXID, params));
	},
	ksuid(params) {
		return this.check(/* @__PURE__ */ _ksuid(ZodKSUID, params));
	},
	ipv4(params) {
		return this.check(/* @__PURE__ */ _ipv4(ZodIPv4, params));
	},
	ipv6(params) {
		return this.check(/* @__PURE__ */ _ipv6(ZodIPv6, params));
	},
	cidrv4(params) {
		return this.check(/* @__PURE__ */ _cidrv4(ZodCIDRv4, params));
	},
	cidrv6(params) {
		return this.check(/* @__PURE__ */ _cidrv6(ZodCIDRv6, params));
	},
	e164(params) {
		return this.check(/* @__PURE__ */ _e164(ZodE164, params));
	},
	datetime(params) {
		return this.check(/* @__PURE__ */ _isoDateTime(ZodISODateTime, params));
	},
	date(params) {
		return this.check(/* @__PURE__ */ _isoDate(ZodISODate, params));
	},
	time(params) {
		return this.check(/* @__PURE__ */ _isoTime(ZodISOTime, params));
	},
	duration(params) {
		return this.check(/* @__PURE__ */ _isoDuration(ZodISODuration, params));
	}
});
function string(params) {
	return /* @__PURE__ */ _string(ZodString, params);
}
var ZodStringFormat = /*@__PURE__*/ $constructor("ZodStringFormat", (inst, def) => {
	$ZodStringFormat.init(inst, def);
	_ZodString.init(inst, def);
});
var ZodISODateTime = /*@__PURE__*/ $constructor("ZodISODateTime", (inst, def) => {
	$ZodISODateTime.init(inst, def);
	ZodStringFormat.init(inst, def);
});
var ZodISODate = /*@__PURE__*/ $constructor("ZodISODate", (inst, def) => {
	$ZodISODate.init(inst, def);
	ZodStringFormat.init(inst, def);
});
var ZodISOTime = /*@__PURE__*/ $constructor("ZodISOTime", (inst, def) => {
	$ZodISOTime.init(inst, def);
	ZodStringFormat.init(inst, def);
});
var ZodISODuration = /*@__PURE__*/ $constructor("ZodISODuration", (inst, def) => {
	$ZodISODuration.init(inst, def);
	ZodStringFormat.init(inst, def);
});
var ZodEmail = /*@__PURE__*/ $constructor("ZodEmail", (inst, def) => {
	$ZodEmail.init(inst, def);
	ZodStringFormat.init(inst, def);
});
var ZodGUID = /*@__PURE__*/ $constructor("ZodGUID", (inst, def) => {
	$ZodGUID.init(inst, def);
	ZodStringFormat.init(inst, def);
});
var ZodUUID = /*@__PURE__*/ $constructor("ZodUUID", (inst, def) => {
	$ZodUUID.init(inst, def);
	ZodStringFormat.init(inst, def);
});
var ZodURL = /*@__PURE__*/ $constructor("ZodURL", (inst, def) => {
	$ZodURL.init(inst, def);
	ZodStringFormat.init(inst, def);
});
var ZodEmoji = /*@__PURE__*/ $constructor("ZodEmoji", (inst, def) => {
	$ZodEmoji.init(inst, def);
	ZodStringFormat.init(inst, def);
});
var ZodNanoID = /*@__PURE__*/ $constructor("ZodNanoID", (inst, def) => {
	$ZodNanoID.init(inst, def);
	ZodStringFormat.init(inst, def);
});
/**
* @deprecated CUID v1 is deprecated by its authors due to information leakage
* (timestamps embedded in the id). Use {@link ZodCUID2} instead.
* See https://github.com/paralleldrive/cuid.
*/
var ZodCUID = /*@__PURE__*/ $constructor("ZodCUID", (inst, def) => {
	$ZodCUID.init(inst, def);
	ZodStringFormat.init(inst, def);
});
var ZodCUID2 = /*@__PURE__*/ $constructor("ZodCUID2", (inst, def) => {
	$ZodCUID2.init(inst, def);
	ZodStringFormat.init(inst, def);
});
var ZodULID = /*@__PURE__*/ $constructor("ZodULID", (inst, def) => {
	$ZodULID.init(inst, def);
	ZodStringFormat.init(inst, def);
});
var ZodXID = /*@__PURE__*/ $constructor("ZodXID", (inst, def) => {
	$ZodXID.init(inst, def);
	ZodStringFormat.init(inst, def);
});
var ZodKSUID = /*@__PURE__*/ $constructor("ZodKSUID", (inst, def) => {
	$ZodKSUID.init(inst, def);
	ZodStringFormat.init(inst, def);
});
var ZodIPv4 = /*@__PURE__*/ $constructor("ZodIPv4", (inst, def) => {
	$ZodIPv4.init(inst, def);
	ZodStringFormat.init(inst, def);
});
var ZodIPv6 = /*@__PURE__*/ $constructor("ZodIPv6", (inst, def) => {
	$ZodIPv6.init(inst, def);
	ZodStringFormat.init(inst, def);
});
var ZodCIDRv4 = /*@__PURE__*/ $constructor("ZodCIDRv4", (inst, def) => {
	$ZodCIDRv4.init(inst, def);
	ZodStringFormat.init(inst, def);
});
var ZodCIDRv6 = /*@__PURE__*/ $constructor("ZodCIDRv6", (inst, def) => {
	$ZodCIDRv6.init(inst, def);
	ZodStringFormat.init(inst, def);
});
var ZodBase64 = /*@__PURE__*/ $constructor("ZodBase64", (inst, def) => {
	$ZodBase64.init(inst, def);
	ZodStringFormat.init(inst, def);
});
var ZodBase64URL = /*@__PURE__*/ $constructor("ZodBase64URL", (inst, def) => {
	$ZodBase64URL.init(inst, def);
	ZodStringFormat.init(inst, def);
});
var ZodE164 = /*@__PURE__*/ $constructor("ZodE164", (inst, def) => {
	$ZodE164.init(inst, def);
	ZodStringFormat.init(inst, def);
});
var ZodJWT = /*@__PURE__*/ $constructor("ZodJWT", (inst, def) => {
	$ZodJWT.init(inst, def);
	ZodStringFormat.init(inst, def);
});
var ZodUnknown = /*@__PURE__*/ $constructor("ZodUnknown", (inst, def) => {
	$ZodUnknown.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => void 0;
});
function unknown() {
	return /* @__PURE__ */ _unknown(ZodUnknown);
}
var ZodNever = /*@__PURE__*/ $constructor("ZodNever", (inst, def) => {
	$ZodNever.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => neverProcessor(inst, ctx, json, params);
});
function never(params) {
	return /* @__PURE__ */ _never(ZodNever, params);
}
var ZodArray = /*@__PURE__*/ $constructor("ZodArray", (inst, def) => {
	_ensureDefaultMemoizer();
	$ZodArray.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => arrayProcessor(inst, ctx, json, params);
	inst.element = def.element;
}, {
	min(n, params) {
		return this.check(/* @__PURE__ */ _minLength(n, params));
	},
	nonempty(params) {
		return this.check(/* @__PURE__ */ _minLength(1, params));
	},
	max(n, params) {
		return this.check(/* @__PURE__ */ _maxLength(n, params));
	},
	length(n, params) {
		return this.check(/* @__PURE__ */ _length(n, params));
	},
	unwrap() {
		return this.element;
	}
});
function array(element, params) {
	return /* @__PURE__ */ _array(ZodArray, element, params);
}
var ZodObject = /*@__PURE__*/ $constructor("ZodObject", (inst, def) => {
	_ensureDefaultMemoizer();
	$ZodObjectJIT.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => objectProcessor(inst, ctx, json, params);
	installLazyProp(inst, "shape", (self) => self._zod.def.shape, false);
}, {
	keyof() {
		return _enum(Object.keys(this._zod.def.shape));
	},
	catchall(catchall) {
		return this.clone(mergeDefs(this._zod.def, { catchall }));
	},
	passthrough() {
		return this.clone(mergeDefs(this._zod.def, { catchall: unknown() }));
	},
	loose() {
		return this.clone(mergeDefs(this._zod.def, { catchall: unknown() }));
	},
	strict() {
		return this.clone(mergeDefs(this._zod.def, { catchall: never() }));
	},
	strip() {
		return this.clone(mergeDefs(this._zod.def, { catchall: void 0 }));
	},
	extend(incoming) {
		return extend(this, incoming);
	},
	safeExtend(incoming) {
		return safeExtend(this, incoming);
	},
	merge(other) {
		return merge(this, other);
	},
	pick(mask) {
		return pick(this, mask);
	},
	omit(mask) {
		return omit(this, mask);
	},
	partial(...args) {
		return partial(ZodOptional, this, args[0]);
	},
	exactPartial(...args) {
		return partial(ZodExactOptional, this, args[0], "exactPartial");
	},
	required(...args) {
		return required(ZodNonOptional, this, args[0]);
	}
});
function object(shape, params) {
	return new ZodObject({
		type: "object",
		shape: shape ?? {},
		...normalizeParams(params)
	});
}
var ZodUnion = /*@__PURE__*/ $constructor("ZodUnion", (inst, def) => {
	$ZodUnion.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => unionProcessor(inst, ctx, json, params);
	inst.options = def.options;
});
function union(options, params) {
	return new ZodUnion({
		type: "union",
		options,
		...normalizeParams(params)
	});
}
var ZodIntersection = /*@__PURE__*/ $constructor("ZodIntersection", (inst, def) => {
	$ZodIntersection.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => intersectionProcessor(inst, ctx, json, params);
});
function intersection(left, right) {
	return new ZodIntersection({
		type: "intersection",
		left,
		right
	});
}
var ZodEnum = /*@__PURE__*/ $constructor("ZodEnum", (inst, def) => {
	$ZodEnum.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => enumProcessor(inst, ctx, json, params);
	inst.enum = def.entries;
	inst.options = [...inst._zod.values];
	const keys = new Set(Object.keys(def.entries));
	inst.extract = (values, params) => {
		const newEntries = {};
		for (const value of values) if (keys.has(value)) newEntries[value] = def.entries[value];
		else throw new Error(`Key ${value} not found in enum`);
		return new ZodEnum({
			...def,
			checks: [],
			...normalizeParams(params),
			entries: newEntries
		});
	};
	inst.exclude = (values, params) => {
		const newEntries = { ...def.entries };
		for (const value of values) if (keys.has(value)) delete newEntries[value];
		else throw new Error(`Key ${value} not found in enum`);
		return new ZodEnum({
			...def,
			checks: [],
			...normalizeParams(params),
			entries: newEntries
		});
	};
});
function _enum(values, params) {
	return new ZodEnum({
		type: "enum",
		entries: Array.isArray(values) ? Object.fromEntries(values.map((v) => [v, v])) : values,
		...normalizeParams(params)
	});
}
var ZodTransform = /*@__PURE__*/ $constructor("ZodTransform", (inst, def) => {
	_ensureDefaultMemoizer();
	$ZodTransform.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => transformProcessor(inst, ctx, json, params);
	inst._zod.parse = (payload, _ctx) => {
		if (_ctx.direction === "backward") throw new $ZodEncodeError(inst.constructor.name);
		payload.addIssue = (issue$1) => {
			if (typeof issue$1 === "string") payload.issues.push(issue(issue$1, payload.value, def));
			else {
				const _issue = issue$1;
				if (_issue.fatal) _issue.continue = false;
				_issue.code ?? (_issue.code = "custom");
				if (!("input" in _issue)) _issue.input = payload.value;
				_issue.inst ?? (_issue.inst = inst);
				payload.issues.push(issue(_issue));
			}
		};
		const output = def.transform(payload.value, payload);
		if (output instanceof Promise) return output.then((output) => {
			payload.value = output;
			return payload;
		});
		payload.value = output;
		return payload;
	};
});
function transform(fn) {
	return new ZodTransform({
		type: "transform",
		transform: fn
	});
}
var ZodOptional = /*@__PURE__*/ $constructor("ZodOptional", (inst, def) => {
	$ZodOptional.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => optionalProcessor(inst, ctx, json, params);
	inst.unwrap = () => inst._zod.def.innerType;
});
function optional(innerType) {
	return new ZodOptional({
		type: "optional",
		innerType
	});
}
var ZodExactOptional = /*@__PURE__*/ $constructor("ZodExactOptional", (inst, def) => {
	$ZodExactOptional.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => optionalProcessor(inst, ctx, json, params);
	inst.unwrap = () => inst._zod.def.innerType;
});
function exactOptional(innerType) {
	return new ZodExactOptional({
		type: "optional",
		innerType
	});
}
var ZodNullable = /*@__PURE__*/ $constructor("ZodNullable", (inst, def) => {
	$ZodNullable.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => nullableProcessor(inst, ctx, json, params);
	inst.unwrap = () => inst._zod.def.innerType;
});
function nullable(innerType) {
	return new ZodNullable({
		type: "nullable",
		innerType
	});
}
var ZodDefault = /*@__PURE__*/ $constructor("ZodDefault", (inst, def) => {
	$ZodDefault.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => defaultProcessor(inst, ctx, json, params);
	inst.unwrap = () => inst._zod.def.innerType;
	inst.removeDefault = inst.unwrap;
});
function _default(innerType, defaultValue) {
	return new ZodDefault({
		type: "default",
		innerType,
		get defaultValue() {
			return typeof defaultValue === "function" ? defaultValue() : shallowClone(defaultValue);
		}
	});
}
var ZodPrefault = /*@__PURE__*/ $constructor("ZodPrefault", (inst, def) => {
	$ZodPrefault.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => prefaultProcessor(inst, ctx, json, params);
	inst.unwrap = () => inst._zod.def.innerType;
});
function prefault(innerType, defaultValue) {
	return new ZodPrefault({
		type: "prefault",
		innerType,
		get defaultValue() {
			return typeof defaultValue === "function" ? defaultValue() : shallowClone(defaultValue);
		}
	});
}
var ZodNonOptional = /*@__PURE__*/ $constructor("ZodNonOptional", (inst, def) => {
	$ZodNonOptional.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => nonoptionalProcessor(inst, ctx, json, params);
	inst.unwrap = () => inst._zod.def.innerType;
});
function nonoptional(innerType, params) {
	return new ZodNonOptional({
		type: "nonoptional",
		innerType,
		...normalizeParams(params)
	});
}
var ZodCatch = /*@__PURE__*/ $constructor("ZodCatch", (inst, def) => {
	$ZodCatch.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => catchProcessor(inst, ctx, json, params);
	inst.unwrap = () => inst._zod.def.innerType;
	inst.removeCatch = inst.unwrap;
});
function _catch(innerType, catchValue) {
	return new ZodCatch({
		type: "catch",
		innerType,
		catchValue: typeof catchValue === "function" ? catchValue : constantCatch(catchValue)
	});
}
var ZodPipe = /*@__PURE__*/ $constructor("ZodPipe", (inst, def) => {
	$ZodPipe.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => pipeProcessor(inst, ctx, json, params);
	inst.in = def.in;
	inst.out = def.out;
});
function pipe(in_, out) {
	return new ZodPipe({
		type: "pipe",
		in: in_,
		out
	});
}
var ZodReadonly = /*@__PURE__*/ $constructor("ZodReadonly", (inst, def) => {
	$ZodReadonly.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => readonlyProcessor(inst, ctx, json, params);
	inst.unwrap = () => inst._zod.def.innerType;
});
function readonly(innerType) {
	return new ZodReadonly({
		type: "readonly",
		innerType
	});
}
var ZodCustom = /*@__PURE__*/ $constructor("ZodCustom", (inst, def) => {
	$ZodCustom.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => customProcessor(inst, ctx, json, params);
});
function custom(fn, _params) {
	return /* @__PURE__ */ _custom(ZodCustom, fn ?? (() => true), _params);
}
function refine(fn, _params = {}) {
	return /* @__PURE__ */ _refine(ZodCustom, fn, _params);
}
function superRefine(fn, params) {
	return /* @__PURE__ */ _superRefine(fn, params);
}
//#endregion
//#region node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/classic/compat.js
/** @deprecated Use the raw string literal codes instead, e.g. "invalid_type". */
var ZodIssueCode = {
	invalid_type: "invalid_type",
	too_big: "too_big",
	too_small: "too_small",
	invalid_format: "invalid_format",
	not_multiple_of: "not_multiple_of",
	unrecognized_keys: "unrecognized_keys",
	invalid_union: "invalid_union",
	invalid_key: "invalid_key",
	invalid_element: "invalid_element",
	invalid_value: "invalid_value",
	custom: "custom"
};
/** @deprecated Do not use. Stub definition, only included for zod-to-json-schema compatibility. */
var ZodFirstPartyTypeKind;
ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {});
//#endregion
//#region node_modules/.pnpm/astro@7.3.4_@emnapi+core@1.11.3_@emnapi+runtime@1.11.3_@types+node@24.13.6_idb-keyval@6.3.0_jiti@2.7.0_yaml@2.9.1/node_modules/astro/dist/core/csp/config.js
var ALGORITHMS = {
	"SHA-256": "sha256-",
	"SHA-384": "sha384-",
	"SHA-512": "sha512-"
};
var ALGORITHM_VALUES = Object.values(ALGORITHMS);
_enum(Object.keys(ALGORITHMS)).optional().default("SHA-256");
var cspHashSchema = custom((value) => {
	if (typeof value !== "string") return false;
	return ALGORITHM_VALUES.some((allowedValue) => {
		return value.startsWith(allowedValue);
	});
});
var cspKindSchema = _enum([
	"element",
	"attribute",
	"default"
]);
var ATTRIBUTE_ALLOWED_RESOURCES = [
	"'none'",
	"'unsafe-hashes'",
	"'unsafe-inline'",
	"'report-sample'"
];
union([string(), object({
	resource: string(),
	kind: cspKindSchema
})]).superRefine((value, ctx) => {
	const resource = typeof value === "string" ? value : value.resource;
	const kind = typeof value === "string" ? "default" : value.kind;
	if (kind === "element" && resource === "'unsafe-hashes'") ctx.addIssue({
		code: ZodIssueCode.custom,
		message: `The source \`'unsafe-hashes'\` is not valid for \`element\` resources (it is rejected by \`script-src-elem\`/\`style-src-elem\`).`,
		fatal: true
	});
	else if (kind === "attribute" && !ATTRIBUTE_ALLOWED_RESOURCES.includes(resource)) ctx.addIssue({
		code: ZodIssueCode.custom,
		message: `The source \`${resource}\` is not valid for \`attribute\` resources. \`script-src-attr\`/\`style-src-attr\` only accept: ${ATTRIBUTE_ALLOWED_RESOURCES.join(", ")}.`,
		fatal: true
	});
});
union([cspHashSchema, object({
	hash: cspHashSchema,
	kind: cspKindSchema
})]);
var ALLOWED_DIRECTIVES = [
	"base-uri",
	"child-src",
	"connect-src",
	"default-src",
	"fenced-frame-src",
	"font-src",
	"form-action",
	"frame-ancestors",
	"frame-src",
	"img-src",
	"manifest-src",
	"media-src",
	"object-src",
	"referrer",
	"report-to",
	"report-uri",
	"require-trusted-types-for",
	"sandbox",
	"trusted-types",
	"upgrade-insecure-requests",
	"worker-src"
];
custom((v) => typeof v === "string").superRefine((value, ctx) => {
	if (!ALLOWED_DIRECTIVES.some((allowedValue) => {
		return value.startsWith(allowedValue);
	})) {
		if (value.startsWith("script-src") || value.startsWith("style-src")) ctx.addIssue({
			code: ZodIssueCode.custom,
			message: `Directives \`script-src\` and \`style-src\` (including their \`-elem\`/\`-attr\` variants) are not allowed in \`security.csp.directives\`. Please use \`security.csp.scriptDirective\` and \`security.csp.styleDirective\` instead, scoping resources/hashes to the more specific directives with the \`kind\` option (\`"element"\` or \`"attribute"\`).`,
			fatal: true
		});
		else ctx.addIssue({
			code: ZodIssueCode.custom,
			message: `Invalid directive: "${value}". Allowed directives are: ${ALLOWED_DIRECTIVES.join(", ")}`,
			fatal: true
		});
	}
});
//#endregion
//#region node_modules/.pnpm/astro@7.3.4_@emnapi+core@1.11.3_@emnapi+runtime@1.11.3_@types+node@24.13.6_idb-keyval@6.3.0_jiti@2.7.0_yaml@2.9.1/node_modules/astro/dist/core/encryption.js
var ALGORITHM = "AES-GCM";
async function decodeKey(encoded) {
	const bytes = decodeBase64(encoded);
	return crypto.subtle.importKey("raw", bytes.buffer, ALGORITHM, true, ["encrypt", "decrypt"]);
}
var encoder$1 = new TextEncoder();
var decoder$1 = new TextDecoder();
var IV_LENGTH = 24;
async function encryptString(key, raw, additionalData) {
	const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH / 2));
	const data = encoder$1.encode(raw);
	const params = {
		name: ALGORITHM,
		iv
	};
	if (additionalData) params.additionalData = encoder$1.encode(additionalData);
	const buffer = await crypto.subtle.encrypt(params, key, data);
	return encodeHexUpperCase(iv) + encodeBase64(new Uint8Array(buffer));
}
async function decryptString(key, encoded, additionalData) {
	const iv = decodeHex(encoded.slice(0, IV_LENGTH));
	const dataArray = decodeBase64(encoded.slice(IV_LENGTH));
	const params = {
		name: ALGORITHM,
		iv
	};
	if (additionalData) params.additionalData = encoder$1.encode(additionalData);
	const decryptedBuffer = await crypto.subtle.decrypt(params, key, dataArray);
	return decoder$1.decode(decryptedBuffer);
}
async function generateCspDigest(data, algorithm) {
	const hashBuffer = await crypto.subtle.digest(algorithm, encoder$1.encode(data));
	const hash = encodeBase64(new Uint8Array(hashBuffer));
	return `${ALGORITHMS[algorithm]}${hash}`;
}
var ASTRO_GENERATOR = `Astro v7.3.4`;
var ASTRO_ERROR_HEADER = "X-Astro-Error";
var DEFAULT_404_COMPONENT = "astro-default-404.astro";
var REDIRECT_STATUS_CODES = [
	301,
	302,
	303,
	307,
	308,
	300,
	304
];
var REROUTABLE_STATUS_CODES = [404, 500];
var clientAddressSymbol = /* @__PURE__ */ Symbol.for("astro.clientAddress");
var originPathnameSymbol = /* @__PURE__ */ Symbol.for("astro.originPathname");
var fetchStateSymbol = /* @__PURE__ */ Symbol.for("astro.fetchState");
var nodeRequestAbortControllerCleanupSymbol = /* @__PURE__ */ Symbol.for("astro.nodeRequestAbortControllerCleanup");
var responseSentSymbol = /* @__PURE__ */ Symbol.for("astro.responseSent");
//#endregion
//#region node_modules/.pnpm/piccolore@0.1.3/node_modules/piccolore/dist/index.js
var e = globalThis.process || {};
var t = e.argv || [];
var n = e.env || {};
var r$1 = !(n.NO_COLOR || t.includes(`--no-color`)) && (!!n.FORCE_COLOR || t.includes(`--color`) || e.platform === `win32` || (e.stdout || {}).isTTY && n.TERM !== `dumb` || !!n.CI);
var i = (e, t, n = e) => (r) => {
	let i = `` + r, o = i.indexOf(t, e.length);
	return ~o ? e + a(i, t, n, o) + t : e + i + t;
};
var a = (e, t, n, r) => {
	let i = ``, a = 0;
	do
		i += e.substring(a, r) + n, a = r + t.length, r = e.indexOf(t, a);
	while (~r);
	return i + e.substring(a);
};
var o = (e = r$1) => {
	let t = e ? i : () => String;
	return {
		isColorSupported: e,
		reset: t(`\x1B[0m`, `\x1B[0m`),
		bold: t(`\x1B[1m`, `\x1B[22m`, `\x1B[22m\x1B[1m`),
		dim: t(`\x1B[2m`, `\x1B[22m`, `\x1B[22m\x1B[2m`),
		italic: t(`\x1B[3m`, `\x1B[23m`),
		underline: t(`\x1B[4m`, `\x1B[24m`),
		inverse: t(`\x1B[7m`, `\x1B[27m`),
		hidden: t(`\x1B[8m`, `\x1B[28m`),
		strikethrough: t(`\x1B[9m`, `\x1B[29m`),
		black: t(`\x1B[30m`, `\x1B[39m`),
		red: t(`\x1B[31m`, `\x1B[39m`),
		green: t(`\x1B[32m`, `\x1B[39m`),
		yellow: t(`\x1B[33m`, `\x1B[39m`),
		blue: t(`\x1B[34m`, `\x1B[39m`),
		magenta: t(`\x1B[35m`, `\x1B[39m`),
		cyan: t(`\x1B[36m`, `\x1B[39m`),
		white: t(`\x1B[37m`, `\x1B[39m`),
		gray: t(`\x1B[90m`, `\x1B[39m`),
		bgBlack: t(`\x1B[40m`, `\x1B[49m`),
		bgRed: t(`\x1B[41m`, `\x1B[49m`),
		bgGreen: t(`\x1B[42m`, `\x1B[49m`),
		bgYellow: t(`\x1B[43m`, `\x1B[49m`),
		bgBlue: t(`\x1B[44m`, `\x1B[49m`),
		bgMagenta: t(`\x1B[45m`, `\x1B[49m`),
		bgCyan: t(`\x1B[46m`, `\x1B[49m`),
		bgWhite: t(`\x1B[47m`, `\x1B[49m`),
		blackBright: t(`\x1B[90m`, `\x1B[39m`),
		redBright: t(`\x1B[91m`, `\x1B[39m`),
		greenBright: t(`\x1B[92m`, `\x1B[39m`),
		yellowBright: t(`\x1B[93m`, `\x1B[39m`),
		blueBright: t(`\x1B[94m`, `\x1B[39m`),
		magentaBright: t(`\x1B[95m`, `\x1B[39m`),
		cyanBright: t(`\x1B[96m`, `\x1B[39m`),
		whiteBright: t(`\x1B[97m`, `\x1B[39m`),
		bgBlackBright: t(`\x1B[100m`, `\x1B[49m`),
		bgRedBright: t(`\x1B[101m`, `\x1B[49m`),
		bgGreenBright: t(`\x1B[102m`, `\x1B[49m`),
		bgYellowBright: t(`\x1B[103m`, `\x1B[49m`),
		bgBlueBright: t(`\x1B[104m`, `\x1B[49m`),
		bgMagentaBright: t(`\x1B[105m`, `\x1B[49m`),
		bgCyanBright: t(`\x1B[106m`, `\x1B[49m`),
		bgWhiteBright: t(`\x1B[107m`, `\x1B[49m`)
	};
};
var s = o();
//#endregion
//#region node_modules/.pnpm/astro@7.3.4_@emnapi+core@1.11.3_@emnapi+runtime@1.11.3_@types+node@24.13.6_idb-keyval@6.3.0_jiti@2.7.0_yaml@2.9.1/node_modules/astro/dist/core/routing/internal/route-errors.js
var ROUTE404_RE = /^\/404\/?$/;
var ROUTE500_RE = /^\/500\/?$/;
function isRoute404(route) {
	return ROUTE404_RE.test(route);
}
function isRoute500(route) {
	return ROUTE500_RE.test(route);
}
//#endregion
//#region node_modules/.pnpm/astro@7.3.4_@emnapi+core@1.11.3_@emnapi+runtime@1.11.3_@types+node@24.13.6_idb-keyval@6.3.0_jiti@2.7.0_yaml@2.9.1/node_modules/astro/dist/runtime/server/astro-global.js
function createError(name) {
	return new AstroError({
		...UnavailableAstroGlobal,
		message: UnavailableAstroGlobal.message(name)
	});
}
function createAstro(site) {
	return {
		get site() {
			console.warn(`Astro.site inside getStaticPaths is deprecated and will be removed in a future major version of Astro. Use import.meta.env.SITE instead`);
			return site ? new URL(site) : void 0;
		},
		get generator() {
			console.warn(`Astro.generator inside getStaticPaths is deprecated and will be removed in a future major version of Astro.`);
			return ASTRO_GENERATOR;
		},
		get callAction() {
			throw createError("callAction");
		},
		get clientAddress() {
			throw createError("clientAddress");
		},
		get cookies() {
			throw createError("cookies");
		},
		get csp() {
			throw createError("csp");
		},
		get currentLocale() {
			throw createError("currentLocale");
		},
		get getActionResult() {
			throw createError("getActionResult");
		},
		get isPrerendered() {
			throw createError("isPrerendered");
		},
		get locals() {
			throw createError("locals");
		},
		get originPathname() {
			throw createError("originPathname");
		},
		get params() {
			throw createError("params");
		},
		get preferredLocale() {
			throw createError("preferredLocale");
		},
		get preferredLocaleList() {
			throw createError("preferredLocaleList");
		},
		get props() {
			throw createError("props");
		},
		get redirect() {
			throw createError("redirect");
		},
		get request() {
			throw createError("request");
		},
		get response() {
			throw createError("response");
		},
		get rewrite() {
			throw createError("rewrite");
		},
		get routePattern() {
			throw createError("routePattern");
		},
		get self() {
			throw createError("self");
		},
		get slots() {
			throw createError("slots");
		},
		get url() {
			throw createError("url");
		},
		get session() {
			throw createError("session");
		},
		get cache() {
			throw createError("cache");
		},
		get logger() {
			throw createError("logger");
		}
	};
}
//#endregion
//#region node_modules/.pnpm/astro@7.3.4_@emnapi+core@1.11.3_@emnapi+runtime@1.11.3_@types+node@24.13.6_idb-keyval@6.3.0_jiti@2.7.0_yaml@2.9.1/node_modules/astro/dist/runtime/server/endpoint.js
async function renderEndpoint(mod, context, isPrerendered, logger, state) {
	const { request, url } = context;
	const method = request.method.toUpperCase();
	let handler = mod[method] ?? mod["ALL"];
	if (!handler && method === "HEAD" && mod["GET"]) handler = mod["GET"];
	if (isPrerendered && !["GET", "HEAD"].includes(method)) logger.warn("router", `${url.pathname} ${s.bold(method)} requests are not available in static endpoints. Mark this page as server-rendered (\`export const prerender = false;\`) or update your config to \`output: 'server'\` to make all your pages server-rendered by default.`);
	if (handler === void 0) {
		logger.warn("router", `No API Route handler exists for the method "${method}" for the route "${url.pathname}".
Found handlers: ${Object.keys(mod).map((exp) => JSON.stringify(exp)).join(", ")}
` + ("all" in mod ? `One of the exported handlers is "all" (lowercase), did you mean to export 'ALL'?
` : ""));
		return new Response(null, { status: 404 });
	}
	if (typeof handler !== "function") {
		logger.error("router", `The route "${url.pathname}" exports a value for the method "${method}", but it is of the type ${typeof handler} instead of a function.`);
		return new Response(null, { status: 500 });
	}
	let response = await handler.call(mod, context);
	if (!response || response instanceof Response === false) throw new AstroError(EndpointDidNotReturnAResponse);
	if (state && REROUTABLE_STATUS_CODES.includes(response.status)) state.skipErrorReroute = true;
	if (method === "HEAD") return new Response(null, response);
	return response;
}
//#endregion
//#region node_modules/.pnpm/astro@7.3.4_@emnapi+core@1.11.3_@emnapi+runtime@1.11.3_@types+node@24.13.6_idb-keyval@6.3.0_jiti@2.7.0_yaml@2.9.1/node_modules/astro/dist/runtime/server/util.js
function isPromise(value) {
	return typeof value === "object" && value !== null && typeof value.then === "function";
}
async function* streamAsyncIterator(stream) {
	const reader = stream.getReader();
	try {
		while (true) {
			const { done, value } = await reader.read();
			if (done) return;
			yield value;
		}
	} finally {
		reader.releaseLock();
	}
}
//#endregion
//#region node_modules/.pnpm/astro@7.3.4_@emnapi+core@1.11.3_@emnapi+runtime@1.11.3_@types+node@24.13.6_idb-keyval@6.3.0_jiti@2.7.0_yaml@2.9.1/node_modules/astro/dist/runtime/server/escape.js
var ESCAPABLE = /[&<>'"]/g;
function entityFor(code) {
	switch (code) {
		case 38: return "&amp;";
		case 60: return "&lt;";
		case 62: return "&gt;";
		case 39: return "&#39;";
		default: return "&quot;";
	}
}
function escapeHTML(value) {
	ESCAPABLE.lastIndex = 0;
	if (!ESCAPABLE.test(value)) return value;
	let output = "";
	let last = 0;
	do {
		const index = ESCAPABLE.lastIndex - 1;
		if (last !== index) output += value.slice(last, index);
		output += entityFor(value.charCodeAt(index));
		last = index + 1;
	} while (ESCAPABLE.test(value));
	return last === value.length ? output : output + value.slice(last);
}
function stringifyForScript(value) {
	return JSON.stringify(value)?.replace(/</g, "\\u003c");
}
function escapeStyleText(value) {
	return value.replaceAll("<", "\\3C ");
}
var HTMLBytes = class extends Uint8Array {};
Object.defineProperty(HTMLBytes.prototype, Symbol.toStringTag, { get() {
	return "HTMLBytes";
} });
var htmlStringSymbol = /* @__PURE__ */ Symbol.for("astro:html-string");
var HTMLString = class extends String {};
Object.defineProperty(HTMLString.prototype, htmlStringSymbol, { value: true });
var markHTMLString = (value) => {
	if (isHTMLString(value)) return value;
	if (typeof value === "string") return new HTMLString(value);
	return value;
};
function isHTMLString(value) {
	return typeof value === "object" && value !== null && value[htmlStringSymbol] === true;
}
function markHTMLBytes(bytes) {
	return new HTMLBytes(bytes);
}
function hasGetReader(obj) {
	return typeof obj.getReader === "function";
}
async function* unescapeChunksAsync(iterable) {
	if (hasGetReader(iterable)) for await (const chunk of streamAsyncIterator(iterable)) yield unescapeHTML(chunk);
	else for await (const chunk of iterable) yield unescapeHTML(chunk);
}
function* unescapeChunks(iterable) {
	for (const chunk of iterable) yield unescapeHTML(chunk);
}
function unescapeHTML(str) {
	if (!!str && typeof str === "object") {
		if (str instanceof Uint8Array) return markHTMLBytes(str);
		else if (str instanceof Response && str.body) {
			const body = str.body;
			return unescapeChunksAsync(body);
		} else if (typeof str.then === "function") return Promise.resolve(str).then((value) => {
			return unescapeHTML(value);
		});
		else if (str[/* @__PURE__ */ Symbol.for("astro:slot-string")]) return str;
		else if (Symbol.iterator in str) return unescapeChunks(str);
		else if (Symbol.asyncIterator in str || hasGetReader(str)) return unescapeChunksAsync(str);
	}
	return markHTMLString(str);
}
function isVNode(vnode) {
	return vnode && typeof vnode === "object" && vnode["astro:jsx"];
}
//#endregion
//#region node_modules/.pnpm/astro@7.3.4_@emnapi+core@1.11.3_@emnapi+runtime@1.11.3_@types+node@24.13.6_idb-keyval@6.3.0_jiti@2.7.0_yaml@2.9.1/node_modules/astro/dist/core/head-propagation/resolver.js
function isPropagatingHint(hint) {
	return hint === "self" || hint === "in-tree";
}
//#endregion
//#region node_modules/.pnpm/astro@7.3.4_@emnapi+core@1.11.3_@emnapi+runtime@1.11.3_@types+node@24.13.6_idb-keyval@6.3.0_jiti@2.7.0_yaml@2.9.1/node_modules/astro/dist/runtime/server/render/astro/factory.js
function isAstroComponentFactory(obj) {
	return obj == null ? false : obj.isAstroComponentFactory === true;
}
//#endregion
//#region node_modules/.pnpm/clsx@2.1.1/node_modules/clsx/dist/clsx.mjs
function r(e) {
	var t, f, n = "";
	if ("string" == typeof e || "number" == typeof e) n += e;
	else if ("object" == typeof e) if (Array.isArray(e)) {
		var o = e.length;
		for (t = 0; t < o; t++) e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
	} else for (f in e) e[f] && (n && (n += " "), n += f);
	return n;
}
function clsx() {
	for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++) (e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
	return n;
}
//#endregion
//#region node_modules/.pnpm/astro@7.3.4_@emnapi+core@1.11.3_@emnapi+runtime@1.11.3_@types+node@24.13.6_idb-keyval@6.3.0_jiti@2.7.0_yaml@2.9.1/node_modules/astro/dist/runtime/server/serialize.js
var PROP_TYPE = {
	Value: 0,
	JSON: 1,
	RegExp: 2,
	Date: 3,
	Map: 4,
	Set: 5,
	BigInt: 6,
	URL: 7,
	Uint8Array: 8,
	Uint16Array: 9,
	Uint32Array: 10,
	Infinity: 11
};
function serializeArray(value, metadata = {}, parents = /* @__PURE__ */ new WeakSet()) {
	if (parents.has(value)) throw new Error(`Cyclic reference detected while serializing props for <${metadata.displayName} client:${metadata.hydrate}>!

Cyclic references cannot be safely serialized for client-side usage. Please remove the cyclic reference.`);
	parents.add(value);
	const serialized = value.map((v) => {
		return convertToSerializedForm(v, metadata, parents);
	});
	parents.delete(value);
	return serialized;
}
function serializeObject(value, metadata = {}, parents = /* @__PURE__ */ new WeakSet()) {
	if (parents.has(value)) throw new Error(`Cyclic reference detected while serializing props for <${metadata.displayName} client:${metadata.hydrate}>!

Cyclic references cannot be safely serialized for client-side usage. Please remove the cyclic reference.`);
	parents.add(value);
	const serialized = Object.fromEntries(Object.entries(value).map(([k, v]) => {
		return [k, convertToSerializedForm(v, metadata, parents)];
	}));
	parents.delete(value);
	return serialized;
}
function convertToSerializedForm(value, metadata = {}, parents = /* @__PURE__ */ new WeakSet()) {
	switch (Object.prototype.toString.call(value)) {
		case "[object Date]": return [PROP_TYPE.Date, value.toISOString()];
		case "[object RegExp]": return [PROP_TYPE.RegExp, value.source];
		case "[object Map]": return [PROP_TYPE.Map, serializeArray(Array.from(value), metadata, parents)];
		case "[object Set]": return [PROP_TYPE.Set, serializeArray(Array.from(value), metadata, parents)];
		case "[object BigInt]": return [PROP_TYPE.BigInt, value.toString()];
		case "[object URL]": return [PROP_TYPE.URL, value.toString()];
		case "[object Array]": return [PROP_TYPE.JSON, serializeArray(value, metadata, parents)];
		case "[object Uint8Array]": return [PROP_TYPE.Uint8Array, Array.from(value)];
		case "[object Uint16Array]": return [PROP_TYPE.Uint16Array, Array.from(value)];
		case "[object Uint32Array]": return [PROP_TYPE.Uint32Array, Array.from(value)];
		default:
			if (value !== null && typeof value === "object") return [PROP_TYPE.Value, serializeObject(value, metadata, parents)];
			if (value === Number.POSITIVE_INFINITY) return [PROP_TYPE.Infinity, 1];
			if (value === Number.NEGATIVE_INFINITY) return [PROP_TYPE.Infinity, -1];
			if (value === void 0) return [PROP_TYPE.Value];
			return [PROP_TYPE.Value, value];
	}
}
function serializeProps(props, metadata) {
	return JSON.stringify(serializeObject(props, metadata));
}
//#endregion
//#region node_modules/.pnpm/astro@7.3.4_@emnapi+core@1.11.3_@emnapi+runtime@1.11.3_@types+node@24.13.6_idb-keyval@6.3.0_jiti@2.7.0_yaml@2.9.1/node_modules/astro/dist/runtime/server/hydration.js
var transitionDirectivesToCopyOnIsland = /* @__PURE__ */ new Set([
	"data-astro-transition-scope",
	"data-astro-transition-persist",
	"data-astro-transition-persist-props"
]);
function extractDirectives(inputProps, clientDirectives) {
	let extracted = {
		isPage: false,
		hydration: null,
		props: {},
		propsWithoutTransitionAttributes: {}
	};
	for (const key of Object.keys(inputProps)) {
		const value = inputProps[key];
		if (key.startsWith("server:")) {
			if (key === "server:root") extracted.isPage = true;
		}
		if (key.startsWith("client:")) {
			if (!extracted.hydration) extracted.hydration = {
				directive: "",
				value: "",
				componentUrl: "",
				componentExport: { value: "" }
			};
			switch (key) {
				case "client:component-path":
					extracted.hydration.componentUrl = value;
					break;
				case "client:component-export":
					extracted.hydration.componentExport.value = value;
					break;
				case "client:component-hydration": break;
				case "client:display-name": break;
				default:
					extracted.hydration.directive = key.split(":")[1];
					extracted.hydration.value = value;
					if (!clientDirectives.has(extracted.hydration.directive)) {
						const hydrationMethods = Array.from(clientDirectives.keys()).map((d) => `client:${d}`).join(", ");
						throw new Error(`Error: invalid hydration directive "${key}". Supported hydration methods: ${hydrationMethods}`);
					}
					if (extracted.hydration.directive === "media" && typeof extracted.hydration.value !== "string") throw new AstroError(MissingMediaQueryDirective);
			}
		} else {
			extracted.props[key] = value;
			if (!transitionDirectivesToCopyOnIsland.has(key)) extracted.propsWithoutTransitionAttributes[key] = value;
		}
	}
	for (const sym of Object.getOwnPropertySymbols(inputProps)) {
		extracted.props[sym] = inputProps[sym];
		extracted.propsWithoutTransitionAttributes[sym] = inputProps[sym];
	}
	return extracted;
}
async function generateHydrateScript(scriptOptions, metadata) {
	const { renderer, result, astroId, props, attrs } = scriptOptions;
	const { hydrate, componentUrl, componentExport } = metadata;
	if (!componentExport.value) throw new AstroError({
		...NoMatchingImport,
		message: NoMatchingImport.message(metadata.displayName)
	});
	const island = {
		children: "",
		props: { uid: astroId }
	};
	if (attrs) for (const [key, value] of Object.entries(attrs)) island.props[key] = escapeHTML(String(value));
	island.props["component-url"] = await result.resolve(decodeURI(componentUrl));
	if (renderer.clientEntrypoint) {
		island.props["component-export"] = componentExport.value;
		island.props["renderer-url"] = await result.resolve(decodeURI(renderer.clientEntrypoint.toString()));
		island.props["props"] = escapeHTML(serializeProps(props, metadata));
	}
	island.props["ssr"] = "";
	island.props["client"] = hydrate;
	let beforeHydrationUrl = await result.resolve("astro:scripts/before-hydration.js");
	if (beforeHydrationUrl.length) island.props["before-hydration-url"] = beforeHydrationUrl;
	island.props["opts"] = escapeHTML(JSON.stringify({
		name: metadata.displayName,
		value: metadata.hydrateArgs || ""
	}));
	transitionDirectivesToCopyOnIsland.forEach((name) => {
		if (typeof props[name] !== "undefined") island.props[name] = escapeHTML(String(props[name]));
	});
	return island;
}
//#endregion
//#region node_modules/.pnpm/astro@7.3.4_@emnapi+core@1.11.3_@emnapi+runtime@1.11.3_@types+node@24.13.6_idb-keyval@6.3.0_jiti@2.7.0_yaml@2.9.1/node_modules/astro/dist/runtime/server/shorthash.js
/**
* shortdash - https://github.com/bibig/node-shorthash
*
* @license
*
* (The MIT License)
*
* Copyright (c) 2013 Bibig <bibig@me.com>
*
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/
var dictionary = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXY";
var binary = 61;
function bitwise(str) {
	let hash = 0;
	if (str.length === 0) return hash;
	for (let i = 0; i < str.length; i++) {
		const ch = str.charCodeAt(i);
		hash = (hash << 5) - hash + ch;
		hash = hash & hash;
	}
	return hash;
}
function shorthash(text) {
	let num;
	let result = "";
	let integer = bitwise(text);
	const sign = integer < 0 ? "Z" : "";
	integer = Math.abs(integer);
	while (integer >= binary) {
		num = integer % binary;
		integer = Math.floor(integer / binary);
		result = dictionary[num] + result;
	}
	if (integer > 0) result = dictionary[integer] + result;
	return sign + result;
}
//#endregion
//#region node_modules/.pnpm/astro@7.3.4_@emnapi+core@1.11.3_@emnapi+runtime@1.11.3_@types+node@24.13.6_idb-keyval@6.3.0_jiti@2.7.0_yaml@2.9.1/node_modules/astro/dist/runtime/server/render/astro/head-and-content.js
var headAndContentSym = /* @__PURE__ */ Symbol.for("astro.headAndContent");
function isHeadAndContent(obj) {
	return typeof obj === "object" && obj !== null && !!obj[headAndContentSym];
}
function createThinHead() {
	return { [headAndContentSym]: true };
}
//#endregion
//#region node_modules/.pnpm/astro@7.3.4_@emnapi+core@1.11.3_@emnapi+runtime@1.11.3_@types+node@24.13.6_idb-keyval@6.3.0_jiti@2.7.0_yaml@2.9.1/node_modules/astro/dist/runtime/server/astro-island.prebuilt.js
var astro_island_prebuilt_default = `(()=>{var g=Object.defineProperty;var w=(a,s,c)=>s in a?g(a,s,{enumerable:!0,configurable:!0,writable:!0,value:c}):a[s]=c;var l=(a,s,c)=>w(a,typeof s!="symbol"?s+"":s,c);var E=new Set(["__proto__","constructor","prototype"]);{let a={0:t=>y(t),1:t=>c(t),2:t=>new RegExp(t),3:t=>new Date(t),4:t=>new Map(c(t)),5:t=>new Set(c(t)),6:t=>BigInt(t),7:t=>new URL(t),8:t=>new Uint8Array(t),9:t=>new Uint16Array(t),10:t=>new Uint32Array(t),11:t=>Number.POSITIVE_INFINITY*t},s=t=>{let[p,e]=t;return p in a?a[p](e):void 0},c=t=>t.map(s),y=t=>typeof t!="object"||t===null?t:Object.fromEntries(Object.entries(t).map(([p,e])=>[p,s(e)]));class f extends HTMLElement{constructor(){super(...arguments);l(this,"Component");l(this,"hydrator");l(this,"hydrate",async()=>{var b;if(!this.hydrator||!this.isConnected)return;let e=(b=this.parentElement)==null?void 0:b.closest("astro-island[ssr]");if(e){e.addEventListener("astro:hydrate",this.hydrate,{once:!0});return}let r=this.querySelectorAll("astro-slot"),n={},d=this.querySelectorAll("template[data-astro-template]");for(let o of d){let i=o.closest(this.tagName);i!=null&&i.isSameNode(this)&&(n[o.getAttribute("data-astro-template")||"default"]=o.innerHTML,o.remove())}for(let o of r){let i=o.closest(this.tagName);i!=null&&i.isSameNode(this)&&(n[o.getAttribute("name")||"default"]=o.innerHTML)}let u;try{u=this.hasAttribute("props")?y(JSON.parse(this.getAttribute("props"))):{}}catch(o){let i=this.getAttribute("component-url")||"<unknown>",v=this.getAttribute("component-export");throw v&&(i+=\` (export \${v})\`),console.error(\`[hydrate] Error parsing props for component \${i}\`,this.getAttribute("props"),o),o}let h;await this.hydrator(this)(this.Component,u,n,{client:this.getAttribute("client")}),this.removeAttribute("ssr"),this.dispatchEvent(new CustomEvent("astro:hydrate"))});l(this,"unmount",()=>{this.isConnected||this.dispatchEvent(new CustomEvent("astro:unmount"))})}disconnectedCallback(){document.removeEventListener("astro:after-swap",this.unmount),document.addEventListener("astro:after-swap",this.unmount,{once:!0})}connectedCallback(){if(!this.hasAttribute("await-children")||document.readyState==="interactive"||document.readyState==="complete")this.childrenConnectedCallback();else{let e=()=>{document.removeEventListener("DOMContentLoaded",e),r.disconnect(),this.childrenConnectedCallback()},r=new MutationObserver(()=>{var n;((n=this.lastChild)==null?void 0:n.nodeType)===Node.COMMENT_NODE&&this.lastChild.nodeValue==="astro:end"&&(this.lastChild.remove(),e())});r.observe(this,{childList:!0}),document.addEventListener("DOMContentLoaded",e)}}async childrenConnectedCallback(){let e=this.getAttribute("before-hydration-url");e&&await import(e),this.start()}getRetryImportUrl(e){let r=new URL(e,document.baseURI);return r.searchParams.set("astro-retry",Date.now().toString()),r.toString()}async importWithRetry(e){try{return await import(e)}catch(r){return await new Promise(n=>setTimeout(n,1e3)),import(this.getRetryImportUrl(e))}}handleHydrationError(e){let r=this.getAttribute("component-url"),n=new CustomEvent("astro:hydration-error",{cancelable:!0,bubbles:!0,composed:!0,detail:{error:e,componentUrl:r}});this.dispatchEvent(n)&&console.error(\`[astro-island] Error hydrating \${r}\`,e)}async start(){let e=JSON.parse(this.getAttribute("opts")),r=this.getAttribute("client");if(Astro[r]===void 0){window.addEventListener(\`astro:\${r}\`,()=>this.start(),{once:!0});return}try{await Astro[r](async()=>{let n=this.getAttribute("renderer-url");try{let[d,{default:u}]=await Promise.all([this.importWithRetry(this.getAttribute("component-url")),n?this.importWithRetry(n):Promise.resolve({default:()=>()=>{}})]),h=this.getAttribute("component-export")||"default";if(h.includes(".")){this.Component=d;for(let m of h.split(".")){if(E.has(m)||!this.Component||typeof this.Component!="object"&&typeof this.Component!="function"||!Object.hasOwn(this.Component,m))throw new Error(\`Invalid component export path: \${h}\`);this.Component=this.Component[m]}}else{if(E.has(h))throw new Error(\`Invalid component export path: \${h}\`);this.Component=d[h]}return this.hydrator=u,this.hydrate}catch(d){return this.handleHydrationError(d),()=>{}}},e,this)}catch(n){this.handleHydrationError(n)}}attributeChangedCallback(){this.hydrate()}}l(f,"observedAttributes",["props"]),customElements.get("astro-island")||customElements.define("astro-island",f)}})();`;
//#endregion
//#region node_modules/.pnpm/astro@7.3.4_@emnapi+core@1.11.3_@emnapi+runtime@1.11.3_@types+node@24.13.6_idb-keyval@6.3.0_jiti@2.7.0_yaml@2.9.1/node_modules/astro/dist/runtime/server/astro-island.prebuilt-dev.js
var astro_island_prebuilt_dev_default = `(()=>{var g=Object.defineProperty;var w=(c,s,d)=>s in c?g(c,s,{enumerable:!0,configurable:!0,writable:!0,value:d}):c[s]=d;var l=(c,s,d)=>w(c,typeof s!="symbol"?s+"":s,d);var E=new Set(["__proto__","constructor","prototype"]);{let c={0:t=>y(t),1:t=>d(t),2:t=>new RegExp(t),3:t=>new Date(t),4:t=>new Map(d(t)),5:t=>new Set(d(t)),6:t=>BigInt(t),7:t=>new URL(t),8:t=>new Uint8Array(t),9:t=>new Uint16Array(t),10:t=>new Uint32Array(t),11:t=>Number.POSITIVE_INFINITY*t},s=t=>{let[p,e]=t;return p in c?c[p](e):void 0},d=t=>t.map(s),y=t=>typeof t!="object"||t===null?t:Object.fromEntries(Object.entries(t).map(([p,e])=>[p,s(e)]));class f extends HTMLElement{constructor(){super(...arguments);l(this,"Component");l(this,"hydrator");l(this,"hydrate",async()=>{var b;if(!this.hydrator||!this.isConnected)return;let e=(b=this.parentElement)==null?void 0:b.closest("astro-island[ssr]");if(e){e.addEventListener("astro:hydrate",this.hydrate,{once:!0});return}let r=this.querySelectorAll("astro-slot"),n={},h=this.querySelectorAll("template[data-astro-template]");for(let o of h){let a=o.closest(this.tagName);a!=null&&a.isSameNode(this)&&(n[o.getAttribute("data-astro-template")||"default"]=o.innerHTML,o.remove())}for(let o of r){let a=o.closest(this.tagName);a!=null&&a.isSameNode(this)&&(n[o.getAttribute("name")||"default"]=o.innerHTML)}let m;try{m=this.hasAttribute("props")?y(JSON.parse(this.getAttribute("props"))):{}}catch(o){let a=this.getAttribute("component-url")||"<unknown>",v=this.getAttribute("component-export");throw v&&(a+=\` (export \${v})\`),console.error(\`[hydrate] Error parsing props for component \${a}\`,this.getAttribute("props"),o),o}let i,u=this.hydrator(this);i=performance.now(),await u(this.Component,m,n,{client:this.getAttribute("client")}),i&&this.setAttribute("client-render-time",(performance.now()-i).toString()),this.removeAttribute("ssr"),this.dispatchEvent(new CustomEvent("astro:hydrate"))});l(this,"unmount",()=>{this.isConnected||this.dispatchEvent(new CustomEvent("astro:unmount"))})}disconnectedCallback(){document.removeEventListener("astro:after-swap",this.unmount),document.addEventListener("astro:after-swap",this.unmount,{once:!0})}connectedCallback(){if(!this.hasAttribute("await-children")||document.readyState==="interactive"||document.readyState==="complete")this.childrenConnectedCallback();else{let e=()=>{document.removeEventListener("DOMContentLoaded",e),r.disconnect(),this.childrenConnectedCallback()},r=new MutationObserver(()=>{var n;((n=this.lastChild)==null?void 0:n.nodeType)===Node.COMMENT_NODE&&this.lastChild.nodeValue==="astro:end"&&(this.lastChild.remove(),e())});r.observe(this,{childList:!0}),document.addEventListener("DOMContentLoaded",e)}}async childrenConnectedCallback(){let e=this.getAttribute("before-hydration-url");e&&await import(e),this.start()}getRetryImportUrl(e){let r=new URL(e,document.baseURI);return r.searchParams.set("astro-retry",Date.now().toString()),r.toString()}async importWithRetry(e){try{return await import(e)}catch(r){return await new Promise(n=>setTimeout(n,1e3)),import(this.getRetryImportUrl(e))}}handleHydrationError(e){let r=this.getAttribute("component-url"),n=new CustomEvent("astro:hydration-error",{cancelable:!0,bubbles:!0,composed:!0,detail:{error:e,componentUrl:r}});this.dispatchEvent(n)&&console.error(\`[astro-island] Error hydrating \${r}\`,e)}async start(){let e=JSON.parse(this.getAttribute("opts")),r=this.getAttribute("client");if(Astro[r]===void 0){window.addEventListener(\`astro:\${r}\`,()=>this.start(),{once:!0});return}try{await Astro[r](async()=>{let n=this.getAttribute("renderer-url");try{let[h,{default:m}]=await Promise.all([this.importWithRetry(this.getAttribute("component-url")),n?this.importWithRetry(n):Promise.resolve({default:()=>()=>{}})]),i=this.getAttribute("component-export")||"default";if(i.includes(".")){this.Component=h;for(let u of i.split(".")){if(E.has(u)||!this.Component||typeof this.Component!="object"&&typeof this.Component!="function"||!Object.hasOwn(this.Component,u))throw new Error(\`Invalid component export path: \${i}\`);this.Component=this.Component[u]}}else{if(E.has(i))throw new Error(\`Invalid component export path: \${i}\`);this.Component=h[i]}return this.hydrator=m,this.hydrate}catch(h){return this.handleHydrationError(h),()=>{}}},e,this)}catch(n){this.handleHydrationError(n)}}attributeChangedCallback(){this.hydrate()}}l(f,"observedAttributes",["props"]),customElements.get("astro-island")||customElements.define("astro-island",f)}})();`;
//#endregion
//#region node_modules/.pnpm/astro@7.3.4_@emnapi+core@1.11.3_@emnapi+runtime@1.11.3_@types+node@24.13.6_idb-keyval@6.3.0_jiti@2.7.0_yaml@2.9.1/node_modules/astro/dist/runtime/server/astro-island-styles.js
var ISLAND_STYLES = "astro-island,astro-slot,astro-static-slot{display:contents}";
//#endregion
//#region node_modules/.pnpm/astro@7.3.4_@emnapi+core@1.11.3_@emnapi+runtime@1.11.3_@types+node@24.13.6_idb-keyval@6.3.0_jiti@2.7.0_yaml@2.9.1/node_modules/astro/dist/runtime/server/scripts.js
function determineIfNeedsHydrationScript(result) {
	if (result._metadata.templateDepth > 0) return !result._metadata.hasHydrationScript;
	if (result._metadata.hasHydrationScript) return false;
	return result._metadata.hasHydrationScript = true;
}
function determinesIfNeedsDirectiveScript(result, directive) {
	if (result._metadata.templateDepth > 0) return !result._metadata.hasDirectives.has(directive);
	if (result._metadata.hasDirectives.has(directive)) return false;
	result._metadata.hasDirectives.add(directive);
	return true;
}
function getDirectiveScriptText(result, directive) {
	const clientDirective = result.clientDirectives.get(directive);
	if (!clientDirective) throw new Error(`Unknown directive: ${directive}`);
	return clientDirective;
}
function getPrescripts(result, type, directive) {
	switch (type) {
		case "both": return `<style>${ISLAND_STYLES}</style><script>${getDirectiveScriptText(result, directive)}<\/script><script>${process.env.NODE_ENV === "development" ? astro_island_prebuilt_dev_default : astro_island_prebuilt_default}<\/script>`;
		case "directive": return `<script>${getDirectiveScriptText(result, directive)}<\/script>`;
	}
}
//#endregion
//#region node_modules/.pnpm/astro@7.3.4_@emnapi+core@1.11.3_@emnapi+runtime@1.11.3_@types+node@24.13.6_idb-keyval@6.3.0_jiti@2.7.0_yaml@2.9.1/node_modules/astro/dist/core/head-propagation/buffer.js
async function collectPropagatedHeadParts(input) {
	const collectedHeadParts = [];
	const pendingSlotEvaluations = input.result._metadata?.pendingSlotEvaluations ?? [];
	const drainPendingSlots = async () => {
		while (pendingSlotEvaluations.length > 0) {
			const batch = pendingSlotEvaluations.splice(0, pendingSlotEvaluations.length);
			await Promise.all(batch);
		}
	};
	await drainPendingSlots();
	for (const propagator of input.propagators) {
		const returnValue = await propagator.init(input.result);
		if (input.isHeadAndContent(returnValue) && returnValue.head) collectedHeadParts.push(returnValue.head);
		await drainPendingSlots();
	}
	return collectedHeadParts;
}
//#endregion
//#region node_modules/.pnpm/astro@7.3.4_@emnapi+core@1.11.3_@emnapi+runtime@1.11.3_@types+node@24.13.6_idb-keyval@6.3.0_jiti@2.7.0_yaml@2.9.1/node_modules/astro/dist/core/head-propagation/policy.js
function shouldRenderHeadInstruction(state) {
	return !state.hasRenderedHead && !state.partial;
}
function shouldRenderMaybeHeadInstruction(state) {
	return !state.hasRenderedHead && !state.headInTree && !state.partial;
}
function shouldRenderInstruction$1(type, state) {
	return type === "head" ? shouldRenderHeadInstruction(state) : shouldRenderMaybeHeadInstruction(state);
}
//#endregion
//#region node_modules/.pnpm/astro@7.3.4_@emnapi+core@1.11.3_@emnapi+runtime@1.11.3_@types+node@24.13.6_idb-keyval@6.3.0_jiti@2.7.0_yaml@2.9.1/node_modules/astro/dist/runtime/server/render/head-propagation/runtime.js
function registerIfPropagating(result, factory, instance) {
	if (factory.propagation === "self" || factory.propagation === "in-tree") {
		result._metadata.propagators.add(instance);
		return;
	}
	if (factory.moduleId) {
		const hint = result.componentMetadata.get(factory.moduleId)?.propagation;
		if (isPropagatingHint(hint ?? "none")) result._metadata.propagators.add(instance);
	}
}
async function bufferPropagatedHead(result) {
	const collected = await collectPropagatedHeadParts({
		propagators: result._metadata.propagators,
		result,
		isHeadAndContent
	});
	result._metadata.extraHead.push(...collected);
}
function shouldRenderInstruction(type, state) {
	return shouldRenderInstruction$1(type, state);
}
function getInstructionRenderState(result) {
	return {
		hasRenderedHead: result._metadata.hasRenderedHead,
		headInTree: result._metadata.headInTree,
		partial: result.partial
	};
}
//#endregion
//#region node_modules/.pnpm/astro@7.3.4_@emnapi+core@1.11.3_@emnapi+runtime@1.11.3_@types+node@24.13.6_idb-keyval@6.3.0_jiti@2.7.0_yaml@2.9.1/node_modules/astro/dist/core/csp/runtime.js
function normalizeCspResourceEntry(entry) {
	if (typeof entry === "string") return {
		resource: entry,
		kind: "default"
	};
	return {
		resource: entry.resource,
		kind: entry.kind ?? "default"
	};
}
function normalizeCspHashEntry(entry) {
	if (typeof entry === "string") return {
		hash: entry,
		kind: "default"
	};
	return {
		hash: entry.hash,
		kind: entry.kind ?? "default"
	};
}
function partitionByKind(directive) {
	const groups = {
		default: {
			resources: [],
			hashes: []
		},
		element: {
			resources: [],
			hashes: []
		},
		attribute: {
			resources: [],
			hashes: []
		}
	};
	for (const entry of directive.resources) {
		const { resource, kind } = normalizeCspResourceEntry(entry);
		groups[kind].resources.push(resource);
	}
	for (const entry of directive.hashes) {
		const { hash, kind } = normalizeCspHashEntry(entry);
		groups[kind].hashes.push(hash);
	}
	return groups;
}
function deduplicateDirectiveValues(existingDirective, newDirective) {
	const [directiveName, ...existingValues] = existingDirective.split(/\s+/).filter(Boolean);
	const [newDirectiveName, ...newValues] = newDirective.split(/\s+/).filter(Boolean);
	if (directiveName !== newDirectiveName) return;
	return `${directiveName} ${Array.from(/* @__PURE__ */ new Set([...existingValues, ...newValues])).join(" ")}`;
}
function pushDirective(directives, newDirective) {
	if (directives.length === 0) return [newDirective];
	const finalDirectives = [];
	let matched = false;
	for (const directive of directives) {
		if (matched) {
			finalDirectives.push(directive);
			continue;
		}
		const result = deduplicateDirectiveValues(directive, newDirective);
		if (result) {
			finalDirectives.push(result);
			matched = true;
		} else finalDirectives.push(directive);
	}
	if (!matched) finalDirectives.push(newDirective);
	return finalDirectives;
}
//#endregion
//#region node_modules/.pnpm/astro@7.3.4_@emnapi+core@1.11.3_@emnapi+runtime@1.11.3_@types+node@24.13.6_idb-keyval@6.3.0_jiti@2.7.0_yaml@2.9.1/node_modules/astro/dist/runtime/server/render/csp.js
function renderCspContent(result) {
	const { scriptDirective, styleDirective, directives } = result;
	const script = partitionByKind(scriptDirective);
	const style = partitionByKind(styleDirective);
	const finalScriptHashes = /* @__PURE__ */ new Set();
	for (const scriptHash of script.default.hashes) finalScriptHashes.add(`'${scriptHash}'`);
	for (const scriptHash of result._metadata.extraScriptHashes) finalScriptHashes.add(`'${scriptHash}'`);
	const finalStyleHashes = /* @__PURE__ */ new Set();
	for (const styleHash of style.default.hashes) finalStyleHashes.add(`'${styleHash}'`);
	for (const styleHash of result._metadata.extraStyleHashes) finalStyleHashes.add(`'${styleHash}'`);
	let directivesContent;
	if (directives.length > 0) directivesContent = directives.join(";") + ";";
	const scriptResources = script.default.resources.length > 0 ? script.default.resources.join(" ") : "'self'";
	const styleResources = style.default.resources.length > 0 ? style.default.resources.join(" ") : "'self'";
	const scriptElementDefaultResource = script.default.resources.length > 0 ? "" : "'self'";
	const styleElementDefaultResource = style.default.resources.length > 0 ? "" : "'self'";
	const scriptElemActive = isEnabled(script.element);
	const styleElemActive = isEnabled(style.element);
	const strictDynamicSuffix = scriptDirective.strictDynamic ? ` 'strict-dynamic'` : "";
	const scriptDefaultHasUnsafeInline = hasUnsafeInline(script.default.resources);
	const styleDefaultHasUnsafeInline = hasUnsafeInline(style.default.resources);
	const scriptSrc = `script-src ${scriptResources} ${[...scriptElemActive || scriptDefaultHasUnsafeInline ? [] : [...finalScriptHashes], ...scriptDirective.strictDynamic ? [`'strict-dynamic'`] : []].join(" ")};`;
	const styleSrc = `style-src ${styleResources} ${(styleElemActive || styleDefaultHasUnsafeInline ? [] : [...finalStyleHashes]).join(" ")};`;
	const scriptSrcElem = scriptElemActive ? renderSpecificDirective("script-src-elem", script.element.resources, scriptElementDefaultResource, finalScriptHashes, script.element.hashes, strictDynamicSuffix) : void 0;
	const scriptSrcAttr = isEnabled(script.attribute) ? renderSpecificDirective("script-src-attr", script.attribute.resources, "'none'", void 0, script.attribute.hashes) : void 0;
	const styleSrcElem = styleElemActive ? renderSpecificDirective("style-src-elem", style.element.resources, styleElementDefaultResource, finalStyleHashes, style.element.hashes) : void 0;
	const styleSrcAttr = isEnabled(style.attribute) ? renderSpecificDirective("style-src-attr", style.attribute.resources, "'none'", void 0, style.attribute.hashes) : void 0;
	return [
		directivesContent,
		scriptSrc,
		scriptSrcElem,
		scriptSrcAttr,
		styleSrc,
		styleSrcElem,
		styleSrcAttr
	].filter(Boolean).join(" ");
}
function hasUnsafeInline(resources) {
	return resources.includes("'unsafe-inline'");
}
function isEnabled(sources) {
	return sources.resources.length > 0 || sources.hashes.length > 0;
}
function renderSpecificDirective(name, resources, defaultResource, sharedHashes, ownHashes, suffix = "") {
	const unsafeInline = hasUnsafeInline(resources);
	const hashes = new Set(unsafeInline ? void 0 : sharedHashes);
	if (!unsafeInline) for (const hash of ownHashes) hashes.add(`'${hash}'`);
	let finalResources;
	if (resources.length > 0) finalResources = resources.map((r) => `${r}`).join(" ");
	else if (defaultResource === "'none'" && hashes.size > 0) finalResources = "";
	else finalResources = defaultResource;
	return `${name} ${[finalResources, ...hashes].filter(Boolean).join(" ")}${suffix};`;
}
//#endregion
//#region node_modules/.pnpm/astro@7.3.4_@emnapi+core@1.11.3_@emnapi+runtime@1.11.3_@types+node@24.13.6_idb-keyval@6.3.0_jiti@2.7.0_yaml@2.9.1/node_modules/astro/dist/runtime/server/render/instruction.js
var RenderInstructionSymbol = /* @__PURE__ */ Symbol.for("astro:render");
function createRenderInstruction(instruction) {
	instruction[RenderInstructionSymbol] = true;
	return instruction;
}
function isRenderInstruction(chunk) {
	return chunk && typeof chunk === "object" && chunk[RenderInstructionSymbol];
}
function isScriptInstruction(chunk) {
	return chunk && typeof chunk === "object" && "type" in chunk && chunk.type === "script";
}
//#endregion
//#region node_modules/.pnpm/astro@7.3.4_@emnapi+core@1.11.3_@emnapi+runtime@1.11.3_@types+node@24.13.6_idb-keyval@6.3.0_jiti@2.7.0_yaml@2.9.1/node_modules/astro/dist/runtime/server/render/util.js
var voidElementNames = /^(area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)$/i;
var htmlBooleanAttributes = /^(?:allowfullscreen|async|autofocus|autoplay|checked|controls|default|defer|disabled|disablepictureinpicture|disableremoteplayback|formnovalidate|inert|loop|muted|nomodule|novalidate|open|playsinline|readonly|required|reversed|scoped|seamless|selected|itemscope)$/i;
var AMPERSAND_REGEX = /&/g;
var DOUBLE_QUOTE_REGEX = /"/g;
var STATIC_DIRECTIVES = /* @__PURE__ */ new Set(["set:html", "set:text"]);
var INVALID_ATTR_NAME_CHAR = /[\s"'>/=]/;
var toIdent = (k) => k.trim().replace(/(?!^)\b\w|\s+|\W+/g, (match, index) => {
	if (/\W/.test(match)) return "";
	return index === 0 ? match : match.toUpperCase();
});
var toAttributeString = (value, shouldEscape = true) => {
	if (!shouldEscape) return value;
	const str = String(value);
	if (!str.includes("&") && !str.includes("\"")) return str;
	return str.replace(AMPERSAND_REGEX, "&amp;").replace(DOUBLE_QUOTE_REGEX, "&quot;");
};
var kebab = (k) => k.toLowerCase() === k ? k : k.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
var toStyleString = (obj) => {
	let output = "";
	for (const key of Object.keys(obj)) {
		const value = obj[key];
		if (!(typeof value === "string" && value.trim() || typeof value === "number")) continue;
		if (output) output += ";";
		output += key[0] !== "-" && key[1] !== "-" ? `${kebab(key)}:${value}` : `${key}:${value}`;
	}
	return output;
};
function defineScriptVars(vars) {
	let output = "";
	for (const [key, value] of Object.entries(vars)) output += `const ${toIdent(key)} = ${stringifyForScript(value)};
`;
	return markHTMLString(output);
}
function formatList(values) {
	if (values.length === 1) return values[0];
	return `${values.slice(0, -1).join(", ")} or ${values[values.length - 1]}`;
}
function isCustomElement(tagName) {
	return tagName.includes("-");
}
function handleBooleanAttribute(key, value, shouldEscape, tagName) {
	if (key === "popover") return markHTMLString(value ? ` ${key}` : "");
	if (tagName && isCustomElement(tagName)) return markHTMLString(` ${key}="${toAttributeString(value, shouldEscape)}"`);
	return markHTMLString(value ? ` ${key}` : "");
}
var ATTRIBUTE_KIND = {
	ORDINARY: 0,
	INVALID_NAME: 1,
	STATIC_DIRECTIVE: 2,
	CLASS_LIST: 3,
	STYLE: 4,
	CLASS_NAME: 5,
	BOOLEAN: 6,
	BOOLEAN_IF_BOOLEAN: 7
};
function classifyAttribute(key) {
	if (INVALID_ATTR_NAME_CHAR.test(key)) return ATTRIBUTE_KIND.INVALID_NAME;
	if (STATIC_DIRECTIVES.has(key)) return ATTRIBUTE_KIND.STATIC_DIRECTIVE;
	if (key === "class:list") return ATTRIBUTE_KIND.CLASS_LIST;
	if (key === "style") return ATTRIBUTE_KIND.STYLE;
	if (key === "className") return ATTRIBUTE_KIND.CLASS_NAME;
	if (htmlBooleanAttributes.test(key)) return ATTRIBUTE_KIND.BOOLEAN;
	if (key === "popover" || key === "download" || key === "hidden") return ATTRIBUTE_KIND.BOOLEAN_IF_BOOLEAN;
	return ATTRIBUTE_KIND.ORDINARY;
}
function addAttribute(value, key, shouldEscape = true, tagName = "") {
	if (value == null) return "";
	switch (classifyAttribute(key)) {
		case ATTRIBUTE_KIND.INVALID_NAME: return "";
		case ATTRIBUTE_KIND.STATIC_DIRECTIVE:
			console.warn(`[astro] The "${key}" directive cannot be applied dynamically at runtime. It will not be rendered as an attribute.

Make sure to use the static attribute syntax (\`${key}={value}\`) instead of the dynamic spread syntax (\`{...{ "${key}": value }}\`).`);
			return "";
		case ATTRIBUTE_KIND.CLASS_LIST: {
			const listValue = toAttributeString(clsx(value), shouldEscape);
			if (listValue === "") return "";
			return markHTMLString(` class="${listValue}"`);
		}
		case ATTRIBUTE_KIND.STYLE:
			if (!(value instanceof HTMLString)) {
				if (Array.isArray(value) && value.length === 2) return markHTMLString(` style="${toAttributeString(`${toStyleString(value[0])};${value[1]}`, shouldEscape)}"`);
				if (typeof value === "object") return markHTMLString(` style="${toAttributeString(toStyleString(value), shouldEscape)}"`);
			}
			break;
		case ATTRIBUTE_KIND.CLASS_NAME: return markHTMLString(` class="${toAttributeString(value, shouldEscape)}"`);
		case ATTRIBUTE_KIND.BOOLEAN: return handleBooleanAttribute(key, value, shouldEscape, tagName);
		case ATTRIBUTE_KIND.BOOLEAN_IF_BOOLEAN:
			if (typeof value === "boolean") return handleBooleanAttribute(key, value, shouldEscape, tagName);
			break;
		case ATTRIBUTE_KIND.ORDINARY:
	}
	if (value === "") return markHTMLString(` ${key}`);
	return markHTMLString(` ${key}="${toAttributeString(value, shouldEscape)}"`);
}
function spreadElementAttributes(values) {
	let output = "";
	for (const key of Object.keys(values)) {
		if (key === "children") continue;
		output += addAttribute(values[key], key, true);
	}
	return output;
}
function internalSpreadAttributes(values, shouldEscape = true, tagName) {
	let output = "";
	for (const key of Object.keys(values)) output += addAttribute(values[key], key, shouldEscape, tagName);
	return markHTMLString(output);
}
function renderElement$1(name, { props: _props, children = "" }, shouldEscape = true) {
	const { lang: _, "data-astro-id": astroId, "define:vars": defineVars, ...props } = _props;
	if (defineVars) {
		if (name === "style") {
			delete props["is:global"];
			delete props["is:scoped"];
		}
		if (name === "script") {
			delete props.hoist;
			children = defineScriptVars(defineVars) + "\n" + children;
		}
	}
	if ((children == null || children === "") && voidElementNames.test(name)) return `<${name}${internalSpreadAttributes(props, shouldEscape, name)}>`;
	return `<${name}${internalSpreadAttributes(props, shouldEscape, name)}>${children}</${name}>`;
}
var noop = () => {};
var BufferedRenderer = class {
	chunks = [];
	renderPromise;
	destination;
	/**
	* Determines whether buffer has been flushed
	* to the final destination.
	*/
	flushed = false;
	constructor(destination, renderFunction) {
		this.destination = destination;
		this.renderPromise = renderFunction(this);
		if (isPromise(this.renderPromise)) Promise.resolve(this.renderPromise).catch(noop);
	}
	write(chunk) {
		if (this.flushed) this.destination.write(chunk);
		else this.chunks.push(chunk);
	}
	flush() {
		if (this.flushed) throw new Error("The render buffer has already been flushed.");
		this.flushed = true;
		for (const chunk of this.chunks) this.destination.write(chunk);
		return this.renderPromise;
	}
};
function createBufferedRenderer(destination, renderFunction) {
	return new BufferedRenderer(destination, renderFunction);
}
var isNode = typeof process !== "undefined" && Object.prototype.toString.call(process) === "[object process]";
var isDeno = typeof Deno !== "undefined";
var isWorkerd = typeof navigator !== "undefined" && navigator.userAgent === "Cloudflare-Workers";
function promiseWithResolvers() {
	let resolve, reject;
	return {
		promise: new Promise((_resolve, _reject) => {
			resolve = _resolve;
			reject = _reject;
		}),
		resolve,
		reject
	};
}
//#endregion
//#region node_modules/.pnpm/astro@7.3.4_@emnapi+core@1.11.3_@emnapi+runtime@1.11.3_@types+node@24.13.6_idb-keyval@6.3.0_jiti@2.7.0_yaml@2.9.1/node_modules/astro/dist/runtime/server/render/head.js
function stablePropsKey(props) {
	const keys = Object.keys(props).sort();
	let result = "{";
	for (let i = 0; i < keys.length; i++) {
		if (i > 0) result += ",";
		result += JSON.stringify(keys[i]) + ":" + JSON.stringify(props[keys[i]]);
	}
	result += "}";
	return result;
}
function deduplicateElements(elements) {
	if (elements.length <= 1) return elements;
	const seen = /* @__PURE__ */ new Set();
	return elements.filter((item) => {
		const key = stablePropsKey(item.props) + item.children;
		if (seen.has(key)) return false;
		seen.add(key);
		return true;
	});
}
function renderAllHeadContent(result) {
	result._metadata.hasRenderedHead = true;
	let content = "";
	if (result.shouldInjectCspMetaTags && result.cspDestination === "meta") content += renderElement$1("meta", {
		props: {
			"http-equiv": "content-security-policy",
			content: renderCspContent(result)
		},
		children: ""
	}, false);
	const styles = deduplicateElements(Array.from(result.styles)).map((style) => style.props.rel === "stylesheet" ? renderElement$1("link", style) : renderElement$1("style", style));
	result.styles.clear();
	const scripts = deduplicateElements(Array.from(result.scripts)).map((script) => {
		if (result.userAssetsBase) script.props.src = (result.base === "/" ? "" : result.base) + result.userAssetsBase + script.props.src;
		return renderElement$1("script", script, false);
	});
	const links = deduplicateElements(Array.from(result.links)).map((link) => renderElement$1("link", link, false));
	const sep = result.compressHTML === true || result.compressHTML === "jsx" ? "" : "\n";
	content += styles.join(sep) + links.join(sep) + scripts.join(sep);
	if (result.speculationRulesContent) content += renderElement$1("script", {
		props: { type: "speculationrules" },
		children: result.speculationRulesContent
	}, false);
	content += result._metadata.extraHead.join("");
	return markHTMLString(content);
}
var HEAD_INSTRUCTION = Object.freeze(createRenderInstruction({ type: "head" }));
var MAYBE_HEAD_INSTRUCTION = Object.freeze(createRenderInstruction({ type: "maybe-head" }));
function renderHead() {
	return HEAD_INSTRUCTION;
}
function maybeRenderHead() {
	return MAYBE_HEAD_INSTRUCTION;
}
//#endregion
//#region node_modules/.pnpm/astro@7.3.4_@emnapi+core@1.11.3_@emnapi+runtime@1.11.3_@types+node@24.13.6_idb-keyval@6.3.0_jiti@2.7.0_yaml@2.9.1/node_modules/astro/dist/runtime/server/render/server-islands-shared.js
var SERVER_ISLAND_START = "[if astro]>server-island-start<![endif]";
//#endregion
//#region node_modules/.pnpm/astro@7.3.4_@emnapi+core@1.11.3_@emnapi+runtime@1.11.3_@types+node@24.13.6_idb-keyval@6.3.0_jiti@2.7.0_yaml@2.9.1/node_modules/astro/dist/runtime/server/render/astro/render-template.js
var renderTemplateResultSym = /* @__PURE__ */ Symbol.for("astro.renderTemplateResult");
var markedHtmlParts = /* @__PURE__ */ new WeakMap();
function markHtmlParts(htmlParts) {
	let marked = markedHtmlParts.get(htmlParts);
	if (marked === void 0) {
		marked = new Array(htmlParts.length);
		for (let i = 0; i < htmlParts.length; i++) marked[i] = htmlParts[i] ? markHTMLString(htmlParts[i]) : htmlParts[i];
		markedHtmlParts.set(htmlParts, marked);
	}
	return marked;
}
var RenderTemplateResult = class {
	[renderTemplateResultSym] = true;
	htmlParts;
	expressions;
	error;
	wrapped;
	constructor(htmlParts, expressions) {
		this.htmlParts = htmlParts;
		this.error = void 0;
		this.expressions = expressions;
	}
	catchExpressionError(index, expression) {
		if (this.wrapped?.has(index)) return expression;
		const wrapped = Promise.resolve(expression).catch((err) => {
			if (!this.error) {
				this.error = err;
				throw err;
			}
		});
		(this.wrapped ??= /* @__PURE__ */ new Set()).add(index);
		this.expressions[index] = wrapped;
		return wrapped;
	}
	render(destination) {
		const { expressions } = this;
		const htmlParts = markHtmlParts(this.htmlParts);
		for (let i = 0; i < htmlParts.length; i++) {
			const html = htmlParts[i];
			if (html) destination.write(html);
			if (i >= expressions.length) break;
			let exp = expressions[i];
			if (!(exp || exp === 0)) continue;
			if (isPromise(exp)) exp = this.catchExpressionError(i, exp);
			const result = renderChild(destination, exp);
			if (isPromise(result)) {
				const startIdx = i + 1;
				const remaining = expressions.length - startIdx;
				const flushers = new Array(remaining);
				for (let j = 0; j < remaining; j++) {
					let rExp = expressions[startIdx + j];
					if (isPromise(rExp)) rExp = this.catchExpressionError(startIdx + j, rExp);
					flushers[j] = createBufferedRenderer(destination, (bufferDestination) => {
						if (rExp || rExp === 0) return renderChild(bufferDestination, rExp);
					});
				}
				return result.then(() => {
					let k = 0;
					const iterate = () => {
						while (k < flushers.length) {
							const rHtml = htmlParts[startIdx + k];
							if (rHtml) destination.write(rHtml);
							const flushResult = flushers[k++].flush();
							if (isPromise(flushResult)) return flushResult.then(iterate);
						}
						const lastHtml = htmlParts[htmlParts.length - 1];
						if (lastHtml) destination.write(lastHtml);
					};
					return iterate();
				});
			}
		}
	}
};
function isRenderTemplateResult(obj) {
	return typeof obj === "object" && obj !== null && !!obj[renderTemplateResultSym];
}
function renderTemplate(htmlParts, ...expressions) {
	return new RenderTemplateResult(htmlParts, expressions);
}
//#endregion
//#region node_modules/.pnpm/astro@7.3.4_@emnapi+core@1.11.3_@emnapi+runtime@1.11.3_@types+node@24.13.6_idb-keyval@6.3.0_jiti@2.7.0_yaml@2.9.1/node_modules/astro/dist/runtime/server/render/slot.js
var slotString = /* @__PURE__ */ Symbol.for("astro:slot-string");
var SlotString = class extends HTMLString {
	instructions;
	/**
	* The slot's content as an ordered stream. Unlike `instructions` (which holds
	* position-independent instructions like head/hydration content), scripts are
	* kept inline here so they render at their original position instead of being
	* hoisted to the start of the slot output.
	*/
	chunks;
	[slotString];
	constructor(content, instructions, chunks = []) {
		super(content);
		this.instructions = instructions;
		this.chunks = chunks;
		this[slotString] = true;
	}
};
function isSlotString(str) {
	return !!str[slotString];
}
function mergeSlotInstructions(target, source) {
	if (source.instructions?.length) {
		target ??= [];
		target.push(...source.instructions);
	}
	return target;
}
var SlotRenderInstance = class {
	result;
	slotted;
	constructor(result, slotted) {
		this.result = result;
		this.slotted = slotted;
	}
	/** Must be called at most once per instance. */
	evaluate() {
		const { slotted } = this;
		return typeof slotted === "function" ? slotted(this.result) : slotted;
	}
	render(destination) {
		return renderChild(destination, this.evaluate());
	}
};
function renderSlot(result, slotted, fallback) {
	if (!slotted && fallback) return renderSlot(result, fallback);
	return new SlotRenderInstance(result, slotted);
}
async function renderSlotToString(result, slotted, fallback) {
	let content = "";
	let instructions = null;
	const chunks = [];
	await renderSlot(result, slotted, fallback).render({ write(chunk) {
		if (chunk instanceof SlotString) {
			content += chunk;
			if (chunk.chunks.length) chunks.push(...chunk.chunks);
			instructions = mergeSlotInstructions(instructions, chunk);
		} else if (chunk instanceof Response) return;
		else if (typeof chunk === "object" && "type" in chunk && typeof chunk.type === "string") {
			if (isScriptInstruction(chunk)) chunks.push(chunk);
			else {
				if (instructions === null) instructions = [];
				instructions.push(chunk);
			}
		} else {
			const str = chunkToString(result, chunk);
			content += str;
			chunks.push(str);
		}
	} });
	return markHTMLString(new SlotString(content, instructions, chunks));
}
async function renderSlots(result, slots = {}) {
	let slotInstructions = null;
	let children = {};
	if (slots) await Promise.all(Object.entries(slots).map(([key, value]) => renderSlotToString(result, value).then((output) => {
		if (output.instructions) {
			if (slotInstructions === null) slotInstructions = [];
			slotInstructions.push(...output.instructions);
		}
		if (output.chunks) {
			for (const part of output.chunks) if (typeof part !== "string") {
				if (slotInstructions === null) slotInstructions = [];
				slotInstructions.push(part);
			}
		}
		children[key] = output;
	})));
	return {
		slotInstructions,
		children
	};
}
function createSlotValueFromString(content) {
	return function() {
		return renderTemplate`${unescapeHTML(content)}`;
	};
}
//#endregion
//#region node_modules/.pnpm/astro@7.3.4_@emnapi+core@1.11.3_@emnapi+runtime@1.11.3_@types+node@24.13.6_idb-keyval@6.3.0_jiti@2.7.0_yaml@2.9.1/node_modules/astro/dist/runtime/server/render/server-islands.js
var internalProps = /* @__PURE__ */ new Set([
	"server:component-path",
	"server:component-export",
	"server:component-directive",
	"server:defer"
]);
function containsServerDirective(props) {
	return "server:component-directive" in props;
}
function createSearchParams(encryptedComponentExport, encryptedProps, slots) {
	const params = new URLSearchParams();
	params.set("e", encryptedComponentExport);
	params.set("p", encryptedProps);
	params.set("s", slots);
	return params;
}
function isWithinURLLimit(pathname, params) {
	return (pathname + "?" + params.toString()).length < 2048;
}
var ServerIslandComponent = class {
	result;
	props;
	slots;
	displayName;
	hostId;
	islandContent;
	componentPath;
	componentExport;
	componentId;
	constructor(result, props, slots, displayName) {
		this.result = result;
		this.props = props;
		this.slots = slots;
		this.displayName = displayName;
	}
	async init() {
		const content = await this.getIslandContent();
		if (this.result.cspDestination) {
			this.result._metadata.extraScriptHashes.push(await generateCspDigest(SERVER_ISLAND_REPLACER, this.result.cspAlgorithm));
			const contentDigest = await generateCspDigest(content, this.result.cspAlgorithm);
			this.result._metadata.extraScriptHashes.push(contentDigest);
		}
		return createThinHead();
	}
	async render(destination) {
		const hostId = await this.getHostId();
		const islandContent = await this.getIslandContent();
		destination.write(createRenderInstruction({ type: "server-island-runtime" }));
		destination.write(`<!--${SERVER_ISLAND_START}-->`);
		for (const name in this.slots) if (name === "fallback") await renderChild(destination, this.slots.fallback(this.result));
		destination.write(`<script type="module" data-astro-rerun data-island-id="${hostId}">${islandContent}<\/script>`);
	}
	getComponentPath() {
		if (this.componentPath) return this.componentPath;
		const componentPath = this.props["server:component-path"];
		if (!componentPath) throw new Error(`Could not find server component path`);
		this.componentPath = componentPath;
		return componentPath;
	}
	getComponentExport() {
		if (this.componentExport) return this.componentExport;
		const componentExport = this.props["server:component-export"];
		if (!componentExport) throw new Error(`Could not find server component export`);
		this.componentExport = componentExport;
		return componentExport;
	}
	async getHostId() {
		if (!this.hostId) this.hostId = await crypto.randomUUID();
		return this.hostId;
	}
	async getIslandContent() {
		if (this.islandContent) return this.islandContent;
		const componentPath = this.getComponentPath();
		const componentExport = this.getComponentExport();
		let componentId = (await this.result.getServerIslandNameMap()).get(componentPath);
		if (!componentId) throw new Error(`Could not find server component name ${componentPath}`);
		for (const key2 of Object.keys(this.props)) if (internalProps.has(key2)) delete this.props[key2];
		const renderedSlots = {};
		for (const name in this.slots) if (name !== "fallback") {
			const content = await renderSlotToString(this.result, this.slots[name]);
			const slotContent = content;
			let slotHtml = "";
			if (slotContent.chunks?.length) for (const part of slotContent.chunks) slotHtml += typeof part === "string" ? part : part.content;
			else slotHtml = content.toString();
			renderedSlots[name] = slotHtml;
		}
		const key = await this.result.key;
		const componentExportEncrypted = await encryptString(key, componentExport, `export:${componentId}`);
		const propsEncrypted = Object.keys(this.props).length === 0 ? "" : await encryptString(key, JSON.stringify(this.props), `props:${componentId}`);
		const slotsEncrypted = Object.keys(renderedSlots).length === 0 ? "" : await encryptString(key, JSON.stringify(renderedSlots), `slots:${componentId}`);
		const hostId = await this.getHostId();
		const slash = this.result.base.endsWith("/") ? "" : "/";
		let serverIslandUrl = `${this.result.base}${slash}_server-islands/${componentId}${this.result.trailingSlash === "always" ? "/" : ""}`;
		const potentialSearchParams = createSearchParams(componentExportEncrypted, propsEncrypted, slotsEncrypted);
		const useGETRequest = isWithinURLLimit(serverIslandUrl, potentialSearchParams);
		if (useGETRequest) {
			serverIslandUrl += "?" + potentialSearchParams.toString();
			this.result._metadata.extraHead.push(markHTMLString(`<link rel="preload" as="fetch" href="${toAttributeString(serverIslandUrl)}" crossorigin="anonymous">`));
		}
		const headersJson = stringifyForScript(this.result.internalFetchHeaders || {});
		const serverIslandUrlJson = stringifyForScript(serverIslandUrl);
		const method = useGETRequest ? `const headers = new Headers(${headersJson});
let response = await fetch(${serverIslandUrlJson}, { headers });` : `let data = {
	encryptedComponentExport: ${stringifyForScript(componentExportEncrypted)},
	encryptedProps: ${stringifyForScript(propsEncrypted)},
	encryptedSlots: ${stringifyForScript(slotsEncrypted)},
};
const headers = new Headers({ 'Content-Type': 'application/json', ...${headersJson} });
let response = await fetch(${serverIslandUrlJson}, {
	method: 'POST',
	body: JSON.stringify(data),
	headers,
});`;
		this.islandContent = `${method}replaceServerIsland(${stringifyForScript(hostId)}, response);`;
		return this.islandContent;
	}
};
var renderServerIslandRuntime = () => {
	return `<script>${SERVER_ISLAND_REPLACER}<\/script>`;
};
var SERVER_ISLAND_REPLACER = markHTMLString(`async function replaceServerIsland(id, r) {
	let s = document.querySelector(\`script[data-island-id="\${id}"]\`);
	// If there's no matching script, or the request fails then return
	if (!s || r.status !== 200 || r.headers.get('content-type')?.split(';')[0].trim() !== 'text/html') return;
	// Load the HTML before modifying the DOM in case of errors
	let html = await r.text();
	// Remove any placeholder content before the island script
	while (s.previousSibling && s.previousSibling.nodeType !== 8 && s.previousSibling.data !== '${SERVER_ISLAND_START}')
		s.previousSibling.remove();
	s.previousSibling?.remove();
	// Insert the new HTML
	s.before(document.createRange().createContextualFragment(html));
	// Remove the script. Prior to v5.4.2, this was the trick to force rerun of scripts.  Keeping it to minimize change to the existing behavior.
	s.remove();
}`.split("\n").map((line) => line.trim()).filter((line) => line && !line.startsWith("//")).join(" "));
//#endregion
//#region node_modules/.pnpm/astro@7.3.4_@emnapi+core@1.11.3_@emnapi+runtime@1.11.3_@types+node@24.13.6_idb-keyval@6.3.0_jiti@2.7.0_yaml@2.9.1/node_modules/astro/dist/runtime/server/render/common.js
var Fragment = /* @__PURE__ */ Symbol.for("astro:fragment");
var Renderer = /* @__PURE__ */ Symbol.for("astro:renderer");
var encoder = new TextEncoder();
var decoder = new TextDecoder();
function stringifyChunk(result, chunk) {
	if (typeof chunk === "string") return chunk;
	if (isRenderInstruction(chunk)) {
		const instruction = chunk;
		switch (instruction.type) {
			case "directive": {
				const { hydration } = instruction;
				const needsHydrationScript = hydration && determineIfNeedsHydrationScript(result);
				const needsDirectiveScript = hydration && determinesIfNeedsDirectiveScript(result, hydration.directive);
				if (needsHydrationScript) return markHTMLString(getPrescripts(result, "both", hydration.directive));
				else if (needsDirectiveScript) return markHTMLString(getPrescripts(result, "directive", hydration.directive));
				else return "";
			}
			case "head":
				if (!shouldRenderInstruction("head", getInstructionRenderState(result))) return "";
				return renderAllHeadContent(result);
			case "maybe-head":
				if (!shouldRenderInstruction("maybe-head", getInstructionRenderState(result))) return "";
				return renderAllHeadContent(result);
			case "renderer-hydration-script": {
				const { rendererSpecificHydrationScripts } = result._metadata;
				const { rendererName } = instruction;
				if (result._metadata.templateDepth > 0) return instruction.render();
				if (!rendererSpecificHydrationScripts.has(rendererName)) {
					rendererSpecificHydrationScripts.add(rendererName);
					return instruction.render();
				}
				return "";
			}
			case "server-island-runtime":
				if (result._metadata.templateDepth > 0) return renderServerIslandRuntime();
				if (result._metadata.hasRenderedServerIslandRuntime) return "";
				result._metadata.hasRenderedServerIslandRuntime = true;
				return renderServerIslandRuntime();
			case "script": {
				const { id, content } = instruction;
				if (result._metadata.templateDepth > 0) return content;
				if (result._metadata.renderedScripts.has(id)) return "";
				result._metadata.renderedScripts.add(id);
				return content;
			}
			case "template-enter":
				result._metadata.templateDepth++;
				return "";
			case "template-exit":
				if (result._metadata.templateDepth <= 0) throw new Error("Unexpected template-exit instruction without a matching template-enter. This may indicate that the compiler emitted unbalanced template boundaries, or that a component manually injected a template-exit render instruction.");
				result._metadata.templateDepth--;
				return "";
			default: throw new Error(`Unknown chunk type: ${chunk.type}`);
		}
	} else if (chunk instanceof Response) return "";
	else if (isSlotString(chunk)) {
		let out = "";
		const c = chunk;
		if (c.instructions) for (const instr of c.instructions) out += stringifyChunk(result, instr);
		if (c.chunks.length) for (const part of c.chunks) out += typeof part === "string" ? part : stringifyChunk(result, part);
		else out += chunk.toString();
		return out;
	}
	return chunk.toString();
}
function chunkToString(result, chunk) {
	if (ArrayBuffer.isView(chunk)) return decoder.decode(chunk);
	else return stringifyChunk(result, chunk);
}
function chunkToByteArray(result, chunk) {
	if (ArrayBuffer.isView(chunk)) return chunk;
	else {
		const stringified = stringifyChunk(result, chunk);
		return encoder.encode(stringified.toString());
	}
}
function chunkToByteArrayOrString(result, chunk) {
	if (ArrayBuffer.isView(chunk)) return chunk;
	else return stringifyChunk(result, chunk).toString();
}
function isRenderInstance(obj) {
	return typeof obj === "object" && obj !== null && typeof obj.render === "function";
}
//#endregion
//#region node_modules/.pnpm/astro@7.3.4_@emnapi+core@1.11.3_@emnapi+runtime@1.11.3_@types+node@24.13.6_idb-keyval@6.3.0_jiti@2.7.0_yaml@2.9.1/node_modules/astro/dist/runtime/server/render/any.js
function renderChild(destination, child) {
	if (typeof child === "string") {
		destination.write(markHTMLString(escapeHTML(child)));
		return;
	}
	if (isRenderInstruction(child)) {
		destination.write(child);
		return;
	}
	if (isPromise(child)) return child.then((x) => renderChild(destination, x));
	if (isRenderInstance(child)) return child.render(destination);
	if (child instanceof SlotString) {
		destination.write(child);
		return;
	}
	if (isHTMLString(child)) {
		destination.write(child);
		return;
	}
	if (!child && child !== 0) return;
	if (Array.isArray(child)) return renderArray(destination, child);
	if (typeof child === "function") return renderChild(destination, child());
	if (ArrayBuffer.isView(child)) {
		destination.write(child);
		return;
	}
	if (typeof child === "object" && (Symbol.asyncIterator in child || Symbol.iterator in child)) {
		if (Symbol.asyncIterator in child) return renderAsyncIterable(destination, child);
		return renderIterable(destination, child);
	}
	destination.write(child);
}
function renderArray(destination, children) {
	for (let i = 0; i < children.length; i++) {
		const result = renderChild(destination, children[i]);
		if (isPromise(result)) {
			if (i + 1 >= children.length) return result;
			const remaining = children.length - i - 1;
			const flushers = new Array(remaining);
			for (let j = 0; j < remaining; j++) flushers[j] = createBufferedRenderer(destination, (bufferDestination) => {
				return renderChild(bufferDestination, children[i + 1 + j]);
			});
			return result.then(() => {
				let k = 0;
				const iterate = () => {
					while (k < flushers.length) {
						const flushResult = flushers[k++].flush();
						if (isPromise(flushResult)) return flushResult.then(iterate);
					}
				};
				return iterate();
			});
		}
	}
}
function renderIterable(destination, children) {
	const iterator = children[Symbol.iterator]();
	const iterate = () => {
		for (;;) {
			const { value, done } = iterator.next();
			if (done) break;
			const result = renderChild(destination, value);
			if (isPromise(result)) return result.then(iterate);
		}
	};
	return iterate();
}
async function renderAsyncIterable(destination, children) {
	for await (const value of children) await renderChild(destination, value);
}
//#endregion
//#region node_modules/.pnpm/astro@7.3.4_@emnapi+core@1.11.3_@emnapi+runtime@1.11.3_@types+node@24.13.6_idb-keyval@6.3.0_jiti@2.7.0_yaml@2.9.1/node_modules/astro/dist/runtime/server/render/astro/instance.js
var astroComponentInstanceSym = /* @__PURE__ */ Symbol.for("astro.componentInstance");
var CLIENT_DIRECTIVE_PREFIX = "client:";
var AstroComponentInstance = class {
	[astroComponentInstanceSym] = true;
	result;
	props;
	slotValues;
	factory;
	returnValue;
	constructor(result, props, slots, factory) {
		this.result = result;
		this.props = props;
		this.factory = factory;
		this.slotValues = slots;
		for (const name in slots) {
			if (this.slotValues === slots) this.slotValues = {};
			let didRender = false;
			let value = slots[name](result);
			if (result._metadata.routeHasPropagation && isPromise(value)) result._metadata.pendingSlotEvaluations.push(value);
			this.slotValues[name] = () => {
				if (!didRender) {
					didRender = true;
					return value;
				}
				return slots[name](result);
			};
		}
	}
	init(result) {
		if (this.returnValue !== void 0) return this.returnValue;
		this.returnValue = this.factory(result, this.props, this.slotValues);
		if (isPromise(this.returnValue)) this.returnValue.then((resolved) => {
			this.returnValue = resolved;
		}).catch(() => {});
		return this.returnValue;
	}
	render(destination) {
		const returnValue = this.init(this.result);
		if (isPromise(returnValue)) return returnValue.then((x) => this.renderImpl(destination, x));
		return this.renderImpl(destination, returnValue);
	}
	renderImpl(destination, returnValue) {
		if (isHeadAndContent(returnValue)) return returnValue.content.render(destination);
		else return renderChild(destination, returnValue);
	}
};
function validateComponentProps(props, clientDirectives, displayName) {
	if (props != null) {
		for (const prop in props) if (prop.startsWith(CLIENT_DIRECTIVE_PREFIX) && clientDirectives.has(prop.slice(7))) console.warn(`You are attempting to render <${displayName} ${prop} />, but ${displayName} is an Astro component. Astro components do not render in the client and should not have a hydration directive. Please use a framework component for client rendering.`);
	}
}
function createAstroComponentInstance(result, displayName, factory, props, slots = {}) {
	validateComponentProps(props, result.clientDirectives, displayName);
	const instance = new AstroComponentInstance(result, props, slots, factory);
	registerIfPropagating(result, factory, instance);
	return instance;
}
function isAstroComponentInstance(obj) {
	return typeof obj === "object" && obj !== null && !!obj[astroComponentInstanceSym];
}
//#endregion
//#region node_modules/.pnpm/astro@7.3.4_@emnapi+core@1.11.3_@emnapi+runtime@1.11.3_@types+node@24.13.6_idb-keyval@6.3.0_jiti@2.7.0_yaml@2.9.1/node_modules/astro/dist/runtime/server/render/streaming.js
var ClientOnlyPlaceholder$1 = "astro-client-only";
var TemplateFrame = class {
	/** The RenderTemplateResult this frame walks. */
	templateResult;
	/** Resume position: the next `htmlParts`/`expressions` index to process. */
	cursor;
	constructor(templateResult) {
		this.templateResult = templateResult;
		this.cursor = 0;
	}
	storeCursor(index) {
		this.cursor = index;
	}
};
var StreamingRenderState = class {
	pendingStaticOutput = "";
	isBuffering = false;
	bufferedStaticOutput = "";
	appendStatic(output) {
		if (!output) return;
		if (this.isBuffering) this.bufferedStaticOutput += output;
		else this.pendingStaticOutput += output;
	}
};
async function renderStreaming(root, result, destination) {
	const stack = [root];
	const openTagCache = /* @__PURE__ */ new Map();
	const closeTagCache = /* @__PURE__ */ new Map();
	const closeTagFor = (type) => {
		let tag = closeTagCache.get(type);
		if (tag === void 0) {
			tag = new HTMLString(`</${type}>`);
			closeTagCache.set(type, tag);
		}
		return tag;
	};
	const streamingState = new StreamingRenderState();
	let firstAsyncRender = null;
	const bufferedTail = [];
	const flushBufferedStaticOutput = () => {
		if (streamingState.bufferedStaticOutput) {
			bufferedTail.push(streamingState.bufferedStaticOutput);
			streamingState.bufferedStaticOutput = "";
		}
	};
	const renderDynamic = (node) => (d) => {
		if (isVNode(node)) return renderJSX(result, node).then((out) => renderChild(d, out));
		return renderChild(d, node);
	};
	const handleVNode = (vnode) => {
		const type = vnode.type;
		if (!type) throw new Error(`Unable to render ${result.pathname} because it contains an undefined Component!
Did you forget to import the component or is it possible there is a typo?`);
		if (type === Fragment) {
			stack.push(vnode.props?.children);
			return;
		}
		if (isAstroComponentFactory(type)) {
			const props = {};
			const slots = {};
			for (const [key, value] of Object.entries(vnode.props ?? {})) if (key === "children" || value && typeof value === "object" && value["$$slot"]) slots[key === "children" ? "default" : key] = () => renderJSX(result, value);
			else props[key] = value;
			const displayName = type.name || "Anonymous";
			if (containsServerDirective(props)) {
				const island = new ServerIslandComponent(result, props, slots, displayName);
				result._metadata.propagators.add(island);
				stack.push(island);
				return;
			}
			stack.push(createAstroComponentInstance(result, displayName, type, props, slots));
			return;
		}
		if (typeof type === "string" && type !== ClientOnlyPlaceholder$1) {
			const props = vnode.props;
			let hasAttrs = false;
			if (props) {
				for (const key in props) if (key !== "children") {
					hasAttrs = true;
					break;
				}
			}
			const children = props?.children;
			const isVoid = (children == null || children === "") && voidElementNames.test(type);
			if (!hasAttrs) {
				const key = isVoid ? `${type}/` : type;
				let openTag = openTagCache.get(key);
				if (openTag === void 0) {
					openTag = isVoid ? `<${type}/>` : `<${type}>`;
					openTagCache.set(key, openTag);
				}
				streamingState.appendStatic(openTag);
				if (!isVoid) stack.push(closeTagFor(type));
			} else {
				const attrs = spreadElementAttributes(props);
				if (isVoid) {
					streamingState.appendStatic(`<${type}${attrs}/>`);
					return;
				}
				streamingState.appendStatic(`<${type}${attrs}>`);
				stack.push(closeTagFor(type));
			}
			if (!isVoid && children != null && children !== "") {
				if (typeof children === "string" && type === "style") stack.push(markHTMLString(escapeStyleText(children)));
				else stack.push(children);
			}
			return;
		}
		if (typeof type === "function" && vnode.props?.["server:root"]) {
			stack.push(type(vnode.props ?? {}));
			return;
		}
		stack.push(renderJSX(result, vnode));
	};
	while (stack.length > 0) {
		const node = stack.pop();
		if (node == null || node === false) continue;
		if (node instanceof TemplateFrame) {
			const htmlParts = node.templateResult.htmlParts;
			const expressions = node.templateResult.expressions;
			let i = node.cursor;
			while (i < htmlParts.length) {
				if (htmlParts[i]) streamingState.appendStatic(htmlParts[i]);
				if (i >= expressions.length) break;
				const expression = expressions[i];
				i++;
				if (expression == null || expression === false) continue;
				const expressionType = typeof expression;
				if (expressionType === "string") {
					streamingState.appendStatic(escapeHTML(expression));
					continue;
				}
				if (expressionType === "number" || expressionType === "bigint" || expressionType === "boolean") {
					streamingState.appendStatic(String(expression));
					continue;
				}
				if (expression instanceof HTMLString || isHTMLString(expression)) {
					if (!(expression instanceof SlotString)) {
						streamingState.appendStatic(expression.toString());
						continue;
					}
				}
				node.storeCursor(i);
				stack.push(node);
				stack.push(isPromise(expression) ? node.templateResult.catchExpressionError(i - 1, expression) : expression);
				break;
			}
			continue;
		}
		const nodeType = typeof node;
		if (nodeType === "string") {
			streamingState.appendStatic(escapeHTML(node));
			continue;
		}
		if (nodeType === "number" || nodeType === "bigint" || nodeType === "boolean") {
			streamingState.appendStatic(String(node));
			continue;
		}
		if (node instanceof HTMLString || isHTMLString(node)) {
			if (!(node instanceof SlotString)) {
				streamingState.appendStatic(node.toString());
				continue;
			}
		}
		if (Array.isArray(node)) {
			for (let i = node.length - 1; i >= 0; i--) stack.push(node[i]);
			continue;
		}
		if (isRenderTemplateResult(node)) {
			stack.push(new TemplateFrame(node));
			continue;
		}
		if (isVNode(node)) {
			handleVNode(node);
			continue;
		}
		if (node instanceof SlotRenderInstance) {
			stack.push(node.evaluate());
			continue;
		}
		if (isAstroComponentInstance(node)) {
			const returnValue = node.init(result);
			if (!isPromise(returnValue)) {
				stack.push(isHeadAndContent(returnValue) ? returnValue.content : returnValue);
				continue;
			}
		}
		if (!streamingState.isBuffering) {
			if (streamingState.pendingStaticOutput) {
				destination.write(streamingState.pendingStaticOutput);
				streamingState.pendingStaticOutput = "";
			}
			const rendered = renderDynamic(node)(destination);
			if (isPromise(rendered)) {
				streamingState.isBuffering = true;
				firstAsyncRender = rendered;
			}
		} else {
			flushBufferedStaticOutput();
			bufferedTail.push(createBufferedRenderer(destination, renderDynamic(node)));
		}
	}
	if (!streamingState.isBuffering) {
		if (streamingState.pendingStaticOutput) destination.write(streamingState.pendingStaticOutput);
		return;
	}
	await firstAsyncRender;
	flushBufferedStaticOutput();
	for (const segment of bufferedTail) if (typeof segment === "string") destination.write(segment);
	else {
		const flushResult = segment.flush();
		if (isPromise(flushResult)) await flushResult;
	}
}
//#endregion
//#region node_modules/.pnpm/astro@7.3.4_@emnapi+core@1.11.3_@emnapi+runtime@1.11.3_@types+node@24.13.6_idb-keyval@6.3.0_jiti@2.7.0_yaml@2.9.1/node_modules/astro/dist/runtime/server/render/astro/render.js
var DOCTYPE_EXP = /<!doctype html/i;
async function renderStreamToString(result, templateResult, isPage) {
	let str = "";
	let renderedFirstPageChunk = false;
	if (isPage) await bufferHeadContent(result);
	await renderStreaming(templateResult, result, { write(chunk) {
		if (isPage && !renderedFirstPageChunk) {
			renderedFirstPageChunk = true;
			if (!result.partial && !DOCTYPE_EXP.test(String(chunk))) {
				const doctype = result.compressHTML ? "<!DOCTYPE html>" : "<!DOCTYPE html>\n";
				str += doctype;
			}
		}
		if (chunk instanceof Response) return;
		str += chunkToString(result, chunk);
	} });
	return str;
}
async function renderStreamToStream(result, templateResult, isPage, route) {
	let renderedFirstPageChunk = false;
	if (isPage) await bufferHeadContent(result);
	return new ReadableStream({
		start(controller) {
			const destination = { write(chunk) {
				if (isPage && !renderedFirstPageChunk) {
					renderedFirstPageChunk = true;
					if (!result.partial && !DOCTYPE_EXP.test(String(chunk))) {
						const doctype = result.compressHTML ? "<!DOCTYPE html>" : "<!DOCTYPE html>\n";
						controller.enqueue(encoder.encode(doctype));
					}
				}
				if (chunk instanceof Response) throw new AstroError({ ...ResponseSentError });
				const bytes = chunkToByteArray(result, chunk);
				controller.enqueue(bytes);
			} };
			(async () => {
				try {
					await renderStreaming(templateResult, result, destination);
					controller.close();
				} catch (e) {
					if (AstroError.is(e) && !e.loc) e.setLocation({ file: route?.component });
					setTimeout(() => controller.error(e), 0);
				}
			})();
		},
		cancel() {
			result.cancelled = true;
		}
	});
}
async function renderStreamToAsyncIterable(result, templateResult, isPage, _route) {
	let renderedFirstPageChunk = false;
	let error = null;
	let next = null;
	const buffer = [];
	let hasBytes = false;
	let lastIsString = false;
	let renderingComplete = false;
	if (isPage) await bufferHeadContent(result);
	const iterator = {
		async next() {
			if (result.cancelled) return {
				done: true,
				value: void 0
			};
			if (next !== null) await next.promise;
			else if (!renderingComplete && !buffer.length) {
				next = promiseWithResolvers();
				await next.promise;
			}
			if (!renderingComplete) next = promiseWithResolvers();
			if (error) throw error;
			let mergedArray;
			if (!hasBytes) {
				let text = "";
				for (let i = 0, len = buffer.length; i < len; i++) text += buffer[i];
				mergedArray = encoder.encode(text);
			} else {
				let length = 0;
				let stringToEncode = "";
				for (let i = 0, len = buffer.length; i < len; i++) {
					const bufferEntry = buffer[i];
					if (typeof bufferEntry === "string") {
						const nextIsString = i + 1 < len && typeof buffer[i + 1] === "string";
						stringToEncode += bufferEntry;
						if (!nextIsString) {
							const encoded = encoder.encode(stringToEncode);
							length += encoded.length;
							stringToEncode = "";
							buffer[i] = encoded;
						} else buffer[i] = "";
					} else length += bufferEntry.length;
				}
				mergedArray = new Uint8Array(length);
				let offset = 0;
				for (let i = 0, len = buffer.length; i < len; i++) {
					const item = buffer[i];
					if (item === "") continue;
					mergedArray.set(item, offset);
					offset += item.length;
				}
			}
			buffer.length = 0;
			hasBytes = false;
			lastIsString = false;
			return {
				done: mergedArray.length === 0 && renderingComplete,
				value: mergedArray
			};
		},
		async return() {
			result.cancelled = true;
			return {
				done: true,
				value: void 0
			};
		}
	};
	const destination = { write(chunk) {
		if (isPage && !renderedFirstPageChunk) {
			renderedFirstPageChunk = true;
			if (!result.partial && !DOCTYPE_EXP.test(String(chunk))) {
				const doctype = result.compressHTML ? "<!DOCTYPE html>" : "<!DOCTYPE html>\n";
				buffer.push(doctype);
				lastIsString = true;
			}
		}
		if (chunk instanceof Response) throw new AstroError(ResponseSentError);
		const bytes = chunkToByteArrayOrString(result, chunk);
		if (bytes.length > 0) {
			if (typeof bytes === "string") {
				if (lastIsString) buffer[buffer.length - 1] = buffer[buffer.length - 1] + bytes;
				else {
					buffer.push(bytes);
					lastIsString = true;
				}
			} else {
				buffer.push(bytes);
				hasBytes = true;
				lastIsString = false;
			}
			next?.resolve();
		} else if (buffer.length > 0) next?.resolve();
	} };
	toPromise(() => renderStreaming(templateResult, result, destination)).catch((err) => {
		error = err;
	}).finally(() => {
		renderingComplete = true;
		next?.resolve();
	});
	return { [Symbol.asyncIterator]() {
		return iterator;
	} };
}
async function renderToString(result, componentFactory, props, children, isPage = false, route) {
	const templateResult = await callComponentAsTemplateResultOrResponse(result, componentFactory, props, children, route);
	if (templateResult instanceof Response) return templateResult;
	return await renderStreamToString(result, templateResult, isPage);
}
async function renderToReadableStream(result, componentFactory, props, children, isPage = false, route) {
	const templateResult = await callComponentAsTemplateResultOrResponse(result, componentFactory, props, children, route);
	if (templateResult instanceof Response) return templateResult;
	return await renderStreamToStream(result, templateResult, isPage, route);
}
async function callComponentAsTemplateResultOrResponse(result, componentFactory, props, children, route) {
	const factoryResult = await componentFactory(result, props, children);
	if (factoryResult instanceof Response) return factoryResult;
	else if (isHeadAndContent(factoryResult)) {
		if (!isRenderTemplateResult(factoryResult.content)) throw new AstroError({
			...OnlyResponseCanBeReturned,
			message: OnlyResponseCanBeReturned.message(route?.route, typeof factoryResult),
			location: { file: route?.component }
		});
		return factoryResult.content;
	} else if (!isRenderTemplateResult(factoryResult)) throw new AstroError({
		...OnlyResponseCanBeReturned,
		message: OnlyResponseCanBeReturned.message(route?.route, typeof factoryResult),
		location: { file: route?.component }
	});
	return factoryResult;
}
async function bufferHeadContent(result) {
	await bufferPropagatedHead(result);
}
async function renderToAsyncIterable(result, componentFactory, props, children, isPage = false, route) {
	const templateResult = await callComponentAsTemplateResultOrResponse(result, componentFactory, props, children, route);
	if (templateResult instanceof Response) return templateResult;
	return await renderStreamToAsyncIterable(result, templateResult, isPage, route);
}
function toPromise(fn) {
	try {
		const result = fn();
		return isPromise(result) ? result : Promise.resolve(result);
	} catch (err) {
		return Promise.reject(err);
	}
}
//#endregion
//#region node_modules/.pnpm/astro@7.3.4_@emnapi+core@1.11.3_@emnapi+runtime@1.11.3_@types+node@24.13.6_idb-keyval@6.3.0_jiti@2.7.0_yaml@2.9.1/node_modules/astro/dist/runtime/server/render/dom.js
function componentIsHTMLElement(Component) {
	return typeof HTMLElement !== "undefined" && HTMLElement.isPrototypeOf(Component);
}
async function renderHTMLElement(result, constructor, props, slots) {
	const name = getHTMLElementName(constructor);
	let attrHTML = "";
	for (const attr in props) {
		if (INVALID_ATTR_NAME_CHAR.test(attr)) continue;
		attrHTML += ` ${attr}="${toAttributeString(await props[attr])}"`;
	}
	return markHTMLString(`<${name}${attrHTML}>${await renderSlotToString(result, slots?.default)}</${name}>`);
}
function getHTMLElementName(constructor) {
	const definedName = customElements.getName(constructor);
	if (definedName) return definedName;
	return constructor.name.replace(/^HTML|Element$/g, "").replace(/[A-Z]/g, "-$&").toLowerCase().replace(/^-/, "html-");
}
//#endregion
//#region node_modules/.pnpm/astro@7.3.4_@emnapi+core@1.11.3_@emnapi+runtime@1.11.3_@types+node@24.13.6_idb-keyval@6.3.0_jiti@2.7.0_yaml@2.9.1/node_modules/astro/dist/runtime/server/render/component.js
var needsHeadRenderingSymbol = /* @__PURE__ */ Symbol.for("astro.needsHeadRendering");
var rendererAliases = /* @__PURE__ */ new Map([["solid", "solid-js"]]);
var clientOnlyValues = /* @__PURE__ */ new Set([
	"solid-js",
	"react",
	"preact",
	"vue",
	"svelte"
]);
function guessRenderers(componentUrl) {
	switch (componentUrl?.split(".").pop()) {
		case "svelte": return ["@astrojs/svelte"];
		case "vue": return ["@astrojs/vue"];
		case "jsx":
		case "tsx": return [
			"@astrojs/react",
			"@astrojs/preact",
			"@astrojs/solid-js",
			"@astrojs/vue (jsx)"
		];
		case void 0:
		default: return [
			"@astrojs/react",
			"@astrojs/preact",
			"@astrojs/solid-js",
			"@astrojs/vue",
			"@astrojs/svelte"
		];
	}
}
function isFragmentComponent(Component) {
	return Component === Fragment;
}
function isHTMLComponent(Component) {
	return Component && Component["astro:html"] === true;
}
var ASTRO_SLOT_EXP = /<\/?astro-slot\b[^>]*>/g;
var ASTRO_STATIC_SLOT_EXP = /<\/?astro-static-slot\b[^>]*>/g;
function removeStaticAstroSlot(html, supportsAstroStaticSlot = true) {
	const exp = supportsAstroStaticSlot ? ASTRO_STATIC_SLOT_EXP : ASTRO_SLOT_EXP;
	return html.replace(exp, "");
}
async function renderFrameworkComponent(result, displayName, Component, _props, slots = {}) {
	if (!Component && "client:only" in _props === false) throw new Error(`Unable to render ${displayName} because it is ${Component}!
Did you forget to import the component or is it possible there is a typo?`);
	const { renderers, clientDirectives } = result;
	const metadata = {
		astroStaticSlot: true,
		displayName
	};
	const { hydration, isPage, props, propsWithoutTransitionAttributes } = extractDirectives(_props, clientDirectives);
	let html = "";
	let attrs = void 0;
	if (hydration) {
		metadata.hydrate = hydration.directive;
		metadata.hydrateArgs = hydration.value;
		metadata.componentExport = hydration.componentExport;
		metadata.componentUrl = hydration.componentUrl;
	}
	const probableRendererNames = guessRenderers(metadata.componentUrl);
	const validRenderers = renderers.filter((r) => r.name !== "astro:jsx");
	const { children, slotInstructions } = await renderSlots(result, slots);
	let renderer;
	if (metadata.hydrate !== "only") {
		let isTagged = false;
		try {
			isTagged = Component && Component[Renderer];
		} catch {}
		if (isTagged) {
			const rendererName = Component[Renderer];
			renderer = renderers.find(({ name }) => name === rendererName);
		}
		if (!renderer) {
			let error;
			for (const r of renderers) try {
				if (await r.ssr.check.call({ result }, Component, props, children, metadata)) {
					renderer = r;
					break;
				}
			} catch (e) {
				error ??= e;
			}
			if (!renderer && error) throw error;
		}
		if (!renderer && typeof HTMLElement === "function" && componentIsHTMLElement(Component)) {
			const output = await renderHTMLElement(result, Component, _props, slots);
			return { render(destination) {
				destination.write(output);
			} };
		}
	} else {
		if (metadata.hydrateArgs) {
			const rendererName = rendererAliases.has(metadata.hydrateArgs) ? rendererAliases.get(metadata.hydrateArgs) : metadata.hydrateArgs;
			if (clientOnlyValues.has(rendererName)) renderer = renderers.find(({ name }) => name === `@astrojs/${rendererName}` || name === rendererName);
		}
		if (!renderer && validRenderers.length === 1) renderer = validRenderers[0];
		if (!renderer) {
			const extname = metadata.componentUrl?.split(".").pop();
			renderer = renderers.find(({ name }) => name === `@astrojs/${extname}` || name === extname);
		}
		if (!renderer && metadata.hydrateArgs) {
			const rendererName = metadata.hydrateArgs;
			if (typeof rendererName === "string") renderer = renderers.find(({ name }) => name === rendererName);
		}
	}
	let componentServerRenderEndTime;
	if (!renderer) {
		if (metadata.hydrate === "only") {
			const rendererName = rendererAliases.has(metadata.hydrateArgs) ? rendererAliases.get(metadata.hydrateArgs) : metadata.hydrateArgs;
			if (clientOnlyValues.has(rendererName)) {
				const plural = validRenderers.length > 1;
				throw new AstroError({
					...NoMatchingRenderer,
					message: NoMatchingRenderer.message(metadata.displayName, metadata?.componentUrl?.split(".").pop(), plural, validRenderers.length),
					hint: NoMatchingRenderer.hint(formatList(probableRendererNames.map((r) => "`" + r + "`")))
				});
			} else throw new AstroError({
				...NoClientOnlyHint,
				message: NoClientOnlyHint.message(metadata.displayName),
				hint: NoClientOnlyHint.hint(probableRendererNames.map((r) => r.replace("@astrojs/", "")).join("|"))
			});
		} else if (typeof Component !== "string") {
			const matchingRenderers = validRenderers.filter((r) => probableRendererNames.includes(r.name));
			const plural = validRenderers.length > 1;
			if (matchingRenderers.length === 0) throw new AstroError({
				...NoMatchingRenderer,
				message: NoMatchingRenderer.message(metadata.displayName, metadata?.componentUrl?.split(".").pop(), plural, validRenderers.length),
				hint: NoMatchingRenderer.hint(formatList(probableRendererNames.map((r) => "`" + r + "`")))
			});
			else if (matchingRenderers.length === 1) {
				renderer = matchingRenderers[0];
				({html, attrs} = await renderer.ssr.renderToStaticMarkup.call({ result }, Component, propsWithoutTransitionAttributes, children, metadata));
			} else throw new Error(`Unable to render ${metadata.displayName}!

This component likely uses ${formatList(probableRendererNames)},
but Astro encountered an error during server-side rendering.

Please ensure that ${metadata.displayName}:
1. Does not unconditionally access browser-specific globals like \`window\` or \`document\`.
   If this is unavoidable, use the \`client:only\` hydration directive.
2. Does not conditionally return \`null\` or \`undefined\` when rendered on the server.
3. If using multiple JSX frameworks at the same time (e.g. React + Preact), pass the correct \`include\`/\`exclude\` options to integrations.

If you're still stuck, please open an issue on GitHub or join us at https://astro.build/chat.`);
		}
	} else if (metadata.hydrate === "only") html = await renderSlotToString(result, slots?.fallback);
	else {
		const componentRenderStartTime = performance.now();
		({html, attrs} = await renderer.ssr.renderToStaticMarkup.call({ result }, Component, propsWithoutTransitionAttributes, children, metadata));
		if (process.env.NODE_ENV === "development") componentServerRenderEndTime = performance.now() - componentRenderStartTime;
	}
	if (!html && typeof Component === "string") {
		const Tag = sanitizeElementName(Component);
		const childSlots = Object.values(children).join("");
		const renderTemplateResult = renderTemplate`<${Tag}${internalSpreadAttributes(props, true, Tag)}${markHTMLString(childSlots === "" && voidElementNames.test(Tag) ? `/>` : `>${childSlots}</${Tag}>`)}`;
		html = "";
		await renderTemplateResult.render({ write(chunk) {
			if (chunk instanceof Response) return;
			html += chunkToString(result, chunk);
		} });
	}
	if (!hydration) return { render(destination) {
		if (slotInstructions) for (const instruction of slotInstructions) destination.write(instruction);
		if (isPage || renderer?.name === "astro:jsx") destination.write(html);
		else if (html && html.length > 0) {
			const output = renderer ? removeStaticAstroSlot(html, renderer.ssr?.supportsAstroStaticSlot) : html;
			destination.write(markHTMLString(output));
		}
	} };
	const astroId = shorthash(`<!--${metadata.componentExport.value}:${metadata.componentUrl}-->
${html}
${serializeProps(props, metadata)}`);
	const island = await generateHydrateScript({
		renderer,
		result,
		astroId,
		props,
		attrs
	}, metadata);
	if (componentServerRenderEndTime && process.env.NODE_ENV === "development") island.props["server-render-time"] = componentServerRenderEndTime;
	let unrenderedSlots = [];
	if (html) {
		if (Object.keys(children).length > 0) for (const key of Object.keys(children)) {
			let tagName = renderer?.ssr?.supportsAstroStaticSlot ? !!metadata.hydrate ? "astro-slot" : "astro-static-slot" : "astro-slot";
			let expectedHTML = key === "default" ? `<${tagName}>` : `<${tagName} name="${escapeHTML(key)}">`;
			if (!html.includes(expectedHTML)) unrenderedSlots.push(key);
		}
	} else unrenderedSlots = Object.keys(children);
	const template = unrenderedSlots.length > 0 ? unrenderedSlots.map((key) => `<template data-astro-template${key !== "default" ? `="${escapeHTML(key)}"` : ""}>${children[key]}</template>`).join("") : "";
	island.children = `${html ?? ""}${template}`;
	if (island.children) {
		island.props["await-children"] = "";
		island.children += `<!--astro:end-->`;
	}
	return { render(destination) {
		if (slotInstructions) for (const instruction of slotInstructions) destination.write(instruction);
		destination.write(createRenderInstruction({
			type: "directive",
			hydration
		}));
		if (hydration.directive !== "only" && renderer?.ssr.renderHydrationScript) destination.write(createRenderInstruction({
			type: "renderer-hydration-script",
			rendererName: renderer.name,
			render: renderer.ssr.renderHydrationScript
		}));
		const renderedElement = renderElement$1("astro-island", island, false);
		destination.write(markHTMLString(renderedElement));
	} };
}
function sanitizeElementName(tag) {
	const unsafe = /[&<>'"\s]+/;
	if (!unsafe.test(tag)) return tag;
	return tag.trim().split(unsafe)[0].trim();
}
function renderFragmentComponent(result, slots = {}) {
	const slot = slots?.default;
	const preRendered = slot?.(result);
	return { render(destination) {
		if (preRendered == null) return;
		return renderChild(destination, preRendered);
	} };
}
async function renderHTMLComponent(result, Component, _props, slots = {}) {
	const { slotInstructions, children } = await renderSlots(result, slots);
	const html = Component({ slots: children });
	const hydrationHtml = slotInstructions ? slotInstructions.map((instr) => chunkToString(result, instr)).join("") : "";
	return { render(destination) {
		destination.write(markHTMLString(hydrationHtml + html));
	} };
}
function renderAstroComponent(result, displayName, Component, props, slots = {}) {
	if (containsServerDirective(props)) {
		const serverIslandComponent = new ServerIslandComponent(result, props, slots, displayName);
		result._metadata.propagators.add(serverIslandComponent);
		return serverIslandComponent;
	}
	return createAstroComponentInstance(result, displayName, Component, props, slots);
}
function renderComponent(result, displayName, Component, props, slots = {}) {
	if (isAstroComponentFactory(Component)) return renderAstroComponent(result, displayName, Component, normalizeProps(props), slots);
	if (isPromise(Component)) return Component.catch(handleCancellation).then((x) => {
		return renderComponent(result, displayName, x, props, slots);
	});
	if (isFragmentComponent(Component)) return renderFragmentComponent(result, slots);
	props = normalizeProps(props);
	if (isHTMLComponent(Component)) return renderHTMLComponent(result, Component, props, slots).catch(handleCancellation);
	return renderFrameworkComponent(result, displayName, Component, props, slots).catch(handleCancellation);
	function handleCancellation(e) {
		if (result.cancelled) return { render() {} };
		throw e;
	}
}
function normalizeProps(props) {
	if (props["class:list"] !== void 0) {
		const value = props["class:list"];
		delete props["class:list"];
		props["class"] = clsx(props["class"], value);
		if (props["class"] === "") delete props["class"];
	}
	return props;
}
async function renderComponentToString(result, displayName, Component, props, slots = {}, isPage = false, route) {
	let str = "";
	let renderedFirstPageChunk = false;
	let head = "";
	if (isPage && !result.partial && nonAstroPageNeedsHeadInjection(Component)) head += chunkToString(result, maybeRenderHead());
	try {
		const destination = { write(chunk) {
			if (isPage && !result.partial && !renderedFirstPageChunk) {
				renderedFirstPageChunk = true;
				if (!/<!doctype html/i.test(String(chunk))) {
					const doctype = result.compressHTML ? "<!DOCTYPE html>" : "<!DOCTYPE html>\n";
					str += doctype + head;
				}
			}
			if (chunk instanceof Response) return;
			str += chunkToString(result, chunk);
		} };
		const renderInstance = await renderComponent(result, displayName, Component, props, slots);
		if (containsServerDirective(props)) await bufferHeadContent(result);
		await renderInstance.render(destination);
	} catch (e) {
		if (AstroError.is(e) && !e.loc) e.setLocation({ file: route?.component });
		throw e;
	}
	return str;
}
function nonAstroPageNeedsHeadInjection(pageComponent) {
	return !!pageComponent?.[needsHeadRenderingSymbol];
}
//#endregion
//#region node_modules/.pnpm/astro@7.3.4_@emnapi+core@1.11.3_@emnapi+runtime@1.11.3_@types+node@24.13.6_idb-keyval@6.3.0_jiti@2.7.0_yaml@2.9.1/node_modules/astro/dist/runtime/server/jsx.js
var ClientOnlyPlaceholder = "astro-client-only";
var hasTriedRenderComponentSymbol = /* @__PURE__ */ Symbol("hasTriedRenderComponent");
async function renderJSX(result, vnode) {
	switch (true) {
		case vnode instanceof HTMLString:
			if (vnode.toString().trim() === "") return "";
			return vnode;
		case typeof vnode === "string": return markHTMLString(escapeHTML(vnode));
		case typeof vnode === "function": return vnode;
		case !vnode && vnode !== 0: return "";
		case Array.isArray(vnode): {
			const renderedItems = await Promise.all(vnode.map((v) => renderJSX(result, v)));
			let instructions = null;
			let content = "";
			for (const item of renderedItems) if (item instanceof SlotString) {
				content += item;
				instructions = mergeSlotInstructions(instructions, item);
			} else content += item;
			if (instructions) return markHTMLString(new SlotString(content, instructions));
			return markHTMLString(content);
		}
	}
	return renderJSXVNode(result, vnode);
}
async function renderJSXVNode(result, vnode) {
	if (isVNode(vnode)) {
		switch (true) {
			case !vnode.type: throw new Error(`Unable to render ${result.pathname} because it contains an undefined Component!
Did you forget to import the component or is it possible there is a typo?`);
			case vnode.type === /* @__PURE__ */ Symbol.for("astro:fragment"): return renderJSX(result, vnode.props.children);
			case isAstroComponentFactory(vnode.type): {
				let props = {};
				let slots = {};
				for (const [key, value] of Object.entries(vnode.props ?? {})) if (key === "children" || value && typeof value === "object" && value["$$slot"]) slots[key === "children" ? "default" : key] = () => renderJSX(result, value);
				else props[key] = value;
				return markHTMLString(await renderComponentToString(result, vnode.type.name, vnode.type, props, slots));
			}
			case !vnode.type && vnode.type !== 0: return "";
			case typeof vnode.type === "string" && vnode.type !== ClientOnlyPlaceholder && !vnode.type.includes("-"): return markHTMLString(await renderElement(result, vnode.type, vnode.props ?? {}));
		}
		if (vnode.type) {
			let extractSlots2 = function(child) {
				if (Array.isArray(child)) return child.map((c) => extractSlots2(c));
				if (!isVNode(child)) {
					_slots.default.push(child);
					return;
				}
				if ("slot" in child.props && !isCustomElement) {
					_slots[child.props.slot] = [..._slots[child.props.slot] ?? [], child];
					delete child.props.slot;
					return;
				}
				_slots.default.push(child);
			};
			if (typeof vnode.type === "function" && vnode.props["server:root"]) return await renderJSX(result, await vnode.type(vnode.props ?? {}));
			if (typeof vnode.type === "function") {
				if (vnode.props[hasTriedRenderComponentSymbol]) {
					delete vnode.props[hasTriedRenderComponentSymbol];
					const output2 = await vnode.type(vnode.props ?? {});
					if (output2?.["astro:jsx"] || !output2) return await renderJSXVNode(result, output2);
					else return;
				} else vnode.props[hasTriedRenderComponentSymbol] = true;
			}
			const { children = null, ...props } = vnode.props ?? {};
			const _slots = { default: [] };
			const isCustomElement = typeof vnode.type === "string" && vnode.type.includes("-");
			extractSlots2(children);
			for (const [key, value] of Object.entries(props)) if (value?.["$$slot"]) {
				_slots[key] = value;
				delete props[key];
			}
			const slotPromises = [];
			const slots = {};
			for (const [key, value] of Object.entries(_slots)) slotPromises.push(renderJSX(result, value).then((output2) => {
				if (output2.toString().trim().length === 0) return;
				slots[key] = () => output2;
			}));
			await Promise.all(slotPromises);
			let output;
			if (vnode.type === ClientOnlyPlaceholder && vnode.props["client:only"]) output = await renderComponentToString(result, vnode.props["client:display-name"] ?? "", null, props, slots);
			else output = await renderComponentToString(result, typeof vnode.type === "function" ? vnode.type.name : vnode.type, vnode.type, props, slots);
			return markHTMLString(output);
		}
	}
	return markHTMLString(`${vnode}`);
}
async function renderElement(result, tag, { children, ...props }) {
	return markHTMLString(`<${tag}${spreadAttributes(props)}${markHTMLString((children == null || children === "") && voidElementNames.test(tag) ? `/>` : `>${children == null ? "" : await renderJSX(result, prerenderElementChildren(tag, children))}</${tag}>`)}`);
}
function prerenderElementChildren(tag, children) {
	if (typeof children === "string" && tag === "style") return markHTMLString(escapeStyleText(children));
	return children;
}
//#endregion
//#region node_modules/.pnpm/astro@7.3.4_@emnapi+core@1.11.3_@emnapi+runtime@1.11.3_@types+node@24.13.6_idb-keyval@6.3.0_jiti@2.7.0_yaml@2.9.1/node_modules/astro/dist/runtime/server/render/page.js
async function renderPage(result, componentFactory, props, children, streaming, route) {
	if (!isAstroComponentFactory(componentFactory)) {
		const nonAstroMeta = result.componentMetadata.get(componentFactory.moduleId);
		result._metadata.headInTree = nonAstroMeta?.containsHead ?? false;
		result._metadata.routeHasPropagation = isPropagatingHint(nonAstroMeta?.propagation ?? "none");
		const pageProps = {
			...props ?? {},
			"server:root": true
		};
		const str = await renderComponentToString(result, componentFactory.name, componentFactory, pageProps, {}, true, route);
		const bytes = encoder.encode(str);
		const headers2 = new Headers([["Content-Type", "text/html"], ["Content-Length", bytes.byteLength.toString()]]);
		if (result.shouldInjectCspMetaTags && (result.cspDestination === "header" || result.cspDestination === "adapter")) headers2.set("content-security-policy", renderCspContent(result));
		return new Response(bytes, {
			headers: headers2,
			status: result.response.status
		});
	}
	const pageMeta = result.componentMetadata.get(componentFactory.moduleId);
	result._metadata.headInTree = pageMeta?.containsHead ?? false;
	result._metadata.routeHasPropagation = isPropagatingHint(pageMeta?.propagation ?? "none");
	let body;
	if (streaming) {
		if (isNode && !isDeno) {
			const nodeBody = await renderToAsyncIterable(result, componentFactory, props, children, true, route);
			if (isWorkerd && !(nodeBody instanceof Response)) body = ReadableStream.from(nodeBody);
			else body = nodeBody;
		} else body = await renderToReadableStream(result, componentFactory, props, children, true, route);
	} else body = await renderToString(result, componentFactory, props, children, true, route);
	if (body instanceof Response) return body;
	const init = result.response;
	const headers = new Headers(init.headers);
	if (result.shouldInjectCspMetaTags && result.cspDestination === "header" || result.cspDestination === "adapter") headers.set("content-security-policy", renderCspContent(result));
	if (!streaming && typeof body === "string") {
		body = encoder.encode(body);
		headers.set("Content-Length", body.byteLength.toString());
	}
	let status = init.status;
	let statusText = init.statusText;
	if (route?.route && isRoute404(route.route)) {
		status = 404;
		if (statusText === "OK") statusText = "Not Found";
	} else if (route?.route && isRoute500(route.route)) {
		status = 500;
		if (statusText === "OK") statusText = "Internal Server Error";
	}
	if (status) return new Response(body, {
		...init,
		headers,
		status,
		statusText
	});
	else return new Response(body, {
		...init,
		headers
	});
}
Object.freeze(createRenderInstruction({ type: "template-enter" }));
Object.freeze(createRenderInstruction({ type: "template-exit" }));
"0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_".split("").reduce((v, c) => (v[c.charCodeAt(0)] = c, v), []);
"-0123456789_".split("").reduce((v, c) => (v[c.charCodeAt(0)] = c, v), []);
//#endregion
//#region node_modules/.pnpm/astro@7.3.4_@emnapi+core@1.11.3_@emnapi+runtime@1.11.3_@types+node@24.13.6_idb-keyval@6.3.0_jiti@2.7.0_yaml@2.9.1/node_modules/astro/dist/runtime/server/index.js
function spreadAttributes(values = {}, _name, { class: scopedClassName } = {}) {
	let output = "";
	if (scopedClassName) {
		if (typeof values.class !== "undefined") values.class += ` ${scopedClassName}`;
		else if (typeof values["class:list"] !== "undefined") values["class:list"] = [values["class:list"], scopedClassName];
		else values.class = scopedClassName;
	}
	for (const key of Object.keys(values)) output += addAttribute(values[key], key, true, _name);
	return markHTMLString(output);
}
//#endregion
export { REDIRECT_STATUS_CODES as A, createAstro as C, ASTRO_ERROR_HEADER as D, s as E, originPathnameSymbol as F, responseSentSymbol as I, decodeKey as L, clientAddressSymbol as M, fetchStateSymbol as N, ASTRO_GENERATOR as O, nodeRequestAbortControllerCleanupSymbol as P, decryptString as R, renderEndpoint as S, isRoute500 as T, normalizeCspResourceEntry as _, Fragment as a, markHTMLString as b, renderSlot as c, renderTemplate as d, maybeRenderHead as f, isRenderInstruction as g, createRenderInstruction as h, renderComponent as i, REROUTABLE_STATUS_CODES as j, DEFAULT_404_COMPONENT as k, renderSlotToString as l, addAttribute as m, renderPage as n, chunkToString as o, renderHead as p, renderJSX as r, createSlotValueFromString as s, spreadAttributes as t, isRenderTemplateResult as u, pushDirective as v, isRoute404 as w, unescapeHTML as x, isAstroComponentFactory as y, generateCspDigest as z };
