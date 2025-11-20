module.exports = [
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[project]/node_modules/@clerk/shared/dist/runtime/pathMatcher-B0k8rNqO.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createPathMatcher",
    ()=>createPathMatcher
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$shared$2f$dist$2f$runtime$2f$pathToRegexp$2d$Bu45OrlU$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@clerk/shared/dist/runtime/pathToRegexp-Bu45OrlU.mjs [app-rsc] (ecmascript)");
;
//#region src/pathMatcher.ts
const precomputePathRegex = (patterns)=>{
    return patterns.map((pattern)=>pattern instanceof RegExp ? pattern : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$shared$2f$dist$2f$runtime$2f$pathToRegexp$2d$Bu45OrlU$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pathToRegexp"])(pattern));
};
/**
* Creates a function that matches paths against a set of patterns.
*
* @param patterns - A string, RegExp, or array of patterns to match against
* @returns A function that takes a pathname and returns true if it matches any of the patterns
*/ const createPathMatcher = (patterns)=>{
    const matchers = precomputePathRegex([
        patterns || ""
    ].flat().filter(Boolean));
    return (pathname)=>matchers.some((matcher)=>matcher.test(pathname));
};
;
 //# sourceMappingURL=pathMatcher-B0k8rNqO.mjs.map
}),
"[project]/node_modules/@clerk/shared/dist/runtime/pathMatcher.mjs [app-rsc] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$shared$2f$dist$2f$runtime$2f$pathToRegexp$2d$Bu45OrlU$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@clerk/shared/dist/runtime/pathToRegexp-Bu45OrlU.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$shared$2f$dist$2f$runtime$2f$pathMatcher$2d$B0k8rNqO$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@clerk/shared/dist/runtime/pathMatcher-B0k8rNqO.mjs [app-rsc] (ecmascript)");
;
;
;
}),
"[project]/node_modules/@clerk/nextjs/dist/esm/server/routeMatcher.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createRouteMatcher",
    ()=>createRouteMatcher
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$shared$2f$dist$2f$runtime$2f$pathMatcher$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@clerk/shared/dist/runtime/pathMatcher.mjs [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$shared$2f$dist$2f$runtime$2f$pathMatcher$2d$B0k8rNqO$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@clerk/shared/dist/runtime/pathMatcher-B0k8rNqO.mjs [app-rsc] (ecmascript)");
;
;
const createRouteMatcher = (routes)=>{
    if (typeof routes === "function") {
        return (req)=>routes(req);
    }
    const matcher = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$shared$2f$dist$2f$runtime$2f$pathMatcher$2d$B0k8rNqO$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createPathMatcher"])(routes);
    return (req)=>matcher(req.nextUrl.pathname);
};
;
 //# sourceMappingURL=routeMatcher.js.map
}),
"[project]/node_modules/@clerk/nextjs/dist/esm/server/middleware-storage.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clerkMiddlewareRequestDataStorage",
    ()=>clerkMiddlewareRequestDataStorage,
    "clerkMiddlewareRequestDataStore",
    ()=>clerkMiddlewareRequestDataStore
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$async_hooks__$5b$external$5d$__$28$node$3a$async_hooks$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:async_hooks [external] (node:async_hooks, cjs)");
;
;
const clerkMiddlewareRequestDataStore = /* @__PURE__ */ new Map();
const clerkMiddlewareRequestDataStorage = new __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$async_hooks__$5b$external$5d$__$28$node$3a$async_hooks$2c$__cjs$29$__["AsyncLocalStorage"]();
;
 //# sourceMappingURL=middleware-storage.js.map
}),
"[project]/node_modules/@clerk/nextjs/dist/esm/server/clerkClient.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clerkClient",
    ()=>clerkClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$backend$2f$dist$2f$internal$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@clerk/backend/dist/internal.mjs [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$backend$2f$dist$2f$chunk$2d$AIEGYSDW$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@clerk/backend/dist/chunk-AIEGYSDW.mjs [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$app$2d$router$2f$server$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@clerk/nextjs/dist/esm/app-router/server/utils.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$server$2f$createClerkClient$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@clerk/nextjs/dist/esm/server/createClerkClient.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$server$2f$headers$2d$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@clerk/nextjs/dist/esm/server/headers-utils.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$server$2f$middleware$2d$storage$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@clerk/nextjs/dist/esm/server/middleware-storage.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$server$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@clerk/nextjs/dist/esm/server/utils.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
const clerkClient = async ()=>{
    var _a, _b;
    let requestData;
    try {
        const request = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$app$2d$router$2f$server$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["buildRequestLike"])();
        const encryptedRequestData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$server$2f$headers$2d$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getHeader"])(request, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$backend$2f$dist$2f$chunk$2d$AIEGYSDW$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["constants"].Headers.ClerkRequestData);
        requestData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$server$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["decryptClerkRequestData"])(encryptedRequestData);
    } catch (err) {
        if (err && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$app$2d$router$2f$server$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isPrerenderingBailout"])(err)) {
            throw err;
        }
    }
    const options = (_b = (_a = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$server$2f$middleware$2d$storage$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["clerkMiddlewareRequestDataStorage"].getStore()) == null ? void 0 : _a.get("requestData")) != null ? _b : requestData;
    if ((options == null ? void 0 : options.secretKey) || (options == null ? void 0 : options.publishableKey)) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$server$2f$createClerkClient$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClerkClientWithOptions"])(options);
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$server$2f$createClerkClient$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClerkClientWithOptions"])({});
};
;
 //# sourceMappingURL=clerkClient.js.map
}),
"[project]/node_modules/@clerk/nextjs/dist/esm/app-router/server/currentUser.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "currentUser",
    ()=>currentUser
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$server$2f$clerkClient$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@clerk/nextjs/dist/esm/server/clerkClient.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$app$2d$router$2f$server$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@clerk/nextjs/dist/esm/app-router/server/auth.js [app-rsc] (ecmascript)");
;
;
;
async function currentUser(opts) {
    __turbopack_context__.r("[project]/node_modules/next/dist/compiled/server-only/empty.js [app-rsc] (ecmascript)");
    const { userId } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$app$2d$router$2f$server$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"])({
        treatPendingAsSignedOut: opts == null ? void 0 : opts.treatPendingAsSignedOut
    });
    if (!userId) {
        return null;
    }
    return (await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$server$2f$clerkClient$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["clerkClient"])()).users.getUser(userId);
}
;
 //# sourceMappingURL=currentUser.js.map
}),
"[project]/node_modules/@clerk/nextjs/dist/esm/utils/response.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isRedirect",
    ()=>isRedirect,
    "setHeader",
    ()=>setHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@clerk/nextjs/dist/esm/constants.js [app-rsc] (ecmascript)");
;
;
const isRedirect = (res)=>{
    return res.headers.get(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["constants"].Headers.NextRedirect);
};
const setHeader = (res, name, val)=>{
    res.headers.set(name, val);
    return res;
};
;
 //# sourceMappingURL=response.js.map
}),
"[project]/node_modules/@clerk/shared/dist/runtime/devBrowser-Dm-lbUnV.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

//#region src/devBrowser.ts
__turbopack_context__.s([
    "DEV_BROWSER_JWT_HEADER",
    ()=>DEV_BROWSER_JWT_HEADER,
    "DEV_BROWSER_JWT_KEY",
    ()=>DEV_BROWSER_JWT_KEY,
    "extractDevBrowserJWTFromURL",
    ()=>extractDevBrowserJWTFromURL,
    "setDevBrowserJWTInURL",
    ()=>setDevBrowserJWTInURL
]);
const DEV_BROWSER_JWT_KEY = "__clerk_db_jwt";
const DEV_BROWSER_JWT_HEADER = "Clerk-Db-Jwt";
function setDevBrowserJWTInURL(url, jwt) {
    const resultURL = new URL(url);
    const jwtFromSearch = resultURL.searchParams.get(DEV_BROWSER_JWT_KEY);
    resultURL.searchParams.delete(DEV_BROWSER_JWT_KEY);
    const jwtToSet = jwtFromSearch || jwt;
    if (jwtToSet) resultURL.searchParams.set(DEV_BROWSER_JWT_KEY, jwtToSet);
    return resultURL;
}
/**
* Gets the __clerk_db_jwt JWT from either the hash or the search
* Side effect:
* Removes __clerk_db_jwt JWT from the URL (hash and searchParams) and updates the browser history
*/ function extractDevBrowserJWTFromURL(url) {
    const jwt = readDevBrowserJwtFromSearchParams(url);
    if (removeDevBrowserJwt(url).href !== url.href && typeof globalThis.history !== "undefined") globalThis.history.replaceState(null, "", removeDevBrowserJwt(url));
    return jwt;
}
const readDevBrowserJwtFromSearchParams = (url)=>{
    return url.searchParams.get(DEV_BROWSER_JWT_KEY) || "";
};
const removeDevBrowserJwt = (url)=>{
    return removeDevBrowserJwtFromURLSearchParams(removeLegacyDevBrowserJwt(url));
};
const removeDevBrowserJwtFromURLSearchParams = (_url)=>{
    const url = new URL(_url);
    url.searchParams.delete(DEV_BROWSER_JWT_KEY);
    return url;
};
/**
* Removes the __clerk_db_jwt JWT from the URL hash, as well as
* the legacy __dev_session JWT from the URL searchParams
* We no longer need to use this value, however, we should remove it from the URL
* Existing v4 apps will write the JWT to the hash and the search params in order to ensure
* backwards compatibility with older v4 apps.
* The only use case where this is needed now is when a user upgrades to clerk@5 locally
* without changing the component's version on their dashboard.
* In this scenario, the AP@4 -> localhost@5 redirect will still have the JWT in the hash,
* in which case we need to remove it.
*/ const removeLegacyDevBrowserJwt = (_url)=>{
    const DEV_BROWSER_JWT_MARKER_REGEXP = /__clerk_db_jwt\[(.*)\]/;
    const DEV_BROWSER_JWT_LEGACY_KEY = "__dev_session";
    const url = new URL(_url);
    url.searchParams.delete(DEV_BROWSER_JWT_LEGACY_KEY);
    url.hash = decodeURI(url.hash).replace(DEV_BROWSER_JWT_MARKER_REGEXP, "");
    if (url.href.endsWith("#")) url.hash = "";
    return url;
};
;
 //# sourceMappingURL=devBrowser-Dm-lbUnV.mjs.map
}),
"[project]/node_modules/@clerk/shared/dist/runtime/devBrowser.mjs [app-rsc] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$shared$2f$dist$2f$runtime$2f$devBrowser$2d$Dm$2d$lbUnV$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@clerk/shared/dist/runtime/devBrowser-Dm-lbUnV.mjs [app-rsc] (ecmascript)");
;
;
}),
"[project]/node_modules/@clerk/nextjs/dist/esm/utils/serverRedirectWithAuth.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "serverRedirectWithAuth",
    ()=>serverRedirectWithAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$backend$2f$dist$2f$internal$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@clerk/backend/dist/internal.mjs [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$backend$2f$dist$2f$chunk$2d$AIEGYSDW$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@clerk/backend/dist/chunk-AIEGYSDW.mjs [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$shared$2f$dist$2f$runtime$2f$devBrowser$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@clerk/shared/dist/runtime/devBrowser.mjs [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$shared$2f$dist$2f$runtime$2f$devBrowser$2d$Dm$2d$lbUnV$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@clerk/shared/dist/runtime/devBrowser-Dm-lbUnV.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$shared$2f$dist$2f$runtime$2f$keys$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@clerk/shared/dist/runtime/keys.mjs [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$shared$2f$dist$2f$runtime$2f$keys$2d$YNv6yjKk$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@clerk/shared/dist/runtime/keys-YNv6yjKk.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-rsc] (ecmascript)");
;
;
;
;
;
const serverRedirectWithAuth = (clerkRequest, res, opts)=>{
    const location = res.headers.get("location");
    const shouldAppendDevBrowser = res.headers.get(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$backend$2f$dist$2f$chunk$2d$AIEGYSDW$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["constants"].Headers.ClerkRedirectTo) === "true";
    if (shouldAppendDevBrowser && !!location && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$shared$2f$dist$2f$runtime$2f$keys$2d$YNv6yjKk$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isDevelopmentFromSecretKey"])(opts.secretKey) && clerkRequest.clerkUrl.isCrossOrigin(location)) {
        const dbJwt = clerkRequest.cookies.get(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$shared$2f$dist$2f$runtime$2f$devBrowser$2d$Dm$2d$lbUnV$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DEV_BROWSER_JWT_KEY"]) || "";
        const url = new URL(location);
        const urlWithDevBrowser = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$shared$2f$dist$2f$runtime$2f$devBrowser$2d$Dm$2d$lbUnV$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["setDevBrowserJWTInURL"])(url, dbJwt);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NextResponse"].redirect(urlWithDevBrowser.href, res);
    }
    return res;
};
;
 //# sourceMappingURL=serverRedirectWithAuth.js.map
}),
"[project]/node_modules/@clerk/nextjs/dist/esm/server/content-security-policy.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createContentSecurityPolicyHeaders",
    ()=>createContentSecurityPolicyHeaders,
    "generateNonce",
    ()=>generateNonce
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$backend$2f$dist$2f$internal$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@clerk/backend/dist/internal.mjs [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$backend$2f$dist$2f$chunk$2d$AIEGYSDW$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@clerk/backend/dist/chunk-AIEGYSDW.mjs [app-rsc] (ecmascript) <locals>");
;
;
class ContentSecurityPolicyDirectiveManager {
    /**
   * Creates a new ContentSecurityPolicyDirectiveSet with default values
   * @returns A new ContentSecurityPolicyDirectiveSet with default values
   */ static createDefaultDirectives() {
        return Object.entries(this.DEFAULT_DIRECTIVES).reduce((acc, [key, values])=>{
            acc[key] = new Set(values);
            return acc;
        }, {});
    }
    /**
   * Checks if a value is a special keyword that requires quoting
   * @param value - The value to check
   * @returns True if the value is a special keyword
   */ static isKeyword(value) {
        return this.KEYWORDS.has(value.replace(/^'|'$/g, ""));
    }
    /**
   * Formats a value according to CSP rules, adding quotes for special keywords
   * @param value - The value to format
   * @returns The formatted value
   */ static formatValue(value) {
        const unquoted = value.replace(/^'|'$/g, "");
        return this.isKeyword(unquoted) ? `'${unquoted}'` : value;
    }
    /**
   * Handles directive values, ensuring proper formatting and special case handling
   * @param values - Array of values to process
   * @returns Set of formatted values
   */ static handleDirectiveValues(values) {
        const result = /* @__PURE__ */ new Set();
        if (values.includes("'none'") || values.includes("none")) {
            result.add("'none'");
            return result;
        }
        values.forEach((v)=>result.add(this.formatValue(v)));
        return result;
    }
}
/** Set of special keywords that require quoting in CSP directives */ ContentSecurityPolicyDirectiveManager.KEYWORDS = /* @__PURE__ */ new Set([
    "none",
    "self",
    "strict-dynamic",
    "unsafe-eval",
    "unsafe-hashes",
    "unsafe-inline"
]);
/** Default CSP directives and their values */ ContentSecurityPolicyDirectiveManager.DEFAULT_DIRECTIVES = {
    "connect-src": [
        "self",
        "https://clerk-telemetry.com",
        "https://*.clerk-telemetry.com",
        "https://api.stripe.com",
        "https://maps.googleapis.com"
    ],
    "default-src": [
        "self"
    ],
    "form-action": [
        "self"
    ],
    "frame-src": [
        "self",
        "https://challenges.cloudflare.com",
        "https://*.js.stripe.com",
        "https://js.stripe.com",
        "https://hooks.stripe.com"
    ],
    "img-src": [
        "self",
        "https://img.clerk.com"
    ],
    "script-src": [
        "self",
        ...("TURBOPACK compile-time truthy", 1) ? [
            "unsafe-eval"
        ] : "TURBOPACK unreachable",
        "unsafe-inline",
        "https:",
        "http:",
        "https://*.js.stripe.com",
        "https://js.stripe.com",
        "https://maps.googleapis.com"
    ],
    "style-src": [
        "self",
        "unsafe-inline"
    ],
    "worker-src": [
        "self",
        "blob:"
    ]
};
function handleExistingDirective(mergedCSP, key, values) {
    if (values.includes("'none'") || values.includes("none")) {
        mergedCSP[key] = /* @__PURE__ */ new Set([
            "'none'"
        ]);
        return;
    }
    const deduplicatedSet = /* @__PURE__ */ new Set();
    mergedCSP[key].forEach((value)=>{
        deduplicatedSet.add(ContentSecurityPolicyDirectiveManager.formatValue(value));
    });
    values.forEach((value)=>{
        deduplicatedSet.add(ContentSecurityPolicyDirectiveManager.formatValue(value));
    });
    mergedCSP[key] = deduplicatedSet;
}
function handleCustomDirective(customDirectives, key, values) {
    if (values.includes("'none'") || values.includes("none")) {
        customDirectives.set(key, /* @__PURE__ */ new Set([
            "'none'"
        ]));
        return;
    }
    const formattedValues = /* @__PURE__ */ new Set();
    values.forEach((value)=>{
        const formattedValue = ContentSecurityPolicyDirectiveManager.formatValue(value);
        formattedValues.add(formattedValue);
    });
    customDirectives.set(key, formattedValues);
}
function formatCSPHeader(mergedCSP) {
    return Object.entries(mergedCSP).sort(([a], [b])=>a.localeCompare(b)).map(([key, values])=>{
        const valueObjs = Array.from(values).map((v)=>({
                raw: v,
                formatted: ContentSecurityPolicyDirectiveManager.formatValue(v)
            }));
        return `${key} ${valueObjs.map((item)=>item.formatted).join(" ")}`;
    }).join("; ");
}
function generateNonce() {
    const randomBytes = new Uint8Array(16);
    crypto.getRandomValues(randomBytes);
    const binaryString = Array.from(randomBytes, (byte)=>String.fromCharCode(byte)).join("");
    return btoa(binaryString);
}
function buildContentSecurityPolicyDirectives(strict, host, customDirectives, nonce) {
    const directives = Object.entries(ContentSecurityPolicyDirectiveManager.DEFAULT_DIRECTIVES).reduce((acc, [key, values])=>{
        acc[key] = new Set(values);
        return acc;
    }, {});
    directives["connect-src"].add(host);
    if (strict) {
        directives["script-src"].delete("http:");
        directives["script-src"].delete("https:");
        directives["script-src"].add("'strict-dynamic'");
        if (nonce) {
            directives["script-src"].add(`'nonce-${nonce}'`);
        }
    }
    if (customDirectives) {
        const customDirectivesMap = /* @__PURE__ */ new Map();
        Object.entries(customDirectives).forEach(([key, values])=>{
            const valuesArray = Array.isArray(values) ? values : [
                values
            ];
            if (ContentSecurityPolicyDirectiveManager.DEFAULT_DIRECTIVES[key]) {
                handleExistingDirective(directives, key, valuesArray);
            } else {
                handleCustomDirective(customDirectivesMap, key, valuesArray);
            }
        });
        customDirectivesMap.forEach((values, key)=>{
            directives[key] = values;
        });
    }
    return formatCSPHeader(directives);
}
function createContentSecurityPolicyHeaders(host, options) {
    var _a;
    const headers = [];
    const nonce = options.strict ? generateNonce() : void 0;
    let cspHeader = buildContentSecurityPolicyDirectives((_a = options.strict) != null ? _a : false, host, options.directives, nonce);
    if (options.reportTo) {
        cspHeader += "; report-to csp-endpoint";
        headers.push([
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$backend$2f$dist$2f$chunk$2d$AIEGYSDW$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["constants"].Headers.ReportingEndpoints,
            `csp-endpoint="${options.reportTo}"`
        ]);
    }
    if (options.reportOnly) {
        headers.push([
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$backend$2f$dist$2f$chunk$2d$AIEGYSDW$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["constants"].Headers.ContentSecurityPolicyReportOnly,
            cspHeader
        ]);
    } else {
        headers.push([
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$backend$2f$dist$2f$chunk$2d$AIEGYSDW$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["constants"].Headers.ContentSecurityPolicy,
            cspHeader
        ]);
    }
    if (nonce) {
        headers.push([
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$backend$2f$dist$2f$chunk$2d$AIEGYSDW$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["constants"].Headers.Nonce,
            nonce
        ]);
    }
    return {
        headers
    };
}
;
 //# sourceMappingURL=content-security-policy.js.map
}),
"[project]/node_modules/@clerk/nextjs/dist/esm/server/clerkMiddleware.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clerkMiddleware",
    ()=>clerkMiddleware,
    "createAuthenticateRequestOptions",
    ()=>createAuthenticateRequestOptions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$backend$2f$dist$2f$internal$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@clerk/backend/dist/internal.mjs [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$backend$2f$dist$2f$chunk$2d$AIEGYSDW$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@clerk/backend/dist/chunk-AIEGYSDW.mjs [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$shared$2f$dist$2f$runtime$2f$keys$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@clerk/shared/dist/runtime/keys.mjs [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$shared$2f$dist$2f$runtime$2f$keys$2d$YNv6yjKk$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@clerk/shared/dist/runtime/keys-YNv6yjKk.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$utils$2f$response$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@clerk/nextjs/dist/esm/utils/response.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$utils$2f$serverRedirectWithAuth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@clerk/nextjs/dist/esm/utils/serverRedirectWithAuth.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$utils$2f$debugLogger$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@clerk/nextjs/dist/esm/utils/debugLogger.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$utils$2f$feature$2d$flags$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@clerk/nextjs/dist/esm/utils/feature-flags.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$server$2f$clerkClient$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@clerk/nextjs/dist/esm/server/clerkClient.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$server$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@clerk/nextjs/dist/esm/server/constants.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$server$2f$content$2d$security$2d$policy$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@clerk/nextjs/dist/esm/server/content-security-policy.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$server$2f$errorThrower$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@clerk/nextjs/dist/esm/server/errorThrower.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$server$2f$headers$2d$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@clerk/nextjs/dist/esm/server/headers-utils.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$server$2f$keyless$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@clerk/nextjs/dist/esm/server/keyless.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$server$2f$middleware$2d$storage$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@clerk/nextjs/dist/esm/server/middleware-storage.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$server$2f$nextErrors$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@clerk/nextjs/dist/esm/server/nextErrors.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$server$2f$protect$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@clerk/nextjs/dist/esm/server/protect.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$server$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@clerk/nextjs/dist/esm/server/utils.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
const clerkMiddleware = (...args)=>{
    const [request, event] = parseRequestAndEvent(args);
    const [handler, params] = parseHandlerAndOptions(args);
    const middleware = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$server$2f$middleware$2d$storage$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["clerkMiddlewareRequestDataStorage"].run(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$server$2f$middleware$2d$storage$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["clerkMiddlewareRequestDataStore"], ()=>{
        const baseNextMiddleware = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$utils$2f$debugLogger$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["withLogger"])("clerkMiddleware", (logger)=>async (request2, event2)=>{
                var _a, _b;
                const resolvedParams = typeof params === "function" ? await params(request2) : params;
                const keyless = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$server$2f$keyless$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getKeylessCookieValue"])((name)=>{
                    var _a2;
                    return (_a2 = request2.cookies.get(name)) == null ? void 0 : _a2.value;
                });
                const publishableKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$server$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["assertKey"])(resolvedParams.publishableKey || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$server$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PUBLISHABLE_KEY"] || (keyless == null ? void 0 : keyless.publishableKey), ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$server$2f$errorThrower$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["errorThrower"].throwMissingPublishableKeyError());
                const secretKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$server$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["assertKey"])(resolvedParams.secretKey || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$server$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SECRET_KEY"] || (keyless == null ? void 0 : keyless.secretKey), ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$server$2f$errorThrower$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["errorThrower"].throwMissingSecretKeyError());
                const signInUrl = resolvedParams.signInUrl || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$server$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SIGN_IN_URL"];
                const signUpUrl = resolvedParams.signUpUrl || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$server$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SIGN_UP_URL"];
                const options = {
                    publishableKey,
                    secretKey,
                    signInUrl,
                    signUpUrl,
                    ...resolvedParams
                };
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$server$2f$middleware$2d$storage$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["clerkMiddlewareRequestDataStore"].set("requestData", options);
                const resolvedClerkClient = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$server$2f$clerkClient$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["clerkClient"])();
                if (options.debug) {
                    logger.enable();
                }
                const clerkRequest = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$backend$2f$dist$2f$chunk$2d$AIEGYSDW$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClerkRequest"])(request2);
                logger.debug("options", options);
                logger.debug("url", ()=>clerkRequest.toJSON());
                const authHeader = request2.headers.get(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$backend$2f$dist$2f$chunk$2d$AIEGYSDW$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["constants"].Headers.Authorization);
                if (authHeader && authHeader.startsWith("Basic ")) {
                    logger.debug("Basic Auth detected");
                }
                const cspHeader = request2.headers.get(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$backend$2f$dist$2f$chunk$2d$AIEGYSDW$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["constants"].Headers.ContentSecurityPolicy);
                if (cspHeader) {
                    logger.debug("Content-Security-Policy detected", ()=>({
                            value: cspHeader
                        }));
                }
                const requestState = await resolvedClerkClient.authenticateRequest(clerkRequest, createAuthenticateRequestOptions(clerkRequest, options));
                logger.debug("requestState", ()=>({
                        status: requestState.status,
                        headers: JSON.stringify(Object.fromEntries(requestState.headers)),
                        reason: requestState.reason
                    }));
                const locationHeader = requestState.headers.get(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$backend$2f$dist$2f$chunk$2d$AIEGYSDW$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["constants"].Headers.Location);
                if (locationHeader) {
                    const res = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NextResponse"].redirect(locationHeader);
                    requestState.headers.forEach((value, key)=>{
                        if (key === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$backend$2f$dist$2f$chunk$2d$AIEGYSDW$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["constants"].Headers.Location) {
                            return;
                        }
                        res.headers.append(key, value);
                    });
                    return res;
                } else if (requestState.status === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$backend$2f$dist$2f$chunk$2d$AIEGYSDW$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["AuthStatus"].Handshake) {
                    throw new Error("Clerk: handshake status without redirect");
                }
                const authObject = requestState.toAuth();
                logger.debug("auth", ()=>({
                        auth: authObject,
                        debug: authObject.debug()
                    }));
                const redirectToSignIn = createMiddlewareRedirectToSignIn(clerkRequest);
                const redirectToSignUp = createMiddlewareRedirectToSignUp(clerkRequest);
                const protect = await createMiddlewareProtect(clerkRequest, authObject, redirectToSignIn);
                const authHandler = createMiddlewareAuthHandler(requestState, redirectToSignIn, redirectToSignUp);
                authHandler.protect = protect;
                let handlerResult = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NextResponse"].next();
                try {
                    const userHandlerResult = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$server$2f$middleware$2d$storage$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["clerkMiddlewareRequestDataStorage"].run(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$server$2f$middleware$2d$storage$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["clerkMiddlewareRequestDataStore"], async ()=>handler == null ? void 0 : handler(authHandler, request2, event2));
                    handlerResult = userHandlerResult || handlerResult;
                } catch (e) {
                    handlerResult = handleControlFlowErrors(e, clerkRequest, request2, requestState);
                }
                if (options.contentSecurityPolicy) {
                    const { headers } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$server$2f$content$2d$security$2d$policy$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createContentSecurityPolicyHeaders"])(((_b = (_a = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$shared$2f$dist$2f$runtime$2f$keys$2d$YNv6yjKk$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["parsePublishableKey"])(publishableKey)) == null ? void 0 : _a.frontendApi) != null ? _b : "").replace("$", ""), options.contentSecurityPolicy);
                    headers.forEach(([key, value])=>{
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$utils$2f$response$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["setHeader"])(handlerResult, key, value);
                    });
                    logger.debug("Clerk generated CSP", ()=>({
                            headers
                        }));
                }
                if (requestState.headers) {
                    requestState.headers.forEach((value, key)=>{
                        if (key === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$backend$2f$dist$2f$chunk$2d$AIEGYSDW$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["constants"].Headers.ContentSecurityPolicy) {
                            logger.debug("Content-Security-Policy detected", ()=>({
                                    value
                                }));
                        }
                        handlerResult.headers.append(key, value);
                    });
                }
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$utils$2f$response$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isRedirect"])(handlerResult)) {
                    logger.debug("handlerResult is redirect");
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$utils$2f$serverRedirectWithAuth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["serverRedirectWithAuth"])(clerkRequest, handlerResult, options);
                }
                if (options.debug) {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$server$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["setRequestHeadersOnNextResponse"])(handlerResult, clerkRequest, {
                        [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$backend$2f$dist$2f$chunk$2d$AIEGYSDW$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["constants"].Headers.EnableDebug]: "true"
                    });
                }
                const keylessKeysForRequestData = // Only pass keyless credentials when there are no explicit keys
                secretKey === (keyless == null ? void 0 : keyless.secretKey) ? {
                    publishableKey: keyless == null ? void 0 : keyless.publishableKey,
                    secretKey: keyless == null ? void 0 : keyless.secretKey
                } : {};
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$server$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["decorateRequest"])(clerkRequest, handlerResult, requestState, resolvedParams, keylessKeysForRequestData, authObject.tokenType === "session_token" ? null : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$backend$2f$dist$2f$chunk$2d$AIEGYSDW$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["makeAuthObjectSerializable"])(authObject));
                return handlerResult;
            });
        const keylessMiddleware = async (request2, event2)=>{
            var _a, _b;
            if (isKeylessSyncRequest(request2)) {
                return returnBackFromKeylessSync(request2);
            }
            const resolvedParams = typeof params === "function" ? await params(request2) : params;
            const keyless = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$server$2f$keyless$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getKeylessCookieValue"])((name)=>{
                var _a2;
                return (_a2 = request2.cookies.get(name)) == null ? void 0 : _a2.value;
            });
            const isMissingPublishableKey = !(resolvedParams.publishableKey || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$server$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PUBLISHABLE_KEY"] || (keyless == null ? void 0 : keyless.publishableKey));
            const authHeader = (_b = (_a = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$server$2f$headers$2d$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getHeader"])(request2, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$backend$2f$dist$2f$chunk$2d$AIEGYSDW$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["constants"].Headers.Authorization)) == null ? void 0 : _a.replace("Bearer ", "")) != null ? _b : "";
            if (isMissingPublishableKey && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$backend$2f$dist$2f$chunk$2d$AIEGYSDW$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["isMachineTokenByPrefix"])(authHeader)) {
                const res = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NextResponse"].next();
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$server$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["setRequestHeadersOnNextResponse"])(res, request2, {
                    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$backend$2f$dist$2f$chunk$2d$AIEGYSDW$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["constants"].Headers.AuthStatus]: "signed-out"
                });
                return res;
            }
            return baseNextMiddleware(request2, event2);
        };
        const nextMiddleware = async (request2, event2)=>{
            if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$utils$2f$feature$2d$flags$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["canUseKeyless"]) {
                return keylessMiddleware(request2, event2);
            }
            return baseNextMiddleware(request2, event2);
        };
        if (request && event) {
            return nextMiddleware(request, event);
        }
        return nextMiddleware;
    });
    return middleware;
};
const parseRequestAndEvent = (args)=>{
    return [
        args[0] instanceof Request ? args[0] : void 0,
        args[0] instanceof Request ? args[1] : void 0
    ];
};
const parseHandlerAndOptions = (args)=>{
    return [
        typeof args[0] === "function" ? args[0] : void 0,
        (args.length === 2 ? args[1] : typeof args[0] === "function" ? {} : args[0]) || {}
    ];
};
const isKeylessSyncRequest = (request)=>request.nextUrl.pathname === "/clerk-sync-keyless";
const returnBackFromKeylessSync = (request)=>{
    const returnUrl = request.nextUrl.searchParams.get("returnUrl");
    const url = new URL(request.url);
    url.pathname = "";
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NextResponse"].redirect(returnUrl || url.toString());
};
const createAuthenticateRequestOptions = (clerkRequest, options)=>{
    return {
        ...options,
        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$server$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["handleMultiDomainAndProxy"])(clerkRequest, options),
        // TODO: Leaving the acceptsToken as 'any' opens up the possibility of
        // an economic attack. We should revisit this and only verify a token
        // when auth() or auth.protect() is invoked.
        acceptsToken: "any"
    };
};
const createMiddlewareRedirectToSignIn = (clerkRequest)=>{
    return (opts = {})=>{
        const url = clerkRequest.clerkUrl.toString();
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$server$2f$nextErrors$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirectToSignInError"])(url, opts.returnBackUrl);
    };
};
const createMiddlewareRedirectToSignUp = (clerkRequest)=>{
    return (opts = {})=>{
        const url = clerkRequest.clerkUrl.toString();
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$server$2f$nextErrors$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirectToSignUpError"])(url, opts.returnBackUrl);
    };
};
const createMiddlewareProtect = (clerkRequest, rawAuthObject, redirectToSignIn)=>{
    return async (params, options)=>{
        const notFound = ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["notFound"])();
        const redirect = (url)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$server$2f$nextErrors$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["nextjsRedirectError"])(url, {
                redirectUrl: url
            });
        const requestedToken = (params == null ? void 0 : params.token) || (options == null ? void 0 : options.token) || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$backend$2f$dist$2f$chunk$2d$AIEGYSDW$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["TokenType"].SessionToken;
        const authObject = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$backend$2f$dist$2f$chunk$2d$AIEGYSDW$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getAuthObjectForAcceptedToken"])({
            authObject: rawAuthObject,
            acceptsToken: requestedToken
        });
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$server$2f$protect$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createProtect"])({
            request: clerkRequest,
            redirect,
            notFound,
            unauthorized: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$server$2f$nextErrors$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["unauthorized"],
            authObject,
            redirectToSignIn
        })(params, options);
    };
};
const createMiddlewareAuthHandler = (requestState, redirectToSignIn, redirectToSignUp)=>{
    const authHandler = async (options)=>{
        var _a;
        const rawAuthObject = requestState.toAuth({
            treatPendingAsSignedOut: options == null ? void 0 : options.treatPendingAsSignedOut
        });
        const acceptsToken = (_a = options == null ? void 0 : options.acceptsToken) != null ? _a : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$backend$2f$dist$2f$chunk$2d$AIEGYSDW$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["TokenType"].SessionToken;
        const authObject = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$backend$2f$dist$2f$chunk$2d$AIEGYSDW$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getAuthObjectForAcceptedToken"])({
            authObject: rawAuthObject,
            acceptsToken
        });
        if (authObject.tokenType === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$backend$2f$dist$2f$chunk$2d$AIEGYSDW$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["TokenType"].SessionToken && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$backend$2f$dist$2f$chunk$2d$AIEGYSDW$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["isTokenTypeAccepted"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$backend$2f$dist$2f$chunk$2d$AIEGYSDW$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["TokenType"].SessionToken, acceptsToken)) {
            return Object.assign(authObject, {
                redirectToSignIn,
                redirectToSignUp
            });
        }
        return authObject;
    };
    return authHandler;
};
const handleControlFlowErrors = (e, clerkRequest, nextRequest, requestState)=>{
    var _a;
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$server$2f$nextErrors$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isNextjsUnauthorizedError"])(e)) {
        const response = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NextResponse"](null, {
            status: 401
        });
        const authObject = requestState.toAuth();
        if (authObject && authObject.tokenType === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$backend$2f$dist$2f$chunk$2d$AIEGYSDW$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["TokenType"].OAuthToken) {
            const publishableKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$shared$2f$dist$2f$runtime$2f$keys$2d$YNv6yjKk$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["parsePublishableKey"])(requestState.publishableKey);
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$utils$2f$response$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["setHeader"])(response, "WWW-Authenticate", `Bearer resource_metadata="https://${publishableKey == null ? void 0 : publishableKey.frontendApi}/.well-known/oauth-protected-resource"`);
        }
        return response;
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$server$2f$nextErrors$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isNextjsNotFoundError"])(e)) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$utils$2f$response$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["setHeader"])(// This is an internal rewrite purely to trigger a not found error. We do not want Next.js to think that the
        // destination URL is a valid page, so we use `nextRequest.url` as the base for the fake URL, which Next.js
        // understands is an internal URL and won't run middleware against the request.
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NextResponse"].rewrite(new URL(`/clerk_${Date.now()}`, nextRequest.url)), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$backend$2f$dist$2f$chunk$2d$AIEGYSDW$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["constants"].Headers.AuthReason, "protect-rewrite");
    }
    const isRedirectToSignIn = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$server$2f$nextErrors$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isRedirectToSignInError"])(e);
    const isRedirectToSignUp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$server$2f$nextErrors$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isRedirectToSignUpError"])(e);
    if (isRedirectToSignIn || isRedirectToSignUp) {
        const redirect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$backend$2f$dist$2f$chunk$2d$AIEGYSDW$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createRedirect"])({
            redirectAdapter: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$server$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirectAdapter"],
            baseUrl: clerkRequest.clerkUrl,
            signInUrl: requestState.signInUrl,
            signUpUrl: requestState.signUpUrl,
            publishableKey: requestState.publishableKey,
            sessionStatus: (_a = requestState.toAuth()) == null ? void 0 : _a.sessionStatus
        });
        const { returnBackUrl } = e;
        return redirect[isRedirectToSignIn ? "redirectToSignIn" : "redirectToSignUp"]({
            returnBackUrl
        });
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$server$2f$nextErrors$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isNextjsRedirectError"])(e)) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$server$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirectAdapter"])(e.redirectUrl);
    }
    throw e;
};
;
 //# sourceMappingURL=clerkMiddleware.js.map
}),
"[project]/node_modules/@clerk/nextjs/dist/esm/server/index.js [app-rsc] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$server$2f$routeMatcher$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@clerk/nextjs/dist/esm/server/routeMatcher.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$backend$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@clerk/backend/dist/index.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$server$2f$clerkClient$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@clerk/nextjs/dist/esm/server/clerkClient.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$server$2f$createGetAuth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@clerk/nextjs/dist/esm/server/createGetAuth.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$server$2f$buildClerkProps$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@clerk/nextjs/dist/esm/server/buildClerkProps.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$app$2d$router$2f$server$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@clerk/nextjs/dist/esm/app-router/server/auth.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$app$2d$router$2f$server$2f$currentUser$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@clerk/nextjs/dist/esm/app-router/server/currentUser.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$server$2f$clerkMiddleware$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@clerk/nextjs/dist/esm/server/clerkMiddleware.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$backend$2f$dist$2f$internal$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@clerk/backend/dist/internal.mjs [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$shared$2f$dist$2f$runtime$2f$authorization$2d$errors$2d$CS1pNy8i$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@clerk/shared/dist/runtime/authorization-errors-CS1pNy8i.mjs [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
 //# sourceMappingURL=index.js.map
}),
"[project]/node_modules/@clerk/nextjs/dist/esm/server/index.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "auth",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$app$2d$router$2f$server$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"],
    "buildClerkProps",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$server$2f$buildClerkProps$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["buildClerkProps"],
    "clerkClient",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$server$2f$clerkClient$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["clerkClient"],
    "clerkMiddleware",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$server$2f$clerkMiddleware$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["clerkMiddleware"],
    "createClerkClient",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$backend$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClerkClient"],
    "createRouteMatcher",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$server$2f$routeMatcher$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createRouteMatcher"],
    "currentUser",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$app$2d$router$2f$server$2f$currentUser$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["currentUser"],
    "getAuth",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$server$2f$createGetAuth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getAuth"],
    "reverificationError",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$shared$2f$dist$2f$runtime$2f$authorization$2d$errors$2d$CS1pNy8i$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["reverificationError"],
    "reverificationErrorResponse",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$shared$2f$dist$2f$runtime$2f$authorization$2d$errors$2d$CS1pNy8i$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["reverificationErrorResponse"],
    "verifyToken",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$backend$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["verifyToken"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$server$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@clerk/nextjs/dist/esm/server/index.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$server$2f$routeMatcher$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@clerk/nextjs/dist/esm/server/routeMatcher.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$backend$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@clerk/backend/dist/index.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$server$2f$clerkClient$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@clerk/nextjs/dist/esm/server/clerkClient.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$server$2f$createGetAuth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@clerk/nextjs/dist/esm/server/createGetAuth.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$server$2f$buildClerkProps$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@clerk/nextjs/dist/esm/server/buildClerkProps.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$app$2d$router$2f$server$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@clerk/nextjs/dist/esm/app-router/server/auth.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$app$2d$router$2f$server$2f$currentUser$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@clerk/nextjs/dist/esm/app-router/server/currentUser.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$server$2f$clerkMiddleware$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@clerk/nextjs/dist/esm/server/clerkMiddleware.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$shared$2f$dist$2f$runtime$2f$authorization$2d$errors$2d$CS1pNy8i$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@clerk/shared/dist/runtime/authorization-errors-CS1pNy8i.mjs [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__777c9571._.js.map