// 引入路由
import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入组件
import login from './components/login/login.vue'
import home from './components/home/home.vue'
import rights from './components/rights/rights.vue'
import users from './components/users/users.vue'
import roles from './components/roles/roles.vue'
// 安装
Vue.use(VueRouter)
// 实例化路由
const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: login },
    {
      path: '/home',
      component: home,
      children: [
        { path: '/rights', component: rights },
        { path: '/roles', component: roles },
        { path: '/users', component: users }
      ]
    }
  ]
})
// 全局的导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else {
    let token = localStorage.getItem('token')
    token ? next() : next('/login')
  }
})
// 导出路由
export default router
