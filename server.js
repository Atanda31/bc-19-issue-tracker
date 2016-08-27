var express = require('express');
var app = express();
 
app.use(express.static('views/dist'));
app.use(express.static('views/assets'));
app.use(express.static('views/images'));
app.use(express.static('views/css'));
app.use(express.static('views'));
app.use(express.static('views/js'));

app.set('view engine', 'ejs');

require('./app/routes.js')(app);
app.listen(3000);

console.log('The magic happens on port 3000');