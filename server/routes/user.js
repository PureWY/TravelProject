const express = require('express');
const router = express.Router();

const config = require('../config/config.js');

//引入模型
var User = require('../models/User');

router.post('/changeInfo',function(req,res,next){
    User.findOne({
        userphone: req.body.userphone
    },(err,user) => {
        if(err){
            res.json({
                code: 201,
                message: '数据库异常！'
            })
        }else if(user){
            User.update({userphone: req.body.userphone},{
                username: req.body.username,
                password: req.body.userpass,
                usercard: req.body.usercard,
                useraddress: req.body.useraddress
            },function(err){
                if(err){
                    console.log(err)
                    res.json({
                        code: 202,
                        message: err
                    })
                }else{
                    res.json({
                        code: 200,
                        userphone: user.userphone,
                        body: {
                            userInfo: {
                                username: req.body.username,
                                usercard: req.body.usercard,
                                useraddress: req.body.useraddress
                            }
                        },
                        message: '账户信息设置成功！'
                    })
                }
            })
        }
    })
})

module.exports = router;