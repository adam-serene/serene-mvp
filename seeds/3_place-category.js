exports.seed = function(knex, Promise) {

  let data = [
    {id: 1,
    place_id: 1,
    category_id: 2},

    {id: 2,
    place_id: 2,
    category_id: 2},
  ];

  return knex('place-category').del()
    .then(() => {
      return knex('place-category').insert(data);})
    .then(() => {
      return knex.raw("SELECT setval('place-category_id_seq', (SELECT MAX(id) FROM place-category))");
    });
};
