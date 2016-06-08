var assert = require('chai').assert;
var supertest = require('supertest');
var authentication = require("../server/routes/authentication");
var app=require('../server/server');
var supertest=supertest(app);
suite('unathenticated', function() {
	test('redirect to okta login page', function(done) {
	
	supertest
  .get('/login')
  .expect(302)
  .end(function (err, res) {
        
		  assert.include(res.header.location,"okta");

          done();
        });

	});
	
	test('go to home page', function(done) {
	
  supertest
    .get("/")
    .expect(200)
    .end(done);
	});
});