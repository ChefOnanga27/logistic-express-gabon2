/**
 * admin/routes/admin.js
 * Toutes les routes du tableau de bord admin
 */

const express  = require('express');
const router   = express.Router();
const bcrypt   = require('bcryptjs');
const { db }   = require('../../data/db');
const { requireAuth, requireGuest } = require('../middleware/auth');

// ════════════════════════════════════════
//  AUTH — Login / Logout
// ════════════════════════════════════════

router.get('/login', requireGuest, (req, res) => {
  res.render('a-login', { title: 'Connexion Admin', error: null });
});

router.post('/login', requireGuest, (req, res) => {
  const { username, password } = req.body;
  const users = db.find('admin_users', u => u.username === username);
  if (!users.length) {
    return res.render('a-login', { title: 'Connexion Admin', error: 'Identifiants incorrects.' });
  }
  const user = users[0];
  if (!bcrypt.compareSync(password, user.password)) {
    return res.render('a-login', { title: 'Connexion Admin', error: 'Identifiants incorrects.' });
  }
  req.session.adminUser = { id: user.id, username: user.username, nom: user.nom, role: user.role, email: user.email };
  db.insert('activity', { type: 'auth', action: `Connexion de ${user.nom}`, user: user.nom });
  const returnTo = req.session.returnTo || '/admin';
  delete req.session.returnTo;
  res.redirect(returnTo);
});

router.get('/logout', (req, res) => {
  if (req.session.adminUser) {
    db.insert('activity', { type: 'auth', action: `Déconnexion de ${req.session.adminUser.nom}`, user: req.session.adminUser.nom });
  }
  req.session.destroy(() => res.redirect('/admin/login'));
});

// ════════════════════════════════════════
//  DASHBOARD — Page d'accueil
// ════════════════════════════════════════

router.get('/', requireAuth, (req, res) => {
  const stats      = db.stats();
  const chartData  = db.chartData();
  const recentColis    = db.all('colis').slice(0, 5);
  const recentMessages = db.all('messages').filter(m => !m.lu).slice(0, 5);
  const recentDevis    = db.all('devis').filter(d => d.statut === 'En attente').slice(0, 4);
  const activities     = db.all('activity').slice(0, 8);

  res.render('a-dashboard', {
    title: 'Tableau de bord',
    page: 'dashboard',
    stats, chartData, recentColis, recentMessages, recentDevis, activities,
  });
});

// ════════════════════════════════════════
//  NEWSLETTER — Abonnés
// ════════════════════════════════════════

router.get('/newsletter', requireAuth, (req, res) => {
  const { statut, q } = req.query;
  let subscribers = db.all('subscribers');
  if (statut) subscribers = subscribers.filter(s => s.statut === statut);
  if (q)      subscribers = subscribers.filter(s =>
    s.email.toLowerCase().includes(q.toLowerCase()) ||
    (s.nom || '').toLowerCase().includes(q.toLowerCase())
  );
  res.render('a-newsletter', {
    title: 'Abonnés Newsletter',
    page: 'newsletter',
    subscribers,
    total:   db.count('subscribers'),
    actifs:  db.count('subscribers', s => s.statut === 'actif'),
    inactifs:db.count('subscribers', s => s.statut === 'inactif'),
    filtreStatut: statut || '',
    q: q || '',
  });
});

router.post('/newsletter/add', requireAuth, (req, res) => {
  const { email, nom, source } = req.body;
  const exists = db.find('subscribers', s => s.email === email);
  if (exists.length) {
    return res.redirect('/admin/newsletter?error=exists');
  }
  db.insert('subscribers', { email, nom: nom || '', statut: 'actif', source: source || 'admin' });
  db.insert('activity', { type: 'newsletter', action: `Abonné ajouté : ${email}`, user: req.session.adminUser.nom });
  res.redirect('/admin/newsletter?success=added');
});

router.post('/newsletter/toggle/:id', requireAuth, (req, res) => {
  const sub = db.findById('subscribers', req.params.id);
  if (sub) {
    const newStatut = sub.statut === 'actif' ? 'inactif' : 'actif';
    db.update('subscribers', req.params.id, { statut: newStatut });
    db.insert('activity', { type: 'newsletter', action: `Abonné ${newStatut} : ${sub.email}`, user: req.session.adminUser.nom });
  }
  res.redirect('/admin/newsletter');
});

router.post('/newsletter/delete/:id', requireAuth, (req, res) => {
  const sub = db.findById('subscribers', req.params.id);
  if (sub) {
    db.delete('subscribers', req.params.id);
    db.insert('activity', { type: 'newsletter', action: `Abonné supprimé : ${sub.email}`, user: req.session.adminUser.nom });
  }
  res.redirect('/admin/newsletter');
});

// Envoi campagne newsletter
router.get('/newsletter/campagne', requireAuth, (req, res) => {
  const actifs = db.find('subscribers', s => s.statut === 'actif');
  res.render('a-newsletter-campagne', {
    title: 'Nouvelle campagne',
    page: 'newsletter',
    actifs,
  });
});

router.post('/newsletter/campagne', requireAuth, async (req, res) => {
  const { sujet, contenu } = req.body;
  const actifs = db.find('subscribers', s => s.statut === 'actif');
  // Simuler l'envoi (sans mailer réel pour le démo)
  db.insert('activity', {
    type:   'newsletter',
    action: `Campagne envoyée à ${actifs.length} abonnés : "${sujet}"`,
    user:   req.session.adminUser.nom,
  });
  res.redirect('/admin/newsletter?campagne=sent&count=' + actifs.length);
});

// ════════════════════════════════════════
//  COLIS — Suivi & gestion
// ════════════════════════════════════════

router.get('/colis', requireAuth, (req, res) => {
  const { statut, q } = req.query;
  let colis = db.all('colis');
  if (statut) colis = colis.filter(c => c.statut === statut);
  if (q)      colis = colis.filter(c =>
    c.numero.toLowerCase().includes(q.toLowerCase()) ||
    c.client.toLowerCase().includes(q.toLowerCase()) ||
    (c.destination || '').toLowerCase().includes(q.toLowerCase())
  );
  const stats = db.stats().colis;
  res.render('a-colis', {
    title: 'Gestion des Colis',
    page: 'colis',
    colis, stats,
    filtreStatut: statut || '',
    q: q || '',
  });
});

router.get('/colis/new', requireAuth, (req, res) => {
  res.render('a-colis-form', { title: 'Nouveau Colis', page: 'colis', colis: null, error: null });
});

router.post('/colis/new', requireAuth, (req, res) => {
  const { client, email, telephone, origine, destination, poids, service, description, dateLivraison } = req.body;
  const now    = new Date();
  const numero = 'LEG-' + now.getFullYear() + '-' + String(Math.floor(Math.random() * 90000) + 10000);
  const doc = db.insert('colis', {
    numero, client, email, telephone, origine, destination, poids,
    service, description, dateLivraison, statut: 'En attente',
    etapes: [{ lieu: `${origine} – Dépôt Central`, date: new Date().toLocaleString('fr-FR'), done: false }],
  });
  db.insert('activity', { type: 'colis', action: `Colis créé : ${numero} → ${client}`, user: req.session.adminUser.nom });
  res.redirect('/admin/colis/' + doc.id);
});

router.get('/colis/:id', requireAuth, (req, res) => {
  const colis = db.findById('colis', req.params.id);
  if (!colis) return res.redirect('/admin/colis');
  res.render('a-colis-detail', { title: 'Détail Colis — ' + colis.numero, page: 'colis', colis });
});

router.post('/colis/:id/statut', requireAuth, (req, res) => {
  const { statut } = req.body;
  const colis = db.findById('colis', req.params.id);
  if (colis) {
    db.update('colis', req.params.id, { statut });
    db.insert('activity', { type: 'colis', action: `Statut ${colis.numero} → ${statut}`, user: req.session.adminUser.nom });
  }
  res.redirect('/admin/colis/' + req.params.id);
});

router.post('/colis/:id/etape', requireAuth, (req, res) => {
  const { lieu, date } = req.body;
  const colis = db.findById('colis', req.params.id);
  if (colis) {
    const etapes = colis.etapes || [];
    // Marquer toutes les étapes précédentes comme faites
    etapes.forEach(e => e.done = true);
    etapes.push({ lieu, date: date || new Date().toLocaleString('fr-FR'), done: false });
    db.update('colis', req.params.id, { etapes });
    db.insert('activity', { type: 'colis', action: `Étape ajoutée : ${colis.numero} — ${lieu}`, user: req.session.adminUser.nom });
  }
  res.redirect('/admin/colis/' + req.params.id);
});

router.post('/colis/:id/delete', requireAuth, (req, res) => {
  const colis = db.findById('colis', req.params.id);
  if (colis) {
    db.delete('colis', req.params.id);
    db.insert('activity', { type: 'colis', action: `Colis supprimé : ${colis.numero}`, user: req.session.adminUser.nom });
  }
  res.redirect('/admin/colis');
});

// ════════════════════════════════════════
//  MESSAGES — Contact
// ════════════════════════════════════════

router.get('/messages', requireAuth, (req, res) => {
  const { lu, q } = req.query;
  let messages = db.all('messages');
  if (lu === 'non') messages = messages.filter(m => !m.lu);
  if (lu === 'oui') messages = messages.filter(m => m.lu);
  if (q)            messages = messages.filter(m =>
    m.nom.toLowerCase().includes(q.toLowerCase()) ||
    m.email.toLowerCase().includes(q.toLowerCase()) ||
    m.objet.toLowerCase().includes(q.toLowerCase())
  );
  res.render('a-messages', {
    title: 'Messages de contact',
    page: 'messages',
    messages,
    total:   db.count('messages'),
    nonLus:  db.count('messages', m => !m.lu),
    repondus:db.count('messages', m => m.repondu),
    filtreLu: lu || '',
    q: q || '',
  });
});

router.get('/messages/:id', requireAuth, (req, res) => {
  const message = db.findById('messages', req.params.id);
  if (!message) return res.redirect('/admin/messages');
  if (!message.lu) {
    db.update('messages', req.params.id, { lu: true });
  }
  res.render('a-message-detail', { title: 'Message — ' + message.nom, page: 'messages', message });
});

router.post('/messages/:id/repondu', requireAuth, (req, res) => {
  db.update('messages', req.params.id, { repondu: true, lu: true });
  const msg = db.findById('messages', req.params.id);
  if (msg) db.insert('activity', { type: 'message', action: `Message répondu : ${msg.nom}`, user: req.session.adminUser.nom });
  res.redirect('/admin/messages/' + req.params.id);
});

router.post('/messages/:id/delete', requireAuth, (req, res) => {
  const msg = db.findById('messages', req.params.id);
  if (msg) {
    db.delete('messages', req.params.id);
    db.insert('activity', { type: 'message', action: `Message supprimé : ${msg.nom}`, user: req.session.adminUser.nom });
  }
  res.redirect('/admin/messages');
});

// ════════════════════════════════════════
//  DEVIS — Gestion
// ════════════════════════════════════════

router.get('/devis', requireAuth, (req, res) => {
  const { statut, q } = req.query;
  let devis = db.all('devis');
  if (statut) devis = devis.filter(d => d.statut === statut);
  if (q)      devis = devis.filter(d =>
    d.nom.toLowerCase().includes(q.toLowerCase()) ||
    d.email.toLowerCase().includes(q.toLowerCase()) ||
    (d.typeService || '').toLowerCase().includes(q.toLowerCase())
  );
  res.render('a-devis', {
    title: 'Demandes de devis',
    page: 'devis',
    devis,
    total:     db.count('devis'),
    enAttente: db.count('devis', d => d.statut === 'En attente'),
    enCours:   db.count('devis', d => d.statut === 'En cours'),
    traites:   db.count('devis', d => d.statut === 'Traité'),
    filtreStatut: statut || '',
    q: q || '',
  });
});

router.get('/devis/:id', requireAuth, (req, res) => {
  const devis = db.findById('devis', req.params.id);
  if (!devis) return res.redirect('/admin/devis');
  res.render('a-devis-detail', { title: 'Devis — ' + devis.nom, page: 'devis', devis });
});

router.post('/devis/:id/statut', requireAuth, (req, res) => {
  const { statut, montantPropose, noteInterne } = req.body;
  const devis = db.findById('devis', req.params.id);
  if (devis) {
    db.update('devis', req.params.id, { statut, montantPropose: montantPropose || devis.montantPropose, noteInterne });
    db.insert('activity', { type: 'devis', action: `Devis mis à jour : ${devis.nom} → ${statut}`, user: req.session.adminUser.nom });
  }
  res.redirect('/admin/devis/' + req.params.id);
});

router.post('/devis/:id/delete', requireAuth, (req, res) => {
  const devis = db.findById('devis', req.params.id);
  if (devis) {
    db.delete('devis', req.params.id);
    db.insert('activity', { type: 'devis', action: `Devis supprimé : ${devis.nom}`, user: req.session.adminUser.nom });
  }
  res.redirect('/admin/devis');
});

// ════════════════════════════════════════
//  BLOG — Gestion articles
// ════════════════════════════════════════

router.get('/blog', requireAuth, (req, res) => {
  const { publie, q } = req.query;
  let posts = db.all('blog_posts');
  if (publie === '1') posts = posts.filter(p => p.publie);
  if (publie === '0') posts = posts.filter(p => !p.publie);
  if (q)              posts = posts.filter(p =>
    p.titre.toLowerCase().includes(q.toLowerCase()) ||
    (p.categorie || '').toLowerCase().includes(q.toLowerCase()) ||
    (p.auteur || '').toLowerCase().includes(q.toLowerCase())
  );
  res.render('a-blog', {
    title: 'Gestion du Blog',
    page: 'blog',
    posts,
    total:     db.count('blog_posts'),
    publies:   db.count('blog_posts', p => p.publie),
    brouillons:db.count('blog_posts', p => !p.publie),
    filtrePub: publie || '',
    q: q || '',
  });
});

router.get('/blog/new', requireAuth, (req, res) => {
  res.render('a-blog-form', {
    title: 'Nouvel article',
    page: 'blog',
    post: null,
    error: null,
  });
});

router.post('/blog/new', requireAuth, (req, res) => {
  const { titre, categorie, auteur, resume, contenu_raw, tags, image_color, image_placeholder, publie } = req.body;
  const slug = titre.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim().replace(/\s+/g, '-');

  const existing = db.find('blog_posts', p => p.slug === slug);
  const finalSlug = existing.length ? slug + '-' + Date.now() : slug;

  const contenu = (contenu_raw || '').split('\n\n').map(block => {
    if (block.startsWith('## ')) return { type: 'h2', texte: block.slice(3).trim() };
    return { type: 'p', texte: block.trim() };
  }).filter(b => b.texte);

  const doc = db.insert('blog_posts', {
    slug:        finalSlug,
    titre,
    categorie:   categorie || 'Actualités',
    auteur:      auteur || req.session.adminUser.nom,
    date:        new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }),
    date_iso:    new Date().toISOString().slice(0, 10),
    lecture:     Math.ceil(contenu_raw.split(' ').length / 200) + ' min',
    resume,
    contenu,
    tags:        (tags || '').split(',').map(t => t.trim()).filter(Boolean),
    image_color: image_color || '#1a3a7c',
    image_placeholder: image_placeholder || 'fa-newspaper',
    publie:      publie === 'on',
    vues:        0,
  });
  db.insert('activity', { type: 'blog', action: `Article créé : "${titre}"`, user: req.session.adminUser.nom });
  res.redirect('/admin/blog/' + doc.id);
});

router.get('/blog/:id/edit', requireAuth, (req, res) => {
  const post = db.findById('blog_posts', req.params.id);
  if (!post) return res.redirect('/admin/blog');
  res.render('a-blog-form', { title: 'Modifier article', page: 'blog', post, error: null });
});

router.post('/blog/:id/edit', requireAuth, (req, res) => {
  const { titre, categorie, auteur, resume, contenu_raw, tags, image_color, image_placeholder, publie } = req.body;
  const contenu = (contenu_raw || '').split('\n\n').map(block => {
    if (block.startsWith('## ')) return { type: 'h2', texte: block.slice(3).trim() };
    return { type: 'p', texte: block.trim() };
  }).filter(b => b.texte);

  db.update('blog_posts', req.params.id, {
    titre, categorie, auteur, resume, contenu,
    tags:    (tags || '').split(',').map(t => t.trim()).filter(Boolean),
    image_color, image_placeholder,
    publie:  publie === 'on',
    lecture: Math.ceil((contenu_raw || '').split(' ').length / 200) + ' min',
  });
  db.insert('activity', { type: 'blog', action: `Article modifié : "${titre}"`, user: req.session.adminUser.nom });
  res.redirect('/admin/blog/' + req.params.id);
});

router.get('/blog/:id', requireAuth, (req, res) => {
  const post = db.findById('blog_posts', req.params.id);
  if (!post) return res.redirect('/admin/blog');
  res.render('a-blog-detail', { title: 'Article — ' + post.titre, page: 'blog', post });
});

router.post('/blog/:id/toggle', requireAuth, (req, res) => {
  const post = db.findById('blog_posts', req.params.id);
  if (post) {
    db.update('blog_posts', req.params.id, { publie: !post.publie });
    db.insert('activity', {
      type:   'blog',
      action: `Article ${!post.publie ? 'publié' : 'mis en brouillon'} : "${post.titre}"`,
      user:   req.session.adminUser.nom,
    });
  }
  res.redirect('/admin/blog');
});

router.post('/blog/:id/delete', requireAuth, (req, res) => {
  const post = db.findById('blog_posts', req.params.id);
  if (post) {
    db.delete('blog_posts', req.params.id);
    db.insert('activity', { type: 'blog', action: `Article supprimé : "${post.titre}"`, user: req.session.adminUser.nom });
  }
  res.redirect('/admin/blog');
});

// ════════════════════════════════════════
//  PARAMÈTRES — Profil admin
// ════════════════════════════════════════

router.get('/parametres', requireAuth, (req, res) => {
  const user = db.findById('admin_users', req.session.adminUser.id);
  res.render('a-parametres', { title: 'Paramètres', page: 'parametres', user, success: null, error: null });
});

router.post('/parametres/profil', requireAuth, (req, res) => {
  const { nom, email } = req.body;
  db.update('admin_users', req.session.adminUser.id, { nom, email });
  req.session.adminUser.nom   = nom;
  req.session.adminUser.email = email;
  const user = db.findById('admin_users', req.session.adminUser.id);
  res.render('a-parametres', { title: 'Paramètres', page: 'parametres', user, success: 'Profil mis à jour.', error: null });
});

router.post('/parametres/password', requireAuth, (req, res) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;
  const user = db.findById('admin_users', req.session.adminUser.id);
  const renderError = (error) =>
    res.render('a-parametres', { title: 'Paramètres', page: 'parametres', user, success: null, error });

  if (!bcrypt.compareSync(currentPassword, user.password)) return renderError('Mot de passe actuel incorrect.');
  if (newPassword.length < 8)        return renderError('Le nouveau mot de passe doit faire au moins 8 caractères.');
  if (newPassword !== confirmPassword) return renderError('Les mots de passe ne correspondent pas.');

  db.update('admin_users', req.session.adminUser.id, { password: bcrypt.hashSync(newPassword, 10) });
  res.render('a-parametres', { title: 'Paramètres', page: 'parametres', user, success: 'Mot de passe modifié avec succès.', error: null });
});

// API JSON pour stats en temps réel
router.get('/api/stats', requireAuth, (req, res) => {
  res.json(db.stats());
});

router.get('/api/chart', requireAuth, (req, res) => {
  res.json(db.chartData());
});

module.exports = router;
