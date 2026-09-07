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
    tagline: "پاکستان • اصل اصل • نړیوال",
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
