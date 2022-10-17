var express = require('express');
var router = express.Router();
var db = require('../public/javascripts/dbController.js');
var username = require('../public/javascripts/username.js');
var topnav = require('../public/javascripts/topnav.js');


/* GET home page. */
router.get('/', async function(req, res, next) {

  userID = req.session.user;
  let table = ''

  if (userID == undefined)
  {
    res.redirect('/')
    return
  }

  let userTypeQuery = await db("SELECT user_status FROM users WHERE user_id ="+userID+";");
  let userType = userTypeQuery[0]["user_status"];
  console.log("USER TYPE = "+userType);

  if (userType == 1)
  {
    //mostrar cursos do usuário
    let userClasses = await db("SELECT part_class_id FROM participation WHERE part_user_id="+userID+";");

    if(userClasses.length > 0)
    {
      table += "<table><tr><th>Language</th><th>Level</th><th>Starting date</th><th>Ending date</th><th>Teacher</th></tr>"
    }
    else
    {
      res.render('mycourses.html', { title: 'Generic', table: "Not enrolled in any courses, yet." });
      return
    }

    for(let i = 0; i < userClasses.length; i++)
    {

      classRow = await db("SELECT * FROM classes WHERE class_id ="+userClasses[i]["part_class_id"]+";");
      console.log(classRow);

      teacherID = classRow[0]['class_teacher_id'];
      teacherRow = await db("SELECT * FROM users WHERE user_id ="+teacherID+";");
      teacherName=teacherRow[0]["user_firstname"] + " " + teacherRow[0]["user_lastname"];

      table += "<tr><td>"+classRow[0]['class_language']+"</td><td>"+classRow[0]['class_level']+"</td><td>"+classRow[0]['class_start']+"</td><td>"+classRow[0]['class_end'] +"</td><td>"+teacherName+"</td></tr>";
      console.log(table)

    }

    table += "</table><br>"


    res.render('mycourses.html', { title: 'Generic', table: table });
    return

  }

  
  else if (userType == 2)
  {
    //mostrar alunos do usuário professor
    let teacherClasses = await db("SELECT * FROM classes WHERE class_teacher_id="+userID+";");


      for(let i = 0; i < teacherClasses.length; i++)
      {
        table += "<table><tr><th>Class ID:"+teacherClasses[i]['class_id']+"| Language: "+teacherClasses[i]['class_language']+"</th>"

        let students = await db("SELECT part_user_id FROM participation WHERE part_class_id ="+teacherClasses[i]['class_id']+";");

        for (let j = 0; j < students.length; j++)
        {

          let student = await db("SELECT * FROM users WHERE user_id = "+students[j]["part_user_id"]+";");

          let studentName = student[0]['user_firstname'] + ' ' + student[0]['user_lastname'];

          table += "<tr><td>"+studentName+"</td></tr>";

          console.log(student)

        }

        table += "</table><br>"

      }

      res.render('mycourses.html', { title: 'Generic', table: table });
      return

  }

  

});

module.exports = router;
