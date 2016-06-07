var express = require('express');
var router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});


var index = function(req,res){
	res.redirect("http://www.google.com");
}

router.get('/', index);


module.exports = {router:router,index:index};