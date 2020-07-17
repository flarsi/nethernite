import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    packages: ""
  },
  mutations: {
    setPackages: (state, payload) => {
      state.packages = payload;
    }
  },
  actions: {
    loadApp(ctx, payload) {
      ctx.commit("setPackages", payload);
    }
  },
  getters: {
    getPackages(state) {
      return state.packages;
    }
  },
  modules: {}
});
