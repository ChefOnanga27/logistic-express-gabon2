const express = require('express');
const router = express.Router();
const { services, articles } = require('../data/data');
const mailer = require('../services/mailer');

// ======================== HOME ========================
router.get('/', (req, res) => {
  res.render('index', { title: 'Accueil', page: 'home', services, recentArticles: articles.slice(0, 3) });
});

// ======================== SERVICES ========================
router.get('/services', (req, res) => {
  res.render('services', { title: 'Nos Services', page: 'services', services });
});
router.get('/services/:slug', (req, res) => {
  const service = services.find(s => s.slug === req.params.slug);
  if (!service) return res.status(404).render('404', { title: 'Page introuvable', page: '' });
  res.render('service-detail', { title: service.titre, page: 'services', service, others: services.filter(s => s.slug !== service.slug).slice(0, 3) });
});

// ======================== BLOG ========================
router.get('/blog', (req, res) => {
  const { categorie } = req.query;
  const categories = [...new Set(articles.map(a => a.categorie))];
  const filtered = categorie ? articles.filter(a => a.categorie === categorie) : articles;
  res.render('blog', { title: 'Blog & Actualités', page: 'blog', articles: filtered, categories, categorieActive: categorie || null });
});
router.get('/blog/:slug', (req, res) => {
  const article = articles.find(a => a.slug === req.params.slug);
  if (!article) return res.status(404).render('404', { title: 'Article introuvable', page: '' });
  res.render('blog-detail', { title: article.titre, page: 'blog', article, recents: articles.filter(a => a.slug !== article.slug).slice(0, 3), articles });
});

// ======================== ABOUT ========================
router.get('/a-propos', (req, res) => {
  res.render('about', { title: 'À Propos', page: 'about' });
});

// ======================== CONTACT ========================
router.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact', page: 'contact', success: false, error: false });
});
router.post('/contact', async (req, res) => {
  const { nom, email, telephone, objet, message } = req.body;
  try {
    await mailer.sendContactNotification({ nom, email, telephone, objet, message });
    await mailer.sendContactConfirmation({ nom, email });
    res.render('contact', { title: 'Contact', page: 'contact', success: true, error: false });
  } catch (err) {
    console.error('Mail contact error:', err.message);
    res.render('contact', { title: 'Contact', page: 'contact', success: false, error: true });
  }
});

// ======================== DEVIS ========================
router.get('/devis', (req, res) => {
  res.render('devis', { title: 'Demande de Devis', page: 'devis', services, success: false, error: false });
});
router.post('/devis', async (req, res) => {
  const data = req.body;
  try {
    await mailer.sendDevisNotification(data);
    await mailer.sendDevisConfirmation({ nom: data.nom, email: data.email, typeService: data.typeService });
    res.render('devis', { title: 'Demande de Devis', page: 'devis', services, success: true, error: false });
  } catch (err) {
    console.error('Mail devis error:', err.message);
    res.render('devis', { title: 'Demande de Devis', page: 'devis', services, success: false, error: true });
  }
});

// ======================== NEWSLETTER ========================
router.post('/newsletter', async (req, res) => {
  const { email } = req.body;
  try {
    await mailer.sendNewsletterConfirmation({ email });
    await mailer.sendNewsletterNotification({ email });
    res.json({ success: true });
  } catch (err) {
    console.error('Mail newsletter error:', err.message);
    res.json({ success: false, message: 'Erreur lors de l\'inscription.' });
  }
});

// ======================== SUIVI ========================
router.get('/suivi', (req, res) => {
  res.render('tracking', { title: 'Suivi Colis', page: 'suivi', result: null });
});
router.post('/suivi', (req, res) => {
  const { numero } = req.body;
  const result = {
    numero, statut: 'En transit', origine: 'Libreville', destination: 'Port-Gentil',
    date_envoi: '15 Mars 2026', date_livraison: '20 Mars 2026',
    etapes: [
      { lieu: 'Libreville – Dépôt Central', date: '15 Mars 2026 08:00', done: true },
      { lieu: 'Owendo – Hub Logistique', date: '16 Mars 2026 14:00', done: true },
      { lieu: 'En transit maritime', date: '17 Mars 2026 09:00', done: true },
      { lieu: 'Port-Gentil – Livraison', date: '20 Mars 2026', done: false },
    ]
  };
  res.render('tracking', { title: 'Suivi Colis', page: 'suivi', result });
});

module.exports = router;
