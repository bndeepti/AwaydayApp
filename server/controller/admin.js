var path = require('path');
var createcontroller= function(services)
{
	var service=services.signup;
	var adminhome=function(req,res){
		res.sendFile(path.resolve("private/admin-home.html"));
	}
	var signupcount = function(req,res){
		var callback = function(count){
			res.setHeader('Content-Type', 'application/json');
	    	res.send(JSON.stringify({ "count": count }));
		};
		service.getsignupcount(callback);
	}
	var getsignups=function(req,res){
		var callback = function(employees){
			res.setHeader('Content-Type', 'application/json');
	    	res.send(JSON.stringify({ "employees": employees }));
		}
		service.getsignups(callback);
	}
	function isNumeric(n) {
	  return !isNaN(parseFloat(n)) && isFinite(n);
	}
	var addtosignup=function(req,res){
		var callback = function(status){
			res.setHeader('Content-Type', 'application/json');
	    	res.send(JSON.stringify({ "status": status }));
		}
	 	var employee={};
	   	employee.id=req.body.id;
	   	employee.mobilenumber=req.body.mobilenumber;
	   	if(employee.id==undefined)
	   	{
	   		callback("id should be present");
	   	}
	   	else if(!Number.isInteger(employee.id))
	   	{
	   		callback("id should be number");
	   	}
	   	else if(employee.mobilenumber==undefined)
	   	{
	   		callback("mobile should be present");
	   	}
	   	else if(employee.mobilenumber.length!=10 || !isNumeric(employee.mobilenumber))
	   	{
	   		callback("mobile should be valid");
	   	}
	   	else
	   	{
			service.addtosignup(employee,callback);
		}
	}
	var methods={};
	methods.adminhome=adminhome;
	methods.signupcount=signupcount;
	methods.getsignups=getsignups;
	methods.addtosignup=addtosignup;
	return methods;
}

module.exports=createcontroller;