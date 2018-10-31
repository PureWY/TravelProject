var express = require('express');
var router = express.Router();

//引入模型
var User = require('../models/User');

router.post('/',function(req,res,next){
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
                new User(userInfo).save((err, doc) => {
                    if (!err) {
                        res.json({
                            code: 200,
                            message: "注册成功!"
                        });
                    } else {
                        console.log(err)
                        res.json({
                            code: 205,
                            message: "数据库异常!"
                        });
                    }
                  });
            }
        })
})

module.exports = router;