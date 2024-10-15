const rounds = [
  {
    id: 1,
    name: "Personnalité",
  },
  {
    id: 2,
    name: "Situations",
  },
  {
    id: 3,
    name: "Relations",
  },
  {
    id: 4,
    name: "Représentations",
  },
];
const questions = [
  {
    id: 1,
    round_id: 1,
    name: "vos vrais amis, vous les comptez ...",
    answer_1: "Sur les doigts d'une main",
    answer_2: "Sur les deux mains",
    answer_3: "Vous n'avez pas assez de doigts pour les compter",
    answer_4: "Vous n'en avez pas",
  },
  {
    id: 2,
    round_id: 1,
    name: "à quelle fréquence vous observez-vous à travers un miroir ou des photos ?",
    answer_1: "Plus souvent que la plupart des gens",
    answer_2: "Moins souvent que la plupart des gens",
    answer_3: null,
    answer_4: null,
  },
  {
    id: 3,
    round_id: 1,
    name: "mentez-vous ?",
    answer_1: "Plus que la plupart des gens",
    answer_2: "Moins que la plupart des gens",
    answer_3: null,
    answer_4: null,
  },
  {
    id: 4,
    round_id: 1,
    name: "la vie à deux, pour vous c'est ...",
    answer_1: "Réconfortant",
    answer_2: "Excitant",
    answer_3: "Angoissant",
    answer_4: null,
  },
  {
    id: 5,
    round_id: 1,
    name: "on vous offre un cadeau qui ne vous plaît pas, vous dites ...",
    answer_1: "Merci, ça me plaît beaucoup",
    answer_2: "Qu’est-ce que j’ai fait pour mériter ça ?",
    answer_3:
      "J’apprécie le geste mais ce n’est pas exactement ce dont j’ai l’utilité, peut-on l'échanger ?",
    answer_4: null,
  },
  {
    id: 6,
    round_id: 1,
    name: "vous ne supportez pas les gens ...",
    answer_1: "Vulgaires",
    answer_2: "Prétentieux",
    answer_3: "Fourbes",
    answer_4: null,
  },
  {
    id: 7,
    round_id: 1,
    name: "selon vous, le vol ...",
    answer_1: "N’est jamais justifiable",
    answer_2: "Peut-être justifié si nécessaire",
    answer_3: "Est un risque à partir du moment où l’on possède un bien",
    answer_4: null,
  },
  {
    id: 8,
    round_id: 1,
    name: "en cas de conflit, êtes-vous plus enclin à ...",
    answer_1: "L’éviter",
    answer_2: "Rechercher un compromis",
    answer_3: "Prendre position et défendre votre point de vue",
    answer_4: null,
  },
  {
    id: 9,
    round_id: 1,
    name: "lorsque vous faites face à un problème, dans un premier temps vous êtes plutôt enclin à ...",
    answer_1: "Rechercher des solutions par vous-même",
    answer_2: "Demander de l'aide",
    answer_3: "Éviter le problème et remettre à plus tard",
    answer_4: null,
  },
  {
    id: 10,
    round_id: 1,
    name: "pour vous, la moins mauvaise société serait ...",
    answer_1: "Technocratique",
    answer_2: "Socialiste",
    answer_3: "Libérale",
    answer_4: null,
  },
  {
    id: 11,
    round_id: 1,
    name: "selon vous, la tolérance ...",
    answer_1: "Est un naïf aveu de faiblesse",
    answer_2: "Doit être accordée à tous",
    answer_3: "Ne doit être accordée que lorsque cela nous semble juste",
    answer_4: null,
  },
  {
    id: 12,
    round_id: 1,
    name: "pour vous, les inégalités sont ...",
    answer_1: "Insupportables",
    answer_2: "Inévitables",
    answer_3: "Souhaitables",
    answer_4: null,
  },
  {
    id: 13,
    round_id: 1,
    name: "pour vous, la vérité est ...",
    answer_1: "Un poids",
    answer_2: "Un droit",
    answer_3: "Une affaire d'interprétation",
    answer_4: null,
  },
  {
    id: 14,
    round_id: 1,
    name: "en politique, les sujets qui vous intéresse sont plutôt ...",
    answer_1: "Économiques",
    answer_2: "Sociaux",
    answer_3: "Environnementaux",
    answer_4: null,
  },
  {
    id: 15,
    round_id: 1,
    name: "vous préférez/préféreriez que votre enfant soit  ...",
    answer_1: "Gentil",
    answer_2: "Intelligent",
    answer_3: null,
    answer_4: null,
  },
  {
    id: 16,
    round_id: 1,
    name: "estimez vous qu’il faille plus de courage pour  ...",
    answer_1: "Surmonter un traumatisme",
    answer_2: "Se donner la mort",
    answer_3: null,
    answer_4: null,
  },
  {
    id: 17,
    round_id: 1,
    name: "quelle qualité vous attire le plus chez un partenaire romantique ...",
    answer_1: "Le physique",
    answer_2: "L'intelligence",
    answer_3: "L'humour",
    answer_4: null,
  },
  {
    id: 18,
    round_id: 1,
    name: "pour vous, le sexe c'est ...",
    answer_1: "Le ciment du couple",
    answer_2: "Un besoin physiologique",
    answer_3: null,
    answer_4: null,
  },
  {
    id: 19,
    round_id: 1,
    name: "vous vivez votre vie ...",
    answer_1: "Pour vous même",
    answer_2: "Pour un idéal",
    answer_3: "Pour quelqu’un d’autre/pour d’autres",
    answer_4: null,
  },
  {
    id: 20,
    round_id: 1,
    name: "pour vous la richesse matérielle c’est ...",
    answer_1: "Un péché",
    answer_2: "Une chance",
    answer_3: "Une récompense",
    answer_4: null,
  },
  {
    id: 21,
    round_id: 1,
    name: "vous considérez que la liberté d’expression doit être ...",
    answer_1: "Illimitée",
    answer_2: "Restreinte dans des espaces dédiés",
    answer_3: "Restreinte dans le contenu",
    answer_4: null,
  },
  {
    id: 22,
    round_id: 1,
    name: "pour vous la religion est ...",
    answer_1: "Une opportunité de donner un sens à sa vie",
    answer_2: "L’ancêtre de la politique",
    answer_3: "Dépassée à nôtre époque",
    answer_4: null,
  },
  {
    id: 23,
    round_id: 1,
    name: "pour vous, l’immigration ...",
    answer_1: "Doit être régulée",
    answer_2: "Doit être encouragée",
    answer_3: null,
    answer_4: null,
  },
  {
    id: 24,
    round_id: 1,
    name: "pour vous, le réchauffement climatique ...",
    answer_1: "Est un problème urgent et primordial",
    answer_2: "Est un combat perdu d’avance",
    answer_3: "N’est pas une priorité",
    answer_4: null,
  },
  {
    id: 25,
    round_id: 1,
    name: "les conflits au Moyen Orient ...",
    answer_1: "Vous dépassent",
    answer_2: "Vous indignent",
    answer_3: "Ne vous concernent pas",
    answer_4: null,
  },
  {
    id: 51,
    round_id: 2,
    name: "qui serait le plus enclin à partir avant la fin du jeu à cause d’une réponse qui ne lui plaît pas ?",
    answer_1: null,
    answer_2: null,
    answer_3: null,
    answer_4: null,
  },
  {
    id: 52,
    round_id: 2,
    name: "vous avez une opportunité de carrière exceptionnelle à l'étranger, mais cela signifierait laisser derrière vous votre famille et vos amis proches pour une période non négligeable, que choisissez-vous ?",
    answer_1: null,
    answer_2: null,
    answer_3: null,
    answer_4: null,
  },
  {
    id: 53,
    round_id: 2,
    name: "votre ami(e) a une altercation avec des inconnus. Prenez-vous instinctivement son parti sachant qu’il/elle peut être en faute ?",
    answer_1: null,
    answer_2: null,
    answer_3: null,
    answer_4: null,
  },
  {
    id: 54,
    round_id: 2,
    name: "vous découvrez qu'un ami très cher vous a caché un événement important de sa vie. Restez-vous son ami ?",
    answer_1: null,
    answer_2: null,
    answer_3: null,
    answer_4: null,
  },
  {
    id: 55,
    round_id: 2,
    name: "Vous avez promis à quelqu'un de garder un secret. Gardez-vous le silence au risque de nuire à une autre personne ?",
    answer_1: null,
    answer_2: null,
    answer_3: null,
    answer_4: null,
  },
];

module.exports = { rounds, questions };
