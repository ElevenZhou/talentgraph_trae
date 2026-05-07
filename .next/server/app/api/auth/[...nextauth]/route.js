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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ handler),\n/* harmony export */   POST: () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers/credentials */ \"(rsc)/./node_modules/next-auth/providers/credentials.js\");\n/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/db */ \"(rsc)/./src/lib/db.ts\");\n\n\n\nconst handler = next_auth__WEBPACK_IMPORTED_MODULE_0___default()({\n    secret: process.env.NEXTAUTH_SECRET,\n    providers: [\n        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({\n            name: \"Credentials\",\n            credentials: {\n                email: {\n                    label: \"邮箱\",\n                    type: \"email\"\n                },\n                password: {\n                    label: \"密码\",\n                    type: \"password\"\n                }\n            },\n            async authorize (credentials) {\n                if (!credentials?.email || !credentials?.password) return null;\n                const user = _lib_db__WEBPACK_IMPORTED_MODULE_2__.userDb.findByEmail(credentials.email);\n                if (!user) return null;\n                if (user.password === credentials.password) {\n                    return {\n                        id: user.id,\n                        name: user.name,\n                        email: user.email,\n                        role: user.role\n                    };\n                }\n                return null;\n            }\n        })\n    ],\n    session: {\n        strategy: \"jwt\"\n    },\n    pages: {\n        signIn: \"/login\"\n    },\n    callbacks: {\n        async jwt (token, user) {\n            if (user) {\n                token.userId = user.id;\n                token.role = user.role;\n            }\n            return token;\n        },\n        async session (session, token) {\n            if (session.user) {\n                session.user.id = token.userId(session.user).role = token.role;\n            }\n            return session;\n        }\n    }\n});\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBZ0M7QUFDaUM7QUFDaEM7QUFFakMsTUFBTUcsVUFBVUgsZ0RBQVFBLENBQUM7SUFDdkJJLFFBQVFDLFFBQVFDLEdBQUcsQ0FBQ0MsZUFBZTtJQUNuQ0MsV0FBVztRQUNUUCwyRUFBbUJBLENBQUM7WUFDbEJRLE1BQU07WUFDTkMsYUFBYTtnQkFDWEMsT0FBTztvQkFBRUMsT0FBTztvQkFBTUMsTUFBTTtnQkFBUTtnQkFDcENDLFVBQVU7b0JBQUVGLE9BQU87b0JBQU1DLE1BQU07Z0JBQVc7WUFDNUM7WUFDQSxNQUFNRSxXQUFVTCxXQUFXO2dCQUN6QixJQUFJLENBQUNBLGFBQWFDLFNBQVMsQ0FBQ0QsYUFBYUksVUFBVSxPQUFPO2dCQUUxRCxNQUFNRSxPQUFPZCwyQ0FBTUEsQ0FBQ2UsV0FBVyxDQUFDUCxZQUFZQyxLQUFLO2dCQUNqRCxJQUFJLENBQUNLLE1BQU0sT0FBTztnQkFFbEIsSUFBSUEsS0FBS0YsUUFBUSxLQUFLSixZQUFZSSxRQUFRLEVBQUU7b0JBQzFDLE9BQU87d0JBQ0xJLElBQUlGLEtBQUtFLEVBQUU7d0JBQ1hULE1BQU1PLEtBQUtQLElBQUk7d0JBQ2ZFLE9BQU9LLEtBQUtMLEtBQUs7d0JBQ2pCUSxNQUFNSCxLQUFLRyxJQUFJO29CQUNqQjtnQkFDRjtnQkFFQSxPQUFPO1lBQ1Q7UUFDRjtLQUNEO0lBQ0RDLFNBQVM7UUFBRUMsVUFBVTtJQUFNO0lBQzNCQyxPQUFPO1FBQUVDLFFBQVE7SUFBUztJQUMxQkMsV0FBVztRQUNULE1BQU1DLEtBQUlDLEtBQUssRUFBRVYsSUFBSTtZQUNuQixJQUFJQSxNQUFNO2dCQUNSVSxNQUFNQyxNQUFNLEdBQUdYLEtBQUtFLEVBQUU7Z0JBQ3RCUSxNQUFNUCxJQUFJLEdBQUcsS0FBY0EsSUFBSTtZQUNqQztZQUNBLE9BQU9PO1FBQ1Q7UUFDQSxNQUFNTixTQUFRQSxPQUFPLEVBQUVNLEtBQUs7WUFDMUIsSUFBSU4sUUFBUUosSUFBSSxFQUFFO2dCQUNmSSxRQUFRSixJQUFJLENBQVNFLEVBQUUsR0FBR1EsTUFBTUMsTUFBTSxDQUN0Q1AsUUFBUUosSUFBSSxFQUFTRyxJQUFJLEdBQUdPLE1BQU1QLElBQUk7WUFDekM7WUFDQSxPQUFPQztRQUNUO0lBQ0Y7QUFDRjtBQUUwQyIsInNvdXJjZXMiOlsid2VicGFjazovL3RhbGVudGdyYXBoLy4vYXBwL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGUudHM/YzhhNCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTmV4dEF1dGggZnJvbSBcIm5leHQtYXV0aFwiXHJcbmltcG9ydCBDcmVkZW50aWFsc1Byb3ZpZGVyIGZyb20gXCJuZXh0LWF1dGgvcHJvdmlkZXJzL2NyZWRlbnRpYWxzXCJcclxuaW1wb3J0IHsgdXNlckRiIH0gZnJvbSBcIkAvbGliL2RiXCJcclxuXHJcbmNvbnN0IGhhbmRsZXIgPSBOZXh0QXV0aCh7XHJcbiAgc2VjcmV0OiBwcm9jZXNzLmVudi5ORVhUQVVUSF9TRUNSRVQsXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICBDcmVkZW50aWFsc1Byb3ZpZGVyKHtcclxuICAgICAgbmFtZTogXCJDcmVkZW50aWFsc1wiLFxyXG4gICAgICBjcmVkZW50aWFsczoge1xyXG4gICAgICAgIGVtYWlsOiB7IGxhYmVsOiBcIumCrueusVwiLCB0eXBlOiBcImVtYWlsXCIgfSxcclxuICAgICAgICBwYXNzd29yZDogeyBsYWJlbDogXCLlr4bnoIFcIiwgdHlwZTogXCJwYXNzd29yZFwiIH1cclxuICAgICAgfSxcclxuICAgICAgYXN5bmMgYXV0aG9yaXplKGNyZWRlbnRpYWxzKSB7XHJcbiAgICAgICAgaWYgKCFjcmVkZW50aWFscz8uZW1haWwgfHwgIWNyZWRlbnRpYWxzPy5wYXNzd29yZCkgcmV0dXJuIG51bGxcclxuICAgICAgICBcclxuICAgICAgICBjb25zdCB1c2VyID0gdXNlckRiLmZpbmRCeUVtYWlsKGNyZWRlbnRpYWxzLmVtYWlsKVxyXG4gICAgICAgIGlmICghdXNlcikgcmV0dXJuIG51bGxcclxuICAgICAgICBcclxuICAgICAgICBpZiAodXNlci5wYXNzd29yZCA9PT0gY3JlZGVudGlhbHMucGFzc3dvcmQpIHtcclxuICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGlkOiB1c2VyLmlkLFxyXG4gICAgICAgICAgICBuYW1lOiB1c2VyLm5hbWUsXHJcbiAgICAgICAgICAgIGVtYWlsOiB1c2VyLmVtYWlsLFxyXG4gICAgICAgICAgICByb2xlOiB1c2VyLnJvbGVcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIG51bGxcclxuICAgICAgfVxyXG4gICAgfSlcclxuICBdLFxyXG4gIHNlc3Npb246IHsgc3RyYXRlZ3k6IFwiand0XCIgfSxcclxuICBwYWdlczogeyBzaWduSW46IFwiL2xvZ2luXCIgfSxcclxuICBjYWxsYmFja3M6IHtcclxuICAgIGFzeW5jIGp3dCh0b2tlbiwgdXNlcikge1xyXG4gICAgICBpZiAodXNlcikge1xyXG4gICAgICAgIHRva2VuLnVzZXJJZCA9IHVzZXIuaWRcclxuICAgICAgICB0b2tlbi5yb2xlID0gKHVzZXIgYXMgYW55KS5yb2xlXHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHRva2VuXHJcbiAgICB9LFxyXG4gICAgYXN5bmMgc2Vzc2lvbihzZXNzaW9uLCB0b2tlbikge1xyXG4gICAgICBpZiAoc2Vzc2lvbi51c2VyKSB7XHJcbiAgICAgICAgKHNlc3Npb24udXNlciBhcyBhbnkpLmlkID0gdG9rZW4udXNlcklkXHJcbiAgICAgICAgKHNlc3Npb24udXNlciBhcyBhbnkpLnJvbGUgPSB0b2tlbi5yb2xlXHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHNlc3Npb25cclxuICAgIH1cclxuICB9XHJcbn0pXHJcblxyXG5leHBvcnQgeyBoYW5kbGVyIGFzIEdFVCwgaGFuZGxlciBhcyBQT1NUIH1cclxuIl0sIm5hbWVzIjpbIk5leHRBdXRoIiwiQ3JlZGVudGlhbHNQcm92aWRlciIsInVzZXJEYiIsImhhbmRsZXIiLCJzZWNyZXQiLCJwcm9jZXNzIiwiZW52IiwiTkVYVEFVVEhfU0VDUkVUIiwicHJvdmlkZXJzIiwibmFtZSIsImNyZWRlbnRpYWxzIiwiZW1haWwiLCJsYWJlbCIsInR5cGUiLCJwYXNzd29yZCIsImF1dGhvcml6ZSIsInVzZXIiLCJmaW5kQnlFbWFpbCIsImlkIiwicm9sZSIsInNlc3Npb24iLCJzdHJhdGVneSIsInBhZ2VzIiwic2lnbkluIiwiY2FsbGJhY2tzIiwiand0IiwidG9rZW4iLCJ1c2VySWQiLCJHRVQiLCJQT1NUIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/auth/[...nextauth]/route.ts\n");

/***/ }),

/***/ "(rsc)/./src/lib/db.ts":
/*!***********************!*\
  !*** ./src/lib/db.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getDb: () => (/* binding */ getDb),\n/* harmony export */   resumeDb: () => (/* binding */ resumeDb),\n/* harmony export */   userDb: () => (/* binding */ userDb)\n/* harmony export */ });\n/* harmony import */ var better_sqlite3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! better-sqlite3 */ \"better-sqlite3\");\n/* harmony import */ var better_sqlite3__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(better_sqlite3__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nconst DB_DIR = path__WEBPACK_IMPORTED_MODULE_1___default().join(process.cwd(), \"data\");\nconst DB_PATH = path__WEBPACK_IMPORTED_MODULE_1___default().join(DB_DIR, \"talentgraph.db\");\nlet db = null;\nfunction getDb() {\n    if (db) return db;\n    if (!(0,fs__WEBPACK_IMPORTED_MODULE_2__.existsSync)(DB_DIR)) {\n        (0,fs__WEBPACK_IMPORTED_MODULE_2__.mkdirSync)(DB_DIR, {\n            recursive: true\n        });\n    }\n    db = new (better_sqlite3__WEBPACK_IMPORTED_MODULE_0___default())(DB_PATH);\n    db.pragma(\"journal_mode = WAL\");\n    initSchema(db);\n    return db;\n}\nfunction initSchema(database) {\n    database.exec(`\n    CREATE TABLE IF NOT EXISTS users (\n      id TEXT PRIMARY KEY,\n      name TEXT NOT NULL,\n      email TEXT UNIQUE NOT NULL,\n      password TEXT,\n      role TEXT DEFAULT 'user',\n      created_at TEXT DEFAULT (datetime('now')),\n      updated_at TEXT DEFAULT (datetime('now'))\n    );\n\n    CREATE TABLE IF NOT EXISTS resumes (\n      id TEXT PRIMARY KEY,\n      user_id TEXT NOT NULL,\n      talent_data TEXT NOT NULL,\n      status TEXT DEFAULT 'pending',\n      created_at TEXT DEFAULT (datetime('now')),\n      updated_at TEXT DEFAULT (datetime('now')),\n      FOREIGN KEY (user_id) REFERENCES users(id)\n    );\n\n    CREATE INDEX IF NOT EXISTS idx_resumes_user_id ON resumes(user_id);\n    CREATE INDEX IF NOT EXISTS idx_resumes_status ON resumes(status);\n    CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);\n  `);\n    const existingUsers = database.prepare(\"SELECT COUNT(*) as count FROM users\").get();\n    if (existingUsers.count === 0) {\n        const insertUser = database.prepare(`\n      INSERT INTO users (id, name, email, password, role) VALUES (?, ?, ?, ?, ?)\n    `);\n        const testUsers = [\n            [\n                \"test-user-001\",\n                \"张伟\",\n                \"test@talentgraph.com\",\n                \"test123\",\n                \"user\"\n            ],\n            [\n                \"admin-user-001\",\n                \"管理员\",\n                \"admin@talentgraph.com\",\n                \"admin123\",\n                \"admin\"\n            ],\n            [\n                \"test-user-002\",\n                \"李明\",\n                \"user01@talentgraph.com\",\n                \"123456\",\n                \"user\"\n            ],\n            [\n                \"test-user-003\",\n                \"王芳\",\n                \"user02@talentgraph.com\",\n                \"123456\",\n                \"user\"\n            ],\n            [\n                \"test-user-004\",\n                \"刘洋\",\n                \"user03@talentgraph.com\",\n                \"123456\",\n                \"user\"\n            ],\n            [\n                \"test-user-005\",\n                \"陈静\",\n                \"user04@talentgraph.com\",\n                \"123456\",\n                \"user\"\n            ],\n            [\n                \"test-user-006\",\n                \"杨帆\",\n                \"user05@talentgraph.com\",\n                \"123456\",\n                \"user\"\n            ],\n            [\n                \"test-user-007\",\n                \"赵磊\",\n                \"user06@talentgraph.com\",\n                \"123456\",\n                \"user\"\n            ],\n            [\n                \"test-user-008\",\n                \"周婷\",\n                \"user07@talentgraph.com\",\n                \"123456\",\n                \"user\"\n            ],\n            [\n                \"test-user-009\",\n                \"吴强\",\n                \"user08@talentgraph.com\",\n                \"123456\",\n                \"user\"\n            ],\n            [\n                \"test-user-010\",\n                \"郑琳\",\n                \"user09@talentgraph.com\",\n                \"123456\",\n                \"user\"\n            ],\n            [\n                \"test-user-011\",\n                \"孙浩\",\n                \"user10@talentgraph.com\",\n                \"123456\",\n                \"user\"\n            ]\n        ];\n        for (const user of testUsers){\n            insertUser.run(...user);\n        }\n    }\n}\nconst resumeDb = {\n    create (resume) {\n        const db = getDb();\n        const stmt = db.prepare(`\n      INSERT INTO resumes (id, user_id, talent_data, status)\n      VALUES (?, ?, ?, ?)\n    `);\n        stmt.run(resume.id, resume.user_id, resume.talent_data, resume.status || \"pending\");\n        return resume;\n    },\n    findById (id) {\n        const db = getDb();\n        const stmt = db.prepare(\"SELECT * FROM resumes WHERE id = ?\");\n        const row = stmt.get(id);\n        if (row) {\n            return {\n                ...row,\n                talent_data: JSON.parse(row.talent_data)\n            };\n        }\n        return null;\n    },\n    findByUserId (userId) {\n        const db = getDb();\n        const stmt = db.prepare(\"SELECT * FROM resumes WHERE user_id = ? ORDER BY created_at DESC\");\n        const rows = stmt.all(userId);\n        return rows.map((row)=>({\n                ...row,\n                talent_data: JSON.parse(row.talent_data)\n            }));\n    },\n    findAll () {\n        const db = getDb();\n        const stmt = db.prepare(\"SELECT * FROM resumes ORDER BY created_at DESC\");\n        const rows = stmt.all();\n        return rows.map((row)=>({\n                ...row,\n                talent_data: JSON.parse(row.talent_data)\n            }));\n    },\n    updateStatus (id, status) {\n        const db = getDb();\n        const stmt = db.prepare('UPDATE resumes SET status = ?, updated_at = datetime(\"now\") WHERE id = ?');\n        stmt.run(status, id);\n    },\n    count () {\n        const db = getDb();\n        const stmt = db.prepare(\"SELECT COUNT(*) as count FROM resumes\");\n        return stmt.get().count;\n    },\n    countByStatus (status) {\n        const db = getDb();\n        const stmt = db.prepare(\"SELECT COUNT(*) as count FROM resumes WHERE status = ?\");\n        return stmt.get(status).count;\n    }\n};\nconst userDb = {\n    findByEmail (email) {\n        const db = getDb();\n        const stmt = db.prepare(\"SELECT * FROM users WHERE email = ?\");\n        return stmt.get(email);\n    },\n    findById (id) {\n        const db = getDb();\n        const stmt = db.prepare(\"SELECT * FROM users WHERE id = ?\");\n        return stmt.get(id);\n    },\n    findAll () {\n        const db = getDb();\n        const stmt = db.prepare(\"SELECT * FROM users ORDER BY created_at DESC\");\n        return stmt.all();\n    },\n    count () {\n        const db = getDb();\n        const stmt = db.prepare(\"SELECT COUNT(*) as count FROM users\");\n        return stmt.get().count;\n    },\n    create (user) {\n        const db = getDb();\n        const stmt = db.prepare(`\n      INSERT INTO users (id, name, email, password, role)\n      VALUES (?, ?, ?, ?, ?)\n    `);\n        stmt.run(user.id, user.name, user.email, user.password, user.role || \"user\");\n        return user;\n    }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LEdBQUc7SUFDakI7SUFFQXBCO1FBQ0UsTUFBTVYsS0FBS0M7UUFDWCxNQUFNaUIsT0FBT2xCLEdBQUdRLE9BQU8sQ0FBQztRQUN4QixPQUFPLEtBQU1DLEdBQUcsR0FBeUJDLEtBQUs7SUFDaEQ7SUFFQU0sUUFBT0gsSUFBa0Y7UUFDdkYsTUFBTWIsS0FBS0M7UUFDWCxNQUFNaUIsT0FBT2xCLEdBQUdRLE9BQU8sQ0FBQyxDQUFDOzs7SUFHekIsQ0FBQztRQUNEVSxLQUFLSixHQUFHLENBQUNELEtBQUtNLEVBQUUsRUFBRU4sS0FBS3lCLElBQUksRUFBRXpCLEtBQUt3QixLQUFLLEVBQUV4QixLQUFLMEIsUUFBUSxFQUFFMUIsS0FBSzJCLElBQUksSUFBSTtRQUNyRSxPQUFPM0I7SUFDVDtBQUNGLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90YWxlbnRncmFwaC8uL3NyYy9saWIvZGIudHM/OWU0ZiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRGF0YWJhc2UgZnJvbSAnYmV0dGVyLXNxbGl0ZTMnXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuaW1wb3J0IHsgZXhpc3RzU3luYywgbWtkaXJTeW5jIH0gZnJvbSAnZnMnXG5cbmNvbnN0IERCX0RJUiA9IHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLCAnZGF0YScpXG5jb25zdCBEQl9QQVRIID0gcGF0aC5qb2luKERCX0RJUiwgJ3RhbGVudGdyYXBoLmRiJylcblxubGV0IGRiOiBEYXRhYmFzZS5EYXRhYmFzZSB8IG51bGwgPSBudWxsXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXREYigpOiBEYXRhYmFzZS5EYXRhYmFzZSB7XG4gIGlmIChkYikgcmV0dXJuIGRiXG5cbiAgaWYgKCFleGlzdHNTeW5jKERCX0RJUikpIHtcbiAgICBta2RpclN5bmMoREJfRElSLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KVxuICB9XG5cbiAgZGIgPSBuZXcgRGF0YWJhc2UoREJfUEFUSClcbiAgZGIucHJhZ21hKCdqb3VybmFsX21vZGUgPSBXQUwnKVxuICBcbiAgaW5pdFNjaGVtYShkYilcbiAgXG4gIHJldHVybiBkYlxufVxuXG5mdW5jdGlvbiBpbml0U2NoZW1hKGRhdGFiYXNlOiBEYXRhYmFzZS5EYXRhYmFzZSkge1xuICBkYXRhYmFzZS5leGVjKGBcbiAgICBDUkVBVEUgVEFCTEUgSUYgTk9UIEVYSVNUUyB1c2VycyAoXG4gICAgICBpZCBURVhUIFBSSU1BUlkgS0VZLFxuICAgICAgbmFtZSBURVhUIE5PVCBOVUxMLFxuICAgICAgZW1haWwgVEVYVCBVTklRVUUgTk9UIE5VTEwsXG4gICAgICBwYXNzd29yZCBURVhULFxuICAgICAgcm9sZSBURVhUIERFRkFVTFQgJ3VzZXInLFxuICAgICAgY3JlYXRlZF9hdCBURVhUIERFRkFVTFQgKGRhdGV0aW1lKCdub3cnKSksXG4gICAgICB1cGRhdGVkX2F0IFRFWFQgREVGQVVMVCAoZGF0ZXRpbWUoJ25vdycpKVxuICAgICk7XG5cbiAgICBDUkVBVEUgVEFCTEUgSUYgTk9UIEVYSVNUUyByZXN1bWVzIChcbiAgICAgIGlkIFRFWFQgUFJJTUFSWSBLRVksXG4gICAgICB1c2VyX2lkIFRFWFQgTk9UIE5VTEwsXG4gICAgICB0YWxlbnRfZGF0YSBURVhUIE5PVCBOVUxMLFxuICAgICAgc3RhdHVzIFRFWFQgREVGQVVMVCAncGVuZGluZycsXG4gICAgICBjcmVhdGVkX2F0IFRFWFQgREVGQVVMVCAoZGF0ZXRpbWUoJ25vdycpKSxcbiAgICAgIHVwZGF0ZWRfYXQgVEVYVCBERUZBVUxUIChkYXRldGltZSgnbm93JykpLFxuICAgICAgRk9SRUlHTiBLRVkgKHVzZXJfaWQpIFJFRkVSRU5DRVMgdXNlcnMoaWQpXG4gICAgKTtcblxuICAgIENSRUFURSBJTkRFWCBJRiBOT1QgRVhJU1RTIGlkeF9yZXN1bWVzX3VzZXJfaWQgT04gcmVzdW1lcyh1c2VyX2lkKTtcbiAgICBDUkVBVEUgSU5ERVggSUYgTk9UIEVYSVNUUyBpZHhfcmVzdW1lc19zdGF0dXMgT04gcmVzdW1lcyhzdGF0dXMpO1xuICAgIENSRUFURSBJTkRFWCBJRiBOT1QgRVhJU1RTIGlkeF91c2Vyc19lbWFpbCBPTiB1c2VycyhlbWFpbCk7XG4gIGApXG5cbiAgY29uc3QgZXhpc3RpbmdVc2VycyA9IGRhdGFiYXNlLnByZXBhcmUoJ1NFTEVDVCBDT1VOVCgqKSBhcyBjb3VudCBGUk9NIHVzZXJzJykuZ2V0KCkgYXMgeyBjb3VudDogbnVtYmVyIH1cbiAgaWYgKGV4aXN0aW5nVXNlcnMuY291bnQgPT09IDApIHtcbiAgICBjb25zdCBpbnNlcnRVc2VyID0gZGF0YWJhc2UucHJlcGFyZShgXG4gICAgICBJTlNFUlQgSU5UTyB1c2VycyAoaWQsIG5hbWUsIGVtYWlsLCBwYXNzd29yZCwgcm9sZSkgVkFMVUVTICg/LCA/LCA/LCA/LCA/KVxuICAgIGApXG4gICAgXG4gICAgY29uc3QgdGVzdFVzZXJzID0gW1xuICAgICAgWyd0ZXN0LXVzZXItMDAxJywgJ+W8oOS8nycsICd0ZXN0QHRhbGVudGdyYXBoLmNvbScsICd0ZXN0MTIzJywgJ3VzZXInXSxcbiAgICAgIFsnYWRtaW4tdXNlci0wMDEnLCAn566h55CG5ZGYJywgJ2FkbWluQHRhbGVudGdyYXBoLmNvbScsICdhZG1pbjEyMycsICdhZG1pbiddLFxuICAgICAgWyd0ZXN0LXVzZXItMDAyJywgJ+adjuaYjicsICd1c2VyMDFAdGFsZW50Z3JhcGguY29tJywgJzEyMzQ1NicsICd1c2VyJ10sXG4gICAgICBbJ3Rlc3QtdXNlci0wMDMnLCAn546L6IqzJywgJ3VzZXIwMkB0YWxlbnRncmFwaC5jb20nLCAnMTIzNDU2JywgJ3VzZXInXSxcbiAgICAgIFsndGVzdC11c2VyLTAwNCcsICfliJjmtIsnLCAndXNlcjAzQHRhbGVudGdyYXBoLmNvbScsICcxMjM0NTYnLCAndXNlciddLFxuICAgICAgWyd0ZXN0LXVzZXItMDA1JywgJ+mZiOmdmScsICd1c2VyMDRAdGFsZW50Z3JhcGguY29tJywgJzEyMzQ1NicsICd1c2VyJ10sXG4gICAgICBbJ3Rlc3QtdXNlci0wMDYnLCAn5p2o5biGJywgJ3VzZXIwNUB0YWxlbnRncmFwaC5jb20nLCAnMTIzNDU2JywgJ3VzZXInXSxcbiAgICAgIFsndGVzdC11c2VyLTAwNycsICfotbXno4onLCAndXNlcjA2QHRhbGVudGdyYXBoLmNvbScsICcxMjM0NTYnLCAndXNlciddLFxuICAgICAgWyd0ZXN0LXVzZXItMDA4JywgJ+WRqOWptycsICd1c2VyMDdAdGFsZW50Z3JhcGguY29tJywgJzEyMzQ1NicsICd1c2VyJ10sXG4gICAgICBbJ3Rlc3QtdXNlci0wMDknLCAn5ZC05by6JywgJ3VzZXIwOEB0YWxlbnRncmFwaC5jb20nLCAnMTIzNDU2JywgJ3VzZXInXSxcbiAgICAgIFsndGVzdC11c2VyLTAxMCcsICfpg5HnkLMnLCAndXNlcjA5QHRhbGVudGdyYXBoLmNvbScsICcxMjM0NTYnLCAndXNlciddLFxuICAgICAgWyd0ZXN0LXVzZXItMDExJywgJ+Wtmea1qScsICd1c2VyMTBAdGFsZW50Z3JhcGguY29tJywgJzEyMzQ1NicsICd1c2VyJ10sXG4gICAgXVxuXG4gICAgZm9yIChjb25zdCB1c2VyIG9mIHRlc3RVc2Vycykge1xuICAgICAgaW5zZXJ0VXNlci5ydW4oLi4udXNlcilcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBSZXN1bWUge1xuICBpZDogc3RyaW5nXG4gIHVzZXJfaWQ6IHN0cmluZ1xuICB0YWxlbnRfZGF0YTogc3RyaW5nXG4gIHN0YXR1czogc3RyaW5nXG4gIGNyZWF0ZWRfYXQ6IHN0cmluZ1xuICB1cGRhdGVkX2F0OiBzdHJpbmdcbn1cblxuZXhwb3J0IGludGVyZmFjZSBVc2VyIHtcbiAgaWQ6IHN0cmluZ1xuICBuYW1lOiBzdHJpbmdcbiAgZW1haWw6IHN0cmluZ1xuICBwYXNzd29yZDogc3RyaW5nIHwgbnVsbFxuICByb2xlOiBzdHJpbmdcbiAgY3JlYXRlZF9hdDogc3RyaW5nXG4gIHVwZGF0ZWRfYXQ6IHN0cmluZ1xufVxuXG5leHBvcnQgY29uc3QgcmVzdW1lRGIgPSB7XG4gIGNyZWF0ZShyZXN1bWU6IHsgaWQ6IHN0cmluZzsgdXNlcl9pZDogc3RyaW5nOyB0YWxlbnRfZGF0YTogc3RyaW5nOyBzdGF0dXM/OiBzdHJpbmcgfSkge1xuICAgIGNvbnN0IGRiID0gZ2V0RGIoKVxuICAgIGNvbnN0IHN0bXQgPSBkYi5wcmVwYXJlKGBcbiAgICAgIElOU0VSVCBJTlRPIHJlc3VtZXMgKGlkLCB1c2VyX2lkLCB0YWxlbnRfZGF0YSwgc3RhdHVzKVxuICAgICAgVkFMVUVTICg/LCA/LCA/LCA/KVxuICAgIGApXG4gICAgc3RtdC5ydW4ocmVzdW1lLmlkLCByZXN1bWUudXNlcl9pZCwgcmVzdW1lLnRhbGVudF9kYXRhLCByZXN1bWUuc3RhdHVzIHx8ICdwZW5kaW5nJylcbiAgICByZXR1cm4gcmVzdW1lXG4gIH0sXG5cbiAgZmluZEJ5SWQoaWQ6IHN0cmluZykge1xuICAgIGNvbnN0IGRiID0gZ2V0RGIoKVxuICAgIGNvbnN0IHN0bXQgPSBkYi5wcmVwYXJlKCdTRUxFQ1QgKiBGUk9NIHJlc3VtZXMgV0hFUkUgaWQgPSA/JylcbiAgICBjb25zdCByb3cgPSBzdG10LmdldChpZCkgYXMgUmVzdW1lIHwgdW5kZWZpbmVkXG4gICAgaWYgKHJvdykge1xuICAgICAgcmV0dXJuIHsgLi4ucm93LCB0YWxlbnRfZGF0YTogSlNPTi5wYXJzZShyb3cudGFsZW50X2RhdGEpIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGxcbiAgfSxcblxuICBmaW5kQnlVc2VySWQodXNlcklkOiBzdHJpbmcpIHtcbiAgICBjb25zdCBkYiA9IGdldERiKClcbiAgICBjb25zdCBzdG10ID0gZGIucHJlcGFyZSgnU0VMRUNUICogRlJPTSByZXN1bWVzIFdIRVJFIHVzZXJfaWQgPSA/IE9SREVSIEJZIGNyZWF0ZWRfYXQgREVTQycpXG4gICAgY29uc3Qgcm93cyA9IHN0bXQuYWxsKHVzZXJJZCkgYXMgUmVzdW1lW11cbiAgICByZXR1cm4gcm93cy5tYXAocm93ID0+ICh7IC4uLnJvdywgdGFsZW50X2RhdGE6IEpTT04ucGFyc2Uocm93LnRhbGVudF9kYXRhKSB9KSlcbiAgfSxcblxuICBmaW5kQWxsKCkge1xuICAgIGNvbnN0IGRiID0gZ2V0RGIoKVxuICAgIGNvbnN0IHN0bXQgPSBkYi5wcmVwYXJlKCdTRUxFQ1QgKiBGUk9NIHJlc3VtZXMgT1JERVIgQlkgY3JlYXRlZF9hdCBERVNDJylcbiAgICBjb25zdCByb3dzID0gc3RtdC5hbGwoKSBhcyBSZXN1bWVbXVxuICAgIHJldHVybiByb3dzLm1hcChyb3cgPT4gKHsgLi4ucm93LCB0YWxlbnRfZGF0YTogSlNPTi5wYXJzZShyb3cudGFsZW50X2RhdGEpIH0pKVxuICB9LFxuXG4gIHVwZGF0ZVN0YXR1cyhpZDogc3RyaW5nLCBzdGF0dXM6IHN0cmluZykge1xuICAgIGNvbnN0IGRiID0gZ2V0RGIoKVxuICAgIGNvbnN0IHN0bXQgPSBkYi5wcmVwYXJlKCdVUERBVEUgcmVzdW1lcyBTRVQgc3RhdHVzID0gPywgdXBkYXRlZF9hdCA9IGRhdGV0aW1lKFwibm93XCIpIFdIRVJFIGlkID0gPycpXG4gICAgc3RtdC5ydW4oc3RhdHVzLCBpZClcbiAgfSxcblxuICBjb3VudCgpIHtcbiAgICBjb25zdCBkYiA9IGdldERiKClcbiAgICBjb25zdCBzdG10ID0gZGIucHJlcGFyZSgnU0VMRUNUIENPVU5UKCopIGFzIGNvdW50IEZST00gcmVzdW1lcycpXG4gICAgcmV0dXJuIChzdG10LmdldCgpIGFzIHsgY291bnQ6IG51bWJlciB9KS5jb3VudFxuICB9LFxuXG4gIGNvdW50QnlTdGF0dXMoc3RhdHVzOiBzdHJpbmcpIHtcbiAgICBjb25zdCBkYiA9IGdldERiKClcbiAgICBjb25zdCBzdG10ID0gZGIucHJlcGFyZSgnU0VMRUNUIENPVU5UKCopIGFzIGNvdW50IEZST00gcmVzdW1lcyBXSEVSRSBzdGF0dXMgPSA/JylcbiAgICByZXR1cm4gKHN0bXQuZ2V0KHN0YXR1cykgYXMgeyBjb3VudDogbnVtYmVyIH0pLmNvdW50XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IHVzZXJEYiA9IHtcbiAgZmluZEJ5RW1haWwoZW1haWw6IHN0cmluZykge1xuICAgIGNvbnN0IGRiID0gZ2V0RGIoKVxuICAgIGNvbnN0IHN0bXQgPSBkYi5wcmVwYXJlKCdTRUxFQ1QgKiBGUk9NIHVzZXJzIFdIRVJFIGVtYWlsID0gPycpXG4gICAgcmV0dXJuIHN0bXQuZ2V0KGVtYWlsKSBhcyBVc2VyIHwgdW5kZWZpbmVkXG4gIH0sXG5cbiAgZmluZEJ5SWQoaWQ6IHN0cmluZykge1xuICAgIGNvbnN0IGRiID0gZ2V0RGIoKVxuICAgIGNvbnN0IHN0bXQgPSBkYi5wcmVwYXJlKCdTRUxFQ1QgKiBGUk9NIHVzZXJzIFdIRVJFIGlkID0gPycpXG4gICAgcmV0dXJuIHN0bXQuZ2V0KGlkKSBhcyBVc2VyIHwgdW5kZWZpbmVkXG4gIH0sXG5cbiAgZmluZEFsbCgpIHtcbiAgICBjb25zdCBkYiA9IGdldERiKClcbiAgICBjb25zdCBzdG10ID0gZGIucHJlcGFyZSgnU0VMRUNUICogRlJPTSB1c2VycyBPUkRFUiBCWSBjcmVhdGVkX2F0IERFU0MnKVxuICAgIHJldHVybiBzdG10LmFsbCgpIGFzIFVzZXJbXVxuICB9LFxuXG4gIGNvdW50KCkge1xuICAgIGNvbnN0IGRiID0gZ2V0RGIoKVxuICAgIGNvbnN0IHN0bXQgPSBkYi5wcmVwYXJlKCdTRUxFQ1QgQ09VTlQoKikgYXMgY291bnQgRlJPTSB1c2VycycpXG4gICAgcmV0dXJuIChzdG10LmdldCgpIGFzIHsgY291bnQ6IG51bWJlciB9KS5jb3VudFxuICB9LFxuXG4gIGNyZWF0ZSh1c2VyOiB7IGlkOiBzdHJpbmc7IG5hbWU6IHN0cmluZzsgZW1haWw6IHN0cmluZzsgcGFzc3dvcmQ6IHN0cmluZzsgcm9sZT86IHN0cmluZyB9KSB7XG4gICAgY29uc3QgZGIgPSBnZXREYigpXG4gICAgY29uc3Qgc3RtdCA9IGRiLnByZXBhcmUoYFxuICAgICAgSU5TRVJUIElOVE8gdXNlcnMgKGlkLCBuYW1lLCBlbWFpbCwgcGFzc3dvcmQsIHJvbGUpXG4gICAgICBWQUxVRVMgKD8sID8sID8sID8sID8pXG4gICAgYClcbiAgICBzdG10LnJ1bih1c2VyLmlkLCB1c2VyLm5hbWUsIHVzZXIuZW1haWwsIHVzZXIucGFzc3dvcmQsIHVzZXIucm9sZSB8fCAndXNlcicpXG4gICAgcmV0dXJuIHVzZXJcbiAgfVxufVxuIl0sIm5hbWVzIjpbIkRhdGFiYXNlIiwicGF0aCIsImV4aXN0c1N5bmMiLCJta2RpclN5bmMiLCJEQl9ESVIiLCJqb2luIiwicHJvY2VzcyIsImN3ZCIsIkRCX1BBVEgiLCJkYiIsImdldERiIiwicmVjdXJzaXZlIiwicHJhZ21hIiwiaW5pdFNjaGVtYSIsImRhdGFiYXNlIiwiZXhlYyIsImV4aXN0aW5nVXNlcnMiLCJwcmVwYXJlIiwiZ2V0IiwiY291bnQiLCJpbnNlcnRVc2VyIiwidGVzdFVzZXJzIiwidXNlciIsInJ1biIsInJlc3VtZURiIiwiY3JlYXRlIiwicmVzdW1lIiwic3RtdCIsImlkIiwidXNlcl9pZCIsInRhbGVudF9kYXRhIiwic3RhdHVzIiwiZmluZEJ5SWQiLCJyb3ciLCJKU09OIiwicGFyc2UiLCJmaW5kQnlVc2VySWQiLCJ1c2VySWQiLCJyb3dzIiwiYWxsIiwibWFwIiwiZmluZEFsbCIsInVwZGF0ZVN0YXR1cyIsImNvdW50QnlTdGF0dXMiLCJ1c2VyRGIiLCJmaW5kQnlFbWFpbCIsImVtYWlsIiwibmFtZSIsInBhc3N3b3JkIiwicm9sZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./src/lib/db.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/uuid","vendor-chunks/@panva","vendor-chunks/openid-client","vendor-chunks/oauth","vendor-chunks/yallist","vendor-chunks/preact-render-to-string","vendor-chunks/preact","vendor-chunks/oidc-token-hash","vendor-chunks/lru-cache"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=C%3A%5CUsers%5CAprilWu%5CDocuments%5Ctrae_projects%5Cnewboss%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CAprilWu%5CDocuments%5Ctrae_projects%5Cnewboss&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();