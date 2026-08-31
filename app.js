document.addEventListener('DOMContentLoaded', () => {
  // 1. Page Navigation & Routing
  const navLinks = document.querySelectorAll('[data-route]');
  const pages = document.querySelectorAll('.page');
  const backBtns = document.querySelectorAll('[data-back]');

  function showPage(pageId) {
    pages.forEach(page => page.classList.remove('active'));
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
      targetPage.classList.add('active');
      window.scrollTo(0, 0);
    }
  }

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const route = link.getAttribute('data-route');
      if (route) showPage(route);
    });
  });

  backBtns.forEach(btn => {
    btn.addEventListener('click', () => showPage('home'));
  });

  // Helper Function: Generate HTML for Folder Images with Captions
  function createFolderImages(imagesList) {
    let imagesHtml = '<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 14px; margin-top: 20px;">';
    imagesList.forEach(img => {
      imagesHtml += `
        <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.12); padding: 8px; border-radius: 8px; text-align: center;">
          <img src="${img.file}" alt="${img.caption}" style="width: 100%; height: 110px; object-fit: cover; border-radius: 6px; display: block;" loading="lazy">
          <p style="margin-top: 6px; margin-bottom: 0; font-size: 0.78rem; color: #d1d5db; line-height: 1.2;">${img.caption}</p>
        </div>
      `;
    });
    imagesHtml += '</div>';
    return imagesHtml;
  }

  // 2. Research Folders Data (Matched with Forest, GI, Ecology, Organic)
  const researchData = [
    { 
      id: 'r1', num: '01', title: 'Geographical Indication (GI)', 
      desc: 'Origin protection, product identity, and supply-chain evidence.', 
      detail: 'Legal protections, region-specific origin mapping, GI tags for Pakistani Chilghoza, and origin traceability mechanisms.',
      images: [
        { file: '001.jpg', caption: 'GI Protection Map' },
        { file: '002.jpg', caption: 'Origin Traceability Docs' },
        { file: '003.jpg', caption: 'Regional Forest Mapping' },
        { file: '004.jpg', caption: 'Chilghoza Identity Certification' },
        { file: '005.jpg', caption: 'Supply Chain Evidence' }
      ]
    },
    { 
      id: 'r2', num: '02', title: 'Chilghoza Forests', 
      desc: 'Forest ecology, regeneration, harvesting, and conservation.', 
      detail: 'Ecological research on Pinus gerardiana habitats, cone maturation cycles, community-managed forestry, and conservation efforts.',
      images: [
        { file: '006.jpg', caption: 'High-Altitude Forest Canopy' },
        { file: '007.jpg', caption: 'Pinus Gerardiana Trees' },
        { file: '008.jpg', caption: 'Natural Regeneration Area' },
        { file: '009.jpg', caption: 'Mountain Forest Habitat' },
        { file: '010.jpg', caption: 'Conservation Zone' },
        { file: '011.jpg', caption: 'Community Forestry Sector' }
      ]
    },
    { 
      id: 'r3', num: '03', title: 'Global Environment & Climate', 
      desc: 'Biodiversity, carbon, ecosystem services, and climate resilience.', 
      detail: 'Impact of climate variability on cone yields, high-altitude ecosystem preservation, and environmental sustainability studies.',
      images: [
        { file: '012.jpg', caption: 'Highland Biodiversity' },
        { file: '013.jpg', caption: 'Ecosystem Monitoring' },
        { file: '014.jpg', caption: 'Climate Resilience Data' },
        { file: '015.jpg', caption: 'Alpine Forest Weather Impact' },
        { file: '016.jpg', caption: 'Soil & Moisture Analysis' }
      ]
    },
    { 
      id: 'r4', num: '04', title: 'Organic & Natural Product Claims', 
      desc: 'Evidence, standards, chain of custody, and declarations.', 
      detail: 'Chemical-free natural processing, forest origin verification, nutritional profile analysis, and laboratory testing reports.',
      images: [
        { file: '017.jpg', caption: 'Lab Analysis Report' },
        { file: '018.jpg', caption: 'Natural Harvest Sample' },
        { file: '019.jpg', caption: 'Organic Purity Test' },
        { file: '020.jpg', caption: 'Chemical-Free Verification' },
        { file: '021.jpg', caption: 'Nutritional Profile Data' }
      ]
    }
  ];

  // 3. Trade Folders Data (Matched with Cones, Kernels/Mughaz, Packaging, Export)
  const tradeData = [
    { 
      id: 't1', num: '01', title: 'Quality & Grading', 
      desc: 'Standards for size, moisture, purity, and grading of pine nuts.', 
      detail: 'Detailed specifications for kernel size, moisture content, shell integrity, and international export quality grading standards for Royal Chilghoza.',
      images: [
        { file: '022.jpg', caption: 'Grade-A Raw Kernels (مغز)' },
        { file: '023.jpg', caption: 'Size & Shell Grading' },
        { file: '024.jpg', caption: 'Moisture Testing' },
        { file: '025.jpg', caption: 'Kernel Color Inspection' },
        { file: '026.jpg', caption: 'Jumbo Size Pine Nuts' }
      ]
    },
    { 
      id: 't2', num: '02', title: 'Export & Logistics', 
      desc: 'Global shipping, packaging, and supply chain compliance.', 
      detail: 'Information regarding vacuum packaging, cold storage logistics, customs documentation, and worldwide freight handling.',
      images: [
        { file: '027.jpg', caption: 'Vacuum Sealed Packaging' },
        { file: '028.jpg', caption: 'Cold Storage Handling' },
        { file: '029.jpg', caption: 'Export Freight Cartons' },
        { file: '030.jpg', caption: 'Customs Compliance Docs' },
        { file: '031.jpg', caption: 'Bulk Shipment Dispatch' }
      ]
    },
    { 
      id: 't3', num: '03', title: 'Market Trends & Pricing', 
      desc: 'Commercial insights, market demand, and price dynamics.', 
      detail: 'Seasonal harvesting insights, wholesale market rates, regional trade statistics, and international demand forecasts.',
      images: [
        { file: '032.jpg', caption: 'Harvest Season Cone Yield' },
        { file: '033.jpg', caption: 'Pine Cone Extraction (کون)' },
        { file: '034.jpg', caption: 'Wholesale Trade Stock' },
        { file: '035.jpg', caption: 'Regional Market Supply' },
        { file: '036.jpg', caption: 'International Freight Batch' }
      ]
    },
    { 
      id: 't4', num: '04', title: 'Responsible Supply Chain', 
      desc: 'Ethical sourcing, fair trade practices, and local partnerships.', 
      detail: 'Direct procurement protocols from local forest communities, sustainable harvesting agreements, and equitable trade practices.',
      images: [
        { file: '037.jpg', caption: 'Local Community Collection' },
        { file: '038.jpg', caption: 'Traditional Harvesting' },
        { file: '039.jpg', caption: 'Cone Drying Yard' },
        { file: '040.jpg', caption: 'Manual De-shelling Process' },
        { file: '041.jpg', caption: 'Fair Trade Procurement' },
        { file: '042.jpg', caption: 'Sourcing Quality Check' },
        { file: '043.jpg', caption: 'Final Export Inspection' }
      ]
    }
  ];

  // Render Folders & Dynamic Click Handler
  function renderFolders(gridId, detailId, data) {
    const grid = document.getElementById(gridId);
    const detail = document.getElementById(detailId);
    if (!grid || !detail) return;

    grid.innerHTML = data.map(item => `
      <div class="folder" data-id="${item.id}" style="cursor: pointer;">
        <span class="num">${item.num}</span>
        <h3>${item.title}</h3>
        <p>${item.desc}</p>
      </div>
    `).join('');

    grid.querySelectorAll('.folder').forEach(folderEl => {
      folderEl.addEventListener('click', () => {
        grid.querySelectorAll('.folder').forEach(f => f.classList.remove('active'));
        folderEl.classList.add('active');
        const selected = data.find(d => d.id === folderEl.dataset.id);
        if (selected) {
          const galleryHtml = createFolderImages(selected.images);
          detail.innerHTML = `
            <div class="detail-box" style="margin-top: 20px;">
              <h2>${selected.title}</h2>
              <p>${selected.detail}</p>
              <h4 style="margin-top: 25px; color: #d4af37;">Gallery & Field Evidence:</h4>
              ${galleryHtml}
            </div>
          `;
          detail.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      });
    });
  }

  renderFolders('researchFolders', 'researchContent', researchData);
  renderFolders('tradeFolders', 'tradeContent', tradeData);

  // 4. Language Menu Toggle
  const langBtn = document.getElementById('langBtn');
  const langMenu = document.getElementById('langMenu');
  if (langBtn && langMenu) {
    langBtn.addEventListener('click', () => {
      langMenu.classList.toggle('open');
    });
  }

  // 5. Admin Login Demo
  const loginBtn = document.getElementById('loginBtn');
  const loginPanel = document.getElementById('loginPanel');
  const adminPanel = document.getElementById('adminPanel');
  if (loginBtn && loginPanel && adminPanel) {
    loginBtn.addEventListener('click', () => {
      loginPanel.classList.add('hidden');
      adminPanel.classList.remove('hidden');
    });
  }

  // 6. Dynamic Footer Year
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
