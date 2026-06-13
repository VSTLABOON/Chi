// ─── HERO FLOATING LUNARES ──────────────────────
function initHeroParticles() {
  const lunaresHero = document.getElementById('lunaresHero');
  if (lunaresHero) {
    for (let i = 0; i < 22; i++) {
      const el = document.createElement('div');
      el.className = 'lunar';
      const size = Math.random() * 16 + 6;
      el.style.cssText = `
        width: ${size}px; height: ${size}px;
        left: ${Math.random() * 100}%;
        animation-duration: ${Math.random() * 12 + 8}s;
        animation-delay: ${Math.random() * -15}s;
      `;
      lunaresHero.appendChild(el);
    }
  }
}

// ─── MJ FLOATING MUSICAL NOTES ──────────────────
function initMusicalNotes() {
  const notasEl = document.getElementById('notasMusicales');
  if (notasEl) {
    const notas = ['♪','♫','♩','♬','♭','♮'];
    const posNotas = [
      {top:'20%',left:'5%',delay:'0s'}, {top:'60%',left:'80%',delay:'1s'},
      {top:'10%',left:'75%',delay:'2s'},{top:'75%',left:'15%',delay:'0.5s'},
      {top:'40%',left:'90%',delay:'1.8s'},{top:'85%',left:'60%',delay:'3s'}
    ];
    posNotas.forEach((p,i) => {
      const el = document.createElement('span');
      el.className = 'note';
      el.textContent = notas[i % notas.length];
      el.style.cssText = `
        top:${p.top};
        left:${p.left};
        animation-duration:3.5s;
        animation-delay:${p.delay};
        color:rgba(232,201,138,0.9);
      `;
      notasEl.appendChild(el);
    });
  }
}

// ─── FLOATING ROSE PETALS (CIERRE) ───────────
function initRosePetals() {
  const cierreSection = document.querySelector('.cierre');
  if (cierreSection) {
    const numPetals = 16;
    for (let i = 0; i < numPetals; i++) {
      const petal = document.createElement('div');
      petal.className = 'petal';
      petal.style.left = `${Math.random() * 100}%`;
      const size = Math.random() * 14 + 8;
      petal.style.width = `${size}px`;
      petal.style.height = `${size}px`;
      petal.style.animationDuration = `${Math.random() * 8 + 6}s`;
      petal.style.animationDelay = `${Math.random() * -10}s`;
      cierreSection.appendChild(petal);
    }
  }
}

// ─── DIPLOMA CONFETTI TRIGGER ─────────────────
function launchConfetti() {
  const colors = ['#7B1D3A', '#A63255', '#F2C4CE', '#E8C98A', '#B8D4EE', '#ffffff'];
  for (let i = 0; i < 100; i++) {
    const p = document.createElement('div');
    p.className = 'confetti-particle';
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    p.style.left = `${Math.random() * 100}%`;
    p.style.width = `${Math.random() * 8 + 5}px`;
    p.style.height = `${Math.random() * 12 + 6}px`;
    p.style.animationDuration = `${Math.random() * 2 + 2}s`;
    p.style.animationDelay = `${Math.random() * 0.5}s`;
    document.body.appendChild(p);
    
    // Auto-remove particles after animation completes
    setTimeout(() => p.remove(), 4000);
  }
}
