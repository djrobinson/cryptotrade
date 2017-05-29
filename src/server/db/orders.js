var knex = require('./knex');

function Orders() {
  return knex('orders');
}

module.exports = {
  getOrders: function(){
    return Orders().select();
  },
  getOrder: function(id){
    return Orders().where('id', id);
  },
  insertOrder: function(order){
    return Orders().insert(order).catch(function(err){
      console.log(err);
    });
  }
}