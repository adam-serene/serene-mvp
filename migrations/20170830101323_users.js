exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('username').notNullable().defaultTo('');
    table.string('full_name').notNullable().defaultTo('');
    table.string('email').notNullable().unique();
    table.timestamps(true, true);
    table.specificType('hashed_password', 'char(60)').notNullable();
    table.date('birthday').notNullable();
    table.boolean('admin').defaultTo(false);
    table.string('avatar').defaultTo('');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
