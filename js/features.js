/* ═══════════════════════════════════════════════════════════════
   features.js — Modulo de funcionalidades interactivas
   Carta para Samara
   ═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ─── PALETTE CONSTANTS ─────────────────────────────────── */
  var GUINDA  = '#7B1D3A';
  var ROSA    = '#F2C4CE';
  var CREMA   = '#FDF0E8';
  var DORADO  = '#E8C98A';
  var LAVANDA = '#E8D5F5';

  /* ─── UTILITY: reduced-motion preference ────────────────── */
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ─── UTILITY: inject a <style> block once ──────────────── */
  var _injectedStyles = false;
  function injectFeatureStyles() {
    if (_injectedStyles) return;
    _injectedStyles = true;

    var css = `
      /* ══════ DAY/NIGHT TOGGLE BUTTON ══════ */
      #dayNightToggle {
        position: fixed;
        top: 16px;
        right: 16px;
        z-index: 990;
        width: 44px;
        height: 44px;
        border: 2px solid ${DORADO};
        border-radius: 50%;
        background: ${CREMA};
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.4s ease, border-color 0.4s ease, transform 0.2s ease;
        box-shadow: 0 2px 12px rgba(123,29,58,0.12);
      }
      #dayNightToggle:hover {
        transform: scale(1.1);
      }
      #dayNightToggle:active {
        transform: scale(0.95);
      }

      #dayNightToggle svg {
        width: 20px;
        height: 20px;
        stroke: ${DORADO};
        stroke-width: 2.2px;
        fill: none;
        transition: transform 0.4s ease, stroke 0.4s ease;
      }
      body.night-mode #dayNightToggle svg {
        stroke: #E8D5F5;
        transform: rotate(360deg);
      }

      /* Night mode body overrides */
      body.night-mode {
        background: #1a0e14;
        color: #e8d5d5;
      }
      body.night-mode #dayNightToggle {
        background: #2a1520;
        border-color: ${DORADO};
      }
      body.night-mode .hero {
        background: linear-gradient(180deg, #1a0e14 0%, #2d1225 100%);
      }
      body.night-mode .chapter,
      body.night-mode .book-section,
      body.night-mode .ojos-section,
      body.night-mode .rizos-section,
      body.night-mode .mosa-section,
      body.night-mode .maestra-section,
      body.night-mode .scrapbook-section,
      body.night-mode .quiz-section,
      body.night-mode .cierre {
        background: #1a0e14;
      }

      /* ══════ FIREFLY PARTICLES ══════ */
      .firefly-particle {
        position: fixed;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background: ${DORADO};
        pointer-events: none;
        z-index: 9990;
        opacity: 0;
        box-shadow: 0 0 6px 2px rgba(232,201,138,0.5), 0 0 12px 4px rgba(232,201,138,0.2);
      }

      @keyframes fireflyFloat {
        0%   { transform: translate(0, 0)        scale(1);   opacity: 0; }
        10%  { opacity: 0.9; }
        25%  { transform: translate(30px, -40px)  scale(1.2); opacity: 0.7; }
        50%  { transform: translate(-20px, -80px) scale(0.8); opacity: 1; }
        75%  { transform: translate(40px, -50px)  scale(1.1); opacity: 0.5; }
        90%  { opacity: 0.8; }
        100% { transform: translate(0, 0)         scale(1);   opacity: 0; }
      }

      /* ══════ ANIMATED SIGNATURE ══════ */
      #firmaAnimada path {
        transition: fill-opacity 0.6s ease 2.6s;
      }
      #firmaAnimada.animate path {
        animation: signatureStroke 2.5s ease forwards;
      }
      #firmaAnimada.animate.fill-in path {
        fill-opacity: 1;
      }

      @keyframes signatureStroke {
        to { stroke-dashoffset: 0; }
      }

      /* ══════ LIGHTBOX OVERLAY ══════ */
      #lightboxOverlay {
        position: fixed;
        inset: 0;
        z-index: 10000;
        background: rgba(26,14,20,0.92);
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.35s ease, visibility 0.35s ease;
        backdrop-filter: blur(6px);
        -webkit-backdrop-filter: blur(6px);
      }
      #lightboxOverlay.active {
        opacity: 1;
        visibility: visible;
      }
      #lightboxContent {
        max-width: 90vw;
        max-height: 80vh;
        position: relative;
        transform: scale(0.85);
        opacity: 0;
        transition: transform 0.4s cubic-bezier(0.22,1,0.36,1), opacity 0.35s ease;
      }
      #lightboxOverlay.active #lightboxContent {
        transform: scale(1);
        opacity: 1;
      }
      #lightboxContent img {
        max-width: 100%;
        max-height: 80vh;
        border-radius: 8px;
        box-shadow: 0 8px 40px rgba(0,0,0,0.4);
      }
      #lightboxContent .lightbox-caption {
        text-align: center;
        color: ${ROSA};
        font-family: 'Playfair Display', serif;
        font-size: 1rem;
        margin-top: 12px;
        font-style: italic;
      }
      #lightboxClose,
      #lightboxPrev,
      #lightboxNext {
        position: absolute;
        background: none;
        border: 2px solid rgba(232,201,138,0.4);
        color: ${DORADO};
        width: 44px;
        height: 44px;
        border-radius: 50%;
        font-size: 1.2rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
        font-family: 'Lato', sans-serif;
      }
      #lightboxClose:hover,
      #lightboxPrev:hover,
      #lightboxNext:hover {
        background: rgba(232,201,138,0.15);
        border-color: ${DORADO};
        transform: scale(1.1);
      }
      #lightboxClose {
        top: 20px;
        right: 20px;
        z-index: 10001;
      }
      #lightboxPrev {
        left: 20px;
        top: 50%;
        transform: translateY(-50%);
      }
      #lightboxNext {
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
      }
      #lightboxPrev:hover { transform: translateY(-50%) scale(1.1); }
      #lightboxNext:hover { transform: translateY(-50%) scale(1.1); }

      @media (max-width: 767px) {
        #lightboxPrev, #lightboxNext { display: none; }
      }

      /* ══════ TIMELINE SCROLL DOTS ══════ */
      .timeline-dots {
        display: flex;
        justify-content: center;
        gap: 8px;
        padding: 16px 0 8px;
      }
      .timeline-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: ${ROSA};
        border: none;
        cursor: pointer;
        transition: background 0.3s ease, transform 0.3s ease;
        padding: 0;
      }
      .timeline-dot.active {
        background: ${GUINDA};
        transform: scale(1.4);
      }

      @keyframes scrollHintBounce {
        0%, 100% { transform: translateX(0); }
        50%      { transform: translateX(-12px); }
      }
      .timeline-scroll-hint {
        text-align: center;
        color: ${GUINDA};
        font-family: 'Lato', sans-serif;
        font-size: 0.8rem;
        letter-spacing: 0.05em;
        opacity: 0.7;
        animation: scrollHintBounce 1.5s ease-in-out 3;
        padding-bottom: 8px;
      }

      /* ══════ DAYS COUNTER ══════ */
      #contadorDias {
        display: flex;
        justify-content: center;
        gap: clamp(12px, 3vw, 32px);
        flex-wrap: wrap;
      }
      .counter-unit {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
      }
      .counter-num {
        font-family: 'Playfair Display', serif;
        font-size: clamp(1.8rem, 5vw, 3rem);
        font-weight: 700;
        color: ${GUINDA};
        transition: transform 0.15s ease;
        min-width: 2.5ch;
        text-align: center;
      }
      .counter-num.pulse {
        transform: scale(1.15);
      }
      .counter-label {
        font-family: 'Lato', sans-serif;
        font-size: 0.75rem;
        text-transform: uppercase;
        letter-spacing: 0.12em;
        color: ${DORADO};
      }
      body.night-mode .counter-num { color: ${ROSA}; }

      /* ══════ CUSTOM CURSOR ══════ */
      body.custom-cursor-active { cursor: none !important; }
      body.custom-cursor-active a,
      body.custom-cursor-active button,
      body.custom-cursor-active [role="button"],
      body.custom-cursor-active input { cursor: none !important; }

      #customCursor {
        position: fixed;
        top: 0;
        left: 0;
        width: 28px;
        height: 28px;
        pointer-events: none;
        z-index: 99999;
        transform: translate(-50%, -50%);
        transition: transform 0.08s ease-out;
      }
      #customCursor.click {
        transform: translate(-50%, -50%) scale(1.5);
      }

      /* Chicken footprint via CSS */
      #customCursor::before {
        content: '';
        position: absolute;
        width: 6px;
        height: 14px;
        background: ${GUINDA};
        border-radius: 3px;
        top: 6px;
        left: 50%;
        transform: translateX(-50%);
      }
      #customCursor::after {
        content: '';
        position: absolute;
        width: 18px;
        height: 6px;
        bottom: 2px;
        left: 50%;
        transform: translateX(-50%);
        background:
          radial-ellipse farthest-corner at 0%  50%, ${GUINDA} 0%, ${GUINDA} 45%, transparent 46%,
          radial-ellipse farthest-corner at 50% 50%, ${GUINDA} 0%, ${GUINDA} 45%, transparent 46%,
          radial-ellipse farthest-corner at 100% 50%, ${GUINDA} 0%, ${GUINDA} 45%, transparent 46%;
        background-size: 6px 6px;
        background-repeat: no-repeat;
        background-position: 0 0, 50% 0, 100% 0;
      }

      /* Toe marks using box-shadow approach */
      .cursor-toe {
        position: absolute;
        width: 5px;
        height: 10px;
        background: ${GUINDA};
        border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
      }
      .cursor-toe:nth-child(1) { top: 0; left: 3px;  transform: rotate(-30deg); }
      .cursor-toe:nth-child(2) { top: -2px; left: 50%; transform: translateX(-50%); }
      .cursor-toe:nth-child(3) { top: 0; right: 3px; transform: rotate(30deg); }
      .cursor-palm {
        position: absolute;
        width: 8px;
        height: 10px;
        background: ${GUINDA};
        border-radius: 40%;
        bottom: 2px;
        left: 50%;
        transform: translateX(-50%);
      }

      .cursor-trail-dot {
        position: fixed;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background: ${DORADO};
        pointer-events: none;
        z-index: 99998;
        opacity: 0.7;
        transition: opacity 0.4s ease;
      }
      .cursor-trail-dot.fade {
        opacity: 0;
      }

      /* ══════ KARAOKE PANEL ══════ */
      #karaokePanel {
        padding: 8px 12px;
        border-top: 1px solid rgba(232,201,138,0.2);
        min-height: 36px;
      }
      #karaokeLine {
        font-family: 'Caveat', cursive;
        font-size: 1rem;
        color: ${DORADO};
        white-space: nowrap;
        overflow: hidden;
        text-align: center;
        line-height: 1.4;
      }
      #karaokeLine.typing {
        border-right: 2px solid ${DORADO};
        animation: karaokeBlink 0.6s step-end infinite;
      }

      @keyframes karaokeBlink {
        50% { border-color: transparent; }
      }
    `;

    var style = document.createElement('style');
    style.setAttribute('data-features', 'true');
    style.textContent = css;
    document.head.appendChild(style);
  }


  /* ═══════════════════════════════════════════════════════════
     1. PARALLAX HERO
     ═══════════════════════════════════════════════════════════ */
  function initParallaxHero() {
    if (prefersReducedMotion.matches) return;

    var hero = document.querySelector('.hero');
    if (!hero) return;

    var elements = hero.querySelectorAll('[data-parallax-speed]');
    if (!elements.length) return;

    var isMobile = window.innerWidth < 768;
    var ticking = false;

    window.addEventListener('resize', function () {
      isMobile = window.innerWidth < 768;
    });

    function updateParallax() {
      var scrollY = window.pageYOffset || document.documentElement.scrollTop;
      elements.forEach(function (el) {
        var speed = parseFloat(el.getAttribute('data-parallax-speed')) || 0;
        if (isMobile) speed *= 0.5;
        el.style.transform = 'translateY(' + (scrollY * speed) + 'px)';
      });
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }, { passive: true });

    /* React to prefers-reduced-motion changes */
    prefersReducedMotion.addEventListener('change', function (e) {
      if (e.matches) {
        elements.forEach(function (el) { el.style.transform = ''; });
      }
    });
  }


  /* ═══════════════════════════════════════════════════════════
     2. DAY / NIGHT MODE
     ═══════════════════════════════════════════════════════════ */
  var fireflies = [];

  function createSunIcon() {
    return '<i data-lucide="sun"></i>';
  }

  function createMoonIcon() {
    return '<i data-lucide="moon"></i>';
  }

  function spawnFireflies() {
    removeFireflies();
    var count = 15 + Math.floor(Math.random() * 6); // 15-20
    for (var i = 0; i < count; i++) {
      var el = document.createElement('div');
      el.className = 'firefly';
      el.style.left = Math.random() * 100 + 'vw';
      el.style.top  = Math.random() * 100 + 'vh';
      var duration = (3 + Math.random() * 4).toFixed(1);
      var delay    = (Math.random() * 5).toFixed(1);
      el.style.animation = 'fireflyFloat ' + duration + 's ease-in-out ' + delay + 's infinite';
      document.body.appendChild(el);
      fireflies.push(el);
    }
  }

  function removeFireflies() {
    fireflies.forEach(function (el) {
      if (el.parentNode) el.parentNode.removeChild(el);
    });
    fireflies = [];
  }

  function initDayNightMode() {
    var toggle = document.getElementById('dayNightToggle');
    if (!toggle) return;

    var isNight = localStorage.getItem('cartaSamara_nightMode') === 'true';

    function applyMode(night) {
      if (night) {
        document.body.classList.add('night-mode');
        toggle.innerHTML = createSunIcon();
        toggle.setAttribute('title', 'Cambiar a modo dia');
        toggle.setAttribute('aria-label', 'Cambiar a modo dia');
        spawnFireflies();
      } else {
        document.body.classList.remove('night-mode');
        toggle.innerHTML = createMoonIcon();
        toggle.setAttribute('title', 'Cambiar a modo noche');
        toggle.setAttribute('aria-label', 'Cambiar a modo noche');
        removeFireflies();
      }
      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }
    }

    applyMode(isNight);

    toggle.addEventListener('click', function () {
      isNight = !isNight;
      localStorage.setItem('cartaSamara_nightMode', String(isNight));
      applyMode(isNight);
    });
  }


  /* ═══════════════════════════════════════════════════════════
     3. ANIMATED SIGNATURE
     ═══════════════════════════════════════════════════════════ */
  function initAnimatedSignature() {
    var svg = document.getElementById('firmaAnimada');
    if (!svg) return;

    var paths = svg.querySelectorAll('path');
    if (!paths.length) return;

    /* Prepare each path: set dasharray/dashoffset, hide fill */
    paths.forEach(function (path) {
      var length = path.getTotalLength();
      path.style.strokeDasharray  = length;
      path.style.strokeDashoffset = length;
      path.style.fillOpacity      = '0';
    });

    var animated = false;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !animated) {
          animated = true;
          svg.classList.add('animate');

          /* Fade fill in after stroke completes */
          setTimeout(function () {
            svg.classList.add('fill-in');
          }, 2600);

          observer.unobserve(svg);
        }
      });
    }, { threshold: 0.3 });

    observer.observe(svg);
  }


  /* ═══════════════════════════════════════════════════════════
     4. LIGHTBOX GALLERY
     ═══════════════════════════════════════════════════════════ */
  function initLightboxGallery() {
    var overlay = document.getElementById('lightboxOverlay');
    var content = document.getElementById('lightboxContent');
    var closeBtn = document.getElementById('lightboxClose');
    var prevBtn  = document.getElementById('lightboxPrev');
    var nextBtn  = document.getElementById('lightboxNext');

    if (!overlay || !content) return;

    var cards = Array.from(document.querySelectorAll('.polaroid-card'));
    if (!cards.length) return;

    var currentIndex = 0;
    var touchStartX = 0;
    var touchEndX   = 0;

    function getImageFromCard(card) {
      /* Try background-image on .polaroid-img-placeholder, then <img> */
      var placeholder = card.querySelector('.polaroid-img-placeholder');
      if (placeholder) {
        var bg = getComputedStyle(placeholder).backgroundImage;
        if (bg && bg !== 'none') {
          return bg.replace(/^url\(['"]?/, '').replace(/['"]?\)$/, '');
        }
      }
      var img = card.querySelector('img');
      return img ? img.src : '';
    }

    function getCaptionFromCard(card) {
      var cap = card.querySelector('.polaroid-caption');
      return cap ? cap.textContent : '';
    }

    function showImage(index) {
      if (index < 0) index = cards.length - 1;
      if (index >= cards.length) index = 0;
      currentIndex = index;

      var src = getImageFromCard(cards[index]);
      var caption = getCaptionFromCard(cards[index]);

      content.innerHTML = '';
      if (src) {
        var img = document.createElement('img');
        img.src = src;
        img.alt = caption || 'Fotografia ampliada';
        content.appendChild(img);
      }
      if (caption) {
        var cap = document.createElement('div');
        cap.className = 'lightbox-caption';
        cap.textContent = caption;
        content.appendChild(cap);
      }
    }

    function openLightbox(index) {
      showImage(index);
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }

    /* Attach click to each polaroid for flipping, and zoom button for lightbox */
    cards.forEach(function (card, i) {
      card.style.cursor = 'pointer';
      
      card.addEventListener('click', function (e) {
        card.classList.toggle('flipped');
      });
      
      var zoomBtn = card.querySelector('.polaroid-zoom-btn');
      if (zoomBtn) {
        zoomBtn.addEventListener('click', function (e) {
          e.stopPropagation(); // prevent flipping the card
          openLightbox(i);
        });
      }
    });

    /* Navigation */
    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (prevBtn) prevBtn.addEventListener('click', function () { showImage(currentIndex - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { showImage(currentIndex + 1); });

    /* Close on overlay click (outside image) */
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeLightbox();
    });

    /* ESC key */
    document.addEventListener('keydown', function (e) {
      if (!overlay.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft')  showImage(currentIndex - 1);
      if (e.key === 'ArrowRight') showImage(currentIndex + 1);
    });

    /* Mobile swipe */
    overlay.addEventListener('touchstart', function (e) {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    overlay.addEventListener('touchend', function (e) {
      touchEndX = e.changedTouches[0].screenX;
      var delta = touchStartX - touchEndX;
      if (Math.abs(delta) > 50) {
        if (delta > 0) showImage(currentIndex + 1);   // swipe left  -> next
        else           showImage(currentIndex - 1);   // swipe right -> prev
      }
    }, { passive: true });
  }


  /* ═══════════════════════════════════════════════════════════
     5. TIMELINE HORIZONTAL SCROLL
     ═══════════════════════════════════════════════════════════ */
  function initTimelineScroll() {
    var track = document.querySelector('.timeline-track');
    if (!track) return;

    var cards = track.querySelectorAll('.timeline-card');
    if (!cards.length) return;

    /* Create dot container */
    var dotsContainer = document.createElement('div');
    dotsContainer.className = 'timeline-dots';
    dotsContainer.setAttribute('aria-label', 'Navegacion de linea de tiempo');

    cards.forEach(function (_, i) {
      var dot = document.createElement('button');
      dot.className = 'timeline-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Ir al momento ' + (i + 1));
      dot.addEventListener('click', function () {
        cards[i].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      });
      dotsContainer.appendChild(dot);
    });

    track.parentNode.insertBefore(dotsContainer, track.nextSibling);

    /* Update dots on scroll */
    var dots = dotsContainer.querySelectorAll('.timeline-dot');

    function updateActiveDot() {
      var trackRect = track.getBoundingClientRect();
      var center = trackRect.left + trackRect.width / 2;
      var closestIndex = 0;
      var closestDist = Infinity;

      cards.forEach(function (card, i) {
        var rect = card.getBoundingClientRect();
        var cardCenter = rect.left + rect.width / 2;
        var dist = Math.abs(cardCenter - center);
        if (dist < closestDist) {
          closestDist = dist;
          closestIndex = i;
        }
      });

      dots.forEach(function (dot, i) {
        if (i === closestIndex) dot.classList.add('active');
        else dot.classList.remove('active');
      });
    }

    track.addEventListener('scroll', updateActiveDot, { passive: true });

    /* Scroll-hint animation on first visit */
    var hintKey = 'cartaSamara_timelineHintShown';
    if (!localStorage.getItem(hintKey)) {
      var hint = document.createElement('div');
      hint.className = 'timeline-scroll-hint';
      hint.textContent = 'Desliza para explorar';
      track.parentNode.insertBefore(hint, dotsContainer);
      localStorage.setItem(hintKey, 'true');

      setTimeout(function () {
        if (hint.parentNode) {
          hint.style.transition = 'opacity 0.6s ease';
          hint.style.opacity = '0';
          setTimeout(function () { if (hint.parentNode) hint.parentNode.removeChild(hint); }, 600);
        }
      }, 6000);
    }
  }


  /* ═══════════════════════════════════════════════════════════
     6. DAYS-SINCE COUNTER
     ═══════════════════════════════════════════════════════════ */
  function initDaysCounter() {
    var container = document.getElementById('contadorDias');
    if (!container) return;

    var diasEl    = document.getElementById('diasNum');
    var horasEl   = document.getElementById('horasNum');
    var minutosEl = document.getElementById('minutosNum');
    var segsEl    = document.getElementById('segsNum');
    if (!diasEl || !horasEl || !minutosEl || !segsEl) return;

    /* Configurable start date */
    var startDate = new Date(2025, 5, 1); // June 1, 2025 (months are 0-indexed)
    var prevValues = { d: '', h: '', m: '', s: '' };

    function pulseIfChanged(el, newVal, key) {
      if (prevValues[key] !== newVal) {
        prevValues[key] = newVal;
        el.textContent = newVal;
        el.classList.add('pulse');
        setTimeout(function () { el.classList.remove('pulse'); }, 200);
      }
    }

    function update() {
      var now  = new Date();
      var diff = now.getTime() - startDate.getTime();
      if (diff < 0) diff = 0;

      var totalSeconds = Math.floor(diff / 1000);
      var days    = Math.floor(totalSeconds / 86400);
      var hours   = Math.floor((totalSeconds % 86400) / 3600);
      var minutes = Math.floor((totalSeconds % 3600) / 60);
      var seconds = totalSeconds % 60;

      pulseIfChanged(diasEl,    String(days),                            'd');
      pulseIfChanged(horasEl,   String(hours).padStart(2, '0'),          'h');
      pulseIfChanged(minutosEl, String(minutes).padStart(2, '0'),        'm');
      pulseIfChanged(segsEl,    String(seconds).padStart(2, '0'),        's');
    }

    update();
    setInterval(update, 1000);
  }


  /* ═══════════════════════════════════════════════════════════
     7. CUSTOM CURSOR (Desktop Only)
     ═══════════════════════════════════════════════════════════ */
  function initCustomCursor() {
    /* Only on non-touch, hover-capable devices */
    if (!window.matchMedia('(hover: hover)').matches) return;

    var cursor = document.getElementById('customCursor');
    if (!cursor) return;

    /* Build cursor footprint structure */
    cursor.innerHTML = '';
    for (var t = 0; t < 3; t++) {
      var toe = document.createElement('div');
      toe.className = 'cursor-toe';
      cursor.appendChild(toe);
    }
    var palm = document.createElement('div');
    palm.className = 'cursor-palm';
    cursor.appendChild(palm);

    document.body.classList.add('custom-cursor-active');
    cursor.style.display = 'block';

    var mouseX = 0, mouseY = 0;
    var cursorX = 0, cursorY = 0;
    var raf = null;

    /* Trail system */
    var TRAIL_COUNT = 5;
    var trailDots = [];
    var trailPositions = [];
    for (var i = 0; i < TRAIL_COUNT; i++) {
      var dot = document.createElement('div');
      dot.className = 'cursor-trail-dot';
      dot.style.opacity = String(0.7 - i * 0.12);
      dot.style.width  = (4 - i * 0.5) + 'px';
      dot.style.height = (4 - i * 0.5) + 'px';
      dot.style.display = 'none'; // Hide until first mouse movement
      document.body.appendChild(dot);
      trailDots.push(dot);
      trailPositions.push({ x: 0, y: 0 });
    }

    function updateCursor() {
      /* Smooth interpolation */
      cursorX += (mouseX - cursorX) * 0.18;
      cursorY += (mouseY - cursorY) * 0.18;

      cursor.style.left = cursorX + 'px';
      cursor.style.top  = cursorY + 'px';

      /* Trail follows with increasing delay */
      for (var j = 0; j < TRAIL_COUNT; j++) {
        var target = j === 0 ? { x: cursorX, y: cursorY } : trailPositions[j - 1];
        var factor = 0.12 - j * 0.015;
        if (factor < 0.03) factor = 0.03;
        trailPositions[j].x += (target.x - trailPositions[j].x) * factor;
        trailPositions[j].y += (target.y - trailPositions[j].y) * factor;
        trailDots[j].style.left = trailPositions[j].x + 'px';
        trailDots[j].style.top  = trailPositions[j].y + 'px';
      }

      raf = requestAnimationFrame(updateCursor);
    }

    var hasMoved = false;
    document.addEventListener('mousemove', function (e) {
      if (!hasMoved) {
        hasMoved = true;
        cursor.classList.add('active');
        trailDots.forEach(function (d) {
          d.style.display = 'block';
        });
      }
      mouseX = e.clientX;
      mouseY = e.clientY;
    }, { passive: true });

    /* Click burst */
    document.addEventListener('mousedown', function () {
      cursor.classList.add('click');
      setTimeout(function () { cursor.classList.remove('click'); }, 150);
    });

    raf = requestAnimationFrame(updateCursor);
  }


  /* ═══════════════════════════════════════════════════════════
     8. KARAOKE PANEL
     ═══════════════════════════════════════════════════════════ */
  var _karaokeTimeout = null;

  function initKaraokePanel() {
    var panel = document.getElementById('karaokePanel');
    var line  = document.getElementById('karaokeLine');
    if (!panel || !line) return;

    /* Expose global function for music.js integration */
    window.updateKaraokeLine = function (text) {
      if (_karaokeTimeout) {
        clearTimeout(_karaokeTimeout);
        _karaokeTimeout = null;
      }

      line.textContent = '';
      line.classList.remove('typing');

      if (!text || !text.length) return;

      line.classList.add('typing');
      var idx = 0;
      var speed = Math.max(30, Math.min(80, 2000 / text.length)); // adaptive speed

      function typeNext() {
        if (idx < text.length) {
          line.textContent += text.charAt(idx);
          idx++;
          _karaokeTimeout = setTimeout(typeNext, speed);
        } else {
          /* Remove cursor blink after a pause */
          _karaokeTimeout = setTimeout(function () {
            line.classList.remove('typing');
          }, 1200);
        }
      }

      typeNext();
    };
  }


  function initInstructionModal() {
    var modal = document.getElementById('instructionModal');
    var closeBtn = document.getElementById('closeInstructionModalBtn');
    if (!modal || !closeBtn) return;

    var hasVisited = localStorage.getItem('hasVisitedBefore');
    if (!hasVisited) {
      modal.style.display = 'flex';
      /* Small delay to allow the fade transition to trigger */
      setTimeout(function () {
        modal.classList.add('open');
      }, 50);
    }

    closeBtn.addEventListener('click', function () {
      modal.classList.remove('open');
      setTimeout(function () {
        modal.style.display = 'none';
      }, 500);
      localStorage.setItem('hasVisitedBefore', 'true');
    });
  }


  /* ═══════════════════════════════════════════════════════════
     PUBLIC: initFeatures()
     ═══════════════════════════════════════════════════════════ */
  function initFeatures() {
    injectFeatureStyles();
    initParallaxHero();
    initDayNightMode();
    initAnimatedSignature();
    initLightboxGallery();
    initTimelineScroll();
    initDaysCounter();
    initCustomCursor();
    initKaraokePanel();
    initInstructionModal();
  }

  /* Expose globally */
  window.initFeatures = initFeatures;

})();
