import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

const _import = file => () => import('@/views/' + file + '.vue')

Vue.use(Router)

if (sessionStorage.getItem('token')) {
  store.commit('set_token', sessionStorage.getItem('token'))
}

const router =  new Router({
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
    {
      path: '/plane:queryInfo',
      name: 'plane',
      component: _import('plane/index'),
      meta: {
        title: '航班信息'
      }
    },
  ]
})

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
