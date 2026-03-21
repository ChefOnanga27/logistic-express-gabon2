const nodemailer = require('nodemailer');

// Création du transporteur SMTP
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const FROM = `"${process.env.FROM_NAME || 'Logistic Express Gabon'}" <${process.env.FROM_EMAIL || process.env.SMTP_USER}>`;
const TO   = process.env.CONTACT_EMAIL || process.env.SMTP_USER;

/* ============================================================
   EMAIL : Notification interne — nouveau message de contact
   ============================================================ */
async function sendContactNotification({ nom, email, telephone, objet, message }) {
  const html = `
  <!DOCTYPE html>
  <html lang="fr">
  <head><meta charset="UTF-8"><style>
    body{font-family:Arial,sans-serif;background:#f4f6fb;margin:0;padding:0;}
    .wrap{max-width:600px;margin:32px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.09);}
    .header{background:linear-gradient(135deg,#1a3a7c,#2b7fd4);padding:32px 36px;text-align:center;}
    .header img{height:70px;margin-bottom:12px;}
    .header h1{color:#fff;font-size:1.3rem;margin:0;font-weight:700;}
    .header p{color:rgba(255,255,255,0.75);font-size:0.88rem;margin:6px 0 0;}
    .body{padding:36px;}
    .badge{display:inline-block;background:#f5c51820;color:#b8860b;border:1px solid #f5c518;font-size:0.78rem;font-weight:700;padding:4px 12px;border-radius:20px;margin-bottom:20px;letter-spacing:0.5px;text-transform:uppercase;}
    .field{margin-bottom:18px;padding:14px 18px;background:#f8f9fc;border-radius:8px;border-left:3px solid #2b7fd4;}
    .field label{font-size:0.75rem;font-weight:700;color:#2b7fd4;text-transform:uppercase;letter-spacing:0.5px;display:block;margin-bottom:4px;}
    .field span{font-size:0.97rem;color:#1e2530;}
    .msg-box{background:#f8f9fc;border-radius:8px;padding:18px;border-left:3px solid #1a3a7c;margin-top:8px;}
    .msg-box p{margin:0;color:#374151;font-size:0.97rem;line-height:1.7;}
    .footer{background:#1a3a7c;padding:20px 36px;text-align:center;}
    .footer p{color:rgba(255,255,255,0.5);font-size:0.8rem;margin:0;}
    .footer a{color:#f5c518;}
  </style></head>
  <body>
  <div class="wrap">
    <div class="header">
      <h1>📩 Nouveau message de contact</h1>
      <p>Reçu le ${new Date().toLocaleDateString('fr-FR', { weekday:'long', year:'numeric', month:'long', day:'numeric', hour:'2-digit', minute:'2-digit' })}</p>
    </div>
    <div class="body">
      <span class="badge">Formulaire de contact</span>
      <div class="field"><label>Nom complet</label><span>${nom}</span></div>
      <div class="field"><label>Email</label><span><a href="mailto:${email}">${email}</a></span></div>
      ${telephone ? `<div class="field"><label>Téléphone</label><span>${telephone}</span></div>` : ''}
      ${objet ? `<div class="field"><label>Objet</label><span>${objet}</span></div>` : ''}
      <div class="field" style="border-left-color:#1a3a7c;">
        <label>Message</label>
        <div class="msg-box"><p>${message.replace(/\n/g, '<br>')}</p></div>
      </div>
    </div>
    <div class="footer">
      <p>Logistic Express Gabon · <a href="mailto:${email}">Répondre à ${nom}</a></p>
    </div>
  </div>
  </body></html>`;

  await transporter.sendMail({
    from: FROM,
    to: TO,
    replyTo: email,
    subject: `[Contact LEG] ${objet || 'Nouveau message'} — ${nom}`,
    html,
  });
}

/* ============================================================
   EMAIL : Accusé de réception — envoyé à l'expéditeur
   ============================================================ */
async function sendContactConfirmation({ nom, email }) {
  const html = `
  <!DOCTYPE html>
  <html lang="fr">
  <head><meta charset="UTF-8"><style>
    body{font-family:Arial,sans-serif;background:#f4f6fb;margin:0;padding:0;}
    .wrap{max-width:600px;margin:32px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.09);}
    .header{background:linear-gradient(135deg,#1a3a7c,#2b7fd4);padding:40px 36px;text-align:center;}
    .check{font-size:3rem;margin-bottom:12px;}
    .header h1{color:#fff;font-size:1.5rem;margin:0 0 8px;font-weight:700;}
    .header p{color:rgba(255,255,255,0.8);font-size:0.95rem;margin:0;}
    .body{padding:40px 36px;text-align:center;}
    .body h2{color:#1a3a7c;font-size:1.2rem;margin-bottom:12px;}
    .body p{color:#6b7280;font-size:0.95rem;line-height:1.7;margin-bottom:20px;}
    .highlight{background:#f5c51815;border:1px solid #f5c518;border-radius:8px;padding:16px 20px;margin:24px 0;color:#1a3a7c;font-weight:600;}
    .contact-info{display:flex;justify-content:center;gap:32px;margin:24px 0;flex-wrap:wrap;}
    .ci{text-align:center;}
    .ci .icon{font-size:1.5rem;margin-bottom:4px;}
    .ci p{margin:0;font-size:0.85rem;color:#6b7280;}
    .ci strong{color:#1a3a7c;display:block;}
    .btn{display:inline-block;background:linear-gradient(135deg,#1a3a7c,#2b7fd4);color:#fff;padding:13px 32px;border-radius:50px;text-decoration:none;font-weight:700;font-size:0.95rem;margin-top:8px;}
    .footer{background:#f8f9fc;padding:20px 36px;text-align:center;border-top:1px solid #e5e7eb;}
    .footer p{color:#9ca3af;font-size:0.8rem;margin:0;}
  </style></head>
  <body>
  <div class="wrap">
    <div class="header">
      <div class="check">✅</div>
      <h1>Message bien reçu !</h1>
      <p>Merci de nous avoir contactés</p>
    </div>
    <div class="body">
      <h2>Bonjour ${nom},</h2>
      <p>Nous avons bien reçu votre message et nous vous en remercions.<br>
      Notre équipe vous répondra dans les <strong>meilleurs délais</strong>, généralement sous 2 à 4 heures ouvrables.</p>
      <div class="highlight">⏱️ Délai de réponse habituel : 2–4 heures (Lun–Sam, 07h30–18h00)</div>
      <p>En attendant, n'hésitez pas à nous appeler directement ou à consulter nos services en ligne.</p>
      <div class="contact-info">
        <div class="ci"><div class="icon">📞</div><strong>+241 074 00 00 00</strong><p>Lun–Sam 07h30–18h00</p></div>
        <div class="ci"><div class="icon">📧</div><strong>contact@logistic-express-gabon.ga</strong><p>Email principal</p></div>
      </div>
      <a href="https://logistic-express-gabon.ga/suivi" class="btn">Suivre un colis</a>
    </div>
    <div class="footer"><p>© ${new Date().getFullYear()} Logistic Express Gabon · Tous droits réservés</p></div>
  </div>
  </body></html>`;

  await transporter.sendMail({
    from: FROM,
    to: email,
    subject: `✅ Logistic Express Gabon — Votre message a bien été reçu`,
    html,
  });
}

/* ============================================================
   EMAIL : Notification interne — demande de devis
   ============================================================ */
async function sendDevisNotification(data) {
  const { nom, email, telephone, typeService, origine, destination, poids, description } = data;
  const html = `
  <!DOCTYPE html>
  <html lang="fr">
  <head><meta charset="UTF-8"><style>
    body{font-family:Arial,sans-serif;background:#f4f6fb;margin:0;padding:0;}
    .wrap{max-width:600px;margin:32px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.09);}
    .header{background:linear-gradient(135deg,#1a3a7c,#f5c518 200%);padding:32px 36px;}
    .header h1{color:#fff;font-size:1.3rem;margin:0 0 4px;font-weight:700;}
    .header p{color:rgba(255,255,255,0.75);font-size:0.88rem;margin:0;}
    .urgent{background:#f5c518;color:#1a3a7c;font-weight:700;font-size:0.8rem;padding:3px 10px;border-radius:10px;margin-left:8px;vertical-align:middle;}
    .body{padding:36px;}
    .section-title{font-size:0.75rem;font-weight:700;color:#2b7fd4;text-transform:uppercase;letter-spacing:1px;margin:24px 0 12px;padding-bottom:6px;border-bottom:1px solid #e5e7eb;}
    .grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
    .field{padding:12px 16px;background:#f8f9fc;border-radius:8px;border-left:3px solid #2b7fd4;}
    .field.full{grid-column:1/-1;}
    .field.accent{border-left-color:#f5c518;}
    .field label{font-size:0.72rem;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;display:block;margin-bottom:3px;}
    .field span{font-size:0.95rem;color:#1e2530;font-weight:600;}
    .footer{background:#1a3a7c;padding:20px 36px;text-align:center;}
    .footer p{color:rgba(255,255,255,0.5);font-size:0.8rem;margin:0;}
    .footer a{color:#f5c518;}
  </style></head>
  <body>
  <div class="wrap">
    <div class="header">
      <h1>📋 Nouvelle demande de devis <span class="urgent">À traiter</span></h1>
      <p>Reçue le ${new Date().toLocaleDateString('fr-FR', { weekday:'long', year:'numeric', month:'long', day:'numeric', hour:'2-digit', minute:'2-digit' })}</p>
    </div>
    <div class="body">
      <div class="section-title">👤 Informations client</div>
      <div class="grid">
        <div class="field"><label>Nom complet</label><span>${nom}</span></div>
        <div class="field"><label>Email</label><span><a href="mailto:${email}">${email}</a></span></div>
        ${telephone ? `<div class="field"><label>Téléphone</label><span>${telephone}</span></div>` : ''}
        ${typeService ? `<div class="field accent"><label>Type de service</label><span>${typeService}</span></div>` : ''}
      </div>

      ${(origine || destination || poids) ? `
      <div class="section-title">📦 Détails de l'envoi</div>
      <div class="grid">
        ${origine ? `<div class="field"><label>Ville d'origine</label><span>${origine}</span></div>` : ''}
        ${destination ? `<div class="field"><label>Destination</label><span>${destination}</span></div>` : ''}
        ${poids ? `<div class="field"><label>Poids / Volume estimé</label><span>${poids}</span></div>` : ''}
      </div>` : ''}

      ${description ? `
      <div class="section-title">💬 Description</div>
      <div class="field full"><label>Détails supplémentaires</label><span style="font-weight:400;line-height:1.6;">${description.replace(/\n/g,'<br>')}</span></div>` : ''}
    </div>
    <div class="footer">
      <p>Logistic Express Gabon · <a href="mailto:${email}">Répondre à ${nom}</a></p>
    </div>
  </div>
  </body></html>`;

  await transporter.sendMail({
    from: FROM,
    to: TO,
    replyTo: email,
    subject: `[Devis LEG] ${typeService || 'Demande'} — ${nom} — ${new Date().toLocaleDateString('fr-FR')}`,
    html,
  });
}

/* ============================================================
   EMAIL : Confirmation devis — envoyé au client
   ============================================================ */
async function sendDevisConfirmation({ nom, email, typeService }) {
  const html = `
  <!DOCTYPE html>
  <html lang="fr">
  <head><meta charset="UTF-8"><style>
    body{font-family:Arial,sans-serif;background:#f4f6fb;margin:0;padding:0;}
    .wrap{max-width:600px;margin:32px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.09);}
    .header{background:linear-gradient(135deg,#1a3a7c,#2b7fd4);padding:40px 36px;text-align:center;}
    .header h1{color:#fff;font-size:1.5rem;margin:0 0 8px;font-weight:700;}
    .header p{color:rgba(255,255,255,0.8);font-size:0.95rem;margin:0;}
    .body{padding:40px 36px;}
    .body h2{color:#1a3a7c;font-size:1.1rem;margin-bottom:12px;}
    .body p{color:#6b7280;font-size:0.95rem;line-height:1.7;margin-bottom:16px;}
    .steps{margin:28px 0;}
    .step{display:flex;align-items:flex-start;gap:14px;margin-bottom:16px;}
    .step-num{background:#1a3a7c;color:#f5c518;width:30px;min-width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0.85rem;}
    .step-text strong{color:#1a3a7c;display:block;font-size:0.95rem;margin-bottom:2px;}
    .step-text p{margin:0;font-size:0.88rem;color:#6b7280;}
    .highlight{background:#1a3a7c08;border:1px solid #1a3a7c20;border-radius:8px;padding:16px 20px;margin:24px 0;color:#1a3a7c;font-size:0.92rem;}
    .btn{display:inline-block;background:linear-gradient(135deg,#1a3a7c,#2b7fd4);color:#fff;padding:13px 32px;border-radius:50px;text-decoration:none;font-weight:700;font-size:0.95rem;}
    .footer{background:#f8f9fc;padding:20px 36px;text-align:center;border-top:1px solid #e5e7eb;}
    .footer p{color:#9ca3af;font-size:0.8rem;margin:0;}
  </style></head>
  <body>
  <div class="wrap">
    <div class="header">
      <h1>🚚 Demande de devis reçue !</h1>
      <p>Logistic Express Gabon — Votre partenaire logistique</p>
    </div>
    <div class="body">
      <h2>Bonjour ${nom},</h2>
      <p>Nous avons bien reçu votre demande de devis pour <strong>${typeService || 'nos services logistiques'}</strong>. Notre équipe commerciale va l'analyser et vous envoyer une proposition personnalisée très rapidement.</p>
      <div class="steps">
        <div class="step"><div class="step-num">1</div><div class="step-text"><strong>Analyse de votre besoin</strong><p>Notre équipe étudie votre demande en détail.</p></div></div>
        <div class="step"><div class="step-num">2</div><div class="step-text"><strong>Élaboration du devis</strong><p>Nous préparons une proposition tarifaire adaptée.</p></div></div>
        <div class="step"><div class="step-num">3</div><div class="step-text"><strong>Envoi sous 2–4h</strong><p>Vous recevez votre devis par email ou téléphone.</p></div></div>
      </div>
      <div class="highlight">📞 Pour toute urgence, appelez-nous directement au <strong>+241 074 00 00 00</strong> (Lun–Sam 07h30–18h00)</div>
      <a href="https://logistic-express-gabon.ga/services" class="btn">Découvrir nos services</a>
    </div>
    <div class="footer"><p>© ${new Date().getFullYear()} Logistic Express Gabon · Tous droits réservés</p></div>
  </div>
  </body></html>`;

  await transporter.sendMail({
    from: FROM,
    to: email,
    subject: `📋 Logistic Express Gabon — Devis en cours de préparation`,
    html,
  });
}

/* ============================================================
   EMAIL : Confirmation inscription newsletter
   ============================================================ */
async function sendNewsletterConfirmation({ email }) {
  const html = `
  <!DOCTYPE html>
  <html lang="fr">
  <head><meta charset="UTF-8"><style>
    body{font-family:Arial,sans-serif;background:#f4f6fb;margin:0;padding:0;}
    .wrap{max-width:600px;margin:32px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.09);}
    .header{background:linear-gradient(135deg,#1a3a7c,#2b7fd4);padding:40px 36px;text-align:center;}
    .icon{font-size:3rem;margin-bottom:12px;}
    .header h1{color:#fff;font-size:1.5rem;margin:0 0 8px;font-weight:700;}
    .header p{color:rgba(255,255,255,0.8);font-size:0.95rem;margin:0;}
    .body{padding:40px 36px;text-align:center;}
    .body p{color:#6b7280;font-size:0.95rem;line-height:1.7;margin-bottom:16px;}
    .topics{display:flex;justify-content:center;gap:16px;flex-wrap:wrap;margin:24px 0;}
    .topic{background:#f8f9fc;border:1px solid #e5e7eb;border-radius:8px;padding:12px 16px;font-size:0.85rem;color:#1a3a7c;font-weight:600;}
    .topic span{display:block;font-size:1.2rem;margin-bottom:4px;}
    .footer{background:#f8f9fc;padding:20px 36px;text-align:center;border-top:1px solid #e5e7eb;}
    .footer p{color:#9ca3af;font-size:0.78rem;margin:0;}
  </style></head>
  <body>
  <div class="wrap">
    <div class="header">
      <div class="icon">📬</div>
      <h1>Bienvenue dans notre newsletter !</h1>
      <p>Vous êtes maintenant abonné(e)</p>
    </div>
    <div class="body">
      <p>Merci pour votre inscription ! Vous recevrez désormais nos actualités, guides pratiques et conseils logistiques directement dans votre boîte mail.</p>
      <div class="topics">
        <div class="topic"><span>📦</span>Conseils transport</div>
        <div class="topic"><span>🗺️</span>Actualités Gabon</div>
        <div class="topic"><span>📋</span>Guides pratiques</div>
        <div class="topic"><span>🎁</span>Offres exclusives</div>
      </div>
      <p style="font-size:0.85rem;">Email enregistré : <strong>${email}</strong></p>
    </div>
    <div class="footer"><p>© ${new Date().getFullYear()} Logistic Express Gabon · <a href="#" style="color:#6b7280;">Se désabonner</a></p></div>
  </div>
  </body></html>`;

  await transporter.sendMail({
    from: FROM,
    to: email,
    subject: `📬 Bienvenue dans la newsletter Logistic Express Gabon !`,
    html,
  });
}

/* ============================================================
   EMAIL : Notification newsletter interne
   ============================================================ */
async function sendNewsletterNotification({ email }) {
  await transporter.sendMail({
    from: FROM,
    to: TO,
    subject: `[Newsletter LEG] Nouvel abonné : ${email}`,
    html: `<p style="font-family:Arial,sans-serif;padding:20px;">Nouvel abonnement newsletter :<br><strong>${email}</strong><br><small>Le ${new Date().toLocaleString('fr-FR')}</small></p>`,
  });
}

module.exports = {
  sendContactNotification,
  sendContactConfirmation,
  sendDevisNotification,
  sendDevisConfirmation,
  sendNewsletterConfirmation,
  sendNewsletterNotification,
};
