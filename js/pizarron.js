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
    "¡Pío! Maestra, aunque caigan meteoritos y parezca que el cielo se está cayendo, estar en tu clase es mi lugar seguro.",
    "¡Coc-cooc! ¿Será que el cielo del Cretácico se cae hoy? No importa, si estás tú, seguro todo saldrá bien.",
    "¡Pío! Soy un pollito pequeño con lentes invisibles y una bellota en la cabeza, pero mi cariño por ti es gigante.",
    "¡Coc-cooc! Si el cielo se cae hoy, le diremos a todos que es por el impacto de tu belleza.",
    "¡Pío! Sobrevivir al meteorito es fácil comparado con lo rápido que late mi corazón cuando me sonríes.",
    "¡Pío! A veces siento que el cielo se viene abajo con tantas tareas, pero tu sola presencia nos salva a todos.",
    "¡Coc-cooc! ¿Una bellota me cayó en la cabeza? No, es solo el recuerdo de lo hermosa que eres.",
    "¡Pío! Soy el pariente lejano del T-Rex, pero en versión Chicken Little. ¡Listo para defender tu clase!",
    "Maestra Samara, el mundo prehistórico puede colapsar, pero este pollito siempre estará de tu lado.",
    "¡Pío! Si el cielo se cae, ¡que nos agarre bailando Thriller!",
    "¡Coc-cooc! Mis plumas tiemblan si el cielo amenaza con caer, pero me calmo al ver tus ojos hermosos."
  ];

  const perroPhrases = [
    "¡Te amo, mi dueña hermosa! Sé cuánto te desvelas preparando tus clases, y tu disciplina me llena de orgullo.",
    "¡Te amo! Mira cómo muevo mis caderas de lado a lado cuando te veo llegar. ¡Nadie menea el waddle como yo!",
    "¡Te amo! Del Cretácico a tu lado, soy la salchicha que vigila tus desveladas por estudiar lo que tanto amas.",
    "¡Te amo, Samara! Tu compromiso con tu carrera es gigante; eres la maestra y la dueña más increíble.",
    "¡Te amo! Adoro verte concentrada estudiando; tu esfuerzo y pasión te hacen ver aún más hermosa.",
    "¡Te amo! Aunque pasemos mil eras separados por la distancia, mis patitas cortas siempre correrán a tus brazos.",
    "¡Te amo! Mira mis caderas moverse con ritmo chistoso y feliz, ¡solo para sacarte una sonrisa en tus días pesados!",
    "¡Te amo! Tu disciplina inspira a todo el Cretácico, pero a mí me basta con ver tu carita al final del día.",
    "¡Te amo! Eres mi humana favorita y la más hermosa del universo. Gracias por cuidar de mí con tanto amor.",
    "¡Te amo! Mi cuerpo es largo para poder abrazarte más, y mi colita no para de wiguear de felicidad por ti."
  ];

  const pezPhrases = [
    "Glup. El océano Cretácico es inmenso y profundo, pero no tanto como tus nalgas. ¡Esas sí que son colosales y hermosas!",
    "Glup. Nado en los mares del sur, pero me pierdo por completo en el movimiento de tus espectaculares curvas.",
    "Glup. Con esas curvas tan grandes y hermosas, ¡cualquier mosasaurus se quedaría sin respiración!",
    "Glup. Tu paciencia en clase será corta, maestra, ¡pero tus nalgas sí que son un monumento gigante!",
    "Glup. Dicen que el mar es agitado, pero nada se compara con el oleaje y la belleza de tus caderas.",
    "Glup. Nado contra la corriente solo para admirar la silueta de mi dueña favorita.",
    "Glup. El mar tiene profundidades misteriosas, pero tus curvas son el verdadero tesoro de Monterrey.",
    "Glup. ¿Mosasaurus? No, la verdadera reina con las curvas más grandes y deseadas del Cretácico eres tú.",
    "Glup. Nado feliz sabiendo que tengo a la dueña con las curvas más perfectas y hermosas del mundo.",
    "Glup. Si el agua está tibia es por el calor que desprendes al caminar con ese vaivén tan sexy.",
    "Glup. Si un dinosaurio terrestre te molesta, le salpicaré agua con mi colita."
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

  // JS movement coordinates and state
  let posX = 24;
  let posY = window.innerHeight - 120;
  let targetX = posX;
  let targetY = posY;
  let mascotState = 'idle'; // 'idle', 'walking'
  let pauseTimer = 120;
  let waddleTime = 0;

  function triggerHopAndPhrase() {
    if (polloSticker.classList.contains('hop')) return;
    polloSticker.classList.add('hop');

    // Seleccionar frases segun mascota activa
    let phrases = polloPhrases;
    if (activeMascot === 'perro') phrases = perroPhrases;
    else if (activeMascot === 'pez') phrases = pezPhrases;

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

  function updateMascotLoop() {
    if (isDragging) {
      const rect = polloSticker.getBoundingClientRect();
      posX = rect.left;
      posY = rect.top;
      targetX = posX;
      targetY = posY;
      requestAnimationFrame(updateMascotLoop);
      return;
    }

    if (polloSticker.classList.contains('hop')) {
      requestAnimationFrame(updateMascotLoop);
      return;
    }

    const margin = 50;
    const w = window.innerWidth;
    const h = window.innerHeight;

    if (mascotState === 'idle') {
      pauseTimer--;
      if (pauseTimer <= 0) {
        // Pick random target in any direction within screen safe boundaries
        targetX = Math.random() * (w - 2 * margin) + margin;
        targetY = Math.random() * (h - 220) + 120;
        mascotState = 'walking';
      }

      // Gentle breathing scaling when idle
      waddleTime += 0.05;
      const breathe = 1 + Math.sin(waddleTime) * 0.03;
      if (mascotImg) {
        mascotImg.style.transform = `scale(${breathe})`;
      }
    } else if (mascotState === 'walking') {
      const dx = targetX - posX;
      const dy = targetY - posY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 5) {
        mascotState = 'idle';
        pauseTimer = Math.random() * 180 + 120; // 2-5 seconds
        
        // 10% chance to speak on arrival
        if (Math.random() < 0.1) {
          triggerHopAndPhrase();
        }
      } else {
        // Slow gentle speed (0.7px per frame)
        const speed = 0.7;
        const vx = (dx / dist) * speed;
        const vy = (dy / dist) * speed;

        posX += vx;
        posY += vy;

        polloSticker.style.left = posX + 'px';
        polloSticker.style.top = posY + 'px';

        // Waddling oscillation (rotation of ±6 degrees, very slow and gentle)
        waddleTime += 0.06;
        const waddleAngle = Math.sin(waddleTime) * 6;
        // Flip image based on direction
        const flip = vx > 0 ? 1 : -1;

        if (mascotImg) {
          mascotImg.style.transform = `scaleX(${flip}) rotate(${waddleAngle}deg)`;
        }
      }
    }

    requestAnimationFrame(updateMascotLoop);
  }

  if (polloSticker && polloBubble) {
    // Escuchar el final de la animacion de salto para poder volver a saltar
    polloSticker.addEventListener('animationend', (e) => {
      if (e.animationName === 'polloHopClick') {
        polloSticker.classList.remove('hop');
      }
    });

    // Hamburger menu toggle for mascot selector
    const hamburgerBtn = document.getElementById('mascotHamburger');
    const selectorPanel = document.getElementById('mascotSelector');
    if (hamburgerBtn && selectorPanel) {
      hamburgerBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        hamburgerBtn.classList.toggle('open');
        selectorPanel.classList.toggle('open');
      });
      // Close selector on outside click
      document.addEventListener('click', (e) => {
        const wrapper = document.getElementById('mascotSelectorWrapper');
        if (wrapper && !wrapper.contains(e.target)) {
          hamburgerBtn.classList.remove('open');
          selectorPanel.classList.remove('open');
        }
      });
    }

    // Cambiar mascota activa con botones del selector
    if (mascotButtons) {
      mascotButtons.forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation(); // Evitar que el clic en el boton active la mascota
          
          if (isDragging) return;
          
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
            else if (mascot === 'pez') mascotImg.src = 'images/pez_mascota.svg';
          }
          
          // Pequeño efecto visual de cambio (escala)
          if (mascotImg) {
            mascotImg.style.transform = 'scale(0.3)';
            setTimeout(() => {
              mascotImg.style.transform = 'scale(1)';
            }, 150);
          }
          
          // Frase de presentación del nuevo compañero
          let introText = "Listo para aprender.";
          if (mascot === 'pollo') introText = "Listo para aprender.";
          else if (mascot === 'perro') introText = "Guau. Listo para jugar.";
          else if (mascot === 'pez') introText = "Glup. Listo para nadar.";
          
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
        // Dropped after dragging - stay where dropped!
        polloSticker.classList.remove('dragging');
        mascotState = 'idle';
        pauseTimer = 90; // pause for 1.5 seconds before walking

        // Burst of premium sparkles on drop
        const rect = polloSticker.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        for (let i = 0; i < 8; i++) {
          createSparkle(centerX, centerY);
        }
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
        polloSticker.classList.remove('dragging');
        mascotState = 'idle';
        pauseTimer = 60;
      }
      isDragging = false;
    }

    polloSticker.addEventListener('pointerdown', (e) => {
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

    // Initialize position and start waddle loop
    polloSticker.style.animation = 'none';
    if (mascotImg) mascotImg.style.animation = 'none';

    // Set starting position at bottom left
    posX = 24;
    posY = window.innerHeight - 120;
    targetX = posX;
    targetY = posY;
    polloSticker.style.left = posX + 'px';
    polloSticker.style.top = posY + 'px';

    // Start movement loop
    requestAnimationFrame(updateMascotLoop);
  }
}
