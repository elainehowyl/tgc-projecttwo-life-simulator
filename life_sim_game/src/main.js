import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
// import "bootstrap/dist/css/bootstrap.css"

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


import Register from './components/Register'
import Login from './components/Login'
import GameDisplay from './components/GameDisplay'
import NavBar from './components/NavBar'


Vue.config.productionTip = false

const routes = [
    {
        path:'/register', component:Register
    },
    {
        path:'/login', component:Login
    },
    {
        path:'/game', component: GameDisplay
    },
    {
        path:'/navbar', component: NavBar
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
