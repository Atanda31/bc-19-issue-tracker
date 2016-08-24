//var materilize = require('materialize-css');
var express = require('express');
var app = express();
 
app.use(express.static('starter'));
app.use(express.static('dist'));
app.use(express.static('assets'));
app.use(express.static('images'));
app.use(express.static('css'));
app.use(express.static('js'));
app.use(express.static('views'));

app.set('view engine', 'ejs');

require('./app/routes.js')(app);
app.listen(3000);

console.log('The magic happens on port 3000');