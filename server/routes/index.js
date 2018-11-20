var express = require('express');
var login = require('./login.js')
var register = require('./register.js')
var logout = require('./logout.js')
var user = require('./user/user.js')
var common = require('./common/common.js')
var plane = require('./plane/plane.js')
var order = require('./order/order.js')

const jwt = require('../config/jwt.js')

var routers = function (app) {
    app.use(function (req, res, next) {
        // 请求都需要进行token校验 
        if (req.url != '/login' && req.url != '/register' && req.url != '/' && req.url != '/common/cityList' && req.url != '/user/uploadHeadImg') {
            let token = req.headers._tk;
            if(!token){
                res.json({
                    code: 401,
                    message: '账号未登录，请登录'
                })
            }else{
                let decodeToken = jwt.verifyToken(token);
                if(!decodeToken){
                    res.json({
                        code: 402,
                        message: '账号登录过期，请重新登录'
                    })
                }else{
                    next()
                }
            }
            
        } else {
            next();
        }
    });

    app.use('/login', login);
    app.use('/register', register);
    app.use('/logout', logout);
    app.use('/user', user);
    app.use('/common',common);
    app.use('/plane',plane);
    app.use('/order',order);

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