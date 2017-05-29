var router = express.Router();
var query = require('../db/orders');

router.get('/orders', function(req, res, next) {
  query.getOrders(req.body).then(function(data){
    res.json(data);
  });
})

router.post('/orders', function(req, res, next) {
  query.insertOrder(req.body).then(function(data){
    res.json(data[0]);
  });
})
