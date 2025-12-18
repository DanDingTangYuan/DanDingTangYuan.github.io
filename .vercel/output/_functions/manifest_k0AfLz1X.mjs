import 'piccolore';
import { k as decodeKey } from './chunks/astro/server_P46heXja.mjs';
import 'clsx';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_D48GPCzw.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///E:/data/hate_coding_website/","cacheDir":"file:///E:/data/hate_coding_website/node_modules/.astro/","outDir":"file:///E:/data/hate_coding_website/dist/","srcDir":"file:///E:/data/hate_coding_website/src/","publicDir":"file:///E:/data/hate_coding_website/public/","buildClientDir":"file:///E:/data/hate_coding_website/dist/client/","buildServerDir":"file:///E:/data/hate_coding_website/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"never"}}},{"file":"about/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/about","isIndex":false,"type":"page","pattern":"^\\/about$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"blog/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/blog","isIndex":true,"type":"page","pattern":"^\\/blog$","segments":[[{"content":"blog","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/blog/index.astro","pathname":"/blog","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"devlog/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/devlog","isIndex":true,"type":"page","pattern":"^\\/devlog$","segments":[[{"content":"devlog","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/devlog/index.astro","pathname":"/devlog","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"rss.xml","links":[],"scripts":[],"styles":[],"routeData":{"route":"/rss.xml","isIndex":false,"type":"endpoint","pattern":"^\\/rss\\.xml\\/?$","segments":[[{"content":"rss.xml","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/rss.xml.js","pathname":"/rss.xml","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"story/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/story","isIndex":true,"type":"page","pattern":"^\\/story$","segments":[[{"content":"story","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/story/index.astro","pathname":"/story","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"test-devlog/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/test-devlog","isIndex":false,"type":"page","pattern":"^\\/test-devlog$","segments":[[{"content":"test-devlog","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/test-devlog.astro","pathname":"/test-devlog","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"test-render/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/test-render","isIndex":false,"type":"page","pattern":"^\\/test-render$","segments":[[{"content":"test-render","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/test-render.astro","pathname":"/test-render","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"wiki/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/wiki","isIndex":true,"type":"page","pattern":"^\\/wiki$","segments":[[{"content":"wiki","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/wiki/index.astro","pathname":"/wiki","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/api/keystatic/[...params]","pattern":"^\\/api\\/keystatic(?:\\/(.*?))?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"keystatic","dynamic":false,"spread":false}],[{"content":"...params","dynamic":true,"spread":true}]],"params":["...params"],"component":"node_modules/@keystatic/astro/internal/keystatic-api.js","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","isIndex":false,"route":"/keystatic/[...params]","pattern":"^\\/keystatic(?:\\/(.*?))?$","segments":[[{"content":"keystatic","dynamic":false,"spread":false}],[{"content":"...params","dynamic":true,"spread":true}]],"params":["...params"],"component":"node_modules/@keystatic/astro/internal/keystatic-astro-page.astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"never"}}}],"site":"https://kotonoha-shiori.dev","base":"/","trailingSlash":"never","compressHTML":true,"componentMetadata":[["E:/data/hate_coding_website/src/pages/blog/index.astro",{"propagation":"in-tree","containsHead":true}],["E:/data/hate_coding_website/src/pages/devlog/index.astro",{"propagation":"in-tree","containsHead":true}],["E:/data/hate_coding_website/src/pages/devlog/[...slug].astro",{"propagation":"in-tree","containsHead":true}],["E:/data/hate_coding_website/src/pages/story/index.astro",{"propagation":"in-tree","containsHead":true}],["E:/data/hate_coding_website/src/pages/test-devlog.astro",{"propagation":"in-tree","containsHead":true}],["E:/data/hate_coding_website/src/pages/test-render.astro",{"propagation":"in-tree","containsHead":true}],["E:/data/hate_coding_website/src/pages/wiki/index.astro",{"propagation":"in-tree","containsHead":true}],["E:/data/hate_coding_website/src/pages/index.astro",{"propagation":"none","containsHead":true}],["E:/data/hate_coding_website/src/pages/about.astro",{"propagation":"none","containsHead":true}],["E:/data/hate_coding_website/src/pages/blog/[...slug].astro",{"propagation":"in-tree","containsHead":true}],["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/blog/[...slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/blog/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/devlog/[...slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/devlog/index@_@astro",{"propagation":"in-tree","containsHead":false}],["E:/data/hate_coding_website/src/pages/rss.xml.js",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/rss.xml@_@js",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/story/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/test-devlog@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/test-render@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/wiki/index@_@astro",{"propagation":"in-tree","containsHead":false}],["E:/data/hate_coding_website/node_modules/@astrojs/markdoc/components/Renderer.astro",{"propagation":"in-tree","containsHead":false}],["E:/data/hate_coding_website/node_modules/@astrojs/markdoc/components/index.ts",{"propagation":"in-tree","containsHead":false}],["E:/data/hate_coding_website/src/content/blog/test.mdoc",{"propagation":"in-tree","containsHead":false}],["E:/data/hate_coding_website/src/content/blog/test.mdoc?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["E:\\data\\hate_coding_website\\.astro\\content-modules.mjs",{"propagation":"in-tree","containsHead":false}],["E:/data/hate_coding_website/node_modules/astro/dist/content/runtime.js",{"propagation":"in-tree","containsHead":false}],["E:/data/hate_coding_website/src/content/devlog/the first log for web deploy.mdoc",{"propagation":"in-tree","containsHead":false}],["E:/data/hate_coding_website/src/content/devlog/the first log for web deploy.mdoc?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/about@_@astro":"pages/about.astro.mjs","\u0000@astro-page:node_modules/@keystatic/astro/internal/keystatic-api@_@js":"pages/api/keystatic/_---params_.astro.mjs","\u0000@astro-page:src/pages/blog/index@_@astro":"pages/blog.astro.mjs","\u0000@astro-page:src/pages/blog/[...slug]@_@astro":"pages/blog/_---slug_.astro.mjs","\u0000@astro-page:src/pages/devlog/index@_@astro":"pages/devlog.astro.mjs","\u0000@astro-page:src/pages/devlog/[...slug]@_@astro":"pages/devlog/_---slug_.astro.mjs","\u0000@astro-page:node_modules/@keystatic/astro/internal/keystatic-astro-page@_@astro":"pages/keystatic/_---params_.astro.mjs","\u0000@astro-page:src/pages/rss.xml@_@js":"pages/rss.xml.astro.mjs","\u0000@astro-page:src/pages/story/index@_@astro":"pages/story.astro.mjs","\u0000@astro-page:src/pages/test-devlog@_@astro":"pages/test-devlog.astro.mjs","\u0000@astro-page:src/pages/test-render@_@astro":"pages/test-render.astro.mjs","\u0000@astro-page:src/pages/wiki/index@_@astro":"pages/wiki.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_k0AfLz1X.mjs","E:/data/hate_coding_website/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_BOevHFzo.mjs","E:\\data\\hate_coding_website\\.astro\\content-assets.mjs":"chunks/content-assets_DleWbedO.mjs","E:\\data\\hate_coding_website\\.astro\\content-modules.mjs":"chunks/content-modules_BOnUzOdR.mjs","\u0000astro:data-layer-content":"chunks/_astro_data-layer-content_DcKTqjTD.mjs","E:/data/hate_coding_website/src/content/devlog/the first log for web deploy.mdoc?astroPropagatedAssets":"chunks/the first log for web deploy_CjYqEhu0.mjs","E:/data/hate_coding_website/src/content/blog/using-mdx.mdx?astroPropagatedAssets":"chunks/using-mdx_CtlBWTTT.mjs","E:/data/hate_coding_website/src/content/blog/test.mdoc?astroPropagatedAssets":"chunks/test_De_F3mdV.mjs","E:/data/hate_coding_website/src/content/devlog/the first log for web deploy.mdoc":"chunks/the first log for web deploy_B68gaRmQ.mjs","E:/data/hate_coding_website/src/content/blog/using-mdx.mdx":"chunks/using-mdx_iH82pEBy.mjs","E:/data/hate_coding_website/src/content/blog/test.mdoc":"chunks/test_BA5NlEii.mjs","E:/data/hate_coding_website/node_modules/@keystatic/astro/internal/keystatic-page.js":"_astro/keystatic-page.DQrbp927.js","@astrojs/react/client.js":"_astro/client.DEruH62g.js","E:/data/hate_coding_website/src/pages/index.astro?astro&type=script&index=0&lang.ts":"_astro/index.astro_astro_type_script_index_0_lang.IN7RwbF7.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["E:/data/hate_coding_website/src/pages/index.astro?astro&type=script&index=0&lang.ts","const e=document.querySelector(\"header\"),o=document.querySelector(\".hero\");let l=window.scrollY;e&&o&&window.addEventListener(\"scroll\",()=>{const s=window.scrollY,t=o.offsetHeight;s>l&&s>50?e.classList.add(\"nav-hidden\"):e.classList.remove(\"nav-hidden\"),s>t-80?e.classList.add(\"nav-solid\"):e.classList.remove(\"nav-solid\"),l=s});"]],"assets":["/_astro/hero_background.C55gdvSN.jpg","/favicon.svg","/fonts/atkinson-bold.woff","/fonts/atkinson-regular.woff","/_astro/client.DEruH62g.js","/_astro/index.DKytmrpT.js","/_astro/keystatic-page.DQrbp927.js","/about/index.html","/blog/index.html","/devlog/index.html","/rss.xml","/story/index.html","/test-devlog/index.html","/test-render/index.html","/wiki/index.html","/index.html"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"serverIslandNameMap":[],"key":"SpLA+AnccVt7592Fhx31VPYBFzleKMwM+0vUXPbviPc="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
