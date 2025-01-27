import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axiosPlugin from './plugins/axios';

const app = createApp(App);

app.use(store);
app.use(router);
app.use(axiosPlugin);

app.mount('#app');