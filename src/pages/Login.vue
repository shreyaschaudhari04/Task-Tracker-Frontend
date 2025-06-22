<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="block mb-1 font-medium">Username</label>
          <input
            v-model="form.username"
            type="text"
            class="w-full px-4 py-2 border rounded"
          />
        </div>

        <div>
          <label class="block mb-1 font-medium">Password</label>
          <input
            v-model="form.password"
            type="password"
            class="w-full px-4 py-2 border rounded"
          />
        </div>

        <button
          type="submit"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          Login
        </button>

        <p v-if="error" class="text-red-600 mt-2 text-sm text-center">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapMutations } from 'vuex';

export default {
  name: 'Login',
  data() {
    return {
      form: {
        username: '',
        password: '',
      },
      error: '',
    };
  },
  methods: {
    ...mapMutations(['setToken']),
    async handleLogin() {
      try {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
          username: this.form.username,
          password: this.form.password,
        });

        this.setToken(res.data.access_token);
        this.$router.push('/tasks');
      } catch (err) {
        this.error = err.response?.data?.message || 'Login failed. Please try again.';
      }
    },
  },
};
</script>
