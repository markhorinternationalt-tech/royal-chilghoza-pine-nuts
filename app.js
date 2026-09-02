// Exact 8 GitHub Images Database matching your repository filenames
        let githubImagesDB = [
            { id: 1, title: "Chilgoza Lot Collection", caption: "Batch Lot Verification", desc: "Bulk pine nut lots ready for sorting and export processing.", url: "01-chilghoza-lot.jpg" },
            { id: 2, title: "Natural Pine Cones", caption: "Cone Inspection", desc: "Freshly harvested wild pine cones from high altitude valleys.", url: "02-chilghoza-cones.jpg" },
            { id: 3, title: "Selected Kernels", caption: "Grade A Quality", desc: "High purity organic pine nut kernels sorted for global markets.", url: "03-chilghoza-kernel.jpg" },
            { id: 4, title: "Traditional Harvesting", caption: "Safe Collection", desc: "Sustainable harvesting techniques by expert local mountain communities.", url: "04-chilghoza-harvest.jpg" },
            { id: 5, title: "Raw In-Shell Kernels", caption: "Natural Protection", desc: "In-shell chilgoza nuts preserving natural oils and freshness.", url: "05-chilghoza-raw-kernels.jpg" },
            { id: 6, title: "Cone Closeup View", caption: "Detailed Botany", desc: "Botanical closeup showing natural resin, scales, and seed formation.", url: "06-chilghoza-cone-closeup.jpg" },
            { id: 7, title: "Products Display", caption: "Packaging Ready", desc: "Export-grade packaged chilgoza displays and wholesale standards.", url: "07-chilghoza-products-display.jpg" },
            { id: 8, title: "Chilgoza Forest Habitat", caption: "Natural Forests", desc: "High altitude mountain forest ecosystem in Gilgit-Baltistan.", url: "08-chilghoza-forest.jpg" }
        ];

        let isAdminLoggedIn = false;

        function openAdminModal() {
            const pwd = prompt("Enter Admin Password (default: admin_chilas_2026):");
            if(pwd === "admin_chilas_2026" || pwd === "admin") {
                isAdminLoggedIn = true;
                document.getElementById('adminControlPanel').style.display = 'block';
                document.getElementById('adminMediaBox').style.display = 'block';
                document.getElementById('admin-login-btn').innerText = "🔓 Active";
                renderGitHubGallery();
                renderFolderGrids();
                alert("Admin Access Granted!");
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

        const translations = {
            en: {
                title: "ROYAL CHILGOZA", sub: "GLOBAL ECOSYSTEM", wa: "💬 WA",
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
            zh: {
                title: "皇家松子", sub: "全球生态系统", wa: "💬 微信/WhatsApp",
                badge: "巴基斯坦 • 国际贸易与研究",
                hHead: "皇家松子 <span>生态系统</span>",
                hDesc: "探索专业贸易市场和深入的科学研究文件夹。可通过管理员模式进行实时完全编辑。",
                tLabel: "商业与贸易", tTitle: "全球贸易", tDesc: "10个全面的国际贸易目录，包含独立媒体、AI和WhatsApp连接 →",
                rLabel: "科学与生态", tTitle: "研究与知识", tDesc: "关于产地、林业、植物学、营养学和可持续性的10个详细研究文件夹 →",
                thTitle: "🌍 全球贸易枢纽", thDesc: "选择下方任意分类以打开其专属的微型网站，包含媒体库、视频资源、PDF文档和皇家AI助手。",
                rhTitle: "🌲 研究与知识枢纽", rhDesc: "选择下方任意科学分类以浏览专属文档、研究报告、AI助手和直接贸易咨询。",
                tradeFolders: [
                    { title: '全球市场', desc: '全球需求、市场机会和国际贸易目的地。' },
                    { title: '美国市场与买家', desc: '美国买家、进口商、市场机会和商业联系。' },
                    { title: '中国市场与买家', desc: '中国买家、贸易商、进口商和商业机会。' },
                    { title: '出口与物流', desc: '出口文件、海关、运输、交付和国际物流。' },
                    { title: '产品与质量', desc: '松仁、带壳松子、烘烤、等级、规格和质量标准。' },
                    { title: '供应链与可追溯性', desc: '森林 → 采集商 → 加工 → 包装 → 出口，具备透明的可追溯性。' },
                    { title: '地理标志 (GI)', desc: '产地、身份、真实性、地理声誉和产品可追溯性。' },
                    { title: '有机化学与天然品质', desc: '天然油脂、化学成分、纯度、营养特性和质量特征。' },
                    { title: '加工、包装与增值', desc: '加工、分级、烘烤、包装、品牌建设和高端产品开发。' },
                    { title: '可持续与道德贸易', desc: '负责任采购、公平价值、社区效益和保护关联贸易。' }
                ],
                researchFolders: [
                    { title: '地理产地与GI研究', desc: '松子产地、地理身份、传统知识和GI研究。' },
                    { title: '松子生物学与植物学', desc: '树木生物学、生长、繁殖、种子发育和自然更新。' },
                    { title: '营养价值与天然成分', desc: '蛋白质、天然油脂、矿物质、营养素和科学成分。' },
                    { title: '松子森林与生态', desc: '森林生态系统、生态功能、更新和可持续森林管理。' },
                    { title: '生物多样性与野生动物', desc: '野生动物栖息地、生物多样性、生态系统服务和保护价值。' },
                    { title: '气候与全球绿色环境', desc: '气候韧性、碳、水、土壤保护和全球环境效益。' },
                    { title: '森林保护与恢复', desc: '森林保护、恢复、自然更新、人工林和可持续管理。' },
                    { title: '供应链与社区生计', desc: '本地采集者、农村生计、价值链、增加收入和减少贫困。' },
                    { title: '可持续采收与社区意识', desc: '安全采收、森林保护、社区培训和保护意识。' },
                    { title: '研究、政策与伙伴关系', desc: '研究知识、政府政策、粮农组织、全球环境基金、非政府组织、机构和未来伙伴关系。' }
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
            const currentLang = document.getElementById('langSelect').value;
            const t = translations[currentLang] || translations.en;
            const folderVisualImages = githubImagesDB.map(img => img.url);

            const makeFolderCard = (type, f, index, localized) => {
                const imageUrl = folderVisualImages[(index + (type === 'research' ? 4 : 0)) % folderVisualImages.length];
                const safeTitle = localized.title || (type === 'trade' ? 'Trade Hub' : 'Research Hub');
                const safeDesc = localized.desc || (type === 'trade' ? 'Global trade, buyers and export opportunities.' : 'Science, ecology and Chilgoza knowledge.');
                return `
                    <div class="card folder-card" onclick="openSubFolder('${type}', '${f.id}')">
                        <div class="folder-card-media">
                            <img src="${imageUrl}" alt="${safeTitle}" loading="lazy">
                        </div>
                        <div class="folder-card-body">
                            <span class="folder-card-number">${String(f.tag || (index + 1)).padStart(2, '0')}</span>
                            <div class="card-tag">${type === 'trade' ? 'GLOBAL TRADE' : 'RESEARCH & KNOWLEDGE'}</div>
                            <div class="card-title">${safeTitle}</div>
                            <div class="card-desc">${safeDesc}</div>
                        </div>
                        <div>
                            <span>Explore Folder →</span>
                            ${isAdminLoggedIn ? `<button onclick="event.stopPropagation(); deleteFolder('${type}', '${f.id}')" style="background:none;border:none;color:#f87171;font-size:.7rem;cursor:pointer;">Delete</button>` : ''}
                        </div>
                    </div>`;
            };

            const tradeGrid = document.getElementById('trade-folders-grid');
            if(tradeGrid) {
                tradeGrid.innerHTML = '';
                tradeFolders.forEach((f, index) => {
                    const localized = (t.tradeFolders && t.tradeFolders[index]) ? t.tradeFolders[index] : { title: 'Custom Hub', desc: 'Custom folder hub.' };
                    tradeGrid.innerHTML += makeFolderCard('trade', f, index, localized);
                });
            }

            const researchGrid = document.getElementById('research-folders-grid');
            if(researchGrid) {
                researchGrid.innerHTML = '';
                researchFolders.forEach((f, index) => {
                    const localized = (t.researchFolders && t.researchFolders[index]) ? t.researchFolders[index] : { title: 'Custom Research Hub', desc: 'Custom research folder.' };
                    researchGrid.innerHTML += makeFolderCard('research', f, index, localized);
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
            const currentLang = document.getElementById('langSelect').value;
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
            renderGitHubGallery();
            renderFolderGrids();
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

        function changeLanguage(lang) {
            const t = translations[lang] || translations.en;
            if(t.title) document.getElementById('site-title').innerText = t.title;
            if(t.sub) document.getElementById('site-sub').innerText = t.sub;
            if(t.badge) document.getElementById('hero-badge').innerText = t.badge;
            if(t.hHead) document.getElementById('hero-heading').innerHTML = t.hHead;
            if(t.hDesc) document.getElementById('hero-desc').innerText = t.hDesc;
            if(t.tLabel) document.getElementById('trade-tag-label').innerText = t.tLabel;
            if(t.rLabel) document.getElementById('research-tag-label').innerText = t.rLabel;
            if(t.thTitle) document.getElementById('trade-head-title').innerText = t.thTitle;
            if(t.thDesc) document.getElementById('trade-head-desc').innerText = t.thDesc;
            if(t.rhTitle) document.getElementById('research-head-title').innerText = t.rhTitle;
            if(t.rhDesc) document.getElementById('research-head-desc').innerText = t.rhDesc;
            
            renderFolderGrids();
            const rtlLangs = ['ur', 'ar', 'fa', 'ps'];
            document.body.dir = rtlLangs.includes(lang) ? 'rtl' : 'ltr';
        }
