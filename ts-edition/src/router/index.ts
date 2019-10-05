import Vue from 'vue';
import Router, { RouterOptions } from 'vue-router';

import Environment from '../services/environment';

import routes from './routes';

import { parseQuery } from './query';

Vue.use(Router);

const options: RouterOptions = {
  mode: 'history',
  base: Environment.baseUrl,
  routes,
  parseQuery,
};

const router = new Router(options);

export default router;
