exports.seed = function(knex, Promise) {

  let data = [
    {
    user_id: 1,
    badge_id: 1},

    {
    user_id: 1,
    badge_id: 2},
  ];

  return knex('user-badge').del()
    .then(() => {
      return knex('user-badge').insert(data);})
};
