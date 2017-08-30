exports.seed = function(knex, Promise) {

  let data = [
    {id: 1,
    user_id: 1,
    place_id: 1},

    {id: 2,
    user_id: 1,
    place_id: 2},
  ];

  return knex('user-place').del()
    .then(() => {
      return knex('user-place').insert(data);})
    .then(() => {
      return knex.raw("SELECT setval('user-place_id_seq', (SELECT MAX(id) FROM user-place))");
    });
};
