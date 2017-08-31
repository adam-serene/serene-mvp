exports.seed = function(knex, Promise) {

  let data = [
    {id: 1,
    user_id: 1,
    description: 'Postcard Point',
    lat: 39.938945153644035,
    long: -105.23653507232666,
    visits_this_month: 2},

    {id: 2,
    user_id: 1,
    description: 'Eldorado Spring Resort & Pool',
    lat: 39.93183522069995,
    long: -105.27945578098297,
    visits_this_month: 20},
  ];

  return knex('places').del()
    .then(() => {
      return knex('places').insert(data);})
    .then(() => {
      return knex.raw("SELECT setval('places_id_seq', (SELECT MAX(id) FROM places))");
    });
};
