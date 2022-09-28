import { createApp } from 'vue';
import axios from 'axios'; // must place before App import
import App from './App.vue';
import makeServer from './server'; // miragejs server
import router from './router/index';
import NavBar from './components/main/NavBar.vue';
import './assets/css/index.css';

const Vue = createApp(App);

// axios
axios.default.withCredentials = false; // 跨域设置，false 忽略跨域 cookies（Access-Control-Allow-Headers:*）
axios.default.timeout = 16000; // 等待時間: ms

// miragejs server setting
Vue.config.productionTip = false;
// if (process.env.NODE_ENV === 'development') {
makeServer();
// }

Vue.component('NavBar', NavBar);
// Vue.component('BuyList', BuyList);
Vue.use(router);
Vue.mount('#app');
