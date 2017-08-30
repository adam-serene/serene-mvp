exports.up = function(knex, Promise) {
  return knex.schema.createTable('photos', (table) => {
    table.increments('id').primary();
    table.string('url').notNullable().unique();
    table.integer('user_id').references('id').inTable('users').onDelete('cascade');
    table.integer('place_id').references('id').inTable('places').onDelete('cascade');
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('photos');
};
