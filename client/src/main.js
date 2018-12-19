// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'babel-polyfill'
import App from './App'
import router from './router'
import store from './store'

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/fonts/iconfont.css'

import '@/styles/index.scss'

// 引入vue-amap
import AMap from 'vue-amap';

Vue.config.productionTip = false

Vue.use(Element, {
  size: 'medium', // set element-ui default size
})

Vue.use(AMap);

// 初始化vue-amap
AMap.initAMapApiLoader({
  // 申请的高德key
  key: '5a88d5949c8d8241c88d89f5791474c1',
  // 插件集合
  plugin: ['AMap.OverView','AMap.Geolocation']
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
