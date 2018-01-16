import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    opcionAPP: 1
  },
  mutations: {
    setOpcionAPP (state, opcionAPP) {
      state.opcionAPP = opcionAPP
    }
  }
})

export default store
