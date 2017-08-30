exports.up = function(knex, Promise) {
  return knex.schema.createTable('user-place', (table) => {
    table.increments('id').primary();
    table.foreign('user_id').references('users.id').notNullable();
    table.foreign('place_id').references('places.id').notNullable();
    table.timestamps(true, true);

  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user-place');
};
