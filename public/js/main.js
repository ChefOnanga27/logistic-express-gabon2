/* ============================
   NAVBAR — scroll + burger
   ============================ */
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', window.scrollY > 40));
}
const burger   = document.getElementById('burger');
const navLinks = document.getElementById('nav-links');
if (burger && navLinks) {
  burger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = burger.querySelectorAll('span');
    const open  = navLinks.classList.contains('open');
    spans[0].style.transform = open ? 'translateY(7px) rotate(45deg)' : '';
    spans[1].style.opacity   = open ? '0' : '';
    spans[2].style.transform = open ? 'translateY(-7px) rotate(-45deg)' : '';
  });
  document.querySelectorAll('.nav-links a').forEach(l => l.addEventListener('click', () => {
    navLinks.classList.remove('open');
    burger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }));
}

/* ============================
   HERO SLIDER
   ============================ */
(function () {
  const slider   = document.getElementById('heroSlider');
  if (!slider) return;

  const slides   = slider.querySelectorAll('.slide');
  const dots     = slider.querySelectorAll('.sdot');
  const prevBtn  = document.getElementById('sliderPrev');
  const nextBtn  = document.getElementById('sliderNext');
  const bar      = document.getElementById('sliderProgress');
  const DURATION = 6000; // ms per slide
  let current    = 0;
  let timer      = null;
  let barTimer   = null;

  function goTo(idx) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (idx + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
    // Re-trigger slide animations
    slides[current].querySelectorAll('[style*="animation"],.slide-badge,.slide-inner h1,.slide-inner > p,.slide-btns,.slide-stats,.slide-service-cards').forEach(el => {
      el.style.animation = 'none';
      void el.offsetWidth;
      el.style.animation = '';
    });
    resetBar();
  }

  function resetBar() {
    if (bar) {
      bar.style.transition = 'none';
      bar.style.width = '0%';
      void bar.offsetWidth;
      bar.style.transition = `width ${DURATION}ms linear`;
      bar.style.width = '100%';
    }
  }

  function startAuto() {
    clearInterval(timer);
    timer = setInterval(() => goTo(current + 1), DURATION);
    resetBar();
  }

  if (prevBtn) prevBtn.addEventListener('click', () => { goTo(current - 1); startAuto(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { goTo(current + 1); startAuto(); });
  dots.forEach(d => d.addEventListener('click', () => { goTo(+d.dataset.idx); startAuto(); }));

  // Pause on hover
  slider.addEventListener('mouseenter', () => { clearInterval(timer); if (bar) { bar.style.transition = 'none'; } });
  slider.addEventListener('mouseleave', () => startAuto());

  // Touch swipe
  let touchX = 0;
  slider.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
  slider.addEventListener('touchend', e => {
    const diff = touchX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { goTo(diff > 0 ? current + 1 : current - 1); startAuto(); }
  });

  startAuto();
})();

/* ============================
   SCROLL REVEAL
   ============================ */
const revealStyle = document.createElement('style');
revealStyle.textContent = '.revealed { opacity: 1 !important; transform: translateY(0) !important; }';
document.head.appendChild(revealStyle);

const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); observer.unobserve(e.target); } });
}, { threshold: 0.08 });

document.querySelectorAll(
  '.service-card,.why-point,.province-card,.testi-card,.value-card,.team-card,.service-detail-card,.srv-card,.blog-card,.blog-preview-card,.avantage-item,.process-step,.related-card,.blog-featured'
).forEach((el, i) => {
  el.style.opacity   = '0';
  el.style.transform = 'translateY(22px)';
  el.style.transition = `opacity 0.5s ease ${(i % 6) * 0.07}s, transform 0.5s ease ${(i % 6) * 0.07}s`;
  observer.observe(el);
});

/* ============================
   FAQ ACCORDION
   ============================ */
window.toggleFaq = function (btn) {
  const item   = btn.closest('.faq-item');
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
};

/* ============================
   SUBNAV SCROLL SPY
   ============================ */
const svcSections = document.querySelectorAll('.svc-section');
const svcNavLinks = document.querySelectorAll('.svc-subnav a:not(.subnav-cta)');
if (svcSections.length && svcNavLinks.length) {
  window.addEventListener('scroll', () => {
    let cur = '';
    svcSections.forEach(s => { if (window.scrollY >= s.offsetTop - 130) cur = s.id; });
    svcNavLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + cur));
  });
}

/* ============================
   SMOOTH ANCHOR SCROLL
   ============================ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); window.scrollTo({ top: t.offsetTop - 130, behavior: 'smooth' }); }
  });
});

/* ============================
   HERO STAT COUNTERS
   ============================ */
function animateCount(el, target, suffix) {
  let start = 0;
  const step = ts => {
    if (!start) start = ts;
    const p = Math.min((ts - start) / 1800, 1);
    el.textContent = Math.floor((1 - Math.pow(1 - p, 3)) * target) + suffix;
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
const statObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const raw = e.target.textContent;
      const num = parseInt(raw.replace(/\D/g, ''));
      const suf = raw.replace(/[\d]/g, '');
      if (!isNaN(num)) animateCount(e.target, num, suf);
      statObs.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.sstat strong').forEach(s => statObs.observe(s));

/* ============================
   NEWSLETTER — AJAX POST
   ============================ */
const nlForm = document.querySelector('.newsletter-form');
if (nlForm) {
  nlForm.addEventListener('submit', async e => {
    e.preventDefault();
    const input = nlForm.querySelector('input[type="email"]');
    const btn   = nlForm.querySelector('button');
    if (!input.value) return;
    const email = input.value;
    btn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Envoi...';
    btn.disabled  = true;
    try {
      const res  = await fetch('/newsletter', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) });
      const data = await res.json();
      if (data.success) {
        btn.innerHTML = '<i class="fa fa-check"></i> Inscrit !';
        btn.style.background = '#10b981';
        input.value = '';
      } else {
        btn.innerHTML = 'Réessayer';
        btn.style.background = '#ef4444';
        btn.disabled = false;
      }
    } catch {
      btn.innerHTML = 'Réessayer';
      btn.disabled = false;
    }
  });
}

/* ============================
   TRACKING INPUT — uppercase
   ============================ */
const trackInput = document.querySelector('input[name="numero"]');
if (trackInput) {
  trackInput.addEventListener('input', () => {
    const pos = trackInput.selectionStart;
    trackInput.value = trackInput.value.toUpperCase();
    trackInput.setSelectionRange(pos, pos);
  });
}
