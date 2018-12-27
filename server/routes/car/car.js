const express = require('express');
const router = express.Router();

//引入模型
const Car = require('../../models/car/taxi')

//整体查询酒店信息
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


module.exports = router;