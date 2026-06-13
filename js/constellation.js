function initConstellation() {
  const moleStars = document.querySelectorAll('.mole-star');
  const constellationMessage = document.getElementById('constellationMessage');
  
  const loveNotes = [
    "✦ Primera estrella: Por las risas espontáneas que iluminan el salón de clases.",
    "✦ Segunda estrella: El dulce misterio de quedarnos a conversar sobre libros.",
    "✦ Tercera estrella: La calidez del sol de Monterrey reflejada en tu mirada de café.",
    "✦ Cuarta estrella: Un cariño inmenso que desafía al tiempo, del Cretácico hasta hoy.",
    "✦ Quinta estrella: El mapa estelar perfecto que siempre me guía de vuelta a ti."
  ];

  const targetSequence = [0, 2, 1, 4, 3];
  let clickedSequence = [];

  if (constellationMessage) {
    constellationMessage.style.transition = 'opacity 0.25s ease';
  }

  moleStars.forEach((star) => {
    star.addEventListener('click', () => {
      const index = parseInt(star.getAttribute('data-index') || '0', 10);
      
      // Toggle active classes
      moleStars.forEach(s => s.classList.remove('active'));
      star.classList.add('active');

      // Update message with fade-in
      if (constellationMessage) {
        constellationMessage.style.opacity = '0';
        setTimeout(() => {
          constellationMessage.textContent = loveNotes[index];
          constellationMessage.style.opacity = '1';
        }, 150);
      }

      // Track sequence for the Easter Egg
      clickedSequence.push(index);
      if (clickedSequence.length > targetSequence.length) {
        clickedSequence.shift();
      }

      if (clickedSequence.length === targetSequence.length &&
          clickedSequence.every((val, i) => val === targetSequence[i])) {
        // Trigger secret overlay
        const secretOverlay = document.getElementById('secretOverlay');
        if (secretOverlay) {
          secretOverlay.classList.add('visible');
        }
        clickedSequence = [];
      }
    });
  });

  // Setup secret overlay close logic
  const secretOverlay = document.getElementById('secretOverlay');
  const secretClose = document.getElementById('secretClose');
  if (secretOverlay) {
    if (secretClose) {
      secretClose.addEventListener('click', () => {
        secretOverlay.classList.remove('visible');
      });
    }
    // Also close on click outside the container
    secretOverlay.addEventListener('click', (e) => {
      if (e.target === secretOverlay) {
        secretOverlay.classList.remove('visible');
      }
    });
  }
}

