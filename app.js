document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* =========================================================
     ROYAL CHILGHOZA PINE NUTS
     FINAL APP.JS
     9-LANGUAGE + AI + ADMIN + HISTORY + MEDIA
     ========================================================= */

  const $ = id => document.getElementById(id);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  /* =========================================================
     1. LANGUAGE SYSTEM — 9 LANGUAGES
     ========================================================= */

  const languages = [
    { code: 'en', name: 'English', dir: 'ltr' },
    { code: 'zh', name: '中文', dir: 'ltr' },
    { code: 'ur', name: 'اردو', dir: 'rtl' },
    { code: 'ps', name: 'پښتو', dir: 'rtl' },
    { code: 'fa', name: 'فارسی / دری', dir: 'rtl' },
    { code: 'ru', name: 'Русский', dir: 'ltr' },
    { code: 'id', name: 'Bahasa Indonesia', dir: 'ltr' },
    { code: 'ms', name: 'Bahasa Melayu', dir: 'ltr' },
    { code: 'ar', name: 'العربية', dir: 'rtl' }
  ];

  const translations = {
    en: {
      skip: 'Skip to main content',
      home: 'Home',
      trade: 'Trade & Business',
      research: 'Research & Knowledge',
      whatsapp: 'WhatsApp',
      adminDemo: 'Admin',
      eyebrow: 'PAKISTAN • ORIGIN • GLOBAL',
      heroCopy: 'From the Chilghoza forests of Pakistan to the world — connecting premium quality, authentic origin, responsible supply chains and deep knowledge.',
      tradeKicker: 'CHILGHOZA PINE NUTS',
      globalTrade: 'GLOBAL TRADE',
      tradeSub: 'Premium quality • Worldwide export →',
      researchKicker: 'CHILGHOZA',
      researchTitle: 'RESEARCH & KNOWLEDGE',
      researchSub: 'Science • Origin • Forests • Quality →',
      profileKicker: 'CHILGHOZA • PEOPLE • PARTNERSHIP',
      profileTitle: 'Chilghoza Pine Nuts',
      profileCopy: 'Knowledge, trade, forests and environmental stewardship in one platform.',
      aiKicker: 'THE NEXT GENERATION',
      aiCopy: 'Human knowledge first. AI assistance second. Use AI to improve writing, summarize research, support buyers and translate content — with human review before publishing.',
      openAI: 'Open AI & Admin →',
      mediaKicker: 'ORIGINAL COLLECTION',
      mediaTitle: 'From Forest to Market',
      mediaCopy: 'Only the supplied original project photographs are used. Each image can later receive an editable title, description, caption and category from Admin.',
      back: 'Back',
      tradeKickerLong: 'GLOBAL TRADE • QUALITY • MARKETS • SUPPLY',
      tradeIntro: 'A structured international trade centre for product quality, export readiness, buyers, logistics and responsible supply-chain information.',
      researchKickerLong: 'SCIENCE • ORIGIN • FORESTS • QUALITY',
      researchIntro: 'A knowledge centre for Chilghoza origin, geographical indication, forests, biodiversity, climate, organic claims, nutrition, processing and traceability.',
      waCopy: 'Direct business, purchasing, research collaboration and general contact.',
      adminTitle: 'Admin Control Center',
      adminIntro: 'Secure content control, media, users, permissions, versions, themes and AI assistance.',
      loginTitle: 'Admin Login',
      loginCopy: 'Sign in to manage content and website settings.',
      username: 'Username',
      password: 'Password',
      login: 'Login',
      cmsTitle: 'Content',
      cmsCopy: 'Add, edit, delete, restore, draft, preview and publish folder content.',
      mediaAdminTitle: 'Media',
      mediaAdminCopy: 'Store images, videos and PDFs in Cloudflare R2 with editable metadata.',
      usersTitle: 'Users & Permissions',
      usersCopy: 'Roles, permissions, sessions and audit records.',
      aiAdminCopy: 'Workers AI endpoint for folder-aware assistance with human review.',
      themeTitle: 'Theme Studio',
      themeCopy: 'Change the visual system without redeployment. Changes are saved in D1 when connected.',
      saveTheme: 'Save Theme',
      resetTheme: 'Reset',
      contentEditor: 'Content Editor',
      saveContent: 'Save Draft',
      aiTools: 'Royal AI Assistant',
      aiPlaceholder: 'Write a request for the AI assistant...',
      improve: 'Improve Writing',
      summary: 'Summarize',
      buyer: 'Buyer Presentation',
      translate: 'Translate',
      securityTitle: 'Security & Operations',
      addressKicker: 'CONTACT • OFFICE • PARTNERSHIP',
      addressTitle: 'Office Address',
      addressText: 'Pakistan • Address, phone, email and WhatsApp details are editable from Admin.'
    },

    zh: {
      skip: '跳到主要内容',
      home: '首页',
      trade: '贸易与商业',
      research: '研究与知识',
      whatsapp: 'WhatsApp',
      adminDemo: '管理',
      eyebrow: '巴基斯坦 • 原产地 • 全球',
      heroCopy: '从巴基斯坦的松子森林走向世界，连接卓越品质、真实产地、负责任供应链与专业知识。',
      tradeKicker: '吉尔吉特松子',
      globalTrade: '全球贸易',
      tradeSub: '优质产品 • 全球出口 →',
      researchKicker: 'CHILGHOZA',
      researchTitle: '研究与知识',
      researchSub: '科学 • 原产地 • 森林 • 品质 →',
      profileKicker: '松子 • 人民 • 合作',
      profileTitle: 'Chilghoza 松子',
      profileCopy: '知识、贸易、森林与环境保护的一体化平台。',
      aiKicker: '下一代',
      aiCopy: '以人类知识为先，AI辅助为后。AI可帮助改善写作、总结研究、支持买家和翻译内容，并在发布前进行人工审核。',
      openAI: '打开 AI 与管理 →',
      mediaKicker: '原创收藏',
      mediaTitle: '从森林到市场',
      mediaCopy: '仅使用提供的原创项目照片。',
      back: '返回',
      tradeKickerLong: '全球贸易 • 品质 • 市场 • 供应',
      tradeIntro: '面向国际贸易的产品品质、出口准备、买家、物流和负责任供应链中心。',
      researchKickerLong: '科学 • 原产地 • 森林 • 品质',
      researchIntro: '关于松子原产地、地理标志、森林、生物多样性、气候、营养、加工和可追溯性的知识中心。',
      waCopy: '直接商业、采购、研究合作及一般联系。',
      adminTitle: '管理控制中心',
      adminIntro: '安全的内容、媒体、用户、权限、版本、主题和 AI 管理。',
      loginTitle: '管理员登录',
      loginCopy: '登录以管理内容和网站设置。',
      username: '用户名',
      password: '密码',
      login: '登录',
      cmsTitle: '内容',
      cmsCopy: '添加、编辑、删除、恢复、草稿、预览和发布内容。',
      mediaAdminTitle: '媒体',
      mediaAdminCopy: '使用 Cloudflare R2 存储图片、视频和 PDF。',
      usersTitle: '用户与权限',
      usersCopy: '角色、权限、会话和审计记录。',
      aiAdminCopy: '具有人工审核机制的 Workers AI。',
      themeTitle: '主题工作室',
      themeCopy: '无需重新部署即可更改视觉系统。',
      saveTheme: '保存主题',
      resetTheme: '重置',
      contentEditor: '内容编辑器',
      saveContent: '保存草稿',
      aiTools: 'Royal AI 助手',
      aiPlaceholder: '请输入 AI 请求...',
      improve: '改进文字',
      summary: '总结',
      buyer: '买家介绍',
      translate: '翻译',
      securityTitle: '安全与运营',
      addressKicker: '联系 • 办公室 • 合作',
      addressTitle: '办公室地址',
      addressText: '巴基斯坦 • 地址、电话、电子邮件和 WhatsApp 信息可从管理后台编辑。'
    },

    ur: {
      skip: 'مرکزی مواد پر جائیں',
      home: 'ہوم',
      trade: 'تجارت و کاروبار',
      research: 'تحقیق و علم',
      whatsapp: 'واٹس ایپ',
      adminDemo: 'ایڈمن',
      eyebrow: 'پاکستان • اصل • عالمی',
      heroCopy: 'پاکستان کے چلغوزہ جنگلات سے دنیا تک — اعلیٰ معیار، حقیقی اصل، ذمہ دار سپلائی چین اور گہرا علم ایک پلیٹ فارم پر۔',
      tradeKicker: 'چلغوزہ پائن نٹس',
      globalTrade: 'عالمی تجارت',
      tradeSub: 'اعلیٰ معیار • دنیا بھر میں برآمد →',
      researchKicker: 'چلغوزہ',
      researchTitle: 'تحقیق و علم',
      researchSub: 'سائنس • اصل • جنگلات • معیار →',
      profileKicker: 'چلغوزہ • لوگ • شراکت',
      profileTitle: 'چلغوزہ پائن نٹس',
      profileCopy: 'علم، تجارت، جنگلات اور ماحولیاتی ذمہ داری ایک پلیٹ فارم پر۔',
      aiKicker: 'اگلی نسل',
      aiCopy: 'پہلے انسانی علم، پھر AI معاونت۔ AI تحریر بہتر بنانے، تحقیق کا خلاصہ، خریداروں کی مدد اور ترجمہ کر سکتا ہے، مگر اشاعت سے پہلے انسانی جائزہ ضروری ہے۔',
      openAI: 'AI اور ایڈمن کھولیں →',
      mediaKicker: 'اصل مجموعہ',
      mediaTitle: 'جنگل سے مارکیٹ تک',
      mediaCopy: 'صرف فراہم کردہ اصل پراجیکٹ تصاویر استعمال کی جاتی ہیں۔',
      back: 'واپس',
      tradeKickerLong: 'عالمی تجارت • معیار • مارکیٹس • سپلائی',
      tradeIntro: 'مصنوعات کے معیار، برآمدی تیاری، خریداروں، لاجسٹکس اور ذمہ دار سپلائی چین کے لیے بین الاقوامی تجارتی مرکز۔',
      researchKickerLong: 'سائنس • اصل • جنگلات • معیار',
      researchIntro: 'چلغوزہ کی اصل، جغرافیائی شناخت، جنگلات، حیاتیاتی تنوع، موسمیاتی تبدیلی، غذائیت، پروسیسنگ اور ٹریس ایبلٹی کا علمی مرکز۔',
      waCopy: 'براہ راست کاروبار، خریداری، تحقیقی تعاون اور عمومی رابطہ۔',
      adminTitle: 'ایڈمن کنٹرول سینٹر',
      adminIntro: 'مواد، میڈیا، صارفین، اجازتوں، ورژنز، تھیم اور AI کا محفوظ کنٹرول۔',
      loginTitle: 'ایڈمن لاگ اِن',
      loginCopy: 'مواد اور ویب سائٹ کی ترتیبات کے لیے لاگ اِن کریں۔',
      username: 'صارف نام',
      password: 'پاس ورڈ',
      login: 'لاگ اِن',
      cmsTitle: 'مواد',
      cmsCopy: 'فولڈر مواد شامل، ترمیم، حذف، ڈرافٹ، پری ویو اور پبلش کریں۔',
      mediaAdminTitle: 'میڈیا',
      mediaAdminCopy: 'Cloudflare R2 میں تصاویر، ویڈیوز اور PDF محفوظ کریں۔',
      usersTitle: 'صارفین و اجازتیں',
      usersCopy: 'رولز، اجازتیں، سیشنز اور آڈٹ ریکارڈز۔',
      aiAdminCopy: 'انسانی جائزے کے ساتھ Workers AI معاونت۔',
      themeTitle: 'تھیم اسٹوڈیو',
      themeCopy: 'دوبارہ deploy کیے بغیر ویب سائٹ کا بصری نظام تبدیل کریں۔',
      saveTheme: 'تھیم محفوظ کریں',
      resetTheme: 'ری سیٹ',
      contentEditor: 'مواد ایڈیٹر',
      saveContent: 'ڈرافٹ محفوظ کریں',
      aiTools: 'Royal AI معاون',
      aiPlaceholder: 'AI معاون کے لیے درخواست لکھیں...',
      improve: 'تحریر بہتر کریں',
      summary: 'خلاصہ',
      buyer: 'خریدار کے لیے پیشکش',
      translate: 'ترجمہ',
      securityTitle: 'سیکیورٹی و آپریشنز',
      addressKicker: 'رابطہ • دفتر • شراکت',
      addressTitle: 'دفتری پتہ',
      addressText: 'پاکستان • پتہ، فون، ای میل اور WhatsApp کی معلومات ایڈمن سے تبدیل کی جا سکتی ہیں۔'
    },

    ps: {
      skip: 'اصلي منځپانګې ته لاړ شئ',
      home: 'کور',
      trade: 'سوداګري او تجارت',
      research: 'څېړنه او پوهه',
      whatsapp: 'واټس‌اپ',
      adminDemo: 'اداره',
      eyebrow: 'پاکستان • اصل • نړیوال',
      heroCopy: 'د پاکستان د چلغوزو له ځنګلونو څخه نړۍ ته — لوړ کیفیت، اصلي سرچینه، مسؤل اکمالاتي ځنځیر او پوهه.',
      tradeKicker: 'چلغوزي مغز',
      globalTrade: 'نړیوال تجارت',
      tradeSub: 'لوړ کیفیت • نړیوال صادرات →',
      researchKicker: 'چلغوزی',
      researchTitle: 'څېړنه او پوهه',
      researchSub: 'ساینس • اصل • ځنګلونه • کیفیت →',
      profileKicker: 'چلغوزی • خلک • ملګرتیا',
      profileTitle: 'چلغوزي مغز',
      profileCopy: 'پوهه، تجارت، ځنګلونه او د چاپېریال ساتنه په یوه پلیټ فارم کې.',
      aiKicker: 'راتلونکی نسل',
      aiCopy: 'لومړی انساني پوهه، بیا AI مرسته. AI د لیکلو، څېړنې، پېرودونکو او ژباړې لپاره مرسته کوي، خو د خپرولو مخکې انساني کتنه اړینه ده.',
      openAI: 'AI او اداره →',
      mediaKicker: 'اصلي ټولګه',
      mediaTitle: 'له ځنګله تر بازار',
      mediaCopy: 'یوازې د پروژې اصلي ورکړل شوي عکسونه کارول کېږي.',
      back: 'بېرته',
      tradeKickerLong: 'نړیوال تجارت • کیفیت • بازارونه • عرضه',
      tradeIntro: 'د کیفیت، صادراتو، پېرودونکو، لوژستیک او مسؤل اکمالاتي ځنځیر لپاره نړیوال مرکز.',
      researchKickerLong: 'ساینس • اصل • ځنګلونه • کیفیت',
      researchIntro: 'د چلغوزي د اصل، جغرافیایي نښې، ځنګلونو، ژوو، اقلیم، تغذیې او تعقیب مرکز.',
      waCopy: 'مستقیم تجارت، پېرودنه، څېړنیزه همکاري او عمومي اړیکه.',
      adminTitle: 'د ادارې کنټرول مرکز',
      adminIntro: 'د منځپانګې، رسنیو، کاروونکو، اجازو، نسخو، موضوع او AI خوندي کنټرول.',
      loginTitle: 'د ادارې ننوتل',
      loginCopy: 'د منځپانګې او ویب‌سایټ تنظیماتو لپاره ننوتل وکړئ.',
      username: 'کارن نوم',
      password: 'پټ نوم',
      login: 'ننوتل',
      themeTitle: 'Theme Studio',
      saveTheme: 'موضوع خوندي کړئ',
      resetTheme: 'بیا تنظیم',
      contentEditor: 'د منځپانګې ایډیټر',
      saveContent: 'Draft خوندي کړئ',
      aiTools: 'Royal AI',
      improve: 'لیکنه ښه کړئ',
      summary: 'لنډیز',
      buyer: 'پېرودونکي ته وړاندې کول',
      translate: 'ژباړه',
      addressTitle: 'د دفتر پته'
    },

    fa: {
      skip: 'رفتن به محتوای اصلی',
      home: 'خانه',
      trade: 'تجارت و کسب‌وکار',
      research: 'پژوهش و دانش',
      whatsapp: 'واتساپ',
      adminDemo: 'مدیریت',
      eyebrow: 'پاکستان • مبدأ • جهانی',
      heroCopy: 'از جنگل‌های چلغوزای پاکستان به جهان — کیفیت ممتاز، مبدأ واقعی، زنجیره تأمین مسئولانه و دانش تخصصی.',
      tradeKicker: 'چلغوزا',
      globalTrade: 'تجارت جهانی',
      tradeSub: 'کیفیت ممتاز • صادرات جهانی →',
      researchKicker: 'چلغوزا',
      researchTitle: 'پژوهش و دانش',
      researchSub: 'علم • مبدأ • جنگل‌ها • کیفیت →',
      profileKicker: 'چلغوزا • مردم • مشارکت',
      profileTitle: 'چلغوزا',
      profileCopy: 'دانش، تجارت، جنگل‌ها و حفاظت محیط زیست در یک پلتفرم.',
      aiKicker: 'نسل آینده',
      aiCopy: 'ابتدا دانش انسانی، سپس کمک هوش مصنوعی. استفاده برای بهبود متن، خلاصه پژوهش، پشتیبانی خریداران و ترجمه با بررسی انسانی قبل از انتشار.',
      openAI: 'AI و مدیریت →',
      mediaKicker: 'مجموعه اصلی',
      mediaTitle: 'از جنگل تا بازار',
      mediaCopy: 'فقط تصاویر اصلی پروژه استفاده می‌شوند.',
      back: 'بازگشت',
      tradeKickerLong: 'تجارت جهانی • کیفیت • بازار • عرضه',
      researchKickerLong: 'علم • مبدأ • جنگل‌ها • کیفیت',
      waCopy: 'ارتباط مستقیم تجاری، خرید، همکاری پژوهشی و عمومی.',
      adminTitle: 'مرکز کنترل مدیریت',
      loginTitle: 'ورود مدیر',
      loginCopy: 'برای مدیریت محتوا و تنظیمات وارد شوید.',
      username: 'نام کاربری',
      password: 'رمز عبور',
      login: 'ورود',
      themeTitle: 'استودیو پوسته',
      saveTheme: 'ذخیره پوسته',
      resetTheme: 'بازنشانی',
      contentEditor: 'ویرایشگر محتوا',
      saveContent: 'ذخیره پیش‌نویس',
      aiTools: 'دستیار Royal AI',
      improve: 'بهبود متن',
      summary: 'خلاصه',
      buyer: 'ارائه به خریدار',
      translate: 'ترجمه',
      addressTitle: 'آدرس دفتر'
    },

    ru: {
      skip: 'Перейти к основному содержанию',
      home: 'Главная',
      trade: 'Торговля и бизнес',
      research: 'Исследования и знания',
      whatsapp: 'WhatsApp',
      adminDemo: 'Админ',
      eyebrow: 'ПАКИСТАН • ПРОИСХОЖДЕНИЕ • МИР',
      heroCopy: 'От лесов чилгозы Пакистана к мировому рынку — качество, подлинное происхождение, ответственная цепочка поставок и знания.',
      tradeKicker: 'КЕДРОВЫЕ ОРЕХИ ЧИЛГОЗА',
      globalTrade: 'МИРОВАЯ ТОРГОВЛЯ',
      tradeSub: 'Премиальное качество • Экспорт по всему миру →',
      researchKicker: 'ЧИЛГОЗА',
      researchTitle: 'ИССЛЕДОВАНИЯ И ЗНАНИЯ',
      researchSub: 'Наука • Происхождение • Леса • Качество →',
      profileKicker: 'ЧИЛГОЗА • ЛЮДИ • ПАРТНЁРСТВО',
      profileTitle: 'Орехи чилгоза',
      profileCopy: 'Знания, торговля, леса и экологическая ответственность на одной платформе.',
      aiKicker: 'НОВОЕ ПОКОЛЕНИЕ',
      aiCopy: 'Сначала знания человека, затем помощь AI. Улучшение текста, исследования, поддержка покупателей и перевод с обязательной проверкой человеком.',
      openAI: 'AI и Админ →',
      mediaKicker: 'ОРИГИНАЛЬНАЯ КОЛЛЕКЦИЯ',
      mediaTitle: 'От леса до рынка',
      mediaCopy: 'Используются только предоставленные оригинальные фотографии проекта.',
      back: 'Назад',
      tradeKickerLong: 'МИРОВАЯ ТОРГОВЛЯ • КАЧЕСТВО • РЫНКИ • ПОСТАВКИ',
      researchKickerLong: 'НАУКА • ПРОИСХОЖДЕНИЕ • ЛЕСА • КАЧЕСТВО',
      waCopy: 'Прямые деловые контакты, закупки, исследовательское сотрудничество.',
      adminTitle: 'Центр управления',
      loginTitle: 'Вход администратора',
      loginCopy: 'Войдите для управления содержанием и настройками.',
      username: 'Имя пользователя',
      password: 'Пароль',
      login: 'Войти',
      themeTitle: 'Студия темы',
      saveTheme: 'Сохранить тему',
      resetTheme: 'Сбросить',
      contentEditor: 'Редактор контента',
      saveContent: 'Сохранить черновик',
      aiTools: 'Royal AI',
      improve: 'Улучшить текст',
      summary: 'Суммировать',
      buyer: 'Для покупателя',
      translate: 'Перевести',
      addressTitle: 'Адрес офиса'
    },

    id: {
      skip: 'Lewati ke konten utama',
      home: 'Beranda',
      trade: 'Perdagangan & Bisnis',
      research: 'Riset & Pengetahuan',
      whatsapp: 'WhatsApp',
      adminDemo: 'Admin',
      eyebrow: 'PAKISTAN • ASAL • GLOBAL',
      heroCopy: 'Dari hutan Chilghoza Pakistan ke dunia — menghubungkan kualitas premium, asal autentik, rantai pasok bertanggung jawab, dan pengetahuan.',
      tradeKicker: 'KACANG PINUS CHILGHOZA',
      globalTrade: 'PERDAGANGAN GLOBAL',
      tradeSub: 'Kualitas premium • Ekspor seluruh dunia →',
      researchKicker: 'CHILGHOZA',
      researchTitle: 'RISET & PENGETAHUAN',
      researchSub: 'Sains • Asal • Hutan • Kualitas →',
      profileKicker: 'CHILGHOZA • MASYARAKAT • KEMITRAAN',
      profileTitle: 'Kacang Pinus Chilghoza',
      profileCopy: 'Pengetahuan, perdagangan, hutan dan kepedulian lingkungan dalam satu platform.',
      aiKicker: 'GENERASI BERIKUTNYA',
      aiCopy: 'Pengetahuan manusia terlebih dahulu. Bantuan AI kedua. Gunakan AI untuk menulis, merangkum riset, membantu pembeli dan menerjemahkan dengan tinjauan manusia.',
      openAI: 'Buka AI & Admin →',
      mediaKicker: 'KOLEKSI ASLI',
      mediaTitle: 'Dari Hutan ke Pasar',
      mediaCopy: 'Hanya foto proyek asli yang disediakan yang digunakan.',
      back: 'Kembali',
      tradeKickerLong: 'PERDAGANGAN GLOBAL • KUALITAS • PASAR • PASOKAN',
      researchKickerLong: 'SAINS • ASAL • HUTAN • KUALITAS',
      waCopy: 'Kontak bisnis, pembelian, kolaborasi riset dan umum.',
      adminTitle: 'Pusat Kontrol Admin',
      loginTitle: 'Login Admin',
      loginCopy: 'Masuk untuk mengelola konten dan pengaturan.',
      username: 'Nama pengguna',
      password: 'Kata sandi',
      login: 'Login',
      themeTitle: 'Studio Tema',
      saveTheme: 'Simpan Tema',
      resetTheme: 'Reset',
      contentEditor: 'Editor Konten',
      saveContent: 'Simpan Draft',
      aiTools: 'Asisten Royal AI',
      improve: 'Perbaiki Tulisan',
      summary: 'Ringkas',
      buyer: 'Presentasi Pembeli',
      translate: 'Terjemahkan',
      addressTitle: 'Alamat Kantor'
    },

    ms: {
      skip: 'Langkau ke kandungan utama',
      home: 'Laman Utama',
      trade: 'Perdagangan & Perniagaan',
      research: 'Penyelidikan & Pengetahuan',
      whatsapp: 'WhatsApp',
      adminDemo: 'Admin',
      eyebrow: 'PAKISTAN • ASAL • GLOBAL',
      heroCopy: 'Dari hutan Chilghoza Pakistan ke dunia — menghubungkan kualiti premium, asal sebenar, rantaian bekalan bertanggungjawab dan pengetahuan.',
      tradeKicker: 'KACANG PAIN CHILGHOZA',
      globalTrade: 'PERDAGANGAN GLOBAL',
      tradeSub: 'Kualiti premium • Eksport seluruh dunia →',
      researchKicker: 'CHILGHOZA',
      researchTitle: 'PENYELIDIKAN & PENGETAHUAN',
      researchSub: 'Sains • Asal • Hutan • Kualiti →',
      profileKicker: 'CHILGHOZA • MASYARAKAT • KERJASAMA',
      profileTitle: 'Kacang Pain Chilghoza',
      profileCopy: 'Pengetahuan, perdagangan, hutan dan penjagaan alam sekitar dalam satu platform.',
      aiKicker: 'GENERASI SETERUSNYA',
      aiCopy: 'Pengetahuan manusia dahulu, bantuan AI kemudian. AI membantu penulisan, ringkasan penyelidikan, pembeli dan terjemahan dengan semakan manusia.',
      openAI: 'Buka AI & Admin →',
      mediaKicker: 'KOLEKSI ASAL',
      mediaTitle: 'Dari Hutan ke Pasaran',
      mediaCopy: 'Hanya foto projek asal yang diberikan digunakan.',
      back: 'Kembali',
      tradeKickerLong: 'PERDAGANGAN GLOBAL • KUALITI • PASARAN • BEKALAN',
      researchKickerLong: 'SAINS • ASAL • HUTAN • KUALITI',
      waCopy: 'Hubungan perniagaan, pembelian, kerjasama penyelidikan dan umum.',
      adminTitle: 'Pusat Kawalan Admin',
      loginTitle: 'Log Masuk Admin',
      loginCopy: 'Log masuk untuk mengurus kandungan dan tetapan.',
      username: 'Nama pengguna',
      password: 'Kata laluan',
      login: 'Log masuk',
      themeTitle: 'Studio Tema',
      saveTheme: 'Simpan Tema',
      resetTheme: 'Tetapkan Semula',
      contentEditor: 'Editor Kandungan',
      saveContent: 'Simpan Draf',
      aiTools: 'Pembantu Royal AI',
      improve: 'Baiki Penulisan',
      summary: 'Ringkaskan',
      buyer: 'Pembentangan Pembeli',
      translate: 'Terjemah',
      addressTitle: 'Alamat Pejabat'
    },

    ar: {
      skip: 'انتقل إلى المحتوى الرئيسي',
      home: 'الرئيسية',
      trade: 'التجارة والأعمال',
      research: 'البحث والمعرفة',
      whatsapp: 'واتساب',
      adminDemo: 'الإدارة',
      eyebrow: 'باكستان • الأصل • عالمي',
      heroCopy: 'من غابات تشلغوزا في باكستان إلى العالم — جودة ممتازة، أصل حقيقي، سلاسل توريد مسؤولة ومعرفة عميقة.',
      tradeKicker: 'مكسرات تشلغوزا',
      globalTrade: 'التجارة العالمية',
      tradeSub: 'جودة ممتازة • تصدير عالمي →',
      researchKicker: 'تشلغوزا',
      researchTitle: 'البحث والمعرفة',
      researchSub: 'العلم • الأصل • الغابات • الجودة →',
      profileKicker: 'تشلغوزا • الناس • الشراكة',
      profileTitle: 'مكسرات تشلغوزا',
      profileCopy: 'المعرفة والتجارة والغابات والمسؤولية البيئية في منصة واحدة.',
      aiKicker: 'الجيل القادم',
      aiCopy: 'المعرفة البشرية أولاً، ثم مساعدة الذكاء الاصطناعي. تحسين الكتابة وتلخيص الأبحاث ودعم المشترين والترجمة مع مراجعة بشرية قبل النشر.',
      openAI: 'فتح AI والإدارة →',
      mediaKicker: 'المجموعة الأصلية',
      mediaTitle: 'من الغابة إلى السوق',
      mediaCopy: 'يتم استخدام صور المشروع الأصلية المقدمة فقط.',
      back: 'رجوع',
      tradeKickerLong: 'التجارة العالمية • الجودة • الأسواق • التوريد',
      researchKickerLong: 'العلم • الأصل • الغابات • الجودة',
      waCopy: 'الاتصال التجاري والشراء والتعاون البحثي والاتصال العام.',
      adminTitle: 'مركز التحكم الإداري',
      loginTitle: 'تسجيل دخول المدير',
      loginCopy: 'سجّل الدخول لإدارة المحتوى والإعدادات.',
      username: 'اسم المستخدم',
      password: 'كلمة المرور',
      login: 'تسجيل الدخول',
      themeTitle: 'استوديو المظهر',
      saveTheme: 'حفظ المظهر',
      resetTheme: 'إعادة ضبط',
      contentEditor: 'محرر المحتوى',
      saveContent: 'حفظ المسودة',
      aiTools: 'مساعد Royal AI',
      improve: 'تحسين الكتابة',
      summary: 'تلخيص',
      buyer: 'عرض للمشتري',
      translate: 'ترجمة',
      addressTitle: 'عنوان المكتب'
    }
  };

  function getStoredLanguage() {
    return localStorage.getItem('rcpn_language') || 'en';
  }

  function applyLanguage(code) {
    const lang = languages.find(x => x.code === code) || languages[0];
    const dict = translations[lang.code] || translations.en;

    document.documentElement.lang = lang.code;
    document.documentElement.dir = lang.dir;
    localStorage.setItem('rcpn_language', lang.code);

    $$('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) el.textContent = dict[key];
    });

    $$('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (dict[key]) el.placeholder = dict[key];
    });

    if ($('langLabel')) $('langLabel').textContent = lang.name;

    if ($('langMenu')) {
      $$('.lang-option', $('langMenu')).forEach(option => {
        option.setAttribute('aria-selected', option.dataset.lang === code);
      });
    }
  }

  function buildLanguageMenu() {
    const menu = $('langMenu');
    if (!menu) return;

    menu.innerHTML = languages.map(lang => `
      <button
        type="button"
        class="lang-option"
        data-lang="${lang.code}"
        role="option"
        aria-selected="false">
        ${lang.name}
      </button>
    `).join('');

    $$('.lang-option', menu).forEach(option => {
      option.addEventListener('click', e => {
        e.stopPropagation();
        applyLanguage(option.dataset.lang);
        menu.classList.remove('open');
        $('langBtn')?.setAttribute('aria-expanded', 'false');
      });
    });
  }

  buildLanguageMenu();

  $('langBtn')?.addEventListener('click', e => {
    e.stopPropagation();
    const menu = $('langMenu');
    menu?.classList.toggle('open');
    $('langBtn').setAttribute(
      'aria-expanded',
      menu?.classList.contains('open') ? 'true' : 'false'
    );
  });

  document.addEventListener('click', () => {
    $('langMenu')?.classList.remove('open');
    $('langBtn')?.setAttribute('aria-expanded', 'false');
  });

  applyLanguage(getStoredLanguage());


  /* =========================================================
     2. PAGE ROUTING + REAL BROWSER HISTORY
     ========================================================= */

  const pages = $$('.page');

  function showPage(pageId, push = true) {
    if (!$(pageId)) pageId = 'home';

    pages.forEach(page => {
      page.classList.toggle('active', page.id === pageId);
    });

    window.scrollTo({ top: 0, behavior: 'instant' });

    if (push) {
      history.pushState({ page: pageId }, '', `#${pageId}`);
    }

    if (pageId === 'admin') checkAuth();
  }

  function currentPage() {
    const hash = location.hash.replace('#', '');
    return $(hash) ? hash : 'home';
  }

  $$('[data-route]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const route = link.dataset.route;
      if (route) showPage(route, true);
    });
  });

  $$('[data-back]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (history.length > 1 && location.hash) {
        history.back();
      } else {
        showPage('home', true);
      }
    });
  });

  window.addEventListener('popstate', () => {
    showPage(currentPage(), false);
  });

  showPage(currentPage(), false);


  /* =========================================================
     3. ORIGINAL 43-PHOTO COLLECTION
     ========================================================= */

  const photoCaptions = [
    'Chilghoza Forest Landscape',
    'Origin Traceability',
    'Regional Forest Mapping',
    'Chilghoza Identity',
    'Supply Chain Evidence',
    'High-Altitude Forest Canopy',
    'Pinus gerardiana Trees',
    'Natural Regeneration Area',
    'Mountain Forest Habitat',
    'Conservation Zone',
    'Community Forestry',
    'Highland Biodiversity',
    'Ecosystem Monitoring',
    'Climate Resilience',
    'Alpine Forest Weather',
    'Soil & Moisture Analysis',
    'Laboratory Analysis',
    'Natural Harvest Sample',
    'Purity Testing',
    'Natural Processing',
    'Nutritional Profile',
    'Grade-A Chilghoza Kernels',
    'Size & Shell Grading',
    'Moisture Testing',
    'Kernel Color Inspection',
    'Jumbo Pine Nuts',
    'Vacuum Packaging',
    'Cold Storage',
    'Export Freight Cartons',
    'Customs Documentation',
    'Bulk Shipment Dispatch',
    'Harvest Season Cone Yield',
    'Pine Cone Extraction',
    'Wholesale Trade Stock',
    'Regional Market Supply',
    'International Freight Batch',
    'Local Community Collection',
    'Traditional Harvesting',
    'Cone Drying Yard',
    'Manual De-shelling',
    'Fair Trade Procurement',
    'Sourcing Quality Check',
    'Final Export Inspection'
  ];

  function buildHomeGallery() {
    const gallery = $('homeGallery');
    if (!gallery) return;

    gallery.innerHTML = photoCaptions.map((caption, index) => {
      const number = String(index + 1).padStart(3, '0');

      return `
        <figure>
          <img
            src="${number}.jpg"
            alt="${caption}"
            loading="lazy"
            onerror="this.closest('figure').remove()">
          <figcaption>${caption}</figcaption>
        </figure>
      `;
    }).join('');
  }

  buildHomeGallery();


  /* =========================================================
     4. RESEARCH + TRADE FOLDERS
     ========================================================= */

  const researchData = [
    {
      id: 'r1',
      num: '01',
      title: 'Geographical Indication (GI)',
      desc: 'Origin protection, product identity and supply-chain evidence.',
      detail: 'Legal protection, region-specific origin mapping, GI evidence and origin traceability mechanisms.',
      images: ['001.jpg','002.jpg','003.jpg','004.jpg','005.jpg']
    },
    {
      id: 'r2',
      num: '02',
      title: 'Chilghoza Forests',
      desc: 'Forest ecology, regeneration, harvesting and conservation.',
      detail: 'Ecological knowledge of Pinus gerardiana habitats, cone cycles, community forestry and conservation.',
      images: ['006.jpg','007.jpg','008.jpg','009.jpg','010.jpg','011.jpg']
    },
    {
      id: 'r3',
      num: '03',
      title: 'Global Environment & Climate',
      desc: 'Biodiversity, carbon, ecosystem services and climate resilience.',
      detail: 'Climate variability, cone yields, ecosystem preservation and environmental sustainability.',
      images: ['012.jpg','013.jpg','014.jpg','015.jpg','016.jpg']
    },
    {
      id: 'r4',
      num: '04',
      title: 'Organic & Natural Product Claims',
      desc: 'Evidence, standards, chain of custody and declarations.',
      detail: 'Natural processing, forest origin verification, nutrition and laboratory evidence.',
      images: ['017.jpg','018.jpg','019.jpg','020.jpg','021.jpg']
    }
  ];

  const tradeData = [
    {
      id: 't1',
      num: '01',
      title: 'Quality & Grading',
      desc: 'Standards for size, moisture, purity and grading.',
      detail: 'Specifications for kernel size, moisture, shell integrity and export quality.',
      images: ['022.jpg','023.jpg','024.jpg','025.jpg','026.jpg']
    },
    {
      id: 't2',
      num: '02',
      title: 'Export & Logistics',
      desc: 'Global shipping, packaging and supply-chain compliance.',
      detail: 'Packaging, storage, customs documentation and international freight.',
      images: ['027.jpg','028.jpg','029.jpg','030.jpg','031.jpg']
    },
    {
      id: 't3',
      num: '03',
      title: 'Market Trends & Pricing',
      desc: 'Commercial insights, demand and price dynamics.',
      detail: 'Harvesting insights, wholesale markets, regional trade and demand.',
      images: ['032.jpg','033.jpg','034.jpg','035.jpg','036.jpg']
    },
    {
      id: 't4',
      num: '04',
      title: 'Responsible Supply Chain',
      desc: 'Ethical sourcing, fair trade and local partnerships.',
      detail: 'Community procurement, sustainable harvesting and equitable trade.',
      images: ['037.jpg','038.jpg','039.jpg','040.jpg','041.jpg','042.jpg','043.jpg']
    }
  ];

  function createGallery(images) {
    return `
      <div style="
        display:grid;
        grid-template-columns:repeat(auto-fill,minmax(140px,1fr));
        gap:14px;
        margin-top:20px;">
        ${images.map(file => `
          <figure style="
            margin:0;
            background:rgba(255,255,255,.05);
            border:1px solid rgba(255,255,255,.12);
            padding:8px;
            border-radius:10px;">
            <img
              src="${file}"
              alt="Royal Chilghoza project photograph"
              loading="lazy"
              style="
                width:100%;
                height:120px;
                object-fit:cover;
                border-radius:7px;
                display:block;">
            <figcaption style="
              margin-top:7px;
              font-size:.78rem;
              color:#d1d5db;">
              ${file}
            </figcaption>
          </figure>
        `).join('')}
      </div>
    `;
  }

  function renderFolders(gridId, detailId, data) {
    const grid = $(gridId);
    const detail = $(detailId);

    if (!grid || !detail) return;

    grid.innerHTML = data.map(item => `
      <article class="folder" data-id="${item.id}" tabindex="0">
        <span class="num">${item.num}</span>
        <h3>${item.title}</h3>
        <p>${item.desc}</p>
      </article>
    `).join('');

    $$('.folder', grid).forEach(folder => {
      const openFolder = () => {
        $$('.folder', grid).forEach(x => x.classList.remove('active'));
        folder.classList.add('active');

        const item = data.find(x => x.id === folder.dataset.id);
        if (!item) return;

        detail.innerHTML = `
          <div class="detail-box">
            <div class="eyebrow">ROYAL CHILGHOZA</div>
            <h2>${item.title}</h2>
            <p>${item.detail}</p>
            <h4 style="margin-top:25px;color:var(--accent);">
              Gallery & Field Evidence
            </h4>
            ${createGallery(item.images)}
          </div>
        `;

        detail.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      };

      folder.addEventListener('click', openFolder);

      folder.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openFolder();
        }
      });
    });
  }

  renderFolders('researchFolders', 'researchContent', researchData);
  renderFolders('tradeFolders', 'tradeContent', tradeData);


  /* =========================================================
     5. API HELPER
     ========================================================= */

  async function api(url, options = {}) {
    const response = await fetch(url, {
      credentials: 'same-origin',
      ...options
    });

    let data = null;

    try {
      data = await response.json();
    } catch {
      data = {};
    }

    if (!response.ok) {
      throw new Error(data.error || `Request failed (${response.status})`);
    }

    return data;
  }


  /* =========================================================
     6. AUTHENTICATION
     ========================================================= */

  async function checkAuth() {
    try {
      const result = await api('/api/me');

      if (result.auth) {
        $('loginPanel')?.classList.add('hidden');
        $('adminPanel')?.classList.remove('hidden');
        loadAdminData();
      } else {
        $('loginPanel')?.classList.remove('hidden');
        $('adminPanel')?.classList.add('hidden');
      }
    } catch {
      $('loginPanel')?.classList.remove('hidden');
      $('adminPanel')?.classList.add('hidden');
    }
  }

  async function login() {
    const username = $('username')?.value.trim();
    const password = $('password')?.value || '';
    const status = $('loginStatus');

    if (!username || !password) {
      if (status) status.textContent = 'Please enter username and password.';
      return;
    }

    if (status) status.textContent = 'Signing in...';

    try {
      const result = await api('/api/login', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (status) status.textContent = result.message || 'Signed in.';

      $('loginPanel')?.classList.add('hidden');
      $('adminPanel')?.classList.remove('hidden');

      loadAdminData();
    } catch (error) {
      if (status) status.textContent = error.message;
    }
  }

  $('loginBtn')?.addEventListener('click', login);

  $('password')?.addEventListener('keydown', e => {
    if (e.key === 'Enter') login();
  });


  /* =========================================================
     7. THEME STUDIO
     ========================================================= */

  const defaultTheme = {
    bg: '#08251b',
    text: '#f5f1e6',
    accent: '#d8b96e',
    surface: '#103326'
  };

  function applyTheme(theme) {
    const root = document.documentElement;

    if (theme.bg) root.style.setProperty('--bg', theme.bg);
    if (theme.text) root.style.setProperty('--text', theme.text);
    if (theme.accent) root.style.setProperty('--accent', theme.accent);
    if (theme.surface) root.style.setProperty('--surface', theme.surface);

    if ($('bgColor')) $('bgColor').value = theme.bg || defaultTheme.bg;
    if ($('textColor')) $('textColor').value = theme.text || defaultTheme.text;
    if ($('accentColor')) $('accentColor').value = theme.accent || defaultTheme.accent;
    if ($('surfaceColor')) $('surfaceColor').value = theme.surface || defaultTheme.surface;
  }

  async function loadTheme() {
    try {
      const result = await api('/api/settings/theme');

      if (result.theme) {
        applyTheme(result.theme);
      } else {
        applyTheme(defaultTheme);
      }
    } catch {
      applyTheme(defaultTheme);
    }
  }

  async function saveTheme() {
    const status = $('contentStatus');

    const theme = {
      bg: $('bgColor')?.value || defaultTheme.bg,
      text: $('textColor')?.value || defaultTheme.text,
      accent: $('accentColor')?.value || defaultTheme.accent,
      surface: $('surfaceColor')?.value || defaultTheme.surface
    };

    applyTheme(theme);

    try {
      await api('/api/settings/theme', {
        method: 'PUT',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(theme)
      });

      if (status) status.textContent = 'Theme saved successfully.';
    } catch (error) {
      if (status) status.textContent = error.message;
    }
  }

  function resetTheme() {
    applyTheme(defaultTheme);
  }

  $('saveTheme')?.addEventListener('click', saveTheme);
  $('resetTheme')?.addEventListener('click', resetTheme);


  /* =========================================================
     8. CONTENT CMS
     ========================================================= */

  async function saveContent() {
    const status = $('contentStatus');

    const section = $('editFolder')?.value || 'trade';
    const title = $('editTitle')?.value.trim();
    const description = $('editDescription')?.value.trim();

    if (!title || !description) {
      if (status) status.textContent = 'Title and description are required.';
      return;
    }

    try {
      await api('/api/content', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          section,
          title,
          description,
          status: 'draft'
        })
      });

      if (status) status.textContent = 'Draft saved successfully.';

      $('editTitle').value = '';
      $('editDescription').value = '';

      loadContent();
    } catch (error) {
      if (status) status.textContent = error.message;
    }
  }

  async function loadContent() {
    const list = $('contentList');
    if (!list) return;

    try {
      const result = await api('/api/content');

      const items = result.items || [];

      list.innerHTML = items.length
        ? items.map(item => `
          <div class="content-item">
            <strong>${escapeHtml(item.title)}</strong>
            <div class="mini">
              ${escapeHtml(item.section)} •
              ${escapeHtml(item.status)}
            </div>
            <p>${escapeHtml(item.description)}</p>
          </div>
        `).join('')
        : '<div class="notice">No content records yet.</div>';
    } catch (error) {
      list.innerHTML = `<div class="notice">${escapeHtml(error.message)}</div>`;
    }
  }

  $('saveContent')?.addEventListener('click', saveContent);


  /* =========================================================
     9. MEDIA LIBRARY / R2
     ========================================================= */

  async function uploadMedia() {
    const file = $('mediaFile')?.files?.[0];
    const status = $('mediaStatus');

    if (!file) {
      if (status) status.textContent = 'Please select a file.';
      return;
    }

    if (status) status.textContent = 'Uploading...';

    const form = new FormData();

    form.append('file', file);
    form.append('title', $('mediaTitle')?.value || file.name);
    form.append('description', $('mediaDescription')?.value || '');
    form.append('caption', $('mediaCaption')?.value || '');
    form.append('section', $('mediaSection')?.value || 'research');

    try {
      await api('/api/media', {
        method: 'POST',
        body: form
      });

      if (status) status.textContent = 'Media uploaded successfully.';

      if ($('mediaFile')) $('mediaFile').value = '';
      if ($('mediaTitle')) $('mediaTitle').value = '';
      if ($('mediaDescription')) $('mediaDescription').value = '';
      if ($('mediaCaption')) $('mediaCaption').value = '';

      loadMedia();
    } catch (error) {
      if (status) status.textContent = error.message;
    }
  }

  async function loadMedia() {
    const list = $('mediaList');
    if (!list) return;

    try {
      const result = await api('/api/media');
      const items = result.items || [];

      list.innerHTML = items.length
        ? items.map(item => `
          <div class="media-item">
            ${item.kind === 'image'
              ? `<img src="/api/media/${encodeURIComponent(item.r2_key)}" alt="${escapeHtml(item.title)}" loading="lazy">`
              : item.kind === 'video'
                ? `<video src="/api/media/${encodeURIComponent(item.r2_key)}" controls></video>`
                : `<a href="/api/media/${encodeURIComponent(item.r2_key)}" target="_blank" rel="noopener">Open PDF</a>`
            }

            <strong>${escapeHtml(item.title)}</strong>
            <div class="mini">
              ${escapeHtml(item.section)} • ${escapeHtml(item.kind)}
            </div>

            <p>${escapeHtml(item.description || '')}</p>
            <small>${escapeHtml(item.caption || '')}</small>
          </div>
        `).join('')
        : '<div class="notice">Media library is empty.</div>';

    } catch (error) {
      list.innerHTML = `<div class="notice">${escapeHtml(error.message)}</div>`;
    }
  }

  $('uploadMedia')?.addEventListener('click', uploadMedia);


  /* =========================================================
     10. ROYAL AI ASSISTANT
     ========================================================= */

  async function runAI(mode) {
    const prompt = $('aiPrompt')?.value.trim();
    const resultBox = $('aiResult');

    if (!prompt) {
      if (resultBox) resultBox.value = 'Please write a request first.';
      return;
    }

    if (resultBox) resultBox.value = 'Royal AI is working...';

    try {
      const result = await api('/api/ai', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          mode,
          language: document.documentElement.lang || 'en',
          text: prompt
        })
      });

      if (resultBox) {
        resultBox.value = result.result || 'No result returned.';
      }

    } catch (error) {
      if (resultBox) resultBox.value = error.message;
    }
  }

  $$('[data-ai]').forEach(button => {
    button.addEventListener('click', () => {
      runAI(button.dataset.ai);
    });
  });


  /* =========================================================
     11. LOAD ADMIN DATA
     ========================================================= */

  async function loadAdminData() {
    await loadTheme();
    await loadContent();
    await loadMedia();
  }


  /* =========================================================
     12. SAFE HTML OUTPUT
     ========================================================= */

  function escapeHtml(value) {
    return String(value ?? '')
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }


  /* =========================================================
     13. FOOTER YEAR
     ========================================================= */

  if ($('year')) {
    $('year').textContent = new Date().getFullYear();
  }


  /* =========================================================
     14. WHATSAPP
     ========================================================= */

  const waLink = $('waLink');

  if (waLink) {
    waLink.addEventListener('click', () => {
      // The actual production WhatsApp number can be changed in index.html.
    });
  }


  /* =========================================================
     15. LOCAL THEME FALLBACK
     ========================================================= */

  try {
    const localTheme = localStorage.getItem('rcpn_theme');

    if (localTheme) {
      applyTheme(JSON.parse(localTheme));
    }
  } catch {
    // Ignore invalid local theme.
  }


  /* =========================================================
     16. ACCESSIBILITY
     ========================================================= */

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      $('langMenu')?.classList.remove('open');
      $('langBtn')?.setAttribute('aria-expanded', 'false');
    }
  });

});
