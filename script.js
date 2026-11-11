document.addEventListener('DOMContentLoaded', function() {
  var yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();

  var motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  function scrollBehavior() { return motionPreference.matches ? 'auto' : 'smooth'; }

  var typingEl = document.querySelector('.typing-text');
  var words = ['Bayesian Optimization', 'ML for High-Energy Physics', 'Graph Neural Networks',
    'Time-Series Modeling', 'Scientific Computing', 'ML Applications & APIs'];
  var wi = 0, ci = 0, deleting = false, typingTimer;
  function type() {
    if (!typingEl || motionPreference.matches) return;
    var word = words[wi];
    typingEl.textContent = deleting ? word.slice(0, --ci) : word.slice(0, ++ci);
    var speed = deleting ? 42 : 100;
    if (!deleting && ci === word.length) { speed = 2200; deleting = true; }
    else if (deleting && ci === 0) { deleting = false; wi = (wi + 1) % words.length; speed = 420; }
    typingTimer = setTimeout(type, speed);
  }
  function resetTyping() {
    clearTimeout(typingTimer);
    wi = 0; ci = words[0].length; deleting = true;
    if (typingEl) typingEl.textContent = words[0];
    if (!motionPreference.matches) typingTimer = setTimeout(type, 2200);
  }
  resetTyping();
  motionPreference.addEventListener('change', resetTyping);

  var header = document.getElementById('siteHeader');
  var btt = document.getElementById('backToTop');
  var hamburger = document.getElementById('hamburger');
  var mobileMenu = document.getElementById('mobileMenu');
  var cvDropdown = document.getElementById('cvDropdown');
  var cvDropdownBtn = document.getElementById('cvDropdownBtn');
  var cvOverlay = document.getElementById('cvModalOverlay');
  var cvIframe = document.getElementById('cvIframe');
  var cvCloseBtn = document.getElementById('cvModalClose');
  var cvOpener = null, cvClearTimer;
  var pageContent = document.querySelectorAll('body > section, body > footer, #backToTop');

  function menuIsOpen() { return !!mobileMenu && mobileMenu.classList.contains('open'); }
  function cvIsOpen() { return !!cvOverlay && cvOverlay.classList.contains('open'); }
  function syncOverlays() {
    var menuOpen = menuIsOpen(), modalOpen = cvIsOpen();
    document.body.style.overflow = menuOpen || modalOpen ? 'hidden' : '';
    pageContent.forEach(function(el) { el.inert = menuOpen || modalOpen; });
    if (header) header.inert = modalOpen;
    if (mobileMenu) mobileMenu.inert = !menuOpen || modalOpen;
    if (cvOverlay) cvOverlay.inert = !modalOpen;
    if (hamburger) hamburger.setAttribute('aria-expanded', String(menuOpen));
  }
  function setMenu(open, restoreFocus) {
    if (!hamburger || !mobileMenu) return;
    hamburger.classList.toggle('open', open);
    mobileMenu.classList.toggle('open', open);
    syncOverlays();
    if (!open && restoreFocus) hamburger.focus();
  }
  function setCvDropdown(open, restoreFocus) {
    if (!cvDropdown || !cvDropdownBtn) return;
    cvDropdown.classList.toggle('open', open);
    cvDropdownBtn.setAttribute('aria-expanded', String(open));
    if (!open && restoreFocus) cvDropdownBtn.focus();
  }

  var navItems = document.querySelectorAll('[data-nav]');
  var sections = document.querySelectorAll('section[id]');
  function updateScrollState() {
    if (header) header.classList.toggle('scrolled', window.scrollY > 30);
    if (btt) btt.classList.toggle('visible', window.scrollY > 400);
    var current = 'about';
    sections.forEach(function(section) {
      if (window.scrollY >= section.offsetTop - 140) current = section.id;
    });
    navItems.forEach(function(item) {
      var active = item.dataset.nav === current;
      item.classList.toggle('active', active);
      if (active) item.setAttribute('aria-current', 'location');
      else item.removeAttribute('aria-current');
    });
  }
  window.addEventListener('scroll', updateScrollState, { passive: true });
  updateScrollState();
  syncOverlays();
  if (btt) btt.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: scrollBehavior() });
    var about = document.getElementById('about');
    if (about) { about.setAttribute('tabindex', '-1'); about.focus({ preventScroll: true }); }
  });

  document.querySelectorAll('[data-nav], .btn-primary, .btn-ghost, .wordmark').forEach(function(link) {
    link.addEventListener('click', function(e) {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button > 0) return;
      var href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      var target = document.getElementById(href.slice(1));
      if (!target) return;
      e.preventDefault();
      setMenu(false);
      setCvDropdown(false);
      if (window.location.hash !== href) window.history.pushState(null, '', href);
      target.scrollIntoView({ behavior: scrollBehavior() });
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    });
  });

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function() {
      var open = !menuIsOpen();
      setCvDropdown(false);
      setMenu(open);
      var firstLink = mobileMenu.querySelector('a');
      if (open && firstLink) firstLink.focus();
    });
    window.matchMedia('(min-width: 1001px)').addEventListener('change', function(e) {
      if (e.matches && menuIsOpen()) setMenu(false);
    });
  }

  var journeyTabs = document.querySelectorAll('.journey-tab');
  function activateJourney(tab, focus) {
    journeyTabs.forEach(function(item) {
      var selected = item === tab;
      item.classList.toggle('active', selected);
      item.setAttribute('aria-selected', String(selected));
      item.tabIndex = selected ? 0 : -1;
      var panel = document.getElementById('journey-' + item.dataset.journey);
      if (panel) panel.hidden = !selected;
    });
    if (focus) tab.focus();
  }
  journeyTabs.forEach(function(tab, index) {
    tab.addEventListener('click', function() { activateJourney(tab); });
    tab.addEventListener('keydown', function(e) {
      var next;
      if (e.key === 'ArrowRight') next = (index + 1) % journeyTabs.length;
      else if (e.key === 'ArrowLeft') next = (index + journeyTabs.length - 1) % journeyTabs.length;
      else if (e.key === 'Home') next = 0;
      else if (e.key === 'End') next = journeyTabs.length - 1;
      if (next !== undefined) { e.preventDefault(); activateJourney(journeyTabs[next], true); }
    });
  });

  if (cvDropdownBtn && cvDropdown) {
    cvDropdownBtn.addEventListener('click', function() {
      setCvDropdown(!cvDropdown.classList.contains('open'));
    });
    cvDropdownBtn.addEventListener('keydown', function(e) {
      if (e.key !== 'ArrowDown') return;
      e.preventDefault();
      setCvDropdown(true);
      var firstItem = cvDropdown.querySelector('.cv-dropdown-item');
      if (firstItem) firstItem.focus();
    });
    document.addEventListener('click', function(e) {
      if (!cvDropdown.contains(e.target)) setCvDropdown(false);
    });
    cvDropdown.addEventListener('focusout', function(e) {
      if (!cvDropdown.contains(e.relatedTarget)) setCvDropdown(false);
    });
  }

  function openCvModal(e) {
    if (!cvOverlay || !cvIframe) return;
    clearTimeout(cvClearTimer);
    cvOpener = e.currentTarget.id === 'mobViewCvBtn' ? hamburger : cvDropdownBtn;
    if (!cvIframe.getAttribute('src')) cvIframe.src = 'Piyush_CV.pdf';
    setCvDropdown(false);
    setMenu(false);
    cvOverlay.classList.add('open');
    syncOverlays();
    if (cvCloseBtn) cvCloseBtn.focus();
  }
  function closeCvModal() {
    if (!cvOverlay || !cvIframe) return;
    cvOverlay.classList.remove('open');
    syncOverlays();
    var restoreTo = window.matchMedia('(min-width: 1001px)').matches ? cvDropdownBtn : hamburger;
    if (restoreTo || cvOpener) (restoreTo || cvOpener).focus();
    cvClearTimer = setTimeout(function() {
      if (!cvIsOpen()) cvIframe.removeAttribute('src');
    }, 300);
  }
  ['viewCvBtn', 'mobViewCvBtn'].forEach(function(id) {
    var btn = document.getElementById(id);
    if (btn) btn.addEventListener('click', openCvModal);
  });
  if (cvCloseBtn) cvCloseBtn.addEventListener('click', closeCvModal);
  if (cvOverlay) cvOverlay.addEventListener('click', function(e) {
    if (e.target === cvOverlay) closeCvModal();
  });

  // Keep keyboard focus within the currently open overlay.
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      if (cvIsOpen()) closeCvModal();
      else if (menuIsOpen()) setMenu(false, true);
      else if (cvDropdown && cvDropdown.classList.contains('open')) setCvDropdown(false, true);
      return;
    }
    if (e.key !== 'Tab') return;
    var scope = cvIsOpen() ? cvOverlay : menuIsOpen() ? mobileMenu : null;
    if (!scope) return;
    var focusable = Array.from(scope.querySelectorAll('a[href], button, iframe, [tabindex="0"]'));
    if (menuIsOpen() && !cvIsOpen() && hamburger) focusable.unshift(hamburger);
    if (!focusable.length) return;
    var first = focusable[0], last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
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
