const WHATSAPP_NUMBER = "923336665688";
const state = {
  lang: sessionStorage.getItem("royalLanguage") || "en",
  gateway: null,
  hub: null,
  admin: sessionStorage.getItem("royalAdmin") === "1",
  token: sessionStorage.getItem("royalAdminToken") || "",
};
const languages = ["en", "zh", "ar", "ps", "ru"];

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
};

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
};

const offices = [
  "Chilas, Diamer District, Gilgit-Baltistan, Pakistan",
  "Gilgit, Gilgit-Baltistan, Pakistan",
  "Islamabad, Pakistan",
  "China / International Export Hub",
];

function tx(k) { return (T[state.lang] && T[state.lang][k]) || T.en[k] || k; }
function hubs(type) { return (hubData[state.lang] || hubData.en)[type] || hubData.en[type]; }

function applyLanguage() {
  document.documentElement.lang = state.lang;
  document.documentElement.dir = state.lang === "ar" ? "rtl" : "ltr";
  document.querySelectorAll("[data-i18n]").forEach((e) => (e.textContent = tx(e.dataset.i18n)));
  document.querySelectorAll("[data-i18n-placeholder]").forEach((e) => (e.placeholder = tx(e.dataset.i18nPlaceholder)));
  document.querySelectorAll("#languageSelect,#gatewayLanguage,#hubLanguage").forEach((s) => (s.value = state.lang));
  document.getElementById("aiModeLabel").textContent = state.admin ? tx("adminAI") : tx("visitorAI");
  renderOffices();
  renderGallery();
  if (state.gateway) renderGateway(state.gateway);
  if (state.hub) renderHub(state.hub.type, state.hub.index);
}

function setLanguage(lang) {
  if (!languages.includes(lang)) return;
  state.lang = lang;
  sessionStorage.setItem("royalLanguage", lang);
  applyLanguage();
}

function renderGallery() {
  document.getElementById("galleryGrid").innerHTML = gallery
    .map(([src, cap], i) =>
      `<figure class="gallery-item"><img src="${src}" alt="${cap}" loading="lazy" onerror="this.classList.add('failed')"><figcaption><span>${String(i + 1).padStart(2, "0")}</span>${cap}</figcaption></figure>`
    ).join("");
}

function renderOffices() {
  const titles = [tx("office1Title"), tx("office2Title"), tx("office3Title"), tx("office4Title")];
  document.getElementById("officeGrid").innerHTML = offices
    .map((a, i) =>
      `<article class="office-card"><span>${String(i + 1).padStart(2, "0")}</span><h3>${titles[i]}</h3><p>${a}</p></article>`
    ).join("");
}

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
  const gwLabels = {
    en: ["PRIMARY GATEWAY 01", "PRIMARY GATEWAY 02"],
    zh: ["主要门户 01", "主要门户 02"],
    ar: ["البوابة الرئيسية 01", "البوابة الرئيسية 02"],
    ps: ["لومړنۍ دروازه 01", "لومړنۍ دروازه 02"],
    ru: ["ОСНОВНОЙ ПОРТАЛ 01", "ОСНОВНОЙ ПОРТАЛ 02"]
  };
  const labels = gwLabels[state.lang] || gwLabels.en;
  document.getElementById("gatewayEyebrow").textContent = isTrade ? labels[0] : labels[1];
  document.getElementById("gatewayTitleText").textContent = isTrade ? tx("tradeTitle") : tx("researchTitle");
  document.getElementById("gatewayDescription").textContent = isTrade ? tx("tradeText") : tx("researchText");
  document.getElementById("hubGridPage").innerHTML = hubs(type)
    .map(([title, desc], i) =>
      `<button class="hub-card" data-hub="${type}:${i}"><span>${String(i + 1).padStart(2, "0")}</span><h2>${title}</h2><p>${desc}</p><b>→</b></button>`
    ).join("");
  document.querySelectorAll("[data-hub]").forEach((b) =>
    (b.onclick = () => {
      const [type, index] = b.dataset.hub.split(":");
      openHub(type, +index);
    })
  );
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
  document.getElementById("hubNo").textContent = `${type === "trade" ? tx("tradeTitle") : tx("researchTitle")} · ${String(index + 1).padStart(2, "0")}`;
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

async function askAI(message) {
  const box = document.getElementById("aiMessages");
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
    box.innerHTML += `<p><b>Royal AI:</b> ${escapeHtml(data.reply || "No reply.")}</p>`;
  } catch {
    box.innerHTML += `<p><b>Royal AI:</b> ${state.admin ? "Admin AI will connect after the Cloudflare Worker is deployed." : "Visitor AI will connect after the Cloudflare Worker is deployed."}</p>`;
  }
  box.scrollTop = box.scrollHeight;
}

function escapeHtml(s) {
  return String(s).replace(/[&<>'"]/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[c])
  );
}

/* =========================================================
   THEME CUSTOMIZER — iro.js Integration
========================================================= */

const THEME_KEY = "royalThemeV2";
let pickers = {};

function initColorPickers() {
  if (typeof iro === "undefined") {
    console.warn("iro.js not loaded");
    return;
  }
  
  const saved = JSON.parse(localStorage.getItem(THEME_KEY) || "null") || {};
  const defaults = {
    bg: saved.bg || "#03140A",
    gold: saved.gold || "#D4AF37",
    text: saved.text || "#F4F1E9",
    heading: saved.heading || "#F4F1E9"
  };

  pickers.bg = new iro.ColorPicker("#pickerBg", {
    width: 130,
    color: defaults.bg,
    borderWidth: 1,
    borderColor: "rgba(212,175,55,0.3)",
    layout: [
      { component: iro.ui.Wheel },
      { component: iro.ui.Slider, options: { sliderType: "value" } }
    ]
  });

  pickers.gold = new iro.ColorPicker("#pickerGold", {
    width: 130,
    color: defaults.gold,
    borderWidth: 1,
    borderColor: "rgba(212,175,55,0.3)",
    layout: [
      { component: iro.ui.Wheel },
      { component: iro.ui.Slider, options: { sliderType: "value" } }
    ]
  });

  pickers.text = new iro.ColorPicker("#pickerText", {
    width: 130,
    color: defaults.text,
    borderWidth: 1,
    borderColor: "rgba(212,175,55,0.3)",
    layout: [
      { component: iro.ui.Wheel },
      { component: iro.ui.Slider, options: { sliderType: "value" } }
    ]
  });

  pickers.heading = new iro.ColorPicker("#pickerHeading", {
    width: 130,
    color: defaults.heading,
    borderWidth: 1,
    borderColor: "rgba(212,175,55,0.3)",
    layout: [
      { component: iro.ui.Wheel },
      { component: iro.ui.Slider, options: { sliderType: "value" } }
    ]
  });

  // Listen for color changes
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

  // Load saved typography
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
  try {
    const theme = readThemeFromUI();
    localStorage.setItem(THEME_KEY, JSON.stringify(theme));
  } catch (e) {}
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
  
  // Update hex labels if pickers exist
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

  if (baseFont) {
    baseFont.addEventListener("input", () => {
      const val = parseFloat(baseFont.value);
      document.getElementById("baseFontVal").textContent = val + "px";
      document.documentElement.style.setProperty("--font-scale", val / 16);
      autoSaveTheme();
    });
  }

  if (headingScale) {
    headingScale.addEventListener("input", () => {
      const val = parseFloat(headingScale.value);
      document.getElementById("headingScaleVal").textContent = val + "x";
      autoSaveTheme();
    });
  }

  if (headingFont) {
    headingFont.addEventListener("change", () => {
      document.documentElement.style.setProperty("--heading-font", headingFont.value);
      autoSaveTheme();
    });
  }

  if (bodyFont) {
    bodyFont.addEventListener("change", () => {
      document.documentElement.style.setProperty("--body-font", bodyFont.value);
      autoSaveTheme();
    });
  }

  // Save Theme button
  const saveBtn = document.getElementById("themeSave");
  if (saveBtn) {
    saveBtn.addEventListener("click", () => {
      autoSaveTheme();
      const status = document.getElementById("adminStatus");
      if (status) status.textContent = "✅ Theme saved successfully!";
    });
  }

  // Reset Theme button
  const resetBtn = document.getElementById("themeReset");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
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
}

/* =========================================================
   INITIALIZATION
========================================================= */

function init() {
  renderGallery();
  renderOffices();
  document.getElementById("mainWhatsapp").href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Chilghoza Pine Nuts Trade Inquiry")}`;

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
  document.getElementById("adminOpen").onclick = () =>
    document.getElementById("adminDialog").showModal();
  document.getElementById("adminClose").onclick = () =>
    document.getElementById("adminDialog").close();

  function activateAdminUI() {
    document.getElementById("adminLoginBox").hidden = true;
    document.getElementById("adminTools").hidden = false;
    document.getElementById("adminStatus").textContent =
      "Admin Mode active. Theme, media and Royal AI Admin Assistant controls are ready.";
    setTimeout(() => {
      initColorPickers();
      initThemeControls();
    }, 100);
  }

  document.getElementById("mediaUpload").onclick = async () => {
    const file = document.getElementById("mediaFile").files[0];
    const status = document.getElementById("mediaStatus");
    if (!file) { status.textContent = "Select an image, video or PDF first."; return; }
    status.textContent = "Uploading…";
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("folder", document.getElementById("mediaFolder").value);
      const r = await fetch("/api/media/upload", {
        method: "POST",
        headers: { Authorization: "Bearer " + state.token },
        body: fd,
      });
      const d = await r.json();
      status.textContent = d.ok ? "Uploaded: " + d.key : d.error || "Upload failed";
    } catch (e) {
      status.textContent = "Upload failed. Check Cloudflare R2 MEDIA binding.";
    }
  };
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

  // Load saved theme on page load
  const savedTheme = JSON.parse(localStorage.getItem(THEME_KEY) || "null");
  if (savedTheme) applyFullTheme(savedTheme);

  if (state.admin) activateAdminUI();
  document.getElementById("aiForm").onsubmit = (e) => {
    e.preventDefault();
    const q = document.getElementById("aiInput").value.trim();
    if (q) { askAI(q); document.getElementById("aiInput").value = ""; }
  };
  applyLanguage();
}

document.addEventListener("DOMContentLoaded", init);
