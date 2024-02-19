import { createApp } from 'vue';
import App from './App.vue';
import pinia from './store';
import router from './router';

import { Toast } from 'vant';
import 'vant/es/toast/style';
import 'vant/es/dialog/style';

// 创建vue实例
const app = createApp(App);

// import mitt from 'mitt';
// const emitter = mitt();
// app.provide('emitter', emitter);

app.use(pinia);
app.use(router);
app.use(Toast);
// 挂载实例
app.mount('#app');
