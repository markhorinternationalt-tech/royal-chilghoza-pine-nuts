document.addEventListener('DOMContentLoaded', () => {
  // Gallery 8 Original Images with exact correct paths
  const galleryImages = [
    { src: 'assets/home/01-chilghoza-lot.jpg', title: 'GI Protection Map', desc: 'Detailed origin protection mapping.' },
    { src: 'assets/home/02-chilghoza-cones.jpg', title: 'Origin Traceability Docs', desc: 'Verifiable regional source documentation.' },
    { src: 'assets/home/03-chilghoza-tree.jpg', title: 'Regional Forest Mapping', desc: 'Natural habitat and forest ecological mapping.' },
    { src: 'assets/home/04-chilghoza-kernel.jpg', title: 'Chilghoza Identity Certification', desc: 'Quality standards and identity verification.' },
    { src: 'assets/home/05-chilghoza-harvest.jpg', title: 'Supply Chain Evidence', desc: 'Transparent harvesting and logistics chain.' },
    { src: 'assets/home/06-chilghoza-forest.jpg', title: 'Forest Ecology & Canopy', desc: 'Sustainable forest canopy and growth structures.' },
    { src: 'assets/home/07-chilghoza-processing.jpg', title: 'Traditional Processing', desc: 'Hygienic processing and grading standards.' },
    { src: 'assets/home/08-chilghoza-grade.jpg', title: 'Export Ready Grade', desc: 'Premium export-grade packaging and selection.' }
  ];

  const galleryContainer = document.getElementById('homeGallery');
  if (galleryContainer) {
    galleryContainer.innerHTML = galleryImages.map(img => `
      <div class="gallery-card">
        <img src="${img.src}" alt="${img.title}" loading="lazy">
        <div class="gallery-info">
          <h3>${img.title}</h3>
          <p>${img.desc}</p>
        </div>
      </div>
    `).join('');
  }

  // Navigation Routing Logic
  const pages = document.querySelectorAll('.page');
  const navLinks = document.querySelectorAll('.main-nav a, .hero-actions a, .brand');

  function switchPage(hash) {
    const targetId = hash ? hash.replace('#', '') : 'home';
    pages.forEach(page => {
      if (page.id === targetId) {
        page.classList.add('active');
      } else {
        page.classList.remove('active');
      }
    });
    window.scrollTo(0, 0);
  }

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        history.pushState(null, '', href);
        switchPage(href);
      }
    });
  });

  window.addEventListener('popstate', () => {
    switchPage(window.location.hash);
  });

  if (window.location.hash) {
    switchPage(window.location.hash);
  }
});
