var express = require('express');
var path = require('path');
var authentication = require('./authentication').router;
var auth = require('../service/authentication');
var router = express.Router();
router.use("/login",authentication);
router.use("/private",auth.protected,express.static(path.join(__dirname,'../..', 'private')));
module.exports=router;