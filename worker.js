// =========================================================
// ROYAL CHILGHOZA PINE NUTS — CLOUDFLARE WORKER
// With Cloudinary + KV Storage + Rate Limiting
// + SEO-friendly Hub Routes for 20 hubs
// =========================================================

const CLOUDINARY_CLOUD_NAME = "agnhxdu4";
const CLOUDINARY_API_KEY = "118953582795868";
const CLOUDINARY_API_SECRET = "bHpg060YsexAgpP4cTVTs227Io0";

// Rate Limiting Configuration
const RATE_LIMIT_MAX = 5;          // 5 attempts
const RATE_LIMIT_WINDOW = 3600;    // per 1 hour (in seconds)

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const cors = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: cors });
    }

    // ---- Health Check ----
    if (url.pathname === "/api/health") {
      return json({
        ok: true,
        service: "Royal Chilghoza Pine Nuts Worker",
        ai: !!env.AI,
        kv: !!env.ROYAL_KV,
        cloudinary: true,
      }, cors);
    }

    // ---- Visitor Info (Country) ----
if (url.pathname === "/api/visitor-info") {
  return json({
    ok: true,
    country: request.cf?.country || "Unknown",
    city: request.cf?.city || "Unknown"
  }, cors);
}

// ---- Track Visit (increase counter) ----
if (url.pathname === "/api/track-visit" && request.method === "POST") {
  if (!env.ROYAL_KV) {
    return json({ ok: false, error: "KV not configured" }, cors);
  }
  try {
    const country = request.cf?.country || "Unknown";
    const today = new Date().toISOString().split("T")[0];

    // Total visits
    const totalRaw = await env.ROYAL_KV.get("total_visits");
    const total = totalRaw ? parseInt(totalRaw, 10) : 0;
    await env.ROYAL_KV.put("total_visits", String(total + 1));

    // Visits by country
    const byCountryRaw = await env.ROYAL_KV.get("visits_by_country");
    const byCountry = byCountryRaw ? JSON.parse(byCountryRaw) : {};
    byCountry[country] = (byCountry[country] || 0) + 1;
    await env.ROYAL_KV.put("visits_by_country", JSON.stringify(byCountry));

    // Daily visits (last 30 days)
    const dailyRaw = await env.ROYAL_KV.get("visits_daily");
    let daily = dailyRaw ? JSON.parse(dailyRaw) : {};
    daily[today] = (daily[today] || 0) + 1;
    const keys = Object.keys(daily).sort();
    if (keys.length > 30) {
      const toDelete = keys.slice(0, keys.length - 30);
      toDelete.forEach(k => delete daily[k]);
    }
    await env.ROYAL_KV.put("visits_daily", JSON.stringify(daily));

    return json({ ok: true, total: total + 1, country }, cors);
  } catch (err) {
    return json({ ok: false, error: err.message }, cors);
  }
}

// ---- Get Visit Stats (Admin only) ----
if (url.pathname === "/api/visit-stats" && request.method === "GET") {
  const reject = await checkAuth(request, env, cors);
  if (reject) return reject;

  if (!env.ROYAL_KV) {
    return json({ ok: false, error: "KV not configured" }, cors);
  }
  try {
    const total = parseInt(await env.ROYAL_KV.get("total_visits") || "0", 10);
    const byCountryRaw = await env.ROYAL_KV.get("visits_by_country");
    const byCountry = byCountryRaw ? JSON.parse(byCountryRaw) : {};
    const dailyRaw = await env.ROYAL_KV.get("visits_daily");
    const daily = dailyRaw ? JSON.parse(dailyRaw) : {};

    return json({
      ok: true,
      total,
      byCountry,
      daily
    }, cors);
  } catch (err) {
    return json({ ok: false, error: err.message }, cors);
  }
}

    // ---- AI Assistant ----
    if (url.pathname === "/api/ai" && request.method === "POST") {
      try {
        const { message = "", mode = "visitor", language = "en" } = await request.json();

        if (mode === "admin") {
          const reject = await checkAuth(request, env, cors);
          if (reject) return reject;
        }

        if (!env.AI) {
          return json({
            reply: "Royal AI is ready in the interface. Configure the Cloudflare Workers AI binding to activate live AI responses."
          }, cors);
        }

        const system = mode === "admin"
          ? 'You are the Royal Chilghoza Pine Nuts Admin Assistant. Help the authenticated administrator manage hubs, content, translations, media, Cloudinary, SEO, website structure and troubleshooting. Never expose secrets. Always use the exact term "Chilghoza Pine Nuts".'
          : 'You are the Royal Chilghoza Pine Nuts Visitor Assistant. Help visitors with general information about Chilghoza Pine Nuts, trade, quality, forests, research and the website. Do not claim private admin access. Always use the exact term "Chilghoza Pine Nuts".';

        const messages = [
          { role: "system", content: `${system} IMPORTANT: Reply in the SAME language the user writes in (Urdu → Urdu, English → English, Chinese → Chinese, Arabic → Arabic, Pashto → Pashto, Russian → Russian). If the user's language is unclear, use interface language code: ${language}.` },
          { role: "user", content: message }
        ];

        const models = [
          "@cf/meta/llama-3.3-70b-instruct-fp8-fast",
          "@cf/meta/llama-4-scout-17b-16e-instruct",
          "@cf/meta/llama-3.1-8b-instruct"
        ];

        let result = null;
        let lastError = null;

        for (const model of models) {
          try {
            result = await env.AI.run(model, { messages });
            if (result && (result.response || result.result)) {
              break;
            }
          } catch (e) {
            lastError = e;
            result = null;
          }
        }

        if (!result) {
          return json({
            reply: "AI Error: " + (lastError?.message || "تمام ماڈلز ناکام ہو گئے")
          }, cors, 500);
        }

        const reply = result.response || result.result || "No response.";
        return json({ reply }, cors);

      } catch (err) {
        return json({
          reply: "AI Error: " + (err.message || "Unknown error")
        }, cors, 500);
      }
    }

    // =========================================================
    // KV STORAGE APIs
    // =========================================================

    // ---- KV: Get value (PUBLIC — no auth) ----
    if (url.pathname.startsWith("/api/kv/get/") && request.method === "GET") {
      if (!env.ROYAL_KV) {
        return json({ ok: false, error: "KV not configured" }, cors, 503);
      }
      try {
        const key = decodeURIComponent(url.pathname.slice("/api/kv/get/".length));
        const value = await env.ROYAL_KV.get(key);
        if (value === null) {
          return json({ ok: false, error: "Not found", key }, cors, 404);
        }
        try {
          return json({ ok: true, key, value: JSON.parse(value) }, cors);
        } catch (e) {
          return json({ ok: true, key, value }, cors);
        }
      } catch (err) {
        return json({ ok: false, error: err.message }, cors, 500);
      }
    }

    // ---- KV: Set value (PROTECTED) ----
    if (url.pathname === "/api/kv/set" && request.method === "POST") {
      const reject = await checkAuth(request, env, cors);
      if (reject) return reject;

      if (!env.ROYAL_KV) {
        return json({ ok: false, error: "KV not configured" }, cors, 503);
      }
      try {
        const body = await request.json();
        const { key, value } = body;
        if (!key) return json({ ok: false, error: "key required" }, cors, 400);
        const toStore = typeof value === "string" ? value : JSON.stringify(value);
        await env.ROYAL_KV.put(key, toStore);
        return json({ ok: true, key }, cors);
      } catch (err) {
        return json({ ok: false, error: err.message }, cors, 500);
      }
    }

    // ---- KV: Delete value (PROTECTED) ----
    if (url.pathname.startsWith("/api/kv/delete/") && request.method === "DELETE") {
      const reject = await checkAuth(request, env, cors);
      if (reject) return reject;

      if (!env.ROYAL_KV) {
        return json({ ok: false, error: "KV not configured" }, cors, 503);
      }
      try {
        const key = decodeURIComponent(url.pathname.slice("/api/kv/delete/".length));
        await env.ROYAL_KV.delete(key);
        return json({ ok: true, key }, cors);
      } catch (err) {
        return json({ ok: false, error: err.message }, cors, 500);
      }
    }

    // ---- KV: List all keys ----
    if (url.pathname === "/api/kv/list" && request.method === "GET") {
      if (!env.ROYAL_KV) {
        return json({ ok: false, error: "KV not configured" }, cors, 503);
      }
      try {
        const list = await env.ROYAL_KV.list({ limit: 1000 });
        return json({
          ok: true,
          keys: list.keys.map(k => ({ name: k.name, expiration: k.expiration }))
        }, cors);
      } catch (err) {
        return json({ ok: false, error: err.message }, cors, 500);
      }
    }

    // =========================================================
    // CLOUDINARY — Media Management
    // =========================================================

    // ---- Cloudinary: Upload (PROTECTED) ----
    if (url.pathname === "/api/media/upload" && request.method === "POST") {
      const reject = await checkAuth(request, env, cors);
      if (reject) return reject;

      try {
        const form = await request.formData();
        const file = form.get("file");
        const folder = String(form.get("folder") || "general").replace(/[^a-zA-Z0-9/_-]/g, "");

        if (!(file instanceof File)) {
          return new Response("file required", { status: 400, headers: cors });
        }

        const ext = (file.name.split(".").pop() || "").toLowerCase();
        let resourceType = "image";
        if (["mp4", "webm", "mov", "avi"].includes(ext)) resourceType = "video";
        else if (["pdf", "doc", "docx"].includes(ext)) resourceType = "raw";

        const timestamp = Math.floor(Date.now() / 1000);
        const folderPath = `royal-chilghoza/${folder}`;

        const signatureParams = `folder=${folderPath}&timestamp=${timestamp}`;
        const signature = await sha1(signatureParams + CLOUDINARY_API_SECRET);

        const uploadForm = new FormData();
        uploadForm.append("file", file);
        uploadForm.append("api_key", CLOUDINARY_API_KEY);
        uploadForm.append("timestamp", timestamp.toString());
        uploadForm.append("folder", folderPath);
        uploadForm.append("signature", signature);

        const cloudResp = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/${resourceType}/upload`,
          { method: "POST", body: uploadForm }
        );
        const cloudData = await cloudResp.json();

        if (!cloudResp.ok) {
          return json({ ok: false, error: cloudData.error?.message || "Cloudinary upload failed" }, cors, 500);
        }

        return json({
          ok: true,
          key: cloudData.public_id,
          url: cloudData.secure_url,
          public_id: cloudData.public_id,
          format: cloudData.format,
          bytes: cloudData.bytes,
          created_at: cloudData.created_at,
        }, cors);

      } catch (err) {
        return json({ ok: false, error: err.message }, cors, 500);
      }
    }

    // ---- Cloudinary: List files ----
    if (url.pathname === "/api/media/list" && request.method === "GET") {
      try {
        const folder = url.searchParams.get("folder") || "";
        const prefix = folder ? `royal-chilghoza/${folder}` : "royal-chilghoza";

        const [imagesResp, videosResp, rawResp] = await Promise.all([
          cloudinaryAdminFetch("image", prefix),
          cloudinaryAdminFetch("video", prefix),
          cloudinaryAdminFetch("raw", prefix),
        ]);

        const images = (imagesResp.resources || []).map(r => formatCloudResource(r, "image"));
        const videos = (videosResp.resources || []).map(r => formatCloudResource(r, "video"));
        const raws = (rawResp.resources || []).map(r => formatCloudResource(r, "raw"));

        const files = [...images, ...videos, ...raws];

        return json({ ok: true, files }, cors);

      } catch (err) {
        return json({ ok: false, error: err.message }, cors, 500);
      }
    }

    // ---- Cloudinary: List folders ----
    if (url.pathname === "/api/media/folders" && request.method === "GET") {
      try {
        const auth = btoa(`${CLOUDINARY_API_KEY}:${CLOUDINARY_API_SECRET}`);
        const resp = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/folders/royal-chilghoza`,
          { headers: { Authorization: `Basic ${auth}` } }
        );
        const data = await resp.json();
        const folders = (data.folders || []).map(f => f.name);
        return json({ ok: true, folders }, cors);
      } catch (err) {
        return json({ ok: false, error: err.message }, cors, 500);
      }
    }

    // ---- Cloudinary: Create Folder (PROTECTED) ----
    if (url.pathname === "/api/media/folder" && request.method === "POST") {
      const reject = await checkAuth(request, env, cors);
      if (reject) return reject;

      try {
        const body = await request.json();
        const name = String(body.folder || "").trim().replace(/[^a-zA-Z0-9/_-]/g, "");
        if (!name) return json({ ok: false, error: "Invalid folder name" }, cors, 400);

        const auth = btoa(`${CLOUDINARY_API_KEY}:${CLOUDINARY_API_SECRET}`);
        const resp = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/folders/royal-chilghoza/${name}`,
          { method: "POST", headers: { Authorization: `Basic ${auth}` } }
        );
        const data = await resp.json();
        if (!resp.ok) return json({ ok: false, error: data.error?.message || "Failed" }, cors, 500);
        return json({ ok: true, folder: name }, cors);
      } catch (err) {
        return json({ ok: false, error: err.message }, cors, 500);
      }
    }

    // ---- Cloudinary: Delete (PROTECTED) ----
    if (url.pathname.startsWith("/api/media/") && request.method === "DELETE") {
      const reject = await checkAuth(request, env, cors);
      if (reject) return reject;

      try {
        const publicId = decodeURIComponent(url.pathname.slice("/api/media/".length));
        const resourceType = url.searchParams.get("type") || "image";
        const timestamp = Math.floor(Date.now() / 1000);
        const signature = await sha1(`public_id=${publicId}&timestamp=${timestamp}` + CLOUDINARY_API_SECRET);

        const delForm = new FormData();
        delForm.append("public_id", publicId);
        delForm.append("api_key", CLOUDINARY_API_KEY);
        delForm.append("timestamp", timestamp.toString());
        delForm.append("signature", signature);

        const resp = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/${resourceType}/destroy`,
          { method: "POST", body: delForm }
        );
        const data = await resp.json();
        return json({ ok: data.result === "ok", result: data.result }, cors);
      } catch (err) {
        return json({ ok: false, error: err.message }, cors, 500);
      }
    }

    // ---- Cloudinary: Get single file (redirect) ----
    if (url.pathname.startsWith("/api/media/") && request.method === "GET") {
      const publicId = decodeURIComponent(url.pathname.slice("/api/media/".length));
      const type = url.searchParams.get("type") || "image";
      const ext = url.searchParams.get("format") || "jpg";
      return Response.redirect(
        `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/${type}/upload/${publicId}.${ext}`,
        302
      );
    }

    // =========================================================
    // ADMIN & STATIC
    // =========================================================

    // ---- Admin Status ----
    if (url.pathname === "/api/admin/status") {
      const ip = request.headers.get("CF-Connecting-IP") || "unknown";
      const limit = await checkRateLimit(env, ip);
      const isAuth = isAuthorized(request, env);
      return json({
        admin: isAuth,
        rateLimit: {
          remaining: Math.max(0, RATE_LIMIT_MAX - limit.count),
          max: RATE_LIMIT_MAX,
          blocked: !limit.allowed
        }
      }, cors);
    }

    // =========================================================
// HUB ROUTES — SEO-friendly URLs for 20 hubs
// =========================================================
if (/^\/(trade|research)\/[a-z0-9-]+\/?$/i.test(url.pathname)) {
  // Check if this is a bot (Google, Bing, etc.)
  const botDetected = isBot(request);

  if (botDetected) {
  // Extract gateway and slug from URL
  const urlParts = url.pathname.replace(/^\/+|\/+$/g, "").split("/");
  const gateway = urlParts[0];
  const slug = urlParts[1];

  // Read HUB_SLUGS_MAP from KV (automatic), fallback to hardcoded
let HUB_SLUGS_MAP = null;
try {
  const kvSlugsRaw = await env.ROYAL_KV.get("hub_slugs");
  if (kvSlugsRaw) {
    HUB_SLUGS_MAP = JSON.parse(kvSlugsRaw);
  }
} catch (e) { /* use fallback */ }

// Fallback: hardcoded (if KV is empty)
if (!HUB_SLUGS_MAP) {
  HUB_SLUGS_MAP = {
    trade: ["global-markets", "usa-market", "china-market", "export-logistics", "product-quality", "supply-chain", "gi-indication", "organic-chemistry", "processing-packaging", "sustainable-trade"],
    research: ["geographical-origin", "biology-botany", "nutrition-value", "forests-ecology", "biodiversity-wildlife", "climate-environment", "forest-conservation", "supply-chain-livelihoods", "sustainable-harvesting", "research-policy"]
  };
}

  const hubIndex = HUB_SLUGS_MAP[gateway] ? HUB_SLUGS_MAP[gateway].indexOf(slug) : -1;

  // Get hub data from KV
  let hubTitle = slug.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());
  let hubDesc = "Royal Chilghoza Pine Nuts — " + hubTitle;

  try {
    const hubsRaw = await env.ROYAL_KV.get("hubs_data");
    const hubsData = hubsRaw ? JSON.parse(hubsRaw) : null;

    if (hubsData && hubsData.en && hubsData.en[gateway] && hubsData.en[gateway][hubIndex]) {
      hubTitle = hubsData.en[gateway][hubIndex][0] || hubTitle;
      hubDesc = hubsData.en[gateway][hubIndex][1] || hubDesc;
    }
  } catch (e) { /* use fallback */ }

  // Return SSR HTML
  return new Response(renderHubSSR(gateway, slug, hubTitle, hubDesc, hubIndex), {
    status: 200,
    headers: {
      "Content-Type": "text/html;charset=UTF-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

  try {
    const newUrl = new URL(request.url);
    newUrl.pathname = "/index.html";
    const newReq = new Request(newUrl.toString(), request);
    const hubResp = await env.ASSETS.fetch(newReq);
    if (hubResp.status !== 404) return hubResp;
  } catch (e) { /* fall through */ }
}
    

    // ---- Static Assets ----
    if (env.ASSETS) {
      try {
        const assetResp = await env.ASSETS.fetch(request);
        if (assetResp.status !== 404) return assetResp;
      } catch (e) { /* fall through */ }
    }

    // ---- Fallback: GitHub Raw ----
    const githubBase = env.GITHUB_RAW_BASE
      || "https://raw.githubusercontent.com/markhor/royal-chilghoza-pine-nuts/main/";

    let path = url.pathname;
    if (path === "/") path = "/index.html";

    const staticExtensions = /\.(html|css|js|jpg|jpeg|png|gif|webp|svg|ico|json|woff|woff2|ttf)$/i;
    if (staticExtensions.test(path)) {
      const rawUrl = githubBase + path.slice(1);
      try {
        const response = await fetch(rawUrl, {
          headers: { "User-Agent": "Cloudflare-Worker" }
        });
        if (!response.ok) {
          return new Response(`Static file not found: ${path}`, { status: 404, headers: cors });
        }
        const contentType = getContentType(path);
        const body = await response.arrayBuffer();
        return new Response(body, {
          headers: {
            ...cors,
            "Content-Type": contentType,
            "Cache-Control": "public, max-age=3600",
          },
        });
      } catch (err) {
        return new Response(`Error: ${err.message}`, { status: 500, headers: cors });
      }
    }

    return new Response("Not Found", { status: 404, headers: cors });
  },
};

// =========================================================
// HELPERS
// =========================================================

// ---- Check if request is authorized (no rate limit) ----
function isAuthorized(request, env) {
  const token = request.headers.get("Authorization")?.replace(/^Bearer\s+/, "");
  return !!env.ADMIN_TOKEN && token === env.ADMIN_TOKEN;
}

// ---- Check rate limit for an IP ----
async function checkRateLimit(env, ip) {
  if (!env.ROYAL_KV) return { allowed: true, count: 0 };
  const key = `ratelimit:auth:${ip}`;
  try {
    const raw = await env.ROYAL_KV.get(key);
    const count = raw ? parseInt(raw, 10) : 0;
    return { allowed: count < RATE_LIMIT_MAX, count };
  } catch (e) {
    return { allowed: true, count: 0 };
  }
}

// ---- Record a failed attempt ----
async function recordFailedAttempt(env, ip) {
  if (!env.ROYAL_KV) return;
  const key = `ratelimit:auth:${ip}`;
  try {
    const raw = await env.ROYAL_KV.get(key);
    const count = raw ? parseInt(raw, 10) : 0;
    await env.ROYAL_KV.put(key, String(count + 1), { expirationTtl: RATE_LIMIT_WINDOW });
  } catch (e) { /* ignore */ }
}

// ---- Reset rate limit (on successful login) ----
async function resetRateLimit(env, ip) {
  if (!env.ROYAL_KV) return;
  const key = `ratelimit:auth:${ip}`;
  try {
    await env.ROYAL_KV.delete(key);
  } catch (e) { /* ignore */ }
}

// ---- Combined: check rate limit + auth ----
async function checkAuth(request, env, cors) {
  const ip = request.headers.get("CF-Connecting-IP") || "unknown";

  // 1. Check rate limit first
  const limit = await checkRateLimit(env, ip);
  if (!limit.allowed) {
    const retryAfter = RATE_LIMIT_WINDOW;
    return json({
      ok: false,
      error: "Too many attempts. Try again later.",
      retryAfter: retryAfter
    }, {
      ...cors,
      "Retry-After": String(retryAfter)
    }, 429);
  }

  // 2. Check auth
  if (!isAuthorized(request, env)) {
    await recordFailedAttempt(env, ip);
    const newCount = limit.count + 1;
    return json({
      ok: false,
      error: "Unauthorized",
      attemptsUsed: newCount,
      attemptsRemaining: Math.max(0, RATE_LIMIT_MAX - newCount)
    }, cors, 401);
  }

  // 3. Success — reset counter
  await resetRateLimit(env, ip);
  return null; // authorized, proceed
}

async function cloudinaryAdminFetch(resourceType, prefix) {
  const auth = btoa(`${CLOUDINARY_API_KEY}:${CLOUDINARY_API_SECRET}`);
  const url = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/resources/${resourceType}?prefix=${encodeURIComponent(prefix)}&max_results=100`;
  const resp = await fetch(url, { headers: { Authorization: `Basic ${auth}` } });
  if (!resp.ok) return { resources: [] };
  return await resp.json();
}

function formatCloudResource(r, type) {
  return {
    key: r.public_id,
    name: r.public_id.split("/").pop() + "." + (r.format || ""),
    size: r.bytes,
    uploaded: r.created_at,
    url: r.secure_url,
    public_id: r.public_id,
    format: r.format,
    resource_type: type,
    folder: r.folder || "",
  };
}

async function sha1(str) {
  const buf = new TextEncoder().encode(str);
  const hash = await crypto.subtle.digest("SHA-1", buf);
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

function json(data, cors, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...cors, "Content-Type": "application/json;charset=UTF-8" },
  });
}

function getContentType(path) {
  const ext = path.split('.').pop().toLowerCase();
  const map = {
    'html': 'text/html;charset=UTF-8',
    'css': 'text/css;charset=UTF-8',
    'js': 'application/javascript;charset=UTF-8',
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'gif': 'image/gif',
    'webp': 'image/webp',
    'svg': 'image/svg+xml',
    'ico': 'image/x-icon',
    'json': 'application/json;charset=UTF-8',
    'woff': 'font/woff',
    'woff2': 'font/woff2',
    'ttf': 'font/ttf',
  };
  return map[ext] || 'application/octet-stream';
}

// =========================================================
// BOT DETECTION
// =========================================================
function isBot(request) {
  const ua = request.headers.get("User-Agent") || "";
  return /Googlebot|Bingbot|Baiduspider|YandexBot|DuckDuckBot|Slurp|facebookexternalhit|Twitterbot|LinkedInBot|WhatsApp|Applebot|AhrefsBot|SemrushBot/i.test(ua);
}

// =========================================================
// SSR RENDERER — Generates full HTML for bots
// =========================================================
function renderHubSSR(gateway, slug, hubTitle, hubDesc, hubIndex) {
  const gatewayName = gateway === "trade" ? "Global Trade" : "Research & Knowledge";
  const fullUrl = `https://royal-chilghoza-pine-nuts.markhor-international-t.workers.dev/${gateway}/${slug}`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${hubTitle} | Royal Chilghoza Pine Nuts</title>
  <meta name="description" content="${hubDesc} — Royal Chilghoza Pine Nuts, Pakistan. چلغوزہ Chilgoza.">
  <meta name="keywords" content="Chilghoza, Chilgoza, Pine Nuts, چلغوزہ, 松子, Royal Chilghoza, ${hubTitle}, Pakistan, Export">
  <link rel="canonical" href="${fullUrl}">
  <meta property="og:title" content="${hubTitle} | Royal Chilghoza Pine Nuts">
  <meta property="og:description" content="${hubDesc}">
  <meta property="og:url" content="${fullUrl}">
  <meta property="og:type" content="article">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; margin: 0; padding: 20px; background: #03140a; color: #f5f1e8; line-height: 1.6; }
    .container { max-width: 800px; margin: 0 auto; padding: 40px 20px; }
    .eyebrow { color: #d4af37; font-size: 0.8rem; letter-spacing: 0.3em; text-transform: uppercase; margin-bottom: 20px; }
    h1 { font-size: 2.5rem; color: #d4af37; margin: 20px 0; line-height: 1.2; }
    .desc { font-size: 1.2rem; color: #8fa89a; margin-bottom: 30px; }
    .content { background: rgba(10, 47, 30, 0.5); padding: 30px; border-radius: 12px; border: 1px solid rgba(212, 175, 55, 0.3); }
    .content p { margin: 15px 0; }
    .cta { display: inline-block; margin-top: 30px; padding: 15px 30px; background: #d4af37; color: #03140a; text-decoration: none; border-radius: 8px; font-weight: 600; }
    .back { display: inline-block; margin-bottom: 20px; color: #d4af37; text-decoration: none; }
    footer { margin-top: 60px; padding-top: 30px; border-top: 1px solid rgba(212, 175, 55, 0.2); color: #8fa89a; font-size: 0.9rem; }
  </style>
</head>
<body>
  <div class="container">
    <a href="/" class="back">← Back to Royal Chilghoza Pine Nuts</a>
    <p class="eyebrow">${gatewayName} · Hub ${String(hubIndex + 1).padStart(2, "0")}</p>
    <h1>${hubTitle}</h1>
    <p class="desc">${hubDesc}</p>
    <div class="content">
      <p><strong>Royal Chilghoza Pine Nuts</strong> — Premium quality Chilghoza Pine Nuts from the native forests of Gilgit-Baltistan, Pakistan.</p>
      <p>${hubDesc}</p>
      <p>For trade inquiries, export documentation, bulk orders, and worldwide shipping, please contact our trade desk directly via WhatsApp.</p>
      <a href="https://wa.me/923336665688?text=${encodeURIComponent("Inquiry about " + hubTitle)}" class="cta">💬 WhatsApp Trade Inquiry</a>
    </div>
    <footer>
      <p><strong>Royal Chilghoza Pine Nuts</strong> — Markhor Global SMC Pvt Ltd</p>
      <p>Chilas, Gilgit-Baltistan, Pakistan · WhatsApp: +92 333 6665688</p>
      <p>© 2026 Royal Chilghoza Pine Nuts. All rights reserved.</p>
    </footer>
  </div>
</body>
</html>`;
}
