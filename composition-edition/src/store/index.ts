import { getCurrentInstance } from 'vue-demi';

import Vue from 'vue';
import Vuex, { Store } from 'vuex';

import { RootState } from '@/types/store';

import { environment } from '@/services';

import modules from './modules';

Vue.use(Vuex);

// should be deprecate when use Vue 3
export function useStore<S = RootState>() {
  const vm = getCurrentInstance()?.proxy;
  if (!vm) {
    throw new ReferenceError(
      'Vue instance not found.\n'
      + 'It looks like you trying to useStore() outside setup() function',
    );
  }
  return vm.$store as Store<S>;
}

export function useStaticStore() {
  return store;
}

const store = new Store<RootState>({
  modules,
  strict: !environment.isProduction,
});

export default store;
