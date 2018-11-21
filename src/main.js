// The Vue build version to load with the `import` command
import Vue from 'vue'
import Element from 'element-ui'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import routes from './router'
import App from './App'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(Element)
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.config.productionTip = false
const router = new VueRouter({routes})

// 做登陆拦截
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    sessionStorage.removeItem('user')
  }
  let user = JSON.parse(sessionStorage.getItem('user'))
  if (!user && to.path !== '/login') {
    next({ path: '/login' })
  } else {
    next()
  }
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
