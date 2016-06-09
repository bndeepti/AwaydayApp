var path = require('path');
var service = require('../service/signup');
var adminhome=function(req,res){
	if(req.session.passport.user!="bsneha@thoughtworks.com"){
		throw new Error();
	}
	console.log(service.getsignups());
	res.sendFile(path.resolve("views/index.html"));
}
var methods={};
methods.adminhome=adminhome;
module.exports=methods;