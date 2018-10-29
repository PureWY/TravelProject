var express = require('express');
var router = express.Router();

router.get('/',function(req,res,next){
    res.send({
        code: 200,
        message: "success!"
    });
})

router.get('/getPageList',function(req,res,next){
    res.json({
        code: 200,
        message: {
            name: 'wy',
            age: 23
        }
    });
})

module.exports = router;