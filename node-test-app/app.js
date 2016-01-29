'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();
var app = express();
var port = process.env.PORT || 3050;
var apiController = require('./controllers/apiController');
var htmlController = require('./controllers/htmlController');



app.use('/assets', express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

app.use('/', function(req, res, next) {
  console.log(`Request url: ${ req.url }`);
  
  var conn = mysql.createConnection({
      host: 'localhost',
      user: 'test',
      password: 'test',
      database: 'addressbook' 
  });
  
  next();
});

apiController(app);
htmlController(app);

app.listen(port);



