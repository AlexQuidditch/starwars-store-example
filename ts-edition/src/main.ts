import Vue from 'vue';
import Bus from 'vue-bus';

import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(Bus);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#wrapper');
