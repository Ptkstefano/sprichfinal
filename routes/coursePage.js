var express = require('express');
var router = express.Router();
var topnav = require('../public/javascripts/topnav.js');
var username = require('../public/javascripts/username.js');
var db = require('../public/javascripts/dbController.js');



/* GET home page. */
router.get('/', async function(req, res, next) {

  let course = req.query.course;
  let courseTitle = "";
  let courseText = "";
  let imagePath = "";
  let courseID;
  let courseAction = "/enroll?courseid="

  switch(course){
    
    case "englishbas": 
        courseTitle = "English - Basic";
        courseText = "<p>Want to get started in learning the world language with unrelenting immersion? Look no further! Our native language teachers are eager to get you up to speed and we provide the best materials available.</p>"
        imagePath= "<img src='images/englishflag.webp' alt='' />"
        courseID = 1;
        break;

    case "frenchbas":
        courseTitle = "French - Basic";
        courseText = "Allons-y! After taking this course you'll be willing and able to order all the crêpes au fromage walking down the Champs-Élysées to your heart's content. Our native speaker teachers are eager to get your started in speaking their beautiful language with the best supporting materials available. ";
        imagePath="<img src='images/frenchflag.png' alt='' />"
        courseID = 2;
        break;

    case "germanint":
        courseTitle = "German - Intermediate";
        courseText = "Hallöchen, wir welkomenn dir bei unserem mittelstuffen Deutschkurs! Here we will prepare you to tackle everyday life in germany and you'll be geared to understand and speak about the most versatile themes. Our native speaker teachers will prepare you to be confident in the german language with the highest quality materials available.";
        imagePath="<img src='images/germanflag.png' alt='' />"
        courseID = 3;
        break;

    default:
      courseTitle = "404 - Course not found";
        break;

}
  courseAction += courseID;
  htmlLink = '<a href = "'+courseAction+'">'
  res.render('coursePage.html', { title: 'Generic', courseImage: imagePath, courseTitle: courseTitle, courseText: courseText, username: await username(req.session.user), topnav: topnav(req.session.user), action: htmlLink});
});




module.exports = router;
