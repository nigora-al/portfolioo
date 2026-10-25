(() => {
  'use strict';
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const root = document.documentElement;
  const store = {
    get: (k, d) => { try { return localStorage.getItem(k) || d; } catch { return d; } },
    set: (k, v) => { try { localStorage.setItem(k, v); } catch {} }
  };

  /* ---------- THEME ---------- */
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  let theme = store.get('theme', prefersLight ? 'light' : 'dark');
  const applyTheme = t => { root.dataset.theme = t; theme = t; store.set('theme', t); };
  applyTheme(theme);
  $('#themeBtn').addEventListener('click', () => applyTheme(theme === 'dark' ? 'light' : 'dark'));

  /* ---------- LANGUAGE ---------- */
  let lang = store.get('lang', 'uz');
  const setLang = l => {
    lang = l; store.set('lang', l);
    root.lang = l;
    $$('[data-i18n]').forEach(el => { const v = I18N[l][el.dataset.i18n]; if (v) el.textContent = v; });
    $$('.lang-opt').forEach(o => o.classList.toggle('on', o.dataset.l === l));
    restartTyping();
  };
  $('#langBtn').addEventListener('click', () => setLang(lang === 'uz' ? 'en' : 'uz'));

  /* ---------- TYPING ---------- */
  const typedEl = $('#typed');
  let typeTimer, wi = 0, ci = 0, deleting = false;
  function tick() {
    const words = I18N[lang].typed, word = words[wi % words.length];
    ci += deleting ? -1 : 1;
    typedEl.textContent = word.slice(0, ci);
    let delay = deleting ? 45 : 90;
    if (!deleting && ci === word.length) { delay = 1600; deleting = true; }
    else if (deleting && ci === 0) { deleting = false; wi++; delay = 350; }
    typeTimer = setTimeout(tick, delay);
  }
  function restartTyping() { clearTimeout(typeTimer); wi = 0; ci = 0; deleting = false; tick(); }

  /* ---------- NAV ---------- */
  const nav = $('#nav'), burger = $('#burger'), links = $('#navLinks'), bar = $('#progress');
  burger.addEventListener('click', () => { burger.classList.toggle('open'); links.classList.toggle('open'); });
  $$('a', links).forEach(a => a.addEventListener('click', () => { burger.classList.remove('open'); links.classList.remove('open'); }));
  const sections = $$('main section[id]');
  function onScroll() {
    nav.classList.toggle('scrolled', scrollY > 20);
    const h = document.documentElement.scrollHeight - innerHeight;
    bar.style.width = (h > 0 ? scrollY / h * 100 : 0) + '%';
    let cur = sections[0].id;
    sections.forEach(s => { if (scrollY >= s.offsetTop - 160) cur = s.id; });
    $$('a', links).forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + cur));
  }
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* ---------- REVEAL + COUNTERS + BARS ---------- */
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('in');
      $$('.bar i', e.target).forEach(b => b.style.width = b.dataset.level + '%');
      io.unobserve(e.target);
    });
  }, { threshold: .15 });
  $$('.reveal').forEach(el => io.observe(el));

  const countIO = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target, end = +el.dataset.count, suf = el.dataset.suffix || '';
      const t0 = performance.now();
      (function step(t) {
        const p = Math.min((t - t0) / 1400, 1), eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(end * eased) + suf;
        if (p < 1) requestAnimationFrame(step);
      })(t0);
      countIO.unobserve(el);
    });
  }, { threshold: .6 });
  $$('[data-count]').forEach(el => countIO.observe(el));

  /* ---------- CURSOR GLOW ---------- */
  const glow = $('.cursor-glow');
  addEventListener('pointermove', e => { glow.style.left = e.clientX + 'px'; glow.style.top = e.clientY + 'px'; });

  /* ---------- 3D TILT + SPOTLIGHT ---------- */
  const fine = window.matchMedia('(hover: hover)').matches;
  if (fine) {
    $$('.tilt').forEach(card => {
      card.addEventListener('pointermove', e => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        card.style.transform = `perspective(900px) rotateX(${(.5 - y) * 10}deg) rotateY(${(x - .5) * 12}deg) translateY(-4px)`;
        card.style.setProperty('--mx', x * 100 + '%'); card.style.setProperty('--my', y * 100 + '%');
      });
      card.addEventListener('pointerleave', () => { card.style.transform = ''; });
    });
    /* magnetic buttons */
    $$('.magnetic').forEach(m => {
      m.addEventListener('pointermove', e => {
        const r = m.getBoundingClientRect();
        m.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .25}px, ${(e.clientY - r.top - r.height / 2) * .3}px)`;
      });
      m.addEventListener('pointerleave', () => { m.style.transform = ''; });
    });
  }

  /* ---------- PARTICLE BACKGROUND ---------- */
  const cv = $('#bg-canvas'), ctx = cv.getContext('2d');
  let W, H, pts = [];
  const mouse = { x: -999, y: -999 };
  function size() {
    W = cv.width = innerWidth; H = cv.height = innerHeight;
    pts = Array.from({ length: Math.min(70, Math.floor(W * H / 24000)) }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35, r: Math.random() * 1.8 + .6
    }));
  }
  addEventListener('resize', size); size();
  addEventListener('pointermove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function draw() {
    ctx.clearRect(0, 0, W, H);
    const rgb = getComputedStyle(root).getPropertyValue('--particle').trim() || '255,255,255';
    pts.forEach((p, i) => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 7);
      ctx.fillStyle = `rgba(${rgb},.55)`; ctx.fill();
      for (let j = i + 1; j < pts.length; j++) {
        const q = pts[j], d = Math.hypot(p.x - q.x, p.y - q.y);
        if (d < 130) { ctx.strokeStyle = `rgba(${rgb},${(1 - d / 130) * .18})`; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke(); }
      }
      const dm = Math.hypot(p.x - mouse.x, p.y - mouse.y);
      if (dm < 160) { ctx.strokeStyle = `rgba(255,95,162,${(1 - dm / 160) * .5})`; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke(); }
    });
    if (!reduce) requestAnimationFrame(draw);
  }
  draw();

  /* ---------- CONTACT FORM ---------- */
  $('#contactForm').addEventListener('submit', e => {
    e.preventDefault();
    const f = new FormData(e.target);
    const body = encodeURIComponent(`${f.get('message')}\n\n— ${f.get('name')} (${f.get('email')})`);
    $('#formNote').textContent = I18N[lang].f_ok;
    location.href = `mailto:numonovanigora40@gmail.com?subject=Portfolio&body=${body}`;
    e.target.reset();
  });

  $('#year').textContent = new Date().getFullYear();
  setLang(lang);
})();
