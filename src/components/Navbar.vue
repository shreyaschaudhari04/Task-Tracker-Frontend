<template>
  <nav class="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow sticky top-0 z-50">
    <h1 class="text-2xl font-serif font-extrabold sticky">Task Tracker</h1>

    <div v-if="isAuthenticated">
      <span class="mr-4">Hello, {{ username }}</span>
      <button
        @click="logout"
        class="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100"
      >
        Logout
      </button>
    </div>

    <div v-else class="space-x-4">
      <router-link to="/login" class="bg-white text-blue-600 font-medium rounded-lg px-3 py-1.5 transition-all duration-200 ease-in-out hover:bg-blue-100 hover:shadow hover:scale-105 hover:py-2 hover:px-3.5">Login</router-link>

      <router-link to="/signup" class="bg-white text-blue-600 font-medium rounded-lg px-3 py-1.5 transition-all duration-200 ease-in-out hover:bg-blue-100 hover:shadow hover:scale-105 hover:py-2 hover:px-3.5">Signup</router-link>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { useToast } from 'vue-toastification'

export default {
  name: 'Navbar',
  computed: {
    ...mapGetters(['isAuthenticated']),
    username() {
      const token = localStorage.getItem('access_token');
      if (!token) return '';
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.username;
      } catch {
        return '';
      }
    },
  },
  methods: {
    ...mapActions(['logout']),
    
  },
};
</script>
