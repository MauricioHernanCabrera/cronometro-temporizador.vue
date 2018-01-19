import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'

import routes from './routes'

import AppTiempo from './components/global/Tiempo'
import AppBotones from './components/global/Botones'
import AppListaDeTiempos from './components/global/ListaDeTiempos'
import AppModalNuevoTiempo from './components/global/ModalNuevoTiempo'
import store from './store'

Vue.use(VueRouter)
Vue.component('AppTiempo', AppTiempo)
Vue.component('AppBotones', AppBotones)
Vue.component('AppListaDeTiempos', AppListaDeTiempos)
Vue.component('AppModalNuevoTiempo', AppModalNuevoTiempo)

const router = new VueRouter({
  routes,
  mode: 'history'
})

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
