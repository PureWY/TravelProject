const express = require('express');
const bcrypt = require('bcrypt');      //用于加密密码
const jwt = require('jsonwebtoken');   //用于生成token
const router = express.Router();

const config = require('../config/config.js');

//引入模型
var User = require('../models/User');

router.post('/',function(req,res,next){
    User.findOne({
        userphone: req.body.userphone
    },(err,user)=>{
        if(err){
            res.json({
                code: 201,
                message: "数据库异常!"
            });
        }else if(!user){
            res.json({
                code: 202,
                message: "手机号或密码错误!"
            });
        }else{
            //与之前加密的密码进行match
            bcrypt.compare(req.body.password, user.password).then(match => {
                if (match) {
                    //创建token
                    const payload = { user: user.userphone };
                    const options = { expiresIn: config.tokenTime};
                    const secret = config.secretOrKey;
                    const token = jwt.sign(payload, secret, options);
                    const loginTime = new Date().toLocaleString();
                    res.json({
                        code: 200,
                        body: {
                            userphone: user.userphone,
                            loginTime: loginTime,
                            userInfo: {
                                username: user.username,
                                usercard: user.usercard,
                                useraddress: user.useraddress
                            }
                        },
                        _TK: token,
                        message: "登录成功!"
                    });
                } else {
                    res.json({
                        code: 203,
                        message: "手机号或密码错误!"
                    });
                }
              }).catch(err => {
                res.json({
                    code: 204,
                    message: "数据库异常!"
                });
              });
        }
    })
})

module.exports = router;