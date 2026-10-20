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
/* =========================================================
   CLOUDINARY AUTO-OPTIMIZATION
   ✅ v3: Preserves original aspect ratio (Facebook/Instagram style)
   ✅ Watermark on both images AND videos
   ✅ SEO-safe — SSR اور worker.js محفوظ
========================================================= */
function cloudinaryOptimize(url, width, height, crop = 'limit') {
  if (!url) return url;
  
  if (url.includes('res.cloudinary.com') && url.includes('/upload/')) {
    // 1. اگر واٹر مارک پہلے سے لگا ہو تو دوبارہ نہ لگائیں
    if (url.includes('l_text:Arial')) return url;

    // 2. پرانے سائز کو صاف کریں
    let cleanUrl = url.replace(/\/upload\/w_\d+,h_\d+,c_[a-z]+\//, '/upload/');
    cleanUrl = cleanUrl.replace(/\/upload\/w_\d+\//, '/upload/');

    // 3. واٹر مارک کی سیٹنگ — بڑا سائز (35px) تاکہ ہر سائز پر نظر آئے
    const watermark = 'l_text:Arial_35:Royal%20Chilgoza%20Pine%20Nuts,co_rgb:FFFFFF,o_35,g_south_west,x_30,y_30,a_0';

    // 4. ✅ ویڈیو: اصل aspect ratio برقرار + واٹر مارک
    if (url.includes('/video/upload/')) {
      return cleanUrl.replace('/upload/', `/upload/w_${width},c_limit,q_auto/${watermark}/`);
    }

    // 5. اگر PDF یا کوئی اور raw فائل ہے تو اسے نہ چھیڑیں
    if (url.includes('/raw/upload/')) {
      return url;
    }

    // 6. ✅ تصویر: اصل aspect ratio برقرار + واٹر مارک
    return cleanUrl.replace('/upload/', `/upload/w_${width},c_limit,q_auto,f_auto/${watermark}/`);
  }
  return url;
}

/* =========================================================
   VISIT TRACKING (silent, admin only)
========================================================= */
async function trackVisit() {
  try {
    // Only track once per browser session
    if (sessionStorage.getItem("royalVisitTracked") === "1") return;
    sessionStorage.setItem("royalVisitTracked", "1");

    await fetch("/api/track-visit", { method: "POST" });
  } catch (e) {
    // Silent fail — never disturb the user
  }
}

/* =========================================================
   TESTIMONIALS / REVIEWS
========================================================= */
let reviewsData = [];

async function loadReviews() {
  try {
    const val = await getFromKV("reviews_data");
    reviewsData = Array.isArray(val) ? val : [];
  } catch (e) {
    reviewsData = [];
  }
}

function renderReviews() {
  const grid = document.getElementById("reviewsGrid");
  if (!grid) return;

  // Only show published reviews to visitors
  const visible = state.admin ? reviewsData : reviewsData.filter(r => r.published !== false);

  if (visible.length === 0) {
    grid.innerHTML = `<p class="review-empty">No reviews yet. Check back soon.</p>`;
    return;
  }

  grid.innerHTML = visible.map((r, i) => {
    const realIndex = reviewsData.findIndex(x => x === r);
    const initial = (r.name || "?").trim().charAt(0).toUpperCase();
    const stars = "★".repeat(r.rating || 5) + "☆".repeat(5 - (r.rating || 5));
    const hiddenBadge = (state.admin && r.published === false) ?
      `<div class="gateway-hidden-badge" style="top:8px;left:8px;font-size:0.55rem;padding:4px 8px;">🌫 HIDDEN</div>` : "";

    const adminBtns = state.admin ? `
      <div class="hub-media-item-actions">
        <button class="hub-action-btn" data-review-edit="${realIndex}" title="Edit" type="button">✏️</button>
        <button class="hub-action-btn danger" data-review-delete="${realIndex}" title="Delete" type="button">🗑</button>
      </div>
    ` : "";

    return `
      <article class="review-card" style="position:relative;">
        ${hiddenBadge}
        ${adminBtns}
        <div class="review-stars">${stars}</div>
        <p class="review-text">${escapeHtml(r.text || "").replace(/\n/g, '<br>')}</p>
        <div class="review-author">
          <div class="review-avatar">${escapeHtml(initial)}</div>
          <div class="review-author-info">
            <span class="review-author-name">${escapeHtml(r.name || "Anonymous")}</span>
            <span class="review-author-meta">${escapeHtml(r.country || "")}${r.role ? " · " + escapeHtml(r.role) : ""}</span>
          </div>
        </div>
      </article>
    `;
  }).join("");

  // Attach admin buttons
  if (state.admin) {
    grid.querySelectorAll("[data-review-edit]").forEach((b) =>
      (b.onclick = (e) => { e.stopPropagation(); editReview(+b.dataset.reviewEdit); })
    );
    grid.querySelectorAll("[data-review-delete]").forEach((b) =>
      (b.onclick = (e) => { e.stopPropagation(); deleteReview(+b.dataset.reviewDelete); })
    );
  }
}

async function saveReviewsKV() {
  return await saveToKV("reviews_data", reviewsData);
}

function editReview(index) {
  const r = reviewsData[index] || { name: "", country: "", role: "", text: "", rating: 5, published: true };
  const isPublished = r.published !== false;

  openEditModal(
    `✏️ ${index === -1 ? "Add New Review" : "Edit Review"}`,
    `
    <label>Client Name: <span style="color:#ff6b6b">*</span></label>
    <input type="text" id="revName" value="${escapeHtml(r.name || "")}">

    <label>Country:</label>
    <input type="text" id="revCountry" value="${escapeHtml(r.country || "")}" placeholder="e.g. China, UAE, USA">

    <label>Role / Company (optional):</label>
    <input type="text" id="revRole" value="${escapeHtml(r.role || "")}" placeholder="e.g. Importer, Wholesaler">

    <label>Rating (1-5 stars):</label>
    <select id="revRating">
      <option value="5" ${r.rating === 5 ? "selected" : ""}>★★★★★ (5)</option>
      <option value="4" ${r.rating === 4 ? "selected" : ""}>★★★★☆ (4)</option>
      <option value="3" ${r.rating === 3 ? "selected" : ""}>★★★☆☆ (3)</option>
      <option value="2" ${r.rating === 2 ? "selected" : ""}>★★☆☆☆ (2)</option>
      <option value="1" ${r.rating === 1 ? "selected" : ""}>★☆☆☆☆ (1)</option>
    </select>

    <label>Review Text: <span style="color:#ff6b6b">*</span></label>
    <textarea id="revText" rows="4" placeholder="Write the client's feedback...">${escapeHtml(r.text || "")}</textarea>

    <label style="margin-top:18px;">Visibility:</label>
    <div class="gw-visibility-options">
      <label class="gw-radio"><input type="radio" name="revVis" value="hide" ${!isPublished ? 'checked' : ''}> 🌫 <b>Hide</b> from visitors (Draft)</label>
      <label class="gw-radio"><input type="radio" name="revVis" value="show" ${isPublished ? 'checked' : ''}> 👁 <b>Show</b> to everyone</label>
    </div>
    `,
    async () => {
      const name = document.getElementById("revName").value.trim();
      const country = document.getElementById("revCountry").value.trim();
      const role = document.getElementById("revRole").value.trim();
      const rating = parseInt(document.getElementById("revRating").value, 10) || 5;
      const text = document.getElementById("revText").value.trim();
      const vis = document.querySelector('input[name="revVis"]:checked').value;
      const published = vis === "show";

      if (!name) { setEditStatus("❌ Name required", "error"); return; }
      if (!text) { setEditStatus("❌ Review text required", "error"); return; }

      const newReview = { name, country, role, rating, text, published };

      if (index === -1) {
        reviewsData.push(newReview);
      } else {
        reviewsData[index] = newReview;
      }

      setEditStatus("Saving...", "");
      const ok = await saveReviewsKV();
      if (ok) {
        renderReviews();
        setEditStatus("✅ Review saved!", "success");
        setTimeout(closeEditModal, 1000);
      } else {
        setEditStatus("❌ Save failed.", "error");
      }
    }
  );
}

async function deleteReview(index) {
  const r = reviewsData[index];
  if (!r) return;

  if (!confirm(`🗑 Delete review from "${r.name}"?\n\nThis action cannot be undone.`)) return;

  reviewsData.splice(index, 1);
  const ok = await saveReviewsKV();
  if (ok) {
    renderReviews();
  } else {
    alert("❌ Delete failed.");
  }
}

function addNewReview() {
  editReview(-1);
}
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
    reviewsEyebrow: "TRUSTED BY BUYERS WORLDWIDE",
    reviewsTitle: "What Our Clients Say",
    reviewsText: "Real feedback from international buyers and trade partners.",
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
    reviewsEyebrow: "受到全球买家的信赖",
    reviewsTitle: "客户评价",
    reviewsText: "来自国际买家和贸易伙伴的真实反馈。",
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
    reviewsEyebrow: "موثوق به من المشترين في جميع أنحاء العالم",
    reviewsTitle: "ماذا يقول عملاؤنا",
    reviewsText: "ملاحظات حقيقية من المشترين الدوليين وشركاء التجارة.",
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
    reviewsEyebrow: "د نړۍ په ګوټ ګوټ کې د پیریدونکو باور",
    reviewsTitle: "زموږ پیریدونکي څه وايي",
    reviewsText: "د نړیوالو پیریدونکو او سوداګریزو شریکانو ریښتیني نظرونه.",
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
    reviewsEyebrow: "НАМ ДОВЕРЯЮТ ПОКУПАТЕЛИ ПО ВСЕМУ МИРУ",
    reviewsTitle: "Что говорят наши клиенты",
    reviewsText: "Реальные отзывы международных покупателей и торговых партнёров.",
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
    reviewsEyebrow: "دنیا بھر کے خریداروں کا اعتماد",
    reviewsTitle: "ہمارے گاہک کیا کہتے ہیں",
    reviewsText: "بین الاقوامی خریداروں اور تجارتی شراکت داروں کی حقیقی رائے۔",
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
  const ok = await saveToKV("hubs_data", customHubData);

  // === خودکار hub_slugs sync (worker.js کے SSR کے لیے) ===
  if (ok) {
    try {
      const slugs = {
        trade: getEnglishHubsList("trade").map(([title]) => slugify(title)),
        research: getEnglishHubsList("research").map(([title]) => slugify(title))
      };
      
      await saveToKV("hub_slugs", slugs);
    } catch (e) { /* ignore */ }
  }

  return ok;
}

function getEnglishHubsList(type) {
  if (customHubData && customHubData.en && Array.isArray(customHubData.en[type])) {
    return customHubData.en[type];
  }
  return hubData.en[type] || [];
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
/* =========================================================
   GALLERY FONTS LOADER — 5 Google Fonts for Headlines
   (dynamically loads only when needed — SEO safe)
========================================================= */
let galleryFontsLoaded = false;
function loadGalleryFonts() {
  if (galleryFontsLoaded) return;
  galleryFontsLoaded = true;

  const fonts = [
  "Playfair+Display:ital,wght@0,500;0,700;1,500",
  "Cormorant+Garamond:wght@500;600;700",
  "Cinzel:wght@500;600;700",
  "Montserrat:wght@600;700;800",
  "Oswald:wght@500;600;700",
  "Noto+Sans+SC:wght@400;500;700",
  "Noto+Serif+SC:wght@500;700",
  "Ma+Shan+Zheng",
  "ZCOOL+XiaoWei",
  "Long+Cang"
].join("&family=");

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = `https://fonts.googleapis.com/css2?family=${fonts}&display=swap`;
  link.crossOrigin = "anonymous";
  document.head.appendChild(link);
}

function renderGallery() {
  const grid = document.getElementById("galleryGrid");
  if (!grid) return;

  grid.innerHTML = galleryItems.map((item, i) => {
    const src = item[0] || "";
const type = item[2] || "image";
const style = item[4] || {};

// Bilingual captions — old: string / new: object
let capEN, capZH;
if (typeof item[1] === "string") {
  capEN = item[1] || "";
  capZH = "";
} else if (item[1] && typeof item[1] === "object") {
  capEN = item[1].en || "";
  capZH = item[1].zh || "";
} else {
  capEN = ""; capZH = "";
}

// Bilingual headlines — old: string / new: object
let headlineEN, headlineZH;
if (typeof item[3] === "string") {
  headlineEN = item[3] || "";
  headlineZH = "";
} else if (item[3] && typeof item[3] === "object") {
  headlineEN = item[3].en || "";
  headlineZH = item[3].zh || "";
} else {
  headlineEN = ""; headlineZH = "";
}

// User language
const lang = (typeof state !== "undefined" && state.lang) ? state.lang : "en";
const cap = (lang === "zh" && capZH) ? capZH : capEN;
const headline = (lang === "zh" && headlineZH) ? headlineZH : headlineEN;

// Per-language styles
const isZH = (lang === "zh");
const fontEN = style.fontEN || style.font || "'Playfair Display', serif";
const fontZH = style.fontZH || "'Noto Sans SC', sans-serif";
const sizeEN = style.sizeEN || style.size || "18px";
const sizeZH = style.sizeZH || style.size || "20px";
const bgEN = (style.en && style.en.bg) || style.bg || "#d4af37";
const colorEN = (style.en && style.en.color) || style.color || "#0a1810";
const bgZH = (style.zh && style.zh.bg) || "#c8102e";
const colorZH = (style.zh && style.zh.color) || "#ffffff";

const font = isZH ? fontZH : fontEN;
const size = isZH ? sizeZH : sizeEN;
const bg = isZH ? bgZH : bgEN;
const color = isZH ? colorZH : colorEN;

    // Media HTML
let mediaHtml = "";
if (type === "video") {
  mediaHtml = `<video src="${cloudinaryOptimize(src, 1280)}" controls preload="metadata" playsinline></video>`;
} else if (type === "pdf") {
  mediaHtml = `<div class="gallery-pdf-preview"><span>📄</span><b>PDF Document</b></div>`;
} else {
  mediaHtml = `<img src="${cloudinaryOptimize(src, 1280)}" data-fullsrc="${cloudinaryOptimize(src, 1920)}" alt="${escapeHtml(cap)}" loading="lazy" onerror="this.classList.add('failed')">`;
}

    // Headline HTML
    const headlineHtml = headline ? `
      <div class="gallery-headline" style="font-family:${font}; font-size:${size}; background:${bg}; color:${color};">
        ${escapeHtml(headline)}
      </div>
    ` : "";

    // Admin buttons
    const adminBtns = state.admin ? `
      <div class="gallery-item-actions">
        <button class="hub-action-btn" data-gallery-edit="${i}" title="Edit" type="button">✏️</button>
        ${i > 0 ? `<button class="hub-action-btn" data-gallery-up="${i}" title="Move Up" type="button">⬆</button>` : ""}
        ${i < galleryItems.length - 1 ? `<button class="hub-action-btn" data-gallery-down="${i}" title="Move Down" type="button">⬇</button>` : ""}
        <button class="hub-action-btn danger" data-gallery-delete="${i}" title="Delete" type="button">🗑</button>
      </div>
    ` : "";

    return `<figure class="gallery-item" data-gallery-index="${i}" data-gallery-type="${type}">
  ${adminBtns}
  <div class="gallery-item-media">${mediaHtml}</div>
  ${headlineHtml}
  <figcaption><span>${String(i + 1).padStart(2, "0")}</span>${escapeHtml(cap).replace(/\n/g, '<br>')}</figcaption>
</figure>`;
  }).join("");

  // Attach admin buttons
  if (state.admin) {
    grid.querySelectorAll("[data-gallery-edit]").forEach((b) =>
      (b.onclick = (e) => { e.stopPropagation(); editGalleryItem(+b.dataset.galleryEdit); })
    );
    grid.querySelectorAll("[data-gallery-up]").forEach((b) =>
      (b.onclick = (e) => { e.stopPropagation(); moveGalleryItem(+b.dataset.galleryUp, -1); })
    );
    grid.querySelectorAll("[data-gallery-down]").forEach((b) =>
      (b.onclick = (e) => { e.stopPropagation(); moveGalleryItem(+b.dataset.galleryDown, 1); })
    );
    grid.querySelectorAll("[data-gallery-delete]").forEach((b) =>
      (b.onclick = (e) => { e.stopPropagation(); deleteGalleryItem(+b.dataset.galleryDelete); })
    );
  }

  // Create button
  renderGalleryCreateButton();
}

/* =========================================================
   CREATE: NEW GALLERY ITEM (BILINGUAL)
========================================================= */
function createGalleryItem() {
  openEditModal(
    `👑 Add New Gallery Item`,
    `
    <label>Upload File (Image / Video / PDF):</label>
    <input type="file" id="newGalleryFile" accept="image/*,video/*,application/pdf">
    
    <label>OR Paste URL:</label>
    <input type="text" id="newGalleryUrl" placeholder="https://..." value="">
    
    <label style="margin-top:18px;">HEADLINE — English:</label>
    <input type="text" id="newGalleryHeadEN" placeholder="English headline...">
    
    <label>HEADLINE — 中文:</label>
    <input type="text" id="newGalleryHeadZH" placeholder="中文标题...">
    
    <label style="margin-top:18px; color:var(--gold); font-weight:600;">━━━ ENGLISH STYLE ━━━</label>
    
    <label>English Font:</label>
    <select id="newGalleryFontEN">
      <option value="'Playfair Display', serif">Playfair Display (Classic)</option>
      <option value="'Cormorant Garamond', serif">Cormorant Garamond (Elegant)</option>
      <option value="'Cinzel', serif">Cinzel (Roman)</option>
      <option value="'Montserrat', sans-serif">Montserrat (Bold)</option>
      <option value="'Oswald', sans-serif">Oswald (Strong)</option>
    </select>
    
    <label>English Size:</label>
    <select id="newGallerySizeEN">
      <option value="14px">S — Small (14px)</option>
      <option value="18px" selected>M — Medium (18px)</option>
      <option value="22px">L — Large (22px)</option>
      <option value="28px">XL — Extra Large (28px)</option>
      <option value="34px">XXL — Huge (34px)</option>
    </select>
    
    <label>English BG Color:</label>
    <input type="color" id="newGalleryBgEN" value="#d4af37" style="width:100%;height:40px;border-radius:8px;border:1px solid var(--line);cursor:pointer;padding:4px;">
    
    <label>English Text Color:</label>
    <input type="color" id="newGalleryColorEN" value="#0a1810" style="width:100%;height:40px;border-radius:8px;border:1px solid var(--line);cursor:pointer;padding:4px;">
    
    <label style="margin-top:18px; color:var(--gold); font-weight:600;">━━━ 中文样式 ━━━</label>
    
    <label>Chinese Font:</label>
    <select id="newGalleryFontZH">
      <option value="'Noto Sans SC', sans-serif" selected>Noto Sans SC (简体)</option>
      <option value="'Noto Serif SC', serif">Noto Serif SC (宋体)</option>
      <option value="'Ma Shan Zheng', cursive">Ma Shan Zheng (书法)</option>
      <option value="'ZCOOL XiaoWei', serif">ZCOOL XiaoWei (雅致)</option>
      <option value="'Long Cang', cursive">Long Cang (草书)</option>
    </select>
    
    <label>Chinese Size:</label>
    <select id="newGallerySizeZH">
      <option value="16px">S — Small (16px)</option>
      <option value="20px" selected>M — Medium (20px)</option>
      <option value="24px">L — Large (24px)</option>
      <option value="30px">XL — Extra Large (30px)</option>
      <option value="36px">XXL — Huge (36px)</option>
    </select>
    
    <label>Chinese BG Color:</label>
    <input type="color" id="newGalleryBgZH" value="#c8102e" style="width:100%;height:40px;border-radius:8px;border:1px solid var(--line);cursor:pointer;padding:4px;">
    
    <label>Chinese Text Color:</label>
    <input type="color" id="newGalleryColorZH" value="#ffffff" style="width:100%;height:40px;border-radius:8px;border:1px solid var(--line);cursor:pointer;padding:4px;">
    
    <label style="margin-top:18px;">CAPTION — English:</label>
    <textarea id="newGalleryCapEN" rows="3" placeholder="English caption..." style="width:100%; padding:12px 14px; border-radius:8px; border:1px solid var(--line); background:rgba(3,20,10,0.7); color:var(--text); font-family:var(--body-font); font-size:0.9rem; resize:vertical;"></textarea>
    
    <label>CAPTION — 中文:</label>
    <textarea id="newGalleryCapZH" rows="3" placeholder="中文说明..." style="width:100%; padding:12px 14px; border-radius:8px; border:1px solid var(--line); background:rgba(3,20,10,0.7); color:var(--text); font-family:var(--body-font); font-size:0.9rem; resize:vertical;"></textarea>
    `,
    async () => {
      const fileInput = document.getElementById("newGalleryFile");
      const urlInput = document.getElementById("newGalleryUrl");
      const headENInput = document.getElementById("newGalleryHeadEN");
      const headZHInput = document.getElementById("newGalleryHeadZH");
      const fontENInput = document.getElementById("newGalleryFontEN");
      const fontZHInput = document.getElementById("newGalleryFontZH");
      const sizeENInput = document.getElementById("newGallerySizeEN");
      const sizeZHInput = document.getElementById("newGallerySizeZH");
      const bgENInput = document.getElementById("newGalleryBgEN");
      const colorENInput = document.getElementById("newGalleryColorEN");
      const bgZHInput = document.getElementById("newGalleryBgZH");
      const colorZHInput = document.getElementById("newGalleryColorZH");
      const capENInput = document.getElementById("newGalleryCapEN");
      const capZHInput = document.getElementById("newGalleryCapZH");

      const headlineEN = headENInput.value.trim();
      const headlineZH = headZHInput.value.trim();
      const capEN = capENInput.value.trim();
      const capZH = capZHInput.value.trim();
      let src = urlInput.value.trim();
      let type = "image";

      if (!capEN && !capZH) { 
        setEditStatus("❌ Caption required (at least one language)", "error"); 
        return; 
      }

      if (fileInput.files[0]) {
        const file = fileInput.files[0];
        const ext = (file.name.split(".").pop() || "").toLowerCase();
        if (["mp4", "webm", "mov", "avi"].includes(ext)) type = "video";
        else if (["pdf"].includes(ext)) type = "pdf";
        else type = "image";

        setEditStatus("Uploading...", "");
        const uploadedUrl = await uploadToCloudinary(file, "gallery");
        if (uploadedUrl) src = uploadedUrl;
        else { setEditStatus("❌ Upload failed", "error"); return; }
      }

      if (!src) { setEditStatus("❌ No file or URL provided", "error"); return; }

      setEditStatus("Saving...", "");
      galleryItems.push([
        src,
        { en: capEN, zh: capZH },
        type,
        { en: headlineEN, zh: headlineZH },
        {
          fontEN: fontENInput.value,
          fontZH: fontZHInput.value,
          sizeEN: sizeENInput.value,
          sizeZH: sizeZHInput.value,
          en: { bg: bgENInput.value, color: colorENInput.value },
          zh: { bg: bgZHInput.value, color: colorZHInput.value }
        }
      ]);
      const ok = await saveToKV("gallery_data", galleryItems);

      if (ok) {
        renderGallery();
        setEditStatus("✅ Gallery item added!", "success");
        setTimeout(closeEditModal, 1000);
      } else {
        setEditStatus("❌ Save failed", "error");
      }
    }
  );
}
/* =========================================================
   DELETE: GALLERY ITEM
========================================================= */
async function deleteGalleryItem(index) {
  const item = galleryItems[index];
  if (!item) return;
  const type = item[2] || "image";
  
  // Bilingual caption — object or string
  let capText = "item";
  if (typeof item[1] === "string") {
    capText = item[1] || "item";
  } else if (item[1] && typeof item[1] === "object") {
    capText = item[1].en || item[1].zh || "item";
  }
  
  const typeLabel = type === "video" ? "video" : type === "pdf" ? "PDF" : "image";
  
  if (!confirm(`🗑 Delete this ${typeLabel}?\n\n"${capText}"\n\nThis action cannot be undone.`)) return;
  
  galleryItems.splice(index, 1);
  const ok = await saveToKV("gallery_data", galleryItems);
  if (ok) {
    renderGallery();
  } else {
    alert("❌ Delete failed.");
  }
}
/* =========================================================
   MOVE: GALLERY ITEM (Up / Down)
========================================================= */
async function moveGalleryItem(index, direction) {
  const newIndex = index + direction;
  if (newIndex < 0 || newIndex >= galleryItems.length) return;
  
  [galleryItems[index], galleryItems[newIndex]] = [galleryItems[newIndex], galleryItems[index]];
  
  const ok = await saveToKV("gallery_data", galleryItems);
  if (ok) {
    renderGallery();
  }
}
/* =========================================================
   RENDER: GALLERY CREATE BUTTON (Admin Only)
========================================================= */
function renderGalleryCreateButton() {
  const grid = document.getElementById("galleryGrid");
  if (!grid) return;
  
  const oldBtn = document.getElementById("createGalleryBtn");
  if (oldBtn) oldBtn.remove();
  
  if (!state.admin) return;
  
  const btn = document.createElement("button");
  btn.id = "createGalleryBtn";
  btn.type = "button";
  btn.className = "gallery-create-btn";
  btn.innerHTML = `
    <span>➕</span>
    <b>Create New Gallery Item</b>
    <small>Add image, video, or PDF to the gallery</small>
  `;
  btn.onclick = createGalleryItem;
  
  // Grid کے اوپر insert کریں
  grid.parentNode.insertBefore(btn, grid);
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
      <p>${String(a).replace(/\n/g, '<br>')}</p>
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

function editGatewayProfile() {
  const currentName = document.getElementById("gatewayProfileName").textContent;
  const currentRole = document.getElementById("gatewayProfileRole").textContent;
  const currentDesc = document.getElementById("gatewayProfileDesc").textContent;
  
  openEditModal(
    "👤 Edit Gateway Profile",
    `
    <label>Current Profile Picture:</label>
    <img id="gatewayProfileImagePreview" src="${document.getElementById('gatewayProfileImage').src}" class="edit-modal-preview" style="border-radius:50%;width:120px;height:120px;margin:10px auto;display:block;">
    
    <label>Upload New Picture:</label>
    <input type="file" id="editGatewayProfileFile" accept="image/*">
    
    <label>OR Paste Image URL:</label>
    <input type="text" id="editGatewayProfileUrl" placeholder="https://..." value="${document.getElementById('gatewayProfileImage').src}">
    
    <label>Full Name:</label>
    <input type="text" id="editGatewayProfileName" value="${escapeHtml(currentName)}">
    
    <label>Role / Designation:</label>
    <input type="text" id="editGatewayProfileRole" value="${escapeHtml(currentRole)}">
    
    <label>Profile Description:</label>
    <textarea id="editGatewayProfileDesc" rows="4" style="width:100%; padding:12px 14px; border-radius:8px; border:1px solid var(--line); background:rgba(3,20,10,0.7); color:var(--text); font-family:var(--body-font); font-size:0.9rem; resize:vertical;">${escapeHtml(currentDesc)}</textarea>
    `,
    async () => {
      const fileInput = document.getElementById("editGatewayProfileFile");
      const urlInput = document.getElementById("editGatewayProfileUrl");
      const nameInput = document.getElementById("editGatewayProfileName");
      const roleInput = document.getElementById("editGatewayProfileRole");
      const descInput = document.getElementById("editGatewayProfileDesc");

      let newImgUrl = urlInput.value.trim();

      if (fileInput.files[0]) {
        setEditStatus("Uploading...", "");
        const uploadedUrl = await uploadToCloudinary(fileInput.files[0], "profile");
        if (uploadedUrl) newImgUrl = uploadedUrl;
        else { setEditStatus("❌ Upload failed", "error"); return; }
      }

      setEditStatus("Saving...", "");
      
      // ✅ ہر گیٹ وے کا الگ ڈیٹا سیو کرنے کے لیے
      const gwId = state.gateway || "global"; 
      await saveToKV(`gw_profile_${gwId}_img`, newImgUrl);
      await saveToKV(`gw_profile_${gwId}_name`, nameInput.value.trim());
      await saveToKV(`gw_profile_${gwId}_role`, roleInput.value.trim());
      await saveToKV(`gw_profile_${gwId}_desc`, descInput.value.trim());

      document.getElementById("gatewayProfileImage").src = newImgUrl;
      document.getElementById("gatewayProfileName").textContent = nameInput.value.trim();
      document.getElementById("gatewayProfileRole").textContent = roleInput.value.trim();
      document.getElementById("gatewayProfileDesc").textContent = descInput.value.trim();
      
      setEditStatus("✅ Profile updated!", "success");
      setTimeout(closeEditModal, 1000);
    }
  );
}

/* =========================================================
   GATEWAY / HUB NAVIGATION
========================================================= */

async function openGateway(type) {
  document.body.classList.add("subview");
  state.gateway = type;
  state.hub = null;
  document.getElementById("mainPage").hidden = true;
  document.getElementById("hubView").classList.remove("open");
  document.getElementById("gatewayView").classList.add("open");
  
  // ✅ await لگا دیں تاکہ ڈیٹا لوڈ ہونے کا انتظار کرے
  await renderGateway(type); 
  
  window.scrollTo(0, 0);

  // ✅ URL تبدیل کریں
  const newUrl = `/${type}`;
  if (window.location.pathname !== newUrl) {
    history.pushState({ gateway: type }, "", newUrl);
  }
}

async function renderGateway(type) {
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

  // ✅ 1. سلائیڈر آن کریں
  const profileCard = document.querySelector('.gateway-profile-card');
  if (profileCard) profileCard.classList.add('is-loading');

  // 2. KV سے ڈیٹا لائیں
  try {
    const [gwProfImg, gwProfName, gwProfRole, gwProfDesc] = await Promise.all([
      getFromKV(`gw_profile_${type}_img`).catch(() => null),
      getFromKV(`gw_profile_${type}_name`).catch(() => null),
      getFromKV(`gw_profile_${type}_role`).catch(() => null),
      getFromKV(`gw_profile_${type}_desc`).catch(() => null)
    ]);
    
    if (gwProfImg) document.getElementById("gatewayProfileImage").src = gwProfImg;
    if (gwProfName) document.getElementById("gatewayProfileName").textContent = gwProfName;
    if (gwProfRole) document.getElementById("gatewayProfileRole").textContent = gwProfRole;
    if (gwProfDesc) document.getElementById("gatewayProfileDesc").textContent = gwProfDesc;

    // ✅ ڈیٹا آ جانے کے بعد سلائیڈر آف کریں
    if (profileCard) profileCard.classList.remove('is-loading');

  } catch (e) {
    if (profileCard) profileCard.classList.remove('is-loading');
  }

  const list = hubs(type);
  const container = document.getElementById("hubGridPage");
  if (!container) return;

  if (list.length === 0) {
    container.innerHTML = state.admin
      ? `<p style="text-align:center;padding:40px;color:var(--muted);">No hubs yet. Click below to add one.</p>`
      : `<p style="text-align:center;padding:40px;color:var(--muted);">Content coming soon.</p>`;
  } else {
    container.innerHTML = list.map(([title, desc], i) => {
      const hubKey = `${type}_${i}`;
      const adminBtns = state.admin ? `
        <div class="hub-section-actions">
          <button class="hub-action-btn" data-hub-edit="${type}:${i}" title="Edit Hub" type="button">✏️</button>
          ${i > 0 ? `<button class="hub-action-btn" data-hub-up="${type}:${i}" title="Move Up" type="button">⬆</button>` : ""}
          ${i < list.length - 1 ? `<button class="hub-action-btn" data-hub-down="${type}:${i}" title="Move Down" type="button">⬇</button>` : ""}
          <button class="hub-action-btn danger" data-hub-delete="${type}:${i}" title="Delete Hub" type="button">🗑</button>
        </div>
      ` : "";

      const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Inquiry about " + title)}`;

      return `
        <article class="hub-section" data-hub-section="${hubKey}" id="hub-${hubKey}">
          ${adminBtns}
          <div class="hub-section-header">
            <div class="hub-section-number">HUB ${String(i + 1).padStart(2, "0")}</div>
            <h2 class="hub-section-title">${escapeHtml(title)}</h2>
            <p class="hub-section-desc">${escapeHtml(desc)}</p>
          </div>
          <div class="hub-section-media" id="hub-media-${hubKey}">
            <div class="hub-media-loading">Loading media...</div>
          </div>
          <div class="hub-section-footer">
            <a href="${waLink}" target="_blank" rel="noopener" class="btn btn-gold hub-wa-btn">
              💬 WhatsApp Trade
            </a>
          </div>
        </article>
      `;
    }).join("");
  }

  if (state.admin) {
    const createBtn = `
      <button class="create-hub-btn" data-create-hub="${type}" type="button">
        <span>➕</span>
        <b>Create New Hub</b>
        <small>Add a new knowledge hub to this gateway</small>
      </button>
    `;
    container.insertAdjacentHTML("beforeend", createBtn);
  }

  if (state.admin) {
    container.querySelectorAll("[data-hub-edit]").forEach((b) =>
      (b.onclick = (e) => { e.stopPropagation(); const [t, i] = b.dataset.hubEdit.split(":"); editHub(t, +i); })
    );
    container.querySelectorAll("[data-hub-delete]").forEach((b) =>
      (b.onclick = (e) => { e.stopPropagation(); const [t, i] = b.dataset.hubDelete.split(":"); deleteHub(t, +i); })
    );
    container.querySelectorAll("[data-hub-up]").forEach((b) =>
      (b.onclick = (e) => { e.stopPropagation(); const [t, i] = b.dataset.hubUp.split(":"); moveHub(t, +i, -1); })
    );
    container.querySelectorAll("[data-hub-down]").forEach((b) =>
      (b.onclick = (e) => { e.stopPropagation(); const [t, i] = b.dataset.hubDown.split(":"); moveHub(t, +i, 1); })
    );
    const createEl = container.querySelector("[data-create-hub]");
    if (createEl) createEl.onclick = () => createHub(createEl.dataset.createHub);
  }

  list.forEach((_, i) => {
    renderHubSectionMedia(type, i);
  });
}

function openHub(type, index) {
  state.hub = { type, index };
  document.getElementById("gatewayView").classList.remove("open");
  document.getElementById("hubView").classList.add("open");
  renderHub(type, index);
  window.scrollTo(0, 0);

  // ✅ URL تبدیل کریں
  const list = hubs(type);
  const hubItem = list[index];
  if (hubItem) {
    const slug = slugify(hubItem[0]);
    const newUrl = `/${type}/${slug}`;
    if (window.location.pathname !== newUrl) {
      history.pushState({ gateway: type, hub: index }, "", newUrl);
    }
  }
}

function renderHub(type, index) {
  const list = hubs(type);
  const item = list[index] || ["", ""];
  const [title, desc] = item;
  const hubNoEl = document.getElementById("hubNo");
  const hubTitleEl = document.getElementById("hubTitleText");
  const hubDescEl = document.getElementById("hubDescription");
  const hubWaEl = document.getElementById("hubWhatsapp");
  if (hubNoEl) hubNoEl.textContent = `${type === "trade" ? tx("tradeTitle") : tx("researchTitle")} · ${String(index + 1).padStart(2, "0")}`;
  if (hubTitleEl) hubTitleEl.textContent = title;
  if (hubDescEl) hubDescEl.textContent = desc;
  if (hubWaEl) hubWaEl.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Inquiry about " + title)}`;
  renderHubMedia(type, index);
}

function closeGateway() {
  document.body.classList.remove("subview");
  state.gateway = null;
  state.hub = null;
  document.getElementById("gatewayView").classList.remove("open");
  document.getElementById("hubView").classList.remove("open");
  document.getElementById("mainPage").hidden = false;

  // ✅ URL واپس مین پیج پر
  if (window.location.pathname !== "/") {
    history.pushState({}, "", "/");
  }
}

function escapeHtml(s) {
  return String(s).replace(/[&<>'"]/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[c])
  );
}

/* =========================================================
   SLUG GENERATOR — Converts hub title to URL slug
========================================================= */
function slugify(text) {
  if (!text) return "";
  const stopWords = ["for","of","on","the","and","with","in","at","to","by","a","an"];
  let words = String(text)
    .toLowerCase()
    .replace(/for chilghoza pine nuts/gi, "")
    .replace(/of chilghoza pine nuts/gi, "")
    .replace(/on chilghoza pine nuts/gi, "")
    .replace(/chilghoza pine nuts/gi, "")
    .replace(/[^a-z0-9\s-]/g, " ")
    .trim()
    .split(/\s+/)
    .filter(w => w && !stopWords.includes(w));
  words = words.slice(0, 3);
  return words.join("-");
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

  const parentCard = container.closest(".hub-media");
  const arr = await loadHubMedia(type, index);
  
  const lang = (typeof state !== "undefined" && state.lang) ? state.lang : "en";

  if (arr.length === 0 && !state.admin) {
    if (parentCard) parentCard.style.display = "none";
    return;
  }

  if (parentCard) parentCard.style.display = "";

  const uploadBtn = state.admin
    ? `<button class="btn btn-gold hubMediaUploadBtn" id="hubMediaUploadBtn" type="button">➕ Upload Media</button>`
    : "";

  if (arr.length === 0) {
    container.innerHTML = uploadBtn + `<p class="hub-media-empty">${tx("mediaEmpty")}</p>`;
  } else {
    const items = arr.map((m, i) => {
      // Bilingual caption + headline
      let capEN = "", capZH = "", headEN = "", headZH = "";
      if (typeof m.name === "string") { capEN = m.name || ""; }
      else if (m.name && typeof m.name === "object") {
        capEN = m.name.en || ""; capZH = m.name.zh || "";
      }
      if (typeof m.headline === "string") { headEN = m.headline || ""; }
      else if (m.headline && typeof m.headline === "object") {
        headEN = m.headline.en || ""; headZH = m.headline.zh || "";
      }
      
      const isZH = (lang === "zh");
      const caption = (isZH && capZH) ? capZH : capEN;
      const headline = (isZH && headZH) ? headZH : headEN;
      
      const style = m.style || {};
      const fontEN = style.fontEN || "'Playfair Display', serif";
      const fontZH = style.fontZH || "'Noto Sans SC', sans-serif";
      const sizeEN = style.sizeEN || "18px";
      const sizeZH = style.sizeZH || "20px";
      const bgEN = (style.en && style.en.bg) || "#d4af37";
      const colorEN = (style.en && style.en.color) || "#0a1810";
      const bgZH = (style.zh && style.zh.bg) || "#c8102e";
      const colorZH = (style.zh && style.zh.color) || "#ffffff";
      
      const font = isZH ? fontZH : fontEN;
      const size = isZH ? sizeZH : sizeEN;
      const bg = isZH ? bgZH : bgEN;
      const color = isZH ? colorZH : colorEN;

      const adminBtns = state.admin ? `
        <div class="hub-media-item-actions">
          <button class="hub-action-btn" data-media-edit="${type}:${index}:${i}" title="Edit" type="button">✏️</button>
          <button class="hub-action-btn danger" data-media-delete="${type}:${index}:${i}" title="Delete" type="button">🗑</button>
        </div>
      ` : "";

      let preview = "";
      if (m.type === "image") {
        preview = `<img src="${cloudinaryOptimize(m.url, 1200, 800)}" alt="${escapeHtml(caption)}" loading="lazy">`;
      } else if (m.type === "video") {
        preview = `<video src="${cloudinaryOptimize(m.url, 1200, 800)}" controls preload="metadata"></video>`;
      } else {
        preview = `<div class="hub-media-pdf"><span>📄</span><b>${escapeHtml(caption)}</b></div>`;
      }

      const headlineHtml = headline ? `
        <div class="gallery-headline" style="font-family:${font}; font-size:${size}; background:${bg}; color:${color};">
          ${escapeHtml(headline)}
        </div>
      ` : "";

      const captionHtml = caption ? `<div class="hub-media-caption">${escapeHtml(caption).replace(/\n/g, '<br>')}</div>` : "";

      return `
        <div class="hub-media-item" 
             data-lightbox-src="${cloudinaryOptimize(m.url, 1600, 2000, 'limit')}"
             data-lightbox-alt="${escapeHtml(caption)}">
          ${preview}
          ${headlineHtml}
          ${captionHtml}
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

    container.querySelectorAll("[data-media-edit]").forEach((b) => {
      b.onclick = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        const [t, idx, mi] = b.dataset.mediaEdit.split(":");
        editHubMediaItem(t, +idx, +mi);
      };
    });
  }
}

async function renderHubSectionMedia(type, index) {
  const hubKey = `${type}_${index}`;
  const container = document.getElementById(`hub-media-${hubKey}`);
  if (!container) return;

  const arr = await loadHubMedia(type, index);
  
  const lang = (typeof state !== "undefined" && state.lang) ? state.lang : "en";

  if (arr.length === 0 && !state.admin) {
    container.style.display = "none";
    return;
  }

  container.style.display = "";

  const uploadBtn = state.admin
    ? `<button class="btn btn-gold hubMediaUploadBtn" data-media-upload="${type}:${index}" type="button">➕ Upload Media</button>`
    : "";

  if (arr.length === 0) {
    container.innerHTML = uploadBtn + `<p class="hub-media-empty">No media yet. Upload images, videos or PDFs.</p>`;
  } else {
    const items = arr.map((m, i) => {
      // Bilingual caption + headline
      let capEN = "", capZH = "", headEN = "", headZH = "";
      if (typeof m.name === "string") { capEN = m.name || ""; }
      else if (m.name && typeof m.name === "object") {
        capEN = m.name.en || ""; capZH = m.name.zh || "";
      }
      if (typeof m.headline === "string") { headEN = m.headline || ""; }
      else if (m.headline && typeof m.headline === "object") {
        headEN = m.headline.en || ""; headZH = m.headline.zh || "";
      }
      
      const isZH = (lang === "zh");
      const caption = (isZH && capZH) ? capZH : capEN;
      const headline = (isZH && headZH) ? headZH : headEN;
      
      const style = m.style || {};
      const fontEN = style.fontEN || "'Playfair Display', serif";
      const fontZH = style.fontZH || "'Noto Sans SC', sans-serif";
      const sizeEN = style.sizeEN || "18px";
      const sizeZH = style.sizeZH || "20px";
      const bgEN = (style.en && style.en.bg) || "#d4af37";
      const colorEN = (style.en && style.en.color) || "#0a1810";
      const bgZH = (style.zh && style.zh.bg) || "#c8102e";
      const colorZH = (style.zh && style.zh.color) || "#ffffff";
      
      const font = isZH ? fontZH : fontEN;
      const size = isZH ? sizeZH : sizeEN;
      const bg = isZH ? bgZH : bgEN;
      const color = isZH ? colorZH : colorEN;

      const adminBtns = state.admin ? `
        <div class="hub-media-item-actions">
          <button class="hub-action-btn" data-media-edit="${type}:${index}:${i}" title="Edit" type="button">✏️</button>
          <button class="hub-action-btn danger" data-media-delete="${type}:${index}:${i}" title="Delete" type="button">🗑</button>
        </div>
      ` : "";

      let preview = "";
      if (m.type === "image") {
        preview = `<img src="${cloudinaryOptimize(m.url, 1200, 800)}" alt="${escapeHtml(caption)}" loading="lazy">`;
      } else if (m.type === "video") {
        preview = `<video src="${cloudinaryOptimize(m.url, 1200, 800)}" controls preload="metadata"></video>`;
      } else {
        preview = `<div class="hub-media-pdf"><span>📄</span><b>${escapeHtml(caption)}</b></div>`;
      }

      const headlineHtml = headline ? `
        <div class="gallery-headline" style="font-family:${font}; font-size:${size}; background:${bg}; color:${color};">
          ${escapeHtml(headline)}
        </div>
      ` : "";

      const captionHtml = caption ? `<div class="hub-media-caption">${escapeHtml(caption).replace(/\n/g, '<br>')}</div>` : "";

      return `
        <div class="hub-media-item" 
             data-lightbox-src="${cloudinaryOptimize(m.url, 1600, 2000, 'limit')}"
             data-lightbox-alt="${escapeHtml(caption)}">
          ${preview}
          ${headlineHtml}
          ${captionHtml}
          ${adminBtns}
        </div>
      `;
    }).join("");

    container.innerHTML = uploadBtn + `<div class="hub-media-grid">${items}</div>`;
  }

  if (state.admin) {
    const upBtn = container.querySelector("[data-media-upload]");
    if (upBtn) {
      const [t, i] = upBtn.dataset.mediaUpload.split(":");
      upBtn.onclick = () => uploadHubMedia(t, +i);
    }

    container.querySelectorAll("[data-media-delete]").forEach((b) => {
      b.onclick = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        const [t, idx, mi] = b.dataset.mediaDelete.split(":");
        await deleteHubMediaItem(t, +idx, +mi);
      };
    });

    container.querySelectorAll("[data-media-edit]").forEach((b) => {
      b.onclick = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        const [t, idx, mi] = b.dataset.mediaEdit.split(":");
        editHubMediaItem(t, +idx, +mi);
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
    
    <label style="margin-top:18px;">HEADLINE — English:</label>
    <input type="text" id="hubMediaHeadEN" placeholder="English headline...">
    
    <label>HEADLINE — 中文:</label>
    <input type="text" id="hubMediaHeadZH" placeholder="中文标题...">
    
    <label style="margin-top:18px; color:var(--gold); font-weight:600;">━━━ ENGLISH STYLE ━━━</label>
    
    <label>English Font:</label>
    <select id="hubMediaFontEN">
      <option value="'Playfair Display', serif">Playfair Display</option>
      <option value="'Cormorant Garamond', serif">Cormorant Garamond</option>
      <option value="'Cinzel', serif">Cinzel</option>
      <option value="'Montserrat', sans-serif">Montserrat</option>
      <option value="'Oswald', sans-serif">Oswald</option>
    </select>
    
    <label>English Size:</label>
    <select id="hubMediaSizeEN">
      <option value="14px">S (14px)</option>
      <option value="18px" selected>M (18px)</option>
      <option value="22px">L (22px)</option>
      <option value="28px">XL (28px)</option>
      <option value="34px">XXL (34px)</option>
    </select>
    
    <label>English BG Color:</label>
    <input type="color" id="hubMediaBgEN" value="#d4af37" style="width:100%;height:40px;border-radius:8px;cursor:pointer;padding:4px;">
    
    <label>English Text Color:</label>
    <input type="color" id="hubMediaColorEN" value="#0a1810" style="width:100%;height:40px;border-radius:8px;cursor:pointer;padding:4px;">
    
    <label style="margin-top:18px; color:var(--gold); font-weight:600;">━━━ 中文样式 ━━━</label>
    
    <label>Chinese Font:</label>
    <select id="hubMediaFontZH">
  <option value="'Noto Sans SC', sans-serif" style="font-family: 'Noto Sans SC', sans-serif;" selected>Noto Sans SC</option>
  <option value="'Noto Serif SC', serif" style="font-family: 'Noto Serif SC', serif;">Noto Serif SC</option>
  <option value="'Ma Shan Zheng', cursive" style="font-family: 'Ma Shan Zheng', cursive;">Ma Shan Zheng</option>
  <option value="'ZCOOL XiaoWei', serif" style="font-family: 'ZCOOL XiaoWei', serif;">ZCOOL XiaoWei</option>
  <option value="'Long Cang', cursive" style="font-family: 'Long Cang', cursive;">Long Cang</option>
</select>
    
    <label>Chinese Size:</label>
    <select id="hubMediaSizeZH">
      <option value="16px">S (16px)</option>
      <option value="20px" selected>M (20px)</option>
      <option value="24px">L (24px)</option>
      <option value="30px">XL (30px)</option>
      <option value="36px">XXL (36px)</option>
    </select>
    
    <label>Chinese BG Color:</label>
    <input type="color" id="hubMediaBgZH" value="#c8102e" style="width:100%;height:40px;border-radius:8px;cursor:pointer;padding:4px;">
    
    <label>Chinese Text Color:</label>
    <input type="color" id="hubMediaColorZH" value="#ffffff" style="width:100%;height:40px;border-radius:8px;cursor:pointer;padding:4px;">
    
    <label style="margin-top:18px;">CAPTION — English:</label>
    <textarea id="hubMediaCapEN" rows="3" placeholder="English caption..." style="width:100%; padding:12px 14px; border-radius:8px; border:1px solid var(--line); background:rgba(3,20,10,0.7); color:var(--text); font-family:var(--body-font); font-size:0.9rem; resize:vertical;"></textarea>
    
    <label>CAPTION — 中文:</label>
    <textarea id="hubMediaCapZH" rows="3" placeholder="中文说明..." style="width:100%; padding:12px 14px; border-radius:8px; border:1px solid var(--line); background:rgba(3,20,10,0.7); color:var(--text); font-family:var(--body-font); font-size:0.9rem; resize:vertical;"></textarea>
    `,
    async () => {
      const fileInput = document.getElementById("hubMediaFile");
      const headEN = document.getElementById("hubMediaHeadEN").value.trim();
      const headZH = document.getElementById("hubMediaHeadZH").value.trim();
      const fontEN = document.getElementById("hubMediaFontEN").value;
      const fontZH = document.getElementById("hubMediaFontZH").value;
      const sizeEN = document.getElementById("hubMediaSizeEN").value;
      const sizeZH = document.getElementById("hubMediaSizeZH").value;
      const bgEN = document.getElementById("hubMediaBgEN").value;
      const colorEN = document.getElementById("hubMediaColorEN").value;
      const bgZH = document.getElementById("hubMediaBgZH").value;
      const colorZH = document.getElementById("hubMediaColorZH").value;
      const capEN = document.getElementById("hubMediaCapEN").value.trim();
      const capZH = document.getElementById("hubMediaCapZH").value.trim();

      const file = fileInput.files[0];
      if (!file) { setEditStatus("❌ Select a file first", "error"); return; }
      if (!capEN && !capZH) { setEditStatus("❌ Caption required", "error"); return; }

      setEditStatus("Uploading to Cloudinary...", "");
      const folder = `hubs/${type}-${index}`;
      const fd = new FormData();
      fd.append("file", file);
      fd.append("folder", folder);

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
          name: { en: capEN, zh: capZH },
          headline: { en: headEN, zh: headZH },
          type: mtype,
          size: d.bytes || file.size,
          uploaded: Date.now(),
          style: {
            fontEN, fontZH, sizeEN, sizeZH,
            en: { bg: bgEN, color: colorEN },
            zh: { bg: bgZH, color: colorZH }
          }
        });

        setEditStatus("Saving...", "");
        const ok = await saveHubMedia(type, index, arr);
        if (ok) {
          setEditStatus("✅ Uploaded!", "success");
          if (state.gateway && !state.hub) {
            await renderHubSectionMedia(type, index);
          } else {
            await renderHubMedia(type, index);
          }
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
    if (state.gateway && !state.hub) {
      await renderHubSectionMedia(type, index);
    } else {
      await renderHubMedia(type, index);
    }
  } else {
    alert("❌ Delete failed.");
  }
}

function editHubMediaItem(type, index, mediaIndex) {
  const arr = hubMediaCache[`hub_media_${type}_${index}`] || [];
  const item = arr[mediaIndex];
  if (!item) return;

  // Bilingual caption + headline
  let capEN = "", capZH = "", headEN = "", headZH = "";
  if (typeof item.name === "string") {
    capEN = item.name || "";
  } else if (item.name && typeof item.name === "object") {
    capEN = item.name.en || "";
    capZH = item.name.zh || "";
  }
  if (typeof item.headline === "string") {
    headEN = item.headline || "";
  } else if (item.headline && typeof item.headline === "object") {
    headEN = item.headline.en || "";
    headZH = item.headline.zh || "";
  }

  const style = item.style || {};
  const fontEN = style.fontEN || "'Playfair Display', serif";
  const fontZH = style.fontZH || "'Noto Sans SC', sans-serif";
  const sizeEN = style.sizeEN || "18px";
  const sizeZH = style.sizeZH || "20px";
  const bgEN = (style.en && style.en.bg) || "#d4af37";
  const colorEN = (style.en && style.en.color) || "#0a1810";
  const bgZH = (style.zh && style.zh.bg) || "#c8102e";
  const colorZH = (style.zh && style.zh.color) || "#ffffff";

  let previewHtml = "";
  if (item.type === "image") {
    previewHtml = `<img src="${item.url}" class="edit-modal-preview">`;
  } else if (item.type === "video") {
    previewHtml = `<video src="${item.url}" controls class="edit-modal-preview"></video>`;
  } else {
    previewHtml = `<p style="color:var(--muted);text-align:center;padding:20px;">📄 PDF File</p>`;
  }

  openEditModal(
    `✏️ Edit Media`,
    `
    <label>Preview:</label>
    ${previewHtml}
    
    <label style="margin-top:18px; color:var(--gold); font-weight:600;">━━━ REPLACE MEDIA (OPTIONAL) ━━━</label>
    <label>Upload New File:</label>
    <input type="file" id="editHubMediaFile" accept="image/*,video/*,application/pdf" style="width:100%; padding:10px; border-radius:8px; border:1px solid var(--line); background:rgba(3,20,10,0.7); color:var(--text); margin-bottom:8px;">
    
    <label>OR Paste URL:</label>
    <input type="text" id="editHubMediaUrl" value="${escapeHtml(item.url)}" placeholder="https://..." style="width:100%; padding:12px 14px; border-radius:8px; border:1px solid var(--line); background:rgba(3,20,10,0.7); color:var(--text); font-family:var(--body-font); font-size:0.9rem;">
    
    <label style="margin-top:18px;">HEADLINE — English:</label>
    <input type="text" id="editHubMediaHeadEN" value="${escapeHtml(headEN)}" placeholder="English headline...">
    
    <label>HEADLINE — 中文:</label>
    <input type="text" id="editHubMediaHeadZH" value="${escapeHtml(headZH)}" placeholder="中文标题...">
    
    <label style="margin-top:18px; color:var(--gold); font-weight:600;">━━━ ENGLISH STYLE ━━━</label>
    
    <label>English Font:</label>
    <select id="editHubMediaFontEN">
  <option value="'Playfair Display', serif" ${fontEN.includes("Playfair") ? "selected" : ""}>Playfair Display (Classic)</option>
  <option value="'Cormorant Garamond', serif" ${fontEN.includes("Cormorant") ? "selected" : ""}>Cormorant Garamond (Elegant)</option>
  <option value="'Cinzel', serif" ${fontEN.includes("Cinzel") ? "selected" : ""}>Cinzel (Roman)</option>
  <option value="'Montserrat', sans-serif" ${fontEN.includes("Montserrat") ? "selected" : ""}>Montserrat (Bold)</option>
  <option value="'Oswald', sans-serif" ${fontEN.includes("Oswald") ? "selected" : ""}>Oswald (Strong)</option>
</select>
    
    <label>English Size:</label>
    <select id="editHubMediaSizeEN">
      <option value="14px" ${sizeEN === "14px" ? "selected" : ""}>S (14px)</option>
      <option value="18px" ${sizeEN === "18px" ? "selected" : ""}>M (18px)</option>
      <option value="22px" ${sizeEN === "22px" ? "selected" : ""}>L (22px)</option>
      <option value="28px" ${sizeEN === "28px" ? "selected" : ""}>XL (28px)</option>
      <option value="34px" ${sizeEN === "34px" ? "selected" : ""}>XXL (34px)</option>
    </select>
    
    <label>English BG Color:</label>
    <input type="color" id="editHubMediaBgEN" value="${bgEN}" style="width:100%;height:40px;border-radius:8px;cursor:pointer;padding:4px;">
    
    <label>English Text Color:</label>
    <input type="color" id="editHubMediaColorEN" value="${colorEN}" style="width:100%;height:40px;border-radius:8px;cursor:pointer;padding:4px;">
    
    <label style="margin-top:18px; color:var(--gold); font-weight:600;">━━━ 中文样式 ━━━</label>
    
    <label>Chinese Font:</label>
    <select id="editHubMediaFontZH">
  <option value="'Noto Sans SC', sans-serif" ${fontZH.includes("Noto") ? "selected" : ""}>Noto Sans SC (简体)</option>
  <option value="'Noto Serif SC', serif" ${fontZH.includes("Noto Serif") ? "selected" : ""}>Noto Serif SC (宋体)</option>
  <option value="'Ma Shan Zheng', cursive" ${fontZH.includes("Ma Shan") ? "selected" : ""}>Ma Shan Zheng (书法)</option>
  <option value="'ZCOOL XiaoWei', serif" ${fontZH.includes("ZCOOL") ? "selected" : ""}>ZCOOL XiaoWei (雅致)</option>
  <option value="'Long Cang', cursive" ${fontZH.includes("Long Cang") ? "selected" : ""}>Long Cang (草书)</option>
</select>
    
    <label>Chinese Size:</label>
    <select id="editHubMediaSizeZH">
      <option value="16px" ${sizeZH === "16px" ? "selected" : ""}>S (16px)</option>
      <option value="20px" ${sizeZH === "20px" ? "selected" : ""}>M (20px)</option>
      <option value="24px" ${sizeZH === "24px" ? "selected" : ""}>L (24px)</option>
      <option value="30px" ${sizeZH === "30px" ? "selected" : ""}>XL (30px)</option>
      <option value="36px" ${sizeZH === "36px" ? "selected" : ""}>XXL (36px)</option>
    </select>
    
    <label>Chinese BG Color:</label>
    <input type="color" id="editHubMediaBgZH" value="${bgZH}" style="width:100%;height:40px;border-radius:8px;cursor:pointer;padding:4px;">
    
    <label>Chinese Text Color:</label>
    <input type="color" id="editHubMediaColorZH" value="${colorZH}" style="width:100%;height:40px;border-radius:8px;cursor:pointer;padding:4px;">
    
    <label style="margin-top:18px;">CAPTION — English:</label>
    <textarea id="editHubMediaCapEN" rows="3" placeholder="English caption..." style="width:100%; padding:12px 14px; border-radius:8px; border:1px solid var(--line); background:rgba(3,20,10,0.7); color:var(--text); font-family:var(--body-font); font-size:0.9rem; resize:vertical;">${escapeHtml(capEN)}</textarea>
    
    <label>CAPTION — 中文:</label>
    <textarea id="editHubMediaCapZH" rows="3" placeholder="中文说明..." style="width:100%; padding:12px 14px; border-radius:8px; border:1px solid var(--line); background:rgba(3,20,10,0.7); color:var(--text); font-family:var(--body-font); font-size:0.9rem; resize:vertical;">${escapeHtml(capZH)}</textarea>
    `,
    async () => {
      const fileInput = document.getElementById("editHubMediaFile");
      const urlInput = document.getElementById("editHubMediaUrl");
      const headEN = document.getElementById("editHubMediaHeadEN").value.trim();
      const headZH = document.getElementById("editHubMediaHeadZH").value.trim();
      const fontEN = document.getElementById("editHubMediaFontEN").value;
      const fontZH = document.getElementById("editHubMediaFontZH").value;
      const sizeEN = document.getElementById("editHubMediaSizeEN").value;
      const sizeZH = document.getElementById("editHubMediaSizeZH").value;
      const bgEN = document.getElementById("editHubMediaBgEN").value;
      const colorEN = document.getElementById("editHubMediaColorEN").value;
      const bgZH = document.getElementById("editHubMediaBgZH").value;
      const colorZH = document.getElementById("editHubMediaColorZH").value;
      const capEN = document.getElementById("editHubMediaCapEN").value.trim();
      const capZH = document.getElementById("editHubMediaCapZH").value.trim();

      if (!capEN && !capZH) { setEditStatus("❌ Caption required", "error"); return; }

      let newUrl = urlInput.value.trim();
      let newPublicId = item.public_id;
      let newType = item.type;

      // ✅ اگر نئی فائل اپلوڈ کی گئی ہے
      if (fileInput.files[0]) {
        setEditStatus("Uploading new media...", "");
        const file = fileInput.files[0];
        const ext = (file.name.split(".").pop() || "").toLowerCase();
        if (["mp4","webm","mov","avi"].includes(ext)) newType = "video";
        else if (["pdf","doc","docx"].includes(ext)) newType = "raw";
        else newType = "image";

        const fd = new FormData();
        fd.append("file", file);
        fd.append("folder", `hubs/${type}-${index}`);

        try {
          const r = await fetch("/api/media/upload", {
            method: "POST",
            headers: { Authorization: "Bearer " + state.token },
            body: fd,
          });
          const d = await r.json();
          if (d.ok) {
            newUrl = d.url;
            newPublicId = d.public_id || d.key;
          } else {
            setEditStatus("❌ Upload failed: " + (d.error || "unknown"), "error");
            return;
          }
        } catch (e) {
          setEditStatus("❌ Upload error: " + e.message, "error");
          return;
        }
      }

      if (!newUrl) { setEditStatus("❌ URL or File required", "error"); return; }

      setEditStatus("Saving...", "");
      const arr2 = await loadHubMedia(type, index);
      
      // ✅ URL, ID اور Type اپڈیٹ کریں
      arr2[mediaIndex].url = newUrl;
      arr2[mediaIndex].public_id = newPublicId;
      arr2[mediaIndex].type = newType;
      
      // باقی کیپشن اور سٹائل اپڈیٹ کریں
      arr2[mediaIndex].name = { en: capEN, zh: capZH };
      arr2[mediaIndex].headline = { en: headEN, zh: headZH };
      arr2[mediaIndex].style = {
        fontEN, fontZH, sizeEN, sizeZH,
        en: { bg: bgEN, color: colorEN },
        zh: { bg: bgZH, color: colorZH }
      };
      
      const ok = await saveHubMedia(type, index, arr2);

      if (ok) {
        setEditStatus("✅ Media updated!", "success");
        if (state.gateway && !state.hub) {
          await renderHubSectionMedia(type, index);
        } else {
          await renderHubMedia(type, index);
        }
        setTimeout(closeEditModal, 1000);
      } else {
        setEditStatus("❌ Save failed", "error");
      }
    }
  );
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
    heading: saved.heading || "#F4F1E9",
    captionText: saved.captionText || "#F5F1E8",
    captionBg: saved.captionBg || "#0A2F1E",
    mediaBox: saved.mediaBox || "#0A2F1E"
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

  // ===== NEW: Media Caption Pickers =====
  const captionTextEl = document.getElementById("pickerCaptionText");
  const captionBgEl = document.getElementById("pickerCaptionBg");
  const mediaBoxEl = document.getElementById("pickerMediaBox");

  if (captionTextEl) {
    pickers.captionText = new iro.ColorPicker("#pickerCaptionText", {
      width: 130, color: defaults.captionText, borderWidth: 1, borderColor: "rgba(212,175,55,0.3)",
      layout: [{ component: iro.ui.Wheel }, { component: iro.ui.Slider, options: { sliderType: "value" } }]
    });
    pickers.captionText.on("color:change", (color) => {
      document.getElementById("hexCaptionText").textContent = color.hexString.toUpperCase();
      document.documentElement.style.setProperty("--caption-text-color", color.hexString);
      autoSaveTheme();
    });
  }
  if (captionBgEl) {
    pickers.captionBg = new iro.ColorPicker("#pickerCaptionBg", {
      width: 130, color: defaults.captionBg, borderWidth: 1, borderColor: "rgba(212,175,55,0.3)",
      layout: [{ component: iro.ui.Wheel }, { component: iro.ui.Slider, options: { sliderType: "value" } }]
    });
    pickers.captionBg.on("color:change", (color) => {
      document.getElementById("hexCaptionBg").textContent = color.hexString.toUpperCase();
      document.documentElement.style.setProperty("--caption-bg-color", color.hexString);
      autoSaveTheme();
    });
  }
  if (mediaBoxEl) {
    pickers.mediaBox = new iro.ColorPicker("#pickerMediaBox", {
      width: 130, color: defaults.mediaBox, borderWidth: 1, borderColor: "rgba(212,175,55,0.3)",
      layout: [{ component: iro.ui.Wheel }, { component: iro.ui.Slider, options: { sliderType: "value" } }]
    });
    pickers.mediaBox.on("color:change", (color) => {
      document.getElementById("hexMediaBox").textContent = color.hexString.toUpperCase();
      document.documentElement.style.setProperty("--media-box-bg", color.hexString);
      autoSaveTheme();
    });
  }

  // ===== NEW: Load caption size + weight =====
  const sizeEl = document.getElementById("captionFontSize");
  const weightEl = document.getElementById("captionFontWeight");
  if (sizeEl) {
    sizeEl.value = saved.captionFontSize || 1.05;
    document.getElementById("captionSizeVal").textContent = (saved.captionFontSize || 1.05) + "rem";
    document.documentElement.style.setProperty("--caption-font-size", (saved.captionFontSize || 1.05) + "rem");
  }
  if (weightEl) {
    weightEl.value = saved.captionFontWeight || "500";
    const labels = { "300": "Light", "400": "Normal", "500": "Medium", "600": "Semi Bold", "700": "Bold" };
    document.getElementById("captionWeightVal").textContent = labels[saved.captionFontWeight || "500"];
    document.documentElement.style.setProperty("--caption-font-weight", saved.captionFontWeight || "500");
  }

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
    bodyFont: document.getElementById("bodyFont")?.value || "'Inter', Arial, sans-serif",
    captionFontSize: parseFloat(document.getElementById("captionFontSize")?.value) || 1.05,
    captionFontWeight: document.getElementById("captionFontWeight")?.value || "500",
    captionText: pickers.captionText ? pickers.captionText.color.hexString : "#F5F1E8",
    captionBg: pickers.captionBg ? pickers.captionBg.color.hexString : "#0A2F1E",
    mediaBox: pickers.mediaBox ? pickers.mediaBox.color.hexString : "#0A2F1E"
  };
}

/* =========================================================
   GLOBAL THEME — Save/Load from KV (Admin-controlled)
========================================================= */
async function saveThemeGlobal() {
  if (!state.admin || !state.token) return false;
  const theme = readThemeFromUI();
  try {
    const r = await fetch("/api/kv/set", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + state.token,
      },
      body: JSON.stringify({ key: "site_theme", value: theme }),
    });
    const data = await r.json();
    
    // ✅ جب ایڈمن سیو کرے تو براؤزر میں بھی محفوظ کر لو تاکہ فوراً لوڈ ہو
    if (data.ok) {
      localStorage.setItem("royalGlobalTheme", JSON.stringify(theme));
      localStorage.setItem(THEME_KEY, JSON.stringify(theme));
    }
    
    return data.ok;
  } catch (e) {
    return false;
  }
}

async function loadThemeGlobal() {
  try {
    const r = await fetch("/api/kv/get/site_theme");
    if (!r.ok) return null;
    const data = await r.json();
    return data.ok && data.value && typeof data.value === "object" ? data.value : null;
  } catch (e) {
    return null;
  }
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

  // ===== Apply caption styles =====
  if (theme.captionFontSize) root.style.setProperty("--caption-font-size", theme.captionFontSize + "rem");
  if (theme.captionFontWeight) root.style.setProperty("--caption-font-weight", theme.captionFontWeight);
  if (theme.captionText) root.style.setProperty("--caption-text-color", theme.captionText);
  if (theme.captionBg) root.style.setProperty("--caption-bg-color", theme.captionBg);
  if (theme.mediaBox) root.style.setProperty("--media-box-bg", theme.mediaBox);

  if (document.getElementById("hexBg") && theme.bg) document.getElementById("hexBg").textContent = theme.bg.toUpperCase();
  if (document.getElementById("hexGold") && theme.gold) document.getElementById("hexGold").textContent = theme.gold.toUpperCase();
  if (document.getElementById("hexText") && theme.text) document.getElementById("hexText").textContent = theme.text.toUpperCase();
  if (document.getElementById("hexHeading") && theme.heading) document.getElementById("hexHeading").textContent = theme.heading.toUpperCase();

  // ===== Update caption hex labels =====
  if (document.getElementById("hexCaptionText") && theme.captionText) document.getElementById("hexCaptionText").textContent = theme.captionText.toUpperCase();
  if (document.getElementById("hexCaptionBg") && theme.captionBg) document.getElementById("hexCaptionBg").textContent = theme.captionBg.toUpperCase();
  if (document.getElementById("hexMediaBox") && theme.mediaBox) document.getElementById("hexMediaBox").textContent = theme.mediaBox.toUpperCase();
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

  // ===== Caption Font Size + Weight =====
  const captionFontSize = document.getElementById("captionFontSize");
  const captionFontWeight = document.getElementById("captionFontWeight");

  if (captionFontSize) captionFontSize.addEventListener("input", () => {
    const val = parseFloat(captionFontSize.value);
    document.getElementById("captionSizeVal").textContent = val + "rem";
    document.documentElement.style.setProperty("--caption-font-size", val + "rem");
    autoSaveTheme();
  });
  if (captionFontWeight) captionFontWeight.addEventListener("change", () => {
    const labels = { "300": "Light", "400": "Normal", "500": "Medium", "600": "Semi Bold", "700": "Bold" };
    document.getElementById("captionWeightVal").textContent = labels[captionFontWeight.value];
    document.documentElement.style.setProperty("--caption-font-weight", captionFontWeight.value);
    autoSaveTheme();
  });

  // ✅ نیا Save بٹن (کنفرمیشن الرٹ کے ساتھ)
  const saveBtn = document.getElementById("themeSave");
  if (saveBtn) {
    saveBtn.addEventListener("click", async () => {
      autoSaveTheme();
      const status = document.getElementById("adminStatus");
      if (status) status.textContent = "⏳ Saving for ALL users...";
      
      // بٹن پر لوڈنگ کا اثر
      const originalText = saveBtn.textContent;
      saveBtn.textContent = "⏳ Saving...";
      saveBtn.disabled = true;

      const ok = await saveThemeGlobal();
      
      saveBtn.disabled = false;
      saveBtn.textContent = originalText;

      if (ok) {
        if (status) status.textContent = "✅ Theme permanently saved for ALL users!";
        // ✅ واضح کنفرمیشن پاپ اپ
        alert("✅ Theme Saved Successfully!\n\nThis theme is now final and will appear for all visitors worldwide.");
      } else {
        if (status) status.textContent = "❌ Save failed. Please login again.";
        alert("❌ Save failed! Please check your connection or login again.");
      }
    });
  }

  const resetBtn = document.getElementById("themeReset");
  if (resetBtn) resetBtn.addEventListener("click", () => {
    localStorage.removeItem(THEME_KEY);
    localStorage.removeItem("royalGlobalTheme");
    const defaults = {
      bg: "#03140A", gold: "#D4AF37", text: "#F4F1E9", heading: "#F4F1E9",
      captionFontSize: 1.05, captionFontWeight: "500",
      captionText: "#F5F1E8", captionBg: "#0A2F1E", mediaBox: "#0A2F1E"
    };
    applyFullTheme(defaults);
    if (pickers.bg) pickers.bg.color.hexString = defaults.bg;
    if (pickers.gold) pickers.gold.color.hexString = defaults.gold;
    if (pickers.text) pickers.text.color.hexString = defaults.text;
    if (pickers.heading) pickers.heading.color.hexString = defaults.heading;
    if (pickers.captionText) pickers.captionText.color.hexString = defaults.captionText;
    if (pickers.captionBg) pickers.captionBg.color.hexString = defaults.captionBg;
    if (pickers.mediaBox) pickers.mediaBox.color.hexString = defaults.mediaBox;
    if (baseFont) { baseFont.value = 16; document.getElementById("baseFontVal").textContent = "16px"; }
    if (headingScale) { headingScale.value = 1; document.getElementById("headingScaleVal").textContent = "1.0x"; }
    if (captionFontSize) { captionFontSize.value = 1.05; document.getElementById("captionSizeVal").textContent = "1.05rem"; }
    if (captionFontWeight) { captionFontWeight.value = "500"; document.getElementById("captionWeightVal").textContent = "Medium"; }
    document.documentElement.style.setProperty("--font-scale", 1);
    document.documentElement.style.setProperty("--caption-font-size", "1.05rem");
    document.documentElement.style.setProperty("--caption-font-weight", "500");
    document.documentElement.style.setProperty("--caption-text-color", "#F5F1E8");
    document.documentElement.style.setProperty("--caption-bg-color", "#0A2F1E");
    document.documentElement.style.setProperty("--media-box-bg", "#0A2F1E");
    saveThemeGlobal();
    const status = document.getElementById("adminStatus");
    if (status) status.textContent = "↺ Theme reset for ALL users.";
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
    heroBg.style.background = `url("${cloudinaryOptimize(heroImageUrl, 1920, 1080)}") center / cover no-repeat`;
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
  if (img) img.src = cloudinaryOptimize(profileImageUrl, 600, 600);
}

/* =========================================================
   EDIT: GALLERY ITEM
========================================================= */

function editGalleryItem(index) {
  const item = galleryItems[index] || ["", "", "image", "", {}];
  const currentSrc = item[0] || "";
  const currentType = item[2] || "image";
  const currentStyle = item[4] || {};
  
  let capEN = "", capZH = "";
  if (typeof item[1] === "string") { capEN = item[1] || ""; }
  else if (item[1] && typeof item[1] === "object") {
    capEN = item[1].en || ""; capZH = item[1].zh || "";
  }
  
  let headEN = "", headZH = "";
  if (typeof item[3] === "string") { headEN = item[3] || ""; }
  else if (item[3] && typeof item[3] === "object") {
    headEN = item[3].en || ""; headZH = item[3].zh || "";
  }
  
  const fontEN = currentStyle.fontEN || currentStyle.font || "'Playfair Display', serif";
  const fontZH = currentStyle.fontZH || "'Noto Sans SC', sans-serif";
  const sizeEN = currentStyle.sizeEN || currentStyle.size || "18px";
  const sizeZH = currentStyle.sizeZH || currentStyle.size || "20px";
  const bgEN = (currentStyle.en && currentStyle.en.bg) || currentStyle.bg || "#d4af37";
  const colorEN = (currentStyle.en && currentStyle.en.color) || currentStyle.color || "#0a1810";
  const bgZH = (currentStyle.zh && currentStyle.zh.bg) || "#c8102e";
  const colorZH = (currentStyle.zh && currentStyle.zh.color) || "#ffffff";

  let previewHtml = "";
  if (currentType === "video") {
    previewHtml = `<video src="${currentSrc}" controls style="max-width:100%; max-height:180px; border-radius:10px; margin-top:8px;"></video>`;
  } else if (currentType === "pdf") {
    previewHtml = `<div style="padding:20px; text-align:center; background:#0a2f1e; border-radius:10px; margin-top:8px; color:var(--gold);">📄 PDF Document</div>`;
  } else {
    previewHtml = `<img src="${currentSrc}" class="edit-modal-preview" alt="Gallery">`;
  }

  openEditModal(
    `✏️ Edit Gallery Item #${index + 1}`,
    `
    <label>Current ${currentType.toUpperCase()}:</label>
    ${previewHtml}
    
    <label style="margin-top:18px;">HEADLINE — English:</label>
    <input type="text" id="editGalleryHeadEN" value="${escapeHtml(headEN)}" placeholder="English headline...">
    
    <label>HEADLINE — 中文:</label>
    <input type="text" id="editGalleryHeadZH" value="${escapeHtml(headZH)}" placeholder="中文标题...">
    
    <label style="margin-top:18px; color:var(--gold); font-weight:600;">━━━ ENGLISH STYLE ━━━</label>
    
    <label>English Font:</label>
    <select id="editGalleryFontEN">
      <option value="'Playfair Display', serif" ${fontEN.includes("Playfair") ? "selected" : ""}>Playfair Display (Classic)</option>
      <option value="'Cormorant Garamond', serif" ${fontEN.includes("Cormorant") ? "selected" : ""}>Cormorant Garamond (Elegant)</option>
      <option value="'Cinzel', serif" ${fontEN.includes("Cinzel") ? "selected" : ""}>Cinzel (Roman)</option>
      <option value="'Montserrat', sans-serif" ${fontEN.includes("Montserrat") ? "selected" : ""}>Montserrat (Bold)</option>
      <option value="'Oswald', sans-serif" ${fontEN.includes("Oswald") ? "selected" : ""}>Oswald (Strong)</option>
    </select>
    
    <label>English Size:</label>
    <select id="editGallerySizeEN">
      <option value="14px" ${sizeEN === "14px" ? "selected" : ""}>S — Small (14px)</option>
      <option value="18px" ${sizeEN === "18px" ? "selected" : ""}>M — Medium (18px)</option>
      <option value="22px" ${sizeEN === "22px" ? "selected" : ""}>L — Large (22px)</option>
      <option value="28px" ${sizeEN === "28px" ? "selected" : ""}>XL — Extra Large (28px)</option>
      <option value="34px" ${sizeEN === "34px" ? "selected" : ""}>XXL — Huge (34px)</option>
    </select>
    
    <label>English BG Color:</label>
    <input type="color" id="editGalleryBgEN" value="${bgEN}" style="width:100%;height:40px;border-radius:8px;border:1px solid var(--line);cursor:pointer;padding:4px;">
    
    <label>English Text Color:</label>
    <input type="color" id="editGalleryColorEN" value="${colorEN}" style="width:100%;height:40px;border-radius:8px;border:1px solid var(--line);cursor:pointer;padding:4px;">
    
    <label style="margin-top:18px; color:var(--gold); font-weight:600;">━━━ 中文样式 ━━━</label>
    
    <label>Chinese Font:</label>
    <select id="editGalleryFontZH">
      <option value="'Noto Sans SC', sans-serif" ${fontZH.includes("Noto") ? "selected" : ""}>Noto Sans SC (简体)</option>
      <option value="'Noto Serif SC', serif" ${fontZH.includes("Noto Serif") ? "selected" : ""}>Noto Serif SC (宋体)</option>
      <option value="'Ma Shan Zheng', cursive" ${fontZH.includes("Ma Shan") ? "selected" : ""}>Ma Shan Zheng (书法)</option>
      <option value="'ZCOOL XiaoWei', serif" ${fontZH.includes("ZCOOL") ? "selected" : ""}>ZCOOL XiaoWei (雅致)</option>
      <option value="'Long Cang', cursive" ${fontZH.includes("Long Cang") ? "selected" : ""}>Long Cang (草书)</option>
    </select>
    
    <label>Chinese Size:</label>
    <select id="editGallerySizeZH">
      <option value="16px" ${sizeZH === "16px" ? "selected" : ""}>S — Small (16px)</option>
      <option value="20px" ${sizeZH === "20px" ? "selected" : ""}>M — Medium (20px)</option>
      <option value="24px" ${sizeZH === "24px" ? "selected" : ""}>L — Large (24px)</option>
      <option value="30px" ${sizeZH === "30px" ? "selected" : ""}>XL — Extra Large (30px)</option>
      <option value="36px" ${sizeZH === "36px" ? "selected" : ""}>XXL — Huge (36px)</option>
    </select>
    
    <label>Chinese BG Color:</label>
    <input type="color" id="editGalleryBgZH" value="${bgZH}" style="width:100%;height:40px;border-radius:8px;border:1px solid var(--line);cursor:pointer;padding:4px;">
    
    <label>Chinese Text Color:</label>
    <input type="color" id="editGalleryColorZH" value="${colorZH}" style="width:100%;height:40px;border-radius:8px;border:1px solid var(--line);cursor:pointer;padding:4px;">
    
    <label style="margin-top:18px;">CAPTION — English:</label>
    <textarea id="editGalleryCapEN" rows="4" placeholder="English caption..." style="width:100%; padding:12px 14px; border-radius:8px; border:1px solid var(--line); background:rgba(3,20,10,0.7); color:var(--text); font-family:var(--body-font); font-size:0.9rem; resize:vertical;">${escapeHtml(capEN)}</textarea>
    
    <label>CAPTION — 中文:</label>
    <textarea id="editGalleryCapZH" rows="4" placeholder="中文说明..." style="width:100%; padding:12px 14px; border-radius:8px; border:1px solid var(--line); background:rgba(3,20,10,0.7); color:var(--text); font-family:var(--body-font); font-size:0.9rem; resize:vertical;">${escapeHtml(capZH)}</textarea>
    
    <label>Upload New File (optional):</label>
    <input type="file" id="editGalleryFile" accept="image/*,video/*,application/pdf">
    
    <label>OR Paste URL:</label>
    <input type="text" id="editGalleryUrl" placeholder="https://..." value="${currentSrc}">
    `,
    async () => {
      const headENInput = document.getElementById("editGalleryHeadEN");
      const headZHInput = document.getElementById("editGalleryHeadZH");
      const fontENInput = document.getElementById("editGalleryFontEN");
      const fontZHInput = document.getElementById("editGalleryFontZH");
      const sizeENInput = document.getElementById("editGallerySizeEN");
      const sizeZHInput = document.getElementById("editGallerySizeZH");
      const bgENInput = document.getElementById("editGalleryBgEN");
      const colorENInput = document.getElementById("editGalleryColorEN");
      const bgZHInput = document.getElementById("editGalleryBgZH");
      const colorZHInput = document.getElementById("editGalleryColorZH");
      const capENInput = document.getElementById("editGalleryCapEN");
      const capZHInput = document.getElementById("editGalleryCapZH");
      const fileInput = document.getElementById("editGalleryFile");
      const urlInput = document.getElementById("editGalleryUrl");

      const newHeadEN = headENInput.value.trim();
      const newHeadZH = headZHInput.value.trim();
      const newCapEN = capENInput.value.trim();
      const newCapZH = capZHInput.value.trim();
      
      let newSrc = urlInput.value.trim();
      let newType = currentType;

      if (!newCapEN && !newCapZH) { 
        setEditStatus("❌ Caption required", "error"); 
        return; 
      }

      if (fileInput.files[0]) {
        const file = fileInput.files[0];
        const ext = (file.name.split(".").pop() || "").toLowerCase();
        if (["mp4", "webm", "mov", "avi"].includes(ext)) newType = "video";
        else if (["pdf"].includes(ext)) newType = "pdf";
        else newType = "image";

        setEditStatus("Uploading...", "");
        const uploadedUrl = await uploadToCloudinary(file, "gallery");
        if (uploadedUrl) newSrc = uploadedUrl;
        else { setEditStatus("❌ Upload failed", "error"); return; }
      }

      if (!newSrc) { setEditStatus("❌ No file or URL", "error"); return; }

      setEditStatus("Saving...", "");
      
      galleryItems[index] = [
        newSrc,
        { en: newCapEN, zh: newCapZH },
        newType,
        { en: newHeadEN, zh: newHeadZH },
        {
          fontEN: fontENInput.value,
          fontZH: fontZHInput.value,
          sizeEN: sizeENInput.value,
          sizeZH: sizeZHInput.value,
          en: { bg: bgENInput.value, color: colorENInput.value },
          zh: { bg: bgZHInput.value, color: colorZHInput.value }
        }
      ];
      
      const ok = await saveToKV("gallery_data", galleryItems);

      if (ok) {
        renderGallery();
        setEditStatus("✅ Gallery item saved!", "success");
        setTimeout(closeEditModal, 1000);
      } else {
        setEditStatus("❌ Save failed", "error");
      }
    }
  );
}

 /* =========================================================
   LOAD ALL KV CONTENT (Optimized for Speed)
========================================================= */

async function loadAllKVContent() {
  // ✅ ایک ساتھ تمام ڈیٹا لوڈ کریں (Parallel Loading)
  try {
    const localTheme = localStorage.getItem("royalGlobalTheme");
    if (localTheme) applyFullTheme(JSON.parse(localTheme));
    
    const [siteTheme, heroVal, profileVal, gal, off, customHubs, gwData, gt, gx, rt, rx] = await Promise.all([
      loadThemeGlobal(),
      getFromKV("hero_image"),
      getFromKV("profile_image"),
      getFromKV("gallery_data"),
      getFromKV("offices"),
      getFromKV("hubs_data"),
      getFromKV("gateways_data"),
      getFromKV("gateway_trade_title"),
      getFromKV("gateway_trade_text"),
      getFromKV("gateway_research_title"),
      getFromKV("gateway_research_text")
    ]);

    // تھیم اپلائی کریں
    if (siteTheme) {
      applyFullTheme(siteTheme);
      localStorage.setItem("royalGlobalTheme", JSON.stringify(siteTheme));
      localStorage.setItem(THEME_KEY, JSON.stringify(siteTheme));
    }
    
    // باقی ڈیٹا اپلائی کریں
    if (heroVal) { heroImageUrl = heroVal; applyHeroImage(); }
    if (profileVal) { profileImageUrl = profileVal; applyProfileImage(); }
    if (gal && Array.isArray(gal) && gal.length > 0) { galleryItems = gal; renderGallery(); }
    
    if (off && Array.isArray(off) && off.length === 4) {
      offices = off; renderOffices();
    } else if (state.admin && state.token) {
      await saveToKV("offices", DEFAULT_OFFICES);
    }
    
    if (customHubs && typeof customHubs === "object" && !Array.isArray(customHubs)) { customHubData = customHubs; }
    if (gwData && Array.isArray(gwData) && gwData.length >= 2) { gateways = gwData; }

    if (gt) gatewayTradeData.title = gt;
    if (gx) gatewayTradeData.text = gx;
    if (rt) gatewayResearchData.title = rt;
    if (rx) gatewayResearchData.text = rx;

    applyGatewayContent();
    renderGateways();

  } catch (e) { /* silent */ }

  // ✅ ریفریش پر URL کے مطابق صفحہ کھولیں (تاخیر کم کر دی)
  setTimeout(handleRoute, 100);
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
  loadGalleryFonts();
  // Check URL immediately - hide main page if not home
const currentPath = window.location.pathname;
if (currentPath !== "/" && currentPath !== "") {
  const mainPage = document.getElementById("mainPage");
  const gatewayView = document.getElementById("gatewayView");
  if (mainPage) mainPage.hidden = true;
  if (gatewayView) gatewayView.classList.add("open");
}
  renderGallery();
  renderOffices();
  renderGateways();

  const editHeroBtn = document.getElementById("editHeroBtn");
  if (editHeroBtn) editHeroBtn.onclick = editHeroImage;

  const editGwProfileBtn = document.getElementById("editGatewayProfileBtn");
if (editGwProfileBtn) editGwProfileBtn.onclick = editGatewayProfile;

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

  const gatewayBackEl = document.getElementById("gatewayBack");
  if (gatewayBackEl) gatewayBackEl.onclick = closeGateway;

  const hubBackEl = document.getElementById("hubBack");
  if (hubBackEl) {
    hubBackEl.onclick = () => {
      state.hub = null;
      document.getElementById("hubView").classList.remove("open");
      document.getElementById("gatewayView").classList.add("open");
      renderGateway(state.gateway);
    };
  }

  ["languageSelect", "gatewayLanguage", "hubLanguage"].forEach((id) => {
    const s = document.getElementById(id);
    if (!s) return;
    s.innerHTML = document.getElementById("languageSelect").innerHTML;
    s.onchange = (e) => setLanguage(e.target.value);
  });

  const menuOpenEl = document.getElementById("menuOpen");
  if (menuOpenEl) menuOpenEl.onclick = () =>
    document.getElementById("mobileDrawer").classList.add("open");

  const menuCloseEl = document.getElementById("menuClose");
  if (menuCloseEl) menuCloseEl.onclick = () =>
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

  const adminCloseEl = document.getElementById("adminClose");
  if (adminCloseEl) adminCloseEl.onclick = () =>
    document.getElementById("adminDialog").close();

  const adminLoginEl = document.getElementById("adminLogin");
if (adminLoginEl) {
  adminLoginEl.onclick = async () => {
    const token = document.getElementById("adminToken").value.trim();
    if (!token) return;

    // Cloudflare سے پاسورڈ کی تصدیق کریں
    try {
      const r = await fetch("/api/kv/set", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token,
        },
        body: JSON.stringify({ key: "admin_auth_test", value: "test" }),
      });

      const data = await r.json();

      if (data.ok) {
        // پاسورڈ بالکل صحیح ہے
        state.admin = true;
        state.token = token;
        sessionStorage.setItem("royalAdmin", "1");
        sessionStorage.setItem("royalAdminToken", token);
        activateAdminUI();
        applyLanguage();
      } else {
        // پاسورڈ غلط ہے
        alert("❌ غلط پاسورڈ! براہ کرم دوبارہ کوشش کریں۔");
        document.getElementById("adminToken").value = "";
      }
    } catch (e) {
      alert("❌ کنیکشن میں مسئلہ ہے۔ دوبارہ کوشش کریں۔");
    }
  };
}

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

  if (state.admin) {
  const savedTheme = JSON.parse(localStorage.getItem(THEME_KEY) || "null");
  if (savedTheme) applyFullTheme(savedTheme);
}

  if (state.admin) activateAdminUI();

  loadAllKVContent();
  trackVisit();
  const loadStatsBtn = document.getElementById("loadStatsBtn");
if (loadStatsBtn) loadStatsBtn.onclick = loadVisitStats;

loadReviews().then(() => {
  renderReviews();
});
const addReviewBtn = document.getElementById("addReviewBtn");
if (addReviewBtn) addReviewBtn.onclick = addNewReview;

  applyLanguage();

window.addEventListener("popstate", handleRoute);
}

/* =========================================================
   AUTO-DETECT LANGUAGE — Cookie-based (10 years persistence)
========================================================= */
(function autoDetectLanguage() {
  try {
    // ✅ Cookie reader
    function getCookie(name) {
      const parts = document.cookie.split(";");
      for (let i = 0; i < parts.length; i++) {
        const c = parts[i].trim();
        if (c.indexOf(name + "=") === 0) {
          return c.substring(name.length + 1);
        }
      }
      return null;
    }

    // ✅ 1. COOKIE — اگر "Saved" ہو تو prompt نہیں
    const saved = getCookie("rlSaved");
    if (saved === "1") {
      const lang = getCookie("rlLang") || "en";
      sessionStorage.setItem("royalLanguage", lang);
      sessionStorage.setItem("royalPrompted", "1");
      return;
    }

    // ✅ 2. session چیک کریں
    const sessionLang = sessionStorage.getItem("royalLanguage");
    const sessionPrompted = sessionStorage.getItem("royalPrompted");
    if (sessionLang && sessionPrompted === "1") return;

    // ✅ 3. Browser language — چینی
    const browserLang = (navigator.language || "").toLowerCase();
    if (browserLang.startsWith("zh")) {
      sessionStorage.setItem("royalLanguage", "zh");
      sessionStorage.setItem("royalPrompted", "1");
      return;
    }

    // ✅ 4. Prompt دکھائیں
    window.addEventListener("load", () => {
      setTimeout(() => showWelcomePrompt(), 800);
    });
  } catch (e) { /* silent */ }
})();
    
/* =========================================================
   WELCOME PROMPT — 2 Languages + Remember Option
========================================================= */
function showWelcomePrompt() {
  if (document.getElementById("welcomeLanguagePrompt")) return;
  if (document.body.classList.contains("admin-mode")) return;

  const prompt = document.createElement("div");
  prompt.id = "welcomeLanguagePrompt";
  prompt.style.cssText = `
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
    background: rgba(0, 0, 0, 0.9) !important;
    z-index: 999999 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    padding: 20px !important;
    box-sizing: border-box !important;
  `;
  prompt.innerHTML = `
    <div style="
      background: linear-gradient(160deg, #0a2f1e 0%, #062015 50%, #03140a 100%);
      border: 1px solid rgba(212, 175, 55, 0.4);
      border-radius: 20px;
      padding: 40px 32px;
      max-width: 440px;
      width: 100%;
      text-align: center;
      box-shadow: 0 30px 90px rgba(0, 0, 0, 0.6);
      box-sizing: border-box;
    ">
      <div style="font-size:3rem;color:#d4af37;margin-bottom:16px;">👑</div>
      <h2 style="font-family:'Playfair Display',serif;font-size:1.6rem;color:#f5f1e8;margin:0 0 12px;font-weight:500;">Royal Chilgoza Pine Nuts</h2>
      <p style="color:#d4af37;font-size:0.95rem;font-weight:500;margin:0 0 28px;line-height:1.5;">Please choose your language<br>请选择您的语言</p>
      <div style="display:flex;gap:12px;justify-content:center;margin-bottom:20px;">
        <button data-welcome-lang="en" style="flex:1;display:flex;flex-direction:column;align-items:center;gap:8px;padding:20px 16px;border:2px solid rgba(212,175,55,0.3);border-radius:14px;background:rgba(212,175,55,0.05);color:#f5f1e8;cursor:pointer;font-family:inherit;">
          <span style="font-size:2rem;line-height:1;">🇬🇧</span>
          <b style="font-size:1rem;font-weight:600;color:#f5f1e8;">English</b>
        </button>
        <button data-welcome-lang="zh" style="flex:1;display:flex;flex-direction:column;align-items:center;gap:8px;padding:20px 16px;border:2px solid rgba(212,175,55,0.3);border-radius:14px;background:rgba(212,175,55,0.05);color:#f5f1e8;cursor:pointer;font-family:inherit;">
          <span style="font-size:2rem;line-height:1;">🇨🇳</span>
          <b style="font-size:1rem;font-weight:600;color:#f5f1e8;">中文</b>
        </button>
      </div>
      <label style="
        display:flex;
        align-items:center;
        justify-content:center;
        gap:10px;
        margin:0 0 14px;
        padding:12px 16px;
        background:rgba(212,175,55,0.06);
        border:1px solid rgba(212,175,55,0.2);
        border-radius:10px;
        cursor:pointer;
        user-select:none;
      ">
        <input type="checkbox" id="welcomeRememberChoice" style="width:18px;height:18px;accent-color:#d4af37;cursor:pointer;flex-shrink:0;">
        <span style="color:#f5f1e8;font-size:0.85rem;line-height:1.4;text-align:left;">
          Remember my choice<br>
          <span style="color:#8fa89a;font-size:0.78rem;">میرا انتخاب یاد رکھو · 记住我的选择</span>
        </span>
      </label>
      <p style="color:#8fa89a;font-size:0.75rem;margin:0;line-height:1.4;">You can change language anytime from the top menu.</p>
    </div>
  `;

  document.body.appendChild(prompt);

  prompt.querySelectorAll("[data-welcome-lang]").forEach((btn) => {
    btn.onclick = () => {
      const lang = btn.dataset.welcomeLang;
      const remember = document.getElementById("welcomeRememberChoice")?.checked;

      sessionStorage.setItem("royalLanguage", lang);
      sessionStorage.setItem("royalPrompted", "1");

      if (remember) {
        const exp = new Date();
        exp.setFullYear(exp.getFullYear() + 10);
        const expStr = exp.toUTCString();
        document.cookie = "rlSaved=1; expires=" + expStr + "; path=/";
        document.cookie = "rlLang=" + lang + "; expires=" + expStr + "; path=/";
      } else {
        document.cookie = "rlSaved=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
        document.cookie = "rlLang=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
      }

      prompt.style.transition = "opacity 0.4s ease";
      prompt.style.opacity = "0";

      setTimeout(() => {
        prompt.remove();
        if (typeof setLanguage === "function") {
          setLanguage(lang);
        } else if (typeof state !== "undefined") {
          state.lang = lang;
          if (typeof applyLanguage === "function") applyLanguage();
        }
      }, 400);
    };
  });
}  

document.addEventListener("DOMContentLoaded", init);

/* =========================================================
   GALLERY LIGHTBOX — Zoom, Pan, Drag
   (Click any gallery image to open full-screen with zoom)
========================================================= */
/* =========================================================
   VISITS DASHBOARD (admin only)
========================================================= */
async function loadVisitStats() {
  const box = document.getElementById("statsBox");
  if (!box) return;
  box.innerHTML = `<p class="admin-note" style="text-align:center;">⏳ Loading...</p>`;

  try {
    const r = await fetch("/api/visit-stats", {
      headers: { Authorization: "Bearer " + state.token }
    });
    const data = await r.json();

    if (!data.ok) {
      box.innerHTML = `<p class="admin-note" style="color:#ff6b6b;text-align:center;">❌ ${data.error || "Failed to load"}</p>`;
      return;
    }

    const total = data.total || 0;
    const byCountry = data.byCountry || {};
    const daily = data.daily || {};

    const countries = Object.entries(byCountry).sort((a, b) => b[1] - a[1]).slice(0, 10);
    const countryRows = countries.map(([c, n]) =>
      `<div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid rgba(212,175,55,0.15);">
        <span>🌍 ${c}</span><b style="color:var(--gold);">${n}</b>
      </div>`
    ).join("");

    const days = Object.entries(daily).sort((a, b) => b[0].localeCompare(a[0])).slice(0, 7);
    const dayRows = days.map(([d, n]) =>
      `<div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid rgba(212,175,55,0.15);">
        <span>📅 ${d}</span><b style="color:var(--gold);">${n}</b>
      </div>`
    ).join("");

    box.innerHTML = `
      <div style="text-align:center;margin-bottom:16px;">
        <div style="font-size:2.5rem;font-family:var(--heading-font);color:var(--gold);line-height:1;">${total}</div>
        <div style="color:var(--muted);font-size:0.85rem;letter-spacing:0.15em;text-transform:uppercase;margin-top:4px;">Total Visits</div>
      </div>

      <div style="margin-top:20px;">
        <h4 style="color:var(--gold2);font-family:var(--heading-font);font-weight:500;margin:0 0 10px;">🌍 Top Countries</h4>
        ${countryRows || '<p class="admin-note">No data yet.</p>'}
      </div>

      <div style="margin-top:20px;">
        <h4 style="color:var(--gold2);font-family:var(--heading-font);font-weight:500;margin:0 0 10px;">📅 Last 7 Days</h4>
        ${dayRows || '<p class="admin-note">No data yet.</p>'}
      </div>
    `;
  } catch (e) {
    box.innerHTML = `<p class="admin-note" style="color:#ff6b6b;text-align:center;">❌ Error: ${e.message}</p>`;
  }
}

(function initLightbox() {
  const lightbox = document.getElementById("galleryLightbox");
  const stage = document.getElementById("lightboxStage");
  const img = document.getElementById("lightboxImage");
  const closeBtn = document.getElementById("lightboxClose");
  const zoomLevel = document.getElementById("zoomLevel");
  if (!lightbox || !stage || !img) return;

  let scale = 1;
  let translateX = 0;
  let translateY = 0;
  let isDragging = false;
  let startX = 0, startY = 0;
  let startTX = 0, startTY = 0;
  let lastTap = 0;

  function applyTransform() {
    img.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
    if (zoomLevel) zoomLevel.textContent = Math.round(scale * 100) + "%";
  }

  function resetView() {
    scale = 1; translateX = 0; translateY = 0;
    applyTransform();
  }

  function openLightbox(src, alt) {
    img.src = src;
    img.alt = alt || "";
    resetView();
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("lightbox-open");
  }

  function closeLightbox() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lightbox-open");
    resetView();
  }

  // Open on gallery image click
  document.addEventListener("click", (e) => {
    const gImg = e.target.closest(".gallery-item img");
    if (!gImg || gImg.classList.contains("failed")) return;
    e.preventDefault();
    openLightbox(gImg.dataset.fullsrc || gImg.src, gImg.alt);
  });

  // Close
  if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox || e.target === stage) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("open")) closeLightbox();
    if (!lightbox.classList.contains("open")) return;
    if (e.key === "+" || e.key === "=") { scale = Math.min(scale * 1.2, 5); applyTransform(); }
    if (e.key === "-" || e.key === "_") { scale = Math.max(scale / 1.2, 1); if (scale === 1) { translateX = 0; translateY = 0; } applyTransform(); }
    if (e.key === "0") resetView();
  });

  // Zoom buttons
  lightbox.querySelectorAll("[data-zoom]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const action = btn.dataset.zoom;
      if (action === "in") scale = Math.min(scale * 1.25, 5);
      if (action === "out") { scale = Math.max(scale / 1.25, 1); if (scale === 1) { translateX = 0; translateY = 0; } }
      if (action === "reset") { resetView(); return; }
      applyTransform();
    });
  });

  // Wheel zoom
  stage.addEventListener("wheel", (e) => {
    e.preventDefault();
    const delta = e.deltaY < 0 ? 1.15 : 1 / 1.15;
    scale = Math.min(Math.max(scale * delta, 1), 5);
    if (scale === 1) { translateX = 0; translateY = 0; }
    applyTransform();
  }, { passive: false });

  // Drag / pan (mouse + touch)
  stage.addEventListener("pointerdown", (e) => {
    if (scale <= 1) return;
    isDragging = true;
    stage.classList.add("dragging");
    startX = e.clientX; startY = e.clientY;
    startTX = translateX; startTY = translateY;
    try { stage.setPointerCapture(e.pointerId); } catch (err) {}
  });
  stage.addEventListener("pointermove", (e) => {
    if (!isDragging) return;
    translateX = startTX + (e.clientX - startX);
    translateY = startTY + (e.clientY - startY);
    applyTransform();
  });
  stage.addEventListener("pointerup", (e) => {
    isDragging = false;
    stage.classList.remove("dragging");
    try { stage.releasePointerCapture(e.pointerId); } catch (err) {}
  });
  stage.addEventListener("pointercancel", () => {
    isDragging = false;
    stage.classList.remove("dragging");
  });

  // Pinch zoom + double-tap
  let pinchStartDist = 0;
  let pinchStartScale = 1;
  stage.addEventListener("touchstart", (e) => {
    if (e.touches.length === 2) {
      pinchStartDist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      pinchStartScale = scale;
    }
    const now = Date.now();
    if (e.touches.length === 1 && now - lastTap < 300) {
      if (scale > 1) resetView();
      else { scale = 2; applyTransform(); }
      lastTap = 0;
    } else {
      lastTap = now;
    }
  }, { passive: true });

  stage.addEventListener("touchmove", (e) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      scale = Math.min(Math.max(pinchStartScale * (dist / pinchStartDist), 1), 5);
      if (scale === 1) { translateX = 0; translateY = 0; }
      applyTransform();
    }
  }, { passive: false });
})();
/* =========================================================
   HUB MEDIA LIGHTBOX — Gallery جیسا (Hub images پر کلک سے lightbox)
========================================================= */
document.addEventListener("click", (e) => {
  const mediaItem = e.target.closest(".hub-media-item");
  if (!mediaItem) return;
  if (e.target.closest("[data-media-delete], [data-media-edit]")) return;
  if (e.target.closest("figcaption, .hub-media-caption")) return;
  
  const src = mediaItem.dataset.lightboxSrc;
  const alt = mediaItem.dataset.lightboxAlt || "";
  if (!src) return;
  
  e.preventDefault();
  
  const lightbox = document.getElementById("galleryLightbox");
  const img = document.getElementById("lightboxImage");
  const zoomLevel = document.getElementById("zoomLevel");
  if (!lightbox || !img) return;
  
  img.src = src;
  img.alt = alt;
  img.style.transform = "translate(0px, 0px) scale(1)";
  if (zoomLevel) zoomLevel.textContent = "100%";
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("lightbox-open");
});

/* =========================================================
   SEO HUB ROUTES — Auto-open hub from URL
   /trade/global-markets  → opens Global Trade, Hub #01
   /research/forests-ecology → opens Research, Hub #04
========================================================= */

/* ---------- Dynamic slugs (from hubs_data) ---------- */
function getHubSlugs() {
  const slugs = { trade: [], research: [] };
  ["trade", "research"].forEach(gateway => {
    const list = (customHubData && customHubData.en && Array.isArray(customHubData.en[gateway]))
      ? customHubData.en[gateway]
      : (hubData.en[gateway] || []);
    slugs[gateway] = list.map(([title]) => slugify(title)).filter(Boolean);
  });
  return slugs;
}

/* ---------- Legacy slugs (backward compatibility) ---------- */
const LEGACY_HUB_SLUGS = {
  trade: ["global-markets", "usa-market", "china-market", "export-logistics", "product-quality", "supply-chain", "gi-indication", "organic-chemistry", "processing-packaging", "sustainable-trade"],
  research: ["geographical-origin", "biology-botany", "nutrition-value", "forests-ecology", "biodiversity-wildlife", "climate-environment", "forest-conservation", "supply-chain-livelihoods", "sustainable-harvesting", "research-policy"]
};
  

function updateSEOTags(gateway, hubTitle, hubDesc) {
  const gatewayName = gateway === "trade" ? "Global Trade" : "Research & Knowledge";

  // 1. Title
  const newTitle = hubTitle
    ? `${hubTitle} | Royal Chilghoza Pine Nuts`
    : `Royal Chilghoza Pine Nuts — ${gatewayName}`;
  document.title = newTitle;

  // 2. Meta description
  let descEl = document.querySelector('meta[name="description"]');
  if (descEl) {
    descEl.setAttribute("content",
      hubDesc
        ? `${hubDesc} — Royal Chilghoza Pine Nuts, Pakistan. چلغوزہ Chilgoza.`
        : "Royal Chilghoza Pine Nuts — Global Trade and Research & Knowledge Ecosystem."
    );
  }

  // 3. Meta keywords
  let kwEl = document.querySelector('meta[name="keywords"]');
  if (kwEl) {
    kwEl.setAttribute("content",
      `Chilghoza, Chilgoza, Pine Nuts, چلغوزہ, 松子, Royal Chilghoza, ${hubTitle || gatewayName}, Pakistan, Export`
    );
  }

  // 4. Canonical URL
  let canonicalEl = document.querySelector('link[rel="canonical"]');
  if (!canonicalEl) {
    canonicalEl = document.createElement("link");
    canonicalEl.setAttribute("rel", "canonical");
    document.head.appendChild(canonicalEl);
  }
  canonicalEl.setAttribute("href", window.location.href);

  // 5. og:title
  let ogTitle = document.querySelector('meta[property="og:title"]');
  if (!ogTitle) {
    ogTitle = document.createElement("meta");
    ogTitle.setAttribute("property", "og:title");
    document.head.appendChild(ogTitle);
  }
  ogTitle.setAttribute("content", newTitle);

  // 6. og:description
  let ogDesc = document.querySelector('meta[property="og:description"]');
  if (!ogDesc) {
    ogDesc = document.createElement("meta");
    ogDesc.setAttribute("property", "og:description");
    document.head.appendChild(ogDesc);
  }
  if (hubDesc) ogDesc.setAttribute("content", hubDesc);

  // 7. og:url
  let ogUrl = document.querySelector('meta[property="og:url"]');
  if (!ogUrl) {
    ogUrl = document.createElement("meta");
    ogUrl.setAttribute("property", "og:url");
    document.head.appendChild(ogUrl);
  }
  ogUrl.setAttribute("content", window.location.href);
}

function openHubFromURL() {
  const path = window.location.pathname.replace(/^\/+|\/+$/g, "");
  const parts = path.split("/");
  if (parts.length !== 2) return false;

  const [gateway, slug] = parts;
  const dynamicSlugs = getHubSlugs();
let hubIndex = dynamicSlugs[gateway] ? dynamicSlugs[gateway].indexOf(slug) : -1;

// Legacy fallback
if (hubIndex === -1 && LEGACY_HUB_SLUGS[gateway]) {
  hubIndex = LEGACY_HUB_SLUGS[gateway].indexOf(slug);
}
if (hubIndex === -1) return false;

  // Open the gateway
  openGateway(gateway);

  // Get hub data
  const list = hubs(gateway);
  const hubItem = list[hubIndex];
  if (!hubItem) return false;
  const [hubTitle, hubDesc] = hubItem;

  // Update SEO tags
  updateSEOTags(gateway, hubTitle, hubDesc);

  // Scroll to the specific hub after DOM renders
  setTimeout(() => {
    const hubEl = document.getElementById(`hub-${gateway}_${hubIndex}`);
    if (hubEl) {
      hubEl.scrollIntoView({ behavior: "smooth", block: "start" });
      // Golden highlight effect
      hubEl.style.transition = "box-shadow 0.5s";
      hubEl.style.boxShadow = "0 0 0 3px var(--gold), 0 0 60px rgba(212,175,55,0.45)";
      setTimeout(() => { hubEl.style.boxShadow = ""; }, 2800);
    }
  }, 600);

  return true;
}

/* =========================================================
   ROUTING — URL کے مطابق صحیح صفحہ کھولیں
   /                       → Home
   /trade یا /research     → Gateway
   /trade/global-markets   → Gateway + Hub پر scroll
========================================================= */
function handleRoute() {
  const path = window.location.pathname.replace(/^\/+|\/+$/g, "");
  const parts = path.split("/").filter(p => p);

  // کیس 1: ہوم پیج
  if (parts.length === 0) {
    if (state.gateway || state.hub) closeGateway();
    return;
  }

  const gateway = parts[0];
  const validIds = getGateways().map(g => g.id);
  if (!validIds.includes(gateway)) return;

  // کیس 2: صرف گیٹ وے (مثلاً /trade)
  if (parts.length === 1) {
    if (state.hub) {
      state.hub = null;
      document.getElementById("hubView").classList.remove("open");
      document.getElementById("gatewayView").classList.add("open");
      renderGateway(gateway);
    } else if (state.gateway !== gateway) {
      openGateway(gateway);
    }
    return;
  }

  // کیس 3: گیٹ وے + ہب (مثلاً /trade/global-markets)
  if (parts.length === 2) {
    openHubFromURL();
  }
}
