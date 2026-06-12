function initPizarron() {
  const pizarronTexto = document.getElementById('pizarronTexto');
  const textToType = `Hoy aprenderemos:\n\npor qué los pollos son dinosaurios\ncómo bailar como MJ (opcional)\npor qué Samara es extraordinaria`;
  let activeColor = "#ffffff";
  let typewriterTimeout = null;

  function typeWriter(element, text, index, speed) {
    if (index < text.length) {
      const char = text.charAt(index);
      if (char === '\n') {
        element.innerHTML += '<br>';
      } else {
        element.innerHTML += char;
      }
      typewriterTimeout = setTimeout(() => {
        typeWriter(element, text, index + 1, speed);
      }, speed);
    } else {
      element.innerHTML += '<span class="chalk-cursor"></span>';
    }
  }

  function startChalkboardAnimation() {
    if (typewriterTimeout) {
      clearTimeout(typewriterTimeout);
    }
    if (pizarronTexto) {
      pizarronTexto.innerHTML = '';
      typeWriter(pizarronTexto, textToType, 0, 45);
    }
  }

  // Chalk selection
  const tizas = document.querySelectorAll('.tizas-colores .tiza');
  tizas.forEach(tiza => {
    tiza.addEventListener('click', (e) => {
      tizas.forEach(t => t.classList.remove('active'));
      tiza.classList.add('active');
      
      activeColor = tiza.getAttribute('data-color');
      if (pizarronTexto) {
        pizarronTexto.style.color = activeColor;
        pizarronTexto.style.textShadow = `0 0 2px ${activeColor}b3, 0 0 4px ${activeColor}66`;
      }
    });
  });

  // Eraser
  const borrador = document.getElementById('borradorPizarron');
  if (borrador) {
    borrador.addEventListener('click', () => {
      startChalkboardAnimation();
    });
  }

  const pizarronObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startChalkboardAnimation();
        pizarronObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  const pizarronSection = document.querySelector('.pizarron');
  if (pizarronSection) {
    pizarronObserver.observe(pizarronSection);
  }

  // Pollito click interaction
  const polloSticker = document.getElementById('polloSticker');
  const polloBubble = document.getElementById('polloBubble');
  
  const polloPhrases = [
    "¡Coc-coooc! Las milanesas son parientes del T-Rex. ¡Respeta a tus mayores!",
    "¡Hola Samara! ¿Hoy habrá examen sorpresa?",
    "¡Pío! Michael Jackson inventó el moonwalk, pero yo inventé el egg-walk.",
    "¡Cruzo la calle para ir a tu clase!",
    "Maestra, ¿me pone 10 en conducta? Soy un buen pollito ancestral.",
    "¡El Cretácico rules! 🦖✦"
  ];
  let bubbleTimeout = null;

  if (polloSticker && polloBubble) {
    polloSticker.addEventListener('click', () => {
      // Trigger Hop animation
      polloSticker.classList.remove('hop');
      // trigger reflow
      void polloSticker.offsetWidth;
      polloSticker.classList.add('hop');

      // Set random phrase
      const randomPhrase = polloPhrases[Math.floor(Math.random() * polloPhrases.length)];
      polloBubble.textContent = randomPhrase;

      // Show bubble
      polloBubble.classList.add('open');

      // Clear previous timeout
      if (bubbleTimeout) clearTimeout(bubbleTimeout);

      // Auto-hide bubble after 4 seconds
      bubbleTimeout = setTimeout(() => {
        polloBubble.classList.remove('open');
      }, 4000);
    });
  }
}
