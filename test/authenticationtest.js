var assert = require('chai').assert;
var authentication = require("../server/routes/authentication")
suite('unathenticated', function() {
	test('return login page', function() {
		var req,res;
        req = res = {};
        var result="";
        res.redirect=function(pageName){
        	result=pageName;
        }
		authentication.index(req,res);
		assert.equal(result,"home.html");
	});
});