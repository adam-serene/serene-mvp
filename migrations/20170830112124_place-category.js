exports.up = function(knex, Promise) {
  return knex.schema.createTable('place-category', (table) => {
    table.increments('id').primary();
    table.foreign('place_id').references('places.id').notNullable();
    table.foreign('category_id').references('category.id').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('place-category');
};
