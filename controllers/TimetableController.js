var bodyParser = require('body-parser');

var urlencodedparser = bodyParser.urlencoded({ extended: false });

module.exports = function(app, db){

  app.get('/admin/timetable/edit/:id', function(req, res){

    var teacher;
    db.query("SELECT id, first_name, last_name FROM users WHERE role = 'teacher'", function(err, result){
      if(err) throw err;
      teacher = result;
    });

    var sql = `SELECT * FROM class WHERE id = '${req.params.id}' `;
    db.query(sql, function(err, result){
      if(err) throw err;

      var sql2 = `SELECT * FROM classes WHERE tt_id = '${req.params.id}' `;
      db.query(sql2, function(err, result2){

        program = result[0].program;
        year = result[0].year.substr(0,1);
        var getCourses = `SELECT * FROM courses WHERE year = '${year}' AND program = '${program}' `;

        db.query(getCourses, function(err, yearCourses){
            res.render('timetable/edit', {timetable: result , classes: result2, teachers: teacher, courses: yearCourses});
        });
      });
    });
  });


  //adds Course
  app.post('/addcourse', urlencodedparser, function(req, res){
    var sql = `INSERT INTO classes (course_id, color, day, start_time, end_time, teacher, type, location, tt_id) VALUES
              ('${req.body.course_id}', '${req.body.color}', '${req.body.day}', '${req.body.start_time}', '${req.body.end_time}',
              '${req.body.teacher}', '${req.body.type}', '${req.body.location}', '${req.body.ttid}') `;
    db.query(sql, function(err, result){
      if(err)
        throw err;
      else
        res.send(JSON.stringify({ttID: req.body.timetableID }));
    });
  });

  //return courses for canvas printing
  app.get('/getcourses/:id', function(req, res){
    var sql = `SELECT classes.course_id, classes.color, classes.day, classes.start_time, classes.end_time,
               users.first_name, users.last_name, classes.type, classes.location, courses.title
               FROM classes
               INNER JOIN users ON users.id =  classes.teacher
               INNER JOIN courses ON courses.id = classes.course_id
               WHERE classes.tt_id = '${req.params.id}' `;
    db.query(sql, function(err, result){
      if(err) throw err;

      res.send( JSON.stringify(result));
    });
  });


  app.get('/deletecourse/:id', function(req, res){
    var sql = `DELETE FROM classes WHERE id = '${req.params.id}' `;
    db.query(sql, function(err, result){
      if(err) throw err;
      res.send("Course Deleted");
    });
  });

}
