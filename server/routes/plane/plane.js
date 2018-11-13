const express = require('express');
const router = express.Router();
const async = require('async');

const config = require('../../config/config.js');

var Flight = require('../../models/plane/flight')
var Plane = require('../../models/plane/plane')

router.post('/siteType',function(req,res,next){
    res.json({
        code: 200,
        message: '舱位等级请求成功',
        body: {
            siteType: [
                {
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
router.post('/queryFlight',function (req,res,next) {
    Flight.find({$and:[{startCity: req.body.startCity},
        {endCity: req.body.endCity},
        {startTime: {$gte:req.body.searchTime[0]}},
        {endTime: {$lte:req.body.searchTime[1]}}
    ]},(err,flight) => {
        if(err){
            res.json({
                code: 202,
                message: '数据库异常'
            })
        }else{
            if(!flight.length){
                res.json({
                    code: 201,
                    message: '该地点暂无航班消息',
                })
            }else{
                //根据查询到的航班信息查询每个飞机的座位信息
                // let flightInfo = []
                // Object.assign(flightInfo,flight)
                // for(let i of flightInfo){
                //     Plane.find({
                //         plantId: i.planeId
                //     },(err,plane) => {
                //         if(err){
                //             console.log(err)
                //             res.json({
                //                 code: 202,
                //                 message: '数据库异常'
                //             })
                //         }else{
                //             i.planeId = plane
                //             console.log(flightInfo)
                //         }
                //     })
                // }
                
                // res.json({
                //     code: 200,
                //     body: {
                //         flightInfo: flightInfo
                //     },
                //     message: '航班信息查询成功'
                // })
                let flightInfo = []
                Object.assign(flightInfo,flight)

                let planeList = []

                async.each(flightInfo,function(item,callback){
                    Plane.find({
                        plantId: item.planeId
                    },(err,plane) => {
                        if(err) throw err
                        planeList.push(plane[0])
                        callback(null)
                    })
                },function(err){
                    console.log(err);
                    res.json({
                        code: 200,
                        message: '航班与飞机信息获取成功',
                        body: {
                            planeInfo: planeList,
                            flightInfo: flightInfo
                        }
                    })
                })
            }
        }
    })
 })


module.exports = router;