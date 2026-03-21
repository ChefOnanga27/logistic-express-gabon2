
const articles = [
  {
    slug: 'logistique-gabon-2026',
    titre: 'Logistique au Gabon en 2026 : enjeux et opportunités',
    categorie: 'Actualités',
    auteur: 'Équipe LEG',
    date: '15 Mars 2026',
    date_iso: '2026-03-15',
    lecture: '5 min',
    resume: 'Le secteur logistique gabonais connaît une transformation profonde portée par la digitalisation et les grands projets d\'infrastructure.',
    image_placeholder: 'fa-chart-line',
    image_color: '#1a3a7c',
    contenu: [
      { type: 'p', texte: 'Le Gabon s\'affirme de plus en plus comme un hub logistique en Afrique centrale.' },
      { type: 'h2', texte: 'La digitalisation au cœur de la transformation' },
      { type: 'p', texte: 'Les entreprises logistiques adoptent massivement les outils numériques.' },
    ],
    tags: ['Logistique', 'Gabon', 'Infrastructure'],
  },
  {
    slug: 'guide-import-gabon',
    titre: 'Guide complet : importer des marchandises au Gabon',
    categorie: 'Guide pratique',
    auteur: 'Équipe LEG',
    date: '8 Mars 2026',
    date_iso: '2026-03-08',
    lecture: '8 min',
    resume: 'Tout ce que vous devez savoir pour importer des marchandises au Gabon : documents requis, procédures douanières et astuces.',
    image_placeholder: 'fa-file-import',
    image_color: '#065f46',
    contenu: [
      { type: 'p', texte: 'Importer des marchandises au Gabon peut sembler complexe pour les non-initiés.' },
      { type: 'h2', texte: 'Les documents indispensables à l\'importation' },
      { type: 'p', texte: 'Pour tout import au Gabon, vous aurez besoin d\'une facture commerciale et d\'une liste de colisage.' },
    ],
    tags: ['Import', 'Douane', 'Guide'],
  },
  {
    slug: 'conseils-emballage-fret',
    titre: '10 conseils pour bien emballer votre fret',
    categorie: 'Guide pratique',
    auteur: 'Équipe LEG',
    date: '14 Fév. 2026',
    date_iso: '2026-02-14',
    lecture: '4 min',
    resume: 'Un emballage inadapté est la première cause de dommages lors du transport. Voici 10 conseils pratiques pour protéger vos marchandises.',
    image_placeholder: 'fa-box-open',
    image_color: '#7c2d12',
    contenu: [
      { type: 'p', texte: 'Chaque année, des milliers de colis arrivent endommagés à destination faute d\'un emballage adapté.' },
      { type: 'h2', texte: 'Choisir le bon contenant' },
      { type: 'p', texte: 'Utilisez toujours un carton double cannelure pour les envois lourds ou fragiles.' },
    ],
    tags: ['Emballage', 'Conseils', 'Transport'],
  },
];

module.exports = { services, articles };