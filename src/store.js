import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    opcionAPP: 1,
    id: 0
  },
  mutations: {
    setOpcionAPP (state, opcionAPP) {
      state.opcionAPP = opcionAPP
    },
    setId (state, id) {
      state.id = id
    }
  }
})

export default store
