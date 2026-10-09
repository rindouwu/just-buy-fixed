import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import auth from "@/services/authService.js"

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('user_token'));

  const isAuthenticated = computed(() => Boolean(token.value));

  function login(newToken) {
    token.value = newToken;
    localStorage.setItem('user_token', newToken);
  }

  const logout = async () => {
    await auth.logout()
    token.value = null;
    localStorage.removeItem('user_token');
  }

  return {
    token,
    isAuthenticated,
    login,
    logout
  }
})
