import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

const _import = file => () => import('@/views/' + file + '.vue')

Vue.use(Router)

const router =  new Router({
  routes: [
    {
      path: '/',
      component: _import('main/index'),
      meta: {
        title: '主页面',
        keepAlive: true
      },
      children: [
        {
          path: '/',
          name: 'plane',
          component: _import('main/plane/index'),
          meta: { keepAlive: true },
        },
        {
          path: 'car',
          name: 'car',
          component: _import('main/car/index'),
          meta: { keepAlive: true },
        },
        {
          path: 'hotel',
          name: 'hotel',
          component: _import('main/hotel/index'),
          meta: { keepAlive: true },
        },
      ]
    },
    {
      path: '/login:phone',
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
    {
      path: '/flight',
      name: 'flight',
      component: _import('flight/index'),
      meta: {
        title: '航班信息',
        keepAlive: true
      },
      children: [
        {
          path: 'flightInfo',
          name: 'flightInfo',
          component: _import('flight/flightInfo/index'),
          // meta: { keepAlive: true },
        },
        {
          path: 'flightPay',
          name: 'flightPay',
          component: _import('flight/flightPay/index'),
          meta: { keepAlive: true },
        },
      ]
    },
    {
      path: '/house',
      name: 'house',
      component: _import('house/index'),
      meta: {
        title: '航班信息',
        keepAlive: true
      },
      children: [
        {
          path: 'houseInfo',
          name: 'houseInfo',
          component: _import('house/houseInfo/index'),
          // meta: { keepAlive: true },
        },
      ]
    },

  ]
})

//前端验证是否有token，没有的话返回登录
router.beforeEach((to,from,next) => {
  if(to.path === '/'){
    next()
  }else{
    let token = sessionStorage.getItem('token');

    if(token == 'null' || token == ''){
      next('/login')
    } else {
      next();
    }
  }
})

export default router;
