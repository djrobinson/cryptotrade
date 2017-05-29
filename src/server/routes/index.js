var express = require('express');
var router = express.Router();
var query = require('../db/orders');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/orders', function(req, res, next) {
  query.getOrders(req.body).then(function(data){
    res.json(data[0]);
  });
})

router.post('/orders', function(req, res, next) {
  query.insertOrder(req.body).then(function(data){
    res.json(data[0]);
  });
})

module.exports = router;
