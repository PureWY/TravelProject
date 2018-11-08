import Vue from 'vue'
import Router from 'vue-router'

const _import = file => () => import('@/views/' + file + '.vue')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: _import('main/index'),
      meta: {
        title: '主页面'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: _import('login/index'),
      meta: {
        title: '登录'
      }
    },
    {
      path: '/userInfo:tab',
      name: 'userInfo',
      component: _import('userInfo/index'),
      meta: {
        title: '个人信息'
      }
    },
  ]
})
