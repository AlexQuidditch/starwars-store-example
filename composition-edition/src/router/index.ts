import { getCurrentInstance } from 'vue-demi';

import Vue from 'vue';
import Router, { Route, RouterOptions } from 'vue-router';

import { environment } from '../services';

import routes from './routes';

import { parseQuery } from './query';

Vue.use(Router);

const options: RouterOptions = {
  mode: 'history',
  base: environment.baseUrl,
  routes,
  parseQuery,
};

const router = new Router(options);

export function useStaticRouter() {
  return router;
}

// should be deprecated when use Vue 3
export function useRoute(): Route {
  const vm = getCurrentInstance()?.proxy;
  if (!vm) {
    throw new ReferenceError(
      'Vue instance not found.\n'
      + 'It looks like you trying to useRoute() outside setup() function',
    );
  }
  return vm.$route;
}

// should be deprecated when use Vue 3
export function useRouter(): Router {
  const vm = getCurrentInstance()?.proxy;
  if (!vm) {
    throw new ReferenceError(
      'Vue instance not found.\n'
      + 'It looks like you trying to useRouter() outside setup() function',
    );
  }
  return vm.$router;
}

export default router;
