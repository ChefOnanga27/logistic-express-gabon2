/**
 * db.js — Moteur de base de données JSON
 * Simule une base de données avec des fichiers JSON dans /data/db/
 * Collections : subscribers, colis, messages, devis, blog_posts, admin_users, activity
 */

const fs   = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const DB_DIR = path.join(__dirname, 'db');
if (!fs.existsSync(DB_DIR)) fs.mkdirSync(DB_DIR, { recursive: true });

// ─── Helpers ──────────────────────────────────────────────────────────────────

function dbPath(collection) {
  return path.join(DB_DIR, `${collection}.json`);
}

function readCollection(collection) {
  const file = dbPath(collection);
  if (!fs.existsSync(file)) return [];
  try { return JSON.parse(fs.readFileSync(file, 'utf8')); }
  catch { return []; }
}

function writeCollection(collection, data) {
  fs.writeFileSync(dbPath(collection), JSON.stringify(data, null, 2), 'utf8');
}

// ─── Generic CRUD ─────────────────────────────────────────────────────────────

const db = {

  // Lire tous les documents d'une collection
  all(collection) {
    return readCollection(collection);
  },

  // Trouver par ID
  findById(collection, id) {
    return readCollection(collection).find(d => d.id === id) || null;
  },

  // Trouver avec filtre
  find(collection, filterFn) {
    return readCollection(collection).filter(filterFn);
  },

  // Insérer
  insert(collection, data) {
    const docs = readCollection(collection);
    const doc  = { id: uuidv4(), createdAt: new Date().toISOString(), ...data };
    docs.unshift(doc);
    writeCollection(collection, docs);
    return doc;
  },

  // Mettre à jour
  update(collection, id, updates) {
    const docs    = readCollection(collection);
    const idx     = docs.findIndex(d => d.id === id);
    if (idx === -1) return null;
    docs[idx] = { ...docs[idx], ...updates, updatedAt: new Date().toISOString() };
    writeCollection(collection, docs);
    return docs[idx];
  },

  // Supprimer
  delete(collection, id) {
    const docs    = readCollection(collection);
    const updated = docs.filter(d => d.id !== id);
    writeCollection(collection, updated);
    return updated.length < docs.length;
  },

  // Compter
  count(collection, filterFn) {
    const docs = readCollection(collection);
    return filterFn ? docs.filter(filterFn).length : docs.length;
  },

  // Statistiques rapides
  stats() {
    const colis       = readCollection('colis');
    const subscribers = readCollection('subscribers');
    const messages    = readCollection('messages');
    const devis       = readCollection('devis');
    const posts       = readCollection('blog_posts');

    const now   = new Date();
    const today = now.toISOString().slice(0, 10);
    const thisMonth = now.toISOString().slice(0, 7);

    return {
      subscribers:    { total: subscribers.length, actifs: subscribers.filter(s => s.statut === 'actif').length },
      colis:          {
        total:      colis.length,
        enTransit:  colis.filter(c => c.statut === 'En transit').length,
        livres:     colis.filter(c => c.statut === 'Livré').length,
        enAttente:  colis.filter(c => c.statut === 'En attente').length,
        retard:     colis.filter(c => c.statut === 'Retard').length,
      },
      messages:       { total: messages.length, nonLus: messages.filter(m => !m.lu).length },
      devis:          { total: devis.length, enAttente: devis.filter(d => d.statut === 'En attente').length },
      posts:          { total: posts.length, publies: posts.filter(p => p.publie).length, brouillons: posts.filter(p => !p.publie).length },
      colisAujourdHui: colis.filter(c => c.createdAt && c.createdAt.slice(0,10) === today).length,
      devisAujourdHui: devis.filter(d => d.createdAt && d.createdAt.slice(0,10) === today).length,
    };
  },

  // Données pour graphiques (30 derniers jours)
  chartData() {
    const colis    = readCollection('colis');
    const devis    = readCollection('devis');
    const messages = readCollection('messages');

    const days = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      days.push({
        date:     key,
        label:    d.toLocaleDateString('fr-FR', { day:'2-digit', month:'2-digit' }),
        colis:    colis.filter(c => c.createdAt && c.createdAt.slice(0,10) === key).length,
        devis:    devis.filter(c => c.createdAt && c.createdAt.slice(0,10) === key).length,
        messages: messages.filter(c => c.createdAt && c.createdAt.slice(0,10) === key).length,
      });
    }
    return days;
  },
};

// ─── Seed initial data si vide ────────────────────────────────────────────────

function seed() {
  // Admin user
  if (db.count('admin_users') === 0) {
    const bcrypt = require('bcryptjs');
    db.insert('admin_users', {
      username: 'admin',
      password: bcrypt.hashSync('Admin@LEG2026', 10),
      nom:      'Alphonse Minko',
      role:     'super_admin',
      email:    'admin@logistic-express-gabon.ga',
    });
    console.log('👤 Admin créé: admin / Admin@LEG2026');
  }

  // Subscribers de démo
  if (db.count('subscribers') === 0) {
    const subs = [
      { email: 'jean.obame@olam.ga',     nom: 'Jean-Marie Obame',  statut: 'actif',    source: 'newsletter' },
      { email: 'sophie.nguema@gmail.com', nom: 'Sophie Nguema',     statut: 'actif',    source: 'newsletter' },
      { email: 'pierre.m@sarl.ga',       nom: 'Pierre Moussavou',  statut: 'actif',    source: 'contact' },
      { email: 'grace.nto@yahoo.fr',     nom: 'Grace Ntoutoume',   statut: 'inactif',  source: 'newsletter' },
      { email: 'client.test@gmail.com',  nom: 'Client Test',       statut: 'actif',    source: 'devis' },
    ];
    subs.forEach(s => db.insert('subscribers', s));
  }

  // Colis de démo
  if (db.count('colis') === 0) {
    const colisData = [
      { numero: 'LEG-2026-08471', client: 'Jean-Marie Obame',   email: 'jean.obame@olam.ga',      telephone: '+241 074 11 22 33', origine: 'Libreville', destination: 'Port-Gentil',  poids: '250 kg',  service: 'Transport Maritime', statut: 'En transit', dateLivraison: '2026-03-22', description: 'Équipements industriels', etapes: [{lieu:'Libreville – Dépôt',date:'2026-03-18 08:00',done:true},{lieu:'Owendo – Hub',date:'2026-03-19 14:00',done:true},{lieu:'En transit',date:'2026-03-20 09:00',done:true},{lieu:'Port-Gentil – Livraison',date:'2026-03-22',done:false}] },
      { numero: 'LEG-2026-08452', client: 'Sophie Nguema',       email: 'sophie.nguema@gmail.com', telephone: '+241 077 33 44 55', origine: 'Libreville', destination: 'Franceville', poids: '45 kg',   service: 'Transport Routier',  statut: 'Livré',      dateLivraison: '2026-03-19', description: 'Vêtements et accessoires', etapes: [{lieu:'Libreville – Dépôt',date:'2026-03-15 07:30',done:true},{lieu:'En route',date:'2026-03-16 12:00',done:true},{lieu:'Franceville – Livraison',date:'2026-03-19 10:00',done:true}] },
      { numero: 'LEG-2026-08495', client: 'Pierre Moussavou',    email: 'pierre.m@sarl.ga',        telephone: '+241 065 22 11 00', origine: 'Paris',       destination: 'Libreville',  poids: '1 200 kg',service: 'Transport Aérien',   statut: 'En attente', dateLivraison: '2026-03-25', description: 'Matériel médical import', etapes: [{lieu:'Paris CDG – En attente embarquement',date:'2026-03-20',done:false}] },
      { numero: 'LEG-2026-08410', client: 'Société PETROGAB',    email: 'logistique@petrogab.ga',  telephone: '+241 011 00 99 88', origine: 'Libreville', destination: 'Port-Gentil',  poids: '5 000 kg',service: 'Transport Maritime', statut: 'Retard',     dateLivraison: '2026-03-18', description: 'Pièces de rechange pétrolières', etapes: [{lieu:'Libreville – Dépôt',date:'2026-03-14 08:00',done:true},{lieu:'Owendo – En attente fret',date:'2026-03-17 10:00',done:true},{lieu:'Retard technique – Report',date:'2026-03-18',done:false}] },
      { numero: 'LEG-2026-08502', client: 'Ministère de la Santé',email: 'dsi@sante.gov.ga',       telephone: '+241 011 44 55 66', origine: 'Bruxelles',   destination: 'Libreville',  poids: '320 kg',  service: 'Transport Aérien',   statut: 'En transit', dateLivraison: '2026-03-21', description: 'Médicaments essentiels', etapes: [{lieu:'Bruxelles – Départ',date:'2026-03-19 22:00',done:true},{lieu:'Transit Casablanca',date:'2026-03-20 06:00',done:true},{lieu:'Libreville – Arrivée',date:'2026-03-21',done:false}] },
    ];
    colisData.forEach(c => db.insert('colis', c));
  }

  // Messages de démo
  if (db.count('messages') === 0) {
    const msgs = [
      { nom: 'Jean-Marie Obame',  email: 'jean.obame@olam.ga',      telephone: '+241 074 11 22 33', objet: 'Demande de renseignements', message: 'Bonjour, je souhaite obtenir des informations sur vos tarifs pour le transport maritime entre Libreville et Port-Gentil pour des volumes importants.', lu: false, repondu: false },
      { nom: 'Carine Dupont',     email: 'carine.d@gmail.com',       telephone: '',                  objet: 'Réclamation',               message: 'Mon colis LEG-2026-08410 est en retard depuis 2 jours. Merci de m\'informer rapidement de la situation.', lu: false, repondu: false },
      { nom: 'Société Foresta',   email: 'contact@foresta-gabon.ga', telephone: '+241 011 77 88 99', objet: 'Demande de partenariat',    message: 'Notre société est intéressée par un partenariat logistique annuel pour nos exportations de bois vers l\'Europe. Pouvez-vous nous proposer une offre globale ?', lu: true,  repondu: true  },
      { nom: 'Marc Essono',       email: 'marc.essono@hotmail.fr',   telephone: '+241 065 12 34 56', objet: 'Déménagement',              message: 'Je déménage de Libreville à Oyem le mois prochain. Pouvez-vous me faire une estimation pour un appartement T3 ?', lu: true,  repondu: false },
    ];
    msgs.forEach(m => db.insert('messages', m));
  }

  // Devis de démo
  if (db.count('devis') === 0) {
    const devisData = [
      { nom: 'Pierre Moussavou', email: 'pierre.m@sarl.ga',        telephone: '+241 065 22 11 00', typeService: 'Transport Aérien',   origine: 'Paris',      destination: 'Libreville', poids: '1 200 kg', description: 'Matériel médical urgent', urgent: 'oui', assurance: 'oui', statut: 'Traité',     montantPropose: '1 850 000 FCFA' },
      { nom: 'Carine Folquet',   email: 'cf@entreprise.ga',         telephone: '+241 077 55 66 77', typeService: 'Entreposage',        origine: 'Libreville', destination: 'Libreville', poids: '20 palettes', description: 'Stockage produits alimentaires 3 mois', urgent: '', assurance: '', statut: 'En attente', montantPropose: '' },
      { nom: 'Tech Gabon SARL',  email: 'logistique@techgabon.ga',  telephone: '+241 011 22 33 44', typeService: 'Import / Export',    origine: 'Chine',      destination: 'Libreville', poids: '2 conteneurs 20"', description: 'Import électronique et informatique', urgent: '', assurance: 'oui', statut: 'En cours',   montantPropose: '4 200 000 FCFA' },
      { nom: 'Famille Nguema',   email: 'nguema.famille@gmail.com', telephone: '+241 074 98 76 54', typeService: 'Déménagement',       origine: 'Libreville', destination: 'Oyem',       poids: 'Villa 4 pièces', description: 'Déménagement complet avec démontage mobilier', urgent: '', assurance: 'oui', statut: 'En attente', montantPropose: '' },
    ];
    devisData.forEach(d => db.insert('devis', d));
  }

  // Articles blog de démo (repris depuis data.js comme publiés)
  if (db.count('blog_posts') === 0) {
    const { articles } = require('./data');
    articles.forEach(a => {
      db.insert('blog_posts', {
        slug:        a.slug,
        titre:       a.titre,
        categorie:   a.categorie,
        auteur:      a.auteur,
        date:        a.date,
        lecture:     a.lecture,
        resume:      a.resume,
        contenu:     a.contenu,
        tags:        a.tags,
        image_placeholder: a.image_placeholder,
        image_color: a.image_color,
        publie:      true,
        vues:        Math.floor(Math.random() * 500) + 50,
      });
    });
  }
}

module.exports = { db, seed };
