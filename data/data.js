const services = [
  {
    slug: 'transport-routier',
    icon: 'fa-truck',
    titre: 'Transport Routier',
    accroche: 'Livraison porte-à-porte dans toutes les provinces du Gabon.',
    description: 'Notre flotte de camions et de véhicules légers assure des livraisons fiables dans toute l\'étendue du territoire gabonais. Du petit colis au chargement complet (FTL) ou partiel (LTL), nous adaptons nos solutions à vos contraintes logistiques, qu\'il s\'agisse de marchandises générales, de produits alimentaires ou de matériaux de construction.',
    avantages: [
      'Livraison J+1 à Libreville et banlieue',
      'Couverture des 9 provinces du Gabon',
      'Suivi GPS en temps réel',
      'Camions frigorifiques disponibles',
      'Conducteurs professionnels et assurés',
      'Chargement complet (FTL) et partiel (LTL)',
    ],
    process: [
      { icon: 'fa-file-alt', titre: 'Demande de devis', desc: 'Soumettez votre demande en ligne ou par téléphone. Nous vous répondons sous 2h.' },
      { icon: 'fa-box', titre: 'Prise en charge', desc: 'Nos équipes collectent vos marchandises à l\'adresse convenue, emballées ou en vrac.' },
      { icon: 'fa-route', titre: 'Transport sécurisé', desc: 'Votre cargaison est acheminée par nos chauffeurs certifiés, avec suivi GPS en continu.' },
      { icon: 'fa-handshake', titre: 'Livraison confirmée', desc: 'Signature électronique à la livraison et notification immédiate par SMS.' },
    ],
    tarifs: [
      { label: 'Colis léger (< 10 kg)', prix: 'Dès 5 000 FCFA' },
      { label: 'Colis standard (10–100 kg)', prix: 'Dès 15 000 FCFA' },
      { label: 'Fret partiel LTL', prix: 'Sur devis' },
      { label: 'Camion complet FTL', prix: 'Sur devis' },
    ],
    faq: [
      { q: 'Quel est le délai de livraison en province ?', r: 'En général J+2 à J+4 selon la province. Oyem et Franceville sont desservies 3 fois par semaine.' },
      { q: 'Proposez-vous des camions réfrigérés ?', r: 'Oui, notre flotte comprend des véhicules frigorifiques pour les produits alimentaires et pharmaceutiques.' },
      { q: 'Puis-je suivre ma livraison ?', r: 'Absolument. Dès l\'enlèvement, vous recevez un numéro de suivi à utiliser sur notre page dédiée.' },
    ],
    color: '#e8381a',
  },
  {
    slug: 'transport-maritime',
    icon: 'fa-ship',
    titre: 'Transport Maritime',
    accroche: 'Liaison maritime fiable entre les ports gabonais et les grandes destinations africaines.',
    description: 'Spécialistes des liaisons maritimes entre Libreville, Port-Gentil et les grandes destinations côtières africaines et internationales. Notre service maritime est idéal pour les volumes importants, les charges lourdes et les équipements industriels que le transport routier ne peut pas acheminer.',
    avantages: [
      'FCL et LCL (conteneur complet ou groupage)',
      'Départs hebdomadaires vers Port-Gentil',
      'Gestion complète des formalités portuaires',
      'Transport de matières dangereuses (certifié)',
      'Assurance cargo tous risques disponible',
      'Entreposage portuaire sous douane',
    ],
    process: [
      { icon: 'fa-file-alt', titre: 'Devis et réservation', desc: 'Contactez notre service maritime pour obtenir un devis et réserver votre espace conteneur.' },
      { icon: 'fa-boxes-stacked', titre: 'Chargement', desc: 'Nous gérons le chargement et l\'arrimage de votre fret dans les conteneurs.' },
      { icon: 'fa-ship', titre: 'Transit maritime', desc: 'Votre fret est acheminé sur nos navires partenaires avec suivi de position.' },
      { icon: 'fa-anchor', titre: 'Livraison à quai', desc: 'Déchargement, dédouanement et livraison à votre entrepôt ou site de destination.' },
    ],
    tarifs: [
      { label: 'LCL (groupage), par m³', prix: 'Dès 45 000 FCFA' },
      { label: 'Conteneur 20 pieds (FCL)', prix: 'Sur devis' },
      { label: 'Conteneur 40 pieds (FCL)', prix: 'Sur devis' },
      { label: 'Fret hors-gabarit', prix: 'Sur devis' },
    ],
    faq: [
      { q: 'Quelle est la fréquence des départs ?', r: 'Nous assurons des rotations hebdomadaires entre Libreville et Port-Gentil, et des départs bimensuels vers les ports africains.' },
      { q: 'Pouvez-vous transporter des produits chimiques ?', r: 'Oui, notre équipe est certifiée pour le transport de matières dangereuses selon les normes IMDG.' },
      { q: 'Gérez-vous le dédouanement ?', r: 'Nous proposons une gestion complète des formalités douanières à l\'import et à l\'export.' },
    ],
    color: '#1a6baa',
  },
  {
    slug: 'transport-aerien',
    icon: 'fa-plane',
    titre: 'Transport Aérien',
    accroche: 'Fret express international en 24 à 72 heures vers toutes les destinations mondiales.',
    description: 'Pour vos envois urgents et vos marchandises à haute valeur ajoutée, notre service de fret aérien garantit les délais les plus courts. Grâce à nos accords avec les principales compagnies aériennes desservant l\'aéroport international Léon-Mba de Libreville, nous expédions vos marchandises vers l\'Europe, l\'Asie et les Amériques.',
    avantages: [
      'Express international en 24–72h',
      'Connexions Europe, Asie, Amériques',
      'Gestion des formalités douanières',
      'Emballage aux normes IATA',
      'Suivi en temps réel des vols',
      'Service de messagerie express disponible',
    ],
    process: [
      { icon: 'fa-file-alt', titre: 'Réservation', desc: 'Réservez votre espace fret en précisant le poids, les dimensions et la destination.' },
      { icon: 'fa-box-open', titre: 'Emballage IATA', desc: 'Nos experts emballent votre fret selon les standards de sécurité aérienne IATA.' },
      { icon: 'fa-plane-departure', titre: 'Expédition', desc: 'Votre fret est chargé à bord du vol, avec numéro de connaissance aérienne (AWB).' },
      { icon: 'fa-plane-arrival', titre: 'Livraison à destination', desc: 'Prise en charge à l\'aéroport de destination et livraison à l\'adresse finale.' },
    ],
    tarifs: [
      { label: 'Documents & petits colis (< 5 kg)', prix: 'Dès 35 000 FCFA' },
      { label: 'Fret général (5–100 kg)', prix: 'Dès 4 500 FCFA/kg' },
      { label: 'Fret lourd (> 100 kg)', prix: 'Sur devis' },
      { label: 'Messagerie express 24h', prix: 'Sur devis' },
    ],
    faq: [
      { q: 'Quelles destinations sont desservies ?', r: 'Nous desservons plus de 150 destinations via nos compagnies partenaires depuis Libreville.' },
      { q: 'Y a-t-il des restrictions sur les marchandises ?', r: 'Certaines marchandises sont interdites ou soumises à des restrictions aériennes. Contactez-nous pour vérification.' },
      { q: 'Combien de temps prend le dédouanement ?', r: 'En général 24 à 48h selon la destination. Nous préparons tous les documents en avance pour minimiser les délais.' },
    ],
    color: '#0ea5a0',
  },
  {
    slug: 'entreposage',
    icon: 'fa-warehouse',
    titre: 'Entreposage & Stockage',
    accroche: '5 000 m² d\'entrepôts sécurisés à Libreville et Owendo.',
    description: 'Nos entrepôts sécurisés à Libreville (Zone Industrielle d\'Oloumi) et à Owendo offrent une capacité de stockage flexible pour répondre à vos pics d\'activité. Que vous ayez besoin d\'un stockage temporaire ou d\'une gestion logistique complète, nos équipes assurent la réception, le contrôle, le stockage et l\'expédition de vos marchandises.',
    avantages: [
      '5 000 m² de surface de stockage',
      'Stockage sec, réfrigéré et sous douane',
      'Gestion des stocks en temps réel (WMS)',
      'Préparation et expédition de commandes',
      'Surveillance 24h/24, 7j/7',
      'Accès camion de grand gabarit',
    ],
    process: [
      { icon: 'fa-clipboard-list', titre: 'Audit de vos besoins', desc: 'Nos consultants analysent vos volumes, fréquences et contraintes pour dimensionner la solution.' },
      { icon: 'fa-truck-ramp-box', titre: 'Réception & contrôle', desc: 'Vos marchandises sont réceptionnées, comptées et contrôlées à l\'entrée en entrepôt.' },
      { icon: 'fa-layer-group', titre: 'Stockage optimisé', desc: 'Rangement selon vos références avec système de gestion d\'entrepôt (WMS) en temps réel.' },
      { icon: 'fa-dolly', titre: 'Préparation & expédition', desc: 'Picking, colisage et expédition vers vos clients finaux selon vos instructions.' },
    ],
    tarifs: [
      { label: 'Stockage palettisé, par palette/mois', prix: 'Dès 12 000 FCFA' },
      { label: 'Stockage vrac, par m²/mois', prix: 'Dès 3 500 FCFA' },
      { label: 'Stockage réfrigéré', prix: 'Sur devis' },
      { label: 'Gestion logistique complète', prix: 'Sur devis' },
    ],
    faq: [
      { q: 'Puis-je accéder à mes marchandises à tout moment ?', r: 'Oui, l\'accès est possible sur rendez-vous en heures ouvrables. Un accès d\'urgence 24h/24 peut être arrangé.' },
      { q: 'Proposez-vous le stockage sous douane ?', r: 'Oui, nous disposons d\'une zone sous douane agréée par les autorités gabonaises.' },
      { q: 'Gérez-vous la préparation de commandes e-commerce ?', r: 'Absolument. Nous proposons des services de fulfillment adaptés aux e-commerçants gabonais.' },
    ],
    color: '#7c3aed',
  },
  {
    slug: 'demenagement',
    icon: 'fa-box',
    titre: 'Déménagement',
    accroche: 'Service complet de déménagement pour particuliers et entreprises au Gabon.',
    description: 'Notre service de déménagement prend en charge l\'ensemble de votre projet de bout en bout : emballage professionnel, démontage et remontage des meubles, transport sécurisé et installation dans votre nouveau logement ou bureau. Nous intervenons à Libreville et dans toutes les provinces du Gabon.',
    avantages: [
      'Emballage professionnel fourni',
      'Démontage et remontage du mobilier',
      'Transport sécurisé de vos effets',
      'Déménagement d\'entreprise et de bureau',
      'Stockage temporaire si besoin',
      'Assurance tous risques incluse',
    ],
    process: [
      { icon: 'fa-eye', titre: 'Visite technique', desc: 'Un conseiller se déplace pour évaluer le volume et établir un devis précis et gratuit.' },
      { icon: 'fa-box-open', titre: 'Emballage', desc: 'Nos équipes emballent vos affaires avec soin : cartons, bulles, housses pour meubles.' },
      { icon: 'fa-truck-moving', titre: 'Transport', desc: 'Chargement, transport et déchargement réalisés par nos déménageurs certifiés.' },
      { icon: 'fa-couch', titre: 'Installation', desc: 'Remontage des meubles, déballage et mise en place selon vos instructions.' },
    ],
    tarifs: [
      { label: 'Studio / T1', prix: 'Dès 150 000 FCFA' },
      { label: 'Appartement T2–T3', prix: 'Dès 250 000 FCFA' },
      { label: 'Grande villa / bureau', prix: 'Sur devis' },
      { label: 'Déménagement interprovincial', prix: 'Sur devis' },
    ],
    faq: [
      { q: 'Faut-il que je sois présent le jour du déménagement ?', r: 'Votre présence ou celle d\'un représentant est recommandée pour la remise des clés et la vérification finale.' },
      { q: 'Déménagez-vous les objets fragiles ou de valeur ?', r: 'Oui, nous disposons d\'emballages spéciaux pour tableaux, œuvres d\'art, vaisselle et électronique.' },
      { q: 'Puis-je déménager en province ?', r: 'Oui, nous couvrons toutes les provinces. Un supplément kilométrique est appliqué au-delà de Libreville.' },
    ],
    color: '#d97706',
  },
  {
    slug: 'import-export',
    icon: 'fa-globe-africa',
    titre: 'Import / Export',
    accroche: 'Gestion complète de vos opérations douanières import-export au Gabon.',
    description: 'Notre équipe de commissionnaires agréés en douane vous accompagne dans toutes vos opérations d\'importation et d\'exportation. Nous gérons l\'intégralité des formalités administratives et douanières pour que vous puissiez vous concentrer sur votre cœur de métier, sans vous soucier des procédures complexes.',
    avantages: [
      'Commissionnaires en douane agréés',
      'Déclarations douanières électroniques',
      'Gestion des licences d\'import/export',
      'Conseil en classification tarifaire',
      'Optimisation des droits de douane',
      'Suivi des envois de bout en bout',
    ],
    process: [
      { icon: 'fa-file-invoice', titre: 'Analyse documentaire', desc: 'Vérification de vos factures, certificats d\'origine et documents de transport.' },
      { icon: 'fa-gavel', titre: 'Déclaration en douane', desc: 'Établissement et dépôt de la déclaration douanière auprès de la DGD Gabon.' },
      { icon: 'fa-money-bill-wave', titre: 'Paiement des droits', desc: 'Gestion du paiement des droits et taxes pour le compte de votre entreprise.' },
      { icon: 'fa-check-double', titre: 'Dédouanement & livraison', desc: 'Mainlevée de la marchandise et livraison à votre entrepôt ou site de production.' },
    ],
    tarifs: [
      { label: 'Déclaration douanière simple', prix: 'Dès 75 000 FCFA' },
      { label: 'Dossier import complet', prix: 'Sur devis' },
      { label: 'Dossier export complet', prix: 'Sur devis' },
      { label: 'Conseil douanier (heure)', prix: 'Sur devis' },
    ],
    faq: [
      { q: 'Êtes-vous agréés par la Direction Générale des Douanes ?', r: 'Oui, nous sommes commissionnaires en douane agréés au Gabon, numéro d\'agrément disponible sur demande.' },
      { q: 'Traitez-vous toutes les catégories de marchandises ?', r: 'Oui, sauf les produits frappés d\'interdiction totale. Contactez-nous pour les cas particuliers.' },
      { q: 'Combien de temps prend un dédouanement ?', r: 'En moyenne 24 à 72h pour un dossier complet. Les délais peuvent varier selon le circuit de visite douanière.' },
    ],
    color: '#059669',
  },
];

const articles = [
  {
    slug: 'logistique-gabon-2026',
    titre: 'Logistique au Gabon en 2026 : enjeux et opportunités',
    categorie: 'Actualités',
    auteur: 'Alphonse Minko',
    date: '15 Mars 2026',
    date_iso: '2026-03-15',
    lecture: '5 min',
    resume: 'Le secteur logistique gabonais connaît une transformation profonde portée par la digitalisation et les grands projets d\'infrastructure. Analyse des tendances clés pour 2026.',
    image_placeholder: 'fa-chart-line',
    image_color: '#1a2b4a',
    contenu: [
      {
        type: 'p',
        texte: 'Le Gabon s\'affirme de plus en plus comme un hub logistique en Afrique centrale. Grâce aux investissements massifs dans les infrastructures portuaires d\'Owendo et à la modernisation du réseau routier, le pays attire de nouveaux acteurs du transport et de la distribution.'
      },
      {
        type: 'h2',
        texte: 'La digitalisation au cœur de la transformation'
      },
      {
        type: 'p',
        texte: 'Les entreprises logistiques adoptent massivement les outils numériques : systèmes de gestion d\'entrepôt (WMS), suivi GPS en temps réel, plateformes de réservation en ligne. Cette digitalisation réduit les coûts opérationnels et améliore la visibilité sur les flux de marchandises.'
      },
      {
        type: 'h2',
        texte: 'Les infrastructures comme levier de croissance'
      },
      {
        type: 'p',
        texte: 'Le Port d\'Owendo, en pleine expansion, voit sa capacité de traitement des conteneurs augmenter de 40% d\'ici fin 2026. Le corridor Libreville–Franceville bénéficie également de travaux de réhabilitation qui réduisent les temps de transit vers le Haut-Ogooué.'
      },
      {
        type: 'p',
        texte: 'Les opportunités sont nombreuses pour les acteurs bien positionnés. La montée en puissance du e-commerce gabonais génère une demande croissante en services de livraison last-mile et de fulfillment, des segments encore largement sous-exploités.'
      },
    ],
    tags: ['Logistique', 'Gabon', 'Infrastructure', 'Digitalisation'],
  },
  {
    slug: 'guide-import-gabon',
    titre: 'Guide complet : importer des marchandises au Gabon',
    categorie: 'Guide pratique',
    auteur: 'Grace Ntoutoume',
    date: '8 Mars 2026',
    date_iso: '2026-03-08',
    lecture: '8 min',
    resume: 'Tout ce que vous devez savoir pour importer des marchandises au Gabon : documents requis, procédures douanières, taxes et astuces pour éviter les blocages.',
    image_placeholder: 'fa-file-import',
    image_color: '#065f46',
    contenu: [
      {
        type: 'p',
        texte: 'Importer des marchandises au Gabon peut sembler complexe pour les non-initiés. Entre les formalités douanières, les certificats d\'origine, les taxes et droits d\'entrée, il est facile de se retrouver bloqué au port. Ce guide vous donne les clés pour naviguer sereinement dans ce processus.'
      },
      {
        type: 'h2',
        texte: 'Les documents indispensables à l\'importation'
      },
      {
        type: 'p',
        texte: 'Pour tout import au Gabon, vous aurez besoin d\'une facture commerciale, d\'une liste de colisage (packing list), du connaissement maritime (B/L) ou de la lettre de transport aérien (AWB), du certificat d\'origine et, selon les produits, de certifications sanitaires ou phytosanitaires.'
      },
      {
        type: 'h2',
        texte: 'Les droits et taxes applicables'
      },
      {
        type: 'p',
        texte: 'Le Gabon applique le Tarif Extérieur Commun (TEC) de la CEMAC. Les droits de douane varient de 5% à 30% selon la catégorie du produit. La TVA intérieure de 18% s\'applique à la plupart des importations. Certains produits bénéficient d\'exonérations, notamment les équipements industriels sous régime particulier.'
      },
      {
        type: 'p',
        texte: 'Faire appel à un commissionnaire en douane agréé comme Logistic Express Gabon vous permet d\'optimiser légalement vos coûts douaniers et d\'éviter les erreurs de classification qui peuvent entraîner des pénalités.'
      },
    ],
    tags: ['Import', 'Douane', 'Guide', 'CEMAC'],
  },
  {
    slug: 'transport-maritime-libreville-port-gentil',
    titre: 'La liaison maritime Libreville – Port-Gentil : tout savoir',
    categorie: 'Transport Maritime',
    auteur: 'Patrick Ondo',
    date: '28 Fév. 2026',
    date_iso: '2026-02-28',
    lecture: '6 min',
    resume: 'La liaison maritime entre Libreville et Port-Gentil est l\'une des plus stratégiques du Gabon. Découvrez les fréquences, les types de fret acceptés et nos conseils pour optimiser vos envois.',
    image_placeholder: 'fa-ship',
    image_color: '#1a4b8a',
    contenu: [
      {
        type: 'p',
        texte: 'Port-Gentil, capitale économique et pétrolière du Gabon, n\'est reliée à Libreville par aucune route terrestre directe. La voie maritime reste donc le principal mode d\'acheminement des marchandises entre les deux villes, faisant de cette liaison l\'une des plus stratégiques du pays.'
      },
      {
        type: 'h2',
        texte: 'Fréquences et capacités'
      },
      {
        type: 'p',
        texte: 'Logistic Express Gabon propose des départs hebdomadaires depuis le Port d\'Owendo à Libreville. Les rotations permettent d\'acheminer jusqu\'à 500 tonnes par semaine, en conteneurs standards (20 et 40 pieds) ou en fret roulier pour les véhicules et engins de chantier.'
      },
      {
        type: 'h2',
        texte: 'Quels types de fret peut-on transporter ?'
      },
      {
        type: 'p',
        texte: 'Pratiquement toutes les marchandises peuvent être acheminées sur cette liaison : produits alimentaires, matériaux de construction, équipements industriels, véhicules, hydrocarbures (sous conditions), produits chimiques (selon classification IMDG). Les denrées périssables peuvent être transportées dans des conteneurs réfrigérés (reefer).'
      },
    ],
    tags: ['Maritime', 'Port-Gentil', 'Libreville', 'Conteneur'],
  },
  {
    slug: 'conseils-emballage-fret',
    titre: '10 conseils pour bien emballer votre fret',
    categorie: 'Guide pratique',
    auteur: 'Carine Folquet',
    date: '14 Fév. 2026',
    date_iso: '2026-02-14',
    lecture: '4 min',
    resume: 'Un emballage inadapté est la première cause de dommages lors du transport. Voici 10 conseils pratiques pour protéger efficacement vos marchandises.',
    image_placeholder: 'fa-box-open',
    image_color: '#7c2d12',
    contenu: [
      {
        type: 'p',
        texte: 'Chaque année, des milliers de colis arrivent endommagés à destination faute d\'un emballage adapté. Que vous envoyiez un colis léger ou un chargement complet, les principes de base restent les mêmes. Voici nos dix conseils d\'experts.'
      },
      {
        type: 'h2',
        texte: 'Choisir le bon contenant'
      },
      {
        type: 'p',
        texte: 'Utilisez toujours un carton double cannelure pour les envois lourds ou fragiles. Pour les palettes, assurez-vous que la charge est bien calée et filmée. Les objets métalliques ou saillants doivent être protégés individuellement pour éviter qu\'ils n\'endommagent les autres marchandises.'
      },
      {
        type: 'h2',
        texte: 'L\'importance du calage intérieur'
      },
      {
        type: 'p',
        texte: 'Le calage intérieur est aussi important que le carton lui-même. Rembourrage en mousse, papier bulle, polystyrène expansé : choisissez le matériau adapté à la fragilité de votre produit. L\'objet ne doit pas bouger à l\'intérieur du carton lorsque vous le secouez.'
      },
    ],
    tags: ['Emballage', 'Conseils', 'Fret', 'Transport'],
  },
  {
    slug: 'expansion-owendo-2026',
    titre: 'Le Port d\'Owendo se modernise : ce que ça change pour vous',
    categorie: 'Actualités',
    auteur: 'Alphonse Minko',
    date: '3 Fév. 2026',
    date_iso: '2026-02-03',
    lecture: '5 min',
    resume: 'Les travaux d\'expansion du Port d\'Owendo entrent dans leur phase finale. Quelles améliorations pour les entreprises importatrices et exportatrices au Gabon ?',
    image_placeholder: 'fa-anchor',
    image_color: '#0c4a6e',
    contenu: [
      {
        type: 'p',
        texte: 'Le Port d\'Owendo, principal terminal à conteneurs du Gabon, est en pleine mutation. Les travaux d\'extension lancés en 2024 entrent dans leur phase finale, promettant une capacité de traitement portée à 450 000 EVP (équivalents vingt pieds) par an d\'ici la fin de l\'année.'
      },
      {
        type: 'h2',
        texte: 'Des délais de traitement réduits'
      },
      {
        type: 'p',
        texte: 'L\'installation de deux nouveaux portiques de quai et d\'un système de gestion numérique des opérations (TOS) devrait réduire significativement les temps de transit portuaire. Les déclarations en douane dématérialisées permettront également d\'accélérer les mainlevées.'
      },
      {
        type: 'h2',
        texte: 'Ce que cela signifie pour vos imports'
      },
      {
        type: 'p',
        texte: 'Pour les importateurs, ces améliorations se traduiront concrètement par moins de congestion, des délais de dédouanement réduits et des coûts de surestarie diminués. Logistic Express Gabon a déjà signé des accords de partenariat avec la nouvelle concession portuaire pour garantir à ses clients un accès prioritaire aux quais.'
      },
    ],
    tags: ['Port', 'Owendo', 'Infrastructure', 'Actualités'],
  },
  {
    slug: 'demenagement-libreville-guide',
    titre: 'Déménager à Libreville : nos conseils pour une transition réussie',
    categorie: 'Guide pratique',
    auteur: 'Carine Folquet',
    date: '20 Jan. 2026',
    date_iso: '2026-01-20',
    lecture: '6 min',
    resume: 'Que vous arriviez de l\'étranger ou que vous changiez de quartier à Libreville, un déménagement bien planifié fait toute la différence. Voici comment nous y parvenir.',
    image_placeholder: 'fa-home',
    image_color: '#5b21b6',
    contenu: [
      {
        type: 'p',
        texte: 'Déménager est souvent classé parmi les expériences les plus stressantes de la vie. À Libreville, les spécificités locales — trafic dense, accès difficile dans certains quartiers, chaleur tropicale — ajoutent encore à cette complexité. Avec une bonne organisation, tout devient beaucoup plus simple.'
      },
      {
        type: 'h2',
        texte: 'Planifiez au moins 3 semaines à l\'avance'
      },
      {
        type: 'p',
        texte: 'Réservez votre date de déménagement au moins trois semaines avant le jour J. Les bonnes équipes et les camions sont rapidement pris, surtout en fin de mois et en début d\'année scolaire. Plus tôt vous réservez, plus vous avez de choix pour la date et le créneau horaire.'
      },
      {
        type: 'h2',
        texte: 'Faire appel à des professionnels : un investissement qui vaut le coup'
      },
      {
        type: 'p',
        texte: 'Confier votre déménagement à des professionnels comme Logistic Express Gabon vous évite blessures, casse et stress inutile. Notre équipe est formée aux techniques de manutention et dispose du matériel adapté (sangles, chariots, monte-meubles) pour travailler en toute sécurité.'
      },
    ],
    tags: ['Déménagement', 'Libreville', 'Conseils', 'Particuliers'],
  },
];

module.exports = { services, articles };
