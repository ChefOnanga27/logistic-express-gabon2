const services = [
  {
    slug: 'achat-international',
    icon: 'fa-cart-shopping',
    titre: 'Achat International Assisté',
    accroche: 'Achetez à l’étranger sans contrainte, nous nous occupons de tout.',
    description: 'Notre service d’achat international assisté permet aux particuliers et aux entreprises d’accéder aux marchés mondiaux sans avoir besoin de carte bancaire internationale ni d’expérience en e-commerce. Nous prenons en charge l’ensemble du processus : recherche du produit, vérification du fournisseur, négociation éventuelle, paiement sécurisé et suivi jusqu’à la réception dans notre entrepôt à l’étranger.',
    avantages: [
      'Achat sans carte bancaire internationale',
      'Accès aux marchés USA, Europe, Chine',
      'Vérification des fournisseurs et produits',
      'Paiement sécurisé à l’international',
      'Assistance personnalisée',
      'Gain de temps et réduction des risques',
    ],
    process: [
      { icon: 'fa-search', titre: 'Expression du besoin', desc: 'Le client transmet le lien ou la description du produit recherché.' },
      { icon: 'fa-check-circle', titre: 'Analyse & validation', desc: 'Nous vérifions la fiabilité du fournisseur, les prix et la disponibilité.' },
      { icon: 'fa-credit-card', titre: 'Paiement sécurisé', desc: 'Nous effectuons l’achat pour votre compte auprès du fournisseur.' },
      { icon: 'fa-box', titre: 'Expédition fournisseur', desc: 'Le produit est envoyé vers notre entrepôt à l’étranger.' },
    ],
    tarifs: [
      { label: 'Commission standard', prix: '5% à 10%' },
      { label: 'Frais minimum', prix: 'Dès 5 000 FCFA' },
      { label: 'Achat complexe / sourcing', prix: 'Sur devis' },
    ],
    faq: [
      { q: 'Puis-je acheter sur n’importe quel site ?', r: 'Oui, nous validons toujours la fiabilité avant achat.' },
      { q: 'Combien de temps prend l’achat ?', r: 'Généralement 24 à 72h après validation du paiement.' },
      { q: 'Et si le produit est indisponible ?', r: 'Nous proposons des alternatives fiables.' },
    ],
    color: '#2563eb',
  },

  {
    slug: 'reception-colis',
    icon: 'fa-warehouse',
    titre: 'Réception & Gestion des Colis à l’Étranger',
    accroche: 'Centralisez vos achats grâce à nos entrepôts internationaux.',
    description: 'Nous mettons à disposition des adresses de réception dans plusieurs pays (USA, Europe, Chine) afin de centraliser vos commandes. Chaque client dispose d’une identification unique permettant de suivre ses colis dès leur arrivée dans nos entrepôts partenaires.',
    avantages: [
      'Adresse personnelle à l’étranger',
      'Réception sécurisée des colis',
      'Notification en temps réel',
      'Inspection visuelle des colis',
      'Centralisation de plusieurs commandes',
      'Stockage temporaire disponible',
    ],
    process: [
      { icon: 'fa-location-dot', titre: 'Attribution adresse', desc: 'Une adresse unique vous est fournie.' },
      { icon: 'fa-truck', titre: 'Livraison fournisseur', desc: 'Vos commandes arrivent à l’entrepôt.' },
      { icon: 'fa-box-open', titre: 'Réception & contrôle', desc: 'Inspection de l’état du colis.' },
      { icon: 'fa-bell', titre: 'Notification', desc: 'Vous êtes informé immédiatement.' },
    ],
    tarifs: [
      { label: 'Réception colis', prix: 'Dès 2 000 FCFA' },
      { label: 'Stockage 7 jours', prix: 'Gratuit' },
      { label: 'Stockage prolongé', prix: 'Sur devis' },
    ],
    faq: [
      { q: 'Puis-je recevoir plusieurs colis ?', r: 'Oui, sans limite.' },
      { q: 'Combien de temps puis-je stocker ?', r: '7 jours gratuits, puis facturation.' },
    ],
    color: '#7c3aed',
  },

  {
    slug: 'consolidation-colis',
    icon: 'fa-boxes-stacked',
    titre: 'Consolidation & Reconditionnement',
    accroche: 'Réduisez vos coûts en regroupant vos colis.',
    description: 'Nous regroupons plusieurs colis en un seul envoi afin d’optimiser le volume, réduire les frais de transport et limiter les coûts douaniers. Ce service est particulièrement utile pour les clients effectuant plusieurs achats sur différents sites.',
    avantages: [
      'Réduction des frais de transport',
      'Optimisation du volume',
      'Réduction des frais douaniers',
      'Emballage sécurisé',
      'Protection renforcée des produits',
    ],
    process: [
      { icon: 'fa-box', titre: 'Réception multiple', desc: 'Plusieurs colis arrivent à l’entrepôt.' },
      { icon: 'fa-compress', titre: 'Optimisation', desc: 'Réduction du volume global.' },
      { icon: 'fa-shield-alt', titre: 'Reconditionnement', desc: 'Emballage sécurisé.' },
      { icon: 'fa-plane', titre: 'Expédition', desc: 'Envoi vers le pays.' },
    ],
    tarifs: [
      { label: 'Consolidation simple', prix: 'Dès 3 000 FCFA' },
      { label: 'Reconditionnement avancé', prix: 'Sur devis' },
    ],
    faq: [
      { q: 'Combien de colis puis-je regrouper ?', r: 'Autant que nécessaire.' },
    ],
    color: '#f59e0b',
  },

  {
    slug: 'transport-international',
    icon: 'fa-plane',
    titre: 'Transport International',
    accroche: 'Expédition rapide ou économique selon votre besoin.',
    description: 'Nous assurons le transport de vos colis depuis l’étranger vers le Gabon par voie aérienne ou maritime. Nous proposons plusieurs options adaptées à vos délais et à votre budget.',
    avantages: [
      'Transport aérien express',
      'Transport maritime économique',
      'Suivi en temps réel',
      'Sécurité des marchandises',
      'Flexibilité des options',
    ],
    process: [
      { icon: 'fa-calendar', titre: 'Planification', desc: 'Choix du mode de transport.' },
      { icon: 'fa-box', titre: 'Préparation', desc: 'Préparation des colis.' },
      { icon: 'fa-plane-departure', titre: 'Expédition', desc: 'Départ vers le Gabon.' },
      { icon: 'fa-map-marker-alt', titre: 'Arrivée', desc: 'Réception locale.' },
    ],
    tarifs: [
      { label: 'Aérien express', prix: 'Dès 4 500 FCFA/kg' },
      { label: 'Maritime', prix: 'Sur devis' },
    ],
    faq: [
      { q: 'Quel est le délai ?', r: '5 à 10 jours (aérien), 20 à 40 jours (maritime).' },
    ],
    color: '#0ea5a0',
  },

  {
    slug: 'dedouanement',
    icon: 'fa-file-invoice',
    titre: 'Dédouanement & Formalités',
    accroche: 'Nous gérons toutes les procédures douanières pour vous.',
    description: 'Notre équipe prend en charge toutes les formalités douanières afin de faciliter l’importation de vos marchandises sans stress ni complication.',
    avantages: [
      'Gestion complète des documents',
      'Paiement des droits et taxes',
      'Réduction des erreurs',
      'Gain de temps',
    ],
    process: [
      { icon: 'fa-file', titre: 'Analyse documentaire', desc: 'Vérification des documents.' },
      { icon: 'fa-gavel', titre: 'Déclaration', desc: 'Soumission en douane.' },
      { icon: 'fa-money-bill', titre: 'Paiement', desc: 'Paiement des taxes.' },
      { icon: 'fa-check', titre: 'Mainlevée', desc: 'Libération du colis.' },
    ],
    tarifs: [
      { label: 'Dossier simple', prix: 'Dès 50 000 FCFA' },
      { label: 'Dossier complexe', prix: 'Sur devis' },
    ],
    faq: [
      { q: 'Dois-je me déplacer ?', r: 'Non, nous gérons tout.' },
    ],
    color: '#059669',
  },

  {
    slug: 'assistance-douane',
    icon: 'fa-user-shield',
    titre: 'Assistance au Dédouanement à la Réception',
    accroche: 'Nous vous accompagnons pour récupérer vos colis sans difficulté.',
    description: 'En cas de blocage en douane ou de procédure spécifique, nous assistons le client pour faciliter la récupération de ses marchandises.',
    avantages: [
      'Assistance personnalisée',
      'Réduction des blocages',
      'Accompagnement administratif',
      'Gain de temps',
    ],
    process: [
      { icon: 'fa-exclamation-triangle', titre: 'Blocage', desc: 'Identification du problème.' },
      { icon: 'fa-file', titre: 'Constitution dossier', desc: 'Préparation des documents.' },
      { icon: 'fa-handshake', titre: 'Intervention', desc: 'Représentation du client.' },
      { icon: 'fa-check', titre: 'Récupération', desc: 'Déblocage du colis.' },
    ],
    tarifs: [
      { label: 'Assistance simple', prix: 'Dès 10 000 FCFA' },
      { label: 'Dossier complexe', prix: 'Sur devis' },
    ],
    faq: [
      { q: 'Intervenez-vous pour tous les colis ?', r: 'Oui, selon les cas.' },
    ],
    color: '#dc2626',
  },

  {
    slug: 'livraison-locale',
    icon: 'fa-truck',
    titre: 'Livraison Locale',
    accroche: 'Nous livrons vos colis partout au Gabon.',
    description: 'Nous assurons la livraison finale de vos colis à domicile, en entreprise ou en point relais sur toute l’étendue du territoire.',
    avantages: [
      'Livraison rapide',
      'Couverture nationale',
      'Livraison à domicile',
      'Options express',
    ],
    process: [
      { icon: 'fa-box', titre: 'Réception', desc: 'Colis prêt à livrer.' },
      { icon: 'fa-route', titre: 'Dispatch', desc: 'Affectation du livreur.' },
      { icon: 'fa-truck', titre: 'Livraison', desc: 'Transport vers client.' },
      { icon: 'fa-signature', titre: 'Confirmation', desc: 'Signature finale.' },
    ],
    tarifs: [
      { label: 'Livraison standard', prix: 'Dès 3 000 FCFA' },
      { label: 'Livraison express', prix: 'Sur devis' },
    ],
    faq: [
      { q: 'Livrez-vous en province ?', r: 'Oui.' },
    ],
    color: '#1d4ed8',
  },

  {
    slug: 'paiement-reception',
    icon: 'fa-money-bill-wave',
    titre: 'Caisse & Paiement à la Réception',
    accroche: 'Payez vos frais en toute simplicité à la livraison.',
    description: 'Nous proposons un système de paiement flexible permettant de régler les frais restants à la réception du colis.',
    avantages: [
      'Mobile Money',
      'Paiement en espèces',
      'Facturation automatique',
      'Historique des paiements',
    ],
    process: [
      { icon: 'fa-file-invoice', titre: 'Facturation', desc: 'Calcul des frais.' },
      { icon: 'fa-money-bill', titre: 'Paiement', desc: 'Paiement client.' },
      { icon: 'fa-receipt', titre: 'Reçu', desc: 'Remise du reçu.' },
    ],
    tarifs: [
      { label: 'Encaissement', prix: 'Inclus' },
    ],
    faq: [
      { q: 'Puis-je payer plus tard ?', r: 'Oui, sous conditions.' },
    ],
    color: '#16a34a',
  },
];