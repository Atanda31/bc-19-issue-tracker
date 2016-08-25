/**
*Application Routes
*/

module.exports = function(app) {

	app.get('/', function(req, res){
		res.sendFile('starter/index.html');
	});

	app.get('/register', function(req,res) {
		res.render('register.ejs');
	});

	app.get('/login', function(req,res) {
		res.render('login.ejs');
	});

	app.get('/home', function(req,res) {
		res.render('home.ejs');
	});

	app.post('/home', function(req,res) {
		res.render('home.ejs');
	});
}