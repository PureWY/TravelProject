import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import {
  Message
} from 'element-ui'
import store from '@/store'

const service = axios.create({
  baseURL: 'http://192.168.1.101:3333/', //api的base_url
  // baseURL: 'http://192.168.0.104:3333/',
  timeout: 120000,
  method: 'post',
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
})

service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['_TK'] = store.getters.token //让每个请求携带token
  }
  return config
}, error => {
  console.log(error)
  Promise.reject(error)
})

service.interceptors.response.use(
  response => {
    if (response.data.code == 200) {
      return Promise.resolve(response)
    } else if (response.data.code == 401 || response.data.code == 402) {
      // this.$store.dispatch('LogOut').then(() => this.$store.push('./login'))
        Message({
          message: response.data.message,
          type: 'error',
          duration: 3000
        })
      return Promise.reject(response)
    } else{
      Message({
        message: response.data.message,
        type: 'error',
        duration: 3000
      })
      return Promise.reject(response)
    }
  },
  error => {
    this.$store.commit('REM_TOKEN');
    console.log('err' + error) //for  DEBUG
    Message({
      message: error.data.message,
      type: 'error',
      duration: 3000
    })
    return Promise.reject(error)
  }
)

export default service