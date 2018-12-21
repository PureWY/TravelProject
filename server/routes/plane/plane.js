const express = require('express');
const router = express.Router();
const async = require('async');

const config = require('../../config/config.js');

var Flight = require('../../models/plane/flight')
var Plane = require('../../models/plane/plane')
var FlightOrder = require('../../models/plane/flightOrder')

//查询座位
router.post('/siteType', function(req, res, next) {
  res.json({
    code: 200,
    message: '舱位等级请求成功',
    body: {
      siteType: [{
          id: '0',
          text: '经济舱'
        },
        {
          id: '1',
          text: '商务舱'
        },
        {
          id: '2',
          text: '头等舱'
        },
      ]
    }
  })
})

//查询航班与飞机信息
router.post('/queryFlight', function(req, res, next) {
  Flight.aggregate([{
      $lookup: {
        from: 'planes',
        localField: 'planeId',
        foreignField: 'planeId',
        as: 'planeInfo'
      },
    },
    {
      $match: {
        startCity: req.body.startCity,
        endCity: req.body.endCity,
        startTime: {
          $gte: req.body.searchTime[0]
        },
        endTime: {
          $lte: req.body.searchTime[1]
        }
      }
    }
  ], (err, flightInfo) => {
    if (err) {
      console.log(err);
      res.json({
        code: 201,
        message: '数据库异常'
      })
    } else {
      if (flightInfo.length == 0) {
        res.json({
          code: 202,
          message: '该地点暂无航班消息'
        })
      } else {
        res.json({
          code: 200,
          message: '航班信息查询成功',
          body: flightInfo
        })
      }
    }
  })
})

//创建航班订单
router.post('/subFlightOrder', function(req, res, next) {
  console.log(req.body)
  FlightOrder.create(req.body,(err,order) => {
    if(err){
      res.json({
        code: 201,
        message: '数据库异常'
      })
    }else{
      res.json({
        code: 200,
        message: '订单创建成功'
      })
    }
  })
})

module.exports = router;