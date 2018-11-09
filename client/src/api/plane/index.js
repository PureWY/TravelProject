import request from '@/utils/request'

export function getSiteType(data) { 
    return request({
        url: '/plane/siteType',
        method: 'post',
        data: JSON.stringify(data)
      })
 }

 export function queryFlight(data) { 
    return request({
        url: '/plane/queryFlight',
        method: 'post',
        data: JSON.stringify(data)
      })
 }