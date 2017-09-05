exports.seed = function(knex, Promise) {
//checkout https://github.com/scottdejonge/map-icons
  let data = [
    {id: 1,
    description: 'GO BIG',
    icon: 'https://t3.rbxcdn.com/620793215c9a206f645aac09dbb869ae'},

    {id: 2,
    description: 'c h i l l a x',
    icon: 'http://modelscoutrobotics.org/wp/wp-content/uploads/2012/09/Neil-Armstrong-small-step.jpg'},

    {id: 3,
    description: '[reup]',
    icon: 'http://modelscoutrobotics.org/wp/wp-content/uploads/2012/09/Neil-Armstrong-small-step.jpg'},
  ];

  return knex('mapIcons').del()
    .then(() => {
      return knex('mapIcons').insert(data);})
    .then(() => {
      return knex.raw("SELECT setval('mapIcons_id_seq', (SELECT MAX(id) FROM badges))");
    });
};
