var express = require('express');
var auth = require('../service/authentication');
var router = express.Router();


// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});


var samlauthenticationcallback = auth.authenticate('saml', { failureRedirect: '/', failureFlash: true });

router.get('/',samlauthenticationcallback);
router.post('/',samlauthenticationcallback, function (req, res) {
    res.redirect("/private/home.html");
 });

module.exports = {router:router,index:auth.protected};