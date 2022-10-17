var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

  req.session.user = undefined;
  req.session.save(function (err) {
    if (err) next(err)

  })

  res.redirect('/');
});

module.exports = router;
