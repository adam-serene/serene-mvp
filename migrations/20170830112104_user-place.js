exports.up = function(knex, Promise) {
  return knex.schema.createTable('user-place', (table) => {
    table.increments('id').primary();
    table.integer('user_id').references('id').inTable('users');
    table.integer('place_id').references('id').inTable('places');
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user-place');
};
