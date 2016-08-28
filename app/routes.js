/**
*Application Routes
*/

module.exports = function(app) {

	app.get('/', function(req, res){
		res.render('index.ejs');
	});

	app.get('/register', function(req,res) {
		res.render('register.ejs');
	});

	app.get('/dashboard', function(req,res) {
		res.render('home.ejs');
	});

	app.get('/admin', function(req,res) {
		res.render('adminLogin.ejs');
	});

	app.get('/admin_dashboard', function(req,res) {
		res.render('admin.ejs');
	});
}