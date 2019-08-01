/* eslint-disable */
import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/common.css'
// 引入路由实例
import router from './router'
Vue.use(ElementUI)
// 全局引入axios
// 问题1
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
//问题二
Vue.prototype.$axios = axios // 以后的vue实例(组件) 都可以 this.$axios
// 问题三
// 请求拦截器
axios.interceptors.request.use(
  function(config) {
    config.headers.Authorization = localStorage.getItem('token')
    return config
  },
  function(error) {
    return Promise.reject(error)
  }
)
new Vue({
  // 挂载
  router,
  render: h => h(App)
}).$mount('#app')
