import { RouteConfig } from 'vue-router/types';

import Store from '@/views/Store.vue';

const Cart = () => import(/* webpackChunkName: "about" */ '@/views/Cart.vue');
const About = () => import(/* webpackChunkName: "about" */ '@/views/About.vue');
const NotFoundPage = () => import(/* webpackChunkName: "404" */ '@/views/404.vue');

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Store',
    component: Store,
  },

  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
  },

  {
    path: '/about',
    name: 'About',
    component: About,
  },

  {
    path: '*',
    component: NotFoundPage,
  },
];

export default routes;
