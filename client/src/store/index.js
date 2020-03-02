import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isAuthenticated:false,
    user:{}
  },
  mutations: {
    changeStat (state, status) {
      state.isAuthenticated = status
    },
    setUser (state, userInfo) {
      state.user = userInfo
    }
  },
  actions: {
    changeStat ({ commit }, status) {
      commit('changeStat', status)
    },
    setUser ({ commit }, userInfo) {
      commit('setUser', userInfo)
    },
    clearCurrentState ({ commit }) {
      commit('changeStat', false)
      commit('setUser',null)
    }
  },
  getters: {
    getStat (state) {
      return state.isAuthenticated
    },
    getUser (state) {
      return state.user
    }
  },
  modules: {
  }
})
