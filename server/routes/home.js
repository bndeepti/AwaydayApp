var express = require('express');
var router = express.Router();
var path = require('path');
var html = require('html');

console.log("home");
var index = function(req,res){
    console.log("index");
    res.sendFile(path.resolve("views/index.html"));
};

var error = function(req,res){
    res.sendFile(path.resolve("views/error.html"));
};

router.get('/', index);

router.get('/home', index); 

router.get('/error', error);

module.exports={router: router};
