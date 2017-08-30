exports.seed = function(knex, Promise) {

  let data = [
    {
    place_id: 1,
    category_id: 2},

    {
    place_id: 2,
    category_id: 2},
  ];

  return knex('place-category').del()
    .then(() => {
      return knex('place-category').insert(data);})
};
