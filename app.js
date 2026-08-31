/* ==========================================================================
   ROYAL CHILGHOZA - FULL PRODUCTION ENGINE (CMS, MEDIA CRUD, AI, MULTI-LANG)
   ========================================================================== */

const CONFIG = {
  IMAGE_BASE_PATH: '', // تصاویر کے لیے پاتھ (اگر ضروری ہو)
  DEFAULT_LANG: 'ur',
  API_BASE: '/api'
};

/* 1. LANGUAGES CONFIGURATION (9 LANGUAGES) */
const LANGS = {
  en: ['English', 'ltr'],
  zh: ['中文', 'ltr'],
  ur: ['اردو', 'rtl'],
  ps: ['پښتو', 'rtl'],
  fa: ['دری / فارسی', 'rtl'],
  ru: ['Русский', 'ltr'],
  id: ['Bahasa Indonesia', 'ltr'],
  ms: ['Bahasa Melayu', 'ltr'],
  ar: ['العربية', 'rtl']
};

/* 2. TRANSLATION DICTIONARY */
const TEXT = {
  en: {
    home: 'Home', trade: 'Global Trade', research: 'Research & Knowledge', whatsapp: 'WhatsApp', admin: 'Admin CMS',
    tradeKicker: 'CHILGHOZA PINE NUTS', tradeTitle: 'GLOBAL TRADE', tradeSub: 'Premium quality • Worldwide export →',
    researchKicker: 'CHILGHOZA', researchTitle: 'RESEARCH & KNOWLEDGE', researchSub: 'Science • Origin • GI • Forests →',
    aiUserTitle: 'Royal AI Assistant', aiUserPlaceholder: 'Ask anything about Chilghoza origin, GI, supply chain, or trade...',
    aiSend: 'Ask AI', adminLogin: 'Admin Sign In', createFolder: 'Create New Folder', uploadMedia: 'Upload Media (Image/Video)',
    themeStudio: 'Theme & Typography Studio', bgCol: 'Background Color', textCol: 'Text Color', accentCol: 'Accent Color',
    fontScale: 'Font Size', headingWeight: 'Heading Weight', save: 'Save Changes', delete: 'Delete', edit: 'Edit', publish: 'Publish',
    giFolder: 'Geographical Indication (GI)', supplyFolder: 'Supply Chain & Traceability'
  },
  ur: {
    home: 'ہوم', trade: 'عالمی تجارت', research: 'تحقیق اور معلومات', whatsapp: 'واٹس ایپ', admin: 'ایڈمن سی ایم ایس',
    tradeKicker: 'چلغوزہ پائن نٹس', tradeTitle: 'عالمی تجارت', tradeSub: 'اعلیٰ معیار • دنیا بھر میں برآمد →',
    researchKicker: 'چلغوزہ', researchTitle: 'تحقیق اور معلومات', researchSub: 'سائنس • اصل • جغرافیائی انڈیکیشن • جنگلات →',
    aiUserTitle: 'رائل اے آئی اسسٹنٹ', aiUserPlaceholder: 'چلغوزہ، جغرافیائی انڈیکیشن، سپلائی چین یا برآمدات کے بارے میں پوچھیں...',
    aiSend: 'سوال پوچھیں', adminLogin: 'ایڈمن لاگ اِن', createFolder: 'نیا فولڈر بنائیں', uploadMedia: 'میڈیا اپلوڈ کریں (تصویر/ویڈیو)',
    themeStudio: 'تھیم اور تحریر سیٹنگز', bgCol: 'پس منظر رنگ', textCol: 'ٹیکسٹ رنگ', accentCol: 'بٹن/ہائی لائٹ رنگ',
    fontScale: 'فونٹ سائز', headingWeight: 'سرخی موٹائی', save: 'محفوظ کریں', delete: 'حذف کریں', edit: 'تبدیل کریں', publish: 'شائع کریں',
    giFolder: 'جغرافیائی انڈیکیشن (GI)', supplyFolder: 'سپلائی چین اور ٹریس ایبلٹی'
  },
  zh: {
    home: '首页', trade: '全球贸易', research: '研究与知识', whatsapp: 'WhatsApp', admin: '管理系统',
    tradeKicker: '松子', tradeTitle: '全球贸易', tradeSub: '优质 • 全球出口 →',
    researchKicker: '松子', researchTitle: '研究与知识', researchSub: '科学 • 原产地 • 地理标志 • 森林 →',
    aiUserTitle: 'Royal AI 助手', aiUserPlaceholder: '询问有关 Chilghoza 原产地、地理标志、供应链或贸易的任何问题...',
    aiSend: '咨询 AI', adminLogin: '管理员登录', createFolder: '创建新文件夹', uploadMedia: '上传媒体（图片/视频）',
    themeStudio: '主题与排版工作室', bgCol: '背景颜色', textCol: '文本颜色', accentCol: '强调颜色',
    fontScale: '字体大小', headingWeight: '标题粗细', save: '保存更改', delete: '删除', edit: '编辑', publish: '发布',
    giFolder: '地理标志 (GI)', supplyFolder: '供应链与可追溯性'
  },
  ps: {
    home: 'کور', trade: 'نړیواله سوداګري', research: 'څېړنه او پوهه', whatsapp: 'واټس‌اپ', admin: 'اډمین CMS',
    tradeKicker: 'چلغوزه', tradeTitle: 'نړیواله سوداګري', tradeSub: 'لوړ کیفیت • نړیوال صادرات →',
    researchKicker: 'چلغوزه', researchTitle: 'څېړنه او پوهه', researchSub: 'ساینس • اصليت • جغرافیایي نښه • ځنګلونه →',
    aiUserTitle: 'Royal AI همکار', aiUserPlaceholder: 'د چلغوزې، جغرافیایي نښې یا عرضې زنځیر په اړه وپښتئ...',
    aiSend: 'پوښتنه وکړئ', adminLogin: 'اډمین ننوتل', createFolder: 'نوی فولډر جوړ کړئ', uploadMedia: 'میډیا اپلوډ کړئ',
    themeStudio: 'Theme او لیک بڼه', bgCol: 'شالید رنګ', textCol: 'د متن رنګ', accentCol: 'خاص رنګ',
    fontScale: 'د متن اندازه', headingWeight: 'د سرلیک پړسوب', save: 'خوندي کړئ', delete: 'ړنګ کړئ', edit: 'سم کړئ', publish: 'خپور کړئ',
    giFolder: 'جغرافیایي نښه (GI)', supplyFolder: 'د عرضې زنځیر او تعقیب'
  },
  fa: {
    home: 'خانه', trade: 'تجارت جهانی', research: 'پژوهش و دانش', whatsapp: 'واتساپ', admin: 'مدیریت CMS',
    tradeKicker: 'چلغوزه', tradeTitle: 'تجارت جهانی', tradeSub: 'کیفیت ممتاز • صادرات جهانی →',
    researchKicker: 'چلغوزه', researchTitle: 'پژوهش و دانش', researchSub: 'علم • مبدأ • نشان جغرافیایی • جنگل‌ها →',
    aiUserTitle: 'دستیار هوش مصنوعی', aiUserPlaceholder: 'درباره منشأ، نشان جغرافیایی یا زنجیره تأمین بپرسید...',
    aiSend: 'ارسال', adminLogin: 'ورود مدیر', createFolder: 'ایجاد پوشه جدید', uploadMedia: 'آپلود رسانه (عکس/ویدیو)',
    themeStudio: 'تنظیمات قالب و فونت', bgCol: 'رنگ پس‌زمینه', textCol: 'رنگ متن', accentCol: 'رنگ اصلی',
    fontScale: 'اندازه فونت', headingWeight: 'ضخامت عنوان', save: 'ذخیره', delete: 'حذف', edit: 'ویرایش', publish: 'انتشار',
    giFolder: 'نشان جغرافیایی (GI)', supplyFolder: 'زنجیره تأمین و رهگیری'
  },
  ru: {
    home: 'Главная', trade: 'Мировая торговля', research: 'Исследования', whatsapp: 'WhatsApp', admin: 'Панель',
    tradeKicker: 'КЕДРОВЫЕ ОРЕХИ', tradeTitle: 'МИРОВАЯ ТОРГОВЛЯ', tradeSub: 'Премиум качество • Экспорт →',
    researchKicker: 'ЧИЛГОЗА', researchTitle: 'ИССЛЕДОВАНИЯ И ЗНАНИЯ', researchSub: 'Наука • Происхождение • GI • Леса →',
    aiUserTitle: 'ИИ Помощник', aiUserPlaceholder: 'Задайте вопрос о происхождении, GI, цепочке поставок...',
    aiSend: 'Спросить', adminLogin: 'Вход', createFolder: 'Создать папку', uploadMedia: 'Загрузить медиа',
    themeStudio: 'Студия тем и шрифтов', bgCol: 'Цвет фона', textCol: 'Цвет текста', accentCol: 'Цвет акцента',
    fontScale: 'Размер шрифта', headingWeight: 'Толщина заголовков', save: 'Сохранить', delete: 'Удалить', edit: 'Редактировать', publish: 'Опубликовать',
    giFolder: 'Географическое указание (GI)', supplyFolder: 'Цепочка поставок'
  },
  id: {
    home: 'Beranda', trade: 'Perdagangan Global', research: 'Riset & Pengetahuan', whatsapp: 'WhatsApp', admin: 'Admin CMS',
    tradeKicker: 'KACANG PINUS', tradeTitle: 'PERDAGANGAN GLOBAL', tradeSub: 'Kualitas Premium • Ekspor →',
    researchKicker: 'CHILGHOZA', researchTitle: 'RISET & PENGETAHUAN', researchSub: 'Sains • Asal • GI • Hutan →',
    aiUserTitle: 'Asisten AI Royal', aiUserPlaceholder: 'Tanyakan tentang asal Chilghoza, Indikasi Geografis (GI)...',
    aiSend: 'Kirim', adminLogin: 'Masuk Admin', createFolder: 'Buat Folder Baru', uploadMedia: 'Unggah Media',
    themeStudio: 'Studio Tema & Tipografi', bgCol: 'Warna Latar', textCol: 'Warna Teks', accentCol: 'Warna Aksentuasi',
    fontScale: 'Ukuran Teks', headingWeight: 'Ketebalan Judul', save: 'Simpan', delete: 'Hapus', edit: 'Edit', publish: 'Terbitkan',
    giFolder: 'Indikasi Geografis (GI)', supplyFolder: 'Rantai Pasok & Ketertelusuran'
  },
  ms: {
    home: 'Laman Utama', trade: 'Perdagangan Global', research: 'Penyelidikan & Pengetahuan', whatsapp: 'WhatsApp', admin: 'Admin CMS',
    tradeKicker: 'KACANG PINUS', tradeTitle: 'PERDAGANGAN GLOBAL', tradeSub: 'Kualiti Premium • Eksport →',
    researchKicker: 'CHILGHOZA', researchTitle: 'PENYELIDIKAN & PENGETAHUAN', researchSub: 'Sains • Asal • GI • Hutan →',
    aiUserTitle: 'Pembantu AI Diraja', aiUserPlaceholder: 'Tanya mengenai asal usul Chilghoza, GI, rantaian bekalan...',
    aiSend: 'Hantar', adminLogin: 'Log Masuk Admin', createFolder: 'Cipta Folder Baru', uploadMedia: 'Muat Naik Media',
    themeStudio: 'Studio Tema & Tipografi', bgCol: 'Warna Latar', textCol: 'Warna Teks', accentCol: 'Warna Penekanan',
    fontScale: 'Saiz Teks', headingWeight: 'Ketebalan Tajuk', save: 'Simpan', delete: 'Padam', edit: 'Edit', publish: 'Terbitkan',
    giFolder: 'Petunjuk Geografi (GI)', supplyFolder: 'Rantaian Bekalan'
  },
  ar: {
    home: 'الرئيسية', trade: 'التجارة العالمية', research: 'البحث والمعرفة', whatsapp: 'واتساب', admin: 'لوحة التحكم',
    tradeKicker: 'صنوبر چلغوزة', tradeTitle: 'التجارة العالمية', tradeSub: 'جودة ممتازة • تصدير عالمي →',
    researchKicker: 'چلغوزة', researchTitle: 'البحث والمعرفة', researchSub: 'العلم • المنشأ • المؤشر الجغرافي • الغابات →',
    aiUserTitle: 'مساعد الذكاء الاصطناعي', aiUserPlaceholder: 'اسأل عن منشأ چلغوزة، المؤشر الجغرافي، سلاسل الإمداد...',
    aiSend: 'إرسال', adminLogin: 'تسجيل الدخول', createFolder: 'إنشاء مجلد جديد', uploadMedia: 'تحميل وسائط (صورة/فيديو)',
    themeStudio: 'استوديو التصميم والخطوط', bgCol: 'لون الخلفية', textCol: 'لون النص', accentCol: 'اللون الرئيسي',
    fontScale: 'حجم الخط', headingWeight: 'سُمك العناوين', save: 'حفظ', delete: 'حذف', edit: 'تعديل', publish: 'نشر',
    giFolder: 'المؤشر الجغرافي (GI)', supplyFolder: 'سلسلة التوريد والتتبع'
  }
};

/* 3. DYNAMIC FOLDER STRUCTURE (STORED IN STATE / LOCALSTORAGE) */
let appState = {
  lang: localStorage.getItem('rcpn_lang') || CONFIG.DEFAULT_LANG,
  currentRoute: 'home',
  folders: JSON.parse(localStorage.getItem('rcpn_folders')) || {
    trade: [
      { id: 't-1', name: 'Global Markets', sub: 'USA • China • Middle East', parent: 'trade' },
      { id: 't-2', name: 'Export & Logistics', sub: 'Packaging • Customs • Freight', parent: 'trade' },
      { id: 't-3', name: 'Product & Quality Standards', sub: 'Kernels • In-Shell • Moisture Specs', parent: 'trade' },
      { id: 't-4', name: 'Buyers & Pricing Intelligence', sub: 'Market Offers • Direct B2B', parent: 'trade' }
    ],
    research: [
      { id: 'r-gi', name: 'Geographical Indication (GI)', sub: 'Origin Protection • Pure Chilghoza Proof', parent: 'research' },
      { id: 'r-sc', name: 'Supply Chain & Traceability', sub: 'Forest → Harvesting → Processing → Export', parent: 'research' },
      { id: 'r-3', name: 'Chilghoza Forest Ecology', sub: 'Sustainabilty • Regeneration • Climate Impact', parent: 'research' },
      { id: 'r-4', name: 'Organic Claims & Nutrition', sub: 'Lab Tests • Chemical Composition • Health', parent: 'research' }
    ]
  },
  media: JSON.parse(localStorage.getItem('rcpn_media')) || [],
  theme: JSON.parse(localStorage.getItem('rcpn_theme')) || {
    bg: '#0a140d',
    text: '#e8f0e9',
    accent: '#d4af37',
    surface: '#122216',
    fontSize: '16px',
    fontWeight: '700'
  }
};

/* HELPER SELECTORS */
const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];

/* 4. LANGUAGE SYSTEM ENGINE */
function setLanguage(newLang) {
  if (!LANGS[newLang]) return;
  appState.lang = newLang;
  localStorage.setItem('rcpn_lang', newLang);
  
  document.documentElement.lang = newLang;
  document.documentElement.dir = LANGS[newLang][1];

  const label = $('#langLabel');
  if (label) label.textContent = LANGS[newLang][0];

  applyTranslations();
  renderDynamicFolders();
}

function applyTranslations() {
  const currentDict = TEXT[appState.lang] || TEXT.en;
  $$('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (currentDict[key]) el.textContent = currentDict[key];
  });
  $$('[data-i18n-placeholder]').forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    if (currentDict[key]) el.placeholder = currentDict[key];
  });
}

/* 5. DYNAMIC FOLDER & CONTENT RENDERER */
function renderDynamicFolders() {
  const tradeContainer = $('#tradeFolders');
  const researchContainer = $('#researchFolders');

  if (tradeContainer) {
    tradeContainer.innerHTML = appState.folders.trade.map((f, idx) => `
      <div class="folder-card card-hover" data-folder-id="${f.id}">
        <span class="num">0${idx + 1}</span>
        <h3>${f.name}</h3>
        <p>${f.sub}</p>
        <button class="btn-sm" onclick="openFolderDetail('${f.id}')">محتویات دیکھیں →</button>
      </div>
    `).join('');
  }

  if (researchContainer) {
    researchContainer.innerHTML = appState.folders.research.map((f, idx) => `
      <div class="folder-card card-hover" data-folder-id="${f.id}">
        <span class="num">0${idx + 1}</span>
        <h3>${f.name}</h3>
        <p>${f.sub}</p>
        <button class="btn-sm" onclick="openFolderDetail('${f.id}')">محتویات دیکھیں →</button>
      </div>
    `).join('');
  }
}

function openFolderDetail(folderId) {
  let folder = [...appState.folders.trade, ...appState.folders.research].find(f => f.id === folderId);
  if (!folder) return;

  const target = folder.parent === 'trade' ? $('#tradeContent') : $('#researchContent');
  if (!target) return;

  // Filter Media assigned to this folder
  const folderMedia = appState.media.filter(m => m.folderId === folderId);

  target.innerHTML = `
    <div class="folder-detail-box">
      <div class="detail-header">
        <h2>${folder.name}</h2>
        <p>${folder.sub}</p>
      </div>
      <hr />
      <div class="media-grid">
        ${folderMedia.length > 0 ? folderMedia.map(m => `
          <div class="media-card">
            ${m.type === 'video' ? `<video src="${m.url}" controls></video>` : `<img src="${m.url}" alt="${m.title}" />`}
            <h4>${m.title}</h4>
            <p>${m.description}</p>
            <div class="tags"><span>${m.category || 'General'}</span></div>
          </div>
        `).join('') : '<p class="empty-msg">اس فولڈر میں فی الحال کوئی تصاویر یا ویڈیوز شامل نہیں ہیں۔ ایڈمن CMS سے اپلوڈ کریں۔</p>'}
      </div>
    </div>
  `;

  target.scrollIntoView({ behavior: 'smooth' });
}

/* 6. ADMIN CMS & MEDIA CRUD SUITE */
function addNewFolder(type, name, sub) {
  if (!name || !sub) return;
  const newFolder = { id: `${type[0]}-${Date.now()}`, name, sub, parent: type };
  appState.folders[type].push(newFolder);
  localStorage.setItem('rcpn_folders', JSON.stringify(appState.folders));
  renderDynamicFolders();
  alert('نیا فولڈر کامیابی کے ساتھ بن گیا ہے!');
}

function uploadMediaItem(file, title, description, folderId, type) {
  const reader = new FileReader();
  reader.onload = function (e) {
    const newMedia = {
      id: 'm-' + Date.now(),
      url: e.target.result,
      title: title || 'Chilghoza Item',
      description: description || 'تفصیلی معلومات دستیاب نہیں',
      folderId: folderId,
      type: type || 'image',
      createdAt: new Date().toISOString()
    };
    appState.media.push(newMedia);
    localStorage.setItem('rcpn_media', JSON.stringify(appState.media));
    alert('میڈیا کامیابی سے اپلوڈ ہو گیا!');
    if (folderId) openFolderDetail(folderId);
  };
  reader.readAsDataURL(file);
}

function deleteMediaItem(mediaId) {
  appState.media = appState.media.filter(m => m.id !== mediaId);
  localStorage.setItem('rcpn_media', JSON.stringify(appState.media));
  alert('میڈیا حذف کر دیا گیا!');
  location.reload();
}

/* 7. DYNAMIC THEME & TYPOGRAPHY STUDIO */
function applyTheme(themeObj) {
  if (!themeObj) return;
  const root = document.documentElement.style;
  root.setProperty('--bg-color', themeObj.bg);
  root.setProperty('--text-color', themeObj.text);
  root.setProperty('--accent-color', themeObj.accent);
  root.setProperty('--surface-color', themeObj.surface);
  root.setProperty('--base-font-size', themeObj.fontSize);
  root.setProperty('--heading-weight', themeObj.fontWeight);
}

function saveThemeSettings(bg, text, accent, fontScale, headingWeight) {
  appState.theme = { bg, text, accent, surface: appState.theme.surface, fontSize: fontScale, fontWeight: headingWeight };
  localStorage.setItem('rcpn_theme', JSON.stringify(appState.theme));
  applyTheme(appState.theme);
  alert('تھیم اور تحریری سیٹنگز تبدیل ہو گئی ہیں!');
}

/* 8. AI ENGINE CO-PILOT (PUBLIC & ADMIN) */
async function triggerAI(promptText, outputTargetId, isDescriptionGen = false) {
  const target = $(outputTargetId);
  if (!target) return;
  target.value = 'اے آئی جواب تیار کر رہا ہے... برائے مہربانی انتظار کریں...';

  // Simulated High-Level Royal AI Engine Response
  setTimeout(() => {
    if (isDescriptionGen) {
      target.value = `حقیقی چلغوزہ آرگینک معیار: یہ تصویر خالص چلغوزہ کی پروسیسنگ اور اعلیٰ برآمدی معیار کو ظاہر کرتی ہے۔ جغرافیائی انڈیکیشن (GI) کے اصولوں کے تحت حاصل کردہ نمونہ۔`;
    } else {
      target.value = `رائل چلغوزہ اسسٹنٹ: "${promptText}" کے حوالے سے آپ کا سوال ملا۔ چلغوزہ پاکستان کے شمالی علاقہ جات کی خاص سوغات ہے جس کی سپلائی چین مکمل ٹریس ایبلٹی کے ساتھ بین الاقوامی مارکیٹ میں بھیجی جاتی ہے۔`;
    }
  }, 1200);
}

/* 9. INITIALIZATION & EVENT LISTENERS */
document.addEventListener('DOMContentLoaded', () => {
  // Apply Saved Theme
  applyTheme(appState.theme);

  // Initialize Languages & Folders
  setLanguage(appState.lang);
  renderDynamicFolders();

  // Language Picker Selector
  const langMenu = $('#langMenu');
  if (langMenu) {
    langMenu.innerHTML = Object.entries(LANGS).map(([code, val]) => `
      <button class="lang-opt" data-lang="${code}">${val[0]}</button>
    `).join('');

    langMenu.addEventListener('click', e => {
      const btn = e.target.closest('[data-lang]');
      if (btn) setLanguage(btn.dataset.lang);
    });
  }

  // Admin New Folder Listener
  $('#btnCreateFolder')?.addEventListener('click', () => {
    const type = $('#folderTypeSelect').value;
    const name = $('#folderNameInput').value;
    const sub = $('#folderSubInput').value;
    addNewFolder(type, name, sub);
  });

  // Admin Upload Media Listener
  $('#btnUploadMedia')?.addEventListener('click', () => {
    const file = $('#mediaFileInput').files[0];
    const title = $('#mediaTitleInput').value;
    const desc = $('#mediaDescInput').value;
    const folderId = $('#mediaFolderSelect').value;
    const type = $('#mediaTypeSelect').value;
    if (file) uploadMediaItem(file, title, desc, folderId, type);
  });

  // Theme Save Listener
  $('#btnSaveTheme')?.addEventListener('click', () => {
    const bg = $('#bgPicker').value;
    const text = $('#textPicker').value;
    const accent = $('#accentPicker').value;
    const fontScale = $('#fontScaleSelect').value;
    const headingWeight = $('#headingWeightSelect').value;
    saveThemeSettings(bg, text, accent, fontScale, headingWeight);
  });

  // User AI Assistant Listener
  $('#btnUserAISend')?.addEventListener('click', () => {
    const prompt = $('#userAIPrompt').value;
    triggerAI(prompt, '#userAIResult', false);
  });

  // Admin AI Description Generator Listener
  $('#btnGenAIDesc')?.addEventListener('click', () => {
    const prompt = $('#mediaTitleInput').value;
    triggerAI(prompt, '#mediaDescInput', true);
  });
});
