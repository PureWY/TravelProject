const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

//引入模型
var User = require('../models/User');

router.post('/',function(req,res,next){
    User.findOne({
        username: req.body.username
    },(err,user)=>{
        if(err){
            res.json({
                code: 201,
                message: "数据库异常!"
            });
        }else if(!user){
            res.json({
                code: 201,
                message: "用户名或密码错误!"
            });
        }else{
            //与之前加密的密码进行match
            bcrypt.compare(req.body.password, user.passWord).then(match => {
                if (match) {
                    res.json({
                        code: 200,
                        message: "登录成功!"
                    });
                } else {
                    res.json({
                        code: 201,
                        message: "用户名或密码错误!"
                    });
                }
              }).catch(err => {
                res.json({
                    code: 201,
                    message: "数据库异常!"
                });
              });
        }
    })
})

module.exports = router;