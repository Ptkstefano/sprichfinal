const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./public/database/db.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err && err.code == "SQLITE_CANTOPEN") {
        createDatabase();
        return;
        } else if (err) {
            console.log("Getting error " + err);
            exit(1);
    }
});


function query2(sql){

  console.log("running query: " + sql)

  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    console.log(rows);
    return(rows);

  });

}

function query(sql){

  console.log("running query: " + sql)

  return new Promise((res, rej) => {
    db.serialize(function() {
        db.all(sql, [], function(err, rows) {
           if(err){
               rej(err);
           }
           res(rows);
       });
    });
   })
  //return(rows);

}

module.exports = query;
  

function createDatabase() {
  var newdb = new sqlite3.Database('./public/database/db.db', (err) => {
      if (err) {
          console.log("Getting error " + err);
          exit(1);
      }

      createTables(newdb);

  });
}


function createTables(newdb) {

  console.log("CREATING TABLES")

  newdb.all(`create table users ( 
    user_id INTEGER PRIMARY KEY,
     user_firstname VARCHAR(255) NOT NULL,
      user_lastname VARCHAR(255) NOT NULL,
        user_email VARCHAR(255) NOT NULL,
          user_password VARCHAR(255) NOT NULL,
            user_status INT NOT NULL );`)
             //status 0 - inactive, 1 - active, 2 - teacher

  newdb.all(`create table classes (
      class_id INTEGER PRIMARY KEY,
        class_language VARCHAR(255) NOT NULL,
          class_level VARCHAR(255) NOT NULL,
            class_start VARCHAR(255) NOT NULL,  
              class_end VARCHAR(255) NOT NULL,
                class_teacher_id INT NOT NULL
                  );`)
                  //NAO EXISTE DATE

  newdb.all(`create table participation (
    part_class_id INT NOT NULL,
      part_user_id INT NOT NULL,
        participation_id INTEGER PRIMARY KEY
  );`);


  //newdb.run('INSERT INTO classes (class_id, class_language, class_level) VALUES (NULL, "english", "basic");')

  //newdb.all('INSERT INTO classes (class_id, class_language, class_level, class_start, class_end, class_teacher_id) VALUES (NULL, "english", "basic", "2023-01-10", "2023-04-10", 1);');
	//newdb.all('INSERT INTO classes (class_id, class_language, class_level, class_start, class_end, class_teacher_id) VALUES (NULL, "french", "basic", "2023-01-10", "2023-04-10", 1);');
	//newdb.all('INSERT INTO classes (class_id, class_language, class_level, class_start, class_end, class_teacher_id) VALUES (NULL, "german", "intermediate", "2023-01-10", "2023-04-10", 1);');

     (err)  => { 
        if(err){
          console.log(err);
          //fs.unlink("./public/database/db.db");
        }     
  };

}




