exports.up = function(knex, Promise) {
  return knex.schema.createTable('user-badge', (table) => {
    table.increments('id').primary();
    table.integer('user_id').references('id').inTable('users');
    table.integer('badge_id').references('id').inTable('badges');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user-badge');
};
