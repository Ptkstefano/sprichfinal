var express = require('express');
var router = express.Router();
var db = require('../public/javascripts/dbController.js');
var username = require('../public/javascripts/username.js');
var topnav = require('../public/javascripts/topnav.js');

/* GET users listing. */

var desiredCourse;

router
  .get('/', async function(req, res, next) {
    

    if(req.session.user===undefined)
    {
      res.redirect('/login');
      return
    }

    let courseid = req.query.courseid;
    desiredCourse = courseid;



    let userCheck =  await db("SELECT participation_id FROM participation WHERE part_class_id = "+courseid+" AND part_user_id = "+req.session.user+";");

    //Check if user is already enrolled in course
    if(typeof(userCheck[0]) == 'object')
    {
      res.redirect('/mycourses');
      return
    }

    let language = await db("SELECT class_language FROM classes WHERE class_id = "+courseid+";");
    let level = await db("SELECT class_level FROM classes WHERE class_id = "+courseid+";");
    let course = language[0]["class_language"]+" - "+level[0]["class_level"];

    res.render('enroll.html', { title: 'Express', username: await username(req.session.user), topnav: topnav(req.session.user), course: course});
    
    })
  .post('/', function(req, res, next) {

    if(req.session.user===undefined)
    {
      res.redirect('/login');
      return
    }

    let userid = req.session.user;
    registerCourse(desiredCourse, userid);

    res.redirect('/mycourses');
    
  });

module.exports = router;


function registerCourse(target, user)
{

  let sql = ("INSERT INTO participation (part_user_id, part_class_id, participation_id) VALUES ("+user+", "+target+", NULL);")
  console.log(sql);
  db(sql);

}