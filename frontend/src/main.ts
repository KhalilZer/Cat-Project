import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import Toast, { POSITION } from 'vue-toastification';
import 'vue-toastification/dist/index.css';

import './style.css';

const app = createApp(App);


app.use(Toast, {
  position: POSITION.TOP_RIGHT,
});

app.use(router);

app.mount('#app');
