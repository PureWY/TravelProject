const express = require('express');
const router = express.Router();

//引入模型
const House = require('../../models/hotel/house')

//整体查询酒店信息
router.post('/queryHotel', function(req, res, next) {
  House.aggregate([{
      $lookup: {
        from: 'houserooms',
        localField: 'roomId',
        foreignField: 'roomId',
        as: 'roomInfo'
      }
    },
    {
      $match: {
        houseCityPlace: req.body.houseCityPlace
      }
    }
  ], (err, house) => {
    if (err) {
      res.json({
        code: 201,
        message: '数据库异常'
      })
    } else {
      if (!house.length) {
        res.json({
          code: 202,
          message: '该地区暂无酒店信息'
        })
      } else {
        res.json({
          code: 200,
          body: house,
          message: '酒店信息查询成功'
        })
      }
    }
  })
})


//模糊查询酒店信息
router.post('/screenQueryHotel', function(req, res, next) {
  req.body.houseType[0] = req.body.houseType[0] == true ? "经济型酒店" : null
  req.body.houseType[1] = req.body.houseType[1] == true ? "舒适型酒店" : null
  req.body.houseType[2] = req.body.houseType[2] == true ? "豪华型酒店" : null
  req.body.houseType = req.body.houseType.filter(res => {
    return res
  })
  console.log(req.body)
  House.aggregate([{
      $lookup: {
        from: 'houserooms',
        localField: 'roomId',
        foreignField: 'roomId',
        as: 'roomInfo'
      }
    },
    {
      $match: {
        // houseCityPlace: req.body.houseCityPlace,
        // houseStar: { $gt: req.body.gradeClass },
        // houseGrade: { $gt: req.body.starNums },
        // houseFreeSer: req.body.freeService,
        // houseType: req.body.houseType
      }
    }
  ], (err, house) => {
    if (err) {
      res.json({
        code: 201,
        message: '数据库异常'
      })
    } else {
      if (!house.length) {
        res.json({
          code: 202,
          message: '暂无相关酒店信息'
        })
      } else {
        res.json({
          code: 200,
          body: house,
          message: '酒店信息查询成功'
        })
      }
    }
  })
})

module.exports = router;