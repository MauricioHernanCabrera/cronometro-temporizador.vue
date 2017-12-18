import Vue from 'vue'
import App from './App.vue'
import AppTiempo from './components/global/Tiempo'
import AppBotones from './components/global/Botones'
import AppListaDeTiempos from './components/global/ListaDeTiempos'

Vue.component('AppTiempo', AppTiempo)
Vue.component('AppBotones', AppBotones)
Vue.component('AppListaDeTiempos', AppListaDeTiempos)

new Vue({
  el: '#app',
  render: h => h(App)
})
