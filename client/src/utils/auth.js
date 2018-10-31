
const TokenKey = 'token'

export function addCookie(name, value, expireHours) {
  var cookieString = name + '=' + escape(value) + '; path=/'
  // 判断是否设置过期时间
  if (expireHours > 0) {
    var date = new Date()
    date.setTime(date.getTime() + expireHours * 3600 * 1000)
    cookieString = cookieString + ';expires=' + date.toGMTString()
  }
  document.cookie = cookieString
}

export function getCookie(name) {
  var strcookie = document.cookie
  var arrcookie = strcookie.split('; ')
  for (var i = 0; i < arrcookie.length; i++) {
    var arr = arrcookie[i].split('=')
    if (arr[0] == name) return unescape(arr[1])
  }
  return null
}

export function delCookie(name) { // 删除cookie
  var exp = new Date()
  exp.setTime(exp.getTime() - 1)
  var cval = getCookie(name)
  if (cval != null) document.cookie = name + '=' + cval + '; path=/;expires=' + exp.toGMTString()
}
/**
 * 获取token
 */
export function getToken() {
  var token = getCookie(TokenKey)
  if (token) {
  	return token
  } else {
  	return ''
  }
}
export function getAdmin() {
  return getCookie('admin')
}

export function setToken(token) {
  addCookie(TokenKey, token)
}
export function setAdmin(admin) {
  addCookie('admin', admin)
}

export function removeToken() {
  return delCookie(TokenKey)
}
export function removeAdmin() {
  return delCookie('admin')
}
