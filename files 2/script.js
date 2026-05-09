document.addEventListener('DOMContentLoaded', function() {

  var yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();

  var typingEl = document.querySelector('.typing-text');
  var words = ['Data Analysis in Physics','Machine Learning','Computational Modeling','Time-Series Analysis','Scientific Programming'];
  var wi = 0, ci = 0, deleting = false, speed = 100;
  function type() {
    if (!typingEl) return;
    var word = words[wi];
    typingEl.textContent = deleting ? word.slice(0, --ci) : word.slice(0, ++ci);
    speed = deleting ? 45 : 100;
    if (!deleting && ci === word.length) { speed = 2000; deleting = true; }
    else if (deleting && ci === 0) { deleting = false; wi = (wi + 1) % words.length; speed = 400; }
    setTimeout(type, speed);
  }
  setTimeout(type, 800);

  var header = document.getElementById('siteHeader');
  var btt = document.getElementById('backToTop');
  window.addEventListener('scroll', function() {
    if (header) header.classList.toggle('scrolled', window.scrollY > 30);
    if (btt) btt.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  if (btt) btt.addEventListener('click', function() { window.scrollTo({ top: 0, behavior: 'smooth' }); });

  var navItems = document.querySelectorAll('.nav-item');
  var sectionIds = ['about','projects','skills','experience','journeys','contact'];
  function updateNav() {
    var current = 'about';
    sectionIds.forEach(function(id) {
      var el = document.getElementById(id);
      if (el && window.scrollY >= el.offsetTop - 120) current = id;
    });
    navItems.forEach(function(n) { n.classList.toggle('active', n.dataset.nav === current); });
  }
  window.addEventListener('scroll', updateNav, { passive: true });

  document.querySelectorAll('[data-nav]').forEach(function(el) {
    el.addEventListener('click', function(e) {
      var id = el.dataset.nav;
      var target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  document.querySelectorAll('.btn-primary, .btn-ghost').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      var href = btn.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        var target = document.getElementById(href.slice(1));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  var hamburger = document.getElementById('hamburger');
  var mobileMenu = document.getElementById('mobileMenu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function() {
      var open = hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    document.querySelectorAll('.mob-nav-item').forEach(function(item) {
      item.addEventListener('click', function() {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  document.querySelectorAll('.journey-tab').forEach(function(tab) {
    tab.addEventListener('click', function() {
      document.querySelectorAll('.journey-tab').forEach(function(t) { t.classList.remove('active'); });
      document.querySelectorAll('.journey-panel').forEach(function(p) { p.style.display = 'none'; });
      tab.classList.add('active');
      var panel = document.getElementById('journey-' + tab.dataset.journey);
      if (panel) panel.style.display = 'block';
    });
  });

});

function toggleModule(btn) {
  var body = btn.nextElementSibling;
  var isOpen = body.classList.contains('is-open');
  body.classList.toggle('is-open', !isOpen);
  btn.classList.toggle('is-open', !isOpen);
}