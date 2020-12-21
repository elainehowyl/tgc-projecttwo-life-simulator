import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import "bootstrap/dist/css/bootstrap.css"

import Users from './components/Users'
import Register from './components/Register'

Vue.config.productionTip = false

const routes = [
    {
        path:'/users', component:Users
    },
    {
        path:'/register', component:Register
    }
]

const router = new VueRouter({
    routes
})

Vue.use(VueRouter)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
