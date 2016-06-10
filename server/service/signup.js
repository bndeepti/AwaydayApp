var pg = require('pg');
var conString = "postgres://localhost:5432/testdb";

var getsignups = function(callback){
  pg.connect(conString, function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    client.query('SELECT * from employee_signup_information', function(err, result) {
      done();
      if(err) {
        return console.error('error running query', err);
      } 
      var employees=[];
      var employee={};
      result.rows.forEach(function(row) {
        employee={};
        employee.id=row["id"];
        employee.mobilenumber=row["mobilenumber"];
        employee.location=row["location"];
        employee.status=row["status"];
        employees.push(employee);
      }); 
      callback(employees);
    });
  });
}

var addtosignup = function(employee,callback){
  pg.connect(conString, function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    var text = 'INSERT INTO employee_signup_information (id,mobilenumber,location,status) VALUES ($1, $2, $3, $4)';
      client.query(text, [employee.id, employee.mobilenumber, employee.location, "OPEN"], function(err) {
      if(err) {done();callback("ERROR ADDING:"+employee.id);}
    });
    done();
    callback("SUCCESS");
  });
}

var addtosignups = function(employees,callback){
  pg.connect(conString, function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    employees.forEach(function(employee){
        var text = 'INSERT INTO employee_signup_information (id,mobilenumber,location,status) VALUES ($1, $2, $3, $4)';
        client.query(text, [employee.id, employee.mobilenumber, employee.location, "OPEN"], function(err) {
        if(err) {done();callback("ERROR ADDING:"+employee.id);}
      });
    })
    done();
    callback("SUCCESS");
  });
}

var getsignupcount=function(callback){
  pg.connect(conString, function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    client.query('SELECT COUNT(*) as COUNT from employee_signup_information', function(err, result) {
      done();
      if(err) {
        return console.error('error running query', err);
      } 
      callback(result.rows[0].count);
    });
  });
}
var methods = {getsignups:getsignups,addtosignup:addtosignup,getsignupcount:getsignupcount};
module.exports=methods;

