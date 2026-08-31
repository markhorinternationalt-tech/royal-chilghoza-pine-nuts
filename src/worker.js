// ============================================================
// ROYAL CHILGHOZA PINE NUTS
// Cloudflare Worker — D1 + R2 + Workers AI
// FINAL MASTER BUILD
// ============================================================

const LANGUAGES = [
  ["en", "English", "ltr"],
  ["zh", "中文", "ltr"],
  ["ur", "اردو", "rtl"],
  ["ps", "پښتو", "rtl"],
  ["fa", "فارسی / دری", "rtl"],
  ["ru", "Русский", "ltr"],
  ["id", "Bahasa Indonesia", "ltr"],
  ["ms", "Bahasa Melayu", "ltr"],
  ["ar", "العربية", "rtl"],
];

const json = (data, status = 200, headers = {}) =>
  new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
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
  await env.DB.prepare(
    `INSERT INTO audit(action, detail, created_at) VALUES (?, ?, ?)`
  ).bind(
    action,
    typeof detail === "string" ? detail : JSON.stringify(detail),
    new Date().toISOString()
  ).run();
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

  // Backward-compatible schema upgrades. Existing D1 data is preserved.
  await addColumn(env, "media", "alt_text", "TEXT NOT NULL DEFAULT ''");
  await addColumn(env, "media", "category", "TEXT NOT NULL DEFAULT ''");
  await addColumn(env, "media", "language", "TEXT NOT NULL DEFAULT 'en'");
  await addColumn(env, "media", "status", "TEXT NOT NULL DEFAULT 'published'");
  await addColumn(env, "media", "source", "TEXT NOT NULL DEFAULT 'r2'");

  const now = new Date().toISOString();

  const research = [
    ["research","geographical-indication","Geographical Indication (GI)",1],
    ["research","chilghoza-forests","Chilghoza Forests",2],
    ["research","global-environment-climate","Global Environment & Climate",3],
    ["research","organic-natural-product-claims","Organic & Natural Product Claims",4],
    ["research","chilghoza-biology-botany","Chilghoza Biology & Botany",5],
    ["research","biodiversity-ecosystem","Biodiversity & Ecosystem",6],
    ["research","harvesting-traditional-knowledge","Harvesting & Traditional Knowledge",7],
    ["research","nutrition-health-research","Nutrition & Health Research",8],
    ["research","forest-conservation-regeneration","Forest Conservation & Regeneration",9],
    ["research","communities-livelihoods","Communities & Livelihoods",10],
    ["research","traceability-origin-evidence","Traceability & Origin Evidence",11],
    ["research","publications-scientific-resources","Publications & Scientific Resources",12],
    ["research","international-projects-partnerships","International Projects & Partnerships",13],
  ];
  const trade = [
    ["trade","quality-grading","Quality & Grading",1],
    ["trade","export-logistics","Export & Logistics",2],
    ["trade","market-trends-pricing","Market Trends & Pricing",3],
    ["trade","responsible-supply-chain","Responsible Supply Chain",4],
    ["trade","products-packaging","Products & Packaging",5],
    ["trade","buyer-requirements-specifications","Buyer Requirements & Specifications",6],
    ["trade","processing-food-safety","Processing & Food Safety",7],
    ["trade","certifications-compliance","Certifications & Compliance",8],
    ["trade","markets-global-buyers","Markets & Global Buyers",9],
    ["trade","trade-documents-resources","Trade Documents & Resources",10],
  ];

  for (const [section, slug, title, order] of [...research, ...trade]) {
    await env.DB.prepare(`
      INSERT OR IGNORE INTO folders(section,slug,title,description,sort_order,status,created_at,updated_at)
      VALUES(?,?,?,?,?,'published',?,?)
    `).bind(section, slug, title, "", order, now, now).run();
  }

  const home = [
    ["01-chilghoza-lot.jpg","Chilghoza Lot","Premium Chilghoza lot from Pakistan","Chilghoza lot",1],
    ["02-chilghoza-cones.jpg","Chilghoza Cones","Chilghoza pine cones","Chilghoza cones",2],
    ["03-chilghoza-kernel.jpg","Chilghoza Kernel","Chilghoza pine nut kernel","Chilghoza kernel",3],
    ["04-chilghoza-harvest.jpg","Chilghoza Harvest","Chilghoza harvest scene","Chilghoza harvest",4],
    ["05-chilghoza-raw-kernels.jpg","Raw Chilghoza Kernels","Raw kernels ready for grading and trade","Raw Chilghoza kernels",5],
    ["06-chilghoza-cone-closeup.jpg","Chilghoza Cone Close-up","Close view of Chilghoza cone","Chilghoza cone close-up",6],
    ["07-chilghoza-products-display.jpg","Chilghoza Products","Chilghoza product presentation","Chilghoza products",7],
    ["08-chilghoza-forest.jpg","Chilghoza Forest","Chilghoza forest landscape","Chilghoza forest",8],
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

async function publicFolders(env, section) {
  const q = section
    ? env.DB.prepare(`SELECT * FROM folders WHERE section=? AND status='published' ORDER BY sort_order,id`)
        .bind(section)
    : env.DB.prepare(`SELECT * FROM folders WHERE status='published' ORDER BY section,sort_order,id`);
  const r = await q.all();
  return r.results || [];
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/api/")) {
      try { await init(env); }
      catch (e) { return json({ error: "D1 initialization failed.", detail: e.message }, 503); }

      if (url.pathname === "/api/me" && request.method === "GET")
        return json({ auth: await authed(request, env), role: (await authed(request, env)) ? "owner" : null });

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

      if (url.pathname === "/api/languages" && request.method === "GET")
        return json({ items: LANGUAGES.map(([code,name,dir]) => ({code,name,dir})) });

      if (url.pathname === "/api/home-images" && request.method === "GET") {
        const r = await env.DB.prepare(`SELECT * FROM homepage_images WHERE visible=1 ORDER BY sort_order,id`).all();
        return json({ items: r.results || [] });
      }

      if (url.pathname === "/api/home-images/admin" && request.method === "GET") {
        if (!(await authed(request, env))) return json({ error: "Unauthorized" }, 401);
        const r = await env.DB.prepare(`SELECT * FROM homepage_images ORDER BY sort_order,id`).all();
        return json({ items: r.results || [] });
      }

      if (url.pathname.startsWith("/api/home-images/") && request.method === "PATCH") {
        if (!(await authed(request, env))) return json({ error: "Unauthorized" }, 401);
        const id = Number(url.pathname.split("/").pop());
        const old = await env.DB.prepare(`SELECT * FROM homepage_images WHERE id=?`).bind(id).first();
        if (!old) return json({ error: "Homepage image not found." }, 404);
        const d = await request.json();
        await env.DB.prepare(`
          UPDATE homepage_images SET title=?,caption=?,description=?,alt_text=?,sort_order=?,visible=?,updated_at=? WHERE id=?
        `).bind(
          d.title ?? old.title, d.caption ?? old.caption, d.description ?? old.description,
          d.alt_text ?? old.alt_text, d.sort_order ?? old.sort_order,
          d.visible === undefined ? old.visible : (d.visible ? 1 : 0),
          new Date().toISOString(), id
        ).run();
        await audit(env, "homepage_image.update", { id });
        return json({ ok: true });
      }

      if (url.pathname === "/api/settings/theme") {
        if (request.method === "GET") {
          const row = await env.DB.prepare(`SELECT value FROM settings WHERE key='theme'`).first();
          return json({ theme: row ? JSON.parse(row.value) : null });
        }
        if (request.method === "PUT") {
          if (!(await authed(request, env))) return json({ error: "Unauthorized" }, 401);
          const theme = await request.json();
          await env.DB.prepare(`
            INSERT INTO settings(key,value,updated_at) VALUES('theme',?,?)
            ON CONFLICT(key) DO UPDATE SET value=excluded.value,updated_at=excluded.updated_at
          `).bind(JSON.stringify(theme), new Date().toISOString()).run();
          await audit(env, "theme.update", theme);
          return json({ ok: true, theme });
        }
      }

      if (url.pathname === "/api/folders" && request.method === "GET")
        return json({ items: await publicFolders(env, url.searchParams.get("section")) });

      if (url.pathname === "/api/folders" && request.method === "POST") {
        if (!(await authed(request, env))) return json({ error: "Unauthorized" }, 401);
        const d = await request.json();
        const title = String(d.title || "").trim();
        if (!title) return json({ error: "Folder title is required." }, 400);
        const section = d.section === "trade" ? "trade" : "research";
        const slug = (String(d.slug || title).toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"") || `folder-${Date.now()}`) + "-" + Date.now();
        const now = new Date().toISOString();
        const r = await env.DB.prepare(`
          INSERT INTO folders(section,slug,title,description,sort_order,status,created_at,updated_at)
          VALUES(?,?,?,?,?,?,?,?)
        `).bind(section, slug, title, d.description || "", Number(d.sort_order || 0), d.status || "published", now, now).run();
        await audit(env, "folder.create", { id:r.meta.last_row_id,title,section });
        return json({ ok:true,id:r.meta.last_row_id },201);
      }

      if (url.pathname.startsWith("/api/folders/") && ["PATCH","DELETE"].includes(request.method)) {
        if (!(await authed(request, env))) return json({ error:"Unauthorized" },401);
        const id = Number(url.pathname.split("/").pop());
        const row = await env.DB.prepare(`SELECT * FROM folders WHERE id=?`).bind(id).first();
        if (!row) return json({ error:"Folder not found." },404);
        if (request.method === "PATCH") {
          const d = await request.json();
          await env.DB.prepare(`
            UPDATE folders SET section=?,title=?,description=?,sort_order=?,status=?,updated_at=? WHERE id=?
          `).bind(
            d.section ?? row.section, d.title ?? row.title, d.description ?? row.description,
            d.sort_order ?? row.sort_order, d.status ?? row.status, new Date().toISOString(), id
          ).run();
          await audit(env,"folder.update",{id});
          return json({ok:true});
        }
        await env.DB.prepare(`UPDATE media SET folder_id=NULL WHERE folder_id=?`).bind(id).run();
        await env.DB.prepare(`DELETE FROM content WHERE folder_id=?`).bind(id).run();
        await env.DB.prepare(`DELETE FROM folders WHERE id=?`).bind(id).run();
        await audit(env,"folder.delete",{id});
        return json({ok:true});
      }

      if (url.pathname === "/api/content" && request.method === "GET") {
        if (!(await authed(request,env))) return json({error:"Unauthorized"},401);
        const r = await env.DB.prepare(`SELECT * FROM content ORDER BY id DESC LIMIT 500`).all();
        return json({items:r.results||[]});
      }

      if (url.pathname === "/api/content" && request.method === "POST") {
        if (!(await authed(request,env))) return json({error:"Unauthorized"},401);
        const d = await request.json(), now = new Date().toISOString();
        const r = await env.DB.prepare(`
          INSERT INTO content(folder_id,section,title,description,body,status,created_at,updated_at)
          VALUES(?,?,?,?,?,?,?,?)
        `).bind(d.folder_id||null,d.section||"research",d.title||"",d.description||"",d.body||"",d.status||"draft",now,now).run();
        await audit(env,"content.create",{id:r.meta.last_row_id});
        return json({ok:true,id:r.meta.last_row_id},201);
      }

      if (url.pathname.startsWith("/api/content/") && ["PATCH","DELETE"].includes(request.method)) {
        if (!(await authed(request,env))) return json({error:"Unauthorized"},401);
        const id = Number(url.pathname.split("/").pop());
        const old = await env.DB.prepare(`SELECT * FROM content WHERE id=?`).bind(id).first();
        if (!old) return json({error:"Content not found."},404);
        if (request.method === "PATCH") {
          await env.DB.prepare(`INSERT INTO versions(content_id,snapshot,created_at) VALUES(?,?,?)`)
            .bind(id,JSON.stringify(old),new Date().toISOString()).run();
          const d = await request.json();
          await env.DB.prepare(`
            UPDATE content SET folder_id=?,section=?,title=?,description=?,body=?,status=?,updated_at=? WHERE id=?
          `).bind(
            d.folder_id ?? old.folder_id,d.section ?? old.section,d.title ?? old.title,
            d.description ?? old.description,d.body ?? old.body,d.status ?? old.status,
            new Date().toISOString(),id
          ).run();
          await audit(env,"content.update",{id});
          return json({ok:true});
        }
        await env.DB.prepare(`DELETE FROM content WHERE id=?`).bind(id).run();
        await audit(env,"content.delete",{id});
        return json({ok:true});
      }

      if (url.pathname === "/api/media/public" && request.method === "GET") {
        const r = await env.DB.prepare(`
          SELECT id,r2_key,title,description,caption,section,folder_id,sort_order,alt_text,category,language,status,source
          FROM media WHERE status='published' ORDER BY sort_order,id DESC LIMIT 500
        `).all();
        return json({items:r.results||[]});
      }

      if (url.pathname === "/api/media" && request.method === "GET") {
        if (!(await authed(request,env))) return json({error:"Unauthorized"},401);
        const r = await env.DB.prepare(`SELECT * FROM media ORDER BY sort_order,id DESC LIMIT 500`).all();
        return json({items:r.results||[]});
      }

      if (url.pathname === "/api/media" && request.method === "POST") {
        if (!(await authed(request,env))) return json({error:"Unauthorized"},401);
        if (!env.MEDIA) return json({error:"R2 MEDIA binding is not configured."},503);
        const form = await request.formData(), file = form.get("file");
        if (!(file instanceof File)) return json({error:"No file supplied."},400);
        if (file.size > 50 * 1024 * 1024) return json({error:"Maximum file size is 50 MB."},413);
        const safe = (file.name || "upload").replace(/[^a-zA-Z0-9._-]/g,"_");
        const key = `media/${Date.now()}-${crypto.randomUUID()}-${safe}`;
        await env.MEDIA.put(key,file.stream(),{httpMetadata:{contentType:file.type||"application/octet-stream"}});
        const now = new Date().toISOString();
        const r = await env.DB.prepare(`
          INSERT INTO media(r2_key,title,description,caption,section,folder_id,sort_order,created_at,updated_at,alt_text,category,language,status,source)
          VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)
        `).bind(
          key,String(form.get("title")||safe),String(form.get("description")||""),
          String(form.get("caption")||""),String(form.get("section")||"research"),
          form.get("folder_id") ? Number(form.get("folder_id")) : null,
          Number(form.get("sort_order")||0),now,now,String(form.get("alt_text")||safe),
          String(form.get("category")||""),String(form.get("language")||"en"),"published","r2"
        ).run();
        await audit(env,"media.upload",{id:r.meta.last_row_id,key});
        return json({ok:true,id:r.meta.last_row_id,key},201);
      }

      if (url.pathname.startsWith("/api/media/") && ["PATCH","DELETE"].includes(request.method)) {
        if (!(await authed(request,env))) return json({error:"Unauthorized"},401);
        const id = Number(url.pathname.split("/").pop());
        const old = await env.DB.prepare(`SELECT * FROM media WHERE id=?`).bind(id).first();
        if (!old) return json({error:"Media not found."},404);
        if (request.method === "PATCH") {
          const d = await request.json();
          await env.DB.prepare(`
            UPDATE media SET title=?,description=?,caption=?,section=?,folder_id=?,sort_order=?,alt_text=?,category=?,language=?,status=?,updated_at=? WHERE id=?
          `).bind(
            d.title ?? old.title,d.description ?? old.description,d.caption ?? old.caption,
            d.section ?? old.section,d.folder_id ?? old.folder_id,d.sort_order ?? old.sort_order,
            d.alt_text ?? old.alt_text,d.category ?? old.category,d.language ?? old.language,
            d.status ?? old.status,new Date().toISOString(),id
          ).run();
          await audit(env,"media.update",{id});
          return json({ok:true});
        }
        if (env.MEDIA && old.r2_key) await env.MEDIA.delete(old.r2_key);
        await env.DB.prepare(`DELETE FROM media WHERE id=?`).bind(id).run();
        await audit(env,"media.delete",{id,key:old.r2_key});
        return json({ok:true});
      }

      if (url.pathname.startsWith("/api/media/file/") && request.method === "GET") {
        if (!env.MEDIA) return new Response("R2 not configured.",{status:503});
        const key = decodeURIComponent(url.pathname.slice("/api/media/file/".length));
        const object = await env.MEDIA.get(key);
        if (!object) return new Response("Not found",{status:404});
        const headers = new Headers();
        object.writeHttpMetadata(headers);
        headers.set("etag",object.httpEtag);
        headers.set("cache-control","public, max-age=31536000, immutable");
        return new Response(object.body,{headers});
      }

      if (url.pathname === "/api/translations" && request.method === "GET") {
        const language = url.searchParams.get("language"), itemType = url.searchParams.get("item_type"), itemId = Number(url.searchParams.get("item_id"));
        if (!language || !itemType || !itemId || !validLanguage(language)) return json({error:"Invalid translation query."},400);
        const row = await env.DB.prepare(`SELECT * FROM translations WHERE item_type=? AND item_id=? AND language=?`).bind(itemType,itemId,language).first();
        return json({translation:row||null});
      }

      if (url.pathname === "/api/translations" && request.method === "PUT") {
        if (!(await authed(request,env))) return json({error:"Unauthorized"},401);
        const d = await request.json(), language=String(d.language||"");
        const itemType=String(d.item_type||""), itemId=Number(d.item_id);
        if (!validLanguage(language)||!itemType||!itemId) return json({error:"Invalid translation data."},400);
        const now = new Date().toISOString();
        await env.DB.prepare(`
          INSERT INTO translations(item_type,item_id,language,title,description,body,updated_at)
          VALUES(?,?,?,?,?,?,?)
          ON CONFLICT(item_type,item_id,language) DO UPDATE SET
            title=excluded.title,description=excluded.description,body=excluded.body,updated_at=excluded.updated_at
        `).bind(itemType,itemId,language,d.title||"",d.description||"",d.body||"",now).run();
        await audit(env,"translation.update",{itemType,itemId,language});
        return json({ok:true});
      }

      if (url.pathname === "/api/audit" && request.method === "GET") {
        if (!(await authed(request,env))) return json({error:"Unauthorized"},401);
        const r=await env.DB.prepare(`SELECT * FROM audit ORDER BY id DESC LIMIT 300`).all();
        return json({items:r.results||[]});
      }

      if (url.pathname === "/api/versions" && request.method === "GET") {
        if (!(await authed(request,env))) return json({error:"Unauthorized"},401);
        const id=Number(url.searchParams.get("content_id"));
        const r=await env.DB.prepare(`SELECT * FROM versions WHERE content_id=? ORDER BY id DESC LIMIT 100`).bind(id).all();
        return json({items:r.results||[]});
      }

      if (url.pathname === "/api/ai" && request.method === "POST") {
        // Royal AI is intentionally user-facing; admin-only write operations remain protected.
        if (!env.AI) return json({error:"Workers AI binding is not configured."},503);
        const d=await request.json(), text=String(d.text||"").trim();
        if (!text) return json({error:"Please provide text for Royal AI."},400);
        const language=validLanguage(String(d.language||"en")) ? String(d.language) : "en";
        const mode=String(d.mode||"improve");
        const instructions={
          improve:"Improve grammar, clarity and professional style without changing facts.",
          summary:"Create a concise factual summary.",
          buyer:"Rewrite for an international buyer. Never invent prices, quantities, certifications or claims.",
          translate:"Translate faithfully into the requested language and preserve names, numbers and technical terms.",
          research:"Organize as a research draft and distinguish facts from claims requiring verification.",
          website:"Create polished website wording while preserving factual accuracy."
        };
        const prompt=`You are Royal AI Assistant for Royal Chilghoza Pine Nuts.
Never invent facts, certifications, prices or statistics. Human review is required before publication.
Requested language: ${language}.
Task: ${instructions[mode]||instructions.improve}
Source:
${text}`;
        const output=await env.AI.run("@cf/meta/llama-3.1-8b-instruct",{prompt,max_tokens:Math.min(Number(d.max_tokens||1200),2000)});
        await audit(env,"ai.request",{mode,language});
        return json({result:output?.response||output});
      }

      return json({error:"API route not found."},404);
    }

    // Language-aware SEO metadata on the same static app.
    const response = await env.ASSETS.fetch(request);
    if (response.status !== 404) return response;

    return env.ASSETS.fetch(new Request(new URL("/index.html",request.url),request));
  }
};
