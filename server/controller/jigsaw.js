var request = require('request');
var config =require('../config/config');
var async=require('async');
var cache=require('./cache');
var Users=new Array();
var pageNo=0;


   var getUserByEmail= function (email, callback) {
      
        var loginName = email.split("@")[0];
     
        var endPoint = config.jigsaw.apiUrl +'/people/' + loginName;
        var options = {
            url: endPoint,
            headers: {
                'Authorization' : config.jigsaw.authtoken
                 },
            method :'GET'
            };
        
        request(options, function ( err,response,body) {
        
        var data ={};
           if(err!==null){
             console.error(err);
             return callback(err,data);
           }
           else if(response.statusCode===200){
            
            var jigsawResponse = JSON.parse(body);
            
            data = JSON.stringify({
                
                "id" : jigsawResponse.employeeId,
                "name" :jigsawResponse.preferredName,
                "gender":jigsawResponse.gender,
                "wokingOffice":jigsawResponse.workingOffice.name,
                "homeOffice":jigsawResponse.homeOffice.name,
                "email":email,
                "image":jigsawResponse.picture.url
            });
            }

            return callback(null,data);
        });
    },

    getAllUsersForSpecificLocation= function(callback,location,pageNo){
       
        var options = {
            url:  config.jigsaw.apiUrl +'/people?page='+pageNo +'&home_office='+location,
            headers: {
                'Authorization' : config.jigsaw.authtoken
                 },
            method :'GET'
            };
       
        request(options, function (error, response, body) {
       
        if (!error && response.statusCode == 200) {
            if(body.length>2){
                var result= JSON.parse(body);
                for(var index in result){
                   
                    var item={};
                     item.id =result[index].employeeId,
                    item.name =result[index].preferredName,
                    item.gender=result[index].gender,
                    item.wokingOffice=result[index].workingOffice.name,
                    item.homeOffice=result[index].homeOffice.name,
                    item.email=result[index].loginName+'@thoughtworks.com',
                    item.image=result[index].picture.url
                    Users.push(item); 
       
                }                
                getAllUsersForSpecificLocation(callback,location,pageNo+1); 
             }
            else
            {                
                return callback(null,Users);
            }      

        } else {
            console.info(error);
            return callback(error,Users);
        }

    });
    },

 
  locations=config.jigsaw.locations.split(',');
  var cntOfLoc=0;
    var getAllUsers = function(callback){
    async.each(locations,function(location)
    {
       
        getAllUsersForSpecificLocation( function (err, data) {           
            cntOfLoc=cntOfLoc+1;   
            if(cntOfLoc===locations.length)
            {
                cache.createNewCacheValue('allUserData',Users);
                return callback(null,Users);       
            }
        },location,1);
        
        
    });
   
}
var methods={};
 methods. getUserByEmail =getUserByEmail;
 methods.getAllUsers=getAllUsers;
module.exports = methods;

 