exports.up = function(knex, Promise) {
  return knex.schema.createTable('user-badge', (table) => {
    table.increments('id').primary();
    table.foreign('user_id').references('users.id').notNullable();
    table.foreign('badge_id').references('badges.id').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user-badge');
};
