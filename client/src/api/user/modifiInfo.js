import request from '@/utils/request'

// 修改用户信息
export function changeInfo(data) {
    return request({
      url: '/user/changeInfo',
      method: 'post',
      data: JSON.stringify(data)
    })
  }

  // 获取用户信息
export function getUserInfo(data) {
  return request({
    url: '/user/getUserInfo',
    method: 'post',
    data: JSON.stringify(data)
  })
  }

// 上传头像
export function uploadHeadImg(data) {
  return request({
    url: '/user/uploadHeadImg',
    method: 'post',
    data: JSON.stringify(data)
  })
}

// 修改个性签名
export function changeSign(data) {
  return request({
    url: '/user/changeSign',
    method: 'post',
    data: JSON.stringify(data)
  })
}