var express = require("express");
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var router = require('./routes/routes');
var html = require('html');
var app = express();

app.set('public', path.join(__dirname,'..','public'));
app.set('views', path.join(__dirname,'..','views'));

app.use("/",router);
 
// Start the server
app.set('port', process.env.PORT || 3000);
app.set('view engine', html); 

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});

module.exports = server
