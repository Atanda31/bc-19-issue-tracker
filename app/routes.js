/**
*Application Routes
*/

module.exports = function(app) {
	app.get('/', function(req, res){
		res.sendFile("starter/index.html");
	});
	app.get('/login', function(req,res) {
		res.sendFile('starter/login.html');
	});
}