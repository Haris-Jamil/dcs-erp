var bodyParser = require('body-parser');

var urlencodedparser = bodyParser.urlencoded({ extended: false });

module.exports = function(app, db){

  //adds classs
  app.post('/addclass', urlencodedparser, function(req, res){
    var sql = `INSERT INTO class (shift, program, year, section) VALUES
               ('${req.body.shift}', '${req.body.degree}', '${req.body.year}', '${req.body.section}')`;
    db.query(sql, function(err, result){
      if(err)
        throw err;
      else
        res.send(JSON.stringify({msg:'Time Table Added', ttID: result.insertId}));
    });
  });

  //delete class
  app.get('/deleteclass/:id', function(req, res){
    var sql = `DELETE FROM classes WHERE tt_id = '${req.params.id}' `;
    db.query(sql, function(err, result){
      if(err) throw err;

      var sql2 = `DELETE FROM class WHERE id = '${req.params.id}' `;
      db.query(sql2, function(err, result2){
        res.redirect('/admin/class');
      });
    });
  });

}
