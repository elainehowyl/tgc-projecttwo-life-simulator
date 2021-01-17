import Vue from 'vue'
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import App from './App.vue'


import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

 Vue.use(Vuex)
const store = new Vuex.Store({
  state:{
     username:"",
     loggedIn:false,
     displayname:"",
     gender:"",
     health:0,
     happiness:0,
     energy:0,
     money:0,
     clicks:0,
     userhouses:[]
  },
  plugins: [createPersistedState()],
});



Vue.config.productionTip = false


new Vue({
  render: h => h(App),
  store
}).$mount('#app')
