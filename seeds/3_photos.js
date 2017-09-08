exports.seed = function(knex, Promise) {

  let data = [
    {id: 1,
    url: 'https://preview.ibb.co/hbNFJa/postcard_point.jpg',
    user_id: 1,
    place_id: 1},

    {id: 2,
    url: 'http://cdn.onlyinyourstate.com/wp-content/uploads/2016/07/7903904278_ba823d7e02_b.jpg',
    user_id: 1,
    place_id: 2},

    {id: 3,
    url: 'http://preview.ibb.co/giKO4F/sanitas.jpg',
    user_id: 1,
    place_id: 3},

    {id: 4,
    url: 'http://preview.ibb.co/emHCWv/bearpeak.jpg',
    user_id: 1,
    place_id: 4},

    {id: 5,
    url: 'http://preview.ibb.co/bKmHya/valmontbike.jpg',
    user_id: 1,
    place_id: 5},

    {id: 6,
    url: 'http://image.ibb.co/b4GNWv/valmontdog.jpg',
    user_id: 1,
    place_id: 6},

    {id: 7,
    url: 'http://preview.ibb.co/fzOKBv/betasso.jpg',
    user_id: 1,
    place_id: 7},

    {id: 8,
    url: 'http://preview.ibb.co/f5ebrv/egf.jpg',
    user_id: 1,
    place_id: 8},

    {id: 9,
    url: 'http://image.ibb.co/nxJKBv/scrocket.jpg',
    user_id: 1,
    place_id: 9},

    {id: 10,
    url: 'http://image.ibb.co/dVuLJa/amph.jpg',
    user_id: 1,
    place_id: 10},
  ];

  return knex('photos').del()
    .then(() => {
      return knex('photos').insert(data);})
    .then(() => {
      return knex.raw("SELECT setval('photos_id_seq', (SELECT MAX(id) FROM photos))");
    });
};
