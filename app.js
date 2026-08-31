document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* =========================================================
     ROYAL CHILGHOZA PINE NUTS
     APP.JS — Multilingual + CMS + AI + Media Foundation
     ========================================================= */

  const $ = (id) => document.getElementById(id);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  /* =========================================================
     1. LANGUAGE SYSTEM — 9 LANGUAGES
     ========================================================= */

  const languages = [
    { code: 'en', name: 'English', dir: 'ltr' },
    { code: 'zh', name: '中文', dir: 'ltr' },
    { code: 'ur', name: 'اردو', dir: 'rtl' },
    { code: 'ps', name: 'پښتو', dir: 'rtl' },
    { code: 'fa', name: 'دری / فارسی', dir: 'rtl' },
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
      back: 'Back',

      eyebrow: 'PAKISTAN • ORIGIN • GLOBAL',
      heroCopy:
        'From the Chilghoza forests of Pakistan to the world — connecting premium quality, authentic origin, responsible supply chains and deep knowledge.',
      tradeKicker: 'CHILGHOZA PINE NUTS',
      globalTrade: 'GLOBAL TRADE',
      tradeSub: 'Premium quality • Worldwide export →',
      researchKicker: 'CHILGHOZA',
      researchTitle: 'RESEARCH & KNOWLEDGE',
      researchSub: 'Science • Origin • Forests • Quality →',

      profileKicker: 'CHILGHOZA • PEOPLE • PARTNERSHIP',
      profileTitle: 'Chilghoza Pine Nuts',
      profileCopy:
        'Knowledge, trade, forests and environmental stewardship in one platform.',

      aiKicker: 'THE NEXT GENERATION',
      aiCopy:
        'Human knowledge first. AI assistance second. Use AI to improve writing, summarize research, support buyers and translate content — with human review before publishing.',
      openAI: 'Open AI & Admin →',

      mediaKicker: 'ORIGINAL COLLECTION',
      mediaTitle: 'From Forest to Market',
      mediaCopy:
        'Only supplied original project photographs are used. Each image can receive an editable title, description, caption and category from Admin.',

      tradeKickerLong: 'GLOBAL TRADE • QUALITY • MARKETS • SUPPLY',
      tradeIntro:
        'A structured international trade centre for product quality, export readiness, buyers, logistics and responsible supply-chain information.',

      researchKickerLong: 'SCIENCE • ORIGIN • FORESTS • QUALITY',
      researchIntro:
        'A knowledge centre for Chilghoza origin, geographical indication, forests, biodiversity, climate, natural claims, nutrition, processing and traceability.',

      waCopy:
        'Direct business, purchasing, research collaboration and general contact.',

      adminTitle: 'Admin Control Center',
      adminIntro:
        'Secure content control, media, users, permissions, versions, themes and AI assistance. Ordinary content and theme changes are designed to work without redeployment.',

      loginTitle: 'Admin Login',
      loginCopy: 'Sign in to manage content and website settings.',
      username: 'Username',
      password: 'Password',
      login: 'Login',

      cmsTitle: 'Content',
      cmsCopy: 'Add, edit, delete, draft, preview and publish website content.',
      mediaAdminTitle: 'Media',
      mediaAdminCopy: 'Store images, videos and PDFs with editable metadata.',
      usersTitle: 'Users & Permissions',
      usersCopy: 'Roles, permissions, sessions and audit records.',
      aiAdminCopy: 'Royal AI assistance with human review.',

      themeTitle: 'Theme Studio',
      themeCopy:
        'Change the visual system without redeployment. Theme values can be saved in D1 when the backend is connected.',
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
      addressText:
        'Pakistan • Address, phone, email and WhatsApp details are editable from Admin.'
    },

    zh: {
      skip: '跳转到主要内容',
      home: '首页',
      trade: '贸易与商业',
      research: '研究与知识',
      whatsapp: 'WhatsApp',
      adminDemo: '管理',
      back: '返回',
      eyebrow: '巴基斯坦 • 原产地 • 全球',
      heroCopy: '从巴基斯坦的松子森林走向世界，连接卓越品质、真实产地、负责任的供应链与专业知识。',
      tradeKicker: '智利松子',
      globalTrade: '全球贸易',
      tradeSub: '优质产品 • 全球出口 →',
      researchKicker: '松子',
      researchTitle: '研究与知识',
      researchSub: '科学 • 原产地 • 森林 • 品质 →',
      profileKicker: '松子 • 人民 • 合作',
      profileTitle: '智利松子',
      profileCopy: '在一个平台连接知识、贸易、森林与环境保护。',
      aiKicker: '下一代',
      aiCopy: '以人类知识为先，以人工智能辅助为后。用于文字优化、研究总结、买家支持和翻译，并在发布前进行人工审核。',
      openAI: '打开 AI 与管理 →',
      mediaKicker: '原始收藏',
      mediaTitle: '从森林到市场',
      mediaCopy: '仅使用项目提供的原始照片，并可通过管理后台编辑标题、描述、说明和分类。',
      tradeKickerLong: '全球贸易 • 品质 • 市场 • 供应',
      tradeIntro: '为产品质量、出口准备、买家、物流和负责任供应链提供结构化国际贸易中心。',
      researchKickerLong: '科学 • 原产地 • 森林 • 品质',
      researchIntro: '关于松子原产地、地理标志、森林、生物多样性、气候、天然产品、营养、加工和追溯的知识中心。',
      waCopy: '商务、采购、研究合作及一般联系。',
      adminTitle: '管理控制中心',
      adminIntro: '安全管理内容、媒体、用户、权限、版本、主题和 AI。',
      loginTitle: '管理员登录',
      loginCopy: '登录以管理内容和网站设置。',
      username: '用户名',
      password: '密码',
      login: '登录',
      cmsTitle: '内容',
      cmsCopy: '添加、编辑、删除、保存草稿、预览和发布内容。',
      mediaAdminTitle: '媒体',
      mediaAdminCopy: '保存图片、视频和 PDF，并编辑其信息。',
      usersTitle: '用户与权限',
      usersCopy: '角色、权限、会话和审计记录。',
      aiAdminCopy: 'Royal AI 智能助手，发布前人工审核。',
      themeTitle: '主题工作室',
      themeCopy: '无需重新部署即可调整视觉系统。',
      saveTheme: '保存主题',
      resetTheme: '重置',
      contentEditor: '内容编辑器',
      saveContent: '保存草稿',
      aiTools: 'Royal AI 助手',
      aiPlaceholder: '请输入 AI 助手请求……',
      improve: '优化文字',
      summary: '总结',
      buyer: '买家介绍',
      translate: '翻译',
      securityTitle: '安全与运营',
      addressKicker: '联系 • 办公室 • 合作',
      addressTitle: '办公地址',
      addressText: '巴基斯坦 • 地址、电话、邮箱和 WhatsApp 信息可通过管理后台编辑。'
    },

    ur: {
      skip: 'مرکزی مواد پر جائیں',
      home: 'ہوم',
      trade: 'تجارت و کاروبار',
      research: 'تحقیق و معلومات',
      whatsapp: 'واٹس ایپ',
      adminDemo: 'ایڈمن',
      back: 'واپس',
      eyebrow: 'پاکستان • اصل • عالمی',
      heroCopy: 'پاکستان کے چلغوزہ جنگلات سے دنیا تک — اعلیٰ معیار، مستند اصل، ذمہ دار سپلائی چین اور علم کو ایک پلیٹ فارم پر جوڑتے ہوئے۔',
      tradeKicker: 'چلغوزہ پائن نٹس',
      globalTrade: 'عالمی تجارت',
      tradeSub: 'اعلیٰ معیار • دنیا بھر میں برآمد →',
      researchKicker: 'چلغوزہ',
      researchTitle: 'تحقیق و معلومات',
      researchSub: 'سائنس • اصل • جنگلات • معیار →',
      profileKicker: 'چلغوزہ • لوگ • شراکت',
      profileTitle: 'چلغوزہ پائن نٹس',
      profileCopy: 'علم، تجارت، جنگلات اور ماحولیاتی ذمہ داری ایک پلیٹ فارم پر۔',
      aiKicker: 'اگلی نسل',
      aiCopy: 'انسانی علم پہلے، AI معاونت بعد میں۔ تحریر بہتر کرنے، تحقیق کا خلاصہ، خریداروں کی معاونت اور ترجمہ کے لیے AI استعمال کریں — اشاعت سے پہلے انسانی جائزہ ضروری ہے۔',
      openAI: 'AI اور ایڈمن کھولیں →',
      mediaKicker: 'اصل مجموعہ',
      mediaTitle: 'جنگل سے مارکیٹ تک',
      mediaCopy: 'صرف فراہم کردہ اصل تصاویر استعمال کی جاتی ہیں۔ ایڈمن سے ہر تصویر کا عنوان، تفصیل، کیپشن اور زمرہ تبدیل کیا جا سکتا ہے۔',
      tradeKickerLong: 'عالمی تجارت • معیار • مارکیٹس • سپلائی',
      tradeIntro: 'مصنوعات کے معیار، برآمدی تیاری، خریداروں، لاجسٹکس اور ذمہ دار سپلائی چین کے لیے عالمی تجارتی مرکز۔',
      researchKickerLong: 'سائنس • اصل • جنگلات • معیار',
      researchIntro: 'چلغوزہ اصل، جغرافیائی نشان، جنگلات، حیاتیاتی تنوع، موسمیاتی تبدیلی، قدرتی مصنوعات، غذائیت، پروسیسنگ اور ٹریس ایبلٹی کا معلوماتی مرکز۔',
      waCopy: 'براہ راست کاروباری، خریداری، تحقیقی تعاون اور عمومی رابطہ۔',
      adminTitle: 'ایڈمن کنٹرول سینٹر',
      adminIntro: 'مواد، میڈیا، صارفین، اجازتوں، ورژنز، تھیم اور AI کی محفوظ مینجمنٹ۔ عام مواد اور تھیم کی تبدیلی کے لیے دوبارہ ویب سائٹ deploy کرنے کی ضرورت نہیں ہونی چاہیے۔',
      loginTitle: 'ایڈمن لاگ اِن',
      loginCopy: 'مواد اور ویب سائٹ سیٹنگز مینج کرنے کے لیے لاگ اِن کریں۔',
      username: 'صارف نام',
      password: 'پاس ورڈ',
      login: 'لاگ اِن',
      cmsTitle: 'مواد',
      cmsCopy: 'ویب سائٹ کے مواد کو شامل، تبدیل، حذف، ڈرافٹ، پری ویو اور شائع کریں۔',
      mediaAdminTitle: 'میڈیا',
      mediaAdminCopy: 'تصاویر، ویڈیوز اور PDF فائلیں محفوظ کریں اور ان کی معلومات تبدیل کریں۔',
      usersTitle: 'صارفین اور اجازتیں',
      usersCopy: 'رولز، اجازتیں، سیشن اور آڈٹ ریکارڈ۔',
      aiAdminCopy: 'Royal AI معاون، انسانی جائزے کے ساتھ۔',
      themeTitle: 'تھیم اسٹوڈیو',
      themeCopy: 'بغیر دوبارہ deploy کیے ویب سائٹ کے رنگ اور ظاہری انداز تبدیل کریں۔',
      saveTheme: 'تھیم محفوظ کریں',
      resetTheme: 'ری سیٹ',
      contentEditor: 'مواد ایڈیٹر',
      saveContent: 'ڈرافٹ محفوظ کریں',
      aiTools: 'Royal AI معاون',
      aiPlaceholder: 'AI معاون کے لیے درخواست لکھیں...',
      improve: 'تحریر بہتر کریں',
      summary: 'خلاصہ',
      buyer: 'خریدار پریزنٹیشن',
      translate: 'ترجمہ',
      securityTitle: 'سیکیورٹی اور آپریشنز',
      addressKicker: 'رابطہ • دفتر • شراکت',
      addressTitle: 'دفتری پتہ',
      addressText: 'پاکستان • پتہ، فون، ای میل اور واٹس ایپ کی معلومات ایڈمن سے تبدیل کی جا سکتی ہیں۔'
    },

    ps: {
      skip: 'اصلي محتوا ته لاړ شئ',
      home: 'کور',
      trade: 'سوداګري او تجارت',
      research: 'څېړنه او پوهه',
      whatsapp: 'واټس اپ',
      adminDemo: 'اډمین',
      back: 'بېرته',
      eyebrow: 'پاکستان • اصليت • نړۍ',
      heroCopy: 'د پاکستان د چلغوزو له ځنګلونو څخه تر نړۍ پورې — لوړ کیفیت، اصليت، مسؤل اکمالاتي ځنځیر او پوهه سره نښلوي.',
      tradeKicker: 'چلغوزه',
      globalTrade: 'نړیوال تجارت',
      tradeSub: 'لوړ کیفیت • نړیوال صادرات →',
      researchKicker: 'چلغوزه',
      researchTitle: 'څېړنه او پوهه',
      researchSub: 'ساینس • اصليت • ځنګلونه • کیفیت →',
      profileKicker: 'چلغوزه • خلک • ملګرتیا',
      profileTitle: 'چلغوزه مغز',
      profileCopy: 'پوهه، تجارت، ځنګلونه او چاپېریالي مسؤلیت په یوه پلاتفورم کې.',
      aiKicker: 'راتلونکی نسل',
      aiCopy: 'انساني پوهه لومړی، د AI مرسته دوهمه. د لیکنې، څېړنې، پېرېدونکو او ژباړې لپاره AI وکاروئ؛ له خپرېدو مخکې انساني کتنه ضروري ده.',
      openAI: 'AI او اډمین →',
      mediaKicker: 'اصلي ټولګه',
      mediaTitle: 'له ځنګله تر بازار',
      mediaCopy: 'یوازې اصلي پروژې انځورونه کارول کېږي او د اډمین له لارې یې عنوان، تشریح، کیپشن او کټګوري بدلول کېدای شي.',
      tradeKickerLong: 'نړیوال تجارت • کیفیت • بازارونه • عرضه',
      tradeIntro: 'د کیفیت، صادراتو، پېرېدونکو، لوژستیک او مسؤل اکمالاتي ځنځیر لپاره نړیوال سوداګریز مرکز.',
      researchKickerLong: 'ساینس • اصليت • ځنګلونه • کیفیت',
      researchIntro: 'د چلغوزو اصليت، جغرافیایي نښه، ځنګلونو، تنوع، اقلیم، طبیعي محصولاتو، تغذیې، پروسس او تعقیب مرکز.',
      waCopy: 'مستقیم کاروباري، پېرود، څېړنیز همکاری او عمومي اړیکه.',
      adminTitle: 'د اډمین کنټرول مرکز',
      adminIntro: 'د محتوا، رسنیو، کاروونکو، اجازو، نسخو، موضوع او AI خوندي مدیریت.',
      loginTitle: 'اډمین ننوتل',
      loginCopy: 'د محتوا او ویبپاڼې تنظیماتو لپاره ننوتل.',
      username: 'کارن نوم',
      password: 'پټ نوم',
      login: 'ننوتل',
      cmsTitle: 'محتوا',
      cmsCopy: 'محتوا اضافه، بدله، حذف، مسوده، کتنه او خپرول.',
      mediaAdminTitle: 'رسنۍ',
      mediaAdminCopy: 'انځورونه، ویډیوګانې او PDF فایلونه خوندي کړئ.',
      usersTitle: 'کاروونکي او اجازې',
      usersCopy: 'رولونه، اجازې، ناستې او د پلټنې ریکارډونه.',
      aiAdminCopy: 'Royal AI مرسته، د انسان له کتنې سره.',
      themeTitle: 'Theme Studio',
      themeCopy: 'د بیا deploy پرته د ویبپاڼې ظاهري رنګونه بدل کړئ.',
      saveTheme: 'موضوع خوندي کړئ',
      resetTheme: 'بیا تنظیم',
      contentEditor: 'د محتوا ایډیټر',
      saveContent: 'مسوده خوندي کړئ',
      aiTools: 'Royal AI مرسته',
      aiPlaceholder: 'د AI لپاره خپله غوښتنه ولیکئ...',
      improve: 'لیکنه ښه کړئ',
      summary: 'لنډیز',
      buyer: 'پېرېدونکي ته وړاندې کول',
      translate: 'ژباړه',
      securityTitle: 'امنیت او عملیات',
      addressKicker: 'اړیکه • دفتر • ملګرتیا',
      addressTitle: 'د دفتر پته',
      addressText: 'پاکستان • پته، ټیلیفون، ایمیل او واټس اپ د اډمین له لارې بدلیدای شي.'
    },

    fa: {
      skip: 'رفتن به محتوای اصلی',
      home: 'خانه',
      trade: 'تجارت و کسب‌وکار',
      research: 'پژوهش و دانش',
      whatsapp: 'واتساپ',
      adminDemo: 'مدیریت',
      back: 'بازگشت',
      eyebrow: 'پاکستان • خاستگاه • جهانی',
      heroCopy: 'از جنگل‌های چلغوزه پاکستان تا جهان — پیوند کیفیت ممتاز، خاستگاه اصیل، زنجیره تأمین مسئولانه و دانش.',
      tradeKicker: 'چلغوزه',
      globalTrade: 'تجارت جهانی',
      tradeSub: 'کیفیت ممتاز • صادرات جهانی →',
      researchKicker: 'چلغوزه',
      researchTitle: 'پژوهش و دانش',
      researchSub: 'علم • خاستگاه • جنگل‌ها • کیفیت →',
      profileKicker: 'چلغوزه • مردم • همکاری',
      profileTitle: 'چلغوزه',
      profileCopy: 'دانش، تجارت، جنگل‌ها و حفاظت محیط زیست در یک پلتفرم.',
      aiKicker: 'نسل آینده',
      aiCopy: 'دانش انسانی در اولویت، کمک هوش مصنوعی در مرحله دوم. برای بهبود نوشتار، خلاصه‌سازی پژوهش، پشتیبانی خریداران و ترجمه؛ با بررسی انسانی پیش از انتشار.',
      openAI: 'AI و مدیریت →',
      mediaKicker: 'مجموعه اصلی',
      mediaTitle: 'از جنگل تا بازار',
      mediaCopy: 'فقط تصاویر اصلی پروژه استفاده می‌شود و اطلاعات آن‌ها از بخش مدیریت قابل ویرایش است.',
      tradeKickerLong: 'تجارت جهانی • کیفیت • بازار • تأمین',
      tradeIntro: 'مرکز تجارت بین‌المللی برای کیفیت محصول، آمادگی صادرات، خریداران، لجستیک و زنجیره تأمین مسئولانه.',
      researchKickerLong: 'علم • خاستگاه • جنگل‌ها • کیفیت',
      researchIntro: 'مرکز دانش درباره خاستگاه چلغوزه، نشانه جغرافیایی، جنگل‌ها، تنوع زیستی، اقلیم، محصولات طبیعی، تغذیه، فرآوری و رهگیری.',
      waCopy: 'ارتباط مستقیم تجاری، خرید، همکاری پژوهشی و تماس عمومی.',
      adminTitle: 'مرکز کنترل مدیریت',
      adminIntro: 'مدیریت امن محتوا، رسانه، کاربران، دسترسی‌ها، نسخه‌ها، تم و هوش مصنوعی.',
      loginTitle: 'ورود مدیر',
      loginCopy: 'برای مدیریت محتوا و تنظیمات وارد شوید.',
      username: 'نام کاربری',
      password: 'رمز عبور',
      login: 'ورود',
      cmsTitle: 'محتوا',
      cmsCopy: 'افزودن، ویرایش، حذف، پیش‌نویس، پیش‌نمایش و انتشار.',
      mediaAdminTitle: 'رسانه',
      mediaAdminCopy: 'ذخیره تصاویر، ویدیوها و PDF با اطلاعات قابل ویرایش.',
      usersTitle: 'کاربران و دسترسی‌ها',
      usersCopy: 'نقش‌ها، دسترسی‌ها، نشست‌ها و سوابق.',
      aiAdminCopy: 'دستیار Royal AI با بررسی انسانی.',
      themeTitle: 'استودیو تم',
      themeCopy: 'تغییر ظاهر بدون استقرار مجدد.',
      saveTheme: 'ذخیره تم',
      resetTheme: 'بازنشانی',
      contentEditor: 'ویرایشگر محتوا',
      saveContent: 'ذخیره پیش‌نویس',
      aiTools: 'دستیار Royal AI',
      aiPlaceholder: 'درخواست خود را برای دستیار بنویسید...',
      improve: 'بهبود نوشتار',
      summary: 'خلاصه',
      buyer: 'ارائه به خریدار',
      translate: 'ترجمه',
      securityTitle: 'امنیت و عملیات',
      addressKicker: 'تماس • دفتر • همکاری',
      addressTitle: 'آدرس دفتر',
      addressText: 'پاکستان • آدرس، تلفن، ایمیل و واتساپ از مدیریت قابل ویرایش است.'
    },

    ru: {
      skip: 'Перейти к основному содержанию',
      home: 'Главная',
      trade: 'Торговля и бизнес',
      research: 'Исследования и знания',
      whatsapp: 'WhatsApp',
      adminDemo: 'Админ',
      back: 'Назад',
      eyebrow: 'ПАКИСТАН • ПРОИСХОЖДЕНИЕ • МИР',
      heroCopy: 'От лесов чильгозы Пакистана к миру — премиальное качество, подлинное происхождение, ответственная цепочка поставок и знания.',
      tradeKicker: 'ЧИЛЬГОЗА',
      globalTrade: 'МИРОВАЯ ТОРГОВЛЯ',
      tradeSub: 'Премиальное качество • Экспорт →',
      researchKicker: 'ЧИЛЬГОЗА',
      researchTitle: 'ИССЛЕДОВАНИЯ И ЗНАНИЯ',
      researchSub: 'Наука • Происхождение • Леса • Качество →',
      profileKicker: 'ЧИЛЬГОЗА • ЛЮДИ • ПАРТНЁРСТВО',
      profileTitle: 'Чильгоза',
      profileCopy: 'Знания, торговля, леса и забота об окружающей среде на одной платформе.',
      aiKicker: 'НОВОЕ ПОКОЛЕНИЕ',
      aiCopy: 'Сначала человеческие знания, затем помощь ИИ. Улучшение текста, исследования, поддержка покупателей и перевод — с проверкой человеком перед публикацией.',
      openAI: 'AI и Админ →',
      mediaKicker: 'ОРИГИНАЛЬНАЯ КОЛЛЕКЦИЯ',
      mediaTitle: 'От леса до рынка',
      mediaCopy: 'Используются только оригинальные фотографии проекта. Метаданные можно редактировать через Админ.',
      tradeKickerLong: 'МИРОВАЯ ТОРГОВЛЯ • КАЧЕСТВО • РЫНКИ • ПОСТАВКИ',
      tradeIntro: 'Международный торговый центр для качества продукции, экспорта, покупателей, логистики и ответственной цепочки поставок.',
      researchKickerLong: 'НАУКА • ПРОИСХОЖДЕНИЕ • ЛЕСА • КАЧЕСТВО',
      researchIntro: 'Центр знаний о происхождении чильгозы, географическом указании, лесах, биоразнообразии, климате, натуральных продуктах, питании, переработке и отслеживании.',
      waCopy: 'Прямые деловые, закупочные, исследовательские и общие контакты.',
      adminTitle: 'Центр управления',
      adminIntro: 'Безопасное управление контентом, медиа, пользователями, правами, версиями, темами и AI.',
      loginTitle: 'Вход администратора',
      loginCopy: 'Войдите для управления контентом и настройками.',
      username: 'Имя пользователя',
      password: 'Пароль',
      login: 'Войти',
      cmsTitle: 'Контент',
      cmsCopy: 'Добавление, редактирование, удаление, черновики, просмотр и публикация.',
      mediaAdminTitle: 'Медиа',
      mediaAdminCopy: 'Изображения, видео и PDF с редактируемыми данными.',
      usersTitle: 'Пользователи и права',
      usersCopy: 'Роли, права, сессии и аудит.',
      aiAdminCopy: 'Royal AI с проверкой человеком.',
      themeTitle: 'Студия тем',
      themeCopy: 'Изменяйте визуальную систему без повторного развёртывания.',
      saveTheme: 'Сохранить тему',
      resetTheme: 'Сбросить',
      contentEditor: 'Редактор контента',
      saveContent: 'Сохранить черновик',
      aiTools: 'Royal AI Assistant',
      aiPlaceholder: 'Введите запрос для AI...',
      improve: 'Улучшить текст',
      summary: 'Сводка',
      buyer: 'Презентация покупателю',
      translate: 'Перевести',
      securityTitle: 'Безопасность и операции',
      addressKicker: 'КОНТАКТ • ОФИС • ПАРТНЁРСТВО',
      addressTitle: 'Адрес офиса',
      addressText: 'Пакистан • Адрес, телефон, email и WhatsApp можно изменить через Админ.'
    },

    id: {
      skip: 'Lewati ke konten utama',
      home: 'Beranda',
      trade: 'Perdagangan & Bisnis',
      research: 'Riset & Pengetahuan',
      whatsapp: 'WhatsApp',
      adminDemo: 'Admin',
      back: 'Kembali',
      eyebrow: 'PAKISTAN • ASAL • GLOBAL',
      heroCopy: 'Dari hutan chilghoza Pakistan ke dunia — menghubungkan kualitas premium, asal autentik, rantai pasok bertanggung jawab dan pengetahuan.',
      tradeKicker: 'KACANG PINUS CHILGHOZA',
      globalTrade: 'PERDAGANGAN GLOBAL',
      tradeSub: 'Kualitas premium • Ekspor dunia →',
      researchKicker: 'CHILGHOZA',
      researchTitle: 'RISET & PENGETAHUAN',
      researchSub: 'Sains • Asal • Hutan • Kualitas →',
      profileKicker: 'CHILGHOZA • MASYARAKAT • KEMITRAAN',
      profileTitle: 'Kacang Pinus Chilghoza',
      profileCopy: 'Pengetahuan, perdagangan, hutan dan kepedulian lingkungan dalam satu platform.',
      aiKicker: 'GENERASI BERIKUTNYA',
      aiCopy: 'Pengetahuan manusia terlebih dahulu, bantuan AI kemudian. Untuk tulisan, riset, pembeli dan terjemahan — dengan tinjauan manusia sebelum publikasi.',
      openAI: 'Buka AI & Admin →',
      mediaKicker: 'KOLEKSI ASLI',
      mediaTitle: 'Dari Hutan ke Pasar',
      mediaCopy: 'Hanya foto proyek asli yang digunakan. Metadata dapat diedit melalui Admin.',
      tradeKickerLong: 'PERDAGANGAN GLOBAL • KUALITAS • PASAR • PASOKAN',
      tradeIntro: 'Pusat perdagangan internasional untuk kualitas produk, ekspor, pembeli, logistik dan rantai pasok bertanggung jawab.',
      researchKickerLong: 'SAINS • ASAL • HUTAN • KUALITAS',
      researchIntro: 'Pusat pengetahuan tentang asal chilghoza, indikasi geografis, hutan, biodiversitas, iklim, produk alami, nutrisi, pengolahan dan keterlacakan.',
      waCopy: 'Kontak bisnis, pembelian, kolaborasi riset dan umum.',
      adminTitle: 'Pusat Kontrol Admin',
      adminIntro: 'Kelola konten, media, pengguna, izin, versi, tema dan AI dengan aman.',
      loginTitle: 'Login Admin',
      loginCopy: 'Masuk untuk mengelola konten dan pengaturan.',
      username: 'Nama pengguna',
      password: 'Kata sandi',
      login: 'Masuk',
      cmsTitle: 'Konten',
      cmsCopy: 'Tambah, edit, hapus, draf, pratinjau dan publikasi.',
      mediaAdminTitle: 'Media',
      mediaAdminCopy: 'Simpan gambar, video dan PDF dengan metadata yang dapat diedit.',
      usersTitle: 'Pengguna & Izin',
      usersCopy: 'Peran, izin, sesi dan audit.',
      aiAdminCopy: 'Royal AI dengan tinjauan manusia.',
      themeTitle: 'Theme Studio',
      themeCopy: 'Ubah tampilan tanpa deployment ulang.',
      saveTheme: 'Simpan Tema',
      resetTheme: 'Reset',
      contentEditor: 'Editor Konten',
      saveContent: 'Simpan Draf',
      aiTools: 'Royal AI Assistant',
      aiPlaceholder: 'Tulis permintaan untuk AI...',
      improve: 'Perbaiki Tulisan',
      summary: 'Ringkas',
      buyer: 'Presentasi Pembeli',
      translate: 'Terjemahkan',
      securityTitle: 'Keamanan & Operasi',
      addressKicker: 'KONTAK • KANTOR • KEMITRAAN',
      addressTitle: 'Alamat Kantor',
      addressText: 'Pakistan • Alamat, telepon, email dan WhatsApp dapat diedit dari Admin.'
    },

    ms: {
      skip: 'Langkau ke kandungan utama',
      home: 'Utama',
      trade: 'Perdagangan & Perniagaan',
      research: 'Penyelidikan & Pengetahuan',
      whatsapp: 'WhatsApp',
      adminDemo: 'Admin',
      back: 'Kembali',
      eyebrow: 'PAKISTAN • ASAL • GLOBAL',
      heroCopy: 'Dari hutan chilghoza Pakistan ke dunia — menghubungkan kualiti premium, asal tulen, rantaian bekalan bertanggungjawab dan pengetahuan.',
      tradeKicker: 'KACANG PINE CHILGHOZA',
      globalTrade: 'PERDAGANGAN GLOBAL',
      tradeSub: 'Kualiti premium • Eksport seluruh dunia →',
      researchKicker: 'CHILGHOZA',
      researchTitle: 'PENYELIDIKAN & PENGETAHUAN',
      researchSub: 'Sains • Asal • Hutan • Kualiti →',
      profileKicker: 'CHILGHOZA • MASYARAKAT • KERJASAMA',
      profileTitle: 'Kacang Pine Chilghoza',
      profileCopy: 'Pengetahuan, perdagangan, hutan dan penjagaan alam sekitar dalam satu platform.',
      aiKicker: 'GENERASI SETERUSNYA',
      aiCopy: 'Pengetahuan manusia dahulu, bantuan AI kemudian. Untuk penulisan, penyelidikan, pembeli dan terjemahan — dengan semakan manusia sebelum penerbitan.',
      openAI: 'Buka AI & Admin →',
      mediaKicker: 'KOLEKSI ASAL',
      mediaTitle: 'Dari Hutan ke Pasaran',
      mediaCopy: 'Hanya foto projek asal digunakan. Maklumat boleh diedit melalui Admin.',
      tradeKickerLong: 'PERDAGANGAN GLOBAL • KUALITI • PASARAN • BEKALAN',
      tradeIntro: 'Pusat perdagangan antarabangsa untuk kualiti produk, eksport, pembeli, logistik dan rantaian bekalan bertanggungjawab.',
      researchKickerLong: 'SAINS • ASAL • HUTAN • KUALITI',
      researchIntro: 'Pusat pengetahuan mengenai asal chilghoza, petunjuk geografi, hutan, biodiversiti, iklim, produk semula jadi, pemakanan, pemprosesan dan kebolehkesanan.',
      waCopy: 'Hubungan perniagaan, pembelian, kerjasama penyelidikan dan umum.',
      adminTitle: 'Pusat Kawalan Admin',
      adminIntro: 'Urus kandungan, media, pengguna, kebenaran, versi, tema dan AI dengan selamat.',
      loginTitle: 'Log Masuk Admin',
      loginCopy: 'Log masuk untuk mengurus kandungan dan tetapan.',
      username: 'Nama pengguna',
      password: 'Kata laluan',
      login: 'Log Masuk',
      cmsTitle: 'Kandungan',
      cmsCopy: 'Tambah, edit, padam, draf, pratonton dan terbitkan.',
      mediaAdminTitle: 'Media',
      mediaAdminCopy: 'Simpan gambar, video dan PDF dengan metadata boleh edit.',
      usersTitle: 'Pengguna & Kebenaran',
      usersCopy: 'Peranan, kebenaran, sesi dan audit.',
      aiAdminCopy: 'Royal AI dengan semakan manusia.',
      themeTitle: 'Theme Studio',
      themeCopy: 'Ubah rupa tanpa deployment semula.',
      saveTheme: 'Simpan Tema',
      resetTheme: 'Tetapkan Semula',
      contentEditor: 'Editor Kandungan',
      saveContent: 'Simpan Draf',
      aiTools: 'Royal AI Assistant',
      aiPlaceholder: 'Tulis permintaan untuk AI...',
      improve: 'Baiki Penulisan',
      summary: 'Ringkaskan',
      buyer: 'Persembahan Pembeli',
      translate: 'Terjemah',
      securityTitle: 'Keselamatan & Operasi',
      addressKicker: 'HUBUNGI • PEJABAT • KERJASAMA',
      addressTitle: 'Alamat Pejabat',
      addressText: 'Pakistan • Alamat, telefon, email dan WhatsApp boleh diedit melalui Admin.'
    },

    ar: {
      skip: 'الانتقال إلى المحتوى الرئيسي',
      home: 'الرئيسية',
      trade: 'التجارة والأعمال',
      research: 'البحث والمعرفة',
      whatsapp: 'واتساب',
      adminDemo: 'الإدارة',
      back: 'رجوع',
      eyebrow: 'باكستان • المنشأ • عالمي',
      heroCopy: 'من غابات تشلغوزا في باكستان إلى العالم — نربط الجودة الممتازة والأصل الحقيقي وسلاسل التوريد المسؤولة والمعرفة.',
      tradeKicker: 'صنوبر تشلغوزا',
      globalTrade: 'التجارة العالمية',
      tradeSub: 'جودة ممتازة • تصدير عالمي →',
      researchKicker: 'تشلغوزا',
      researchTitle: 'البحث والمعرفة',
      researchSub: 'العلم • الأصل • الغابات • الجودة →',
      profileKicker: 'تشلغوزا • الناس • الشراكة',
      profileTitle: 'صنوبر تشلغوزا',
      profileCopy: 'المعرفة والتجارة والغابات وحماية البيئة في منصة واحدة.',
      aiKicker: 'الجيل القادم',
      aiCopy: 'المعرفة البشرية أولاً، ومساعدة الذكاء الاصطناعي ثانياً. لتحسين الكتابة وتلخيص الأبحاث ودعم المشترين والترجمة، مع مراجعة بشرية قبل النشر.',
      openAI: 'فتح AI والإدارة →',
      mediaKicker: 'المجموعة الأصلية',
      mediaTitle: 'من الغابة إلى السوق',
      mediaCopy: 'تُستخدم فقط الصور الأصلية للمشروع، ويمكن تعديل بياناتها من الإدارة.',
      tradeKickerLong: 'التجارة العالمية • الجودة • الأسواق • التوريد',
      tradeIntro: 'مركز تجارة دولي منظم لجودة المنتج والاستعداد للتصدير والمشترين والخدمات اللوجستية وسلسلة التوريد المسؤولة.',
      researchKickerLong: 'العلم • الأصل • الغابات • الجودة',
      researchIntro: 'مركز معرفة حول أصل تشلغوزا والمؤشر الجغرافي والغابات والتنوع البيولوجي والمناخ والمنتجات الطبيعية والتغذية والمعالجة والتتبع.',
      waCopy: 'للتواصل التجاري والشراء والتعاون البحثي والتواصل العام.',
      adminTitle: 'مركز تحكم الإدارة',
      adminIntro: 'إدارة آمنة للمحتوى والوسائط والمستخدمين والصلاحيات والإصدارات والسمات والذكاء الاصطناعي.',
      loginTitle: 'تسجيل دخول الإدارة',
      loginCopy: 'سجل الدخول لإدارة المحتوى وإعدادات الموقع.',
      username: 'اسم المستخدم',
      password: 'كلمة المرور',
      login: 'دخول',
      cmsTitle: 'المحتوى',
      cmsCopy: 'إضافة وتعديل وحذف وحفظ كمسودة ومعاينة ونشر المحتوى.',
      mediaAdminTitle: 'الوسائط',
      mediaAdminCopy: 'حفظ الصور والفيديو وملفات PDF مع بيانات قابلة للتعديل.',
      usersTitle: 'المستخدمون والصلاحيات',
      usersCopy: 'الأدوار والصلاحيات والجلسات وسجلات التدقيق.',
      aiAdminCopy: 'مساعد Royal AI مع مراجعة بشرية.',
      themeTitle: 'استوديو السمات',
      themeCopy: 'تغيير المظهر دون إعادة النشر.',
      saveTheme: 'حفظ السمة',
      resetTheme: 'إعادة ضبط',
      contentEditor: 'محرر المحتوى',
      saveContent: 'حفظ كمسودة',
      aiTools: 'مساعد Royal AI',
      aiPlaceholder: 'اكتب طلبك للمساعد...',
      improve: 'تحسين الكتابة',
      summary: 'تلخيص',
      buyer: 'عرض للمشتري',
      translate: 'ترجمة',
      securityTitle: 'الأمان والتشغيل',
      addressKicker: 'اتصال • مكتب • شراكة',
      addressTitle: 'عنوان المكتب',
      addressText: 'باكستان • يمكن تعديل العنوان والهاتف والبريد الإلكتروني وواتساب من الإدارة.'
    }
  };

  // Dari/Persian, Russian, Indonesian, Malay, Arabic are defined above.
  // Ensure every language falls back safely to English for any missing key.
  function t(key) {
    const lang = localStorage.getItem('rcpn_language') || 'en';
    return (translations[lang] && translations[lang][key]) ||
           translations.en[key] ||
           key;
  }

  function applyLanguage(code) {
    const lang = languages.find(x => x.code === code) || languages[0];

    document.documentElement.lang = lang.code;
    document.documentElement.dir = lang.dir;

    localStorage.setItem('rcpn_language', lang.code);

    $$('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (t(key)) el.textContent = t(key);
    });

    $$('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      el.placeholder = t(key);
    });

    const label = $('langLabel');
    if (label) label.textContent = lang.name;

    // Keep editable input direction natural.
    $$('input, textarea, select').forEach(el => {
      if (lang.dir === 'rtl') {
        el.style.direction = 'rtl';
      } else {
        el.style.direction = '';
      }
    });

    renderFolders('researchFolders', 'researchContent', researchData);
    renderFolders('tradeFolders', 'tradeContent', tradeData);
  }

  const langBtn = $('langBtn');
  const langMenu = $('langMenu');
  const langLabel = $('langLabel');

  if (langMenu) {
    langMenu.innerHTML = languages.map(lang => `
      <button
        type="button"
        class="lang-option"
        data-lang="${lang.code}"
        role="option"
        aria-label="${lang.name}">
        ${lang.name}
      </button>
    `).join('');
  }

  if (langBtn && langMenu) {
    langBtn.addEventListener('click', e => {
      e.stopPropagation();
      const open = langMenu.classList.toggle('open');
      langBtn.setAttribute('aria-expanded', String(open));
    });

    document.addEventListener('click', () => {
      langMenu.classList.remove('open');
      langBtn.setAttribute('aria-expanded', 'false');
    });

    $$('.lang-option', langMenu).forEach(option => {
      option.addEventListener('click', e => {
        e.stopPropagation();
        applyLanguage(option.dataset.lang);
        langMenu.classList.remove('open');
        langBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* =========================================================
     2. PAGE NAVIGATION + HISTORY
     ========================================================= */

  const pages = $$('.page');

  function showPage(pageId, push = true) {
    pages.forEach(page => page.classList.remove('active'));

    const target = $(pageId);
    if (!target) return;

    target.classList.add('active');

    if (push) {
      history.pushState(
        { page: pageId },
        '',
        `#${pageId}`
      );
    }

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  $$('[data-route]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const route = link.dataset.route;
      if (route) showPage(route);
    });
  });

  $$('[data-back]').forEach(button => {
    button.addEventListener('click', () => {
      if (history.length > 1 && location.hash) {
        history.back();
      } else {
        showPage('home', true);
      }
    });
  });

  window.addEventListener('popstate', () => {
    const id = location.hash.replace('#', '') || 'home';
    showPage(id, false);
  });

  const initialPage = location.hash.replace('#', '') || 'home';
  showPage(initialPage, false);

  /* =========================================================
     3. CORRECT IMAGE / FOLDER ORGANIZATION
     ========================================================= */

  const researchData = [
    {
      id: 'r1',
      num: '01',
      title: 'Geographical Indication (GI)',
      desc: 'Origin protection, product identity, traceability and GI evidence.',
      detail: 'Geographical origin, product identity, traceability and documentation related to the Chilghoza value chain.',
      images: [
        { file: '001.jpg', caption: 'GI / Origin Evidence' },
        { file: '002.jpg', caption: 'Origin & Traceability' },
        { file: '003.jpg', caption: 'Regional Forest Mapping' },
        { file: '004.jpg', caption: 'Product Identity & Certification' },
        { file: '005.jpg', caption: 'Supply Chain Evidence' }
      ]
    },

    {
      id: 'r2',
      num: '02',
      title: 'Chilghoza Forests',
      desc: 'Forest ecology, habitats, regeneration and conservation.',
      detail: 'Research and field evidence concerning Pinus gerardiana forests, habitats, regeneration and conservation.',
      images: [
        { file: '006.jpg', caption: 'Chilghoza Forest Landscape' },
        { file: '007.jpg', caption: 'Chilghoza Trees' },
        { file: '008.jpg', caption: 'Natural Regeneration' },
        { file: '009.jpg', caption: 'Mountain Forest Habitat' },
        { file: '010.jpg', caption: 'Forest Conservation' },
        { file: '011.jpg', caption: 'Community Forestry' }
      ]
    },

    {
      id: 'r3',
      num: '03',
      title: 'Global Environment & Climate',
      desc: 'Biodiversity, ecosystem services, climate and resilience.',
      detail: 'Environmental information concerning biodiversity, ecosystem services, climate pressures and resilience of Chilghoza landscapes.',
      images: [
        { file: '012.jpg', caption: 'Highland Biodiversity' },
        { file: '013.jpg', caption: 'Ecosystem Observation' },
        { file: '014.jpg', caption: 'Environmental Monitoring' },
        { file: '015.jpg', caption: 'Climate & Forest Landscape' },
        { file: '016.jpg', caption: 'Soil & Moisture Environment' }
      ]
    },

    {
      id: 'r4',
      num: '04',
      title: 'Natural Product & Quality Evidence',
      desc: 'Natural origin, testing, nutrition and product evidence.',
      detail: 'Evidence relating to natural origin, laboratory testing, nutritional information and product quality.',
      images: [
        { file: '017.jpg', caption: 'Laboratory / Quality Evidence' },
        { file: '018.jpg', caption: 'Natural Chilghoza Product' },
        { file: '019.jpg', caption: 'Product Purity Evidence' },
        { file: '020.jpg', caption: 'Natural Product Verification' },
        { file: '021.jpg', caption: 'Nutritional Information' }
      ]
    }
  ];

  const tradeData = [
    {
      id: 't1',
      num: '01',
      title: 'Chilghoza Varieties & Quality',
      desc: 'Product varieties, kernels, grading, size, moisture and quality.',
      detail: 'The product-focused area for Chilghoza varieties, kernels, shell characteristics, grading and quality specifications.',
      images: [
        { file: '022.jpg', caption: 'Chilghoza Kernel / مغز' },
        { file: '023.jpg', caption: 'Size & Grading' },
        { file: '024.jpg', caption: 'Moisture / Quality Check' },
        { file: '025.jpg', caption: 'Kernel Quality Inspection' },
        { file: '026.jpg', caption: 'Premium / Jumbo Chilghoza' }
      ]
    },

    {
      id: 't2',
      num: '02',
      title: 'Export & Logistics',
      desc: 'Packaging, storage, freight and export documentation.',
      detail: 'International export preparation, packaging, storage, freight, customs and logistics.',
      images: [
        { file: '027.jpg', caption: 'Export Packaging' },
        { file: '028.jpg', caption: 'Storage & Handling' },
        { file: '029.jpg', caption: 'Export Cartons' },
        { file: '030.jpg', caption: 'Customs / Export Documents' },
        { file: '031.jpg', caption: 'Shipment Dispatch' }
      ]
    },

    {
      id: 't3',
      num: '03',
      title: 'Markets & Pricing',
      desc: 'Markets, demand, commercial supply and price information.',
      detail: 'Commercial market information, seasonal supply, demand, trade activity and pricing intelligence.',
      images: [
        { file: '032.jpg', caption: 'Harvest / Market Supply' },
        { file: '033.jpg', caption: 'Chilghoza Cone Processing' },
        { file: '034.jpg', caption: 'Wholesale Product Stock' },
        { file: '035.jpg', caption: 'Regional Market Supply' },
        { file: '036.jpg', caption: 'International Trade Batch' }
      ]
    },

    {
      id: 't4',
      num: '04',
      title: 'Responsible Supply Chain',
      desc: 'Communities, harvesting, sourcing and responsible trade.',
      detail: 'Local communities, traditional harvesting, processing, procurement and responsible supply-chain practices.',
      images: [
        { file: '037.jpg', caption: 'Local Community Collection' },
        { file: '038.jpg', caption: 'Traditional Harvesting' },
        { file: '039.jpg', caption: 'Cone Drying' },
        { file: '040.jpg', caption: 'Manual De-shelling' },
        { file: '041.jpg', caption: 'Responsible Procurement' },
        { file: '042.jpg', caption: 'Sourcing Quality Check' },
        { file: '043.jpg', caption: 'Final Export Inspection' }
      ]
    }
  ];

  function escapeHTML(value) {
    return String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function createFolderImages(imagesList) {
    return `
      <div class="folder-gallery">
        ${imagesList.map(img => `
          <figure class="folder-media">
            <img
              src="${escapeHTML(img.file)}"
              alt="${escapeHTML(img.caption)}"
              loading="lazy"
            >
            <figcaption>${escapeHTML(img.caption)}</figcaption>
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
        <h3>${escapeHTML(item.title)}</h3>
        <p>${escapeHTML(item.desc)}</p>
      </article>
    `).join('');

    $$('.folder', grid).forEach(folder => {
      const open = () => {
        $$('.folder', grid).forEach(x => x.classList.remove('active'));
        folder.classList.add('active');

        const selected = data.find(
          x => x.id === folder.dataset.id
        );

        if (!selected) return;

        detail.innerHTML = `
          <div class="detail-box">
            <div class="eyebrow">${escapeHTML(selected.num)}</div>
            <h2>${escapeHTML(selected.title)}</h2>
            <p>${escapeHTML(selected.detail)}</p>
            <div class="detail-gallery-title">
              ${t('mediaKicker')}
            </div>
            ${createFolderImages(selected.images)}
          </div>
        `;

        detail.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest'
        });
      };

      folder.addEventListener('click', open);

      folder.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          open();
        }
      });
    });
  }

  /* =========================================================
     4. HOME ORIGINAL PHOTO COLLECTION
     ========================================================= */

  const allImages = [
    ...researchData.flatMap(folder => folder.images),
    ...tradeData.flatMap(folder => folder.images)
  ];

  function renderHomeGallery() {
    const gallery = $('homeGallery');
    if (!gallery) return;

    gallery.innerHTML = allImages.map(img => `
      <figure>
        <img
          src="${escapeHTML(img.file)}"
          alt="${escapeHTML(img.caption)}"
          loading="lazy"
        >
        <figcaption>${escapeHTML(img.caption)}</figcaption>
      </figure>
    `).join('');
  }

  renderHomeGallery();

  /* =========================================================
     5. ADMIN API
     ========================================================= */

  async function api(url, options = {}) {
    const response = await fetch(url, {
      credentials: 'same-origin',
      ...options
    });

    let data = {};
    try {
      data = await response.json();
    } catch (_) {}

    if (!response.ok) {
      throw new Error(data.error || `Request failed: ${response.status}`);
    }

    return data;
  }

  /* =========================================================
     6. ADMIN LOGIN
     ========================================================= */

  const loginBtn = $('loginBtn');
  const loginPanel = $('loginPanel');
  const adminPanel = $('adminPanel');
  const loginStatus = $('loginStatus');

  async function checkAuth() {
    if (!loginPanel || !adminPanel) return;

    try {
      const result = await api('/api/me');

      if (result.auth) {
        loginPanel.classList.add('hidden');
        adminPanel.classList.remove('hidden');
        loadAdminData();
      }
    } catch (_) {
      // Backend may not be connected yet.
    }
  }

  if (loginBtn) {
    loginBtn.addEventListener('click', async () => {
      const username = $('username')?.value.trim();
      const password = $('password')?.value || '';

      if (!username || !password) {
        if (loginStatus) {
          loginStatus.textContent = 'Please enter username and password.';
        }
        return;
      }

      loginBtn.disabled = true;

      try {
        const result = await api('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username,
            password
          })
        });

        if (loginStatus) {
          loginStatus.textContent = result.message || 'Signed in.';
        }

        loginPanel?.classList.add('hidden');
        adminPanel?.classList.remove('hidden');

        await loadAdminData();

      } catch (error) {
        if (loginStatus) {
          loginStatus.textContent = error.message || 'Login failed.';
        }
      } finally {
        loginBtn.disabled = false;
      }
    });
  }

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
    const value = {
      ...defaultTheme,
      ...(theme || {})
    };

    document.documentElement.style.setProperty('--bg', value.bg);
    document.documentElement.style.setProperty('--text', value.text);
    document.documentElement.style.setProperty('--accent', value.accent);
    document.documentElement.style.setProperty('--surface', value.surface);

    if ($('bgColor')) $('bgColor').value = value.bg;
    if ($('textColor')) $('textColor').value = value.text;
    if ($('accentColor')) $('accentColor').value = value.accent;
    if ($('surfaceColor')) $('surfaceColor').value = value.surface;
  }

  async function loadTheme() {
    try {
      const result = await api('/api/settings/theme');
      if (result.theme) {
        applyTheme(result.theme);
      }
    } catch (_) {
      applyTheme(defaultTheme);
    }
  }

  $('saveTheme')?.addEventListener('click', async () => {
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
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(theme)
      });

      const status = $('contentStatus');
      if (status) status.textContent = 'Theme saved successfully.';
    } catch (error) {
      const status = $('contentStatus');
      if (status) status.textContent = error.message;
    }
  });

  $('resetTheme')?.addEventListener('click', () => {
    applyTheme(defaultTheme);
  });

  /* =========================================================
     8. CONTENT EDITOR
     ========================================================= */

  $('saveContent')?.addEventListener('click', async () => {
    const section = $('editFolder')?.value || 'trade';
    const title = $('editTitle')?.value.trim();
    const description = $('editDescription')?.value.trim();

    if (!title) {
      if ($('contentStatus')) {
        $('contentStatus').textContent = 'Please enter a title.';
      }
      return;
    }

    try {
      await api('/api/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          section,
          title,
          description,
          status: 'draft'
        })
      });

      if ($('contentStatus')) {
        $('contentStatus').textContent = 'Draft saved successfully.';
      }

      $('editTitle').value = '';
      $('editDescription').value = '';

      loadContent();
    } catch (error) {
      if ($('contentStatus')) {
        $('contentStatus').textContent = error.message;
      }
    }
  });

  async function loadContent() {
    const list = $('contentList');
    if (!list) return;

    try {
      const result = await api('/api/content');

      list.innerHTML = (result.items || []).map(item => `
        <div class="content-item" data-content-id="${item.id}">
          <strong>${escapeHTML(item.title)}</strong>
          <div class="mini">
            ${escapeHTML(item.section)} •
            ${escapeHTML(item.status)}
          </div>
          <p>${escapeHTML(item.description)}</p>
          <button class="btn ghost delete-content" data-id="${item.id}">
            Delete
          </button>
        </div>
      `).join('');

      $$('.delete-content', list).forEach(button => {
        button.addEventListener('click', async () => {
          if (!confirm('Delete this content item?')) return;

          try {
            await api(`/api/content/${button.dataset.id}`, {
              method: 'DELETE'
            });
            loadContent();
          } catch (error) {
            alert(error.message);
          }
        });
      });

    } catch (_) {
      list.innerHTML = '';
    }
  }

  /* =========================================================
     9. MEDIA LIBRARY
     ========================================================= */

  $('uploadMedia')?.addEventListener('click', async () => {
    const file = $('mediaFile')?.files?.[0];

    if (!file) {
      if ($('mediaStatus')) {
        $('mediaStatus').textContent = 'Please select a file.';
      }
      return;
    }

    const fd = new FormData();

    fd.append('file', file);
    fd.append('title', $('mediaTitle')?.value || file.name);
    fd.append('description', $('mediaDescription')?.value || '');
    fd.append('caption', $('mediaCaption')?.value || '');
    fd.append('section', $('mediaSection')?.value || 'research');

    try {
      await api('/api/media', {
        method: 'POST',
        body: fd
      });

      if ($('mediaStatus')) {
        $('mediaStatus').textContent = 'Media uploaded successfully.';
      }

      $('mediaFile').value = '';
      $('mediaTitle').value = '';
      $('mediaDescription').value = '';
      $('mediaCaption').value = '';

      loadMedia();

    } catch (error) {
      if ($('mediaStatus')) {
        $('mediaStatus').textContent = error.message;
      }
    }
  });

  async function loadMedia() {
    const list = $('mediaList');
    if (!list) return;

    try {
      const result = await api('/api/media');

      list.innerHTML = (result.items || []).map(item => {
        const mediaURL =
          `/api/media/${encodeURIComponent(item.r2_key)}`;

        let preview = '';

        if (item.kind === 'image') {
          preview = `
            <img
              src="${mediaURL}"
              alt="${escapeHTML(item.title)}"
              loading="lazy"
            >
          `;
        } else if (item.kind === 'video') {
          preview = `
            <video
              src="${mediaURL}"
              controls
              preload="metadata">
            </video>
          `;
        } else {
          preview = `
            <a
              class="btn"
              href="${mediaURL}"
              target="_blank"
              rel="noopener">
              Open PDF
            </a>
          `;
        }

        return `
          <div class="media-item">
            ${preview}
            <strong>${escapeHTML(item.title)}</strong>
            <div class="mini">
              ${escapeHTML(item.section)}
            </div>
            <p>${escapeHTML(item.description)}</p>
            <small>${escapeHTML(item.caption)}</small>
            <br><br>
            <button
              class="btn ghost delete-media"
              data-id="${item.id}">
              Delete
            </button>
          </div>
        `;
      }).join('');

      $$('.delete-media', list).forEach(button => {
        button.addEventListener('click', async () => {
          if (!confirm('Delete this media item?')) return;

          try {
            await api(`/api/media/${button.dataset.id}`, {
              method: 'DELETE'
            });
            loadMedia();
          } catch (error) {
            alert(error.message);
          }
        });
      });

    } catch (_) {
      list.innerHTML = '';
    }
  }

  /* =========================================================
     10. ROYAL AI ASSISTANT
     ========================================================= */

  $$('[data-ai]').forEach(button => {
    button.addEventListener('click', async () => {
      const text = $('aiPrompt')?.value.trim();

      if (!text) {
        if ($('aiResult')) {
          $('aiResult').value = 'Please write a request first.';
        }
        return;
      }

      const mode = button.dataset.ai;
      const currentLanguage =
        localStorage.getItem('rcpn_language') || 'en';

      button.disabled = true;

      try {
        const result = await api('/api/ai', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            mode,
            language: currentLanguage,
            text
          })
        });

        if ($('aiResult')) {
          $('aiResult').value = result.result || '';
        }

      } catch (error) {
        if ($('aiResult')) {
          $('aiResult').value = error.message;
        }
      } finally {
        button.disabled = false;
      }
    });
  });

  /* =========================================================
     11. ADMIN DATA LOADER
     ========================================================= */

  async function loadAdminData() {
    await Promise.allSettled([
      loadTheme(),
      loadContent(),
      loadMedia()
    ]);
  }

  /* =========================================================
     12. FOOTER YEAR
     ========================================================= */

  if ($('year')) {
    $('year').textContent = new Date().getFullYear();
  }

  /* =========================================================
     13. INITIALIZE
     ========================================================= */

  const savedLanguage =
    localStorage.getItem('rcpn_language') || 'en';

  applyLanguage(savedLanguage);
  applyTheme(defaultTheme);
  checkAuth();

});
