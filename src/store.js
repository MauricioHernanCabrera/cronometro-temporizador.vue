import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    opcionAPP: 1,
    temporizador: {
      tiempo: {
        hora: 0,
        minuto: '00',
        segundo: '00',
        milisegundo: 0
      },
      listaDeTiempos: [],
      tiempoActivo: false,
      audioNombre: 'temporizador',
      audioID: null,
      intervalo: null
    }
  },
  mutations: {
    setOpcionAPP (state, opcionAPP) {
      state.opcionAPP = opcionAPP
    }
  }
})

export default store
