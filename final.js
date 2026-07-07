/* ═══════════════════════════════════════════
   FINAL SCENE — final.js
   Peaceful cinematic birthday ending
   No buttons. No navigation. Just feelings.
═══════════════════════════════════════════ */
(function () {
  'use strict';

  /* ════════════════════════════════════
     HELPERS
  ════════════════════════════════════ */
  function rand(a, b)    { return a + Math.random() * (b - a); }
  function randInt(a, b) { return Math.floor(rand(a, b)); }
  function delay(ms)     { return new Promise(r => setTimeout(r, ms)); }

  /* ════════════════════════════════════
     BUILD FAIRY LIGHTS
  ════════════════════════════════════ */
  function buildLights() {
    const el     = document.getElementById('fairy-lights');
    const colors = ['#ff6b9d','#ffd700','#a78bfa','#67e8f9','#fb923c','#c084fc','#86efac'];
    const n      = Math.max(10, Math.round(window.innerWidth / 50));
    for (let i = 0; i < n; i++) {
      const b = document.createElement('div');
      b.className = 'bulb';
      const c = colors[i % colors.length];
      b.style.cssText = `--bc:${c};background:${c};--bd:${rand(2,5).toFixed(1)}s;animation-delay:${rand(0,2.5).toFixed(2)}s`;
      el.appendChild(b);
    }
  }

  /* ════════════════════════════════════
     BUILD STARS
  ════════════════════════════════════ */
  function buildStars() {
    const el = document.getElementById('stars');
    for (let i = 0; i < 70; i++) {
      const s  = document.createElement('div');
      const sz = rand(1.2, 3.2).toFixed(1) + 'px';
      s.className = 'star';
      s.style.cssText = `
        left:${rand(0,100)}%; top:${rand(0,95)}%;
        width:${sz}; height:${sz};
        --sd:${rand(2.5,7).toFixed(1)}s;
        --so:${rand(0.4,0.9).toFixed(2)};
        animation-delay:${rand(0,6).toFixed(2)}s;
      `;
      el.appendChild(s);
    }
  }

  /* ════════════════════════════════════
     BUILD PARTICLES
  ════════════════════════════════════ */
  function buildParticles() {
    const el     = document.getElementById('particles');
    const colors = [
      'rgba(167,139,250,0.55)', 'rgba(196,181,253,0.5)',
      'rgba(233,213,255,0.45)', 'rgba(251,191,36,0.3)',
      'rgba(244,114,182,0.25)',
    ];
    for (let i = 0; i < 32; i++) {
      const p  = document.createElement('div');
      const sz = rand(2.5,7).toFixed(1) + 'px';
      p.className = 'particle';
      p.style.cssText = `
        --pc:${colors[randInt(0,colors.length)]};
        --ps:${sz}; width:${sz}; height:${sz};
        left:${rand(0,100)}%;
        --pd:${rand(9,18).toFixed(1)}s;
        --pde:${rand(0,12).toFixed(1)}s;
      `;
      el.appendChild(p);
    }
  }

  /* ════════════════════════════════════
     BUILD FIREFLIES
  ════════════════════════════════════ */
  function buildFireflies() {
    const el = document.getElementById('fireflies');
    for (let i = 0; i < 18; i++) {
      const f = document.createElement('div');
      f.className = 'firefly';
      f.style.cssText = `
        left:${rand(5,92)}%; top:${rand(10,85)}%;
        --ffm:${rand(7,15).toFixed(1)}s;
        --ffmd:${rand(0,5).toFixed(1)}s;
        --ffb:${rand(1.8,4).toFixed(1)}s;
        --ffbd:${rand(0,3).toFixed(1)}s;
        --ffx1:${rand(-40,40).toFixed(0)}px; --ffy1:${rand(-30,30).toFixed(0)}px;
        --ffx2:${rand(-40,40).toFixed(0)}px; --ffy2:${rand(-30,30).toFixed(0)}px;
        --ffx3:${rand(-40,40).toFixed(0)}px; --ffy3:${rand(-30,30).toFixed(0)}px;
        --ffx4:${rand(-40,40).toFixed(0)}px; --ffy4:${rand(-30,30).toFixed(0)}px;
        width:${rand(2,5).toFixed(1)}px; height:${rand(2,5).toFixed(1)}px;
      `;
      el.appendChild(f);
    }
  }

  /* ════════════════════════════════════
     BUILD BUTTERFLIES
  ════════════════════════════════════ */
  function buildButterflies() {
    const el     = document.getElementById('butterflies');
    const emojis = ['🦋','🌸','✨','💜','🌷'];
    for (let i = 0; i < 9; i++) {
      const b = document.createElement('div');
      b.className = 'butterfly';
      b.textContent = emojis[randInt(0, emojis.length)];
      b.style.cssText = `
        left:${rand(2,90)}%; top:${rand(8,88)}%;
        --bfd:${rand(6,11).toFixed(1)}s;
        --bfdd:${rand(0,5).toFixed(1)}s;
        --bdx:${rand(-22,22).toFixed(0)}px;
        --bdy:${rand(-16,16).toFixed(0)}px;
        font-size:${rand(10,20).toFixed(0)}px;
      `;
      el.appendChild(b);
    }
  }

  /* ════════════════════════════════════
     MAIN CINEMATIC SEQUENCE
  ════════════════════════════════════ */
  async function runSequence() {
    // 0 — Build environment
    buildLights();
    buildStars();
    buildParticles();
    buildFireflies();
    buildButterflies();

    // 1 — Fade in background (from black)
    await delay(200);
    document.getElementById('final-bg').classList.add('show');
    document.getElementById('fairy-lights').classList.add('show');

    // 2 — Let atmosphere breathe for 2 seconds
    await delay(2000);

    // 3 — Show main heading
    document.getElementById('main-heading').classList.add('show');

    // 4 — Show ghost photos (1s after heading)
    await delay(1000);
    document.querySelectorAll('.ghost-photo').forEach((img, i) => {
      setTimeout(() => img.classList.add('show'), i * 400);
    });

    // 5 — Show message lines one by one (using data-delay)
    const lines = document.querySelectorAll('.msg-line');
    lines.forEach(line => {
      const d = parseInt(line.dataset.delay || 0, 10);
      setTimeout(() => line.classList.add('show'), d + 1000);
    });

    // 6 — Figure out last line delay
    let lastDelay = 0;
    lines.forEach(line => {
      const d = parseInt(line.dataset.delay || 0, 10);
      if (d > lastDelay) lastDelay = d;
    });
    const afterMsg = lastDelay + 1000 + 1400; // after last line fully in

    // 7 — Signature
    await delay(afterMsg);
    document.getElementById('signature-block').classList.add('show');

    // 8 — PS Note (3s after signature)
    await delay(3000);
    document.getElementById('ps-note').classList.add('show');

    // 9 — Button appears 5s after PS note
    await delay(5000);
    document.getElementById('last-btn-wrap').classList.add('show');

    // 10 — Button click → cinematic fade → navigate
    document.getElementById('last-btn').addEventListener('click', function(e) {
      // Ripple effect
      const btn  = this;
      const rect = btn.getBoundingClientRect();
      const rpl  = document.createElement('div');
      const size = Math.max(rect.width, rect.height);
      rpl.className = 'btn-ripple';
      rpl.style.cssText = `
        width:${size}px; height:${size}px;
        left:${e.clientX - rect.left - size/2}px;
        top:${e.clientY  - rect.top  - size/2}px;
      `;
      btn.appendChild(rpl);
      setTimeout(() => rpl.remove(), 800);

      // Fade to black after short ripple pause
      setTimeout(() => {
        document.getElementById('fade-black').classList.add('active');
        setTimeout(() => {
          window.location.href = 'flower.html';
        }, 1900);
      }, 250);
    });

    // 💜 That's it. Journey ends beautifully.
  }

  /* ════════════════════════════════════
     LOCK SCROLL
  ════════════════════════════════════ */
  document.addEventListener('touchmove', e => e.preventDefault(), { passive: false });
  document.addEventListener('wheel',     e => e.preventDefault(), { passive: false });

  /* ════════════════════════════════════
     INIT
  ════════════════════════════════════ */
  window.addEventListener('load', runSequence);

})();
