var express = require('express');
var admincontroller = require('../controller').admin;
var router = express.Router();
router.use(function checkadminrights(req, res, next) {
  	if(req.session.passport.user!="bsneha@thoughtworks.com"){
		throw new Error();
	}
  next();
});
router.get('/',admincontroller.adminhome);
router.get('/signupcount',admincontroller.signupcount);
router.post('/signup',admincontroller.addtosignup);
module.exports = {router:router};