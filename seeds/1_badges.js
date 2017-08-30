exports.seed = function(knex, Promise) {

  let data = [
    {id: 1,
    description: 'Beta Tester',
    image: 'https://t3.rbxcdn.com/620793215c9a206f645aac09dbb869ae'},

    {id: 2,
    description: 'Strider',
    image: 'http://modelscoutrobotics.org/wp/wp-content/uploads/2012/09/Neil-Armstrong-small-step.jpg'},
  ];

  return knex('badges').del()
    .then(() => {
      return knex('badges').insert(data);})
    .then(() => {
      return knex.raw("SELECT setval('badges_id_seq', (SELECT MAX(id) FROM badges))");
    });
};
