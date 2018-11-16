import request from '@/utils/request'

//查询舱位类型
export function getSiteType(data) { 
    return request({
        url: '/plane/siteType',
        method: 'post',
        data: JSON.stringify(data)
      })
 }

 //查询航班信息
 export function queryFlight(data) { 
    return request({
        url: '/plane/queryFlight',
        method: 'post',
        data: JSON.stringify(data)
      })
 }

 //提交航班订单
 export function subFlightOrder(data) { 
    return request({
        url: '/plane/subFlightOrder',
        method: 'post',
        data: JSON.stringify(data)
      })
 }