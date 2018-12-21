const express = require('express');
const router = express.Router();

//引入模型
var FlightOrder = require('../../models/plane/flightOrder');
var HouseOrder = require('../../models/hotel/houseOrder');

router.post('/queryFlightOrder',function(req,res,next){
    FlightOrder.find(req.body,(err,allOrder) => {
        if(err){
            res.json({
                code: 201,
                message: '数据库异常'
            })
        }else{
            res.json({
                code: 200,
                message: '所有订单查询成功',
                body: allOrder
            })
        }
    })
})

router.post('/deleteAllOrder',function(req,res,next){
    FlightOrder.remove(req.body,(err,delOrder) => {
        if(err){
            res.json({
                code: 201,
                message: '数据库异常'
            })
        }else{
            res.json({
                code: 200,
                message: '所有订单历史删除成功'
            })
        }
    })
})




module.exports = router;