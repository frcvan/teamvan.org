//#region node_modules/.pnpm/astro@7.3.4_@emnapi+core@1.11.3_@emnapi+runtime@1.11.3_@types+node@24.13.6_idb-keyval@6.3.0_jiti@2.7.0_yaml@2.9.1/node_modules/astro/dist/env/runtime.js
var _getEnv = (key) => process.env[key];
function setGetEnv(fn) {
	_getEnv = fn;
	_onSetGetEnv();
}
var _onSetGetEnv = () => {};
function setOnSetGetEnv(fn) {
	_onSetGetEnv = fn;
}
function getEnv(...args) {
	return _getEnv(...args);
}
//#endregion
export { setGetEnv as n, setOnSetGetEnv as r, getEnv as t };
