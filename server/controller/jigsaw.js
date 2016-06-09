var request = require('request');

module.exports = {
    getUserByEmail: function (email, callback) {
        console.log("called function getuserbyemail");
        var loginName = email.split("@")[0];
      console.log(loginName);
        var endPoint = "https://jigsaw.thoughtworks.com/api/people/" + loginName;
        var options = {
            url: endPoint,
            headers: {
                'Authorization' :'aad6531cccaec59656e643c64e8519e9'
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
