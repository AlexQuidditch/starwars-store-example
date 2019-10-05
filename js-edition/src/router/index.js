import Vue from 'vue';
import Router from 'vue-router';

import Environment from '../services/environment';

import routes from './routes';

import { parseQuery } from './query';

Vue.use(Router);

const options = {
  mode: 'history',
  base: Environment.baseUrl,
  routes,
  parseQuery,
};

const router = new Router(options);

export default router;
