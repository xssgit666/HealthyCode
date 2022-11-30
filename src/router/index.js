import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { // 首页
    name: 'ho-me',
    path: '/',
    component: () => import('@/views/home')
  }
]

const router = new VueRouter({
  routes
})

export default router
