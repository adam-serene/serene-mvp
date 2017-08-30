exports.up = function(knex, Promise) {
  return knex.schema.createTable('place-category', (table) => {
    table.integer('place_id').references('id').inTable('places').onDelete('cascade');
    table.integer('category_id').references('id').inTable('categories').onDelete('cascade');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('place-category');
};
