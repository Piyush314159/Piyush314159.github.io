document.addEventListener('DOMContentLoaded', function() {

  var yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();

  var typingEl = document.querySelector('.typing-text');
  var words = ['GNN-Based Event Reconstruction','ML for High-Energy Physics','Graph Neural Networks','GraFEI at Belle II','Computational Physics','Data Science & Analysis'];
  var wi = 0, ci = 0, deleting = false, speed = 100;
  function type() {
    if (!typingEl) return;
    var word = words[wi];
    typingEl.textContent = deleting ? word.slice(0, --ci) : word.slice(0, ++ci);
    speed = deleting ? 42 : 100;
    if (!deleting && ci === word.length) { speed = 2200; deleting = true; }
    else if (deleting && ci === 0) { deleting = false; wi = (wi + 1) % words.length; speed = 420; }
    setTimeout(type, speed);
  }
  setTimeout(type, 900);

  var header = document.getElementById('siteHeader');
  var btt = document.getElementById('backToTop');
  window.addEventListener('scroll', function() {
    if (header) header.classList.toggle('scrolled', window.scrollY > 30);
    if (btt) btt.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  if (btt) btt.addEventListener('click', function() { window.scrollTo({ top: 0, behavior: 'smooth' }); });

  var navItems = document.querySelectorAll('.nav-item');
  var sectionIds = ['about','gallery','research','projects','skills','experience','journeys','por','contact'];
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

  // CV Dropdown
  var cvDropdown = document.getElementById('cvDropdown');
  var cvDropdownBtn = document.getElementById('cvDropdownBtn');
  if (cvDropdownBtn && cvDropdown) {
    cvDropdownBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      cvDropdown.classList.toggle('open');
    });
    document.addEventListener('click', function(e) {
      if (!cvDropdown.contains(e.target)) cvDropdown.classList.remove('open');
    });
  }

  // CV Modal
  var cvOverlay = document.getElementById('cvModalOverlay');
  var cvIframe = document.getElementById('cvIframe');
  var cvCloseBtn = document.getElementById('cvModalClose');

  function openCvModal() {
    if (!cvOverlay || !cvIframe) return;
    cvIframe.src = 'Piyush_CV.pdf';
    cvOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    if (cvDropdown) cvDropdown.classList.remove('open');
    if (hamburger) hamburger.classList.remove('open');
    if (mobileMenu) mobileMenu.classList.remove('open');
  }

  function closeCvModal() {
    if (!cvOverlay || !cvIframe) return;
    cvOverlay.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(function() { cvIframe.src = ''; }, 300);
  }

  var viewCvBtn = document.getElementById('viewCvBtn');
  if (viewCvBtn) viewCvBtn.addEventListener('click', openCvModal);

  var mobViewCvBtn = document.getElementById('mobViewCvBtn');
  if (mobViewCvBtn) mobViewCvBtn.addEventListener('click', openCvModal);

  if (cvCloseBtn) cvCloseBtn.addEventListener('click', closeCvModal);
  if (cvOverlay) cvOverlay.addEventListener('click', function(e) {
    if (e.target === cvOverlay) closeCvModal();
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && cvOverlay && cvOverlay.classList.contains('open')) closeCvModal();
  });

});

// ── Cinematic Gallery Slider ──
(function() {
  var track = document.getElementById('cinSliderTrack');
  var counter = document.getElementById('cinCounter');
  var captionEl = document.getElementById('cinCaption');
  var dots = document.querySelectorAll('.cin-dot');
  var prevBtn = document.getElementById('cinPrev');
  var nextBtn = document.getElementById('cinNext');
  if (!track) return;

  var slides = track.querySelectorAll('.cin-slide');
  var total = slides.length;
  var current = 0;
  var autoTimer = null;
  var touchStartX = 0;

  function goTo(index) {
    // Remove active from current slide
    slides[current].classList.remove('is-active');
    current = (index + total) % total;
    track.style.transform = 'translateX(-' + (current * 100) + '%)';

    // Update counter
    if (counter) counter.textContent = (current + 1) + ' / ' + total;

    // Update caption with crossfade
    if (captionEl) {
      captionEl.style.opacity = '0';
      setTimeout(function() {
        captionEl.innerHTML = slides[current].dataset.caption || '';
        captionEl.style.opacity = '1';
      }, 180);
    }

    // Update dots
    dots.forEach(function(d, i) { d.classList.toggle('active', i === current); });

    // Activate new slide (triggers ken burns zoom)
    setTimeout(function() {
      slides[current].classList.add('is-active');
    }, 50);
  }

  function startAuto() {
    stopAuto();
    autoTimer = setInterval(function() { goTo(current + 1); }, 5000);
  }

  function stopAuto() {
    if (autoTimer) { clearInterval(autoTimer); autoTimer = null; }
  }

  if (prevBtn) prevBtn.addEventListener('click', function() { goTo(current - 1); stopAuto(); startAuto(); });
  if (nextBtn) nextBtn.addEventListener('click', function() { goTo(current + 1); stopAuto(); startAuto(); });

  dots.forEach(function(d) {
    d.addEventListener('click', function() {
      goTo(parseInt(d.dataset.index));
      stopAuto(); startAuto();
    });
  });

  // Touch / swipe
  var sliderEl = document.getElementById('cinSliderWrap');
  if (sliderEl) {
    sliderEl.addEventListener('touchstart', function(e) {
      touchStartX = e.changedTouches[0].clientX;
    }, { passive: true });
    sliderEl.addEventListener('touchend', function(e) {
      var dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 40) {
        goTo(dx < 0 ? current + 1 : current - 1);
        stopAuto(); startAuto();
      }
    }, { passive: true });
    // Pause on hover
    sliderEl.addEventListener('mouseenter', stopAuto);
    sliderEl.addEventListener('mouseleave', startAuto);
  }

  // Keyboard arrow navigation when slider is in view
  document.addEventListener('keydown', function(e) {
    var wrap = document.getElementById('cinSliderWrap');
    if (!wrap) return;
    var rect = wrap.getBoundingClientRect();
    var inView = rect.top < window.innerHeight && rect.bottom > 0;
    if (!inView) return;
    if (e.key === 'ArrowLeft') { goTo(current - 1); stopAuto(); startAuto(); }
    if (e.key === 'ArrowRight') { goTo(current + 1); stopAuto(); startAuto(); }
  });

  // Init
  goTo(0);
  startAuto();
}());