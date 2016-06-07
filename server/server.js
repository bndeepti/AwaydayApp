var express = require("express");
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var router = require('./routes/routes');
var app = express();

app.use(express.static(path.join(__dirname,'..', 'public')));

app.get('/', function(req, res) {
    res.sendFile(path.resolve("index.html"));
});
app.use("/",router);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.sendFile(path.resolve("error.html"));
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.sendFile(path.resolve("index.html"));
});
 
// Start the server
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'html');
var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});

module.exports = server