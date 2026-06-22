export function initUI() {
  initThemeToggle();
  initSoundToggle();
  initGallery();
  initCustomization();
  initCategoryExplore();
}

function initThemeToggle() {
  const btn = document.getElementById('theme-toggle');
  const html = document.documentElement;

  btn.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
  });
}

function initSoundToggle() {
  const btn = document.getElementById('sound-toggle');
  let isMuted = true;
  
  // For actual implementation, use an Audio object.
  // const bgm = new Audio('/premium-bgm.mp3');
  // bgm.loop = true;

  btn.addEventListener('click', () => {
    isMuted = !isMuted;
    btn.innerHTML = isMuted ? '🔈' : '🔊';
    // if(isMuted) bgm.pause(); else bgm.play();
  });
}

function initGallery() {
  const grid = document.getElementById('masonry-grid');
  const filters = document.querySelectorAll('.filter-btn');

  // Mock data for gallery
  const items = [
    { type: 'interior', img: 'https://images.unsplash.com/photo-1600607687931-cebf5851ce30?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', title: 'Modern Living' },
    { type: 'exterior', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', title: 'Luxury Villa' },
    { type: 'garden', img: 'https://images.unsplash.com/photo-1558904541-efa843a96f0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', title: 'Zen Garden' },
    { type: 'interior', img: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', title: 'Smart Kitchen' },
    { type: 'exterior', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', title: 'Contemporary Mansion' },
    { type: 'interior', img: 'https://images.unsplash.com/photo-1600210491369-e753d80a41f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', title: 'Master Bedroom' },
  ];

  const renderGrid = (filter) => {
    grid.innerHTML = '';
    const filtered = filter === 'all' ? items : items.filter(i => i.type === filter);
    
    filtered.forEach(item => {
      const div = document.createElement('div');
      div.className = 'masonry-item';
      div.innerHTML = `
        <img src="${item.img}" alt="${item.title}">
        <div class="masonry-overlay">
          <span>${item.title}</span>
        </div>
      `;
      grid.appendChild(div);
    });
  };

  // Initial render
  renderGrid('all');

  // Filter clicks
  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(f => f.classList.remove('active'));
      btn.classList.add('active');
      renderGrid(btn.getAttribute('data-filter'));
    });
  });
}

function initCustomization() {
  const dropZone = document.getElementById('drop-zone');
  const fileUpload = document.getElementById('file-upload');
  const aiMockup = document.getElementById('ai-mockup');
  const originalImg = document.getElementById('mockup-original');
  const generatedImg = document.getElementById('mockup-generated');

  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropZone.addEventListener(eventName, preventDefaults, false);
  });

  function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  ['dragenter', 'dragover'].forEach(eventName => {
    dropZone.addEventListener(eventName, () => dropZone.classList.add('dragover'), false);
  });

  ['dragleave', 'drop'].forEach(eventName => {
    dropZone.addEventListener(eventName, () => dropZone.classList.remove('dragover'), false);
  });

  dropZone.addEventListener('drop', handleDrop, false);
  fileUpload.addEventListener('change', (e) => handleFiles(e.target.files));

  function handleDrop(e) {
    let dt = e.dataTransfer;
    let files = dt.files;
    handleFiles(files);
  }

  function handleFiles(files) {
    if(files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        // Show mockup UI
        dropZone.style.display = 'none';
        aiMockup.classList.remove('hidden');
        
        // Set original image
        originalImg.style.backgroundImage = `url(${e.target.result})`;
        
        // Simulate AI processing delay
        setTimeout(() => {
          // Set a luxurious mockup image
          generatedImg.style.backgroundImage = `url('https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')`;
          
          // Stop scan line
          const scan = generatedImg.querySelector('.scan-line');
          if(scan) scan.style.animation = 'none';
          if(scan) scan.style.display = 'none';
        }, 3000);
      };
      reader.readAsDataURL(file);
    }
  }
}

function initCategoryExplore() {
  const cards = document.querySelectorAll('.explore-card');
  const modal = document.getElementById('category-details');
  const closeBtn = document.getElementById('btn-close-category');
  const title = document.getElementById('category-title');
  const content = document.getElementById('category-content');

  const categoryData = {
    interior: [
      { title: 'Modern Living Rooms', img: 'https://images.unsplash.com/photo-1600607687931-cebf5851ce30?auto=format&fit=crop&w=600&q=80' },
      { title: 'Luxury Bedrooms', img: 'https://images.unsplash.com/photo-1600210491369-e753d80a41f3?auto=format&fit=crop&w=600&q=80' },
      { title: 'Smart Kitchens', img: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=600&q=80' }
    ],
    exterior: [
      { title: 'Luxury Villas', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80' },
      { title: 'Modern Mansions', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80' },
      { title: 'Swimming Pool Areas', img: 'https://images.unsplash.com/photo-1576013551627-14234086d066?auto=format&fit=crop&w=600&q=80' }
    ],
    garden: [
      { title: 'Modern Landscapes', img: 'https://images.unsplash.com/photo-1558904541-efa843a96f0f?auto=format&fit=crop&w=600&q=80' },
      { title: 'Water Features', img: 'https://images.unsplash.com/photo-1524316045936-39bd268bf194?auto=format&fit=crop&w=600&q=80' }
    ]
  };

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const target = card.getAttribute('data-target');
      
      if(target === 'everything') {
        // Just scroll to gallery for everything
        document.getElementById('gallery').scrollIntoView({behavior: 'smooth'});
        return;
      }

      const data = categoryData[target];
      if(data) {
        title.innerText = target.charAt(0).toUpperCase() + target.slice(1) + ' Design';
        content.innerHTML = data.map(item => `
          <div class="category-item">
            <img src="${item.img}" alt="${item.title}">
            <div class="category-item-title">${item.title}</div>
          </div>
        `).join('');
        
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  closeBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  });
}
