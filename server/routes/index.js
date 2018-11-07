var express = require('express');
var main = require('./main.js')
var login = require('./login.js')
var register = require('./register.js')
var logout = require('./logout.js')
var user = require('./user.js')

var routers = function (app) {
    app.use('/',main);
    app.use('/login', login);
    app.use('/register', register);
    app.use('/logout', logout);
    app.use('/user', user);

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