<template>
  <nav class="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow">
    <h1 class="text-lg font-bold">Task Tracker</h1>

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
      <router-link to="/login" class="hover:underline">Login</router-link>
      <router-link to="/signup" class="hover:underline">Signup</router-link>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

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
