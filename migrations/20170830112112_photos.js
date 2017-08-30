exports.up = function(knex, Promise) {
  return knex.schema.createTable('photos', (table) => {
    table.increments('id').primary();
    table.string('url').notNullable().unique();
    table.foreign('user_id').references('users.id').notNullable();
    table.foreign('place_id').references('places.id').notNullable();
    table.timestamps(true, true);

  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('photos');
};
