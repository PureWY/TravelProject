var express = require('express');
var router = express.Router();

//引入模型
var User = require('../models/User');

router.post('/',function(req,res,next){
        User.findOne({
            userphone: req.body.userphone
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
                    userphone: req.body.userphone,
                    password: req.body.password,
                    username: '',
                    usercard: '',
                    useraddress: ''
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