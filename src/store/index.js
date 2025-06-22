import { createStore } from 'vuex';

export default createStore({
  state() {
    return {
      token: localStorage.getItem('access_token') || null,
      user: null,
    };
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('access_token', token);
    },
    clearToken(state) {
      state.token = null;
      localStorage.removeItem('access_token');
    },
    setUser(state, user) {
      state.user = user;
    },
  },
  getters: {
    isAuthenticated(state) {
      return !!state.token;
    },
  },
  actions: {
  logout({ commit }) {
    commit('clearToken');
    window.location.href = '/login';
  },
}
});
