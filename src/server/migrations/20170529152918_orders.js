
exports.up = function(knex, Promise) {
  return knex.schema.createTable('orders', function(table){
    table.increments();
    table.date('time');
    table.string('kwarg');
    table.string('pair');
    table.decimal('rate');
    table.string('type');
    table.string('bidask');
    table.decimal('amount');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('orders');
};
