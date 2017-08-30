exports.up = function(knex, Promise) {
  return knex.schema.createTable('user-badge', (table) => {
    table.integer('user_id').references('id').inTable('users').onDelete('cascade');
    table.integer('badge_id').references('id').inTable('badges').onDelete('cascade');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user-badge');
};
