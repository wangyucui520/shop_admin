// 引入路由
import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入组件
import login from './components/login/login.vue'
import home from './components/home/home.vue'
// 安装
Vue.use(VueRouter)
// 实例化路由
const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: login },
    { path: '/home', component: home }
  ]
})
// 导出路由
export default router
