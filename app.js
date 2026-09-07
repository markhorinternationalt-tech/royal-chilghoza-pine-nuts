/* ==========================================================================
   ROYAL CHILGHOZA PINE NUTS ECOSYSTEM — PRODUCTION ENGINE
   ========================================================================== */

let currentLang = 'en';
let globalHubs = [];
let globalOffices = [];

const defaultGallery = [
  { file_name: "https://pub-2098d8c2138743ae88c222ff444c82b9.r2.dev/01-chilghoza-lot.jpg", title: "Chilghoza Pine Nuts Lot Inspection & Grading" },
  { file_name: "https://pub-2098d8c2138743ae88c222ff444c82b9.r2.dev/02-chilghoza-cones.jpg", title: "Harvested Cones of Chilghoza Pine Nuts" },
  { file_name: "https://pub-2098d8c2138743ae88c222ff444c82b9.r2.dev/03-chilghoza-kernel.jpg", title: "Premium Shelled Kernels of Chilghoza Pine Nuts" },
  { file_name: "https://pub-2098d8c2138743ae88c222ff444c82b9.r2.dev/04-chilghoza-harvest.jpg", title: "Sustainable Harvesting of Chilghoza Pine Nuts" },
  { file_name: "https://pub-2098d8c2138743ae88c222ff444c82b9.r2.dev/05-chilghoza-raw-kernels.jpg", title: "Raw Selection of Chilghoza Pine Nuts" },
  { file_name: "https://pub-2098d8c2138743ae88c222ff444c82b9.r2.dev/06-chilghoza-cone-closeup.jpg", title: "Macro Detail of Chilghoza Pine Nuts Cone" },
  { file_name: "https://pub-2098d8c2138743ae88c222ff444c82b9.r2.dev/07-chilghoza-products-display.jpg", title: "Export Packaging of Chilghoza Pine Nuts" },
  { file_name: "https://pub-2098d8c2138743ae88c222ff444c82b9.r2.dev/08-chilghoza-forest.jpg", title: "Chilas, Diamer Native Chilghoza Pine Nuts Forest" }
];

document.addEventListener('DOMContentLoaded', async () => {
  renderGallery(defaultGallery);
  await loadData();
});

async function loadData() {
  try {
    const resSettings = await fetch('/api/settings');
    if (resSettings.ok) {
      const settings = await resSettings.json();
      if (settings.globalLang) changeLanguage(settings.globalLang);
      if (settings.bgColor) document.documentElement.style.setProperty('--bg-primary', settings.bgColor);
      if (settings.goldColor) document.documentElement.style.setProperty('--gold-primary', settings.goldColor);
    }

    const resHubs = await fetch('/api/hubs');
    if (resHubs.ok) {
      const data = await resHubs.json();
      globalHubs = data.items || [];
    }

    const resOffices = await fetch('/api/offices');
    if (resOffices.ok) {
      const data = await resOffices.json();
      globalOffices = data.items || [];
      renderOffices(globalOffices);
    }
  } catch (err) {
    console.warn("Using default client setup.");
  }
}

function renderGallery(items) {
  const grid = document.getElementById('galleryGrid');
  if (!grid) return;
  grid.innerHTML = items.map(img => `
    <div class="gallery-card">
      <img src="${img.file_name}" alt="${img.title}" loading="lazy">
      <div class="gallery-caption">${img.title}</div>
    </div>
  `).join('');
}

function renderOffices(offices) {
  const grid = document.getElementById('officesGrid');
  if (!grid) return;
  if (offices.length === 0) {
    offices = [
      { title: "Headquarters & Native Origin", address: "Chilas, Diamer District, Gilgit-Baltistan, Pakistan", phone: "+92 300 0000000", whatsapp: "923000000000" },
      { title: "Regional Operations Hub", address: "Gilgit, Gilgit-Baltistan, Pakistan", phone: "+92 300 0000000", whatsapp: "923000000000" },
      { title: "Federal & Trade Desk", address: "Islamabad, Pakistan", phone: "+92 51 0000000", whatsapp: "923000000000" },
      { title: "International Trade Desk", address: "China / International Export Desk", phone: "+86 000 0000000", whatsapp: "923000000000" }
    ];
  }
  grid.innerHTML = offices.map(off => `
    <div class="office-card">
      <h3 style="color:var(--gold-primary); font-size:1.1rem; margin-bottom:8px;">${off.title}</h3>
      <p style="color:var(--text-muted); font-size:0.85rem;">📍 ${off.address}</p>
      <p style="color:var(--text-muted); font-size:0.85rem; margin-top:5px;">📞 ${off.phone || 'N/A'}</p>
      <a href="https://wa.me/${off.whatsapp}" target="_blank" class="btn btn-wa" style="margin-top:12px; font-size:0.75rem; padding:6px 12px;">💬 WhatsApp Office</a>
    </div>
  `).join('');
}

// OPEN CATEGORY GATEWAY & MINI-WEBSITE HUBS
function openCategory(sectionType) {
  const modal = document.getElementById('hubModal');
  const modalBody = document.getElementById('modalBody');
  const items = globalHubs.filter(h => h.section === sectionType);

  let html = `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:25px; border-bottom:1px solid var(--border-gold); padding-bottom:15px;">
      <h2 style="color:var(--gold-primary);">${sectionType === 'trade' ? 'Global Trade Hubs for Chilghoza Pine Nuts' : 'Research & Knowledge Hubs for Chilghoza Pine Nuts'}</h2>
      <button onclick="closeModal()" class="btn btn-admin">✕ Close</button>
    </div>
    <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:20px;">
  `;

  if (items.length === 0) {
    for (let i = 1; i <= 10; i++) {
      const pad = String(i).padStart(2, '0');
      html += `
        <div class="card-3d" onclick="openHubDetail('Hub ${pad} - ${sectionType === 'trade' ? 'Trade Gateway' : 'Scientific Study'} for Chilghoza Pine Nuts', 'Full specifications, certification, and trade details regarding Chilghoza Pine Nuts from Chilas, Diamer District.')">
          <div style="color:var(--gold-primary); font-size:0.8rem; font-weight:800;">HUB ${pad}</div>
          <h3 style="color:var(--text-main); font-size:1.1rem; margin:8px 0;">${sectionType === 'trade' ? 'Commercial Export Hub' : 'Research & Botanical Hub'} ${pad}</h3>
          <p style="color:var(--text-muted); font-size:0.85rem;">Explore Mini-Website Gateway →</p>
        </div>
      `;
    }
  } else {
    items.forEach((hub, idx) => {
      html += `
        <div class="card-3d" onclick="openHubDetail('${hub.title.replace(/'/g, "\\'")}', '${(hub.description || '').replace(/'/g, "\\'")}')">
          <div style="color:var(--gold-primary); font-size:0.8rem; font-weight:800;">HUB ${String(idx + 1).padStart(2, '0')}</div>
          <h3 style="color:var(--text-main); font-size:1.1rem; margin:8px 0;">${hub.title}</h3>
          <p style="color:var(--text-muted); font-size:0.85rem;">${hub.description || 'Access dedicated mini-website layout →'}</p>
        </div>
      `;
    });
  }

  html += `</div>`;
  modalBody.innerHTML = html;
  modal.style.display = 'flex';
}

// MINI-WEBSITE LAYOUT RENDERING FOR HUBS
function openHubDetail(title, desc) {
  const modalBody = document.getElementById('modalBody');
  modalBody.innerHTML = `
    <div style="text-align:left;">
      <button onclick="closeModal()" class="btn btn-admin" style="margin-bottom:20px;">← Back to Hubs</button>
      <div style="background:rgba(212,175,55,0.08); border:1px solid var(--border-gold); padding:10px 18px; border-radius:30px; display:inline-block; color:var(--gold-primary); font-size:0.8rem; font-weight:800; margin-bottom:15px;">DEDICATED MINI-WEBSITE HUB</div>
      <h1 style="color:var(--gold-primary); font-size:2.2rem; margin-bottom:15px;">${title}</h1>
      <p style="color:var(--text-main); font-size:1.05rem; line-height:1.8; margin-bottom:25px;">${desc}</p>
      
      <div style="background:#020c06; border:1px solid var(--border-gold); padding:25px; border-radius:16px; margin-bottom:25px;">
        <h3 style="color:var(--gold-light); margin-bottom:12px;">Technical & Botanical Specifications:</h3>
        <ul style="color:var(--text-muted); font-size:0.9rem; padding-left:20px; line-height:1.8;">
          <li><strong>Product Origin:</strong> Protected Geographical Indication (GI), Chilas, Diamer District, Pakistan.</li>
          <li><strong>Commercial Grade:</strong> Premium A-Grade Export Standard (In-Shell & Shelled Kernels).</li>
          <li><strong>Chemical Profile:</strong> Rich in Pinolenic Acid, Antioxidants, and Essential Fatty Acids.</li>
        </ul>
      </div>

      <a href="https://wa.me/923000000000" target="_blank" class="btn btn-wa" style="width:100%; justify-content:center; padding:15px; font-size:1rem;">
        💬 Contact Trade Desk for Chilghoza Pine Nuts
      </a>
    </div>
  `;
}

async function askWorkersAI() {
  const input = document.getElementById('homeAiInput');
  const responseBox = document.getElementById('homeAiResponse');
  if (!input.value.trim()) return;

  responseBox.style.display = 'block';
  responseBox.innerHTML = '<span style="color:var(--gold-primary);">Processing with Cloudflare Workers AI...</span>';

  try {
    const res = await fetch('/api/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: input.value.trim(), language: currentLang })
    });
    const data = await res.json();
    responseBox.innerText = data.result || "No response received.";
  } catch (err) {
    responseBox.innerText = "Error connecting to AI Assistant.";
  }
}

function changeLanguage(lang) {
  currentLang = lang;
  document.documentElement.setAttribute('lang', lang);
  document.documentElement.setAttribute('dir', (lang === 'ar' || lang === 'ps') ? 'rtl' : 'ltr');
}

function toggleAdminModal() {
  const modal = document.getElementById('adminModal');
  modal.style.display = modal.style.display === 'flex' ? 'none' : 'flex';
}

function closeModal() {
  document.getElementById('hubModal').style.display = 'none';
}

function switchAdminTab(tabId) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  event.target.classList.add('active');
  document.getElementById(tabId).classList.add('active');
}

function applyCustomTheme() {
  const bg = document.getElementById('bgColorInput').value;
  const gold = document.getElementById('goldColorInput').value;
  document.documentElement.style.setProperty('--bg-primary', bg);
  document.documentElement.style.setProperty('--gold-primary', gold);
}

async function saveAdminSettings() {
  const bg = document.getElementById('bgColorInput').value;
  const gold = document.getElementById('goldColorInput').value;
  const lang = document.getElementById('adminGlobalLang').value;

  try {
    await fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bgColor: bg, goldColor: gold, globalLang: lang })
    });
    alert('Admin Settings Saved Successfully!');
  } catch (err) {
    alert('Failed to save admin settings.');
  }
}
