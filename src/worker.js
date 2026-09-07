export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const cors = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    };

    // Handle preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: cors });
    }

    // ---- API ROUTES ----

    // Health check
    if (url.pathname === "/api/health") {
      return json({
        ok: true,
        service: "Royal Chilghoza Pine Nuts Worker",
        ai: !!env.AI,
        r2: !!env.MEDIA,
      }, cors);
    }

    // AI endpoint
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

    // Media GET (serve from R2)
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

    // Media upload
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

    // Media delete
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

    // Admin status
    if (url.pathname === "/api/admin/status") {
      return json({ admin: authorized(request, env) }, cors);
    }

    // ---- STATIC ASSETS (SERVE FROM R2) ----
    // If the request is for a known static file (images, css, js, html)
    // we attempt to serve it from R2 bucket named "assets" or root.
    // We assume all static files are in the R2 bucket with the same name.
    // If not found, return 404.
    const assetKey = url.pathname.slice(1); // remove leading slash
    if (assetKey && env.MEDIA) {
      // Allowed extensions
      const allowed = /\.(jpg|jpeg|png|gif|webp|svg|css|js|html|ico|json)$/i;
      if (allowed.test(assetKey)) {
        const obj = await env.MEDIA.get(assetKey);
        if (obj) {
          return new Response(obj.body, {
            headers: {
              "Content-Type": obj.httpMetadata?.contentType || "application/octet-stream",
              "Cache-Control": "public, max-age=86400",
              ...cors,
            },
          });
        }
      }
    }

    // If nothing matches, return a 404 (or a fallback HTML)
    return new Response("Royal Chilghoza Pine Nuts Worker — asset not found", { status: 404, headers: cors });
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
