var bodyParser = require('body-parser');
var md5 = require('md5');

var urlencodedparser = bodyParser.urlencoded({ extended: false });

module.exports = function (app, db) {

  app.get('/admin/dashboard', function (req, res) {

        var counts = `SELECT
                            (SELECT COUNT(*) FROM student) as studentCount,
                            (SELECT COUNT(*) FROM courses) as courseCount,
                            (SELECT COUNT(*) FROM class) as classCount,
                            (SELECT COUNT(*) FROM users WHERE role='teacher' ) as teacherCount`;

        db.query(counts, function(err, result){
          if(err) throw err;
          res.render('admin/dashboard', {counts: result});
        });

  });

  app.get('/admin/class', function (req, res) {

      var sql = "SELECT * FROM class";

      db.query(sql, function(err, result){
        if(err) throw err;
        console.log(result);
        res.render('admin/class', {data : result});
      });
  });

  app.get('/admin/teachers', function(req, res){
    var sql = `SELECT * FROM users WHERE role = 'teacher' `;
    db.query(sql, function(err, result){
      if(err) throw err;
      res.render('admin/teachers', {teachers: result});
    });
  });

  app.get('/admin/courses', function(req, res){

    var csCourse;
    var seCourse;

    var sql1 = `SELECT * FROM courses WHERE program = 'BSCS' ORDER BY number`;
    db.query(sql1, function(err, result){
      if(err) throw err;
      csCourse = result;
    });

    var sql2 = `SELECT * FROM courses WHERE program = 'BSSE' ORDER BY number `;
    db.query(sql2, function(err, result){
      if(err) throw err;
      seCourse = result;
    });

    var sql3 = `SELECT * FROM courses WHERE program = 'MCS' ORDER BY number `;
    db.query(sql3, function(err, result){
      if(err) throw err;
      res.render('admin/courses', {csCourses: csCourse, seCourses: seCourse, mcsCourses: result });
    });

  });

}
