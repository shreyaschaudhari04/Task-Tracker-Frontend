<template>
  <div class="bg-gray-100 p-6 rounded shadow mb-6">
    <h3 class="text-lg font-semibold mb-4">
      {{ editTask ? 'Update Task' : 'Add New Task' }}
    </h3>
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label class="block mb-1 font-medium">Title</label>
        <input
          v-model="task.title"
          type="text"
          class="w-full px-4 py-2 border rounded"
          required
        />
      </div>

      <div>
        <label class="block mb-1 font-medium">Description</label>
        <textarea
          v-model="task.description"
          rows="3"
          class="w-full px-4 py-2 border rounded"
        ></textarea>
      </div>

      <button
        type="submit"
        class="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
      >
        {{ editTask ? 'Update Task' : 'Add Task' }}
      </button>

      <p v-if="error" class="text-red-600 text-sm mt-2">{{ error }}</p>
    </form>
  </div>
</template>

<script>
import { watch, ref } from 'vue';
import axios from 'axios';
import { useToast } from 'vue-toastification';

export default {
  name: 'TaskForm',
  props: {
    editTask: Object,
  },
  setup(props, { emit }) {
    const task = ref({
      title: '',
      description: '',
    });

    const error = ref('');
    const toast = useToast();

    watch(
      () => props.editTask,
      (newTask) => {
        if (newTask) {
          task.value = { ...newTask };
        } else {
          task.value = { title: '', description: '' };
        }
      },
      { immediate: true }
    );

    const handleSubmit = async () => {
      const token = localStorage.getItem('access_token');
      const url = `${import.meta.env.VITE_API_URL}/tasks`;

      try {
        if (props.editTask) {
          const taskId = props.editTask.id || props.editTask._id;
          console.log('Updating task:', taskId, task.value);

          await axios.patch(`${url}/${taskId}`, task.value, {
            headers: { Authorization: `Bearer ${token}` },
          });
          toast.success('Task updated successfully!');
        } else {
          await axios.post(url, task.value, {
            headers: { Authorization: `Bearer ${token}` },
          });
          toast.success('Task added successfully!');
        }

        emit('task-saved');
        task.value = { title: '', description: '' };
        error.value = '';
      } catch (err) {
        console.error('Task submit error:', err);
        error.value = err.response?.data?.message || 'Task save failed.';
      }
    };

    return {
      task,
      error,
      handleSubmit,
    };
  },
};
</script>
