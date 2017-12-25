var bodyParser = require('body-parser');
var multer = require('multer');
var fs = require('fs');
var csvParser = require('csv-parse');
var upload = multer({ dest: './' });

var urlencodedparser = bodyParser.urlencoded({ extended: false });

module.exports = function(app, db){

    //display student page with all students
    app.get('/admin/student/edit/:id', function(req, res){

      var sql = `SELECT * FROM class WHERE id = '${req.params.id}' `;
      db.query(sql, function(err, result){
        if(err) throw err;
        var sql2 = `SELECT * FROM student WHERE class_id = '${req.params.id}' ORDER BY id `;
        db.query(sql2, function(err, result2){
          if(err) throw err;          
            res.render('student/edit', {students: result2, classes: result});
        });
      });
    });

    //add students to table by uploadig a csv
    app.post('/admin/students',upload.any(), urlencodedparser, function(req, res) {

      if ((req.files[0].originalname).endsWith('.csv')) {
          fs.readFile(req.files[0].filename, {
              encoding: 'utf-8'
          }, function (err, csvData) {
              if (err) {
                  console.log(err);
              }
              csvParser(csvData, {
                  delimiter: ','
              }, function (err, data) {
                  if (err) {
                      console.log(err);
                  } else {
                      // console.log(req.body.class);
                      for (var i = 0; i < data.length; i++) {
                          // for(var j = 0; j < data[i].length; j++) {
                              var sql = `INSERT INTO student (id, first_name, last_name, class_id) VALUES ('${data[i][0]}',  '${data[i][1]}' , '${data[i][2]}' , '${req.body.class}')`;
                              //console.log(sql);
                              db.query(sql, function(err, result){
                                if(err) throw err;
                                console.log("Student Inserted");
                              });
                          // }
                      }
                  }
              });
          });
      }
      fs.unlink(req.files[0].filename);
      res.redirect('/admin/student/edit/' + req.body.class );
  });

}
