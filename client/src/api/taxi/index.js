import request from '@/utils/request'

//查询租车信息
export function queryTaxi(data) { 
    return request({
        url: '/car/queryTaxi',
        method: 'post',
        data: JSON.stringify(data)
      })
 }

 //模糊查询租车信息
export function screenQueryTaxi(data) { 
    return request({
        url: '/car/screenQueryTaxi',
        method: 'post',
        data: JSON.stringify(data)
      })
 }

//根据Id查询租车信息
export function queryTaxiById(data) { 
    return request({
        url: '/car/queryTaxiById',
        method: 'post',
        data: JSON.stringify(data)
      })
 }