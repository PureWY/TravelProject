import request from '@/utils/request'

// 获取所有订单信息
export function queryAllOrder(data) {
    return request({
      url: '/order/queryAllOrder',
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
