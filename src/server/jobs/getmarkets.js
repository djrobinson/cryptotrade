var autobahn = require('autobahn');
var wsuri = "wss://api.poloniex.com";
var connection = new autobahn.Connection({
  url: wsuri,
  realm: "realm1"
});
var Moment = require('moment');

var allMarkets = require('./pairs');

var Orders = require('../db/orders');
var Trades = require('../db/trades');

var openPairs = {};

var saveRouter = function(event, pair, kwarg) {
  if (event.type === 'orderBookModify') {
    var orderData = {
      time: Moment().format('lll'),
      kwarg: kwarg.seq,
      pair: pair,
      rate: event.data.rate,
      type: event.type,
      bidask: event.data.type,
      amount: event.data.amount
    }
    console.log("Order Book Modify: ", orderData);
    if (event.data.type === 'bid') {
      Orders.insertOrder(orderData).then(function(data){
        console.log("Inserted: ", data);
      });
    };

    if (event.data.type === 'ask') {
      Orders.insertOrder(orderData).then(function(data){
        console.log("Inserted: ", data);
      });
    };
  }

  if (event.type === 'orderBookRemove') {
    var orderData = {
      time: Moment().format('lll'),
      kwarg: kwarg.seq,
      pair: pair,
      rate: event.data.rate,
      type: event.type,
      bidask: event.data.type,
    }
    console.log("Order Book Remove: ", orderData);
    Orders.insertOrder(orderData).then(function(data){
      console.log("Inserted: ", data);
    });
  }

  if (event.type === 'newTrade') {
    var tradeData = {
      time: Moment().format('lll'),
      kwarg: kwarg.seq,
      tradeID: event.data.tradeID,
      pair: pair,
      amount: event.data.amount,
      rate: event.data.rate,
      total: event.data.total,
      type: event.data.type
    }
    console.log("New Trade: ", event, pair, kwarg.seq);
    if (event.data.type === 'buy') {
      Trades.insertTrade(tradeData).then(function(data){
        console.log("Inserted: ", data);
      });
    }
    if (event.data.type === 'sell') {
      Trades.insertTrade(tradeData).then(function(data){
        console.log("Inserted: ", data);
      });
    }
  }
};

var startMarket = function(pair, session) {
  function marketEvent (args,kwarg) {
    args.forEach(function(event) {
      saveRouter(event, pair, kwarg);
    });
  }
  session.subscribe(pair, marketEvent);
};

connection.onopen = function (session) {
  console.log('Opening connection');
  allMarkets.forEach(function(pair) {
    startMarket(pair, session);
  });
};

connection.onclose = function () {
  console.log("Websocket connection closed");
};

module.exports = connection;