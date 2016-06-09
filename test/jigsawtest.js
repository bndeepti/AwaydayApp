var jigsawconfig = require('../server/config/config')
var expect = require('chai').expect;
var sinon = require('sinon');
var proxyquire = require('proxyquire');
describe('jigsaw read', function () {
    var jigsawResponse;
    var request;
    before(function () {
        request = sinon.stub();
        //jigsawResponse=require('../server/controller/jigsaw');
       jigsawResponse = proxyquire('../server/controller/jigsaw', {'request': request});
    });

    it('should return user results', function (done) {
 		var endPoint = jigsawconfig.apiUrl +'/people/test';
        var options = {
            url: endPoint,
            headers: {
                'Authorization' :jigsawconfig.authtoken
                 }
            };
        var body = JSON.stringify({
            
            id : 1,
            name : 'test user'
        });
	
        request.withArgs(options).yields(null, null,body);

        jigsawResponse.getUserByEmail('test@thoughtworks.com', function (err, data) {
            expect(err).to.be.null;
            console.log(data);
            expect(data).to.equal(JSON.stringify({

            	"id" : 1,
			"name" : 'test user'
            }));
           
        });
 		done();
    });
});


/*var assert = require('chai').assert;
var jisawservice =require('../service/jigsaw');
suite('jigsaw read',function()
{
	test('get user by email',fucntion(){


	});
}
	
);*/