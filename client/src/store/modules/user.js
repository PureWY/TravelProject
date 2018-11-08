import {
  loginByUserPhone,
  register,
  logout,
  
} from '@/api/login'
import {
  changeInfo,
  getUserInfo
} from '@/api/user/modifiInfo.js'
import {
  getToken,
  setToken,
  removeToken,
  setAdmin,
  getAdmin,
  removeAdmin
} from '@/utils/auth'
const user = {
  state: {
    userphone: getAdmin(),
    token: getToken(),
    loginTime: null,
    userInfo: {
      username: '',
      usercard: '',
      useraddress: ''
    }
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_TIME: (state, loginTime) => {
      state.loginTime = loginTime
    },
    SET_USER: (state, userphone) => {
      state.userphone = userphone
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = {
        ...userInfo
      }
    },
  },
  actions: {
    //用户名登录
    LoginByUserPhone({
      commit
    }, userInfo) {
      return new Promise((resolve, reject) => {
        loginByUserPhone(userInfo).then(response => {
          const data = response.data
          commit('SET_USER', data.body.userphone)
          commit('SET_USERINFO', data.body.userInfo)
          commit('SET_TIME', data.body.loginTime)
          commit('SET_TOKEN', data._TK)
          window.localStorage.setItem('userphone',data.body.userphone)
          setToken(response.data._TK)
          setAdmin(data.body.userAccount)
          if (data.code == 200) {
            resolve()
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetUserInfo({
      commit
    },userphone){
      return new Promise((resolve,reject) => {
        getUserInfo(userphone).then(res => {
          commit('SET_USER', res.data.userphone)
          commit('SET_USERINFO', res.data.body.userInfo)
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    //用户信息修改
    ChangeByUserPhone({
      commit
    }, userInfo) {
      return new Promise((resolve, reject) => {
        changeInfo(userInfo).then(response => {
          const data = response.data
          if (data.code == 200) {
            console.log(data.body.userInfo)
            commit('SET_USERINFO', data.body.userInfo)
            resolve()
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    //用户名注册
    RegisterByUserPhone({
      commit
    }, userInfo) {
      return new Promise((resolve, reject) => {
        register({
          userphone: userInfo.userphone,
          password: userInfo.password
        }).then(response => {
          const data = response.data
          if (data.code == 200) {
            resolve()
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    //注销
    LogOut({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        logout(state).then((res) => {
          if (res.data.code == 200) {
            commit('SET_TOKEN', '')
            commit('SET_USER', '')
            commit('SET_TIME', '')
            window.localStorage.setItem('userphone','')
            removeToken()
            removeAdmin()
            resolve()
          }
        }).catch(error => {
          reject(error)
        })
      })
    }
  }

}

export default user