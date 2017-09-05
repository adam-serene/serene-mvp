exports.up = function(knex, Promise) {
  return knex.schema.createTable('place-mapIcon', (table) => {
    table.integer('place_id').references('id').inTable('places').onDelete('cascade');
    table.integer('mapIcon_id').references('id').inTable('mapIcons').onDelete('cascade');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('place-mapIcon');
};
