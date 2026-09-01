// Cloudflare Worker fetch event listener for zero-cost routing
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  return new Response("Royal Chilghoza Worker Active", {
    headers: { 'content-type': 'text/plain;charset=UTF-8' }
  });
}

// Frontend Dynamic Code Logic
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
                <input type="text" value="${folder}" onchange="renameFolder('${type}', ${index}, this.value)" style="flex:1; background:#0b1c14; color:#fff; border:1px solid #d4af37; padding:6px; border-radius:4px;">
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

function toggleTheme() {
    alert("Multi-color theme switcher configuration active.");
}

function changeLanguage(lang) {
    console.log("Language switched to: " + lang);
}
