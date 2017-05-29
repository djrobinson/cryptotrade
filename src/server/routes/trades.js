var router = express.Router();
var query = require('../db/trades');

router.get('/trades', function(req, res, next) {
  query.getTrades(req.body).then(function(data){
    res.json(data);
  });
});

router.post('/trades', function(req, res, next) {
  query.insertTrade(req.body).then(function(data){
    res.json(data[0]);
  });
});
