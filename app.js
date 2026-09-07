// ===== CONFIGURATION =====
const WHATSAPP_NUMBER = "923336665688";
const ADMIN_TOKEN_KEY = "royalAdminToken";
const ADMIN_FLAG = "royalAdmin";
const LANG_KEY = "royalLanguage";
const THEME_KEY = "royalTheme";

// ===== STATE =====
const state = {
  lang: sessionStorage.getItem(LANG_KEY) || "en",
  gateway: null,
  hub: null,
  admin: sessionStorage.getItem(ADMIN_FLAG) === "1",
  token: sessionStorage.getItem(ADMIN_TOKEN_KEY) || "",
};

// ===== LANGUAGES =====
const languages = ["en", "zh", "ar", "ps", "ru"];

// ===== HUB DATA (Hardcoded for now, later will come from API) =====
const hubData = {
  en: {
    trade: [
      ["Global Markets for Chilghoza Pine Nuts", "USA • China • Central Asia • Middle East"],
      ["USA Market & Buyers for Chilghoza Pine Nuts", "Buyers • requirements • opportunities"],
      ["China Market & Buyers for Chilghoza Pine Nuts", "Trade desk • buyers • market intelligence"],
      ["Export & Logistics for Chilghoza Pine Nuts", "Packaging • documentation • shipping • customs"],
      ["Product & Quality Standards for Chilghoza Pine Nuts", "Kernels • in-shell • grades • specifications"],
      ["Supply Chain & Traceability of Chilghoza Pine Nuts", "Forest → collector → processing → packing → export"],
      ["Geographical Indication (GI) of Chilghoza Pine Nuts", "Origin • identity • protection"],
      ["Organic Chemistry & Natural Quality of Chilghoza Pine Nuts", "Natural composition • quality • food science"],
      ["Processing, Packaging & Value Addition for Chilghoza Pine Nuts", "Drying • roasting • grading • storage"],
      ["Sustainable & Ethical Trade of Chilghoza Pine Nuts", "Communities • forests • responsible trade"],
    ],
    research: [
      ["Geographical Origin & GI Research on Chilghoza Pine Nuts", "Origin • geography • GI research"],
      ["Chilghoza Pine Nuts Biology & Botany", "Species • biology • botany"],
      ["Nutrition Value & Natural Composition of Chilghoza Pine Nuts", "Nutrition • composition • natural quality"],
      ["Chilghoza Pine Nuts Forests & Ecology", "Forests • ecology • ecosystems"],
      ["Biodiversity & Wildlife in Chilghoza Pine Nuts Forests", "Wildlife • biodiversity • habitats"],
      ["Climate & Global Green Environment for Chilghoza Pine Nuts", "Climate • environment • resilience"],
      ["Forest Conservation & Restoration for Chilghoza Pine Nuts", "Conservation • restoration • stewardship"],
      ["Supply Chain & Livelihoods of Chilghoza Pine Nuts Communities", "Communities • livelihoods • value chain"],
      ["Sustainable Harvesting & Awareness for Chilghoza Pine Nuts", "Harvesting • awareness • best practice"],
      ["Research, Policy & Partnerships for Chilghoza Pine Nuts", "Research • policy • partnerships"],
    ],
  },
  // Other languages omitted for brevity; full data in previous version
};

// ===== GALLERY DATA =====
const gallery = [
  ["01-chilghoza-lot.jpg", "Chilghoza Pine Nuts Lot Inspection & Grading"],
  ["02-chilghoza-cones.jpg", "Harvested Cones of Chilghoza Pine Nuts"],
  ["03-chilghoza-kernel.jpg", "Premium Shelled Kernels of Chilghoza Pine Nuts"],
  ["04-chilghoza-harvest.jpg", "Sustainable Harvesting of Chilghoza Pine Nuts"],
  ["05-chilghoza-raw-kernels.jpg", "Raw Selection of Chilghoza Pine Nuts"],
  ["06-chilghoza-cone-closeup.jpg", "Macro Detail of Chilghoza Pine Nuts Cone"],
  ["07-chilghoza-products-display.jpg", "Export Packaging of Chilghoza Pine Nuts"],
  ["08-chilghoza-forest.jpg", "Chilas, Diamer Native Chilghoza Pine Nuts Forest"],
];

// ===== OFFICES =====
const offices = [
  "Chilas, Diamer District, Gilgit-Baltistan, Pakistan",
  "Gilgit, Gilgit-Baltistan, Pakistan",
  "Islamabad, Pakistan",
  "China / International Export Hub",
];

// ===== TRANSLATIONS (only en needed, others can be added) =====
const T = {
  en: {
    navHome: "Home",
    navTrade: "Global Trade",
    navResearch: "Research & Knowledge",
    navGallery: "Gallery",
    admin: "Admin",
    eyebrow: "PAKISTAN · ORIGIN · GLOBAL",
    heroRoyal: "Royal",
    heroTitle: "Chilghoza Pine Nuts",
    heroText: "From the Chilghoza Pine Nuts forests of Pakistan to the world — connecting premium quality, authentic origin, responsible supply chains and knowledge.",
    exploreTrade: "Explore Global Trade",
    exploreResearch: "Explore Research",
    gatewayEyebrow: "TWO PRIMARY GATEWAYS",
    gatewayTitle: "One Royal Chilghoza Pine Nuts Ecosystem",
    tradeTitle: "GLOBAL TRADE",
    tradeText: "Premium quality · Worldwide export · Markets and buyers",
    researchTitle: "RESEARCH & KNOWLEDGE",
    researchText: "Science · Origin · Forests · Ecology · Knowledge",
    openGateway: "Open Gateway",
    galleryEyebrow: "ROYAL FIELD ARCHIVE",
    galleryTitle: "Chilghoza Pine Nuts Gallery",
    galleryText: "Eight editable visual records from forest, harvest, grading and export.",
    aiTitle: "Royal AI Assistant",
    aiText: "Ask about Chilghoza Pine Nuts, trade, quality, forests and research.",
    aiPlaceholder: "Ask about Chilghoza Pine Nuts...",
    ask: "Ask AI",
    directInquiry: "DIRECT TRADE INQUIRY",
    whatsappTitle: "WhatsApp Chilghoza Pine Nuts Trade Desk",
    officeEyebrow: "CONTACT · OFFICE · PARTNERSHIP",
    officeTitle: "Office Address",
    back: "Back",
    hubContent: "Knowledge Hub",
    hubBody: "This full mini-website page is ready for Admin content, articles, market information, research records and detailed descriptions.",
    whatsappTrade: "WhatsApp Trade",
    mediaTitle: "Images · Videos · PDFs",
    mediaEmpty: "Dynamic media will appear here after upload.",
    visitorAI: "Visitor Assistant",
    adminAI: "Admin Assistant",
  },
};

// ===== TRANSLATION HELPER =====
function tx(k) {
  return (T[state.lang] && T[state.lang][k]) || T.en[k] || k;
}
function hubs(type) {
  const data = hubData[state.lang] || hubData.en;
  return data[type] || hubData.en[type];
}

// ===== LANGUAGE APPLICATION =====
function applyLanguage() {
  document.documentElement.lang = state.lang;
  document.documentElement.dir = state.lang === "ar" ? "rtl" : "ltr";
  document.querySelectorAll("[data-i18n]").forEach(el => el.textContent = tx(el.dataset.i18n));
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => el.placeholder = tx(el.dataset.i18nPlaceholder));
  document.querySelectorAll("#languageSelect,#gatewayLanguage,#hubLanguage").forEach(s => s.value = state.lang);
  document.getElementById("aiModeLabel").textContent = state.admin ? tx("adminAI") : tx("visitorAI");
  renderOffices();
  renderGallery();
  if (state.gateway) renderGateway(state.gateway);
  if (state.hub) renderHub(state.hub.type, state.hub.index);
}
function setLanguage(lang) {
  if (!languages.includes(lang)) return;
  state.lang = lang;
  sessionStorage.setItem(LANG_KEY, lang);
  applyLanguage();
}

// ===== RENDER GALLERY =====
function renderGallery() {
  const grid = document.getElementById("galleryGrid");
  if (!grid) return;
  grid.innerHTML = gallery.map(([src, cap], i) =>
    `<figure class="gallery-item">
      <img src="${src}" alt="${cap}" loading="lazy" onerror="this.classList.add('failed')">
      <figcaption><span>${String(i+1).padStart(2,"0")}</span>${cap}</figcaption>
    </figure>`
  ).join("");
}

// ===== RENDER OFFICES =====
function renderOffices() {
  const grid = document.getElementById("officeGrid");
  if (!grid) return;
  const titles = ["Headquarters & Native Origin", "Regional Operations Hub", "Federal & Trade Desk", "International Trade Desk"];
  grid.innerHTML = offices.map((addr, i) =>
    `<article class="office-card">
      <span>${String(i+1).padStart(2,"0")}</span>
      <h3>${titles[i]}</h3>
      <p>${addr}</p>
    </article>`
  ).join("");
}

// ===== GATEWAY & HUB NAVIGATION =====
function openGateway(type) {
  document.body.classList.add("subview");
  state.gateway = type;
  state.hub = null;
  document.getElementById("mainPage").hidden = true;
  document.getElementById("hubView").classList.remove("open");
  document.getElementById("gatewayView").classList.add("open");
  renderGateway(type);
  window.scrollTo(0, 0);
}
function renderGateway(type) {
  const isTrade = type === "trade";
  document.getElementById("gatewayEyebrow").textContent = isTrade ? "PRIMARY GATEWAY 01" : "PRIMARY GATEWAY 02";
  document.getElementById("gatewayTitleText").textContent = isTrade ? tx("tradeTitle") : tx("researchTitle");
  document.getElementById("gatewayDescription").textContent = isTrade ? tx("tradeText") : tx("researchText");
  const list = hubs(type);
  const container = document.getElementById("hubGridPage");
  container.innerHTML = list.map(([title, desc], i) =>
    `<button class="hub-card" data-hub="${type}:${i}">
      <span>${String(i+1).padStart(2,"0")}</span>
      <h2>${title}</h2>
      <p>${desc}</p>
      <b>→</b>
    </button>`
  ).join("");
  container.querySelectorAll("[data-hub]").forEach(btn => {
    btn.onclick = () => {
      const [type, index] = btn.dataset.hub.split(":");
      openHub(type, +index);
    };
  });
}
function openHub(type, index) {
  state.hub = { type, index };
  document.getElementById("gatewayView").classList.remove("open");
  document.getElementById("hubView").classList.add("open");
  renderHub(type, index);
  window.scrollTo(0, 0);
}
function renderHub(type, index) {
  const [title, desc] = hubs(type)[index];
  document.getElementById("hubNo").textContent = `${type === "trade" ? tx("tradeTitle") : tx("researchTitle")} · ${String(index+1).padStart(2,"0")}`;
  document.getElementById("hubTitleText").textContent = title;
  document.getElementById("hubDescription").textContent = desc;
  document.getElementById("hubWhatsapp").href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Inquiry about " + title)}`;
}
function closeGateway() {
  document.body.classList.remove("subview");
  state.gateway = null;
  state.hub = null;
  document.getElementById("gatewayView").classList.remove("open");
  document.getElementById("hubView").classList.remove("open");
  document.getElementById("mainPage").hidden = false;
}

// ===== AI =====
async function askAI(message) {
  const box = document.getElementById("aiMessages");
  if (!box) return;
  box.innerHTML += `<p><b>You:</b> ${escapeHtml(message)}</p>`;
  try {
    const headers = { "Content-Type": "application/json" };
    if (state.admin && state.token) headers.Authorization = `Bearer ${state.token}`;
    const res = await fetch("/api/ai", {
      method: "POST",
      headers,
      body: JSON.stringify({
        message,
        mode: state.admin ? "admin" : "visitor",
        language: state.lang,
      }),
    });
    const data = await res.json();
    box.innerHTML += `<p><b>Royal AI:</b> ${escapeHtml(data.reply || "No reply.")}</p>`;
  } catch {
    box.innerHTML += `<p><b>Royal AI:</b> ${state.admin ? "Admin AI will connect after deployment." : "Visitor AI will connect after deployment."}</p>`;
  }
  box.scrollTop = box.scrollHeight;
}
function escapeHtml(str) {
  return String(str).replace(/[&<>'"]/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;" }[c]));
}

// ===== THEME CUSTOMIZER (Photoshop Style) =====
function applyTheme(theme) {
  const root = document.documentElement;
  if (theme.bgHue !== undefined) root.style.setProperty('--bg-hue', theme.bgHue);
  if (theme.bgSat !== undefined) root.style.setProperty('--bg-sat', theme.bgSat + '%');
  if (theme.bgBright !== undefined) root.style.setProperty('--bg-bright', theme.bgBright + '%');
  if (theme.goldHue !== undefined) root.style.setProperty('--gold-hue', theme.goldHue);
  if (theme.goldSat !== undefined) root.style.setProperty('--gold-sat', theme.goldSat + '%');
  if (theme.goldBright !== undefined) root.style.setProperty('--gold-bright', theme.goldBright + '%');
  if (theme.textHue !== undefined) root.style.setProperty('--text-hue', theme.textHue);
  if (theme.textSat !== undefined) root.style.setProperty('--text-sat', theme.textSat + '%');
  if (theme.textBright !== undefined) root.style.setProperty('--text-bright', theme.textBright + '%');
  if (theme.headingHue !== undefined) root.style.setProperty('--heading-hue', theme.headingHue);
  if (theme.headingSat !== undefined) root.style.setProperty('--heading-sat', theme.headingSat + '%');
  if (theme.headingBright !== undefined) root.style.setProperty('--heading-bright', theme.headingBright + '%');
  if (theme.headingScale !== undefined) root.style.setProperty('--heading-scale', theme.headingScale);
  if (theme.bodyScale !== undefined) root.style.setProperty('--body-scale', theme.bodyScale);
  if (theme.smallScale !== undefined) root.style.setProperty('--small-scale', theme.smallScale);
  if (theme.headingFont !== undefined) root.style.setProperty('--heading-font', theme.headingFont);
  if (theme.bodyFont !== undefined) root.style.setProperty('--body-font', theme.bodyFont);

  // Update sliders to reflect values
  const mapping = {
    bgHue: 'bgHue', bgSat: 'bgSat', bgBright: 'bgBright',
    goldHue: 'goldHue', goldSat: 'goldSat', goldBright: 'goldBright',
    textHue: 'textHue', textSat: 'textSat', textBright: 'textBright',
    headingHue: 'headingHue', headingSat: 'headingSat', headingBright: 'headingBright',
    headingScale: 'headingSize', bodyScale: 'bodySize', smallScale: 'smallSize',
  };
  for (const [key, id] of Object.entries(mapping)) {
    const el = document.getElementById(id);
    if (el && theme[key] !== undefined) el.value = theme[key];
  }
  // Font family selects
  if (theme.headingFont) document.getElementById('headingFont').value = theme.headingFont;
  if (theme.bodyFont) document.getElementById('bodyFont').value = theme.bodyFont;
}

function readThemeFromUI() {
  const getVal = id => document.getElementById(id)?.value;
  return {
    bgHue: parseFloat(getVal('bgHue')) || 150,
    bgSat: parseFloat(getVal('bgSat')) || 100,
    bgBright: parseFloat(getVal('bgBright')) || 30,
    goldHue: parseFloat(getVal('goldHue')) || 45,
    goldSat: parseFloat(getVal('goldSat')) || 150,
    goldBright: parseFloat(getVal('goldBright')) || 75,
    textHue: parseFloat(getVal('textHue')) || 40,
    textSat: parseFloat(getVal('textSat')) || 10,
    textBright: parseFloat(getVal('textBright')) || 95,
    headingHue: parseFloat(getVal('headingHue')) || 40,
    headingSat: parseFloat(getVal('headingSat')) || 15,
    headingBright: parseFloat(getVal('headingBright')) || 95,
    headingScale: parseFloat(getVal('headingSize')) || 1,
    bodyScale: parseFloat(getVal('bodySize')) || 1,
    smallScale: parseFloat(getVal('smallSize')) || 1,
    headingFont: getVal('headingFont') || 'Georgia, serif',
    bodyFont: getVal('bodyFont') || 'Arial, sans-serif',
  };
}

function saveTheme() {
  const theme = readThemeFromUI();
  localStorage.setItem(THEME_KEY, JSON.stringify(theme));
  document.getElementById('adminStatus').textContent = "Theme saved successfully!";
}

function resetTheme() {
  const defaultTheme = {
    bgHue: 150, bgSat: 100, bgBright: 30,
    goldHue: 45, goldSat: 150, goldBright: 75,
    textHue: 40, textSat: 10, textBright: 95,
    headingHue: 40, headingSat: 15, headingBright: 95,
    headingScale: 1, bodyScale: 1, smallScale: 1,
    headingFont: 'Georgia, serif',
    bodyFont: 'Arial, sans-serif',
  };
  localStorage.removeItem(THEME_KEY);
  applyTheme(defaultTheme);
  // Also update UI sliders to match
  for (const [key, val] of Object.entries(defaultTheme)) {
    const idMap = {
      bgHue:'bgHue', bgSat:'bgSat', bgBright:'bgBright',
      goldHue:'goldHue', goldSat:'goldSat', goldBright:'goldBright',
      textHue:'textHue', textSat:'textSat', textBright:'textBright',
      headingHue:'headingHue', headingSat:'headingSat', headingBright:'headingBright',
      headingScale:'headingSize', bodyScale:'bodySize', smallScale:'smallSize',
    };
    const el = document.getElementById(idMap[key]);
    if (el) el.value = val;
  }
  document.getElementById('headingFont').value = defaultTheme.headingFont;
  document.getElementById('bodyFont').value = defaultTheme.bodyFont;
  document.getElementById('adminStatus').textContent = "Theme reset to default.";
}

// ===== ADMIN =====
function activateAdminUI() {
  document.getElementById('adminLoginBox').hidden = true;
  document.getElementById('adminTools').hidden = false;
  document.getElementById('adminStatus').textContent = "Admin Mode active. You can now manage theme, media, and hubs.";
  // Load saved theme
  const saved = JSON.parse(localStorage.getItem(THEME_KEY) || "null");
  if (saved) applyTheme(saved);
  else resetTheme(); // ensures UI matches default
}

// ===== MEDIA UPLOAD =====
async function uploadMedia(file, folder) {
  const status = document.getElementById('mediaStatus');
  if (!file) { status.textContent = "Select a file first."; return; }
  status.textContent = "Uploading...";
  try {
    const fd = new FormData();
    fd.append('file', file);
    fd.append('folder', folder);
    const res = await fetch('/api/media/upload', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + state.token },
      body: fd,
    });
    const data = await res.json();
    status.textContent = data.ok ? "Uploaded: " + data.key : data.error || "Upload failed.";
  } catch {
    status.textContent = "Upload failed. Check R2 binding.";
  }
}

// ===== INITIALIZATION =====
function init() {
  // Render static content
  renderGallery();
  renderOffices();
  
  // WhatsApp main button
  document.getElementById("mainWhatsapp").href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Chilghoza Pine Nuts Trade Inquiry")}`;

  // Event listeners for gateways
  document.querySelectorAll("[data-open-gateway]").forEach(el => {
    el.onclick = (e) => {
      e.preventDefault();
      document.getElementById("mobileDrawer").classList.remove("open");
      openGateway(el.dataset.openGateway);
    };
  });
  document.getElementById("gatewayBack").onclick = closeGateway;
  document.getElementById("hubBack").onclick = () => {
    state.hub = null;
    document.getElementById("hubView").classList.remove("open");
    document.getElementById("gatewayView").classList.add("open");
    renderGateway(state.gateway);
  };

  // Language selects
  const langSelects = ["languageSelect", "gatewayLanguage", "hubLanguage"];
  langSelects.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = document.getElementById("languageSelect").innerHTML;
    el.onchange = (e) => setLanguage(e.target.value);
  });

  // Mobile drawer
  document.getElementById("menuOpen").onclick = () => document.getElementById("mobileDrawer").classList.add("open");
  document.getElementById("menuClose").onclick = () => document.getElementById("mobileDrawer").classList.remove("open");

  // Admin dialog
  document.getElementById("adminOpen").onclick = () => document.getElementById("adminDialog").showModal();
  document.getElementById("adminClose").onclick = () => document.getElementById("adminDialog").close();

  // Admin login
  document.getElementById("adminLogin").onclick = () => {
    const token = document.getElementById("adminToken").value.trim();
    if (!token) return;
    state.admin = true;
    state.token = token;
    sessionStorage.setItem(ADMIN_FLAG, "1");
    sessionStorage.setItem(ADMIN_TOKEN_KEY, token);
    activateAdminUI();
    applyLanguage();
  };

  // Theme controls
  const themeSliders = [
    'bgHue','bgSat','bgBright','goldHue','goldSat','goldBright',
    'textHue','textSat','textBright','headingHue','headingSat','headingBright',
    'headingSize','bodySize','smallSize'
  ];
  themeSliders.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.oninput = () => applyTheme(readThemeFromUI());
  });
  document.getElementById('headingFont')?.addEventListener('change', () => applyTheme(readThemeFromUI()));
  document.getElementById('bodyFont')?.addEventListener('change', () => applyTheme(readThemeFromUI()));
  document.getElementById('themeSave').onclick = saveTheme;
  document.getElementById('themeReset').onclick = resetTheme;

  // Media upload
  document.getElementById('mediaUpload').onclick = () => {
    const file = document.getElementById('mediaFile').files[0];
    const folder = document.getElementById('mediaFolder').value;
    uploadMedia(file, folder);
  };

  // AI form
  document.getElementById('aiForm').onsubmit = (e) => {
    e.preventDefault();
    const input = document.getElementById('aiInput');
    const msg = input.value.trim();
    if (msg) {
      askAI(msg);
      input.value = '';
    }
  };

  // Hub management buttons (placeholders)
  document.getElementById('createHubBtn').onclick = () => alert('Create Hub: Will be implemented with KV/D1 backend.');
  document.getElementById('editHubBtn').onclick = () => alert('Edit Hub: Select a hub first.');
  document.getElementById('deleteHubBtn').onclick = () => alert('Delete Hub: Select a hub first.');

  // Apply saved theme if any
  const savedTheme = JSON.parse(localStorage.getItem(THEME_KEY) || "null");
  if (savedTheme) {
    applyTheme(savedTheme);
    // Also sync UI sliders
    for (const [key, val] of Object.entries(savedTheme)) {
      const idMap = {
        bgHue:'bgHue', bgSat:'bgSat', bgBright:'bgBright',
        goldHue:'goldHue', goldSat:'goldSat', goldBright:'goldBright',
        textHue:'textHue', textSat:'textSat', textBright:'textBright',
        headingHue:'headingHue', headingSat:'headingSat', headingBright:'headingBright',
        headingScale:'headingSize', bodyScale:'bodySize', smallScale:'smallSize',
      };
      const el = document.getElementById(idMap[key]);
      if (el) el.value = val;
    }
    if (savedTheme.headingFont) document.getElementById('headingFont').value = savedTheme.headingFont;
    if (savedTheme.bodyFont) document.getElementById('bodyFont').value = savedTheme.bodyFont;
  }

  // If admin already logged in, activate
  if (state.admin) {
    activateAdminUI();
  }

  applyLanguage();
}

document.addEventListener("DOMContentLoaded", init);
