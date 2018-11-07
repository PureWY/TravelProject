import request from '@/utils/request'

// 修改密码
export function changeInfo(data) {
    return request({
      url: '/user/changeInfo',
      method: 'post',
      data: JSON.stringify(data)
    })
  }