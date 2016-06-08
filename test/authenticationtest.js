var assert = require('chai').assert;
var authentication = require("../server/routes/authentication");
var httpMocks = require('node-mocks-http');
suite('unathenticated', function() {
	test('return login page', function(done) {
		var request  = httpMocks.createRequest(
		{	
			method: 'GET',
			url: '/'
		});
		var response = httpMocks.createResponse({eventEmitter: require('events').EventEmitter});
		response.on('end', function() {
	      	assert.equal(this.statusCode,"302");
	      	done();
		});
		authentication.index(request,response);
	});
});