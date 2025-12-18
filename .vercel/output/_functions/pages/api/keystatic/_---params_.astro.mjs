import { makeGenericAPIRouteHandler } from '@keystatic/core/api/generic';
import { parseString } from 'set-cookie-parser';
import { config as config$1, collection, fields } from '@keystatic/core';
export { renderers } from '../../../renderers.mjs';

function makeHandler(_config) {
  return async function keystaticAPIRoute(context) {
    var _context$locals, _ref, _config$clientId, _ref2, _config$clientSecret, _ref3, _config$secret;
    const envVarsForCf = (_context$locals = context.locals) === null || _context$locals === void 0 || (_context$locals = _context$locals.runtime) === null || _context$locals === void 0 ? void 0 : _context$locals.env;
    const handler = makeGenericAPIRouteHandler({
      ..._config,
      clientId: (_ref = (_config$clientId = _config.clientId) !== null && _config$clientId !== void 0 ? _config$clientId : envVarsForCf === null || envVarsForCf === void 0 ? void 0 : envVarsForCf.KEYSTATIC_GITHUB_CLIENT_ID) !== null && _ref !== void 0 ? _ref : tryOrUndefined(() => {
        return "Iv23liTyCjutYHQ1Fu0u";
      }),
      clientSecret: (_ref2 = (_config$clientSecret = _config.clientSecret) !== null && _config$clientSecret !== void 0 ? _config$clientSecret : envVarsForCf === null || envVarsForCf === void 0 ? void 0 : envVarsForCf.KEYSTATIC_GITHUB_CLIENT_SECRET) !== null && _ref2 !== void 0 ? _ref2 : tryOrUndefined(() => {
        return "9a70c7c2ac7df0533e4e967a4d2a3cfe8e61fa20";
      }),
      secret: (_ref3 = (_config$secret = _config.secret) !== null && _config$secret !== void 0 ? _config$secret : envVarsForCf === null || envVarsForCf === void 0 ? void 0 : envVarsForCf.KEYSTATIC_SECRET) !== null && _ref3 !== void 0 ? _ref3 : tryOrUndefined(() => {
        return "164fdc3431a09485c1b9b298916be113d65542e561aafb0405830419f45f72075969e531e81cbadd";
      })
    }, {
      slugEnvName: "PUBLIC_KEYSTATIC_GITHUB_APP_SLUG"
    });
    const {
      body,
      headers,
      status
    } = await handler(context.request);
    let headersInADifferentStructure = /* @__PURE__ */ new Map();
    if (headers) {
      if (Array.isArray(headers)) {
        for (const [key, value] of headers) {
          if (!headersInADifferentStructure.has(key.toLowerCase())) {
            headersInADifferentStructure.set(key.toLowerCase(), []);
          }
          headersInADifferentStructure.get(key.toLowerCase()).push(value);
        }
      } else if (typeof headers.entries === "function") {
        for (const [key, value] of headers.entries()) {
          headersInADifferentStructure.set(key.toLowerCase(), [value]);
        }
        if ("getSetCookie" in headers && typeof headers.getSetCookie === "function") {
          const setCookieHeaders2 = headers.getSetCookie();
          if (setCookieHeaders2 !== null && setCookieHeaders2 !== void 0 && setCookieHeaders2.length) {
            headersInADifferentStructure.set("set-cookie", setCookieHeaders2);
          }
        }
      } else {
        for (const [key, value] of Object.entries(headers)) {
          headersInADifferentStructure.set(key.toLowerCase(), [value]);
        }
      }
    }
    const setCookieHeaders = headersInADifferentStructure.get("set-cookie");
    headersInADifferentStructure.delete("set-cookie");
    if (setCookieHeaders) {
      for (const setCookieValue of setCookieHeaders) {
        var _options$sameSite;
        const {
          name,
          value,
          ...options
        } = parseString(setCookieValue);
        const sameSite = (_options$sameSite = options.sameSite) === null || _options$sameSite === void 0 ? void 0 : _options$sameSite.toLowerCase();
        context.cookies.set(name, value, {
          domain: options.domain,
          expires: options.expires,
          httpOnly: options.httpOnly,
          maxAge: options.maxAge,
          path: options.path,
          sameSite: sameSite === "lax" || sameSite === "strict" || sameSite === "none" ? sameSite : void 0
        });
      }
    }
    return new Response(body, {
      status,
      headers: [...headersInADifferentStructure.entries()].flatMap(([key, val]) => val.map((x) => [key, x]))
    });
  };
}
function tryOrUndefined(fn) {
  try {
    return fn();
  } catch {
    return void 0;
  }
}

const config = config$1({
  storage: {
    kind: "github",
    repo: {
      owner: "DanDingTangYuan",
      name: "DanDingTangYuan.github.io"
    }
  },
  collections: {
    devlog: collection({
      label: "Devlog 開發日誌",
      slugField: "title",
      path: "src/content/devlog/*",
      format: { contentField: "content" },
      // 啟用 Markdown 編輯器
      schema: {
        title: fields.slug({ name: { label: "標題" } }),
        description: fields.text({ label: "簡介/摘要", multiline: true }),
        pubDate: fields.date({ label: "發布日期", defaultValue: { kind: "today" } }),
        updatedDate: fields.date({ label: "更新日期", defaultValue: { kind: "today" } }),
        version: fields.text({ label: "版本號" }),
        repoURL: fields.text({ label: "Repo 連結 (URL)" }),
        tags: fields.array(fields.text({ label: "標籤" }), { label: "技術標籤 (Tags)", itemLabel: (props) => props.value }),
        projectStatus: fields.select({
          label: "專案狀態 (Status)",
          options: [
            { label: "開發中 (Development)", value: "development" },
            { label: "維護中 (Maintenance)", value: "maintenance" },
            { label: "修理中 (Fixing)", value: "fixing" },
            { label: "已完成 (Completed)", value: "completed" },
            { label: "已棄坑 (Abandoned)", value: "abandoned" }
          ],
          defaultValue: "development"
        }),
        thumbnail: fields.text({ label: "縮圖網址 (Thumbnail URL)" }),
        content: fields.markdoc({ label: "內文" })
      }
    }),
    blog: collection({
      label: "Blog 部落格文章",
      slugField: "title",
      path: "src/content/blog/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "標題" } }),
        description: fields.text({ label: "簡介/摘要", multiline: true }),
        pubDate: fields.date({ label: "發布日期", defaultValue: { kind: "today" } }),
        updatedDate: fields.date({ label: "更新日期", defaultValue: { kind: "today" } }),
        tags: fields.array(fields.text({ label: "標籤" }), { label: "文章標籤 (Tags)", itemLabel: (props) => props.value }),
        thumbnail: fields.text({ label: "縮圖網址 (Thumbnail URL)" }),
        draft: fields.checkbox({ label: "草稿狀態", description: "勾選後將不會發布", defaultValue: false }),
        content: fields.markdoc({ label: "內文" })
      }
    }),
    story: collection({
      label: "Story 小說/故事連載",
      slugField: "title",
      path: "src/content/story/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "章節標題 (Title)" } }),
        series: fields.text({ label: "系列名稱 (Series)", description: "作品名稱" }),
        chapter: fields.integer({ label: "章節編號 (Chapter No.)", defaultValue: 1 }),
        pubDate: fields.date({ label: "發布日期", defaultValue: { kind: "today" } }),
        updatedDate: fields.date({ label: "更新日期" }),
        status: fields.select({
          label: "連載狀態",
          options: [
            { label: "連載中 (Ongoing)", value: "ongoing" },
            { label: "已完結 (Completed)", value: "completed" },
            { label: "休刊 (Hiatus)", value: "hiatus" }
          ],
          defaultValue: "ongoing"
        }),
        tags: fields.array(fields.text({ label: "Tag" }), { label: "標籤" }),
        coverImage: fields.text({ label: "封面網址 (Cover URL)" }),
        content: fields.markdoc({ label: "內文" })
      }
    }),
    wiki: collection({
      label: "📚 Wiki | 設定集",
      slugField: "title",
      path: "src/content/wiki/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "條目名稱 (Title)" } }),
        category: fields.select({
          label: "分類 (Category)",
          options: [
            { label: "角色 (Character)", value: "Character" },
            { label: "地點 (Location)", value: "Location" },
            { label: "道具 (Item)", value: "Item" },
            { label: "傳說 (Lore)", value: "Lore" }
          ],
          defaultValue: "Character"
        }),
        updatedDate: fields.date({ label: "最後修訂時間", defaultValue: { kind: "today" } }),
        tags: fields.array(fields.text({ label: "Tag" }), { label: "標籤" }),
        thumbnail: fields.text({ label: "縮圖網址" }),
        content: fields.markdoc({ label: "內文" })
      }
    })
  }
});

const all = makeHandler({ config });
const ALL = all;

const prerender = false;

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  ALL,
  all,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
