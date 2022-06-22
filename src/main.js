import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';
import NavBar from './components/main/NavBar.vue';
import IndexCompo from './views/Index/index.vue';
// import BuyList from './views/BuyList/index.vue';
import './assets/css/index.css';

const Vue = createApp(App);
Vue.component('NavBar', NavBar);
Vue.component('IndexCompo', IndexCompo);
// Vue.component('BuyList', BuyList);
Vue.use(router);
Vue.mount('#app');
