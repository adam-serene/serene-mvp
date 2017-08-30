exports.seed = function(knex, Promise) {

  let data = [
    {id: 1,
    category: 'GO BIG'},

    {id: 2,
    category: 'c h i l l a x'},

    {id: 3,
    category: '[reup]'},
  ];

  return knex('categories').del()
    .then(() => {
      return knex('categories').insert(data);})
    .then(() => {
      return knex.raw("SELECT setval('categories_id_seq', (SELECT MAX(id) FROM categories))");
    });
};
