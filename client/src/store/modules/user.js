import {
  loginByUserPhone,
  register,
  logout,
  getUserInfo
} from '@/api/login'
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
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_TIME: (state, loginTime) => {
      state.loginTime = loginTime
    },
    SET_USER: (state, user) => {
      state.userphone = user
    },
  },
  actions: {
    //用户名登录
    LoginByUserPhone({
      commit
    }, userInfo) {
      const userphone = userInfo.userphone.trim()
      return new Promise((resolve, reject) => {
        loginByUserPhone(userInfo).then(response => {
          const data = response.data
          commit('SET_TOKEN', data._TK)
          commit('SET_USER', data.body.userAccount)
          commit('SET_TIME', data.loginTime)
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