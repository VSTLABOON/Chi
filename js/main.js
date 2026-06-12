document.addEventListener('DOMContentLoaded', () => {
  // Initialize modular features (defined globally in separate scripts)
  if (typeof initBook === 'function') initBook();
  if (typeof initMusic === 'function') initMusic();
  if (typeof initVideo === 'function') initVideo();
  if (typeof initPizarron === 'function') initPizarron();
  if (typeof initConstellation === 'function') initConstellation();
  if (typeof initQuiz === 'function') initQuiz();
  
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
});
