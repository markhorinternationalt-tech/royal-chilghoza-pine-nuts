/* ==========================================================================
   ROYAL CHILGHOZA PINE NUTS ECOSYSTEM — WORKER BACKEND ENGINE
   Services: D1 Database CRUD, Workers AI Binding, R2 Storage Management,
   5-Language Admin Defaults, and Photoshop Theme Configuration API.
   ========================================================================== */

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    // CORS Headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    if (method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      // Initialize Database Tables
      if (path === '/api/init' && method === 'POST') {
        await env.DB.batch([
          env.DB.prepare(`CREATE TABLE IF NOT EXISTS site_settings (key TEXT PRIMARY KEY, value TEXT)`),
          env.DB.prepare(`CREATE TABLE IF NOT EXISTS hubs (id INTEGER PRIMARY KEY AUTOINCREMENT, section TEXT, title TEXT, description TEXT, display_order INTEGER)`),
          env.DB.prepare(`CREATE TABLE IF NOT EXISTS gallery (id INTEGER PRIMARY KEY AUTOINCREMENT, file_name TEXT, title TEXT, alt_text TEXT, display_order INTEGER)`),
          env.DB.prepare(`CREATE TABLE IF NOT EXISTS offices (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, address TEXT, phone TEXT, email TEXT, whatsapp TEXT)`)
        ]);
        return Response.json({ success: true, message: 'Database Initialized' }, { headers: corsHeaders });
      }

      // Fetch Site Settings & Theme Config
      if (path === '/api/settings' && method === 'GET') {
        const { results } = await env.DB.prepare(`SELECT * FROM site_settings`).all();
        const settings = {};
        results.forEach(row => settings[row.key] = row.value);
        return Response.json(settings, { headers: corsHeaders });
      }

      // Save Theme / Admin Language Settings
      if (path === '/api/settings' && method === 'POST') {
        const body = await request.json();
        for (const [key, value] of Object.entries(body)) {
          await env.DB.prepare(`INSERT INTO site_settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = ?`).bind(key, String(value), String(value)).run();
        }
        return Response.json({ success: true }, { headers: corsHeaders });
      }

      // Fetch All Hubs (Global Trade & Research)
      if (path === '/api/hubs' && method === 'GET') {
        const { results } = await env.DB.prepare(`SELECT * FROM hubs ORDER BY display_order ASC`).all();
        return Response.json({ items: results }, { headers: corsHeaders });
      }

      // Create / Edit / Delete Hubs (CRUD)
      if (path === '/api/hubs' && method === 'POST') {
        const { id, section, title, description, display_order } = await request.json();
        if (id) {
          await env.DB.prepare(`UPDATE hubs SET section = ?, title = ?, description = ?, display_order = ? WHERE id = ?`).bind(section, title, description, display_order, id).run();
        } else {
          await env.DB.prepare(`INSERT INTO hubs (section, title, description, display_order) VALUES (?, ?, ?, ?)`).bind(section, title, description, display_order || 0).run();
        }
        return Response.json({ success: true }, { headers: corsHeaders });
      }

      if (path.startsWith('/api/hubs/') && method === 'DELETE') {
        const id = path.split('/')[3];
        await env.DB.prepare(`DELETE FROM hubs WHERE id = ?`).bind(id).run();
        return Response.json({ success: true }, { headers: corsHeaders });
      }

      // Fetch Offices Details
      if (path === '/api/offices' && method === 'GET') {
        const { results } = await env.DB.prepare(`SELECT * FROM offices ORDER BY id ASC`).all();
        return Response.json({ items: results }, { headers: corsHeaders });
      }

      // Save / Update Offices
      if (path === '/api/offices' && method === 'POST') {
        const { id, title, address, phone, email, whatsapp } = await request.json();
        if (id) {
          await env.DB.prepare(`UPDATE offices SET title = ?, address = ?, phone = ?, email = ?, whatsapp = ? WHERE id = ?`).bind(title, address, phone, email, whatsapp, id).run();
        } else {
          await env.DB.prepare(`INSERT INTO offices (title, address, phone, email, whatsapp) VALUES (?, ?, ?, ?, ?)`).bind(title, address, phone, email, whatsapp).run();
        }
        return Response.json({ success: true }, { headers: corsHeaders });
      }

      // Cloudflare Workers AI Integration
      if (path === '/api/ai' && method === 'POST') {
        const { text, language } = await request.json();
        const aiResponse = await env.AI.run('@cf/meta/llama-3-8b-instruct', {
          messages: [
            { role: 'system', content: `You are the Royal AI Assistant for Royal Chilghoza Pine Nuts ecosystem owned by Syed Azeem Shah. Provide authoritative, polite commercial and botanical insights about Chilghoza Pine Nuts originating from Chilas, Diamer District, Gilgit-Baltistan, Pakistan. Respond in ${language || 'English'}.` },
            { role: 'user', content: text }
          ]
        });
        return Response.json({ result: aiResponse.response }, { headers: corsHeaders });
      }

      // Fallback static assets
      return env.ASSETS.fetch(request);
    } catch (err) {
      return Response.json({ error: err.message }, { status: 500, headers: corsHeaders });
    }
  }
};
