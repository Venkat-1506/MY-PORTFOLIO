(function () {
  'use strict';

  var canvas = document.getElementById('hero3dCanvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');

  var W, H;
  var mouseX = -1000, mouseY = -1000;
  var mouseInCanvas = false;
  var animId = null;
  var running = true;
  var time = 0;

  /* ===== COLORS ===== */

  var GOLD = {
    bright:  { r: 255, g: 215, b: 0 },
    warm:    { r: 244, g: 164, b: 96 },
    rich:    { r: 218, g: 165, b: 32 },
    soft:    { r: 201, g: 168, b: 124 },
    glow:    { r: 255, g: 228, b: 77 }
  };

  var CURIOUS_COLORS = [
    { r: 212, g: 119, b: 74 },
    { r: 242, g: 169, b: 59 },
    { r: 255, g: 107, b: 91 },
    { r: 107, g: 78, b: 142 },
    { r: 232, g: 160, b: 160 },
    { r: 74, g: 158, b: 138 }
  ];

  var CURIOUS_DARK = [
    { r: 100, g: 80, b: 60 },
    { r: 120, g: 90, b: 70 },
    { r: 80, g: 70, b: 60 }
  ];

  /* ===== STAR (BACKGROUND LAYER) ===== */

  function Star(mode) {
    this.mode = mode;
    this.reset();
  }

  Star.prototype.reset = function () {
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.size = 0.5 + Math.random() * 1.5;
    this.speedX = (Math.random() - 0.5) * 0.1;
    this.speedY = (Math.random() - 0.5) * 0.1;
    this.opacity = 0.2 + Math.random() * 0.5;
    this.twinkleSpeed = 0.5 + Math.random() * 2;
    this.twinklePhase = Math.random() * Math.PI * 2;
    if (this.mode === 'curious') {
      var dc = CURIOUS_DARK[Math.floor(Math.random() * CURIOUS_DARK.length)];
      this.color = dc;
    }
  };

  Star.prototype.update = function (dt) {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0) this.x += W;
    if (this.x > W) this.x -= W;
    if (this.y < 0) this.y += H;
    if (this.y > H) this.y -= H;
  };

  Star.prototype.draw = function () {
    var twinkle = 0.5 + 0.5 * Math.sin(time * this.twinkleSpeed + this.twinklePhase);
    var alpha = this.opacity * twinkle;
    if (this.mode === 'engineering') {
      ctx.fillStyle = 'rgba(255,255,255,' + alpha + ')';
    } else {
      ctx.fillStyle = 'rgba(' + this.color.r + ',' + this.color.g + ',' + this.color.b + ',' + (alpha * 0.6) + ')';
    }
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  };

  /* ===== GOLD / MAIN PARTICLE ===== */

  function GoldParticle(mode) {
    this.mode = mode;
    this.reset();
  }

  GoldParticle.prototype.reset = function () {
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.vx = (Math.random() - 0.5) * 0.3;
    this.vy = (Math.random() - 0.5) * 0.3;
    this.size = 1.5 + Math.random() * 1.5;
    this.glowSize = this.size * 2.5;
    this.opacity = 0.2 + Math.random() * 0.25;
    this.phase = Math.random() * Math.PI * 2;
    this.color = this.mode === 'engineering'
      ? this.randomGold()
      : CURIOUS_COLORS[Math.floor(Math.random() * CURIOUS_COLORS.length)];
    this.driftX = (Math.random() - 0.5) * 0.02;
    this.driftY = (Math.random() - 0.5) * 0.02;
  };

  GoldParticle.prototype.randomGold = function () {
    var golds = [GOLD.bright, GOLD.warm, GOLD.rich, GOLD.soft, GOLD.glow];
    return golds[Math.floor(Math.random() * golds.length)];
  };

  GoldParticle.prototype.update = function () {
    this.x += this.vx + Math.sin(time * 0.001 + this.phase) * this.driftX * 10;
    this.y += this.vy + Math.cos(time * 0.0012 + this.phase * 1.2) * this.driftY * 10;

    // Mouse repulsion
    if (mouseInCanvas) {
      var dx = this.x - mouseX;
      var dy = this.y - mouseY;
      var dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 80 && dist > 0) {
        var force = (80 - dist) / 80 * 1.5;
        this.x += (dx / dist) * force;
        this.y += (dy / dist) * force;
      }
    }

    if (this.x < -50) this.x += W + 100;
    if (this.x > W + 50) this.x -= W + 100;
    if (this.y < -50) this.y += H + 100;
    if (this.y > H + 50) this.y -= H + 100;
  };

  GoldParticle.prototype.getBrightness = function () {
    if (!mouseInCanvas) return 1;
    var dx = this.x - mouseX;
    var dy = this.y - mouseY;
    var dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 200) {
      return 1 + (1 - dist / 200) * 0.3;
    }
    return 1;
  };

  GoldParticle.prototype.draw = function () {
    var brightness = this.getBrightness();
    var alpha = Math.min(1, this.opacity * brightness);
    var c = this.color;

    if (this.mode === 'engineering') {
      var grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.glowSize);
      grad.addColorStop(0, 'rgba(' + c.r + ',' + c.g + ',' + c.b + ',' + (alpha * 0.2) + ')');
      grad.addColorStop(1, 'rgba(' + c.r + ',' + c.g + ',' + c.b + ',0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.glowSize, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = 'rgba(' + c.r + ',' + c.g + ',' + c.b + ',' + (alpha * 0.7) + ')';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = 'rgba(255,255,255,' + (alpha * 0.2) + ')';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size * 0.4, 0, Math.PI * 2);
      ctx.fill();
    } else {
      var grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.glowSize);
      grad.addColorStop(0, 'rgba(' + c.r + ',' + c.g + ',' + c.b + ',' + (alpha * 0.25) + ')');
      grad.addColorStop(1, 'rgba(' + c.r + ',' + c.g + ',' + c.b + ',0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.glowSize, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = 'rgba(' + c.r + ',' + c.g + ',' + c.b + ',' + (alpha * 0.8) + ')';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  /* ===== SCENE ===== */

  var stars = [];
  var goldParticles = [];

  function initScene(mode) {
    stars = [];
    goldParticles = [];

    for (var i = 0; i < 120; i++) {
      stars.push(new Star(mode));
    }

    var count = mode === 'engineering' ? 75 : 55;
    for (var i = 0; i < count; i++) {
      goldParticles.push(new GoldParticle(mode));
    }
  }

  /* ===== CONNECTION LINES ===== */

  function drawConnections(mode) {
    if (mode === 'engineering') {
      for (var i = 0; i < goldParticles.length; i++) {
        for (var j = i + 1; j < goldParticles.length; j++) {
          var a = goldParticles[i], b = goldParticles[j];
          var dx = a.x - b.x, dy = a.y - b.y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > 180) continue;

          var mouseBoost = 1;
          if (mouseInCanvas) {
            var midX = (a.x + b.x) / 2;
            var midY = (a.y + b.y) / 2;
            var mdx = midX - mouseX;
            var mdy = midY - mouseY;
            var mDist = Math.sqrt(mdx * mdx + mdy * mdy);
            if (mDist < 200) {
              mouseBoost = 1 + (1 - mDist / 200) * 0.8;
            }
          }

          var alpha = (1 - dist / 180) * 0.15 * mouseBoost;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = 'rgba(255,215,0,' + alpha + ')';
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    } else {
      for (var i = 0; i < goldParticles.length; i++) {
        for (var j = i + 1; j < goldParticles.length; j++) {
          var a = goldParticles[i], b = goldParticles[j];
          var dx = a.x - b.x, dy = a.y - b.y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > 150) continue;

          var alpha = (1 - dist / 150) * 0.08;
          var mixedR = Math.round((a.color.r + b.color.r) / 2);
          var mixedG = Math.round((a.color.g + b.color.g) / 2);
          var mixedB = Math.round((a.color.b + b.color.b) / 2);

          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = 'rgba(' + mixedR + ',' + mixedG + ',' + mixedB + ',' + alpha + ')';
          ctx.lineWidth = 0.4;
          ctx.stroke();
        }
      }
    }
  }

  /* ===== MOUSE GLOW ===== */

  function drawMouseGlow(mode) {
    if (!mouseInCanvas) return;
    if (mode === 'engineering') {
      var grad = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 250);
      grad.addColorStop(0, 'rgba(255,215,0,0.015)');
      grad.addColorStop(0.3, 'rgba(255,215,0,0.008)');
      grad.addColorStop(1, 'rgba(255,215,0,0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(mouseX, mouseY, 250, 0, Math.PI * 2);
      ctx.fill();
    } else {
      var grad = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 200);
      grad.addColorStop(0, 'rgba(212,119,74,0.012)');
      grad.addColorStop(1, 'rgba(212,119,74,0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(mouseX, mouseY, 200, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  /* ===== RENDER ===== */

  var lastTimestamp = 0;

  function render(timestamp) {
    if (!running) return;

    var dt = lastTimestamp ? Math.min((timestamp - lastTimestamp) / 1000, 0.05) : 0.016;
    lastTimestamp = timestamp;
    time = timestamp / 1000;

    ctx.clearRect(0, 0, W, H);

    var mode = getMode();

    // Layer 1: Stars
    for (var i = 0; i < stars.length; i++) {
      stars[i].update(dt);
      stars[i].draw();
    }

    // Layer 2: Connection lines
    drawConnections(mode);

    // Layer 3: Gold/main particles
    for (var i = 0; i < goldParticles.length; i++) {
      goldParticles[i].update();
      goldParticles[i].draw();
    }

    // Layer 4: Mouse glow
    drawMouseGlow(mode);

    animId = requestAnimationFrame(render);
  }

  /* ===== SETUP ===== */

  function resize() {
    var hero = document.getElementById('hero');
    if (hero) {
      var rect = hero.getBoundingClientRect();
      W = rect.width || window.innerWidth;
      H = rect.height || window.innerHeight;
    } else {
      W = window.innerWidth;
      H = window.innerHeight;
    }
    if (W < 10 || H < 10) {
      W = window.innerWidth;
      H = window.innerHeight;
    }
    canvas.width = W;
    canvas.height = H;
  }

  function getMode() {
    return document.documentElement.getAttribute('data-mode') || 'engineering';
  }

  var lastMode = 'engineering';

  function init() {
    resize();
    if ((W < 10 || H < 10)) {
      setTimeout(init, 250);
      return;
    }
    lastMode = getMode();
    initScene(lastMode);
    render(0);
  }

  /* ===== MOUSE ===== */

  function onMouseMove(e) {
    var rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
    mouseInCanvas = true;
  }

  function onMouseLeave() {
    mouseInCanvas = false;
    mouseX = -1000;
    mouseY = -1000;
  }

  function onMouseEnter(e) {
    var rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
    mouseInCanvas = true;
  }

  /* ===== MODE OBSERVER ===== */

  var modeObserver = new MutationObserver(function () {
    var mode = getMode();
    if (mode !== lastMode) {
      lastMode = mode;
      initScene(mode);
    }
  });
  modeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-mode']
  });

  /* ===== RESIZE ===== */

  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      resize();
    }, 150);
  });

  if (window.ResizeObserver) {
    var heroEl = document.getElementById('hero');
    if (heroEl) {
      var ro = new ResizeObserver(function () {
        resize();
      });
      ro.observe(heroEl);
    }
  }

  /* ===== EVENT LISTENERS ===== */

  canvas.addEventListener('mousemove', onMouseMove);
  canvas.addEventListener('mouseleave', onMouseLeave);
  canvas.addEventListener('mouseenter', onMouseEnter);

  canvas.addEventListener('touchmove', function (e) {
    var touch = e.touches[0];
    var rect = canvas.getBoundingClientRect();
    mouseX = touch.clientX - rect.left;
    mouseY = touch.clientY - rect.top;
    mouseInCanvas = true;
  }, { passive: true });

  canvas.addEventListener('touchend', function () {
    mouseInCanvas = false;
  });

  /* ===== CLEANUP ===== */

  window.hero3dCleanup = function () {
    running = false;
    if (animId) { cancelAnimationFrame(animId); animId = null; }
    if (modeObserver) modeObserver.disconnect();
    canvas.removeEventListener('mousemove', onMouseMove);
    canvas.removeEventListener('mouseleave', onMouseLeave);
    canvas.removeEventListener('mouseenter', onMouseEnter);
  };

  /* ===== START ===== */

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  document.addEventListener('app:ready', function () {
    if (!running) {
      running = true;
      init();
    }
  });
})();
