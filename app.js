/* ==========================================================================
   ROYAL CHILGHOZA ECOSYSTEM — ULTIMATE DYNAMIC APP ENGINE
   Fully Compatible with Upgraded Worker.js (5 Languages + Dynamic API Hubs)
   ========================================================================== */

// Global State
let currentLang = 'en';
let globalFolders = [];
let homepageImages = [];

// Supported Languages Metadata (Matches worker.js)
const LANGUAGES_META = {
  en: { name: 'English', dir: 'ltr' },
  zh: { name: '中文', dir: 'ltr' },
  ar: { name: 'العربية', dir: 'rtl' },
  ps: { name: 'پښتو', dir: 'rtl' },
  ru: { name: 'Русский', dir: 'ltr' }
};

// Built-in Static Hubs Fallback (Ensures 100% Offline/Fast Rendering)
const defaultHubs = {
  trade: [
    { slug: "hub-01", num: "HUB 01", title: "Global Markets", desc: "Global demand, market opportunities, and international trade destinations." },
    { slug: "hub-02", num: "HUB 02", title: "USA Market & Buyers", desc: "U.S. buyers, importers, market requirements, and commercial connections." },
    { slug: "hub-03", num: "HUB 03", title: "China Market & Buyers", desc: "Chinese importers, GACC/CIFER standards, and high-volume trade hubs." },
    { slug: "hub-04", num: "HUB 04", title: "Export & Logistics", desc: "Phytosanitary certification, Certificate of Origin, HS Codes (0802.91/92), and shipping." },
    { slug: "hub-05", num: "HUB 05", title: "Product & Quality", desc: "In-shell chilghoza, pine nut kernels, roasting grades, and quality parameters." },
    { slug: "hub-06", num: "HUB 06", title: "Supply Chain & Traceability", desc: "Forest harvest → processing → vacuum packing → global delivery." },
    { slug: "hub-07", num: "HUB 07", title: "Geographical Indication (GI)", desc: "Authentic origin validation, IP protection, and regional identity." },
    { slug: "hub-08", num: "HUB 08", title: "Organic Chemistry & Quality", desc: "Natural fatty acids, moisture control, chemical purity, and nutritional value." },
    { slug: "hub-09", num: "HUB 09", title: "Processing & Value Addition", desc: "Mechanical shelling, grading, retail branding, and export packaging." },
    { slug: "hub-10", num: "HUB 10", title: "Sustainable & Ethical Trade", desc: "Fair compensation, eco-friendly sourcing, and community-driven trade." }
  ],
  research: [
    { slug: "res-01", num: "HUB 01", title: "Geographical Origin & GI Research", desc: "Chilghoza origin, geographical identity, traditional knowledge, and GI research." },
    { slug: "res-02", num: "HUB 02", title: "Chilghoza Biology & Botany", desc: "Pinus gerardiana taxonomy, cone formation, and natural regeneration patterns." },
    { slug: "res-03", num: "HUB 03", title: "Nutrition Value & Chemical Profile", desc: "Amino acids, essential minerals, antioxidants, and lipid composition." },
    { slug: "res-04", num: "HUB 04", title: "Chilghoza Forests & Ecology", desc: "High-altitude forest dynamics, soil conservation, and canopy health." },
    { slug: "res-05", num: "HUB 05", title: "Biodiversity & Ecosystem Services", desc: "Wildlife habitats, flora protection, and mountain ecosystem stability." },
    { slug: "res-06", num: "HUB 06", title: "Climate & Environmental Resilience", desc: "Carbon sequestration, climate adaptation, and watershed management." },
    { slug: "res-07", num: "HUB 07", title: "Forest Conservation & Restoration", desc: "Reforestation techniques, nurseries, and sustainable yield harvesting." },
    { slug: "res-08", num: "HUB 08", title: "Supply Chain & Community Livelihoods", desc: "Empowering mountain communities, tribal rights, and income stability." },
    { slug: "res-09", num: "HUB 09", title: "Sustainable Harvesting Techniques", desc: "Cone collection safety, tool innovation, and forest damage prevention." },
    { slug: "res-10", num: "HUB 10", title: "Research, Policy & Global Partnerships", desc: "Collaborations with FAO, GEF, forestry departments, and global universities." }
  ]
};

// UI Interface Translations (5 Languages)
const translations = {
  en: {
    tagline: "PAKISTAN • ORIGIN • GLOBAL",
    mainHeading: 'Royal Chilghoza<br><span class="gold-text">Pine Nuts</span>',
    heroDesc: "Connecting authentic Chilghoza pine nuts from Pakistan's native forests to global commercial trade and scientific research ecosystems.",
    tradeTitle: "GLOBAL TRADE",
    tradeDesc: "10 Dedicated Hubs • Premium Quality Export →",
    researchTitle: "RESEARCH & KNOWLEDGE",
    researchDesc: "10 Academic Hubs • Scientific Forest Research →",
    galleryTitle: "Project Gallery",
    gallerySub: "Authentic forest harvesting, processing, and premium quality pine nut display",
    adminBtn: "Admin Portal",
    waBtn: "WhatsApp Trade"
  },
  zh: {
    tagline: "巴基斯坦 • 原产地 • 全球",
    mainHeading: '皇家松子<br><span class="gold-text">Chilghoza</span>',
    heroDesc: "将巴基斯坦原生森林的正宗 Chilghoza 松子连接到全球商业贸易和科学研究生态系统。",
    tradeTitle: "全球贸易",
    tradeDesc: "10 个专属中心 • 优质出口 →",
    researchTitle: "研究与知识",
    researchDesc: "10 个学术中心 • 科学森林研究 →",
    galleryTitle: "项目图库",
    gallerySub: "真实森林采收、加工与松子展示",
    adminBtn: "管理门户",
    waBtn: "微信/WhatsApp 咨询"
  },
  ar: {
    tagline: "باكستان • الأصل • عالمي",
    mainHeading: 'الصنوبر الملكي<br><span class="gold-text">جلغوزة</span>',
    heroDesc: "ربط صنوبر الجلغوزة الأصلي من غابات باكستان بالتجارة العالمية والنظم البيئية للبحوث العلمية.",
    tradeTitle: "التجارة العالمية",
    tradeDesc: "10 مراكز متخصصة • تصدير بجودة عالية →",
    researchTitle: "الأبحاث والمعرفة",
    researchDesc: "10 مراكز أكاديمية • دراسات الغابات العلمية →",
    galleryTitle: "معرض الصور",
    gallerySub: "الحصاد الطبيعي، المعالجة، وعرض الصنوبر الممتاز",
    adminBtn: "بوابة الإدارة",
    waBtn: "واتساب للتجارة"
  },
  ps: {
    tagline: "پاکستان • اصل • نړیوال",
    mainHeading: 'شاهي جلغوزي<br><span class="gold-text">پائن مغز</span>',
    heroDesc: "د پاکستان له طبیعي ځنګلونو څخه اصلی جلغوزي نړیوال تجارني او علمي څیړنیز سیسټم سره نښلول.",
    tradeTitle: "نړیوال تجارت",
    tradeDesc: "10 ځانګړي مرکزونه • لوړ کیفیت صادرات →",
    researchTitle: "څیړنه او پوهه",
    researchDesc: "10 اکاډمیک مرکزونه • علمي څیړنې →",
    galleryTitle: "د پروژې ګالري",
    gallerySub: "د ځنګل څخه راټولول، پروسس او کیفیت ښودنه",
    adminBtn: "اډمن پورټل",
    waBtn: "واټساپ راکړه ورکړه"
  },
  ru: {
    tagline: "ПАКИСТАН • ПРОИСХОЖДЕНИЕ • ГЛОБАЛЬНО",
    mainHeading: 'Королевский Кедровый<br><span class="gold-text">Орех Чилгоза</span>',
    heroDesc: "Поставка аутентичного кедрового ореха Чилгоза из лесов Пакистана для мировой торговли и научных исследований.",
    tradeTitle: "ГЛОБАЛЬНАЯ ТОРГОВЛЯ",
    tradeDesc: "10 торговых хабов • Экспорт премиум качества →",
    researchTitle: "ИССЛЕДОВАНИЯ И ЗНАНИЯ",
    researchDesc: "10 научных хабов • Экология и ботаника →",
    galleryTitle: "Галерея Проекта",
    gallerySub: "Лесной сбор, обработка и презентация продукции",
    adminBtn: "Админ панель",
    waBtn: "WhatsApp Связь"
  }
};

// Initialize Application
document.addEventListener('DOMContentLoaded', async () => {
  setupEventListeners();
  await loadFoldersFromWorker();
  await loadHomepageImages();
  applyLanguage('en');
});

function setupEventListeners() {
  const langSelect = document.getElementById('langSelect');
  if (langSelect) {
    langSelect.addEventListener('change', (e) => changeLanguage(e.target.value));
  }
}

// Fetch Folders from Worker API (/api/folders)
async function loadFoldersFromWorker() {
  try {
    const response = await fetch('/api/folders');
    if (response.ok) {
      const data = await response.json();
      if (data.items && data.items.length > 0) {
        globalFolders = data.items;
      }
    }
  } catch (err) {
    console.warn("Using default internal hubs due to network/worker fetch limit:", err);
  }
}

// Fetch Homepage Images from Worker API (/api/home-images)
async function loadHomepageImages() {
  try {
    const response = await fetch('/api/home-images');
    if (response.ok) {
      const data = await response.json();
      if (data.items && data.items.length > 0) {
        homepageImages = data.items;
        renderGallery(homepageImages);
      }
    }
  } catch (err) {
    console.warn("Gallery loading standard fallback.");
  }
}

// Language Switcher Engine
function changeLanguage(langCode) {
  if (!LANGUAGES_META[langCode]) return;
  currentLang = langCode;
  
  // Set Text Direction (LTR / RTL)
  const dir = LANGUAGES_META[langCode].dir;
  document.documentElement.setAttribute('dir', dir);
  document.documentElement.setAttribute('lang', langCode);

  applyLanguage(langCode);
}

function applyLanguage(lang) {
  const t = translations[lang] || translations.en;
  
  const safeSetText = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.innerText = text;
  };

  const safeSetHTML = (id, html) => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = html;
  };

  safeSetText('tagline', t.tagline);
  safeSetHTML('mainHeading', t.mainHeading);
  safeSetText('heroDesc', t.heroDesc);
  safeSetText('tradeTitle', t.tradeTitle);
  safeSetText('tradeDesc', t.tradeDesc);
  safeSetText('researchTitle', t.researchTitle);
  safeSetText('researchDesc', t.researchDesc);
  safeSetText('galleryTitle', t.galleryTitle);
  safeSetText('gallerySub', t.gallerySub);
  safeSetText('adminBtnText', t.adminBtn);
  safeSetText('waBtnText', t.waBtn);
}

// Dynamic Folder Modal Opener (Trade vs Research)
function openCategory(sectionType) {
  const modal = document.getElementById('hubModal');
  const modalBody = document.getElementById('modalBody');
  if (!modal || !modalBody) return;

  // Filter Worker Folders or fallback to defaults
  let items = globalFolders.filter(f => f.section === sectionType);
  if (items.length === 0) {
    items = defaultHubs[sectionType] || [];
  }

  const isTrade = sectionType === 'trade';
  const icon = isTrade ? '🌐' : '🔬';
  const headerTitle = isTrade ? 'Global Trade Hubs (10)' : 'Research & Scientific Hubs (10)';

  let html = `
    <div style="text-align:center; margin-bottom: 30px;">
      <div style="font-size:3rem; margin-bottom:10px; filter: drop-shadow(0 0 10px rgba(212,175,55,0.5));">${icon}</div>
      <h2 style="color:var(--gold-primary); font-size:2rem; font-weight:800; margin-bottom:10px;">${headerTitle}</h2>
      <p style="color:var(--text-muted); font-size:0.95rem;">Select any hub to view technical specifications, trade procedures, or research documents.</p>
    </div>
    <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:20px;">
  `;

  items.forEach((hub, idx) => {
    const numTag = hub.num || `HUB ${String(idx + 1).padStart(2, '0')}`;
    html += `
      <div class="hub-card-item" onclick="openHubDetail('${hub.title.replace(/'/g, "\\'")}', '${(hub.description || hub.desc || '').replace(/'/g, "\\'")}', '${sectionType}')">
        <div style="color:var(--gold-primary); font-size:0.75rem; font-weight:800; letter-spacing:1px; margin-bottom:8px;">${numTag}</div>
        <h3 style="color:var(--text-main); font-size:1.25rem; font-weight:700; margin-bottom:10px;">${hub.title}</h3>
        <p style="color:var(--text-muted); font-size:0.88rem; line-height:1.5; margin-bottom:15px;">${hub.description || hub.desc}</p>
        <div style="color:var(--gold-light); font-weight:700; font-size:0.85rem; display:flex; align-items:center; gap:5px;">
          <span>Explore Folder</span> <span>→</span>
        </div>
      </div>
    `;
  });

  html += `</div>`;

  modalBody.innerHTML = html;
  modal.style.display = 'flex';
}

// Detailed View inside Modal (Includes AI Assistant Call Trigger)
function openHubDetail(title, desc, sectionType) {
  const modalBody = document.getElementById('modalBody');
  if (!modalBody) return;

  modalBody.innerHTML = `
    <div style="text-align:left; padding:10px;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
        <span style="color:var(--gold-primary); font-size:0.8rem; font-weight:800; letter-spacing:2px; text-transform:uppercase;">${sectionType} Ecosystem</span>
        <button onclick="openCategory('${sectionType}')" class="btn btn-admin" style="padding:6px 16px; font-size:0.8rem;">← Back to Hubs</button>
      </div>

      <h2 style="color:var(--gold-primary); font-size:2rem; font-weight:800; margin-bottom:15px;">${title}</h2>
      <p style="color:var(--text-main); font-size:1.05rem; line-height:1.7; margin-bottom:25px;">${desc}</p>
      
      <div style="background:rgba(5, 13, 8, 0.85); border:1px solid var(--border-gold); padding:22px; border-radius:16px; margin-bottom:25px;">
        <h4 style="color:var(--gold-light); font-size:1.1rem; margin-bottom:12px;">Standard Export & Scientific Specifications:</h4>
        <ul style="color:var(--text-muted); font-size:0.92rem; padding-left:20px; line-height:1.9;">
          <li><strong>HS Code (In-Shell):</strong> 0802.91.00 • <strong>HS Code (Shelled Kernels):</strong> 0802.92.00</li>
          <li><strong>Origin:</strong> Pure Native Forests of Pakistan (Geographical Indication Protected).</li>
          <li><strong>Quality Compliance:</strong> Phytosanitary Certified, GACC / CIFER Registered for China.</li>
          <li><strong>Packaging Options:</strong> 10kg/25kg Vacuum Bags with Nitrogen Flush or Bulk Cartons.</li>
        </ul>
      </div>

      <!-- Workers AI Assistant Direct Interface -->
      <div style="background:rgba(18, 38, 28, 0.9); border:1px dashed var(--gold-primary); padding:20px; border-radius:16px; margin-bottom:25px;">
        <h4 style="color:var(--gold-primary); margin-bottom:10px; display:flex; align-items:center; gap:8px;">
          🤖 Royal AI Hub Assistant
        </h4>
        <p style="color:var(--text-muted); font-size:0.85rem; margin-bottom:12px;">Ask Cloudflare Workers AI (@cf/meta/llama-3.1-8b-instruct) for technical details or custom quotes regarding ${title}:</p>
        <textarea id="aiPromptInput" placeholder="Type your inquiry here..." style="width:100%; height:70px; background:#050d08; border:1px solid var(--border-gold); color:#fff; border-radius:10px; padding:10px; font-size:0.9rem; outline:none; margin-bottom:10px;"></textarea>
        <button onclick="askWorkersAI()" class="btn btn-admin" style="width:100%; font-size:0.88rem;">Ask Royal AI Assistant</button>
        <div id="aiResponseBox" style="margin-top:15px; display:none; background:#050d08; border:1px solid var(--border-gold); padding:15px; border-radius:10px; color:var(--text-main); font-size:0.9rem; line-height:1.6;"></div>
      </div>

      <div style="display:flex; gap:12px; flex-wrap:wrap; justify-content:flex-end;">
        <a href="https://wa.me/920000000000" target="_blank" class="btn btn-wa" style="text-decoration:none; display:inline-flex; align-items:center; gap:6px;">
          <span>💬 Connect via WhatsApp</span>
        </a>
      </div>
    </div>
  `;
}

// Call Worker AI Endpoint (/api/ai)
async function askWorkersAI() {
  const input = document.getElementById('aiPromptInput');
  const responseBox = document.getElementById('aiResponseBox');
  if (!input || !input.value.trim()) return;

  responseBox.style.display = 'block';
  responseBox.innerHTML = '<span style="color:var(--gold-primary);">Analyzing query with Workers AI...</span>';

  try {
    const res = await fetch('/api/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: input.value.trim(),
        language: currentLang
      })
    });

    const data = await res.json();
    if (res.ok && data.result) {
      responseBox.innerText = typeof data.result === 'string' ? data.result : JSON.stringify(data.result);
    } else {
      responseBox.innerText = "Royal AI Response: " + (data.error || "Unable to process request.");
    }
  } catch (err) {
    responseBox.innerText = "Connection Error: Workers AI backend unreachable.";
  }
}

// Render Project Gallery
function renderGallery(images) {
  const grid = document.getElementById('galleryGrid');
  if (!grid || !images || images.length === 0) return;

  let html = '';
  images.forEach(img => {
    html += `
      <div style="position:relative; overflow:hidden; border-radius:14px;">
        <img src="${img.file_name}" alt="${img.alt_text || 'Chilghoza'}" style="width:100%; height:220px; object-fit:cover; border-radius:14px; border:1px solid var(--border-gold); transition:0.4s ease;" />
        <div style="position:absolute; bottom:0; left:0; right:0; background:rgba(5, 13, 8, 0.85); padding:8px 12px; border-bottom-left-radius:14px; border-bottom-right-radius:14px; text-align:left;">
          <div style="color:var(--gold-primary); font-size:0.8rem; font-weight:700;">${img.title}</div>
        </div>
      </div>
    `;
  });
  grid.innerHTML = html;
}

// Modal Close Handlers
function closeModal() {
  const modal = document.getElementById('hubModal');
  if (modal) modal.style.display = 'none';
}

window.onclick = function(event) {
  const modal = document.getElementById('hubModal');
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};
