var assert = require('chai').assert;
var httpMocks = require('node-mocks-http');
var mocksignupservice = {};
var signup={}
signup.getsignups=function(callback){
	var employees=[];
  	var employee={};
    employee.id="19045";
    employee.mobilenumber="982636829";
    employee.location="bangalore";
    employee.status="OPEN";
    employees.push(employee);
    callback(employees);
}
signup.getsignupcount=function(callback){
    callback(100);
}
signup.addtosignup=function(employee, callback){
    callback("id already present");
}


mocksignupservice.signup=signup;
var admin=require("../server/controller/admin")(mocksignupservice);
suite('signuptests', function() {
	test('is get employees size is 1', function(done) {
		var request  = httpMocks.createRequest({method: 'GET',url: '/'});
		var response = httpMocks.createResponse({eventEmitter: require('events').EventEmitter});
		response.on('end', function() {
			assert.equal(JSON.parse(this._getData()).employees.length,1);
			done();
		});
		admin.getsignups(request,response);
	});
	test('is sign up count 100', function(done) {
		var request  = httpMocks.createRequest({method: 'GET',url: '/'});
		var response = httpMocks.createResponse({eventEmitter: require('events').EventEmitter});
		response.on('end', function() {
			assert.equal(JSON.parse(this._getData()).count,100);
			done();
		});
		admin.signupcount(request,response);
	});
	test('is home page file correct', function(done) {
		var request  = httpMocks.createRequest({method: 'GET',url: '/'});
		var response = httpMocks.createResponse({eventEmitter: require('events').EventEmitter});
		var responseFile = "";
		response.sendFile=function(fileName)
		{
			responseFile=fileName;
			this.end();
		}
		response.on('end', function() {
			assert.include(responseFile,"private/admin-home.html");
			done();
		});
		admin.adminhome(request,response);
	});

	test('is if id is present', function(done) {
		var request  = httpMocks.createRequest({method: 'GET',url: '/',body:{}});
		var response = httpMocks.createResponse({eventEmitter: require('events').EventEmitter});
		response.on('end', function() {
			var response=JSON.parse(this._getData());
			assert.equal(response.status,"id should be present");
			done();
		});
		admin.addtosignup(request,response);
	});

	test('is if id is number', function(done) {
		var request  = httpMocks.createRequest({method: 'GET',url: '/',body:{id:"abc"}});
		var response = httpMocks.createResponse({eventEmitter: require('events').EventEmitter});
		response.on('end', function() {
			var response=JSON.parse(this._getData());
			assert.equal(response.status,"id should be number");
			done();
		});
		admin.addtosignup(request,response);
	});

	test('is if mobile number is present', function(done) {
		var request  = httpMocks.createRequest({method: 'GET',url: '/',body:{id:123}});
		var response = httpMocks.createResponse({eventEmitter: require('events').EventEmitter});
		response.on('end', function() {
			var response=JSON.parse(this._getData());
			assert.equal(response.status,"mobile should be present");
			done();
		});
		admin.addtosignup(request,response);
	});
	test('if mobile number is invalid', function(done) {
		var request  = httpMocks.createRequest({method: 'GET',url: '/',body:{id:123,mobilenumber:"abcdefghij"}});
		var response = httpMocks.createResponse({eventEmitter: require('events').EventEmitter});
		response.on('end', function() {
			var response=JSON.parse(this._getData());
			assert.equal(response.status,"mobile should be valid");
			done();
		});
		admin.addtosignup(request,response);
	});



});