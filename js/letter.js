/* ═══════════════════════════════════════════
   LETTER SCENE — letter.js
   Envelope opening + typewriter letter
═══════════════════════════════════════════ */
(function () {
  'use strict';

  /* ════════════════════════════════════
     LETTER TEXT — exact, do not modify
  ════════════════════════════════════ */
  const LETTER = `Heyyy yooo...

Sbse pehle...

Happy Happyy Birthday Baunii!! 🤍

Pta hai... mujhe honestly nhi pta ye webpage tujhe kaisi lagi hogi Syd achhi lagi hogi... syd kharab even tujhe lga hoga "ye pgl itni mehnat kyun kr raha tha?" 😂

Pr jo bhi ho

Bs ek hi intention tha..

Tuu Happy hoo jayee orr smile karee bss 

Sach bolun to is webpage ke liye mere dimaag me bht saare ideas aaye the Kuch implement hi nhi kr paya kuch time ki wajah se reh gaye kuch confusion... pta nhi kya kya. 😭

Kabhi kuch error aa jata

Kabhi kuch kaam hi nhi kr raha tha

Kabhi ek cheez thik krta tha toh dusri kharab ho jaati thi 😭

But jaise taise krke complete kr hi diya

Bs tu smile kar dioo...

I'll be happy. 🤍

Ykw...

Jb BYJU'S ke time hamara group bana tha na

Tb maine kabhi imagine bhi nhi kiya tha ki hum itne acche dost bn jayenge

Orr haan...

Ek orr baat 😂

Jb maine tujhe pehli baar text kiya tha na

Mai literally darr raha tha

Har message bhejne se pehle do teen baar padhta tha ki kahi kuch galat na bol du

Reply aane tk alag hi tension thinking rehti thi 😭 pta nhi kyunn

Aaj sochta hu toh bht hasi aati h ki kisse dartaa thaa mai

Yeaa Baunii... isse darun mai? 😂

But anyways

Chhotuu Donn on top 🙇🏻

And wohh BYJU'S wala group hahhaa

It was one of the best things that happened

Thannk youu yaar...

Sachii me

Thank you so much. 🤍

Orr tohh Mai waise hi apni problems kisi ko easily batata nhi hu

Pta nhi kyun 😭

Shyd mujhe apni feelings express krna kabhi properly aaya hi nhi I don't know

Tere se itna close hu...

But sb kuch andar hi rakhta rehta hu tujhe bhi nhi bta pata

Mann krta hai sb bataun...

but again wahii nhi krr pata 

but phir bhi uss time maine jitna bhi jo bhi bataya

Tune meri baat suni

Thank youu Sooo Muchh Yarr

literally Thenkuuu 🤍

And tuu bhi bataya krr

Kuch bhi ho kuchhh bhii 

huu maii sunne ke liye

Orr ek cheez...

SORRRYY Yaarrr 😭

Agr maine kabhi tujhe hurt kiya ho

Yaa kabhi meri kisi baat se tujhe bura laga ho

Yaa maine unknowingly kuch glt kiya ho

Yaa kuch glt bol diya ho

Tohh genuinely...

I'm really Sorry 😭

Orr haan

Hostel wali baat...

Uske liye bhi sorry yaar

Tu call karti thi...

Orr mai receive hi nhi kr pata thaa

and obviously tujhe bht bura lgta hoga

Prr believe me...

Mai ignore nhi krta tha

Mai literally so jata hu. 😭😭

Pta nhi kaise itni gehri neend aa jaati hai ki phone ring bhi nhi sunai deti

And jb subah uth ke phone check krta toh itni missed calls hoti thi

phir khud pe hi gussa aata thaa

So...

Sorry for that too 🤍

Orr haannn...

Thannk you meri itni saari bakchodi jhelne ke liye 😂

ptaa nhi ky ky boltaa

Random overthinking...

Random bakwaas...

Sb tolerate krne ke liye 😭

Bs ek hi wish hai...

Tu hamesha heppyy rahnaa Baunii

Orr please...

Jyada overthinking Nhii 😭

Bs...

Aur kya hi bolun

Pta nhii shyd bht kuch bol diya 

agr orr bola toh kahi yea site crash bhi na hoo jaye 😭

Hopefully...

Mission successful hua hoga 😭

Happy Happy Birthday once again, Baunii!! 😁🤍

Heppyy reh...

Overthinking mat kar...`;

  const SIGNATURE = ` Happy Birthday Bhondu!!😂`;

  /* ════════════════════════════════════
     HELPERS
  ════════════════════════════════════ */
  function rand(a, b) { return a + Math.random() * (b - a); }
  function randInt(a, b) { return Math.floor(rand(a, b)); }

  /* ════════════════════════════════════
     BUILD AMBIENT ENVIRONMENT
  ════════════════════════════════════ */
  function buildLights() {
    const el     = document.getElementById('fairy-lights');
    const colors = ['#ff6b9d','#ffd700','#a78bfa','#67e8f9','#fb923c','#c084fc'];
    const n      = Math.max(10, Math.round(window.innerWidth / 52));
    for (let i = 0; i < n; i++) {
      const b = document.createElement('div');
      b.className = 'bulb';
      const c = colors[i % colors.length];
      b.style.cssText = `--bc:${c};background:${c};--bd:${rand(2,5).toFixed(1)}s;animation-delay:${rand(0,2).toFixed(2)}s`;
      el.appendChild(b);
    }
  }

  function buildStars() {
    const el = document.getElementById('stars');
    for (let i = 0; i < 60; i++) {
      const s   = document.createElement('div');
      const sz  = rand(1.5, 3).toFixed(1) + 'px';
      s.className = 'star';
      s.style.cssText = `
        left:${rand(0,100)}%; top:${rand(0,90)}%;
        width:${sz}; height:${sz};
        --sd:${rand(2,6).toFixed(1)}s;
        animation-delay:${rand(0,5).toFixed(2)}s;
        opacity:${rand(0.1,0.5).toFixed(2)};
      `;
      el.appendChild(s);
    }
  }

  function buildParticles() {
    const el     = document.getElementById('particles');
    const colors = [
      'rgba(167,139,250,0.55)', 'rgba(251,191,36,0.35)',
      'rgba(233,213,255,0.5)',  'rgba(196,181,253,0.5)',
      'rgba(244,114,182,0.3)',
    ];
    for (let i = 0; i < 28; i++) {
      const p  = document.createElement('div');
      const sz = rand(3,7).toFixed(1) + 'px';
      p.className = 'particle';
      p.style.cssText = `
        --pc:${colors[randInt(0,colors.length)]};
        --ps:${sz}; width:${sz}; height:${sz};
        left:${rand(0,100)}%;
        --pd:${rand(8,16).toFixed(1)}s;
        --pde:${rand(0,10).toFixed(1)}s;
      `;
      el.appendChild(p);
    }
  }

  function buildButterflies() {
    const el     = document.getElementById('butterflies');
    const emojis = ['🦋','🌸','✨','💜','🌷','⭐'];
    for (let i = 0; i < 8; i++) {
      const b = document.createElement('div');
      b.className = 'butterfly';
      b.textContent = emojis[randInt(0, emojis.length)];
      b.style.cssText = `
        left:${rand(3,90)}%; top:${rand(8,85)}%;
        --bfd:${rand(4,9).toFixed(1)}s;
        --bdx:${rand(-20,20).toFixed(0)}px;
        --bdy:${rand(-15,15).toFixed(0)}px;
        animation-delay:${rand(0,4).toFixed(1)}s;
        font-size:${rand(10,20).toFixed(0)}px;
      `;
      el.appendChild(b);
    }
  }

  /* ════════════════════════════════════
     ENVELOPE SIZING — CSS vars
  ════════════════════════════════════ */
  function sizeEnvelope() {
    const env = document.getElementById('envelope');
    const w   = env.offsetWidth;
    const h   = env.offsetHeight;
    const half_w = Math.ceil(w / 2);
    const half_h = Math.ceil(h / 2);
    document.documentElement.style.setProperty('--ew', w + 'px');
    document.documentElement.style.setProperty('--eh', half_h + 'px');
    document.documentElement.style.setProperty('--ew2', half_w + 'px');
  }

  /* ════════════════════════════════════
     ENVELOPE OPEN SEQUENCE
  ════════════════════════════════════ */
  let opened = false;

  function openEnvelope() {
    if (opened) return;
    opened = true;

    const envelope   = document.getElementById('envelope');
    const flap       = document.getElementById('env-flap');
    const seal       = document.getElementById('wax-seal');
    const tapText    = document.getElementById('env-tap');
    const envStage   = document.getElementById('envelope-stage');
    const sparkWrap  = document.getElementById('seal-sparkles');

    // 1. Lift envelope
    envelope.classList.remove('opening');
    void envelope.offsetWidth;
    envelope.classList.add('opening');
    envelope.style.cursor = 'default';

    // 2. Break seal with sparkles
    setTimeout(() => {
      seal.classList.add('break');
      spawnSealSparkles(sparkWrap);
      if (tapText) tapText.style.opacity = '0';
    }, 300);

    // 3. Open flap
    setTimeout(() => {
      flap.classList.add('open');
    }, 700);

    // 4. Fade out envelope, show letter
    setTimeout(() => {
      envStage.classList.add('hide');
    }, 1600);

    setTimeout(() => {
      document.getElementById('letter-stage').classList.add('show');
      startTypewriter();
    }, 2100);
  }

  function spawnSealSparkles(wrap) {
    const emojis = ['✨','⭐','💫','✦','💜'];
    const cx = wrap.offsetWidth  / 2;
    const cy = wrap.offsetHeight / 2;
    for (let i = 0; i < 14; i++) {
      const sp    = document.createElement('div');
      sp.className = 'seal-spark';
      const angle = Math.random() * Math.PI * 2;
      const dist  = rand(40, 120);
      sp.textContent = emojis[randInt(0, emojis.length)];
      sp.style.cssText = `
        left:${cx}px; top:${cy}px;
        --ss-tx:${(Math.cos(angle)*dist).toFixed(0)}px;
        --ss-ty:${(Math.sin(angle)*dist - 30).toFixed(0)}px;
        --ss-dur:${rand(0.7,1.4).toFixed(1)}s;
        --ss-del:${rand(0,0.3).toFixed(2)}s;
        font-size:${randInt(10,20)}px;
      `;
      wrap.appendChild(sp);
      setTimeout(() => sp.remove(), 1800);
    }
  }

  /* ════════════════════════════════════
     TYPEWRITER
  ════════════════════════════════════ */
  function startTypewriter() {
    const el = document.getElementById('letter-body');
    const paper = document.getElementById('letter-paper');
    el.textContent = '';
    let i = 0;

    // Speed: fast enough to feel alive, slow enough to feel handwritten
    const BASE_SPEED = 18;

    function tick() {
      if (i < LETTER.length) {
        const ch = LETTER[i];
        el.textContent += ch;
        i++;

        // Auto-scroll paper as text grows
        paper.scrollTop = paper.scrollHeight;

        // Natural pauses: longer at newlines, medium at punctuation
        let delay = BASE_SPEED + rand(-5, 10);
        if (ch === '\n') {
          delay = rand(120, 280);
        } else if (['.', '!', '?', '…'].includes(ch)) {
          delay = rand(80, 160);
        } else if ([',', ';', ':'].includes(ch)) {
          delay = rand(40, 80);
        }

        setTimeout(tick, delay);
      } else {
        // Typing done
        el.classList.add('done');
        setTimeout(showSignature, 1200);
      }
    }

    tick();
  }

  /* ════════════════════════════════════
     SIGNATURE + FINAL
  ════════════════════════════════════ */
  function showSignature() {
    const sigWrap = document.getElementById('signature-wrap');
    const sigEl   = document.getElementById('signature');
    const heart   = document.getElementById('sig-heart');
    const btnWrap = document.getElementById('final-btn-wrap');
    const paper   = document.getElementById('letter-paper');

    // Slide in signature wrap
    sigWrap.classList.add('show');

    // Typewrite signature
    setTimeout(() => {
      sigEl.textContent = SIGNATURE;
      sigEl.classList.add('drawn');

      // Scroll to show signature
      paper.scrollTop = paper.scrollHeight;

      // Beating heart
      setTimeout(() => {
        heart.classList.add('show');
        paper.scrollTop = paper.scrollHeight;

        // Final button
        setTimeout(() => {
          btnWrap.classList.add('show');
          paper.scrollTop = paper.scrollHeight;
        }, 900);
      }, 700);
    }, 300);
  }

  /* ════════════════════════════════════
     FINAL BUTTON — navigate
  ════════════════════════════════════ */
  function setupFinalBtn() {
    const btn = document.getElementById('final-btn');

    // Create fade overlay
    const fade = document.createElement('div');
    fade.id = 'page-fade';
    document.body.appendChild(fade);

    btn.addEventListener('click', () => {
      fade.classList.add('active');
      setTimeout(() => {
        window.location.href = 'final.html';
      }, 1100);
    });
  }

  /* ════════════════════════════════════
     ENVELOPE CLICK
  ════════════════════════════════════ */
  function setupEnvelope() {
    const envelope = document.getElementById('envelope');
    envelope.addEventListener('click', openEnvelope);
    envelope.addEventListener('touchend', (e) => {
      e.preventDefault();
      openEnvelope();
    });
  }

  /* ════════════════════════════════════
     INIT
  ════════════════════════════════════ */
  window.addEventListener('load', () => {
    // Build atmosphere
    buildLights();
    buildStars();
    buildParticles();
    buildButterflies();
    setupEnvelope();
    setupFinalBtn();

    // Resize envelope triangles
    sizeEnvelope();
    window.addEventListener('resize', sizeEnvelope);

    // Fade in background
    setTimeout(() => {
      document.getElementById('scene-bg').classList.add('show');
    }, 100);

    // Show fairy lights
    setTimeout(() => {
      document.getElementById('fairy-lights').classList.add('show');
    }, 200);

    // Slide in envelope after 1s
    setTimeout(() => {
      document.getElementById('envelope-stage').classList.add('show');
    }, 1000);
  });

  /* Lock scroll everywhere EXCEPT letter paper */
  document.addEventListener('touchmove', (e) => {
    const paper = document.getElementById('letter-paper');
    if (paper && paper.contains(e.target)) return; // allow scroll inside paper
    e.preventDefault();
  }, { passive: false });
  document.addEventListener('wheel', (e) => {
    const paper = document.getElementById('letter-paper');
    if (paper && paper.contains(e.target)) return;
    e.preventDefault();
  }, { passive: false });

})();
