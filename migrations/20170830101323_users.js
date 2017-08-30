exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('username').notNullable().unique();
    table.string('full_name').notNullable().defaultTo('');
    table.string('email').notNullable().unique();
    table.date('birthday').notNullable();
    table.specificType('hashed_password', 'char(60)').notNullable();
    table.integer('score').defaultTo(0).notNullable();
    table.integer('submissions_remaining').defaultTo(10).notNullable();
    table.string('fitbitToken').defaultTo('');
    table.boolean('admin').defaultTo(false);
    table.boolean('anonymous').defaultTo(false);
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
