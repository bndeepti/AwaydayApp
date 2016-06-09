var express = require('express');
var admincontroller = require('../controller').admin
var router = express.Router();
router.get('/',admincontroller.adminhome);

module.exports = {router:router};