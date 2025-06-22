// import { createApp } from 'vue'
// import './style.css'
// import App from './App.vue'
// import './assets/main.css';

// createApp(App).mount('#app')

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/main.css';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

const app = createApp(App);

app.use(Toast, {
  position: 'top-right',
  timeout: 3000, 
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
});

app.use(router);
app.use(store);
app.mount('#app');
