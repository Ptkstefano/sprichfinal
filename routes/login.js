var express = require('express');
var router = express.Router();
var db = require('../public/javascripts/dbController.js');
var username = require('../public/javascripts/username.js');
var topnav = require('../public/javascripts/topnav.js');
var crypto = require('crypto');


router
	.get('/', async function(req, res, next) {

		res.render('login.html', {title: 'Express', username: await username(req.session.user), topnav: topnav(req.session.user)});
	})
	.post('/', async function(req, res, next) {

        let email = req.body.email;
        let password = req.body.password;

		let response = await validate (email, password);

		if (response != null){

			req.session.regenerate(function (err) {
				if (err) next(err)
				req.session.user = response;
				req.session.save(function (err) {
				  if (err) return next(err)
				  res.redirect('/')
				  return
				})
			})
		}

		else{
			res.render('login.html', {title: 'Login', login: "User not located", username: await username(req.session.user), topnav: topnav(req.session.user)})
		}


	})



module.exports = router;


async function validate(email, password){

	let emailTest = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');

	if (!emailTest.test(email))
    {
       return null;
    }

	let cryptoPassword = crypto.createHash('sha256').update(password).digest('hex');

	let locate = await db("SELECT user_id FROM users WHERE user_email = '"+email+"' AND user_password = '"+cryptoPassword+"';");
	let found = locate[0];

	if (found != undefined)
	{
		response = locate[0]['user_id'];
		return response;
	}
	else
	{
		return null;
	}

}


