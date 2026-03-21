require('dotenv').config();
const express = require('express');
const path    = require('path');
const session = require('express-session');

const app = express();

// ── View engine ──────────────────────────────
app.set('view engine', 'ejs');
// On met les deux dossiers : admin/views EN PREMIER pour éviter les conflits
// Les routes admin utilisent des noms de vues préfixés (ex: 'a-dashboard')
app.set('views', [
  path.join(__dirname, 'admin', 'views'),
  path.join(__dirname, 'views'),
]);

// ── Static files ─────────────────────────────
app.use(express.static(path.join(__dirname, 'public')));

// ── Body parsers ─────────────────────────────
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ── Sessions ─────────────────────────────────
app.use(session({
  secret:            process.env.SESSION_SECRET || 'leg-admin-secret-2026',
  resave:            false,
  saveUninitialized: false,
  cookie: { maxAge: 8 * 60 * 60 * 1000 },
}));

// ── Helper global statusBadge ─────────────────
app.locals.statusBadge = function(statut) {
  const map = {
    'En attente':   ['badge-yellow', 'fa-clock'],
    'En transit':   ['badge-blue',   'fa-truck'],
    'En livraison': ['badge-blue',   'fa-truck-fast'],
    'Livré':        ['badge-green',  'fa-check-circle'],
    'Retard':       ['badge-red',    'fa-triangle-exclamation'],
    'Annulé':       ['badge-gray',   'fa-xmark-circle'],
  };
  const [cls, icon] = map[statut] || ['badge-gray', 'fa-circle'];
  return `<span class="badge ${cls}"><i class="fa ${icon}"></i> ${statut}</span>`;
};

// ── Seed DB ───────────────────────────────────
const { seed } = require('./data/db');
seed();

// ── Routes ───────────────────────────────────
// IMPORTANT: /admin AVANT / pour éviter que le catch-all du router public
// n'intercepte les routes admin
const adminRouter  = require('./admin/routes/admin');
const publicRouter = require('./routes/index');

app.use('/admin', adminRouter);
app.use('/', publicRouter);

// ── 404 ───────────────────────────────────────
app.use((req, res) => {
  res.status(404).render('404', { title: 'Page introuvable', page: '' });
});

// ── Error handler ─────────────────────────────
app.use((err, req, res, next) => {
  console.error('Erreur serveur:', err.message, '\n', err.stack);
  res.status(500).send(`
    <div style="font-family:sans-serif;padding:40px;max-width:700px;margin:auto;">
      <h2 style="color:#c00;">Erreur serveur</h2>
      <p style="color:#666;">${err.message}</p>
      <pre style="background:#f5f5f5;padding:16px;border-radius:8px;font-size:12px;overflow:auto;">${err.stack}</pre>
      <a href="javascript:history.back()" style="color:#1a3a7c;">← Retour</a>
    </div>`);
});

// ── Start ─────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\n🚚 Site public     → http://localhost:${PORT}`);
  console.log(`🔐 Admin           → http://localhost:${PORT}/admin`);
  console.log(`   Login           : admin / Admin@LEG2026\n`);
});

module.exports = app;
