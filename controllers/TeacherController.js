var bodyParser = require('body-parser');
var md5 = require('md5');
var urlencodedparser = bodyParser.urlencoded({ extended: false });
var currentTeacher;

module.exports = function (app, db) {

	app.post('/teachers/add', urlencodedparser, function (req, res) {
		var sql = `INSERT INTO users (first_name, last_name, userName, password, role) VALUE ('${req.body.first_name}', '${req.body.last_name}', '${req.body.username}', '${md5(req.body.password)}', 'teacher')`;
		db.query(sql, function (err, result) {
			if (err) throw err;
			res.send('Teacher Added');
		});
	});

	app.get('/teacher/dashboard/:id', function (req, res) {
		console.log(req.session.userID);

		currentTeacher = req.params.id;

		var sql = `SELECT classes.course_id, classes.color, classes.day, classes.start_time, classes.end_time,
				   users.first_name, users.last_name, classes.type, classes.location, courses.title,
				   class.shift, class.program, class.year, class.section, class.id
				   FROM classes
				   INNER JOIN users ON users.id =  classes.teacher
				   INNER JOIN courses ON courses.id = classes.course_id
				   INNER JOIN class ON class.id = classes.tt_id
				   WHERE classes.teacher = '${req.params.id}' `;

		db.query(sql, function (err, result) {
			if (result.length == 0) {
				result = {};
				result.first_name = req.session.first_name;
				result.last_name = req.session.last_name;
				result.no_courses = true;
			}
			console.log(result);
			res.render('teacher/dashboard', { courses: result, teacher: currentTeacher });
		});
	});

	app.get('/teacher/classView/:id', function (req, res) {
		var sql = `SELECT * FROM student WHERE class_id = '${req.params.id}' `;
		db.query(sql, function (err, result) {
			var classData = `SELECT * FROM class WHERE id='${req.params.id}' `;
			db.query(classData, function (err, result2) {
				res.render('teacher/classView', { students: result, myclass: result2, teacher: currentTeacher });
			});
		});
	});
}
