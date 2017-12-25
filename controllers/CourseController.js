var bodyParser = require('body-parser');
var md5 = require('md5');

var urlencodedparser = bodyParser.urlencoded({ extended: false });

module.exports = function (app, db) {

  app.post('/courses/add', urlencodedparser, function(req, res){
    sql = `INSERT INTO courses (number, year, program, title, credit) VALUE ('${req.body.num}', '${req.body.year}', '${req.body.degree}', '${req.body.title}', '${req.body.credit}')`;
    db.query(sql, function(err, result){
      if(err) throw err;
      res.send("Courses Inserted");
    });
  });

}
