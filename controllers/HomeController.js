var bodyParser = require('body-parser');
var md5 = require('md5');

var urlencodedparser = bodyParser.urlencoded({ extended: false });

module.exports = function (app, db) {
	app.get('/', function (req, res) {
		if (req.session.userID) {
			if (req.session.role == 'admin')
				res.redirect('/admin/dashboard');
			else
				res.redirect('/teacher/dashboard/' + req.session.userID);
		}
		res.render('home/index', { notify: false, loginErr: false });
	});
}