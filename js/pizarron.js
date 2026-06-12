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
    "¡El Cretácico rules! 🦖✦",
    "¡Pío, pío! ¿Sabías que el T-Rex no podía aplaudir en tus clases? Yo sí puedo con mi gran corazón.",
    "Maestra Samara, el meteorito se llevó a los dinosaurios, pero tu paciencia sobrevivió.",
    "¡Coc-cooc! ¿Qué hace un pollito en el Cretácico? Buscar la mejor clase de Monterrey.",
    "¡Pío! Si soy el ancestro de los dinosaurios, ¿me perdonas la tarea de hoy?",
    "¡Estudiar Formación Cívica me hace sentir un pollo muy civilizado y prehistórico!",
    "¡Cuidado con el meteorito! Ah, no, es solo otra ráfaga de tu viento regio. ¡Pío!",
    "¡Pío! Del Jurásico al salón de clases, tú eres la maestra más genial.",
    "¡Pío! Un tiranosaurio se comió mi tarea... pero me dio flojera correr.",
    "¡Coc-cooc! ¿Sabías que mis plumas son para verte mejor, Samara?",
    "¡Pío! Si repruebo, ¿cuenta como extinción masiva? ☄️",
    "¡Coc-cooc! En el Cretácico no había aire acondicionado, ¡como en Monterrey cuando falla la luz! 🥵",
    "¡Pío! Un aplauso para la maestra que educa con amor y no con rugidos.",
    "Dicen que el Velociraptor era rápido, pero no tanto como tú borrando el pizarrón.",
    "¡Pío! ¿Sabías que los pollos soñamos con volar? Y tus clases nos dan alas. ✨",
    "¡A bailar Thriller bajo la lluvia de meteoritos! ¡Coooc!",
    "Maestra Samara, mi cariño por ti es más duradero que un insecto en ámbar.",
    "¡Pío! Si un dinosaurio te molesta, ¡le daré un picotazo prehistórico!",
    "¡Coc-cooc! ¿Me das un punto extra por evolución?",
    "Si los dinosaurios hubieran tenido una maestra como tú, habrían hecho la tarea y no se habrían extinguido."
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

    // Escuchar el final de la animación de salto para reanudar la caminata
    polloSticker.addEventListener('animationend', (e) => {
      if (e.animationName === 'polloHopClick') {
        polloSticker.classList.remove('hop');
      }
    });
  }
}
