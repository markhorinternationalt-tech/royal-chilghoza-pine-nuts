// =========================================================
// ROYAL CHILGHOZA PINE NUTS — CLOUDFLARE WORKER
// With Cloudinary Integration (25GB Free Storage)
// =========================================================

const CLOUDINARY_CLOUD_NAME = "agnhxdu4";
const CLOUDINARY_API_KEY = "118953582795868";
const CLOUDINARY_API_SECRET = "bHpg060YsexAgpP4cTVTs227Io0";

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
        cloudinary: true,
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
        ? 'You are the Royal Chilghoza Pine Nuts Admin Assistant. Help the authenticated administrator manage hubs, content, translations, media, Cloudinary, SEO, website structure and troubleshooting. Never expose secrets. Always use the exact term "Chilghoza Pine Nuts".'
        : 'You are the Royal Chilghoza Pine Nuts Visitor Assistant. Help visitors with general information about Chilghoza Pine Nuts, trade, quality, forests, research and the website. Do not claim private admin access. Always use the exact term "Chilghoza Pine Nuts".';
      const result = await env.AI.run("@cf/meta/llama-3.1-8b-instruct", {
        messages: [
          { role: "system", content: `${system} Reply in the requested interface language code: ${language}.` },
          { role: "user", content: message }
        ]
      });
      return json({ reply: result.response || "No response." }, cors);
    }

    // ---- Cloudinary: Upload ----
    if (url.pathname === "/api/media/upload" && request.method === "POST") {
      if (!authorized(request, env)) {
        return new Response("Unauthorized", { status: 401, headers: cors });
      }
      try {
        const form = await request.formData();
        const file = form.get("file");
        const folder = String(form.get("folder") || "general").replace(/[^a-zA-Z0-9/_-]/g, "");
        const description = String(form.get("description") || "");
        const title = String(form.get("title") || "");

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
        if (description) uploadForm.append("context", `description=${description}`);
        if (title) uploadForm.append("display_name", title);

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

    // ---- Cloudinary: Create Folder ----
    if (url.pathname === "/api/media/folder" && request.method === "POST") {
      if (!authorized(request, env)) {
        return new Response("Unauthorized", { status: 401, headers: cors });
      }
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

    // ---- Cloudinary: Delete ----
    if (url.pathname.startsWith("/api/media/") && request.method === "DELETE") {
      if (!authorized(request, env)) {
        return new Response("Unauthorized", { status: 401, headers: cors });
      }
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

    // ---- Admin Status ----
    if (url.pathname === "/api/admin/status") {
      return json({ admin: authorized(request, env) }, cors);
    }

    // ---- Fallback: GitHub Raw ----
    const githubBase = env.GITHUB_RAW_BASE
      || "https://raw.githubusercontent.com/markhor/markhorinternational-test/upgrade-v1/";

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
