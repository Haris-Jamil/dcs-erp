var bodyParser = require('body-parser');
var md5 = require('md5');

var urlencodedparser = bodyParser.urlencoded({ extended: false });

module.exports = function (app, db) {

	app.post('/login', urlencodedparser, function (req, res) {
		var sql = `SELECT * FROM users WHERE userName = '${req.body.username}' AND password = '${md5(req.body.password)}' `;
		db.query(sql, function (err, result) {
			if (err) throw err;
			if (result.length == 0) {
				res.render('home/index', { notify: false, loginErr: true });
			}
			else if (result.length == 1) {
				req.session.userID = result[0].id;
				req.session.role = result[0].role;
				req.session.first_name = result[0].first_name;
				req.session.last_name = result[0].last_name;
				if (result[0].role == 'admin') {
					res.redirect('/admin/dashboard');
				}
				else {
					res.redirect('/teacher/dashboard/' + req.session.userID);
				}
			}
		});
	});

	app.get('/user/logout', function (req, res) {
		req.session.userID = undefined;
		req.session.role = undefined;
		res.redirect('/');
	});

}