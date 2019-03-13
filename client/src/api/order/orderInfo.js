import request from '@/utils/request'

// 获取飞机订单信息
export function queryFlightOrder(data) {
    return request({
      url: '/order/queryFlightOrder',
      method: 'post',
      data: JSON.stringify(data)
    })
  }

// 获取酒店订单信息
export function queryHouseOrder(data) {
  return request({
    url: '/order/queryHouseOrder',
    method: 'post',
    data: JSON.stringify(data)
  })
}

// 获取租车订单信息
export function queryTaxiOrder(data) {
  return request({
    url: '/order/queryTaxiOrder',
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

