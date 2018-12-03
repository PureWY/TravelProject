const express = require('express');
const router = express.Router();

//引入模型
const House = require('../../models/hotel/house')

router.post('/queryHotel', function(req, res, next) {
  // House.find(req.body,(err,house) => {
  //     if(err){
  //         res.json({
  //             code: 201,
  //             message: '数据库异常'
  //         })
  //     }else{
  //         if(!house){
  //             res.json({
  //                 code: 202,
  //                 message: '该地区暂无酒店信息'
  //             })
  //         }else{
  //             res.json({
  //                 code: 200,
  //                 body: house,
  //                 message: '酒店信息查询成功'
  //             })
  //         }
  //     }
  // })
  House.aggregate([{
      $lookup: {
        from: 'houserooms',
        localField: 'roomId',
        foreignField: 'roomId',
        as: 'roomInfo'
      }
    },
    {
      $match: req.body
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

module.exports = router;