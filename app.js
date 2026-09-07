/* ==========================================================================
   ROYAL CHILGHOZA ECOSYSTEM - MODULE 3: DYNAMIC HUBS & MULTILINGUAL LOGIC
   ========================================================================== */

// 1. All 20 Hubs Data (10 Trade + 10 Research)
const hubsData = {
  trade: [
    { id: "hub-01", num: "HUB 01", title: "Global Markets", desc: "Global demand, market opportunities and international trade destinations." },
    { id: "hub-02", num: "HUB 02", title: "USA Market & Buyers", desc: "U.S. buyers, importers, market opportunities and business connections." },
    { id: "hub-03", num: "HUB 03", title: "China Market & Buyers", desc: "Chinese buyers, traders, importers, GACC/CIFER standards and commercial opportunities." },
    { id: "hub-04", num: "HUB 04", title: "Export & Logistics", desc: "Export documentation (Phytosanitary, Certificate of Origin, HS 0802.91.00/92.00), customs, and shipping." },
    { id: "hub-05", num: "HUB 05", title: "Product & Quality", desc: "Kernels, in-shell nuts, roasting, grades, specifications and quality standards." },
    { id: "hub-06", num: "HUB 06", title: "Supply Chain & Traceability", desc: "Forest → collector → processing → packing → export, with transparent traceability." },
    { id: "hub-07", num: "HUB 07", title: "Geographical Indication (GI)", desc: "Origin, identity, authenticity, geographical reputation and product traceability." },
    { id: "hub-08", num: "HUB 08", title: "Organic Chemistry & Natural Quality", desc: "Natural oils, chemical composition, purity, nutritional properties and quality characteristics." },
    { id: "hub-09", num: "HUB 09", title: "Processing, Packaging & Value Addition", desc: "Processing, grading, roasting, packaging, branding and premium product development." },
    { id: "hub-10", num: "HUB 10", title: "Sustainable & Ethical Trade", desc: "Responsible sourcing, fair value, community benefits and conservation-linked trade." }
  ],
  research: [
    { id: "res-01", num: "HUB 01", title: "Geographical Origin & GI Research", desc: "Chilgoza origin, geographical identity, traditional knowledge and GI research." },
    { id: "res-02", num: "HUB 02", title: "Chilgoza Biology & Botany", desc: "Tree biology (Pinus gerardiana), growth, reproduction, seed development and natural regeneration." },
    { id: "res-03", num: "HUB 03", title: "Nutrition Value & Natural Composition", desc: "Protein, natural oils, minerals, nutrients and scientific composition." },
    { id: "res-04", num: "HUB 04", title: "Chilgoza Forests & Ecology", desc: "Forest ecosystems, ecological functions, regeneration and sustainable forest management." },
    { id: "res-05", num: "HUB 05", title: "Biodiversity & Wildlife", desc: "Wildlife habitats, biodiversity, ecosystem services and conservation values." },
    { id: "res-06", num: "HUB 06", title: "Climate & Global Green Environment", desc: "Climate resilience, carbon, water, soil protection and global environmental benefits." },
    { id: "res-07", num: "HUB 07", title: "Forest Conservation & Restoration", desc: "Forest protection, restoration, natural regeneration, plantation and sustainable management." },
    { id: "res-08", num: "HUB 08", title: "Supply Chain & Community Livelihoods", desc: "Local collectors, rural livelihoods, value chains, income generation and poverty reduction." },
    { id: "res-09", num: "HUB 09", title: "Sustainable Harvesting & Community Awareness", desc: "Safe harvesting, forest protection, community training and conservation awareness." },
    { id: "res-10", num: "HUB 10", title: "Research, Policy & Partnerships", desc: "Research knowledge, government policy, FAO, GEF, NGOs, institutions and future partnerships." }
  ]
};

// 2. Multilingual Translations
const translations = {
  en: {
    tagline: "PAKISTAN • ORIGIN • GLOBAL",
    mainHeading: 'Royal Chilghoza<br><span class="gold-text">Pine Nuts</span>',
    heroDesc: "From the Chilghoza forests of Pakistan to the world — connecting premium quality, authentic origin, responsible supply chains, and deep knowledge.",
    tradeTitle: "GLOBAL TRADE",
    tradeDesc: "Premium quality • Worldwide export →",
    researchTitle: "RESEARCH & KNOWLEDGE",
    researchDesc: "Science • Origin • Forests • Quality →",
    galleryTitle: "Project Gallery",
    gallerySub: "Authentic forest harvesting, processing & premium pine nut display"
  },
  ps: {
    tagline: "پاکستان • اصل • نړیوال",
    mainHeading: 'شاهي جلغوزي<br><span class="gold-text">پائن مغز</span>',
    heroDesc: "د پاکستان د جلغوزو له ځنګلونو څخه نړۍ ته — لوړ کیفیت، اصلي اصل، او غوره تجارت نښلول.",
    tradeTitle: "نړیوال تجارت",
    tradeDesc: "لوړ کیفیت • نړیوال صادرات →",
    researchTitle: "څیړنه او پوهه",
    researchDesc: "ساینس • سرچینه • ځنګلونه • کیفیت →",
    galleryTitle: "د پروژې ګالري",
    gallerySub: "د ځنګل راټولول او د پروسس انځورونه"
  },
  ar: {
    tagline: "باكستان • الأصل • عالمي",
    mainHeading: 'الصنوبر الملكي<br><span class="gold-text">جلغوزة</span>',
    heroDesc: "من غابات الصنوبر في باكستان إلى العالم - ربط الجودة العالية والأصل الحقيقي وسلاسل التوريد.",
    tradeTitle: "التجارة العالمية",
    tradeDesc: "جودة عالية • تصدير لجميع أنحاء العالم →",
    researchTitle: "الأبحاث والمعرفة",
    researchDesc: "العلوم • الأصل • الغابات • الجودة →",
    galleryTitle: "معرض المشروع",
    gallerySub: "حصاد الغابات المعالج والعرض الممتاز"
  },
  zh: {
    tagline: "巴基斯坦 • 原产地 • 全球",
    mainHeading: '皇家松子<br><span class="gold-text">Chilghoza</span>',
    heroDesc: "从巴基斯坦的松子森林走向世界——连接优质品质、真实原产地和负责任的供应链。",
    tradeTitle: "全球贸易",
    tradeDesc: "优质品质 • 全球出口 →",
    researchTitle: "研究与知识",
    researchDesc: "科学 • 原产地 • 森林 • 质量 →",
    galleryTitle: "项目图库",
    gallerySub: "真实森林采收、加工与松子展示"
  },
  ru: {
    tagline: "ПАКИСТАН • ПРОИСХОЖДЕНИЕ • ГЛОБАЛЬНО",
    mainHeading: 'Королевский Кедровый<br><span class="gold-text">Орех Чилгоза</span>',
    heroDesc: "Из лесов Чилгоза в Пакистане — миру: премиальное качество, подлинное происхождение и надежные поставки.",
    tradeTitle: "ГЛОБАЛЬНАЯ ТОРГОВЛЯ",
    tradeDesc: "Премиум качество • Экспорт по всему миру →",
    researchTitle: "ИССЛЕДОВАНИЯ И ЗНАНИЯ",
    researchDesc: "Наука • Происхождение • Леса • Качество →",
    galleryTitle: "Галерея Проекта",
    gallerySub: "Сбор урожая в лесу, обработка и демонстрация"
  }
};

// 3. Language Switcher
function changeLanguage(lang) {
  const data = translations[lang] || translations.en;
  document.getElementById('tagline').innerText = data.tagline;
  document.getElementById('mainHeading').innerHTML = data.mainHeading;
  document.getElementById('heroDesc').innerText = data.heroDesc;
  document.getElementById('tradeTitle').innerText = data.tradeTitle;
  document.getElementById('tradeDesc').innerText = data.tradeDesc;
  document.getElementById('researchTitle').innerText = data.researchTitle;
  document.getElementById('researchDesc').innerText = data.researchDesc;
  document.getElementById('galleryTitle').innerText = data.galleryTitle;
  document.getElementById('gallerySub').innerText = data.gallerySub;
}

// 4. Open Category Modal (Mini-Website for 10 Hubs)
function openCategory(type) {
  const modal = document.getElementById('hubModal');
  const modalBody = document.getElementById('modalBody');
  const items = hubsData[type] || [];
  const title = type === 'trade' ? 'Global Trade Hubs' : 'Research & Knowledge Hubs';
  const icon = type === 'trade' ? '🌍' : '🌲';

  let html = `
    <div style="text-align:center; margin-bottom: 25px;">
      <div style="font-size:2.5rem;">${icon}</div>
      <h2 style="color:var(--gold); font-size:1.8rem; margin:10px 0;">${title}</h2>
      <p style="color:var(--text-muted); font-size:0.95rem;">Select any hub to explore detailed resources and official documentation.</p>
    </div>
    <div style="display:grid; gap:18px;">
  `;

  items.forEach(hub => {
    html += `
      <div class="hub-card" style="background:var(--bg-card); border:1px solid var(--border-gold); border-radius:12px; padding:20px; cursor:pointer;" onclick="openHubDetail('${hub.title}', '${hub.desc}')">
        <div style="color:var(--gold); font-size:0.75rem; font-weight:700; letter-spacing:1px; margin-bottom:4px;">${hub.num}</div>
        <h3 style="color:var(--text-main); font-size:1.2rem; margin-bottom:6px;">${hub.title}</h3>
        <p style="color:var(--text-muted); font-size:0.9rem; margin-bottom:12px;">${hub.desc}</p>
        <span style="color:var(--gold); font-weight:600; font-size:0.85rem;">Open Folder Website →</span>
      </div>
    `;
  });

  html += `
    </div>
    <div style="text-align:center; margin-top:30px;">
      <a href="https://wa.me/920000000000" target="_blank" class="btn btn-wa" style="display:inline-block; padding:12px 28px; font-size:1rem; text-decoration:none;">💬 Chat on WhatsApp Now</a>
    </div>
  `;

  modalBody.innerHTML = html;
  modal.style.display = 'flex';
}

// 5. Open Single Hub Mini-Website View
function openHubDetail(title, desc) {
  const modalBody = document.getElementById('modalBody');
  modalBody.innerHTML = `
    <div style="text-align:center; padding:10px;">
      <h2 style="color:var(--gold); font-size:1.8rem; margin-bottom:15px;">${title}</h2>
      <p style="color:var(--text-main); font-size:1.05rem; line-height:1.7; margin-bottom:25px;">${desc}</p>
      
      <div style="background:rgba(11,26,18,0.6); border:1px solid var(--border-gold); padding:20px; border-radius:12px; margin-bottom:25px; text-align:left;">
        <h4 style="color:var(--gold); margin-bottom:10px;">Official Trade & Regulatory Context:</h4>
        <ul style="color:var(--text-muted); font-size:0.9rem; padding-left:20px; line-height:1.8;">
          <li>HS Code (In-Shell): 0802.91.00</li>
          <li>HS Code (Shelled Kernels): 0802.92.00</li>
          <li>Phytosanitary Certification via Department of Plant Protection (DPP).</li>
          <li>GACC / CIFER Registration available for mainland China trade.</li>
        </ul>
      </div>

      <a href="https://wa.me/920000000000" target="_blank" class="btn btn-wa" style="display:inline-block; padding:12px 28px; font-size:1rem; text-decoration:none; margin-right:10px;">💬 Contact on WhatsApp</a>
      <button class="btn btn-admin" onclick="openCategory('trade')" style="padding:12px 25px;">← Back to Hubs</button>
    </div>
  `;
}

// 6. Close Modal Function
function closeModal() {
  document.getElementById('hubModal').style.display = 'none';
}

// Close Modal when clicking outside content
window.onclick = function(event) {
  const modal = document.getElementById('hubModal');
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};
