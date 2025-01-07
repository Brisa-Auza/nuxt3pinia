// stores/auth.js
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null,
  }),
  actions: {
    saveToken(token) {
      this.token = token;
    },
  },
  getters: {
    getToken: (state) => state.token,
  },
});
