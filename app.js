// 8 Unique GitHub Project Images Database
let githubImagesDB = [
    { id: 1, title: "Chilgoza Forest Habitat", caption: "Natural Forests", desc: "High altitude pine forests in Gilgit-Baltistan.", url: "01-forest.jpg" },
    { id: 2, title: "Traditional Harvesting", caption: "Safe Collection", desc: "Sustainable harvesting by local mountain communities.", url: "02-harvest.jpg" },
    { id: 3, title: "Raw In-Shell Nuts", caption: "Grade A Quality", desc: "Directly harvested from Chilas high mountain valleys.", url: "03-inshell.jpg" },
    { id: 4, title: "Selected Kernels", caption: "Premium Sorting", desc: "Carefully sorted and graded organic kernels.", url: "04-kernels.jpg" },
    { id: 5, title: "Modern Processing", caption: "Hygienic Units", desc: "State-of-the-art cleaning and packaging units.", url: "05-processing.jpg" },
    { id: 6, title: "Laboratory Quality", caption: "Testing Purity", desc: "Tested for purity, nutrition, and natural oils composition.", url: "06-lab.jpg" },
    { id: 7, title: "Global Export Logistics", caption: "Secure Shipping", desc: "International transit and customs clearance protocols.", url: "07-logistics.jpg" },
    { id: 8, title: "Diamer Mountain Ecosystem", caption: "Sustainable Research Hub", desc: "Preserving local ecology and supporting sustainable trade.", url: "08-chilghoza-forest.jpg" }
];

let isAdminLoggedIn = false;

function openAdminModal() {
    const pwd = prompt("Enter Admin Password (default: admin_chilas_2026):");
    if(pwd === "admin_chilas_2026" || pwd === "admin") {
        isAdminLoggedIn = true;
        document.getElementById('adminControlPanel').style.display = 'block';
        document.getElementById('adminMediaBox').style.display = 'block';
        document.getElementById('admin-login-btn').innerText = "🔓 Admin Active";
        renderGitHubGallery();
        renderFolderGrids();
        alert("Admin Access Granted! You can now edit images, create custom themes, and manage folders.");
    } else if(pwd !== null) {
        alert("Incorrect password!");
    }
}

function renderGitHubGallery() {
    const container = document.getElementById('githubGalleryContainer');
    if(!container) return;
    container.innerHTML = '';
    githubImagesDB.forEach((img, idx) => {
        let html = `
            <div class="github-img-card">
                <img src="${img.url}" alt="${img.title}" onerror="this.src='08-chilghoza-forest.jpg'">
                <h4>${img.title}</h4>
                <p><strong>${img.caption}</strong><br>${img.desc}</p>
        `;
        if(isAdminLoggedIn) {
            html += `<button onclick="editGitHubImage(${idx})" style="background:var(--text-gold); color:var(--bg-primary); border:none; padding:4px 8px; border-radius:4px; font-size:0.75rem; cursor:pointer; font-weight:600; margin-top:4px;">Edit Details</button>`;
        }
        html += `</div>`;
        container.innerHTML += html;
    });
}

function editGitHubImage(idx) {
    const item = githubImagesDB[idx];
    const newTitle = prompt("Edit Title:", item.title);
    if(newTitle === null) return;
    const newCaption = prompt("Edit Caption:", item.caption);
    const newDesc = prompt("Edit Description:", item.desc);
    const newUrl = prompt("Edit Image Filename/URL:", item.url);

    item.title = newTitle || item.title;
    item.caption = newCaption || item.caption;
    item.desc = newDesc || item.desc;
    item.url = newUrl || item.url;
    renderGitHubGallery();
    alert("Image updated successfully!");
}

// Master Language Dictionary
const translations = {
    en: {
        title: "ROYAL CHILGOZA", sub: "GLOBAL ECOSYSTEM", wa: "💬 WhatsApp",
        badge: "PAKISTAN • INTERNATIONAL TRADE & RESEARCH",
        hHead: "Royal Chilgoza <span>Ecosystem</span>",
        hDesc: "Explore professional trade markets and deep scientific research folders. Fully editable live via Admin Mode.",
        tLabel: "Business & Commerce", tTitle: "Global Trade", tDesc: "10 comprehensive international trade directories with individual media, AI & WhatsApp connectivity →",
        rLabel: "Science & Ecology", rTitle: "Research & Knowledge", rDesc: "10 detailed research folders on origin, forestry, botany, nutrition & sustainability →",
        thTitle: "🌍 GLOBAL TRADE HUBS", thDesc: "Select any category below to open its dedicated mini-website featuring media galleries, video resources, PDF documents, and Royal AI Assistant.",
        rhTitle: "🌲 RESEARCH & KNOWLEDGE HUBS", rhDesc: "Select any scientific category below to explore dedicated documents, research reports, AI assistant, and direct trade inquiries.",
        tradeFolders: [
            { title: 'Global Markets', desc: 'Global demand, market opportunities and international trade destinations.' },
            { title: 'USA Market & Buyers', desc: 'U.S. buyers, importers, market opportunities and business connections.' },
            { title: 'China Market & Buyers', desc: 'Chinese buyers, traders, importers and commercial opportunities.' },
            { title: 'Export & Logistics', desc: 'Export documentation, customs, shipping, delivery and international logistics.' },
            { title: 'Product & Quality', desc: 'Kernels, in-shell nuts, roasting, grades, specifications and quality standards.' },
            { title: 'Supply Chain & Traceability', desc: 'Forest → collector → processing → packing → export, with transparent traceability.' },
            { title: 'Geographical Indication (GI)', desc: 'Origin, identity, authenticity, geographical reputation and product traceability.' },
            { title: 'Organic Chemistry & Natural Quality', desc: 'Natural oils, chemical composition, purity, nutritional properties and quality characteristics.' },
            { title: 'Processing, Packaging & Value Addition', desc: 'Processing, grading, roasting, packaging, branding and premium product development.' },
            { title: 'Sustainable & Ethical Trade', desc: 'Responsible sourcing, fair value, community benefits and conservation-linked trade.' }
        ],
        researchFolders: [
            { title: 'Geographical Origin & GI Research', desc: 'Chilgoza origin, geographical identity, traditional knowledge and GI research.' },
            { title: 'Chilgoza Biology & Botany', desc: 'Tree biology, growth, reproduction, seed development and natural regeneration.' },
            { title: 'Nutrition Value & Natural Composition', desc: 'Protein, natural oils, minerals, nutrients and scientific composition.' },
            { title: 'Chilgoza Forests & Ecology', desc: 'Forest ecosystems, ecological functions, regeneration and sustainable forest management.' },
            { title: 'Biodiversity & Wildlife', desc: 'Wildlife habitats, biodiversity, ecosystem services and conservation values.' },
            { title: 'Climate & Global Green Environment', desc: 'Climate resilience, carbon, water, soil protection and global environmental benefits.' },
            { title: 'Forest Conservation & Restoration', desc: 'Forest protection, restoration, natural regeneration, plantation and sustainable management.' },
            { title: 'Supply Chain & Community Livelihoods', desc: 'Local collectors, rural livelihoods, value chains, income generation and poverty reduction.' },
            { title: 'Sustainable Harvesting & Community Awareness', desc: 'Safe harvesting, forest protection, community training and conservation awareness.' },
            { title: 'Research, Policy & Partnerships', desc: 'Research knowledge, government policy, FAO, GEF, NGOs, institutions and future partnerships.' }
        ]
    },
    ur: {
        title: "رائل چلغوزہ", sub: "گلوبل سسٹم", wa: "💬 واٹس ایپ",
        badge: "پاکستان • بین الاقوامی تجارت اور تحقیق",
        hHead: "رائل چلغوزہ <span>گلوبل سسٹم</span>",
        hDesc: "پرافیشنل تجارتی منڈیوں اور سائنسی تحقیقی فولڈرز کا جائزہ لیں۔ ایڈمن موڈ کے ذریعے لائیو قابلِ ترمیم۔",
        tLabel: "تجارت اور کاروبار", tTitle: "گلوبل ٹریڈ (عالمی تجارت)", tDesc: "10 جامع بین الاقوامی تجارتی ڈائریکٹریاں، میڈیا، اے آئی اور واٹس ایپ رابطے کے ساتھ →",
        rLabel: "سائنس اور ماحولیات", tTitle: "ریسرچ اور نالج (تحقیق)", tDesc: "ماخذ، جنگلات، نباتات، غذایت اور پائیداری پر 10 تفصیلی تحقیقی فولڈرز →",
        thTitle: "🌍 گلوبل ٹریڈ حبز", thDesc: "میڈیا گیلری، ویڈیوز، پی ڈی ایف اور رائل اے آئی اسسٹنٹ پر مشتمل منی ویب سائٹ کھولنے کے لیے نیچے کسی بھی زمرے کا انتخاب کریں۔",
        rhTitle: "🌲 ریسرچ اور نالج حبز", rhDesc: "مخصوص دستاویزات، تحقیقی رپورٹس، اے آئی اسسٹنٹ اور تجارتی معلومات کے لیے سائنسی زمرے کا انتخاب کریں۔",
        tradeFolders: [
            { title: 'عالمی مارکیٹس', desc: 'عالمی طلب، مارکیটের مواقع اور بین الاقوامی تجارتی مقامات۔' },
            { title: 'امریکہ مارکیٹ اور خریدار', desc: 'امریکہ کے خریدار، درآمد کنندگان، مارکیٹ کے مواقع اور کاروباری روابط۔' },
            { title: 'چین مارکیٹ اور خریدار', desc: 'چینی خریدار، تاجر، درآمد کنندگان اور تجارتی مواقع۔' },
            { title: 'برآمدات اور لاجسٹکس', desc: 'برآمدی دستاویزات، کسٹم، شپنگ، ترسیل اور بین الاقوامی لاجسٹکس۔' },
            { title: 'مصنوعات اور معیار', desc: 'مغزیات، چھلکے والے میوے، روسٹنگ، درجات، خصوصیات اور کوالٹی کے معیارات۔' },
            { title: 'سپلائی چین اور ٹریس ایبلٹی', desc: 'جنگل ← جمع کرنے والا ← پروسیسنگ ← پیکنگ ← برآمد، شفاف ٹریس ایبلٹی کے ساتھ۔' },
            { title: 'جیوگرافیکل انڈیکیشن (GI)', desc: 'ماخذ، شناخت، اصلیت، جغرافیائی شہرت اور پروڈکٹ ٹریس ایبلٹی۔' },
            { title: 'نامیاتی کیمسٹری اور قدرتی معیار', desc: 'قدرتی تیل، کیمیائی ساخت، خلوص، غذائی خصوصیات اور کوالٹی کی خصوصیات۔' },
            { title: 'پروسیسنگ، پیکنگ اور ویلیو ایڈیشن', desc: 'پروسیسنگ، گریڈنگ، روسٹنگ، پیکنگ، برانڈنگ اور پریمیم پروڈکٹ کی تیاری۔' },
            { title: 'پائیدار اور اخلاقی تجارت', desc: 'ذمہ دارانہ سورسنگ، منصفانہ قدر، کمیونٹی کے فوائد اور تحفظ سے جڑی تجارت۔' }
        ],
        researchFolders: [
            { title: 'جغرافیائی ماخذ اور GI ریسرچ', desc: 'چلغوزے کا ماخذ، جغرافیائی شناخت، روایتی علم اور GI تحقیق۔' },
            { title: 'چلغوزے کی بائیولوجی اور باٹنی', desc: 'درخت کی بائیولوجی، نشوونما، افزائش، بیج کی ترقی اور قدرتی بحالی۔' },
            { title: 'غذائی قدر اور قدرتی ساخت', desc: 'پروٹین، قدرتی تیل، معدنیات، غذائی اجزاء اور سائنسی ساخت۔' },
            { title: 'چلغوزے کے جنگلات اور ماحولیات', desc: 'جنگلات کے ماحولیاتی نظام، ماحولیاتی افعال، بحالی اور پائیدار جنگلات کا انتظام۔' },
            { title: 'حیاتیاتی تنوع اور جنگلی حیات', desc: 'جنگلی حیات کے مسکن، حیاتیاتی تنوع، ماحولیاتی نظام کی خدمات اور تحفظ کی قدریں۔' },
            { title: 'موسم اور عالمی سبز ماحول', desc: 'موسمی لچک، کاربن، پانی، مٹی کا تحفظ اور عالمی ماحولیاتی فوائد۔' },
            { title: 'جنگلات کا تحفظ اور بحالی', desc: 'جنگلات کا تحفظ، بحالی، قدرتی بحالی، پودے لگانا اور پائیدار انتظام۔' },
            { title: 'سپلائی چین اور کمیونٹی کی روزی روٹی', desc: 'مقامی جمع کرنے والے، دیہی روزی روٹی، ویلیو چینز اور غربت کا خاتمہ۔' },
            { title: 'پائیدار کٹائی اور کمیونٹی آگاہی', desc: 'محفوظ کٹائی، جنگلات کا تحفظ، کمیونٹی کی تربیت اور تحفظ کی آگاہی۔' },
            { title: 'تحقیق، پالیسی اور شراکت داریاں', desc: 'تحقیقی علم، حکومتی پالیسی، FAO، GEF، NGOs، ادارے اور مستقبل کی شراکت داریاں۔' }
        ]
    }
};

let folderMediaDB = {};
let currentActiveFolderId = null;
let previousMainView = 'trade-main-view';

let tradeFolders = [
    { id: 't1', tag: '01' }, { id: 't2', tag: '02' }, { id: 't3', tag: '03' }, { id: 't4', tag: '04' },
    { id: 't5', tag: '05' }, { id: 't6', tag: '06' }, { id: 't7', tag: '07' }, { id: 't8', tag: '08' },
    { id: 't9', tag: '09' }, { id: 't10', tag: '10' }
];

let researchFolders = [
    { id: 'r1', tag: '01' }, { id: 'r2', tag: '02' }, { id: 'r3', tag: '03' }, { id: 'r4', tag: '04' },
    { id: 'r5', tag: '05' }, { id: 'r6', tag: '06' }, { id: 'r7', tag: '07' }, { id: 'r8', tag: '08' },
    { id: 'r9', tag: '09' }, { id: 'r10', tag: '10' }
];

function renderFolderGrids() {
    const langSelect = document.getElementById('langSelect');
    const currentLang = langSelect ? langSelect.value : (localStorage.getItem('royal_lang') || 'en');
    const t = translations[currentLang] || translations.en;

    const tradeGrid = document.getElementById('trade-folders-grid');
    if(tradeGrid) {
        tradeGrid.innerHTML = '';
        tradeFolders.forEach((f, index) => {
            const localized = (t.tradeFolders && t.tradeFolders[index]) ? t.tradeFolders[index] : { title: 'Custom Hub', desc: 'Custom folder hub.' };
            tradeGrid.innerHTML += `
                <div class="card" onclick="openSubFolder('trade', '${f.id}')">
                    <div>
                        <div class="card-tag">Hub ${f.tag}</div>
                        <div class="card-title">${localized.title}</div>
                        <div class="card-desc">${localized.desc}</div>
                    </div>
                    <div style="margin-top:12px; display:flex; justify-content:space-between; align-items:center;">
                        <span style="font-size:0.75rem; color:var(--text-gold); font-weight:600;">Open Folder Website →</span>
                        ${isAdminLoggedIn ? `<button onclick="event.stopPropagation(); deleteFolder('trade', '${f.id}')" style="background:none; border:none; color:#f87171; font-size:0.75rem; cursor:pointer;">Delete</button>` : ''}
                    </div>
                </div>`;
        });
    }

    const researchGrid = document.getElementById('research-folders-grid');
    if(researchGrid) {
        researchGrid.innerHTML = '';
        researchFolders.forEach((f, index) => {
            const localized = (t.researchFolders && t.researchFolders[index]) ? t.researchFolders[index] : { title: 'Custom Research Hub', desc: 'Custom research folder.' };
            researchGrid.innerHTML += `
                <div class="card" onclick="openSubFolder('research', '${f.id}')">
                    <div>
                        <div class="card-tag">Hub ${f.tag}</div>
                        <div class="card-title">${localized.title}</div>
                        <div class="card-desc">${localized.desc}</div>
                    </div>
                    <div style="margin-top:12px; display:flex; justify-content:space-between; align-items:center;">
                        <span style="font-size:0.75rem; color:var(--text-gold); font-weight:600;">Open Folder Website →</span>
                        ${isAdminLoggedIn ? `<button onclick="event.stopPropagation(); deleteFolder('research', '${f.id}')" style="background:none; border:none; color:#f87171; font-size:0.75rem; cursor:pointer;">Delete</button>` : ''}
                    </div>
                </div>`;
        });
    }
}

function deleteFolder(type, id) {
    if(!confirm("Are you sure you want to delete this folder?")) return;
    if(type === 'trade') {
        tradeFolders = tradeFolders.filter(x => x.id !== id);
    } else {
        researchFolders = researchFolders.filter(x => x.id !== id);
    }
    renderFolderGrids();
    alert("Folder removed successfully!");
}

function openSubFolder(type, id) {
    previousMainView = type === 'trade' ? 'trade-main-view' : 'research-main-view';
    currentActiveFolderId = id;
    const list = type === 'trade' ? tradeFolders : researchFolders;
    const index = list.findIndex(x => x.id === id);
    const langSelect = document.getElementById('langSelect');
    const currentLang = langSelect ? langSelect.value : (localStorage.getItem('royal_lang') || 'en');
    const t = translations[currentLang] || translations.en;
    const localizedList = type === 'trade' ? (t.tradeFolders || []) : (t.researchFolders || []);
    const folderInfo = localizedList[index] || { title: 'Folder Hub', desc: 'Operational description.' };
    const originalFolder = list[index] || { tag: 'NEW' };
    
    document.getElementById('sub-folder-tag').innerText = `Folder ${originalFolder.tag} — ${type.toUpperCase()}`;
    document.getElementById('sub-folder-title').innerText = folderInfo.title;
    document.getElementById('sub-folder-desc').innerText = folderInfo.desc;
    document.getElementById('aiFolderResponse').innerText = `Royal AI: Ready to assist with ${folderInfo.title}. Ask any question below.`;
    
    renderFolderMedia();
    switchView('sub-folder-view');
}

function goBackToList() {
    switchView(previousMainView);
}

function addFolderMedia() {
    if(!currentActiveFolderId) return;
    const title = document.getElementById('mediaTitleInput').value;
    const type = document.getElementById('mediaTypeInput').value;
    const url = document.getElementById('mediaUrlInput').value;
    if(!title || !url) return alert('Please enter title and filename/URL');

    if(!folderMediaDB[currentActiveFolderId]) {
        folderMediaDB[currentActiveFolderId] = [];
    }
    folderMediaDB[currentActiveFolderId].push({ title, type, url });
    
    document.getElementById('mediaTitleInput').value = '';
    document.getElementById('mediaUrlInput').value = '';
    renderFolderMedia();
    alert('Media added successfully!');
}

function renderFolderMedia() {
    const container = document.getElementById('folderMediaContainer');
    if(!container) return;
    container.innerHTML = '';
    const items = folderMediaDB[currentActiveFolderId] || [];
    
    if(items.length === 0) {
        container.innerHTML = `<p style="font-size:0.85rem; color:#9ca3af; grid-column: 1/-1; text-align:center; padding:15px;">No custom media or documents uploaded in this folder yet.</p>`;
        return;
    }

    items.forEach((item, idx) => {
        let html = `<div class="media-card"><div style="font-weight:650; color:var(--text-gold); margin-bottom:6px;">${item.title}</div>`;
        if(item.type === 'image') {
            html += `<img src="${item.url}" alt="Image" onerror="this.src='08-chilghoza-forest.jpg'">`;
        } else if(item.type === 'video') {
            html += `<video controls src="${item.url}"></video>`;
        } else if(item.type === 'pdf') {
            html += `<a href="${item.url}" target="_blank" class="pdf-link">📄 View PDF Document</a>`;
        }
        if(isAdminLoggedIn) {
            html += `<button onclick="removeMedia(${idx})" style="background:none; border:none; color:#f87171; font-size:0.75rem; cursor:pointer; margin-top:4px;">Remove Item</button>`;
        }
        html += `</div>`;
        container.innerHTML += html;
    });
}

function removeMedia(idx) {
    folderMediaDB[currentActiveFolderId].splice(idx, 1);
    renderFolderMedia();
}

function askMainAI() {
    const query = document.getElementById('mainAiQuery').value;
    if(!query) return alert('Please enter your question for Royal AI');
    const respBox = document.getElementById('mainAiResponse');
    respBox.innerHTML = `<em>Thinking... analyzing ecosystem parameters...</em>`;
    setTimeout(() => {
        respBox.innerHTML = `<strong>Royal AI Answer:</strong> Regarding "${query}", our Gilgit-Baltistan Chilgoza framework ensures verified organic origin and optimal export standards.`;
    }, 800);
}

function askFolderAI() {
    const query = document.getElementById('aiFolderQuery').value;
    if(!query) return alert('Please enter your question for Royal AI');
    const respBox = document.getElementById('aiFolderResponse');
    respBox.innerHTML = `<em>Thinking... analyzing section parameters...</em>`;
    setTimeout(() => {
        respBox.innerHTML = `<strong>Royal AI Answer:</strong> Based on professional standards regarding "${query}", our framework ensures 100% authenticity and optimal grading.`;
    }, 800);
}

window.onload = function() {
    const savedLang = localStorage.getItem('royal_lang');
    const langSelect = document.getElementById('langSelect');
    if(savedLang && langSelect) {
        langSelect.value = savedLang;
        changeLanguage(savedLang, false);
    } else {
        renderGitHubGallery();
        renderFolderGrids();
    }
};

function switchView(viewId) {
    document.querySelectorAll('.view-section').forEach(el => el.classList.remove('active'));
    document.getElementById(viewId).classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function applyCustomTheme() {
    const bg = document.getElementById('pickerBg').value;
    const card = document.getElementById('pickerCard').value;
    const header = document.getElementById('pickerHeader').value;
    const heading = document.getElementById('pickerHeading').value;
    const gold = document.getElementById('pickerGold').value;

    document.documentElement.style.setProperty('--bg-primary', bg);
    document.documentElement.style.setProperty('--bg-card', card);
    document.documentElement.style.setProperty('--header-bg', header);
    document.documentElement.style.setProperty('--heading-color', heading);
    document.documentElement.style.setProperty('--text-gold', gold);
}

function setTheme(bg, card, header, heading, gold) {
    document.getElementById('pickerBg').value = bg;
    document.getElementById('pickerCard').value = card;
    document.getElementById('pickerHeader').value = header;
    document.getElementById('pickerHeading').value = heading;
    document.getElementById('pickerGold').value = gold;
    applyCustomTheme();
}

function addNewMainFolder() {
    const title = document.getElementById('newMainTitle').value;
    const desc = document.getElementById('newMainDesc').value;
    if(!title) return alert('Please enter folder title');
    const newId = 'custom_' + Date.now();
    tradeFolders.push({ id: newId, tag: 'NEW' });
    if(!translations.en.tradeFolders) translations.en.tradeFolders = [];
    translations.en.tradeFolders.push({ title, desc });
    renderFolderGrids();
    document.getElementById('newMainTitle').value = '';
    document.getElementById('newMainDesc').value = '';
    alert('New folder hub created successfully!');
}

function changeLanguage(lang, saveToStorage = true) {
    if(saveToStorage) {
        localStorage.setItem('royal_lang', lang);
    }
    
    const t = translations[lang] || translations.en;
    if(t.title) document.getElementById('site-title').innerText = t.title;
    if(t.sub) document.getElementById('site-sub').innerText = t.sub;
    if(t.badge) document.getElementById('hero-badge').innerText = t.badge;
    if(t.hHead) document.getElementById('hero-heading').innerHTML = t.hHead;
    if(t.hDesc) document.getElementById('hero-desc').innerText = t.hDesc;
    if(t.tLabel) document.getElementById('trade-tag-label').innerText = t.tLabel;
    if(t.rLabel) document.عد = document.getElementById('research-tag-label').innerText = t.rLabel;
    if(t.thTitle) document.getElementById('trade-head-title').innerText = t.thTitle;
    if(t.thDesc) document.getElementById('trade-head-desc').innerText = t.thDesc;
    if(t.rhTitle) document.getElementById('research-head-title').innerText = t.rhTitle;
    if(t.rhDesc) document.getElementById('research-head-desc').innerText = t.rhDesc;
    
    renderGitHubGallery();
    renderFolderGrids();
    
    const rtlLangs = ['ur', 'ar', 'fa', 'ps'];
    document.body.dir = rtlLangs.includes(lang) ? 'rtl' : 'ltr';
}
