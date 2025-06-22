<template>
  <div class="max-w-3xl mx-auto p-6">
    <!-- Toggle Add/Cancel Button -->
    <button
      @click="showForm = !showForm"
      class="mb-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
    >
      {{ showForm ? 'Cancel' : 'Add New Task' }}
    </button>

    <!-- Task Form Component -->
    <TaskForm
      v-if="showForm"
      @task-saved="refreshTasks"
      :editTask="editingTask"
    />

    <!-- Active Tasks -->
    <div class="mt-8">
      <h2 class="text-xl font-semibold mb-2">Active Tasks</h2>
      <div v-if="activeTasks.length === 0" class="text-gray-500">
        No active tasks.
      </div>
      <div
        v-for="task in activeTasks"
        :key="task.id"
        class="flex items-center justify-between p-4 border rounded mb-2 bg-white shadow"
      >
        <div class="flex-1">
          <div class="flex items-center space-x-2">
            <input type="checkbox" :checked="task.completed" @change="toggleStatus(task)" />
              <span class="font-medium text-lg">{{ task.title }}</span>
          </div>
          <div v-if="task.description" class="pl-6 text-sm text-gray-500 mt-1">
            {{ task.description }}
          </div>
        </div>
          
        <div class="space-x-3">
          <button @click="editTask(task)" title="Edit">✏️</button>
          <button @click="deleteTask(task)" title="Delete">🗑️</button>
        </div>
      </div>
    </div>

    <!-- Completed Tasks -->
    <div class="mt-8">
      <h2 class="text-xl font-semibold mb-2">Completed Tasks</h2>
      <div v-if="completedTasks.length === 0" class="text-gray-500">
        No completed tasks.
      </div>
      <div
        v-for="task in completedTasks"
        :key="task.id"
        class="flex items-center justify-between p-4 border rounded mb-2 bg-white shadow"
      >
        <div class="flex items-center space-x-2">
          <input type="checkbox" :checked="task.completed" @change="toggleStatus(task)" />
          <span class="line-through text-gray-500 font-medium text-lg">{{ task.title }}</span>
          <div v-if="task.description" class="pl-6 text-sm text-gray-400 mt-1 line-through">
            {{ task.description }}
          </div>
        </div>
        <div class="space-x-3">
          <button @click="editTask(task)" title="Edit">✏️</button>
          <button @click="deleteTask(task)" title="Delete">🗑️</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import TaskForm from './TaskForm.vue';

export default {
  name: 'TaskList',
  components: { TaskForm },
  data() {
    return {
      tasks: [],
      showForm: false,
      editingTask: null,
    };
  },
  computed: {
    activeTasks() {
      return this.tasks.filter((t) => !t.completed);
    },
    completedTasks() {
      return this.tasks.filter((t) => t.completed);
    },
  },
  methods: {
    async refreshTasks() {
      const token = localStorage.getItem('access_token');
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/tasks`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.tasks = res.data;
        this.editingTask = null;
        this.showForm = false;
      } catch (err) {
        console.error('Error fetching tasks:', err);
      }
    },

    async toggleStatus(task) {
    const token = localStorage.getItem('access_token');
    try {
      console.log('Toggling task:', task.id, '→', !task.completed);
    
    const originalStatus = task.completed;
    task.completed = !task.completed; 

    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/tasks/${task.id}`, {
        completed: task.completed,
        }, {
        headers: { Authorization: `Bearer ${token}` },
        });
      } catch (err) {
    // If failed, revert the change
    task.completed = originalStatus;
    console.error('Toggle failed:', err);
}
      
    
  } catch (err) {
    console.error('Failed to toggle task status:', err);
    if (err.response) {
      console.error('Response data:', err.response.data);
      console.error('Response status:', err.response.status);
      console.error('Response headers:', err.response.headers);
    }
  }
},

    async deleteTask(task) {
      const token = localStorage.getItem('access_token');
      try {
        console.log('Deleting task:', task.id);
        await axios.delete(`${import.meta.env.VITE_API_URL}/tasks/${task.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.refreshTasks();
      } catch (err) {
        console.error('Delete failed:', err);
      }
    },

    editTask(task) {
      this.editingTask = task;
      this.showForm = true;
    },
  },
  mounted() {
    this.refreshTasks();
  },
};
</script>
