exports.seed = function(knex, Promise) {

  let data = [
    {id: 1,
    username: 'Shotgun',
    full_name: 'Shannon Rivers',
    email: 'shannon@rivers.com',
    hashed_password: '$2a$06$PeZWh.HgnrcpySYkgyuQ8OpD/kRQKsuEYqI4HsTsJUuSdHjT0vQk2',
    admin: true,
    birthday: '01/01/1978',
    avatar: 'https://media.giphy.com/media/12EU871eV5HSq4/giphy.gif'
    }
  ];

  return knex('users').del()
    .then(() => {
      return knex('users').insert(data);})
    .then(() => {
      return knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users))");
    });
};
