import request from '@/utils/request'

export function getCityList(data) { 
    return request({
        url: '/common/cityList',
        method: 'post',
        data: JSON.stringify(data)
      })
 }