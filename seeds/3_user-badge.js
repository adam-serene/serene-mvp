exports.seed = function(knex, Promise) {

  let data = [
    {id: 1,
    user_id: 1,
    badge_id: 1},

    {id: 2,
    user_id: 1,
    badge_id: 2},
  ];

  return knex('user-badge').del()
    .then(() => {
      return knex('user-badge').insert(data);})
    .then(() => {
      return knex.raw("SELECT setval('user-badge_id_seq', (SELECT MAX(id) FROM user-badge))");
    });
};
