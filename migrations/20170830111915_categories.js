exports.up = function(knex, Promise) {
  return knex.schema.createTable('categories', (table) => {
    table.increments('id').primary();
    table.string('category').notNullable().defaultTo('');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('categories');
};
