import Vue from 'vue'
import Router from 'vue-router'

const _import = file => () => import('@/views/' + file + '.vue')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: _import('home/index'),
      meta: {
        title: '主页面'
      }
    }
  ]
})
