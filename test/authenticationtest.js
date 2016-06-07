var assert = require('chai').assert;
var authentication = require("../server/routes/authentication");
var httpMocks = require('node-mocks-http');
suite('unathenticated', function() {
	test('return login page', function() {
		var request  = httpMocks.createRequest(
		{	
			method: 'GET',
			url: '/'}
			);
		var response = httpMocks.createResponse();
		authentication.index(request,response);
		console.log(response._getRedirectUrl());
		assert.equal(response._getRedirectUrl(),"home.html");
	});
});