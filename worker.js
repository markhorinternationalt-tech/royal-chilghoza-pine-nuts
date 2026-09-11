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
        r2: !!env.MEDIA,
      }, cors);
    }

    // ---- AI Assistant ----
    if (url.pathname === "/api/ai" && request.method === "POST") {
      const { message = "", mode = "visitor", language = "en" } = await request.json();
      if (mode === "admin" && !authorized(request, env)) {
        return json({ reply: "Admin authorization required." }, cors, 401);
      }
      if (!env.AI) {
        return json({
          reply: "Royal AI is ready in the interface. Configure the Cloudflare Workers AI binding to activate live AI responses."
        }, cors);
      }
      const system = mode === "admin"
        ? 'You are the Royal Chilghoza Pine Nuts Admin Assistant. Help the authenticated administrator manage hubs, content, translations, media, Cloudflare R2, SEO, website structure and troubleshooting. Never expose secrets. Always use the exact term "Chilghoza Pine Nuts".'
        : 'You are the Royal Chilghoza Pine Nuts Visitor Assistant. Help visitors with general information about Chilghoza Pine Nuts, trade, quality, forests, research and the website. Do not claim private admin access. Always use the exact term "Chilghoza Pine Nuts".';
      const result = await env.AI.run("@cf/meta/llama-3.1-8b-instruct", {
        messages: [
          { role: "system", content: `${system} Reply in the requested interface language code: ${language}.` },
          { role: "user", content: message }
        ]
      });
      return json({ reply: result.response || "No response." }, cors);
    }

    // ---- Media: List all files ----
    if (url.pathname === "/api/media/list" && request.method === "GET") {
      if (!env.MEDIA) {
        return json({ ok: false, error: "R2 binding MEDIA missing" }, cors, 503);
      }
      const folder = url.searchParams.get("folder") || "";
      try {
        const listed = await env.MEDIA.list({
          prefix: folder ? folder + "/" : "",
          limit: 200
        });
        const files = listed.objects.map(obj => ({
          key: obj.key,
          name: obj.key.split("/").pop(),
          size: obj.size,
          uploaded: obj.uploaded,
          url: `/api/media/${encodeURIComponent(obj.key)}`
        }));
        return json({ ok: true, files }, cors);
      } catch (err) {
        return json({ ok: false, error: err.message }, cors, 500);
      }
    }

    // ---- Media: Get single file ----
    if (url.pathname.startsWith("/api/media/") && request.method === "GET") {
      if (!env.MEDIA) {
        return new Response("R2 binding MEDIA missing", { status: 503, headers: cors });
      }
      const key = decodeURIComponent(url.pathname.slice("/api/media/".length));
      const obj = await env.MEDIA.get(key);
      if (!obj) {
        return new Response("Not found", { status: 404, headers: cors });
      }
      return new Response(obj.body, {
        headers: {
          ...cors,
          "Content-Type": obj.httpMetadata?.contentType || "application/octet-stream",
          "Cache-Control": "public, max-age=86400",
        },
      });
    }

    // ---- Media: Upload ----
    if (url.pathname === "/api/media/upload" && request.method === "POST") {
      if (!authorized(request, env)) {
        return new Response("Unauthorized", { status: 401, headers: cors });
      }
      if (!env.MEDIA) {
        return new Response("R2 binding MEDIA missing", { status: 503, headers: cors });
      }
      const form = await request.formData();
      const file = form.get("file");
      const folder = String(form.get("folder") || "uploads").replace(/[^a-zA-Z0-9/_-]/g, "");
      if (!(file instanceof File)) {
        return new Response("file required", { status: 400, headers: cors });
      }
      const key = `${folder}/${Date.now()}-${file.name}`;
      await env.MEDIA.put(key, file.stream(), {
        httpMetadata: {
          contentType: file.type,
          contentDisposition: `inline; filename="${file.name}"`,
        },
      });
      return json({ ok: true, key, url: `/api/media/${encodeURIComponent(key)}` }, cors);
    }

    // ---- Media: Delete ----
    if (url.pathname.startsWith("/api/media/") && request.method === "DELETE") {
      if (!authorized(request, env)) {
        return new Response("Unauthorized", { status: 401, headers: cors });
      }
      if (!env.MEDIA) {
        return new Response("R2 binding MEDIA missing", { status: 503, headers: cors });
      }
      const key = decodeURIComponent(url.pathname.slice("/api/media/".length));
      await env.MEDIA.delete(key);
      return json({ ok: true }, cors);
    }

    // ---- Admin Status ----
    if (url.pathname === "/api/admin/status") {
      return json({ admin: authorized(request, env) }, cors);
    }

    // ---- Static Assets from GitHub ----
    // ✅ درست شدہ URL — آپ کے اصل GitHub repo کی طرف اشارہ کرتا ہے
    const githubBase = env.GITHUB_RAW_BASE
      || "https://raw.githubusercontent.com/markhorinternationalt-tech/royal-chilghoza-pine-nuts/main/";

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

function authorized(request, env) {
  const token = request.headers.get("Authorization")?.replace(/^Bearer\s+/, "");
  return !!env.ADMIN_TOKEN && token === env.ADMIN_TOKEN;
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
