document.addEventListener('DOMContentLoaded', () => {

  // ─── LOADING SCREEN ────────────────────────────────────
  const loadingScreen = document.getElementById('loadingScreen');
  window.addEventListener('load', () => {
    setTimeout(() => loadingScreen.classList.add('hidden'), 600);
  });

  // ─── YEAR ──────────────────────────────────────────────
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ─── TYPING ANIMATION ──────────────────────────────────
  const typingEl = document.querySelector('.typing-text');
  const words = [
    'Data Analysis in Physics',
    'Machine Learning',
    'Computational Modeling',
    'Time-Series Analysis',
    'Scientific Programming'
  ];
  let wi = 0, ci = 0, deleting = false, speed = 100;

  function type() {
    if (!typingEl) return;
    const word = words[wi];
    typingEl.textContent = deleting
      ? word.slice(0, --ci)
      : word.slice(0, ++ci);

    speed = deleting ? 45 : 100;
    if (!deleting && ci === word.length) { speed = 2000; deleting = true; }
    else if (deleting && ci === 0) { deleting = false; wi = (wi + 1) % words.length; speed = 400; }
    setTimeout(type, speed);
  }
  setTimeout(type, 1000);

  // ─── HEADER SCROLL ─────────────────────────────────────
  const header = document.getElementById('siteHeader');
  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 30);
    const btt = document.getElementById('backToTop');
    if (btt) btt.classList.toggle('visible', window.scrollY > 400);
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  // ─── BACK TO TOP ───────────────────────────────────────
  const btt = document.getElementById('backToTop');
  if (btt) btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // ─── NAVIGATION (scroll-based active state) ────────────
  const navItems   = document.querySelectorAll('.nav-item');
  const sectionIds = ['about','projects','skills','experience','contact'];

  function updateActiveNav() {
    let current = 'about';
    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      if (window.scrollY >= el.offsetTop - 140) current = id;
    });
    navItems.forEach(n => n.classList.toggle('active', n.dataset.nav === current));
  }
  window.addEventListener('scroll', updateActiveNav, { passive: true });

  // Smooth-scroll clicks on nav links
  document.querySelectorAll('[data-nav], [data-nav-btn]').forEach(el => {
    el.addEventListener('click', e => {
      const target = el.dataset.nav || el.dataset.navBtn;
      const section = document.getElementById(target);
      if (!section) return;
      e.preventDefault();
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // close mobile menu
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
    });
  });

  // ─── MOBILE MENU ───────────────────────────────────────
  const hamburger   = document.getElementById('hamburger');
  const mobileMenu  = document.getElementById('mobileMenu');

  hamburger.addEventListener('click', () => {
    const open = hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  document.querySelectorAll('.mob-nav-item').forEach(item => {
    item.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // ─── SCROLL REVEAL ─────────────────────────────────────
  const revealEls = document.querySelectorAll(
    '.project-card, .tl-item, .skill-row, .contact-card, .stat-item, .interest-item'
  );
  revealEls.forEach((el, i) => {
    el.classList.add('reveal');
    if (i % 3 === 1) el.classList.add('reveal-delay-1');
    if (i % 3 === 2) el.classList.add('reveal-delay-2');
  });

  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in-view');
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  revealEls.forEach(el => revealObs.observe(el));

  // ─── SKILL BAR ANIMATION ───────────────────────────────
  const skillSection = document.getElementById('skills');
  let skillsAnimated = false;
  const skillObs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !skillsAnimated) {
      skillsAnimated = true;
      document.querySelectorAll('.skill-fill').forEach((el, i) => {
        setTimeout(() => el.classList.add('animated'), i * 100);
      });
    }
  }, { threshold: 0.3 });
  if (skillSection) skillObs.observe(skillSection);

  // ─── REDUCED MOTION ────────────────────────────────────
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('[style*="animation"]').forEach(el => {
      el.style.animation = 'none';
    });
  }

  console.log('%c PM ', 'background:#7FBA9E;color:#0C0F0E;font-size:14px;padding:4px 8px;border-radius:4px;font-weight:700');
  console.log('%cPiyush Maji — Physics & ML Research', 'color:#7FBA9E');
});
