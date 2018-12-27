import request from '@/utils/request'

//查询租车信息
export function queryTaxi(data) { 
    return request({
        url: '/car/queryTaxi',
        method: 'post',
        data: JSON.stringify(data)
      })
 }