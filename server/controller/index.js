var service = require('../service');
var admin=require("./admin")(service);
var controllers = {};
controllers.admin=admin;
module.exports=controllers;