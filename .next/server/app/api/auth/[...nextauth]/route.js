"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/auth/[...nextauth]/route";
exports.ids = ["app/api/auth/[...nextauth]/route"];
exports.modules = {

/***/ "better-sqlite3":
/*!*********************************!*\
  !*** external "better-sqlite3" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("better-sqlite3");

/***/ }),

/***/ "../../client/components/action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/client/components/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/action-async-storage.external.js");

/***/ }),

/***/ "../../client/components/request-async-storage.external":
/*!********************************************************************************!*\
  !*** external "next/dist/client/components/request-async-storage.external.js" ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/request-async-storage.external.js");

/***/ }),

/***/ "../../client/components/static-generation-async-storage.external":
/*!******************************************************************************************!*\
  !*** external "next/dist/client/components/static-generation-async-storage.external.js" ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/static-generation-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("querystring");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=C%3A%5CUsers%5CAprilWu%5CDocuments%5Ctrae_projects%5Cnewboss%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CAprilWu%5CDocuments%5Ctrae_projects%5Cnewboss&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=C%3A%5CUsers%5CAprilWu%5CDocuments%5Ctrae_projects%5Cnewboss%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CAprilWu%5CDocuments%5Ctrae_projects%5Cnewboss&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_AprilWu_Documents_trae_projects_newboss_app_api_auth_nextauth_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/auth/[...nextauth]/route.ts */ \"(rsc)/./app/api/auth/[...nextauth]/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/auth/[...nextauth]/route\",\n        pathname: \"/api/auth/[...nextauth]\",\n        filename: \"route\",\n        bundlePath: \"app/api/auth/[...nextauth]/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\AprilWu\\\\Documents\\\\trae_projects\\\\newboss\\\\app\\\\api\\\\auth\\\\[...nextauth]\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_AprilWu_Documents_trae_projects_newboss_app_api_auth_nextauth_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/auth/[...nextauth]/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZhdXRoJTJGJTVCLi4ubmV4dGF1dGglNUQlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNBcHJpbFd1JTVDRG9jdW1lbnRzJTVDdHJhZV9wcm9qZWN0cyU1Q25ld2Jvc3MlNUNhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPUMlM0ElNUNVc2VycyU1Q0FwcmlsV3UlNUNEb2N1bWVudHMlNUN0cmFlX3Byb2plY3RzJTVDbmV3Ym9zcyZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQXNHO0FBQ3ZDO0FBQ2M7QUFDOEM7QUFDM0g7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGdIQUFtQjtBQUMzQztBQUNBLGNBQWMseUVBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxpRUFBaUU7QUFDekU7QUFDQTtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUN1SDs7QUFFdkgiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90YWxlbnRncmFwaC8/OTA1NyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCJDOlxcXFxVc2Vyc1xcXFxBcHJpbFd1XFxcXERvY3VtZW50c1xcXFx0cmFlX3Byb2plY3RzXFxcXG5ld2Jvc3NcXFxcYXBwXFxcXGFwaVxcXFxhdXRoXFxcXFsuLi5uZXh0YXV0aF1cXFxccm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL2F1dGgvWy4uLm5leHRhdXRoXVwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiQzpcXFxcVXNlcnNcXFxcQXByaWxXdVxcXFxEb2N1bWVudHNcXFxcdHJhZV9wcm9qZWN0c1xcXFxuZXdib3NzXFxcXGFwcFxcXFxhcGlcXFxcYXV0aFxcXFxbLi4ubmV4dGF1dGhdXFxcXHJvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuY29uc3Qgb3JpZ2luYWxQYXRobmFtZSA9IFwiL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGVcIjtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgc2VydmVySG9va3MsXG4gICAgICAgIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgb3JpZ2luYWxQYXRobmFtZSwgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=C%3A%5CUsers%5CAprilWu%5CDocuments%5Ctrae_projects%5Cnewboss%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CAprilWu%5CDocuments%5Ctrae_projects%5Cnewboss&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/auth/[...nextauth]/route.ts":
/*!*********************************************!*\
  !*** ./app/api/auth/[...nextauth]/route.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ handler),\n/* harmony export */   POST: () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers/credentials */ \"(rsc)/./node_modules/next-auth/providers/credentials.js\");\n/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/db */ \"(rsc)/./src/lib/db.ts\");\n\n\n\nconst handler = next_auth__WEBPACK_IMPORTED_MODULE_0___default()({\n    secret: process.env.NEXTAUTH_SECRET,\n    trustHost: true,\n    providers: [\n        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({\n            name: \"Credentials\",\n            credentials: {\n                email: {\n                    label: \"邮箱\",\n                    type: \"email\"\n                },\n                password: {\n                    label: \"密码\",\n                    type: \"password\"\n                }\n            },\n            async authorize (credentials) {\n                if (!credentials?.email || !credentials?.password) {\n                    return null;\n                }\n                const user = _lib_db__WEBPACK_IMPORTED_MODULE_2__.userDb.findByEmail(credentials.email);\n                if (!user) {\n                    return null;\n                }\n                if (user.password === credentials.password) {\n                    return {\n                        id: user.id,\n                        name: user.name,\n                        email: user.email,\n                        role: user.role\n                    };\n                }\n                return null;\n            }\n        })\n    ],\n    session: {\n        strategy: \"jwt\"\n    },\n    pages: {\n        signIn: \"/login\"\n    },\n    callbacks: {\n        async jwt ({ token, user }) {\n            if (user) {\n                token.userId = user.id;\n                token.role = user.role;\n            }\n            return token;\n        },\n        async session ({ session, token }) {\n            if (session.user) {\n                session.user.id = token.userId;\n                session.user.role = token.role;\n            }\n            return session;\n        }\n    }\n});\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBZ0M7QUFDaUM7QUFDaEM7QUFFakMsTUFBTUcsVUFBVUgsZ0RBQVFBLENBQUM7SUFDdkJJLFFBQVFDLFFBQVFDLEdBQUcsQ0FBQ0MsZUFBZTtJQUNuQ0MsV0FBVztJQUNYQyxXQUFXO1FBQ1RSLDJFQUFtQkEsQ0FBQztZQUNsQlMsTUFBTTtZQUNOQyxhQUFhO2dCQUNYQyxPQUFPO29CQUFFQyxPQUFPO29CQUFNQyxNQUFNO2dCQUFRO2dCQUNwQ0MsVUFBVTtvQkFBRUYsT0FBTztvQkFBTUMsTUFBTTtnQkFBVztZQUM1QztZQUNBLE1BQU1FLFdBQVVMLFdBQVc7Z0JBQ3pCLElBQUksQ0FBQ0EsYUFBYUMsU0FBUyxDQUFDRCxhQUFhSSxVQUFVO29CQUNqRCxPQUFPO2dCQUNUO2dCQUVBLE1BQU1FLE9BQU9mLDJDQUFNQSxDQUFDZ0IsV0FBVyxDQUFDUCxZQUFZQyxLQUFLO2dCQUNqRCxJQUFJLENBQUNLLE1BQU07b0JBQ1QsT0FBTztnQkFDVDtnQkFFQSxJQUFJQSxLQUFLRixRQUFRLEtBQUtKLFlBQVlJLFFBQVEsRUFBRTtvQkFDMUMsT0FBTzt3QkFDTEksSUFBSUYsS0FBS0UsRUFBRTt3QkFDWFQsTUFBTU8sS0FBS1AsSUFBSTt3QkFDZkUsT0FBT0ssS0FBS0wsS0FBSzt3QkFDakJRLE1BQU1ILEtBQUtHLElBQUk7b0JBQ2pCO2dCQUNGO2dCQUVBLE9BQU87WUFDVDtRQUNGO0tBQ0Q7SUFDREMsU0FBUztRQUFFQyxVQUFVO0lBQU07SUFDM0JDLE9BQU87UUFBRUMsUUFBUTtJQUFTO0lBQzFCQyxXQUFXO1FBQ1QsTUFBTUMsS0FBSSxFQUFFQyxLQUFLLEVBQUVWLElBQUksRUFBRTtZQUN2QixJQUFJQSxNQUFNO2dCQUNSVSxNQUFNQyxNQUFNLEdBQUdYLEtBQUtFLEVBQUU7Z0JBQ3RCUSxNQUFNUCxJQUFJLEdBQUcsS0FBY0EsSUFBSTtZQUNqQztZQUNBLE9BQU9PO1FBQ1Q7UUFDQSxNQUFNTixTQUFRLEVBQUVBLE9BQU8sRUFBRU0sS0FBSyxFQUFFO1lBQzlCLElBQUlOLFFBQVFKLElBQUksRUFBRTtnQkFDaEJJLFFBQVFKLElBQUksQ0FBQ0UsRUFBRSxHQUFHUSxNQUFNQyxNQUFNO2dCQUM5QlAsUUFBUUosSUFBSSxDQUFDRyxJQUFJLEdBQUdPLE1BQU1QLElBQUk7WUFDaEM7WUFDQSxPQUFPQztRQUNUO0lBQ0Y7QUFDRjtBQUUwQyIsInNvdXJjZXMiOlsid2VicGFjazovL3RhbGVudGdyYXBoLy4vYXBwL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGUudHM/YzhhNCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTmV4dEF1dGggZnJvbSBcIm5leHQtYXV0aFwiXHJcbmltcG9ydCBDcmVkZW50aWFsc1Byb3ZpZGVyIGZyb20gXCJuZXh0LWF1dGgvcHJvdmlkZXJzL2NyZWRlbnRpYWxzXCJcclxuaW1wb3J0IHsgdXNlckRiIH0gZnJvbSBcIkAvbGliL2RiXCJcclxuXHJcbmNvbnN0IGhhbmRsZXIgPSBOZXh0QXV0aCh7XHJcbiAgc2VjcmV0OiBwcm9jZXNzLmVudi5ORVhUQVVUSF9TRUNSRVQsXHJcbiAgdHJ1c3RIb3N0OiB0cnVlLFxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAgQ3JlZGVudGlhbHNQcm92aWRlcih7XHJcbiAgICAgIG5hbWU6IFwiQ3JlZGVudGlhbHNcIixcclxuICAgICAgY3JlZGVudGlhbHM6IHtcclxuICAgICAgICBlbWFpbDogeyBsYWJlbDogXCLpgq7nrrFcIiwgdHlwZTogXCJlbWFpbFwiIH0sXHJcbiAgICAgICAgcGFzc3dvcmQ6IHsgbGFiZWw6IFwi5a+G56CBXCIsIHR5cGU6IFwicGFzc3dvcmRcIiB9XHJcbiAgICAgIH0sXHJcbiAgICAgIGFzeW5jIGF1dGhvcml6ZShjcmVkZW50aWFscykge1xyXG4gICAgICAgIGlmICghY3JlZGVudGlhbHM/LmVtYWlsIHx8ICFjcmVkZW50aWFscz8ucGFzc3dvcmQpIHtcclxuICAgICAgICAgIHJldHVybiBudWxsXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB1c2VyID0gdXNlckRiLmZpbmRCeUVtYWlsKGNyZWRlbnRpYWxzLmVtYWlsKVxyXG4gICAgICAgIGlmICghdXNlcikge1xyXG4gICAgICAgICAgcmV0dXJuIG51bGxcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh1c2VyLnBhc3N3b3JkID09PSBjcmVkZW50aWFscy5wYXNzd29yZCkge1xyXG4gICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgaWQ6IHVzZXIuaWQsXHJcbiAgICAgICAgICAgIG5hbWU6IHVzZXIubmFtZSxcclxuICAgICAgICAgICAgZW1haWw6IHVzZXIuZW1haWwsXHJcbiAgICAgICAgICAgIHJvbGU6IHVzZXIucm9sZVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG51bGxcclxuICAgICAgfVxyXG4gICAgfSlcclxuICBdLFxyXG4gIHNlc3Npb246IHsgc3RyYXRlZ3k6IFwiand0XCIgfSxcclxuICBwYWdlczogeyBzaWduSW46IFwiL2xvZ2luXCIgfSxcclxuICBjYWxsYmFja3M6IHtcclxuICAgIGFzeW5jIGp3dCh7IHRva2VuLCB1c2VyIH0pIHtcclxuICAgICAgaWYgKHVzZXIpIHtcclxuICAgICAgICB0b2tlbi51c2VySWQgPSB1c2VyLmlkXHJcbiAgICAgICAgdG9rZW4ucm9sZSA9ICh1c2VyIGFzIGFueSkucm9sZVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB0b2tlblxyXG4gICAgfSxcclxuICAgIGFzeW5jIHNlc3Npb24oeyBzZXNzaW9uLCB0b2tlbiB9KSB7XHJcbiAgICAgIGlmIChzZXNzaW9uLnVzZXIpIHtcclxuICAgICAgICBzZXNzaW9uLnVzZXIuaWQgPSB0b2tlbi51c2VySWQgYXMgc3RyaW5nXHJcbiAgICAgICAgc2Vzc2lvbi51c2VyLnJvbGUgPSB0b2tlbi5yb2xlIGFzIHN0cmluZ1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBzZXNzaW9uXHJcbiAgICB9XHJcbiAgfVxyXG59KVxyXG5cclxuZXhwb3J0IHsgaGFuZGxlciBhcyBHRVQsIGhhbmRsZXIgYXMgUE9TVCB9XHJcbiJdLCJuYW1lcyI6WyJOZXh0QXV0aCIsIkNyZWRlbnRpYWxzUHJvdmlkZXIiLCJ1c2VyRGIiLCJoYW5kbGVyIiwic2VjcmV0IiwicHJvY2VzcyIsImVudiIsIk5FWFRBVVRIX1NFQ1JFVCIsInRydXN0SG9zdCIsInByb3ZpZGVycyIsIm5hbWUiLCJjcmVkZW50aWFscyIsImVtYWlsIiwibGFiZWwiLCJ0eXBlIiwicGFzc3dvcmQiLCJhdXRob3JpemUiLCJ1c2VyIiwiZmluZEJ5RW1haWwiLCJpZCIsInJvbGUiLCJzZXNzaW9uIiwic3RyYXRlZ3kiLCJwYWdlcyIsInNpZ25JbiIsImNhbGxiYWNrcyIsImp3dCIsInRva2VuIiwidXNlcklkIiwiR0VUIiwiUE9TVCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/auth/[...nextauth]/route.ts\n");

/***/ }),

/***/ "(rsc)/./src/lib/db.ts":
/*!***********************!*\
  !*** ./src/lib/db.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getDb: () => (/* binding */ getDb),\n/* harmony export */   resumeDb: () => (/* binding */ resumeDb),\n/* harmony export */   userDb: () => (/* binding */ userDb)\n/* harmony export */ });\n/* harmony import */ var better_sqlite3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! better-sqlite3 */ \"better-sqlite3\");\n/* harmony import */ var better_sqlite3__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(better_sqlite3__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nconst DB_DIR = path__WEBPACK_IMPORTED_MODULE_1___default().join(process.cwd(), \"data\");\nconst DB_PATH = path__WEBPACK_IMPORTED_MODULE_1___default().join(DB_DIR, \"talentgraph.db\");\nlet db = null;\nfunction getDb() {\n    if (db) return db;\n    if (!(0,fs__WEBPACK_IMPORTED_MODULE_2__.existsSync)(DB_DIR)) {\n        (0,fs__WEBPACK_IMPORTED_MODULE_2__.mkdirSync)(DB_DIR, {\n            recursive: true\n        });\n    }\n    db = new (better_sqlite3__WEBPACK_IMPORTED_MODULE_0___default())(DB_PATH);\n    db.pragma(\"journal_mode = WAL\");\n    initSchema(db);\n    return db;\n}\nfunction initSchema(database) {\n    database.exec(`\n    CREATE TABLE IF NOT EXISTS users (\n      id TEXT PRIMARY KEY,\n      name TEXT NOT NULL,\n      email TEXT UNIQUE NOT NULL,\n      password TEXT,\n      role TEXT DEFAULT 'user',\n      created_at TEXT DEFAULT (datetime('now')),\n      updated_at TEXT DEFAULT (datetime('now'))\n    );\n\n    CREATE TABLE IF NOT EXISTS resumes (\n      id TEXT PRIMARY KEY,\n      user_id TEXT NOT NULL,\n      talent_data TEXT NOT NULL,\n      status TEXT DEFAULT 'pending',\n      created_at TEXT DEFAULT (datetime('now')),\n      updated_at TEXT DEFAULT (datetime('now')),\n      FOREIGN KEY (user_id) REFERENCES users(id)\n    );\n\n    CREATE INDEX IF NOT EXISTS idx_resumes_user_id ON resumes(user_id);\n    CREATE INDEX IF NOT EXISTS idx_resumes_status ON resumes(status);\n    CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);\n  `);\n    const existingUsers = database.prepare(\"SELECT COUNT(*) as count FROM users\").get();\n    if (existingUsers.count === 0) {\n        const insertUser = database.prepare(`\n      INSERT INTO users (id, name, email, password, role) VALUES (?, ?, ?, ?, ?)\n    `);\n        const testUsers = [\n            [\n                \"test-user-001\",\n                \"张伟\",\n                \"test@talentgraph.com\",\n                \"test123\",\n                \"user\"\n            ],\n            [\n                \"admin-user-001\",\n                \"管理员\",\n                \"admin@talentgraph.com\",\n                \"admin123\",\n                \"admin\"\n            ],\n            [\n                \"test-user-002\",\n                \"李明\",\n                \"user01@talentgraph.com\",\n                \"123456\",\n                \"user\"\n            ],\n            [\n                \"test-user-003\",\n                \"王芳\",\n                \"user02@talentgraph.com\",\n                \"123456\",\n                \"user\"\n            ],\n            [\n                \"test-user-004\",\n                \"刘洋\",\n                \"user03@talentgraph.com\",\n                \"123456\",\n                \"user\"\n            ],\n            [\n                \"test-user-005\",\n                \"陈静\",\n                \"user04@talentgraph.com\",\n                \"123456\",\n                \"user\"\n            ],\n            [\n                \"test-user-006\",\n                \"杨帆\",\n                \"user05@talentgraph.com\",\n                \"123456\",\n                \"user\"\n            ],\n            [\n                \"test-user-007\",\n                \"赵磊\",\n                \"user06@talentgraph.com\",\n                \"123456\",\n                \"user\"\n            ],\n            [\n                \"test-user-008\",\n                \"周婷\",\n                \"user07@talentgraph.com\",\n                \"123456\",\n                \"user\"\n            ],\n            [\n                \"test-user-009\",\n                \"吴强\",\n                \"user08@talentgraph.com\",\n                \"123456\",\n                \"user\"\n            ],\n            [\n                \"test-user-010\",\n                \"郑琳\",\n                \"user09@talentgraph.com\",\n                \"123456\",\n                \"user\"\n            ],\n            [\n                \"test-user-011\",\n                \"孙浩\",\n                \"user10@talentgraph.com\",\n                \"123456\",\n                \"user\"\n            ],\n            [\n                \"test-user-012\",\n                \"测试用户1\",\n                \"test01@talentgraph.com\",\n                \"123456\",\n                \"user\"\n            ],\n            [\n                \"test-user-013\",\n                \"测试用户2\",\n                \"test02@talentgraph.com\",\n                \"123456\",\n                \"user\"\n            ]\n        ];\n        for (const user of testUsers){\n            insertUser.run(...user);\n        }\n    }\n}\nconst resumeDb = {\n    create (resume) {\n        const db = getDb();\n        const stmt = db.prepare(`\n      INSERT INTO resumes (id, user_id, talent_data, status)\n      VALUES (?, ?, ?, ?)\n    `);\n        stmt.run(resume.id, resume.user_id, resume.talent_data, resume.status || \"pending\");\n        return resume;\n    },\n    findById (id) {\n        const db = getDb();\n        const stmt = db.prepare(\"SELECT * FROM resumes WHERE id = ?\");\n        const row = stmt.get(id);\n        if (row) {\n            return {\n                ...row,\n                talent_data: JSON.parse(row.talent_data)\n            };\n        }\n        return null;\n    },\n    findByUserId (userId) {\n        const db = getDb();\n        const stmt = db.prepare(\"SELECT * FROM resumes WHERE user_id = ? ORDER BY created_at DESC\");\n        const rows = stmt.all(userId);\n        return rows;\n    },\n    findAll () {\n        const db = getDb();\n        const stmt = db.prepare(\"SELECT * FROM resumes ORDER BY created_at DESC\");\n        const rows = stmt.all();\n        return rows.map((row)=>({\n                ...row,\n                talent_data: JSON.parse(row.talent_data)\n            }));\n    },\n    updateStatus (id, status) {\n        const db = getDb();\n        const stmt = db.prepare('UPDATE resumes SET status = ?, updated_at = datetime(\"now\") WHERE id = ?');\n        stmt.run(status, id);\n    },\n    count () {\n        const db = getDb();\n        const stmt = db.prepare(\"SELECT COUNT(*) as count FROM resumes\");\n        return stmt.get().count;\n    },\n    countByStatus (status) {\n        const db = getDb();\n        const stmt = db.prepare(\"SELECT COUNT(*) as count FROM resumes WHERE status = ?\");\n        return stmt.get(status).count;\n    },\n    deleteById (id) {\n        const db = getDb();\n        const stmt = db.prepare(\"DELETE FROM resumes WHERE id = ?\");\n        const result = stmt.run(id);\n        return result.changes > 0;\n    }\n};\nconst userDb = {\n    findByEmail (email) {\n        const db = getDb();\n        const stmt = db.prepare(\"SELECT * FROM users WHERE email = ?\");\n        return stmt.get(email);\n    },\n    findById (id) {\n        const db = getDb();\n        const stmt = db.prepare(\"SELECT * FROM users WHERE id = ?\");\n        return stmt.get(id);\n    },\n    findAll () {\n        const db = getDb();\n        const stmt = db.prepare(\"SELECT * FROM users ORDER BY created_at DESC\");\n        return stmt.all();\n    },\n    count () {\n        const db = getDb();\n        const stmt = db.prepare(\"SELECT COUNT(*) as count FROM users\");\n        return stmt.get().count;\n    },\n    create (user) {\n        const db = getDb();\n        const stmt = db.prepare(`\n      INSERT INTO users (id, name, email, password, role)\n      VALUES (?, ?, ?, ?, ?)\n    `);\n        stmt.run(user.id, user.name, user.email, user.password, user.role || \"user\");\n        return user;\n    }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QU1pQixPQUFPbEIsR0FBR1EsT0FBTyxDQUFDO1FBQ3hCLE9BQU9VLEtBQUtULEdBQUcsQ0FBQ1U7SUFDbEI7SUFFQVk7UUFDRSxNQUFNL0IsS0FBS0M7UUFDWCxNQUFNaUIsT0FBT2xCLEdBQUdRLE9BQU8sQ0FBQztRQUN4QixPQUFPVSxLQUFLWSxHQUFHO0lBQ2pCO0lBRUFwQjtRQUNFLE1BQU1WLEtBQUtDO1FBQ1gsTUFBTWlCLE9BQU9sQixHQUFHUSxPQUFPLENBQUM7UUFDeEIsT0FBTyxLQUFNQyxHQUFHLEdBQXlCQyxLQUFLO0lBQ2hEO0lBRUFNLFFBQU9ILElBQWtGO1FBQ3ZGLE1BQU1iLEtBQUtDO1FBQ1gsTUFBTWlCLE9BQU9sQixHQUFHUSxPQUFPLENBQUMsQ0FBQzs7O0lBR3pCLENBQUM7UUFDRFUsS0FBS0osR0FBRyxDQUFDRCxLQUFLTSxFQUFFLEVBQUVOLEtBQUs0QixJQUFJLEVBQUU1QixLQUFLMkIsS0FBSyxFQUFFM0IsS0FBSzZCLFFBQVEsRUFBRTdCLEtBQUs4QixJQUFJLElBQUk7UUFDckUsT0FBTzlCO0lBQ1Q7QUFDRixFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdGFsZW50Z3JhcGgvLi9zcmMvbGliL2RiLnRzPzllNGYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IERhdGFiYXNlIGZyb20gJ2JldHRlci1zcWxpdGUzJ1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCB7IGV4aXN0c1N5bmMsIG1rZGlyU3luYyB9IGZyb20gJ2ZzJ1xuXG5jb25zdCBEQl9ESVIgPSBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgJ2RhdGEnKVxuY29uc3QgREJfUEFUSCA9IHBhdGguam9pbihEQl9ESVIsICd0YWxlbnRncmFwaC5kYicpXG5cbmxldCBkYjogRGF0YWJhc2UuRGF0YWJhc2UgfCBudWxsID0gbnVsbFxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGIoKTogRGF0YWJhc2UuRGF0YWJhc2Uge1xuICBpZiAoZGIpIHJldHVybiBkYlxuXG4gIGlmICghZXhpc3RzU3luYyhEQl9ESVIpKSB7XG4gICAgbWtkaXJTeW5jKERCX0RJUiwgeyByZWN1cnNpdmU6IHRydWUgfSlcbiAgfVxuXG4gIGRiID0gbmV3IERhdGFiYXNlKERCX1BBVEgpXG4gIGRiLnByYWdtYSgnam91cm5hbF9tb2RlID0gV0FMJylcbiAgXG4gIGluaXRTY2hlbWEoZGIpXG4gIFxuICByZXR1cm4gZGJcbn1cblxuZnVuY3Rpb24gaW5pdFNjaGVtYShkYXRhYmFzZTogRGF0YWJhc2UuRGF0YWJhc2UpIHtcbiAgZGF0YWJhc2UuZXhlYyhgXG4gICAgQ1JFQVRFIFRBQkxFIElGIE5PVCBFWElTVFMgdXNlcnMgKFxuICAgICAgaWQgVEVYVCBQUklNQVJZIEtFWSxcbiAgICAgIG5hbWUgVEVYVCBOT1QgTlVMTCxcbiAgICAgIGVtYWlsIFRFWFQgVU5JUVVFIE5PVCBOVUxMLFxuICAgICAgcGFzc3dvcmQgVEVYVCxcbiAgICAgIHJvbGUgVEVYVCBERUZBVUxUICd1c2VyJyxcbiAgICAgIGNyZWF0ZWRfYXQgVEVYVCBERUZBVUxUIChkYXRldGltZSgnbm93JykpLFxuICAgICAgdXBkYXRlZF9hdCBURVhUIERFRkFVTFQgKGRhdGV0aW1lKCdub3cnKSlcbiAgICApO1xuXG4gICAgQ1JFQVRFIFRBQkxFIElGIE5PVCBFWElTVFMgcmVzdW1lcyAoXG4gICAgICBpZCBURVhUIFBSSU1BUlkgS0VZLFxuICAgICAgdXNlcl9pZCBURVhUIE5PVCBOVUxMLFxuICAgICAgdGFsZW50X2RhdGEgVEVYVCBOT1QgTlVMTCxcbiAgICAgIHN0YXR1cyBURVhUIERFRkFVTFQgJ3BlbmRpbmcnLFxuICAgICAgY3JlYXRlZF9hdCBURVhUIERFRkFVTFQgKGRhdGV0aW1lKCdub3cnKSksXG4gICAgICB1cGRhdGVkX2F0IFRFWFQgREVGQVVMVCAoZGF0ZXRpbWUoJ25vdycpKSxcbiAgICAgIEZPUkVJR04gS0VZICh1c2VyX2lkKSBSRUZFUkVOQ0VTIHVzZXJzKGlkKVxuICAgICk7XG5cbiAgICBDUkVBVEUgSU5ERVggSUYgTk9UIEVYSVNUUyBpZHhfcmVzdW1lc191c2VyX2lkIE9OIHJlc3VtZXModXNlcl9pZCk7XG4gICAgQ1JFQVRFIElOREVYIElGIE5PVCBFWElTVFMgaWR4X3Jlc3VtZXNfc3RhdHVzIE9OIHJlc3VtZXMoc3RhdHVzKTtcbiAgICBDUkVBVEUgSU5ERVggSUYgTk9UIEVYSVNUUyBpZHhfdXNlcnNfZW1haWwgT04gdXNlcnMoZW1haWwpO1xuICBgKVxuXG4gIGNvbnN0IGV4aXN0aW5nVXNlcnMgPSBkYXRhYmFzZS5wcmVwYXJlKCdTRUxFQ1QgQ09VTlQoKikgYXMgY291bnQgRlJPTSB1c2VycycpLmdldCgpIGFzIHsgY291bnQ6IG51bWJlciB9XG4gIGlmIChleGlzdGluZ1VzZXJzLmNvdW50ID09PSAwKSB7XG4gICAgY29uc3QgaW5zZXJ0VXNlciA9IGRhdGFiYXNlLnByZXBhcmUoYFxuICAgICAgSU5TRVJUIElOVE8gdXNlcnMgKGlkLCBuYW1lLCBlbWFpbCwgcGFzc3dvcmQsIHJvbGUpIFZBTFVFUyAoPywgPywgPywgPywgPylcbiAgICBgKVxuICAgIFxuICAgIGNvbnN0IHRlc3RVc2VycyA9IFtcbiAgICAgIFsndGVzdC11c2VyLTAwMScsICflvKDkvJ8nLCAndGVzdEB0YWxlbnRncmFwaC5jb20nLCAndGVzdDEyMycsICd1c2VyJ10sXG4gICAgICBbJ2FkbWluLXVzZXItMDAxJywgJ+euoeeQhuWRmCcsICdhZG1pbkB0YWxlbnRncmFwaC5jb20nLCAnYWRtaW4xMjMnLCAnYWRtaW4nXSxcbiAgICAgIFsndGVzdC11c2VyLTAwMicsICfmnY7mmI4nLCAndXNlcjAxQHRhbGVudGdyYXBoLmNvbScsICcxMjM0NTYnLCAndXNlciddLFxuICAgICAgWyd0ZXN0LXVzZXItMDAzJywgJ+eOi+iKsycsICd1c2VyMDJAdGFsZW50Z3JhcGguY29tJywgJzEyMzQ1NicsICd1c2VyJ10sXG4gICAgICBbJ3Rlc3QtdXNlci0wMDQnLCAn5YiY5rSLJywgJ3VzZXIwM0B0YWxlbnRncmFwaC5jb20nLCAnMTIzNDU2JywgJ3VzZXInXSxcbiAgICAgIFsndGVzdC11c2VyLTAwNScsICfpmYjpnZknLCAndXNlcjA0QHRhbGVudGdyYXBoLmNvbScsICcxMjM0NTYnLCAndXNlciddLFxuICAgICAgWyd0ZXN0LXVzZXItMDA2JywgJ+adqOW4hicsICd1c2VyMDVAdGFsZW50Z3JhcGguY29tJywgJzEyMzQ1NicsICd1c2VyJ10sXG4gICAgICBbJ3Rlc3QtdXNlci0wMDcnLCAn6LW156OKJywgJ3VzZXIwNkB0YWxlbnRncmFwaC5jb20nLCAnMTIzNDU2JywgJ3VzZXInXSxcbiAgICAgIFsndGVzdC11c2VyLTAwOCcsICflkajlqbcnLCAndXNlcjA3QHRhbGVudGdyYXBoLmNvbScsICcxMjM0NTYnLCAndXNlciddLFxuICAgICAgWyd0ZXN0LXVzZXItMDA5JywgJ+WQtOW8uicsICd1c2VyMDhAdGFsZW50Z3JhcGguY29tJywgJzEyMzQ1NicsICd1c2VyJ10sXG4gICAgICBbJ3Rlc3QtdXNlci0wMTAnLCAn6YOR55CzJywgJ3VzZXIwOUB0YWxlbnRncmFwaC5jb20nLCAnMTIzNDU2JywgJ3VzZXInXSxcbiAgICAgIFsndGVzdC11c2VyLTAxMScsICflrZnmtaknLCAndXNlcjEwQHRhbGVudGdyYXBoLmNvbScsICcxMjM0NTYnLCAndXNlciddLFxuICAgICAgWyd0ZXN0LXVzZXItMDEyJywgJ+a1i+ivleeUqOaItzEnLCAndGVzdDAxQHRhbGVudGdyYXBoLmNvbScsICcxMjM0NTYnLCAndXNlciddLFxuICAgICAgWyd0ZXN0LXVzZXItMDEzJywgJ+a1i+ivleeUqOaItzInLCAndGVzdDAyQHRhbGVudGdyYXBoLmNvbScsICcxMjM0NTYnLCAndXNlciddLFxuICAgIF1cblxuICAgIGZvciAoY29uc3QgdXNlciBvZiB0ZXN0VXNlcnMpIHtcbiAgICAgIGluc2VydFVzZXIucnVuKC4uLnVzZXIpXG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVzdW1lIHtcbiAgaWQ6IHN0cmluZ1xuICB1c2VyX2lkOiBzdHJpbmdcbiAgdGFsZW50X2RhdGE6IHN0cmluZ1xuICBzdGF0dXM6IHN0cmluZ1xuICBjcmVhdGVkX2F0OiBzdHJpbmdcbiAgdXBkYXRlZF9hdDogc3RyaW5nXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVXNlciB7XG4gIGlkOiBzdHJpbmdcbiAgbmFtZTogc3RyaW5nXG4gIGVtYWlsOiBzdHJpbmdcbiAgcGFzc3dvcmQ6IHN0cmluZyB8IG51bGxcbiAgcm9sZTogc3RyaW5nXG4gIGNyZWF0ZWRfYXQ6IHN0cmluZ1xuICB1cGRhdGVkX2F0OiBzdHJpbmdcbn1cblxuZXhwb3J0IGNvbnN0IHJlc3VtZURiID0ge1xuICBjcmVhdGUocmVzdW1lOiB7IGlkOiBzdHJpbmc7IHVzZXJfaWQ6IHN0cmluZzsgdGFsZW50X2RhdGE6IHN0cmluZzsgc3RhdHVzPzogc3RyaW5nIH0pIHtcbiAgICBjb25zdCBkYiA9IGdldERiKClcbiAgICBjb25zdCBzdG10ID0gZGIucHJlcGFyZShgXG4gICAgICBJTlNFUlQgSU5UTyByZXN1bWVzIChpZCwgdXNlcl9pZCwgdGFsZW50X2RhdGEsIHN0YXR1cylcbiAgICAgIFZBTFVFUyAoPywgPywgPywgPylcbiAgICBgKVxuICAgIHN0bXQucnVuKHJlc3VtZS5pZCwgcmVzdW1lLnVzZXJfaWQsIHJlc3VtZS50YWxlbnRfZGF0YSwgcmVzdW1lLnN0YXR1cyB8fCAncGVuZGluZycpXG4gICAgcmV0dXJuIHJlc3VtZVxuICB9LFxuXG4gIGZpbmRCeUlkKGlkOiBzdHJpbmcpIHtcbiAgICBjb25zdCBkYiA9IGdldERiKClcbiAgICBjb25zdCBzdG10ID0gZGIucHJlcGFyZSgnU0VMRUNUICogRlJPTSByZXN1bWVzIFdIRVJFIGlkID0gPycpXG4gICAgY29uc3Qgcm93ID0gc3RtdC5nZXQoaWQpIGFzIFJlc3VtZSB8IHVuZGVmaW5lZFxuICAgIGlmIChyb3cpIHtcbiAgICAgIHJldHVybiB7IC4uLnJvdywgdGFsZW50X2RhdGE6IEpTT04ucGFyc2Uocm93LnRhbGVudF9kYXRhKSB9XG4gICAgfVxuICAgIHJldHVybiBudWxsXG4gIH0sXG5cbiAgZmluZEJ5VXNlcklkKHVzZXJJZDogc3RyaW5nKSB7XG4gICAgY29uc3QgZGIgPSBnZXREYigpXG4gICAgY29uc3Qgc3RtdCA9IGRiLnByZXBhcmUoJ1NFTEVDVCAqIEZST00gcmVzdW1lcyBXSEVSRSB1c2VyX2lkID0gPyBPUkRFUiBCWSBjcmVhdGVkX2F0IERFU0MnKVxuICAgIGNvbnN0IHJvd3MgPSBzdG10LmFsbCh1c2VySWQpIGFzIFJlc3VtZVtdXG4gICAgcmV0dXJuIHJvd3NcbiAgfSxcblxuICBmaW5kQWxsKCkge1xuICAgIGNvbnN0IGRiID0gZ2V0RGIoKVxuICAgIGNvbnN0IHN0bXQgPSBkYi5wcmVwYXJlKCdTRUxFQ1QgKiBGUk9NIHJlc3VtZXMgT1JERVIgQlkgY3JlYXRlZF9hdCBERVNDJylcbiAgICBjb25zdCByb3dzID0gc3RtdC5hbGwoKSBhcyBSZXN1bWVbXVxuICAgIHJldHVybiByb3dzLm1hcChyb3cgPT4gKHsgLi4ucm93LCB0YWxlbnRfZGF0YTogSlNPTi5wYXJzZShyb3cudGFsZW50X2RhdGEpIH0pKVxuICB9LFxuXG4gIHVwZGF0ZVN0YXR1cyhpZDogc3RyaW5nLCBzdGF0dXM6IHN0cmluZykge1xuICAgIGNvbnN0IGRiID0gZ2V0RGIoKVxuICAgIGNvbnN0IHN0bXQgPSBkYi5wcmVwYXJlKCdVUERBVEUgcmVzdW1lcyBTRVQgc3RhdHVzID0gPywgdXBkYXRlZF9hdCA9IGRhdGV0aW1lKFwibm93XCIpIFdIRVJFIGlkID0gPycpXG4gICAgc3RtdC5ydW4oc3RhdHVzLCBpZClcbiAgfSxcblxuICBjb3VudCgpIHtcbiAgICBjb25zdCBkYiA9IGdldERiKClcbiAgICBjb25zdCBzdG10ID0gZGIucHJlcGFyZSgnU0VMRUNUIENPVU5UKCopIGFzIGNvdW50IEZST00gcmVzdW1lcycpXG4gICAgcmV0dXJuIChzdG10LmdldCgpIGFzIHsgY291bnQ6IG51bWJlciB9KS5jb3VudFxuICB9LFxuXG4gIGNvdW50QnlTdGF0dXMoc3RhdHVzOiBzdHJpbmcpIHtcbiAgICBjb25zdCBkYiA9IGdldERiKClcbiAgICBjb25zdCBzdG10ID0gZGIucHJlcGFyZSgnU0VMRUNUIENPVU5UKCopIGFzIGNvdW50IEZST00gcmVzdW1lcyBXSEVSRSBzdGF0dXMgPSA/JylcbiAgICByZXR1cm4gKHN0bXQuZ2V0KHN0YXR1cykgYXMgeyBjb3VudDogbnVtYmVyIH0pLmNvdW50XG4gIH0sXG5cbiAgZGVsZXRlQnlJZChpZDogc3RyaW5nKSB7XG4gICAgY29uc3QgZGIgPSBnZXREYigpXG4gICAgY29uc3Qgc3RtdCA9IGRiLnByZXBhcmUoJ0RFTEVURSBGUk9NIHJlc3VtZXMgV0hFUkUgaWQgPSA/JylcbiAgICBjb25zdCByZXN1bHQgPSBzdG10LnJ1bihpZClcbiAgICByZXR1cm4gcmVzdWx0LmNoYW5nZXMgPiAwXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IHVzZXJEYiA9IHtcbiAgZmluZEJ5RW1haWwoZW1haWw6IHN0cmluZykge1xuICAgIGNvbnN0IGRiID0gZ2V0RGIoKVxuICAgIGNvbnN0IHN0bXQgPSBkYi5wcmVwYXJlKCdTRUxFQ1QgKiBGUk9NIHVzZXJzIFdIRVJFIGVtYWlsID0gPycpXG4gICAgcmV0dXJuIHN0bXQuZ2V0KGVtYWlsKSBhcyBVc2VyIHwgdW5kZWZpbmVkXG4gIH0sXG5cbiAgZmluZEJ5SWQoaWQ6IHN0cmluZykge1xuICAgIGNvbnN0IGRiID0gZ2V0RGIoKVxuICAgIGNvbnN0IHN0bXQgPSBkYi5wcmVwYXJlKCdTRUxFQ1QgKiBGUk9NIHVzZXJzIFdIRVJFIGlkID0gPycpXG4gICAgcmV0dXJuIHN0bXQuZ2V0KGlkKSBhcyBVc2VyIHwgdW5kZWZpbmVkXG4gIH0sXG5cbiAgZmluZEFsbCgpIHtcbiAgICBjb25zdCBkYiA9IGdldERiKClcbiAgICBjb25zdCBzdG10ID0gZGIucHJlcGFyZSgnU0VMRUNUICogRlJPTSB1c2VycyBPUkRFUiBCWSBjcmVhdGVkX2F0IERFU0MnKVxuICAgIHJldHVybiBzdG10LmFsbCgpIGFzIFVzZXJbXVxuICB9LFxuXG4gIGNvdW50KCkge1xuICAgIGNvbnN0IGRiID0gZ2V0RGIoKVxuICAgIGNvbnN0IHN0bXQgPSBkYi5wcmVwYXJlKCdTRUxFQ1QgQ09VTlQoKikgYXMgY291bnQgRlJPTSB1c2VycycpXG4gICAgcmV0dXJuIChzdG10LmdldCgpIGFzIHsgY291bnQ6IG51bWJlciB9KS5jb3VudFxuICB9LFxuXG4gIGNyZWF0ZSh1c2VyOiB7IGlkOiBzdHJpbmc7IG5hbWU6IHN0cmluZzsgZW1haWw6IHN0cmluZzsgcGFzc3dvcmQ6IHN0cmluZzsgcm9sZT86IHN0cmluZyB9KSB7XG4gICAgY29uc3QgZGIgPSBnZXREYigpXG4gICAgY29uc3Qgc3RtdCA9IGRiLnByZXBhcmUoYFxuICAgICAgSU5TRVJUIElOVE8gdXNlcnMgKGlkLCBuYW1lLCBlbWFpbCwgcGFzc3dvcmQsIHJvbGUpXG4gICAgICBWQUxVRVMgKD8sID8sID8sID8sID8pXG4gICAgYClcbiAgICBzdG10LnJ1bih1c2VyLmlkLCB1c2VyLm5hbWUsIHVzZXIuZW1haWwsIHVzZXIucGFzc3dvcmQsIHVzZXIucm9sZSB8fCAndXNlcicpXG4gICAgcmV0dXJuIHVzZXJcbiAgfVxufVxuIl0sIm5hbWVzIjpbIkRhdGFiYXNlIiwicGF0aCIsImV4aXN0c1N5bmMiLCJta2RpclN5bmMiLCJEQl9ESVIiLCJqb2luIiwicHJvY2VzcyIsImN3ZCIsIkRCX1BBVEgiLCJkYiIsImdldERiIiwicmVjdXJzaXZlIiwicHJhZ21hIiwiaW5pdFNjaGVtYSIsImRhdGFiYXNlIiwiZXhlYyIsImV4aXN0aW5nVXNlcnMiLCJwcmVwYXJlIiwiZ2V0IiwiY291bnQiLCJpbnNlcnRVc2VyIiwidGVzdFVzZXJzIiwidXNlciIsInJ1biIsInJlc3VtZURiIiwiY3JlYXRlIiwicmVzdW1lIiwic3RtdCIsImlkIiwidXNlcl9pZCIsInRhbGVudF9kYXRhIiwic3RhdHVzIiwiZmluZEJ5SWQiLCJyb3ciLCJKU09OIiwicGFyc2UiLCJmaW5kQnlVc2VySWQiLCJ1c2VySWQiLCJyb3dzIiwiYWxsIiwiZmluZEFsbCIsIm1hcCIsInVwZGF0ZVN0YXR1cyIsImNvdW50QnlTdGF0dXMiLCJkZWxldGVCeUlkIiwicmVzdWx0IiwiY2hhbmdlcyIsInVzZXJEYiIsImZpbmRCeUVtYWlsIiwiZW1haWwiLCJuYW1lIiwicGFzc3dvcmQiLCJyb2xlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./src/lib/db.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/openid-client","vendor-chunks/oauth","vendor-chunks/preact","vendor-chunks/uuid","vendor-chunks/yallist","vendor-chunks/lru-cache","vendor-chunks/preact-render-to-string","vendor-chunks/oidc-token-hash","vendor-chunks/@panva"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=C%3A%5CUsers%5CAprilWu%5CDocuments%5Ctrae_projects%5Cnewboss%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CAprilWu%5CDocuments%5Ctrae_projects%5Cnewboss&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();