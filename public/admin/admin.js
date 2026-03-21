/* ============================================
   LEG Admin — admin.js
   ============================================ */

// ── Sidebar mobile ──────────────────────────
const sidebar  = document.getElementById('sidebar');
const overlay  = document.getElementById('sidebarOverlay');
const burger   = document.getElementById('topbarBurger');
const closeBtn = document.getElementById('sidebarClose');

function openSidebar() {
  sidebar?.classList.add('open');
  overlay?.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeSidebar() {
  sidebar?.classList.remove('open');
  overlay?.classList.remove('open');
  document.body.style.overflow = '';
}

burger?.addEventListener('click', openSidebar);
closeBtn?.addEventListener('click', closeSidebar);
overlay?.addEventListener('click', closeSidebar);

// ── Modals ───────────────────────────────────
window.toggleModal = function(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.toggle('open');
  document.body.style.overflow = modal.classList.contains('open') ? 'hidden' : '';
};

// Close modal on overlay click
document.querySelectorAll('.modal-overlay').forEach(m => {
  m.addEventListener('click', e => {
    if (e.target === m) {
      m.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
});

// Close modal on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.open').forEach(m => {
      m.classList.remove('open');
      document.body.style.overflow = '';
    });
  }
});

// ── Badge compteurs dynamiques ───────────────
async function refreshBadges() {
  try {
    const res  = await fetch('/admin/api/stats');
    const data = await res.json();

    // Topbar badge messages
    const msgBadge = document.getElementById('msgBadge');
    if (msgBadge) {
      msgBadge.textContent = data.messages.nonLus;
      msgBadge.style.display = data.messages.nonLus > 0 ? 'flex' : 'none';
    }
  } catch (e) { /* silencieux */ }
}
refreshBadges();
setInterval(refreshBadges, 60000); // refresh chaque minute

// ── Auto-hide alerts ─────────────────────────
document.querySelectorAll('.alert-success-bar, .alert-error-bar').forEach(el => {
  setTimeout(() => {
    el.style.transition = 'opacity 0.5s';
    el.style.opacity = '0';
    setTimeout(() => el.remove(), 500);
  }, 4000);
});

// ── Checkbox "tout sélectionner" ─────────────
window.toggleAll = function(master) {
  document.querySelectorAll('.row-check').forEach(cb => cb.checked = master.checked);
};

// ── Confirmation suppression ─────────────────
// (géré inline avec onsubmit="return confirm(...)") 

// ── Tooltips simples ─────────────────────────
document.querySelectorAll('[title]').forEach(el => {
  // Laisser le title natif du navigateur — suffisant pour le dashboard
});

// ── Active nav highlight (fallback) ──────────
const path = window.location.pathname;
document.querySelectorAll('.nav-item').forEach(link => {
  const href = link.getAttribute('href');
  if (href && href !== '/admin' && path.startsWith(href)) {
    link.classList.add('active');
  } else if (href === '/admin' && path === '/admin') {
    link.classList.add('active');
  }
});

// ── Flash query params (nettoyage URL) ───────
if (window.location.search.includes('success=') || window.location.search.includes('error=') || window.location.search.includes('campagne=')) {
  const clean = window.location.pathname;
  window.history.replaceState({}, '', clean);
}

// Chart.js est chargé directement dans les pages qui en ont besoin (dashboard, newsletter)
