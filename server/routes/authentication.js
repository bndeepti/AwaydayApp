var express = require('express');
var auth = require('../service/authentication');
var router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});



var index = auth.authenticate('saml', { failureRedirect: '/', failureFlash: true });

router.get('/',index);


module.exports = {router:router,index:index};