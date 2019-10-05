import Vue from 'vue';
import Vuex from 'vuex';

import Environment from '@/services/environment';
import modules from './modules';

Vue.use(Vuex);

export default new Vuex.Store({
  modules,
  strict: !Environment.isProduction,
});
