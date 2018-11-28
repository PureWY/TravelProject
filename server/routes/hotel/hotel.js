const express = require('express');
const router = express.Router();

//引入模型

router.post('/queryHotel',function(req,res,next){
    res.json({
        code: 200,
        message: '所有酒店查询成功'
    })
})

module.exports = router;