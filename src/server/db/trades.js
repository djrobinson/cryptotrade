var knex = require('./knex');

function Trades() {
  return knex('trades');
}

module.exports = {
  getTrades: function(){
    return Trades().select();
  },
  getTrade: function(id){
    return Trades().where('id', id);
  },
  insertTrade: function(order){
    return Trades().insert(order).catch(function(err){
      console.log(err);
    });
  }
}