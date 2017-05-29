
exports.up = function(knex, Promise) {
  return knex.schema.createTable('trades', function(table){
    table.increments();
    table.date('time');
    table.string('kwarg');
    table.string('tradeID');
    table.string('pair');
    table.decimal('amount');
    table.decimal('rate');
    table.decimal('total');
    table.string('type');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('trades');
};
