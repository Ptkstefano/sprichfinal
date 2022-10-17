var express = require('express');
var router = express.Router();
var topnav = require('../public/javascripts/topnav.js');
var username = require('../public/javascripts/username.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/');
})
.post('/', async function(req, res, next) {

    res.render('contact.html', { title: 'Express', username: await username(req.session.user), topnav: topnav(req.session.user) });



})

module.exports = router;
