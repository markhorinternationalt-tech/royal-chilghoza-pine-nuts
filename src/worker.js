// ============================================================
// ROYAL CHILGHOZA PINE NUTS — GLOBAL ECOSYSTEM
// Cloudflare Worker: D1 + R2 + Workers AI + Dynamic Routing
// LANGUAGES: English, Chinese, Arabic, Pashto, Russian
// ============================================================

const LANGUAGES = [
  ["en", "English", "ltr"],
  ["zh", "中文", "ltr"],
  ["ar", "العربية", "rtl"],
  ["ps", "پښتو", "rtl"],
  ["ru", "Русский", "ltr"]
];

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, Cookie",
};

const json = (data, status = 200, headers = {}) =>
  new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      ...corsHeaders,
      ...headers,
    },
  });

const enc = new TextEncoder();

async function sign(value, secret) {
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(value));
  return btoa(String.fromCharCode(...new Uint8Array(sig)))
    .replace(/=+$/, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function cookie(request, name) {
  const raw = request.headers.get("Cookie") || "";
  const m = raw.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));
  return m ? decodeURIComponent(m[1]) : null;
}

async function makeSession(env) {
  if (!env.SESSION_SECRET) throw new Error("SESSION_SECRET is not configured.");
  const raw = `${crypto.randomUUID()}.${Date.now()}`;
  return `rcpn_session=${encodeURIComponent(raw + "." + await sign(raw, env.SESSION_SECRET))}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=28800`;
}

async function authed(request, env) {
  const token = cookie(request, "rcpn_session");
  if (!token || !env.SESSION_SECRET) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const ts = Number(parts[1]);
  if (!ts || Date.now() < ts || Date.now() - ts > 8 * 60 * 60 * 1000) return false;
  return (await sign(`${parts[0]}.${parts[1]}`, env.SESSION_SECRET)) === parts[2];
}

async function audit(env, action, detail = "") {
  try {
    await env.DB.prepare(
      `INSERT INTO audit(action, detail, created_at) VALUES (?, ?, ?)`
    ).bind(
      action,
      typeof detail === "string" ? detail : JSON.stringify(detail),
      new Date().toISOString()
    ).run();
  } catch (e) {
    console.error("Audit logging error:", e.message);
  }
}

async function hasColumn(env, table, column) {
  const rows = await env.DB.prepare(`PRAGMA table_info(${table})`).all();
  return (rows.results || []).some(x => x.name === column);
}

async function addColumn(env, table, column, definition) {
  if (!(await hasColumn(env, table, column))) {
    await env.DB.prepare(`ALTER TABLE ${table} ADD COLUMN ${column} ${definition}`).run();
  }
}

async function init(env) {
  await env.DB.batch([
    env.DB.prepare(`CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY, value TEXT NOT NULL, updated_at TEXT NOT NULL
    )`),
    env.DB.prepare(`CREATE TABLE IF NOT EXISTS folders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      section TEXT NOT NULL, slug TEXT NOT NULL UNIQUE,
      title TEXT NOT NULL, description TEXT NOT NULL DEFAULT '',
      sort_order INTEGER NOT NULL DEFAULT 0,
      status TEXT NOT NULL DEFAULT 'published',
      created_at TEXT NOT NULL, updated_at TEXT NOT NULL
    )`),
    env.DB.prepare(`CREATE TABLE IF NOT EXISTS content (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      folder_id INTEGER, section TEXT NOT NULL,
      title TEXT NOT NULL, description TEXT NOT NULL DEFAULT '',
      body TEXT NOT NULL DEFAULT '', status TEXT NOT NULL DEFAULT 'draft',
      created_at TEXT NOT NULL, updated_at TEXT NOT NULL
    )`),
    env.DB.prepare(`CREATE TABLE IF NOT EXISTS media (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      r2_key TEXT NOT NULL, title TEXT NOT NULL,
      description TEXT NOT NULL DEFAULT '', caption TEXT NOT NULL DEFAULT '',
      section TEXT NOT NULL DEFAULT 'research', folder_id INTEGER,
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL, updated_at TEXT NOT NULL
    )`),
    env.DB.prepare(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL, role TEXT NOT NULL DEFAULT 'editor',
      created_at TEXT NOT NULL
    )`),
    env.DB.prepare(`CREATE TABLE IF NOT EXISTS audit (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      action TEXT NOT NULL, detail TEXT, created_at TEXT NOT NULL
    )`),
    env.DB.prepare(`CREATE TABLE IF NOT EXISTS versions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      content_id INTEGER NOT NULL, snapshot TEXT NOT NULL, created_at TEXT NOT NULL
    )`),
    env.DB.prepare(`CREATE TABLE IF NOT EXISTS translations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      item_type TEXT NOT NULL, item_id INTEGER NOT NULL,
      language TEXT NOT NULL, title TEXT NOT NULL DEFAULT '',
      description TEXT NOT NULL DEFAULT '', body TEXT NOT NULL DEFAULT '',
      updated_at TEXT NOT NULL,
      UNIQUE(item_type, item_id, language)
    )`),
    env.DB.prepare(`CREATE TABLE IF NOT EXISTS homepage_images (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      file_name TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL DEFAULT '',
      caption TEXT NOT NULL DEFAULT '',
      description TEXT NOT NULL DEFAULT '',
      alt_text TEXT NOT NULL DEFAULT '',
      sort_order INTEGER NOT NULL DEFAULT 0,
      visible INTEGER NOT NULL DEFAULT 1,
      source TEXT NOT NULL DEFAULT 'github',
      updated_at TEXT NOT NULL
    )`),
  ]);

  await addColumn(env, "media", "alt_text", "TEXT NOT NULL DEFAULT ''");
  await addColumn(env, "media", "category", "TEXT NOT NULL DEFAULT ''");
  await addColumn(env, "media", "language", "TEXT NOT NULL DEFAULT 'en'");
  await addColumn(env, "media", "status", "TEXT NOT NULL DEFAULT 'published'");
  await addColumn(env, "media", "source", "TEXT NOT NULL DEFAULT 'r2'");

  const now = new Date().toISOString();

  const trade = [
    ["trade", "hub-01", "Global Markets", 1],
    ["trade", "hub-02", "USA Market & Buyers", 2],
    ["trade", "hub-03", "China Market & Buyers", 3],
    ["trade", "hub-04", "Export & Logistics", 4],
    ["trade", "hub-05", "Product & Quality", 5],
    ["trade", "hub-06", "Supply Chain & Traceability", 6],
    ["trade", "hub-07", "Geographical Indication (GI)", 7],
    ["trade", "hub-08", "Organic Chemistry & Natural Quality", 8],
    ["trade", "hub-09", "Processing, Packaging & Value Addition", 9],
    ["trade", "hub-10", "Sustainable & Ethical Trade", 10]
  ];

  const research = [
    ["research", "res-01", "Geographical Origin & GI Research", 1],
    ["research", "res-02", "Chilgoza Biology & Botany", 2],
    ["research", "res-03", "Nutrition Value & Natural Composition", 3],
    ["research", "res-04", "Chilgoza Forests & Ecology", 4],
    ["research", "res-05", "Biodiversity & Wildlife", 5],
    ["research", "res-06", "Climate & Global Green Environment", 6],
    ["research", "res-07", "Forest Conservation & Restoration", 7],
    ["research", "res-08", "Supply Chain & Community Livelihoods", 8],
    ["research", "res-09", "Sustainable Harvesting & Community Awareness", 9],
    ["research", "res-10", "Research, Policy & Partnerships", 10]
  ];

  for (const [section, slug, title, order] of [...trade, ...research]) {
    await env.DB.prepare(`
      INSERT OR IGNORE INTO folders(section,slug,title,description,sort_order,status,created_at,updated_at)
      VALUES(?,?,?,?,?,'published',?,?)
    `).bind(section, slug, title, "", order, now, now).run();
  }

  const home = [
    ["01-chilghoza-lot.jpg", "Chilghoza Lot", "Premium Chilghoza lot from Pakistan", "Chilghoza lot", 1],
    ["02-chilghoza-cones.jpg", "Chilghoza Cones", "Chilghoza pine cones", "Chilghoza cones", 2],
    ["03-chilghoza-kernel.jpg", "Chilghoza Kernel", "Chilghoza pine nut kernel", "Chilghoza kernel", 3],
    ["04-chilghoza-harvest.jpg", "Chilghoza Harvest", "Chilghoza harvest scene", "Chilghoza harvest", 4],
    ["05-chilghoza-raw-kernels.jpg", "Raw Chilghoza Kernels", "Raw kernels ready for grading and trade", "Raw Chilghoza kernels", 5],
    ["06-chilghoza-cone-closeup.jpg", "Chilghoza Cone Close-up", "Close view of Chilghoza cone", "Chilghoza cone close-up", 6],
    ["07-chilghoza-products-display.jpg", "Chilghoza Products", "Chilghoza product presentation", "Chilghoza products", 7],
    ["08-chilghoza-forest.jpg", "Chilghoza Forest", "Chilghoza forest landscape", "Chilghoza forest", 8]
  ];

  for (const [file, title, desc, alt, order] of home) {
    await env.DB.prepare(`
      INSERT OR IGNORE INTO homepage_images(file_name,title,caption,description,alt_text,sort_order,visible,source,updated_at)
      VALUES(?,?,?,?,?,?,1,'github',?)
    `).bind(file, title, title, desc, alt, order, now).run();
  }
}

function validLanguage(code) {
  return LANGUAGES.some(x => x[0] === code);
}

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    const url = new URL(request.url);

    if (url.pathname.startsWith("/api/")) {
      try { await init(env); }
      catch (e) { return json({ error: "D1 initialization failed.", detail: e.message }, 503); }

      if (url.pathname === "/api/languages" && request.method === "GET") {
        return json({ items: LANGUAGES.map(([code, name, dir]) => ({ code, name, dir })) });
      }

      if (url.pathname === "/api/me" && request.method === "GET") {
        return json({ auth: await authed(request, env), role: (await authed(request, env)) ? "owner" : null });
      }

      if (url.pathname === "/api/login" && request.method === "POST") {
        try {
          const data = await request.json();
          const username = String(data.username || "").trim();
          const password = String(data.password || "");
          if (username !== "admin" || !env.ADMIN_PASSWORD || password !== env.ADMIN_PASSWORD) {
            await audit(env, "login.failed", { username });
            return json({ error: "Invalid username or password." }, 401);
          }
          await env.DB.prepare(`INSERT OR IGNORE INTO users(username,role,created_at) VALUES('admin','owner',?)`)
            .bind(new Date().toISOString()).run();
          await audit(env, "login.success", { username });
          return json({ auth: true, role: "owner", message: "Signed in successfully." }, 200, {
            "Set-Cookie": await makeSession(env)
          });
        } catch { return json({ error: "Invalid login request." }, 400); }
      }

      if (url.pathname === "/api/logout" && request.method === "POST") {
        return json({ ok: true }, 200, {
          "Set-Cookie": "rcpn_session=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0"
        });
      }

      if (url.pathname === "/api/home-images" && request.method === "GET") {
        const r = await env.DB.prepare(`SELECT * FROM homepage_images WHERE visible=1 ORDER BY sort_order,id`).all();
        return json({ items: r.results || [] });
      }

      if (url.pathname === "/api/folders" && request.method === "GET") {
        const section = url.searchParams.get("section");
        const q = section
          ? env.DB.prepare(`SELECT * FROM folders WHERE section=? AND status='published' ORDER BY sort_order,id`).bind(section)
          : env.DB.prepare(`SELECT * FROM folders WHERE status='published' ORDER BY section,sort_order,id`);
        const r = await q.all();
        return json({ items: r.results || [] });
      }

      if (url.pathname === "/api/ai" && request.method === "POST") {
        if (!env.AI) return json({ error: "Workers AI binding is not configured." }, 503);
        const d = await request.json(), text = String(d.text || "").trim();
        if (!text) return json({ error: "Please provide text for Royal AI." }, 400);
        const language = validLanguage(String(d.language || "en")) ? String(d.language) : "en";
        const prompt = `You are Royal AI Assistant for Royal Chilghoza Pine Nuts.
Language: ${language}.
Analyze or polish the following text:
${text}`;
        const output = await env.AI.run("@cf/meta/llama-3.1-8b-instruct", { prompt, max_tokens: 1200 });
        await audit(env, "ai.request", { language });
        return json({ result: output?.response || output });
      }

      return json({ error: "API route not found." }, 404);
    }

    const response = await env.ASSETS.fetch(request);
    if (response.status !== 404) return response;

    return env.ASSETS.fetch(new Request(new URL("/index.html", request.url), request));
  }
};
