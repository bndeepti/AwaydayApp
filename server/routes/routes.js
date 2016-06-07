var express = require('express');
var authentication = require('./authentication').router;
var router = express.Router();
router.use("/login",authentication);
module.exports=router;