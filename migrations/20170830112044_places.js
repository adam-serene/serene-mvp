exports.up = function(knex, Promise) {
  return knex.schema.createTable('places', (table) => {
    table.increments('id').primary();
    table.integer('user_id').references('id').inTable('users').onDelete('no action');
    table.string('description').notNullable().defaultTo('');
    table.decimal('lat',18,14).notNullable();
    table.decimal('long',18,14).notNullable();
    table.integer('visits_this_month').notNullable().defaultTo(0);
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('places');
};
