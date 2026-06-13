/* ============================================================
   dinogame.js -- Pollito vs Meteoritos (Chrome-Dino style)
   ============================================================ */

function initDinoGame() {
  var canvas = document.getElementById('dinoCanvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');

  /* ---- constants / palette ---- */
  var COL_BODY      = '#F5D63D';
  var COL_BEAK      = '#E8A830';
  var COL_FEET      = '#E8A830';
  var COL_EYE       = '#3A2E20';
  var COL_METEOR_A  = '#5A4E40';
  var COL_METEOR_B  = '#3A2E20';
  var COL_GROUND    = '#6B5B45';
  var COL_GROUND_LT = '#7D6B55';
  var COL_SKY_TOP   = '#2C3E50';
  var COL_SKY_BOT   = '#4A6741';
  var COL_TEXT       = '#E8C98A';
  var COL_CLOUD     = 'rgba(200,210,220,0.18)';

  /* ---- responsive sizing ---- */
  var DESIGN_H = 250;
  var scale = 1;

  function resize() {
    var parent = canvas.parentElement || document.body;
    var w = parent.clientWidth || 320;
    var isMobile = w < 600;
    var h = isMobile ? 200 : 250;
    canvas.width = w;
    canvas.height = h;
    DESIGN_H = h;
    scale = h / 250;
  }
  resize();
  window.addEventListener('resize', resize);

  /* ---- game state ---- */
  var GRAVITY       = 0.42;
  var JUMP_FORCE    = -9.2;
  var BASE_SPEED    = 3.2;
  var GROUND_Y;            // set each frame from canvas.height
  var GROUND_H = 2;

  var chicken = {
    x: 50,
    w: 28,
    h: 32,
    vy: 0,
    y: 0,
    grounded: true,
    legPhase: 0
  };

  var meteorites = [];
  var clouds = [];
  var groundRocks = [];
  var score = 0;
  var gameOver = false;
  var started = false;
  var showInstruction = true;
  var instructionAlpha = 1;
  var specialShown = false;
  var specialTimer = 0;
  var SPECIAL_DURATION = 180;   // frames (~3 s)
  var spawnTimer = 0;
  var spawnInterval = 180;
  var frameId = null;
  var visible = false;
  var gameSpeed = BASE_SPEED;

  /* ---- helpers ---- */
  function rand(a, b) { return Math.random() * (b - a) + a; }
  function randInt(a, b) { return Math.floor(rand(a, b + 1)); }

  /* ---- cloud generation ---- */
  function makeCloud(x) {
    return {
      x: x !== undefined ? x : canvas.width + rand(20, 120),
      y: rand(15, DESIGN_H * 0.45),
      w: rand(60, 130) * scale,
      h: rand(18, 36) * scale,
      speed: rand(0.15, 0.5)
    };
  }
  function initClouds() {
    clouds = [];
    for (var i = 0; i < 5; i++) {
      clouds.push(makeCloud(rand(0, canvas.width)));
    }
  }

  /* ---- ground rocks ---- */
  function makeRock(x) {
    return {
      x: x !== undefined ? x : canvas.width + rand(0, 60),
      size: rand(2, 5) * scale,
      yOff: rand(-3, 1)
    };
  }
  function initGroundRocks() {
    groundRocks = [];
    for (var i = 0; i < 30; i++) {
      groundRocks.push(makeRock(rand(0, canvas.width)));
    }
  }

  /* ---- meteorite generation ---- */
  function spawnMeteor() {
    var r = rand(14, 24) * scale;
    meteorites.push({
      x: canvas.width + r + 10,
      r: r,
      craters: buildCraters(r)
    });
  }

  function buildCraters(r) {
    var arr = [];
    var n = randInt(2, 4);
    for (var i = 0; i < n; i++) {
      var angle = rand(0, Math.PI * 2);
      var dist  = rand(r * 0.15, r * 0.55);
      arr.push({
        ox: Math.cos(angle) * dist,
        oy: Math.sin(angle) * dist,
        cr: rand(r * 0.12, r * 0.28)
      });
    }
    return arr;
  }

  /* ---- reset ---- */
  function resetGame() {
    chicken.vy = 0;
    chicken.grounded = true;
    chicken.legPhase = 0;
    meteorites = [];
    score = 0;
    gameOver = false;
    started = false;
    showInstruction = true;
    instructionAlpha = 1;
    specialShown = false;
    specialTimer = 0;
    spawnTimer = 0;
    spawnInterval = 180;
    gameSpeed = BASE_SPEED;
    initClouds();
    initGroundRocks();
  }

  /* ---- input ---- */
  var isHoldingJump = false;

  function jump() {
    if (gameOver) {
      resetGame();
      return;
    }
    if (!started) started = true;
    if (showInstruction) showInstruction = false;
    if (chicken.grounded) {
      chicken.vy = JUMP_FORCE * scale;
      chicken.grounded = false;
    }
  }

  canvas.addEventListener('pointerdown', function (e) {
    e.preventDefault();
    isHoldingJump = true;
    jump();
  });

  window.addEventListener('pointerup', function (e) {
    isHoldingJump = false;
  });

  window.addEventListener('pointercancel', function (e) {
    isHoldingJump = false;
  });

  window.addEventListener('keydown', function (e) {
    if (e.code === 'Space' || e.code === 'ArrowUp') {
      if (visible) {
        e.preventDefault();
        if (!isHoldingJump) {
          isHoldingJump = true;
          jump();
        }
      }
    }
  });

  window.addEventListener('keyup', function (e) {
    if (e.code === 'Space' || e.code === 'ArrowUp') {
      isHoldingJump = false;
    }
  });

  /* ---- drawing helpers ---- */
  function drawRoundRect(x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }

  /* ---- draw sky ---- */
  function drawSky() {
    var grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
    grad.addColorStop(0, COL_SKY_TOP);
    grad.addColorStop(1, COL_SKY_BOT);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  /* ---- draw clouds ---- */
  function drawClouds() {
    for (var i = 0; i < clouds.length; i++) {
      var c = clouds[i];
      ctx.fillStyle = COL_CLOUD;
      ctx.beginPath();
      ctx.ellipse(c.x, c.y, c.w / 2, c.h / 2, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(c.x - c.w * 0.25, c.y + c.h * 0.1, c.w * 0.3, c.h * 0.35, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(c.x + c.w * 0.22, c.y + c.h * 0.05, c.w * 0.28, c.h * 0.32, 0, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  /* ---- draw ground ---- */
  function drawGround() {
    /* main ground stripe */
    ctx.fillStyle = COL_GROUND;
    ctx.fillRect(0, GROUND_Y, canvas.width, canvas.height - GROUND_Y);

    /* ground line */
    ctx.strokeStyle = COL_GROUND_LT;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, GROUND_Y);
    ctx.lineTo(canvas.width, GROUND_Y);
    ctx.stroke();

    /* small rocks */
    for (var i = 0; i < groundRocks.length; i++) {
      var r = groundRocks[i];
      ctx.fillStyle = COL_GROUND_LT;
      ctx.beginPath();
      ctx.arc(r.x, GROUND_Y + 4 + r.yOff, r.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  /* ---- draw chicken ---- */
  function drawChicken() {
    var s  = scale;
    var cx = chicken.x * s;
    var cy = chicken.y;
    var bw = chicken.w * s;
    var bh = chicken.h * s;

    /* legs */
    var legLen = 10 * s;
    var legW   = 3 * s;
    var legOff = started ? Math.sin(chicken.legPhase) * 5 * s : 0;

    ctx.fillStyle = COL_FEET;
    /* left leg */
    ctx.fillRect(cx + bw * 0.25 - legW / 2, cy + bh - 2, legW, legLen + legOff);
    /* left foot */
    ctx.fillRect(cx + bw * 0.25 - legW / 2 - 2 * s, cy + bh - 2 + legLen + legOff, legW + 4 * s, 3 * s);

    /* right leg */
    ctx.fillRect(cx + bw * 0.65 - legW / 2, cy + bh - 2, legW, legLen - legOff);
    /* right foot */
    ctx.fillRect(cx + bw * 0.65 - legW / 2 - 2 * s, cy + bh - 2 + legLen - legOff, legW + 4 * s, 3 * s);

    /* body */
    ctx.fillStyle = COL_BODY;
    drawRoundRect(cx, cy, bw, bh, 6 * s);
    ctx.fill();

    /* wing detail */
    ctx.fillStyle = '#E0C632';
    drawRoundRect(cx + 2 * s, cy + bh * 0.35, bw * 0.35, bh * 0.4, 3 * s);
    ctx.fill();

    /* tail feathers */
    ctx.fillStyle = '#D4B82E';
    ctx.beginPath();
    ctx.moveTo(cx, cy + bh * 0.2);
    ctx.lineTo(cx - 8 * s, cy + bh * 0.05);
    ctx.lineTo(cx - 4 * s, cy + bh * 0.3);
    ctx.lineTo(cx - 10 * s, cy + bh * 0.25);
    ctx.lineTo(cx - 3 * s, cy + bh * 0.45);
    ctx.closePath();
    ctx.fill();

    /* head (circle) */
    var headR = bw * 0.32;
    var headX = cx + bw - headR * 0.4;
    var headY = cy + headR * 0.3;

    ctx.fillStyle = COL_BODY;
    ctx.beginPath();
    ctx.arc(headX, headY, headR, 0, Math.PI * 2);
    ctx.fill();

    /* comb */
    ctx.fillStyle = '#CC3333';
    var combX = headX - 2 * s;
    var combY = headY - headR;
    ctx.beginPath();
    ctx.moveTo(combX - 4 * s, combY + 4 * s);
    ctx.lineTo(combX - 2 * s, combY - 3 * s);
    ctx.lineTo(combX + 1 * s, combY + 2 * s);
    ctx.lineTo(combX + 3 * s, combY - 4 * s);
    ctx.lineTo(combX + 6 * s, combY + 2 * s);
    ctx.lineTo(combX + 8 * s, combY - 2 * s);
    ctx.lineTo(combX + 9 * s, combY + 4 * s);
    ctx.closePath();
    ctx.fill();

    /* eye */
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(headX + headR * 0.25, headY - headR * 0.1, 3.5 * s, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = COL_EYE;
    ctx.beginPath();
    ctx.arc(headX + headR * 0.35, headY - headR * 0.1, 2 * s, 0, Math.PI * 2);
    ctx.fill();

    /* beak */
    ctx.fillStyle = COL_BEAK;
    ctx.beginPath();
    ctx.moveTo(headX + headR, headY - 2 * s);
    ctx.lineTo(headX + headR + 10 * s, headY + 2 * s);
    ctx.lineTo(headX + headR, headY + 5 * s);
    ctx.closePath();
    ctx.fill();
  }

  /* ---- draw meteorite ---- */
  function drawMeteor(m) {
    var mx = m.x;
    var my = GROUND_Y - m.r;

    /* shadow on ground */
    ctx.fillStyle = 'rgba(0,0,0,0.15)';
    ctx.beginPath();
    ctx.ellipse(mx, GROUND_Y + 2, m.r * 0.7, 3 * scale, 0, 0, Math.PI * 2);
    ctx.fill();

    /* main body */
    var grad = ctx.createRadialGradient(mx - m.r * 0.3, my - m.r * 0.3, m.r * 0.1, mx, my, m.r);
    grad.addColorStop(0, '#7A6E5A');
    grad.addColorStop(0.6, COL_METEOR_A);
    grad.addColorStop(1, COL_METEOR_B);
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(mx, my, m.r, 0, Math.PI * 2);
    ctx.fill();

    /* craters */
    for (var j = 0; j < m.craters.length; j++) {
      var cr = m.craters[j];
      ctx.fillStyle = 'rgba(30,20,10,0.45)';
      ctx.beginPath();
      ctx.arc(mx + cr.ox, my + cr.oy, cr.cr, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  /* ---- draw score ---- */
  function drawScore() {
    ctx.save();
    ctx.fillStyle = COL_TEXT;
    ctx.font = 'bold ' + Math.round(16 * scale) + 'px "Lato", sans-serif';
    ctx.textAlign = 'right';
    ctx.shadowColor = 'rgba(0,0,0,0.5)';
    ctx.shadowBlur = 4;
    ctx.fillText('Puntos: ' + score, canvas.width - 14, 26 * scale);
    ctx.restore();
  }

  /* ---- draw instruction ---- */
  function drawInstruction() {
    if (!showInstruction) return;
    if (instructionAlpha <= 0) return;

    ctx.save();
    ctx.globalAlpha = instructionAlpha;
    ctx.fillStyle = COL_TEXT;
    ctx.font = Math.round(14 * scale) + 'px "Caveat", cursive';
    ctx.textAlign = 'center';
    ctx.shadowColor = 'rgba(0,0,0,0.6)';
    ctx.shadowBlur = 6;
    ctx.fillText('Toca para saltar', canvas.width / 2, GROUND_Y - 50 * scale);
    ctx.restore();
  }

  /* ---- draw special message ---- */
  function drawSpecialMessage() {
    if (specialTimer <= 0) return;
    var alpha = Math.min(1, specialTimer / 30, (SPECIAL_DURATION - (SPECIAL_DURATION - specialTimer)) / 30);
    if (specialTimer < 30) alpha = specialTimer / 30;

    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.textAlign = 'center';

    /* glow layers */
    ctx.shadowColor = COL_TEXT;
    ctx.shadowBlur = 25;
    ctx.fillStyle = COL_TEXT;
    ctx.font = 'bold ' + Math.round(18 * scale) + 'px "Playfair Display", serif';
    /* draw twice for stronger glow */
    ctx.fillText('Sobreviviste al meteorito, maestra', canvas.width / 2, canvas.height * 0.38);
    ctx.fillText('Sobreviviste al meteorito, maestra', canvas.width / 2, canvas.height * 0.38);

    ctx.shadowBlur = 0;
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold ' + Math.round(18 * scale) + 'px "Playfair Display", serif';
    ctx.fillText('Sobreviviste al meteorito, maestra', canvas.width / 2, canvas.height * 0.38);

    ctx.restore();
  }

  /* ---- draw game-over overlay ---- */
  function drawGameOver() {
    /* dim overlay */
    ctx.fillStyle = 'rgba(20,15,10,0.65)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.textAlign = 'center';
    ctx.shadowColor = 'rgba(0,0,0,0.7)';
    ctx.shadowBlur = 8;

    /* "Fin" */
    ctx.fillStyle = COL_TEXT;
    ctx.font = 'bold ' + Math.round(36 * scale) + 'px "Playfair Display", serif';
    ctx.fillText('Fin', canvas.width / 2, canvas.height * 0.35);

    /* score */
    ctx.font = Math.round(16 * scale) + 'px "Lato", sans-serif';
    ctx.fillText('Puntos: ' + score, canvas.width / 2, canvas.height * 0.50);

    /* restart button area */
    var btnW = 160 * scale;
    var btnH = 38 * scale;
    var btnX = canvas.width / 2 - btnW / 2;
    var btnY = canvas.height * 0.58;

    ctx.strokeStyle = COL_TEXT;
    ctx.lineWidth = 1.5;
    drawRoundRect(btnX, btnY, btnW, btnH, 6 * scale);
    ctx.stroke();

    ctx.fillStyle = COL_TEXT;
    ctx.font = Math.round(15 * scale) + 'px "Lato", sans-serif';
    ctx.fillText('Reiniciar', canvas.width / 2, btnY + btnH * 0.65);

    ctx.restore();
  }

  /* ---- update ---- */
  function update() {
    GROUND_Y = canvas.height - 24 * scale;

    /* position chicken on ground when grounded */
    var chickenBottom = GROUND_Y - (10 * scale); // account for legs
    if (!started) {
      chicken.y = chickenBottom - chicken.h * scale;
      chicken.grounded = true;
    }

    if (!started || gameOver) return;

    /* speed ramp */
    gameSpeed = BASE_SPEED + score * 0.002;
    if (gameSpeed > 7.5) gameSpeed = 7.5;

    /* chicken physics */
    var currentGravity = GRAVITY;
    if (isHoldingJump && chicken.vy < 0) {
      currentGravity = GRAVITY * 0.45; // reduced gravity when holding click/touch
    }
    chicken.vy += currentGravity * scale;
    chicken.y += chicken.vy;

    if (chicken.y >= chickenBottom - chicken.h * scale) {
      chicken.y = chickenBottom - chicken.h * scale;
      chicken.vy = 0;
      chicken.grounded = true;
      if (isHoldingJump) {
        jump(); // auto-jump again on landing if still holding
      }
    }

    /* leg animation */
    if (chicken.grounded) {
      chicken.legPhase += 0.3;
    }

    /* instruction fade */
    if (!showInstruction && instructionAlpha > 0) {
      instructionAlpha -= 0.025;
      if (instructionAlpha < 0) instructionAlpha = 0;
    }

    /* spawn meteorites */
    spawnTimer++;
    if (spawnTimer >= spawnInterval) {
      spawnTimer = 0;
      spawnMeteor();
      spawnInterval = Math.max(140, 210 - score * 0.10 + randInt(-20, 20));
    }

    /* move meteorites */
    for (var i = meteorites.length - 1; i >= 0; i--) {
      meteorites[i].x -= gameSpeed * scale;
      if (meteorites[i].x + meteorites[i].r < -20) {
        meteorites.splice(i, 1);
      }
    }

    /* collision detection */
    var cxCenter = chicken.x * scale + (chicken.w * scale) / 2;
    var cyCenter = chicken.y + (chicken.h * scale) / 2;
    var cRadius  = Math.min(chicken.w, chicken.h) * scale * 0.25;

    for (var k = 0; k < meteorites.length; k++) {
      var m = meteorites[k];
      var mx = m.x;
      var my = GROUND_Y - m.r;
      var dx = cxCenter - mx;
      var dy = cyCenter - my;
      var dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < cRadius + m.r * 0.55) {
        gameOver = true;
        return;
      }
    }

    /* score */
    score++;

    /* special message trigger */
    if (score === 100 && !specialShown) {
      specialShown = true;
      specialTimer = SPECIAL_DURATION;
    }
    if (specialTimer > 0) specialTimer--;

    /* move clouds */
    for (var c = 0; c < clouds.length; c++) {
      clouds[c].x -= clouds[c].speed;
      if (clouds[c].x + clouds[c].w / 2 < -10) {
        clouds[c] = makeCloud();
      }
    }

    /* move ground rocks */
    for (var g = groundRocks.length - 1; g >= 0; g--) {
      groundRocks[g].x -= gameSpeed * scale * 0.6;
      if (groundRocks[g].x < -10) {
        groundRocks[g] = makeRock();
      }
    }
  }

  /* ---- render ---- */
  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawSky();
    drawClouds();
    drawGround();

    /* meteorites */
    for (var i = 0; i < meteorites.length; i++) {
      drawMeteor(meteorites[i]);
    }

    drawChicken();
    drawScore();
    drawInstruction();
    drawSpecialMessage();

    if (gameOver) {
      drawGameOver();
    }
  }

  /* ---- game loop ---- */
  function loop() {
    if (!visible) {
      frameId = null;
      return;
    }
    update();
    render();
    frameId = requestAnimationFrame(loop);
  }

  function startLoop() {
    if (frameId) return;
    frameId = requestAnimationFrame(loop);
  }

  function stopLoop() {
    if (frameId) {
      cancelAnimationFrame(frameId);
      frameId = null;
    }
  }

  /* ---- IntersectionObserver ---- */
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          visible = true;
          startLoop();
        } else {
          visible = false;
          stopLoop();
        }
      });
    }, { threshold: 0.1 });
    observer.observe(canvas);
  } else {
    /* fallback: always run */
    visible = true;
    startLoop();
  }

  /* ---- init ---- */
  resetGame();
  /* initial render so the canvas is not blank */
  GROUND_Y = canvas.height - 24 * scale;
  chicken.y = GROUND_Y - 10 * scale - chicken.h * scale;
  render();
}
