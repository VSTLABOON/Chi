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
    });
  });
}
