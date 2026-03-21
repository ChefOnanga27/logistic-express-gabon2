# 🚚 Logistic Express Gabon — v4.0

Site web complet + Tableau de bord Admin pour une entreprise de logistique au Gabon.
**Node.js · Express · EJS · Sessions · Nodemailer · JSON DB**

---

## 🚀 Installation & Démarrage

```bash
# 1. Installer les dépendances
npm install

# 2. Configurer les variables d'environnement
cp .env.example .env
# Éditer .env avec vos identifiants SMTP

# 3. Démarrer en développement
npm run dev

# 4. Démarrer en production
npm start
```

- **Site public** → http://localhost:3000
- **Admin**        → http://localhost:3000/admin
- **Login admin**  → `admin` / `Admin@LEG2026`

> ⚠️ Changez le mot de passe admin depuis **Paramètres** après la première connexion.

---

## 📁 Structure du projet

```
logistic-express-gabon/
│
├── app.js                          # Serveur Express — point d'entrée
├── package.json
├── .env.example                    # Template variables d'environnement
│
├── data/
│   ├── data.js                     # Données statiques (services, articles blog)
│   ├── db.js                       # Moteur base de données JSON (CRUD + seed)
│   └── db/                         # Créé automatiquement au démarrage
│       ├── admin_users.json
│       ├── colis.json
│       ├── devis.json
│       ├── messages.json
│       ├── subscribers.json
│       ├── blog_posts.json
│       └── activity.json
│
├── routes/
│   └── index.js                    # Routes publiques (site)
│
├── admin/
│   ├── middleware/
│   │   └── auth.js                 # Garde session (requireAuth / requireGuest)
│   ├── routes/
│   │   └── admin.js                # Toutes les routes admin GET/POST
│   └── views/                      # Vues admin (préfixées a-)
│       ├── a-login.ejs
│       ├── a-dashboard.ejs
│       ├── a-colis.ejs
│       ├── a-colis-detail.ejs
│       ├── a-colis-form.ejs
│       ├── a-devis.ejs
│       ├── a-devis-detail.ejs
│       ├── a-messages.ejs
│       ├── a-message-detail.ejs
│       ├── a-newsletter.ejs
│       ├── a-newsletter-campagne.ejs
│       ├── a-blog.ejs
│       ├── a-blog-form.ejs
│       ├── a-blog-detail.ejs
│       ├── a-parametres.ejs
│       └── partials/
│           ├── layout-top.ejs
│           └── layout-bottom.ejs
│
├── services/
│   └── mailer.js                   # Nodemailer — 6 templates emails
│
├── views/                          # Vues publiques
│   ├── index.ejs                   # Accueil (hero slider 3 slides)
│   ├── services.ejs
│   ├── service-detail.ejs
│   ├── blog.ejs
│   ├── blog-detail.ejs
│   ├── about.ejs
│   ├── contact.ejs
│   ├── devis.ejs
│   ├── tracking.ejs
│   ├── 404.ejs
│   └── partials/
│       ├── header.ejs
│       └── footer.ejs
│
└── public/
    ├── images/
    │   └── logo.jpeg
    ├── css/style.css               # CSS site public
    ├── js/main.js                  # JS site public (slider, reveals...)
    └── admin/
        ├── admin.css               # CSS tableau de bord
        └── admin.js                # JS tableau de bord
```

---

## 🗂️ Pages Admin

| Page | URL | Fonctionnalités |
|------|-----|-----------------|
| Connexion | `/admin/login` | Auth bcrypt, session 8h |
| Tableau de bord | `/admin` | KPIs, graphique 30j, activité récente |
| Colis — Liste | `/admin/colis` | Filtres statut/recherche, badges retard |
| Colis — Détail | `/admin/colis/:id` | Timeline, ajout étapes, changement statut |
| Colis — Nouveau | `/admin/colis/new` | Formulaire, numéro auto |
| Devis — Liste | `/admin/devis` | Filtres, montants proposés |
| Devis — Détail | `/admin/devis/:id` | Traitement, note interne, statut |
| Messages | `/admin/messages` | Style inbox, filtres lus/non lus |
| Message — Détail | `/admin/messages/:id` | Lecture, réponse email, marquage |
| Newsletter | `/admin/newsletter` | Abonnés, toggle actif, donut chart |
| Campagne | `/admin/newsletter/campagne` | Éditeur + preview HTML temps réel |
| Blog — Liste | `/admin/blog` | Grille articles, pub/dépub en 1 clic |
| Blog — Éditeur | `/admin/blog/new` | Éditeur Markdown, picker couleur/icône |
| Blog — Détail | `/admin/blog/:id` | Preview complet |
| Paramètres | `/admin/parametres` | Profil, mot de passe, infos SMTP |

---

## 📧 Emails automatiques (Nodemailer)

| Déclencheur | Emails envoyés |
|-------------|---------------|
| Formulaire Contact | Notification interne + accusé client |
| Demande de Devis | Notification interne + confirmation client |
| Newsletter | Bienvenue abonné + notification interne |

Configuration dans `.env` :
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=votre@gmail.com
SMTP_PASS=votre-app-password
CONTACT_EMAIL=contact@votre-domaine.ga
SESSION_SECRET=changez-cette-valeur
```

---

## 🗃️ Base de données JSON

Stockage fichier dans `data/db/` — aucune installation requise.
Seed automatique au démarrage avec données de démonstration.

Pour ajouter un service ou un article : éditer **`data/data.js`**.

---

## 🔧 Dépendances

| Package | Usage |
|---------|-------|
| `express` | Serveur web |
| `ejs` | Moteur de templates |
| `express-session` | Sessions admin |
| `bcryptjs` | Hashage mots de passe |
| `nodemailer` | Envoi d'emails |
| `uuid` | Génération IDs uniques |
| `dotenv` | Variables d'environnement |
