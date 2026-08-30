const LANGS={
 en:['English','ltr'],zh:['中文','ltr'],ur:['اردو','rtl'],ps:['پښتو','rtl'],fa:['دری / فارسی','rtl'],ru:['Русский','ltr'],id:['Bahasa Indonesia','ltr'],ms:['Bahasa Melayu','ltr'],ar:['العربية','rtl']
};

const TEXT={
 en:{skip:'Skip to main content',home:'Home',trade:'Trade & Business',research:'Research & Knowledge',whatsapp:'WhatsApp',adminDemo:'Admin Demo',eyebrow:'PAKISTAN • ORIGIN • GLOBAL',heroCopy:'From the Chilghoza forests of Pakistan to the world — connecting premium quality, authentic origin, responsible supply chains and deep knowledge.',tradeKicker:'CHILGHOZA PINE NUTS',globalTrade:'GLOBAL TRADE',tradeSub:'Premium quality • Worldwide export →',researchKicker:'CHILGHOZA',researchTitle:'RESEARCH & KNOWLEDGE',researchSub:'Science • Origin • Forests • Quality →',profileKicker:'CHILGHOZA • PEOPLE • PARTNERSHIP',profileTitle:'Chilghoza Pine Nuts',profileCopy:'Knowledge, trade, forests and environmental stewardship in one platform.',aiKicker:'THE NEXT GENERATION',aiCopy:'Human knowledge first. AI assistance second. Use AI to improve writing, summarize research, support buyers and translate content — with human review before publishing.',openAI:'Open AI & Admin →',mediaKicker:'ORIGINAL COLLECTION',mediaTitle:'From Forest to Market',mediaCopy:'Only the supplied original project photographs are used. Each image can later receive an editable title, description, caption and category from Admin.',back:'Back',tradeKickerLong:'GLOBAL TRADE • QUALITY • MARKETS • SUPPLY',tradeIntro:'A structured international trade centre for product quality, export readiness, buyers, logistics and responsible supply-chain information.',researchKickerLong:'SCIENCE • ORIGIN • FORESTS • QUALITY',researchIntro:'A knowledge centre for Chilghoza origin, geographical indication, forests, biodiversity, climate, organic claims, nutrition, processing and traceability.',waCopy:'Direct business, purchasing, research collaboration and general contact.',adminTitle:'Admin Control Center',adminIntro:'Secure content control, media, users, permissions, versions, themes and AI assistance. Ordinary content and theme changes are designed to avoid redeployment.',loginTitle:'Admin Login',loginCopy:'Sign in to manage content and website settings.',username:'Username',password:'Password',login:'Login',cmsTitle:'Content',cmsCopy:'Add, edit, delete, restore, draft, preview and publish folder content.',mediaAdminTitle:'Media',mediaAdminCopy:'Store images, videos and PDFs in Cloudflare R2 with editable metadata.',usersTitle:'Users & Permissions',usersCopy:'Roles, permissions, sessions and audit records.',aiAdminCopy:'Workers AI endpoint for folder-aware assistance with human review.',themeTitle:'Theme Studio',themeCopy:'Change the visual system without redeployment. Changes are saved in D1 when the Worker backend is connected.',saveTheme:'Save Theme',resetTheme:'Reset',contentEditor:'Content Editor',saveContent:'Save Draft',aiTools:'Royal AI Assistant',aiPlaceholder:'Write a request for the AI assistant...',improve:'Improve Writing',summary:'Summarize',buyer:'Buyer Presentation',translate:'Translate',securityTitle:'Security & Operations',addressKicker:'CONTACT • OFFICE • PARTNERSHIP',addressTitle:'Office Address',addressText:'Pakistan • Address, phone, email and WhatsApp details are editable from Admin.'},

 zh:{skip:'跳到主要内容',home:'首页',trade:'贸易与商业',research:'研究与知识',whatsapp:'WhatsApp',adminDemo:'管理演示',eyebrow:'巴基斯坦 • 原产地 • 全球',heroCopy:'从巴基斯坦的Chilghoza森林走向世界，连接优质产品、真实原产地、负责任的供应链与深度知识。',tradeKicker:'CHILGHOZA 松子',globalTrade:'全球贸易',tradeSub:'优质 • 全球出口 →',researchKicker:'CHILGHOZA',researchTitle:'研究与知识',researchSub:'科学 • 原产地 • 森林 • 品质 →',profileKicker:'CHILGHOZA • 人与合作',profileTitle:'Chilghoza 松子',profileCopy:'知识、贸易、森林与全球环境责任于一体的平台。',aiKicker:'新一代',aiCopy:'人类知识优先，AI辅助第二。用于写作改进、研究摘要、买家支持和翻译，发布前由人工审核。',openAI:'打开AI与管理 →',mediaKicker:'原始影像',mediaTitle:'从森林到市场',mediaCopy:'只使用本项目提供的原始照片。每张图片以后都可以由管理员编辑标题、描述、说明和分类。',back:'返回',tradeKickerLong:'全球贸易 • 品质 • 市场 • 供应',tradeIntro:'国际贸易中心，涵盖产品品质、出口准备、买家、物流与负责任供应链。',researchKickerLong:'科学 • 原产地 • 森林 • 品质',researchIntro:'涵盖原产地、地理标志、森林、生物多样性、气候、有机声明、营养、加工和可追溯性的知识中心。',waCopy:'商务、采购、研究合作和一般咨询。',adminTitle:'管理控制中心',adminIntro:'内容、媒体、用户、权限、版本、主题和AI辅助。普通内容与主题修改无需重新部署。',loginTitle:'管理员登录',loginCopy:'登录以管理内容和网站设置。',username:'用户名',password:'密码',login:'登录',cmsTitle:'内容',cmsCopy:'添加、编辑、删除、恢复、草稿、预览和发布。',mediaAdminTitle:'媒体',mediaAdminCopy:'使用Cloudflare R2存储图片、视频和PDF，并可编辑元数据。',usersTitle:'用户与权限',usersCopy:'角色、权限、会话和审计记录。',aiAdminCopy:'Workers AI文件夹感知辅助，并保留人工审核。',themeTitle:'主题工作室',themeCopy:'无需重新部署即可调整视觉主题。连接Worker后保存到D1。',saveTheme:'保存主题',resetTheme:'重置',contentEditor:'内容编辑器',saveContent:'保存草稿',aiTools:'Royal AI助手',aiPlaceholder:'写下你希望AI处理的内容...',improve:'改进写作',summary:'摘要',buyer:'买家展示',translate:'翻译',securityTitle:'安全与运维',addressKicker:'联系 • 办公室 • 合作',addressTitle:'办公室地址',addressText:'巴基斯坦 • 地址、电话、邮箱和WhatsApp可在管理员中修改。'},

 ur:{skip:'مرکزی مواد پر جائیں',home:'ہوم',trade:'تجارت اور کاروبار',research:'تحقیق اور معلومات',whatsapp:'واٹس ایپ',adminDemo:'ایڈمن ڈیمو',eyebrow:'پاکستان • اصل • عالمی',heroCopy:'پاکستان کے چلغوزہ جنگلات سے دنیا تک — اعلیٰ معیار، حقیقی اصل، ذمہ دار سپلائی چین اور گہری معلومات کو جوڑتے ہوئے۔',tradeKicker:'چلغوزہ پائن نٹس',globalTrade:'عالمی تجارت',tradeSub:'اعلیٰ معیار • دنیا بھر میں برآمد →',researchKicker:'چلغوزہ',researchTitle:'تحقیق اور معلومات',researchSub:'سائنس • اصل • جنگلات • معیار →',profileKicker:'چلغوزہ • لوگ • شراکت',profileTitle:'Chilghoza Pine Nuts',profileCopy:'علم، تجارت، جنگلات اور عالمی ماحول کی ذمہ داری ایک پلیٹ فارم میں۔',aiKicker:'اگلی نسل',aiCopy:'انسانی علم پہلے، اے آئی معاونت بعد میں۔ تحریر، تحقیق، خریداروں اور ترجمے میں مدد، اشاعت سے پہلے انسانی جائزہ۔',openAI:'اے آئی اور ایڈمن کھولیں →',mediaKicker:'اصل مجموعہ',mediaTitle:'جنگل سے مارکیٹ تک',mediaCopy:'صرف اس منصوبے کی فراہم کردہ اصل تصاویر استعمال کی گئی ہیں۔ ہر تصویر کی تفصیل، عنوان، کیپشن اور زمرہ بعد میں ایڈمن سے تبدیل ہو سکتا ہے۔',back:'واپس',tradeKickerLong:'عالمی تجارت • معیار • مارکیٹس • سپلائی',tradeIntro:'معیار، برآمدی تیاری، خریدار، لاجسٹکس اور ذمہ دار سپلائی چین کے لیے بین الاقوامی تجارتی مرکز۔',researchKickerLong:'سائنس • اصل • جنگلات • معیار',researchIntro:'جغرافیائی انڈیکیشن، جنگلات، حیاتیاتی تنوع، آب و ہوا، آرگینک دعووں، غذائیت، پراسیسنگ اور ٹریس ایبلٹی کا علمی مرکز۔',waCopy:'کاروبار، خریداری، تحقیقی تعاون اور عمومی رابطہ۔',adminTitle:'ایڈمن کنٹرول سینٹر',adminIntro:'مواد، میڈیا، صارفین، اجازت، ورژن، تھیم اور اے آئی معاونت کا محفوظ نظام۔ عام مواد اور تھیم کی تبدیلی کے لیے دوبارہ ڈپلائمنٹ ضروری نہیں۔',loginTitle:'ایڈمن لاگ اِن',loginCopy:'مواد اور ویب سائٹ کی سیٹنگز سنبھالنے کے لیے لاگ اِن کریں۔',username:'صارف نام',password:'پاس ورڈ',login:'لاگ اِن',cmsTitle:'مواد',cmsCopy:'فولڈر مواد شامل، تبدیل، حذف، بحال، ڈرافٹ، پری ویو اور شائع کریں۔',mediaAdminTitle:'میڈیا',mediaAdminCopy:'Cloudflare R2 میں تصاویر، ویڈیوز اور PDF محفوظ کریں اور تفصیل تبدیل کریں۔',usersTitle:'صارفین اور اجازتیں',usersCopy:'کردار، اجازتیں، سیشن اور آڈٹ ریکارڈ۔',aiAdminCopy:'Workers AI فولڈر کے مطابق معاونت دے گا، انسانی جائزے کے ساتھ۔',themeTitle:'تھیم اسٹوڈیو',themeCopy:'دوبارہ ڈپلائمنٹ کے بغیر رنگ اور ظاہری انداز تبدیل کریں۔ Worker منسلک ہونے پر D1 میں محفوظ ہوگا۔',saveTheme:'تھیم محفوظ کریں',resetTheme:'ری سیٹ',contentEditor:'مواد ایڈیٹر',saveContent:'ڈرافٹ محفوظ کریں',aiTools:'رائل اے آئی اسسٹنٹ',aiPlaceholder:'اے آئی کے لیے اپنی درخواست لکھیں...',improve:'تحریر بہتر کریں',summary:'خلاصہ',buyer:'خریدار پریزنٹیشن',translate:'ترجمہ',securityTitle:'سیکیورٹی اور آپریشنز',addressKicker:'رابطہ • دفتر • شراکت',addressTitle:'دفتر کا پتہ',addressText:'پاکستان • پتہ، فون، ای میل اور واٹس ایپ کی تفصیل ایڈمن سے تبدیل ہو سکتی ہے۔'},

 ps:{skip:'اصلي منځپانګې ته لاړ شئ',home:'کور',trade:'سوداګري او تجارت',research:'څېړنه او پوهه',whatsapp:'واټس‌اپ',adminDemo:'د اډمین ډیمو',eyebrow:'پاکستان • اصليت • نړیوال',heroCopy:'د پاکستان د چلغوزو له ځنګلونو څخه تر نړۍ پورې — کیفیت، اصليت، مسؤل عرضه‌زنځیر او پوهه سره نښلوو.',tradeKicker:'چلغوزه',globalTrade:'نړیواله سوداګري',tradeSub:'لوړ کیفیت • نړیوال صادرات →',researchKicker:'چلغوزه',researchTitle:'څېړنه او پوهه',researchSub:'ساینس • اصليت • ځنګلونه • کیفیت →',profileKicker:'چلغوزه • خلک • ملګرتیا',profileTitle:'Chilghoza Pine Nuts',profileCopy:'پوهه، سوداګري، ځنګلونه او د نړیوال چاپېریال ساتنه په یوه پلاتفورم کې.',aiKicker:'راتلونکی نسل',aiCopy:'انساني پوهه لومړی، د AI مرسته دوهمه. د لیکنې، څېړنې، پیرودونکو او ژباړې لپاره مرسته، د خپرولو مخکې انساني کتنه.',openAI:'AI او اډمین خلاص کړئ →',mediaKicker:'اصلي مجموعه',mediaTitle:'له ځنګل څخه تر بازار',mediaCopy:'یوازې د دې پروژې اصلي ورکړل شوي عکسونه کارول شوي. د هر عکس عنوان، تشریح، کیپشن او کټګوري وروسته د اډمین له لارې بدلېدای شي.',back:'بېرته',tradeKickerLong:'نړیوال تجارت • کیفیت • بازارونه • عرضه',tradeIntro:'د کیفیت، صادراتو، پیرودونکو، لوژستیک او مسؤل عرضه‌زنځیر لپاره نړیوال سوداګریز مرکز.',researchKickerLong:'ساینس • اصليت • ځنګلونه • کیفیت',researchIntro:'د جغرافیایي نښې، ځنګلونو، حیاتي تنوع، اقلیم، عضوي ادعاوو، تغذیې، پروسس او تعقیب لپاره د پوهې مرکز.',waCopy:'سوداګري، پېرود، څېړنیزه همکاري او عمومي اړیکه.',adminTitle:'د اډمین کن트롤 مرکز',adminIntro:'د منځپانګې، رسنیو، کاروونکو، اجازو، نسخو، موضوع او AI لپاره خوندي کنټرول.',loginTitle:'اډمین ننوتل',loginCopy:'د منځپانګې او ویبپاڼې د تنظیماتو لپاره ننوتل.',username:'کارن نوم',password:'پټنوم',login:'ننوتل',cmsTitle:'منځپانګه',cmsCopy:'منځپانګه اضافه، بدله، ړنګه، بحاله، مسوده، مخکتنه او خپره کړئ.',mediaAdminTitle:'رسنۍ',mediaAdminCopy:'عکسونه، ویډیوګانې او PDF په R2 کې وساتئ اور معلومات یې بدل کړئ.',usersTitle:'کاروونکي او اجازې',usersCopy:'رولونه، اجازې، ناستې او د پلټنې ریکارډ.',aiAdminCopy:'Workers AI د فولډر له مخې مرسته کوي، د انسان له کتنې سره.',themeTitle:'Theme Studio',themeCopy:'د بیا ډپلوی پرته رنګونه او ډیزاین بدل کړئ.',saveTheme:'Theme خوندي کړئ',resetTheme:'بیا تنظیم',contentEditor:'د منځپانګې ایڈیټر',saveContent:'مسوده خوندي کړئ',aiTools:'Royal AI Assistant',aiPlaceholder:'د AI لپاره خپله غوښتنه ولیکئ...',improve:'لیکنه ښه کړئ',summary:'لنډیز',buyer:'پیرودونکي پریزنټېشن',translate:'ژباړه',securityTitle:'امنیت او عملیات',addressKicker:'اړیکه • دفتر • ملګرتیا',addressTitle:'د دفتر پته',addressText:'پاکستان • پته، تلیفون، ایمیل او واټس‌اپ معلومات له اډمین څخه بدلېدای شي.'},

 fa:{skip:'رفتن به محتوای اصلی',home:'خانه',trade:'تجارت و بازرگانی',research:'پژوهش و دانش',whatsapp:'واتساپ',adminDemo:'دموی مدیریت',eyebrow:'پاکستان • مبدأ • جهانی',heroCopy:'از جنگل‌های چلغوزه پاکستان تا جهان — پیوند کیفیت، اصالت، زنجیره تأمین مسئولانه و دانش.',tradeKicker:'چلغوزه',globalTrade:'تجارت جهانی',tradeSub:'کیفیت ممتاز • صادرات جهانی →',researchKicker:'چلغوزه',researchTitle:'پژوهش و دانش',researchSub:'علم • مبدأ • جنگل • کیفیت →',profileKicker:'چلغوزه • مردم • همکاری',profileTitle:'Chilghoza Pine Nuts',profileCopy:'دانش، تجارت، جنگل‌ها و حفاظت از محیط زیست در یک پلتفرم.',aiKicker:'نسل بعدی',aiCopy:'دانش انسانی اول، کمک هوش مصنوعی دوم. برای بهبود نوشتار، خلاصه پژوهش، پشتیبانی خریداران و ترجمه؛ با بررسی انسانی قبل از انتشار.',openAI:'باز کردن AI و مدیریت →',mediaKicker:'مجموعه اصلی',mediaTitle:'از جنگل تا بازار',mediaCopy:'فقط عکس‌های اصلی ارائه‌شده برای این پروژه استفاده شده است. عنوان، توضیح و دسته‌بندی هر تصویر بعداً از مدیریت قابل تغییر است.',back:'بازگشت',tradeKickerLong:'تجارت جهانی • کیفیت • بازار • عرضه',tradeIntro:'مرکز تجارت بین‌المللی برای کیفیت محصول، آمادگی صادرات، خریداران، لجستیک و زنجیره تأمین مسئولانه.',researchKickerLong:'علم • مبدأ • جنگل • کیفیت',researchIntro:'مرکز دانش درباره مبدأ، نشان جغرافیایی، جنگل‌ها، تنوع زیستی، اقلیم، ادعاهای ارگانیک، تغذیه، فرآوری و رهگیری.',waCopy:'ارتباط مستقیم تجاری، خرید، همکاری پژوهشی و پرسش‌های عمومی.',adminTitle:'مرکز کنترل مدیریت',adminIntro:'کنترل امن محتوا، رسانه، کاربران، مجوزها، نسخه‌ها، قالب و دستیار AI. تغییرات معمولی نیاز به استقرار دوباره ندارد.',loginTitle:'ورود مدیر',loginCopy:'برای مدیریت محتوا و تنظیمات وارد شوید.',username:'نام کاربری',password:'رمز عبور',login:'ورود',cmsTitle:'محتوا',cmsCopy:'افزودن، ویرایش، حذف، بازیابی، پیش‌نویس، پیش‌نمایش و انتشار.',mediaAdminTitle:'رسانه',mediaAdminCopy:'ذخیره عکس، ویدیو و PDF در Cloudflare R2 با اطلاعات قابل ویرایش.',usersTitle:'کاربران و مجوزها',usersCopy:'نقش‌ها، مجوزها، نشست‌ها و سوابق حسابرسی.',aiAdminCopy:'Workers AI با توجه به پوشه کمک می‌کند و بررسی انسانی حفظ می‌شود.',themeTitle:'استودیو قالب',themeCopy:'رنگ و ظاهر را بدون استقرار دوباره تغییر دهید؛ پس از اتصال Worker در D1 ذخیره می‌شود.',saveTheme:'ذخیره قالب',resetTheme:'بازنشانی',contentEditor:'ویرایشگر محتوا',saveContent:'ذخیره پیش‌نویس',aiTools:'دستیار Royal AI',aiPlaceholder:'درخواست خود را برای AI بنویسید...',improve:'بهبود متن',summary:'خلاصه',buyer:'ارائه به خریدار',translate:'ترجمه',securityTitle:'امنیت و عملیات',addressKicker:'تماس • دفتر • همکاری',addressTitle:'آدرس دفتر',addressText:'پاکستان • آدرس، تلفن، ایمیل و واتساپ از مدیریت قابل تغییر است.'},

 ru:{home:'Главная',trade:'Торговля и бизнес',research:'Исследования и знания',whatsapp:'WhatsApp',adminDemo:'Демо администратора',back:'Назад',tradeIntro:'Международный торговый центр для качества, экспорта, покупателей, логистики и ответственной цепочки поставок.',researchIntro:'Центр знаний об происхождении, географическом указании, лесах, биоразнообразии, климате, органических заявлениях, питании, переработке и прослеживаемости.',profileTitle:'Chilghoza Pine Nuts',profileCopy:'Знания, торговля, леса и экологическая ответственность на одной платформе.',addressTitle:'Адрес офиса',addressText:'Пакистан • адрес, телефон, email и WhatsApp можно менять через администратора.'},

 id:{home:'Beranda',trade:'Perdagangan & Bisnis',research:'Riset & Pengetahuan',whatsapp:'WhatsApp',adminDemo:'Demo Admin',back:'Kembali',tradeIntro:'Pusat perdagangan internasional untuk kualitas, ekspor, pembeli, logistik dan rantai pasok yang bertanggung jawab.',researchIntro:'Pusat pengetahuan tentang asal, indikasi geografis, hutan, keanekaragaman hayati, iklim, klaim organik, nutrisi, pengolahan dan ketertelusuran.',profileTitle:'Chilghoza Pine Nuts',profileCopy:'Pengetahuan, perdagangan, hutan dan tanggung jawab lingkungan dalam satu platform.',addressTitle:'Alamat Kantor',addressText:'Pakistan • alamat, telepon, email dan WhatsApp dapat diubah melalui Admin.'},

 ms:{home:'Laman Utama',trade:'Perdagangan & Perniagaan',research:'Penyelidikan & Pengetahuan',whatsapp:'WhatsApp',adminDemo:'Demo Admin',back:'Kembali',tradeIntro:'Pusat perdagangan antarabangsa untuk kualiti, eksport, pembeli, logistik dan rantaian bekalan bertanggungjawab.',researchIntro:'Pusat pengetahuan tentang asal, petunjuk geografi, hutan, biodiversiti, iklim, tuntutan organik, pemakanan, pemprosesan dan kebolehkesanan.',profileTitle:'Chilghoza Pine Nuts',profileCopy:'Pengetahuan, perdagangan, hutan dan penjagaan alam sekitar dalam satu platform.',addressTitle:'Alamat Pejabat',addressText:'Pakistan • alamat, telefon, email dan WhatsApp boleh diubah melalui Admin.'},

 ar:{home:'الرئيسية',trade:'التجارة والأعمال',research:'البحث والمعرفة',whatsapp:'واتساب',adminDemo:'تجربة الإدارة',back:'رجوع',tradeIntro:'مركز للتجارة الدولية يشمل الجودة والتصدير والمشترين والخدمات اللوجستية وسلسلة الإمداد المسؤولة.',researchIntro:'مركز معرفة عن المنشأ والمؤشر الجغرافي والغابات والتنوع الحيوي والمناخ والمنتجات العضوية والتغذية والتجهيز والتتبع.',profileTitle:'Chilghoza Pine Nuts',profileCopy:'المعرفة والتجارة والغابات والمسؤولية البيئية في منصة واحدة.',addressTitle:'عنوان المكتب',addressText:'باكستان • يمكن تعديل العنوان والهاتف والبريد وواتساب من لوحة الإدارة.'}
};

const tradeFolders=[
['01','Global Markets','USA • China • Central Asia • Middle East'],
['02','Export & Logistics','Packaging • documentation • shipping • customs'],
['03','Product & Quality','Kernels • in-shell • roasting • grades • specifications'],
['04','Buyers & Pricing','Buyer requirements • offers • quotations • market intelligence'],
['05','Supply Chain & Traceability','Forest → collector → processing → packing → export'],
['06','Afghanistan & Central Asia','Pashto/Dari buyers • regional routes • partnerships'],
['07','China Market','Chinese presentation • buyer language • product information'],
['08','USA Market','Professional buyer presentation • quality • origin • compliance']
];

const researchFolders=[
['01','Geographical Indication (GI)','Origin protection • product identity • traceability • supply-chain evidence'],
['02','Chilghoza Forests','Forest ecology • regeneration • harvesting • conservation'],
['03','Global Environment & Climate','Biodiversity • carbon • ecosystem services • climate resilience'],
['04','Organic & Natural Product Claims','Evidence • standards • chain of custody • responsible declarations'],
['05','Supply Chain & Traceability','Product properties • lot identity • origin • handling • documentation'],
['06','Nutrition & Product Science','Kernel properties • composition • quality • food knowledge'],
['07','Processing, Roasting & Quality','Drying • roasting • grading • storage • food safety'],
['08','Research Library & Documents','Studies • reports • PDFs • references • field knowledge']
];

let lang=localStorage.getItem('rcpn_lang')||'en';
let current='home';

const $=s=>document.querySelector(s);
const $$=s=>[...document.querySelectorAll(s)];

function t(k){
  return (TEXT[lang]&&TEXT[lang][k])||TEXT.en[k]||k;
}

function applyLanguage(){
  document.documentElement.lang=lang;
  document.documentElement.dir=LANGS[lang][1];

  const label=$('#langLabel');
  if(label) label.textContent=LANGS[lang][0];

  $$('[data-i18n]').forEach(e=>{
    e.textContent=t(e.dataset.i18n);
  });

  $$('[data-i18n-placeholder]').forEach(e=>{
    e.placeholder=t(e.dataset.i18nPlaceholder);
  });

  renderFolders();
  renderGallery();
}

function renderLangs(){
  const m=$('#langMenu');
  if(!m)return;

  m.innerHTML=Object.entries(LANGS)
    .map(([k,v])=>`<button type="button" data-lang="${k}" role="option">${v[0]}</button>`)
    .join('');
}

function setLanguage(k){
  if(!LANGS[k])return;

  lang=k;
  localStorage.setItem('rcpn_lang',k);

  applyLanguage();

  const menu=$('#langMenu');
  const btn=$('#langBtn');

  if(menu)menu.classList.remove('open');
  if(btn)btn.setAttribute('aria-expanded','false');
}

function renderFolders(){
  const tf=$('#tradeFolders');
  const rf=$('#researchFolders');

  if(!tf||!rf)return;

  tf.innerHTML=tradeFolders.map(x=>`
    <button class="folder" data-folder="trade-${x[0]}">
      <span class="num">${x[0]}</span>
      <h3>${x[1]}</h3>
      <p>${x[2]}</p>
    </button>
  `).join('');

  rf.innerHTML=researchFolders.map(x=>`
    <button class="folder" data-folder="research-${x[0]}">
      <span class="num">${x[0]}</span>
      <h3>${x[1]}</h3>
      <p>${x[2]}</p>
    </button>
  `).join('');

  $$('.folder').forEach(b=>{
    b.addEventListener('click',()=>{
      showFolder(b.dataset.folder);
    });
  });
}

function showFolder(id){
  const [type,n]=id.split('-');

  const list=type==='trade'
    ?tradeFolders
    :researchFolders;

  const item=list.find(x=>x[0]===n);

  if(!item)return;

  const target=type==='trade'
    ?$('#tradeContent')
    :$('#researchContent');

  if(!target)return;

  $$('.folder').forEach(b=>{
    b.classList.toggle(
      'active',
      b.dataset.folder===id
    );
  });

  target.innerHTML=`
    <div class="detail-box">

      <div class="eyebrow">
        ${item[0]} • ${type.toUpperCase()}
      </div>

      <h2>${item[1]}</h2>

      <p>${item[2]}</p>

      <p>
        <strong>Ready for your content.</strong>
        Add your videos, photographs, descriptions,
        documents, references, product properties,
        supply-chain evidence and future research
        from the Admin/CMS.
        Nothing here is locked into the design.
      </p>

      <div class="detail-actions">

        <a class="btn"
           href="#admin"
           data-route="admin">
           Admin / CMS →
        </a>

        <a class="btn ghost"
           href="#whatsapp"
           data-route="whatsapp">
           WhatsApp →
        </a>

      </div>

    </div>
  `;

  target.scrollIntoView({
    behavior:'smooth',
    block:'start'
  });
}

const galleryDescriptions={
1:'Forest and field project photograph',
2:'Chilghoza product photograph',
3:'Chilghoza forest and harvesting',
4:'Chilghoza pods and raw material',
5:'Product quality photograph',
6:'Chilghoza kernels',
7:'Traditional product handling',
8:'Kernel presentation',
9:'Chilghoza product detail',
10:'Premium kernel display',
11:'Forest and product fieldwork',
12:'Chilghoza supply and market scene',
13:'Chilghoza kernels',
14:'Forest fieldwork',
15:'Chilghoza product',
16:'Kernel quality',
17:'Kernel close-up',
18:'Product presentation',
19:'Chilghoza handling',
20:'Market and supply scene',
21:'Forest product material',
22:'Raw Chilghoza pods',
23:'Product grade display',
24:'Forest fieldwork',
25:'Chilghoza tree',
26:'Forest canopy',
27:'Kernel close-up',
28:'Chilghoza tree',
29:'Product handling',
30:'Forest fieldwork',
31:'Market and product scene',
32:'Kernel lot',
33:'Product lot display',
34:'Premium kernels',
35:'Processing environment',
36:'Market lot',
37:'Raw pods',
38:'Kernel close-up',
39:'Raw Chilghoza',
40:'Raw material close-up',
41:'Processing and supply',
42:'Product quality',
43:'Chilghoza product photograph'
};

function renderGallery(){
  const g=$('#homeGallery');

  if(!g)return;

  g.innerHTML=Array.from(
    {length:43},
    (_,i)=>`
      <figure>
        <img
          loading="lazy"
          src="${String(i+1).padStart(3,'0')}.jpg"
          alt="${galleryDescriptions[i+1]}"
        >
        <figcaption>
          ${galleryDescriptions[i+1]}
        </figcaption>
      </figure>
    `
  ).join('');
}

function showPage(id,push=true){
  const allowed=[
    'home',
    'trade',
    'research',
    'whatsapp',
    'admin'
  ];

  if(!allowed.includes(id))id='home';

  current=id;

  $$('.page').forEach(p=>{
    p.classList.toggle(
      'active',
      p.id===id
    );
  });

  window.scrollTo({
    top:0,
    behavior:'auto'
  });

  if(push){
    history.pushState(
      {id},
      '',
      `#${id}`
    );
  }
}

function back(){
  if(current!=='home'){
    showPage('home',true);
  }else{
    history.back();
  }
}

async function api(path,opts={}){
  const r=await fetch(
    `/api${path}`,
    {
      credentials:'include',
      ...opts,
      headers:{
        'content-type':'application/json',
        ...(opts.headers||{})
      }
    }
  );

  let d={};

  try{
    d=await r.json();
  }catch{}

  if(!r.ok){
    throw new Error(
      d.error||'Request failed'
    );
  }

  return d;
}

async function checkSession(){
  try{
    const d=await api('/me');

    if(d.auth){
      $('#loginPanel')?.classList.add('hidden');
      $('#adminPanel')?.classList.remove('hidden');

      const status=$('#loginStatus');
      if(status)status.textContent='Signed in.';
    }
  }catch{}
}

async function login(){
  try{
    const d=await api(
      '/login',
      {
        method:'POST',
        body:JSON.stringify({
          username:$('#username').value,
          password:$('#password').value
        })
      }
    );

    $('#loginStatus').textContent=
      d.message||'Signed in.';

    $('#loginPanel').classList.add('hidden');
    $('#adminPanel').classList.remove('hidden');

  }catch(e){
    $('#loginStatus').textContent=e.message;
  }
}

async function saveTheme(){
  const theme={
    bg:$('#bgColor').value,
    text:$('#textColor').value,
    accent:$('#accentColor').value,
    surface:$('#surfaceColor').value
  };

  try{
    await api(
      '/settings/theme',
      {
        method:'PUT',
        body:JSON.stringify(theme)
      }
    );

    applyTheme(theme);

    $('#contentStatus').textContent=
      'Theme saved.';

  }catch{

    localStorage.setItem(
      'rcpn_theme',
      JSON.stringify(theme)
    );

    applyTheme(theme);

    $('#contentStatus').textContent=
      'Theme saved locally; connect Worker/D1 for live persistence.';
  }
}

function applyTheme(x){
  if(!x)return;

  for(const [k,v] of Object.entries(x)){
    document.documentElement.style.setProperty(
      `--${k}`,
      v
    );
  }
}

async function loadTheme(){
  try{
    const d=await api('/settings/theme');

    if(d.theme){
      applyTheme(d.theme);

      ['bg','text','accent','surface'].forEach(k=>{
        const input=$('#'+k+'Color');

        if(input&&d.theme[k]){
          input.value=d.theme[k];
        }
      });
    }

  }catch{

    const x=JSON.parse(
      localStorage.getItem('rcpn_theme')||'null'
    );

    if(x)applyTheme(x);
  }
}

async function saveContent(){
  const payload={
    section:$('#editFolder').value,
    title:$('#editTitle').value,
    description:$('#editDescription').value,
    status:'draft'
  };

  try{

    await api(
      '/content',
      {
        method:'POST',
        body:JSON.stringify(payload)
      }
    );

    $('#contentStatus').textContent=
      'Draft saved to D1.';

  }catch{

    localStorage.setItem(
      'rcpn_draft',
      JSON.stringify(payload)
    );

    $('#contentStatus').textContent=
      'Draft saved locally; Worker/D1 not connected yet.';
  }
}

async function loadMedia(){
  try{

    const d=await api('/media');

    $('#mediaList').innerHTML=
      d.items.map(x=>`

        <div class="media-item">

          ${
            x.kind==='image'
            ?`<img
                src="/api/media/${encodeURIComponent(x.r2_key)}"
                alt="${x.title}"
              >`
            :x.kind==='video'
            ?`<video
                controls
                src="/api/media/${encodeURIComponent(x.r2_key)}">
              </video>`
            :''
          }

          <b>${x.title}</b>

          <div class="mini">
            ${x.description||''}
          </div>

          <button
            class="btn ghost"
            data-delete-media="${x.id}">
            Delete
          </button>

        </div>

      `).join('')
      ||'<div class="notice">No media yet.</div>';

  }catch{}
}

async function uploadMedia(){
  const f=$('#mediaFile').files[0];

  if(!f){
    $('#mediaStatus').textContent=
      'Choose a file first.';
    return;
  }

  const fd=new FormData();

  fd.append('file',f);
  fd.append(
    'title',
    $('#mediaTitle').value||f.name
  );
  fd.append(
    'description',
    $('#mediaDescription').value
  );
  fd.append(
    'caption',
    $('#mediaCaption').value
  );
  fd.append(
    'section',
    $('#mediaSection').value
  );

  try{

    const r=await fetch(
      '/api/media',
      {
        method:'POST',
        credentials:'include',
        body:fd
      }
    );

    const d=await r.json();

    if(!r.ok){
      throw new Error(
        d.error||'Upload failed'
      );
    }

    $('#mediaStatus').textContent=
      'Uploaded to R2.';

    await loadMedia();

  }catch(e){

    $('#mediaStatus').textContent=
      e.message;
  }
}

async function deleteMedia(id){
  try{

    await api(
      '/media/'+id,
      {method:'DELETE'}
    );

    loadMedia();

  }catch(e){

    $('#mediaStatus').textContent=
      e.message;
  }
}

async function loadContent(){
  try{

    const d=await api('/content');

    $('#contentList').innerHTML=
      d.items.map(x=>`

        <div class="content-item">

          <b>${x.title}</b>

          <div class="mini">
            ${x.section} • ${x.status}
          </div>

          <div>
            ${x.description||''}
          </div>

          <button
            class="btn ghost"
            data-publish="${x.id}">
            Publish
          </button>

          <button
            class="btn ghost"
            data-delete-content="${x.id}">
            Delete
          </button>

        </div>

      `).join('')
      ||'<div class="notice">No saved content yet.</div>';

  }catch{}
}

async function publishContent(id){
  try{

    await api(
      '/content/'+id,
      {
        method:'PATCH',
        body:JSON.stringify({
          status:'published'
        })
      }
    );

    loadContent();

  }catch(e){

    $('#contentStatus').textContent=
      e.message;
  }
}

async function deleteContent(id){
  try{

    await api(
      '/content/'+id,
      {method:'DELETE'}
    );

    loadContent();

  }catch(e){

    $('#contentStatus').textContent=
      e.message;
  }
}

async function runAI(mode){
  const text=$('#aiPrompt').value.trim();

  if(!text){
    $('#aiResult').value=
      'Please enter text first.';
    return;
  }

  try{

    const d=await api(
      '/ai',
      {
        method:'POST',
        body:JSON.stringify({
          mode,
          text,
          language:lang
        })
      }
    );

    $('#aiResult').value=
      d.result||'No result.';

  }catch{

    $('#aiResult').value=
      'AI endpoint is ready in the Worker project. After Cloudflare AI binding is connected, this request will run through Workers AI.';
  }
}


/* LANGUAGE MENU */

const langBtn=$('#langBtn');
const langMenu=$('#langMenu');

if(langBtn){
  langBtn.addEventListener(
    'click',
    ()=>{
      const o=langMenu.classList.toggle('open');

      langBtn.setAttribute(
        'aria-expanded',
        String(o)
      );
    }
  );
}

if(langMenu){
  langMenu.addEventListener(
    'click',
    e=>{
      const b=e.target.closest(
        '[data-lang]'
      );

      if(b){
        setLanguage(
          b.dataset.lang
        );
      }
    }
  );
}


/* IMPORTANT FIX:
   Dynamic buttons such as Admin/CMS and WhatsApp
   now work even after folders are rendered.
*/

document.addEventListener(
  'click',
  e=>{

    const route=e.target.closest(
      '[data-route]'
    );

    if(route){

      e.preventDefault();

      showPage(
        route.dataset.route
      );

      return;
    }

    const m=e.target.closest(
      '[data-delete-media]'
    );

    if(m){
      deleteMedia(
        m.dataset.deleteMedia
      );
      return;
    }

    const p=e.target.closest(
      '[data-publish]'
    );

    if(p){
      publishContent(
        p.dataset.publish
      );
      return;
    }

    const d=e.target.closest(
      '[data-delete-content]'
    );

    if(d){
      deleteContent(
        d.dataset.deleteContent
      );
      return;
    }
  }
);


/* BACK BUTTONS */

$$('[data-back]').forEach(
  b=>{
    b.addEventListener(
      'click',
      back
    );
  }
);


/* BROWSER BACK/FORWARD */

window.addEventListener(
  'popstate',
  ()=>{
    showPage(
      location.hash.slice(1)||'home',
      false
    );
  }
);


/* ADMIN */

const loginBtn=$('#loginBtn');

if(loginBtn){
  loginBtn.addEventListener(
    'click',
    login
  );
}

const saveThemeBtn=$('#saveTheme');

if(saveThemeBtn){
  saveThemeBtn.addEventListener(
    'click',
    saveTheme
  );
}

const resetThemeBtn=$('#resetTheme');

if(resetThemeBtn){
  resetThemeBtn.addEventListener(
    'click',
    ()=>{
      localStorage.removeItem(
        'rcpn_theme'
      );
      location.reload();
    }
  );
}

const saveContentBtn=$('#saveContent');

if(saveContentBtn){
  saveContentBtn.addEventListener(
    'click',
    saveContent
  );
}


/* AI */

$$('[data-ai]').forEach(
  b=>{
    b.addEventListener(
      'click',
      ()=>{
        runAI(b.dataset.ai);
      }
    );
  }
);


/* INITIALIZE */

renderLangs();
applyLanguage();

showPage(
  location.hash.slice(1)||'home',
  false
);

checkSession();
loadTheme();
loadMedia();
loadContent();
