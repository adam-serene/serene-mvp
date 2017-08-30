exports.seed = function(knex, Promise) {

  let data = [
    {id: 1,
    url: 'https://goo.gl/maps/rPFi6Br1gX82',
    user_id: 1,
    place_id: 1},

    {id: 2,
    url: 'http://cdn.onlyinyourstate.com/wp-content/uploads/2016/07/7903904278_ba823d7e02_b.jpg',
    user_id: 1,
    place_id: 2},
  ];

  return knex('photos').del()
    .then(() => {
      return knex('photos').insert(data);})
    .then(() => {
      return knex.raw("SELECT setval('photos_id_seq', (SELECT MAX(id) FROM photos))");
    });
};
