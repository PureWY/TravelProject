const express = require('express');
const router = express.Router();

//引入模型
const FlightOrder = require('../../models/plane/flightOrder');
const HouseOrder = require('../../models/hotel/houseOrder');
const CarOrder = require('../../models/car/taxiOrder');

//查询飞机订单消息
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
                message: '飞机订单查询成功',
                body: allOrder
            })
        }
    })
})

//查询酒店订单消息
router.post('/queryHouseOrder',function(req,res,next){
    HouseOrder.find(req.body,(err,allOrder) => {
        if(err){
            res.json({
                code: 201,
                message: '数据库异常'
            })
        }else{
            res.json({
                code: 200,
                message: '酒店订单查询成功',
                body: allOrder
            })
        }
    })
})

//查询租车订单消息
router.post('/queryTaxiOrder',function(req,res,next){
    CarOrder.find(req.body,(err,allOrder) => {
        if(err){
            res.json({
                code: 201,
                message: '数据库异常'
            })
        }else{
            res.json({
                code: 200,
                message: '租车订单查询成功',
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