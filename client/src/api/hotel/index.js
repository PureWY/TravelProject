import request from '@/utils/request'

//查询酒店
export function queryHotel(data) { 
    return request({
        url: '/hotel/queryHotel',
        method: 'post',
        data: JSON.stringify(data)
      })
 }

 //模糊查询酒店
export function screenQueryHotel(data) { 
    return request({
        url: '/hotel/screenQueryHotel',
        method: 'post',
        data: JSON.stringify(data)
      })
 }

  //模糊查询酒店
export function queryHotelByRoomId(data) { 
    return request({
        url: '/hotel/QueryHotelByRoomId',
        method: 'post',
        data: JSON.stringify(data)
      })
 }

   //模糊查询酒店
export function queryHotelComments(data) { 
    return request({
        url: '/hotel/queryHotelComments',
        method: 'post',
        data: JSON.stringify(data)
      })
 }