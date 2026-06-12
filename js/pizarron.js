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
      if (canvas && ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
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

  // Chalk Drawing Canvas Implementation
  const canvas = document.getElementById('chalkCanvas');
  let ctx = null;
  if (canvas) {
    ctx = canvas.getContext('2d');
    
    // Dynamic resizing to match visual bounds
    function resizeCanvas() {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    let drawing = false;
    let lastX = 0;
    let lastY = 0;
    
    function getCoords(e) {
      const rect = canvas.getBoundingClientRect();
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    }
    
    function startDrawing(e) {
      drawing = true;
      const coords = getCoords(e);
      lastX = coords.x;
      lastY = coords.y;
    }
    
    function draw(e) {
      if (!drawing) return;
      const coords = getCoords(e);
      
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(coords.x, coords.y);
      
      ctx.strokeStyle = activeColor;
      ctx.lineWidth = 3.5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.globalAlpha = 0.85;
      ctx.shadowBlur = 1;
      ctx.shadowColor = activeColor;
      
      ctx.stroke();
      
      lastX = coords.x;
      lastY = coords.y;
    }
    
    function stopDrawing() {
      drawing = false;
    }
    
    canvas.addEventListener('pointerdown', startDrawing);
    canvas.addEventListener('pointermove', draw);
    canvas.addEventListener('pointerup', stopDrawing);
    canvas.addEventListener('pointercancel', stopDrawing);
  }

  // Mascot click/drag interaction
  const polloSticker = document.getElementById('polloSticker');
  const polloBubble = document.getElementById('polloBubble');
  const mascotImg = document.getElementById('mascotImg');
  const mascotButtons = document.querySelectorAll('.mascot-sel-btn');

  let activeMascot = 'pollo'; // 'pollo', 'perro', 'mosa'
  
  const polloPhrases = [
    "¡Coc-coooc! Las milanesas son parientes del T-Rex. ¡Respeta a tus mayores!",
    "¡Hola Samara! ¿Hoy habrá examen sorpresa?",
    "¡Pío! Michael Jackson inventó el moonwalk, pero yo inventé el egg-walk.",
    "¡Cruzo la calle para ir a tu clase!",
    "Maestra, ¿me pone 10 en conducta? Soy un buen pollito ancestral.",
    "¡El Cretácico rules! ✦",
    "¡Pío, pío! ¿Sabías que el T-Rex no podía aplaudir en tus clases? Yo sí puedo con mi gran corazón.",
    "Maestra Samara, el meteorito se llevó a los dinosaurios, pero tu paciencia sobrevivió.",
    "¡Coc-cooc! ¿Qué hace un pollito en el Cretácico? Buscar la mejor clase de Monterrey.",
    "¡Pío! Si soy el ancestro de los dinosaurios, ¿me perdonas la tarea de hoy?",
    "¡Estudiar Formación Cívica me hace sentir un pollo muy civilizado y prehistórico!",
    "¡Cuidado con el meteorito! Ah, no, es solo otra ráfaga de tu viento regio. ¡Pío!",
    "¡Pío! Del Jurásico al salón de clases, tú eres la maestra más genial.",
    "¡Pío! Un tiranosaurio se comió mi tarea... pero me dio flojera correr.",
    "¡Coc-cooc! ¿Sabías que mis plumas son para verte mejor, Samara?",
    "¡Pío! Si repruebo, ¿cuenta como extinción masiva?",
    "¡Coc-cooc! En el Cretácico no había aire acondicionado, ¡como en Monterrey cuando falla la luz!",
    "¡Pío! Un aplauso para la maestra que educa con amor y no con rugidos.",
    "Dicen que el Velociraptor era rápido, pero no tanto como tú borrando el pizarrón.",
    "¡Pío! ¿Sabías que los pollos soñamos con volar? Y tus clases nos dan alas.",
    "¡A bailar Thriller bajo la lluvia de meteoritos! ¡Coooc!",
    "Maestra Samara, mi cariño por ti es más duradero que un insecto en ámbar.",
    "¡Pío! Si un dinosaurio te molesta, ¡le daré un picotazo prehistórico!",
    "¡Coc-cooc! ¿Me das un punto extra por evolución?",
    "Si los dinosaurios hubieran tenido una maestra como tú, habrían hecho la tarea y no se habrían extinguido."
  ];

  const perroPhrases = [
    "Guau. Soy largo, negro y muy educado. ¿Me das un premio por hacer la tarea?",
    "Maestra Samara, mi cariño por ti es mas largo que mi propio cuerpo.",
    "Guau. Un perro salchicha en el Cretacico... espero no encontrarme un dinosaurio con hambre.",
    "Soy un salchicha espacial. Vengo a vigilar que nadie copie en el examen.",
    "Guau. Si me estiro un poco mas, puedo borrar la parte alta del pizarron por ti.",
    "Dicen que los perros salchicha somos tercos, pero yo solo soy terco en quererte.",
    "Guau. ¿Hoy habra clase de educacion fisica? Estoy listo para correr con mis patitas cortas.",
    "Maestra, ¿me das permiso de salir a perseguir velociraptores?",
    "Guau. Del Jurasico a Monterrey, sigo siendo tu perrito favorito.",
    "Tengo el cuerpo largo y el corazon grande, especialmente para tus clases.",
    "Guau. Si un dinosaurio te da lata, le ladro hasta que se extinga de nuevo."
  ];

  const mosaPhrases = [
    "Glup. El oceano Tethys es grande, pero no tanto como tu paciencia en el aula.",
    "Glup. ¿Sabias que los mosasaurus no somos dinosaurios? Somos lagartos marinos super listos.",
    "Maestra Samara, nado desde el Cretacico solo para escuchar tus explicaciones.",
    "Glup. Si el salon se inunda de tareas, yo te ayudo a nadar a salvo.",
    "Un mosasaurus gigante con un corazon blando por su maestra favorita.",
    "Glup. ¿Puedo hacer el examen bajo el agua?",
    "Navegue a traves del impacto del meteorito para traerte esta carta.",
    "Glup. Mi amor por tus clases tiene profundidad oceanica.",
    "Nadar en el Cretacico era divertido, pero estar en tu clase en Monterrey es mucho mejor.",
    "Glup. Si un dinosaurio terrestre se mete contigo, lo jalo al fondo del mar de un aletazo."
  ];

  let bubbleTimeout = null;
  let isDragging = false;
  let isReturning = false;
  let startX = 0;
  let startY = 0;
  let initialX = 0;
  let initialY = 0;
  let startTime = 0;
  const dragThreshold = 8; // píxeles de movimiento mínimo para ser arrastre

  function triggerHopAndPhrase() {
    if (polloSticker.classList.contains('hop')) return;
    polloSticker.classList.add('hop');

    // Seleccionar frases segun mascota activa
    let phrases = polloPhrases;
    if (activeMascot === 'perro') phrases = perroPhrases;
    else if (activeMascot === 'mosa') phrases = mosaPhrases;

    const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
    polloBubble.textContent = randomPhrase;

    // Show bubble
    polloBubble.classList.add('open');

    // Clear previous timeout
    if (bubbleTimeout) clearTimeout(bubbleTimeout);

    // Auto-hide bubble after 4 seconds
    bubbleTimeout = setTimeout(() => {
      polloBubble.classList.remove('open');
    }, 4000);
  }

  function startReturnAnimation() {
    isReturning = true;
    polloSticker.classList.remove('dragging');
    polloSticker.classList.add('returning');

    // La coordenada de retorno es la posicion fixed por defecto del pollito (bottom: 1.5rem, left: 1.5rem)
    const isMobile = window.innerWidth <= 500;
    const chickSize = isMobile ? 60 : 75;
    const margin = isMobile ? 12 : 24; // Margen adaptativo

    const targetLeft = margin;
    const targetTop = window.innerHeight - chickSize - margin;

    polloSticker.style.left = targetLeft + 'px';
    polloSticker.style.top = targetTop + 'px';

    // Sparkle trail during return glide
    const sparkleInterval = setInterval(() => {
      if (!isReturning) {
        clearInterval(sparkleInterval);
        return;
      }
      const rect = polloSticker.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      createSparkle(centerX, centerY);
    }, 30);

    // Una vez que termine el planeo (800ms de transicion), reanudamos la caminata
    setTimeout(() => {
      clearInterval(sparkleInterval);
      if (polloSticker.classList.contains('returning')) {
        polloSticker.classList.remove('returning');
      }
      
      // Limpiamos coordenadas manuales y restauramos el fixed de CSS por defecto
      polloSticker.style.left = '';
      polloSticker.style.top = '';
      polloSticker.style.bottom = '';
      polloSticker.style.right = '';

      isReturning = false;

      // Mostrar frase de aterrizaje divertido segun la mascota activa
      let landingText = "¡Aterrizaje perfecto!";
      if (activeMascot === 'perro') landingText = "¡Llegué de un salto!";
      else if (activeMascot === 'mosa') landingText = "¡Chapuzón completado!";
      
      polloBubble.textContent = landingText;
      polloBubble.classList.add('open');
      
      if (bubbleTimeout) clearTimeout(bubbleTimeout);
      bubbleTimeout = setTimeout(() => {
        polloBubble.classList.remove('open');
      }, 3000);

    }, 800);
  }

  if (polloSticker && polloBubble) {
    // Escuchar el final de la animacion de salto para poder volver a saltar
    polloSticker.addEventListener('animationend', (e) => {
      if (e.animationName === 'polloHopClick') {
        polloSticker.classList.remove('hop');
      }
    });

    // Cambiar mascota activa con botones del selector
    if (mascotButtons) {
      mascotButtons.forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation(); // Evitar que el clic en el boton active la mascota
          
          if (isReturning || isDragging) return;
          
          const mascot = btn.getAttribute('data-mascot');
          if (activeMascot === mascot) return;
          
          activeMascot = mascot;
          
          // Actualizar boton activo
          mascotButtons.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          
          // Cambiar imagen
          if (mascotImg) {
            if (mascot === 'pollo') mascotImg.src = 'images/pollo_sticker.svg';
            else if (mascot === 'perro') mascotImg.src = 'images/perro_salchicha.svg';
            else if (mascot === 'mosa') mascotImg.src = 'images/mosa_mascota.svg';
          }
          
          // Pequeño efecto visual de cambio (escala)
          polloSticker.style.transform = 'scale(0.3)';
          setTimeout(() => {
            polloSticker.style.transform = '';
          }, 150);
          
          // Frase de presentacion del nuevo compañero
          let introText = "Listo para aprender.";
          if (mascot === 'pollo') introText = "Listo para aprender.";
          else if (mascot === 'perro') introText = "Guau. Listo para jugar.";
          else if (mascot === 'mosa') introText = "Glup. Listo para nadar.";
          
          polloBubble.textContent = introText;
          polloBubble.classList.add('open');
          
          if (bubbleTimeout) clearTimeout(bubbleTimeout);
          bubbleTimeout = setTimeout(() => {
            polloBubble.classList.remove('open');
          }, 3000);
        });
      });
    }

    // Sparkle generator helper
    function createSparkle(x, y) {
      const sparkle = document.createElement('div');
      sparkle.className = 'mascot-sparkle';
      
      const colors = ['#FFF', '#FFD700', '#F2C4CE', '#B8D4EE', '#E8C98A'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      const size = Math.random() * 8 + 6;
      
      sparkle.style.backgroundColor = color;
      sparkle.style.width = `${size}px`;
      sparkle.style.height = `${size}px`;
      sparkle.style.left = `${x}px`;
      sparkle.style.top = `${y}px`;
      sparkle.style.boxShadow = `0 0 8px ${color}`;
      
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 25 + 10;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;
      
      sparkle.style.setProperty('--tx', `${tx}px`);
      sparkle.style.setProperty('--ty', `${ty}px`);
      
      document.body.appendChild(sparkle);
      
      setTimeout(() => {
        sparkle.remove();
      }, 600);
    }

    // Robust Touch and Pointer Drag-and-Drop Implementation
    let activePointerId = null;

    // Prevent default scrolling on mobile touch when dragging mascot
    polloSticker.addEventListener('touchstart', (e) => {
      e.preventDefault();
    }, { passive: false });

    function onPointerMove(e) {
      if (activePointerId !== e.pointerId) return;

      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      // Check movement threshold
      if (!isDragging && (Math.abs(dx) > dragThreshold || Math.abs(dy) > dragThreshold)) {
        isDragging = true;
        
        // Lock position in absolute fixed pixels
        const rect = polloSticker.getBoundingClientRect();
        polloSticker.style.left = rect.left + 'px';
        polloSticker.style.top = rect.top + 'px';
        polloSticker.style.bottom = 'auto';

        polloSticker.classList.add('dragging');
        polloBubble.classList.remove('open');
      }

      if (isDragging) {
        polloSticker.style.left = (initialX + dx) + 'px';
        polloSticker.style.top = (initialY + dy) + 'px';
        
        // Spawn drag sparkles
        const rect = polloSticker.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        createSparkle(centerX, centerY);
      }
    }

    function onPointerUp(e) {
      if (activePointerId !== e.pointerId) return;
      activePointerId = null;

      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerCancel);

      const duration = Date.now() - startTime;

      if (!isDragging) {
        // Fast click or tap
        if (duration < 350) {
          triggerHopAndPhrase();
        }
      } else {
        // Dropped after dragging
        startReturnAnimation();
      }

      isDragging = false;
    }

    function onPointerCancel(e) {
      if (activePointerId !== e.pointerId) return;
      activePointerId = null;

      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerCancel);

      if (isDragging) {
        startReturnAnimation();
      }
      isDragging = false;
    }

    polloSticker.addEventListener('pointerdown', (e) => {
      if (isReturning) return;
      e.stopPropagation();

      activePointerId = e.pointerId;
      isDragging = false;
      startTime = Date.now();

      const rect = polloSticker.getBoundingClientRect();
      initialX = rect.left;
      initialY = rect.top;

      startX = e.clientX;
      startY = e.clientY;

      window.addEventListener('pointermove', onPointerMove);
      window.addEventListener('pointerup', onPointerUp);
      window.addEventListener('pointercancel', onPointerCancel);
    });
  }
}
