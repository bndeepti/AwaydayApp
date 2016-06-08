var express = require('express');
var authentication = require('./authentication').router;
var home = require('./home').router;
var router = express.Router();

router.use("/", home);
router.use("/login",authentication);
module.exports=router;
