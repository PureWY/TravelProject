import request from '@/utils/request'

//查询舱位类型
export function queryHotel(data) { 
    return request({
        url: '/hotel/queryHotel',
        method: 'post',
        data: JSON.stringify(data)
      })
 }