var request = require('request');
var jigsawconfig = require('../config/config')

module.exports = {
    getUserByEmail: function (email, callback) {
        console.log("called function getuserbyemail");
        var loginName = email.split("@")[0];
      console.log(loginName);
        var endPoint = jigsawconfig.apiUrl +'/people/' + loginName;
        var options = {
            url: endPoint,
            headers: {
                'Authorization' :jigsawconfig.authtoken
                 },
            method :'GET'
            };
         console.info(options);

        request(options, function ( err,response,body) {
        var data ={};
           if(err!==null){
            console.error(err);
           }
           else{
            var jigsawResponse = JSON.parse(body);
            console.log("response"+body);    
            data = JSON.stringify({
                
                "id" : jigsawResponse.employeeId,
                "name" :jigsawResponse.preferredName
            });
            }
            return callback(null, data);
        });
    }
};
