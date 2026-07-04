/* ═══════════════════════════════════════
   GIFT ROOM — gift.js
   Three-click cinematic gift opening
═══════════════════════════════════════ */
(function () {
  'use strict';

  /* ── State ── */
  let clickCount = 0;
  let transitioning = false;

  /* ── Refs ── */
  const giftWrap   = document.getElementById('gift-wrap');
  const giftBox    = document.getElementById('gift-box');
  const giftGlow   = document.getElementById('gift-glow');
  const giftText   = document.getElementById('gift-text');
  const bgOverlay  = document.getElementById('bg-overlay');
  const fairyLights= document.getElementById('fairy-lights');
  const burst      = document.getElementById('golden-burst');
  const overlay    = document.getElementById('transition-overlay');
  const bfContainer= document.getElementById('butterflies');
  const pField     = document.getElementById('particle-field');

  /* ── Build fairy lights ── */
  const lightColors = ['#ff6b9d','#ffd700','#a78bfa','#67e8f9','#fb923c','#86efac'];
  const bulbCount   = Math.max(10, Math.round(window.innerWidth / 52));
  for (let i = 0; i < bulbCount; i++) {
    const b = document.createElement('div');
    b.className = 'bulb';
    const c = lightColors[i % lightColors.length];
    b.style.cssText = `--bc:${c};background:${c};--bd:${(2 + Math.random() * 3).toFixed(1)}s;animation-delay:${(Math.random() * 2).toFixed(2)}s`;
    document.getElementById('fairy-lights').appendChild(b);
  }

  /* ── Build stars ── */
  const starsEl = document.getElementById('stars');
  for (let i = 0; i < 55; i++) {
    const s = document.createElement('div');
    s.className = 'star';
    s.style.cssText = `left:${Math.random()*100}%;top:${Math.random()*85}%;--sd:${(2+Math.random()*5).toFixed(1)}s;animation-delay:${(Math.random()*5).toFixed(2)}s;opacity:${(0.2+Math.random()*0.6).toFixed(2)}`;
    starsEl.appendChild(s);
  }

  /* ── Build floating sparks ── */
  const sparkColors = ['rgba(167,139,250,0.6)','rgba(253,230,138,0.5)','rgba(233,213,255,0.5)','rgba(196,181,253,0.55)','rgba(251,191,36,0.4)'];
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'spark';
    const sz = (3 + Math.random() * 5).toFixed(1) + 'px';
    p.style.cssText = `--sc:${sparkColors[Math.floor(Math.random()*sparkColors.length)]};--ss:${sz};width:${sz};height:${sz};left:${Math.random()*100}%;--sf:${(7+Math.random()*9).toFixed(1)}s;--sfd:${(Math.random()*10).toFixed(1)}s`;
    pField.appendChild(p);
  }

  /* ── Click handler ── */
  giftWrap.addEventListener('click', handleClick);
  giftWrap.addEventListener('touchend', function(e){ e.preventDefault(); handleClick(); });

  function handleClick() {
    if (transitioning) return;
    clickCount++;

    if (clickCount === 1) doClick1();
    else if (clickCount === 2) doClick2();
    else if (clickCount === 3) doClick3();
  }

  /* ── CLICK 1: Shake + escape particles ── */
  function doClick1() {
    // Shake box
    giftBox.classList.remove('shake');
    void giftBox.offsetWidth;
    giftBox.classList.add('shake');
    giftBox.addEventListener('animationend', () => {
      giftBox.classList.remove('shake');
    }, { once: true });

    // Glow pulse
    giftGlow.style.transform = 'scale(1.15)';
    setTimeout(() => { giftGlow.style.transform = ''; }, 500);

    // Escape particles
    const colors = ['#a78bfa','#c4b5fd','#fbbf24','#e9d5ff','#8b5cf6'];
    for (let i = 0; i < 18; i++) {
      const p = document.createElement('div');
      p.className = 'escape-particle';
      const cx = window.innerWidth  / 2;
      const cy = window.innerHeight / 2;
      const angle = Math.random() * Math.PI * 2;
      const dist  = 60 + Math.random() * 100;
      p.style.cssText = `
        left:${cx}px; top:${cy}px;
        --epc:${colors[Math.floor(Math.random()*colors.length)]};
        --ep-tx:${(Math.cos(angle)*dist).toFixed(0)}px;
        --ep-ty:${(Math.sin(angle)*dist).toFixed(0)}px;
        --ep-dur:${(0.7+Math.random()*0.8).toFixed(2)}s;
        --ep-del:${(Math.random()*0.3).toFixed(2)}s;
        width:${(4+Math.random()*6).toFixed(0)}px;
        height:${(4+Math.random()*6).toFixed(0)}px;
      `;
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 2000);
    }

    // Change text
    setTimeout(() => {
      giftText.classList.add('fade-out');
      setTimeout(() => {
        giftText.textContent = 'Hmm... Something magical is inside... ✨';
        giftText.classList.remove('fade-out');
      }, 500);
    }, 300);
  }

  /* ── CLICK 2: Ribbon unties, golden glow leaks ── */
  function doClick2() {
    // Darken bg
    bgOverlay.classList.add('darker');

    // Fairy lights brighter
    fairyLights.classList.add('bright');

    // Animate bow SVG elements (scale down)
    const bowLeft  = document.getElementById('bow-left');
    const bowRight = document.getElementById('bow-right');
    if (bowLeft && bowRight) {
      bowLeft.style.transition  = 'transform 1s ease, opacity 1s ease';
      bowRight.style.transition = 'transform 1s ease, opacity 1s ease';
      bowLeft.style.transformOrigin  = '88px 72px';
      bowRight.style.transformOrigin = '132px 72px';
      setTimeout(() => {
        bowLeft.style.transform  = 'rotate(-60deg) scale(0.5) translate(-30px,-20px)';
        bowLeft.style.opacity    = '0.3';
        bowRight.style.transform = 'rotate(60deg) scale(0.5) translate(30px,-20px)';
        bowRight.style.opacity   = '0.3';
      }, 100);
    }

    // Glow brightens
    giftGlow.classList.add('bright');

    // Zoom box gently
    giftBox.style.animation = 'none';
    giftBox.classList.add('zooming');

    // Butterflies appear
    spawnButterflies(6);

    // Change text
    setTimeout(() => {
      giftText.classList.add('fade-out');
      setTimeout(() => {
        giftText.textContent = 'The magic is about to be revealed... 💜';
        giftText.classList.remove('fade-out');
      }, 500);
    }, 400);
  }

  /* ── CLICK 3: Lid opens, golden explosion, transition ── */
  function doClick3() {
    transitioning = true;

    // Animate lid lifting via SVG transform
    const lid = document.getElementById('box-lid');
    if (lid) {
      lid.style.transition = 'transform 1s cubic-bezier(.22,1,.36,1), opacity 0.8s ease';
      lid.style.transformOrigin = '110px 88px';
      lid.style.transform = 'rotate(-45deg) translateY(-60px)';
      lid.style.opacity = '0';
    }

    // Paper bits fly
    spawnPaperBits(20);
    spawnButterflies(12);

    // Golden burst
    setTimeout(() => {
      burst.classList.add('explode');
    }, 400);

    // Screen fills with golden light
    setTimeout(() => {
      overlay.classList.add('active');
    }, 1600);

    // Navigate while covered
    setTimeout(() => {
      window.location.href = 'memory.html';
    }, 2600);

    // Change text
    giftText.classList.add('fade-out');
  }

  /* ── Spawn butterflies ── */
  function spawnButterflies(count) {
    const emojis = ['🦋', '🦋', '✨', '💜', '🌸'];
    const cx = window.innerWidth  / 2;
    const cy = window.innerHeight / 2;
    for (let i = 0; i < count; i++) {
      const b = document.createElement('div');
      b.className = 'butterfly';
      const angle = Math.random() * Math.PI * 2;
      const dist  = 80 + Math.random() * 200;
      b.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      b.style.cssText = `
        left:${cx}px; top:${cy}px;
        --bf-tx:${(Math.cos(angle)*dist).toFixed(0)}px;
        --bf-ty:${(-80 - Math.random()*180).toFixed(0)}px;
        --bf-rot:${(Math.random()*60-30).toFixed(0)}deg;
        --bf-dur:${(2+Math.random()*2).toFixed(1)}s;
        --bf-del:${(Math.random()*0.5).toFixed(2)}s;
        font-size:${(16+Math.random()*18).toFixed(0)}px;
      `;
      bfContainer.appendChild(b);
      setTimeout(() => b.remove(), 4500);
    }
  }

  /* ── Spawn paper bits ── */
  function spawnPaperBits(count) {
    const colors = ['rgba(233,213,255,0.8)','rgba(253,230,138,0.7)','rgba(196,181,253,0.8)','rgba(255,255,255,0.7)'];
    const cx = window.innerWidth  / 2;
    const cy = window.innerHeight / 2;
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'paper-bit';
      const angle = Math.random() * Math.PI * 2;
      const dist  = 60 + Math.random() * 160;
      p.style.cssText = `
        left:${cx}px; top:${cy - 40}px;
        --pb-col:${colors[Math.floor(Math.random()*colors.length)]};
        --pb-tx:${(Math.cos(angle)*dist).toFixed(0)}px;
        --pb-ty:${(-60-Math.random()*160).toFixed(0)}px;
        --pb-rot:${(Math.random()*360).toFixed(0)}deg;
        --pb-dur:${(1.5+Math.random()*1.5).toFixed(1)}s;
        --pb-del:${(Math.random()*0.4).toFixed(2)}s;
        width:${(8+Math.random()*14).toFixed(0)}px;
        height:${(6+Math.random()*10).toFixed(0)}px;
        border-radius:${Math.random()>0.5?'50%':'2px'};
      `;
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 3500);
    }
  }

})();
