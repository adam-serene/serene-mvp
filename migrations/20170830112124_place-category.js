exports.up = function(knex, Promise) {
  return knex.schema.createTable('place-category', (table) => {
    table.increments('id').primary();
    table.foreign('place_id').references('places.id').notNullable();
    table.integer('place_id').references('id').inTable('places');
    table.integer('category_id').references('id').inTable('categories');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('place-category');
};
