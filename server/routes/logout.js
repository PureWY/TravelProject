const express = require('express');
const router = express.Router();

const config = require('../config/config.js');

//引入模型
var User = require('../models/User');

router.post('/',function(req,res,next){
    if(req.body.userphone == 'undefined'){
        res.json({
            code: 200,
            _TK: '',
            message: '注销成功！'
        })
    }else{
        User.findOne({
            userphone: req.body.userphone
        },(err,user)=>{
            if(err){
                res.json({
                    code: 201,
                    message: '数据库异常！'
                })
            }else{
                res.json({
                    code: 200,
                    _TK: '',
                    message: '注销成功！'
                })
            }
        })
    }
    
})

module.exports = router;