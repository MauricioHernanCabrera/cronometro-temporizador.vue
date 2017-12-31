import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

import routes from './routes.js'

import AppTiempo from './components/global/Tiempo'
import AppBotones from './components/global/Botones'
import AppListaDeTiempos from './components/global/ListaDeTiempos'

Vue.use(VueRouter)

Vue.component('AppTiempo', AppTiempo)
Vue.component('AppBotones', AppBotones)
Vue.component('AppListaDeTiempos', AppListaDeTiempos)

const router = new VueRouter({
  routes,
  mode: 'history'
})

new Vue({
  el: '#app',
  render: h => h(App),
  router
})
