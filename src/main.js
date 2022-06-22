import { createApp } from 'vue';
import App from './App.vue';
import makeServer from './server';
import router from './router/index';
import NavBar from './components/main/NavBar.vue';
import IndexCompo from './views/Index/index.vue';
// import BuyList from './views/BuyList/index.vue';
import './assets/css/index.css';

const Vue = createApp(App);

// server setting
Vue.config.productionTip = false;
if (process.env.NODE_ENV === 'development') {
  makeServer();
}

Vue.component('NavBar', NavBar);
Vue.component('IndexCompo', IndexCompo);
// Vue.component('BuyList', BuyList);
Vue.use(router);
Vue.mount('#app');
