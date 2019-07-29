import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/common.css'
// 引入路由实例
import router from './router'
Vue.use(ElementUI)

new Vue({
  // 挂载
  router,
  render: h => h(App)
}).$mount('#app')
