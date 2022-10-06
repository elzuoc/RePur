import { createRouter, createWebHistory } from 'vue-router';
import BuyList from '@/views/BuyList/index.vue';
import ProdDetail from '@/views/ProdDetail/index.vue';
import SalesChannel from '@/views/SalesChannel/index.vue';
import ExportCompo from '@/views/Export/index.vue';
import PageError from '@/components/PageError.vue';

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
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
    {
      path: '/404',
      name: '404',
      component: PageError,
      hidden: true,
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/404',
      hidden: true,
    },
  ],
});
