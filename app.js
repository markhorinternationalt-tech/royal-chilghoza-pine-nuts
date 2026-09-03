export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const langParam = url.searchParams.get('lang') || 'en';

    const html = `<!DOCTYPE html>
<html lang="${langParam}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Royal Chilghoza Ecosystem</title>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; margin: 0; padding: 20px; background: #f4f6f8; color: #333; }
    .header { display: flex; justify-content: space-between; align-items: center; background: #fff; padding: 15px 20px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.05); }
    .nav-brand { font-weight: bold; font-size: 1.2rem; color: #1a4d2e; }
    select { padding: 8px 12px; border-radius: 6px; border: 1px solid #ccc; font-size: 14px; cursor: pointer; }
    .container { max-width: 1000px; margin: 30px auto; background: #fff; padding: 30px; border-radius: 12px; }
    .badge { display: inline-block; background: #e8f5e9; color: #2e7d32; padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; margin-bottom: 15px; }
    h1 { margin-top: 0; color: #1b4332; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; margin-top: 20px; }
    .card { border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px; background: #fafafa; }
    .card h3 { margin-top: 0; color: #2d6a4f; }
    [dir="rtl"] { text-align: right; }
  </style>
</head>
<body>

  <div class="header">
    <div class="nav-brand"><span id="site-title">ROYAL CHILGOZA</span> - <small id="site-sub">GLOBAL ECOSYSTEM</small></div>
    <div>
      <select id="langSelect" onchange="changeLanguage(this.value)">
        <option value="en">English</option>
        <option value="ur">اردو (Urdu)</option>
        <option value="zh">中文 (Chinese)</option>
        <option value="ar">العربية (Arabic)</option>
        <option value="ru">Русский (Russian)</option>
        <option value="ps">پښتو (Pashto)</option>
        <option value="fa">فارسی (Persian)</option>
        <option value="id">Bahasa Indonesia</option>
        <option value="ms">Bahasa Melayu</option>
        <option value="tr">Türkçe</option>
      </select>
    </div>
  </div>

  <div class="container">
    <span class="badge" id="hero-badge">PAKISTAN • INTERNATIONAL TRADE & RESEARCH</span>
    <h1 id="hero-heading">Royal Chilghoza Ecosystem</h1>
    <p id="hero-desc">Explore professional trade markets and deep scientific research folders.</p>

    <hr style="margin: 30px 0; border: 0; border-top: 1px solid #eee;">

    <h2 id="trade-head-title">🌍 GLOBAL TRADE HUBS</h2>
    <p id="trade-head-desc">Select any category below...</p>
    <div class="grid">
      <div class="card">
        <h3 id="trade-main-title">Global Trade</h3>
        <p id="trade-main-desc">10 comprehensive international trade directories...</p>
      </div>
    </div>

    <h2 id="research-head-title" style="margin-top: 40px;">🌲 RESEARCH & KNOWLEDGE HUBS</h2>
    <p id="research-head-desc">Select any scientific category...</p>
    <div class="grid">
      <div class="card">
        <h3 id="research-main-title">Research & Knowledge</h3>
        <p id="research-main-desc">10 detailed research folders...</p>
      </div>
    </div>
  </div>

  <script>
    const translations = {
        en: { title: "ROYAL CHILGOZA", sub: "GLOBAL ECOSYSTEM", badge: "PAKISTAN • INTERNATIONAL TRADE & RESEARCH", hHead: "Royal Chilghoza Ecosystem", hDesc: "Explore professional trade markets and deep scientific research folders.", tTitle: "Global Trade", tDesc: "10 comprehensive international trade directories...", rTitle: "Research & Knowledge", rDesc: "10 detailed research folders...", thTitle: "🌍 GLOBAL TRADE HUBS", thDesc: "Select any category below...", rhTitle: "🌲 RESEARCH & KNOWLEDGE HUBS", rhDesc: "Select any scientific category..." },
        zh: { title: "皇家松子", sub: "全球生态系统", badge: "巴基斯坦 • 国际贸易与研究", hHead: "皇家松子 生态系统", hDesc: "探索专业贸易市场和深入的科学研究文件夹。", tTitle: "全球贸易", tDesc: "10个全面的国际贸易目录...", rTitle: "研究与知识", rDesc: "关于产地、林业、植物学的10个详细研究文件夹...", thTitle: "🌍 全球贸易枢纽", thDesc: "选择下方任意分类...", rhTitle: "🌲 研究与知识枢纽", rhDesc: "选择下方任意科学分类..." },
        ur: { title: "رائل چلغوزہ", sub: "گلوبل سسٹم", badge: "پاکستان • بین الاقوامی تجارت اور تحقیق", hHead: "رائل چلغوزہ گلوبل سسٹم", hDesc: "پرافیشنل تجارتی منڈیوں اور سائنسی تحقیقی فولڈرز کا جائزہ لیں۔", tTitle: "گلوبل ٹریڈ", tDesc: "10 جامع بین الاقوامی تجارتی ڈائریکٹریاں...", rTitle: "ریسرچ اور نالج", rDesc: "ماخذ، جنگلات اور نباتات پر 10 تفصیلی تحقیقی فولڈرز...", thTitle: "🌍 گلوبل ٹریڈ حبز", thDesc: "کسی بھی زمرے کا انتخاب کریں...", rhTitle: "🌲 ریسرچ اور نالج حبز", rhDesc: "سائنسی زمرے کا انتخاب کریں..." },
        ru: { title: "РОЯЛЬ ЧИЛГОЗА", sub: "ГЛОБАЛЬНАЯ ЭКОСИСТЕМА", badge: "ПАКИСТАН • ТОРГОВЛЯ И ИССЛЕДОВАНИЯ", hHead: "Рояль Чилгоза Экосистема", hDesc: "Исследуйте торговлю и научные исследования.", tTitle: "Мировая Торговля", tDesc: "10 каталогов торговли...", rTitle: "Исследования", rDesc: "10 папок исследований...", thTitle: "🌍 Торговые Центры", thDesc: "Выберите категорию...", rhTitle: "🌲 Научные Центры", rhDesc: "Выберите раздел..." },
        ar: { title: "رويال چلغوزة", sub: "النظام العالمي", badge: "باكستان • التجارة الدولية والبحوث", hHead: "رويال چلغوزة النظام العالمي", hDesc: "استكشف الأسواق التجارية والمجلدات البحثية.", tTitle: "التجارة العالمية", tDesc: "10 أدلة تجارية...", rTitle: "البحوث والمعرفة", rDesc: "10 مجلدات بحثية...", thTitle: "🌍 مراكز التجارة", thDesc: "اختر فئة...", rhTitle: "🌲 مراكز البحوث", rhDesc: "اختر قسماً..." },
        ps: { title: "رائل چلغوزه", sub: "نړیوال سیسټم", badge: "پاکستان • نړیواله سوداګري او څېړنه", hHead: "رائل چلغوزه نړیوال سیسټم", hDesc: "سوداګریز بازارونه او علمي څېړنې وپلټئ.", tTitle: "نړیواله سوداګري", tDesc: "10 سوداګریز ډایرکټرۍ...", rTitle: "څېړنه او پوهه", rDesc: "10 څېړنیز فولډرونه...", thTitle: "🌍 سوداګریز مرکزونه", thDesc: "کټګوري وټاکئ...", rhTitle: "🌲 څېړنیز مرکزونه", rhDesc: "برخه وټاکئ..." },
        fa: { title: "رویال چلغوزه", sub: "سیستم جهانی", badge: "پاکستان • تجارت بین‌الملل و تحقیقات", hHead: "رویال چلغوزه سیستم جهانی", hDesc: "بازارهای تجارتی و پوشه‌های تحقیقاتی را کاوش کنید.", tTitle: "تجارت جهانی", tDesc: "۱۰ دایرکتوری تجارتی...", rTitle: "تحقیقات و دانش", rDesc: "۱۰ پوشه تحقیقاتی...", thTitle: "🌍 مراکز تجارتی", thDesc: "دسته‌بندی را انتخاب کنید...", rhTitle: "🌲 مراکز تحقیقاتی", rhDesc: "بخش را انتخاب کنید..." },
        id: { title: "ROYAL CHILGOZA", sub: "EKOSISTEM GLOBAL", badge: "PAKISTAN • PERDAGANGAN & PENELITIAN", hHead: "Ekosistem Royal Chilgoza", hDesc: "Jelajahi pasar perdagangan dan folder penelitian ilmiah.", tTitle: "Perdagangan Global", tDesc: "10 direktori perdagangan...", rTitle: "Penelitian & Pengetahuan", rDesc: "10 folder penelitian...", thTitle: "🌍 Hub Perdagangan", thDesc: "Pilih kategori...", rhTitle: "🌲 Hub Penelitian", rhDesc: "Pilih bagian..." },
        ms: { title: "ROYAL CHILGOZA", sub: "EKOSISTEM GLOBAL", badge: "PAKISTAN • PERDAGANGAN & PENYELIDIKAN", hHead: "Ekosistem Royal Chilgoza", hDesc: "Terokai pasaran perdagangan dan folder penyelidikan ilmiah.", tTitle: "Perdagangan Global", tDesc: "10 direktori perdagangan...", rTitle: "Penyelidikan & Pengetahuan", rDesc: "10 folder penyelidikan...", thTitle: "🌍 Hub Penyelidikan", thDesc: "Pilih bahagian..." },
        tr: { title: "ROYAL CHILGOZA", sub: "KÜRESEL EKOSİSTEM", badge: "PAKİSTAN • ULUSLARARASI TİCARET VE ARAŞTIRMA", hHead: "Royal Chilgoza Ekosistemi", hDesc: "Ticaret pazarlarını ve bilimsel araştırma klasörlerini keşfedin.", tTitle: "Küresel Ticaret", tDesc: "10 ticaret dizini...", rTitle: "Araştırma ve Bilgi", rDesc: "10 araştırma klasörü...", thTitle: "🌍 Ticaret Merkezleri", thDesc: "Kategori seçin...", rhTitle: "🌲 Araştırma Merkezleri", rhDesc: "Bölüm seçin..." }
    };

    function changeLanguage(lang) {
        const t = translations[lang] || translations.en;
        
        if(document.getElementById('site-title')) document.getElementById('site-title').innerText = t.title;
        if(document.getElementById('site-sub')) document.getElementById('site-sub').innerText = t.sub;
        if(document.getElementById('hero-badge')) document.getElementById('hero-badge').innerText = t.badge;
        if(document.getElementById('hero-heading')) document.getElementById('hero-heading').innerText = t.hHead;
        if(document.getElementById('hero-desc')) document.getElementById('hero-desc').innerText = t.hDesc;
        if(document.getElementById('trade-main-title')) document.getElementById('trade-main-title').innerText = t.tTitle;
        if(document.getElementById('trade-main-desc')) document.getElementById('trade-main-desc').innerText = t.tDesc;
        if(document.getElementById('research-main-title')) document.getElementById('research-main-title').innerText = t.rTitle;
        if(document.getElementById('research-main-desc')) document.getElementById('research-main-desc').innerText = t.rDesc;
        if(document.getElementById('trade-head-title')) document.getElementById('trade-head-title').innerText = t.thTitle;
        if(document.getElementById('trade-head-desc')) document.getElementById('trade-head-desc').innerText = t.thDesc;
        if(document.getElementById('research-head-title')) document.getElementById('research-head-title').innerText = t.rhTitle;
        if(document.getElementById('research-head-desc')) document.getElementById('research-head-desc').innerText = t.rhDesc;
        
        const rtlLangs = ['ur', 'ar', 'fa', 'ps'];
        document.body.dir = rtlLangs.includes(lang) ? 'rtl' : 'ltr';

        if (window.history.replaceState) {
            const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?lang=' + lang;
            window.history.replaceState({path: newUrl}, '', newUrl);
        }
    }

    const urlParams = new URLSearchParams(window.location.search);
    const currentLang = urlParams.get('lang') || 'en';
    document.getElementById('langSelect').value = currentLang;
    changeLanguage(currentLang);
  </script>
</body>
</html>`;

    return new Response(html, {
      headers: { "content-type": "text/html;charset=UTF-8" },
    });
  },
};
