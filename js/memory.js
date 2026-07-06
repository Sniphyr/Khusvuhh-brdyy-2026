/* ═══════════════════════════════════════
   MEMORY WALL — memory.js
   Cinematic scrapbook reveal sequence
═══════════════════════════════════════ */
(function () {
  'use strict';

  /* ════════════════════════════════════
     CONFIG — memories & timings
  ════════════════════════════════════ */
  const MEMORIES = [
    {
      id      : 'slot-1',
      src     : './1.png',
      caption : 'Once upon a time... a little princess was born. 👶🎂',
      tape    : 'top-left',
      clip    : 'right',
      startDelay: 2200,   // ms after entry glow fades
      flyFrom : { x: 0,    y: 200,   rot: -15 },
      landRot : -2,
      hoverRot: -3,
      sparkles: true,
    },
    {
      id      : 'slot-2',
      src     : './2.png',
      caption : 'Partners in crime since day one. ❤️',
      tape    : 'top-right',
      clip    : 'left',
      startDelay: 3600,
      flyFrom : { x: 200,  y: 150,   rot: 12 },
      landRot : 2,
      hoverRot: 3,
      sparkles: true,
    },
    {
      id      : 'slot-3',
      src     : './3.png',
      caption : 'Elegance never goes out of style. 🖤',
      tape    : 'bottom-left',
      clip    : 'top',
      startDelay: 4200,
      flyFrom : { x: -200, y: -80,   rot: -8 },
      landRot : -1.5,
      hoverRot: -2,
      sparkles: true,
      purpleGlow: true,
    },
    {
      id      : 'slot-4',
      src     : './4.png',
      caption : 'Cuteness level: 999+ 😼💜',
      tape    : 'bottom-right',
      clip    : 'right',
      startDelay: 5800,
      flyFrom : { x: 100,  y: -150,  rot: 18 },
      landRot : 1.5,
      hoverRot: 2,
      sparkles: true,
      hearts  : true,
    },
  ];

  const LETTER_TEXT =
`Every picture tells a story...

But the best memories are
still waiting to happen.

Happy Birthday 💜`;

  /* ════════════════════════════════════
     BUILD AMBIENT ENVIRONMENT
  ════════════════════════════════════ */
  buildLights();
  buildStars();
  buildParticles();
  buildAmbientButterflies();

  function buildLights() {
    const container = document.getElementById('mem-lights');
    const colors = ['#ff6b9d','#ffd700','#a78bfa','#67e8f9','#fb923c','#86efac'];
    const count  = Math.max(10, Math.round(window.innerWidth / 52));
    for (let i = 0; i < count; i++) {
      const b = document.createElement('div');
      b.className = 'mem-bulb';
      const c = colors[i % colors.length];
      b.style.cssText = `--mbc:${c};background:${c};--mbd:${(2+Math.random()*3).toFixed(1)}s;animation-delay:${(Math.random()*2).toFixed(2)}s`;
      container.appendChild(b);
    }
  }

  function buildStars() {
    const el = document.getElementById('mem-stars');
    for (let i = 0; i < 55; i++) {
      const s = document.createElement('div');
      s.className = 'mem-star';
      s.style.cssText = `left:${Math.random()*100}%;top:${Math.random()*85}%;--msd:${(2+Math.random()*5).toFixed(1)}s;animation-delay:${(Math.random()*5).toFixed(2)}s;opacity:${(0.1+Math.random()*0.5).toFixed(2)};width:${Math.random()>0.7?'3px':'2px'};height:${Math.random()>0.7?'3px':'2px'}`;
      el.appendChild(s);
    }
  }

  function buildParticles() {
    const el = document.getElementById('mem-particles');
    const colors = ['rgba(167,139,250,0.55)','rgba(251,191,36,0.4)','rgba(233,213,255,0.5)','rgba(196,181,253,0.5)'];
    for (let i = 0; i < 25; i++) {
      const p = document.createElement('div');
      p.className = 'mem-spark';
      const sz = (3+Math.random()*5).toFixed(1)+'px';
      p.style.cssText = `--msc:${colors[Math.floor(Math.random()*colors.length)]};--mss:${sz};width:${sz};height:${sz};left:${Math.random()*100}%;--msf:${(8+Math.random()*10).toFixed(1)}s;--msfd:${(Math.random()*10).toFixed(1)}s`;
      el.appendChild(p);
    }
  }

  function buildAmbientButterflies() {
    const el = document.getElementById('mem-butterflies');
    const emojis = ['🦋','🌸','✨','💜','🌷'];
    for (let i = 0; i < 7; i++) {
      const b = document.createElement('div');
      b.className = 'mem-butterfly';
      b.textContent = emojis[Math.floor(Math.random()*emojis.length)];
      const dx = (Math.random()*40-20).toFixed(0);
      const dy = (Math.random()*30-15).toFixed(0);
      b.style.cssText = `
        left:${5+Math.random()*88}%;
        top:${10+Math.random()*75}%;
        --mbfd:${(4+Math.random()*5).toFixed(1)}s;
        --mbdx:${dx}px; --mbdy:${dy}px;
        animation-delay:${(Math.random()*4).toFixed(1)}s;
        font-size:${(10+Math.random()*14).toFixed(0)}px;
        opacity:0;
        transition:opacity 2s ease;
      `;
      el.appendChild(b);
    }
  }

  /* ════════════════════════════════════
     PAPER CLIP SVG helper
  ════════════════════════════════════ */
  function makeClipSVG(color) {
    return `<svg class="clip-svg" viewBox="0 0 24 50" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2 C6 2, 2 6, 2 12 L2 42 C2 46, 6 50, 10 50 C14 50, 18 46, 18 42 L18 14 C18 10, 15 7, 12 7 C9 7, 6 10, 6 14 L6 38 C6 40, 8 42, 10 42 C12 42, 14 40, 14 38 L14 16"
        stroke="${color}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    </svg>`;
  }

  /* ════════════════════════════════════
     MAIN SEQUENCE
  ════════════════════════════════════ */
  window.addEventListener('load', runSequence);

  function runSequence() {
    const entryGlow = document.getElementById('entry-glow');

    // 1. Fade out entry golden glow
    setTimeout(() => {
      entryGlow.classList.add('faded');
    }, 200);

    // 2. Show lights after glow fades
    setTimeout(() => {
      document.getElementById('mem-lights').classList.add('show');
      // Show ambient butterflies
      document.querySelectorAll('.mem-butterfly').forEach(b => {
        b.style.opacity = '0.55';
      });
      // Show decorations
      document.querySelectorAll('.sb-deco').forEach(d => d.classList.add('show'));
    }, 1400);

    // 3. Fly in each memory in sequence
    MEMORIES.forEach(mem => {
      setTimeout(() => {
        revealMemory(mem);
      }, mem.startDelay);
    });

    // 4. After all memories, show letter
    const lastDelay = MEMORIES[MEMORIES.length - 1].startDelay + 2200;
    setTimeout(() => {
      document.getElementById('next-btn').classList.add('show');
      document.getElementById('next-btn').addEventListener('click', () => {
    document.getElementById('next-btn').style.display = 'none';
    showFinalLetter();
});

    }, lastDelay);
  }

  /* ════════════════════════════════════
     REVEAL SINGLE MEMORY
  ════════════════════════════════════ */
  function revealMemory(mem) {
    const slot = document.getElementById(mem.id);
    if (!slot) return;

    // Build polaroid DOM
    const polaroid = document.createElement('div');
    polaroid.className = 'polaroid';
    polaroid.style.setProperty('--ph-rot', mem.hoverRot + 'deg');

    const img = document.createElement('img');
    img.src = mem.src;
    img.alt = mem.caption;
    img.loading = 'eager';

    const caption = document.createElement('p');
    caption.className = 'polaroid-caption';
    caption.textContent = mem.caption;

    polaroid.appendChild(img);
    polaroid.appendChild(caption);

    // Washi tape
    const washi = document.createElement('div');
    washi.className = `washi washi--${mem.tape}`;
    polaroid.appendChild(washi);

    // Paper clip
    const clipWrap = document.createElement('div');
    clipWrap.className = `paper-clip paper-clip--${mem.clip}`;
    const clipColors = { right:'#9ca3af', left:'#6b7280', top:'#a78bfa' };
    clipWrap.innerHTML = makeClipSVG(clipColors[mem.clip] || '#9ca3af');
    polaroid.appendChild(clipWrap);

    // Set CSS vars for fly-in
    const cx = window.innerWidth  / 2;
    const cy = window.innerHeight / 2;
    polaroid.style.setProperty('--fly-sx', mem.flyFrom.x + 'px');
    polaroid.style.setProperty('--fly-sy', mem.flyFrom.y + 'px');
    polaroid.style.setProperty('--fly-sr', mem.flyFrom.rot + 'deg');
    polaroid.style.setProperty('--fly-er', mem.landRot + 'deg');
    polaroid.style.setProperty('--fly-dur', '1.3s');
    polaroid.style.setProperty('--fly-del', '0s');

    slot.appendChild(polaroid);

    // Trigger fly-in animation
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        slot.style.opacity = '1';
        slot.classList.add('flying');
      });
    });

    // Purple glow effect for memory 3
    if (mem.purpleGlow) {
      setTimeout(() => {
        polaroid.style.boxShadow = '0 0 30px rgba(139,92,246,0.6), 0 4px 16px rgba(0,0,0,0.35)';
        setTimeout(() => {
          polaroid.style.boxShadow = '';
        }, 1500);
      }, 800);
    }

    // Sparkles trail
    if (mem.sparkles) {
      setTimeout(() => spawnMemSparkles(slot), 200);
    }

    // Purple hearts for memory 4
    if (mem.hearts) {
      setTimeout(() => spawnHearts(slot), 500);
    }
  }

  /* ── Spawn sparkles around a slot ── */
  function spawnMemSparkles(slot) {
    const rect   = slot.getBoundingClientRect();
    const cx     = rect.left + rect.width  / 2;
    const cy     = rect.top  + rect.height / 2;
    const emojis = ['✨','⭐','💫','✦'];
    const colors = ['#a78bfa','#fbbf24','#e9d5ff','#c4b5fd'];

    for (let i = 0; i < 12; i++) {
      const sp = document.createElement('div');
      sp.className = 'mem-sparkle';
      const angle = Math.random() * Math.PI * 2;
      const dist  = 30 + Math.random() * 80;
      sp.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      sp.style.cssText = `
        left:${cx}px; top:${cy}px;
        --msp-tx:${(Math.cos(angle)*dist).toFixed(0)}px;
        --msp-ty:${(Math.sin(angle)*dist - 60).toFixed(0)}px;
        --msp-dur:${(0.9+Math.random()*0.8).toFixed(1)}s;
        --msp-del:${(Math.random()*0.4).toFixed(2)}s;
        font-size:${(10+Math.random()*12).toFixed(0)}px;
      `;
      document.body.appendChild(sp);
      setTimeout(() => sp.remove(), 2000);
    }
  }

  /* ── Spawn floating hearts ── */
  function spawnHearts(slot) {
    const rect = slot.getBoundingClientRect();
    const cx   = rect.left + rect.width  / 2;
    const cy   = rect.top  + rect.height / 2;

    for (let i = 0; i < 10; i++) {
      const h = document.createElement('div');
      h.className = 'mem-heart';
      h.textContent = '💜';
      const tx = (Math.random() * 120 - 60).toFixed(0);
      const ty = -(50 + Math.random() * 80);
      h.style.cssText = `
        left:${cx + (Math.random()*60-30)}px;
        top:${cy}px;
        --hp-tx:${tx}px;
        --hp-ty:${ty}px;
        --hp-dur:${(1.2+Math.random()*1).toFixed(1)}s;
        --hp-del:${(Math.random()*0.5).toFixed(2)}s;
      `;
      document.body.appendChild(h);
      setTimeout(() => h.remove(), 3000);
    }
  }

  /* ════════════════════════════════════
     FINAL LETTER & TYPEWRITER
  ════════════════════════════════════ */
  function showFinalLetter() {
    const letter  = document.getElementById('final-letter');
    const textEl  = document.getElementById('letter-text');
    const heartEl = document.getElementById('heart-beat');
    const btn     = document.getElementById('continue-btn');

    letter.classList.add('show');

    // Typewriter effect — starts after letter slides in
    setTimeout(() => {
      typeWrite(textEl, LETTER_TEXT, 38, () => {
        textEl.classList.add('done');

        // Show beating heart
        setTimeout(() => {
          heartEl.classList.add('show');

          // Show continue button
          setTimeout(() => {
            btn.classList.add('show');
          }, 700);
        }, 400);
      });
    }, 800);

    // Continue button click
    btn.addEventListener('click', function (e) {
      // Ripple
      const ripple = document.getElementById('btn-ripple');
      const rect   = btn.getBoundingClientRect();
      ripple.style.cssText = `
        width: ${rect.width}px;
        height: ${rect.width}px;
        left: ${rect.left + rect.width/2 - rect.width/2}px;
        top:  ${rect.top  + rect.height/2 - rect.width/2}px;
      `;
      ripple.classList.remove('rippling');
      void ripple.offsetWidth;
      ripple.classList.add('rippling');

      // Navigate
      setTimeout(() => {
        // Fade out the whole page
        document.body.style.transition = 'opacity 0.8s ease';
        document.body.style.opacity = '0';
        setTimeout(() => {
          window.location.href = 'chocolate.html';
        }, 900);
      }, 200);
    });
  }

  /* ── Typewriter helper ── */
  function typeWrite(el, text, speed, onDone) {
    el.textContent = '';
    let i = 0;
    function tick() {
      if (i < text.length) {
        el.textContent += text[i];
        i++;
        setTimeout(tick, speed + Math.random() * 30 - 15);
      } else {
        if (onDone) onDone();
      }
    }
    tick();
  }

})();
