const express = require('express');
const router = express.Router();

const config = require('../config/config.js');

//引入模型
var User = require('../models/User');

router.post('/changeInfo',function(req,res,next){
    res.json({
        code: 200,
        message: '处理成功了'
    })
})

module.exports = router;