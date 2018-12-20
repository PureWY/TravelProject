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
        houseCityPlace: req.body.houseCityPlace,
        houseStar: { $gte: req.body.starNums },
        houseGrade: { $gte: req.body.gradeClass },
        houseFreeSer: req.body.freeService,
        houseType: { $in: req.body.houseType},
        houseName: { $regex: req.body.houseName },
        houseDetailPlace: { $regex: req.body.houseDetailPlace }
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

//根据房间Id查询酒店与房间信息
router.post('/queryHotelByRoomId', function(req, res, next) {
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
        roomId: req.body.roomId
      }
    }
  ], (err, house) => {
    if (err) {
      console.log(err)
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

module.exports = router;