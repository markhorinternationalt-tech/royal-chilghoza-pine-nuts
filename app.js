const WHATSAPP_NUMBER = "923336665688";
const state = {
  lang: sessionStorage.getItem("royalLanguage") || "en",
  gateway: null,
  hub: null,
  admin: sessionStorage.getItem("royalAdmin") === "1",
  token: sessionStorage.getItem("royalAdminToken") || "",
};
const languages = ["en", "zh", "ar", "ps", "ru", "ur"];

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
  zh: {
    trade: [
      ["Chilghoza Pine Nuts 全球市场", "美国 • 中国 • 中亚 • 中东"],
      ["Chilghoza Pine Nuts 美国市场与买家", "买家 • 要求 • 机会"],
      ["Chilghoza Pine Nuts 中国市场与买家", "贸易平台 • 买家 • 市场信息"],
      ["Chilghoza Pine Nuts 出口与物流", "包装 • 文件 • 运输 • 海关"],
      ["Chilghoza Pine Nuts 产品与质量标准", "果仁 • 带壳 • 等级 • 规格"],
      ["Chilghoza Pine Nuts 供应链与可追溯性", "森林 → 采集者 → 加工 → 包装 → 出口"],
      ["Chilghoza Pine Nuts 地理标志（GI）", "原产地 • 身份 • 保护"],
      ["Chilghoza Pine Nuts 有机化学与天然品质", "天然成分 • 品质 • 食品科学"],
      ["Chilghoza Pine Nuts 加工、包装与增值", "干燥 • 烘焙 • 分级 • 储存"],
      ["Chilghoza Pine Nuts 可持续与道德贸易", "社区 • 森林 • 负责任贸易"],
    ],
    research: [
      ["Chilghoza Pine Nuts 地理原产地与GI研究", "原产地 • 地理 • GI研究"],
      ["Chilghoza Pine Nuts 生物学与植物学", "物种 • 生物学 • 植物学"],
      ["Chilghoza Pine Nuts 营养价值与天然成分", "营养 • 成分 • 天然品质"],
      ["Chilghoza Pine Nuts 森林与生态", "森林 • 生态 • 生态系统"],
      ["Chilghoza Pine Nuts 森林中的生物多样性与野生动物", "野生动物 • 生物多样性 • 栖息地"],
      ["Chilghoza Pine Nuts 气候与全球绿色环境", "气候 • 环境 • 韧性"],
      ["Chilghoza Pine Nuts 森林保护与恢复", "保护 • 恢复 • 管理"],
      ["Chilghoza Pine Nuts 社区的供应链与生计", "社区 • 生计 • 价值链"],
      ["Chilghoza Pine Nuts 可持续采收与意识", "采收 • 意识 • 最佳实践"],
      ["Chilghoza Pine Nuts 研究、政策与伙伴关系", "研究 • 政策 • 伙伴关系"],
    ],
  },
  ar: {
    trade: [
      ["الأسواق العالمية لـ Chilghoza Pine Nuts", "الولايات المتحدة • الصين • آسيا الوسطى • الشرق الأوسط"],
      ["سوق ومشترو Chilghoza Pine Nuts في الولايات المتحدة", "المشترون • المتطلبات • الفرص"],
      ["سوق ومشترو Chilghoza Pine Nuts في الصين", "مكتب التجارة • المشترون • معلومات السوق"],
      ["تصدير ولوجستيات Chilghoza Pine Nuts", "التعبئة • الوثائق • الشحن • الجمارك"],
      ["معايير المنتج والجودة لـ Chilghoza Pine Nuts", "اللب • بالقشرة • الدرجات • المواصفات"],
      ["سلسلة الإمداد وتتبع Chilghoza Pine Nuts", "الغابة ← الجامع ← المعالجة ← التعبئة ← التصدير"],
      ["المؤشر الجغرافي (GI) لـ Chilghoza Pine Nuts", "المنشأ • الهوية • الحماية"],
      ["الكيمياء العضوية والجودة الطبيعية لـ Chilghoza Pine Nuts", "التركيب الطبيعي • الجودة • علوم الغذاء"],
      ["المعالجة والتعبئة والقيمة المضافة لـ Chilghoza Pine Nuts", "تجفيف • تحميص • فرز • تخزين"],
      ["التجارة المستدامة والأخلاقية لـ Chilghoza Pine Nuts", "المجتمعات • الغابات • التجارة المسؤولة"],
    ],
    research: [
      ["بحث المنشأ الجغرافي وGI لـ Chilghoza Pine Nuts", "المنشأ • الجغرافيا • بحث GI"],
      ["بيولوجيا ونباتات Chilghoza Pine Nuts", "الأنواع • البيولوجيا • علم النبات"],
      ["القيمة الغذائية والتركيب الطبيعي لـ Chilghoza Pine Nuts", "التغذية • التركيب • الجودة الطبيعية"],
      ["غابات وبيئة Chilghoza Pine Nuts", "الغابات • البيئة • النظم البيئية"],
      ["التنوع الحيوي والحياة البرية في غابات Chilghoza Pine Nuts", "الحياة البرية • التنوع الحيوي • الموائل"],
      ["المناخ والبيئة الخضراء العالمية لـ Chilghoza Pine Nuts", "المناخ • البيئة • المرونة"],
      ["حفظ واستعادة غابات Chilghoza Pine Nuts", "الحفظ • الاستعادة • الرعاية"],
      ["سلسلة الإمداد وسبل العيش لمجتمعات Chilghoza Pine Nuts", "المجتمعات • سبل العيش • سلسلة القيمة"],
      ["الحصاد المستدام والتوعية لـ Chilghoza Pine Nuts", "الحصاد • التوعية • أفضل الممارسات"],
      ["البحث والسياسات والشراكات لـ Chilghoza Pine Nuts", "البحث • السياسات • الشراكات"],
    ],
  },
  ps: {
    trade: [
      ["د Chilghoza Pine Nuts نړیوال بازارونه", "امریکا • چین • منځنۍ اسیا • منځنی ختیځ"],
      ["د Chilghoza Pine Nuts د امریکا بازار او پېرودونکي", "پېرودونکي • اړتیاوې • فرصتونه"],
      ["د Chilghoza Pine Nuts د چین بازار او پېرودونکي", "سوداګریز میز • پېرودونکي • د بازار معلومات"],
      ["د Chilghoza Pine Nuts صادرات او لوژستیک", "بسته بندي • اسناد • لېږد • ګمرک"],
      ["د Chilghoza Pine Nuts د محصول او کیفیت معیارونه", "مغز • له پوستکي سره • درجې • مشخصات"],
      ["د Chilghoza Pine Nuts اکمالاتي ځنځیر او تعقیب", "ځنګل → راټولوونکی → پروسس → بسته بندي → صادرات"],
      ["د Chilghoza Pine Nuts جغرافیایي نښه (GI)", "اصليت • پېژندنه • ساتنه"],
      ["د Chilghoza Pine Nuts عضوي کیمیا او طبیعي کیفیت", "طبیعي جوړښت • کیفیت • د خوړو ساینس"],
      ["د Chilghoza Pine Nuts پروسس، بسته بندي او ارزښت زیاتونه", "وچول • پخول • درجه بندي • زېرمه"],
      ["د Chilghoza Pine Nuts دوامداره او اخلاقي سوداګري", "ټولنې • ځنګلونه • مسؤله سوداګري"],
    ],
    research: [
      ["د Chilghoza Pine Nuts جغرافیایي اصليت او GI څېړنه", "اصليت • جغرافیه • GI څېړنه"],
      ["د Chilghoza Pine Nuts بیولوژي او بوټپوهنه", "ډولونه • بیولوژي • بوټپوهنه"],
      ["د Chilghoza Pine Nuts غذایي ارزښت او طبیعي جوړښت", "تغذیه • جوړښت • طبیعي کیفیت"],
      ["د Chilghoza Pine Nuts ځنګلونه او ایکولوژي", "ځنګلونه • ایکولوژي • ایکوسیستم"],
      ["د Chilghoza Pine Nuts ځنګلونو ژوي او حیاتي تنوع", "ژوي • حیاتي تنوع • استوګنځایونه"],
      ["د Chilghoza Pine Nuts اقلیم او نړیوال شین چاپېریال", "اقلیم • چاپېریال • مقاومت"],
      ["د Chilghoza Pine Nuts د ځنګل ساتنه او بیا رغونه", "ساتنه • بیا رغونه • پالنه"],
      ["د Chilghoza Pine Nuts ټولنو اکمالاتي ځنځیر او معیشت", "ټولنې • معیشت • ارزښت ځنځیر"],
      ["د Chilghoza Pine Nuts دوامداره حاصل او پوهاوی", "حاصل • پوهاوی • غوره کړنلارې"],
      ["د Chilghoza Pine Nuts څېړنه، پاليسي او مشارکت", "څېړنه • پاليسي • مشارکت"],
    ],
  },
  ru: {
    trade: [
      ["Мировые рынки Chilghoza Pine Nuts", "США • Китай • Центральная Азия • Ближний Восток"],
      ["Рынок и покупатели Chilghoza Pine Nuts в США", "Покупатели • требования • возможности"],
      ["Рынок и покупатели Chilghoza Pine Nuts в Китае", "Торговый стол • покупатели • рыночная аналитика"],
      ["Экспорт и логистика Chilghoza Pine Nuts", "Упаковка • документы • доставка • таможня"],
      ["Стандарты продукта и качества Chilghoza Pine Nuts", "Ядра • в скорлупе • сорта • спецификации"],
      ["Цепочка поставок и прослеживаемость Chilghoza Pine Nuts", "Лес → сборщик → переработка → упаковка → экспорт"],
      ["Географическое указание (GI) Chilghoza Pine Nuts", "Происхождение • идентичность • защита"],
      ["Органическая химия и природное качество Chilghoza Pine Nuts", "Природный состав • качество • пищевая наука"],
      ["Переработка, упаковка и добавленная стоимость Chilghoza Pine Nuts", "Сушка • обжарка • сортировка • хранение"],
      ["Устойчивая и этичная торговля Chilghoza Pine Nuts", "Сообщества • леса • ответственная торговля"],
    ],
    research: [
      ["Исследование географического происхождения и GI Chilghoza Pine Nuts", "Происхождение • география • исследование GI"],
      ["Биология и ботаника Chilghoza Pine Nuts", "Вид • биология • ботаника"],
      ["Пищевая ценность и природный состав Chilghoza Pine Nuts", "Питание • состав • природное качество"],
      ["Леса и экология Chilghoza Pine Nuts", "Леса • экология • экосистемы"],
      ["Биоразнообразие и дикая природа в лесах Chilghoza Pine Nuts", "Дикая природа • биоразнообразие • среды"],
      ["Климат и глобальная зеленая среда Chilghoza Pine Nuts", "Климат • окружающая среда • устойчивость"],
      ["Сохранение и восстановление лесов Chilghoza Pine Nuts", "Сохранение • восстановление • управление"],
      ["Цепочка поставок и средства к существованию сообществ Chilghoza Pine Nuts", "Сообщества • средства к существованию • цепочка ценности"],
      ["Устойчивый сбор и осведомленность о Chilghoza Pine Nuts", "Сбор • осведомленность • лучшие практики"],
      ["Исследования, политика и партнерства Chilghoza Pine Nuts", "Исследования • политика • партнерства"],
    ],
  },
  ur: {
    trade: [
      ["Chilghoza Pine Nuts کی عالمی منڈیاں", "امریکہ • چین • وسطی ایشیا • مشرق وسطیٰ"],
      ["Chilghoza Pine Nuts کے لیے امریکی منڈی اور خریدار", "خریدار • تقاضے • مواقع"],
      ["Chilghoza Pine Nuts کے لیے چینی منڈی اور خریدار", "تجارتی ڈیسک • خریدار • مارکیٹ انٹیلیجنس"],
      ["Chilghoza Pine Nuts کی برآمد اور لاجسٹکس", "پیکنگ • دستاویزات • شپنگ • کسٹم"],
      ["Chilghoza Pine Nuts کے مصنوعات اور معیار کے معیارات", "مغز • چھلکے والے • درجے • وضاحتیں"],
      ["Chilghoza Pine Nuts کی سپلائی چین اور سراغ لگانا", "جنگل → جمع کرنے والا → پروسیسنگ → پیکنگ → برآمد"],
      ["Chilghoza Pine Nuts کا جغرافیائی اشارہ (GI)", "اصل • شناخت • تحفظ"],
      ["Chilghoza Pine Nuts کی نامیاتی کیمسٹری اور قدرتی معیار", "قدرتی مرکب • معیار • فوڈ سائنس"],
      ["Chilghoza Pine Nuts کی پروسیسنگ، پیکنگ اور ویلیو ایڈیشن", "خشک کرنا • بھوننا • درجہ بندی • ذخیرہ"],
      ["Chilghoza Pine Nuts کی پائیدار اور اخلاقی تجارت", "کمیونٹیز • جنگلات • ذمہ دار تجارت"],
    ],
    research: [
      ["Chilghoza Pine Nuts کے جغرافیائی اصل اور GI تحقیق", "اصل • جغرافیہ • GI تحقیق"],
      ["Chilghoza Pine Nuts کی حیاتیات اور نباتیات", "انواع • حیاتیات • نباتیات"],
      ["Chilghoza Pine Nuts کی غذائی قدر اور قدرتی مرکب", "غذائیت • مرکب • قدرتی معیار"],
      ["Chilghoza Pine Nuts کے جنگلات اور ماحولیات", "جنگلات • ماحولیات • ماحولیاتی نظام"],
      ["Chilghoza Pine Nuts کے جنگلات میں حیاتیاتی تنوع اور جنگلی حیات", "جنگلی حیات • حیاتیاتی تنوع • مسکن"],
      ["Chilghoza Pine Nuts کے لیے آب و ہوا اور عالمی سبز ماحول", "آب و ہوا • ماحول • لچک"],
      ["Chilghoza Pine Nuts کے جنگلات کا تحفظ اور بحالی", "تحفظ • بحالی • نگرانی"],
      ["Chilghoza Pine Nuts کمیونٹیز کی سپلائی چین اور معاش", "کمیونٹیز • معاش • ویلیو چین"],
      ["Chilghoza Pine Nuts کی پائیدار کٹائی اور آگاہی", "کٹائی • آگاہی • بہترین عمل"],
      ["Chilghoza Pine Nuts کی تحقیق، پالیسی اور شراکت داری", "تحقیق • پالیسی • شراکت داری"],
    ],
  },
};

const DEFAULT_GALLERY = [
  ["01-chilghoza-lot.jpg", "Chilghoza Pine Nuts Lot Inspection & Grading"],
  ["02-chilghoza-cones.jpg", "Harvested Cones of Chilghoza Pine Nuts"],
  ["03-chilghoza-kernel.jpg", "Premium Shelled Kernels of Chilghoza Pine Nuts"],
  ["04-chilghoza-harvest.jpg", "Sustainable Harvesting of Chilghoza Pine Nuts"],
  ["05-chilghoza-raw-kernels.jpg", "Raw Selection of Chilghoza Pine Nuts"],
  ["06-chilghoza-cone-closeup.jpg", "Macro Detail of Chilghoza Pine Nuts Cone"],
  ["07-chilghoza-products-display.jpg", "Export Packaging of Chilghoza Pine Nuts"],
  ["08-chilghoza-forest.jpg", "Chilas, Diamer Native Chilghoza Pine Nuts Forest"],
];

const T = {
  en: {
    navHome: "Home", navTrade: "Global Trade", navResearch: "Research & Knowledge",
    navGallery: "Gallery", admin: "Admin",
    eyebrow: "PAKISTAN · ORIGIN · GLOBAL",
    heroRoyal: "Royal", heroTitle: "Chilghoza Pine Nuts",
    heroText: "From the Chilghoza Pine Nuts forests of Pakistan to the world — connecting premium quality, authentic origin, responsible supply chains and knowledge.",
    exploreTrade: "Explore Global Trade", exploreResearch: "Explore Research",
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
    aiPlaceholder: "Ask about Chilghoza Pine Nuts...", ask: "Ask AI",
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
    visitorAI: "Visitor Assistant", adminAI: "Admin Assistant",
    profileEyebrow: "ROYAL LEADERSHIP · PAKISTAN · ORIGIN · GLOBAL",
    profileRole: "Founder & CEO",
    profileDescription: "From the mountains and forests of Pakistan to the world — building a trusted connection between authentic origin, premium quality, global trade and knowledge.",
    profileTag1: "PAKISTAN", profileTag2: "ORIGIN",
    profileTag3: "GLOBAL TRADE", profileTag4: "KNOWLEDGE",
    office1Title: "Headquarters & Native Origin",
    office2Title: "Regional Operations Hub",
    office3Title: "Federal & Trade Desk",
    office4Title: "International Trade Desk",
  },
  zh: {
    navHome: "首页", navTrade: "全球贸易", navResearch: "研究与知识",
    navGallery: "图库", admin: "管理",
    eyebrow: "巴基斯坦 · 原产地 · 全球",
    heroRoyal: "皇家", heroTitle: "Chilghoza Pine Nuts",
    heroText: "从巴基斯坦的 Chilghoza Pine Nuts 森林走向世界，连接优质品质、真实原产地、责任供应链与知识。",
    exploreTrade: "探索全球贸易", exploreResearch: "探索研究",
    gatewayEyebrow: "两大核心门户",
    gatewayTitle: "一个皇家 Chilghoza Pine Nuts 生态系统",
    tradeTitle: "全球贸易",
    tradeText: "优质品质 · 全球出口 · 市场与买家",
    researchTitle: "研究与知识",
    researchText: "科学 · 原产地 · 森林 · 生态 · 知识",
    openGateway: "打开门户",
    galleryEyebrow: "皇家实地档案",
    galleryTitle: "Chilghoza Pine Nuts 图库",
    galleryText: "来自森林、采收、分级和出口的八项可编辑视觉记录。",
    aiTitle: "皇家 AI 助手",
    aiText: "咨询 Chilghoza Pine Nuts、贸易、品质、森林和研究。",
    aiPlaceholder: "询问 Chilghoza Pine Nuts...", ask: "询问 AI",
    directInquiry: "直接贸易咨询",
    whatsappTitle: "WhatsApp Chilghoza Pine Nuts 贸易台",
    officeEyebrow: "联系 · 办公室 · 合作",
    officeTitle: "办公室地址",
    back: "返回",
    hubContent: "知识中心",
    hubBody: "此完整迷你网站页面已准备好接收管理员内容、文章、市场信息和研究记录。",
    whatsappTrade: "WhatsApp 贸易",
    mediaTitle: "图片 · 视频 · PDF",
    mediaEmpty: "上传后动态媒体将显示在这里。",
    visitorAI: "访客助手", adminAI: "管理员助手",
    profileEyebrow: "皇家领导层 · 巴基斯坦 · 原产地 · 全球",
    profileRole: "创始人兼首席执行官",
    profileDescription: "从巴基斯坦的山脉和森林走向世界 — 在真实原产地、优质品质、全球贸易与知识之间建立值得信赖的联系。",
    profileTag1: "巴基斯坦", profileTag2: "原产地",
    profileTag3: "全球贸易", profileTag4: "知识",
    office1Title: "总部与原产地",
    office2Title: "区域运营中心",
    office3Title: "联邦与贸易办公室",
    office4Title: "国际贸易办公室",
  },
  ar: {
    navHome: "الرئيسية", navTrade: "التجارة العالمية", navResearch: "البحث والمعرفة",
    navGallery: "المعرض", admin: "الإدارة",
    eyebrow: "باكستان · المنشأ · العالم",
    heroRoyal: "رويال", heroTitle: "Chilghoza Pine Nuts",
    heroText: "من غابات Chilghoza Pine Nuts في باكستان إلى العالم، نربط الجودة الفاخرة والمنشأ الأصيل وسلاسل الإمداد المسؤولة والمعرفة.",
    exploreTrade: "استكشف التجارة العالمية", exploreResearch: "استكشف البحث",
    gatewayEyebrow: "بوابتان رئيسيتان",
    gatewayTitle: "منظومة Royal Chilghoza Pine Nuts واحدة",
    tradeTitle: "التجارة العالمية",
    tradeText: "جودة فاخرة · تصدير عالمي · أسواق ومشترون",
    researchTitle: "البحث والمعرفة",
    researchText: "علم · منشأ · غابات · بيئة · معرفة",
    openGateway: "افتح البوابة",
    galleryEyebrow: "الأرشيف الميداني الملكي",
    galleryTitle: "معرض Chilghoza Pine Nuts",
    galleryText: "ثمانية سجلات مرئية قابلة للتحرير من الغابة والحصاد والفرز والتصدير.",
    aiTitle: "مساعد رويال الذكي",
    aiText: "اسأل عن Chilghoza Pine Nuts والتجارة والجودة والغابات والبحث.",
    aiPlaceholder: "اسأل عن Chilghoza Pine Nuts...", ask: "اسأل AI",
    directInquiry: "استفسار تجاري مباشر",
    whatsappTitle: "مكتب WhatsApp لتجارة Chilghoza Pine Nuts",
    officeEyebrow: "اتصال · مكتب · شراكة",
    officeTitle: "عناوين المكاتب",
    back: "رجوع",
    hubContent: "مركز المعرفة",
    hubBody: "صفحة موقع مصغر كاملة جاهزة للمحتوى والمقالات ومعلومات السوق وسجلات البحث.",
    whatsappTrade: "تجارة WhatsApp",
    mediaTitle: "صور · فيديو · PDF",
    mediaEmpty: "ستظهر الوسائط الديناميكية هنا بعد الرفع.",
    visitorAI: "مساعد الزوار", adminAI: "مساعد الإدارة",
    profileEyebrow: "القيادة الملكية · باكستان · المنشأ · العالم",
    profileRole: "المؤسس والرئيس التنفيذي",
    profileDescription: "من جبال وغابات باكستان إلى العالم — نبني اتصالاً موثوقاً بين المنشأ الأصيل والجودة الفاخرة والتجارة العالمية والمعرفة.",
    profileTag1: "باكستان", profileTag2: "المنشأ",
    profileTag3: "التجارة العالمية", profileTag4: "المعرفة",
    office1Title: "المقر الرئيسي والمنشأ الأصلي",
    office2Title: "مركز العمليات الإقليمي",
    office3Title: "مكتب التجارة الفيدرالي",
    office4Title: "مكتب التجارة الدولية",
  },
  ps: {
    navHome: "کور", navTrade: "نړیواله سوداګري", navResearch: "څېړنه او پوهه",
    navGallery: "انځورونه", admin: "اداره",
    eyebrow: "پاکستان · اصليت · نړۍ",
    heroRoyal: "رایل", heroTitle: "Chilghoza Pine Nuts",
    heroText: "د پاکستان د Chilghoza Pine Nuts له ځنګلونو څخه نړۍ ته — غوره کیفیت، اصليت، مسؤل اکمالاتي ځنځیر او پوهه سره نښلوو.",
    exploreTrade: "نړیواله سوداګري وګورئ", exploreResearch: "څېړنه وګورئ",
    gatewayEyebrow: "دوه اساسي دروازې",
    gatewayTitle: "یو Royal Chilghoza Pine Nuts ایکوسیستم",
    tradeTitle: "نړیواله سوداګري",
    tradeText: "غوره کیفیت · نړیوال صادرات · بازارونه او پېرودونکي",
    researchTitle: "څېړنه او پوهه",
    researchText: "ساینس · اصليت · ځنګلونه · ایکولوژي · پوهه",
    openGateway: "دروازه پرانیزئ",
    galleryEyebrow: "رایل میداني ارشیف",
    galleryTitle: "Chilghoza Pine Nuts ګالري",
    galleryText: "د ځنګل، حاصل، درجه بندۍ او صادراتو اته د بدلون وړ بصري ریکارډونه.",
    aiTitle: "رایل AI مرستیال",
    aiText: "د Chilghoza Pine Nuts، سوداګرۍ، کیفیت، ځنګلونو او څېړنې په اړه وپوښتئ.",
    aiPlaceholder: "د Chilghoza Pine Nuts په اړه وپوښتئ...", ask: "AI وپوښتئ",
    directInquiry: "مستقیم سوداګریز تماس",
    whatsappTitle: "WhatsApp Chilghoza Pine Nuts سوداګریز دفتر",
    officeEyebrow: "اړیکه · دفتر · مشارکت",
    officeTitle: "د دفتر پته",
    back: "شاته",
    hubContent: "د پوهې مرکز",
    hubBody: "دا بشپړه Mini-Website پاڼه د اډمین محتوا، مقالو، بازار معلوماتو او څېړنیزو ریکارډونو لپاره چمتو ده.",
    whatsappTrade: "WhatsApp سوداګري",
    mediaTitle: "انځورونه · ویډیو · PDF",
    mediaEmpty: "متحرک رسنۍ به د اپلوډ وروسته دلته ښکاره شي.",
    visitorAI: "د کاروونکي مرستیال", adminAI: "د اډمین مرستیال",
    profileEyebrow: "شاهي مشرۍ · پاکستان · اصليت · نړۍ",
    profileRole: "بنسټګر او اجرایوي رییس",
    profileDescription: "د پاکستان له غرونو او ځنګلونو څخه نړۍ ته — د اصلي اصليت، غوره کیفیت، نړیوالې سوداګرۍ او پوهې ترمنځ باوري اړیکه جوړوو.",
    profileTag1: "پاکستان", profileTag2: "اصليت",
    profileTag3: "نړیواله سوداګري", profileTag4: "پوهه",
    office1Title: "مرکزي دفتر او اصلي اصليت",
    office2Title: "سیمه ییز عملیاتي مرکز",
    office3Title: "فدرالي او سوداګریز دفتر",
    office4Title: "نړیوال سوداګریز دفتر",
  },
  ru: {
    navHome: "Главная", navTrade: "Мировая торговля", navResearch: "Исследования и знания",
    navGallery: "Галерея", admin: "Админ",
    eyebrow: "ПАКИСТАН · ПРОИСХОЖДЕНИЕ · МИР",
    heroRoyal: "Роял", heroTitle: "Chilghoza Pine Nuts",
    heroText: "Из лесов Chilghoza Pine Nuts Пакистана в мир — премиальное качество, подлинное происхождение, ответственная цепочка поставок и знания.",
    exploreTrade: "Мировая торговля", exploreResearch: "Исследования",
    gatewayEyebrow: "ДВА ОСНОВНЫХ ПОРТАЛА",
    gatewayTitle: "Единая экосистема Royal Chilghoza Pine Nuts",
    tradeTitle: "МИРОВАЯ ТОРГОВЛЯ",
    tradeText: "Премиальное качество · мировой экспорт · рынки и покупатели",
    researchTitle: "ИССЛЕДОВАНИЯ И ЗНАНИЯ",
    researchText: "Наука · происхождение · леса · экология · знания",
    openGateway: "Открыть портал",
    galleryEyebrow: "КОРОЛЕВСКИЙ ПОЛЕВОЙ АРХИВ",
    galleryTitle: "Галерея Chilghoza Pine Nuts",
    galleryText: "Восемь редактируемых визуальных записей из леса, сбора, сортировки и экспорта.",
    aiTitle: "Королевский AI помощник",
    aiText: "Спросите о Chilghoza Pine Nuts, торговле, качестве, лесах и исследованиях.",
    aiPlaceholder: "Спросите о Chilghoza Pine Nuts...", ask: "Спросить AI",
    directInquiry: "ПРЯМОЙ ТОРГОВЫЙ ЗАПРОС",
    whatsappTitle: "WhatsApp торговый отдел Chilghoza Pine Nuts",
    officeEyebrow: "КОНТАКТ · ОФИС · ПАРТНЕРСТВО",
    officeTitle: "Адреса офисов",
    back: "Назад",
    hubContent: "Центр знаний",
    hubBody: "Эта полная страница мини-сайта готова для контента администратора, статей, рыночной информации и исследований.",
    whatsappTrade: "WhatsApp торговля",
    mediaTitle: "Изображения · Видео · PDF",
    mediaEmpty: "Динамические материалы появятся здесь после загрузки.",
    visitorAI: "Помощник посетителя", adminAI: "Помощник администратора",
    profileEyebrow: "КОРОЛЕВСКОЕ РУКОВОДСТВО · ПАКИСТАН · ПРОИСХОЖДЕНИЕ · МИР",
    profileRole: "Основатель и генеральный директор",
    profileDescription: "От гор и лесов Пакистана к миру — строим надежную связь между подлинным происхождением, премиальным качеством, мировой торговлей и знаниями.",
    profileTag1: "ПАКИСТАН", profileTag2: "ПРОИСХОЖДЕНИЕ",
    profileTag3: "МИРОВАЯ ТОРГОВЛЯ", profileTag4: "ЗНАНИЯ",
    office1Title: "Штаб-квартира и родное происхождение",
    office2Title: "Региональный операционный центр",
    office3Title: "Федеральный торговый офис",
    office4Title: "Международный торговый офис",
  },
  ur: {
    navHome: "ہوم", navTrade: "عالمی تجارت", navResearch: "تحقیق اور علم",
    navGallery: "گیلری", admin: "ایڈمن",
    eyebrow: "پاکستان · اصل · عالمی",
    heroRoyal: "رائل", heroTitle: "Chilghoza Pine Nuts",
    heroText: "پاکستان کے Chilghoza Pine Nuts کے جنگلات سے دنیا تک — بہترین معیار، مستند اصل، ذمہ دار سپلائی چین اور علم کو جوڑنا۔",
    exploreTrade: "عالمی تجارت دیکھیں", exploreResearch: "تحقیق دیکھیں",
    gatewayEyebrow: "دو بنیادی دروازے",
    gatewayTitle: "ایک رائل Chilghoza Pine Nuts ماحولیاتی نظام",
    tradeTitle: "عالمی تجارت",
    tradeText: "بہترین معیار · دنیا بھر میں برآمد · منڈیاں اور خریدار",
    researchTitle: "تحقیق اور علم",
    researchText: "سائنس · اصل · جنگلات · ماحولیات · علم",
    openGateway: "دروازہ کھولیں",
    galleryEyebrow: "رائل فیلڈ آرکائیو",
    galleryTitle: "Chilghoza Pine Nuts گیلری",
    galleryText: "جنگل، کٹائی، درجہ بندی اور برآمد سے آٹھ قابل ترمیم بصری ریکارڈ۔",
    aiTitle: "رائل AI اسسٹنٹ",
    aiText: "Chilghoza Pine Nuts، تجارت، معیار، جنگلات اور تحقیق کے بارے میں پوچھیں۔",
    aiPlaceholder: "Chilghoza Pine Nuts کے بارے میں پوچھیں...", ask: "AI سے پوچھیں",
    directInquiry: "براہ راست تجارتی استفسار",
    whatsappTitle: "WhatsApp Chilghoza Pine Nuts تجارتی ڈیسک",
    officeEyebrow: "رابطہ · دفتر · شراکت داری",
    officeTitle: "دفتر کا پتہ",
    back: "واپس",
    hubContent: "نالج ہب",
    hubBody: "یہ مکمل منی ویب سائٹ صفحہ ایڈمن مواد، مضامین، مارکیٹ کی معلومات، تحقیقی ریکارڈ اور تفصیلی وضاحتوں کے لیے تیار ہے۔",
    whatsappTrade: "WhatsApp تجارت",
    mediaTitle: "تصاویر · ویڈیوز · PDFs",
    mediaEmpty: "اپ لوڈ کے بعد متحرک میڈیا یہاں ظاہر ہوگا۔",
    visitorAI: "وزیٹر اسسٹنٹ", adminAI: "ایڈمن اسسٹنٹ",
    profileEyebrow: "رائل قیادت · پاکستان · اصل · عالمی",
    profileRole: "بانی اور سی ای او",
    profileDescription: "پاکستان کے پہاڑوں اور جنگلات سے دنیا تک — مستند اصل، بہترین معیار، عالمی تجارت اور علم کے درمیان ایک قابل اعتماد ربط قائم کرنا۔",
    profileTag1: "پاکستان", profileTag2: "اصل",
    profileTag3: "عالمی تجارت", profileTag4: "علم",
    office1Title: "ہیڈ کوارٹر اور آبائی اصل",
    office2Title: "علاقائی آپریشنز ہب",
    office3Title: "وفاقی اور تجارتی ڈیسک",
    office4Title: "بین الاقوامی تجارتی ڈیسک",
  },
};

/* =========================================================
   STATE DATA (KV-driven)
========================================================= */

const DEFAULT_GATEWAYS = [
  { id: "trade", icon: "◈", builtin: true, published: true },
  { id: "research", icon: "✦", builtin: true, published: true }
];

const DEFAULT_OFFICES = [
  "Chilas, Diamer District, Gilgit-Baltistan, Pakistan",
  "Gilgit, Gilgit-Baltistan, Pakistan",
  "Islamabad, Pakistan",
  "China / International Export Hub",
];

let offices = [...DEFAULT_OFFICES];
let galleryItems = [...DEFAULT_GALLERY];
let heroImageUrl = "001.jpg";
let profileImageUrl = "royal-profile-pic.jpg";
let gatewayTradeData = { title: null, text: null };
let gatewayResearchData = { title: null, text: null };
let customHubData = null;
let gateways = null;
let hubMediaCache = {};

/* =========================================================
   KV HELPERS
========================================================= */

async function getFromKV(key) {
  try {
    const r = await fetch("/api/kv/get/" + encodeURIComponent(key));
    if (!r.ok) return null;
    const data = await r.json();
    return data.ok ? data.value : null;
  } catch (e) {
    return null;
  }
}

async function saveToKV(key, value) {
  try {
    const r = await fetch("/api/kv/set", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + state.token,
      },
      body: JSON.stringify({ key, value }),
    });
    const data = await r.json();
    return data.ok;
  } catch (e) {
    return false;
  }
}

/* =========================================================
   CORE FUNCTIONS
========================================================= */

function tx(k) {
  return (T[state.lang] && T[state.lang][k]) || T.en[k] || k;
}

function hubs(type) {
  if (customHubData && customHubData[state.lang] && Array.isArray(customHubData[state.lang][type])) {
    return customHubData[state.lang][type];
  }
  const defaults = (hubData[state.lang] || hubData.en)[type];
  if (defaults) return defaults;
  return [];
}

function ensureCustomHub(type) {
  if (!customHubData) customHubData = {};
  if (!customHubData[state.lang]) customHubData[state.lang] = {};
  if (!Array.isArray(customHubData[state.lang][type])) {
    const defaults = (hubData[state.lang] || hubData.en)[type];
    customHubData[state.lang][type] = defaults ? JSON.parse(JSON.stringify(defaults)) : [];
  }
  return customHubData[state.lang][type];
}

async function saveHubsKV() {
  return await saveToKV("hubs_data", customHubData);
}

function getGateways() {
  if (Array.isArray(gateways) && gateways.length > 0) return gateways;
  return JSON.parse(JSON.stringify(DEFAULT_GATEWAYS));
}

function getVisibleGateways() {
  const all = getGateways();
  if (state.admin) return all;
  return all.filter(gw => gw.published !== false);
}

function getGatewayTitle(gw) {
  if (gw.builtin && gw.id === "trade") return gatewayTradeData.title || tx("tradeTitle");
  if (gw.builtin && gw.id === "research") return gatewayResearchData.title || tx("researchTitle");
  if (gw.title && typeof gw.title === "object") {
    return gw.title[state.lang] || gw.title.en || gw.title.ur || "Gateway";
  }
  return "Gateway";
}

function getGatewayText(gw) {
  if (gw.builtin && gw.id === "trade") return gatewayTradeData.text || tx("tradeText");
  if (gw.builtin && gw.id === "research") return gatewayResearchData.text || tx("researchText");
  if (gw.text && typeof gw.text === "object") {
    return gw.text[state.lang] || gw.text.en || gw.text.ur || "";
  }
  return "";
}

async function saveGatewaysKV() {
  return await saveToKV("gateways_data", gateways);
}

function applyLanguage() {
  hubMediaCache = {};
  document.documentElement.lang = state.lang;
  document.documentElement.dir = (state.lang === "ar" || state.lang === "ur") ? "rtl" : "ltr";
  document.querySelectorAll("[data-i18n]").forEach((e) => (e.textContent = tx(e.dataset.i18n)));
  document.querySelectorAll("[data-i18n-placeholder]").forEach((e) => (e.placeholder = tx(e.dataset.i18nPlaceholder)));
  document.querySelectorAll("#languageSelect,#gatewayLanguage,#hubLanguage").forEach((s) => (s.value = state.lang));
  const aiModeLabel = document.getElementById("aiModeLabel");
  if (aiModeLabel) aiModeLabel.textContent = state.admin ? tx("adminAI") : tx("visitorAI");

  applyGatewayContent();
  renderGateways();
  renderOffices();
  renderGallery();
  if (state.gateway) renderGateway(state.gateway);
  if (state.hub) renderHub(state.hub.type, state.hub.index);
}

function applyGatewayContent() {
  const tradeTitleEl = document.querySelector('[data-i18n="tradeTitle"]');
  const tradeTextEl = document.querySelector('[data-i18n="tradeText"]');
  const researchTitleEl = document.querySelector('[data-i18n="researchTitle"]');
  const researchTextEl = document.querySelector('[data-i18n="researchText"]');

  if (gatewayTradeData.title && tradeTitleEl) tradeTitleEl.textContent = gatewayTradeData.title;
  if (gatewayTradeData.text && tradeTextEl) tradeTextEl.textContent = gatewayTradeData.text;
  if (gatewayResearchData.title && researchTitleEl) researchTitleEl.textContent = gatewayResearchData.title;
  if (gatewayResearchData.text && researchTextEl) researchTextEl.textContent = gatewayResearchData.text;
}

function setLanguage(lang) {
  if (!languages.includes(lang)) return;
  state.lang = lang;
  sessionStorage.setItem("royalLanguage", lang);
  applyLanguage();
}

function renderGallery() {
  const grid = document.getElementById("galleryGrid");
  if (!grid) return;
  grid.innerHTML = galleryItems.map(([src, cap], i) =>
    `<figure class="gallery-item" data-gallery-index="${i}">
      <img src="${src}" alt="${cap}" loading="lazy" onerror="this.classList.add('failed')">
      <figcaption><span>${String(i + 1).padStart(2, "0")}</span>${cap}</figcaption>
      <button class="edit-btn" data-edit-gallery="${i}" type="button" title="Edit Image">✏️</button>
    </figure>`
  ).join("");

  document.querySelectorAll("[data-edit-gallery]").forEach((btn) => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const idx = +btn.dataset.editGallery;
      editGalleryItem(idx);
    };
  });
}

/* =========================================================
   RENDER GATEWAYS — Main Page Dynamic
========================================================= */

function renderGateways() {
  const grid = document.getElementById("gatewayGrid");
  if (!grid) return;

  const allGateways = getGateways();
  const visibleGateways = getVisibleGateways();
  const listToRender = state.admin ? allGateways : visibleGateways;

  if (listToRender.length === 0) {
    grid.innerHTML = `<p style="text-align:center;color:var(--muted);padding:40px;">No gateways available yet.</p>`;
    return;
  }

  const html = listToRender.map((gw) => {
    const realIndex = allGateways.findIndex(g => g.id === gw.id);
    const title = getGatewayTitle(gw);
    const text = getGatewayText(gw);
    const icon = gw.icon || "◆";
    const isHidden = gw.published === false;

    const adminBtns = state.admin ? `
      <div class="gateway-card-actions">
        <button class="hub-action-btn" data-gw-edit="${realIndex}" title="Edit" type="button">✏️</button>
        ${realIndex > 0 ? `<button class="hub-action-btn" data-gw-up="${realIndex}" title="Move Up" type="button">⬆</button>` : ""}
        ${realIndex < allGateways.length - 1 ? `<button class="hub-action-btn" data-gw-down="${realIndex}" title="Move Down" type="button">⬇</button>` : ""}
        ${!gw.builtin ? `<button class="hub-action-btn danger" data-gw-delete="${realIndex}" title="Delete" type="button">🗑</button>` : ""}
      </div>
    ` : "";

    const hiddenBadge = (state.admin && isHidden) ? `
      <div class="gateway-hidden-badge">🌫 HIDDEN from visitors</div>
    ` : "";

    return `
      <article class="gateway-card glass-card ${isHidden ? 'gateway-hidden' : ''}" style="position:relative;">
        ${adminBtns}
        ${hiddenBadge}
        <div class="gateway-icon">${icon}</div>
        <p class="eyebrow">${String(realIndex + 1).padStart(2, "0")} · CHILGHOZA PINE NUTS</p>
        <h2 class="gateway-title">${escapeHtml(title)}</h2>
        <p class="gateway-text">${escapeHtml(text)}</p>
        <button class="btn btn-gold" data-open-gateway="${gw.id}" type="button">${tx("openGateway")}</button>
      </article>
    `;
  }).join("");

  const createBtn = state.admin ? `
    <button class="create-hub-btn" data-create-gateway type="button">
      <span>➕</span>
      <b>Create New Gateway</b>
      <small>Add a new gateway to the main page</small>
    </button>
  ` : "";

  grid.innerHTML = html + createBtn;

  grid.querySelectorAll("[data-open-gateway]").forEach((b) =>
    (b.onclick = (e) => {
      e.preventDefault();
      openGateway(b.dataset.openGateway);
    })
  );

  if (state.admin) {
    grid.querySelectorAll("[data-gw-edit]").forEach((b) =>
      (b.onclick = (e) => { e.preventDefault(); e.stopPropagation(); editGatewayItem(+b.dataset.gwEdit); })
    );
    grid.querySelectorAll("[data-gw-up]").forEach((b) =>
      (b.onclick = (e) => { e.preventDefault(); e.stopPropagation(); moveGateway(+b.dataset.gwUp, -1); })
    );
    grid.querySelectorAll("[data-gw-down]").forEach((b) =>
      (b.onclick = (e) => { e.preventDefault(); e.stopPropagation(); moveGateway(+b.dataset.gwDown, 1); })
    );
    grid.querySelectorAll("[data-gw-delete]").forEach((b) =>
      (b.onclick = (e) => { e.preventDefault(); e.stopPropagation(); deleteGatewayItem(+b.dataset.gwDelete); })
    );
    const cb = grid.querySelector("[data-create-gateway]");
    if (cb) cb.onclick = createNewGateway;
  }
}

/* =========================================================
   GATEWAY CRUD
========================================================= */

function createNewGateway() {
  const currentLang = state.lang;
  const langLabel = currentLang.toUpperCase();

  openEditModal(
    "🆕 Create New Gateway",
    `
    <label>Icon (emoji or symbol):</label>
    <input type="text" id="newGwIcon" placeholder="◆" value="🆕" maxlength="4">

    <label>Gateway Title (${langLabel}): <span style="color:#ff6b6b">*</span></label>
    <input type="text" id="newGwTitle" placeholder="New Gateway 1">

    <label>Gateway Description (${langLabel}):</label>
    <textarea id="newGwText" rows="2" placeholder="Short description..."></textarea>

    <label style="margin-top:18px;">Visibility:</label>
    <div class="gw-visibility-options">
      <label class="gw-radio"><input type="radio" name="newGwVis" value="hide" checked> 🌫 <b>Hide</b> from visitors (Draft)</label>
      <label class="gw-radio"><input type="radio" name="newGwVis" value="show"> 👁 <b>Show</b> to everyone</label>
    </div>

    <p class="admin-note" style="margin-top:14px;">💡 You can add hubs after creating. The gateway remains hidden until you publish it.</p>
    `,
    async () => {
      const icon = document.getElementById("newGwIcon").value.trim() || "🆕";
      const title = document.getElementById("newGwTitle").value.trim();
      const text = document.getElementById("newGwText").value.trim();
      const vis = document.querySelector('input[name="newGwVis"]:checked').value;
      const published = vis === "show";

      if (!title) { setEditStatus("❌ Title required", "error"); return; }

      const newId = "gw_" + Date.now();

      if (!gateways) gateways = JSON.parse(JSON.stringify(DEFAULT_GATEWAYS));

      gateways.push({
        id: newId,
        icon: icon,
        builtin: false,
        published: published,
        title: { [currentLang]: title, en: currentLang === "en" ? title : "" },
        text: { [currentLang]: text, en: currentLang === "en" ? text : "" }
      });

      if (!customHubData) customHubData = {};
      if (!customHubData[currentLang]) customHubData[currentLang] = {};
      customHubData[currentLang][newId] = [];

      setEditStatus("Saving...", "");
      const ok1 = await saveGatewaysKV();
      const ok2 = await saveHubsKV();

      if (ok1 && ok2) {
        renderGateways();
        setEditStatus("✅ Gateway created! " + (published ? "(Visible)" : "(Hidden)"), "success");
        setTimeout(closeEditModal, 1200);
      } else {
        setEditStatus("❌ Save failed.", "error");
      }
    }
  );
}

function editGatewayItem(index) {
  const allGateways = getGateways();
  const gw = allGateways[index];
  if (!gw) return;

  const currentTitle = getGatewayTitle(gw);
  const currentText = getGatewayText(gw);
  const currentIcon = gw.icon || "◆";
  const isPublished = gw.published !== false;

  openEditModal(
    `✏️ Edit Gateway #${index + 1}`,
    `
    <label>Icon:</label>
    <input type="text" id="editGwIcon" value="${escapeHtml(currentIcon)}" maxlength="4">

    <label>Gateway Title (${state.lang.toUpperCase()}):</label>
    <input type="text" id="editGwTitle" value="${escapeHtml(currentTitle)}">

    <label>Gateway Description (${state.lang.toUpperCase()}):</label>
    <textarea id="editGwText" rows="2">${escapeHtml(currentText)}</textarea>

    <label style="margin-top:18px;">Visibility:</label>
    <div class="gw-visibility-options">
      <label class="gw-radio"><input type="radio" name="editGwVis" value="hide" ${!isPublished ? 'checked' : ''}> 🌫 <b>Hide</b> from visitors (Draft)</label>
      <label class="gw-radio"><input type="radio" name="editGwVis" value="show" ${isPublished ? 'checked' : ''}> 👁 <b>Show</b> to everyone</label>
    </div>
    `,
    async () => {
      const newIcon = document.getElementById("editGwIcon").value.trim() || "◆";
      const newTitle = document.getElementById("editGwTitle").value.trim();
      const newText = document.getElementById("editGwText").value.trim();
      const vis = document.querySelector('input[name="editGwVis"]:checked').value;
      const published = vis === "show";

      if (!newTitle) { setEditStatus("❌ Title required", "error"); return; }

      setEditStatus("Saving...", "");

      if (gw.builtin && gw.id === "trade") {
        const ok1 = await saveToKV("gateway_trade_title", newTitle);
        const ok2 = await saveToKV("gateway_trade_text", newText);
        if (!gateways) gateways = JSON.parse(JSON.stringify(DEFAULT_GATEWAYS));
        const realGw = gateways.find(g => g.id === "trade");
        if (realGw) { realGw.published = published; realGw.icon = newIcon; }
        const ok3 = await saveGatewaysKV();
        if (ok1 && ok2 && ok3) {
          gatewayTradeData = { title: newTitle, text: newText };
        } else { setEditStatus("❌ Save failed.", "error"); return; }
      } else if (gw.builtin && gw.id === "research") {
        const ok1 = await saveToKV("gateway_research_title", newTitle);
        const ok2 = await saveToKV("gateway_research_text", newText);
        if (!gateways) gateways = JSON.parse(JSON.stringify(DEFAULT_GATEWAYS));
        const realGw = gateways.find(g => g.id === "research");
        if (realGw) { realGw.published = published; realGw.icon = newIcon; }
        const ok3 = await saveGatewaysKV();
        if (ok1 && ok2 && ok3) {
          gatewayResearchData = { title: newTitle, text: newText };
        } else { setEditStatus("❌ Save failed.", "error"); return; }
      } else {
        if (!gateways) gateways = JSON.parse(JSON.stringify(DEFAULT_GATEWAYS));
        const realGw = gateways.find(g => g.id === gw.id);
        if (realGw) {
          realGw.icon = newIcon;
          realGw.published = published;
          if (!realGw.title) realGw.title = {};
          if (!realGw.text) realGw.text = {};
          realGw.title[state.lang] = newTitle;
          realGw.text[state.lang] = newText;
          const ok = await saveGatewaysKV();
          if (!ok) { setEditStatus("❌ Save failed.", "error"); return; }
        }
      }

      renderGateways();
      setEditStatus("✅ Saved!", "success");
      setTimeout(closeEditModal, 1000);
    }
  );
}

async function deleteGatewayItem(index) {
  const allGateways = getGateways();
  const gw = allGateways[index];
  if (!gw) return;

  if (gw.builtin) {
    alert("❌ Default gateways (Global Trade, Research & Knowledge) cannot be deleted.");
    return;
  }

  const title = getGatewayTitle(gw);
  if (!confirm(`🗑 Delete gateway "${title}"?\n\nAll hubs inside it will also be removed.\n\nThis action cannot be undone.`)) return;

  if (!gateways) gateways = JSON.parse(JSON.stringify(DEFAULT_GATEWAYS));
  gateways.splice(index, 1);

  if (customHubData) {
    Object.keys(customHubData).forEach(lang => {
      if (customHubData[lang] && customHubData[lang][gw.id]) {
        delete customHubData[lang][gw.id];
      }
    });
  }

  const ok1 = await saveGatewaysKV();
  const ok2 = await saveHubsKV();

  if (ok1 && ok2) {
    renderGateways();
  } else {
    alert("❌ Delete failed.");
  }
}

async function moveGateway(index, direction) {
  if (!gateways) gateways = JSON.parse(JSON.stringify(DEFAULT_GATEWAYS));
  const newIndex = index + direction;
  if (newIndex < 0 || newIndex >= gateways.length) return;

  [gateways[index], gateways[newIndex]] = [gateways[newIndex], gateways[index]];

  const ok = await saveGatewaysKV();
  if (ok) {
    renderGateways();
  }
}

/* =========================================================
   OFFICES
========================================================= */

function renderOffices() {
  const titles = [tx("office1Title"), tx("office2Title"), tx("office3Title"), tx("office4Title")];
  const grid = document.getElementById("officeGrid");
  if (!grid) return;

  grid.innerHTML = offices.map((a, i) => `
    <article class="office-card">
      <button class="edit-btn" data-edit-office="${i}" type="button" title="Edit Office">✏️</button>
      <span>${String(i + 1).padStart(2, "0")}</span>
      <h3>${titles[i]}</h3>
      <p>${a}</p>
    </article>
  `).join("");

  for (let i = 0; i < 4; i++) {
    const el = document.getElementById("office" + (i + 1) + "Input");
    if (el) el.value = offices[i] || "";
  }

  document.querySelectorAll("[data-edit-office]").forEach((btn) => {
    btn.onclick = (e) => {
      e.stopPropagation();
      editOffice(+btn.dataset.editOffice);
    };
  });
}

function editOffice(index) {
  const titles = [tx("office1Title"), tx("office2Title"), tx("office3Title"), tx("office4Title")];
  const current = offices[index] || "";

  openEditModal(
    `✏️ Edit Office #${index + 1} — ${titles[index]}`,
    `
    <label>Office Address:</label>
    <textarea id="editOfficeAddr" rows="3">${escapeHtml(current)}</textarea>
    `,
    async () => {
      const newAddr = document.getElementById("editOfficeAddr").value.trim();
      if (!newAddr) { setEditStatus("❌ Address required", "error"); return; }

      const newOffices = [...offices];
      newOffices[index] = newAddr;

      setEditStatus("Saving...", "");
      const ok = await saveToKV("offices", newOffices);
      if (ok) {
        offices = newOffices;
        renderOffices();
        setEditStatus("✅ Office saved!", "success");
        setTimeout(closeEditModal, 1000);
      } else {
        setEditStatus("❌ Save failed.", "error");
      }
    }
  );
}

/* =========================================================
   GATEWAY / HUB NAVIGATION
========================================================= */

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
  const allGateways = getGateways();
  const gw = allGateways.find(g => g.id === type);
  const gwTitle = gw ? getGatewayTitle(gw) : "Gateway";
  const gwText = gw ? getGatewayText(gw) : "";

  const gwLabels = {
    en: "PRIMARY GATEWAY",
    zh: "主要门户",
    ar: "البوابة الرئيسية",
    ps: "لومړنۍ دروازه",
    ru: "ОСНОВНОЙ ПОРТАЛ",
    ur: "بنیادی دروازہ"
  };
  document.getElementById("gatewayEyebrow").textContent = gwLabels[state.lang] || gwLabels.en;
  document.getElementById("gatewayTitleText").textContent = gwTitle;
  document.getElementById("gatewayDescription").textContent = gwText;

  const list = hubs(type);

  const hubCardsHtml = list.length > 0 ? list.map(([title, desc], i) => {
    const adminBtns = state.admin ? `
      <div class="hub-card-actions">
        <button class="hub-action-btn" data-hub-edit="${type}:${i}" title="Edit Hub" type="button">✏️</button>
        ${i > 0 ? `<button class="hub-action-btn" data-hub-up="${type}:${i}" title="Move Up" type="button">⬆</button>` : ""}
        ${i < list.length - 1 ? `<button class="hub-action-btn" data-hub-down="${type}:${i}" title="Move Down" type="button">⬇</button>` : ""}
        <button class="hub-action-btn danger" data-hub-delete="${type}:${i}" title="Delete Hub" type="button">🗑</button>
      </div>
    ` : "";

    return `
      <div class="hub-card-wrapper">
        <button class="hub-card" data-hub="${type}:${i}" type="button">
          <span>${String(i + 1).padStart(2, "0")}</span>
          <h2>${escapeHtml(title)}</h2>
          <p>${escapeHtml(desc)}</p>
          <b>→</b>
        </button>
        ${adminBtns}
      </div>
    `;
  }).join("") : (state.admin
    ? `<p style="grid-column:1/-1;text-align:center;padding:40px;color:var(--muted);">No hubs in this gateway yet. Click below to add one.</p>`
    : `<p style="grid-column:1/-1;text-align:center;padding:40px;color:var(--muted);">No content available yet.</p>`);

  const createBtnHtml = state.admin ? `
    <button class="create-hub-btn" data-create-hub="${type}" type="button">
      <span>➕</span>
      <b>Create New Hub</b>
      <small>Add a new knowledge hub to this gateway</small>
    </button>
  ` : "";

  document.getElementById("hubGridPage").innerHTML = hubCardsHtml + createBtnHtml;

  document.querySelectorAll("[data-hub]").forEach((b) =>
    (b.onclick = () => {
      const [t, index] = b.dataset.hub.split(":");
      openHub(t, +index);
    })
  );

  if (state.admin) {
    document.querySelectorAll("[data-hub-edit]").forEach((b) =>
      (b.onclick = (e) => { e.stopPropagation(); const [t, i] = b.dataset.hubEdit.split(":"); editHub(t, +i); })
    );
    document.querySelectorAll("[data-hub-delete]").forEach((b) =>
      (b.onclick = (e) => { e.stopPropagation(); const [t, i] = b.dataset.hubDelete.split(":"); deleteHub(t, +i); })
    );
    document.querySelectorAll("[data-hub-up]").forEach((b) =>
      (b.onclick = (e) => { e.stopPropagation(); const [t, i] = b.dataset.hubUp.split(":"); moveHub(t, +i, -1); })
    );
    document.querySelectorAll("[data-hub-down]").forEach((b) =>
      (b.onclick = (e) => { e.stopPropagation(); const [t, i] = b.dataset.hubDown.split(":"); moveHub(t, +i, 1); })
    );
    const createEl = document.querySelector("[data-create-hub]");
    if (createEl) createEl.onclick = () => createHub(createEl.dataset.createHub);
  }
}

function openHub(type, index) {
  state.hub = { type, index };
  document.getElementById("gatewayView").classList.remove("open");
  document.getElementById("hubView").classList.add("open");
  renderHub(type, index);
  window.scrollTo(0, 0);
}

function renderHub(type, index) {
  const list = hubs(type);
  const item = list[index] || ["", ""];
  const [title, desc] = item;
  document.getElementById("hubNo").textContent = `${type === "trade" ? tx("tradeTitle") : tx("researchTitle")} · ${String(index + 1).padStart(2, "0")}`;
  document.getElementById("hubTitleText").textContent = title;
  document.getElementById("hubDescription").textContent = desc;
  document.getElementById("hubWhatsapp").href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Inquiry about " + title)}`;
  renderHubMedia(type, index);
}

function closeGateway() {
  document.body.classList.remove("subview");
  state.gateway = null;
  state.hub = null;
  document.getElementById("gatewayView").classList.remove("open");
  document.getElementById("hubView").classList.remove("open");
  document.getElementById("mainPage").hidden = false;
}

function escapeHtml(s) {
  return String(s).replace(/[&<>'"]/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[c])
  );
}

/* =========================================================
   HUB CRUD
========================================================= */

function createHub(type) {
  const gw = getGateways().find(g => g.id === type);
  const typeLabel = gw ? getGatewayTitle(gw) : "Hub";
  openEditModal(
    `🆕 Create New Hub — ${typeLabel}`,
    `
    <label>Hub Title: <span style="color:#ff6b6b">*</span></label>
    <input type="text" id="newHubTitle" placeholder="Enter hub title...">
    <label>Short Description:</label>
    <textarea id="newHubDesc" rows="2" placeholder="Short subtitle..."></textarea>
    `,
    async () => {
      const title = document.getElementById("newHubTitle").value.trim();
      const desc = document.getElementById("newHubDesc").value.trim();
      if (!title) { setEditStatus("❌ Title required", "error"); return; }

      const list = ensureCustomHub(type);
      list.push([title, desc]);

      setEditStatus("Saving...", "");
      const ok = await saveHubsKV();
      if (ok) {
        renderGateway(type);
        setEditStatus("✅ Hub created!", "success");
        setTimeout(closeEditModal, 1000);
      } else {
        setEditStatus("❌ Save failed.", "error");
      }
    }
  );
}

function editHub(type, index) {
  const list = hubs(type);
  const [currentTitle, currentDesc] = list[index] || ["", ""];
  const gw = getGateways().find(g => g.id === type);
  const typeLabel = gw ? getGatewayTitle(gw) : "Hub";

  openEditModal(
    `✏️ Edit Hub — ${typeLabel} #${index + 1}`,
    `
    <label>Hub Title: <span style="color:#ff6b6b">*</span></label>
    <input type="text" id="editHubTitle" value="${escapeHtml(currentTitle)}">
    <label>Short Description:</label>
    <textarea id="editHubDesc" rows="2">${escapeHtml(currentDesc)}</textarea>
    `,
    async () => {
      const newTitle = document.getElementById("editHubTitle").value.trim();
      const newDesc = document.getElementById("editHubDesc").value.trim();
      if (!newTitle) { setEditStatus("❌ Title required", "error"); return; }

      const list2 = ensureCustomHub(type);
      list2[index] = [newTitle, newDesc];

      setEditStatus("Saving...", "");
      const ok = await saveHubsKV();
      if (ok) {
        renderGateway(type);
        setEditStatus("✅ Hub updated!", "success");
        setTimeout(closeEditModal, 1000);
      } else {
        setEditStatus("❌ Save failed.", "error");
      }
    }
  );
}

async function deleteHub(type, index) {
  const list = hubs(type);
  const [title] = list[index] || ["", ""];

  if (!confirm(`🗑 Delete hub "${title}"?\n\nThis action cannot be undone.`)) return;

  const list2 = ensureCustomHub(type);
  list2.splice(index, 1);

  const ok = await saveHubsKV();
  if (ok) {
    renderGateway(type);
  } else {
    alert("❌ Delete failed.");
  }
}

async function moveHub(type, index, direction) {
  const list = ensureCustomHub(type);
  const newIndex = index + direction;
  if (newIndex < 0 || newIndex >= list.length) return;

  [list[index], list[newIndex]] = [list[newIndex], list[index]];

  const ok = await saveHubsKV();
  if (ok) {
    renderGateway(type);
  }
}

/* =========================================================
   HUB MEDIA
========================================================= */

async function loadHubMedia(type, index) {
  const key = `hub_media_${type}_${index}`;
  if (hubMediaCache[key] !== undefined) return hubMediaCache[key];
  const val = await getFromKV(key);
  const arr = Array.isArray(val) ? val : [];
  hubMediaCache[key] = arr;
  return arr;
}

async function saveHubMedia(type, index, arr) {
  const key = `hub_media_${type}_${index}`;
  hubMediaCache[key] = arr;
  return await saveToKV(key, arr);
}

async function renderHubMedia(type, index) {
  const container = document.getElementById("hubMedia");
  if (!container) return;

  const arr = await loadHubMedia(type, index);

  const uploadBtn = state.admin
    ? `<button class="btn btn-gold hubMediaUploadBtn" id="hubMediaUploadBtn" type="button">➕ Upload Media</button>`
    : "";

  if (arr.length === 0) {
    container.innerHTML = uploadBtn + `<p class="hub-media-empty">${tx("mediaEmpty")}</p>`;
  } else {
    const items = arr.map((m, i) => {
      const adminBtns = state.admin ? `
        <div class="hub-media-item-actions">
          <button class="hub-action-btn danger" data-media-delete="${type}:${index}:${i}" title="Delete" type="button">🗑</button>
        </div>
      ` : "";

      let preview = "";
      if (m.type === "image") {
        preview = `<img src="${m.url}" alt="${escapeHtml(m.name)}" loading="lazy">`;
      } else if (m.type === "video") {
        preview = `<video src="${m.url}" controls preload="metadata"></video>`;
      } else {
        preview = `<div class="hub-media-pdf"><span>📄</span><b>${escapeHtml(m.name)}</b></div>`;
      }

      return `
        <div class="hub-media-item">
          <a href="${m.url}" target="_blank" rel="noopener">
            ${preview}
          </a>
          ${adminBtns}
        </div>
      `;
    }).join("");

    container.innerHTML = uploadBtn + `<div class="hub-media-grid">${items}</div>`;
  }

  if (state.admin) {
    const btn = document.getElementById("hubMediaUploadBtn");
    if (btn) btn.onclick = () => uploadHubMedia(type, index);

    container.querySelectorAll("[data-media-delete]").forEach((b) => {
      b.onclick = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        const [t, idx, mi] = b.dataset.mediaDelete.split(":");
        await deleteHubMediaItem(t, +idx, +mi);
      };
    });
  }
}

function uploadHubMedia(type, index) {
  openEditModal(
    "📤 Upload Media to Hub",
    `
    <label>File (image / video / PDF): <span style="color:#ff6b6b">*</span></label>
    <input type="file" id="hubMediaFile" accept="image/*,video/*,application/pdf">
    <label>Title (optional):</label>
    <input type="text" id="hubMediaTitle" placeholder="e.g. Chilghoza Kernels Close-up">
    `,
    async () => {
      const fileInput = document.getElementById("hubMediaFile");
      const titleInput = document.getElementById("hubMediaTitle");
      const file = fileInput.files[0];
      if (!file) { setEditStatus("❌ Select a file first", "error"); return; }

      setEditStatus("Uploading to Cloudinary...", "");
      const folder = `hubs/${type}-${index}`;
      const fd = new FormData();
      fd.append("file", file);
      fd.append("folder", folder);
      if (titleInput.value.trim()) fd.append("title", titleInput.value.trim());

      try {
        const r = await fetch("/api/media/upload", {
          method: "POST",
          headers: { Authorization: "Bearer " + state.token },
          body: fd,
        });
        const d = await r.json();
        if (!d.ok) {
          setEditStatus("❌ Upload failed: " + (d.error || "unknown"), "error");
          return;
        }

        const ext = (file.name.split(".").pop() || "").toLowerCase();
        let mtype = "image";
        if (["mp4","webm","mov","avi"].includes(ext)) mtype = "video";
        else if (["pdf","doc","docx"].includes(ext)) mtype = "raw";

        const arr = await loadHubMedia(type, index);
        arr.push({
          url: d.url,
          public_id: d.public_id || d.key,
          name: titleInput.value.trim() || file.name,
          type: mtype,
          size: d.bytes || file.size,
          uploaded: Date.now()
        });

        setEditStatus("Saving...", "");
        const ok = await saveHubMedia(type, index, arr);
        if (ok) {
          setEditStatus("✅ Uploaded!", "success");
          await renderHubMedia(type, index);
          setTimeout(closeEditModal, 1000);
        } else {
          setEditStatus("❌ Save failed", "error");
        }
      } catch (e) {
        setEditStatus("❌ Error: " + e.message, "error");
      }
    }
  );
}

async function deleteHubMediaItem(type, index, mediaIndex) {
  if (!confirm("🗑 Delete this media?\n\nThis will also remove it from Cloudinary.")) return;

  const arr = await loadHubMedia(type, index);
  const item = arr[mediaIndex];
  if (!item) return;

  try {
    await fetch("/api/media/" + encodeURIComponent(item.public_id) + "?type=" + item.type, {
      method: "DELETE",
      headers: { Authorization: "Bearer " + state.token }
    });
  } catch (e) { /* ignore */ }

  arr.splice(mediaIndex, 1);
  const ok = await saveHubMedia(type, index, arr);
  if (ok) {
    await renderHubMedia(type, index);
  } else {
    alert("❌ Delete failed.");
  }
}

/* =========================================================
   AI ASSISTANT
========================================================= */

async function askAI(message) {
  const box = document.getElementById("aiMessages");
  if (!box) return;
  box.innerHTML += `<p><b>You:</b> ${escapeHtml(message)}</p>`;
  try {
    const headers = { "Content-Type": "application/json" };
    if (state.admin && state.token) headers.Authorization = `Bearer ${state.token}`;
    const r = await fetch("/api/ai", {
      method: "POST",
      headers,
      body: JSON.stringify({ message, mode: state.admin ? "admin" : "visitor", language: state.lang }),
    });
    const data = await r.json();
    if (data.reply) {
      box.innerHTML += `<p><b>Royal AI:</b> <span dir="auto">${escapeHtml(data.reply)}</span></p>`;
    } else {
      box.innerHTML += `<p><b>Royal AI:</b> <span dir="auto" style="color:#ff6b6b">Error: ${escapeHtml(JSON.stringify(data))}</span></p>`;
    }
  } catch (err) {
    box.innerHTML += `<p><b>Royal AI:</b> <span dir="auto" style="color:#ff6b6b">Fetch Error: ${escapeHtml(err.message)}</span></p>`;
  }
  box.scrollTop = box.scrollHeight;
}

/* =========================================================
   THEME CUSTOMIZER
========================================================= */

const THEME_KEY = "royalThemeV2";
let pickers = {};

function initColorPickers() {
  if (typeof iro === "undefined") { console.warn("iro.js not loaded"); return; }

  const saved = JSON.parse(localStorage.getItem(THEME_KEY) || "null") || {};
  const defaults = {
    bg: saved.bg || "#03140A",
    gold: saved.gold || "#D4AF37",
    text: saved.text || "#F4F1E9",
    heading: saved.heading || "#F4F1E9"
  };

  pickers.bg = new iro.ColorPicker("#pickerBg", {
    width: 130, color: defaults.bg, borderWidth: 1, borderColor: "rgba(212,175,55,0.3)",
    layout: [{ component: iro.ui.Wheel }, { component: iro.ui.Slider, options: { sliderType: "value" } }]
  });
  pickers.gold = new iro.ColorPicker("#pickerGold", {
    width: 130, color: defaults.gold, borderWidth: 1, borderColor: "rgba(212,175,55,0.3)",
    layout: [{ component: iro.ui.Wheel }, { component: iro.ui.Slider, options: { sliderType: "value" } }]
  });
  pickers.text = new iro.ColorPicker("#pickerText", {
    width: 130, color: defaults.text, borderWidth: 1, borderColor: "rgba(212,175,55,0.3)",
    layout: [{ component: iro.ui.Wheel }, { component: iro.ui.Slider, options: { sliderType: "value" } }]
  });
  pickers.heading = new iro.ColorPicker("#pickerHeading", {
    width: 130, color: defaults.heading, borderWidth: 1, borderColor: "rgba(212,175,55,0.3)",
    layout: [{ component: iro.ui.Wheel }, { component: iro.ui.Slider, options: { sliderType: "value" } }]
  });

  pickers.bg.on("color:change", (color) => {
    document.getElementById("hexBg").textContent = color.hexString.toUpperCase();
    document.documentElement.style.setProperty("--forest", color.hexString);
    autoSaveTheme();
  });
  pickers.gold.on("color:change", (color) => {
    document.getElementById("hexGold").textContent = color.hexString.toUpperCase();
    document.documentElement.style.setProperty("--gold", color.hexString);
    autoSaveTheme();
  });
  pickers.text.on("color:change", (color) => {
    document.getElementById("hexText").textContent = color.hexString.toUpperCase();
    document.documentElement.style.setProperty("--text", color.hexString);
    autoSaveTheme();
  });
  pickers.heading.on("color:change", (color) => {
    document.getElementById("hexHeading").textContent = color.hexString.toUpperCase();
    document.documentElement.style.setProperty("--cream", color.hexString);
    autoSaveTheme();
  });

  loadTypography(saved);
}

function loadTypography(saved) {
  const baseFont = document.getElementById("baseFont");
  const headingScale = document.getElementById("headingScale");
  const headingFont = document.getElementById("headingFont");
  const bodyFont = document.getElementById("bodyFont");
  if (!baseFont) return;

  const baseSize = saved.baseFont || 16;
  const headScale = saved.headingScale || 1;

  baseFont.value = baseSize;
  headingScale.value = headScale;
  document.getElementById("baseFontVal").textContent = baseSize + "px";
  document.getElementById("headingScaleVal").textContent = headScale + "x";
  document.documentElement.style.setProperty("--font-scale", baseSize / 16);

  if (saved.headingFont) {
    headingFont.value = saved.headingFont;
    document.documentElement.style.setProperty("--heading-font", saved.headingFont);
  }
  if (saved.bodyFont) {
    bodyFont.value = saved.bodyFont;
    document.documentElement.style.setProperty("--body-font", saved.bodyFont);
  }
}

function readThemeFromUI() {
  return {
    bg: pickers.bg ? pickers.bg.color.hexString : "#03140A",
    gold: pickers.gold ? pickers.gold.color.hexString : "#D4AF37",
    text: pickers.text ? pickers.text.color.hexString : "#F4F1E9",
    heading: pickers.heading ? pickers.heading.color.hexString : "#F4F1E9",
    baseFont: parseFloat(document.getElementById("baseFont")?.value) || 16,
    headingScale: parseFloat(document.getElementById("headingScale")?.value) || 1,
    headingFont: document.getElementById("headingFont")?.value || "'Playfair Display', Georgia, serif",
    bodyFont: document.getElementById("bodyFont")?.value || "'Inter', Arial, sans-serif"
  };
}

function autoSaveTheme() {
  try { localStorage.setItem(THEME_KEY, JSON.stringify(readThemeFromUI())); } catch (e) {}
}

function applyFullTheme(theme) {
  if (!theme) return;
  const root = document.documentElement;
  if (theme.bg) root.style.setProperty("--forest", theme.bg);
  if (theme.gold) root.style.setProperty("--gold", theme.gold);
  if (theme.text) root.style.setProperty("--text", theme.text);
  if (theme.heading) root.style.setProperty("--cream", theme.heading);
  if (theme.baseFont) root.style.setProperty("--font-scale", theme.baseFont / 16);
  if (theme.headingFont) root.style.setProperty("--heading-font", theme.headingFont);
  if (theme.bodyFont) root.style.setProperty("--body-font", theme.bodyFont);

  if (document.getElementById("hexBg") && theme.bg) document.getElementById("hexBg").textContent = theme.bg.toUpperCase();
  if (document.getElementById("hexGold") && theme.gold) document.getElementById("hexGold").textContent = theme.gold.toUpperCase();
  if (document.getElementById("hexText") && theme.text) document.getElementById("hexText").textContent = theme.text.toUpperCase();
  if (document.getElementById("hexHeading") && theme.heading) document.getElementById("hexHeading").textContent = theme.heading.toUpperCase();
}

function initThemeControls() {
  const baseFont = document.getElementById("baseFont");
  const headingScale = document.getElementById("headingScale");
  const headingFont = document.getElementById("headingFont");
  const bodyFont = document.getElementById("bodyFont");

  if (baseFont) baseFont.addEventListener("input", () => {
    const val = parseFloat(baseFont.value);
    document.getElementById("baseFontVal").textContent = val + "px";
    document.documentElement.style.setProperty("--font-scale", val / 16);
    autoSaveTheme();
  });
  if (headingScale) headingScale.addEventListener("input", () => {
    const val = parseFloat(headingScale.value);
    document.getElementById("headingScaleVal").textContent = val + "x";
    autoSaveTheme();
  });
  if (headingFont) headingFont.addEventListener("change", () => {
    document.documentElement.style.setProperty("--heading-font", headingFont.value);
    autoSaveTheme();
  });
  if (bodyFont) bodyFont.addEventListener("change", () => {
    document.documentElement.style.setProperty("--body-font", bodyFont.value);
    autoSaveTheme();
  });

  const saveBtn = document.getElementById("themeSave");
  if (saveBtn) saveBtn.addEventListener("click", () => {
    autoSaveTheme();
    const status = document.getElementById("adminStatus");
    if (status) status.textContent = "✅ Theme saved successfully!";
  });

  const resetBtn = document.getElementById("themeReset");
  if (resetBtn) resetBtn.addEventListener("click", () => {
    localStorage.removeItem(THEME_KEY);
    const defaults = { bg: "#03140A", gold: "#D4AF37", text: "#F4F1E9", heading: "#F4F1E9" };
    applyFullTheme(defaults);
    if (pickers.bg) pickers.bg.color.hexString = defaults.bg;
    if (pickers.gold) pickers.gold.color.hexString = defaults.gold;
    if (pickers.text) pickers.text.color.hexString = defaults.text;
    if (pickers.heading) pickers.heading.color.hexString = defaults.heading;
    if (baseFont) { baseFont.value = 16; document.getElementById("baseFontVal").textContent = "16px"; }
    if (headingScale) { headingScale.value = 1; document.getElementById("headingScaleVal").textContent = "1.0x"; }
    document.documentElement.style.setProperty("--font-scale", 1);
    const status = document.getElementById("adminStatus");
    if (status) status.textContent = "↺ Theme reset to default.";
  });
}

/* =========================================================
   MEDIA MANAGEMENT
========================================================= */

function formatSize(bytes) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

function getMediaIcon(name) {
  const ext = (name.split(".").pop() || "").toLowerCase();
  if (["jpg","jpeg","png","gif","webp","svg"].includes(ext)) return "🖼️";
  if (["mp4","webm","mov","avi"].includes(ext)) return "🎬";
  if (ext === "pdf") return "📄";
  return "📎";
}

function renderMediaList(files) {
  const container = document.getElementById("mediaListContainer");
  if (!container) return;

  if (!files || files.length === 0) {
    container.innerHTML = `<div class="media-empty">No files uploaded yet.</div>`;
    return;
  }

  container.innerHTML = files.map(file => {
    const icon = getMediaIcon(file.name);
    const isImage = file.resource_type === "image";
    const thumbHtml = isImage
      ? `<img class="media-thumb" src="${file.url}" alt="${file.name}" loading="lazy">`
      : `<div class="media-thumb">${icon}</div>`;

    return `
      <div class="media-item">
        ${thumbHtml}
        <div class="media-info">
          <span class="media-name" title="${file.public_id}">${file.name}</span>
          <span class="media-meta">${formatSize(file.size)} • ${file.resource_type}</span>
        </div>
        <div class="media-actions">
          <button class="media-btn" onclick="window.open('${file.url}', '_blank')">👁</button>
          <button class="media-btn" onclick="copyMediaUrl('${file.url}')">📋</button>
          <button class="media-btn danger" onclick="deleteMedia('${file.public_id.replace(/'/g, "\\'")}', '${file.resource_type}')">🗑</button>
        </div>
      </div>
    `;
  }).join("");
}

async function loadMediaList() {
  const status = document.getElementById("mediaStatus");
  const container = document.getElementById("mediaListContainer");
  if (status) status.textContent = "Loading files...";
  if (container) container.innerHTML = `<div class="media-empty">Loading...</div>`;

  try {
    const folder = document.getElementById("mediaFolder")?.value || "";
    const r = await fetch("/api/media/list?folder=" + encodeURIComponent(folder));
    const data = await r.json();
    if (data.ok) {
      renderMediaList(data.files);
      if (status) status.textContent = `✅ Found ${data.files.length} file(s).`;
    } else {
      if (status) status.textContent = "Error: " + (data.error || "Failed");
      if (container) container.innerHTML = `<div class="media-empty">Error.</div>`;
    }
  } catch (err) {
    if (status) status.textContent = "Error: " + err.message;
  }
}

async function deleteMedia(publicId, resourceType) {
  if (!confirm(`Delete "${publicId}"?`)) return;
  const status = document.getElementById("mediaStatus");
  if (status) status.textContent = "Deleting...";
  try {
    const r = await fetch("/api/media/" + encodeURIComponent(publicId) + "?type=" + resourceType, {
      method: "DELETE",
      headers: { Authorization: "Bearer " + state.token }
    });
    const data = await r.json();
    if (data.ok) {
      if (status) status.textContent = "✅ Deleted: " + publicId;
      loadMediaList();
    } else {
      if (status) status.textContent = "Delete failed.";
    }
  } catch (err) {
    if (status) status.textContent = "Delete error: " + err.message;
  }
}

function copyMediaUrl(url) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(url).then(() => {
      const status = document.getElementById("mediaStatus");
      if (status) status.textContent = "✅ URL copied: " + url;
    });
  }
}

window.deleteMedia = deleteMedia;
window.copyMediaUrl = copyMediaUrl;

/* =========================================================
   EDIT MODAL SYSTEM
========================================================= */

let currentEditSaveHandler = null;

function openEditModal(title, bodyHtml, onSave) {
  const modal = document.getElementById("editModal");
  if (!modal) return;
  document.getElementById("editModalTitle").textContent = title;
  document.getElementById("editModalBody").innerHTML = bodyHtml;
  document.getElementById("editModalStatus").textContent = "";
  document.getElementById("editModalStatus").className = "edit-status";
  currentEditSaveHandler = onSave;
  modal.showModal();
}

function closeEditModal() {
  const modal = document.getElementById("editModal");
  if (modal) modal.close();
  currentEditSaveHandler = null;
}

function setEditStatus(msg, type = "") {
  const el = document.getElementById("editModalStatus");
  if (el) {
    el.textContent = msg;
    el.className = "edit-status " + type;
  }
}

async function uploadToCloudinary(file, folder = "edits") {
  if (!file) return null;
  const fd = new FormData();
  fd.append("file", file);
  fd.append("folder", folder);
  const r = await fetch("/api/media/upload", {
    method: "POST",
    headers: { Authorization: "Bearer " + state.token },
    body: fd,
  });
  const data = await r.json();
  return data.ok ? data.url : null;
}

/* =========================================================
   EDIT: HERO IMAGE
========================================================= */

function editHeroImage() {
  openEditModal("🖼️ Edit Hero Image", `
    <label>Current Hero Image:</label>
    <img src="${heroImageUrl}" class="edit-modal-preview" alt="Hero">
    <label>Upload New Hero Image:</label>
    <input type="file" id="editHeroFile" accept="image/*">
    <label>OR Paste Image URL:</label>
    <input type="text" id="editHeroUrl" placeholder="https://..." value="${heroImageUrl}">
  `, async () => {
    const fileInput = document.getElementById("editHeroFile");
    const urlInput = document.getElementById("editHeroUrl");
    let newUrl = urlInput.value.trim();

    if (fileInput.files[0]) {
      setEditStatus("Uploading...", "");
      const uploadedUrl = await uploadToCloudinary(fileInput.files[0], "hero");
      if (uploadedUrl) newUrl = uploadedUrl;
      else { setEditStatus("❌ Upload failed", "error"); return; }
    }

    if (!newUrl) { setEditStatus("❌ No image URL provided", "error"); return; }

    setEditStatus("Saving...", "");
    const ok = await saveToKV("hero_image", newUrl);
    if (ok) {
      heroImageUrl = newUrl;
      applyHeroImage();
      setEditStatus("✅ Hero image saved!", "success");
      setTimeout(closeEditModal, 1000);
    } else {
      setEditStatus("❌ Save failed", "error");
    }
  });
}

function applyHeroImage() {
  const heroBg = document.getElementById("heroBg");
  if (heroBg) {
    heroBg.style.background = `url("${heroImageUrl}") center / cover no-repeat`;
    heroBg.style.backgroundColor = "var(--forest)";
    heroBg.style.backgroundBlendMode = "luminosity";
    heroBg.style.opacity = "0.85";
    heroBg.style.filter = "brightness(0.55) saturate(1.1) contrast(1.05)";
    heroBg.style.transform = "scale(1.05)";
  }
}

/* =========================================================
   EDIT: PROFILE PICTURE
========================================================= */

function editProfileImage() {
  openEditModal("👤 Edit Profile Picture", `
    <label>Current Profile Picture:</label>
    <img src="${profileImageUrl}" class="edit-modal-preview" alt="Profile" style="border-radius:50%;width:160px;height:160px;max-height:160px;margin:10px auto;display:block;">
    <label>Upload New Profile Picture:</label>
    <input type="file" id="editProfileFile" accept="image/*">
    <label>OR Paste Image URL:</label>
    <input type="text" id="editProfileUrl" placeholder="https://..." value="${profileImageUrl}">
  `, async () => {
    const fileInput = document.getElementById("editProfileFile");
    const urlInput = document.getElementById("editProfileUrl");
    let newUrl = urlInput.value.trim();

    if (fileInput.files[0]) {
      setEditStatus("Uploading...", "");
      const uploadedUrl = await uploadToCloudinary(fileInput.files[0], "profile");
      if (uploadedUrl) newUrl = uploadedUrl;
      else { setEditStatus("❌ Upload failed", "error"); return; }
    }

    if (!newUrl) { setEditStatus("❌ No URL", "error"); return; }

    setEditStatus("Saving...", "");
    const ok = await saveToKV("profile_image", newUrl);
    if (ok) {
      profileImageUrl = newUrl;
      applyProfileImage();
      setEditStatus("✅ Profile picture saved!", "success");
      setTimeout(closeEditModal, 1000);
    } else {
      setEditStatus("❌ Save failed", "error");
    }
  });
}

function applyProfileImage() {
  const img = document.getElementById("profileImage");
  if (img) img.src = profileImageUrl;
}

/* =========================================================
   EDIT: GALLERY ITEM
========================================================= */

function editGalleryItem(index) {
  const [currentSrc, currentCap] = galleryItems[index] || ["", ""];

  openEditModal(
    `🖼️ Edit Gallery Image #${index + 1}`,
    `
    <label>Current Image:</label>
    <img src="${currentSrc}" class="edit-modal-preview" alt="Gallery">
    <label>Caption:</label>
    <input type="text" id="editGalleryCap" value="${escapeHtml(currentCap)}">
    <label>Upload New Image (optional):</label>
    <input type="file" id="editGalleryFile" accept="image/*">
    <label>OR Paste Image URL:</label>
    <input type="text" id="editGalleryUrl" placeholder="https://..." value="${currentSrc}">
  `,
    async () => {
      const capInput = document.getElementById("editGalleryCap");
      const fileInput = document.getElementById("editGalleryFile");
      const urlInput = document.getElementById("editGalleryUrl");

      const newCap = capInput.value.trim();
      let newSrc = urlInput.value.trim();

      if (!newCap) { setEditStatus("❌ Caption required", "error"); return; }

      if (fileInput.files[0]) {
        setEditStatus("Uploading...", "");
        const uploadedUrl = await uploadToCloudinary(fileInput.files[0], "gallery");
        if (uploadedUrl) newSrc = uploadedUrl;
        else { setEditStatus("❌ Upload failed", "error"); return; }
      }

      if (!newSrc) { setEditStatus("❌ No image", "error"); return; }

      setEditStatus("Saving...", "");
      galleryItems[index] = [newSrc, newCap];
      const ok = await saveToKV("gallery_data", galleryItems);

      if (ok) {
        renderGallery();
        setEditStatus("✅ Gallery image saved!", "success");
        setTimeout(closeEditModal, 1000);
      } else {
        setEditStatus("❌ Save failed", "error");
      }
    }
  );
}

/* =========================================================
   LOAD ALL KV CONTENT
========================================================= */

async function loadAllKVContent() {
  const heroVal = await getFromKV("hero_image");
  if (heroVal) { heroImageUrl = heroVal; applyHeroImage(); }

  const profileVal = await getFromKV("profile_image");
  if (profileVal) { profileImageUrl = profileVal; applyProfileImage(); }

  const gt = await getFromKV("gateway_trade_title");
  const gx = await getFromKV("gateway_trade_text");
  if (gt) gatewayTradeData.title = gt;
  if (gx) gatewayTradeData.text = gx;

  const rt = await getFromKV("gateway_research_title");
  const rx = await getFromKV("gateway_research_text");
  if (rt) gatewayResearchData.title = rt;
  if (rx) gatewayResearchData.text = rx;

  applyGatewayContent();

  const gal = await getFromKV("gallery_data");
  if (gal && Array.isArray(gal) && gal.length === 8) {
    galleryItems = gal;
    renderGallery();
  }

  const off = await getFromKV("offices");
  if (off && Array.isArray(off) && off.length === 4) {
    offices = off;
    renderOffices();
  } else if (state.admin && state.token) {
    await saveToKV("offices", DEFAULT_OFFICES);
  }

  const customHubs = await getFromKV("hubs_data");
  if (customHubs && typeof customHubs === "object" && !Array.isArray(customHubs)) {
    customHubData = customHubs;
  }

  const gwData = await getFromKV("gateways_data");
  if (gwData && Array.isArray(gwData) && gwData.length >= 2) {
    gateways = gwData;
  }

  renderGateways();
}

/* =========================================================
   ADMIN MODE
========================================================= */

function activateAdminUI() {
  document.getElementById("adminLoginBox").hidden = true;
  document.getElementById("adminTools").hidden = false;
  document.getElementById("adminStatus").textContent =
    "Admin Mode active. Click ✏️ buttons to edit. Theme, media, offices, hubs and AI are ready.";
  document.body.classList.add("admin-mode");

  setTimeout(() => {
    initColorPickers();
    initThemeControls();
    renderOffices();
    renderGallery();
    renderGateways();
  }, 100);
}

function deactivateAdminUI() {
  document.body.classList.remove("admin-mode");
  document.getElementById("adminLoginBox").hidden = false;
  document.getElementById("adminTools").hidden = true;
  document.getElementById("adminStatus").textContent =
    "Secure Admin Mode enables management tools and changes Royal AI into an Admin Assistant.";
  renderGateways();
}

/* =========================================================
   INITIALIZATION
========================================================= */

function init() {
  renderGallery();
  renderOffices();
  renderGateways();

  const editHeroBtn = document.getElementById("editHeroBtn");
  if (editHeroBtn) editHeroBtn.onclick = editHeroImage;

  const editProfileBtn = document.getElementById("editProfileBtn");
  if (editProfileBtn) editProfileBtn.onclick = editProfileImage;

  const editModalClose = document.getElementById("editModalClose");
  if (editModalClose) editModalClose.onclick = closeEditModal;

  const editModalCancel = document.getElementById("editModalCancel");
  if (editModalCancel) editModalCancel.onclick = closeEditModal;

  const editModalSave = document.getElementById("editModalSave");
  if (editModalSave) {
    editModalSave.onclick = async () => {
      if (currentEditSaveHandler) await currentEditSaveHandler();
    };
  }

  const mainWhatsapp = document.getElementById("mainWhatsapp");
  if (mainWhatsapp) {
    mainWhatsapp.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Chilghoza Pine Nuts Trade Inquiry")}`;
  }

  document.querySelectorAll("[data-open-gateway]").forEach((b) =>
    (b.onclick = (e) => {
      e.preventDefault();
      document.getElementById("mobileDrawer").classList.remove("open");
      openGateway(b.dataset.openGateway);
    })
  );

  document.getElementById("gatewayBack").onclick = closeGateway;
  document.getElementById("hubBack").onclick = () => {
    state.hub = null;
    document.getElementById("hubView").classList.remove("open");
    document.getElementById("gatewayView").classList.add("open");
    renderGateway(state.gateway);
  };

  ["languageSelect", "gatewayLanguage", "hubLanguage"].forEach((id) => {
    const s = document.getElementById(id);
    if (!s) return;
    s.innerHTML = document.getElementById("languageSelect").innerHTML;
    s.onchange = (e) => setLanguage(e.target.value);
  });

  document.getElementById("menuOpen").onclick = () =>
    document.getElementById("mobileDrawer").classList.add("open");
  document.getElementById("menuClose").onclick = () =>
    document.getElementById("mobileDrawer").classList.remove("open");

  const adminOpen = document.getElementById("adminOpen");
  if (adminOpen) adminOpen.onclick = () => document.getElementById("adminDialog").showModal();

  const adminOpenMobile = document.getElementById("adminOpenMobile");
  if (adminOpenMobile) {
    adminOpenMobile.onclick = () => {
      document.getElementById("mobileDrawer").classList.remove("open");
      document.getElementById("adminDialog").showModal();
    };
  }

  document.getElementById("adminClose").onclick = () =>
    document.getElementById("adminDialog").close();

  document.getElementById("adminLogin").onclick = () => {
    const token = document.getElementById("adminToken").value.trim();
    if (!token) return;
    state.admin = true;
    state.token = token;
    sessionStorage.setItem("royalAdmin", "1");
    sessionStorage.setItem("royalAdminToken", token);
    activateAdminUI();
    applyLanguage();
  };

  const logoutBtn = document.getElementById("adminLogout");
  if (logoutBtn) {
    logoutBtn.onclick = () => {
      if (!confirm("Logout from Admin Mode?")) return;
      state.admin = false;
      state.token = "";
      sessionStorage.removeItem("royalAdmin");
      sessionStorage.removeItem("royalAdminToken");
      deactivateAdminUI();
      applyLanguage();
    };
  }

  const mediaUpload = document.getElementById("mediaUpload");
  if (mediaUpload) {
    mediaUpload.onclick = async () => {
      const fileInput = document.getElementById("mediaFile");
      const file = fileInput.files[0];
      const status = document.getElementById("mediaStatus");
      if (!file) { status.textContent = "Select a file first."; return; }
      status.textContent = "Uploading…";
      try {
        const fd = new FormData();
        fd.append("file", file);
        fd.append("folder", document.getElementById("mediaFolder").value);
        const descEl = document.getElementById("mediaDescription");
        const titleEl = document.getElementById("mediaTitle");
        if (descEl && descEl.value) fd.append("description", descEl.value);
        if (titleEl && titleEl.value) fd.append("title", titleEl.value);

        const r = await fetch("/api/media/upload", {
          method: "POST",
          headers: { Authorization: "Bearer " + state.token },
          body: fd,
        });
        const d = await r.json();
        status.textContent = d.ok ? "✅ Uploaded: " + d.key : (d.error || "Upload failed");
        if (d.ok) {
          fileInput.value = "";
          if (descEl) descEl.value = "";
          if (titleEl) titleEl.value = "";
          loadMediaList();
        }
      } catch (e) {
        status.textContent = "Upload failed: " + e.message;
      }
    };
  }

  const loadMediaBtn = document.getElementById("loadMediaBtn");
  if (loadMediaBtn) loadMediaBtn.onclick = loadMediaList;

  const saveAddressesBtn = document.getElementById("saveAddresses");
  if (saveAddressesBtn) {
    saveAddressesBtn.addEventListener("click", async () => {
      const newOffices = [];
      for (let i = 1; i <= 4; i++) {
        const el = document.getElementById("office" + i + "Input");
        newOffices.push(el ? el.value.trim() : "");
      }
      if (newOffices.some(o => !o)) {
        alert("تمام 4 دفاتر کے ایڈریس بھریں۔");
        return;
      }
      const status = document.getElementById("adminStatus");
      if (status) status.textContent = "Saving offices...";
      const ok = await saveToKV("offices", newOffices);
      if (ok) {
        offices = newOffices;
        renderOffices();
        if (status) status.textContent = "✅ Offices saved!";
      } else {
        if (status) status.textContent = "❌ Save failed. Login again.";
      }
    });
  }

  const resetAddressesBtn = document.getElementById("resetAddresses");
  if (resetAddressesBtn) {
    resetAddressesBtn.addEventListener("click", async () => {
      if (!confirm("Reset all offices?")) return;
      const ok = await saveToKV("offices", DEFAULT_OFFICES);
      if (ok) {
        offices = [...DEFAULT_OFFICES];
        renderOffices();
        const status = document.getElementById("adminStatus");
        if (status) status.textContent = "↻ Offices reset.";
      }
    });
  }

  const createFolderBtn = document.getElementById("createFolderBtn");
  if (createFolderBtn) {
    createFolderBtn.onclick = async () => {
      const name = document.getElementById("newFolderName").value.trim();
      const status = document.getElementById("folderStatus");
      if (!name) { status.textContent = "❌ Enter folder name"; return; }
      status.textContent = "Creating...";
      try {
        const r = await fetch("/api/media/folder", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + state.token,
          },
          body: JSON.stringify({ folder: name }),
        });
        const d = await r.json();
        status.textContent = d.ok ? "✅ Folder created: " + d.folder : "❌ " + (d.error || "Failed");
      } catch (e) {
        status.textContent = "❌ Error: " + e.message;
      }
    };
  }

  const aiForm = document.getElementById("aiForm");
  if (aiForm) {
    aiForm.onsubmit = (e) => {
      e.preventDefault();
      const q = document.getElementById("aiInput").value.trim();
      if (q) { askAI(q); document.getElementById("aiInput").value = ""; }
    };
  }

  const savedTheme = JSON.parse(localStorage.getItem(THEME_KEY) || "null");
  if (savedTheme) applyFullTheme(savedTheme);

  if (state.admin) activateAdminUI();

  loadAllKVContent();

  applyLanguage();
}

document.addEventListener("DOMContentLoaded", init);
