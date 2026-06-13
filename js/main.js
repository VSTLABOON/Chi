document.addEventListener('DOMContentLoaded', () => {
  // Initialize modular features (defined globally in separate scripts)
  if (typeof initBook === 'function') initBook();
  if (typeof initMusic === 'function') initMusic();
  if (typeof initVideo === 'function') initVideo();
  if (typeof initPizarron === 'function') initPizarron();
  if (typeof initConstellation === 'function') initConstellation();
  if (typeof initQuiz === 'function') initQuiz();
  if (typeof initDinoGame === 'function') initDinoGame();
  if (typeof initFeatures === 'function') initFeatures();
  
  // Initialize particle systems
  if (typeof initHeroParticles === 'function') initHeroParticles();
  if (typeof initMusicalNotes === 'function') initMusicalNotes();
  if (typeof initRosePetals === 'function') initRosePetals();

  // ─── READING PROGRESS BAR ──────────────────────
  const progressBar = document.getElementById('progressBar');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      progressBar.style.width = scrolled + '%';
    });
  }

  // ─── ENCYCLOPEDIA 3D BOOK TOGGLE ────────────────
  const encyclopediaBook = document.getElementById('encyclopediaBook');
  if (encyclopediaBook) {
    encyclopediaBook.addEventListener('click', () => {
      encyclopediaBook.classList.toggle('open');
    });
    encyclopediaBook.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        encyclopediaBook.classList.toggle('open');
      }
    });
  }

  // ─── RIZOS GENERATION ──────────────────────────
  const rizosCanvas = document.getElementById('rizosCanvas');
  if (rizosCanvas) {
    const delays = [0, 0.4, 0.8, 1.2, 1.6, 0.2, 0.6, 1.0];
    const rotations = [0, 90, 180, 270, 45, 135, 225, 315];
    delays.forEach((d, i) => {
      const el = document.createElement('div');
      el.className = 'rizo';
      el.style.animationDelay = `${d}s`;
      el.style.transform = `rotate(${rotations[i]}deg)`;
      
      // Render dynamic premium golden spiral path representing real hair curls
      el.innerHTML = `
        <svg viewBox="0 0 100 100" class="rizo-svg" style="animation-delay: ${d}s;">
          <defs>
            <linearGradient id="goldGrad-${i}" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#FFE07D" />
              <stop offset="50%" stop-color="#E8C98A" />
              <stop offset="100%" stop-color="#B5893D" />
            </linearGradient>
          </defs>
          <path d="M 50 10 C 75 10, 90 30, 90 50 C 90 70, 70 90, 50 90 C 30 90, 10 70, 10 50 C 10 30, 30 10, 50 18 C 65 24, 75 38, 75 52 C 75 66, 62 76, 50 76 C 38 76, 28 66, 28 54 C 28 42, 38 32, 48 35 C 58 38, 62 48, 56 56 C 50 62, 42 60, 42 54" 
                stroke="url(#goldGrad-${i})" stroke-width="5" stroke-linecap="round" fill="none" />
        </svg>
      `;
      rizosCanvas.appendChild(el);
    });
  }

  // ─── SECTION REVEAL (INTERSECTION OBSERVER) ─────
  const revealEls = document.querySelectorAll(
    '.chapter, .book-section, .thriller-section, .ojos-section, .rizos-section, .mosa-section, .maestra-section, .scrapbook-section, .quiz-section'
  );
  
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });

  revealEls.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    io.observe(el);
  });

  // Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
});
