  'use strict';

  /* ── Fairy Lights ── */
  const lightsContainer = document.getElementById('fairy-lights');
  const colors = ['#ff6b9d','#ffd700','#9b59f5','#4fc3f7','#ff9500','#a8e063'];
  const count = Math.round(window.innerWidth / 55);
  for(let i=0;i<count;i++){
    const b = document.createElement('div');
    b.className = 'bulb';
    const col = colors[i%colors.length];
    b.style.cssText = `--col:${col};background:${col};--dur:${(2+Math.random()*3).toFixed(1)}s;animation-delay:${(Math.random()*2).toFixed(2)}s`;
    lightsContainer.appendChild(b);
  }

  /* ── Stars ── */
  const starsEl = document.getElementById('stars');
  for(let i=0;i<60;i++){
    const s = document.createElement('div');
    s.className = 'star';
    s.style.cssText = `left:${Math.random()*100}%;top:${Math.random()*80}%;--sd:${(2+Math.random()*5).toFixed(1)}s;animation-delay:${(Math.random()*4).toFixed(2)}s;opacity:${(0.2+Math.random()*0.7).toFixed(2)}`;
    starsEl.appendChild(s);
  }

  /* ── Particles ── */
  const particleEl = document.getElementById('particles');
  const pColors = ['rgba(180,120,255,0.5)','rgba(245,200,70,0.4)','rgba(255,180,220,0.4)','rgba(120,200,255,0.35)'];
  for(let i=0;i<28;i++){
    const p = document.createElement('div');
    p.className = 'particle';
    const sz = (3+Math.random()*5).toFixed(1)+'px';
    p.style.cssText = `--pc:${pColors[Math.floor(Math.random()*pColors.length)]};--ps:${sz};width:${sz};height:${sz};--pd:${(6+Math.random()*10).toFixed(1)}s;left:${Math.random()*100}%;animation-delay:${(Math.random()*10).toFixed(1)}s`;
    particleEl.appendChild(p);
  }

  /* ── Balloons ── */
  const balloonEl = document.getElementById('balloons');
  const balloonData = [
    {col:'#9b30ff',l:'4vw',t:'8vh',sw:'3.8s'},
    {col:'#f5c842',l:'10vw',t:'16vh',sw:'4.5s'},
    {col:'#ff6b9d',l:'82vw',t:'8vh',sw:'3.2s'},
    {col:'#4fc3f7',l:'88vw',t:'18vh',sw:'5s'},
  ];
  balloonData.forEach(bd=>{
    const b = document.createElement('div');
    b.className = 'balloon';
    b.style.cssText = `background:${bd.col};left:${bd.l};top:${bd.t};--bsw:${bd.sw};box-shadow:0 0 20px ${bd.col}88,0 0 40px ${bd.col}44;`;
    balloonEl.appendChild(b);
  });

  /* ══════════════════════════════════════
     TYPEWRITER ENTRANCE SEQUENCE
  ══════════════════════════════════════ */
  function typeWriter(el, text, speed, onDone) {
    el.textContent = '';
    // add blinking cursor
    const cursor = document.createElement('span');
    cursor.className = 'type-cursor';
    el.appendChild(cursor);
    let i = 0;
    function tick() {
      if (i < text.length) {
        el.insertBefore(document.createTextNode(text[i]), cursor);
        i++;
        // slight random speed variation for natural feel
        setTimeout(tick, speed + Math.random() * 40 - 20);
      } else {
        // remove cursor after done (or keep for heading)
        if (onDone) {
          setTimeout(() => {
            if (cursor.parentNode) cursor.parentNode.removeChild(cursor);
            onDone();
          }, 320);
        }
      }
    }
    tick();
  }

  function runEntrance() {
    const headingEl   = document.getElementById('heading');
    const subtitleEl  = document.getElementById('subtitle');
    const hintEl      = document.getElementById('candle-hint');
    const cakeSec     = document.getElementById('cake-section');

    // Step 1 — type heading after short pause
    setTimeout(() => {
      typeWriter(headingEl, '🎂 Wish Maangg!!', 68, () => {

        // Step 2 — subtitle fades visible then types
        subtitleEl.classList.add('visible');
        setTimeout(() => {
          typeWriter(subtitleEl, 'Every birthday deserves a little magic. 💜', 45, () => {

            // Step 3 — candle hint fades in
            setTimeout(() => {
              hintEl.classList.add('visible');

              // Step 4 — cake slides up beautifully
              setTimeout(() => {
                cakeSec.classList.add('entered');
              }, 500);

            }, 200);
          });
        }, 200);
      });
    }, 400);
  }

  // Kick off entrance on load
  window.addEventListener('load', runEntrance);

  /* ── State ── */
  let wished = false;
  let kitkatClicked = false;

  /* ── Candle click ── */
  document.getElementById('flame-wrap').addEventListener('click', function(){
    if(wished) return;
    wished = true;
    blowOutCandle();
  });

  function blowOutCandle(){
    document.getElementById('flame').classList.add('out');
    const hint = document.getElementById('candle-hint');
    hint.style.transition = 'opacity 0.6s';
    hint.style.opacity = '0';

    const smoke = document.getElementById('smoke');
    setTimeout(()=>{ smoke.classList.add('show'); },500);
    setTimeout(()=>{ smoke.classList.remove('show'); },2200);

    const bg = document.getElementById('bg');
    setTimeout(()=>{ bg.classList.add('dim'); },600);
    setTimeout(()=>{ bg.classList.remove('dim'); },1600);

    setTimeout(()=>{ document.getElementById('fairy-lights').classList.add('bright'); },1400);

    const cakeSec = document.getElementById('cake-section');
    setTimeout(()=>{
      cakeSec.style.animation = 'none';
      cakeSec.classList.add('bounce');
      cakeSec.addEventListener('animationend', ()=>{
        cakeSec.classList.remove('bounce');
        cakeSec.style.animation = '';
      }, {once:true});
    },1600);

    setTimeout(()=>{ launchConfetti(); },1800);
    setTimeout(()=>{ launchSparkles(); },2000);

    setTimeout(()=>{
      document.querySelectorAll('.balloon').forEach(b=>{
        b.style.animationDelay = (Math.random()*0.5)+'s';
        b.classList.add('float-up');
      });
    },2200);

    setTimeout(()=>{ document.getElementById('wish-msg').classList.add('show'); },2600);
    setTimeout(()=>{ launchHearts(); },2800);
    setTimeout(()=>{ document.getElementById('kitkat-modal').classList.add('show'); },3800);
  }

  /* ── Confetti ── */
  function launchConfetti(){
    const container = document.getElementById('confetti-container');
    const confettiColors = ['#f5c842','#9b30ff','#ff6b9d','#4fc3f7','#a8e063','#ff9500','#fff'];
    for(let i=0;i<90;i++){
      const c = document.createElement('div');
      c.className = 'confetto';
      const fromLeft = i<45;
      c.style.cssText = `
        left:${fromLeft?(-5+Math.random()*25)+'%':(75+Math.random()*30)+'%'};
        top:${(-10-Math.random()*30)+'%'};
        --cf-col:${confettiColors[Math.floor(Math.random()*confettiColors.length)]};
        --cf-dur:${(1.8+Math.random()*1.8).toFixed(1)}s;
        --cf-del:${(Math.random()*0.8).toFixed(2)}s;
        --cf-rot:${(360+Math.random()*720).toFixed(0)}deg;
        --cf-r:${Math.random()>0.5?'50%':'2px'};
        width:${(6+Math.random()*8).toFixed(0)}px;
        height:${(6+Math.random()*8).toFixed(0)}px;
        transform:translateX(${fromLeft?'':'-'}${(Math.random()*200).toFixed(0)}px) translateY(${(Math.random()*80).toFixed(0)}px);
      `;
      container.appendChild(c);
      setTimeout(()=>{ if(c.parentNode) c.parentNode.removeChild(c); },3500);
    }
  }

  /* ── Sparkles ── */
  function launchSparkles(){
    const container = document.getElementById('sparkle-container');
    const sparkleColors = ['#f5c842','#e08cff','#fff','#ffcc00','#cc80ff'];
    for(let i=0;i<40;i++){
      const s = document.createElement('div');
      s.className = 'sparkle';
      s.style.cssText = `
        left:${35+Math.random()*30}%;top:${30+Math.random()*40}%;
        --sp-col:${sparkleColors[Math.floor(Math.random()*sparkleColors.length)]};
        --sp-dur:${(0.8+Math.random()*1.2).toFixed(1)}s;
        --sp-del:${(Math.random()*1).toFixed(2)}s;
        --sp-dx:${(Math.random()*120-60).toFixed(0)}px;
        --sp-dy:${(-40-Math.random()*80).toFixed(0)}px;
        width:${(5+Math.random()*10).toFixed(0)}px;
        height:${(5+Math.random()*10).toFixed(0)}px;
      `;
      container.appendChild(s);
      setTimeout(()=>{ if(s.parentNode) s.parentNode.removeChild(s); },2500);
    }
  }

  /* ── Floating Hearts ── */
  function launchHearts(){
    const emojis = ['💜','✨','⭐','💫','🌟'];
    for(let i=0;i<12;i++){
      const h = document.createElement('div');
      h.className = 'float-heart';
      h.textContent = emojis[Math.floor(Math.random()*emojis.length)];
      h.style.cssText = `left:${10+Math.random()*80}%;bottom:${10+Math.random()*40}%;--hd:${(Math.random()*1.5).toFixed(2)}s`;
      document.body.appendChild(h);
      setTimeout(()=>{ if(h.parentNode) h.parentNode.removeChild(h); },4000);
    }
  }

  /* ── KitKat unwrap ── */
  document.getElementById('kitkat-illus').addEventListener('click', function(){
    if(kitkatClicked) return;
    kitkatClicked = true;
    document.getElementById('kitkat-hint').style.display = 'none';
    document.getElementById('kitkat-text').style.display = 'none';
    document.getElementById('wrapper-reveal').classList.add('open');
    setTimeout(()=>{ document.getElementById('continue-btn').classList.add('show'); },500);
  });

  /* ── Continue ── */
  document.getElementById('continue-btn').addEventListener('click', function(){
    document.getElementById('fade-overlay').classList.add('active');
    setTimeout(()=>{ window.location.href='gift.html'; },1300);
  });

  /* ── Prevent scroll ── */
  document.addEventListener('touchmove', e=>e.preventDefault(), {passive:false});
  document.addEventListener('wheel',     e=>e.preventDefault(), {passive:false});

