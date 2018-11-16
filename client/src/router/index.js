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
        title: '主页面'
      },
      children: [
        {
          path: '/',
          name: 'plane',
          component: _import('main/plane/index')
        },
        {
          path: 'car',
          name: 'car',
          component: _import('main/car/index')
        },
        {
          path: 'hotel',
          name: 'hotel',
          component: _import('main/hotel/index')
        },
      ]
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
    {
      path: '/flight',
      name: 'flight',
      component: _import('flight/index'),
      meta: {
        title: '航班信息'
      },
      children: [
        {
          path: 'flightInfo',
          name: 'flightInfo',
          component: _import('flight/flightInfo/index')
        },
        {
          path: 'flightPay',
          name: 'flightPay',
          component: _import('flight/flightPay/index')
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
