import request from '@/utils/request'

// 获取所有订单信息
export function queryFlightOrder(data) {
    return request({
      url: '/order/queryFlightOrder',
      method: 'post',
      data: JSON.stringify(data)
    })
  }

  // 删除所有订单信息
export function deleteAllOrder(data) {
  return request({
    url: '/order/deleteAllOrder',
    method: 'post',
    data: JSON.stringify(data)
  })
}
