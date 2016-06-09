var pg = require('pg');
var conString = "postgres://username:password@localhost/database";

//this initializes a connection pool
//it will keep idle connections open for a (configurable) 30 seconds
//and set a limit of 10 (also configurable)
var getsignups = function(){
  var employees = [];
  pg.connect(conString, function(err, client, done) {
  if(err) {
    return console.error('error fetching client from pool', err);
  }
  client.query('SELECT * from employee_signup_information', function(err, result) {
    //call `done()` to release the client back to the pool
    done();

    if(err) {
      return console.error('error running query', err);
    }
    employees.push(result);
    //output: 1
  });
});
}
var methods = {getsignups:getsignups};
module.exports=methods;

