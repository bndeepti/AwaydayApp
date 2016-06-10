var expect = require('chai').expect;
var sinon = require('sinon');
var cache=require('../server/controller/cache');
//var proxyquire = require('proxyquire');
describe('jigsaw read', function () {
    var jigsawResponse=require('../server/controller/jigsaw.js');

  //  var jigsawResponseTrail=require('../server/controller/jigsawTrial.js');
    
 

    it('return response when seached using email id', function (done) {
 	
        jigsawResponse.getUserByEmail('bsneha@thoughtworks.com', function (err, data) {        	
            expect(err).to.be.null;        
         
            expect(data).to.be.not.null;
            done();	
        });
 	
    });

      it('return all users', function (done) {
 		this.timeout(515000);
    
        jigsawResponse.getAllUsers( function (err, data) {        	
            expect(err).to.be.null;     
            setTimeout(function() {
    console.log('Blah blah blah blah extra-blah');
     cache.getCacheValue('allUserData',function(value){
				console.log(value.length);
            });
      expect(data).to.be.not.null;
            done();	
}, 7000);   
           
            //console.info(data);
           
        });
 	
    });


});

