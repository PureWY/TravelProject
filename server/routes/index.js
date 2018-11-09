var express = require('express');
var login = require('./login.js')
var register = require('./register.js')
var logout = require('./logout.js')
var user = require('./user/user.js')
var common = require('./common/common.js')
var plane = require('./plane/plane.js')

var routers = function (app) {
    app.use('/login', login);
    app.use('/register', register);
    app.use('/logout', logout);
    app.use('/user', user);
    app.use('/common',common);
    app.use('/plane',plane);

    //定制404页面
    app.use(function(req,res){
        res.status(404);
        res.render('404');
    });

    //定制500页面
    app.use(function(err,req,res,next){
        console.log('err.stack');
        res.status(500);
        res.send('500');
    });
}

module.exports = routers;