document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  const $ = (id) => document.getElementById(id);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const api = async (url, options = {}) => {
    const r = await fetch(url, { credentials: "same-origin", ...options });
    let d = {};
    try { d = await r.json(); } catch {}
    if (!r.ok) throw new Error(d.error || `Request failed (${r.status})`);
    return d;
  };

  // =========================================================
  // 9 LANGUAGES — USER LOCAL ONLY
  // Language choice is NEVER written to a global D1 setting.
  // =========================================================
  const LANGS = [
    ["en","English","ltr"],["zh","中文","ltr"],["ur","اردو","rtl"],
    ["ps","پښتو","rtl"],["fa","فارسی / دری","rtl"],["ru","Русский","ltr"],
    ["id","Bahasa Indonesia","ltr"],["ms","Bahasa Melayu","ltr"],["ar","العربية","rtl"]
  ];

  const UI = {
    en:{home:"Home",trade:"Trade & Business",research:"Research & Knowledge",admin:"Admin",
      language:"Language",explore:"Explore",back:"Back",ai:"Royal AI Assistant",
      upload:"Upload",edit:"Edit",delete:"Delete",save:"Save",cancel:"Cancel",
      createFolder:"Create New Folder",folderName:"Folder Name",description:"Description",
      caption:"Mini Caption",alt:"Alt Text",login:"Login",logout:"Logout",
      username:"Username",password:"Password",full:"Full-size view",hidden:"Hidden",visible:"Visible"},
    zh:{home:"首页",trade:"贸易与商业",research:"研究与知识",admin:"管理",language:"语言",explore:"探索",
      back:"返回",ai:"Royal AI 助手",upload:"上传",edit:"编辑",delete:"删除",save:"保存",cancel:"取消",
      createFolder:"创建新文件夹",folderName:"文件夹名称",description:"描述",caption:"简短说明",alt:"替代文字",
      login:"登录",logout:"退出",username:"用户名",password:"密码",full:"全尺寸查看",hidden:"隐藏",visible:"显示"},
    ur:{home:"ہوم",trade:"تجارت و کاروبار",research:"تحقیق و علم",admin:"ایڈمن",language:"زبان",explore:"ملاحظہ",
      back:"واپس",ai:"Royal AI معاون",upload:"اپلوڈ",edit:"ترمیم",delete:"حذف",save:"محفوظ",cancel:"منسوخ",
      createFolder:"نیا فولڈر بنائیں",folderName:"فولڈر کا نام",description:"تفصیل",caption:"مختصر کیپشن",alt:"Alt Text",
      login:"لاگ اِن",logout:"لاگ آؤٹ",username:"صارف نام",password:"پاس ورڈ",full:"فل سائز",hidden:"مخفی",visible:"نمایاں"},
    ps:{home:"کور",trade:"سوداګري او تجارت",research:"څېړنه او پوهه",admin:"اداره",language:"ژبه",explore:"کتنه",
      back:"شاته",ai:"Royal AI مرستیال",upload:"اپلوډ",edit:"سمون",delete:"ړنګول",save:"خوندي کول",cancel:"لغوه",
      createFolder:"نوی فولډر جوړ کړئ",folderName:"د فولډر نوم",description:"تشریح",caption:"لنډه کیپشن",alt:"بدیل متن",
      login:"ننوتل",logout:"وتل",username:"کارن نوم",password:"پټنوم",full:"بشپړ کچه",hidden:"پټ",visible:"ښکاره"},
    fa:{home:"خانه",trade:"تجارت و کسب‌وکار",research:"پژوهش و دانش",admin:"مدیریت",language:"زبان",explore:"مشاهده",
      back:"بازگشت",ai:"دستیار Royal AI",upload:"آپلود",edit:"ویرایش",delete:"حذف",save:"ذخیره",cancel:"لغو",
      createFolder:"ایجاد پوشه جدید",folderName:"نام پوشه",description:"توضیحات",caption:"عنوان کوتاه",alt:"متن جایگزین",
      login:"ورود",logout:"خروج",username:"نام کاربری",password:"رمز عبور",full:"نمایش کامل",hidden:"پنهان",visible:"نمایش"},
    ru:{home:"Главная",trade:"Торговля и бизнес",research:"Исследования и знания",admin:"Админ",language:"Язык",explore:"Открыть",
      back:"Назад",ai:"Royal AI",upload:"Загрузить",edit:"Изменить",delete:"Удалить",save:"Сохранить",cancel:"Отмена",
      createFolder:"Создать папку",folderName:"Название папки",description:"Описание",caption:"Краткая подпись",alt:"Alt-текст",
      login:"Войти",logout:"Выйти",username:"Имя пользователя",password:"Пароль",full:"Полный размер",hidden:"Скрыто",visible:"Видимо"},
    id:{home:"Beranda",trade:"Perdagangan & Bisnis",research:"Riset & Pengetahuan",admin:"Admin",language:"Bahasa",explore:"Jelajahi",
      back:"Kembali",ai:"Asisten Royal AI",upload:"Unggah",edit:"Edit",delete:"Hapus",save:"Simpan",cancel:"Batal",
      createFolder:"Buat Folder Baru",folderName:"Nama Folder",description:"Deskripsi",caption:"Keterangan singkat",alt:"Teks Alt",
      login:"Masuk",logout:"Keluar",username:"Nama pengguna",password:"Kata sandi",full:"Tampilan penuh",hidden:"Tersembunyi",visible:"Terlihat"},
    ms:{home:"Laman Utama",trade:"Perdagangan & Perniagaan",research:"Penyelidikan & Pengetahuan",admin:"Admin",language:"Bahasa",explore:"Terokai",
      back:"Kembali",ai:"Pembantu Royal AI",upload:"Muat naik",edit:"Edit",delete:"Padam",save:"Simpan",cancel:"Batal",
      createFolder:"Cipta Folder Baharu",folderName:"Nama Folder",description:"Penerangan",caption:"Kapsyen ringkas",alt:"Teks Alt",
      login:"Log masuk",logout:"Log keluar",username:"Nama pengguna",password:"Kata laluan",full:"Paparan penuh",hidden:"Tersembunyi",visible:"Kelihatan"},
    ar:{home:"الرئيسية",trade:"التجارة والأعمال",research:"البحث والمعرفة",admin:"الإدارة",language:"اللغة",explore:"استكشف",
      back:"رجوع",ai:"مساعد Royal AI",upload:"رفع",edit:"تعديل",delete:"حذف",save:"حفظ",cancel:"إلغاء",
      createFolder:"إنشاء مجلد جديد",folderName:"اسم المجلد",description:"الوصف",caption:"تعليق مختصر",alt:"نص بديل",
      login:"تسجيل الدخول",logout:"تسجيل الخروج",username:"اسم المستخدم",password:"كلمة المرور",full:"عرض بالحجم الكامل",hidden:"مخفي",visible:"ظاهر"}
  };

  let lang = localStorage.getItem("rcpn_language") || "en";
  const langInfo = () => LANGS.find(x => x[0] === lang) || LANGS[0];
  const t = (k) => (UI[lang] && UI[lang][k]) || UI.en[k] || k;

  function applyLanguage(code) {
    if (!LANGS.some(x => x[0] === code)) code = "en";
    lang = code;
    localStorage.setItem("rcpn_language", code);
    const [,name,dir] = langInfo();
    document.documentElement.lang = code;
    document.documentElement.dir = dir;
    document.documentElement.dataset.language = code;
    $$("[data-i18n]").forEach(el => {
      const k = el.dataset.i18n;
      if (t(k)) el.textContent = t(k);
    });
    const label = $("langLabel");
    if (label) label.textContent = name;
    renderFolders();
    loadHomeImages();
  }

  function ensureLanguageMenu() {
    let btn = $("langBtn"), menu = $("langMenu");
    if (!btn) {
      btn = document.createElement("button");
      btn.id = "langBtn"; btn.className = "rcpn-language-button";
      btn.type = "button"; btn.setAttribute("aria-expanded","false");
      btn.innerHTML = '<span id="langLabel">English</span> ▾';
      document.body.appendChild(btn);
    }
    if (!menu) {
      menu = document.createElement("div");
      menu.id = "langMenu"; menu.className = "rcpn-language-menu";
      document.body.appendChild(menu);
    }
    menu.innerHTML = LANGS.map(([c,n]) => `<button type="button" data-lang="${c}">${n}</button>`).join("");
    $$("#langMenu [data-lang]").forEach(b => b.onclick = () => {
      applyLanguage(b.dataset.lang);
      menu.classList.remove("open");
    });
    btn.onclick = e => { e.stopPropagation(); menu.classList.toggle("open"); };
    document.addEventListener("click", () => menu.classList.remove("open"), {once:false});
  }

  // =========================================================
  // HOME — 8 GITHUB ORIGINALS + FULL SIZE + EDITABLE METADATA
  // =========================================================
  const homeFallback = [
    ["01-chilghoza-lot.jpg","Chilghoza Lot","Premium Chilghoza lot from Pakistan"],
    ["02-chilghoza-cones.jpg","Chilghoza Cones","Chilghoza pine cones"],
    ["03-chilghoza-kernel.jpg","Chilghoza Kernel","Chilghoza pine nut kernel"],
    ["04-chilghoza-harvest.jpg","Chilghoza Harvest","Chilghoza harvest scene"],
    ["05-chilghoza-raw-kernels.jpg","Raw Chilghoza Kernels","Raw kernels ready for grading and trade"],
    ["06-chilghoza-cone-closeup.jpg","Chilghoza Cone Close-up","Close view of Chilghoza cone"],
    ["07-chilghoza-products-display.jpg","Chilghoza Products","Chilghoza product presentation"],
    ["08-chilghoza-forest.jpg","Chilghoza Forest","Chilghoza forest landscape"]
  ];

  function imageUrl(item) {
    if (item.source === "r2" && item.r2_key) return `/api/media/file/${encodeURIComponent(item.r2_key)}`;
    return `/${item.file_name}`;
  }

  function openLightbox(item) {
    let box = $("rcpnLightbox");
    if (!box) {
      box = document.createElement("div");
      box.id = "rcpnLightbox";
      box.className = "rcpn-lightbox";
      document.body.appendChild(box);
    }
    box.innerHTML = `
      <button class="rcpn-lightbox-close" aria-label="Close">×</button>
      <div class="rcpn-lightbox-inner">
        <img src="${imageUrl(item)}" alt="${esc(item.alt_text || item.title || "")}">
        <h3>${esc(item.title || "")}</h3>
        <p>${esc(item.description || item.caption || "")}</p>
      </div>`;
    box.classList.add("open");
    box.onclick = e => { if (e.target === box || e.target.classList.contains("rcpn-lightbox-close")) box.classList.remove("open"); };
  }

  function esc(v) {
    return String(v ?? "").replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }

  async function loadHomeImages() {
    const gallery = $("homeGallery");
    if (!gallery) return;
    let items = [];
    try { items = (await api("/api/home-images")).items || []; } catch {}
    if (!items.length) {
      items = homeFallback.map(([file,title,desc],i) => ({id:0,file_name:file,title,caption:title,description:desc,alt_text:title,sort_order:i,source:"github"}));
    }
    gallery.innerHTML = items.map(item => `
      <figure class="rcpn-home-image-card" data-id="${item.id}">
        <button class="rcpn-image-open" type="button" title="${t("full")}">
          <img src="${imageUrl(item)}" alt="${esc(item.alt_text || item.title)}" loading="lazy">
        </button>
        <figcaption>
          <strong>${esc(item.title)}</strong>
          <span>${esc(item.caption || "")}</span>
        </figcaption>
      </figure>`).join("");
    $$(".rcpn-home-image-card .rcpn-image-open", gallery).forEach((b,i) => b.onclick = () => openLightbox(items[i]));
  }

  // =========================================================
  // TRADE / RESEARCH — D1 FOLDERS, DYNAMICALLY EXTENDABLE
  // =========================================================
  let researchItems = [], tradeItems = [];

  async function loadFolders() {
    try {
      researchItems = (await api("/api/folders?section=research")).items || [];
      tradeItems = (await api("/api/folders?section=trade")).items || [];
    } catch { researchItems=[]; tradeItems=[]; }
    renderFolders();
  }

  async function translated(item, type) {
    try {
      const x = await api(`/api/translations?item_type=${encodeURIComponent(type)}&item_id=${item.id}&language=${lang}`);
      return x.translation || item;
    } catch { return item; }
  }

  function renderFolderSet(gridId, detailId, items) {
    const grid = $(gridId), detail = $(detailId);
    if (!grid || !detail) return;
    grid.innerHTML = items.map((x,i) => `
      <article class="folder rcpn-folder" data-folder-id="${x.id}" tabindex="0">
        <span class="num">${String(x.sort_order || i+1).padStart(2,"0")}</span>
        <h3>${esc(x.title)}</h3>
        <p>${esc(x.description || "")}</p>
      </article>`).join("");
    $$(".rcpn-folder", grid).forEach(card => {
      const open = async () => {
        const id = Number(card.dataset.folderId);
        const item = items.find(x => x.id === id);
        if (!item) return;
        const tr = await translated(item, "folder");
        detail.innerHTML = `<div class="detail-box">
          <div class="eyebrow">ROYAL CHILGHOZA</div>
          <h2>${esc(tr.title || item.title)}</h2>
          <p>${esc(tr.description || item.description || "")}</p>
          <div class="rcpn-folder-content" data-folder-content="${id}">
            <p>Loading…</p>
          </div>
        </div>`;
        try {
          const c = await api(`/api/content?folder_id=${id}`);
          const list = (c.items || []).filter(x => x.folder_id === id && x.status === "published");
          const media = await api("/api/media/public");
          const imgs = (media.items || []).filter(x => Number(x.folder_id) === id);
          const host = detail.querySelector(".rcpn-folder-content");
          const contentHtml = list.map(v => `<article class="rcpn-content-card"><h3>${esc(v.title)}</h3><p>${esc(v.description)}</p><div>${esc(v.body)}</div></article>`).join("");
          const mediaHtml = imgs.length ? `<div class="folder-media-grid">${imgs.map(x => `<button class="folder-media" type="button"><img src="${imageUrl(x)}" alt="${esc(x.alt_text || x.title)}"><span>${esc(x.caption || x.title)}</span></button>`).join("")}</div>` : "";
          host.innerHTML = (contentHtml || `<p>No published content yet.</p>`) + mediaHtml;
          $$(".folder-media",host).forEach((b,i)=>b.onclick=()=>openLightbox(imgs[i]));
        } catch {}
        detail.scrollIntoView({behavior:"smooth",block:"start"});
      };
      card.onclick = open;
      card.onkeydown = e => { if(e.key==="Enter" || e.key===" ") { e.preventDefault(); open(); } };
    });
  }

  function renderFolders() {
    renderFolderSet("researchFolders","researchContent",researchItems);
    renderFolderSet("tradeFolders","tradeContent",tradeItems);
  }

  // =========================================================
  // ROYAL AI — USER FACING
  // =========================================================
  function ensureAI() {
    let host = $("royalAI");
    if (!host) {
      host = document.createElement("section");
      host.id = "royalAI";
      host.className = "rcpn-ai";
      host.innerHTML = `
        <div class="eyebrow">ROYAL AI</div><h2>${t("ai")}</h2>
        <textarea id="rcpnAiText" placeholder="Ask Royal AI..."></textarea>
        <div class="rcpn-ai-actions">
          <select id="rcpnAiMode"><option value="improve">Improve</option><option value="summary">Summary</option><option value="buyer">Buyer</option><option value="translate">Translate</option><option value="research">Research</option></select>
          <button id="rcpnAiSend" type="button">Send</button>
        </div>
        <pre id="rcpnAiResult"></pre>`;
      document.body.appendChild(host);
    }
    $("rcpnAiSend")?.addEventListener("click", async () => {
      const text = $("rcpnAiText")?.value.trim();
      if (!text) return;
      const out = $("rcpnAiResult"); out.textContent = "…";
      try {
        const d = await api("/api/ai",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({text,mode:$("rcpnAiMode").value,language:lang})});
        out.textContent = typeof d.result === "string" ? d.result : JSON.stringify(d.result,null,2);
      } catch(e) { out.textContent = e.message; }
    }, {once:true});
  }

  // =========================================================
  // ADMIN — ADMIN ONLY MEDIA/FOLDER ACTIONS
  // =========================================================
  let adminReady = false;
  async function checkAuth() {
    try { return (await api("/api/me")).auth === true; } catch { return false; }
  }

  function ensureAdminUI() {
    if ($("rcpnAdminUI")) return;
    const section = document.createElement("section");
    section.id = "rcpnAdminUI";
    section.className = "rcpn-admin-ui";
    section.innerHTML = `
      <div class="eyebrow">ADMIN ONLY</div><h2>${t("admin")}</h2>
      <div id="rcpnAdminLogin">
        <input id="rcpnAdminUser" placeholder="${t("username")}" value="admin">
        <input id="rcpnAdminPass" type="password" placeholder="${t("password")}">
        <button id="rcpnAdminLoginBtn">${t("login")}</button>
        <p id="rcpnAdminStatus"></p>
      </div>
      <div id="rcpnAdminPanel" hidden>
        <div class="rcpn-admin-row">
          <button id="rcpnNewResearch">${t("createFolder")} — Research</button>
          <button id="rcpnNewTrade">${t("createFolder")} — Trade</button>
          <button id="rcpnReloadAdmin">Reload</button>
          <button id="rcpnLogout">${t("logout")}</button>
        </div>
        <h3>Homepage Images</h3><div id="rcpnAdminHome"></div>
        <h3>Upload Media</h3>
        <form id="rcpnUploadForm" class="rcpn-upload-form">
          <input id="rcpnUploadFile" type="file" accept="image/*,video/*,application/pdf" required>
          <input id="rcpnUploadTitle" placeholder="Title">
          <input id="rcpnUploadCaption" placeholder="Mini Caption">
          <textarea id="rcpnUploadDescription" placeholder="Description"></textarea>
          <input id="rcpnUploadAlt" placeholder="Alt Text">
          <button type="submit">${t("upload")}</button>
          <p id="rcpnUploadStatus"></p>
        </form>
        <h3>Uploaded Media</h3><div id="rcpnAdminMedia"></div>
        <h3>Folders</h3><div id="rcpnAdminFolders"></div>
      </div>`;
    document.body.appendChild(section);

    $("rcpnAdminLoginBtn").onclick = async () => {
      const status=$("rcpnAdminStatus"); status.textContent="…";
      try {
        await api("/api/login",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({username:$("rcpnAdminUser").value,password:$("rcpnAdminPass").value})});
        $("rcpnAdminLogin").hidden=true; $("rcpnAdminPanel").hidden=false; adminReady=true; await loadAdmin();
      } catch(e){status.textContent=e.message;}
    };
    $("rcpnUploadForm").onsubmit=async(e)=>{
      e.preventDefault();
      const file=$("rcpnUploadFile").files[0];
      if(!file) return;
      const status=$("rcpnUploadStatus"); status.textContent="Uploading…";
      const fd=new FormData();
      fd.append("file",file);
      fd.append("title",$("rcpnUploadTitle").value);
      fd.append("caption",$("rcpnUploadCaption").value);
      fd.append("description",$("rcpnUploadDescription").value);
      fd.append("alt_text",$("rcpnUploadAlt").value);
      try{
        await api("/api/media",{method:"POST",body:fd});
        status.textContent="Uploaded.";
        e.target.reset();
        await loadAdmin();
      }catch(err){status.textContent=err.message;}
    };
    $("rcpnThemeSave").onclick=async()=>{
      await api("/api/settings/theme",{method:"PUT",headers:{"content-type":"application/json"},body:JSON.stringify({
        background:$("rcpnThemeBg").value,accent:$("rcpnThemeAccent").value,text:$("rcpnThemeText").value
      })});
      applyTheme({background:$("rcpnThemeBg").value,accent:$("rcpnThemeAccent").value,text:$("rcpnThemeText").value});
    };
    $("rcpnReloadAdmin").onclick=loadAdmin;
    $("rcpnLogout").onclick=async()=>{await api("/api/logout",{method:"POST"});location.reload();};
    $("rcpnNewResearch").onclick=()=>newFolder("research");
    $("rcpnNewTrade").onclick=()=>newFolder("trade");
  }

  function adminImageRow(item, home=false) {
    return `<div class="rcpn-admin-item">
      <img src="${imageUrl(item)}" alt="">
      <input data-k="title" value="${esc(item.title)}" placeholder="Title">
      <input data-k="caption" value="${esc(item.caption)}" placeholder="${t("caption")}">
      <textarea data-k="description" placeholder="${t("description")}">${esc(item.description)}</textarea>
      <input data-k="alt_text" value="${esc(item.alt_text)}" placeholder="${t("alt")}">
      <label><input type="checkbox" data-k="visible" ${item.visible ? "checked":""}> ${item.visible ? t("visible"):t("hidden")}</label>
      <button data-save>${t("save")}</button>
      ${home ? "" : `<button data-delete>${t("delete")}</button>`}
    </div>`;
  }

  async function loadAdmin() {
    if (!adminReady) return;
    const h=$("rcpnAdminHome"), m=$("rcpnAdminMedia"), f=$("rcpnAdminFolders");
    const home=(await api("/api/home-images/admin")).items||[];
    h.innerHTML=home.map(x=>adminImageRow(x,true)).join("");
    $$("#rcpnAdminHome .rcpn-admin-item").forEach((row,i)=>{
      row.querySelector("[data-save]").onclick=async()=>{
        const x=home[i]; const payload={};
        $$("[data-k]",row).forEach(el=>payload[el.dataset.k]=el.type==="checkbox"?el.checked:el.value);
        await api(`/api/home-images/${x.id}`,{method:"PATCH",headers:{"content-type":"application/json"},body:JSON.stringify(payload)});
        await loadHomeImages();
      };
    });

    const media=(await api("/api/media")).items||[];
    m.innerHTML=media.map(x=>adminImageRow(x,false)).join("") || "<p>No R2 media yet.</p>";
    $$("#rcpnAdminMedia .rcpn-admin-item").forEach((row,i)=>{
      row.querySelector("[data-save]").onclick=async()=>{
        const x=media[i], payload={};
        $$("[data-k]",row).forEach(el=>payload[el.dataset.k]=el.type==="checkbox"?el.checked:el.value);
        await api(`/api/media/${x.id}`,{method:"PATCH",headers:{"content-type":"application/json"},body:JSON.stringify(payload)});
        await loadAdmin();
      };
      row.querySelector("[data-delete]")?.addEventListener("click",async()=>{
        if(confirm("Delete this media permanently?")) { await api(`/api/media/${media[i].id}`,{method:"DELETE"}); await loadAdmin(); }
      });
    });

    const folders=[...researchItems,...tradeItems];
    f.innerHTML=folders.map(x=>`<div class="rcpn-admin-folder"><b>${esc(x.section)}</b> — ${esc(x.title)}
      <button data-del="${x.id}">${t("delete")}</button></div>`).join("");
    $$("[data-del]",f).forEach(b=>b.onclick=async()=>{
      if(confirm("Delete this folder?")) { await api(`/api/folders/${b.dataset.del}`,{method:"DELETE"}); await loadFolders(); await loadAdmin(); }
    });
  }

  async function newFolder(section) {
    const title=prompt(t("folderName"));
    if(!title) return;
    const description=prompt(t("description"))||"";
    await api("/api/folders",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({section,title,description,status:"published"})});
    await loadFolders();
    await loadAdmin();
  }

  function applyTheme(theme){
    if(!theme) return;
    const root=document.documentElement;
    if(theme.background) root.style.setProperty("--bg",theme.background);
    if(theme.accent) root.style.setProperty("--accent",theme.accent);
    if(theme.text) root.style.setProperty("--text",theme.text);
  }
  async function loadTheme(){
    try{ const d=await api("/api/settings/theme"); applyTheme(d.theme); }catch{}
  }

  // =========================================================
  // GLOBAL NAV COMPATIBILITY
  // =========================================================
  $$("[data-route]").forEach(el => el.addEventListener("click", e => {
    const id=el.dataset.route;
    if ($(id)) { e.preventDefault(); $$(".page").forEach(p=>p.classList.toggle("active",p.id===id)); history.pushState({page:id},"",`#${id}`); if(id==="admin") ensureAdminUI(); }
  }));

  ensureLanguageMenu();
  ensureAI();
  ensureAdminUI();
  applyLanguage(lang);
  loadHomeImages();
  loadFolders();
  loadTheme();

  // Do not grant public users any media write controls.
  // Upload/edit/delete APIs are protected by Worker authentication.
});
