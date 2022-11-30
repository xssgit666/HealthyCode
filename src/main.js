import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './styles/index.less' // 引用全局样式

import Vant from 'vant' // 引入vant
import 'vant/lib/index.css' // 引入vant样式

import 'amfe-flexible' // rem适配

Vue.config.productionTip = false

Vue.use(Vant) // 使用vant

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
