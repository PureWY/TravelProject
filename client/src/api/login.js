import request from '@/utils/request'

// 登录
export function loginByUsername(data) {
  return request({
    url: '/login',
    method: 'post',
    data: JSON.stringify(data)
  })
}

// 注册
export function register(data) {
  return request({
    url: '/register',
    method: 'post',
    data: JSON.stringify(data)
  })
}

// 注销
export function logout(data) {
  return request({
    url: '/logout',
    method: 'post',
    data: JSON.stringify(data)
  })
}