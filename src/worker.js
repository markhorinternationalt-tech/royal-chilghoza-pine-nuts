// ============================================================
// ROYAL CHILGHOZA PINE NUTS
// Cloudflare Worker — API + D1 + R2 + Workers AI
// ============================================================

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

  const sig = await crypto.subtle.sign(
    "HMAC",
    key,
    enc.encode(value)
  );

  return btoa(String.fromCharCode(...new Uint8Array(sig)))
    .replace(/=+$/, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

async function sessionCookie(env) {
  const raw = crypto.randomUUID() + "." + Date.now();
  const secret = env.SESSION_SECRET;

  if (!secret) {
    throw new Error("SESSION_SECRET is not configured.");
  }

  const sig = await sign(raw, secret);

  return [
    `rcpn_session=${raw}.${sig}`,
    "Path=/",
    "HttpOnly",
    "Secure",
    "SameSite=Lax",
    "Max-Age=28800",
  ].join("; ");
}

function getCookie(request, name) {
  const cookies = request.headers.get("Cookie") || "";

  const match = cookies.match(
    new RegExp(`(?:^|;\\s*)${name}=([^;]+)`)
  );

  return match ? match[1] : null;
}

async function authed(request, env) {
  const token = getCookie(request, "rcpn_session");

  if (!token || !env.SESSION_SECRET) return false;

  const parts = token.split(".");

  if (parts.length !== 3) return false;

  const raw = `${parts[0]}.${parts[1]}`;
  const suppliedSig = parts[2];

  const timestamp = Number(parts[1]);

  if (!timestamp) return false;

  // 8-hour session
  if (Date.now() - timestamp > 8 * 60 * 60 * 1000) {
    return false;
  }

  if (Date.now() < timestamp) {
    return false;
  }

  const expectedSig = await sign(
    raw,
    env.SESSION_SECRET
  );

  return expectedSig === suppliedSig;
}


// ============================================================
// DATABASE INITIALIZATION
// ============================================================

async function init(env) {
  await env.DB.batch([

    env.DB.prepare(`
      CREATE TABLE IF NOT EXISTS settings (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL,
        updated_at TEXT NOT NULL
      )
    `),

    env.DB.prepare(`
      CREATE TABLE IF NOT EXISTS folders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        section TEXT NOT NULL,
        slug TEXT NOT NULL UNIQUE,
        title TEXT NOT NULL,
        description TEXT NOT NULL DEFAULT '',
        sort_order INTEGER NOT NULL DEFAULT 0,
        status TEXT NOT NULL DEFAULT 'published',
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      )
    `),

    env.DB.prepare(`
      CREATE TABLE IF NOT EXISTS content (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        folder_id INTEGER,
        section TEXT NOT NULL,
        title TEXT NOT NULL,
        description TEXT NOT NULL DEFAULT '',
        body TEXT NOT NULL DEFAULT '',
        status TEXT NOT NULL DEFAULT 'draft',
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      )
    `),

    env.DB.prepare(`
      CREATE TABLE IF NOT EXISTS media (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        r2_key TEXT NOT NULL,
        title TEXT NOT NULL,
        description TEXT NOT NULL DEFAULT '',
        caption TEXT NOT NULL DEFAULT '',
        section TEXT NOT NULL DEFAULT 'research',
        folder_id INTEGER,
        sort_order INTEGER NOT NULL DEFAULT 0,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      )
    `),

    env.DB.prepare(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        role TEXT NOT NULL DEFAULT 'editor',
        created_at TEXT NOT NULL
      )
    `),

    env.DB.prepare(`
      CREATE TABLE IF NOT EXISTS audit (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        action TEXT NOT NULL,
        detail TEXT,
        created_at TEXT NOT NULL
      )
    `),

    env.DB.prepare(`
      CREATE TABLE IF NOT EXISTS versions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        content_id INTEGER NOT NULL,
        snapshot TEXT NOT NULL,
        created_at TEXT NOT NULL
      )
    `),

    env.DB.prepare(`
      CREATE TABLE IF NOT EXISTS translations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        item_type TEXT NOT NULL,
        item_id INTEGER NOT NULL,
        language TEXT NOT NULL,
        title TEXT NOT NULL DEFAULT '',
        description TEXT NOT NULL DEFAULT '',
        body TEXT NOT NULL DEFAULT '',
        updated_at TEXT NOT NULL,
        UNIQUE(item_type, item_id, language)
      )
    `),

  ]);
}


// ============================================================
// AUDIT
// ============================================================

async function audit(env, action, detail = "") {
  await env.DB.prepare(`
    INSERT INTO audit(action, detail, created_at)
    VALUES (?, ?, ?)
  `)
    .bind(
      action,
      typeof detail === "string"
        ? detail
        : JSON.stringify(detail),
      new Date().toISOString()
    )
    .run();
}


// ============================================================
// MAIN WORKER
// ============================================================

export default {

  async fetch(request, env) {

    const url = new URL(request.url);

    // --------------------------------------------------------
    // API
    // --------------------------------------------------------

    if (url.pathname.startsWith("/api/")) {

      try {
        await init(env);
      } catch (error) {
        return json({
          error:
            "D1 database is not ready. Please bind the D1 database.",
          detail: error.message,
        }, 503);
      }


      // ======================================================
      // SESSION
      // ======================================================

      if (
        url.pathname === "/api/me" &&
        request.method === "GET"
      ) {
        return json({
          auth: await authed(request, env),
        });
      }


      if (
        url.pathname === "/api/logout" &&
        request.method === "POST"
      ) {
        return json(
          {
            ok: true,
            message: "Signed out.",
          },
          200,
          {
            "Set-Cookie":
              "rcpn_session=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0",
          }
        );
      }


      // ======================================================
      // LOGIN
      // ======================================================

      if (
        url.pathname === "/api/login" &&
        request.method === "POST"
      ) {

        try {

          const data = await request.json();

          const username = String(
            data.username || ""
          ).trim();

          const password = String(
            data.password || ""
          );

          const expectedPassword =
            env.ADMIN_PASSWORD || "";

          if (
            username !== "admin" ||
            !expectedPassword ||
            password !== expectedPassword
          ) {

            await audit(
              env,
              "login.failed",
              { username }
            );

            return json({
              error: "Invalid username or password.",
            }, 401);
          }


          await env.DB.prepare(`
            INSERT OR IGNORE INTO users
            (username, role, created_at)
            VALUES ('admin', 'owner', ?)
          `)
            .bind(new Date().toISOString())
            .run();


          await audit(
            env,
            "login.success",
            { username }
          );


          return json(
            {
              auth: true,
              role: "owner",
              message: "Signed in successfully.",
            },
            200,
            {
              "Set-Cookie":
                await sessionCookie(env),
            }
          );

        } catch {
          return json({
            error: "Invalid login request.",
          }, 400);
        }
      }


      // ======================================================
      // THEME
      // ======================================================

      if (
        url.pathname === "/api/settings/theme"
      ) {

        if (request.method === "GET") {

          const row =
            await env.DB.prepare(`
              SELECT value
              FROM settings
              WHERE key='theme'
            `).first();

          return json({
            theme: row
              ? JSON.parse(row.value)
              : null,
          });
        }


        if (request.method === "PUT") {

          if (!(await authed(request, env))) {
            return json({
              error: "Unauthorized",
            }, 401);
          }

          const theme =
            await request.json();

          const now =
            new Date().toISOString();

          await env.DB.prepare(`
            INSERT INTO settings
            (key, value, updated_at)
            VALUES ('theme', ?, ?)
            ON CONFLICT(key)
            DO UPDATE SET
              value=excluded.value,
              updated_at=excluded.updated_at
          `)
            .bind(
              JSON.stringify(theme),
              now
            )
            .run();


          await audit(
            env,
            "theme.update",
            theme
          );


          return json({
            ok: true,
            theme,
          });
        }
      }


      // ======================================================
      // FOLDERS — PUBLIC
      // ======================================================

      if (
        url.pathname === "/api/folders" &&
        request.method === "GET"
      ) {

        const section =
          url.searchParams.get("section");

        let result;

        if (section) {

          result =
            await env.DB.prepare(`
              SELECT *
              FROM folders
              WHERE section=?
              AND status='published'
              ORDER BY sort_order ASC, id ASC
            `)
              .bind(section)
              .all();

        } else {

          result =
            await env.DB.prepare(`
              SELECT *
              FROM folders
              WHERE status='published'
              ORDER BY section, sort_order ASC, id ASC
            `)
              .all();
        }

        return json({
          items: result.results || [],
        });
      }


      // ======================================================
      // FOLDERS — ADMIN CREATE
      // ======================================================

      if (
        url.pathname === "/api/folders" &&
        request.method === "POST"
      ) {

        if (!(await authed(request, env))) {
          return json({
            error: "Unauthorized",
          }, 401);
        }

        try {

          const data =
            await request.json();

          const section =
            String(data.section || "research");

          const title =
            String(data.title || "").trim();

          const description =
            String(data.description || "");

          if (!title) {
            return json({
              error: "Folder title is required.",
            }, 400);
          }

          const baseSlug =
            title
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/^-+|-+$/g, "")
              .slice(0, 80) ||
            `folder-${Date.now()}`;

          const slug =
            `${baseSlug}-${Date.now()}`;

          const now =
            new Date().toISOString();

          const result =
            await env.DB.prepare(`
              INSERT INTO folders
              (section, slug, title, description,
               sort_order, status, created_at, updated_at)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `)
              .bind(
                section,
                slug,
                title,
                description,
                Number(data.sort_order || 0),
                data.status || "published",
                now,
                now
              )
              .run();


          await audit(
            env,
            "folder.create",
            {
              id: result.meta.last_row_id,
              title,
              section,
            }
          );


          return json({
            ok: true,
            id: result.meta.last_row_id,
          }, 201);

        } catch (error) {

          return json({
            error:
              "Unable to create folder.",
            detail: error.message,
          }, 400);
        }
      }


      // ======================================================
      // FOLDERS — ADMIN UPDATE
      // ======================================================

      if (
        url.pathname.startsWith("/api/folders/") &&
        request.method === "PATCH"
      ) {

        if (!(await authed(request, env))) {
          return json({
            error: "Unauthorized",
          }, 401);
        }

        const id =
          Number(
            url.pathname.split("/").pop()
          );

        if (!id) {
          return json({
            error: "Invalid folder ID.",
          }, 400);
        }

        const data =
          await request.json();

        const current =
          await env.DB.prepare(`
            SELECT *
            FROM folders
            WHERE id=?
          `)
            .bind(id)
            .first();

        if (!current) {
          return json({
            error: "Folder not found.",
          }, 404);
        }

        const title =
          data.title !== undefined
            ? String(data.title)
            : current.title;

        const description =
          data.description !== undefined
            ? String(data.description)
            : current.description;

        const section =
          data.section !== undefined
            ? String(data.section)
            : current.section;

        const status =
          data.status !== undefined
            ? String(data.status)
            : current.status;

        const sortOrder =
          data.sort_order !== undefined
            ? Number(data.sort_order)
            : current.sort_order;

        await env.DB.prepare(`
          UPDATE folders
          SET section=?,
              title=?,
              description=?,
              status=?,
              sort_order=?,
              updated_at=?
          WHERE id=?
        `)
          .bind(
            section,
            title,
            description,
            status,
            sortOrder,
            new Date().toISOString(),
            id
          )
          .run();


        await audit(
          env,
          "folder.update",
          {
            id,
            title,
          }
        );


        return json({
          ok: true,
        });
      }


      // ======================================================
      // FOLDERS — DELETE
      // ======================================================

      if (
        url.pathname.startsWith("/api/folders/") &&
        request.method === "DELETE"
      ) {

        if (!(await authed(request, env))) {
          return json({
            error: "Unauthorized",
          }, 401);
        }

        const id =
          Number(
            url.pathname.split("/").pop()
          );

        const folder =
          await env.DB.prepare(`
            SELECT *
            FROM folders
            WHERE id=?
          `)
            .bind(id)
            .first();

        if (!folder) {
          return json({
            error: "Folder not found.",
          }, 404);
        }


        // Keep media safe; only remove folder assignment.
        await env.DB.prepare(`
          UPDATE media
          SET folder_id=NULL
          WHERE folder_id=?
        `)
          .bind(id)
          .run();


        await env.DB.prepare(`
          DELETE FROM content
          WHERE folder_id=?
        `)
          .bind(id)
          .run();


        await env.DB.prepare(`
          DELETE FROM folders
          WHERE id=?
        `)
          .bind(id)
          .run();


        await audit(
          env,
          "folder.delete",
          folder
        );


        return json({
          ok: true,
        });
      }


      // ======================================================
      // CONTENT — ADMIN LIST
      // ======================================================

      if (
        url.pathname === "/api/content" &&
        request.method === "GET"
      ) {

        if (!(await authed(request, env))) {
          return json({
            error: "Unauthorized",
          }, 401);
        }

        const result =
          await env.DB.prepare(`
            SELECT *
            FROM content
            ORDER BY id DESC
            LIMIT 200
          `)
            .all();

        return json({
          items: result.results || [],
        });
      }


      // ======================================================
      // CONTENT — CREATE
      // ======================================================

      if (
        url.pathname === "/api/content" &&
        request.method === "POST"
      ) {

        if (!(await authed(request, env))) {
          return json({
            error: "Unauthorized",
          }, 401);
        }

        const data =
          await request.json();

        const now =
          new Date().toISOString();

        const result =
          await env.DB.prepare(`
            INSERT INTO content
            (folder_id, section, title,
             description, body, status,
             created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
          `)
            .bind(
              data.folder_id || null,
              data.section || "research",
              data.title || "",
              data.description || "",
              data.body || "",
              data.status || "draft",
              now,
              now
            )
            .run();


        await audit(
          env,
          "content.create",
          {
            id: result.meta.last_row_id,
            title: data.title,
          }
        );


        return json({
          ok: true,
          id: result.meta.last_row_id,
        }, 201);
      }


      // ======================================================
      // CONTENT — UPDATE
      // ======================================================

      if (
        url.pathname.startsWith("/api/content/") &&
        request.method === "PATCH"
      ) {

        if (!(await authed(request, env))) {
          return json({
            error: "Unauthorized",
          }, 401);
        }

        const id =
          Number(
            url.pathname.split("/").pop()
          );

        const old =
          await env.DB.prepare(`
            SELECT *
            FROM content
            WHERE id=?
          `)
            .bind(id)
            .first();

        if (!old) {
          return json({
            error: "Content not found.",
          }, 404);
        }

        // Save version before changing content.
        await env.DB.prepare(`
          INSERT INTO versions
          (content_id, snapshot, created_at)
          VALUES (?, ?, ?)
        `)
          .bind(
            id,
            JSON.stringify(old),
            new Date().toISOString()
          )
          .run();


        const data =
          await request.json();

        await env.DB.prepare(`
          UPDATE content
          SET folder_id=?,
              section=?,
              title=?,
              description=?,
              body=?,
              status=?,
              updated_at=?
          WHERE id=?
        `)
          .bind(
            data.folder_id !== undefined
              ? data.folder_id
              : old.folder_id,

            data.section !== undefined
              ? data.section
              : old.section,

            data.title !== undefined
              ? data.title
              : old.title,

            data.description !== undefined
              ? data.description
              : old.description,

            data.body !== undefined
              ? data.body
              : old.body,

            data.status !== undefined
              ? data.status
              : old.status,

            new Date().toISOString(),
            id
          )
          .run();


        await audit(
          env,
          "content.update",
          { id }
        );


        return json({
          ok: true,
        });
      }


      // ======================================================
      // CONTENT — DELETE
      // ======================================================

      if (
        url.pathname.startsWith("/api/content/") &&
        request.method === "DELETE"
      ) {

        if (!(await authed(request, env))) {
          return json({
            error: "Unauthorized",
          }, 401);
        }

        const id =
          Number(
            url.pathname.split("/").pop()
          );

        await env.DB.prepare(`
          DELETE FROM content
          WHERE id=?
        `)
          .bind(id)
          .run();


        await audit(
          env,
          "content.delete",
          { id }
        );


        return json({
          ok: true,
        });
      }


      // ======================================================
      // MEDIA — LIST
      // ======================================================

      if (
        url.pathname === "/api/media" &&
        request.method === "GET"
      ) {

        if (!(await authed(request, env))) {
          return json({
            error: "Unauthorized",
          }, 401);
        }

        const result =
          await env.DB.prepare(`
            SELECT *
            FROM media
            ORDER BY sort_order ASC, id DESC
            LIMIT 300
          `)
            .all();

        const items =
          (result.results || []).map(item => {

            const key =
              item.r2_key || "";

            let kind = "image";

            if (
              /\.(mp4|webm|mov|m4v)$/i.test(key)
            ) {
              kind = "video";
            }

            if (
              /\.pdf$/i.test(key)
            ) {
              kind = "pdf";
            }

            return {
              ...item,
              kind,
            };
          });


        return json({
          items,
        });
      }


      // ======================================================
      // MEDIA — UPLOAD
      // ======================================================

      if (
        url.pathname === "/api/media" &&
        request.method === "POST"
      ) {

        if (!(await authed(request, env))) {
          return json({
            error: "Unauthorized",
          }, 401);
        }

        if (!env.MEDIA) {
          return json({
            error:
              "R2 MEDIA binding is not configured.",
          }, 503);
        }

        const form =
          await request.formData();

        const file =
          form.get("file");

        if (!(file instanceof File)) {
          return json({
            error: "No file supplied.",
          }, 400);
        }


        // 20 MB limit
        if (
          file.size >
          20 * 1024 * 1024
        ) {
          return json({
            error:
              "File too large. Maximum size is 20 MB.",
          }, 413);
        }


        const originalName =
          file.name || "upload";

        const safeName =
          originalName
            .replace(
              /[^a-zA-Z0-9._-]/g,
              "_"
            );


        const section =
          String(
            form.get("section") ||
            "research"
          );


        const folderIdValue =
          form.get("folder_id");

        const folderId =
          folderIdValue
            ? Number(folderIdValue)
            : null;


        const key =
          `media/${Date.now()}-${crypto.randomUUID()}-${safeName}`;


        await env.MEDIA.put(
          key,
          file.stream(),
          {
            httpMetadata: {
              contentType:
                file.type ||
                "application/octet-stream",
            },
          }
        );


        const now =
          new Date().toISOString();


        const result =
          await env.DB.prepare(`
            INSERT INTO media
            (r2_key, title, description,
             caption, section, folder_id,
             sort_order, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
          `)
            .bind(
              key,

              String(
                form.get("title") ||
                safeName
              ),

              String(
                form.get("description") ||
                ""
              ),

              String(
                form.get("caption") ||
                ""
              ),

              section,

              folderId,

              Number(
                form.get("sort_order") ||
                0
              ),

              now,
              now
            )
            .run();


        await audit(
          env,
          "media.upload",
          {
            id: result.meta.last_row_id,
            key,
          }
        );


        return json({
          ok: true,
          id: result.meta.last_row_id,
          key,
        }, 201);
      }


      // ======================================================
      // MEDIA — UPDATE METADATA
      // ======================================================

      if (
        url.pathname.startsWith("/api/media/") &&
        request.method === "PATCH"
      ) {

        if (!(await authed(request, env))) {
          return json({
            error: "Unauthorized",
          }, 401);
        }

        const id =
          Number(
            url.pathname.split("/").pop()
          );

        const old =
          await env.DB.prepare(`
            SELECT *
            FROM media
            WHERE id=?
          `)
            .bind(id)
            .first();

        if (!old) {
          return json({
            error: "Media not found.",
          }, 404);
        }

        const data =
          await request.json();


        await env.DB.prepare(`
          UPDATE media
          SET title=?,
              description=?,
              caption=?,
              section=?,
              folder_id=?,
              sort_order=?,
              updated_at=?
          WHERE id=?
        `)
          .bind(
            data.title !== undefined
              ? data.title
              : old.title,

            data.description !== undefined
              ? data.description
              : old.description,

            data.caption !== undefined
              ? data.caption
              : old.caption,

            data.section !== undefined
              ? data.section
              : old.section,

            data.folder_id !== undefined
              ? data.folder_id
              : old.folder_id,

            data.sort_order !== undefined
              ? Number(data.sort_order)
              : old.sort_order,

            new Date().toISOString(),
            id
          )
          .run();


        await audit(
          env,
          "media.update",
          { id }
        );


        return json({
          ok: true,
        });
      }


      // ======================================================
      // MEDIA — DELETE
      // ======================================================

      if (
        url.pathname.startsWith("/api/media/") &&
        request.method === "DELETE"
      ) {

        if (!(await authed(request, env))) {
          return json({
            error: "Unauthorized",
          }, 401);
        }

        const id =
          Number(
            url.pathname.split("/").pop()
          );

        const row =
          await env.DB.prepare(`
            SELECT r2_key
            FROM media
            WHERE id=?
          `)
            .bind(id)
            .first();


        if (!row) {
          return json({
            error: "Media not found.",
          }, 404);
        }


        if (env.MEDIA) {
          await env.MEDIA.delete(
            row.r2_key
          );
        }


        await env.DB.prepare(`
          DELETE FROM media
          WHERE id=?
        `)
          .bind(id)
          .run();


        await audit(
          env,
          "media.delete",
          {
            id,
            key: row.r2_key,
          }
        );


        return json({
          ok: true,
        });
      }


      // ======================================================
      // MEDIA FILE — PUBLIC READ
      // ======================================================

      if (
        url.pathname.startsWith(
          "/api/media/file/"
        ) &&
        request.method === "GET"
      ) {

        if (!env.MEDIA) {
          return new Response(
            "R2 not configured.",
            { status: 503 }
          );
        }

        const key =
          decodeURIComponent(
            url.pathname.slice(
              "/api/media/file/".length
            )
          );


        const object =
          await env.MEDIA.get(key);


        if (!object) {
          return new Response(
            "Not found",
            { status: 404 }
          );
        }


        const headers =
          new Headers();


        object.writeHttpMetadata(
          headers
        );

        headers.set(
          "etag",
          object.httpEtag
        );

        headers.set(
          "cache-control",
          "public, max-age=31536000, immutable"
        );


        return new Response(
          object.body,
          { headers }
        );
      }


      // ======================================================
      // TRANSLATIONS — GET
      // ======================================================

      if (
        url.pathname ===
        "/api/translations" &&
        request.method === "GET"
      ) {

        const language =
          url.searchParams.get(
            "language"
          );

        const itemType =
          url.searchParams.get(
            "item_type"
          );

        const itemId =
          Number(
            url.searchParams.get(
              "item_id"
            )
          );


        if (
          !language ||
          !itemType ||
          !itemId
        ) {
          return json({
            error:
              "language, item_type and item_id are required.",
          }, 400);
        }


        const row =
          await env.DB.prepare(`
            SELECT *
            FROM translations
            WHERE item_type=?
            AND item_id=?
            AND language=?
          `)
            .bind(
              itemType,
              itemId,
              language
            )
            .first();


        return json({
          translation: row || null,
        });
      }


      // ======================================================
      // TRANSLATIONS — SAVE
      // ======================================================

      if (
        url.pathname ===
        "/api/translations" &&
        request.method === "PUT"
      ) {

        if (!(await authed(request, env))) {
          return json({
            error: "Unauthorized",
          }, 401);
        }


        const data =
          await request.json();


        const language =
          String(
            data.language || ""
          );

        const itemType =
          String(
            data.item_type || ""
          );

        const itemId =
          Number(
            data.item_id
          );


        if (
          !language ||
          !itemType ||
          !itemId
        ) {
          return json({
            error:
              "Invalid translation data.",
          }, 400);
        }


        const now =
          new Date().toISOString();


        await env.DB.prepare(`
          INSERT INTO translations
          (item_type, item_id, language,
           title, description, body, updated_at)
          VALUES (?, ?, ?, ?, ?, ?, ?)
          ON CONFLICT(item_type, item_id, language)
          DO UPDATE SET
            title=excluded.title,
            description=excluded.description,
            body=excluded.body,
            updated_at=excluded.updated_at
        `)
          .bind(
            itemType,
            itemId,
            language,
            data.title || "",
            data.description || "",
            data.body || "",
            now
          )
          .run();


        await audit(
          env,
          "translation.update",
          {
            itemType,
            itemId,
            language,
          }
        );


        return json({
          ok: true,
        });
      }


      // ======================================================
      // AUDIT LOG — ADMIN
      // ======================================================

      if (
        url.pathname === "/api/audit" &&
        request.method === "GET"
      ) {

        if (!(await authed(request, env))) {
          return json({
            error: "Unauthorized",
          }, 401);
        }


        const result =
          await env.DB.prepare(`
            SELECT *
            FROM audit
            ORDER BY id DESC
            LIMIT 200
          `)
            .all();


        return json({
          items:
            result.results || [],
        });
      }


      // ======================================================
      // CONTENT VERSIONS — ADMIN
      // ======================================================

      if (
        url.pathname === "/api/versions" &&
        request.method === "GET"
      ) {

        if (!(await authed(request, env))) {
          return json({
            error: "Unauthorized",
          }, 401);
        }


        const contentId =
          Number(
            url.searchParams.get(
              "content_id"
            )
          );


        if (!contentId) {
          return json({
            error:
              "content_id is required.",
          }, 400);
        }


        const result =
          await env.DB.prepare(`
            SELECT *
            FROM versions
            WHERE content_id=?
            ORDER BY id DESC
            LIMIT 100
          `)
            .bind(contentId)
            .all();


        return json({
          items:
            result.results || [],
        });
      }


      // ======================================================
      // ROYAL AI ASSISTANT
      // ======================================================

      if (
        url.pathname === "/api/ai" &&
        request.method === "POST"
      ) {

        if (!(await authed(request, env))) {
          return json({
            error: "Unauthorized",
          }, 401);
        }


        if (!env.AI) {
          return json({
            error:
              "Workers AI binding is not configured.",
          }, 503);
        }


        const data =
          await request.json();


        const mode =
          String(
            data.mode || "improve"
          );


        const language =
          String(
            data.language || "English"
          );


        const text =
          String(
            data.text || ""
          ).trim();


        if (!text) {
          return json({
            error:
              "Please provide text for Royal AI.",
          }, 400);
        }


        const instructions = {

          improve:
            "Improve grammar, clarity and professional style while preserving every factual claim.",

          summary:
            "Create a concise and accurate summary without inventing information.",

          buyer:
            "Rewrite this for an international buyer. Make it professional, trustworthy and commercially clear. Never invent certifications, prices, quantities or claims.",

          translate:
            "Translate faithfully into the requested language. Preserve names, numbers, facts and technical terminology.",

          research:
            "Organize the material as a clear research/knowledge draft. Separate established facts from claims that require verification.",

          website:
            "Suggest polished website wording suitable for Royal Chilghoza Pine Nuts while preserving factual accuracy.",

        };


        const instruction =
          instructions[mode] ||
          instructions.improve;


        const prompt = `
You are Royal AI Assistant for
"Royal Chilghoza Pine Nuts".

Your role is to assist users and the website administrator.

Important rules:
1. Never invent facts.
2. Never invent certifications.
3. Never invent prices or statistics.
4. Never claim a product is organic unless the supplied material establishes it.
5. Preserve geographical and scientific names accurately.
6. Human review is required before publication.
7. Be professional, elegant and internationally appropriate.
8. Requested language: ${language}.

Task:
${instruction}

Source text:
${text}
`;


        const output =
          await env.AI.run(
            "@cf/meta/llama-3.1-8b-instruct",
            {
              prompt,
              max_tokens:
                Number(
                  data.max_tokens || 1200
                ),
            }
          );


        const result =
          output?.response ||
          output;


        await audit(
          env,
          "ai.request",
          {
            mode,
            language,
          }
        );


        return json({
          result,
        });
      }


      // ======================================================
      // UNKNOWN API
      // ======================================================

      return json({
        error: "API route not found.",
      }, 404);
    }


    // ========================================================
    // STATIC WEBSITE
    // ========================================================

    const response =
      await env.ASSETS.fetch(
        request
      );


    if (
      response.status === 404
    ) {

      return env.ASSETS.fetch(
        new Request(
          new URL(
            "/index.html",
            request.url
          ),
          request
        )
      );
    }


    return response;
  },
};
