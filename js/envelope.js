function initBook() {
  const introBook = document.getElementById('introBook');
  const envelopeWrapper = document.getElementById('envelope-wrapper');

  function openBook() {
    if (!introBook || introBook.classList.contains('open')) return;
    
    introBook.classList.add('open');
    
    // Unlock and play audio on user click
    try {
      if (typeof loadTrack === 'function') {
        loadTrack(0);
      }
      if (typeof playTrack === 'function') {
        playTrack();
      }
    } catch(e) {
      console.log("Audio context unlock failed: ", e);
    }
    
    // Transition overlay away after page flip animation finishes (1.8 seconds)
    setTimeout(() => {
      if (envelopeWrapper) {
        envelopeWrapper.classList.add('fade-out');
      }
      
      // Mostrar la mascota pollito y su selector cuando se abre el libro
      const polloSticker = document.getElementById('polloSticker');
      const mascotSelector = document.getElementById('mascotSelector');
      if (polloSticker) {
        polloSticker.classList.add('visible');
      }
      if (mascotSelector) {
        mascotSelector.classList.add('visible');
      }
    }, 1800);
  }

  // Bind click/keypress to book
  if (introBook) {
    introBook.addEventListener('click', openBook);
    introBook.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        openBook();
      }
    });
  }
}
