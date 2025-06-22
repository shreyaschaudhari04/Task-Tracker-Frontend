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

const app = createApp(App);
app.use(router);
app.use(store);
app.mount('#app');
