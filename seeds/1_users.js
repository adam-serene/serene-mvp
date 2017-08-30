exports.seed = function(knex, Promise) {

  let data = [
    {id: 1,
    username: 'Shotgun',
    full_name: 'Shannon Rivers',
    email: 'shannon@rivers.com',
    birthday: '01/01/1978',
    hashed_password: '$2a$10$QZcfBTImKJDB1cFVC5uAden7oAI03gyKU9d7j.mnGTDheHocGTlCu',
    score: 10000000,
    submissions_remaining: 999,
    fitbitToken: '',
    admin: true,
    anonymous: true},

    {id: 2,
    username: 'that_guy_420',
    full_name: 'John Jacob Jingleheimerschimdt',
    email: 'jjj@jjj.org',
    birthday: '04/20/1992',
    hashed_password: '$2a$10$QZcfBTImKJDB1cFVC5uAden7oAI03gyKU9d7j.mnGTDheHocGTlCu',
    score: 100,
    submissions_remaining: 9,
    fitbitToken: '',
    admin: false,
    anonymous: false},
  ];

  return knex('users').del()
    .then(() => {
      return knex('users').insert(data);})
    .then(() => {
      return knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users))");
    });
};
