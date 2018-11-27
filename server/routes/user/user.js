const express = require('express');
const router = express.Router();

const fs = require('fs');

const multer = require('multer')
const jwt = require('../../config/jwt')


//引入模型
var User = require('../../models/User.js');

//图片上传部分的处理
let path = 'public/uploadImg/'

const storage = multer.diskStorage({
  //上传图片的路径
  destination: 'public/uploadImg',
  //给上传文件重命名，获取添加后缀名
  filename: function(req, file, callback) {
    let userphone = jwt.verifyToken(req.headers._tk).payload.userphone
    //把图片命名为当前登陆的用户名
    let date = Date.now()
    path = path + userphone + `${date}.jpg`
    callback(null, userphone + `${date}.jpg`);
  }
})

//修改个人信息接口
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

//获取个人信息接口
router.post('/getUserInfo',function(req,res,next){
    User.findOne({
        userphone: req.body.userphone
    },(err,user) => {
        if(err){
            res.json({
                code: 201,
                message: '数据库异常！'
            })
        }else if(user){
            res.json({
                code: 200,
                userphone: user.userphone,
                body: {
                    userInfo: {
                        username: user.username,
                        usercard: user.usercard,
                        useraddress: user.useraddress
                    }
                },
                message: '账户信息查询成功！'
            })
        }
    })
})

//上传头像接口
router.post('/uploadHeadImg',multer({
    storage
  }).single('uploadFile'),function(req,res,next){
    console.log(path)
    res.json({
        code: 200,
        message: '获取图片成功',
        body: path
    })
    path = 'public/uploadImg/'
})


module.exports = router;