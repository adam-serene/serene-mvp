//these are user-place interactions, i.e. "check-ins"

exports.seed = function(knex, Promise) {

  let data = [
    {
    user_id: 1,
    place_id: 1},

    {
    user_id: 1,
    place_id: 2},
  ];

  return knex('user-place').del()
    .then(() => {
      return knex('user-place').insert(data);})
};
