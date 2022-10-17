var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('generic.html', { title: 'Generic' });
  console.log("LOADING GENERIC");
});

module.exports = router;
