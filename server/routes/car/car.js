const express = require('express');
const router = express.Router();

//引入模型
const Car = require('../../models/car/taxi')
const CarOrder = require('../../models/car/taxiOrder')

//整体查询租车信息
router.post('/queryTaxi', function(req, res, next) {
    Car.find({
        carCity: req.body.taxiCity
    }, (err, car) => {
    if (err) {
      res.json({
        code: 201,
        message: '数据库异常'
      })
    } else {
      if (!car.length) {
        res.json({
          code: 202,
          message: '该地区暂无租车信息'
        })
      } else {
        res.json({
          code: 200,
          body: car,
          message: '租车信息查询成功'
        })
      }
    }
  })
})

// 模糊查询租车信息
router.post('/screenQueryTaxi', function(req, res, next) {
  req.body.carSite[0] = req.body.carSite[0] == true ? 2 : null
  req.body.carSite[1] = req.body.carSite[1] == true ? 5 : null
  req.body.carSite[2] = req.body.carSite[2] == true ? 7 : null
  req.body.carSite = req.body.carSite.filter(res => {
    return res
  })
  req.body.carType[0] = req.body.carType[0] == true ? "小型车" : null
  req.body.carType[1] = req.body.carType[1] == true ? "中型车" : null
  req.body.carType[2] = req.body.carType[2] == true ? "SUV" : null
  req.body.carType[3] = req.body.carType[3] == true ? "大型SUV" : null
  req.body.carType = req.body.carType.filter(res => {
    return res
  })
  console.log(req.body)
  Car.find({
    carCity: req.body.carCity,
    carDetailPlace: { $regex: req.body.taxiPlace },
    carPrice: { $gte: req.body.lowPrice, $lte: req.body.highPrice },
    carSites: { $in: req.body.carSite },
    carType: { $in: req.body.carType }
  }, (err, car) => {
  if (err) {
    res.json({
      code: 201,
      message: '数据库异常'
    })
  } else {
    if (!car.length) {
      res.json({
        code: 202,
        message: '暂无相关租车信息'
      })
    } else {
      res.json({
        code: 200,
        body: car,
        message: '租车信息查询成功'
      })
    }
  }
  })
})

//根据Id查询租车信息
router.post('/queryTaxiById', function(req, res, next) {
  Car.find({
      carId: req.body.carId
  }, (err, car) => {
  if (err) {
    res.json({
      code: 201,
      message: '数据库异常'
    })
  } else {
    if (!car.length) {
      res.json({
        code: 202,
        message: '暂无租车信息'
      })
    } else {
      res.json({
        code: 200,
        body: car[0],
        message: '租车信息查询成功'
      })
    }
  }
})
})

//创建租车订单
router.post('/subTaxiOrder', function(req, res, next) {
  CarOrder.create(req.body,(err,order) => {
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