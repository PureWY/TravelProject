var express = require('express');
var router = express.Router();

//引入模型
var User = require('../models/User');

router.post('/',function(req,res,next){
    if(req.body.password != req.body.checkpass){
        res.json({
            code: 201,
            message: "两次密码输入的不一致，请重新输入!"
        });
    }else if(!req.body.username){
        res.json({
            code: 202,
            message: "请输入正确的表单信息!"
        });
    }else{
        User.findOne({
            userName: req.body.username
        },(err,doc)=>{
            if(err){
                res.json({
                    code: 203,
                    message: "数据库异常!"
                });
            }else if(doc){
                res.json({
                    code: 204,
                    message: "该用户已存在，请登录!"
                });
            }else{
                let userInfo = {
                    userName: req.body.username,
                    passWord: req.body.password
                }
                new User(userInfo).save((err, user) => {
                    if (!err) {
                        res.json({
                            code: 200,
                            message: "注册成功!"
                        });
                    } else {
                        console.log(user)
                        res.json({
                            code: 205,
                            message: "数据库异常!"
                        });
                    }
                  });
            }
        })
    }
})

module.exports = router;