/**
 * middleware/auth.js
 * Protège toutes les routes /admin — redirige vers /admin/login si non connecté
 */

function requireAuth(req, res, next) {
  if (req.session && req.session.adminUser) {
    res.locals.adminUser = req.session.adminUser;
    return next();
  }
  req.session.returnTo = req.originalUrl;
  res.redirect('/admin/login');
}

function requireGuest(req, res, next) {
  if (req.session && req.session.adminUser) {
    return res.redirect('/admin');
  }
  next();
}

module.exports = { requireAuth, requireGuest };
