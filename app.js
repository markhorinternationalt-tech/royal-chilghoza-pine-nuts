const translations = {
    en: {
        brandTitle: "ROYAL CHILGHOZA",
        subBrand: "PINE NUTS",
        heroTop: "PAKISTAN • ORIGIN • GLOBAL",
        heroMain: "Royal Chilghoza Pine Nuts",
        heroDesc: "From the Chilghoza forests of Pakistan to the world — connecting premium quality, authentic origin, responsible supply chains and deep knowledge.",
        tagTrade: "CHILGHOZA PINE NUTS",
        folderTrade: "GLOBAL TRADE",
        descTrade: "Premium quality • Worldwide export →",
        tagResearch: "CHILGHOZA",
        folderResearch: "RESEARCH & KNOWLEDGE",
        descResearch: "Science • Origin • Forests • Quality →",
        galleryTitle: "Exhibition Gallery & Field Logs",
        aiTitle: "🤖 Royal AI Assistant",
        aiDesc: "Ask anything about our harvests, B2B trade terms, or forest origins.",
        aiSend: "Send",
        footerTitle: "Office Address & Contact",
        chinaOffice: "🇨🇳 China Office",
        islamabadOffice: "🇵🇰 Islamabad Office",
        chilasOffice: "🏔️ Chilas Office",
        afghanOffice: "🇦🇫 Afghanistan Office"
    },
    ur: {
        brandTitle: "رائل چلغوزہ",
        subBrand: "پائن نٹس",
        heroTop: "پاکستان • اوریجن • گلوبل",
        heroMain: "رائل چلغوزہ پائن نٹس",
        heroDesc: "پاکستان کے چلغوزے کے جنگلات سے پوری دنیا تک — اعلیٰ ترین معیار، اصل اور ذمہ دارانہ سپلائی چین کا امتزاج۔",
        tagTrade: "چلغوزہ پائن نٹس",
        folderTrade: "گلوبل ٹریڈ (عالمی تجارت)",
        descTrade: "اعلیٰ معیار • دنیا بھر میں برآمدات →",
        tagResearch: "چلغوزہ ریسرچ",
        folderResearch: "ریسرچ اور نالج (تحقیق)",
        descResearch: "سائنس • اوریجن • جنگلات • معیار →",
        galleryTitle: "نمائش گیلری اور فیلڈ لاگز (تمام 8 تصاویر)",
        aiTitle: "🤖 رائل اے آئی اسسٹنٹ",
        aiDesc: "ہمارے ہارویسٹ، تجارتی شرائط اور جنگلات کے بارے میں کچھ بھی پوچھیں۔",
        aiSend: "ارسال کریں",
        footerTitle: "دفتری پتہ اور رابطے",
        chinaOffice: "🇨🇳 چین آفس",
        islamabadOffice: "🇵🇰 اسلام آباد آفس",
        chilasOffice: "🏔️ چلاس آفس",
        afghanOffice: "🇦🇫 افغانستان آفس"
    },
    zh: {
        brandTitle: "皇家松子",
        subBrand: "松子仁",
        heroTop: "巴基斯坦 • 原产地 • 全球",
        heroMain: "皇家松子仁",
        heroDesc: "从巴基斯坦的松子林走向世界——连接优质品质、真实产源和可靠供应链。",
        tagTrade: "松子仁",
        folderTrade: "全球贸易",
        descTrade: "优质品质 • 全球出口 →",
        tagResearch: "松子研究",
        folderResearch: "研究与知识",
        descResearch: "科学 • 产地 • 森林 • 质量 →",
        galleryTitle: "展会画廊与实地日志",
        aiTitle: "🤖 皇家人工智能助手",
        aiDesc: "随时咨询我们的收成、B2B贸易条款或森林产地。",
        aiSend: "发送",
        footerTitle: "办公地址与联系方式",
        chinaOffice: "🇨🇳 中国办事处",
        islamabadOffice: "🇵🇰 伊斯兰堡办事处",
        chilasOffice: "🏔️ 奇拉斯办事处",
        afghanOffice: "🇦🇫 阿富汗办事处"
    }
};

// Complete 8 Gallery Images Array
const galleryImages = [
    { file: "01-chilghoza-lot.jpg", caption: "01. Chilghoza Bulk Lot Selection & Grading" },
    { file: "02-chilghoza-cones.jpg", caption: "02. Freshly Harvested Wild Pine Cones" },
    { file: "03-chilghoza-kernel.jpg", caption: "03. Premium Cleaned Raw Kernels" },
    { file: "04-chilghoza-harvest.jpg", caption: "04. Forest Gathering & Harvesting Season" },
    { file: "05-chilghoza-raw-kernels.jpg", caption: "05. In-Shell Wholesale Stock View" },
    { file: "06-chilghoza-cone-closeup.jpg", caption: "06. Cone Close-up & Purity Indicator" },
    { file: "07-chilghoza-products-displ.jpg", caption: "07. Export Ready Display Packets" },
    { file: "08-chilghoza-forest.jpg", caption: "08. High Altitude Native Chilghoza Forest" }
];

let tradeFolders = [
    "Global Markets (USA, China, Central Asia)",
    "Export & Logistics & Packaging",
    "Product & Quality Specifications",
    "Buyers & Bulk Pricing Direct Desk"
];

let researchFolders = [
    "Geographical Indication (GI) & Origin",
    "Chilghoza Forests Ecology & Harvesting",
    "Global Environment & Climate Impact",
    "Organic & Natural Product Claims"
];

let activeFolderType = '';

document.addEventListener("DOMContentLoaded", () => {
    renderGallery();
});

function renderGallery() {
    const galleryContainer = document.getElementById("imageGallery");
    if (!galleryContainer) return;
    galleryContainer.innerHTML = "";
    
    galleryImages.forEach((img, index) => {
        galleryContainer.innerHTML += `
            <div class="gallery-item">
                <img src="${img.file}" alt="Chilghoza Asset">
                <div class="caption-box">
                    <textarea onchange="updateCaption(${index}, this.value)">${img.caption}</textarea>
                    <button onclick="removeImage(${index})" style="background:#a00; color:#fff; border:none; padding:4px 8px; margin-top:5px; border-radius:4px; cursor:pointer;">Remove</button>
                </div>
            </div>
        `;
    });
}

function updateCaption(index, newText) {
    galleryImages[index].caption = newText;
}

function removeImage(index) {
    galleryImages.splice(index, 1);
    renderGallery();
}

function openFolderModal(type) {
    activeFolderType = type;
    const modal = document.getElementById("folderModal");
    const title = document.getElementById("modalTitle");
    const container = document.getElementById("modalSubFolders");
    
    title.innerText = type === 'trade' ? "Global Trade Sub-Folders" : "Research & Knowledge Sub-Folders";
    let folders = type === 'trade' ? tradeFolders : researchFolders;
    container.innerHTML = "";
    
    folders.forEach((folder, index) => {
        container.innerHTML += `
            <div style="display:flex; gap:10px; margin-bottom:10px;">
                <input type="text" value="${folder}" onchange="renameFolder('${type}', ${index}, this.value)" style="flex:1; background:var(--bg-primary); color:#fff; border:1px solid var(--accent-gold); padding:6px; border-radius:4px;">
                <button onclick="deleteFolder('${type}', ${index})" style="background:#800; color:#fff; border:none; padding:6px 10px; border-radius:4px; cursor:pointer;">Del</button>
            </div>
        `;
    });
    modal.style.display = "block";
}

function closeFolderModal() {
    document.getElementById("folderModal").style.display = "none";
}

function addNewSubFolder() {
    let name = prompt("Enter new folder name:");
    if(name) {
        if(activeFolderType === 'trade') {
            tradeFolders.push(name);
        } else {
            researchFolders.push(name);
        }
        openFolderModal(activeFolderType);
    }
}

function renameFolder(type, index, newName) {
    if(type === 'trade') {
        tradeFolders[index] = newName;
    } else {
        researchFolders[index] = newName;
    }
}

function deleteFolder(type, index) {
    if(type === 'trade') {
        tradeFolders.splice(index, 1);
    } else {
        researchFolders.splice(index, 1);
    }
    openFolderModal(type);
}

function askRoyalAI() {
    let query = document.getElementById("aiQuery").value;
    let responseBox = document.getElementById("aiResponse");
    if(!query) return;
    
    responseBox.innerHTML = "Processing query via Royal AI Assistant...";
    setTimeout(() => {
        responseBox.innerHTML = `<strong>Royal AI:</strong> Regarding "${query}" — our bulk inventory maintains high-grade natural moisture levels and verified origin standards across all international export channels.`;
    }, 800);
}

function changeTheme(themeName) {
    document.body.className = ""; 
    if(themeName !== 'forest') {
        document.body.classList.add(`theme-${themeName}`);
    }
}

function changeLanguage(lang) {
    const t = translations[lang];
    if (!t) return;
    
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (t[key]) {
            el.innerText = t[key];
        }
    });

    if (lang === 'ur') {
        document.documentElement.dir = 'rtl';
    } else {
        document.documentElement.dir = 'ltr';
    }
}
