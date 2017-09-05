exports.up = function(knex, Promise) {
  return knex.schema.createTable('mapIcons', (table) => {
    table.increments('id').primary();
    table.string('description').notNullable().defaultTo('');
    table.string('icon').notNullable().defaultTo('');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('mapIcons');
};
