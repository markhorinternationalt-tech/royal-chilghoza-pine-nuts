/* ==========================================================================
   ROYAL CHILGHOZA ECOSYSTEM — PRODUCTION READY ENGINE
   Fixes: Inner Folder Translation, 3D Back Buttons, Royal AI Panel, 
   Profile Framing, HD R2 Gallery & Address Details
   ========================================================================== */

// Global State
let currentLang = 'en';
let globalFolders = [];
let homepageImages = [];

// Supported Languages & Translations
const LANGUAGES_META = {
  en: { name: 'English', dir: 'ltr' },
  zh: { name: '中文', dir: 'ltr' },
  ar: { name: 'العربية', dir: 'rtl' },
  ps: { name: 'پښتو', dir: 'rtl' },
  ru: { name: 'Русский', dir: 'ltr' }
};

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
    waBtn: "WhatsApp Trade",
    backBtn: "← Back to Main",
    aiTitle: "🤖 Royal AI Assistant",
    aiDesc: "Ask Cloudflare Workers AI about market trends, specifications, or GI validation:",
    aiBtn: "Ask AI Assistant",
    addressTitle: "Headquarters & Native Origin",
    addressText: "Chilas, Diamer District, Gilgit-Baltistan, Pakistan"
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
    waBtn: "微信/WhatsApp 咨询",
    backBtn: "← 返回主页",
    aiTitle: "🤖 皇家 AI 助手",
    aiDesc: "向 Cloudflare Workers AI 查询市场趋势、规格或地理标志验证：",
    aiBtn: "询问 AI 助手",
    addressTitle: "总部与原产地",
    addressText: "巴基斯坦 吉尔吉特-巴尔蒂斯坦 迪亚梅尔区 奇拉斯"
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
    waBtn: "واتساب للتجارة",
    backBtn: "← العودة للرئيسية",
    aiTitle: "🤖 مساعد الذكاء الاصطناعي الملكي",
    aiDesc: "اسأل الذكاء الاصطناعي عن اتجاهات السوق، المواصفات، أو توثيق المؤشر الجغرافي:",
    aiBtn: "اسأل المساعد",
    addressTitle: "المقر الرئيسي والموطن الأصلي",
    addressText: "شيلاس، مقاطعة ديامير، غلغت-بلتستان، باكستان"
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
    waBtn: "واټساپ راکړه ورکړه",
    backBtn: "← اصلي صفحې ته بېرته",
    aiTitle: "🤖 شاهي AI مرستیال",
    aiDesc: "د بازار نرخونو، مشخصاتو او د اصل تصدیق په اړه د AI څخه پوښتنه وکړئ:",
    aiBtn: "پوښتنه وکړئ",
    addressTitle: "مرکزي دفتر او اصلي سرچینه",
    addressText: "چلاس، دیامر ولسوالۍ، گلگت بلتستان، پاکستان"
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
    waBtn: "WhatsApp Связь",
    backBtn: "← На главную",
    aiTitle: "🤖 Королевский AI Ассистент",
    aiDesc: "Задайте вопрос AI о рыночных трендах, спецификациях и сертификатах:",
    aiBtn: "Спросить AI",
    addressTitle: "Штаб-квартира и Происхождение",
    addressText: "Чилас, Округ Диамер, Гилгит-Балтистан, Пакистан"
  }
};

// Fallback 8 HD R2 Gallery Images
const defaultGallery = [
  { file_name: "https://pub-2098d8c2138743ae88c222ff444c82b9.r2.dev/chilghoza_harvest_1.jpg", title: "Forest Harvest", alt_text: "Native Forest Collection" },
  { file_name: "https://pub-2098d8c2138743ae88c222ff444c82b9.r2.dev/chilghoza_processing_2.jpg", title: "Mechanical Shelling", alt_text: "Processing Line" },
  { file_name: "https://pub-2098d8c2138743ae88c222ff444c82b9.r2.dev/chilghoza_raw_3.jpg", title: "In-Shell Grade A", alt_text: "Raw Pine Nuts" },
  { file_name: "https://pub-2098d8c2138743ae88c222ff444c82b9.r2.dev/chilghoza_kernel_4.jpg", title: "Shelled Kernels", alt_text: "Export Quality Kernels" },
  { file_name: "https://pub-2098d8c2138743ae88c222ff444c82b9.r2.dev/chilghoza_pack_5.jpg", title: "Vacuum Packaging", alt_text: "Nitrogen Flush Bags" },
  { file_name: "https://pub-2098d8c2138743ae88c222ff444c82b9.r2.dev/chilghoza_lab_6.jpg", title: "Quality Control", alt_text: "Lab Chemical Inspection" },
  { file_name: "https://pub-2098d8c2138743ae88c222ff444c82b9.r2.dev/chilghoza_forest_7.jpg", title: "Diamer Canopy Forest", alt_text: "Chilas Forest" },
  { file_name: "https://pub-2098d8c2138743ae88c222ff444c82b9.r2.dev/chilghoza_export_8.jpg", title: "Global Shipping", alt_text: "Export Logistics" }
];

// App Initialization
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

async function loadFoldersFromWorker() {
  try {
    const res = await fetch('/api/folders');
    if (res.ok) {
      const data = await res.json();
      if (data.items && data.items.length > 0) globalFolders = data.items;
    }
  } catch (err) {
    console.warn("Using internal fallback hubs.");
  }
}

async function loadHomepageImages() {
  try {
    const res = await fetch('/api/home-images');
    if (res.ok) {
      const data = await res.json();
      if (data.items && data.items.length > 0) {
        homepageImages = data.items;
        renderGallery(homepageImages);
        return;
      }
    }
  } catch (err) {}
  renderGallery(defaultGallery);
}

function changeLanguage(langCode) {
  if (!LANGUAGES_META[langCode]) return;
  currentLang = langCode;
  document.documentElement.setAttribute('dir', LANGUAGES_META[langCode].dir);
  document.documentElement.setAttribute('lang', langCode);
  applyLanguage(langCode);
}

function applyLanguage(lang) {
  const t = translations[lang] || translations.en;
  
  const setText = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.innerText = text;
  };

  setText('tagline', t.tagline);
  const headingEl = document.getElementById('mainHeading');
  if (headingEl) headingEl.innerHTML = t.mainHeading;
  
  setText('heroDesc', t.heroDesc);
  setText('tradeTitle', t.tradeTitle);
  setText('tradeDesc', t.tradeDesc);
  setText('researchTitle', t.researchTitle);
  setText('researchDesc', t.researchDesc);
  setText('galleryTitle', t.galleryTitle);
  setText('gallerySub', t.gallerySub);
  setText('adminBtnText', t.adminBtn);
  setText('waBtnText', t.waBtn);
  setText('aiTitleText', t.aiTitle);
  setText('aiDescText', t.aiDesc);
  setText('aiBtnText', t.aiBtn);
  setText('addressTitleText', t.addressTitle);
  setText('addressDetailText', t.addressText);
}

// Open Category Hubs Modal with 3D Back Controls & Multi-language Support
function openCategory(sectionType) {
  const modal = document.getElementById('hubModal');
  const modalBody = document.getElementById('modalBody');
  const t = translations[currentLang] || translations.en;

  let items = globalFolders.filter(f => f.section === sectionType);

  const icon = sectionType === 'trade' ? '🌐' : '🔬';
  const titleText = sectionType === 'trade' ? t.tradeTitle : t.researchTitle;

  let html = `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:25px; border-bottom:1px solid var(--border-gold); padding-bottom:15px;">
      <button onclick="closeModal()" class="btn btn-admin" style="font-size:0.85rem;">${t.backBtn}</button>
      <span style="color:var(--gold-primary); font-size:1.1rem; font-weight:800;">${icon} ${titleText}</span>
    </div>
    <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:20px;">
  `;

  if (items.length === 0) {
    for (let i = 1; i <= 10; i++) {
      const padNum = String(i).padStart(2, '0');
      html += `
        <div class="hub-card-item" onclick="openHubDetail('HUB ${padNum}', '${sectionType.toUpperCase()} Spec details for Hub ${padNum}', '${sectionType}')">
          <div style="color:var(--gold-primary); font-size:0.8rem; font-weight:800;">HUB ${padNum}</div>
          <h3 style="color:var(--text-main); font-size:1.15rem; font-weight:700; margin:8px 0;">${sectionType === 'trade' ? 'Trade Hub' : 'Research Hub'} ${padNum}</h3>
          <p style="color:var(--text-muted); font-size:0.85rem; line-height:1.5;">Click to explore full specifications, compliance rules, and export data.</p>
        </div>
      `;
    }
  } else {
    items.forEach((hub, idx) => {
      html += `
        <div class="hub-card-item" onclick="openHubDetail('${hub.title.replace(/'/g, "\\'")}', '${(hub.description || '').replace(/'/g, "\\'")}', '${sectionType}')">
          <div style="color:var(--gold-primary); font-size:0.8rem; font-weight:800;">HUB ${String(idx + 1).padStart(2, '0')}</div>
          <h3 style="color:var(--text-main); font-size:1.15rem; font-weight:700; margin:8px 0;">${hub.title}</h3>
          <p style="color:var(--text-muted); font-size:0.85rem; line-height:1.5;">${hub.description || ''}</p>
        </div>
      `;
    });
  }

  html += `</div>`;
  modalBody.innerHTML = html;
  modal.style.display = 'flex';
}

function openHubDetail(title, desc, sectionType) {
  const modalBody = document.getElementById('modalBody');
  const t = translations[currentLang] || translations.en;

  modalBody.innerHTML = `
    <div style="text-align:left;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
        <button onclick="openCategory('${sectionType}')" class="btn btn-admin" style="font-size:0.85rem;">${t.backBtn}</button>
        <span style="color:var(--gold-primary); font-weight:700; font-size:0.85rem; letter-spacing:1px; text-transform:uppercase;">${sectionType} Hub</span>
      </div>

      <h2 style="color:var(--gold-primary); font-size:1.8rem; font-weight:800; margin-bottom:12px;">${title}</h2>
      <p style="color:var(--text-main); font-size:1rem; line-height:1.7; margin-bottom:20px;">${desc}</p>

      <div style="background:rgba(5, 13, 8, 0.9); border:1px solid var(--border-gold); padding:20px; border-radius:16px; margin-bottom:20px;">
        <h4 style="color:var(--gold-light); font-size:1rem; margin-bottom:10px;">Technical & Legal Standards:</h4>
        <ul style="color:var(--text-muted); font-size:0.88rem; padding-left:18px; line-height:1.8;">
          <li><strong>Origin:</strong> Chilas, Diamer District, Gilgit-Baltistan (Protected GI).</li>
          <li><strong>Export HS Codes:</strong> 0802.91.00 (In-Shell) | 0802.92.00 (Shelled Kernels).</li>
          <li><strong>Quality Registration:</strong> Phytosanitary Certified, GACC / CIFER Ready.</li>
        </ul>
      </div>

      <a href="https://wa.me/920000000000" target="_blank" class="btn btn-wa" style="width:100%; justify-content:center;">
        <span>💬 Contact Trade Desk via WhatsApp</span>
      </a>
    </div>
  `;
}

// Permanent & Modal Workers AI Call
async function askWorkersAI(inputContainerId, responseBoxId) {
  const input = document.getElementById(inputContainerId);
  const responseBox = document.getElementById(responseBoxId);
  if (!input || !input.value.trim()) return;

  responseBox.style.display = 'block';
  responseBox.innerHTML = '<span style="color:var(--gold-primary);">Processing query with Cloudflare Workers AI...</span>';

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
      responseBox.innerText = "Royal AI: " + (data.error || "Service unavailable.");
    }
  } catch (err) {
    responseBox.innerText = "Error connecting to Workers AI engine.";
  }
}

// Render 8 HD Gallery Images
function renderGallery(images) {
  const grid = document.getElementById('galleryGrid');
  if (!grid) return;

  let html = '';
  images.forEach(img => {
    html += `
      <div style="position:relative; overflow:hidden; border-radius:16px; border:1px solid var(--border-gold); background:#050d08;">
        <img src="${img.file_name}" alt="${img.alt_text || 'Chilghoza'}" style="width:100%; height:200px; object-fit:cover; display:block; transition:0.4s ease;" loading="lazy" />
        <div style="position:absolute; bottom:0; left:0; right:0; background:rgba(3, 10, 5, 0.85); padding:10px; backdrop-filter:blur(5px);">
          <div style="color:var(--gold-primary); font-size:0.85rem; font-weight:700;">${img.title}</div>
        </div>
      </div>
    `;
  });
  grid.innerHTML = html;
}

function closeModal() {
  const modal = document.getElementById('hubModal');
  if (modal) modal.style.display = 'none';
}

window.onclick = function(event) {
  const modal = document.getElementById('hubModal');
  if (event.target === modal) closeModal();
};
