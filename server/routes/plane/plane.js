const express = require('express');
const router = express.Router();

const config = require('../../config/config.js');

var Flight = require('../../models/plane/flight')

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
                res.json({
                    code: 200,
                    body: flight,
                    message: '航班信息查询成功'
                })
            }
        }
    })
 })


module.exports = router;