exports.up = function(knex, Promise) {
  return knex.schema.createTable('badges', (table) => {
    table.increments('id').primary();
    table.string('description').notNullable().defaultTo('');
    table.string('image').notNullable().defaultTo('');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('badges');
};
