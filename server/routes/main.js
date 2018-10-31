var express = require('express');
var router = express.Router();

router.post('/',function (req,res,next) { 
    res.json({
        code: 200,
        message: "success"
    })
 })

module.exports = router;