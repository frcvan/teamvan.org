import { r as __exportAll } from "./rolldown-runtime_BMI-E3GI.mjs";
import { d as isRemotePath, h as removeQueryString, t as isRemoteAllowed, u as isParentDirectory } from "./remote_BxuVLM0r.mjs";
import { d as inferSourceFormat, i as lookup, l as fetchWithRedirects, n as outDir, o as getConfiguredImageService, r as serverDir, t as imageConfig } from "./_astro_assets_DcOxIvkv.mjs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { readFile } from "node:fs/promises";
//#region node_modules/.pnpm/astro@7.3.4_@emnapi+core@1.11.3_@emnapi+runtime@1.11.3_@types+node@24.13.6_idb-keyval@6.3.0_jiti@2.7.0_yaml@2.9.1/node_modules/astro/dist/assets/utils/etag.js
var fnv1a52 = (str) => {
	const len = str.length;
	let i = 0, t0 = 0, v0 = 8997, t1 = 0, v1 = 33826, t2 = 0, v2 = 40164, t3 = 0, v3 = 52210;
	while (i < len) {
		v0 ^= str.charCodeAt(i++);
		t0 = v0 * 435;
		t1 = v1 * 435;
		t2 = v2 * 435;
		t3 = v3 * 435;
		t2 += v0 << 8;
		t3 += v1 << 8;
		t1 += t0 >>> 16;
		v0 = t0 & 65535;
		t2 += t1 >>> 16;
		v1 = t1 & 65535;
		v3 = t3 + (t2 >>> 16) & 65535;
		v2 = t2 & 65535;
	}
	return (v3 & 15) * 281474976710656 + v2 * 4294967296 + v1 * 65536 + (v0 ^ v3 >> 4);
};
var etag = (payload, weak = false) => {
	return (weak ? "W/\"" : "\"") + fnv1a52(payload).toString(36) + payload.length.toString(36) + "\"";
};
//#endregion
//#region node_modules/.pnpm/astro@7.3.4_@emnapi+core@1.11.3_@emnapi+runtime@1.11.3_@types+node@24.13.6_idb-keyval@6.3.0_jiti@2.7.0_yaml@2.9.1/node_modules/astro/dist/assets/endpoint/shared.js
var isLocal = (url) => {
	const hostname = new URL(url).hostname;
	return hostname === "localhost" || hostname === "127.0.0.1" || hostname === "[::1]";
};
async function loadRemoteImage(src) {
	try {
		const res = await fetchWithRedirects({
			url: src,
			imageConfig
		});
		if (!isRemoteAllowed(res.url, imageConfig) && !isLocal(res.url)) return;
		if (!res.ok) return;
		return Buffer.from(await res.arrayBuffer());
	} catch {
		return;
	}
}
var handleImageRequest = async ({ request, loadLocalImage, logger }) => {
	const imageService = await getConfiguredImageService();
	if (!("transform" in imageService)) throw new Error("Configured image service is not a local service");
	const url = new URL(request.url);
	const transform = await imageService.parseURL(url, imageConfig, logger);
	if (!transform?.src) return new Response("Invalid request", { status: 400 });
	if (transform.format === "svg") {
		if (inferSourceFormat(transform.src) !== "svg") return new Response("Cannot convert non-SVG source to SVG format", { status: 403 });
	}
	let inputBuffer = void 0;
	if (isRemotePath(transform.src)) {
		if (!isRemoteAllowed(transform.src, imageConfig)) return new Response("Forbidden", { status: 403 });
		inputBuffer = await loadRemoteImage(new URL(transform.src));
	} else {
		const result = await loadLocalImage(removeQueryString(transform.src), url);
		switch (result.kind) {
			case "invalid-path": return new Response("Invalid request", { status: 400 });
			case "not-found": return new Response("Not Found", { status: 404 });
			case "failed": return new Response("Internal Server Error", { status: 500 });
			case "loaded": inputBuffer = result.buffer;
		}
	}
	if (!inputBuffer) return new Response("Internal Server Error", { status: 500 });
	const { data, format } = await imageService.transform(inputBuffer, transform, imageConfig, logger);
	return new Response(data, {
		status: 200,
		headers: {
			"Content-Type": lookup(format) ?? `image/${format}`,
			"Cache-Control": "public, max-age=31536000",
			ETag: etag(data.toString()),
			Date: (/* @__PURE__ */ new Date()).toUTCString()
		}
	});
};
//#endregion
//#region node_modules/.pnpm/astro@7.3.4_@emnapi+core@1.11.3_@emnapi+runtime@1.11.3_@types+node@24.13.6_idb-keyval@6.3.0_jiti@2.7.0_yaml@2.9.1/node_modules/astro/dist/assets/endpoint/node.js
var node_exports = /* @__PURE__ */ __exportAll({ GET: () => GET });
async function loadLocalImage(src, url) {
	const outDirURL = resolveOutDir();
	const idx = url.pathname.indexOf("/_image");
	if (idx > 0) src = src.slice(idx);
	let fileUrl;
	try {
		if (!URL.canParse("." + src, outDirURL)) return { kind: "invalid-path" };
		fileUrl = new URL("." + src, outDirURL);
		if (fileUrl.protocol !== "file:" || !isParentDirectory(fileURLToPath(outDirURL), fileURLToPath(fileUrl))) return { kind: "invalid-path" };
	} catch {
		return { kind: "invalid-path" };
	}
	try {
		return {
			kind: "loaded",
			buffer: await readFile(fileUrl)
		};
	} catch (error) {
		if (error instanceof Error && "code" in error && (error.code === "ENOENT" || error.code === "ENOTDIR" || error.code === "EISDIR")) return { kind: "not-found" };
		return { kind: "failed" };
	}
}
var GET = async ({ request, logger }) => {
	try {
		return await handleImageRequest({
			request,
			loadLocalImage,
			logger
		});
	} catch (err) {
		logger.error(`Could not process image request: ${err}`);
		return new Response("Internal Server Error", { status: 500 });
	}
};
function resolveOutDir() {
	const serverDirPath = fileURLToPath(serverDir);
	const rel = path.relative(serverDirPath, fileURLToPath(outDir));
	const serverFolder = path.basename(serverDirPath);
	let serverEntryFolderURL = path.dirname(import.meta.url);
	while (!serverEntryFolderURL.endsWith(serverFolder)) serverEntryFolderURL = path.dirname(serverEntryFolderURL);
	const serverEntryURL = serverEntryFolderURL + "/entry.mjs";
	return new URL(appendForwardSlash(rel), serverEntryURL);
}
function appendForwardSlash(pth) {
	return pth.endsWith("/") ? pth : pth + "/";
}
//#endregion
//#region \0virtual:astro:page:node_modules/.pnpm/astro@7.3.4_@emnapi+core@1.11.3_@emnapi+runtime@1.11.3_@types+node@24.13.6_idb-keyval@6.3.0_jiti@2.7.0_yaml@2.9.1/node_modules/astro/dist/assets/endpoint/node@_@js
var page = () => node_exports;
//#endregion
export { page };
