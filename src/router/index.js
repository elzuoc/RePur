import { createRouter, createWebHistory } from 'vue-router';
import IndexCompo from '@/views/Index/index.vue';
import BuyList from '@/views/BuyList/index.vue';
import ProdDetail from '@/views/ProdDetail/index.vue';
import SalesChannel from '@/views/SalesChannel/index.vue';
import ExportCompo from '@/views/Export/index.vue';

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: IndexCompo,
    },
    {
      path: '/BuyList',
      component: BuyList,
    },
    {
      path: '/ProdDetail',
      name: 'ProdDetail', // must name it if wanna get params from url
      component: ProdDetail,
    },
    {
      path: '/SalesChannel',
      component: SalesChannel,
    },
    {
      path: '/Export',
      component: ExportCompo,
    },
  ],
});
