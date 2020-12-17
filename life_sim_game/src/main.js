import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

import Users from './components/Users'

Vue.config.productionTip = false

const routes = [
    {path:'/users', component:Users}
]

const router = new VueRouter({
    routes
})

Vue.use(VueRouter)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
