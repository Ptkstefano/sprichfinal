var express = require('express');
var router = express.Router();
var db = require('../public/javascripts/dbController.js');
var crypto = require('crypto');

router
    .get('/', function(req, res, next) {
        res.render('register.html', {title: 'Register'})
    })
    .post('/', function(req, res, next) {

        let firstName = req.body.firstName;
        let lastName = req.body.lastName;
        let email = req.body.email;
        let password = req.body.password;

        let errorMessage = validate(firstName, lastName, email);

        if(errorMessage === "")
        {
            register(firstName, lastName, email, password);
            res.redirect('/login')
            return
        }
        else
        {
            res.render('error.html', {errorMessage: errorMessage})
        }

    })

function register(firstName, lastName, email, password)
{

    let cryptoPassword = crypto.createHash('sha256').update(password).digest('hex');
    let firstNameUpper = firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
    let lastNameUpper = lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase();

    let sql = "INSERT INTO users (user_id, user_firstName, user_lastName, user_email, user_password, user_status) VALUES (NULL,'"+firstNameUpper+"','"+lastNameUpper+"','"+email+"','"+cryptoPassword+"', 1);";
    db(sql);
    

}

module.exports = router;

function validate(firstName, lastName, email)
{
    let emailTest = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    let nameTest = new RegExp('^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]+$');
    let errorMessage = "";

    if(!nameTest.test(firstName))
    {
        errorMessage="false first name entered";
        return false;
    }

    if(!nameTest.test(lastName))
    {
        errorMessage="false last name entered";
        return false;
    }

    if (!emailTest.test(email))
    {
        errorMessage="false e-mail entered";
    }

    return errorMessage;

}