<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center">Create Account</h2>
      <form @submit.prevent="handleSignup" class="space-y-4">
        <div>
          <label class="block mb-1 font-medium">Username</label>
          <input
            type="text"
            v-model="form.username"
            class="w-full px-4 py-2 border rounded"
          />
          <p v-if="!$v.form.username.required && $v.form.username.$dirty" class="text-red-500 text-sm">Username is required</p>
        </div>

        <div>
          <label class="block mb-1 font-medium">Password</label>
          <input
            type="password"
            v-model="form.password"
            class="w-full px-4 py-2 border rounded"
          />
          <p v-if="!$v.form.password.minLength && $v.form.password.$dirty" class="text-red-500 text-sm">
            Password must be at least 6 characters
          </p>
        </div>

        <div>
          <label class="block mb-1 font-medium">Confirm Password</label>
          <input
            type="password"
            v-model="form.confirmPassword"
            class="w-full px-4 py-2 border rounded"
          />
          <p v-if="form.confirmPassword !== form.password && form.confirmPassword" class="text-red-500 text-sm">
            Passwords do not match
          </p>
        </div>

        <button
          type="submit"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          Sign Up
        </button>
        <p v-if="error" class="text-red-600 mt-2 text-sm text-center">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import useVuelidate from '@vuelidate/core';
import { required, minLength } from '@vuelidate/validators';
import { reactive } from 'vue';

export default {
  name: 'Signup',
  setup(_, { emit }) {
    const form = reactive({
      username: '',
      password: '',
      confirmPassword: '',
    });

    const rules = {
      username: { required },
      password: { required, minLength: minLength(6) },
    };

    const v$ = useVuelidate(rules, form);
    return { form, v$ };
  },
  data() {
    return {
      error: '',
    };
  },
  methods: {
    async handleSignup() {
      this.v$.$touch();

      if (this.v$.$invalid || this.form.password !== this.form.confirmPassword) {
        return;
      }

      try {
        await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`, {
          username: this.form.username,
          password: this.form.password,
        });

        this.$router.push('/login');
      } catch (err) {
        this.error = err.response?.data?.message || 'Signup failed. Please try again.';
      }
    },
  },
};
</script>
