exports.seed = function(knex, Promise) {

  let data = [
    {id: 1,
    user_id: 1,
    description: 'Postcard Point',
    lat: 39.938945153644035,
    lng: -105.23653507232666,
    visits_this_month: 2},

    {id: 2,
    user_id: 1,
    description: 'Eldorado Springs Resort & Pool',
    lat: 39.93183522069995,
    lng: -105.27945578098297,
    visits_this_month: 20},

    {id: 3,
    user_id: 1,
    description: 'Mt Sanitas summit',
    lat: 40.034301,
    lng: -105.305736,
    visits_this_month: 2000},

    {id: 4,
    user_id: 1,
    description: 'Bear Peak',
    lat: 39.960278,
    lng: -105.295174,
    visits_this_month: 12},

    {id: 5,
    user_id: 1,
    description: 'Valmont Bike Park',
    lat: 40.031840,
    lng: -105.233531,
    visits_this_month: 157890},

    {id: 6,
    user_id: 1,
    description: 'Valmont Dog Park',
    lat: 40.029800,
    lng: -105.229819,
    visits_this_month: 300},

    {id: 7,
    user_id: 1,
    description: 'Betasso Link downhill',
    lat: 40.014304,
    lng: -105.338502,
    visits_this_month: 420},

    {id: 8,
    user_id: 1,
    description: 'Eben G. Fine rapids',
    lat: 40.013170,
    lng: -105.296187,
    visits_this_month: 2},

    {id: 9,
    user_id: 1,
    description: 'Scott Carpenter rocket',
    lat: 40.012102,
    lng: -105.255332,
    visits_this_month: 2},

    {id: 10,
    user_id: 1,
    description: 'Sunrise Amphitheater on Flagstaff',
    lat: 40.003697,
    lng: -105.300827,
    visits_this_month: 710},
  ];

  return knex('places').del()
    .then(() => {
      return knex('places').insert(data);})
    .then(() => {
      return knex.raw("SELECT setval('places_id_seq', (SELECT MAX(id) FROM places))");
    });
};
