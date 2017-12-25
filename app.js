const express = require('express');
const mysql = require('mysql');
const expressSession = require('express-session');

const HomeController = require('./controllers/HomeController');
const UserController = require('./controllers/UserController');
const AdminController = require('./controllers/AdminController');
const ClassController = require('./controllers/ClassController');
const TimetableController = require('./controllers/TimetableController');
const StudentController = require('./controllers/StudentController');
const TeacherController = require('./controllers/TeacherController');
const CourseController = require('./controllers/CourseController');

const app = express();

//set up view engine
app.set('view engine', 'ejs');

//serves static files
app.use(express.static('./public'));
app.use(expressSession({
	secret: 'max',
	saveUninitialized: false,
	resave: false,
}));
app.use(function (req, res, next) {
	res.locals.session = req.session;
	next();
});

const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'asd123',
	database: 'erp'
});

db.connect((err) => {
	if (err) {
		console.log("Error Connecting: " + err.stack);
	}
	else {
		console.log("MySQL Connected");
	}
});

HomeController(app, db);
UserController(app, db);
AdminController(app, db);
ClassController(app, db);
TimetableController(app, db);
StudentController(app, db);
TeacherController(app, db);
CourseController(app, db);

app.listen(3000, () => {
	console.log("Server Listening on Port 3000");
});
